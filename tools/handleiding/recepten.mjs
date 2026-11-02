// Handleiding, onderdeel "Recepten maken en bewerken".

export const group = {
  id: 'recepten',
  nl: {
    name: 'Recepten maken en bewerken',
    intro: 'Een recept invoeren zodat omrekenen, printen en delen goed gaan: ingrediënten, bereiding, delen, opbrengst, foto’s, notities en basisrecepten.'
  },
  en: {
    name: 'Creating and editing recipes',
    intro: 'Enter a recipe so that scaling, printing and sharing work well: ingredients, method, parts, yield, photos, notes and base recipes.'
  }
};

export const pages = [
  {
    id: 'recept-maken',
    related: ['recept-ingredienten', 'recept-delen', 'recept-bekijken'],
    nl: {
      slug: 'handleiding-recept-bewerken',
      menu: 'Een recept maken en bewerken',
      title: 'Een recept maken en bewerken in Savour | Handleiding',
      desc: 'Zo maak en bewerk je een recept in Savour: naam, opbrengst, categorie, foto, ingrediënten en bereiding, een recept in delen, opslaan en wie mag bewerken.',
      lead: 'Een nieuw recept invoeren of een bestaand recept aanpassen, stap voor stap.',
      sections: [
        [
          'Een nieuw recept',
          'Kies in het menu “Recept toevoegen” en dan “Zelf invoeren”. Het scherm “Nieuw recept” opent met de velden Naam, Opbrengst, Categorie, Foto van recept, Ingrediënten en Bereiding.'
        ],
        [
          'De velden',
          'Zo vul je ze in:',
          [
            'Naam: kort en herkenbaar, zodat iedereen het recept met één zoekwoord vindt.',
            '[Opbrengst](#recept-opbrengst): wat het recept oplevert, zoals “1 liter” of “40 stuks”.',
            '[Categorie](#categorieen): wat voor recept het is, zoals sauzen of patisserie.',
            '[Foto](#recept-foto): optioneel, een foto van het gerecht.',
            '[Ingrediënten](#recept-ingredienten): elk ingrediënt op een eigen regel.',
            '[Bereiding](#recept-bereiding): korte stappen, één handeling per stap.'
          ]
        ],
        [
          'Een recept in delen',
          'Bestaat je recept uit deeg, vulling en saus? Kies “＋ Deel toevoegen” en geef elk deel eigen ingrediënten en een eigen bereiding. Zie [Een recept in delen](#recept-delen).'
        ],
        [
          'Opslaan',
          'Kies “Opslaan”. Met “Annuleren” of “← Terug” ga je terug zonder op te slaan. Bestaat er al een recept dat precies hetzelfde is, dan wordt het niet dubbel opgeslagen.'
        ],
        [
          'Een recept bewerken',
          'Open het recept en kies “Bewerken”. Je ziet dezelfde velden. Pas aan wat je wilt en kies “Opslaan”. Wie in je [keukenteam](#keukenteams) zit, ziet de nieuwe versie meteen.'
        ],
        [
          'Wie mag bewerken',
          'Een recept kan alleen worden bewerkt door de maker. In een keukenteam zien anderen het recept wel; met “Toevoegen aan mijn recepten” nemen ze een eigen kopie over die ze zelf kunnen aanpassen. Zie [Een recept overnemen](#recept-overnemen).'
        ],
        [
          'Snel veel recepten',
          'Heb je je recepten al in Word, PDF of een andere app, dan is [importeren](#importeren) veel sneller dan overtypen.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-edit-recipes',
      menu: 'Creating and editing a recipe',
      title: 'Create and edit a recipe in Savour | User guide',
      desc: 'How to create and edit a recipe in Savour: name, yield, category, photo, ingredients and method, a recipe in parts, saving and who can edit.',
      lead: 'Entering a new recipe or changing an existing one, step by step.',
      sections: [
        [
          'A new recipe',
          'Choose “Add recipe” in the menu and then “Enter manually”. The “New recipe” screen opens with the fields Name, Yield, Category, Recipe photo, Ingredients and Method.'
        ],
        [
          'The fields',
          'How to fill them in:',
          [
            'Name: short and recognisable, so everyone finds the recipe with one search word.',
            '[Yield](#recept-opbrengst): what the recipe makes, such as “1 litre” or “40 pieces”.',
            '[Category](#categorieen): what kind of recipe it is, such as sauces or pastry.',
            '[Photo](#recept-foto): optional, a photo of the dish.',
            '[Ingredients](#recept-ingredienten): each ingredient on its own line.',
            '[Method](#recept-bereiding): short steps, one action per step.'
          ]
        ],
        [
          'A recipe in parts',
          'Does your recipe have dough, filling and sauce? Choose “＋ Add part” and give each part its own ingredients and method. See [A recipe in parts](#recept-delen).'
        ],
        [
          'Saving',
          'Choose “Save”. “Cancel” or “← Back” returns without saving. If an identical recipe already exists, it is not saved twice.'
        ],
        [
          'Editing a recipe',
          'Open the recipe and choose “Edit”. You see the same fields. Change what you want and choose “Save”. Members of your [kitchen team](#keukenteams) see the new version straight away.'
        ],
        [
          'Who can edit',
          'Only the maker of a recipe can edit it. In a kitchen team others can see the recipe; with “Add to my recipes” they take their own copy to change as they like. See [Copying a recipe](#recept-overnemen).'
        ],
        [
          'Many recipes quickly',
          'If your recipes are already in Word, PDF or another app, [importing](#importeren) is much faster than retyping.'
        ]
      ]
    }
  },
  {
    id: 'recept-ingredienten',
    related: ['omrekenen', 'eenheden', 'recept-koppelen'],
    nl: {
      slug: 'handleiding-ingredienten-en-hoeveelheden',
      menu: 'Ingrediënten en hoeveelheden',
      title: 'Ingrediënten en hoeveelheden invoeren zodat omrekenen klopt | Handleiding',
      desc: 'Zo voer je ingrediënten in Savour in: hoeveelheid vooraan, welke getallen, breuken en eenheden Savour herkent en omrekent, en wat bewust niet wordt omgerekend.',
      lead: 'Hoe je ingrediënten schrijft zodat Savour ze herkent, vet zet en goed omrekent.',
      sections: [
        [
          'Eén ingrediënt per regel',
          'Zet elk ingrediënt op een eigen regel, met de hoeveelheid vooraan: “250 g boter”, “1,5 l room”, “2 el mosterd”. Met “＋ Ingrediënt toevoegen” maak je een nieuwe regel en met het kruisje haal je er een weg.'
        ],
        [
          'Getallen',
          'Savour herkent 1, 1,5, 1.000, ½, 1½, 1 1/2 en een bereik als 2-3. De hoeveelheid staat in het recept vetgedrukt, zodat je hem in de keuken snel ziet.'
        ],
        [
          'Eenheden die omrekenen',
          'g, kg, mg, ml, cl, dl, l, tl en el worden omgerekend, en ook tsp, tbsp, cup, oz en lb. Hoe Savour bij het omrekenen een handige eenheid kiest, lees je bij [Eenheden en afronding](#eenheden).'
        ],
        [
          'Stuks en andere eenheden',
          'Stuks, takjes, teentjes, blaadjes, bosjes en plakken worden herkend en meegerekend, maar niet omgezet naar een andere eenheid.'
        ],
        [
          'Niet omrekenen',
          '“Naar smaak”, “snuf”, “mespunt” en “scheut” worden bewust niet omgerekend. Bij grote hoeveelheden proef je die opnieuw af.'
        ],
        [
          'Volgorde',
          'Zet ingrediënten in de volgorde waarin je ze gebruikt, en schrijf gewicht in gram of milliliter in plaats van lepels of kopjes. Dan rekent alles exact om. Meer: [Een recept dat iedereen hetzelfde maakt](#tips-recept-schrijven).'
        ],
        [
          'Een basisrecept als ingrediënt',
          'Gebruik je een eigen recept, zoals een fond, als ingrediënt? Koppel ze, dan open je het basisrecept met één tik. Zie [Koppelen aan een basisrecept](#recept-koppelen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-ingredients-and-quantities',
      menu: 'Ingredients and quantities',
      title: 'Enter ingredients and quantities so scaling is right | User guide',
      desc: 'How to enter ingredients in Savour: quantity first, which numbers, fractions and units Savour recognises and scales, and what is deliberately not scaled.',
      lead: 'How to write ingredients so Savour recognises them, puts them in bold and scales them correctly.',
      sections: [
        [
          'One ingredient per line',
          'Put each ingredient on its own line, with the quantity first: “250 g butter”, “1.5 l cream”, “2 tbsp mustard”. “＋ Add ingredient” creates a new line and the cross removes one.'
        ],
        [
          'Numbers',
          'Savour recognises 1, 1.5, 1,000, ½, 1½, 1 1/2 and a range such as 2-3. The quantity is shown in bold in the recipe, so you spot it quickly in the kitchen.'
        ],
        [
          'Units that convert',
          'g, kg, mg, ml, cl, dl, l, tsp, tbsp, cup, oz and lb are converted, plus the Dutch tl and el. How Savour picks a practical unit when scaling is in [Units and rounding](#eenheden).'
        ],
        [
          'Pieces and other units',
          'Pieces, sprigs, cloves, leaves, bunches and slices are recognised and scaled, but not converted to another unit.'
        ],
        [
          'Not scaled',
          '“To taste”, “pinch” and “dash” are deliberately not scaled. With large batches you taste them again.'
        ],
        [
          'Order',
          'List ingredients in the order you use them, and write weights in grams or millilitres rather than spoons or cups. Then everything scales exactly. More: [A recipe everyone makes the same way](#tips-recept-schrijven).'
        ],
        [
          'A base recipe as an ingredient',
          'Using one of your own recipes, such as a stock, as an ingredient? Link them and you open the base recipe with one tap. See [Linking to a base recipe](#recept-koppelen).'
        ]
      ]
    }
  },
  {
    id: 'recept-bereiding',
    related: ['recept-delen', 'kookmodus', 'tips-recept-schrijven'],
    nl: {
      slug: 'handleiding-bereiding-schrijven',
      menu: 'De bereiding schrijven',
      title: 'De bereiding van een recept schrijven in stappen | Handleiding Savour',
      desc: 'Zo schrijf je de bereiding in Savour: korte stappen, één handeling per stap, met temperaturen, tijden en kritische punten. Stappen toevoegen, weghalen en afvinken.',
      lead: 'Een bereiding die iedereen in je keuken op dezelfde manier uitvoert.',
      sections: [
        [
          'Stappen toevoegen',
          'Met “＋ Bereidingsstap toevoegen” maak je een nieuwe stap; met het kruisje haal je er een weg. De stappen worden in het recept genummerd.'
        ],
        [
          'Eén handeling per stap',
          'Schrijf korte stappen, één handeling per stap. “Sjalot fijn snijden” en “Zweten in boter zonder kleur” zijn twee stappen. Zo kun je ze in de [kookmodus](#kookmodus) afvinken.'
        ],
        [
          'Kritische punten',
          'Zet erbij waar het om gaat: temperaturen, tijden, de gewenste dikte of kleur. “Inkoken tot een derde” of “kerntemperatuur 58 °C” voorkomt meer fouten dan een mooie beschrijving.'
        ],
        [
          'Delen met een eigen bereiding',
          'Heeft je recept meerdere delen, dan heeft elk deel een eigen bereiding. Zie [Een recept in delen](#recept-delen).'
        ],
        [
          'Opmerkingen',
          'Wat geen stap is, zoals “bij meer dan 5 kg langer laten rusten”, zet je in een [notitie](#recept-notities).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-writing-the-method',
      menu: 'Writing the method',
      title: 'Write a recipe’s method in steps | Savour user guide',
      desc: 'How to write the method in Savour: short steps, one action per step, with temperatures, times and critical points. Adding, removing and ticking off steps.',
      lead: 'A method everyone in your kitchen carries out the same way.',
      sections: [
        [
          'Adding steps',
          '“＋ Add step” creates a new step; the cross removes one. Steps are numbered in the recipe.'
        ],
        [
          'One action per step',
          'Write short steps, one action per step. “Finely chop the shallot” and “Sweat in butter without colour” are two steps. That way you can tick them off in [cook mode](#kookmodus).'
        ],
        [
          'Critical points',
          'Add what matters: temperatures, times, the desired thickness or colour. “Reduce by two thirds” or “core temperature 58 °C” prevents more mistakes than a nice description.'
        ],
        [
          'Parts with their own method',
          'If your recipe has several parts, each part has its own method. See [A recipe in parts](#recept-delen).'
        ],
        [
          'Remarks',
          'Anything that is not a step, such as “rest longer above 5 kg”, goes in a [note](#recept-notities).'
        ]
      ]
    }
  },
  {
    id: 'recept-delen',
    related: ['recept-maken', 'recept-koppelen', 'printen'],
    nl: {
      slug: 'handleiding-recept-in-delen',
      menu: 'Een recept in delen',
      title: 'Een recept in delen: deeg, vulling, saus en garnituur | Handleiding Savour',
      desc: 'Zo maak je in Savour een samengesteld recept met delen, zoals deeg, vulling en saus, elk met eigen ingrediënten en bereiding. Ook bij importeren en omrekenen.',
      lead: 'Een samengesteld gerecht in één recept, met per onderdeel de eigen ingrediënten en bereiding.',
      sections: [
        [
          'Wanneer gebruik je delen',
          'Voor een gerecht dat uit onderdelen bestaat: een taart met deeg, vulling en glaçage, of een bord met vlees, saus en garnituur. Alles staat dan in één recept, en toch weet iedereen wat bij welk onderdeel hoort.'
        ],
        [
          'Een deel toevoegen',
          'Kies in het recept “＋ Deel toevoegen”. Geef het deel een naam, zoals “Deeg”, en vul de eigen ingrediënten en bereiding in. Voeg zoveel delen toe als je wilt.'
        ],
        [
          'Bij importeren',
          'Een regel die eindigt op een dubbele punt, zoals “Deeg:”, wordt bij het importeren herkend als kop van een deel. Ook kopjes uit [Mela](#import-mela), [Flavorish](#import-flavorish) en [CookBookManager](#import-cookbookmanager) worden delen.'
        ],
        [
          'Omrekenen en printen',
          'Bij [omrekenen](#omrekenen) gaan alle delen mee. Op de [print](#printen) staat elk deel met zijn naam boven de eigen ingrediënten en bereiding.'
        ],
        [
          'Of liever een basisrecept',
          'Gebruik je een onderdeel in veel recepten, zoals een fond of een basisdeeg? Maak er dan een eigen recept van en [koppel het](#recept-koppelen). Dan pas je het op één plek aan.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-recipe-in-parts',
      menu: 'A recipe in parts',
      title: 'A recipe in parts: dough, filling, sauce and garnish | Savour user guide',
      desc: 'How to make a composed recipe in Savour with parts, such as dough, filling and sauce, each with its own ingredients and method. Also when importing and scaling.',
      lead: 'A composed dish in one recipe, with each component’s own ingredients and method.',
      sections: [
        [
          'When to use parts',
          'For a dish made of components: a tart with dough, filling and glaze, or a plate with meat, sauce and garnish. Everything is in one recipe, and still everyone knows what belongs to which component.'
        ],
        [
          'Adding a part',
          'Choose “＋ Add part” in the recipe. Give the part a name, such as “Dough”, and fill in its own ingredients and method. Add as many parts as you like.'
        ],
        [
          'When importing',
          'A line ending in a colon, such as “Dough:”, is recognised as the heading of a part when importing. Headings from [Mela](#import-mela), [Flavorish](#import-flavorish) and [CookBookManager](#import-cookbookmanager) become parts too.'
        ],
        [
          'Scaling and printing',
          'All parts come along when [scaling](#omrekenen). On the [print](#printen), each part appears with its name above its own ingredients and method.'
        ],
        [
          'Or rather a base recipe',
          'Using a component in many recipes, like a stock or a base dough? Make it a recipe of its own and [link it](#recept-koppelen). Then you change it in one place.'
        ]
      ]
    }
  },
  {
    id: 'recept-opbrengst',
    related: ['omrekenen', 'omrekenen-meer', 'recept-ingredienten'],
    nl: {
      slug: 'handleiding-opbrengst',
      menu: 'Opbrengst en porties',
      title: 'De opbrengst van een recept: liters, stuks of couverts | Handleiding Savour',
      desc: 'Zo vul je de opbrengst van een recept in Savour in, zoals 1 liter, 40 stuks of 8 couverts, en waarom dat nodig is om om te rekenen naar de hoeveelheid die je nodig hebt.',
      lead: 'Met een opbrengst reken je straks om naar precies wat je nodig hebt.',
      sections: [
        [
          'Wat je invult',
          'Vul bij Opbrengst in wat het recept oplevert, met een getal: “1 liter”, “2,5 kg”, “40 stuks” of “8 couverts”. In het recept staat het bovenaan, naast het aantal ingrediënten en stappen.'
        ],
        [
          'Waarom het helpt',
          'Met een opbrengst kun je bij [Meer omrekenen](#omrekenen-meer) de gewenste opbrengst invullen: heb je 3,5 liter nodig van een recept voor 1 liter, vul dan 3,5 in en Savour rekent alles om.'
        ],
        [
          'Bij importeren',
          'De Savour-lezer haalt de opbrengst ook uit een kopje als “Ingrediënten (4 personen)” of “Ingrediënten voor 4 personen”. Uit andere apps komen porties of “servings” mee.'
        ],
        [
          'Zonder opbrengst',
          'Ook zonder opbrengst kun je omrekenen met de snelknoppen of een eigen factor. Zie [Omrekenen](#omrekenen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-yield',
      menu: 'Yield and portions',
      title: 'A recipe’s yield: litres, pieces or covers | Savour user guide',
      desc: 'How to enter a recipe’s yield in Savour, such as 1 litre, 40 pieces or 8 covers, and why it is needed to scale to the amount you need.',
      lead: 'With a yield you can later scale to exactly what you need.',
      sections: [
        [
          'What to enter',
          'Under Yield enter what the recipe makes, with a number: “1 litre”, “2.5 kg”, “40 pieces” or “8 covers”. It appears at the top of the recipe, next to the number of ingredients and steps.'
        ],
        [
          'Why it helps',
          'With a yield you can enter the target yield under [More scaling options](#omrekenen-meer): need 3.5 litres of a recipe for 1 litre, enter 3.5 and Savour scales everything.'
        ],
        [
          'When importing',
          'The Savour reader also takes the yield from a heading such as “Ingredients (4 people)”. From other apps, portions or servings come across.'
        ],
        [
          'Without a yield',
          'Without a yield you can still scale with the quick buttons or your own factor. See [Scaling](#omrekenen).'
        ]
      ]
    }
  },
  {
    id: 'recept-foto',
    related: ['import-fotos', 'printen-map', 'recept-maken'],
    nl: {
      slug: 'handleiding-foto-bij-recept',
      menu: 'Foto’s en het originele kladje',
      title: 'Een foto bij een recept en het originele kladje | Handleiding Savour',
      desc: 'Zo zet je een foto bij een recept in Savour, hoe het originele kladje van een geïmporteerde foto bewaard blijft, en hoe foto’s meegaan bij printen.',
      lead: 'Een foto van het gerecht, en bij een geïmporteerd kladje het origineel ernaast.',
      sections: [
        [
          'Foto van het gerecht',
          'Kies in het recept bij “Foto van recept — optioneel” een foto. Savour verkleint hem automatisch, zodat hij snel laadt. Een foto helpt het team om te zien hoe het bord eruit moet zien.'
        ],
        [
          'Het originele kladje',
          'Is het recept gelezen van een [foto of scan](#import-fotos), dan blijft het originele kladje bewaard. Kies in het recept “Origineel kladje bekijken” om het ernaast te leggen, bijvoorbeeld als je een getal wilt controleren.'
        ],
        [
          'Foto’s uit andere apps',
          'Bij overstappen uit [Paprika](#import-paprika), [Mela](#import-mela), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook) en [Flavorish](#import-flavorish) gaat de foto van het recept mee.'
        ],
        [
          'Bij printen',
          'Bij het [printen van meerdere recepten](#printen-map) kies je met “Met foto’s” of foto’s meegaan.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-recipe-photo',
      menu: 'Photos and the original note',
      title: 'A photo on a recipe and the original note | Savour user guide',
      desc: 'How to add a photo to a recipe in Savour, how the original note of an imported photo is kept, and how photos are included when printing.',
      lead: 'A photo of the dish, and for an imported note the original next to it.',
      sections: [
        [
          'Photo of the dish',
          'Choose a photo under “Recipe photo — optional” in the recipe. Savour shrinks it automatically so it loads quickly. A photo helps the team see what the plate should look like.'
        ],
        [
          'The original note',
          'If the recipe was read from a [photo or scan](#import-fotos), the original note is kept. Choose “View original note” in the recipe to compare, for example when you want to check a number.'
        ],
        [
          'Photos from other apps',
          'When moving from [Paprika](#import-paprika), [Mela](#import-mela), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook) and [Flavorish](#import-flavorish), the recipe photo comes along.'
        ],
        [
          'When printing',
          'When [printing several recipes](#printen-map), “With photos” decides whether photos are included.'
        ]
      ]
    }
  },
  {
    id: 'recept-notities',
    related: ['recept-bereiding', 'printen-map'],
    nl: {
      slug: 'handleiding-notities-bij-recept',
      menu: 'Notities bij een recept',
      title: 'Notities bij een recept: vaste opmerkingen en tips | Handleiding Savour',
      desc: 'Zo zet je een notitie bij een recept in Savour: een vaste opmerking naast het recept, aanpassen en kiezen of notities meegaan bij het printen.',
      lead: 'Een vaste opmerking naast het recept, voor alles wat geen ingrediënt of stap is.',
      sections: [
        [
          'Een notitie toevoegen',
          'Open een eigen recept en kies “＋ Notitie”. Schrijf je opmerking, bijvoorbeeld “bij meer dan 5 kg langer laten rusten” of “leverancier: slagerij De Wit”. Met “Wijzigen” pas je hem later aan.'
        ],
        [
          'Waarvoor',
          'Gebruik notities voor wat niet in de ingrediënten of de bereiding hoort: variaties, bewaartijd, de bron van het recept, allergenen of een opmerking voor het team.'
        ],
        [
          'Bij printen',
          'Bij het [printen van meerdere recepten](#printen-map) kies je met “Met notities” of notities meegaan.'
        ],
        [
          'Notities uit andere apps',
          'Bij [importeren uit een andere app](#overstappen) komen notities onderaan de bereiding, na “Notities:”, zodat er niets verloren gaat.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-recipe-notes',
      menu: 'Notes on a recipe',
      title: 'Notes on a recipe: lasting remarks and tips | Savour user guide',
      desc: 'How to add a note to a recipe in Savour: a lasting remark next to the recipe, editing it and choosing whether notes are included when printing.',
      lead: 'A lasting remark next to the recipe, for everything that is not an ingredient or step.',
      sections: [
        [
          'Adding a note',
          'Open one of your recipes and choose “＋ Note”. Write your remark, for example “rest longer above 5 kg” or “supplier: De Wit butchers”. Use “Change” to edit it later.'
        ],
        [
          'What for',
          'Use notes for what does not belong in the ingredients or method: variations, shelf life, the source of the recipe, allergens or a remark for the team.'
        ],
        [
          'When printing',
          'When [printing several recipes](#printen-map), “With notes” decides whether notes are included.'
        ],
        [
          'Notes from other apps',
          'When [importing from another app](#overstappen), notes go at the end of the method, after “Notes:”, so nothing is lost.'
        ]
      ]
    }
  },
  {
    id: 'recept-koppelen',
    related: ['recept-ingredienten', 'recept-delen'],
    nl: {
      slug: 'handleiding-koppelen-aan-basisrecept',
      menu: 'Koppelen aan een basisrecept',
      title: 'Een ingrediënt koppelen aan een basisrecept, zoals een fond | Handleiding',
      desc: 'Zo koppel je in Savour een ingrediënt aan een eigen basisrecept, zoals een fond in je jus: automatisch op naam of zelf kiezen, en met één tik naar het basisrecept.',
      lead: 'Van de jus naar de fond met één tik, en weer terug.',
      sections: [
        [
          'Automatisch op naam',
          'Gebruik je een eigen recept als ingrediënt en heet het ingrediënt precies zoals dat recept, dan koppelt Savour ze vanzelf.'
        ],
        [
          'Zelf koppelen',
          'Heet het anders, open dan het recept, kies ⋯ en “Koppelen aan recept”. Kies welk ingrediënt bij welk eigen recept hoort.'
        ],
        [
          'In het recept',
          'Naast het gekoppelde ingrediënt staat “Recept”. Eén tik en je zit in het basisrecept, met een knop terug naar het recept waar je vandaan kwam.'
        ],
        [
          'Waarom basisrecepten',
          'Een fond, een basisdeeg of een saus die je in veel recepten gebruikt, pas je zo op één plek aan. Iedereen in het [keukenteam](#keukenteams) werkt dan met dezelfde versie.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-link-base-recipe',
      menu: 'Linking to a base recipe',
      title: 'Link an ingredient to a base recipe, such as a stock | User guide',
      desc: 'How to link an ingredient to one of your own base recipes in Savour, like a stock in your jus: automatically by name or chosen yourself, and one tap to the base recipe.',
      lead: 'From the jus to the stock with one tap, and back again.',
      sections: [
        [
          'Automatically by name',
          'If you use one of your own recipes as an ingredient and the ingredient has exactly the same name as that recipe, Savour links them automatically.'
        ],
        [
          'Linking yourself',
          'If the name differs, open the recipe, choose ⋯ and “Link to recipe”. Pick which ingredient belongs to which of your recipes.'
        ],
        [
          'In the recipe',
          '“Recipe” appears next to the linked ingredient. One tap takes you to the base recipe, with a button back to where you came from.'
        ],
        [
          'Why base recipes',
          'A stock, base dough or sauce you use in many recipes is changed in one place this way. Everyone in the [kitchen team](#keukenteams) then works from the same version.'
        ]
      ]
    }
  },
  {
    id: 'recept-bekijken',
    related: ['kookmodus', 'omrekenen', 'delen-link'],
    nl: {
      slug: 'handleiding-recept-bekijken',
      menu: 'Een recept openen en gebruiken',
      title: 'Een recept openen: kookmodus, omrekenen, printen, delen | Handleiding Savour',
      desc: 'Wat je allemaal kunt in een recept in Savour: kookmodus, bewerken, printen, delen, favoriet, omrekenen, notities en het menu ⋯ met mappen en koppelingen.',
      lead: 'Alles wat je vanuit een recept kunt doen, op één rij.',
      sections: [
        [
          'Bovenaan',
          'Bovenaan het recept staan de knoppen:',
          [
            '[Kookmodus](#kookmodus): alleen het recept, in grote letters.',
            '[Bewerken](#recept-maken): het recept aanpassen (alleen de maker).',
            '[Printen](#printen): het recept printen, ook omgerekend.',
            '[Delen](#delen-link): een link sturen via WhatsApp, Telegram, sms of e-mail.',
            '[Favoriet](#favorieten): het recept een sterretje geven.'
          ]
        ],
        [
          'Omrekenen',
          'Onder de titel staat “Omrekenen” met snelknoppen van ¼× tot 10×, en “Origineel” om terug te gaan. Zie [Omrekenen](#omrekenen).'
        ],
        [
          'Het menu ⋯',
          'Bij een eigen recept vind je achter ⋯ “Meer omrekenen”, “Koppelen aan recept”, “Toevoegen aan map” en “Verwijderen uit bibliotheek”. Open je het recept vanuit een map of keukenteam, dan staat er “Uit map halen” of “Uit keukenteam halen”.'
        ],
        [
          'Afvinken',
          'Tik op een ingrediënt of stap om hem af te vinken. Zo zie je na een onderbreking waar je was.'
        ],
        [
          'Notities en het origineel',
          'Onder het recept staan je [notities](#recept-notities), en bij een recept van een foto “Origineel kladje bekijken”.'
        ],
        [
          'Terug',
          'Met “← Terug” kom je weer op dezelfde plek in de lijst waar je vandaan kwam.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-using-a-recipe',
      menu: 'Opening and using a recipe',
      title: 'Open a recipe: cook mode, scaling, printing, sharing | Savour user guide',
      desc: 'Everything you can do in a Savour recipe: cook mode, edit, print, share, favourite, scale, notes and the ⋯ menu with folders and links.',
      lead: 'Everything you can do from a recipe, at a glance.',
      sections: [
        [
          'At the top',
          'The buttons at the top of the recipe:',
          [
            '[Cooking mode](#kookmodus): only the recipe, in large text.',
            '[Edit](#recept-maken): change the recipe (maker only).',
            '[Print](#printen): print the recipe, scaled too.',
            '[Share](#delen-link): send a link via WhatsApp, Telegram, SMS or email.',
            '[Favourite](#favorieten): give the recipe a star.'
          ]
        ],
        [
          'Scaling',
          'Below the title is “Convert” with quick buttons from ¼× to 10×, and “Original” to go back. See [Scaling](#omrekenen).'
        ],
        [
          'The ⋯ menu',
          'For your own recipe, ⋯ holds “More scaling options”, “Link to recipe”, “Add to folder” and “Delete from library”. When you open the recipe from a folder or kitchen team, it says “Remove from folder” or “Remove from kitchen team”.'
        ],
        [
          'Ticking off',
          'Tap an ingredient or step to tick it off. After an interruption you see where you were.'
        ],
        [
          'Notes and the original',
          'Below the recipe are your [notes](#recept-notities), and for a recipe from a photo “View original note”.'
        ],
        [
          'Back',
          '“← Back” returns you to the same place in the list you came from.'
        ]
      ]
    }
  },
  {
    id: 'recept-verwijderen',
    related: ['opschonen', 'mappen'],
    nl: {
      slug: 'handleiding-recepten-verwijderen',
      menu: 'Recepten verwijderen',
      title: 'Recepten verwijderen, één of meerdere tegelijk | Handleiding Savour',
      desc: 'Zo verwijder je recepten in Savour: één recept uit je bibliotheek, meerdere tegelijk, of alleen uit een map of keukenteam. Savour verwijdert nooit zelf iets.',
      lead: 'Opruimen zonder per ongeluk iets kwijt te raken.',
      sections: [
        [
          'Eén recept',
          'Open het recept, kies ⋯ en “Verwijderen uit bibliotheek”. Savour vraagt eerst of je het zeker weet.'
        ],
        [
          'Meerdere tegelijk',
          'Kies bij Alle recepten “Verwijder recepten”, vink de recepten aan en bevestig. Handig na een import met recepten die je niet nodig hebt.'
        ],
        [
          'Alleen uit een map',
          'Wil je een recept alleen uit een map of keukenteam halen, open het dan vanuit die map en kies ⋯ “Uit map halen” of “Uit keukenteam halen”. Het recept blijft in je bibliotheek.'
        ],
        [
          'Dubbele recepten',
          'Dubbele recepten en nummers voor receptnamen ruim je op met [Opschonen](#opschonen). Je ziet altijd eerst wat er verandert.'
        ],
        [
          'Savour verwijdert nooit zelf',
          'Savour verwijdert nooit recepten zonder dat jij erom vraagt. Ook als je stopt met [Savour Pro](#pro-stoppen), blijven al je recepten staan.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-deleting-recipes',
      menu: 'Deleting recipes',
      title: 'Delete recipes, one or several at once | Savour user guide',
      desc: 'How to delete recipes in Savour: one recipe from your library, several at once, or only from a folder or kitchen team. Savour never deletes anything by itself.',
      lead: 'Tidying up without losing anything by accident.',
      sections: [
        [
          'One recipe',
          'Open the recipe, choose ⋯ and “Delete from library”. Savour asks you to confirm first.'
        ],
        [
          'Several at once',
          'Under All recipes choose “Delete recipes”, tick the recipes and confirm. Handy after an import with recipes you don’t need.'
        ],
        [
          'Only from a folder',
          'To take a recipe out of a folder or kitchen team only, open it from that folder and choose ⋯ “Remove from folder” or “Remove from kitchen team”. The recipe stays in your library.'
        ],
        [
          'Duplicate recipes',
          'Clean up duplicate recipes and numbers in front of recipe names with [Clean up](#opschonen). You always see what will change first.'
        ],
        [
          'Savour never deletes by itself',
          'Savour never deletes recipes without you asking. Even if you stop [Savour Pro](#pro-stoppen), all your recipes stay.'
        ]
      ]
    }
  }
];
