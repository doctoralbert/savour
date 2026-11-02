// Handleiding, onderdeel "Tips voor goede recepten" (vroeger de losse pagina Gids) en "Hulp".

export const group = {
  id: 'tips',
  nl: {
    name: 'Tips voor goede recepten',
    intro: 'Praktische tips uit de keuken voor recepten die in elke dienst hetzelfde uitpakken.'
  },
  en: {
    name: 'Tips for good recipes',
    intro: 'Practical kitchen tips for recipes that turn out the same in every service.'
  }
};

export const helpGroup = {
  id: 'hulp',
  nl: {
    name: 'Hulp',
    intro: 'Problemen oplossen, een probleem melden en de woorden die Savour gebruikt. Staat je vraag er niet bij, kijk dan bij de [veelgestelde vragen](/veelgestelde-vragen).'
  },
  en: {
    name: 'Help',
    intro: 'Solving problems, reporting a problem and the words Savour uses. If your question is not here, see the [FAQ](/en/faq).'
  }
};

export const pages = [
  {
    id: 'tips-recept-schrijven',
    related: ['recept-ingredienten', 'recept-bereiding', 'recept-opbrengst'],
    nl: {
      slug: 'handleiding-tip-recept-schrijven',
      menu: 'Een recept dat iedereen hetzelfde maakt',
      title: 'Een keukenrecept schrijven dat iedereen hetzelfde maakt | Handleiding',
      desc: 'Tips voor een standaardreceptuur: duidelijke naam en opbrengst, ingrediënten in gram in volgorde van gebruik, korte stappen en de kritische punten.',
      lead: 'Een goed keukenrecept laat geen ruimte voor interpretatie.',
      sections: [
        [
          'Naam en opbrengst',
          'Begin met een duidelijke naam en de [opbrengst](#recept-opbrengst): hoeveel liter, hoeveel stuks of voor hoeveel couverts.'
        ],
        [
          'Ingrediënten',
          'Zet alle ingrediënten in de volgorde waarin je ze gebruikt, met de hoeveelheid in gram of milliliter in plaats van in lepels of kopjes. Zie [Ingrediënten en hoeveelheden](#recept-ingredienten).'
        ],
        [
          'Bereiding',
          'Schrijf de bereiding in korte stappen, één handeling per stap. Zie [De bereiding schrijven](#recept-bereiding).'
        ],
        [
          'Kritische punten',
          'Noteer altijd de kritische punten: temperaturen, tijden, de gewenste dikte of kleur en waar je op moet letten. “Inkoken tot een derde” of “kerntemperatuur 58 °C” voorkomt meer fouten dan een mooie beschrijving.'
        ],
        [
          'Meer lezen',
          'Waarom vaste recepturen zo veel opleveren: [Standaardrecepturen in de keuken](/blog/standaardrecepturen-in-de-keuken).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-tip-writing-recipes',
      menu: 'A recipe everyone makes the same way',
      title: 'Write a kitchen recipe everyone makes the same way | User guide',
      desc: 'Tips for a standard recipe: a clear name and yield, ingredients in grams in order of use, short steps and the critical points.',
      lead: 'A good kitchen recipe leaves no room for interpretation.',
      sections: [
        [
          'Name and yield',
          'Start with a clear name and the [yield](#recept-opbrengst): how many litres, how many pieces or for how many covers.'
        ],
        [
          'Ingredients',
          'List all ingredients in the order you use them, with quantities in grams or millilitres rather than spoons or cups. See [Ingredients and quantities](#recept-ingredienten).'
        ],
        [
          'Method',
          'Write the method in short steps, one action per step. See [Writing the method](#recept-bereiding).'
        ],
        [
          'Critical points',
          'Always note the critical points: temperatures, times, the desired thickness or colour and what to watch out for. “Reduce by two thirds” or “core temperature 58 °C” prevents more mistakes than a nice description.'
        ],
        [
          'Read more',
          'Why standard recipes pay off: [Standardised recipes](/en/blog/standardised-recipes).'
        ]
      ]
    }
  },
  {
    id: 'tips-opschalen',
    related: ['omrekenen', 'omrekenen-meer', 'eenheden'],
    nl: {
      slug: 'handleiding-tip-opschalen-zonder-fouten',
      menu: 'Opschalen zonder fouten',
      title: 'Recepten opschalen zonder fouten: factor en proeven | Handleiding',
      desc: 'Tips voor opschalen in de keuken: rekenen met een factor in gewicht, en wat niet een-op-een meeschaalt, zoals inkooktijden, zout, zuur, specerijen en baktijden.',
      lead: 'Rekenen doet Savour. Proeven blijft jouw vak.',
      sections: [
        [
          'De rekenfactor',
          'Opschalen doe je met een factor: de gewenste opbrengst gedeeld door de opbrengst van het basisrecept. Heb je een beurre blanc voor 1 liter en heb je 3,5 liter nodig, dan is de factor 3,5. Reken altijd in gewicht; dan is de uitkomst exact. In Savour doe je dit met [Meer omrekenen](#omrekenen-meer).'
        ],
        [
          'Wat niet meeschaalt',
          'Niet alles schaalt een-op-een mee:',
          [
            'Inkooktijden worden langer, omdat een grotere pan relatief minder verdampt.',
            'Zout, zuur en specerijen proef je bij grote hoeveelheden opnieuw af.',
            'Bij gebak verandert de baktijd met een andere vorm of een volle oven.',
            'Geleermiddelen zoals gelatine en agar reken je wel exact mee met het vocht.'
          ]
        ],
        [
          'Meer lezen',
          'Uitgebreider: [Recepten opschalen zonder fouten](/blog/recepten-opschalen-zonder-fouten).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-tip-scaling-without-mistakes',
      menu: 'Scaling without mistakes',
      title: 'Scale recipes without mistakes: factor and tasting | User guide',
      desc: 'Tips for scaling in the kitchen: working with a factor by weight, and what does not scale one to one, such as reduction times, salt, acid, spices and baking times.',
      lead: 'Savour does the maths. Tasting is still your craft.',
      sections: [
        [
          'The factor',
          'You scale with a factor: the target yield divided by the yield of the base recipe. If you have a beurre blanc for 1 litre and need 3.5 litres, the factor is 3.5. Always work by weight; then the result is exact. In Savour you do this with [More scaling options](#omrekenen-meer).'
        ],
        [
          'What doesn’t scale',
          'Not everything scales one to one:',
          [
            'Reduction takes longer, because a bigger pan evaporates relatively less.',
            'Salt, acid and spices need tasting again in large batches.',
            'Baking times change with a different tin or a full oven.',
            'Gelling agents such as gelatine and agar do scale exactly with the liquid.'
          ]
        ],
        [
          'Read more',
          'In more depth: [Scaling recipes without errors](/en/blog/scaling-recipes-without-errors).'
        ]
      ]
    }
  },
  {
    id: 'tips-kladjes',
    related: ['import-fotos', 'import-controleren'],
    nl: {
      slug: 'handleiding-tip-van-kladje-naar-receptkaart',
      menu: 'Van kladje naar receptkaart',
      title: 'Van kladje naar receptkaart: handgeschreven recepten bewaren | Handleiding',
      desc: 'Tips om handgeschreven kladjes snel vast te leggen: fotograferen bij goed licht, recht van boven, en daarna de getallen controleren.',
      lead: 'Maak van een kladje een vast recept, zolang je nog weet wat je bedoelde.',
      sections: [
        [
          'Snel vastleggen',
          'Veel recepten beginnen als kladje bij de pass. Maak er zo snel mogelijk een vast recept van, zolang je nog weet wat je bedoelde.'
        ],
        [
          'De foto',
          'Fotografeer een handgeschreven recept bij goed licht, recht van boven en met de hele pagina in beeld. In Savour doe je dat met [de camera](#import-fotos).'
        ],
        [
          'Controleren',
          'Controleer daarna vooral de getallen: een 3 en een 8 of een 1 en een 7 zijn op een vlekkerig kladje snel verwisseld. Het origineel blijft bewaard bij het recept.'
        ],
        [
          'Meer lezen',
          '[Oude kladjes digitaliseren](/blog/oude-kladjes-digitaliseren).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-tip-from-note-to-recipe-card',
      menu: 'From scribbled note to recipe card',
      title: 'From scribbled note to recipe card: keeping handwritten recipes | User guide',
      desc: 'Tips to capture handwritten notes quickly: photograph in good light, straight from above, then check the numbers.',
      lead: 'Turn a note into a fixed recipe while you still remember what you meant.',
      sections: [
        [
          'Capture it quickly',
          'Many recipes start as a note at the pass. Turn it into a fixed recipe as soon as possible, while you still remember what you meant.'
        ],
        [
          'The photo',
          'Photograph a handwritten recipe in good light, straight from above, with the whole page in view. In Savour you use [the camera](#import-fotos).'
        ],
        [
          'Checking',
          'Then check the numbers in particular: a 3 and an 8 or a 1 and a 7 are easily mixed up on a stained note. The original is kept with the recipe.'
        ],
        [
          'Read more',
          '[Digitise old recipe notes](/en/blog/digitise-old-recipe-notes).'
        ]
      ]
    }
  },
  {
    id: 'tips-ordenen',
    related: ['categorieen', 'mappen'],
    nl: {
      slug: 'handleiding-tip-categorieen-en-mappen',
      menu: 'Categorieën en mappen slim gebruiken',
      title: 'Categorieën en mappen slim gebruiken in je keuken | Handleiding',
      desc: 'Tips om recepten te ordenen: categorieën voor wat een recept is, mappen voor hoe je werkt, en korte herkenbare namen die je team met één zoekwoord vindt.',
      lead: 'Wat een recept is, en hoe je ermee werkt: twee verschillende dingen.',
      sections: [
        [
          'Categorie: wat het is',
          'Gebruik [categorieën](#categorieen) voor wat een recept is, zoals sauzen, garnituren of patisserie. Een recept staat in één categorie.'
        ],
        [
          'Map: hoe je werkt',
          'Gebruik [mappen](#mappen) voor hoe je werkt, zoals de huidige kaart, een evenement of de koude keuken. Een recept kan in meerdere mappen terugkomen.'
        ],
        [
          'Namen',
          'Houd namen kort en herkenbaar, zodat iedereen in het team het recept met één zoekwoord terugvindt.'
        ],
        [
          'Meer lezen',
          '[Receptenmappen indelen: voorbeelden](/blog/receptenmappen-indelen-voorbeelden) en [Recepten organiseren in de keuken](/blog/recepten-organiseren-in-de-keuken).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-tip-categories-and-folders',
      menu: 'Using categories and folders well',
      title: 'Use categories and folders well in your kitchen | User guide',
      desc: 'Tips for organising recipes: categories for what a recipe is, folders for how you work, and short recognisable names your team finds with one search word.',
      lead: 'What a recipe is, and how you work with it: two different things.',
      sections: [
        [
          'Category: what it is',
          'Use [categories](#categorieen) for what a recipe is, such as sauces, garnishes or pastry. A recipe is in one category.'
        ],
        [
          'Folder: how you work',
          'Use [folders](#mappen) for how you work, such as the current menu, an event or the cold kitchen. A recipe can appear in several folders.'
        ],
        [
          'Names',
          'Keep names short and recognisable, so everyone in the team finds the recipe with one search word.'
        ],
        [
          'Read more',
          '[Recipe folder examples](/en/blog/recipe-folder-examples) and [Organising recipes in the kitchen](/en/blog/organising-recipes-in-the-kitchen).'
        ]
      ]
    }
  },
  {
    id: 'tips-team',
    related: ['keukenteams', 'keukenteam-rollen'],
    nl: {
      slug: 'handleiding-tip-samenwerken',
      menu: 'Samenwerken met één bron',
      title: 'Samenwerken met je team vanuit één receptenbron | Handleiding',
      desc: 'Tips voor samenwerken in de keuken: één bron voor elk recept, rechten per rol, en nooit meer een oude versie in een appgroep.',
      lead: 'Een keuken werkt het best met één bron voor elk recept.',
      sections: [
        [
          'Eén bron',
          'Deel recepten via een [keukenteam](#keukenteams) in plaats van losse foto’s of berichten. Pas je een recept aan, dan werkt iedereen meteen met de nieuwe versie, en raakt niemand een oude versie kwijt in een appgroep.'
        ],
        [
          'Rechten',
          'Geef de sous-chef rechten om recepten te bewerken en de rest van het team rechten om ze te bekijken. Zie [Rollen](#keukenteam-rollen).'
        ],
        [
          'Een nieuwe kok',
          'Met alle recepten op de telefoon is een nieuwe kok sneller ingewerkt. Lees ook [Een nieuwe kok inwerken](/blog/nieuwe-kok-inwerken).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-tip-working-together',
      menu: 'Working from one source',
      title: 'Working with your team from one recipe source | User guide',
      desc: 'Tips for working together in the kitchen: one source for every recipe, rights per role, and never again an old version in a group chat.',
      lead: 'A kitchen works best with one source for every recipe.',
      sections: [
        [
          'One source',
          'Share recipes through a [kitchen team](#keukenteams) instead of loose photos or messages. When you change a recipe, everyone works from the new version straight away, and nobody loses an old version in a group chat.'
        ],
        [
          'Rights',
          'Give the sous-chef rights to edit recipes and the rest of the team rights to view them. See [Roles](#keukenteam-rollen).'
        ],
        [
          'A new cook',
          'With all recipes on their phone, a new cook is up to speed faster. Read also [Onboarding new cooks](/en/blog/onboarding-new-cooks).'
        ]
      ]
    }
  },
  {
    id: 'tips-allergenen',
    related: ['recept-notities', 'recept-koppelen'],
    nl: {
      slug: 'handleiding-tip-allergenen',
      menu: 'Allergenen en vaste afspraken',
      title: 'Allergenen en vaste afspraken in je recepten | Handleiding',
      desc: 'Tips om allergenen in je recepten duidelijk te houden: allergenen in de ingrediëntenlijst, basisrecepten vermelden en snel kunnen nagaan wat er in een gerecht zit.',
      lead: 'Bij een vraag van een gast snel weten wat er precies in zit.',
      sections: [
        [
          'In de ingrediëntenlijst',
          'Zet bij elk recept onderdelen met allergenen duidelijk in de ingrediëntenlijst, ook als ze uit een ander basisrecept komen.'
        ],
        [
          'Basisrecepten',
          'Vermeld bij een samengesteld gerecht welke basisrecepten erin zitten. [Koppel ze](#recept-koppelen), dan zie je met één tik wat er in de fond of saus zit.'
        ],
        [
          'Notities',
          'Zet vaste afspraken en allergeneninformatie in een [notitie](#recept-notities) bij het recept, zodat ze ook op de print staan.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-tip-allergens',
      menu: 'Allergens and fixed agreements',
      title: 'Allergens and fixed agreements in your recipes | User guide',
      desc: 'Tips to keep allergens clear in your recipes: allergens in the ingredient list, naming base recipes and quickly checking what is in a dish.',
      lead: 'Know exactly what is in a dish when a guest asks.',
      sections: [
        [
          'In the ingredient list',
          'In every recipe, list components with allergens clearly in the ingredients, also when they come from another base recipe.'
        ],
        [
          'Base recipes',
          'For a composed dish, name the base recipes in it. [Link them](#recept-koppelen) and one tap shows what is in the stock or sauce.'
        ],
        [
          'Notes',
          'Put fixed agreements and allergen information in a [note](#recept-notities) on the recipe, so they appear on the print too.'
        ]
      ]
    }
  },
  {
    id: 'probleem-inloggen',
    group: 'hulp',
    related: ['inloggen', 'account-maken', 'probleem-melden'],
    nl: {
      slug: 'handleiding-problemen-met-inloggen',
      menu: 'Problemen met inloggen',
      title: 'Problemen met inloggen of de bevestigingsmail oplossen | Handleiding',
      desc: 'Wat te doen als inloggen in Savour niet lukt: e-mailadres of wachtwoord klopt niet, nog niet bevestigd, geen mail ontvangen, of een link uit een e-mail die niet meer werkt.',
      lead: 'De meest voorkomende meldingen bij inloggen, en wat je eraan doet.',
      sections: [
        [
          '“E-mailadres of wachtwoord klopt niet”',
          'Controleer of je het e-mailadres goed hebt getypt. Weet je je wachtwoord niet meer, kies dan “Wachtwoord vergeten?”. Zie [Inloggen en wachtwoord](#inloggen).'
        ],
        [
          '“Bevestig eerst je e-mailadres”',
          'Je account is nog niet bevestigd. Klik op de link in de bevestigingsmail, of laat Savour een nieuwe bevestigingsmail sturen. Kijk ook in je spam.'
        ],
        [
          '“Deze link werkt niet meer”',
          'Een link uit een e-mail werkt één keer en een uur lang. Vroeg je meerdere keren een nieuwe aan, dan werkt alleen de nieuwste. Vraag een nieuwe link aan en gebruik de nieuwste mail.'
        ],
        [
          'Geen e-mail ontvangen',
          'Kijk in je spam of ongewenste e-mail. Bij bedrijfsmail kan het even duren. Zijn er te veel e-mails aangevraagd, dan meldt Savour dat; probeer het dan later opnieuw.'
        ],
        [
          '“Dit e-mailadres heeft al een account”',
          'Log in met dat e-mailadres, of kies “Wachtwoord vergeten?”.'
        ],
        [
          'Steeds uitgelogd',
          'Vink bij inloggen “Ingelogd blijven” aan. Staat het uit, dan ben je uitgelogd zodra je het venster sluit.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-login-problems',
      menu: 'Problems logging in',
      title: 'Fix problems logging in or with the confirmation email | User guide',
      desc: 'What to do when logging in to Savour doesn’t work: wrong email or password, not confirmed yet, no email received, or an email link that no longer works.',
      lead: 'The most common messages when logging in, and what to do about them.',
      sections: [
        [
          '“Email address or password is incorrect”',
          'Check that you typed the email address correctly. If you no longer know your password, choose “Forgot password?”. See [Logging in and passwords](#inloggen).'
        ],
        [
          '“Confirm your email address first”',
          'Your account is not confirmed yet. Click the link in the confirmation email, or let Savour send a new one. Check your spam too.'
        ],
        [
          '“This link no longer works”',
          'A link from an email works once and for one hour. If you requested several, only the newest works. Request a new link and use the newest email.'
        ],
        [
          'No email received',
          'Check your spam or junk folder. With company email it can take a while. If too many emails were requested, Savour says so; try again later.'
        ],
        [
          '“This email address already has an account”',
          'Log in with that email address, or choose “Forgot password?”.'
        ],
        [
          'Keep getting logged out',
          'Tick “Stay signed in” when logging in. If it is off, you are logged out as soon as you close the window.'
        ]
      ]
    }
  },
  {
    id: 'probleem-melden',
    group: 'hulp',
    related: ['import-problemen', 'probleem-inloggen'],
    nl: {
      slug: 'handleiding-probleem-melden-en-contact',
      menu: 'Probleem melden en contact',
      title: 'Een probleem melden of contact opnemen met Savour | Handleiding',
      desc: 'Zo meld je een probleem in Savour, met een screenshot, of neem je contact op via het contactformulier of contact@savour.page.',
      lead: 'Loopt er iets niet goed? Laat het weten, dan zoeken de koks achter Savour het uit.',
      sections: [
        [
          'Een probleem melden',
          'Kies onderaan de site “Probleem melden”. Beschrijf wat er misgaat en voeg zo mogelijk een screenshot toe, tot 3 MB. Je melding komt direct bij het team.'
        ],
        [
          'Contact',
          'Voor vragen over Savour, een teamabonnement of de import service gebruik je het [contactformulier](/contact) of mail je naar contact@savour.page.'
        ],
        [
          'Wat helpt',
          'Vermeld op welk apparaat en in welke browser het gebeurde, wat je deed en wat je verwachtte. Gaat het om een import, stuur dan het bestand of een deel ervan mee.'
        ],
        [
          'Eerst zelf kijken',
          'Veel antwoorden staan bij [Problemen bij importeren](#import-problemen), [Problemen met inloggen](#probleem-inloggen) en de [veelgestelde vragen](/veelgestelde-vragen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-report-a-problem-and-contact',
      menu: 'Report a problem and contact',
      title: 'Report a problem or contact Savour | User guide',
      desc: 'How to report a problem in Savour, with a screenshot, or get in touch through the contact form or contact@savour.page.',
      lead: 'Something not working? Let us know and the chefs behind Savour will look into it.',
      sections: [
        [
          'Reporting a problem',
          'Choose “Report a problem” at the bottom of the site. Describe what goes wrong and add a screenshot if you can, up to 3 MB. Your report goes straight to the team.'
        ],
        [
          'Contact',
          'For questions about Savour, a team plan or the import service, use the [contact form](/en/contact) or email contact@savour.page.'
        ],
        [
          'What helps',
          'Mention the device and browser, what you did and what you expected. For an import, send the file or part of it.'
        ],
        [
          'Look first',
          'Many answers are in [Problems when importing](#import-problemen), [Problems logging in](#probleem-inloggen) and the [FAQ](/en/faq).'
        ]
      ]
    }
  },
  {
    id: 'woordenlijst',
    group: 'hulp',
    related: ['aan-de-slag', 'menu'],
    nl: {
      slug: 'handleiding-woordenlijst',
      menu: 'Woordenlijst',
      title: 'Woordenlijst: de begrippen van Savour uitgelegd | Handleiding',
      desc: 'Wat betekent wat in Savour: Savour-lezer, keukenteam, receptenmap, categorie, opbrengst, factor, deel, basisrecept, kladje, kookmodus en meer.',
      lead: 'De woorden die je in Savour tegenkomt, kort uitgelegd.',
      sections: [
        [
          'Recepten',
          'Begrippen rond een recept:',
          [
            'Opbrengst: wat een recept oplevert, zoals 1 liter of 40 stuks. Zie [Opbrengst](#recept-opbrengst).',
            'Deel: een onderdeel van een recept met eigen ingrediënten en bereiding, zoals deeg of saus. Zie [Een recept in delen](#recept-delen).',
            'Basisrecept: een eigen recept dat je als ingrediënt gebruikt, zoals een fond. Zie [Koppelen](#recept-koppelen).',
            'Kladje: een handgeschreven of gescand recept. Zie [Foto’s en kladjes](#import-fotos).',
            'Notitie: een vaste opmerking naast een recept. Zie [Notities](#recept-notities).'
          ]
        ],
        [
          'Ordenen',
          'Begrippen rond ordenen:',
          [
            'Categorie: wat een recept is. Zie [Categorieën](#categorieen).',
            'Trefwoord: een woord in de receptnaam waarmee Savour een categorie voorstelt. Zie [Trefwoorden](#categorie-trefwoorden).',
            'Receptenmap: een eigen indeling, zoals per partie. Zie [Receptenmappen](#mappen).',
            'Favoriet: een recept met een sterretje. Zie [Favorieten](#favorieten).'
          ]
        ],
        [
          'Importeren en omrekenen',
          'Begrippen rond importeren en omrekenen:',
          [
            'Savour-lezer: het eigen programma van Savour dat recepten uit bestanden leest. Zie [De Savour-lezer en de AI](#import-ai).',
            'Controlescherm: waar je een import nakijkt voor het opslaan. Zie [Import controleren](#import-controleren).',
            'Export: een bestand met al je recepten uit een andere app. Zie [Overstappen](#overstappen).',
            'Factor: het getal waarmee je een recept vermenigvuldigt. Zie [Meer omrekenen](#omrekenen-meer).',
            'Kookmodus: alleen het recept, groot en met het scherm aan. Zie [Kookmodus](#kookmodus).'
          ]
        ],
        [
          'Samenwerken',
          'Begrippen rond samenwerken:',
          [
            'Keukenteam: een gedeeld receptenboek voor je brigade. Zie [Keukenteams](#keukenteams).',
            'Eigenaar, editor en viewer: de rollen in een keukenteam. Zie [Rollen](#keukenteam-rollen).',
            'Organisatie: een abonnement waarmee je hele team Savour Pro heeft. Zie [Organisaties](#organisatie).',
            'Savour Pro: het betaalde abonnement. Zie [Gratis en Savour Pro](#gratis-en-pro).'
          ]
        ]
      ]
    },
    en: {
      slug: 'en/guide-glossary',
      menu: 'Glossary',
      title: 'Glossary: Savour’s terms explained | User guide',
      desc: 'What means what in Savour: Savour reader, kitchen team, recipe folder, category, yield, factor, part, base recipe, note, cook mode and more.',
      lead: 'The words you come across in Savour, briefly explained.',
      sections: [
        [
          'Recipes',
          'Terms around a recipe:',
          [
            'Yield: what a recipe makes, such as 1 litre or 40 pieces. See [Yield](#recept-opbrengst).',
            'Part: a component of a recipe with its own ingredients and method, such as dough or sauce. See [A recipe in parts](#recept-delen).',
            'Base recipe: one of your own recipes used as an ingredient, such as a stock. See [Linking](#recept-koppelen).',
            'Original note: a handwritten or scanned recipe. See [Photos and notes](#import-fotos).',
            'Note: a lasting remark next to a recipe. See [Notes](#recept-notities).'
          ]
        ],
        [
          'Organising',
          'Terms around organising:',
          [
            'Category: what a recipe is. See [Categories](#categorieen).',
            'Keyword: a word in the recipe name that makes Savour suggest a category. See [Keywords](#categorie-trefwoorden).',
            'Recipe folder: your own structure, such as by section. See [Recipe folders](#mappen).',
            'Favourite: a recipe with a star. See [Favourites](#favorieten).'
          ]
        ],
        [
          'Importing and scaling',
          'Terms around importing and scaling:',
          [
            'Savour reader: Savour’s own program that reads recipes from files. See [The Savour reader and AI](#import-ai).',
            'Review screen: where you check an import before saving. See [Reviewing an import](#import-controleren).',
            'Export: a file with all your recipes from another app. See [Moving to Savour](#overstappen).',
            'Factor: the number you multiply a recipe by. See [More scaling options](#omrekenen-meer).',
            'Cook mode: only the recipe, large and with the screen on. See [Cook mode](#kookmodus).'
          ]
        ],
        [
          'Working together',
          'Terms around working together:',
          [
            'Kitchen team: a shared recipe book for your brigade. See [Kitchen teams](#keukenteams).',
            'Owner, editor and viewer: the roles in a kitchen team. See [Roles](#keukenteam-rollen).',
            'Organisation: a plan that gives your whole team Savour Pro. See [Organisations](#organisatie).',
            'Savour Pro: the paid subscription. See [Free and Savour Pro](#gratis-en-pro).'
          ]
        ]
      ]
    }
  }
];
