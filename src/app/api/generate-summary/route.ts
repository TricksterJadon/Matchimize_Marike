const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = "https://api.openai.com/v1";

export async function POST(request: Request) {
  try {
    const { data, type } = await request.json()

    let prompt = ""

    if (type === "profile") {
      const profile = data
      prompt = `Analysiere die folgenden Profilinformationen und verfasse daraus eine stilistisch ausbalancierte, professionell klingende Profilbeschreibung aus der ersten Person Singular. Beginne den Text mit „Ich bin [NAME], [ALTER] Jahre alt...“. Der Text soll den Charakter, die Stärken, Interessen und Beziehungswerte der Person authentisch, aber sachlich beschreiben, so wie es für ein seriöses Dating-Profil typisch ist.

Verwende eine gehobene, neutrale und natürliche Ausdrucksweise. Vermeide direkte Anreden, umgangssprachliche Formulierungen, Aufzählungen, Absätze, übertriebene Emotionalität, werbende Sprache, Coaching- oder Motivationselemente. Der Text soll fließend und in sich geschlossen sein, ohne sichtbare Strukturmerkmale oder Meta-Kommentare.

Strukturiere die Beschreibung inhaltlich, aber unsichtbar, nach diesen vier logischen Abschnitten:
1. Kurzprofil (zwei prägnante Sätze, die den Personentyp charakterisieren)
2. Persönliche Eigenschaften (Charakter, Stärken, Lebensstil)
3. Interessen und Freizeit (relevante Aktivitäten und Hobbys)
4. Beziehung und Werte (Beziehungsziele, Werte, Dealbreaker)

Verwende ausschließlich einen durchgehenden Fließtext ohne Listen, Überschriften, Trennzeichen oder Formatierungen.

Profil-Daten:
- Name: ${profile.name || "Keine Angaben"}
- Alter: ${profile.age || "Keine Angaben"}
- Geschlecht: ${profile.gender || "Keine Angaben"}
- Sucht nach: ${profile.lookingFor || "Keine Angaben"}
- Beziehungsziel: ${profile.relationshipGoal || "Keine Angaben"}
- Persönlichkeit: ${profile.personality?.join(", ") || "Keine Angaben"}
- Individuelle Persönlichkeit: ${profile.customPersonality?.join(", ") || "Keine Angaben"}
- Interessen: ${profile.interests?.join(", ") || "Keine Angaben"}
- Individuelle Interessen: ${profile.customInterests?.join(", ") || "Keine Angaben"}
- Lebensstil: ${profile.lifestyle || "Keine Angaben"}
- Werte: ${profile.values?.join(", ") || "Keine Angaben"}
- Dealbreaker: ${profile.dealbreakers?.join(", ") || "Keine Angaben"}
- Selbstbeschreibung: ${profile.selfDescription || "Keine Angabe"}

Wichtig: Gib ausschließlich die finale Profilbeschreibung im Fließtext aus, ohne zusätzliche Kommentare, Einleitungen oder Erklärungen.`
    } else {
      const { responses, stats } = data

      const topPersonality = stats.topPersonalityTraits?.[0]?.trait || "Keine Daten"
      const topInterest = stats.topInterests?.[0]?.interest || "Keine Daten"
      const topValue = stats.topValues?.[0]?.value || "Keine Daten"
      const topDealbreaker = stats.topDealbreakers?.[0]?.dealbreaker || "Keine Daten"

      prompt = `Du bist ein Experte für Dating-Trends und Datenanalyse. Analysiere die folgenden Dating-Umfrage-Ergebnisse und erstelle eine prägnante, professionelle Zusammenfassung auf Deutsch.

Statistiken:
- Gesamt-Teilnehmer: ${stats.totalResponses}
- Durchschnittsalter: ${stats.averageAge} Jahre
- Geschlechterverteilung: ${JSON.stringify(stats.genderBreakdown)}
- Sucht nach: ${JSON.stringify(stats.lookingForBreakdown)}
- Beziehungsziele: ${JSON.stringify(stats.relationshipGoalBreakdown)}
- Lebensstil-Verteilung: ${JSON.stringify(stats.lifestyleBreakdown)}
- Top Persönlichkeitsmerkmal: ${topPersonality} (${stats.topPersonalityTraits?.[0]?.percentage}%)
- Top Interesse: ${topInterest} (${stats.topInterests?.[0]?.percentage}%)
- Top Wert: ${topValue} (${stats.topValues?.[0]?.percentage}%)
- Top Dealbreaker: ${topDealbreaker} (${stats.topDealbreakers?.[0]?.percentage}%)

Erstelle eine strukturierte Trend-Analyse mit folgenden Punkten:
1. Allgemeine Übersicht (2-3 Sätze über die Teilnehmer-Gruppe)
2. Wichtigste Dating-Trends (3-4 Bullet Points mit konkreten Zahlen)
3. Persönlichkeits- und Interessens-Muster (was zeichnet die Gruppe aus)
4. Beziehungsziele und Werte (was suchen die Menschen)
5. Insights für Dating-Plattformen (2-3 konkrete Empfehlungen basierend auf den Daten)

Sei präzise, professionell und nutze die konkreten Zahlen und Prozentsätze aus den Statistiken.

Liefere ausschließlich die strukturierte Analyse ohne zusätzliche Kommentare.`
    }

    if (!OPENAI_API_KEY) {
      return Response.json({ error: "Missing OpenAI API key (OPENAI_API_KEY)" }, { status: 500 })
    }

    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5.2-chat-latest",
        messages: [
          { role: "system", content: "Du bist ein präziser deutscher Redakteur für Dating-Profile und Trendanalysen." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return Response.json({ error: `OpenAI API error (${response.status}): ${errorText}` }, { status: 500 })
    }

    const result = await response.json()
    const text = result.choices?.[0]?.message?.content?.trim()

    if (!text) {
      return Response.json({ error: "Empty response from OpenAI" }, { status: 500 })
    }

    return Response.json({ summary: text })
  } catch (error) {
    console.error("[v0] Error in generate-summary API:", error)
    return Response.json({ error: "Fehler beim Generieren der Zusammenfassung" }, { status: 500 })
  }
}
