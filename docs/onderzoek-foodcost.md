# Onderzoek: de foodcost calculator van Savour

Datum: 23 november 2026. Opdracht: `docs/opdracht-foodcost-calculator.md`. Dit document gaat eerst naar de eigenaar;
er komt geen code voordat hij akkoord geeft. Alle prijzen van concurrenten zijn zoals ze op 23-11-2026 op hun eigen
site stonden (of in een vergelijkingssite, dat staat er dan bij).

**In één alinea:** de gratis rekenhulpen (Apicbase, Qamarero, Lightspeed, Excel) laten de kok elk gerecht opnieuw
intypen en bewaren niets. De volwaardige pakketten (meez, Galley, Apicbase, Koust, Horeko) kunnen het wel, maar
kosten € 70 tot ruim € 200 per maand per vestiging, zijn gemaakt voor groepen met inkoop en voorraad, en zetten menu
engineering in het duurste pakket. Savour heeft de recepten, basisrecepten, eenheden en MEP-lijsten al. De kans: een
calculator die rekent met wat er al staat, nooit een ontbrekende prijs als € 0 telt, elk bedrag herleidbaar maakt, en
in Savour Pro zit (€ 2,99 per maand), niet in een pakket van € 100+.

---

## 1. Concurrenten en voorbeelden

### Apicbase (België) — gratis calculator + betaald platform

Bron: <https://get.apicbase.com/nl/foodcost-calculator/> en <https://get.apicbase.com/pricing/>, gelezen 23-11-2026.

- **Gratis calculator, invoer:** receptnaam, aantal borden, valuta; per ingrediënt naam, hoeveelheid, eenheid (kg, g,
  l, ml, stuk, oz, lb), prijs per eenheid en **opbrengst %**. Doelpercentage met een schuifje, of je huidige
  kaartprijs. Geen registratie.
- **Rekent uit:** totaal, kosten per portie, voorgestelde prijs (kosten ÷ doel %), foodcost % bij je eigen prijs.
  Voorbeeld op de pagina: 200 g ossenhaas à € 42/kg met 75% opbrengst = € 11,20. Afdrukken en CSV.
- **Onhandig:** niets wordt bewaard; elk gerecht en elk ingrediënt typ je opnieuw; geen prijslijst; geen menu; de
  pagina noemt halffabricaten, maar je kunt geen recept in een ander recept gebruiken. Een prijs per kilo en een
  recept in eetlepels gaat niet samen.
- **Betaald:** geen prijzen op de site, alles "Talk to our team". Pakketten Growth ("vanaf 5 vestigingen"),
  Professional, Enterprise; jaarlijks, maandelijks +15%. Wel: subrecepten, prijsontwikkeling, menu engineering,
  inkoop, voorraad, kassakoppeling. Gemaakt voor ketens.

### meez (VS) — receptenapp met kosten

Bron: <https://www.getmeez.com/pricing>, <https://www.getmeez.com/recipe-costing>, gelezen 23-11-2026.

- **Prijzen (per maand, jaarlijks / maandelijks):** Starter $19 / $24 (één kok: onbeperkt recepten, *basic* kosten,
  opbrengst en eenheden ingebouwd, margecalculator, 2 apparaten). Pro $89 / $119 (+ voorraad). Premium $179 / $199
  (+ prijzen elke dag uit facturen). Enterprise op maat: **menu engineering pas daar**.
- **Sterk:** 2.500+ ingrediënten met ingebouwde opbrengst en omrekening (stuk ↔ gram), subrecepten, rollen (eigenaar,
  bewerker, manager ziet inkoopprijzen, alleen-lezen).
- **Onhandig:** facturen automatisch inlezen pas vanaf $179; menu's en menu engineering alleen Enterprise; apparaten
  geteld; alleen VS en Canada; Engels. De "ingebouwde" opbrengsten zijn gemiddelden: de kok ziet niet altijd dat
  de prijs per portie op een aanname rust.

### Galley (VS) — receptenplatform voor grote keukens

Bron: <https://www.galleysolutions.com/>, <https://www.galleysolutions.com/pricing-test>, gelezen 23-11-2026
(de oude prijzenpagina gaf een 404).

- Licentie + vast bedrag per vestiging, alleen via een verkoper; enkel "Recipe Book" noemt een prijs ("vanaf $26 per
  vestiging" bij 401+ vestigingen). Kosten pas vanaf "Essentials", menu engineering vanaf "Optimize".
- Prijzen komen uit facturen (scannen, EDI). Gemaakt voor centrale keukens en ketens; niets voor een losse zaak.

### Koust (Frankrijk) — fiche technique en coût matière

Bron: vergelijking op <https://www.lafabriquedunet.fr/logiciel/koust>, gelezen 23-11-2026. De prijs-pdf van Koust
zelf was niet leesbaar.

- Fiches techniques met coût matière "en temps réel", inkoop, voorraad, verschil theoretisch/werkelijk, productie.
- Volgens de vergelijking ± € 80 per maand per vestiging (jaarlijks) of € 90 per maand; het pakket hangt af van het
  aantal facturen per maand. Frans georiënteerd.
- Andere Franse namen: RatioChef, Inpulse, Melba, Vermeil (<https://hackceleration.com/fr/labs/meilleur/logiciel-gestion-restaurant>).
  Les uit de Franse vergelijkingen: met een tableur moet "elke prijswijziging van de leverancier met de hand op elke
  fiche" — precies het probleem dat Savour oplost.

### Qamarero (Spanje) — escandallo

Bron: <https://qamarero.com/recursos/calculadora-gratuita-escandallo/> en
<https://qamarero.com/blog/mejores-software-escandallos-restaurantes/>, gelezen 23-11-2026.

- **Gratis calculator** (alleen met e-mailadres; het formulier laadde niet): ingrediënten met hoeveelheid, eenheid
  (kg, g, l, stuks) en prijs; aantal porties; **merma %**, arbeid in €, indirecte kosten %, btw; doelmarge en
  eventueel je huidige prijs. Voorbeeld: 1 kg à € 10, 650 g bruikbaar = 35% merma = € 15,38 per bruikbare kg.
- **Betaald:** escandallos met subrecepten, rendementen, allergenen, kosten per kanaal (zaal, bezorgen, afhalen) en
  een **waarschuwing als een prijs of hoeveelheid ontbreekt, zodat je geen onvolledige marge ziet** — goed idee, dat
  doet Savour ook.
- Onderdeel van een kassasysteem; alleen in de pakketten "Control" en "Total".

### Duitsland — Wareneinsatz en Kalkulation

Bronnen: <https://www.softguide.de/programm/gastrocalc>, <https://www.lightspeedhq.com/de/blog/wie-sie-die-richtigen-preise-fur-ihre-gastronomie-kalkulieren/>,
<https://www.hogapage.de/nachrichten/technik/kueche/richtig-kalkulieren-in-der-gastronomie>, gelezen 23-11-2026.

- Duitse koks spreken van **Wareneinsatz** (kosten van de grondstoffen) en rekenen met een **Kalkulationsfaktor**:
  "Wareneinsatz mal 4" (= 25% foodcost) is de gangbare vuistregel, die Metro zelf te grof noemt. Savour moet dus
  zowel een doelpercentage als een factor kunnen tonen (25% = factor 4).
- Software: GastroCalc (± € 299 eenmalig, Windows), Rezeptrechner PRO, Apro (prijs op aanvraag). Oud en desktop.
- Btw in Duitsland verschilt per situatie (19% / 7%): nog een reden om **altijd zonder btw** te rekenen.

### Nederland — Horeko, Kitchennmbrs, KHN

Bronnen: <https://kitchennmbrs.app/fr/versus/horeko>, <https://www.khn.nl/tools/menu-engineeringprogramma>,
<https://www.lightspeedhq.com/nl/blog/foodcost-berekenen/>, gelezen 23-11-2026.

- **Horeko** (Delft): volgens de vergelijking van Kitchennmbrs € 70–245 per maand excl. btw; recepturen, HACCP,
  bestellen. **Kitchennmbrs**: foodcost, recepten met afvalpercentage, HACCP.
- **KHN** heeft een menu-engineeringprogramma (Excel) voor leden: losse invoer, niet gekoppeld aan recepten.
- **Lightspeed** heeft een gratis foodcost calculator (na aanmelden) en noemt "maximaal 30% inkoopkosten" als richtlijn.

### Gratis Excel-sjablonen

Bronnen: <https://www.7shifts.com/resources/templates/restaurant-food-cost-template/>,
<https://www.roommaster.com/template/food-costing-template>, <https://www.jotform.com/table-templates/recipe-costing-template>,
de leerstof van het CIA (<https://ciachef.edu/wp-content/uploads/2024/07/kitchen-calculations.pdf>), gelezen 23-11-2026.

- Vaste opbouw: inkoopprijs (AP, *as purchased*), opbrengst %, prijs per bruikbare eenheid (EP = AP ÷ opbrengst %),
  hoeveelheid in het recept, kosten per regel, totaal, porties, prijs per portie, foodcost %.
- **Onhandig:** recept en blad staan los van elkaar (verandert het recept, dan klopt het blad niet meer); een lege
  prijscel telt als 0 en het totaal lijkt dan gewoon goed; formules raken stuk; niet te gebruiken op de telefoon.

### Samengevat

| | Invoer | Bewaart / gekoppeld aan recepten | Subrecepten | Prijslijst leverancier | Menu engineering | Kosten |
|---|---|---|---|---|---|---|
| Apicbase gratis | alles per gerecht intypen | nee | nee | nee | nee | gratis |
| Apicbase | platform | ja | ja | ja | ja | op aanvraag, vanaf 5 vestigingen |
| meez Starter | recepten | ja | ja | handmatig/sjabloon | nee (Enterprise) | $19–24 p/m |
| meez Premium | facturen | ja | ja | ja, uit facturen | nee (Enterprise) | $179–199 p/m |
| Galley | facturen/EDI | ja | ja | ja | vanaf Optimize | op aanvraag |
| Koust | facturen | ja | ja | ja | deels | ± € 80–90 p/m |
| Qamarero gratis | per gerecht, e-mail nodig | nee | nee | nee | nee | gratis |
| Horeko | recepturen | ja | ja | ? | ? | € 70–245 p/m |
| Excel | alles zelf | los | met moeite | kopiëren | eigen formules | gratis |
| **Savour (voorstel)** | **recepten die er al staan** | **ja** | **ja, automatisch** | **CSV/Excel, later pdf/foto** | **ja, met allergenen** | **in Pro, € 2,99 p/m** |

---

## 2. Wat koks echt nodig hebben

De rekenregels die de calculator moet kennen, in de volgorde waarin een kok erover nadenkt.

1. **Inkoopeenheid en verpakking.** Een kok koopt "doos 6 × 1 kg à € 21,60", "fles 0,75 l à € 6,40", "per stuk
   à € 0,35" of "per kg à € 18,90". Savour bewaart de verpakking zoals op de factuur en rekent zelf terug naar de
   prijs per gram, milliliter of stuk. Eén product kan meerdere verpakkingen en leveranciers hebben; de kok kiest
   welke telt (de "vaste" prijs).
2. **Btw.** Altijd zonder btw rekenen, zowel inkoop als verkoop. Een prijslijst met btw: de kok kiest bij het
   inladen "prijzen zijn inclusief 9% / 21%" en Savour haalt het eraf (en laat zien dat het dat deed).
3. **Korting per leverancier.** Een vast percentage per leverancier ("Sligro −4%"), los van de prijs. Zo blijft de
   lijstprijs herkenbaar en klopt het bedrag na korting. Later eventueel korting per product.
4. **Opbrengst (yield) na schoonmaken.** Ui 90%, ossenhaas 70–75%, hele kip 55–65%, zalmfilet 80–90%. Belangrijk:
   staat er in het recept "200 g ossenhaas, schoongemaakt" dan is de inkoop 200 ÷ 0,75 = 267 g. **Savour vult nooit
   zelf een opbrengst in.** Zonder opbrengst rekent Savour met 100% en zegt dat ("opbrengst niet ingevuld"). Een
   tabel met gangbare opbrengsten mag alleen als voorstel die de kok zelf aanklikt.
5. **Eenheden omrekenen.** g/kg/mg, ml/cl/dl/l, el (15 ml), tl (5 ml), oz/lb (gewicht), fl.oz. Dit zit al in
   `UNIT_INFO` in `js/features/scale.js`. Twee gevallen kan Savour **niet** zelf weten en vraagt het dus:
   - **stuk ↔ gewicht** ("2 uien" en de ui kost € 1,20 per kg): de kok vult per product het gewicht per stuk in.
   - **volume ↔ gewicht** ("2 el suiker" en suiker kost per kg; "500 ml room" en room per kg): de kok vult in
     "1 l = … kg" per product. Zonder die gegevens: regel "nog niet compleet", met de knop om het in te vullen.
6. **Hoeveelheden die geen hoeveelheid zijn.** "Zout naar smaak", "snuf peper", "olie om te bakken". Die tellen
   niet stil als 0: Savour zet ze apart ("zonder hoeveelheid") en de kok kiest per regel: een vast bedrag per
   recept (bijv. "€ 0,10 kruiden"), of "telt niet mee" (bewust). Die keuze staat zichtbaar in de berekening.
7. **Basisrecepten.** Fond, deeg, saus: de prijs per liter of kilo van het basisrecept komt uit zijn eigen opbrengst
   ("levert 2 liter"). Een gerecht dat 150 ml fond gebruikt, betaalt 150/2000 van de fond. Kan Savour de opbrengst
   niet lezen of niet omrekenen ("1 bak"), dan is die regel niet compleet. Kringen (A in B in A) herkent Savour al
   bij de allergenen.
8. **Kostprijs per portie.** Uit de opbrengst van het recept ("10 porties"). Staat er geen aantal porties (bijv.
   "1 liter"), dan vult de kok in hoeveel porties of hoeveel gram per portie; dat staat bij de berekening, niet in
   het recept (het recept verandert nooit door de calculator).
9. **Doel en kaartprijs.** Doelpercentage per gerecht (of een standaard per categorie/account) → voorgestelde
   verkoopprijs excl. én incl. btw (afgerond op een mooie prijs, maar het precieze getal ernaast). Echte kaartprijs
   → foodcost %, marge in euro's per bord, factor (DE). Een melding als het gerecht boven het doel uitkomt.
10. **Menu.** Foodcost van een heel menu (voor-, hoofd-, nagerecht als arrangement, of de hele kaart als gemiddelde).
11. **Prijswijzigingen en historie.** Elke nieuwe prijs is een nieuwe regel met datum; de oude blijft. "Wat kostte
    dit gerecht in september?" en "welke gerechten zijn door de nieuwe lijst boven het doel gekomen?".
12. **Theoretisch tegenover werkelijk** (voorraad, inkoop per maand, verkoop uit de kassa). Bewust een **latere
    stap**: dat vraagt voorraadtellingen en kassakoppelingen, en dat is waar de dure pakketten in zitten.

---

## 3. Wat Savour beter kan

1. **Niets overtypen.** De calculator rekent met de recepten die er al staan. De kok vult alleen prijzen in, één
   keer per product, en ziet meteen al zijn gerechten.
2. **Basisrecepten tellen automatisch mee**, via dezelfde koppelingen als de allergenen (`ingredientLinkTarget`,
   `recipeAllergenInfo` in `js/features/products.js`).
3. **Nooit een stil totaal.** Ontbreekt er een prijs, opbrengst, gewicht per stuk of omrekening, dan staat er
   "nog niet compleet: 2 van 9 regels" met de regels erbij, en is het getal zichtbaar een ondergrens ("minstens
   € 4,80"). Geen € 0. Excel en de gratis rekenhulpen doen dit allemaal fout; alleen Qamarero waarschuwt.
4. **Elk bedrag is herleidbaar.** Klik op € 1,62 bij "250 g roomboter": Roomboter, Sligro, doos 10 × 250 g à
   € 18,90, −4% korting = € 0,00726 per g, × 250 g, opbrengst 100% (niet ingevuld). Met de datum van de prijs.
5. **Omrekenen schaalt mee.** Reken je de beurre blanc om naar 3,5 liter, dan staan de kosten van die 3,5 liter
   erbij. Dezelfde factor als `setRecipeFactor` in `scale.js`.
6. **MEP-lijsten krijgen kosten.** De MEP-onderdelen kennen al een recept en een portie per couvert. Met de couverts
   van vandaag rekent Savour de kosten per kaart, per post en per service ("vanavond 60 couverts: € 412
   grondstoffen"). Dat heeft geen enkele concurrent in deze prijsklasse.
7. **Allergenen naast de marge.** In de menu-analyse staan de allergenen per gerecht naast de foodcost: wissel je de
   mayonaise, dan zie je de prijs en het allergeen tegelijk.
8. **Eén prijslijst per keukenteam**, met rechten: niet iedereen hoeft de inkoopprijzen te zien.
9. **Telefoon en offline.** Prijzen en berekeningen komen mee in de offline bibliotheek (`js/data/offline.js`);
   aan de pass rekent de kok een nieuw gerecht uit.
10. **Vijf talen**, met de woorden die koks daar gebruiken (foodcost, Wareneinsatz, escandallo, coût matière).
11. **Prijs.** meez rekent $19–24 voor basiskosten zonder menu engineering; Apicbase, Galley en Koust € 80+ per
    vestiging. Savour Pro is € 2,99 per maand.
12. **Gratis calculator op de website** (zoals Apicbase en Qamarero, maar zonder e-mail), met dezelfde rekenkern:
    een kok die hem gebruikt, ziet "bewaar dit gerecht en reken door met je recepten in Savour". Goed voor
    vindbaarheid; zie stap 8 van het plan.

---

## 4. Plan

### 4.1 Rekenkern (zonder scherm)

Eén bestand `js/features/foodcost.js` met gewone functies die niets tekenen en niets opslaan, zodat ze in Node te
testen zijn (`tests/foodcost.test.mjs`, `npm run test:foodcost`), net als de lezer.

- `costOfLine(line, ctx)` → `{ status, cost, steps }`. `status`: `ok`, `geen-prijs`, `geen-product`,
  `geen-hoeveelheid`, `eenheid` (omrekening onbekend), `basisrecept-onvolledig`, `kring`, `telt-niet-mee`.
  `steps` is de herleiding die het scherm toont (product, verpakking, korting, opbrengst, hoeveelheid).
- `costOfRecipe(r, ctx, seen)` → totaal, aantal regels compleet/onvolledig, per portie, per eenheid van de opbrengst
  (voor gebruik als basisrecept). Volgt dezelfde koppelingen als de allergenen; kring = onvolledig, nooit oneindig.
- Hergebruikt `parseIngredientAmount`, `UNIT_INFO`, `parseYield`, `ingredientKey`, `productIndex`. Geen kopie van
  die logica.
- Rekenen in centen pas bij het tonen; intern gewone getallen, afronden alleen in de weergave.

### 4.2 Datamodel (nieuw SQL-bestand, de eigenaar draait het zelf)

Prijzen staan in **eigen tabellen naast `products`**, niet in `products` zelf: `products` is leesbaar voor het hele
keukenteam (allergenen zijn een veiligheidszaak), prijzen niet. Dat stond al zo bedoeld in
`supabase/2026-11-03-producten-allergenen.sql`.

```
suppliers            id, user_id | team_id, name, discount_pct (0–100), note, created_at
product_costing      product_id (pk), user_id | team_id,
                     yield_pct (1–100, null = niet ingevuld),
                     piece_grams (gewicht per stuk, null = onbekend),
                     density (kg per liter, null = onbekend), updated_at
product_prices       id, product_id, supplier_id (null = zonder leverancier),
                     pack_text ("doos 6 × 1 kg", zoals op de lijst), pack_qty, pack_unit ('g'|'ml'|'stuk'),
                     price_ex_vat, valid_from (date), is_preferred, source ('hand'|'lijst'),
                     import_id, created_by, created_at
                     → nooit overschrijven: een nieuwe prijs is een nieuwe regel (historie)
price_imports        id, user_id | team_id, supplier_id, file_name, storage_path, rows (jsonb: wat er stond),
                     approved_rows, created_by, created_at  → controlescherm en terug te kijken
recipe_costing       recipe_id (pk), portions (als de opbrengst geen porties noemt), sell_price_ex_vat,
                     vat_pct, target_pct, line_choices (jsonb: per regel "telt niet mee" / vast bedrag), updated_at
menus                id, user_id | team_id, name, kind ('kaart'|'arrangement'), price_ex_vat (bij arrangement),
                     period_from, period_to
menu_items           menu_id, recipe_id, sell_price_ex_vat, sold_count (voor menu engineering), position
team_cost_settings   team_id, price_view ('eigenaar'|'editors'|'iedereen'), default_target_pct
```

- Bedragen als `numeric(12,4)` (inkoopprijzen per gram zijn klein).
- Wat het bedrag per regel is, wordt **niet** opgeslagen: Savour rekent het altijd opnieuw uit de bron. Zo kan het
  nooit uit de pas lopen met het recept.

### 4.3 Rechten (voorstel; de eigenaar beslist)

- **Eigen prijzen:** alleen jij. Toevoegen en wijzigen met Pro; wie stopt met Pro houdt alles en blijft het zien.
- **Keukenteam:** de eigenaar kiest wie prijzen ziet: alleen de eigenaar, eigenaar + editors (standaard), of
  iedereen. Wijzigen: eigenaar en editors met Pro (zelfde regel als `canEditShared`). Viewers zien standaard
  nooit inkoopprijzen; wel "compleet / niet compleet" bij een recept als de eigenaar dat wil.
- **RLS:** een functie `savour_prices_can_view(team)` die `team_cost_settings.price_view` en de rol uit
  `shared_map_members` leest; dezelfde voor schrijven met `savour_team_can_edit` + Pro. Ook
  `recipe_costing` (verkoopprijzen en marges zijn net zo gevoelig) en `menus` volgen die regel.
- Team op slot (eigenaar zonder Pro): prijzen blijven bewaard en leesbaar voor wie ze mocht zien, niet te wijzigen.

### 4.4 Gratis en Pro (voorstel)

| | Gratis | Pro |
|---|---|---|
| Gratis calculator op de website (zonder account) | ✔ | ✔ |
| Kostprijs zien in een keukenteam (als de eigenaar dat toestaat) | ✔ | ✔ |
| Eigen prijzen invullen, kosten per recept en portie, basisrecepten, omrekenen | — (wel 3 recepten proberen?) | ✔ |
| Leverancierslijst inladen, korting, historie | — | ✔ |
| Menu's, MEP-kosten, menu engineering | — | ✔ |

Waarom: producten bewerken is al Pro (`canEditProducts`), en de calculator is precies het soort ding waarvoor een
kok Pro neemt. Open vraag voor de eigenaar: willen we gratis gebruikers 3 recepten laten doorrekenen als proef, of
is de proefweek genoeg?

### 4.5 Schermen

**Laptop**

1. **Recept → blok "Kostprijs"** onder de ingrediënten (in- en uitklapbaar, zoals de allergenen). Groot: prijs per
   portie, foodcost %, marge per bord. Daaronder per ingrediëntregel het bedrag of een gouden "prijs invullen".
   Klik op een bedrag: de herleiding. Bovenaan "nog niet compleet: 2 regels" als dat zo is. Doel % en kaartprijs
   zijn hier in te vullen.
2. **Ingrediënten → Prijzen** (het bestaande scherm `renderProducts` krijgt een tab): alle producten uit je
   recepten met prijs, verpakking, leverancier, opbrengst; sorteren op "zonder prijs" en "meest gebruikt", zodat
   de kok weet waar hij moet beginnen. Een product openen: prijzen per leverancier, historie als lijstje, opbrengst,
   gewicht per stuk, "1 l = … kg".
3. **Leveranciers en prijslijst inladen:** CSV/Excel kiezen → Savour leest kolommen (naam, verpakking, prijs, btw)
   → controlescherm zoals bij importeren: per regel het voorstel welk product het is, de kok keurt goed, past aan
   of slaat over. Niets wordt opgeslagen zonder goedkeuring. Daarna: "12 gerechten zijn duurder geworden, 3 komen
   boven je doel."
4. **Tools → Foodcost**: overzicht van alle gerechten (prijs per portie, kaartprijs, foodcost %, boven doel),
   menu's samenstellen, menu engineering.
5. **MEP-lijst → kosten** (alleen voor wie prijzen mag zien): per kaart en voor de dag, op basis van de couverts.

**Telefoon**

- Het blok "Kostprijs" in het recept: alleen de drie grote getallen en "niet compleet", uitklappen voor de regels.
- Een prijs invullen vanuit een regel in één venster (product, verpakking, prijs), zonder door het menu te gaan.
- Inladen van prijslijsten is iets voor de laptop; op de telefoon kan het, maar het scherm zegt dat het op een
  groter scherm prettiger is.

Alles in Savour-stijl (goud #e8ca8d, Playfair voor koppen, grote cijfers), licht en donker thema, `askConfirm`
in plaats van `confirm`.

### 4.6 Menu engineering (Kasavana & Smith, 1982)

Per gerecht: aantal verkocht (de kok vult in of plakt het overzicht uit zijn kassa; later een koppeling) en marge
per bord. Populair = verkocht ≥ 70% van het gemiddelde aandeel (de regel van Kasavana en Smith); winstgevend =
marge ≥ gewogen gemiddelde marge. Vier groepen: Stars, Plowhorses, Puzzles, Dogs, met de allergenen per gerecht in
dezelfde tabel. Alleen als foodcost en verkoopprijs compleet zijn; anders staat het gerecht apart ("eerst
compleet maken").

### 4.7 Volgorde van bouwen (elk een eigen commit op de eigen branch, testen in de demo)

1. **Rekenkern + tests** (`foodcost.js`, `tests/foodcost.test.mjs`): eenheden, verpakking, korting, opbrengst,
   stuk/volume, basisrecepten, kringen, ontbrekende prijzen. Nog geen scherm. *Waarom eerst: dit moet kloppen,
   de rest is weergave.*
2. **SQL** (`supabase/2026-11-2x-foodcost.sql`) met RLS, en demo-prijzen in `js/data/demo-recipes.js`/de demo
   (beurre blanc compleet, één gerecht bewust niet compleet). *De eigenaar draait de SQL; tot die tijd werkt alles in
   de demo.*
3. **Prijzen invullen** bij Ingrediënten en vanuit een receptregel.
4. **Blok Kostprijs in het recept**, met herleiding, doel % en kaartprijs, meeschalen met omrekenen.
5. **Leveranciers, korting, prijslijst inladen (CSV/Excel)** met controlescherm en historie.
6. **Foodcost-overzicht en menu's** (Tools → Foodcost), printen.
7. **MEP-kosten** per kaart en service.
8. **Menu engineering** met allergenen.
9. **Website:** gratis calculator op een eigen pagina (vijf talen, zelfde rekenkern), en pas dán de blog
   "Binnenkort: de foodcost calculator" en de pagina Binnenkort bijwerken.
10. Later: prijslijst als pdf/foto via de bestaande lezers, kassakoppeling, theoretisch/werkelijk.

Na elke stap: `npm run format`, de regressietest, `npm run test:foodcost`, vertalingen in vijf talen
(`tools/vertalingen.mjs`, `-fr.mjs`, `build-i18n.mjs`), licht en donker, laptop en telefoon.

### 4.8 Vragen aan de eigenaar

1. Akkoord met prijzen in eigen tabellen en de rechtenkeuze per keukenteam (standaard: eigenaar + editors)?
2. Gratis/Pro zoals in 4.4? Gratis 3 recepten proberen, ja of nee?
3. Mag de standaard voor het doelpercentage 30% zijn (Lightspeed/CBS-orde), door de kok aan te passen?
4. Een lijst met gangbare opbrengsten als **voorstel** (de kok klikt hem zelf aan), of helemaal niet?
5. De gratis calculator op de website: meenemen in deze opdracht (stap 9) of later?

---

## 5. Besluiten van de eigenaar (24-11-2026)

1. **Prijzen zijn van jezelf.** Alleen jij ziet je inkoopprijzen, leveranciers, verkoopprijzen en marges, ook in
   een keukenteam. Er is dus geen gedeelde prijslijst per team en geen keuze per team (4.3 en
   `team_cost_settings` vervallen). Een teamrecept reken je uit met je eigen prijzen.
2. **Alles is Pro.** Gratis gebruikers zien wat de calculator doet en de knop naar Pro.
3. **Standaard doel 30%** (fine dining netjes; banqueting zit lager, bijv. 24%). De kok past het aan, per gerecht
   of als standaard.
4. **Gangbare opbrengsten als hint:** ja, alleen als hint met bron; de kok vult zelf het getal in.
5. **Gratis calculator op de website:** nog niet gebouwd (uitleg in het eindverslag).

Gevolg voor het datamodel: alle tabellen heten `cost_*` en hebben `user_id`; RLS is overal "alleen jijzelf",
toevoegen en wijzigen met Pro, lezen en verwijderen altijd (`supabase/2026-11-24-foodcost.sql`). Een prijs hoort bij
een eigen *kostproduct* (naam + schrijfwijzen), los van de producten voor allergenen, zodat teamgenoten nooit
iets van je prijzen zien.
