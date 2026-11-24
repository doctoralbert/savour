# Opdracht voor Claude: de foodcost calculator van Savour

Gebruik dit als prompt in een nieuwe sessie. Werk alleen op de testtak (`concepten` → `savour-3`); niets live zonder
"zet live" van de eigenaar. Lees eerst `CLAUDE.md` en `README.md`.

---

## Doel

Bouw in Savour de beste foodcost calculator voor de professionele keuken die er online te vinden is: sneller, eerlijker
en beter verbonden met de rest van de keuken dan losse rekenhulpen zoals die van Apicbase
(https://get.apicbase.com/nl/foodcost-calculator/). Het verschil moet zitten in wat Savour al heeft: de recepten,
basisrecepten, omrekenen, MEP-lijsten, keukenteams en allergenen. Een kok rekent niets twee keer.

De blog "Binnenkort in Savour: de foodcost calculator" (`/blog/foodcost-calculator`, alle talen) belooft al:
foodcost per gerecht en per portie, ook door basisrecepten heen; foodcost van een heel menu; eigen prijzen invullen of de
prijslijst van de leverancier inladen; de eigen korting bij de leverancier; een doelpercentage per gerecht met een
melding als je eroverheen gaat; daarna menu engineering (Kasavana en Smith) met de allergenen erbij. Lever minstens dat.

## Stap 1: onderzoek (eerst, vóór er code komt)

Schrijf `docs/onderzoek-foodcost.md` en leg het aan de eigenaar voor. Geen code voordat hij akkoord geeft.

1. **Concurrenten en voorbeelden.** Bekijk de foodcost-/receptkostenfuncties van onder andere Apicbase, Meez, Galley,
   en zoek zelf de belangrijkste andere (ook Duitse: Wareneinsatz/Kalkulation, Spaanse: escandallo, Franse: fiche
   technique / coût matière) en de bekende gratis Excel-sjablonen. Lees de pagina's echt; noem bronnen met datum.
   Per tool: wat vraagt hij als invoer, wat rekent hij uit, waar is het onhandig, wat kost het.
2. **Wat koks echt nodig hebben.** Opbrengst/rendement na schoonmaken (yield), verpakkingen (doos van 6 × 1 kg, per stuk
   met een gewicht), eenheden omrekenen (g, kg, ml, l, stuk, el, tl, oz, lb), prijs per inkoopeenheid naar prijs per
   gebruikseenheid, btw (altijd zonder btw rekenen), korting per leverancier, prijswijzigingen en historie, kostprijs per
   portie, doelpercentage → voorgestelde verkoopprijs, echte kaartprijs → foodcost % en marge in euro's,
   brutomarge per gerecht, foodcost van een menu, theoretisch tegenover werkelijk (voorraad) als latere stap.
3. **Wat er beter kan dan bij Apicbase e.a.** Bijvoorbeeld: rekenen vanuit recepten die al bestaan (niets overtypen),
   basisrecepten die automatisch meetellen, een ontbrekende prijs nooit als € 0 tellen maar duidelijk tonen, omrekenen
   van een recept laat de kosten meeschalen, de MEP-lijst kan de kosten van een post of een hele service laten zien,
   per keukenteam één prijslijst, werkt op de telefoon en offline, in vijf talen, en de kok ziet altijd waar een getal
   vandaan komt (klik op een bedrag → welk product, welke prijs, welke opbrengst).
4. **Plan.** Datamodel, schermen (laptop én telefoon), wat gratis en wat Pro is (voorstel; de eigenaar beslist), en in
   welke volgorde je bouwt. Geef bij elke keuze kort het waarom.

## Wat Savour al heeft (gebruik dit, bouw niets dubbel)

- Recepten met ingrediëntregels als tekst ("250 g boter"), `yield_text` (opbrengst), delen en notities
  (`js/data/database.js`, `js/features/recipe.js`, `js/features/editor.js`).
- Producten en koppelingen van ingrediëntregels aan producten: `ingredient_links` in recepten, `js/features/products.js`,
  `product-autolink.js`, `product-families.js`, `product-review.js`, de centrale ingrediëntenlijst (`ingredient_list`)
  met allergenen. Prijzen horen bij deze producten, niet bij losse tekstregels.
- Basisrecepten die in andere recepten worden gebruikt (allergenen tellen al door; kosten moeten dat ook doen).
- Omrekenen en eenheden: `js/features/scale.js` (ook barmaten). Hergebruik dit voor eenheden en hoeveelheden.
- MEP-lijsten met onderdelen die aan een recept gekoppeld kunnen worden en hoeveelheden per couvert
  (`js/features/mep.js`, `supabase/2026-11-17-mep-lijsten.sql`).
- Keukenteams met rollen owner/editor/viewer (`canEditShared`, RLS in Supabase), Pro-regels (`savour_is_pro`).
- Printen (`js/features/print.js`), export, vertalingen (`tools/vertalingen.mjs`, `-fr.mjs`, `build-i18n.mjs`).

## Eisen (vast)

- **Betrouwbaar:** Savour verzint nooit prijzen, hoeveelheden of opbrengsten. Ontbreekt iets, dan zegt de calculator
  "nog niet compleet" en welke regel; nooit een stil totaal. Geen stille datawijzigingen; recepten veranderen nooit door
  de calculator.
- **Herleidbaar:** elk bedrag is aan te klikken: product, inkoopprijs, verpakking, korting, opbrengst, hoeveelheid.
- **Synergie:** kosten per recept en per portie, door basisrecepten heen; meeschalen met omrekenen; kosten van een
  MEP-lijst of een deel daarvan (per post, per kaart, per service op basis van couverts); allergenen naast de marge
  in de menu-analyse; keukenteams delen één prijslijst.
- **Prijzen en rechten:** inkoopprijzen zijn gevoelig. Voorstel in het onderzoek: wie in een keukenteam prijzen ziet en
  wie ze mag wijzigen. Beveiliging in Supabase RLS, niet alleen in de interface.
- **Leverancierslijst inladen:** CSV/Excel (en later pdf/foto via de bestaande lezers), met een controlescherm zoals bij
  importeren; de kok keurt goed. Korting per leverancier. Prijshistorie bewaren.
- **Savour-stijl:** donker met goud (#e8ca8d), Playfair Display voor koppen, rustige schermen, grote cijfers waar het
  telt. Controleer licht én donker thema, laptop én telefoon. Geen `confirm()`/`prompt()` (gebruik `askConfirm` e.d.).
- **Techniek:** geen build-stap, gewone scripts; nieuwe functies in een eigen bestand (bijv. `js/features/foodcost.js`),
  laadvolgorde in `index.html`; nooit een bestaande functie overschrijven. SQL als nieuw bestand in `supabase/`
  (de eigenaar draait het zelf). Vertalingen in vijf talen. `npm run format`, regressietest, eigen tests voor de
  rekenregels (eenheden, opbrengst, korting, basisrecepten, ontbrekende prijzen).
- **Teksten op de site:** werk de blog "Binnenkort: de foodcost calculator" en de pagina Binnenkort bij zodra er iets
  echt werkt, nooit eerder.

## Oplevering

1. `docs/onderzoek-foodcost.md` met bronnen, vergelijking en plan → akkoord eigenaar.
2. Bouwen in kleine stappen op de testtak, elk met een duidelijke Nederlandse commit.
3. Een korte demo-uitleg met schermafbeeldingen (laptop en telefoon) en wat nog niet af is.
