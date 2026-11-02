// Handleiding, onderdeel "Printen en downloaden".

export const group = {
  id: 'printen',
  nl: {
    name: 'Printen en downloaden',
    intro: 'Een los recept, een hele receptenmap voor de pass of al je recepten, met het logo van je restaurant. En je recepten downloaden als Word of back-up.'
  },
  en: {
    name: 'Printing and downloading',
    intro: 'A single recipe, a whole recipe folder for the pass or all your recipes, with your restaurant’s logo. And downloading your recipes as Word or a backup.'
  }
};

export const pages = [
  {
    id: 'printen',
    related: ['printen-map', 'printen-logo', 'omrekenen'],
    nl: {
      slug: 'handleiding-printen',
      menu: 'Een recept printen',
      title: 'Een recept printen, ook omgerekend | Handleiding Savour',
      desc: 'Zo print je een recept in Savour: de printopmaak met vette hoeveelheden, omgerekend printen en op A4 of A5. Ook voor wie een gedeeld recept opent.',
      lead: 'Een los recept voor aan de muur of in de map aan de pass.',
      sections: [
        [
          'Printen',
          'Open het recept en kies “Printen”. Savour opent de printopmaak: de naam, de opbrengst, de ingrediënten met vette hoeveelheden en de bereiding in stappen. Kies daarna je printer, of bewaar het als PDF.'
        ],
        [
          'Omgerekend printen',
          'Heb je het recept [omgerekend](#omrekenen), dan print je de omgerekende hoeveelheden. Handig voor een grote productie of een evenement.'
        ],
        [
          'Delen in het recept',
          'Bestaat het recept uit [delen](#recept-delen), dan staat elk deel met zijn naam boven de eigen ingrediënten en bereiding.'
        ],
        [
          'Meer recepten tegelijk',
          'Een hele map, een keukenteam of een eigen selectie print je in één keer: zie [Meerdere recepten printen](#printen-map).'
        ],
        [
          'Met je logo',
          'Met Savour Pro staat het logo van je restaurant op je prints. Zie [Printen met je logo](#printen-logo).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-print-recipes',
      menu: 'Printing a recipe',
      title: 'Print a recipe, scaled or not | Savour user guide',
      desc: 'How to print a recipe in Savour: the print layout with bold quantities, printing scaled and on A4 or A5. Also for people who open a shared recipe.',
      lead: 'A single recipe for the wall or the binder at the pass.',
      sections: [
        [
          'Printing',
          'Open the recipe and choose “Print”. Savour opens the print layout: the name, the yield, the ingredients with bold quantities and the method in steps. Then choose your printer, or save it as a PDF.'
        ],
        [
          'Printing scaled',
          'If you have [scaled](#omrekenen) the recipe, you print the scaled quantities. Handy for a large production or an event.'
        ],
        [
          'Parts of the recipe',
          'If the recipe has [parts](#recept-delen), each part appears with its name above its own ingredients and method.'
        ],
        [
          'More recipes at once',
          'Print a whole folder, a kitchen team or your own selection in one go: see [Printing several recipes](#printen-map).'
        ],
        [
          'With your logo',
          'With Savour Pro your restaurant’s logo is on your prints. See [Printing with your logo](#printen-logo).'
        ]
      ]
    }
  },
  {
    id: 'printen-map',
    related: ['printen', 'printen-logo', 'mappen'],
    nl: {
      slug: 'handleiding-receptenmap-printen',
      menu: 'Meerdere recepten of een map printen',
      title: 'Een hele receptenmap printen met voorblad en inhoud | Handleiding Savour',
      desc: 'Zo print je in Savour een receptenmap, een keukenteam of al je recepten in één keer: zelf recepten kiezen, voorblad en inhoudsopgave, A5, foto’s en notities.',
      lead: 'Je complete receptenmap voor de klapper aan de pass, in één keer.',
      sections: [
        [
          'Wat je kunt printen',
          'Print een [receptenmap](#mappen), een [keukenteam](#keukenteams) of al je recepten tegelijk. Al je recepten print je onder Mijn account → Account met “Alle recepten printen”.'
        ],
        [
          'Recepten kiezen',
          'Bij “Welke recepten wil je printen?” vink je aan welke recepten meegaan. Met “Alles” of “Niets” begin je snel.'
        ],
        [
          'Opties',
          'Kies hoe de print eruitziet:',
          [
            '“Met voorblad en inhoud”: een voorblad, een inhoudsopgave en het nummer van elk recept onderaan de pagina, zodat je snel bladert.',
            '“A5, voor een kleine map aan de pass” in plaats van A4.',
            '“Met foto’s”: de foto van elk recept.',
            '“Met notities”: je [notities](#recept-notities) bij elk recept.'
          ]
        ],
        [
          'Tip voor de pass',
          'Print op A5 voor een kleine ringmap of insteekhoezen. Is een recept aangepast, print dan alleen dat recept opnieuw.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-print-recipe-folder',
      menu: 'Printing several recipes or a folder',
      title: 'Print a whole recipe folder with cover and contents | Savour user guide',
      desc: 'How to print a recipe folder, a kitchen team or all your recipes at once in Savour: choose recipes, cover page and contents, A5, photos and notes.',
      lead: 'Your complete recipe folder for the binder at the pass, in one go.',
      sections: [
        [
          'What you can print',
          'Print a [recipe folder](#mappen), a [kitchen team](#keukenteams) or all your recipes at once. Print all your recipes under My account → Account with “Print all recipes”.'
        ],
        [
          'Choosing recipes',
          'At “Which recipes do you want to print?” you tick which recipes go in. “All” or “None” gives you a quick start.'
        ],
        [
          'Options',
          'Choose how the print looks:',
          [
            '“With cover page and contents”: a cover page, a table of contents and each recipe’s number at the bottom of the page, so you can flick through quickly.',
            '“A5, for a small binder at the pass” instead of A4.',
            '“With photos”: each recipe’s photo.',
            '“With notes”: your [notes](#recept-notities) on each recipe.'
          ]
        ],
        [
          'A tip for the pass',
          'Print on A5 for a small ring binder or sleeves. When a recipe changes, reprint just that recipe.'
        ]
      ]
    }
  },
  {
    id: 'printen-logo',
    related: ['printen-map', 'gratis-en-pro', 'abonnement-beheren'],
    nl: {
      slug: 'handleiding-printen-met-logo',
      menu: 'Printen met het logo van je restaurant',
      title: 'Recepten printen met het logo van je restaurant | Handleiding Savour',
      desc: 'Zo zet je het logo van je restaurant op je geprinte recepten in Savour: logo en naam instellen, zwart-wit voor de keukenprinter en het logo in een keukenteam.',
      lead: 'Je eigen receptenboek, met je eigen naam en logo erop.',
      sections: [
        [
          'Instellen',
          'Ga naar Mijn account → Logo op prints. Kies je logo en vul de naam in die op de print komt. Dit kan met [Savour Pro](#gratis-en-pro), ook in de proefweek.'
        ],
        [
          'Zwart-wit',
          'Kies “Logo in zwart-wit printen” voor een keukenprinter of als je logo in kleur te druk is op papier.'
        ],
        [
          'Eigen prints en keukenteams',
          'Met “Logo op mijn eigen prints” kies je of het logo op recepten en mappen buiten een keukenteam staat. Onder Keukenteams zet je het logo per keukenteam aan of uit; dat kan ook in de instellingen van het keukenteam. In een keukenteam staat het logo van de eigenaar op de prints, zodat het hele team dezelfde prints heeft.'
        ],
        [
          'Meer lezen',
          'Waarom een eigen receptenboek met logo werkt: [Receptenboek met eigen logo](/blog/receptenboek-met-eigen-logo).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-print-with-logo',
      menu: 'Printing with your restaurant’s logo',
      title: 'Print recipes with your restaurant’s logo | Savour user guide',
      desc: 'How to put your restaurant’s logo on printed recipes in Savour: set up the logo and name, black and white for the kitchen printer and the logo in a kitchen team.',
      lead: 'Your own recipe book, with your own name and logo on it.',
      sections: [
        [
          'Setting it up',
          'Go to My account → Logo on prints. Choose your logo and enter the name that goes on the print. This works with [Savour Pro](#gratis-en-pro), including the trial week.'
        ],
        [
          'Black and white',
          'Choose “Print logo in black and white” for a kitchen printer or if your colour logo is too busy on paper.'
        ],
        [
          'Your own prints and kitchen teams',
          'With “Logo on my own prints” you choose whether the logo appears on recipes and folders outside a kitchen team. Under Kitchen teams you turn the logo on or off for each kitchen team; you can also do this in the kitchen team’s settings. In a kitchen team the owner’s logo is on the prints, so the whole team has the same prints.'
        ],
        [
          'Read more',
          'Why your own recipe book with a logo works: [Recipe book with your logo](/en/blog/recipe-book-with-your-logo).'
        ]
      ]
    }
  },
  {
    id: 'downloaden',
    related: ['import-json', 'gratis-en-pro', 'printen-map'],
    nl: {
      slug: 'handleiding-recepten-downloaden',
      menu: 'Recepten downloaden: Word en back-up',
      title: 'Je recepten downloaden als Word-bestand of back-up | Handleiding Savour',
      desc: 'Zo download je al je recepten uit Savour: elk recept als Word-bestand in een zip, alles in één Word-bestand, of een back-up als JSON die je weer kunt importeren.',
      lead: 'Je recepten zijn van jou. Download ze wanneer je wilt.',
      sections: [
        [
          'Waar',
          'Ga naar Mijn account → Account, bij “Al je recepten printen of downloaden”. Downloaden kan met [Savour Pro](#gratis-en-pro).'
        ],
        [
          'Drie manieren',
          'Kies wat je nodig hebt:',
          [
            '“Word per recept”: elk recept een eigen Word-bestand in de printopmaak, samen in een .zip.',
            '“Alles in één Word-bestand”: eenvoudige opmaak met titel, opbrengst, ingrediënten en bereiding.',
            '“Back-up”: recepten en mappen als JSON-bestand.'
          ]
        ],
        [
          'Een back-up terugzetten',
          'Een back-up kun je weer in Savour importeren bij “Andere bestanden”. Zie [JSON en back-ups](#import-json).'
        ],
        [
          'Zonder Pro',
          'Ook zonder Pro blijven je recepten altijd in Savour staan, en kun je ze bekijken en [printen](#printen-map). Stoppen met Pro kost je nooit recepten: zie [Stoppen met Savour Pro](#pro-stoppen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-download-recipes',
      menu: 'Downloading recipes: Word and backup',
      title: 'Download your recipes as a Word file or backup | Savour user guide',
      desc: 'How to download all your recipes from Savour: each recipe as a Word file in a zip, everything in one Word file, or a JSON backup you can import again.',
      lead: 'Your recipes are yours. Download them whenever you like.',
      sections: [
        [
          'Where',
          'Go to My account → Account, under “Print or download all your recipes”. Downloading works with [Savour Pro](#gratis-en-pro).'
        ],
        [
          'Three ways',
          'Choose what you need:',
          [
            '“Word per recipe”: each recipe its own Word file in the print layout, together in a .zip.',
            '“Everything in one Word file”: a simple layout with title, yield, ingredients and method.',
            '“Backup”: recipes and folders as a JSON file.'
          ]
        ],
        [
          'Restoring a backup',
          'A backup can be imported into Savour again under “Other files”. See [JSON and backups](#import-json).'
        ],
        [
          'Without Pro',
          'Without Pro your recipes always stay in Savour, and you can view and [print](#printen-map) them. Stopping Pro never costs you recipes: see [Stopping Savour Pro](#pro-stoppen).'
        ]
      ]
    }
  }
];
