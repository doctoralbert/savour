// Blog: wat een restaurant kost, inkoop, personeel, huur en marge (2026-11-08). Alleen cijfers met een openbare bron:
//   CBS StatLine 81156ned, Bedrijfsleven; arbeids- en financiële gegevens, SBI 56101 Restaurants, 2022-2024 (definitief,
//     bijgewerkt 24 april 2026): percentages van de bedrijfsopbrengsten, zelf uitgerekend uit de bedragen.
//     2024: opbrengsten 12.982 mln, inkoopwaarde omzet 4.037 (31,1%), personele kosten 4.143 (31,9%), huisvesting 1.144
//     (8,8%), energie 2,9%, overige bedrijfskosten 10,5%, afschrijvingen 3,2%, bedrijfsresultaat 11,5%, resultaat voor
//     belastingen 1.492 (11,5%). 2022: inkoop 32,5%, personeel 31,9%, huisvesting 9,1%, resultaat voor belastingen 8,8%.
//     Fastfood e.d. (56102) 2024: inkoop 31,3%, personeel 23,2%, huisvesting 9,6%, resultaat voor belastingen 17,6%.
//   CBS StatLine 81589NED, Bedrijven; bedrijfstak, 2026 KW4: restaurants (56101) 16.840, waarvan 3.955 met één werkzaam
//     persoon en 9.460 natuurlijke personen (eenmanszaak, vof); eet- en drinkgelegenheden (56) 69.820.
//   CBS, faillissementen 2025 (12 januari 2026): horeca 347 in 2025, 377 in 2024.
//   KHN, presentatie persconferentie Horecava (12 januari 2026), dia Schuldenlast: winstgevendheid afgelopen 12 maanden
//     meer winst 25%, onveranderd 29%, minder winst 27%, break-even 6%, verlies 11%, niet levensvatbaar 2%; risico
//     stoppen of failliet: nee 68%, 4-12 maanden 10%, 1-3 maanden 2%, onzeker 20%.
//   National Restaurant Association (VS), 2025 Restaurant Operations Data Abstract (boekjaar 2024, ruim 900 restaurants,
//     medianen): eten en drinken 32,0% (full-service) en 32,4% (limited-service), personeel 36,5% en 31,7%, huisvesting
//     5,7% en 5,2%, resultaat voor belastingen 2,8% en 4,0%.
// Komen er nieuwe cijfers, pas dan de tekst en de datum aan; verzin nooit een getal.

const SRC = {
  cbsFin: 'https://opendata.cbs.nl/#/CBS/nl/dataset/81156ned/table',
  cbsCount: 'https://opendata.cbs.nl/#/CBS/nl/dataset/81589NED/table',
  cbsFail: 'https://www.cbs.nl/nl-nl/nieuws/2026/03/in-december-18-procent-minder-faillissementen-dan-een-jaar-eerder',
  khn: 'https://static2.khn.nl/public/images/260112_KHN_Horecava_Persconferentie.pdf',
  nraFood:
    'https://restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/restaurant-operators-kept-food-cost-ratios-in-check-in-2024/',
  nraLabor:
    'https://restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/elevated-labor-costs-had-a-significant-impact-on-restaurant-profitability-in-2024/',
  nraRent:
    'https://restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/restaurant-occupancy-costs-were-more-than-5-of-sales-in-2024/',
  nraProfit:
    'https://restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/new-association-report-helps-operators-gauge-their-restaurant-performance/'
};

const sources = (intro, labels) => [
  labels.title,
  intro,
  [
    `[${labels.cbsFin}](${SRC.cbsFin})`,
    `[${labels.cbsCount}](${SRC.cbsCount})`,
    `[${labels.cbsFail}](${SRC.cbsFail})`,
    `[${labels.khn}](${SRC.khn})`,
    `[National Restaurant Association: food costs 2024](${SRC.nraFood})`,
    `[National Restaurant Association: labor costs 2024](${SRC.nraLabor})`,
    `[National Restaurant Association: occupancy costs 2024](${SRC.nraRent})`,
    `[National Restaurant Association: Restaurant Operations Data Abstract 2025](${SRC.nraProfit})`
  ]
];

export const COST_POST = {
  id: 'kosten',
  date: '2026-11-08',
  rich: true,
  nl: {
    slug: 'blog/kosten-en-marges-restaurant',
    title: 'Wat kost een restaurant? Inkoop, personeel, huur en marge in cijfers',
    desc: 'Hoe de omzet van een restaurant wordt verdeeld over inkoop, personeel, huisvesting en winst, in Nederland (CBS) en de Verenigde Staten. Met het aantal restaurants, de faillissementen en hoeveel ondernemers winst maken.',
    h1: 'Wat kost een restaurant? Inkoop, personeel, huur en marge in cijfers',
    lead: 'Van elke euro die een gast afrekent, gaat het grootste deel meteen weer de deur uit: naar de leverancier, naar het personeel en naar de huur. Hoeveel precies? We zetten de cijfers op een rij, met de bron erbij, en kijken wat de keuken daarvan in de hand heeft.',
    brief: [
      'Bij Nederlandse restaurants ging in 2024 31% van de opbrengsten naar inkoop en 32% naar personeel, samen bijna twee derde (CBS).',
      'Huisvesting kostte 8,8%. Gemiddeld bleef er 11,5% over als resultaat vóór belastingen, maar daar moet bij veel zaken de eigenaar ook nog van leven.',
      '81% van de horecaondernemers zegt het afgelopen jaar winst te hebben gemaakt; 11% maakte verlies (KHN, januari 2026).'
    ],
    sections: [
      [
        'Waar elke euro omzet heen gaat',
        'Het CBS houdt per branche bij wat bedrijven verdienen en uitgeven. Voor restaurants in Nederland ziet 2024 er zo uit. Alle restaurants samen haalden ruim 13 miljard euro aan opbrengsten op.',
        {
          head: ['Post', 'Deel van de opbrengsten, 2024'],
          rows: [
            ['Inkoop (eten en drinken)', '31,1%'],
            ['Personeel', '31,9%'],
            ['Huisvesting', '8,8%'],
            ['Energie', '2,9%'],
            ['Overige kosten', '10,5%'],
            ['Afschrijvingen', '3,2%'],
            ['Bedrijfsresultaat', '11,5%']
          ],
          note: 'Bron: CBS StatLine, tabel 81156ned, branche 56101 Restaurants, verslagjaar 2024 (definitief). Percentages uitgerekend uit de bedragen in de tabel; door afronden telt het niet precies op tot 100.'
        },
        { fact: ['63%', 'van de opbrengsten van Nederlandse restaurants ging in 2024 naar inkoop en personeel samen (CBS)'] }
      ],
      [
        'Inkoop en personeel: samen bijna twee derde',
        'Inkoop en personeel zijn bij een restaurant ongeveer even groot: elk bijna een derde. Bij fastfoodzaken, snackbars en ijssalons ligt dat anders. Daar ging in 2024 31,3% naar inkoop, maar maar 23,2% naar personeel. Zij werken met minder handen per gast, en houden daardoor meer over: 17,6% resultaat vóór belastingen, tegen 11,5% bij restaurants.\n\nTussen 2022 en 2024 daalde het deel voor inkoop bij restaurants van 32,5% naar 31,1%. Het deel voor personeel bleef 31,9%. Restaurants hebben de duurdere inkoop dus grotendeels in hun prijzen doorberekend.'
      ],
      [
        'Wat "11,5 procent winst" wel en niet zegt',
        'Een resultaat van 11,5% klinkt ruim, maar lees het met twee kanttekeningen. Ten eerste is het een gemiddelde over de hele branche: grote en kleine zaken, goede en slechte jaren door elkaar. Ten tweede zit het loon van een ondernemer met een eenmanszaak of vof niet in de personeelskosten. Dat moet uit het resultaat komen, en daarna gaat er nog belasting af. Volgens het CBS zijn 9.460 van de 16.840 restaurants zo’n eenmanszaak of vof.\n\nVoor een chef-eigenaar is het resultaat dus eerder het eigen inkomen plus de buffer voor slechte maanden dan winst om uit te keren.'
      ],
      [
        'En in de rest van de wereld?',
        'Een wereldwijd gemiddelde bestaat niet: elk land meet het anders, en de meeste landen publiceren deze cijfers helemaal niet. De grootste openbare vergelijking komt uit de Verenigde Staten. De National Restaurant Association vroeg ruim 900 restaurants naar hun cijfers over 2024. Dit zijn de middelste waarden (medianen):',
        {
          head: ['Post', 'Restaurant met bediening', 'Snelservice'],
          rows: [
            ['Eten en drinken', '32,0%', '32,4%'],
            ['Personeel', '36,5%', '31,7%'],
            ['Huisvesting', '5,7%', '5,2%'],
            ['Resultaat vóór belastingen', '2,8%', '4,0%']
          ],
          note: 'Bron: National Restaurant Association, Restaurant Operations Data Abstract 2025 (boekjaar 2024). Medianen van een enquête; niet een-op-een te vergelijken met de totalen van het CBS.'
        },
        {
          tip: [
            'Wat opvalt',
            'De inkoop ligt in beide landen rond een derde van de omzet. Het verschil zit vooral in wat er overblijft: een Amerikaans restaurant met bediening houdt in het midden 2,8 cent over van elke dollar.'
          ]
        }
      ],
      [
        'Hoeveel restaurants zijn er in Nederland?',
        'Het CBS telde in het vierde kwartaal van 2026 16.840 restaurants. Daarvan bestonden er 3.955 uit één persoon. Tel je alle eet- en drinkgelegenheden mee, van snackbar tot café, dan kom je op 69.820 bedrijven. KHN telt op een andere manier, per locatie, en kwam eind 2025 op 43.606 horecalocaties. Meer daarover lees je in [Horeca in cijfers](/blog/horeca-in-cijfers).'
      ],
      [
        'Faillissementen',
        'In 2025 gingen 347 horecabedrijven failliet, tegen 377 in 2024 (CBS). Een faillissement is wel maar een deel van het verhaal: veel zaken sluiten zonder faillissement, omdat de eigenaar zelf stopt.'
      ],
      [
        'Hoeveel zaken maken winst?',
        'KHN vroeg in januari 2026 aan haar leden hoe de winst zich het afgelopen jaar ontwikkelde. 25% maakte meer winst, 29% evenveel en 27% minder. Samen maakte dus 81% winst. 6% speelde quitte, 11% maakte verlies en 2% noemde het bedrijf niet levensvatbaar.\n\nOp de vraag of ze het komende jaar moeten stoppen of failliet kunnen gaan, zei 68% nee. 12% zag dat risico wel en 20% wist het niet.',
        {
          compare: [
            ['Verlies of erger', ['11% maakte verlies (KHN)', '2% noemt het bedrijf niet levensvatbaar (KHN)', '12% ziet risico op stoppen binnen een jaar (KHN)']],
            ['Winst', ['81% maakte winst, waarvan 25% meer dan het jaar ervoor (KHN)', '68% ziet geen risico om te stoppen (KHN)']]
          ]
        }
      ],
      [
        'Wat de keuken in de hand heeft',
        'Huur en lonen liggen grotendeels vast. Inkoop is de grootste post waar de keuken zelf elke dag invloed op heeft. Dat begint niet bij onderhandelen met de leverancier, maar bij het recept: hoeveel gaat er in een portie, hoeveel bereid je voor, en weet iedereen in de brigade dat ook?',
        {
          check: [
            'Leg per recept de hoeveelheden en de opbrengst vast, zodat elke kok hetzelfde maakt.',
            'Schaal op naar het aantal couverts dat je verwacht, in plaats van op gevoel.',
            'Weeg een portie en zet het gewicht in het recept.',
            'Kijk na een drukke week wat er overbleef, en pas het recept aan.'
          ],
          title: 'Zo houd je inkoop in de hand'
        },
        { see: ['Recepten opschalen', '/recepten-opschalen', 'Van 8 couverts naar 120, met de hoeveelheden precies omgerekend.'] }
      ],
      sources('Alle cijfers komen uit openbare bronnen. Het jaar staat steeds bij het cijfer: nieuwere cijfers kunnen anders uitvallen.', {
        title: 'Bronnen',
        cbsFin: 'CBS StatLine: Bedrijfsleven; arbeids- en financiële gegevens, per branche (81156ned)',
        cbsCount: 'CBS StatLine: Bedrijven; bedrijfstak (81589NED)',
        cbsFail: 'CBS: in december 18 procent minder faillissementen dan een jaar eerder (12 januari 2026)',
        khn: 'KHN: presentatie persconferentie Horecava (12 januari 2026)'
      })
    ],
    outro: 'Cijfers bijgewerkt tot november 2026. Komen er nieuwe cijfers van deze bronnen, dan passen we dit artikel aan.'
  },
  en: {
    slug: 'en/blog/restaurant-costs-and-margins',
    title: 'What does a restaurant cost? Food, staff, rent and margin in numbers',
    desc: 'How a restaurant’s revenue is split between food, staff, rent and profit, in the Netherlands (CBS) and the United States. With the number of restaurants, bankruptcies and how many owners make a profit.',
    h1: 'What does a restaurant cost? Food, staff, rent and margin in numbers',
    lead: 'Of every euro a guest pays, most goes straight back out the door: to the supplier, to the staff and to the landlord. How much exactly? We put the numbers side by side, with the source, and look at what the kitchen can control.',
    brief: [
      'In 2024, Dutch restaurants spent 31% of their revenue on food and drink and 32% on staff, together almost two thirds (CBS).',
      'Premises cost 8.8%. On average 11.5% was left as profit before tax, but at many places the owner still has to live on that.',
      '81% of Dutch hospitality owners say they made a profit last year; 11% made a loss (KHN, January 2026).'
    ],
    sections: [
      [
        'Where every euro of revenue goes',
        'Statistics Netherlands (CBS) tracks what businesses earn and spend per sector. For restaurants in the Netherlands, 2024 looks like this. Together, all restaurants took in just over 13 billion euros.',
        {
          head: ['Item', 'Share of revenue, 2024'],
          rows: [
            ['Food and drink purchases', '31.1%'],
            ['Staff', '31.9%'],
            ['Premises', '8.8%'],
            ['Energy', '2.9%'],
            ['Other costs', '10.5%'],
            ['Depreciation', '3.2%'],
            ['Operating profit', '11.5%']
          ],
          note: 'Source: CBS StatLine, table 81156ned, sector 56101 Restaurants, 2024 (final). Percentages calculated from the amounts in the table; rounding means they do not add up to exactly 100.'
        },
        { fact: ['63%', 'of Dutch restaurants’ revenue went to food purchases and staff together in 2024 (CBS)'] }
      ],
      [
        'Food and staff: almost two thirds together',
        'At a restaurant, food and staff are roughly the same size: each almost a third. Fast food places, snack bars and ice cream parlours are different. In 2024 they spent 31.3% on food, but only 23.2% on staff. They work with fewer hands per guest and keep more: 17.6% profit before tax, against 11.5% at restaurants.\n\nBetween 2022 and 2024 the share spent on food at restaurants fell from 32.5% to 31.1%. The share for staff stayed at 31.9%. So restaurants largely passed the higher food costs on in their prices.'
      ],
      [
        'What "11.5 percent profit" does and does not say',
        'A result of 11.5% sounds generous, but read it with two caveats. First, it is an average across the whole sector: large and small places, good and bad years mixed together. Second, the pay of an owner running a sole proprietorship or partnership is not in the staff costs. It has to come out of the result, and tax comes on top. According to CBS, 9,460 of the 16,840 restaurants are run that way.\n\nFor a chef-owner, the result is more their own income plus a buffer for slow months than profit to pay out.'
      ],
      [
        'And in the rest of the world?',
        'There is no worldwide average: every country measures it differently, and most do not publish these figures at all. The largest public comparison comes from the United States. The National Restaurant Association asked more than 900 restaurants for their 2024 figures. These are the middle values (medians):',
        {
          head: ['Item', 'Full-service', 'Limited-service'],
          rows: [
            ['Food and drink', '32.0%', '32.4%'],
            ['Staff', '36.5%', '31.7%'],
            ['Occupancy', '5.7%', '5.2%'],
            ['Income before tax', '2.8%', '4.0%']
          ],
          note: 'Source: National Restaurant Association, Restaurant Operations Data Abstract 2025 (fiscal 2024). Medians from a survey; not directly comparable with the CBS totals.'
        },
        {
          tip: [
            'What stands out',
            'Food costs are around a third of revenue in both countries. The difference is mainly in what is left: a typical American full-service restaurant keeps 2.8 cents of every dollar.'
          ]
        }
      ],
      [
        'How many restaurants are there in the Netherlands?',
        'CBS counted 16,840 restaurants in the fourth quarter of 2026. Of those, 3,955 consisted of one person. Count every place to eat and drink, from snack bar to café, and you get 69,820 businesses. The Dutch hospitality association KHN counts per location and arrived at 43,606 hospitality locations at the end of 2025. More in [Dutch hospitality in numbers](/en/blog/hospitality-in-numbers).'
      ],
      [
        'Bankruptcies',
        'In 2025, 347 Dutch hospitality businesses went bankrupt, against 377 in 2024 (CBS). Bankruptcy is only part of the story: many places close without one, because the owner stops.'
      ],
      [
        'How many places make a profit?',
        'In January 2026 KHN asked its members how their profit developed over the past year. 25% made more profit, 29% the same and 27% less. So 81% made a profit. 6% broke even, 11% made a loss and 2% called their business not viable.\n\nAsked whether they might have to stop or go bankrupt in the coming year, 68% said no. 12% did see that risk and 20% did not know.',
        {
          compare: [
            ['Loss or worse', ['11% made a loss (KHN)', '2% call their business not viable (KHN)', '12% see a risk of stopping within a year (KHN)']],
            ['Profit', ['81% made a profit, 25% more than the year before (KHN)', '68% see no risk of stopping (KHN)']]
          ]
        }
      ],
      [
        'What the kitchen can control',
        'Rent and wages are largely fixed. Food is the biggest cost the kitchen influences every day. That does not start with negotiating with the supplier, but with the recipe: how much goes into a portion, how much do you prep, and does everyone in the brigade know?',
        {
          check: [
            'Record the quantities and yield of every recipe, so every cook makes the same.',
            'Scale to the number of covers you expect, instead of by feel.',
            'Weigh a portion and put the weight in the recipe.',
            'After a busy week, check what was left over and adjust the recipe.'
          ],
          title: 'How to keep food costs in hand'
        },
        { see: ['Scale recipes', '/en/scale-recipes', 'From 8 covers to 120, with every quantity converted exactly.'] }
      ],
      sources('All figures come from public sources. The year is always given with the figure: newer figures may differ.', {
        title: 'Sources',
        cbsFin: 'CBS StatLine: business sector, employment and financial data by branch (81156ned)',
        cbsCount: 'CBS StatLine: businesses by sector (81589NED)',
        cbsFail: 'CBS: 18 percent fewer bankruptcies in December than a year earlier (12 January 2026)',
        khn: 'KHN: Horecava press conference presentation (12 January 2026)'
      })
    ],
    outro: 'Figures updated to November 2026. When these sources publish new figures, we will update this article.'
  }
};

const KEY = 'en/blog/restaurant-costs-and-margins';

export const COST_POST_DE = {
  [KEY]: {
    slug: 'de/blog/kosten-und-margen-restaurant',
    title: 'Was kostet ein Restaurant? Wareneinsatz, Personal, Miete und Marge in Zahlen',
    desc: 'Wie sich der Umsatz eines Restaurants auf Wareneinsatz, Personal, Miete und Gewinn verteilt, in den Niederlanden (CBS) und den USA. Mit der Zahl der Restaurants, Insolvenzen und wie viele Betriebe Gewinn machen.',
    h1: 'Was kostet ein Restaurant? Wareneinsatz, Personal, Miete und Marge in Zahlen',
    lead: 'Von jedem Euro, den ein Gast bezahlt, geht das meiste gleich wieder hinaus: an den Lieferanten, ans Personal und an den Vermieter. Wie viel genau? Wir stellen die Zahlen mit Quelle zusammen und schauen, was die Küche selbst in der Hand hat.',
    brief: [
      'Niederländische Restaurants gaben 2024 31 % ihrer Erlöse für Wareneinsatz und 32 % für Personal aus, zusammen fast zwei Drittel (CBS).',
      'Die Räume kosteten 8,8 %. Im Schnitt blieben 11,5 % als Ergebnis vor Steuern, aber davon muss in vielen Betrieben auch der Inhaber leben.',
      '81 % der niederländischen Gastronomen sagen, sie hätten im letzten Jahr Gewinn gemacht; 11 % machten Verlust (KHN, Januar 2026).'
    ],
    sections: [
      [
        'Wohin jeder Euro Umsatz geht',
        'Das niederländische Statistikamt CBS erfasst pro Branche, was Unternehmen einnehmen und ausgeben. Für Restaurants in den Niederlanden sieht 2024 so aus. Alle Restaurants zusammen nahmen gut 13 Milliarden Euro ein.',
        {
          head: ['Posten', 'Anteil an den Erlösen, 2024'],
          rows: [
            ['Wareneinsatz (Essen und Getränke)', '31,1 %'],
            ['Personal', '31,9 %'],
            ['Räume', '8,8 %'],
            ['Energie', '2,9 %'],
            ['Sonstige Kosten', '10,5 %'],
            ['Abschreibungen', '3,2 %'],
            ['Betriebsergebnis', '11,5 %']
          ],
          note: 'Quelle: CBS StatLine, Tabelle 81156ned, Branche 56101 Restaurants, 2024 (endgültig). Prozente aus den Beträgen der Tabelle berechnet; durch Rundung ergibt sich nicht genau 100.'
        },
        { fact: ['63 %', 'der Erlöse niederländischer Restaurants gingen 2024 an Wareneinsatz und Personal zusammen (CBS)'] }
      ],
      [
        'Wareneinsatz und Personal: zusammen fast zwei Drittel',
        'Im Restaurant sind Wareneinsatz und Personal etwa gleich groß: je fast ein Drittel. Bei Fastfood, Imbissen und Eisdielen ist das anders. Sie gaben 2024 31,3 % für Waren aus, aber nur 23,2 % für Personal. Sie arbeiten mit weniger Händen pro Gast und behalten mehr: 17,6 % Ergebnis vor Steuern, gegenüber 11,5 % bei Restaurants.\n\nZwischen 2022 und 2024 sank der Anteil des Wareneinsatzes bei Restaurants von 32,5 % auf 31,1 %. Der Anteil für Personal blieb bei 31,9 %. Die Restaurants haben die teureren Waren also größtenteils in ihre Preise eingerechnet.'
      ],
      [
        'Was „11,5 Prozent Gewinn“ sagt und was nicht',
        'Ein Ergebnis von 11,5 % klingt üppig, aber es gibt zwei Einschränkungen. Erstens ist es ein Durchschnitt über die ganze Branche: große und kleine Betriebe, gute und schlechte Jahre zusammen. Zweitens steckt der Lohn eines Inhabers mit Einzelunternehmen oder Personengesellschaft nicht in den Personalkosten. Er muss aus dem Ergebnis kommen, und danach gehen noch Steuern ab. Laut CBS werden 9.460 der 16.840 Restaurants so geführt.\n\nFür einen Chef-Inhaber ist das Ergebnis also eher das eigene Einkommen plus Puffer für schwache Monate als ausschüttbarer Gewinn.'
      ],
      [
        'Und im Rest der Welt?',
        'Einen weltweiten Durchschnitt gibt es nicht: Jedes Land misst anders, und die meisten veröffentlichen diese Zahlen gar nicht. Der größte öffentliche Vergleich kommt aus den USA. Die National Restaurant Association fragte über 900 Restaurants nach ihren Zahlen für 2024. Das sind die mittleren Werte (Mediane):',
        {
          head: ['Posten', 'Mit Bedienung', 'Schnellservice'],
          rows: [
            ['Essen und Getränke', '32,0 %', '32,4 %'],
            ['Personal', '36,5 %', '31,7 %'],
            ['Räume', '5,7 %', '5,2 %'],
            ['Ergebnis vor Steuern', '2,8 %', '4,0 %']
          ],
          note: 'Quelle: National Restaurant Association, Restaurant Operations Data Abstract 2025 (Geschäftsjahr 2024). Mediane einer Umfrage; nicht direkt mit den Summen des CBS vergleichbar.'
        },
        {
          tip: [
            'Was auffällt',
            'Der Wareneinsatz liegt in beiden Ländern bei etwa einem Drittel des Umsatzes. Der Unterschied liegt vor allem darin, was übrig bleibt: Ein typisches amerikanisches Restaurant mit Bedienung behält 2,8 Cent von jedem Dollar.'
          ]
        }
      ],
      [
        'Wie viele Restaurants gibt es in den Niederlanden?',
        'Das CBS zählte im vierten Quartal 2026 16.840 Restaurants. Davon bestanden 3.955 aus einer Person. Zählt man alle Gaststätten mit, vom Imbiss bis zum Café, kommt man auf 69.820 Betriebe. Der Branchenverband KHN zählt pro Standort und kam Ende 2025 auf 43.606 Gastronomiestandorte. Mehr dazu in [Gastronomie in Zahlen](/de/blog/gastronomie-in-zahlen).'
      ],
      [
        'Insolvenzen',
        '2025 gingen in den Niederlanden 347 Gastronomiebetriebe in die Insolvenz, gegenüber 377 im Jahr 2024 (CBS). Eine Insolvenz ist nur ein Teil der Geschichte: Viele Betriebe schließen ohne, weil der Inhaber selbst aufhört.'
      ],
      [
        'Wie viele Betriebe machen Gewinn?',
        'Der KHN fragte im Januar 2026 seine Mitglieder, wie sich ihr Gewinn im letzten Jahr entwickelt hat. 25 % machten mehr Gewinn, 29 % gleich viel und 27 % weniger. Zusammen machten also 81 % Gewinn. 6 % spielten null auf null, 11 % machten Verlust und 2 % nannten ihren Betrieb nicht überlebensfähig.\n\nAuf die Frage, ob sie im kommenden Jahr aufhören müssen oder insolvent werden könnten, sagten 68 % nein. 12 % sahen dieses Risiko und 20 % wussten es nicht.',
        {
          compare: [
            ['Verlust oder schlimmer', ['11 % machten Verlust (KHN)', '2 % nennen ihren Betrieb nicht überlebensfähig (KHN)', '12 % sehen ein Risiko, innerhalb eines Jahres aufzuhören (KHN)']],
            ['Gewinn', ['81 % machten Gewinn, 25 % mehr als im Vorjahr (KHN)', '68 % sehen kein Risiko aufzuhören (KHN)']]
          ]
        }
      ],
      [
        'Was die Küche in der Hand hat',
        'Miete und Löhne liegen größtenteils fest. Der Wareneinsatz ist der größte Posten, den die Küche jeden Tag selbst beeinflusst. Das beginnt nicht mit Verhandlungen beim Lieferanten, sondern beim Rezept: Wie viel kommt in eine Portion, wie viel bereitest du vor, und weiß das die ganze Brigade?',
        {
          check: [
            'Halte Mengen und Ausbeute jedes Rezepts fest, damit jeder Koch dasselbe macht.',
            'Rechne auf die erwarteten Gedecke um, statt nach Gefühl.',
            'Wiege eine Portion und schreib das Gewicht ins Rezept.',
            'Schau nach einer vollen Woche, was übrig blieb, und passe das Rezept an.'
          ],
          title: 'So behältst du den Wareneinsatz im Griff'
        },
        { see: ['Rezepte hochrechnen', '/de/rezepte-hochrechnen', 'Von 8 auf 120 Gedecke, mit exakt umgerechneten Mengen.'] }
      ],
      sources('Alle Zahlen stammen aus öffentlichen Quellen. Das Jahr steht immer beim Wert: Neuere Zahlen können anders ausfallen.', {
        title: 'Quellen',
        cbsFin: 'CBS StatLine: Unternehmen; Beschäftigung und Finanzdaten nach Branche (81156ned)',
        cbsCount: 'CBS StatLine: Unternehmen nach Wirtschaftszweig (81589NED)',
        cbsFail: 'CBS: im Dezember 18 Prozent weniger Insolvenzen als ein Jahr zuvor (12. Januar 2026)',
        khn: 'KHN: Präsentation zur Pressekonferenz auf der Horecava (12. Januar 2026)'
      })
    ],
    outro: 'Zahlen aktualisiert bis November 2026. Veröffentlichen diese Quellen neue Zahlen, passen wir den Artikel an.'
  }
};

export const COST_POST_ES = {
  [KEY]: {
    slug: 'es/blog/costes-y-margenes-restaurante',
    title: '¿Cuánto cuesta un restaurante? Materia prima, personal, alquiler y margen en cifras',
    desc: 'Cómo se reparte la facturación de un restaurante entre materia prima, personal, alquiler y beneficio, en los Países Bajos (CBS) y en Estados Unidos. Con el número de restaurantes, las quiebras y cuántos negocios ganan dinero.',
    h1: '¿Cuánto cuesta un restaurante? Materia prima, personal, alquiler y margen en cifras',
    lead: 'De cada euro que paga un cliente, la mayor parte vuelve a salir enseguida: al proveedor, al personal y al casero. ¿Cuánto exactamente? Ponemos las cifras en fila, con su fuente, y vemos qué puede controlar la cocina.',
    brief: [
      'En 2024, los restaurantes neerlandeses dedicaron el 31 % de sus ingresos a materia prima y el 32 % a personal: juntos, casi dos tercios (CBS).',
      'El local costó el 8,8 %. De media quedó un 11,5 % como resultado antes de impuestos, pero en muchos negocios de ahí también tiene que vivir el dueño.',
      'El 81 % de los hosteleros neerlandeses dice haber ganado dinero el último año; el 11 % tuvo pérdidas (KHN, enero de 2026).'
    ],
    sections: [
      [
        'Adónde va cada euro de facturación',
        'La oficina de estadística neerlandesa (CBS) registra por sector lo que ingresan y gastan las empresas. Para los restaurantes de los Países Bajos, 2024 queda así. Entre todos ingresaron algo más de 13.000 millones de euros.',
        {
          head: ['Partida', 'Parte de los ingresos, 2024'],
          rows: [
            ['Materia prima (comida y bebida)', '31,1 %'],
            ['Personal', '31,9 %'],
            ['Local', '8,8 %'],
            ['Energía', '2,9 %'],
            ['Otros gastos', '10,5 %'],
            ['Amortizaciones', '3,2 %'],
            ['Resultado de explotación', '11,5 %']
          ],
          note: 'Fuente: CBS StatLine, tabla 81156ned, sector 56101 Restaurantes, 2024 (definitivo). Porcentajes calculados a partir de los importes de la tabla; por el redondeo no suman exactamente 100.'
        },
        { fact: ['63 %', 'de los ingresos de los restaurantes neerlandeses fue a materia prima y personal en 2024 (CBS)'] }
      ],
      [
        'Materia prima y personal: casi dos tercios',
        'En un restaurante, materia prima y personal pesan más o menos lo mismo: casi un tercio cada uno. En comida rápida, snacks y heladerías es distinto. En 2024 dedicaron el 31,3 % a materia prima, pero solo el 23,2 % a personal. Trabajan con menos manos por cliente y se quedan con más: un 17,6 % de resultado antes de impuestos, frente al 11,5 % de los restaurantes.\n\nEntre 2022 y 2024, la parte de la materia prima en los restaurantes bajó del 32,5 % al 31,1 %. La del personal se quedó en el 31,9 %. Es decir, los restaurantes trasladaron en gran parte a sus precios el encarecimiento de la compra.'
      ],
      [
        'Lo que dice y lo que no dice un «11,5 % de beneficio»',
        'Un resultado del 11,5 % suena holgado, pero hay que leerlo con dos matices. Primero, es una media de todo el sector: negocios grandes y pequeños, años buenos y malos mezclados. Segundo, el sueldo de un dueño con empresa individual o sociedad civil no está en los gastos de personal. Tiene que salir del resultado, y después aún hay impuestos. Según el CBS, 9.460 de los 16.840 restaurantes funcionan así.\n\nPara un chef propietario, el resultado es más bien su propio sueldo más un colchón para los meses flojos que un beneficio para repartir.'
      ],
      [
        '¿Y en el resto del mundo?',
        'No existe una media mundial: cada país lo mide a su manera y la mayoría ni siquiera publica estas cifras. La mayor comparación pública viene de Estados Unidos. La National Restaurant Association preguntó a más de 900 restaurantes por sus cifras de 2024. Estos son los valores medios (medianas):',
        {
          head: ['Partida', 'Con servicio de mesa', 'Servicio rápido'],
          rows: [
            ['Comida y bebida', '32,0 %', '32,4 %'],
            ['Personal', '36,5 %', '31,7 %'],
            ['Local', '5,7 %', '5,2 %'],
            ['Resultado antes de impuestos', '2,8 %', '4,0 %']
          ],
          note: 'Fuente: National Restaurant Association, Restaurant Operations Data Abstract 2025 (ejercicio 2024). Medianas de una encuesta; no comparables uno a uno con los totales del CBS.'
        },
        {
          tip: [
            'Lo que llama la atención',
            'La materia prima ronda un tercio de la facturación en ambos países. La diferencia está sobre todo en lo que queda: un restaurante estadounidense típico con servicio de mesa se queda con 2,8 céntimos de cada dólar.'
          ]
        }
      ],
      [
        '¿Cuántos restaurantes hay en los Países Bajos?',
        'El CBS contó 16.840 restaurantes en el cuarto trimestre de 2026. De ellos, 3.955 eran de una sola persona. Si cuentas todos los locales de comida y bebida, del puesto de snacks al café, salen 69.820 empresas. La patronal KHN cuenta por local y llegó a 43.606 locales de hostelería a finales de 2025. Más en [La hostelería neerlandesa en cifras](/es/blog/hosteleria-en-cifras).'
      ],
      [
        'Quiebras',
        'En 2025 quebraron 347 empresas de hostelería en los Países Bajos, frente a 377 en 2024 (CBS). Una quiebra es solo parte de la historia: muchos locales cierran sin quebrar, porque el dueño lo deja.'
      ],
      [
        '¿Cuántos negocios ganan dinero?',
        'En enero de 2026, KHN preguntó a sus socios cómo había evolucionado su beneficio el último año. El 25 % ganó más, el 29 % lo mismo y el 27 % menos. En total, el 81 % tuvo beneficios. El 6 % quedó a cero, el 11 % tuvo pérdidas y el 2 % consideró su negocio inviable.\n\nA la pregunta de si podrían tener que cerrar o quebrar el próximo año, el 68 % dijo que no. El 12 % sí veía ese riesgo y el 20 % no lo sabía.',
        {
          compare: [
            ['Pérdidas o algo peor', ['11 % tuvo pérdidas (KHN)', '2 % considera su negocio inviable (KHN)', '12 % ve riesgo de cerrar en un año (KHN)']],
            ['Beneficio', ['81 % tuvo beneficios, el 25 % más que el año anterior (KHN)', '68 % no ve riesgo de cerrar (KHN)']]
          ]
        }
      ],
      [
        'Lo que controla la cocina',
        'El alquiler y los sueldos están en gran parte fijados. La materia prima es la mayor partida en la que la cocina influye cada día. Eso no empieza negociando con el proveedor, sino en la receta: cuánto lleva una ración, cuánto preparas y si toda la brigada lo sabe.',
        {
          check: [
            'Anota las cantidades y el rendimiento de cada receta, para que cada cocinero haga lo mismo.',
            'Escala al número de cubiertos que esperas, no a ojo.',
            'Pesa una ración y pon el peso en la receta.',
            'Después de una semana fuerte, mira qué sobró y ajusta la receta.'
          ],
          title: 'Así mantienes la materia prima bajo control'
        },
        { see: ['Escalar recetas', '/es/escalar-recetas', 'De 8 a 120 cubiertos, con las cantidades convertidas con exactitud.'] }
      ],
      sources('Todas las cifras proceden de fuentes públicas. El año va siempre junto a la cifra: las cifras más recientes pueden variar.', {
        title: 'Fuentes',
        cbsFin: 'CBS StatLine: empresas; datos laborales y financieros por sector (81156ned)',
        cbsCount: 'CBS StatLine: empresas por sector (81589NED)',
        cbsFail: 'CBS: en diciembre, un 18 % menos de quiebras que un año antes (12 de enero de 2026)',
        khn: 'KHN: presentación de la rueda de prensa en Horecava (12 de enero de 2026)'
      })
    ],
    outro: 'Cifras actualizadas hasta noviembre de 2026. Cuando estas fuentes publiquen cifras nuevas, actualizaremos el artículo.'
  }
};

export const COST_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/couts-et-marges-restaurant',
    title: 'Combien coûte un restaurant ? Matières, personnel, loyer et marge en chiffres',
    desc: 'Comment le chiffre d’affaires d’un restaurant se répartit entre matières premières, personnel, loyer et bénéfice, aux Pays-Bas (CBS) et aux États-Unis. Avec le nombre de restaurants, les faillites et combien d’établissements font des bénéfices.',
    h1: 'Combien coûte un restaurant ? Matières, personnel, loyer et marge en chiffres',
    lead: 'De chaque euro payé par un client, la plus grande partie repart aussitôt : chez le fournisseur, au personnel et au propriétaire des murs. Combien exactement ? Nous alignons les chiffres, avec leur source, et regardons ce que la cuisine maîtrise.',
    brief: [
      'En 2024, les restaurants néerlandais ont consacré 31 % de leurs recettes aux matières premières et 32 % au personnel, soit presque deux tiers (CBS).',
      'Les locaux ont coûté 8,8 %. En moyenne, il restait 11,5 % de résultat avant impôts, mais dans beaucoup d’établissements, le patron doit aussi en vivre.',
      '81 % des restaurateurs néerlandais disent avoir fait un bénéfice l’an dernier ; 11 % ont perdu de l’argent (KHN, janvier 2026).'
    ],
    sections: [
      [
        'Où va chaque euro de chiffre d’affaires',
        'L’institut statistique néerlandais (CBS) suit par secteur ce que les entreprises gagnent et dépensent. Pour les restaurants des Pays-Bas, 2024 se présente ainsi. Ensemble, ils ont encaissé un peu plus de 13 milliards d’euros.',
        {
          head: ['Poste', 'Part des recettes, 2024'],
          rows: [
            ['Matières premières (nourriture et boissons)', '31,1 %'],
            ['Personnel', '31,9 %'],
            ['Locaux', '8,8 %'],
            ['Énergie', '2,9 %'],
            ['Autres charges', '10,5 %'],
            ['Amortissements', '3,2 %'],
            ['Résultat d’exploitation', '11,5 %']
          ],
          note: 'Source : CBS StatLine, tableau 81156ned, secteur 56101 Restaurants, 2024 (définitif). Pourcentages calculés à partir des montants du tableau ; avec les arrondis, le total ne fait pas exactement 100.'
        },
        { fact: ['63 %', 'des recettes des restaurants néerlandais sont allées aux matières premières et au personnel en 2024 (CBS)'] }
      ],
      [
        'Matières et personnel : presque deux tiers',
        'Dans un restaurant, matières premières et personnel pèsent à peu près autant : presque un tiers chacun. Dans la restauration rapide, les snacks et les glaciers, c’est différent. En 2024, ils ont consacré 31,3 % aux matières, mais seulement 23,2 % au personnel. Ils travaillent avec moins de bras par client et gardent davantage : 17,6 % de résultat avant impôts, contre 11,5 % pour les restaurants.\n\nEntre 2022 et 2024, la part des matières premières dans les restaurants est passée de 32,5 % à 31,1 %. Celle du personnel est restée à 31,9 %. Les restaurants ont donc largement répercuté la hausse des achats sur leurs prix.'
      ],
      [
        'Ce que « 11,5 % de bénéfice » dit, et ne dit pas',
        'Un résultat de 11,5 % paraît confortable, mais il faut le lire avec deux nuances. D’abord, c’est une moyenne sur tout le secteur : grands et petits établissements, bonnes et mauvaises années confondus. Ensuite, la rémunération d’un patron en entreprise individuelle ou en société de personnes n’est pas dans les frais de personnel. Elle doit sortir du résultat, et il reste ensuite l’impôt. Selon le CBS, 9 460 des 16 840 restaurants sont dans ce cas.\n\nPour un chef-propriétaire, le résultat ressemble donc davantage à son propre revenu plus une réserve pour les mois creux qu’à un bénéfice à distribuer.'
      ],
      [
        'Et dans le reste du monde ?',
        'Il n’existe pas de moyenne mondiale : chaque pays mesure à sa façon, et la plupart ne publient pas ces chiffres. La plus grande comparaison publique vient des États-Unis. La National Restaurant Association a demandé leurs chiffres 2024 à plus de 900 restaurants. Voici les valeurs médianes :',
        {
          head: ['Poste', 'Service à table', 'Service rapide'],
          rows: [
            ['Nourriture et boissons', '32,0 %', '32,4 %'],
            ['Personnel', '36,5 %', '31,7 %'],
            ['Locaux', '5,7 %', '5,2 %'],
            ['Résultat avant impôts', '2,8 %', '4,0 %']
          ],
          note: 'Source : National Restaurant Association, Restaurant Operations Data Abstract 2025 (exercice 2024). Médianes d’une enquête ; pas directement comparables aux totaux du CBS.'
        },
        {
          tip: [
            'Ce qui frappe',
            'Les matières premières pèsent environ un tiers du chiffre d’affaires dans les deux pays. La différence tient surtout à ce qui reste : un restaurant américain typique avec service à table garde 2,8 cents par dollar.'
          ]
        }
      ],
      [
        'Combien y a-t-il de restaurants aux Pays-Bas ?',
        'Le CBS a compté 16 840 restaurants au quatrième trimestre 2026. Parmi eux, 3 955 comptaient une seule personne. Si l’on compte tous les établissements où l’on mange et boit, du snack au café, on arrive à 69 820 entreprises. L’organisation professionnelle KHN compte par établissement et arrivait à 43 606 établissements fin 2025. Plus de détails dans [La restauration néerlandaise en chiffres](/fr/blog/restauration-en-chiffres).'
      ],
      [
        'Faillites',
        'En 2025, 347 entreprises de l’hôtellerie-restauration ont fait faillite aux Pays-Bas, contre 377 en 2024 (CBS). La faillite n’est qu’une partie de l’histoire : beaucoup d’établissements ferment sans faillite, parce que le patron arrête.'
      ],
      [
        'Combien d’établissements font des bénéfices ?',
        'En janvier 2026, KHN a demandé à ses membres comment leur bénéfice avait évolué sur l’année. 25 % ont gagné plus, 29 % autant et 27 % moins. Au total, 81 % ont donc fait un bénéfice. 6 % étaient à l’équilibre, 11 % ont perdu de l’argent et 2 % jugeaient leur entreprise non viable.\n\nÀ la question de savoir s’ils risquaient de devoir arrêter ou de faire faillite dans l’année, 68 % ont répondu non. 12 % voyaient ce risque et 20 % ne savaient pas.',
        {
          compare: [
            ['Pertes ou pire', ['11 % ont perdu de l’argent (KHN)', '2 % jugent leur entreprise non viable (KHN)', '12 % voient un risque d’arrêt dans l’année (KHN)']],
            ['Bénéfice', ['81 % ont fait un bénéfice, dont 25 % plus que l’année précédente (KHN)', '68 % ne voient aucun risque d’arrêt (KHN)']]
          ]
        }
      ],
      [
        'Ce que la cuisine maîtrise',
        'Le loyer et les salaires sont en grande partie fixés. Les matières premières sont le plus gros poste sur lequel la cuisine agit chaque jour. Cela ne commence pas par la négociation avec le fournisseur, mais par la recette : combien dans une portion, combien tu prépares, et toute la brigade le sait-elle ?',
        {
          check: [
            'Note les quantités et le rendement de chaque recette, pour que chaque cuisinier fasse pareil.',
            'Convertis au nombre de couverts attendus, plutôt qu’au jugé.',
            'Pèse une portion et note le poids dans la recette.',
            'Après une semaine chargée, regarde ce qui reste et ajuste la recette.'
          ],
          title: 'Garder les achats sous contrôle'
        },
        { see: ['Adapter les recettes', '/fr/adapter-recettes', 'De 8 à 120 couverts, avec toutes les quantités recalculées exactement.'] }
      ],
      sources('Tous les chiffres proviennent de sources publiques. L’année figure toujours à côté du chiffre : des chiffres plus récents peuvent différer.', {
        title: 'Sources',
        cbsFin: 'CBS StatLine : entreprises ; données d’emploi et financières par secteur (81156ned)',
        cbsCount: 'CBS StatLine : entreprises par secteur (81589NED)',
        cbsFail: 'CBS : en décembre, 18 % de faillites en moins qu’un an plus tôt (12 janvier 2026)',
        khn: 'KHN : présentation de la conférence de presse au Horecava (12 janvier 2026)'
      })
    ],
    outro: 'Chiffres mis à jour jusqu’en novembre 2026. Quand ces sources publieront de nouveaux chiffres, nous mettrons cet article à jour.'
  }
};
