// Blog: verkoopprijs van een gerecht berekenen, van bordkost naar menuprijs (gepland voor 2026-11-24), in vijf talen.
// Aanvulling op "Foodcost berekenen" (formules en opbrengst staan daar): dit artikel gaat over prijzen, marge in euro's
// en wanneer je opnieuw rekent. Geïnspireerd door de onderwerpen van de foodcost-calculator van Apicbase, in eigen
// woorden en eigen voorbeelden; geen cijfers van hen overgenomen. Alle bedragen zijn rekenvoorbeelden, geen gemiddelden.
// Btw alleen voor Nederland (9% op eten); in de andere talen "de btw van je land" (niet nagekeken per land).
// Savour heeft de foodcost calculator nog niet: alleen verwijzen naar het artikel "binnenkort".

const KEY = 'en/blog/menu-price-from-plate-cost';

// Rekenvoorbeeld (zonder btw): A bordkost 6,40, doel 30% → 21,33, gekozen 21,50 → 29,8%, marge 15,10.
// B bordkost 2,10, prijs 14,50 → 14,5%, marge 12,40.

export const PRICE_POST = {
  id: 'verkoopprijs',
  date: '2026-11-24',
  rich: true,
  nl: {
    slug: 'blog/verkoopprijs-berekenen-horeca',
    title: 'Verkoopprijs berekenen in de horeca: van bordkost naar menuprijs',
    desc: 'Zo bereken je de verkoopprijs van een gerecht: vanuit de bordkost en je doel-foodcost, met btw, afronden en de marge in euro’s. Met rekenvoorbeeld en de vragen die koks het vaakst stellen.',
    h1: 'Verkoopprijs berekenen: van bordkost naar menuprijs',
    lead: 'Een goede kaartprijs is geen gevoel. Hij volgt uit wat het bord kost en wat je eraan wilt overhouden. Zo reken je hem uit, en daarom kijk je naar euro’s en niet alleen naar procenten.',
    brief: [
      'Verkoopprijs zonder btw = bordkost ÷ je doel-foodcost. Bij € 6,40 bordkost en 30% is dat € 21,33.',
      'Daarna komt de btw erbij en rond je af naar een prijs die bij je kaart past; reken het percentage dan opnieuw na.',
      'Stuur ook op de marge in euro’s: een duurder bord met een hoger percentage kan meer opleveren dan een goedkoop bord.'
    ],
    sections: [
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
        'Een goede prijs begint bij een recept dat klopt: vaste hoeveelheden, een vaste opbrengst en de juiste portie. Dat is wat Savour vandaag doet, met [standaardrecepturen](/blog/standaardrecepturen-in-de-keuken) die je omrekent naar elke hoeveelheid. Een foodcost calculator die de kostprijs en de verkoopprijs vanuit je eigen recepten uitrekent, komt eraan: [lees wat er komt](/blog/foodcost-calculator).'
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
    title: 'How to price a dish: from plate cost to menu price',
    desc: 'How to calculate the selling price of a dish: from plate cost and your target food cost, with tax, rounding and the margin in money. With a worked example and the questions chefs ask most.',
    h1: 'How to price a dish: from plate cost to menu price',
    lead: 'A good menu price is not a feeling. It follows from what the plate costs and what you want to keep. This is how to work it out, and why you look at money and not only at percentages.',
    brief: [
      'Selling price before tax = plate cost ÷ your target food cost. At €6.40 plate cost and 30%, that is €21.33.',
      'Then add the sales tax of your country and round to a price that fits your menu; check the percentage again afterwards.',
      'Watch the margin in money too: a pricier plate with a higher percentage can earn more than a cheap one.'
    ],
    sections: [
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
        'A good price starts with a recipe that is right: fixed quantities, a fixed yield and the right portion. That is what Savour does today, with [standardised recipes](/en/blog/standardised-recipes) you scale to any quantity. A food cost calculator that works out cost and selling price from your own recipes is on its way: [read what is coming](/en/blog/food-cost-calculator).'
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
    slug: 'de/blog/verkaufspreis-berechnen-gastronomie',
    title: 'Verkaufspreis berechnen in der Gastronomie: vom Wareneinsatz zum Kartenpreis',
    desc: 'So berechnest du den Verkaufspreis eines Gerichts: aus dem Wareneinsatz pro Teller und deinem Ziel-Wareneinsatz, mit Mehrwertsteuer, Runden und dem Rohertrag in Euro. Mit Rechenbeispiel und häufigen Fragen.',
    h1: 'Verkaufspreis berechnen: vom Wareneinsatz zum Kartenpreis',
    lead: 'Ein guter Kartenpreis ist kein Bauchgefühl. Er ergibt sich aus dem, was der Teller kostet, und dem, was übrig bleiben soll. So rechnest du ihn aus, und darum schaust du auf Euro und nicht nur auf Prozente.',
    brief: [
      'Verkaufspreis netto = Wareneinsatz pro Teller ÷ Ziel-Wareneinsatz. Bei 6,40 € und 30 % sind das 21,33 €.',
      'Dann kommt die Mehrwertsteuer deines Landes dazu und du rundest auf einen Preis, der zu deiner Karte passt; prüfe danach den Prozentsatz.',
      'Achte auch auf den Rohertrag in Euro: Ein teurer Teller mit höherem Prozentsatz kann mehr bringen als ein günstiger.'
    ],
    sections: [
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
        'Ein guter Preis beginnt mit einer Rezeptur, die stimmt: feste Mengen, feste Ausbeute und die richtige Portion. Das macht Savour heute, mit [Standardrezepturen](/de/blog/standardrezepturen-gastronomie), die du auf jede Menge hochrechnest, und der [Rezepturverwaltung](/de/rezepturverwaltung). Ein Wareneinsatz-Rechner, der Kosten und Verkaufspreis aus deinen eigenen Rezepturen berechnet, ist in Arbeit: [lies, was kommt](/de/blog/wareneinsatz-rechner).'
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
    slug: 'es/blog/calcular-precio-de-venta-plato',
    title: 'Cómo calcular el precio de venta de un plato: del coste al precio de carta',
    desc: 'Cómo calcular el precio de venta de un plato: a partir del coste por ración y tu food cost objetivo, con IVA, redondeo y el margen en euros. Con ejemplo y las preguntas más frecuentes de los cocineros.',
    h1: 'Precio de venta de un plato: del coste por ración al precio de carta',
    lead: 'Un buen precio de carta no es una intuición. Sale de lo que cuesta el plato y de lo que quieres que quede. Así se calcula, y por eso miras los euros y no solo los porcentajes.',
    brief: [
      'Precio de venta sin IVA = coste por ración ÷ tu food cost objetivo. Con 6,40 € y un 30 %, son 21,33 €.',
      'Después se suma el IVA de tu país y redondeas a un precio que encaje en tu carta; vuelve a comprobar el porcentaje.',
      'Mira también el margen en euros: un plato más caro con un porcentaje más alto puede dejar más que uno barato.'
    ],
    sections: [
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
        'Un buen precio empieza con una receta correcta: cantidades fijas, un rendimiento fijo y la ración adecuada. Eso es lo que hace Savour hoy, con [fichas técnicas](/es/blog/fichas-tecnicas-de-cocina) que escalas a cualquier cantidad. Una calculadora de food cost que calcule el coste y el precio de venta a partir de tus propias recetas está en camino: [lee lo que viene](/es/blog/calculadora-food-cost).'
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
    slug: 'fr/blog/calculer-prix-de-vente-plat',
    title: 'Calculer le prix de vente d’un plat : du coût matière au prix carte',
    desc: 'Comment calculer le prix de vente d’un plat : à partir du coût matière par assiette et de ton food cost cible, avec la TVA, l’arrondi et la marge en euros. Avec un exemple chiffré et les questions fréquentes.',
    h1: 'Prix de vente d’un plat : du coût matière au prix carte',
    lead: 'Un bon prix carte n’est pas une impression. Il découle de ce que coûte l’assiette et de ce que tu veux garder. Voici comment le calculer, et pourquoi tu regardes les euros et pas seulement les pourcentages.',
    brief: [
      'Prix de vente HT = coût matière par assiette ÷ ton food cost cible. Avec 6,40 € et 30 %, cela fait 21,33 €.',
      'Ensuite, ajoute la TVA de ton pays et arrondis à un prix qui va avec ta carte ; vérifie ensuite le pourcentage.',
      'Regarde aussi la marge en euros : une assiette plus chère avec un pourcentage plus élevé peut rapporter plus qu’une assiette bon marché.'
    ],
    sections: [
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
        'Un bon prix commence par une recette juste : des quantités fixes, un rendement fixe et la bonne portion. C’est ce que fait Savour aujourd’hui, avec des [fiches techniques](/fr/blog/fiches-techniques-cuisine) que tu adaptes à toute quantité. Un calculateur de food cost qui calcule le coût et le prix de vente à partir de tes propres recettes est en préparation : [découvre ce qui arrive](/fr/blog/calculateur-food-cost).'
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
