// Blog: foodcost berekenen, per gerecht en per maand (2026-11-12), in vijf talen. Alle bedragen zijn een zelfbedacht
// rekenvoorbeeld (risotto, oktober), geen statistiek. Het enige sectorcijfer is 31,1% inkoop bij Nederlandse restaurants
// in 2024 (CBS, zie de bronnen in tools/site-blog-kosten.mjs). Btw op eten in Nederland: 9%.
// De Savour foodcost calculator is nog niet live: schrijf "komt eraan" en verwijs naar tools/site-blog-foodcost.mjs.
// Afbeeldingen in het artikel: assets/blog/foodcost-berekenen/*-<taal>.png, gemaakt met tools/blog-afbeeldingen.py.

const IMG = (name, lang) => `/assets/blog/foodcost-berekenen/${name}-${lang}.png`;

export const FOODCOST_CALC_POST = {
  id: 'foodcost-berekenen',
  date: '2026-11-12',
  rich: true,
  nl: {
    slug: 'blog/foodcost-berekenen',
    title: 'Foodcost berekenen: per gerecht en per maand',
    desc: 'Zo bereken je foodcost: de kostprijs per gerecht met opbrengst, het foodcostpercentage, je werkelijke foodcost over een maand en het verschil tussen theorie en praktijk. Met rekenvoorbeelden.',
    h1: 'Foodcost berekenen: zo houd je grip op je marges',
    lead: 'Na personeel zijn ingrediënten de grootste kostenpost van bijna elke keuken. Een paar procent verschil in foodcost bepaalt of er onder de streep iets overblijft. Gelukkig is het rekenwerk eenvoudig.',
    brief: [
      'Foodcostpercentage = kosten van de ingrediënten ÷ verkoopprijs zonder btw × 100.',
      'Reken per gerecht met de opbrengst (yield): wat je wegsnijdt, betaal je ook.',
      'Over een maand: beginvoorraad + inkoop − eindvoorraad. Het verschil met wat het had moeten kosten laat zien waar geld weglekt.'
    ],
    sections: [
      [
        'Wat is foodcost?',
        'Foodcost is wat je uitgeeft aan de ingrediënten van wat je verkoopt. Je kunt het in euro’s uitdrukken, of als percentage van de omzet. Dat percentage is het getal waarmee je stuurt: het laat zien hoeveel van elke verdiende euro direct naar ingrediënten gaat.\n\nEen gerecht van € 4 aan ingrediënten is prima bij een verkoopprijs van € 16, maar een probleem bij € 9. Reken altijd met de prijs zonder btw: de btw is niet van jou.',
        {
          shot: IMG('foodcostpercentage', 'nl'),
          alt: 'Foodcostpercentage: foodcost gedeeld door omzet zonder btw, keer 100',
          caption: 'De formule, met het voorbeeld van de risotto hieronder.',
          wide: true
        }
      ],
      [
        'Foodcost per gerecht berekenen',
        'De kostprijs van één bord is de basis van alles. Zo reken je hem uit:',
        {
          steps: [
            ['Noteer elk ingrediënt', 'Met de hoeveelheid per portie. Vergeet garnituur, saus en olie niet: kleine posten tellen op.'],
            ['Zoek de inkoopprijs op', 'Per kilo, liter of stuk, zoals je hem echt betaalt.'],
            ['Corrigeer voor opbrengst', 'Schoonmaken, schillen en uitbenen kost gewicht. Haal je 850 gram bruikbare paddenstoelen uit een kilo, dan is je opbrengst 85% en is de echte prijs de inkoopprijs ÷ 0,85.'],
            ['Tel alles op', 'Dat is je kostprijs per portie.'],
            ['Deel door de verkoopprijs zonder btw', 'Keer 100, en je hebt het foodcostpercentage.']
          ]
        },
        {
          head: ['Ingrediënt', 'Per portie', 'Inkoopprijs', 'Opbrengst', 'Kosten'],
          rows: [
            ['Paddenstoelenmix', '120 g', '€ 14,00/kg', '85%', '€ 1,98'],
            ['Parmezaan', '25 g', '€ 24,00/kg', '100%', '€ 0,60'],
            ['Kippenbouillon', '350 ml', '€ 1,20/l', '100%', '€ 0,42'],
            ['Arborio-rijst', '90 g', '€ 4,20/kg', '100%', '€ 0,38'],
            ['Witte wijn', '50 ml', '€ 6,00/l', '100%', '€ 0,30'],
            ['Sjalot, knoflook, kruiden', '–', '–', '–', '€ 0,25'],
            ['Boter', '20 g', '€ 9,00/kg', '100%', '€ 0,18'],
            ['**Totaal**', '', '', '', '**€ 4,10**']
          ],
          note: 'Rekenvoorbeeld: risotto met paddenstoelen. De bedragen zijn een voorbeeld, geen gemiddelde.'
        },
        {
          shot: IMG('risotto-kostprijs', 'nl'),
          alt: 'Kostprijs van een bord risotto per ingrediënt: totaal € 4,10, foodcost 22,9%',
          caption: 'De risotto staat voor € 19,50 op de kaart, € 17,89 zonder 9% btw: 4,10 ÷ 17,89 × 100 = 22,9%.',
          wide: true
        }
      ],
      [
        'Je werkelijke foodcost over een maand',
        'De kostprijs per gerecht is de theorie. Wat je keuken echt verbruikt, zie je pas over een vaste periode, zoals een week of een maand. Daarvoor heb je drie getallen nodig: je voorraad aan het begin, wat je hebt ingekocht en je voorraad aan het eind.\n\nBeginvoorraad + inkoop − eindvoorraad = werkelijke foodcost. Deel dat door de omzet zonder btw van dezelfde periode, en je hebt je werkelijke foodcostpercentage.',
        {
          shot: IMG('werkelijke-foodcost', 'nl'),
          alt: 'Werkelijke foodcost in oktober: € 8.500 + € 12.000 − € 7.900 = € 12.600, of 30% van € 42.000 omzet',
          caption: 'Rekenvoorbeeld voor oktober: € 12.600 aan ingrediënten op € 42.000 omzet is 30%.',
          wide: true
        },
        { tip: ['Tel altijd op hetzelfde moment', 'Tel je voorraad op dezelfde dag en hetzelfde tijdstip, bijvoorbeeld de laatste zondag na de service. Anders vergelijk je periodes die niet te vergelijken zijn.'] }
      ],
      [
        'Theorie naast werkelijkheid',
        'Tel je de kostprijs van alle verkochte gerechten op, dan krijg je je theoretische foodcost: wat het had moeten kosten. Het verschil met je werkelijke foodcost heet de variantie. Hoe dichter bij nul, hoe beter je keuken onder controle is.\n\nWas je theoretische foodcost in oktober 27% en je werkelijke 30%, dan verdween er 3 procentpunt ongemerkt. Op € 42.000 omzet is dat € 1.260 in één maand.',
        {
          shot: IMG('variantie', 'nl'),
          alt: 'Theoretische foodcost 27% tegenover werkelijke 30%: 3 procentpunt, € 1.260 per maand',
          caption: 'Het verschil tussen theorie en werkelijkheid is geld dat ongemerkt verdwijnt.',
          wide: true
        },
        ['**Verspilling**: wat over de datum gaat of mislukt.', '**Te grote porties**: tien gram extra per bord telt op.', '**Leveringen**: gewicht, kwaliteit of prijs klopt niet met de bestelling.', '**Verouderde recepten**: de kostprijs is uitgerekend met oude prijzen of een oude versie van het recept.']
      ],
      [
        'Wat is een goede foodcost?',
        'Eén magisch getal bestaat niet: een zaak met dure producten zit hoger dan een lunchroom of pizzeria. Ter vergelijking: bij Nederlandse restaurants ging in 2024 gemiddeld 31,1% van de opbrengsten naar inkoop, eten en drinken samen (CBS). Meer cijfers lees je in [Wat kost een restaurant?](/blog/kosten-en-marges-restaurant).\n\nKen je je eigen doel, dan reken je terug naar een verkoopprijs: kostprijs per portie ÷ doelpercentage = verkoopprijs zonder btw. Kijk daarna of die prijs past bij je gasten en je concurrenten. Een formule is een startpunt, geen eindoordeel.',
        { example: ['Van doel naar verkoopprijs', ['Kostprijs risotto: € 4,10', 'Doel: 25% foodcost', '4,10 ÷ 0,25 = € 16,40 zonder btw', 'Met 9% btw: € 17,88, afgerond € 18 op de kaart']] }
      ],
      [
        'Zo verlaag je je foodcost',
        'De meeste winst zit niet in goedkoper inkopen, maar in minder laten weglekken.',
        {
          check: [
            '**Werk met vaste recepten.** Wie op gevoel doseert, maakt elke keer een ander gerecht met een andere kostprijs. Lees ook [Standaardrecepturen](/blog/standaardrecepturen-in-de-keuken).',
            '**Houd je inkoopprijzen actueel.** Een recept met de prijzen van vorig jaar liegt tegen je.',
            '**Weeg en portioneer.** Zeker bij vlees, vis en kaas.',
            '**Houd een verspillingslijst bij.** Wat gaat er weg, en waarom? Na een paar weken zie je patronen.',
            '**Benut het hele product.** Schillen, botten en afsnijdsels worden fond, saus of personeelseten.',
            '**Controleer leveringen.** Gewicht, kwaliteit en de prijs op de factuur.'
          ],
          title: 'Zes gewoontes die direct schelen'
        }
      ],
      [
        'Foodcost begint bij je recepten',
        'Alle berekeningen hierboven staan of vallen met kloppende recepten die iedereen in de keuken op dezelfde manier volgt. Daar is Savour voor: één overzichtelijke receptenbibliotheek, gedeeld met je brigade, zodat elke kok hetzelfde gerecht maakt tegen dezelfde kostprijs.\n\nEn binnenkort rekent Savour het ook voor je uit: de [foodcost calculator](/blog/foodcost-calculator) berekent de kostprijs van een gerecht of je hele menu vanuit je eigen recepten, met de prijzen van je leverancier.'
      ]
    ],
    outro: 'De bedragen in dit artikel zijn een rekenvoorbeeld. Reken voor je eigen keuken altijd met je eigen prijzen.'
  },
  en: {
    slug: 'en/blog/how-to-calculate-food-cost',
    title: 'How to calculate food cost: per dish and per month',
    desc: 'How to calculate food cost: the cost per dish including yield, the food cost percentage, your actual food cost over a month and the gap between theory and practice. With worked examples.',
    h1: 'How to calculate food cost and keep a grip on your margins',
    lead: 'After staff, ingredients are the biggest cost in almost every kitchen. A few percent of food cost decides whether anything is left at the bottom line. Luckily, the maths is simple.',
    brief: [
      'Food cost percentage = ingredient cost ÷ selling price excluding VAT × 100.',
      'Calculate each dish with its yield: what you trim off, you pay for too.',
      'Over a month: opening stock + purchases − closing stock. The gap with what it should have cost shows where money leaks away.'
    ],
    sections: [
      [
        'What is food cost?',
        'Food cost is what you spend on the ingredients of what you sell. You can express it in euros, or as a percentage of revenue. That percentage is the number you steer by: it shows how much of every euro you earn goes straight to ingredients.\n\nA dish with € 4 of ingredients is fine at a selling price of € 16, but a problem at € 9. Always calculate with the price excluding VAT: the VAT isn’t yours.',
        {
          shot: IMG('foodcostpercentage', 'en'),
          alt: 'Food cost percentage: food cost divided by revenue excluding VAT, times 100',
          caption: 'The formula, with the risotto example from below.',
          wide: true
        }
      ],
      [
        'Calculating food cost per dish',
        'The cost of one plate is the basis of everything. This is how you work it out:',
        {
          steps: [
            ['List every ingredient', 'With the quantity per portion. Don’t forget garnish, sauce and oil: small items add up.'],
            ['Look up the purchase price', 'Per kilo, litre or piece, as you actually pay it.'],
            ['Correct for yield', 'Cleaning, peeling and boning cost weight. If you get 850 grams of usable mushrooms from a kilo, your yield is 85% and the real price is the purchase price ÷ 0.85.'],
            ['Add it all up', 'That is your cost per portion.'],
            ['Divide by the selling price excluding VAT', 'Times 100, and you have the food cost percentage.']
          ]
        },
        {
          head: ['Ingredient', 'Per portion', 'Purchase price', 'Yield', 'Cost'],
          rows: [
            ['Mixed mushrooms', '120 g', '€ 14.00/kg', '85%', '€ 1.98'],
            ['Parmesan', '25 g', '€ 24.00/kg', '100%', '€ 0.60'],
            ['Chicken stock', '350 ml', '€ 1.20/l', '100%', '€ 0.42'],
            ['Arborio rice', '90 g', '€ 4.20/kg', '100%', '€ 0.38'],
            ['White wine', '50 ml', '€ 6.00/l', '100%', '€ 0.30'],
            ['Shallot, garlic, herbs', '–', '–', '–', '€ 0.25'],
            ['Butter', '20 g', '€ 9.00/kg', '100%', '€ 0.18'],
            ['**Total**', '', '', '', '**€ 4.10**']
          ],
          note: 'Worked example: mushroom risotto. The amounts are an example, not an average.'
        },
        {
          shot: IMG('risotto-kostprijs', 'en'),
          alt: 'Cost of a plate of risotto per ingredient: € 4.10 in total, 22.9% food cost',
          caption: 'The risotto is € 19.50 on the menu, € 17.89 without 9% VAT (the Dutch rate for food): 4.10 ÷ 17.89 × 100 = 22.9%.',
          wide: true
        }
      ],
      [
        'Your actual food cost over a month',
        'The cost per dish is the theory. What your kitchen really uses only shows over a fixed period, such as a week or a month. You need three numbers: your stock at the start, what you bought and your stock at the end.\n\nOpening stock + purchases − closing stock = actual food cost. Divide that by the revenue excluding VAT for the same period and you have your actual food cost percentage.',
        {
          shot: IMG('werkelijke-foodcost', 'en'),
          alt: 'Actual food cost in October: € 8,500 + € 12,000 − € 7,900 = € 12,600, or 30% of € 42,000 revenue',
          caption: 'Worked example for October: € 12,600 of ingredients on € 42,000 revenue is 30%.',
          wide: true
        },
        { tip: ['Always count at the same moment', 'Count your stock on the same day and at the same time, for example the last Sunday after service. Otherwise you compare periods that can’t be compared.'] }
      ],
      [
        'Theory versus reality',
        'Add up the cost of every dish you sold and you get your theoretical food cost: what it should have cost. The gap with your actual food cost is called the variance. The closer to zero, the better your kitchen is under control.\n\nIf your theoretical food cost in October was 27% and your actual one 30%, then 3 percentage points disappeared unnoticed. On € 42,000 of revenue, that is € 1,260 in one month.',
        {
          shot: IMG('variantie', 'en'),
          alt: 'Theoretical food cost 27% versus actual 30%: 3 percentage points, € 1,260 a month',
          caption: 'The gap between theory and reality is money that disappears unnoticed.',
          wide: true
        },
        ['**Waste**: what goes out of date or goes wrong.', '**Portions too large**: ten grams extra per plate adds up.', '**Deliveries**: weight, quality or price doesn’t match the order.', '**Outdated recipes**: the cost was worked out with old prices or an old version of the recipe.']
      ],
      [
        'What is a good food cost?',
        'There is no magic number: a place with expensive produce sits higher than a lunchroom or pizzeria. For comparison: in 2024 Dutch restaurants spent an average of 31.1% of their revenue on purchases, food and drink together (CBS). More figures in [What does a restaurant cost?](/en/blog/restaurant-costs-and-margins).\n\nOnce you know your own target, you can work back to a selling price: cost per portion ÷ target percentage = selling price excluding VAT. Then check whether that price suits your guests and your competitors. A formula is a starting point, not a verdict.',
        { example: ['From target to selling price', ['Cost of the risotto: € 4.10', 'Target: 25% food cost', '4.10 ÷ 0.25 = € 16.40 excluding VAT', 'With 9% VAT: € 17.88, rounded to € 18 on the menu']] }
      ],
      [
        'How to lower your food cost',
        'Most of the gain isn’t in buying cheaper, but in letting less leak away.',
        {
          check: [
            '**Work with fixed recipes.** Cooking by feel means a different dish at a different cost every time. See also [Standardised recipes](/en/blog/standardised-recipes).',
            '**Keep your purchase prices up to date.** A recipe costed with last year’s prices lies to you.',
            '**Weigh and portion.** Especially meat, fish and cheese.',
            '**Keep a waste log.** What goes in the bin, and why? After a few weeks you see patterns.',
            '**Use the whole product.** Peel, bones and trimmings become stock, sauce or staff food.',
            '**Check deliveries.** Weight, quality and the price on the invoice.'
          ],
          title: 'Six habits that make an immediate difference'
        }
      ],
      [
        'Food cost starts with your recipes',
        'Every calculation above stands or falls with correct recipes that everyone in the kitchen follows the same way. That is what Savour is for: one clear recipe library, shared with your brigade, so every cook makes the same dish at the same cost.\n\nAnd soon Savour will do the maths for you too: the [food cost calculator](/en/blog/food-cost-calculator) works out the cost of a dish or your whole menu from your own recipes, with your supplier’s prices.'
      ]
    ],
    outro: 'The amounts in this article are a worked example. For your own kitchen, always calculate with your own prices.'
  }
};

const KEY = 'en/blog/how-to-calculate-food-cost';

export const FOODCOST_CALC_POST_DE = {
  [KEY]: {
    slug: 'de/blog/wareneinsatz-berechnen',
    title: 'Wareneinsatz berechnen: pro Gericht und pro Monat',
    desc: 'So berechnest du den Wareneinsatz: die Kosten pro Gericht mit Ausbeute, den Wareneinsatz in Prozent, deinen tatsächlichen Wareneinsatz im Monat und die Lücke zwischen Theorie und Praxis. Mit Rechenbeispielen.',
    h1: 'Wareneinsatz berechnen: so behältst du deine Margen im Griff',
    lead: 'Nach dem Personal sind Zutaten in fast jeder Küche der größte Kostenposten. Ein paar Prozent Wareneinsatz entscheiden, ob unterm Strich etwas übrig bleibt. Zum Glück ist die Rechnung einfach.',
    brief: [
      'Wareneinsatz in Prozent = Kosten der Zutaten ÷ Verkaufspreis ohne Mehrwertsteuer × 100.',
      'Rechne jedes Gericht mit der Ausbeute: Was du wegschneidest, bezahlst du auch.',
      'Im Monat: Anfangsbestand + Einkauf − Endbestand. Die Lücke zu dem, was es hätte kosten sollen, zeigt, wo Geld versickert.'
    ],
    sections: [
      [
        'Was ist Wareneinsatz?',
        'Der Wareneinsatz (Food Cost) ist das, was du für die Zutaten dessen ausgibst, was du verkaufst. Du kannst ihn in Euro ausdrücken oder als Prozentsatz vom Umsatz. Dieser Prozentsatz ist die Zahl, nach der du steuerst: Er zeigt, wie viel von jedem verdienten Euro direkt in Zutaten geht.\n\nEin Gericht mit 4 € Zutaten ist bei einem Verkaufspreis von 16 € in Ordnung, bei 9 € aber ein Problem. Rechne immer mit dem Preis ohne Mehrwertsteuer: Die Steuer gehört nicht dir.',
        {
          shot: IMG('foodcostpercentage', 'de'),
          alt: 'Wareneinsatz in Prozent: Wareneinsatz geteilt durch Umsatz ohne Mehrwertsteuer, mal 100',
          caption: 'Die Formel, mit dem Risotto-Beispiel von unten.',
          wide: true
        }
      ],
      [
        'Wareneinsatz pro Gericht berechnen',
        'Die Kosten eines Tellers sind die Grundlage von allem. So rechnest du sie aus:',
        {
          steps: [
            ['Jede Zutat notieren', 'Mit der Menge pro Portion. Vergiss Garnitur, Sauce und Öl nicht: Kleinigkeiten summieren sich.'],
            ['Einkaufspreis nachschlagen', 'Pro Kilo, Liter oder Stück, so wie du ihn wirklich bezahlst.'],
            ['Ausbeute einrechnen', 'Putzen, Schälen und Auslösen kostet Gewicht. Bekommst du aus einem Kilo 850 Gramm brauchbare Pilze, liegt die Ausbeute bei 85 % und der echte Preis ist der Einkaufspreis ÷ 0,85.'],
            ['Alles zusammenzählen', 'Das sind deine Kosten pro Portion.'],
            ['Durch den Verkaufspreis ohne Mehrwertsteuer teilen', 'Mal 100, und du hast den Wareneinsatz in Prozent.']
          ]
        },
        {
          head: ['Zutat', 'Pro Portion', 'Einkaufspreis', 'Ausbeute', 'Kosten'],
          rows: [
            ['Pilzmischung', '120 g', '14,00 €/kg', '85 %', '1,98 €'],
            ['Parmesan', '25 g', '24,00 €/kg', '100 %', '0,60 €'],
            ['Hühnerbrühe', '350 ml', '1,20 €/l', '100 %', '0,42 €'],
            ['Arborio-Reis', '90 g', '4,20 €/kg', '100 %', '0,38 €'],
            ['Weißwein', '50 ml', '6,00 €/l', '100 %', '0,30 €'],
            ['Schalotte, Knoblauch, Kräuter', '–', '–', '–', '0,25 €'],
            ['Butter', '20 g', '9,00 €/kg', '100 %', '0,18 €'],
            ['**Summe**', '', '', '', '**4,10 €**']
          ],
          note: 'Rechenbeispiel: Pilzrisotto. Die Beträge sind ein Beispiel, kein Durchschnitt.'
        },
        {
          shot: IMG('risotto-kostprijs', 'de'),
          alt: 'Kosten eines Tellers Risotto pro Zutat: insgesamt 4,10 €, Wareneinsatz 22,9 %',
          caption: 'Das Risotto steht für 19,50 € auf der Karte, 17,89 € ohne 9 % Mehrwertsteuer (niederländischer Satz für Speisen): 4,10 ÷ 17,89 × 100 = 22,9 %.',
          wide: true
        }
      ],
      [
        'Dein tatsächlicher Wareneinsatz im Monat',
        'Die Kosten pro Gericht sind die Theorie. Was deine Küche wirklich verbraucht, siehst du erst über einen festen Zeitraum, etwa eine Woche oder einen Monat. Dafür brauchst du drei Zahlen: deinen Bestand am Anfang, was du eingekauft hast, und deinen Bestand am Ende.\n\nAnfangsbestand + Einkauf − Endbestand = tatsächlicher Wareneinsatz. Teile ihn durch den Umsatz ohne Mehrwertsteuer im selben Zeitraum, und du hast deinen tatsächlichen Wareneinsatz in Prozent.',
        {
          shot: IMG('werkelijke-foodcost', 'de'),
          alt: 'Tatsächlicher Wareneinsatz im Oktober: 8.500 € + 12.000 € − 7.900 € = 12.600 €, also 30 % von 42.000 € Umsatz',
          caption: 'Rechenbeispiel für Oktober: 12.600 € Zutaten bei 42.000 € Umsatz sind 30 %.',
          wide: true
        },
        { tip: ['Immer zum selben Zeitpunkt zählen', 'Zähle deinen Bestand am selben Tag und zur selben Uhrzeit, zum Beispiel am letzten Sonntag nach dem Service. Sonst vergleichst du Zeiträume, die nicht vergleichbar sind.'] }
      ],
      [
        'Theorie und Wirklichkeit',
        'Zählst du die Kosten aller verkauften Gerichte zusammen, bekommst du deinen theoretischen Wareneinsatz: was es hätte kosten sollen. Die Lücke zum tatsächlichen Wareneinsatz heißt Abweichung. Je näher an null, desto besser hast du deine Küche im Griff.\n\nLag dein theoretischer Wareneinsatz im Oktober bei 27 % und der tatsächliche bei 30 %, sind 3 Prozentpunkte unbemerkt verschwunden. Bei 42.000 € Umsatz sind das 1.260 € in einem Monat.',
        {
          shot: IMG('variantie', 'de'),
          alt: 'Theoretischer Wareneinsatz 27 % gegenüber tatsächlichem 30 %: 3 Prozentpunkte, 1.260 € pro Monat',
          caption: 'Die Lücke zwischen Theorie und Wirklichkeit ist Geld, das unbemerkt verschwindet.',
          wide: true
        },
        ['**Verschwendung**: was abläuft oder misslingt.', '**Zu große Portionen**: zehn Gramm mehr pro Teller summieren sich.', '**Lieferungen**: Gewicht, Qualität oder Preis passen nicht zur Bestellung.', '**Veraltete Rezepte**: Die Kosten wurden mit alten Preisen oder einer alten Rezeptversion berechnet.']
      ],
      [
        'Was ist ein guter Wareneinsatz?',
        'Eine magische Zahl gibt es nicht: Ein Betrieb mit teuren Produkten liegt höher als ein Bistro oder eine Pizzeria. Zum Vergleich: Niederländische Restaurants gaben 2024 im Schnitt 31,1 % ihrer Erlöse für den Einkauf aus, Speisen und Getränke zusammen (CBS). Mehr Zahlen in [Was kostet ein Restaurant?](/de/blog/kosten-und-margen-restaurant).\n\nKennst du dein eigenes Ziel, rechnest du auf einen Verkaufspreis zurück: Kosten pro Portion ÷ Zielprozentsatz = Verkaufspreis ohne Mehrwertsteuer. Prüfe danach, ob dieser Preis zu deinen Gästen und deiner Konkurrenz passt. Eine Formel ist ein Startpunkt, kein Urteil.',
        { example: ['Vom Ziel zum Verkaufspreis', ['Kosten Risotto: 4,10 €', 'Ziel: 25 % Wareneinsatz', '4,10 ÷ 0,25 = 16,40 € ohne Mehrwertsteuer', 'Mit 9 % Mehrwertsteuer: 17,88 €, gerundet 18 € auf der Karte']] }
      ],
      [
        'So senkst du deinen Wareneinsatz',
        'Der größte Gewinn liegt nicht im billigeren Einkauf, sondern darin, weniger versickern zu lassen.',
        {
          check: [
            '**Arbeite mit festen Rezepturen.** Wer nach Gefühl dosiert, macht jedes Mal ein anderes Gericht zu anderen Kosten. Lies auch [Standardrezepturen](/de/blog/standardrezepturen-gastronomie).',
            '**Halte deine Einkaufspreise aktuell.** Ein Rezept mit den Preisen vom letzten Jahr lügt dich an.',
            '**Wiegen und portionieren.** Vor allem bei Fleisch, Fisch und Käse.',
            '**Führe eine Abfallliste.** Was wird weggeworfen, und warum? Nach ein paar Wochen siehst du Muster.',
            '**Nutze das ganze Produkt.** Schalen, Knochen und Abschnitte werden Fond, Sauce oder Personalessen.',
            '**Kontrolliere Lieferungen.** Gewicht, Qualität und den Preis auf der Rechnung.'
          ],
          title: 'Sechs Gewohnheiten, die sofort etwas bringen'
        }
      ],
      [
        'Wareneinsatz beginnt bei deinen Rezepten',
        'Alle Rechnungen oben stehen und fallen mit stimmenden Rezepten, die alle in der Küche gleich befolgen. Dafür gibt es Savour: eine übersichtliche Rezeptbibliothek, geteilt mit deiner Brigade, damit jeder Koch dasselbe Gericht zu denselben Kosten macht.\n\nUnd bald rechnet Savour es auch für dich aus: Der [Wareneinsatz-Rechner](/de/blog/wareneinsatz-rechner) berechnet die Kosten eines Gerichts oder deiner ganzen Karte aus deinen eigenen Rezepten, mit den Preisen deines Lieferanten.'
      ]
    ],
    outro: 'Die Beträge in diesem Artikel sind ein Rechenbeispiel. Rechne für deine eigene Küche immer mit deinen eigenen Preisen.'
  }
};

export const FOODCOST_CALC_POST_ES = {
  [KEY]: {
    slug: 'es/blog/como-calcular-food-cost',
    title: 'Cómo calcular el food cost: por plato y por mes',
    desc: 'Cómo calcular el food cost: el coste por plato con el rendimiento, el porcentaje de food cost, tu food cost real de un mes y la diferencia entre teoría y práctica. Con ejemplos de cálculo.',
    h1: 'Cómo calcular el food cost y controlar tus márgenes',
    lead: 'Después del personal, los ingredientes son el mayor gasto de casi cualquier cocina. Unos pocos puntos de food cost deciden si al final queda algo. Por suerte, las cuentas son sencillas.',
    brief: [
      'Porcentaje de food cost = coste de los ingredientes ÷ precio de venta sin IVA × 100.',
      'Calcula cada plato con su rendimiento: lo que recortas también lo pagas.',
      'En un mes: existencias iniciales + compras − existencias finales. La diferencia con lo que debería haber costado muestra dónde se escapa el dinero.'
    ],
    sections: [
      [
        '¿Qué es el food cost?',
        'El food cost es lo que gastas en los ingredientes de lo que vendes. Puedes expresarlo en euros o como porcentaje de la facturación. Ese porcentaje es la cifra con la que diriges: muestra cuánto de cada euro que ganas va directo a ingredientes.\n\nUn plato con 4 € de ingredientes está bien a un precio de 16 €, pero es un problema a 9 €. Calcula siempre con el precio sin IVA: el IVA no es tuyo.',
        {
          shot: IMG('foodcostpercentage', 'es'),
          alt: 'Porcentaje de food cost: food cost dividido por la facturación sin IVA, por 100',
          caption: 'La fórmula, con el ejemplo del risotto de más abajo.',
          wide: true
        }
      ],
      [
        'Calcular el food cost por plato',
        'El coste de un plato es la base de todo. Así se calcula:',
        {
          steps: [
            ['Anota cada ingrediente', 'Con la cantidad por ración. No olvides la guarnición, la salsa y el aceite: lo pequeño suma.'],
            ['Busca el precio de compra', 'Por kilo, litro o unidad, tal como lo pagas de verdad.'],
            ['Corrige por rendimiento', 'Limpiar, pelar y deshuesar cuesta peso. Si de un kilo sacas 850 gramos de setas aprovechables, el rendimiento es del 85 % y el precio real es el precio de compra ÷ 0,85.'],
            ['Súmalo todo', 'Ese es tu coste por ración.'],
            ['Divide por el precio de venta sin IVA', 'Por 100, y tienes el porcentaje de food cost.']
          ]
        },
        {
          head: ['Ingrediente', 'Por ración', 'Precio de compra', 'Rendimiento', 'Coste'],
          rows: [
            ['Mezcla de setas', '120 g', '14,00 €/kg', '85 %', '1,98 €'],
            ['Parmesano', '25 g', '24,00 €/kg', '100 %', '0,60 €'],
            ['Caldo de pollo', '350 ml', '1,20 €/l', '100 %', '0,42 €'],
            ['Arroz arborio', '90 g', '4,20 €/kg', '100 %', '0,38 €'],
            ['Vino blanco', '50 ml', '6,00 €/l', '100 %', '0,30 €'],
            ['Chalota, ajo, hierbas', '–', '–', '–', '0,25 €'],
            ['Mantequilla', '20 g', '9,00 €/kg', '100 %', '0,18 €'],
            ['**Total**', '', '', '', '**4,10 €**']
          ],
          note: 'Ejemplo de cálculo: risotto de setas. Las cantidades son un ejemplo, no una media.'
        },
        {
          shot: IMG('risotto-kostprijs', 'es'),
          alt: 'Coste de un plato de risotto por ingrediente: 4,10 € en total, 22,9 % de food cost',
          caption: 'El risotto cuesta 19,50 € en la carta, 17,89 € sin el 9 % de IVA (el tipo neerlandés para comida): 4,10 ÷ 17,89 × 100 = 22,9 %.',
          wide: true
        }
      ],
      [
        'Tu food cost real de un mes',
        'El coste por plato es la teoría. Lo que tu cocina consume de verdad solo se ve en un periodo fijo, como una semana o un mes. Necesitas tres cifras: tus existencias al principio, lo que has comprado y tus existencias al final.\n\nExistencias iniciales + compras − existencias finales = food cost real. Divídelo por la facturación sin IVA del mismo periodo y tienes tu porcentaje de food cost real.',
        {
          shot: IMG('werkelijke-foodcost', 'es'),
          alt: 'Food cost real en octubre: 8.500 € + 12.000 € − 7.900 € = 12.600 €, o el 30 % de 42.000 € de facturación',
          caption: 'Ejemplo para octubre: 12.600 € de ingredientes sobre 42.000 € de facturación es un 30 %.',
          wide: true
        },
        { tip: ['Cuenta siempre en el mismo momento', 'Haz el inventario el mismo día y a la misma hora, por ejemplo el último domingo después del servicio. Si no, comparas periodos que no son comparables.'] }
      ],
      [
        'Teoría frente a realidad',
        'Si sumas el coste de todos los platos vendidos, obtienes tu food cost teórico: lo que debería haber costado. La diferencia con tu food cost real se llama desviación. Cuanto más cerca de cero, mejor controlada está tu cocina.\n\nSi en octubre tu food cost teórico fue del 27 % y el real del 30 %, desaparecieron 3 puntos porcentuales sin que nadie lo notara. Sobre 42.000 € de facturación, son 1.260 € en un solo mes.',
        {
          shot: IMG('variantie', 'es'),
          alt: 'Food cost teórico del 27 % frente al real del 30 %: 3 puntos porcentuales, 1.260 € al mes',
          caption: 'La diferencia entre teoría y realidad es dinero que desaparece sin que se note.',
          wide: true
        },
        ['**Merma**: lo que caduca o sale mal.', '**Raciones demasiado grandes**: diez gramos de más por plato suman.', '**Entregas**: el peso, la calidad o el precio no coinciden con el pedido.', '**Recetas desactualizadas**: el coste se calculó con precios viejos o una versión antigua de la receta.']
      ],
      [
        '¿Qué es un buen food cost?',
        'No existe una cifra mágica: un local con producto caro está más alto que una cafetería o una pizzería. Como comparación: en 2024 los restaurantes neerlandeses dedicaron de media el 31,1 % de sus ingresos a compras, comida y bebida juntas (CBS). Más cifras en [¿Cuánto cuesta un restaurante?](/es/blog/costes-y-margenes-restaurante).\n\nSi conoces tu propio objetivo, calculas hacia atrás un precio de venta: coste por ración ÷ porcentaje objetivo = precio de venta sin IVA. Después comprueba si ese precio encaja con tus clientes y tu competencia. Una fórmula es un punto de partida, no un veredicto.',
        { example: ['Del objetivo al precio de venta', ['Coste del risotto: 4,10 €', 'Objetivo: 25 % de food cost', '4,10 ÷ 0,25 = 16,40 € sin IVA', 'Con 9 % de IVA: 17,88 €, redondeado a 18 € en la carta']] }
      ],
      [
        'Cómo bajar tu food cost',
        'La mayor ganancia no está en comprar más barato, sino en dejar escapar menos.',
        {
          check: [
            '**Trabaja con recetas fijas.** Quien dosifica a ojo hace cada vez un plato distinto con un coste distinto. Lee también [Fichas técnicas](/es/blog/fichas-tecnicas-de-cocina).',
            '**Mantén al día tus precios de compra.** Una receta con los precios del año pasado te miente.',
            '**Pesa y porciona.** Sobre todo carne, pescado y queso.',
            '**Lleva un registro de mermas.** ¿Qué se tira y por qué? En unas semanas verás patrones.',
            '**Aprovecha el producto entero.** Pieles, huesos y recortes se convierten en fondo, salsa o comida de personal.',
            '**Revisa las entregas.** Peso, calidad y el precio de la factura.'
          ],
          title: 'Seis hábitos que se notan enseguida'
        }
      ],
      [
        'El food cost empieza en tus recetas',
        'Todos los cálculos de arriba dependen de recetas correctas que todos en la cocina siguen igual. Para eso está Savour: una biblioteca de recetas clara, compartida con tu brigada, para que cada cocinero haga el mismo plato con el mismo coste.\n\nY pronto Savour también hará las cuentas por ti: la [calculadora de food cost](/es/blog/calculadora-food-cost) calcula el coste de un plato o de toda tu carta a partir de tus propias recetas, con los precios de tu proveedor.'
      ]
    ],
    outro: 'Las cantidades de este artículo son un ejemplo de cálculo. Para tu propia cocina, calcula siempre con tus propios precios.'
  }
};

export const FOODCOST_CALC_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/calculer-food-cost',
    title: 'Calculer le food cost : par plat et par mois',
    desc: 'Comment calculer le food cost : le coût par plat avec le rendement, le pourcentage de food cost, ton food cost réel sur un mois et l’écart entre théorie et pratique. Avec des exemples de calcul.',
    h1: 'Calculer le food cost et garder la main sur tes marges',
    lead: 'Après le personnel, les ingrédients sont le plus gros poste de dépenses de presque toutes les cuisines. Quelques points de food cost décident s’il reste quelque chose à la fin. Heureusement, le calcul est simple.',
    brief: [
      'Pourcentage de food cost = coût des ingrédients ÷ prix de vente hors TVA × 100.',
      'Calcule chaque plat avec son rendement : ce que tu retires, tu le paies aussi.',
      'Sur un mois : stock initial + achats − stock final. L’écart avec ce que ça aurait dû coûter montre où l’argent s’échappe.'
    ],
    sections: [
      [
        'Qu’est-ce que le food cost ?',
        'Le food cost, c’est ce que tu dépenses pour les ingrédients de ce que tu vends. Tu peux l’exprimer en euros, ou en pourcentage du chiffre d’affaires. Ce pourcentage est le chiffre qui te guide : il montre quelle part de chaque euro gagné part directement dans les ingrédients.\n\nUn plat avec 4 € d’ingrédients va très bien à un prix de 16 €, mais pose problème à 9 €. Calcule toujours avec le prix hors TVA : la TVA n’est pas à toi.',
        {
          shot: IMG('foodcostpercentage', 'fr'),
          alt: 'Pourcentage de food cost : food cost divisé par le chiffre d’affaires hors TVA, fois 100',
          caption: 'La formule, avec l’exemple du risotto plus bas.',
          wide: true
        }
      ],
      [
        'Calculer le food cost par plat',
        'Le coût d’une assiette est la base de tout. Voici comment le calculer :',
        {
          steps: [
            ['Note chaque ingrédient', 'Avec la quantité par portion. N’oublie pas la garniture, la sauce et l’huile : les petits postes s’additionnent.'],
            ['Cherche le prix d’achat', 'Au kilo, au litre ou à la pièce, tel que tu le paies vraiment.'],
            ['Corrige avec le rendement', 'Nettoyer, éplucher et désosser fait perdre du poids. Si tu tires 850 grammes de champignons utilisables d’un kilo, ton rendement est de 85 % et le vrai prix est le prix d’achat ÷ 0,85.'],
            ['Additionne tout', 'C’est ton coût par portion.'],
            ['Divise par le prix de vente hors TVA', 'Fois 100, et tu as le pourcentage de food cost.']
          ]
        },
        {
          head: ['Ingrédient', 'Par portion', 'Prix d’achat', 'Rendement', 'Coût'],
          rows: [
            ['Mélange de champignons', '120 g', '14,00 €/kg', '85 %', '1,98 €'],
            ['Parmesan', '25 g', '24,00 €/kg', '100 %', '0,60 €'],
            ['Bouillon de volaille', '350 ml', '1,20 €/l', '100 %', '0,42 €'],
            ['Riz arborio', '90 g', '4,20 €/kg', '100 %', '0,38 €'],
            ['Vin blanc', '50 ml', '6,00 €/l', '100 %', '0,30 €'],
            ['Échalote, ail, herbes', '–', '–', '–', '0,25 €'],
            ['Beurre', '20 g', '9,00 €/kg', '100 %', '0,18 €'],
            ['**Total**', '', '', '', '**4,10 €**']
          ],
          note: 'Exemple de calcul : risotto aux champignons. Les montants sont un exemple, pas une moyenne.'
        },
        {
          shot: IMG('risotto-kostprijs', 'fr'),
          alt: 'Coût d’une assiette de risotto par ingrédient : 4,10 € au total, 22,9 % de food cost',
          caption: 'Le risotto est à 19,50 € sur la carte, 17,89 € sans la TVA de 9 % (le taux néerlandais pour la nourriture) : 4,10 ÷ 17,89 × 100 = 22,9 %.',
          wide: true
        }
      ],
      [
        'Ton food cost réel sur un mois',
        'Le coût par plat, c’est la théorie. Ce que ta cuisine consomme vraiment ne se voit que sur une période fixe, comme une semaine ou un mois. Il te faut trois chiffres : ton stock au début, ce que tu as acheté et ton stock à la fin.\n\nStock initial + achats − stock final = food cost réel. Divise-le par le chiffre d’affaires hors TVA de la même période, et tu as ton pourcentage de food cost réel.',
        {
          shot: IMG('werkelijke-foodcost', 'fr'),
          alt: 'Food cost réel en octobre : 8 500 € + 12 000 € − 7 900 € = 12 600 €, soit 30 % de 42 000 € de chiffre d’affaires',
          caption: 'Exemple pour octobre : 12 600 € d’ingrédients pour 42 000 € de chiffre d’affaires, soit 30 %.',
          wide: true
        },
        { tip: ['Compte toujours au même moment', 'Fais ton inventaire le même jour et à la même heure, par exemple le dernier dimanche après le service. Sinon, tu compares des périodes qui ne sont pas comparables.'] }
      ],
      [
        'Théorie et réalité',
        'Si tu additionnes le coût de tous les plats vendus, tu obtiens ton food cost théorique : ce que ça aurait dû coûter. L’écart avec ton food cost réel s’appelle la variance. Plus elle est proche de zéro, mieux ta cuisine est maîtrisée.\n\nSi ton food cost théorique d’octobre était de 27 % et le réel de 30 %, 3 points ont disparu sans que personne ne le remarque. Sur 42 000 € de chiffre d’affaires, cela fait 1 260 € en un seul mois.',
        {
          shot: IMG('variantie', 'fr'),
          alt: 'Food cost théorique de 27 % contre 30 % réel : 3 points, 1 260 € par mois',
          caption: 'L’écart entre théorie et réalité, c’est de l’argent qui disparaît sans bruit.',
          wide: true
        },
        ['**Gaspillage** : ce qui se périme ou se rate.', '**Portions trop grandes** : dix grammes de plus par assiette, ça s’additionne.', '**Livraisons** : le poids, la qualité ou le prix ne correspondent pas à la commande.', '**Recettes dépassées** : le coût a été calculé avec d’anciens prix ou une ancienne version de la recette.']
      ],
      [
        'Qu’est-ce qu’un bon food cost ?',
        'Il n’existe pas de chiffre magique : une maison aux produits chers est plus haut qu’un salon de thé ou une pizzeria. Pour comparer : en 2024, les restaurants néerlandais ont consacré en moyenne 31,1 % de leurs recettes aux achats, nourriture et boissons ensemble (CBS). Plus de chiffres dans [Combien coûte un restaurant ?](/fr/blog/couts-et-marges-restaurant).\n\nSi tu connais ton propre objectif, tu remontes à un prix de vente : coût par portion ÷ pourcentage cible = prix de vente hors TVA. Vérifie ensuite si ce prix convient à tes clients et à ta concurrence. Une formule est un point de départ, pas un verdict.',
        { example: ['De l’objectif au prix de vente', ['Coût du risotto : 4,10 €', 'Objectif : 25 % de food cost', '4,10 ÷ 0,25 = 16,40 € hors TVA', 'Avec 9 % de TVA : 17,88 €, arrondi à 18 € sur la carte']] }
      ],
      [
        'Comment baisser ton food cost',
        'Le plus gros gain n’est pas d’acheter moins cher, mais de laisser moins s’échapper.',
        {
          check: [
            '**Travaille avec des recettes fixes.** Doser au feeling, c’est faire chaque fois un plat différent à un coût différent. Lis aussi [Fiches techniques](/fr/blog/fiches-techniques-cuisine).',
            '**Tiens tes prix d’achat à jour.** Une recette chiffrée avec les prix de l’an dernier te ment.',
            '**Pèse et portionne.** Surtout la viande, le poisson et le fromage.',
            '**Tiens un registre des pertes.** Qu’est-ce qui part à la poubelle, et pourquoi ? Au bout de quelques semaines, tu vois des tendances.',
            '**Utilise le produit entier.** Épluchures, os et parures deviennent fond, sauce ou repas du personnel.',
            '**Contrôle les livraisons.** Poids, qualité et prix sur la facture.'
          ],
          title: 'Six habitudes qui changent tout de suite la donne'
        }
      ],
      [
        'Le food cost commence par tes recettes',
        'Tous les calculs ci-dessus dépendent de recettes justes que toute la cuisine suit de la même façon. C’est à ça que sert Savour : une bibliothèque de recettes claire, partagée avec ta brigade, pour que chaque cuisinier fasse le même plat au même coût.\n\nEt bientôt, Savour fera aussi le calcul pour toi : le [calculateur de food cost](/fr/blog/calculateur-food-cost) calcule le coût d’un plat ou de toute ta carte à partir de tes propres recettes, avec les prix de ton fournisseur.'
      ]
    ],
    outro: 'Les montants de cet article sont un exemple de calcul. Pour ta propre cuisine, calcule toujours avec tes propres prix.'
  }
};
