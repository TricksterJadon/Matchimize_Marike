// maxScore = 5 (Fragen pro Archetyp, die /api/questions auswählt) × 5 (Likert-Skala 1–5) = 25.
// Der Fragenpool je Archetyp kann größer sein (z.B. 50), /api/questions zieht aber
// immer nur 5 zufällige Fragen daraus – das ist die Basis für maxScore, nicht die Poolgröße.
export const TRAIT_MAPPING: Record<string, { label: string; maxScore: number }> = {
  menschen_mensch: { label: "Geselligkeit", maxScore: 25 },
  kopf_mensch: { label: "Tiefgründigkeit", maxScore: 25 },
  herzens_mensch: { label: "Herzlichkeit", maxScore: 25 },
  gefuhls_mensch: { label: "Emotionalität", maxScore: 25 },
  erlebnis_mensch: { label: "Abenteuerlust", maxScore: 25 },
  erfahrungs_mensch: { label: "Pragmatismus", maxScore: 25 },
  kreativ_mensch: { label: "Kreativität", maxScore: 25 },
  visions_mensch: { label: "Visionäres Denken", maxScore: 25 },
};
