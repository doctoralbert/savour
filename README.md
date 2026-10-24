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
index.html            Alle schermen van de app (HTML) plus de startpagina van de website (blok tussen SITE:START
                      en SITE:END, gemaakt door tools/build-seo.mjs). Laadt de CSS en daarna de JavaScript.
css/base.css          Basisopmaak: app-indeling, formulieren, admin, mobiel.
css/components.css    Receptenlijsten, mappen, gedeelde mappen, omrekenen. Latere regels winnen.
css/foundation.css    Knoppen, invoervelden en kleine teksten: overal hetzelfde.
css/app-style.css     De ingelogde app in de stijl van de website (koppen, logo, footer, camera).
css/site.css          Opmaak van de publieke website (startpagina en de pagina's in site/).
js/core/              Fundament: Supabase-verbinding, gedeelde toestand, hulpfuncties (esc, toast, compressPhoto).
js/data/              Bibliotheek laden uit de database, sessie opbouwen, dubbele recepten herkennen.
js/features/          Eén bestand per onderdeel van de app (bibliotheek, editor, import, mappen, gedeelde mappen, ...).
js/i18n/              Vertalingen (gemaakt door tools/build-i18n.mjs, niet met de hand aanpassen).
js/site.js            Kleine scripts voor de website (telefoonmenu, beweging bij scrollen).
js/data/offline.js    Offline in de keuken: bibliotheek op het toestel bewaren en openen zonder verbinding.
sw.js, manifest.webmanifest   Service worker (Savour opent ook zonder internet) en installeren op het beginscherm.
js/main.js            Opstarten. Wordt als laatste geladen.
api/                  Serverfuncties op Vercel: AI-import, Stripe (pro-checkout, pro-portal, stripe-webhook),
                      beheer (admin), teamuitnodiging, bugmelding. api/_lib/: gedeelde hulp (inlog, mail, Supabase).
assets/               Afbeeldingen: logo, deelafbeelding, app/ (echte app-schermen), kladjes/ en keuken/ (foto's).
site/                 GEMAAKT: alle losse websitepagina's (over ons, functies, blog, ...) in NL en EN.
                      Niet met de hand aanpassen; teksten staan in tools/site-*.mjs. vercel.json en
                      local-server.mjs laten /over-savour zien vanuit site/over-savour/.
                      site/index-en.html, index-de.html, index-es.html: de startpagina (met de app) per taal,
                      voor /en, /de en /es. index.html zelf is de Nederlandse.
tools/                Bouwscripts en bronteksten: build-seo.mjs (website), build-i18n.mjs (vertalingen),
                      site-content*.mjs, site-blog.mjs, site-kladje.mjs (teksten van de website).
supabase/             SQL-bestanden voor de database; overzicht en volgorde in supabase/README.md.
tests/                Automatische tests (lezer en regressietest, zie hieronder).
docs/                 Handleidingen en e-mailsjablonen.
robots.txt, sitemap.xml, llms.txt, ads.txt   Moeten in de hoofdmap staan (zoekmachines, AI, AdSense).
```

Afspraak: tijdelijke bestanden (proefjes, schermafbeeldingen) komen nooit in deze map. De test- en
livesite zijn geen aparte mappen maar twee takken in Git: `savour-3` (testversie) en `main` (savour.page).

## Testen

De regressietest loopt in demomodus langs 30 schermen en vergelijkt van elk scherm de inhoud en de opmaak met
de vastgelegde meting in `tests/expected.json`. Zo zie je direct of een wijziging iets anders kapotmaakt.

Start de app lokaal en open **http://127.0.0.2:3000** (een adres waar je niet bent ingelogd: zo test je los van je eigen account). Open de browserconsole (F12) en plak:

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
