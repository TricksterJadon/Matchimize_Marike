export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dateRange: string;
  nature: string[];
  strengths: string[];
  thinkingStyle: string[];
  emotional: string[];
  shadows: string[];
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: "widder",
    name: "Widder",
    symbol: "♈",
    dateRange: "21. März – 19. April",
    nature: ["Initiativstark", "Pioniergeist", "Tat- statt Denkmensch"],
    strengths: ["Mutig", "Durchsetzungsfähig", "Energiegeladen", "Selbstbewusst", "Ehrlich & direkt", "Führungsorientiert"],
    thinkingStyle: ["Impulsiv", "Ungeduldig", "Wettbewerbsorientiert", "Zielgerichtet"],
    emotional: ["Leidenschaftlich", "Temperamentvoll", "Verzeiht schnell", "Kindlich-ehrlich"],
    shadows: ["Reizbar", "Dominant", "Unbedacht"]
  },
  {
    id: "stier",
    name: "Stier",
    symbol: "♉",
    dateRange: "20. April – 20. Mai",
    nature: ["Beständig", "Erdverbunden", "Bewahrend"],
    strengths: ["Zuverlässig", "Geduldig", "Ausdauernd", "Willensstark", "Loyal", "Genussfähig"],
    thinkingStyle: ["Pragmatisch", "Langsam aber konsequent", "Sicherheitsorientiert", "Gewohnheitsliebend"],
    emotional: ["Tief empfindend", "Sinnlich", "Bindungsstark", "Emotional stabil", "Beschützend"],
    shadows: ["Stur", "Veränderungsresistent", "Besitzergreifend", "Träge", "Nachtragend"]
  },
  {
    id: "zwillinge",
    name: "Zwillinge",
    symbol: "♊",
    dateRange: "21. Mai – 20. Juni",
    nature: ["Beweglich", "Neugierig", "Vielseitig"],
    strengths: ["Kommunikativ", "Geistreich", "Flexibel", "Lernfähig", "Charmant"],
    thinkingStyle: ["Analytisch", "Schnell wechselnd", "Rational"],
    emotional: ["Leicht", "Distanzfähig", "Verspielt"],
    shadows: ["Unbeständig", "Oberflächlich wirkend", "Nervös", "Unentschlossen"]
  },
  {
    id: "krebs",
    name: "Krebs",
    symbol: "♋",
    dateRange: "21. Juni – 22. Juli",
    nature: ["Gefühlsbetont", "Fürsorglich", "Vergangenheitsverbunden"],
    strengths: ["Empathisch", "Loyal", "Aufopfernd", "Intuitiv", "Häuslich"],
    thinkingStyle: ["Intuitiv", "Vorsichtig", "Situationsabhängig"],
    emotional: ["Tief empfindsam", "Bindungsorientiert", "Launenhaft"],
    shadows: ["Überempfindlich", "Rückzugstendenz", "Klammernd", "Vergangenheitsfixiert"]
  },
  {
    id: "loewe",
    name: "Löwe",
    symbol: "♌",
    dateRange: "23. Juli – 22. August",
    nature: ["Selbstzentriert", "Ausdrucksstark", "Kreativ"],
    strengths: ["Charismatisch", "Großzügig", "Selbstsicher", "Motivierend", "Loyal"],
    thinkingStyle: ["Zielorientiert", "Entschlossen", "Selbstbestimmt"],
    emotional: ["Warmherzig", "Stolz", "Leidenschaftlich"],
    shadows: ["Eitel", "Dominant", "Empfindlich bei Kritik", "Theatralisch"]
  },
  {
    id: "jungfrau",
    name: "Jungfrau",
    symbol: "♍",
    dateRange: "23. August – 22. September",
    nature: ["Analytisch", "Pflichtbewusst", "Detailorientiert"],
    strengths: ["Zuverlässig", "Hilfsbereit", "Strukturiert", "Realistisch", "Diszipliniert"],
    thinkingStyle: ["Logisch", "Planend", "Optimierend"],
    emotional: ["Zurückhaltend", "Fürsorglich", "Sensibel"],
    shadows: ["Kritisch", "Perfektionistisch", "Verkopft", "Selbstzweifelnd"]
  },
  {
    id: "waage",
    name: "Waage",
    symbol: "♎",
    dateRange: "23. September – 22. Oktober",
    nature: ["Harmonieorientiert", "Beziehungsbezogen", "Ästhetisch"],
    strengths: ["Diplomatisch", "Charmant", "Gerecht", "Sozial", "Kooperativ"],
    thinkingStyle: ["Abwägend", "Vermittelnd", "Situationssensibel"],
    emotional: ["Partnerschaftlich", "Anpassungsfähig", "Romantisch"],
    shadows: ["Unentschlossen", "Konfliktscheu", "Abhängig von Bestätigung", "Oberflächlich wirkend"]
  },
  {
    id: "skorpion",
    name: "Skorpion",
    symbol: "♏",
    dateRange: "23. Oktober – 21. November",
    nature: ["Intensiv", "Tiefgründig", "Transformativ"],
    strengths: ["Willensstark", "Loyal", "Psychologisch", "Belastbar", "Fokussiert"],
    thinkingStyle: ["Strategisch", "Kontrollierend", "Instinktiv"],
    emotional: ["Leidenschaftlich", "Besitzergreifend", "Verschlossen"],
    shadows: ["Eifersüchtig", "Manipulativ", "Nachtragend", "Extrem"]
  },
  {
    id: "schuetze",
    name: "Schütze",
    symbol: "♐",
    dateRange: "22. November – 21. Dezember",
    nature: ["Freiheitsliebend", "Sinnsuchend", "Optimistisch"],
    strengths: ["Ehrlich", "Inspirierend", "Weitblickend", "Abenteuerlustig", "Ideenreich"],
    thinkingStyle: ["Intuitiv", "Zukunftsorientiert", "Ungebunden"],
    emotional: ["Begeisterungsfähig", "Unabhängig", "Herzlich"],
    shadows: ["Rücksichtslos ehrlich", "Unverbindlich", "Unruhig", "Naiv"]
  },
  {
    id: "steinbock",
    name: "Steinbock",
    symbol: "♑",
    dateRange: "22. Dezember – 19. Januar",
    nature: ["Pflichtbewusst", "Zielstrebig", "Ernsthaft"],
    strengths: ["Diszipliniert", "Zuverlässig", "Strategisch", "Ausdauernd", "Resilient"],
    thinkingStyle: ["Strukturiert", "Pragmatisch", "Hierarchisch"],
    emotional: ["Zurückhaltend", "Loyal", "Beschützend"],
    shadows: ["Kühl wirkend", "Kontrollierend", "Überernst", "Selbstüberfordernd"]
  },
  {
    id: "wassermann",
    name: "Wassermann",
    symbol: "♒",
    dateRange: "20. Januar – 18. Februar",
    nature: ["Unkonventionell", "Freiheitsorientiert", "Zukunftsbezogen"],
    strengths: ["Innovativ", "Humanitär", "Intellektuell", "Original", "Objektiv"],
    thinkingStyle: ["Abstrakt", "Unabhängig", "Experimentell"],
    emotional: ["Distanziert", "Freundschaftlich", "Idealistisch"],
    shadows: ["Unnahbar", "Stur im Denken", "Rebellisch", "Gefühlsvermeidend"]
  },
  {
    id: "fische",
    name: "Fische",
    symbol: "♓",
    dateRange: "19. Februar – 20. März",
    nature: ["Feinsinnig", "Grenzauflösend", "Spirituell"],
    strengths: ["Mitfühlend", "Kreativ", "Intuitiv", "Aufopfernd", "Anpassungsfähig"],
    thinkingStyle: ["Assoziativ", "Unstrukturiert", "Gefühlsgeleitet"],
    emotional: ["Romantisch", "Verletzlich", "Tief verbunden"],
    shadows: ["Realitätsflucht", "Abgrenzungsschwach", "Opferrolle", "Verwirrt"]
  }
];

// Helper to get zodiac info by German name
export function getZodiacByName(name: string): ZodiacSign | undefined {
  const normalized = name.toLowerCase();
  return zodiacSigns.find(z => z.name.toLowerCase() === normalized || z.id === normalized);
}

// Format zodiac info for AI prompt
export function formatZodiacForPrompt(zodiac: ZodiacSign): string {
  return `
Sternzeichen: ${zodiac.name} (${zodiac.dateRange})
Grundnatur: ${zodiac.nature.join(', ')}
Stärken: ${zodiac.strengths.join(', ')}
Denkstil: ${zodiac.thinkingStyle.join(', ')}
Emotionale Eigenschaften: ${zodiac.emotional.join(', ')}
Schattenseiten (subtil nutzen): ${zodiac.shadows.join(', ')}
  `.trim();
}
