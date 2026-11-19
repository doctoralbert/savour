# Opdracht voor Claude: de hele website bijwerken en uitbreiden

Kopieer alles onder de streep naar Claude Code. Heb je beelden gemaakt met `docs/beelden-gemini-2.md`? Zet ze dan
eerst in één map (bijvoorbeeld je Downloads) en zeg Claude waar ze staan. Ontbreekt een beeld, dan houdt die pagina
haar huidige foto.

---

Werk in de Savour-repository, tak `concepten`, volgens CLAUDE.md (kernwaardes, technische afspraken en "Werkwijze bij
elke wijziging"). Doel: **alle publieke pagina's en alle blogposts** van savour.page bijwerken en uitbreiden, zodat ze
vertellen wat Savour nu is en kan, en waar het naartoe gaat. Veel pagina's en oudere blogs stammen van vóór de
allergenen, de MEP-lijsten, de nieuwe doelgroepen en "Savour leert", en sommige beloven of missen dingen. Daarnaast
krijgt elke pagina en blog een eigen foto.

## Harde regels
- **Alleen wat Savour echt doet.** Controleer elke bewering in de code voordat je hem schrijft (bijvoorbeeld
  `js/features/scale.js`, `mep.js`, `products.js`, `print.js`, `import.js`, `recipe-reader.js`, `pro.js` en de
  SQL in `supabase/`). Geen verzonnen functies, klanten, citaten, cijfers, statistieken of datums. Toekomst alleen
  zoals op Binnenkort staat, zonder datum. Bij twijfel weglaten.
- **Bestaande adressen blijven werken**: hernoem geen slugs. Nieuwe pagina's alleen als ze echt nodig zijn.
- **Vijf talen** (nl, en, de, es, fr), elke taal even goed; recepten en namen van gebruikers worden nooit vertaald.
- **Titels maximaal 60 tekens**, beschrijvingen 140–160 tekens; geen dubbele titels.
- Geen naam of gezicht van de eigenaar, geen gezichten in beeld, geen merknamen.
- Interfacetekst via `tools/vertalingen.mjs` en `tools/vertalingen-fr.mjs`, daarna
  `node tools/build-i18n.mjs && node tools/build-seo.mjs`.
- Regeleinden gelijk houden **alleen voor tekstbestanden** (nooit afbeeldingen door sed halen).
- Werk in delen. Commit en zet elk deel op `savour-3` en vraag de eigenaar per deel of het live mag.

## Wat Savour nu is (controleer in de code; gebruik dit als checklist, niet als tekst om over te nemen)
- **Receptenboek voor de professionele keuken**, op laptop, tablet en telefoon, ook offline (eenmaal geopend), te
  zetten op het beginscherm, in vijf talen, donker en licht thema, kookmodus met grote letters en scherm aan.
- **Importeren**: de eigen Savour-lezer leest Word, PDF, tekst, webpagina's, ChatGPT-opmaak en exports van
  recepten-apps gratis; alleen bij twijfel, en met Pro, leest de AI (ook foto's van handgeschreven recepten en
  scans). De kok ziet alles vóór opslaan; twijfel staat geel; Savour verzint nooit iets; niets raakt kwijt (elk
  bestand en elk AI-resultaat wordt bewaard en opnieuw aangeboden); dubbele recepten krijgen een keuze.
- **Ordenen**: mappen, categorieën (cocktails en soepen vanzelf goed ingedeeld), A–Z, zoeken op titel, ingrediënt en
  bereiding, favorieten, archief.
- **Omrekenen**: snelknoppen, eigen factor, opbrengst, "Ik heb … van een ingrediënt"; eenheden binnen een familie
  (tl/el/cups, g/kg, ml/l, oz/lb, oz bij een drank blijft oz), dashes en barspoons, enkelvoud en meervoud
  ("2 sjalotten"); het origineel verandert nooit.
- **Allergenen** (Pro): Savour vult ze zelf in uit de Savour-lijst (vijf talen, afgeleide vormen, ook bloem uit
  buitenlandse recepten), telt ze op via basisrecepten, toont "kan per merk verschillen", zegt nooit "allergeenvrij"
  zolang niet alles is nagekeken, extra's (lactose, alcohol enz.) zelf aan te zetten, allergenenkaart, op de print.
- **MEP-lijsten** (maken en beheren met Pro, afvinken voor iedereen): per post kaarten → kopjes → onderdelen,
  couverts per kaart, live afvinken met naam en tijd, offline, kookmodus, Lijst leegmaken, printen op één A4 staand
  of liggend zonder datum en couverts, importeren uit Excel/Word/tekst/foto, ook op het keukenteam-scherm.
- **Printen**: los recept of hele map, omgerekend, met of zonder allergenen, met het logo van je zaak (Pro).
- **Keukenteams**: eigenaar, bewerkers, kijkers; meekijken, printen en omrekenen gratis; toevoegen en bewerken met
  Pro; een team werkt zolang de eigenaar Pro heeft, daarna op slot maar bewaard.
- **Savour leert**: wat koks verbeteren (lezer, allergenen, MEP) maakt Savour beter; elke avond een controle; de
  beheerder zet lessen pas aan na nakijken. Alleen met "Help de Savour-lezer verbeteren".
- **Community**: forum voor elk account, naam uit het profiel, nooit e-mail.
- **Prijzen** (uit `js/features/pro.js`): gratis tot 100 recepten; Pro €2,99 p/m of €29 p/j (150 AI-imports per
  maand); proefweek 7 dagen Pro (15 AI-imports, tot 100 recepten); organisaties 5/10/25 plekken voor
  €8,99/€14,99/€29,99 p/m; wie stopt houdt alles. Import service: zie `tools/site-service.mjs`.
- **Doelgroepen**: koks, patissiers en banketbakkers, keukenbrigades, cateraars en eventbedrijven, bartenders en
  barista's.
- **Toekomst** (alleen wat op Binnenkort staat): foodcost calculator, menu engineering, geschiedenis van elk recept,
  mogelijk een eigen app. Geen datums.

## Wat je doet

### 1. Inventaris (eerst, geen wijzigingen)
Maak een lijst van alle publieke pagina's en blogs in vijf talen (bronnen: `tools/site-*.mjs`, `tools/handleiding/`,
`public-pages.js`, de Pro-pagina in `js/features/pro.js`). Noteer per pagina: wat klopt niet meer, wat ontbreekt
(bijvoorbeeld allergenen, MEP-lijsten, doelgroepen, Savour leert, offline, dubbele recepten), welke links naar nieuwe
pagina's en blogs erbij horen, en welke foto er nu staat. Laat de lijst aan de eigenaar zien voordat je begint.

### 2. Functie- en voor-wiepagina's
Digitaliseren, Organiseren, Receptendatabase, Delen, Opschalen, Printen, Allergenen, MEP-lijsten, Import service,
Binnenkort, Koks, Keukenbrigades (en kijk Patisserie, Catering en Bartenders na). Per pagina: secties uitbreiden waar
het iets toevoegt (geen opvulling), voordelen, vragen, en echte schermen uit de app waar ze helpen (maak ze uit de
demo zoals de scripts voor de bar-, patisserie- en cateringschermen; nooit iets aan de echte demo toevoegen).
Verwijs naar elkaar waar het logisch is.

### 3. Homepage, Over, Prijzen, Veelgestelde vragen, App, Contact
Homepage: "Wat Savour doet" volledig, doelgroepen, prijzen, vragen. Over: het verhaal klopt, maar vul aan met wat
Savour nu kan. Prijzen: vergelijking compleet (allergenen, MEP, organisaties, proefweek). FAQ: alle vragen
nalopen en aanvullen (MEP, allergenen, doelgroepen, offline, dubbele recepten, wat er gebeurt als je stopt).

### 4. Handleiding (alle hoofdstukken, vijf talen)
Elke handleidingpagina naast de app leggen: kloppen de knopnamen (in elke taal zoals in de app), ontbreken functies
(allergenen, MEP-lijsten, dubbele recepten, Savour leert, keurmerk niet), en zijn de stappen nog juist. Werk ook de
release notes bij met wat er sinds de laatste versie live ging.

### 5. Alle blogposts
Loop elke blog na: verouderde zinnen weg, nieuwe mogelijkheden erbij waar ze bij het onderwerp passen, links naar de
nieuwe pagina's en blogs, en waar het past een "In het kort", stappen, een tip of een echt scherm. Cijfers en
bronnen alleen houden als ze kloppen (bron en jaartal nakijken); nooit nieuwe cijfers verzinnen.

### 6. Foto's
Gebruik de beelden uit `docs/beelden-gemini-2.md` (bestandsnamen staan erbij met de plek waar ze komen):
1. Zet elk origineel in `beelden-origineel/keuken/` (witte strook met bestandsnaam onderaan eraf, formaat
   1584×672) en draai `node tools/keurmerk.mjs`.
2. Voeg ze toe aan `PHOTOS` (en `PHOTO_ALT` in vijf talen voor duo-foto's) in `tools/build-seo.mjs`.
3. Pagina's: `PAGE_PHOTO`; voor-wiepagina's ook een duo (`AUDIENCE_DUO`); blogs: `photo` in de blogdefinitie of via
   de vaste rij (`BLOG_PHOTOS`). Handleidingpagina's: één foto per hoofdstuk.
4. Controleer elk beeld bovenaan in donker en licht op laptop- en telefoonbreedte: het onderwerp mag niet achter de
   titel verdwijnen; pas zo nodig de positie aan in `PHOTOS`.

### 7. Vindbaarheid
`llms.txt`, schema.org in `index.html`, beschrijvingen en titels, interne links, `sitemap.xml` (via build-seo). Na
live: `npm run indexnow`.

### 8. Afronden per deel
`npm run format`, `node tools/build-i18n.mjs && node tools/build-seo.mjs`, `npm run test:lezer`,
`npm run test:schaal`, `npm run test:mep` (alles moet slagen), elke gewijzigde pagina bekijken in donker en licht op
laptop en telefoon, controleren dat alle afbeeldingen heel zijn, Nederlandse commit, `git push origin concepten
concepten:savour-3`, en de eigenaar vragen of het live mag.
