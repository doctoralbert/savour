# Opdracht voor Claude: nieuwe doelgroepen (patissiers en banketbakkers, cateraars, barista's)

Kopieer alles onder de streep naar Claude Code. Zet eerst de foto's uit `docs/beelden-gemini.md` (nummers 7 t/m 16)
in `assets/keuken/` met precies de bestandsnamen die daar staan. Ontbreekt een foto, dan slaat Claude die plek over
en meldt dat.

---

Werk in de Savour-repository, tak `concepten`, volgens CLAUDE.md (kernwaardes, technische afspraken en "Werkwijze bij
elke wijziging"). Doel: Savour duidelijk neerzetten voor drie doelgroepen naast koks en keukenbrigades, op dezelfde
manier als de pagina en de blog voor bartenders (voorbeeld: `tools/site-bar.mjs`, `tools/site-blog-bar.mjs` en hoe ze in
`tools/build-seo.mjs` gekoppeld zijn). Alles in vijf talen (nl, en, de, es, fr), in de huisstijl, gecontroleerd in het
donkere en het lichte thema, op telefoon én laptop.

## Harde regels
- **Alleen wat Savour echt doet.** Controleer elke bewering in de code (bijv. `js/features/scale.js`,
  `js/features/mep.js`, `js/features/products.js`, `js/features/print.js`, de prijzen in `js/features/pro.js`). Geen
  verzonnen functies, klanten, citaten, cijfers of beloftes. Een team heet in de app "keukenteam": zeg dat eerlijk.
- **Bestaande adressen blijven werken.** Hernoem geen slugs; nieuwe pagina's krijgen nieuwe slugs.
- Geen gezichten van mensen, geen naam of gezicht van de eigenaar, geen merknamen in beeld.
- Nieuwe interfacetekst via `tools/vertalingen.mjs` en `tools/vertalingen-fr.mjs`; daarna
  `node tools/build-i18n.mjs && node tools/build-seo.mjs`.

## 1. Koks: patissiers eruit
Op de voor-wiepagina **Koks** (`tools/site-content.mjs` → AUDIENCES chefs, en de vertalingen in
`tools/site-content-extra.mjs`, `tools/site-pages-de.mjs`, `-es.mjs`, `-fr.mjs`, `tools/site-verdieping.mjs`,
`tools/site-verdieping-talen.mjs` en `tools/site-feature-rich.mjs`) staan patissiers en bonbons nu tussen de koks.
Haal patissiers daar weg in alle talen (menu, short, title, desc, lead, secties, voordelen, vragen). Verwijs onderaan in
één zin naar de nieuwe pagina voor patissiers en banketbakkers. De rest van de Koks-pagina blijft zoals hij is.

## 2. Nieuwe pagina: Patissiers en banketbakkers (samen één doelgroep)
- Bestand `tools/site-patisserie.mjs` (pagina + rich) en slugs: `voor-patissiers-en-banketbakkers`,
  `en/for-pastry-chefs-and-bakers`, `de/fuer-patissiers-und-konditoren`, `es/para-pasteleros-y-reposteros`,
  `fr/pour-patissiers-et-boulangers`. In het menu "Voor wie": na Koks.
- Inhoud (controleer alles in de code): een recept is een formule en blijft tot op de gram zoals je het schreef;
  omrekenen op stuks en opbrengst (bijv. van 50 financiers naar 800, ook naar een eigen opbrengst); basisrecepten
  (crème pâtissière, deeg, glaçage) koppelen zodat de allergenen meetellen; de 14 allergenen (ei, melk, gluten,
  noten veel voorkomend) met "kan per merk verschillen" bij chocolade en dergelijke; printen per recept of hele map,
  met logo (Pro); MEP-lijst voor de patisseriepost; importeren van oude schriften en Word-bestanden. Geen
  bakkerspercentages of kostprijs beloven (bestaat nog niet; kostprijs staat op Binnenkort).
- Schermen uit de app: maak ze uit de demo zoals `scratchpad`-scripts voor de barschermen deden (een recept openen,
  omrekenen), in vijf talen en beide thema's, naar `assets/app/[licht/]patisserie-*.jpg`, en zet ze in de lijst
  met lichte varianten in `tools/build-seo.mjs` (variabele N). Bruikbare demorecepten: `demo-financiers`,
  `demo-brioche`, `demo-brulee`, `demo-mousse`, `demo-marshmallow`. Voeg niets toe aan de echte demo.
- Foto's: `patisserie-hero.jpg` bovenaan; `patisserie-weegschaal.jpg` en `patisserie-viennoiserie.jpg` als duo in
  het midden.

## 3. Nieuwe pagina: Cateraars en eventbedrijven
- Bestand `tools/site-catering.mjs`, slugs: `voor-cateraars`, `en/for-caterers`, `de/fuer-caterer`,
  `es/para-catering`, `fr/pour-traiteurs`. In het menu na Keukenbrigades.
- Inhoud (controleer in de code): opschalen naar honderden gasten zonder rekenfouten; MEP-lijst per event of post met
  couverts per kaart (bijv. à la carte en banqueting naast elkaar), live afvinken met het team, offline, printen op
  één A4; allergenen per gerecht, ook via basisrecepten; één receptenboek voor alle koks en locaties via
  keukenteams; organisatieabonnementen (5/10/25 plekken, prijzen uit `js/features/pro.js`); recepten laten inladen
  (import service, `tools/site-service.mjs`).
- Schermen: de bestaande MEP-schermen (`mep-lijst`, `mep-bureau`, `mep-a4`) en een omgerekend recept uit de demo
  (bijv. de bisque of gazpacho naar 200 porties), vijf talen, beide thema's.
- Foto's: `catering-hero.jpg` bovenaan; `catering-buffet.jpg` en `catering-pass.jpg` als duo.

## 4. Bartenders worden "Bartenders en barista's"
- Pas de bestaande bartenderpagina aan (`tools/site-bar.mjs`), **slug blijft `voor-bartenders`**: menu en kop
  "Bartenders en barista's" (vertaald), en één nieuwe sectie voor barista's: siropen en specials, melkdranken,
  ml en oz omrekenen, allergenen van plantaardige melk (soja → soja, haver → gluten, amandel → noten) en melk.
  Controleer in `js/features/products.js` en met de Savour-lijst (`ingredient_list`, alleen lezen) dat havermelk,
  sojamelk, amandelmelk en koemelk de genoemde allergenen krijgen; klopt iets niet, meld het en schrijf een
  SQL-bestand dat de eigenaar zelf draait.
- Foto: `barista-hero.jpg` als duo met `barista-siropen.jpg` in de nieuwe sectie.

## 5. Een blog per doelgroep (vijf talen, zoals `tools/site-blog-bar.mjs`)
- "Savour voor patissiers en banketbakkers" en "Savour voor cateraars", met In het kort, stappen, een tip of
  waarschuwing waar het past, echte schermen en de nieuwe foto's (eigen foto bovenaan via `photo`).
- De bartenderblog krijgt één alinea over barista's met `barista-siropen.jpg`.
- Koppel blogs en pagina's aan elkaar (PAGE_POSTS en AUDIENCE_FEATURES in `tools/build-seo.mjs`).

## 6. Overal waar doelgroepen genoemd worden
Homepage, footer, menu "Voor wie", `llms.txt`, schema.org in `index.html`, de Over-pagina en de FAQ: noem de nieuwe
doelgroepen waar dat logisch is, zonder de pagina's te overladen.

## 7. Afronden
1. `npm run format`, `node tools/build-i18n.mjs && node tools/build-seo.mjs`, CRLF-regels gelijk houden.
2. `npm run test:lezer`, `npm run test:schaal`, `npm run test:mep`: alles moet slagen.
3. Bekijk elke nieuwe pagina en blog op laptop- en telefoonbreedte, donker en licht; titels maximaal 60 tekens.
4. Commit in het Nederlands, zet het op `savour-3` (`git push origin concepten concepten:savour-3`) en vraag mij of
   het live mag. Na live: `npm run indexnow`.
