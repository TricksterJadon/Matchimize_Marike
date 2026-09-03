# Matchimize – Marike

Eigenständige Version der Matchimize-Anwendung mit den für Marikes Projekt angepassten Texten.

## Lokal starten

Voraussetzungen: Node.js und npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Anschließend ist die Anwendung unter [http://localhost:3000](http://localhost:3000) erreichbar.

Für die vollständige Funktion müssen in `.env.local` eigene Schlüssel für Clerk und OpenAI eingetragen werden. Die Datei wird durch `.gitignore` nicht versioniert.

## Prüfen

```bash
npm run build
```
