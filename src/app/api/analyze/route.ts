import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { questionsPool } from '@/data/questions_pool';
import { characterProfiles } from '@/data/character_profiles';
import { getZodiacByName, formatZodiacForPrompt } from '@/data/zodiac_signs';
import { TRAIT_MAPPING } from '@/data/trait_mapping';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = 'https://api.openai.com/v1';

// Map question IDs to their characterTypeId for scoring
const questionToCharacterMap: Record<string, string> = {};
questionsPool.forEach(q => {
  questionToCharacterMap[q.id] = q.characterTypeId;
});

// Calculate scores for each character type based on answers
function calculateCharacterScores(answers: Record<string, string>): Record<string, number> {
  const scores: Record<string, number> = {};

  // Initialize all character types with 0
  characterProfiles.forEach(profile => {
    scores[profile.id] = 0;
  });

  // Sum up scores based on answers (1-5 Likert scale)
  for (const [questionId, answerValue] of Object.entries(answers)) {
    const characterTypeId = questionToCharacterMap[questionId];
    if (characterTypeId && scores[characterTypeId] !== undefined) {
      scores[characterTypeId] += parseInt(answerValue, 10) || 0;
    }
  }

  return scores;
}

// AI-powered trait analysis: selects the 3 most genuine traits with honest percentages
async function analyzeTraitsWithAI(
  rawScores: Record<string, number>
): Promise<Array<{id: string, name: string, score: number, rawScore: number}>> {

  const allTraits = Object.entries(rawScores)
    .map(([id, score]) => {
      const mapping = TRAIT_MAPPING[id];
      if (!mapping) return null;
      const percentage = Math.round((score / mapping.maxScore) * 100);
      return { id, name: mapping.label, score: percentage, rawScore: score };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .sort((a, b) => b.score - a.score);

  const traitList = allTraits
    .map(t => `${t.name} (${t.id}): ${t.score}% (Rohwert: ${t.rawScore}/250)`)
    .join('\n');

  const systemPrompt = `Du bist ein präziser psychologischer Analyst für eine Dating-App.

Ein Nutzer hat 40 zufällige Umfrage-Fragen beantwortet (5 pro Archetyp, Likert-Skala 1–5). Hier sind die Auswertungen für 8 Persönlichkeits-Facetten:

${traitList}

DEINE AUFGABE:
Wähle NUR die Facetten, die diese Person WIRKLICH stark charakterisieren (mindestens 70%). Vergib für jede einen ehrlichen Prozentwert.

KRITISCHE REGELN:
- NIEMALS Facetten unter 70% auswählen – auch wenn das weniger als 3 bedeutet
- Lieber 1-2 echte, hochausgeprägte Facetten zeigen als 3 schwache
- Basiere den Prozentwert direkt auf den Rohwerten – kein künstliches Aufblähen
- Zeige echte Unterschiede: wenn jemand 88% hat, zeige 88%; wenn 52%, ignoriere es
- Die ausgewählten Werte dürfen und sollen sich deutlich voneinander unterscheiden

ANTWORT-FORMAT:
Gib nur Facetten mit ≥70% zurück – ob 1, 2, oder 3 ist völlig OK.

Antworte NUR mit diesem JSON – keine weiteren Texte, keine Erklärungen:
[{"id":"facetten_id","score":XX}] oder [{"id":"facetten_id","score":XX},{"id":"facetten_id","score":XX}] etc.`;

  try {
    if (!OPENAI_API_KEY) throw new Error('Missing API key');

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
        max_tokens: 120,
        temperature: 0.1
      })
    });

    if (!response.ok) throw new Error(`Trait AI error: ${response.status}`);

    const result = await response.json();
    const content = result.choices[0].message.content.trim();
    const parsed: Array<{id: string, score: number}> = JSON.parse(content);

    const selected = parsed
      .map(item => {
        const trait = allTraits.find(t => t.id === item.id);
        if (!trait) return null;
        return {
          id: item.id,
          name: trait.name,
          score: Math.min(Math.max(Math.round(item.score), 1), 100),
          rawScore: trait.rawScore
        };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null);

    if (selected.length >= 1) return selected;
    throw new Error('No valid traits from AI');

  } catch (error) {
    console.error('Trait AI analysis failed, using fallback:', error);
    // Fallback: return only traits ≥70%
    const fallback = allTraits.filter(t => t.score >= 70);
    if (fallback.length > 0) return fallback;
    // If no traits ≥70%, return top 1
    return allTraits.slice(0, 1);
  }
}

// Find the top character candidates based on scores
function findTopCandidates(scores: Record<string, number>, limit = 3): typeof characterProfiles {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => characterProfiles.find(p => p.id === id)!)
    .filter(Boolean);
}

async function selectWinnerWithAI(candidates: typeof characterProfiles, personalInfo: any, stylePrefs: any, topTraitsList: string[]) {
  const systemPrompt = `Du bist ein psychologischer Analyst für eine Dating-App. Deine Aufgabe ist es, den am besten passenden Charakter-Typ für einen Nutzer aus einer Liste von Top-Kandidaten auszuwählen.
  
  NUTZER-PROFIL:
  - Top-3 Persönlichkeits-Facetten: ${topTraitsList.join(', ')}
  - Selbstbeschreibung: ${Array.isArray(stylePrefs.tone) ? stylePrefs.tone.join(', ') : stylePrefs.tone}
  - Persönliche Infos: ${JSON.stringify(personalInfo)}

  KANDIDATEN (Wähle GENAU EINEN aus dieser Liste):
  ${candidates.map(c => `- ${c.name} (ID: ${c.id}): ${c.description}`).join('\n')}

  DEINE AUFGABE:
  Analysiere die Kandidaten und das Nutzerprofil. Welcher Charakter-Typ passt qualitativ am besten zu der Person?
  Antworte NUR mit der ID des Gewinners (z.B. "mind_architekt"). Nichts anderes.`;

  try {
    if (!OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API key (set OPENAI_API_KEY)");
    }
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
        max_tokens: 10,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Winner selection failed (${response.status}): ${errorText}`);
    }
    const result = await response.json();
    const winnerId = result.choices[0].message.content.trim().toLowerCase();

    // Fallback if AI gives invalid ID
    return candidates.find(c => c.id === winnerId) || candidates[0];
  } catch (error) {
    console.error('Error in selectWinnerWithAI:', error);
    return candidates[0]; // Fallback to highest score
  }
}

function getRandomPromptSamples(prompts: string[], n = 3): string {
  if (!prompts || prompts.length === 0) return 'Keine Referenz verfügbar.';
  const shuffled = [...prompts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n).join('\n\n---\n\n');
}

async function generateProfile(data: any, topTraitsList: string[]) {
  const { answers, personalInfo, stylePrefs, winnerCharacter } = data;

  // Get zodiac info if available
  const zodiacInfo = personalInfo.zodiac ? getZodiacByName(personalInfo.zodiac) : null;
  const zodiacPromptSection = zodiacInfo
    ? `\n  STERNZEICHEN-INFORMATIONEN (als subtile Einflüsse nutzen, NICHT im Text erwähnen):\n  ${formatZodiacForPrompt(zodiacInfo)}\n`
    : '';

  const referenceTexts = getRandomPromptSamples(winnerCharacter.profile?.datingProfilePrompts, 3);

  const systemPrompt = `Du bist ein professioneller Dating-Coach und Profil-Optimierer. Deine Aufgabe ist es, einen exzellenten Dating-Profiltext für den Nutzer zu schreiben.

  WICHTIGES KONTEXT-WISSEN:
  - Der dominante Charakter-Typ des Nutzers ist: "${winnerCharacter.name}" (${winnerCharacter.id})
  - Die Top-3 Persönlichkeits-Facetten (basierend auf der Analyse) sind: ${topTraitsList.join(', ')}
  - Das Sternzeichen ist "${personalInfo.zodiac}" - erwähne es NIEMALS direkt im Text, nutze es nur als subtilen psychologischen Einfluss.
  - Gewählte Selbstbeschreibungs-Attribute: ${Array.isArray(stylePrefs.tone) ? stylePrefs.tone.join(', ') : stylePrefs.tone}
  ${zodiacPromptSection}

  DETAILS ZUM CHARAKTER UND REFERENZ-TEXTE (als Inspiration, NICHT kopieren):
  ${winnerCharacter.profile?.description || ''}
  ${referenceTexts}

  REGELN FÜR DAS ERGEBNIS:
  REGELN FÜR DAS ERGEBNIS:
  1. Schreibe EINEN Profiltext mit ca. 6 Sätzen.
  2. KEINE Bindestriche am Anfang von Sätzen.
  3. KEINE Emojis.
  4. ABSOLUTES VERBOT für poetische oder metaphorische Sprache.
  5. Schreibe NICHT "Magie", "Abenteuer", "Reise", "Träume", "Nuancen".
  6. Orientiere dich STRENG an den "Top-3 Facetten" und dem "Charakter-Typ".
  7. Der Text muss klingen wie eine normale, bodenständige Person.
  8. Beispiel für guten Stil: "Ich bin ein rationaler Mensch, der gerne plant. In meiner Freizeit mache ich Sport."
  9. Beispiel für schlechten Stil: "In den Tiefen meiner Seele suche ich nach dem Echo der Ewigkeit."
  10. Integriere die Fakten aus der Umfrage (Werte, Eigenschaften) direkt in den Text.

  Geschlecht: ${personalInfo.genderIdentity === 'female' ? 'weiblich' : personalInfo.genderIdentity === 'male' ? 'männlich' : 'neutral'}
  `;

  const userPrompt = `Erstelle bitte einen perfekten "Über Mich" Profiltext für eine Dating-App.
  
  Persönliche Infos: ${JSON.stringify(personalInfo)}
  Charakter-Typ: ${winnerCharacter.name}
  Top-Facetten: ${topTraitsList.join(', ')}
  
  Antworte NUR mit dem Profiltext, ohne Anführungszeichen, ohne Einleitung, ohne "Hier ist dein Profil".`;

  try {
    if (!OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API key (set OPENAI_API_KEY)");
    }
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    return result.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    let isUnlimited = false;

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Missing or invalid JSON body' }, { status: 400 });
    }
    const { answers, personalInfo, stylePrefs } = body;

    // 1. Calculate character scores
    const scores = calculateCharacterScores(answers);

    // 2. AI-powered trait analysis: picks the 3 most genuine traits with honest percentages
    const topTraits = await analyzeTraitsWithAI(scores);
    const topTraitsList = topTraits.map(t => t.name);

    // 3. Find top character candidates and let AI pick the final winner
    const candidates = findTopCandidates(scores, 3);
    const winnerProfile = await selectWinnerWithAI(candidates, personalInfo, stylePrefs, topTraitsList);

    const winnerCharacter = {
      id: winnerProfile.id,
      name: winnerProfile.name,
      profile: winnerProfile
    };

    // Generate the profile text using AI
    const profileText = await generateProfile({ answers, personalInfo, stylePrefs, winnerCharacter }, topTraitsList);

    const profileResult = {
      characterName: winnerCharacter.name,
      characterId: winnerCharacter.id,
      profileText: profileText,
      scores: scores,
      topTraits: topTraits // Send calculated top traits to frontend
    };

    // Save result to Clerk metadata if authenticated
    if (userId) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const unlimitedEmail = "tricksterjadon@gmail.com";
      isUnlimited = user.primaryEmailAddress?.emailAddress?.toLowerCase() === unlimitedEmail;
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          surveyCompleted: true,
          lastResult: profileResult,
          createdAt: new Date().toISOString(),
          regenerationCount: isUnlimited ? (user.publicMetadata as any)?.regenerationCount || 0 : 0,
          surveyData: { personalInfo, stylePrefs, answers }
        }
      });
    }

    return NextResponse.json({ profile: profileResult, isUnlimited });
  } catch (error) {
    console.error('CRITICAL: Error in /api/analyze:', error);
    return NextResponse.json({
      error: 'Analysis failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'POST endpoint active' }, { status: 405 });
}
