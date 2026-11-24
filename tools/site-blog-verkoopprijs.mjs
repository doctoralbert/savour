// Blog: gratis foodcost calculator (gepland voor 2026-11-24), in vijf talen, met de calculator uit js/foodcost-calc.js
// bovenaan. Eerst gepland als "Verkoopprijs berekenen"; op verzoek van de eigenaar een gratis calculator geworden.
// Aanvulling op "Foodcost berekenen" (formules en opbrengst staan daar): dit artikel gaat over prijzen, marge in euro's
// en wanneer je opnieuw rekent. Geïnspireerd door de onderwerpen van de foodcost-calculator van Apicbase, in eigen
// woorden en eigen voorbeelden; geen cijfers van hen overgenomen. Alle bedragen zijn rekenvoorbeelden, geen gemiddelden.
// Btw alleen voor Nederland (9% op eten); in de andere talen "de btw van je land" (niet nagekeken per land).
// Savour heeft de foodcost calculator nog niet: alleen verwijzen naar het artikel "binnenkort".

const KEY = 'en/blog/free-food-cost-calculator';

// Rekenvoorbeeld (zonder btw): A bordkost 6,40, doel 30% → 21,33, gekozen 21,50 → 29,8%, marge 15,10.
// B bordkost 2,10, prijs 14,50 → 14,5%, marge 12,40.

export const PRICE_POST = {
  id: 'verkoopprijs',
  date: '2026-11-24',
  photo: 'blogVerkoopprijs',
  rich: true,
  nl: {
    slug: 'blog/gratis-foodcost-calculator',
    title: "Gratis foodcost calculator: kostprijs en verkoopprijs per gerecht",
    desc: "Gratis foodcost calculator voor de horeca: reken de kostprijs per portie uit met opbrengst, kies je doel-foodcost en zie direct de adviesprijs, je foodcost en de marge per bord. Zonder account.",
    h1: "Gratis foodcost calculator: kostprijs, foodcost en verkoopprijs",
    lead: "Vul je ingrediënten in en zie meteen wat een portie kost, welke prijs bij je doel past en wat je per bord overhoudt. Gratis en zonder account. Daaronder lees je hoe je de uitkomst gebruikt.",
    brief: ["De calculator rekent met de opbrengst: wat je wegsnijdt, betaal je ook.","Kies je doel-foodcost en zie de adviesprijs zonder en met btw.","Vul je eigen kaartprijs in en zie je foodcost en de marge per bord in euro’s."],
    sections: [
      ["De calculator", "Begin met een gerecht en het aantal porties. Weet je niet waar je moet beginnen? Kies Voorbeeld laden.", { calculator: 'foodcost', noscript: "Zet JavaScript aan om de calculator te gebruiken." }],
      ["Zo gebruik je hem", "In vier stappen van inkoopprijs naar kaartprijs.", { steps: [["Ingrediënten","Per ingrediënt de hoeveelheid per recept, de inkoopprijs en waar die prijs voor geldt (per kilo, liter of stuk)."],["Opbrengst","Het deel dat overblijft na schoonmaken of uitbenen. Haal je 850 gram uit een kilo, vul dan 85 in."],["Porties","Voor hoeveel porties het recept is. De calculator deelt de kosten daardoor."],["Doel en prijs","Schuif je doel-foodcost en lees de adviesprijs af, of vul je eigen kaartprijs in voor je foodcost en marge."]] }],
      [
        'Eerst de bordkost',
        'Alles begint bij wat één portie kost: elk ingrediënt met zijn hoeveelheid, de inkoopprijs en de opbrengst na schoonmaken, opgeteld. Hoe je dat precies uitrekent, met een volledig voorbeeld, staat in [Foodcost berekenen](/blog/foodcost-berekenen). Hier gaan we verder waar dat artikel ophoudt: wat vraag je voor dat bord?'
      ],
      [
        'Van bordkost naar verkoopprijs',
        'Kies eerst welk deel van de prijs naar ingrediënten mag gaan: je doel-foodcost. Deel de bordkost daardoor en je hebt de verkoopprijs zonder btw.',
        {
          example: [
            'Rekenvoorbeeld',
            [
              'Bordkost entrecote met frites: **€ 6,40**',
              'Doel-foodcost: **30%**',
              '6,40 ÷ 0,30 = **€ 21,33** zonder btw',
              'Gekozen prijs zonder btw: **€ 21,50** → 6,40 ÷ 21,50 = **29,8%** foodcost'
            ]
          ]
        },
        { tip: ['Een voorbeeld, geen norm', 'De bedragen en de 30% zijn een rekenvoorbeeld. Welk percentage bij jouw zaak past, hangt af van je concept, je kaart en je andere kosten.'] }
      ],
      [
        'Btw en afronden',
        'Reken altijd zonder btw: die is niet van jou. Daarna komt de btw erbij; in Nederland is dat 9% op eten. Rond af naar een prijs die bij je kaart past en reken het foodcostpercentage daarna nog één keer na, want afronden verandert het percentage een beetje.'
      ],
      [
        'Kijk naar euro’s, niet alleen naar procenten',
        'Een laag foodcostpercentage voelt goed, maar je betaalt je huur met euro’s. Vergelijk twee gerechten uit hetzelfde voorbeeld:',
        {
          head: ['Gerecht', 'Bordkost', 'Prijs zonder btw', 'Foodcost', 'Marge per bord'],
          rows: [
            ['Entrecote met frites', '€ 6,40', '€ 21,50', '29,8%', '€ 15,10'],
            ['Pasta met tomaat', '€ 2,10', '€ 14,50', '14,5%', '€ 12,40']
          ],
          note: 'Rekenvoorbeeld. De pasta heeft het laagste percentage, maar de entrecote laat per bord meer over.'
        },
        { tip: ["Marge per bord", 'Marge per bord = verkoopprijs zonder btw − bordkost. Als percentage: marge ÷ verkoopprijs × 100; dat is 100% min je foodcost. Welke gerechten je kaart dragen, zie je pas als je beide naast elkaar zet: hoeveel een bord oplevert en hoe vaak het verkocht wordt.'] }
      ],
      [
        'Wanneer je opnieuw rekent',
        'Een prijs die vorig jaar klopte, klopt nu misschien niet meer. Reken een gerecht opnieuw door als:',
        [
          'je leverancier de prijs van een belangrijk ingrediënt verandert;',
          'het recept verandert, ook als het maar een andere garnituur is;',
          'de portie groter of kleiner wordt;',
          'er een vast moment is afgesproken, bijvoorbeeld bij elke kaartwissel.'
        ]
      ],
      [
        'Bezorging en afhalen',
        'Verkoop je ook via een bezorgplatform, reken dan de commissie en de verpakking mee in je bordkost voor dat kanaal. Hetzelfde gerecht kan aan tafel een goede marge hebben en via bezorging bijna niets opleveren.'
      ],
      [
        'Zo helpt Savour',
        'Een goede prijs begint bij een recept dat klopt: vaste hoeveelheden, een vaste opbrengst en de juiste portie. Dat is wat Savour vandaag doet, met [standaardrecepturen](/blog/standaardrecepturen-in-de-keuken) die je omrekent naar elke hoeveelheid. Deze gratis calculator rekent één gerecht tegelijk. In Savour komt een uitgebreide foodcost calculator die rekent vanuit je eigen recepten, met de prijslijst van je leverancier en je eigen korting, door basisrecepten heen: [lees wat er komt](/blog/foodcost-calculator).'
      ],
      [
        'Veelgestelde vragen',
        'Kort antwoord op wat koks het vaakst vragen.',
        {
          faq: [
            ['Hoe bereken ik de verkoopprijs van een gerecht?', 'Deel de bordkost door je doel-foodcost (als getal, dus 30% = 0,30). Dat is de prijs zonder btw. Tel de btw erbij en rond af.'],
            ['Wat is het verschil tussen foodcost en marge?', 'Foodcost is het deel van de prijs dat naar ingrediënten gaat; de marge is wat er per bord overblijft. Samen zijn ze 100% van de prijs zonder btw.'],
            ['Moet ik met of zonder btw rekenen?', 'Zonder btw, aan beide kanten: inkoopprijzen zonder btw en de verkoopprijs zonder btw.'],
            ['Hoe vaak moet ik mijn prijzen narekenen?', 'Bij elke prijswijziging van een belangrijk ingrediënt, bij elke receptwijziging en op een vast moment, zoals bij een nieuwe kaart.']
          ]
        }
      ]
    ],
    outro: 'De bedragen in dit artikel zijn rekenvoorbeelden. Reken met je eigen recepten en je eigen inkoopprijzen.'
  },
  en: {
    slug: KEY,
    title: "Free food cost calculator: plate cost and menu price per dish",
    desc: "Free food cost calculator for restaurants: work out the cost per portion with yield, choose your target food cost and see the suggested price, your food cost and the margin per plate. No account needed.",
    h1: "Free food cost calculator: plate cost, food cost and menu price",
    lead: "Enter your ingredients and see right away what a portion costs, which price fits your target and what you keep per plate. Free, no account. Below you read how to use the result.",
    brief: ["The calculator works with yield: what you trim, you pay for too.","Choose your target food cost and see the suggested price before and with tax.","Enter your own menu price and see your food cost and the margin per plate in money."],
    sections: [
      ["The calculator", "Start with a dish and the number of portions. Not sure where to start? Choose Load example.", { calculator: 'foodcost', noscript: "Turn on JavaScript to use the calculator." }],
      ["How to use it", "From purchase price to menu price in four steps.", { steps: [["Ingredients","Per ingredient the quantity in the recipe, the purchase price and what that price is for (per kilo, litre or piece)."],["Yield","The share left after trimming or boning. If you get 850 grams from a kilo, enter 85."],["Portions","How many portions the recipe makes. The calculator divides the cost by it."],["Target and price","Slide your target food cost and read the suggested price, or enter your own menu price for your food cost and margin."]] }],
      [
        'Start with the plate cost',
        'It all starts with what one portion costs: every ingredient with its quantity, the purchase price and the yield after trimming, added up. How to work that out, with a full example, is in [How to calculate food cost](/en/blog/how-to-calculate-food-cost). Here we carry on where that article stops: what do you charge for that plate?'
      ],
      [
        'From plate cost to selling price',
        'First choose how much of the price may go to ingredients: your target food cost. Divide the plate cost by it and you have the selling price before tax.',
        {
          example: [
            'Worked example',
            [
              'Plate cost steak and fries: **€6.40**',
              'Target food cost: **30%**',
              '6.40 ÷ 0.30 = **€21.33** before tax',
              'Chosen price before tax: **€21.50** → 6.40 ÷ 21.50 = **29.8%** food cost'
            ]
          ]
        },
        { tip: ['An example, not a norm', 'The amounts and the 30% are a worked example. Which percentage suits your place depends on your concept, your menu and your other costs.'] }
      ],
      [
        'Tax and rounding',
        'Always calculate before tax: it is not yours. Then add the sales tax that applies in your country. Round to a price that fits your menu and check the food cost percentage once more, because rounding changes it slightly.'
      ],
      [
        'Look at money, not only at percentages',
        'A low food cost percentage feels good, but you pay the rent in money. Compare two dishes from the same example:',
        {
          head: ['Dish', 'Plate cost', 'Price before tax', 'Food cost', 'Margin per plate'],
          rows: [
            ['Steak and fries', '€6.40', '€21.50', '29.8%', '€15.10'],
            ['Tomato pasta', '€2.10', '€14.50', '14.5%', '€12.40']
          ],
          note: 'Worked example. The pasta has the lowest percentage, but the steak leaves more per plate.'
        },
        { tip: ["Margin per plate", 'Margin per plate = selling price before tax − plate cost. As a percentage: margin ÷ selling price × 100, which is 100% minus your food cost. You only see which dishes carry your menu when you put both side by side: how much a plate earns and how often it sells.'] }
      ],
      [
        'When to recalculate',
        'A price that was right last year may not be right now. Recalculate a dish when:',
        [
          'your supplier changes the price of an important ingredient;',
          'the recipe changes, even if it is only a different garnish;',
          'the portion gets bigger or smaller;',
          'at an agreed moment, for example at every menu change.'
        ]
      ],
      [
        'Delivery and takeaway',
        'If you also sell through a delivery platform, add the commission and the packaging to your plate cost for that channel. The same dish can have a good margin at the table and earn almost nothing through delivery.'
      ],
      [
        'How Savour helps',
        'A good price starts with a recipe that is right: fixed quantities, a fixed yield and the right portion. That is what Savour does today, with [standardised recipes](/en/blog/standardised-recipes) you scale to any quantity. This free calculator works out one dish at a time. Savour is getting a full food cost calculator that works from your own recipes, with your supplier’s price list and your own discount, through base recipes: [read what is coming](/en/blog/food-cost-calculator).'
      ],
      [
        'Frequently asked questions',
        'Short answers to what chefs ask most.',
        {
          faq: [
            ['How do I calculate the selling price of a dish?', 'Divide the plate cost by your target food cost (as a number, so 30% = 0.30). That is the price before tax. Add the tax and round.'],
            ['What is the difference between food cost and margin?', 'Food cost is the share of the price that goes to ingredients; the margin is what is left per plate. Together they are 100% of the price before tax.'],
            ['Do I calculate with or without tax?', 'Without tax, on both sides: purchase prices without tax and the selling price without tax.'],
            ['How often should I recalculate my prices?', 'With every price change of an important ingredient, every recipe change and at a fixed moment, such as a new menu.']
          ]
        }
      ]
    ],
    outro: 'The amounts in this article are worked examples. Calculate with your own recipes and your own purchase prices.'
  }
};

export const PRICE_POST_DE = {
  [KEY]: {
    slug: 'de/blog/wareneinsatz-rechner-kostenlos',
    title: "Kostenloser Wareneinsatz-Rechner: Kosten und Verkaufspreis pro Gericht",
    desc: "Kostenloser Wareneinsatz-Rechner für die Gastronomie: Kosten pro Portion mit Ausbeute berechnen, Ziel-Wareneinsatz wählen und sofort Preisvorschlag, Wareneinsatz und Rohertrag pro Teller sehen. Ohne Konto.",
    h1: "Kostenloser Wareneinsatz-Rechner: Kosten, Wareneinsatz und Verkaufspreis",
    lead: "Trag deine Zutaten ein und sieh sofort, was eine Portion kostet, welcher Preis zu deinem Ziel passt und was pro Teller übrig bleibt. Kostenlos und ohne Konto. Darunter liest du, wie du das Ergebnis nutzt.",
    brief: ["Der Rechner rechnet mit der Ausbeute: Was du wegschneidest, bezahlst du auch.","Wähle deinen Ziel-Wareneinsatz und sieh den Preisvorschlag netto und brutto.","Trag deinen eigenen Kartenpreis ein und sieh deinen Wareneinsatz und den Rohertrag pro Teller in Euro."],
    sections: [
      ["Der Rechner", "Beginne mit einem Gericht und der Zahl der Portionen. Unsicher, wo du anfangen sollst? Wähle Beispiel laden.", { calculator: 'foodcost', noscript: "Aktiviere JavaScript, um den Rechner zu nutzen." }],
      ["So nutzt du ihn", "In vier Schritten vom Einkaufspreis zum Kartenpreis.", { steps: [["Zutaten","Pro Zutat die Menge in der Rezeptur, den Einkaufspreis und wofür dieser Preis gilt (pro Kilo, Liter oder Stück)."],["Ausbeute","Der Teil, der nach dem Putzen oder Auslösen übrig bleibt. Bekommst du 850 Gramm aus einem Kilo, trag 85 ein."],["Portionen","Für wie viele Portionen die Rezeptur ist. Der Rechner teilt die Kosten dadurch."],["Ziel und Preis","Schiebe deinen Ziel-Wareneinsatz und lies den Preisvorschlag ab, oder trag deinen eigenen Kartenpreis für Wareneinsatz und Rohertrag ein."]] }],
      [
        'Zuerst der Wareneinsatz pro Teller',
        'Alles beginnt mit dem, was eine Portion kostet: jede Zutat mit Menge, Einkaufspreis und Ausbeute nach dem Putzen, zusammengezählt. Wie du das genau berechnest, mit einem vollständigen Beispiel, steht in [Wareneinsatz berechnen](/de/blog/wareneinsatz-berechnen). Hier geht es dort weiter, wo dieser Artikel aufhört: Was verlangst du für den Teller?'
      ],
      [
        'Vom Wareneinsatz zum Verkaufspreis',
        'Lege zuerst fest, welcher Teil des Preises für Zutaten sein darf: deinen Ziel-Wareneinsatz. Teile den Wareneinsatz pro Teller dadurch und du hast den Nettoverkaufspreis.',
        {
          example: [
            'Rechenbeispiel',
            [
              'Wareneinsatz Entrecôte mit Pommes: **6,40 €**',
              'Ziel-Wareneinsatz: **30 %**',
              '6,40 ÷ 0,30 = **21,33 €** netto',
              'Gewählter Nettopreis: **21,50 €** → 6,40 ÷ 21,50 = **29,8 %** Wareneinsatz'
            ]
          ]
        },
        { tip: ['Ein Beispiel, keine Norm', 'Die Beträge und die 30 % sind ein Rechenbeispiel. Welcher Prozentsatz zu deinem Betrieb passt, hängt von Konzept, Karte und deinen übrigen Kosten ab.'] }
      ],
      [
        'Mehrwertsteuer und Runden',
        'Rechne immer netto: Die Mehrwertsteuer gehört nicht dir. Danach kommt der Steuersatz dazu, der in deinem Land gilt. Runde auf einen Preis, der zu deiner Karte passt, und prüfe den Wareneinsatz danach noch einmal, denn Runden verändert ihn ein wenig.'
      ],
      [
        'Auf Euro schauen, nicht nur auf Prozente',
        'Ein niedriger Wareneinsatz fühlt sich gut an, aber die Miete zahlst du in Euro. Vergleiche zwei Gerichte aus demselben Beispiel:',
        {
          head: ['Gericht', 'Wareneinsatz', 'Preis netto', 'Wareneinsatz %', 'Rohertrag pro Teller'],
          rows: [
            ['Entrecôte mit Pommes', '6,40 €', '21,50 €', '29,8 %', '15,10 €'],
            ['Pasta mit Tomate', '2,10 €', '14,50 €', '14,5 %', '12,40 €']
          ],
          note: 'Rechenbeispiel. Die Pasta hat den niedrigsten Prozentsatz, aber das Entrecôte bringt pro Teller mehr.'
        },
        { tip: ["Rohertrag pro Teller", 'Rohertrag pro Teller = Nettoverkaufspreis − Wareneinsatz. In Prozent: Rohertrag ÷ Verkaufspreis × 100, also 100 % minus Wareneinsatz. Welche Gerichte deine Karte tragen, siehst du erst, wenn du beides nebeneinanderlegst: wie viel ein Teller bringt und wie oft er verkauft wird.'] }
      ],
      [
        'Wann du neu rechnest',
        'Ein Preis, der letztes Jahr gestimmt hat, stimmt heute vielleicht nicht mehr. Rechne ein Gericht neu, wenn:',
        [
          'dein Lieferant den Preis einer wichtigen Zutat ändert;',
          'sich die Rezeptur ändert, auch wenn es nur eine andere Garnitur ist;',
          'die Portion größer oder kleiner wird;',
          'ein fester Zeitpunkt vereinbart ist, zum Beispiel bei jedem Kartenwechsel.'
        ]
      ],
      [
        'Lieferung und Abholung',
        'Verkaufst du auch über eine Lieferplattform, rechne die Provision und die Verpackung für diesen Kanal in den Wareneinsatz ein. Dasselbe Gericht kann am Tisch einen guten Rohertrag haben und über die Lieferung fast nichts bringen.'
      ],
      [
        'So hilft Savour',
        'Ein guter Preis beginnt mit einer Rezeptur, die stimmt: feste Mengen, feste Ausbeute und die richtige Portion. Das macht Savour heute, mit [Standardrezepturen](/de/blog/standardrezepturen-gastronomie), die du auf jede Menge hochrechnest, und der [Rezepturverwaltung](/de/rezepturverwaltung). Dieser kostenlose Rechner rechnet ein Gericht nach dem anderen. In Savour kommt ein umfassender Wareneinsatz-Rechner, der aus deinen eigenen Rezepturen rechnet, mit der Preisliste deines Lieferanten und deinem eigenen Rabatt, auch über Grundrezepte: [lies, was kommt](/de/blog/wareneinsatz-rechner).'
      ],
      [
        'Häufige Fragen',
        'Kurze Antworten auf das, was Köche am häufigsten fragen.',
        {
          faq: [
            ['Wie berechne ich den Verkaufspreis eines Gerichts?', 'Teile den Wareneinsatz pro Teller durch deinen Ziel-Wareneinsatz (als Zahl, also 30 % = 0,30). Das ist der Nettopreis. Rechne die Mehrwertsteuer dazu und runde.'],
            ['Was ist der Unterschied zwischen Wareneinsatz und Rohertrag?', 'Der Wareneinsatz ist der Teil des Preises, der in Zutaten geht; der Rohertrag ist, was pro Teller übrig bleibt. Zusammen sind sie 100 % des Nettopreises.'],
            ['Rechne ich mit oder ohne Mehrwertsteuer?', 'Ohne, auf beiden Seiten: Einkaufspreise netto und Verkaufspreis netto.'],
            ['Wie oft sollte ich meine Preise neu rechnen?', 'Bei jeder Preisänderung einer wichtigen Zutat, bei jeder Rezepturänderung und zu einem festen Zeitpunkt, etwa bei einer neuen Karte.']
          ]
        }
      ]
    ],
    outro: 'Die Beträge in diesem Artikel sind Rechenbeispiele. Rechne mit deinen eigenen Rezepturen und Einkaufspreisen.'
  }
};

export const PRICE_POST_ES = {
  [KEY]: {
    slug: 'es/blog/calculadora-food-cost-gratis',
    title: "Calculadora de food cost gratis: coste y precio de venta por plato",
    desc: "Calculadora de food cost gratis para hostelería: calcula el coste por ración con rendimiento, elige tu food cost objetivo y ve al instante el precio sugerido, tu food cost y el margen por plato. Sin cuenta.",
    h1: "Calculadora de food cost gratis: coste, food cost y precio de venta",
    lead: "Introduce tus ingredientes y ve al momento lo que cuesta una ración, qué precio encaja con tu objetivo y cuánto te queda por plato. Gratis y sin cuenta. Debajo lees cómo usar el resultado.",
    brief: ["La calculadora tiene en cuenta el rendimiento: lo que recortas, también lo pagas.","Elige tu food cost objetivo y ve el precio sugerido sin y con IVA.","Introduce tu propio precio de carta y ve tu food cost y el margen por plato en euros."],
    sections: [
      ["La calculadora", "Empieza con un plato y el número de raciones. ¿No sabes por dónde empezar? Elige Cargar ejemplo.", { calculator: 'foodcost', noscript: "Activa JavaScript para usar la calculadora." }],
      ["Cómo se usa", "Del precio de compra al precio de carta en cuatro pasos.", { steps: [["Ingredientes","Por ingrediente, la cantidad en la receta, el precio de compra y a qué se refiere ese precio (por kilo, litro o unidad)."],["Rendimiento","La parte que queda después de limpiar o deshuesar. Si sacas 850 gramos de un kilo, introduce 85."],["Raciones","Cuántas raciones da la receta. La calculadora divide el coste entre ellas."],["Objetivo y precio","Mueve tu food cost objetivo y lee el precio sugerido, o introduce tu propio precio de carta para ver tu food cost y margen."]] }],
      [
        'Primero el coste por ración',
        'Todo empieza por lo que cuesta una ración: cada ingrediente con su cantidad, su precio de compra y el rendimiento después de limpiar, sumados. Cómo se calcula, con un ejemplo completo, está en [Cómo calcular el food cost](/es/blog/como-calcular-food-cost). Aquí seguimos donde termina ese artículo: ¿cuánto cobras por ese plato?'
      ],
      [
        'Del coste al precio de venta',
        'Primero decide qué parte del precio puede ir a ingredientes: tu food cost objetivo. Divide el coste por ración entre ese porcentaje y tienes el precio de venta sin IVA.',
        {
          example: [
            'Ejemplo de cálculo',
            [
              'Coste entrecot con patatas: **6,40 €**',
              'Food cost objetivo: **30 %**',
              '6,40 ÷ 0,30 = **21,33 €** sin IVA',
              'Precio elegido sin IVA: **21,50 €** → 6,40 ÷ 21,50 = **29,8 %** de food cost'
            ]
          ]
        },
        { tip: ['Un ejemplo, no una norma', 'Los importes y el 30 % son un ejemplo. El porcentaje adecuado para tu local depende de tu concepto, tu carta y tus otros costes.'] }
      ],
      [
        'IVA y redondeo',
        'Calcula siempre sin IVA: no es tuyo. Después se suma el IVA que corresponda. Redondea a un precio que encaje en tu carta y vuelve a comprobar el food cost, porque redondear lo cambia un poco.'
      ],
      [
        'Mira los euros, no solo los porcentajes',
        'Un food cost bajo da buena sensación, pero el alquiler se paga en euros. Compara dos platos del mismo ejemplo:',
        {
          head: ['Plato', 'Coste por ración', 'Precio sin IVA', 'Food cost', 'Margen por plato'],
          rows: [
            ['Entrecot con patatas', '6,40 €', '21,50 €', '29,8 %', '15,10 €'],
            ['Pasta con tomate', '2,10 €', '14,50 €', '14,5 %', '12,40 €']
          ],
          note: 'Ejemplo de cálculo. La pasta tiene el porcentaje más bajo, pero el entrecot deja más por plato.'
        },
        { tip: ["Margen por plato", 'Margen por plato = precio de venta sin IVA − coste por ración. En porcentaje: margen ÷ precio de venta × 100, es decir, 100 % menos el food cost. Qué platos sostienen tu carta solo se ve si pones las dos cosas juntas: cuánto deja un plato y cuántas veces se vende.'] }
      ],
      [
        'Cuándo volver a calcular',
        'Un precio que era correcto el año pasado puede no serlo hoy. Recalcula un plato cuando:',
        [
          'tu proveedor cambia el precio de un ingrediente importante;',
          'cambia la receta, aunque solo sea otra guarnición;',
          'la ración se hace más grande o más pequeña;',
          'llegue un momento acordado, por ejemplo en cada cambio de carta.'
        ]
      ],
      [
        'Delivery y para llevar',
        'Si también vendes por una plataforma de reparto, suma la comisión y el envase al coste de ese canal. El mismo plato puede tener buen margen en sala y dejar casi nada a domicilio.'
      ],
      [
        'Cómo ayuda Savour',
        'Un buen precio empieza con una receta correcta: cantidades fijas, un rendimiento fijo y la ración adecuada. Eso es lo que hace Savour hoy, con [fichas técnicas](/es/blog/fichas-tecnicas-de-cocina) que escalas a cualquier cantidad. Esta calculadora gratuita calcula un plato cada vez. Savour tendrá una calculadora de food cost completa que calcula a partir de tus propias recetas, con la lista de precios de tu proveedor y tu propio descuento, también a través de las elaboraciones base: [lee lo que viene](/es/blog/calculadora-food-cost).'
      ],
      [
        'Preguntas frecuentes',
        'Respuestas cortas a lo que más preguntan los cocineros.',
        {
          faq: [
            ['¿Cómo calculo el precio de venta de un plato?', 'Divide el coste por ración entre tu food cost objetivo (en número, 30 % = 0,30). Es el precio sin IVA. Suma el IVA y redondea.'],
            ['¿Qué diferencia hay entre food cost y margen?', 'El food cost es la parte del precio que va a ingredientes; el margen es lo que queda por plato. Juntos son el 100 % del precio sin IVA.'],
            ['¿Calculo con o sin IVA?', 'Sin IVA, en los dos lados: precios de compra sin IVA y precio de venta sin IVA.'],
            ['¿Cada cuánto debo revisar mis precios?', 'Con cada cambio de precio de un ingrediente importante, con cada cambio de receta y en un momento fijo, como una carta nueva.']
          ]
        }
      ]
    ],
    outro: 'Los importes de este artículo son ejemplos de cálculo. Calcula con tus propias recetas y tus propios precios de compra.'
  }
};

export const PRICE_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/calculateur-food-cost-gratuit',
    title: "Calculateur de food cost gratuit : coût et prix de vente par plat",
    desc: "Calculateur de food cost gratuit pour la restauration : calcule le coût matière par portion avec le rendement, choisis ton food cost cible et vois aussitôt le prix conseillé, ton food cost et la marge par assiette. Sans compte.",
    h1: "Calculateur de food cost gratuit : coût matière, food cost et prix de vente",
    lead: "Saisis tes ingrédients et vois aussitôt ce que coûte une portion, quel prix correspond à ton objectif et ce qu’il te reste par assiette. Gratuit et sans compte. En dessous, tu lis comment utiliser le résultat.",
    brief: ["Le calculateur tient compte du rendement : ce que tu pares, tu le paies aussi.","Choisis ton food cost cible et vois le prix conseillé HT et TTC.","Saisis ton propre prix carte et vois ton food cost et la marge par assiette en euros."],
    sections: [
      ["Le calculateur", "Commence par un plat et le nombre de portions. Tu ne sais pas par où commencer ? Choisis Charger l’exemple.", { calculator: 'foodcost', noscript: "Active JavaScript pour utiliser le calculateur." }],
      ["Comment l’utiliser", "Du prix d’achat au prix carte en quatre étapes.", { steps: [["Ingrédients","Pour chaque ingrédient, la quantité dans la recette, le prix d’achat et l’unité de ce prix (au kilo, au litre ou à la pièce)."],["Rendement","La part qui reste après parage ou désossage. Si tu obtiens 850 grammes d’un kilo, saisis 85."],["Portions","Le nombre de portions de la recette. Le calculateur divise le coût par ce nombre."],["Objectif et prix","Fais glisser ton food cost cible et lis le prix conseillé, ou saisis ton propre prix carte pour ton food cost et ta marge."]] }],
      [
        'D’abord le coût matière',
        'Tout commence par ce que coûte une portion : chaque ingrédient avec sa quantité, son prix d’achat et le rendement après parage, additionnés. Comment le calculer, avec un exemple complet : [Calculer le food cost](/fr/blog/calculer-food-cost). Ici, on reprend là où cet article s’arrête : combien demandes-tu pour cette assiette ?'
      ],
      [
        'Du coût matière au prix de vente',
        'Décide d’abord quelle part du prix peut aller aux ingrédients : ton food cost cible. Divise le coût matière par ce pourcentage et tu obtiens le prix de vente HT.',
        {
          example: [
            'Exemple chiffré',
            [
              'Coût matière entrecôte-frites : **6,40 €**',
              'Food cost cible : **30 %**',
              '6,40 ÷ 0,30 = **21,33 €** HT',
              'Prix HT choisi : **21,50 €** → 6,40 ÷ 21,50 = **29,8 %** de food cost'
            ]
          ]
        },
        { tip: ['Un exemple, pas une norme', 'Les montants et les 30 % sont un exemple. Le pourcentage qui convient à ton établissement dépend de ton concept, de ta carte et de tes autres charges.'] }
      ],
      [
        'TVA et arrondi',
        'Calcule toujours hors taxes : la TVA n’est pas à toi. Ajoute ensuite le taux qui s’applique dans ton pays. Arrondis à un prix qui va avec ta carte et vérifie une dernière fois le food cost, car l’arrondi le modifie un peu.'
      ],
      [
        'Regarde les euros, pas seulement les pourcentages',
        'Un food cost bas rassure, mais le loyer se paie en euros. Compare deux plats du même exemple :',
        {
          head: ['Plat', 'Coût matière', 'Prix HT', 'Food cost', 'Marge par assiette'],
          rows: [
            ['Entrecôte-frites', '6,40 €', '21,50 €', '29,8 %', '15,10 €'],
            ['Pâtes à la tomate', '2,10 €', '14,50 €', '14,5 %', '12,40 €']
          ],
          note: 'Exemple chiffré. Les pâtes ont le pourcentage le plus bas, mais l’entrecôte laisse plus par assiette.'
        },
        { tip: ["Marge par assiette", 'Marge par assiette = prix de vente HT − coût matière. En pourcentage : marge ÷ prix de vente × 100, soit 100 % moins le food cost. On ne voit quels plats portent la carte qu’en mettant les deux côte à côte : ce que rapporte une assiette et combien de fois elle se vend.'] }
      ],
      [
        'Quand recalculer',
        'Un prix juste l’an dernier ne l’est peut-être plus aujourd’hui. Recalcule un plat quand :',
        [
          'ton fournisseur change le prix d’un ingrédient important ;',
          'la recette change, même s’il ne s’agit que d’une autre garniture ;',
          'la portion devient plus grande ou plus petite ;',
          'arrive un moment convenu, par exemple à chaque changement de carte.'
        ]
      ],
      [
        'Livraison et vente à emporter',
        'Si tu vends aussi via une plateforme de livraison, ajoute la commission et l’emballage au coût de ce canal. Le même plat peut avoir une bonne marge en salle et ne presque rien rapporter en livraison.'
      ],
      [
        'Comment Savour aide',
        'Un bon prix commence par une recette juste : des quantités fixes, un rendement fixe et la bonne portion. C’est ce que fait Savour aujourd’hui, avec des [fiches techniques](/fr/blog/fiches-techniques-cuisine) que tu adaptes à toute quantité. Ce calculateur gratuit calcule un plat à la fois. Savour aura un calculateur de food cost complet qui part de tes propres recettes, avec la liste de prix de ton fournisseur et ta propre remise, y compris les préparations de base : [découvre ce qui arrive](/fr/blog/calculateur-food-cost).'
      ],
      [
        'Questions fréquentes',
        'Des réponses courtes à ce que les cuisiniers demandent le plus.',
        {
          faq: [
            ['Comment calculer le prix de vente d’un plat ?', 'Divise le coût matière par ton food cost cible (en nombre, 30 % = 0,30). C’est le prix HT. Ajoute la TVA et arrondis.'],
            ['Quelle différence entre food cost et marge ?', 'Le food cost est la part du prix qui va aux ingrédients ; la marge est ce qui reste par assiette. Ensemble, ils font 100 % du prix HT.'],
            ['Je calcule avec ou sans TVA ?', 'Hors taxes, des deux côtés : prix d’achat HT et prix de vente HT.'],
            ['À quelle fréquence recalculer mes prix ?', 'À chaque changement de prix d’un ingrédient important, à chaque changement de recette et à un moment fixe, comme une nouvelle carte.']
          ]
        }
      ]
    ],
    outro: 'Les montants de cet article sont des exemples chiffrés. Calcule avec tes propres recettes et tes propres prix d’achat.'
  }
};
