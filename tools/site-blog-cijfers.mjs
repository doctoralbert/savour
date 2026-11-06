// Blog: de Nederlandse horeca in cijfers (2026-11). Alleen cijfers met een openbare bron, met de bron erbij:
//   CBS, omzet horeca 2025 (2 maart 2026): https://www.cbs.nl/nl-nl/nieuws/2026/10/omzet-horeca-groeit-in-vierde-kwartaal-met-ruim-3-procent
//   CBS, faillissementen 2025 (12 januari 2026): https://www.cbs.nl/nl-nl/nieuws/2026/03/in-december-18-procent-minder-faillissementen-dan-een-jaar-eerder
//   KHN, persbericht Horecava (januari 2026): https://static2.khn.nl/public/images/Persbericht-KHN-Persconferentie.pdf
//   Ondernemersplein (KVK/CBS), factsheet horeca: https://ondernemersplein.overheid.nl/factsheet-horeca/
//   WUR, Monitor Voedselverspilling update 2009-2023 (rapport 2731): https://edepot.wur.nl/696157
//   Rijksoverheid, voedselverspilling gedaald met 17% sinds 2015 (4 september 2025)
// Komen er nieuwe cijfers, pas dan de tekst en de datum aan; verzin nooit een getal.

const SRC = {
  cbsOmzet: 'https://www.cbs.nl/nl-nl/nieuws/2026/10/omzet-horeca-groeit-in-vierde-kwartaal-met-ruim-3-procent',
  cbsFail: 'https://www.cbs.nl/nl-nl/nieuws/2026/03/in-december-18-procent-minder-faillissementen-dan-een-jaar-eerder',
  khn: 'https://static2.khn.nl/public/images/Persbericht-KHN-Persconferentie.pdf',
  factsheet: 'https://ondernemersplein.overheid.nl/factsheet-horeca/',
  wur: 'https://edepot.wur.nl/696157',
  rijk: 'https://www.rijksoverheid.nl/actueel/nieuws/2025/09/04/voedselverspilling-gedaald-met-17-sinds-2015'
};

export const NUMBERS_POST = {
  id: 'cijfers',
  date: '2026-11-06',
  rich: true,
  nl: {
    slug: 'blog/horeca-in-cijfers',
    title: 'Horeca in cijfers: wat 2025 en 2026 zeggen over het werk in de keuken',
    desc: 'De Nederlandse horeca in cijfers van CBS, KHN en WUR: omzet, aantal zaken, faillissementen, personeel en voedselverspilling. Met per onderwerp wat het betekent voor de keuken.',
    h1: 'Horeca in cijfers: wat 2025 en 2026 zeggen over het werk in de keuken',
    lead: 'Cijfers over de horeca gaan meestal over omzet en marges. Achter elk getal zit ook een keuken: minder handen, duurdere inkoop en gasten die meer betalen voor hetzelfde bord. We zetten de belangrijkste cijfers op een rij, met de bron erbij, en kijken wat ze betekenen aan het fornuis.',
    brief: [
      'De omzet steeg in 2025 met bijna 4 procent, maar er kwamen nauwelijks meer gasten bij: volgens KHN groeide het volume 1 procent.',
      'Er gingen minder horecazaken failliet dan in 2024, maar een op de vijf ondernemers heeft volgens KHN een schuldenprobleem.',
      'Restaurants en catering gooiden in 2023 samen 83 miljoen kilo eten weg. Elk recept dat precies klopt, telt daar mee.'
    ],
    sections: [
      [
        'Meer omzet, bijna evenveel gasten',
        'Volgens het CBS lag de omzet van de horeca in 2025 3,9 procent hoger dan een jaar eerder. Eet- en drinkgelegenheden deden het beter dan hotels en campings: plus 4,8 procent tegen plus 1,7 procent. Dat klinkt als groei, maar KHN rekent voor dat het volume, het aantal verkochte consumpties, maar met 1 procent steeg. Het grootste deel van de groei komt dus uit hogere prijzen.\n\nVoor de keuken betekent dat: de gast betaalt meer voor hetzelfde bord en verwacht dat het elke avond hetzelfde smaakt en eruitziet. Een portie die de ene dag 160 gram is en de andere dag 200, kost marge en vertrouwen.',
        { fact: ['+1%', 'groei in volume in 2025, tegenover +3,8% omzet (KHN)'] }
      ],
      [
        'Minder cafés, meer afhaal',
        'Het totaal aantal zaken bleef bijna gelijk: KHN telde eind 2025 43.606 horecalocaties, 278 minder dan een jaar eerder. Binnen die lijst is wel veel verschoven sinds begin 2020.',
        {
          head: ['Soort zaak', 'Verandering sinds begin 2020'],
          rows: [
            ['Cafés en discotheken', '−21,39%'],
            ['Fastservice', '+14,33%'],
            ['Bezorg- en afhaalbedrijven', '+48%']
          ],
          note: 'Bron: KHN, terug- en vooruitblik op de Horecava, januari 2026.'
        }
      ],
      [
        'Faillissementen: minder dan in 2024',
        'Het CBS telde in 2025 347 faillissementen in de horeca, tegen 377 in 2024. Over alle sectoren samen daalde het aantal met 15 procent. Dat is goed nieuws, maar het vertelt niet het hele verhaal. Volgens KHN heeft 20 procent van de ondernemers een schuldenprobleem en twijfelt 12 procent of het bedrijf het komende jaar doorgaat.',
        {
          compare: [
            ['Wat beter gaat', ['347 faillissementen in 2025, 30 minder dan in 2024 (CBS)', '44% van de ondernemers is (zeer) optimistisch over het eigen bedrijf (KHN)']],
            ['Wat zorgen baart', ['20% heeft een schuldenprobleem (KHN)', '12% weet niet zeker of het bedrijf volgend jaar nog bestaat (KHN)']]
          ]
        }
      ],
      [
        'Waar ondernemers van wakker liggen',
        'In het ledenonderzoek van KHN noemen ondernemers drie zorgen voor 2026 het vaakst. Twee daarvan raken de keuken direct: wat personeel kost en wat de inkoop kost.',
        {
          head: ['Grootste zorg voor 2026', 'Genoemd door'],
          rows: [
            ['Werkgeverslasten', '70%'],
            ['Stijgende inkoopkosten', '66%'],
            ['Regeldruk', '54%']
          ],
          note: 'Bron: ledenonderzoek KHN, januari 2026. Bij hotels noemt 82% de btw-verhoging als grootste uitdaging.'
        },
        {
          tip: [
            'Inkoop begint bij het recept',
            'Wie niet precies weet hoeveel boter, room of vlees een gerecht gebruikt, kan ook niet scherp inkopen. Een receptuur met vaste hoeveelheden is de eerste stap, nog voor een kostprijsberekening.'
          ]
        }
      ],
      [
        'Personeel: de vacatures blijven',
        'KHN spreekt namens meer dan 520.000 horecamedewerkers. Toch blijven er plekken leeg: volgens de factsheet horeca van Ondernemersplein stonden er in het derde kwartaal van 2026 25.200 vacatures open, tegen 28.100 een kwartaal eerder.\n\nIn de keuken zie je dat aan nieuwe gezichten die snel mee moeten draaien, stagiairs die maar een paar maanden blijven en invallers op drukke avonden. Hoe sneller iemand ziet hoe een gerecht hier gemaakt wordt, hoe minder de chef hoeft uit te leggen tijdens de service.',
        { see: ['Delen met je brigade', '/recepten-delen', 'Iedereen in het keukenteam werkt met dezelfde, goedgekeurde versie van het recept.'] }
      ],
      [
        'Verspilling: 83 miljoen kilo uit restaurants en catering',
        'Volgens de Monitor Voedselverspilling van Wageningen University & Research verspilde Nederland in 2023 in totaal 2.271 miljoen kilo voedsel, 127 kilo per inwoner. Restaurants en cateringdiensten waren samen goed voor 83 miljoen kilo. Het meeste verdwijnt nog altijd bij de mensen thuis, maar de horeca is een post die je zelf in de hand hebt.\n\nDe rijksoverheid meldt dat de totale verspilling van 2015 tot en met 2023 met 17 procent is gedaald. Het kan dus wel.',
        { fact: ['83 miljoen kilo', 'voedsel verspild door restaurants en cateringdiensten in 2023 (WUR)'] },
        {
          check: [
            'Schaal recepten precies op naar het aantal couverts, in plaats van op gevoel.',
            'Leg vast hoeveel een portie weegt, zodat iedereen hetzelfde opschept.',
            'Maak van restjes een eigen basisrecept (een fond, een crumble) en schrijf het op.',
            'Kijk na een week wat er overbleef en pas de hoeveelheden in het recept aan.'
          ],
          title: 'Minder weggooien begint in de receptuur'
        }
      ],
      [
        'Wat je hier in de keuken mee doet',
        'Geen van deze cijfers los je op met één app. Wel zie je een patroon: de zaken die het redden, weten wat er op het bord gaat, wat het kost en wie het maakt. Dat begint bij recepten die kloppen, die iedereen kan vinden en die je zonder rekenfouten kunt opschalen. Daar is Savour voor gemaakt.',
        { see: ['Recepten opschalen', '/recepten-opschalen', 'Van 8 couverts naar 120, met de hoeveelheden precies omgerekend.'] }
      ],
      [
        'Bronnen',
        'Alle cijfers komen uit openbare bronnen. Het jaar staat steeds bij het cijfer: nieuwere cijfers kunnen anders uitvallen.',
        [
          `[CBS: omzet horeca groeit in vierde kwartaal met ruim 3 procent](${SRC.cbsOmzet}) (2 maart 2026)`,
          `[CBS: in december 18 procent minder faillissementen dan een jaar eerder](${SRC.cbsFail}) (12 januari 2026)`,
          `[KHN: persbericht terug- en vooruitblik, Horecava](${SRC.khn}) (januari 2026)`,
          `[Ondernemersplein: factsheet horeca](${SRC.factsheet})`,
          `[WUR: Monitor Voedselverspilling, update 2009-2023](${SRC.wur})`,
          `[Rijksoverheid: voedselverspilling gedaald met 17% sinds 2015](${SRC.rijk}) (4 september 2025)`
        ]
      ]
    ],
    outro: 'Cijfers bijgewerkt tot november 2026. Zien we nieuwe cijfers van deze bronnen, dan passen we dit artikel aan.'
  },
  en: {
    slug: 'en/blog/hospitality-in-numbers',
    title: 'Dutch hospitality in numbers: what 2025 and 2026 say about kitchen work',
    desc: 'The Dutch hospitality sector in figures from CBS, KHN and WUR: turnover, number of venues, bankruptcies, staff and food waste. For each topic, what it means for the kitchen.',
    h1: 'Dutch hospitality in numbers: what 2025 and 2026 say about kitchen work',
    lead: 'Figures about hospitality usually talk about turnover and margins. Behind every number there is also a kitchen: fewer hands, pricier ingredients and guests who pay more for the same plate. Here are the key figures for the Netherlands, each with its source, and what they mean at the stove.',
    brief: [
      'Turnover rose by almost 4 percent in 2025, but hardly any more guests came: according to KHN, volume grew by 1 percent.',
      'Fewer hospitality businesses went bankrupt than in 2024, but according to KHN one in five owners has a debt problem.',
      'In 2023, restaurants and catering together threw away 83 million kilos of food. Every recipe that is exactly right helps.'
    ],
    sections: [
      [
        'More turnover, about the same number of guests',
        'According to Statistics Netherlands (CBS), hospitality turnover in 2025 was 3.9 percent higher than a year earlier. Restaurants, cafés and bars did better than hotels and campsites: up 4.8 percent against 1.7 percent. That sounds like growth, but the Dutch hospitality association KHN calculates that volume, the number of items sold, rose by only 1 percent. Most of the growth comes from higher prices.\n\nFor the kitchen this means: the guest pays more for the same plate and expects it to taste and look the same every night. A portion that is 160 grams one day and 200 the next costs margin and trust.',
        { fact: ['+1%', 'growth in volume in 2025, against +3.8% turnover (KHN)'] }
      ],
      [
        'Fewer cafés, more takeaway',
        'The total number of venues stayed almost the same: KHN counted 43,606 hospitality locations at the end of 2025, 278 fewer than a year before. Within that list, a lot has shifted since early 2020.',
        {
          head: ['Type of venue', 'Change since early 2020'],
          rows: [
            ['Cafés and nightclubs', '−21.39%'],
            ['Fast service', '+14.33%'],
            ['Delivery and takeaway', '+48%']
          ],
          note: 'Source: KHN, review and outlook at Horecava, January 2026.'
        }
      ],
      [
        'Bankruptcies: fewer than in 2024',
        'CBS counted 347 bankruptcies in hospitality in 2025, against 377 in 2024. Across all sectors, the number fell by 15 percent. That is good news, but it is not the whole story. According to KHN, 20 percent of owners have a debt problem and 12 percent are unsure whether the business will continue next year.',
        {
          compare: [
            ['What is improving', ['347 bankruptcies in 2025, 30 fewer than in 2024 (CBS)', '44% of owners are (very) optimistic about their own business (KHN)']],
            ['What is worrying', ['20% have a debt problem (KHN)', '12% are not sure the business will still exist next year (KHN)']]
          ]
        }
      ],
      [
        'What keeps owners up at night',
        'In KHN’s member survey, owners name three worries for 2026 most often. Two of them hit the kitchen directly: what staff cost and what ingredients cost.',
        {
          head: ['Biggest worry for 2026', 'Named by'],
          rows: [
            ['Employer costs', '70%'],
            ['Rising purchasing costs', '66%'],
            ['Regulation and red tape', '54%']
          ],
          note: 'Source: KHN member survey, January 2026. Among hotels, 82% name the VAT increase as the biggest challenge.'
        },
        {
          tip: [
            'Purchasing starts with the recipe',
            'If you do not know exactly how much butter, cream or meat a dish uses, you cannot buy sharply either. A recipe with fixed quantities is the first step, even before a cost calculation.'
          ]
        }
      ],
      [
        'Staff: the vacancies remain',
        'KHN speaks on behalf of more than 520,000 hospitality workers. Still, places stay empty: according to the hospitality factsheet of the Dutch government’s business portal, there were 25,200 open vacancies in the third quarter of 2026, against 28,100 a quarter earlier.\n\nIn the kitchen you see this in new faces who have to keep up fast, interns who stay only a few months and stand-ins on busy nights. The faster someone sees how a dish is made here, the less the chef has to explain during service.',
        { see: ['Share with your brigade', '/en/share-recipes', 'Everyone in the kitchen team works from the same approved version of the recipe.'] }
      ],
      [
        'Waste: 83 million kilos from restaurants and catering',
        'According to the food waste monitor of Wageningen University & Research, the Netherlands wasted 2,271 million kilos of food in total in 2023, 127 kilos per person. Restaurants and catering together accounted for 83 million kilos. Most is still lost in people’s homes, but hospitality is a part you control yourself.\n\nThe Dutch government reports that total food waste fell by 17 percent from 2015 to 2023. So it can be done.',
        { fact: ['83 million kilos', 'of food wasted by restaurants and catering in 2023 (WUR)'] },
        {
          check: [
            'Scale recipes exactly to the number of covers, not by feel.',
            'Write down what a portion weighs, so everyone serves the same.',
            'Turn leftovers into a base recipe of their own (a stock, a crumble) and write it down.',
            'After a week, look at what was left and adjust the quantities in the recipe.'
          ],
          title: 'Less waste starts in the recipe'
        }
      ],
      [
        'What this means in your kitchen',
        'None of these figures is solved by a single app. But there is a pattern: the places that make it know what goes on the plate, what it costs and who makes it. That starts with recipes that are right, that everyone can find and that you can scale without mistakes. That is what Savour is made for.',
        { see: ['Scale recipes', '/en/scale-recipes', 'From 8 covers to 120, with the quantities converted exactly.'] }
      ],
      [
        'Sources',
        'All figures come from public sources, most of them in Dutch. The year is always given with the figure: newer figures may differ.',
        [
          `[CBS: hospitality turnover grows by over 3 percent in the fourth quarter](${SRC.cbsOmzet}) (2 March 2026)`,
          `[CBS: 18 percent fewer bankruptcies in December than a year earlier](${SRC.cbsFail}) (12 January 2026)`,
          `[KHN: press release, review and outlook at Horecava](${SRC.khn}) (January 2026)`,
          `[Ondernemersplein: hospitality factsheet](${SRC.factsheet})`,
          `[WUR: Food Waste Monitor, update 2009-2023](${SRC.wur})`,
          `[Dutch government: food waste down 17% since 2015](${SRC.rijk}) (4 September 2025)`
        ]
      ]
    ],
    outro: 'Figures updated to November 2026. When these sources publish new figures, we will update this article.'
  }
};

// Vertalingen, op de Engelse slug (zoals de andere blogs in tools/site-pages-*.mjs).
const KEY = 'en/blog/hospitality-in-numbers';

export const NUMBERS_POST_DE = {
  [KEY]: {
    slug: 'de/blog/gastronomie-in-zahlen',
    title: 'Gastronomie in den Niederlanden in Zahlen: was 2025 und 2026 über die Arbeit in der Küche sagen',
    desc: 'Die niederländische Gastronomie in Zahlen von CBS, KHN und WUR: Umsatz, Zahl der Betriebe, Insolvenzen, Personal und Lebensmittelverschwendung. Zu jedem Thema, was es für die Küche bedeutet.',
    h1: 'Gastronomie in Zahlen: was 2025 und 2026 über die Arbeit in der Küche sagen',
    lead: 'Zahlen über die Gastronomie handeln meist von Umsatz und Margen. Hinter jeder Zahl steht aber auch eine Küche: weniger Hände, teurerer Einkauf und Gäste, die für denselben Teller mehr bezahlen. Hier die wichtigsten Zahlen aus den Niederlanden, jeweils mit Quelle, und was sie am Herd bedeuten.',
    brief: [
      'Der Umsatz stieg 2025 um fast 4 Prozent, aber kaum mehr Gäste kamen: laut KHN wuchs die Menge um 1 Prozent.',
      'Weniger Gastronomiebetriebe gingen insolvent als 2024, doch laut KHN hat jeder fünfte Unternehmer ein Schuldenproblem.',
      'Restaurants und Catering warfen 2023 zusammen 83 Millionen Kilo Lebensmittel weg. Jedes Rezept, das genau stimmt, hilft.'
    ],
    sections: [
      [
        'Mehr Umsatz, fast gleich viele Gäste',
        'Laut dem niederländischen Statistikamt CBS lag der Umsatz der Gastronomie 2025 um 3,9 Prozent höher als im Vorjahr. Restaurants, Cafés und Bars schnitten besser ab als Hotels und Campingplätze: plus 4,8 gegenüber plus 1,7 Prozent. Das klingt nach Wachstum, aber der Branchenverband KHN rechnet vor, dass die Menge, also die Zahl der verkauften Portionen und Getränke, nur um 1 Prozent stieg. Der größte Teil des Wachstums kommt also aus höheren Preisen.\n\nFür die Küche heißt das: Der Gast zahlt mehr für denselben Teller und erwartet, dass er jeden Abend gleich schmeckt und aussieht. Eine Portion, die an einem Tag 160 Gramm wiegt und am nächsten 200, kostet Marge und Vertrauen.',
        { fact: ['+1 %', 'Wachstum der Menge 2025, gegenüber +3,8 % Umsatz (KHN)'] }
      ],
      [
        'Weniger Kneipen, mehr Abholung',
        'Die Gesamtzahl der Betriebe blieb fast gleich: KHN zählte Ende 2025 43.606 Gastronomiestandorte, 278 weniger als ein Jahr zuvor. Innerhalb dieser Zahl hat sich seit Anfang 2020 aber viel verschoben.',
        {
          head: ['Art des Betriebs', 'Veränderung seit Anfang 2020'],
          rows: [
            ['Kneipen und Diskotheken', '−21,39 %'],
            ['Schnellgastronomie', '+14,33 %'],
            ['Liefer- und Abholbetriebe', '+48 %']
          ],
          note: 'Quelle: KHN, Rück- und Ausblick auf der Horecava, Januar 2026.'
        }
      ],
      [
        'Insolvenzen: weniger als 2024',
        'Das CBS zählte 2025 in der Gastronomie 347 Insolvenzen, gegenüber 377 im Jahr 2024. Über alle Branchen sank die Zahl um 15 Prozent. Das ist eine gute Nachricht, aber nicht die ganze Geschichte. Laut KHN haben 20 Prozent der Unternehmer ein Schuldenproblem, und 12 Prozent sind unsicher, ob der Betrieb im nächsten Jahr weitergeht.',
        {
          compare: [
            ['Was besser läuft', ['347 Insolvenzen 2025, 30 weniger als 2024 (CBS)', '44 % der Unternehmer sind (sehr) optimistisch für den eigenen Betrieb (KHN)']],
            ['Was Sorgen macht', ['20 % haben ein Schuldenproblem (KHN)', '12 % wissen nicht sicher, ob der Betrieb nächstes Jahr noch besteht (KHN)']]
          ]
        }
      ],
      [
        'Was Unternehmer nachts wach hält',
        'In der Mitgliederumfrage von KHN nennen Unternehmer drei Sorgen für 2026 am häufigsten. Zwei davon treffen die Küche direkt: was Personal kostet und was der Einkauf kostet.',
        {
          head: ['Größte Sorge für 2026', 'Genannt von'],
          rows: [
            ['Arbeitgeberkosten', '70 %'],
            ['Steigende Einkaufskosten', '66 %'],
            ['Bürokratie', '54 %']
          ],
          note: 'Quelle: Mitgliederumfrage KHN, Januar 2026. Bei Hotels nennen 82 % die Mehrwertsteuererhöhung als größte Herausforderung.'
        },
        {
          tip: [
            'Einkauf beginnt beim Rezept',
            'Wer nicht genau weiß, wie viel Butter, Sahne oder Fleisch ein Gericht braucht, kann auch nicht knapp einkaufen. Ein Rezept mit festen Mengen ist der erste Schritt, noch vor einer Kalkulation.'
          ]
        }
      ],
      [
        'Personal: die offenen Stellen bleiben',
        'KHN spricht für mehr als 520.000 Beschäftigte in der Gastronomie. Trotzdem bleiben Stellen leer: Laut dem Gastronomie-Factsheet des niederländischen Unternehmerportals waren im dritten Quartal 2026 25.200 Stellen offen, gegenüber 28.100 im Quartal davor.\n\nIn der Küche merkt man das an neuen Gesichtern, die schnell mitlaufen müssen, Praktikanten, die nur ein paar Monate bleiben, und Aushilfen an vollen Abenden. Je schneller jemand sieht, wie ein Gericht hier gemacht wird, desto weniger muss der Küchenchef im Service erklären.',
        { see: ['Mit deiner Brigade teilen', '/de/rezepte-teilen', 'Alle im Küchenteam arbeiten mit derselben, freigegebenen Version des Rezepts.'] }
      ],
      [
        'Verschwendung: 83 Millionen Kilo aus Restaurants und Catering',
        'Laut dem Monitor für Lebensmittelverschwendung der Universität Wageningen (WUR) wurden in den Niederlanden 2023 insgesamt 2.271 Millionen Kilo Lebensmittel verschwendet, 127 Kilo pro Einwohner. Restaurants und Catering kamen zusammen auf 83 Millionen Kilo. Das meiste geht immer noch in den Haushalten verloren, aber die Gastronomie ist ein Posten, den man selbst in der Hand hat.\n\nDie niederländische Regierung meldet, dass die gesamte Verschwendung von 2015 bis 2023 um 17 Prozent gesunken ist. Es geht also.',
        { fact: ['83 Mio. Kilo', 'Lebensmittel, die Restaurants und Catering 2023 verschwendet haben (WUR)'] },
        {
          check: [
            'Rezepte genau auf die Zahl der Gedecke hochrechnen, nicht nach Gefühl.',
            'Festhalten, wie viel eine Portion wiegt, damit alle gleich anrichten.',
            'Aus Resten ein eigenes Grundrezept machen (einen Fond, einen Crumble) und es aufschreiben.',
            'Nach einer Woche schauen, was übrig blieb, und die Mengen im Rezept anpassen.'
          ],
          title: 'Weniger wegwerfen beginnt im Rezept'
        }
      ],
      [
        'Was du in der Küche damit machst',
        'Keine dieser Zahlen löst man mit einer App. Aber es gibt ein Muster: Die Betriebe, die es schaffen, wissen, was auf den Teller kommt, was es kostet und wer es macht. Das beginnt mit Rezepten, die stimmen, die jeder findet und die man ohne Rechenfehler hochrechnen kann. Dafür ist Savour gemacht.',
        { see: ['Rezepte hochrechnen', '/de/rezepte-hochrechnen', 'Von 8 Gedecken auf 120, mit genau umgerechneten Mengen.'] }
      ],
      [
        'Quellen',
        'Alle Zahlen stammen aus öffentlichen Quellen, die meisten auf Niederländisch. Das Jahr steht immer bei der Zahl: neuere Zahlen können anders ausfallen.',
        [
          `[CBS: Umsatz der Gastronomie wächst im vierten Quartal um gut 3 Prozent](${SRC.cbsOmzet}) (2. März 2026)`,
          `[CBS: im Dezember 18 Prozent weniger Insolvenzen als ein Jahr zuvor](${SRC.cbsFail}) (12. Januar 2026)`,
          `[KHN: Pressemitteilung Rück- und Ausblick, Horecava](${SRC.khn}) (Januar 2026)`,
          `[Ondernemersplein: Factsheet Gastronomie](${SRC.factsheet})`,
          `[WUR: Monitor Lebensmittelverschwendung, Update 2009-2023](${SRC.wur})`,
          `[Niederländische Regierung: Verschwendung seit 2015 um 17 % gesunken](${SRC.rijk}) (4. September 2025)`
        ]
      ]
    ],
    outro: 'Zahlen aktualisiert bis November 2026. Veröffentlichen diese Quellen neue Zahlen, passen wir den Artikel an.'
  }
};

export const NUMBERS_POST_ES = {
  [KEY]: {
    slug: 'es/blog/hosteleria-en-cifras',
    title: 'La hostelería neerlandesa en cifras: lo que 2025 y 2026 dicen sobre el trabajo en cocina',
    desc: 'La hostelería de los Países Bajos en cifras de CBS, KHN y WUR: facturación, número de locales, quiebras, personal y desperdicio de alimentos. En cada tema, lo que significa para la cocina.',
    h1: 'Hostelería en cifras: lo que 2025 y 2026 dicen sobre el trabajo en cocina',
    lead: 'Las cifras de hostelería suelen hablar de facturación y márgenes. Detrás de cada número también hay una cocina: menos manos, compras más caras y clientes que pagan más por el mismo plato. Estas son las cifras clave de los Países Bajos, cada una con su fuente, y lo que significan junto a los fogones.',
    brief: [
      'La facturación subió casi un 4 por ciento en 2025, pero apenas llegaron más clientes: según KHN, el volumen creció un 1 por ciento.',
      'Quebraron menos negocios de hostelería que en 2024, pero según KHN uno de cada cinco empresarios tiene un problema de deudas.',
      'En 2023, restaurantes y catering tiraron juntos 83 millones de kilos de comida. Cada receta exacta ayuda.'
    ],
    sections: [
      [
        'Más facturación, casi los mismos clientes',
        'Según el instituto de estadística neerlandés CBS, la facturación de la hostelería en 2025 fue un 3,9 por ciento mayor que el año anterior. Restaurantes, cafés y bares lo hicieron mejor que hoteles y campings: un 4,8 frente a un 1,7 por ciento más. Suena a crecimiento, pero la asociación del sector KHN calcula que el volumen, el número de consumiciones vendidas, solo subió un 1 por ciento. La mayor parte del crecimiento viene de precios más altos.\n\nPara la cocina significa que el cliente paga más por el mismo plato y espera que sepa y se vea igual cada noche. Una ración que un día pesa 160 gramos y al siguiente 200 cuesta margen y confianza.',
        { fact: ['+1 %', 'de crecimiento en volumen en 2025, frente a +3,8 % de facturación (KHN)'] }
      ],
      [
        'Menos bares, más comida para llevar',
        'El número total de locales se mantuvo casi igual: KHN contó 43.606 establecimientos de hostelería a finales de 2025, 278 menos que un año antes. Pero dentro de esa cifra ha cambiado mucho desde principios de 2020.',
        {
          head: ['Tipo de local', 'Cambio desde principios de 2020'],
          rows: [
            ['Bares y discotecas', '−21,39 %'],
            ['Comida rápida', '+14,33 %'],
            ['Reparto y para llevar', '+48 %']
          ],
          note: 'Fuente: KHN, balance y perspectivas en Horecava, enero de 2026.'
        }
      ],
      [
        'Quiebras: menos que en 2024',
        'El CBS contó 347 quiebras en hostelería en 2025, frente a 377 en 2024. En todos los sectores juntos, la cifra bajó un 15 por ciento. Es una buena noticia, pero no lo cuenta todo. Según KHN, el 20 por ciento de los empresarios tiene un problema de deudas y el 12 por ciento duda de si el negocio seguirá el año que viene.',
        {
          compare: [
            ['Lo que mejora', ['347 quiebras en 2025, 30 menos que en 2024 (CBS)', 'El 44 % de los empresarios es (muy) optimista sobre su negocio (KHN)']],
            ['Lo que preocupa', ['El 20 % tiene un problema de deudas (KHN)', 'El 12 % no sabe si el negocio seguirá existiendo el año que viene (KHN)']]
          ]
        }
      ],
      [
        'Lo que quita el sueño a los empresarios',
        'En la encuesta a socios de KHN, los empresarios nombran tres preocupaciones para 2026 con más frecuencia. Dos tocan directamente la cocina: lo que cuesta el personal y lo que cuestan las compras.',
        {
          head: ['Mayor preocupación para 2026', 'Mencionada por'],
          rows: [
            ['Costes laborales', '70 %'],
            ['Subida de los costes de compra', '66 %'],
            ['Burocracia', '54 %']
          ],
          note: 'Fuente: encuesta a socios de KHN, enero de 2026. Entre los hoteles, el 82 % cita la subida del IVA como mayor reto.'
        },
        {
          tip: [
            'La compra empieza en la receta',
            'Si no sabes exactamente cuánta mantequilla, nata o carne lleva un plato, tampoco puedes comprar con precisión. Una receta con cantidades fijas es el primer paso, incluso antes de calcular el coste.'
          ]
        }
      ],
      [
        'Personal: las vacantes siguen ahí',
        'KHN habla en nombre de más de 520.000 trabajadores de hostelería. Aun así, quedan puestos vacíos: según la ficha de hostelería del portal neerlandés para empresas, en el tercer trimestre de 2026 había 25.200 vacantes abiertas, frente a 28.100 un trimestre antes.\n\nEn la cocina se nota en caras nuevas que tienen que ponerse al día rápido, becarios que solo se quedan unos meses y refuerzos en las noches de mucho trabajo. Cuanto antes alguien ve cómo se hace un plato aquí, menos tiene que explicar el jefe durante el servicio.',
        { see: ['Compartir con tu brigada', '/es/compartir-recetas', 'Todo el equipo de cocina trabaja con la misma versión aprobada de la receta.'] }
      ],
      [
        'Desperdicio: 83 millones de kilos de restaurantes y catering',
        'Según el monitor de desperdicio alimentario de la Universidad de Wageningen (WUR), los Países Bajos desperdiciaron en 2023 un total de 2.271 millones de kilos de alimentos, 127 kilos por habitante. Restaurantes y catering sumaron 83 millones de kilos. La mayor parte se sigue perdiendo en los hogares, pero la hostelería es una partida que controlas tú.\n\nEl gobierno neerlandés informa de que el desperdicio total bajó un 17 por ciento entre 2015 y 2023. Así que se puede.',
        { fact: ['83 millones de kilos', 'de comida desperdiciada por restaurantes y catering en 2023 (WUR)'] },
        {
          check: [
            'Escala las recetas exactamente al número de cubiertos, no a ojo.',
            'Anota cuánto pesa una ración, para que todos sirvan lo mismo.',
            'Convierte las sobras en una receta base propia (un fondo, un crumble) y apúntala.',
            'Al cabo de una semana, mira qué sobró y ajusta las cantidades de la receta.'
          ],
          title: 'Tirar menos empieza en la receta'
        }
      ],
      [
        'Qué hacer con esto en tu cocina',
        'Ninguna de estas cifras se resuelve con una sola app. Pero hay un patrón: los locales que salen adelante saben qué va en el plato, cuánto cuesta y quién lo hace. Eso empieza con recetas correctas, que todos encuentran y que puedes escalar sin errores. Para eso está hecho Savour.',
        { see: ['Escalar recetas', '/es/escalar-recetas', 'De 8 cubiertos a 120, con las cantidades calculadas con exactitud.'] }
      ],
      [
        'Fuentes',
        'Todas las cifras proceden de fuentes públicas, la mayoría en neerlandés. El año figura siempre junto a la cifra: las cifras más recientes pueden ser distintas.',
        [
          `[CBS: la facturación de la hostelería crece más de un 3 % en el cuarto trimestre](${SRC.cbsOmzet}) (2 de marzo de 2026)`,
          `[CBS: en diciembre, un 18 % menos de quiebras que un año antes](${SRC.cbsFail}) (12 de enero de 2026)`,
          `[KHN: nota de prensa, balance y perspectivas en Horecava](${SRC.khn}) (enero de 2026)`,
          `[Ondernemersplein: ficha de hostelería](${SRC.factsheet})`,
          `[WUR: Monitor de desperdicio alimentario, actualización 2009-2023](${SRC.wur})`,
          `[Gobierno neerlandés: el desperdicio bajó un 17 % desde 2015](${SRC.rijk}) (4 de septiembre de 2025)`
        ]
      ]
    ],
    outro: 'Cifras actualizadas hasta noviembre de 2026. Cuando estas fuentes publiquen cifras nuevas, actualizaremos el artículo.'
  }
};

export const NUMBERS_POST_FR = {
  [KEY]: {
    slug: 'fr/blog/restauration-en-chiffres',
    title: 'La restauration néerlandaise en chiffres : ce que 2025 et 2026 disent du travail en cuisine',
    desc: 'La restauration aux Pays-Bas en chiffres, d’après CBS, KHN et WUR : chiffre d’affaires, nombre d’établissements, faillites, personnel et gaspillage alimentaire. Pour chaque sujet, ce que cela signifie en cuisine.',
    h1: 'Restauration en chiffres : ce que 2025 et 2026 disent du travail en cuisine',
    lead: 'Les chiffres de la restauration parlent surtout de chiffre d’affaires et de marges. Derrière chaque nombre, il y a aussi une cuisine : moins de bras, des achats plus chers et des clients qui paient plus pour la même assiette. Voici les chiffres clés des Pays-Bas, chacun avec sa source, et ce qu’ils veulent dire au piano.',
    brief: [
      'Le chiffre d’affaires a augmenté de près de 4 % en 2025, mais presque pas de clients en plus : selon KHN, le volume a progressé de 1 %.',
      'Moins d’établissements ont fait faillite qu’en 2024, mais selon KHN un exploitant sur cinq a un problème de dettes.',
      'En 2023, restaurants et traiteurs ont jeté ensemble 83 millions de kilos de nourriture. Chaque recette juste compte.'
    ],
    sections: [
      [
        'Plus de chiffre d’affaires, presque autant de clients',
        'Selon l’institut statistique néerlandais CBS, le chiffre d’affaires de la restauration et de l’hôtellerie a été en 2025 supérieur de 3,9 % à celui de l’année précédente. Restaurants, cafés et bars ont fait mieux que les hôtels et campings : +4,8 % contre +1,7 %. Cela ressemble à de la croissance, mais la fédération KHN calcule que le volume, le nombre de consommations vendues, n’a progressé que de 1 %. L’essentiel de la croissance vient donc de prix plus élevés.\n\nPour la cuisine, cela veut dire que le client paie plus pour la même assiette et attend qu’elle ait le même goût et le même aspect chaque soir. Une portion qui pèse 160 grammes un jour et 200 le lendemain coûte de la marge et de la confiance.',
        { fact: ['+1 %', 'de croissance en volume en 2025, contre +3,8 % de chiffre d’affaires (KHN)'] }
      ],
      [
        'Moins de cafés, plus de vente à emporter',
        'Le nombre total d’établissements est resté presque stable : KHN comptait 43 606 établissements fin 2025, 278 de moins qu’un an plus tôt. Mais à l’intérieur de ce total, beaucoup de choses ont bougé depuis début 2020.',
        {
          head: ['Type d’établissement', 'Évolution depuis début 2020'],
          rows: [
            ['Cafés et discothèques', '−21,39 %'],
            ['Restauration rapide', '+14,33 %'],
            ['Livraison et vente à emporter', '+48 %']
          ],
          note: 'Source : KHN, bilan et perspectives au salon Horecava, janvier 2026.'
        }
      ],
      [
        'Faillites : moins qu’en 2024',
        'Le CBS a compté 347 faillites dans la restauration et l’hôtellerie en 2025, contre 377 en 2024. Tous secteurs confondus, le nombre a baissé de 15 %. C’est une bonne nouvelle, mais ce n’est pas toute l’histoire. Selon KHN, 20 % des exploitants ont un problème de dettes et 12 % ne savent pas si leur établissement continuera l’an prochain.',
        {
          compare: [
            ['Ce qui va mieux', ['347 faillites en 2025, 30 de moins qu’en 2024 (CBS)', '44 % des exploitants sont (très) optimistes pour leur établissement (KHN)']],
            ['Ce qui inquiète', ['20 % ont un problème de dettes (KHN)', '12 % ne sont pas sûrs que leur établissement existera encore l’an prochain (KHN)']]
          ]
        }
      ],
      [
        'Ce qui empêche les exploitants de dormir',
        'Dans l’enquête de KHN auprès de ses membres, trois inquiétudes pour 2026 reviennent le plus souvent. Deux touchent directement la cuisine : ce que coûte le personnel et ce que coûtent les achats.',
        {
          head: ['Plus grande inquiétude pour 2026', 'Citée par'],
          rows: [
            ['Charges patronales', '70 %'],
            ['Hausse des coûts d’achat', '66 %'],
            ['Charge administrative', '54 %']
          ],
          note: 'Source : enquête membres KHN, janvier 2026. Parmi les hôtels, 82 % citent la hausse de la TVA comme le plus grand défi.'
        },
        {
          tip: [
            'Les achats commencent par la recette',
            'Si tu ne sais pas exactement combien de beurre, de crème ou de viande un plat utilise, tu ne peux pas acheter au plus juste. Une recette avec des quantités fixes est la première étape, avant même un calcul de coût.'
          ]
        }
      ],
      [
        'Personnel : les postes vacants restent',
        'KHN parle au nom de plus de 520 000 salariés de la restauration et de l’hôtellerie. Pourtant, des postes restent vides : selon la fiche sectorielle du portail néerlandais des entreprises, 25 200 postes étaient vacants au troisième trimestre 2026, contre 28 100 le trimestre précédent.\n\nEn cuisine, cela se voit avec de nouvelles têtes qui doivent suivre vite, des stagiaires qui ne restent que quelques mois et des extras les soirs de rush. Plus vite quelqu’un voit comment un plat se fait ici, moins le chef doit expliquer pendant le service.',
        { see: ['Partager avec ta brigade', '/fr/partager-recettes', 'Toute l’équipe de cuisine travaille avec la même version validée de la recette.'] }
      ],
      [
        'Gaspillage : 83 millions de kilos venant des restaurants et traiteurs',
        'Selon le baromètre du gaspillage alimentaire de l’université de Wageningen (WUR), les Pays-Bas ont gaspillé en 2023 au total 2 271 millions de kilos de nourriture, 127 kilos par habitant. Restaurants et traiteurs en représentaient ensemble 83 millions de kilos. La plus grande partie se perd encore chez les particuliers, mais la restauration est un poste que tu maîtrises toi-même.\n\nLe gouvernement néerlandais indique que le gaspillage total a baissé de 17 % entre 2015 et 2023. C’est donc possible.',
        { fact: ['83 millions de kilos', 'de nourriture gaspillée par les restaurants et traiteurs en 2023 (WUR)'] },
        {
          check: [
            'Adapte les recettes exactement au nombre de couverts, pas au jugé.',
            'Note ce que pèse une portion, pour que tout le monde dresse pareil.',
            'Fais des restes une recette de base à part entière (un fond, un crumble) et écris-la.',
            'Après une semaine, regarde ce qui est resté et ajuste les quantités dans la recette.'
          ],
          title: 'Moins jeter commence dans la recette'
        }
      ],
      [
        'Ce que tu en fais dans ta cuisine',
        'Aucun de ces chiffres ne se règle avec une seule application. Mais on voit un schéma : les établissements qui tiennent savent ce qui va dans l’assiette, ce que cela coûte et qui le fait. Cela commence par des recettes justes, que chacun retrouve et que l’on peut adapter sans erreur de calcul. C’est pour cela que Savour a été créé.',
        { see: ['Adapter les recettes', '/fr/adapter-recettes', 'De 8 couverts à 120, avec des quantités recalculées exactement.'] }
      ],
      [
        'Sources',
        'Tous les chiffres viennent de sources publiques, la plupart en néerlandais. L’année figure toujours avec le chiffre : des chiffres plus récents peuvent différer.',
        [
          `[CBS : le chiffre d’affaires de la restauration progresse de plus de 3 % au quatrième trimestre](${SRC.cbsOmzet}) (2 mars 2026)`,
          `[CBS : en décembre, 18 % de faillites en moins qu’un an plus tôt](${SRC.cbsFail}) (12 janvier 2026)`,
          `[KHN : communiqué, bilan et perspectives au salon Horecava](${SRC.khn}) (janvier 2026)`,
          `[Ondernemersplein : fiche restauration et hôtellerie](${SRC.factsheet})`,
          `[WUR : baromètre du gaspillage alimentaire, mise à jour 2009-2023](${SRC.wur})`,
          `[Gouvernement néerlandais : le gaspillage a baissé de 17 % depuis 2015](${SRC.rijk}) (4 septembre 2025)`
        ]
      ]
    ],
    outro: 'Chiffres mis à jour jusqu’en novembre 2026. Quand ces sources publieront de nouveaux chiffres, nous mettrons l’article à jour.'
  }
};
