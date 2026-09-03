import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { characterProfiles } from '@/data/character_profiles';
import { getZodiacByName, formatZodiacForPrompt } from '@/data/zodiac_signs';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = 'https://api.openai.com/v1';

async function generateProfile(data: any) {
  const { personalInfo, stylePrefs, winnerCharacter } = data;

  // Get zodiac info if available
  const zodiacInfo = personalInfo.zodiac ? getZodiacByName(personalInfo.zodiac) : null;
  const zodiacPromptSection = zodiacInfo
    ? `\n  STERNZEICHEN-INFORMATIONEN (als subtile Einflüsse nutzen, NICHT im Text erwähnen):\n  ${formatZodiacForPrompt(zodiacInfo)}\n`
    : '';

  const systemPrompt = `Du bist ein professioneller Dating-Coach und Profil-Optimierer. Deine Aufgabe ist es, einen exzellenten Dating-Profiltext für den Nutzer zu schreiben.
  
  WICHTIGES KONTEXT-WISSEN:
  - Der dominante Charakter-Typ des Nutzers ist: "${winnerCharacter.name}" (${winnerCharacter.id})
  - Das Sternzeichen ist "${personalInfo.zodiac}" - erwähne es NIEMALS direkt im Text, nutze es nur als subtilen psychologischen Einfluss.
  - Die gewählten Selbstbeschreibungen des Nutzers: ${Array.isArray(stylePrefs.tone) ? stylePrefs.tone.join(', ') : stylePrefs.tone}
  ${zodiacPromptSection}
  REFERENZ-PROFILTEXTE für diesen Charakter-Typ (als Inspiration, NICHT kopieren):
  ${winnerCharacter.profile?.datingProfilePrompt || 'Keine Referenz verfügbar.'}

  REGELN FÜR DAS ERGEBNIS:
  1. Schreibe EINEN Profiltext mit ca. 6 Sätzen.
  2. KEINE Bindestriche am Anfang von Sätzen.
  3. KEINE Emojis.
  4. Der Text muss perfekt auf den Nutzer, seinen Charakter-Typ und die subtilen Sternzeichen-Einflüsse zugeschnitten sein.
  5. Show, don't tell: Statt "Ich bin lustig", schreibe etwas Lustiges.
  6. Keine Floskeln ("Ich liebe Reisen").
  7. Humorvoll, charmant, authentisch.
  8. Schreibe in der Ich-Form.
  9. Schreibe einen NEUEN, ANDEREN Text als zuvor - sei kreativ und nutze andere Aspekte des Charakter-Typs.

  Geschlecht: ${personalInfo.genderIdentity === 'female' ? 'weiblich' : personalInfo.genderIdentity === 'male' ? 'männlich' : 'neutral'}
  `;

  const userPrompt = `Erstelle bitte einen NEUEN, EINZIGARTIGEN "Über Mich" Profiltext für eine Dating-App.
  
  Persönliche Infos: ${JSON.stringify(personalInfo)}
  Charakter-Typ: ${winnerCharacter.name}
  
  Antworte NUR mit dem Profiltext, ohne Anführungszeichen, ohne Einleitung, ohne "Hier ist dein Profil".`;

  try {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5.2',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 800,
        temperature: 0.9 // Higher temperature for more variety
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = user.publicMetadata as any;
    const unlimitedEmail = "tricksterjadon@gmail.com";
    const isUnlimited = user.primaryEmailAddress?.emailAddress?.toLowerCase() === unlimitedEmail;

    // Check if user has completed survey
    if (!metadata?.surveyCompleted || !metadata?.surveyData) {
      return NextResponse.json({ error: 'No survey data found' }, { status: 400 });
    }

    // Check regeneration limit
    const currentCount = metadata.regenerationCount || 0;
    if (!isUnlimited && currentCount >= 3) {
      return NextResponse.json({ error: 'Regeneration limit reached (3/3)' }, { status: 403 });
    }

    const { personalInfo, stylePrefs } = metadata.surveyData;
    const lastResult = metadata.lastResult;

    // Find the winner character profile
    const winnerProfile = characterProfiles.find(p => p.id === lastResult.characterId) || null;
    const winnerCharacter = {
      id: lastResult.characterId,
      name: lastResult.characterName,
      profile: winnerProfile
    };

    // Generate new profile text
    const profileText = await generateProfile({ personalInfo, stylePrefs, winnerCharacter });

    const newResult = {
      ...lastResult,
      profileText: profileText
    };

    const newCount = isUnlimited ? currentCount : currentCount + 1;

    // Update metadata
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...metadata,
        lastResult: newResult,
        regenerationCount: newCount
      }
    });

    return NextResponse.json({
      profile: newResult,
      regenerationCount: newCount
    });
  } catch (error) {
    console.error('Error regenerating profile:', error);
    return NextResponse.json({ error: 'Regeneration failed' }, { status: 500 });
  }
}
