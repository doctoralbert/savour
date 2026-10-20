# Savour

Professioneel receptbeheer voor koks. Recepten komen binnen als tekst, Word-document of foto, worden met AI
gestructureerd en daarna door de kok gecontroleerd. Daarna kun je ze ordenen in mappen, printen, omrekenen en
delen met je keukenteam.

## Lokaal starten

1. Installeer [Node.js](https://nodejs.org) (LTS).
2. Zet je geheime sleutels in een bestand `.env` (zie `.env.example`). Dat bestand gaat nooit mee in Git.
3. Dubbelklik `start_savour.bat`, of typ in deze map: `npm start`.
4. Open http://localhost:3000.

De knop "Bekijk de demo" op de landingspagina laadt 40 proefrecepten zonder iets op te slaan. Handig om snel iets te testen.

## Mappenstructuur

```
index.html            Alle schermen (HTML). Laadt de CSS en daarna de JavaScript-bestanden in vaste volgorde.
css/base.css          Basisopmaak: landingspagina, app-indeling, formulieren, admin, mobiel.
css/components.css    Receptenlijsten, mappen, gedeelde mappen, omrekenen. Latere regels winnen.
js/core/              Fundament: Supabase-verbinding, gedeelde toestand, hulpfuncties (esc, toast, compressPhoto).
js/data/              Bibliotheek laden uit de database, sessie opbouwen, dubbele recepten herkennen.
js/features/          Eén bestand per onderdeel van de app (bibliotheek, editor, import, mappen, gedeelde mappen, ...).
js/main.js            Opstarten. Wordt als laatste geladen.
api/                  Serverfuncties op Vercel: AI-import, bugmelding, admin-wachtwoordherstel.
tests/                Automatische regressietest (zie hieronder).
docs/                 E-mailsjabloon voor Supabase.
```

## Testen

De regressietest loopt in demomodus langs 30 schermen en vergelijkt van elk scherm de inhoud en de opmaak met
de vastgelegde meting in `tests/expected.json`. Zo zie je direct of een wijziging iets anders kapotmaakt.

Start de app lokaal en open **http://127.0.0.1:3000** (niet localhost: zo test je uitgelogd, los van je eigen account). Open de browserconsole (F12) en plak:

```js
await eval(await (await fetch('/tests/compare.js')).text())
```

`same` moet gelijk zijn aan `total`, en `errors` moet leeg zijn. De opmaakmetingen (`#stijl`) gelden voor de venstergrootte in `_venster` (1118×870); bij een ander formaat kunnen alleen die afwijken. Is een verschil bedoeld (je hebt een scherm
bewust veranderd)? Werk dan `tests/expected.json` bij en leg in de commit uit waarom.

## Code netjes houden

- `npm run format` zet alle code in dezelfde opmaak (Prettier).
- Pas een functie aan op de plek waar hij staat. Voeg geen "patch"-bestanden toe die een bestaande functie
  overschrijven: zo is v30 onoverzichtelijk geworden.
- Gebruikerstekst in HTML altijd via `esc(...)`; tekst als argument in `onclick="fn('...')"` via `escJs(...)`.

## Publiceren (Vercel)

Vercel publiceert de map zoals hij is; er is geen bouwstap. Zet in Vercel deze Environment Variables:
`OPENAI_API_KEY`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL` en optioneel `BUG_REPORT_TO` / `BUG_REPORT_FROM`.
