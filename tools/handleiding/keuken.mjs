// Handleiding, onderdeel "In de keuken": omrekenen, kookmodus en offline.

export const group = {
  id: 'keuken',
  nl: {
    name: 'In de keuken',
    intro: 'Omrekenen naar elke opbrengst, de kookmodus met grote letters en je recepten zonder internet.'
  },
  en: {
    name: 'In the kitchen',
    intro: 'Scaling to any yield, cook mode with large text and your recipes without internet.'
  }
};

export const pages = [
  {
    id: 'omrekenen',
    related: ['omrekenen-meer', 'eenheden', 'tips-opschalen'],
    nl: {
      slug: 'handleiding-omrekenen',
      menu: 'Omrekenen met de snelknoppen',
      h1: 'Omrekenen',
      title: 'Recepten omrekenen en opschalen in Savour | Handleiding',
      desc: 'Zo reken je een recept om in Savour: snelknoppen van ¼× tot 10×, terug naar het origineel, omgerekend printen, en waarom het opgeslagen recept nooit verandert.',
      lead: 'Van 8 couverts naar 120 met één tik, zonder rekenfouten.',
      sections: [
        [
          'Snelknoppen',
          'Onder elk recept met ingrediënten staat “Omrekenen” met de knoppen ¼×, ½×, 1½×, 2×, 3×, 4×, 5× en 10×. Eén tik en alle hoeveelheden zijn omgerekend, in alle [delen](#recept-delen) van het recept.'
        ],
        [
          'Terug naar het origineel',
          'Met “Origineel” zie je weer de oorspronkelijke hoeveelheden.'
        ],
        [
          'Een andere factor of opbrengst',
          'Heb je 2,5× nodig, of precies 3,5 liter? Of heb je nog 3 kg van één ingrediënt? Kies dan ⋯ “Meer omrekenen”. Zie [Meer omrekenen](#omrekenen-meer).'
        ],
        [
          'Het origineel verandert nooit',
          'Omrekenen verandert alleen wat je op het scherm ziet. Het opgeslagen recept blijft precies zoals het was, ook voor je team.'
        ],
        [
          'Omgerekend printen',
          'Print je een omgerekend recept, dan print je de omgerekende hoeveelheden. Zie [Een recept printen](#printen).'
        ],
        [
          'Ook zonder account',
          'Wie een [gedeeld recept](#delen-link) opent, kan het ook zonder account omrekenen.'
        ],
        [
          'Proeven blijft nodig',
          'Niet alles schaalt een-op-een. Waarop je let, lees je in [Opschalen zonder fouten](#tips-opschalen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-scale-recipes',
      menu: 'Scaling with the quick buttons',
      h1: 'Scaling',
      title: 'Scale and convert recipes in Savour | User guide',
      desc: 'How to scale a recipe in Savour: quick buttons from ¼× to 10×, back to the original, printing scaled, and why the saved recipe never changes.',
      lead: 'From 8 covers to 120 with one tap, without calculation errors.',
      sections: [
        [
          'Quick buttons',
          'Every recipe with ingredients shows “Convert” with the buttons ¼×, ½×, 1½×, 2×, 3×, 4×, 5× and 10×. One tap and all quantities are converted, in every [part](#recept-delen) of the recipe.'
        ],
        [
          'Back to the original',
          '“Original” shows the original quantities again.'
        ],
        [
          'Another factor or yield',
          'Need 2.5×, or exactly 3.5 litres? Or do you have 3 kg of one ingredient left? Choose ⋯ “More scaling options”. See [More scaling options](#omrekenen-meer).'
        ],
        [
          'The original never changes',
          'Scaling only changes what you see on screen. The saved recipe stays exactly as it was, for your team too.'
        ],
        [
          'Printing scaled',
          'Print a scaled recipe and you print the scaled quantities. See [Printing a recipe](#printen).'
        ],
        [
          'Without an account too',
          'Anyone who opens a [shared recipe](#delen-link) can scale it, even without an account.'
        ],
        [
          'Tasting is still needed',
          'Not everything scales one to one. What to watch out for is in [Scaling without mistakes](#tips-opschalen).'
        ]
      ]
    }
  },
  {
    id: 'omrekenen-meer',
    related: ['omrekenen', 'recept-opbrengst', 'eenheden'],
    nl: {
      slug: 'handleiding-meer-omrekenen',
      menu: 'Meer omrekenen: factor, opbrengst, ik heb',
      title: 'Omrekenen met een eigen factor, opbrengst of “ik heb” | Handleiding Savour',
      desc: 'Zo reken je in Savour om met een eigen factor zoals 2,5, naar een gewenste opbrengst zoals 3,5 liter, of vanuit wat je nog hebt van één ingrediënt.',
      lead: 'Drie manieren om precies uit te komen op wat je nodig hebt.',
      sections: [
        [
          'Waar',
          'Open het recept, kies ⋯ en “Meer omrekenen”. Je kiest één van drie manieren. Wat je in het ene veld invult, maakt de andere leeg.'
        ],
        [
          'Factor',
          'Vul een eigen getal in, bijvoorbeeld 2,5 of 0,75. Elk ingrediënt wordt met dat getal vermenigvuldigd.'
        ],
        [
          'Opbrengst',
          'Vul de hoeveelheid in die je nodig hebt. Dit werkt als het recept een [opbrengst](#recept-opbrengst) heeft. Is het recept voor 1 liter en heb je 3,5 liter nodig, vul dan 3,5 in.'
        ],
        [
          'Ik heb',
          'Heb je nog 3,2 kg van één ingrediënt, bijvoorbeeld een ingekocht stuk vlees of een restje fond? Kies het ingrediënt en vul in hoeveel je hebt. Savour rekent de rest van het recept eromheen.'
        ],
        [
          'Rekenvoorbeeld',
          'Een recept voor 8 couverts heb je nodig voor 120 couverts: de factor is 120 gedeeld door 8, dus 15. Met een opbrengst van “8 couverts” vul je gewoon 120 in.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-more-scaling-options',
      menu: 'More scaling: factor, yield, I have',
      title: 'Scale with your own factor, a target yield or “I have” | Savour user guide',
      desc: 'How to scale in Savour with your own factor such as 2.5, to a target yield such as 3.5 litres, or from what you have left of one ingredient.',
      lead: 'Three ways to land on exactly what you need.',
      sections: [
        [
          'Where',
          'Open the recipe, choose ⋯ and “More scaling options”. You pick one of three ways. Filling in one field clears the others.'
        ],
        [
          'Factor',
          'Enter your own number, for example 2.5 or 0.75. Every ingredient is multiplied by that number.'
        ],
        [
          'Yield',
          'Enter the amount you need. This works when the recipe has a [yield](#recept-opbrengst). If the recipe makes 1 litre and you need 3.5 litres, enter 3.5.'
        ],
        [
          'I have',
          'Have 3.2 kg left of one ingredient, such as a cut of meat you bought or leftover stock? Choose the ingredient and enter how much you have. Savour works out the rest of the recipe around it.'
        ],
        [
          'A worked example',
          'You need a recipe for 8 covers for 120 covers: the factor is 120 divided by 8, so 15. With a yield of “8 covers” you simply enter 120.'
        ]
      ]
    }
  },
  {
    id: 'eenheden',
    related: ['recept-ingredienten', 'omrekenen'],
    nl: {
      slug: 'handleiding-eenheden-en-afronding',
      menu: 'Eenheden en afronding',
      title: 'Eenheden en afronding bij omrekenen: gram, liter, lepels, cups | Handleiding',
      desc: 'Hoe Savour bij het omrekenen eenheden kiest en afrondt: van kilo naar gram, van theelepels naar eetlepels, nette breuken voor lepels en cups, en wat blijft staan.',
      lead: 'Omgerekende hoeveelheden die je in de keuken echt kunt afwegen.',
      sections: [
        [
          'Een handige maat',
          'Savour rekent binnen dezelfde soort eenheid naar een handige maat: 0,25 kg wordt 250 g en 20 tl wordt 6 ⅔ el.'
        ],
        [
          'Afronding',
          'Lepels en cups krijgen nette breuken, zoals ½, ⅓ en ¾. Grammen en milliliters worden hele getallen.'
        ],
        [
          'Welke eenheden',
          'Gewicht: mg, g, kg, oz en lb. Volume: ml, cl, dl, l, tl, el, tsp, tbsp en cup. Savour rekent niet van gewicht naar volume, want dat hangt af van het product.'
        ],
        [
          'Wat blijft staan',
          'Stuks, takjes en teentjes worden meegerekend, maar niet omgezet. “Naar smaak”, “snuf”, “mespunt” en “scheut” blijven zoals ze zijn.'
        ],
        [
          'Zo schrijf je het',
          'Hoe je hoeveelheden schrijft zodat Savour ze herkent, lees je bij [Ingrediënten en hoeveelheden](#recept-ingredienten).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-units-and-rounding',
      menu: 'Units and rounding',
      title: 'Units and rounding when scaling: grams, litres, spoons, cups | User guide',
      desc: 'How Savour picks units and rounds when scaling: from kilos to grams, from teaspoons to tablespoons, clean fractions for spoons and cups, and what stays as it is.',
      lead: 'Scaled quantities you can actually weigh out in the kitchen.',
      sections: [
        [
          'A practical size',
          'Savour converts within the same kind of unit to a practical size: 0.25 kg becomes 250 g and 24 tbsp becomes 1 ½ cup.'
        ],
        [
          'Rounding',
          'Spoons and cups get clean fractions, such as ½, ⅓ and ¾. Grams and millilitres become whole numbers.'
        ],
        [
          'Which units',
          'Weight: mg, g, kg, oz and lb. Volume: ml, cl, dl, l, tsp, tbsp and cup, plus the Dutch tl and el. Savour does not convert between weight and volume, because that depends on the product.'
        ],
        [
          'What stays',
          'Pieces, sprigs and cloves are scaled but not converted. “To taste”, “pinch” and “dash” stay as they are.'
        ],
        [
          'How to write it',
          'How to write quantities so Savour recognises them is in [Ingredients and quantities](#recept-ingredienten).'
        ]
      ]
    }
  },
  {
    id: 'kookmodus',
    related: ['offline', 'app-installeren', 'recept-bekijken'],
    nl: {
      slug: 'handleiding-kookmodus-en-offline',
      menu: 'Kookmodus',
      title: 'Kookmodus: grote letters, scherm aan en afvinken | Handleiding Savour',
      desc: 'Zo werkt de kookmodus in Savour: alleen het recept in grote letters, het scherm blijft aan en je vinkt ingrediënten en stappen af. Ideaal op telefoon en tablet.',
      lead: 'Alleen het recept, groot en leesbaar, ook met natte handen.',
      sections: [
        [
          'De kookmodus starten',
          'Kies “Kookmodus” bovenaan een recept. Je ziet alleen het recept, in grote letters, zonder menu.'
        ],
        [
          'Scherm aan',
          'In de kookmodus probeert Savour je scherm aan te houden, zodat je het niet steeds hoeft aan te raken. Of dat lukt, hangt af van je telefoon en browser.'
        ],
        [
          'Afvinken',
          'Vink ingrediënten af die je hebt afgewogen en stappen die klaar zijn. Na een onderbreking zie je precies waar je was. Ook buiten de kookmodus kun je ingrediënten afvinken.'
        ],
        [
          'Omgerekend koken',
          'Reken het recept eerst om met de [snelknoppen](#omrekenen) en start dan de kookmodus: je kookt met de omgerekende hoeveelheden.'
        ],
        [
          'Op de tablet bij de pass',
          'Zet Savour [als app](#app-installeren) op een tablet en gebruik de kookmodus tijdens de mise-en-place. Recepten die je hebt geopend, werken ook [zonder internet](#offline).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-cook-mode-and-offline',
      menu: 'Cook mode',
      title: 'Cook mode: large text, screen on and ticking off | Savour user guide',
      desc: 'How cook mode works in Savour: only the recipe in large text, the screen stays on and you tick off ingredients and steps. Ideal on phone and tablet.',
      lead: 'Only the recipe, large and readable, even with wet hands.',
      sections: [
        [
          'Starting cook mode',
          'Choose “Cooking mode” at the top of a recipe. You see only the recipe, in large text, without the menu.'
        ],
        [
          'Screen on',
          'In cook mode Savour tries to keep your screen on so you don’t have to keep touching it. Whether that works depends on your phone and browser.'
        ],
        [
          'Ticking off',
          'Tick off ingredients you have weighed and steps that are done. After an interruption you see exactly where you were. You can tick off ingredients outside cook mode too.'
        ],
        [
          'Cooking scaled',
          'Scale the recipe first with the [quick buttons](#omrekenen) and then start cook mode: you cook with the scaled quantities.'
        ],
        [
          'On the tablet at the pass',
          'Put Savour [on a tablet as an app](#app-installeren) and use cook mode during mise en place. Recipes you have opened also work [without internet](#offline).'
        ]
      ]
    }
  },
  {
    id: 'offline',
    related: ['app-installeren', 'kookmodus', 'inloggen'],
    nl: {
      slug: 'handleiding-zonder-internet',
      menu: 'Zonder internet werken',
      title: 'Recepten zonder internet: offline werken in de keuken | Handleiding Savour',
      desc: 'Zo werk je met Savour zonder wifi: recepten die je hebt geopend blijven beschikbaar in een kelderkeuken of koelcel. Wat wel en niet werkt zonder verbinding.',
      lead: 'Geen wifi in de kelderkeuken? Je recepten openen toch.',
      sections: [
        [
          'Hoe het werkt',
          'Recepten die je hebt geopend, bewaart Savour op je apparaat. Valt de verbinding weg, dan opent Savour je bibliotheek van dat apparaat.'
        ],
        [
          'Zo zorg je dat het werkt',
          'Log één keer in met “[Ingelogd blijven](#inloggen)” aangevinkt en open de recepten die je in de keuken nodig hebt. Zet Savour het liefst [als app](#app-installeren) op je beginscherm.'
        ],
        [
          'Wat werkt zonder internet',
          'Lezen, zoeken in je bibliotheek, [omrekenen](#omrekenen) en de [kookmodus](#kookmodus) werken gewoon.'
        ],
        [
          'Wat internet nodig heeft',
          'Opslaan, bewerken, importeren en delen doe je weer zodra je verbinding hebt.'
        ],
        [
          'Meer lezen',
          'Waarom dit in een keuken zo belangrijk is: [Recepten zonder wifi](/blog/recepten-zonder-wifi).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-working-offline',
      menu: 'Working without internet',
      title: 'Recipes without internet: working offline in the kitchen | Savour user guide',
      desc: 'How to use Savour without wifi: recipes you have opened stay available in a basement kitchen or walk-in. What works and what doesn’t without a connection.',
      lead: 'No wifi in the basement kitchen? Your recipes still open.',
      sections: [
        [
          'How it works',
          'Savour keeps recipes you have opened on your device. When the connection drops, Savour opens your library from that device.'
        ],
        [
          'Making sure it works',
          'Log in once with “[Stay signed in](#inloggen)” ticked and open the recipes you need in the kitchen. Preferably put Savour on your home screen [as an app](#app-installeren).'
        ],
        [
          'What works without internet',
          'Reading, searching your library, [scaling](#omrekenen) and [cook mode](#kookmodus) work as normal.'
        ],
        [
          'What needs internet',
          'Saving, editing, importing and sharing work again as soon as you have a connection.'
        ],
        [
          'Read more',
          'Why this matters in a kitchen: [Recipes without wifi](/en/blog/recipes-without-wifi).'
        ]
      ]
    }
  },
  {
    id: 'mep-lijsten',
    related: ['kookmodus', 'offline', 'printen'],
    nl: {
      slug: "handleiding-mep-lijsten",
      menu: "MEP-lijsten",
      h1: "MEP-lijsten",
      title: "MEP-lijsten: couverts, afvinken en printen | Handleiding Savour",
      desc: "Zo werkt de MEP-lijst in Savour: per post een lijst met kaarten en gerechten, couverts per dag, afvinken met je team, kookmodus, importeren uit Excel en printen op één A4.",
      lead: "Wat er per post klaar moet staan, per dag afgevinkt, met je hele team.",
      sections: [
        ["Per post een lijst", "Een MEP-lijst is de lijst van je post: kaarten (à la carte, banqueting), kopjes per gang of gerecht en daaronder wat er klaar moet staan. Je leest hem van boven naar beneden, in de volgorde van het menu."],
        ["Lijst en kookmodus", "Lijst toont alles in de stijl van Savour, met een hokje bij elk onderdeel. Afvinken zet het voor vandaag op klaar, voor je hele team. De kookmodus laat alleen de lijst zien, groot, en houdt je scherm aan."],
        ["Couverts en hoeveelheden", "Vul naast de naam van elke kaart het aantal couverts in; Savour rekent per onderdeel uit hoeveel je nodig hebt (40 couverts × 60 g = 2,4 kg). Elke dag begint de lijst leeg. Met ⋯ Lijst leegmaken haal je de vinkjes ook tussendoor weg."],
        ["Samen in een keukenteam", "Een MEP-lijst in een keukenteam ziet iedereen van het team. Wat een collega afvinkt, zie je meteen, met naam en tijd. Afvinken mag iedereen, ook zonder Savour Pro. Zonder internet blijft wat je aantikt staan en gaat het mee zodra je weer verbinding hebt."],
        ["Importeren", "Heb je je lijst al in Excel, Word of op papier? Kies Importeren. Savour deelt hem in en jij kijkt alles na voordat het wordt opgeslagen. Een foto leest de AI, met Savour Pro."],
        ["Printen", "Print de lijst op één A4, staand of liggend, met hokjes om af te vinken, net als je Excel-lijst. Datum en couverts staan er niet op, zodat je hem elke dag kunt gebruiken. Met Savour Pro staat het logo van je restaurant erop."],
        ["Savour Pro", "MEP-lijsten maken en beheren kan met Savour Pro. Afvinken kan iedereen in het keukenteam, ook met een gratis account. Stop je met Pro, dan blijven je lijsten bewaard."]
      ]
    },
    en: {
      slug: "en/guide-prep-lists",
      menu: "Prep lists",
      h1: "Prep lists",
      title: "Prep lists: covers, ticking off and printing | Savour user guide",
      desc: "How the prep list works in Savour: one list per station with menus and dishes, covers per day, ticking off with your team, cooking mode, importing from Excel and printing on one A4.",
      lead: "What each station needs ready, ticked off per day, with your whole team.",
      sections: [
        ["One list per station", "A prep list is the list for your station: menus (à la carte, banqueting), a heading per course or dish and below it what needs to be ready. You read it from top to bottom, in the order of the menu."],
        ["List and cooking mode", "List shows everything in Savour’s style, with a box next to each item. Ticking it marks it done for today, for your whole team. Cooking mode shows only the list, large, and keeps your screen on."],
        ["Covers and quantities", "Fill in the number of covers next to the name of each menu; Savour works out how much you need of each item (40 covers × 60 g = 2.4 kg). Every day the list starts empty. With ⋯ Clear list you remove the ticks in between too."],
        ["Together in a kitchen team", "Everyone in the team sees a prep list in a kitchen team. What a colleague ticks off appears straight away, with name and time. Anyone can tick off, even without Savour Pro. Without internet what you tap stays and is sent as soon as you’re connected again."],
        ["Importing", "Already have your list in Excel, Word or on paper? Choose Import. Savour sorts it and you check everything before it is saved. A photo is read by the AI, with Savour Pro."],
        ["Print", "Print the list on one A4, portrait or landscape, with boxes to tick, just like your Excel list. The date and covers are left off, so you can use it every day. With Savour Pro your restaurant’s logo is on it."],
        ["Savour Pro", "Creating and managing prep lists works with Savour Pro. Anyone in the kitchen team can tick off, even with a free account. If you stop Pro, your lists are kept."]
      ]
    }
  }
];
