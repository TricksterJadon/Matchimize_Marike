# Matchimize – Projektdokumentation

## 1) Projektüberblick

**Matchimize** ist eine Webanwendung zur Optimierung von Dating-Profilen. Nutzer:innen durchlaufen zunächst einen kurzen Vorteaser und danach eine ausführliche Analyse. Aus den Antworten wird ein Persönlichkeitsprofil berechnet und mit KI zu einem konkreten Dating-Profiltext verarbeitet.

Die Anwendung ist technisch als **Next.js App Router** Projekt umgesetzt und kombiniert:
- Frontend-Seiten für Landing, Fragebögen und Ergebnisansicht
- API-Routen für Analyse, Profilabruf und Text-Generierung
- Datenmodule für Fragen, Charakterprofile und Trait-Mapping
- Authentifizierung über Clerk
- KI-Aufrufe (OpenAI API) für Auswahl/Verfeinerung des finalen Profiltexts

---

## 2) Tech-Stack und wichtige Abhängigkeiten

Laut `package.json` basiert das Projekt auf:

- **Framework:** Next.js 16 (`next`)
- **UI:** React 19, TailwindCSS 4, Radix UI, Lucide Icons
- **Animation:** Framer Motion
- **Auth:** Clerk (`@clerk/nextjs`)
- **Validierung/Formen:** Zod, React Hook Form (teilweise vorbereitet)
- **Charts/UI-Helfer:** Recharts, Sonner, CVA, clsx
- **Sprache:** TypeScript

Scripts:
- `npm run dev` – lokale Entwicklung
- `npm run build` – Produktion bauen
- `npm run start` – Produktionsserver starten
- `npm run lint` – Linting

---

## 3) Projektstruktur (High-Level)

- `src/app/` – Seiten (App Router), Layout und API-Routen
- `src/components/` – wiederverwendbare UI- und Fachkomponenten
- `src/data/` – statische Datenquellen (Fragen, Charakterprofile, Mapping)
- `src/lib/` – Utility/Storage-Helfer
- `src/middleware.ts` – Clerk Middleware für Auth/Route-Schutz
- `public/` – statische Assets
- `scripts/` – Hilfsskripte (z. B. Verifikation)

---

## 4) Seiten und User Flow

### 4.1 Landing Page
- Datei: `src/app/page.tsx`
- Zweck:
  - Einstiegspunkt mit Markenbotschaft und CTA
  - Verlinkung zu Vorteaser und Informationssektionen
  - Wenn eingeloggt, direkter Sprung zum Profil möglich

### 4.2 Vorteaser (Schritt 1)
- Datei: `src/app/vorteaser/page.tsx`
- Zweck:
  - Kurzer 6-Fragen-Check mit Punktebewertung
  - Ergebnisanzeige als Prozentwert (Optimierungspotenzial)
  - Login-/Signup-Trigger via Clerk
  - Übergang zur ausführlichen Analyse (`/survey`)

### 4.3 Survey (Schritt 2)
- Datei: `src/app/survey/page.tsx`
- Zweck:
  - Erhebung von Basisdaten (Name, Geburtsdatum, Identität)
  - Dynamischer Fragenabruf über `/api/questions`
  - Ermittlung des Sternzeichens aus Geburtsdatum
  - Versand aller Antworten an `/api/analyze`
  - Verarbeitung des Analyseergebnisses und Aktualisierung der Session/UI

### 4.4 Profilseite (Ergebnis)
- Datei: `src/app/profile/page.tsx`
- Zweck:
  - Lädt gespeichertes Ergebnis über `/api/profile`
  - Zeigt Charaktertyp, Top-Eigenschaften und finalen Profiltext
  - Unterstützt Kopieren des Textes in die Zwischenablage
  - Behandelt Zustände wie „nicht eingeloggt“, „kein Ergebnis“ oder „Ergebnis abgelaufen“

---

## 5) API-Architektur

### 5.1 `POST /api/analyze`
- Datei: `src/app/api/analyze/route.ts`
- Kernlogik:
  1. Entgegennahme von `answers`, `personalInfo`, `stylePrefs`
  2. Score-Berechnung pro Charakter-Typ anhand Frage-Mapping
  3. Ermittlung von Top-Kandidaten
  4. KI-gestützte Gewinnerauswahl unter den Kandidaten
  5. KI-Generierung des finalen Dating-Profiltexts
  6. Persistenz im Clerk `publicMetadata` (falls eingeloggt)
- Antwort enthält u. a.:
  - Charaktername/-ID
  - generierten Profiltext
  - Score-Daten und Top-Traits

### 5.2 `GET /api/profile`
- Datei: `src/app/api/profile/route.ts`
- Zweck:
  - Abruf des zuletzt gespeicherten Analyseergebnisses aus User-Metadaten
  - Prüfung auf Ablaufzustände (z. B. zeitliche Begrenzung)

### 5.3 Weitere API-Routen
- `src/app/api/questions/route.ts` – liefert Fragenpool
- `src/app/api/generate-summary/route.ts` – erzeugt Zusammenfassung
- `src/app/api/regenerate/route.ts` – erneute Generierung/Variation

---

## 6) Datenmodell und fachliche Bausteine

### 6.1 Fragenpool
- Datei: `src/data/questions_pool.ts`
- Enthält:
  - Fragen mit IDs
  - Zuordnung zu Charakter-/Trait-IDs
  - Grundlage für Score-Berechnung in der Analyse

### 6.2 Charakterprofile
- Datei: `src/data/character_profiles.ts`
- Enthält:
  - Profildefinitionen pro Charaktertyp
  - Beschreibungen und Prompt-Bausteine zur KI-Generierung

### 6.3 Trait-Mapping
- Datei: `src/data/trait_mapping.ts`
- Enthält:
  - Anzeigenamen der Traits
  - Maximalwerte für Normalisierung/Prozentdarstellung

### 6.4 Sternzeichen-Logik
- Datei: `src/data/zodiac_signs.ts`
- Nutzung:
  - Sternzeichen wird aus Geburtsdatum ermittelt
  - In Prompting als subtiler Einfluss nutzbar (nicht explizit im Ergebnistext)

---

## 7) Authentifizierung und Session-Bezug

- Auth-Provider: Clerk
- Zentrale Integration im Root-Layout (`ClerkProvider`)
- Middleware (`src/middleware.ts`) aktiviert Clerk für App-/API-Routen
- Profil- und Ergebnisdaten werden in Clerk User-Metadaten gespeichert
- Seitenlogik berücksichtigt Auth-Zustände (`isLoaded`, `user`, `isSignedIn`)

---

## 8) Frontend-Komponenten

### 8.1 Fachkomponenten
- `src/components/ai-summary.tsx`
- `src/components/dating-profile.tsx`
- `src/components/survey-form.tsx`
- `src/components/loading-screen.tsx`
- `src/components/LandingProfile.tsx`

### 8.2 UI-Bausteine
- `src/components/ui/*`
- Enthält wiederverwendbare primitives wie Button, Card, Input, RadioGroup, Progress etc.

Ziel der Struktur:
- Klare Trennung zwischen Seitenlogik (`src/app/*`) und UI-Bausteinen (`src/components/*`)
- Wiederverwendung und konsistente Gestaltung

---

## 9) Persistenz- und Speicherstrategie

Es existieren zwei Ebenen:

1. **Serverseitig/Account-gebunden:**
   - Speicherung von Analyseergebnissen in Clerk `publicMetadata`
   - Relevant für geräteübergreifenden Zugriff nach Login

2. **Clientseitig (Browser):**
   - Hilfsfunktionen in `src/lib/survey-storage.ts` für LocalStorage-Zugriff
   - Eher als ergänzende/legacy-nahe Utility-Schicht

---

## 10) Styling und UX-Ansatz

- TailwindCSS + Radix UI als Basis
- Moderne, card-basierte Oberfläche
- Fortschrittsanzeigen und schrittweiser Flow
- Mikrointeraktionen (Animationen via Framer Motion)
- Fokus auf einfache Conversion-Pfade: Landing → Vorteaser → Survey → Ergebnis

---

## 11) Konfiguration und Umgebungsvariablen

Wichtige Konfigurationsdateien:
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`

Erwartete Secrets/ENV (aus Code ableitbar):
- `OPENAI_API_KEY` für KI-Generierung
- Clerk-Keys (projektabhängig, in `.env` hinterlegt)

Hinweis: Ohne korrekt gesetzte ENV-Werte funktionieren Auth- und KI-Features nicht vollständig.

---

## 12) Aktueller Zustand der Dokumentation

- Die bisherige `README.md` ist noch stark generisch (Standard-Next.js-Text).
- Diese Datei ergänzt die fehlende fachliche Projektdokumentation und beschreibt:
  - Architektur
  - Datenfluss
  - Seitenlogik
  - API-Struktur
  - zentrale Module und Verantwortung

---

## 13) Empfohlene nächste Dokumentationsschritte

Für noch bessere Wartbarkeit:
- Sequenzdiagramm für den End-to-End-Flow ergänzen
- Datenverträge (Request/Response) pro API-Route tabellarisch dokumentieren
- Fehlerfälle und Retry-Strategien beschreiben
- Berechtigungs-/Rollenmodell für Auth-Flows explizit festhalten
- Deployment- und Monitoring-Guide ergänzen

---

## 14) Kurz-Zusammenfassung in Stichpunkten

- Ziel: KI-gestützte Optimierung von Dating-Profiltexten
- Kernflow: Landing → Vorteaser → Survey → Analyse → Profilanzeige
- Tech: Next.js + React + TypeScript + Tailwind + Clerk + OpenAI
- Datenquellen: Fragenpool, Charakterprofile, Trait-Mapping, Sternzeichenlogik
- Persistenz: Clerk-Metadaten (serverseitig), teils LocalStorage-Helfer
- API-Kern: `/api/analyze` berechnet Scores und erzeugt den finalen Text
- Ergebnisseite zeigt Charaktertyp, Top-Traits und kopierbaren Profiltext
