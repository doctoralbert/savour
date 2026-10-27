// Teksten van de publieke website (startpagina, functies, voor wie, over ons, binnenkort, blog), in het
// Nederlands en Engels. tools/build-seo.mjs maakt hier de pagina's van. Toon: rustig, concreet, uit de keuken.
// Geen namen of gezichten (wens van de eigenaar): "we" = chefs uit Nederland.

// Kladje naast het nette recept. Wordt op de startpagina en bij Recepten digitaliseren getoond.
export const KLADJE = {
  nl: {
    note: ['Beurre blanc', '2 sjalot fijn', '1 dl witte wijn', '1 dl azijn', 'inkoken tot ¼', '250 gr boter koud!!', 'monteren, zout, citr.'],
    title: 'Beurre blanc',
    meta: 'Opbrengst 0,5 liter · Sauzen',
    ingredients: ['2 sjalotten, fijngesneden', '100 ml witte wijn', '100 ml witte wijnazijn', '250 g koude boter, in blokjes', 'Zout en citroensap'],
    steps: ['Sjalot, wijn en azijn inkoken tot een kwart.', 'Van het vuur monteren met de koude boter.', 'Op smaak brengen met zout en citroen.'],
    caption: 'Links het kladje uit de keuken. Rechts hetzelfde recept in Savour.'
  },
  en: {
    note: ['Beurre blanc', '2 shallot fine', '1 dl white wine', '1 dl vinegar', 'reduce to ¼', '250 gr butter cold!!', 'mount, salt, lem.'],
    title: 'Beurre blanc',
    meta: 'Yield 0.5 litre · Sauces',
    ingredients: ['2 shallots, finely chopped', '100 ml white wine', '100 ml white wine vinegar', '250 g cold butter, diced', 'Salt and lemon juice'],
    steps: ['Reduce shallot, wine and vinegar to a quarter.', 'Off the heat, mount with the cold butter.', 'Season with salt and lemon.'],
    caption: 'Left: the note from the kitchen. Right: the same recipe in Savour.'
  }
};

export const UI = {
  nl: {
    home: '/',
    features: 'Functies',
    audience: 'Voor wie',
    pricing: 'Prijzen',
    about: 'Over ons',
    blog: 'Blog',
    login: 'Inloggen',
    start: 'Gratis beginnen',
    demo: 'Bekijk de demo',
    demoNote: '40 proefrecepten, geen account nodig',
    other: 'English',
    menu: 'Menu',
    close: 'Sluiten',
    featuresIntro: 'Alles wat Savour in de keuken voor je doet, van het eerste kladje tot de print aan de muur.',
    audienceIntro: 'Gemaakt voor de professionele keuken, van chef tot stagiair.',
    logoLine: 'Van kladje naar een recept dat klopt. Gemaakt door chefs, voor chefs.',
    more: 'Lees meer',
    related: 'Ook interessant',
    ctaTitle: 'Je recepten verdienen een betere plek dan een la.',
    ctaText: 'Begin gratis met tot 100 recepten en probeer Savour Pro 7 dagen. Geen betaalgegevens nodig.',
    footerTag: 'Het receptenplatform en de receptenapp voor de professionele, culinaire keuken.',
    footerCols: { features: 'Functies', audience: 'Voor wie', company: 'Savour', help: 'Hulp' },
    faq: 'Veelgestelde vragen',
    guide: 'Gids',
    contact: 'Contact',
    terms: 'Algemene voorwaarden',
    privacy: 'Privacybeleid',
    bug: 'Probleem melden',
    company: 'Savour · contact@savour.page',
    madeBy: 'Gemaakt door chefs, voor chefs.',
    soon: 'Binnenkort',
    readArticle: 'Lees het artikel',
    blogLead: 'Praktische artikelen over recepten digitaliseren, receptenmappen indelen, je keukenteam en receptbeheer in de horeca.'
  },
  en: {
    home: '/en',
    features: 'Features',
    audience: 'Who it’s for',
    pricing: 'Pricing',
    about: 'About',
    blog: 'Blog',
    login: 'Log in',
    start: 'Start for free',
    demo: 'View the demo',
    demoNote: '40 sample recipes, no account needed',
    other: 'Nederlands',
    menu: 'Menu',
    close: 'Close',
    featuresIntro: 'Everything Savour does for you in the kitchen, from the first note to the print on the wall.',
    audienceIntro: 'Made for the professional kitchen, from chef to intern.',
    logoLine: 'From scribbled note to a recipe that works. Made by chefs, for chefs.',
    more: 'Read more',
    related: 'Related',
    ctaTitle: 'Your recipes deserve a better place than a drawer.',
    ctaText: 'Start free with up to 100 recipes and try Savour Pro for 7 days. No payment details needed.',
    footerTag: 'The recipe app for professional kitchens.',
    footerCols: { features: 'Features', audience: 'Who it’s for', company: 'Savour', help: 'Help' },
    faq: 'FAQ',
    guide: 'Guide',
    contact: 'Contact',
    terms: 'Terms and conditions',
    privacy: 'Privacy policy',
    bug: 'Report a problem',
    company: 'Savour · contact@savour.page',
    madeBy: 'Made by chefs, for chefs.',
    soon: 'Coming soon',
    readArticle: 'Read the article',
    blogLead: 'Practical articles about digitising recipes, organising recipe folders, your kitchen team and recipe management for restaurants.'
  }
};

// ---- Functies ----
export const FEATURES = [
  {
    id: 'digitise',
    nl: {
      slug: 'recepten-digitaliseren',
      menu: 'Recepten digitaliseren',
      short: "Word, PDF en foto's van handgeschreven recepten in één keer naar Savour.",
      title: 'Recepten digitaliseren: Word, PDF en handgeschreven kladjes | Savour',
      desc: "Digitaliseer je recepten zonder overtypen, in de receptenapp van Savour. Importeer Word en PDF in één keer en laat handgeschreven kladjes en foto's uitlezen. Hoeveelheden worden nooit verzonnen.",
      h1: 'Recepten digitaliseren zonder overtypen',
      lead: 'Je receptenschriften, Word-bestanden en kladjes met koffievlekken worden in één keer een geordend receptenboek.',
      kladje: true,
      sections: [
        ['Word en PDF in één keer', 'Sleep een Word-bestand of PDF in Savour, ook als er honderden recepten in staan. De Savour-lezer herkent zelf waar een recept begint en eindigt, en zet titel, ingrediënten en bereiding op de juiste plek. Nummers voor titels en kleine typfouten zoals 18oc in plaats van 180°C worden netjes opgeruimd. Een chef importeerde zo 1.400 recepten in ongeveer twee minuten.'],
        ['Handgeschreven recepten en foto’s', 'Maak een foto van een kladje, een bladzijde uit je schrift of een scan uit een oude map. De AI leest het handschrift en maakt er een net recept van. Dat werkt ook als de foto scheef is of het papier vlekken heeft. Dit is onderdeel van Savour Pro.'],
        [ "Orde in grote, rommelige receptenmappen", "Een map met honderden recepten van verschillende chefs, met nummers, losse kopjes en recepten die halverwege een pagina beginnen? Savour splitst ze zelf op, herkent onderdelen zoals deeg en vulling, verbetert bekende schrijffouten en stelt per recept een categorie voor. Recepten waar de lezer aan twijfelt, laat de AI met Savour Pro nog eens nalezen. Jij controleert alles in één overzicht voordat het wordt opgeslagen." ],
        ['Niets verzonnen', 'Een recept moet kloppen. Savour verzint nooit hoeveelheden, ingrediënten of stappen. Twijfelt de lezer, dan zie je dat recept gemarkeerd en kijk je het zelf na voordat het wordt opgeslagen.'],
        ["Van een website of een andere app","Plak de link van een recept op een website en Savour haalt het recept eruit. Stap je over van een andere recepten-app, zoals Paprika, Mealie, Tandoor, Recipe Keeper, Crouton, MasterCook, Copy Me That of Plan to Eat? Maak daar een export en zet het bestand in één keer in Savour."],
        ['Daarna gewoon verder werken', 'Elk geïmporteerd recept kun je aanpassen, aanvullen met een foto, in een map zetten en delen met je brigade.']
      ]
    },
    en: {
      slug: 'en/digitise-recipes',
      menu: 'Digitise recipes',
      short: 'Word, PDF and photos of handwritten recipes into Savour in one go.',
      title: 'Digitise recipes: Word, PDF and handwritten notes | Savour',
      desc: 'Digitise your recipes without retyping. Import Word and PDF in one go and have handwritten notes and photos read for you. Quantities are never made up.',
      h1: 'Digitise your recipes without retyping',
      lead: 'Your recipe notebooks, Word files and coffee-stained notes become one organised recipe book in one go.',
      kladje: true,
      sections: [
        ['Word and PDF in one go', 'Drop a Word file or PDF into Savour, even if it holds hundreds of recipes. The Savour reader works out where each recipe starts and ends, and puts the title, ingredients and method in the right place. Numbers before titles and small typos such as 18oc instead of 180°C are cleaned up. One chef imported 1,400 recipes this way in about two minutes.'],
        ['Handwritten recipes and photos', 'Take a photo of a note, a page from your notebook or a scan from an old binder. The AI reads the handwriting and turns it into a clean recipe, even when the photo is crooked or the paper is stained. This is part of Savour Pro.'],
        [ "Order in large, messy recipe folders", "A binder with hundreds of recipes from different chefs, with numbers, loose headings and recipes that start halfway down a page? Savour splits them up itself, recognises parts such as dough and filling, corrects common spelling mistakes and suggests a category for each recipe. Recipes the reader is unsure about are read again by the AI with Savour Pro. You check everything in one overview before it is saved." ],
        ['Nothing made up', 'A recipe has to be right. Savour never invents quantities, ingredients or steps. If the reader is unsure, the recipe is flagged and you check it yourself before it is saved.'],
        ["From a website or another app","Paste the link to a recipe on a website and Savour pulls out the recipe. Moving from another recipe app, such as Paprika, Mealie, Tandoor, Recipe Keeper, Crouton, MasterCook, Copy Me That or Plan to Eat? Make an export there and bring the file into Savour in one go."],
        ['Then simply carry on', 'Every imported recipe can be edited, given a photo, put in a folder and shared with your brigade.']
      ]
    }
  },
  {
    id: 'organise',
    nl: {
      slug: 'recepten-organiseren',
      menu: 'Recepten organiseren',
      short: 'Mappen, categorieën en zoeken op ingrediënt. Je beurre blanc in drie seconden.',
      title: 'Recepten organiseren: receptbeheer en receptmanagement voor restaurants | Savour',
      desc: 'Recepten organiseren op één culinair receptenplatform: receptmanagement voor restaurants en de horeca, met eigen mappen en categorieën, zoeken op ingrediënt en favorieten.',
      h1: 'Recepten organiseren zoals jouw keuken werkt',
      lead: 'Eén receptenboek voor alles wat je ooit hebt gemaakt, ingedeeld op jouw manier.',
      sections: [
        ['Jouw indeling', 'Sauzen, fonds, garnituren, patisserie, het proeverijmenu van dit seizoen. Je maakt zelf mappen en categorieën. Een recept kan in meerdere mappen staan, zodat je jus zowel bij de fonds als bij het lammenu hoort. Zo blijft het receptbeheer van je restaurant overzichtelijk, ook met honderden recepturen.'],
        ['Zoeken op wat je weet', 'Weet je alleen nog dat er yuzu in zat? Savour zoekt in titels, ingrediënten en bereiding. Of blader van A tot Z door je hele boek.'],
        ['Rustig en snel', 'Geen overvolle schermen. Een lijst met titels, een ster voor je favorieten en één tik naar het recept. Gemaakt om midden in de service snel iets op te zoeken.'],
        ['Op elk apparaat', 'Op de computer orden en importeer je, in de keuken gebruik je je telefoon of tablet met grote letters in de kookmodus. Er hoeft niets geïnstalleerd te worden.']
      ]
    },
    en: {
      slug: 'en/organise-recipes',
      menu: 'Organise recipes',
      short: 'Folders, categories and search by ingredient. Your beurre blanc in three seconds.',
      title: 'Organise recipes: recipe management for restaurants | Savour',
      desc: 'Recipe management for restaurants and hospitality: all your recipes in one recipe book, with your own folders and categories, search by ingredient and favourites.',
      h1: 'Organise recipes the way your kitchen works',
      lead: 'One recipe book for everything you have ever made, arranged your way.',
      sections: [
        ['Your structure', 'Sauces, stocks, garnishes, pastry, this season’s tasting menu. You create the folders and categories. A recipe can live in several folders, so your jus belongs to both the stocks and the lamb course.'],
        ['Search by what you remember', 'Only remember there was yuzu in it? Savour searches titles, ingredients and method. Or browse your whole book from A to Z.'],
        ['Calm and quick', 'No crowded screens. A list of titles, a star for your favourites and one tap to the recipe. Made for looking something up in the middle of service.'],
        ['On every device', 'Organise and import on the computer, use your phone or tablet in the kitchen with large text in cook mode. Nothing to install.']
      ]
    }
  },
  {
    id: 'share',
    nl: {
      slug: 'recepten-delen',
      menu: 'Delen met je brigade',
      short: 'Keukenteams met rechten: jij beheert, je sous-chef past aan, de rest kijkt mee.',
      title: 'Recepturen delen met je keukenteam en brigade | Savour',
      desc: 'Deel recepturen met je keukenteam via keukenteams op het receptenplatform, met rechten per persoon. Iedereen in je restaurant werkt met dezelfde versie in de app, van sous-chef tot stagiair.',
      h1: 'Recepturen delen met je brigade',
      lead: 'Iedereen in de keuken werkt met dezelfde versie. Geen foto’s van foto’s in de groepsapp meer.',
      sections: [
        ['Keukenteams', 'Maak een map voor je keuken, je partie of het nieuwe menu en nodig je team uit. Wat jij aanpast, ziet iedereen direct.'],
        ['Rechten per persoon', 'Jij beheert de map. Je sous-chef of chef de partie mag recepten toevoegen en aanpassen. Commis en stagiairs kunnen meekijken, maar niets veranderen.'],
        ['Nieuwe mensen sneller ingewerkt', 'Een nieuwe kok heeft op de eerste dag alle recepten van de partie op de telefoon, in de versie die jij hebt goedgekeurd.'],
        ['Losse recepten delen', 'Wil je één recept doorsturen, bijvoorbeeld naar een collega in een andere zaak? Deel het met een link.']
      ]
    },
    en: {
      slug: 'en/share-recipes',
      menu: 'Share with your brigade',
      short: 'Kitchen teams with rights: you manage, your sous-chef edits, the rest can view.',
      title: 'Share recipes with your kitchen team and brigade | Savour',
      desc: 'Share recipes with your kitchen team in kitchen teams with rights. Everyone works from the same version, from sous-chef to intern.',
      h1: 'Share recipes with your brigade',
      lead: 'Everyone in the kitchen works from the same version. No more photos of photos in the group chat.',
      sections: [
        ['Kitchen teams', 'Create a folder for your kitchen, your section or the new menu and invite your team. What you change, everyone sees straight away.'],
        ['Rights per person', 'You manage the folder. Your sous-chef or chef de partie can add and edit recipes. Commis and interns can view but not change anything.'],
        ['New people up to speed faster', 'A new cook has every recipe of the section on their phone on day one, in the version you approved.'],
        ['Share single recipes', 'Want to send one recipe, for example to a colleague at another restaurant? Share it with a link.']
      ]
    }
  },
  {
    id: 'scale',
    nl: {
      slug: 'recepten-opschalen',
      menu: 'Recepten opschalen',
      short: 'Van 8 couverts naar 120, zonder rekenfouten.',
      title: 'Recepten opschalen en omrekenen voor elke opbrengst | Savour',
      desc: 'Schaal recepten op of af naar elke opbrengst: van een proeverij voor 8 naar een diner voor 120. Savour rekent alle hoeveelheden om.',
      h1: 'Recepten opschalen naar elke opbrengst',
      lead: 'Van een proeverij voor 8 naar een diner voor 120, zonder rekenmachine en zonder fouten.',
      sections: [
        ['Omrekenen in één keer', 'Vul de opbrengst in die je nodig hebt en Savour rekent alle hoeveelheden om. Het originele recept blijft gewoon staan.'],
        ["Begrijpt eenheden","Savour weet dat 3 theelepels één eetlepel zijn en 1000 gram een kilo. 20 theelepels worden 6 ⅔ eetlepels, en lepels en cups blijven nette breuken in plaats van lange decimalen. Ook zonder opbrengst reken je met één tik ½×, 2×, 3× of 4× om."],
        ['Rekenen met stuks', 'Haal je 50 brownies uit één recept en heb je er 1.000 nodig voor een evenement? Vul het aantal stuks in en je ziet meteen wat je moet afwegen.'],
        ['Klaar voor de mise-en-place', 'Het omgerekende recept print je direct, of je zet het op je telefoon in de kookmodus.']
      ]
    },
    en: {
      slug: 'en/scale-recipes',
      menu: 'Scale recipes',
      short: 'From 8 covers to 120, without calculation errors.',
      title: 'Scale and convert recipes to any yield | Savour',
      desc: 'Scale recipes up or down to any yield: from a tasting for 8 to a dinner for 120. Savour converts every quantity.',
      h1: 'Scale recipes to any yield',
      lead: 'From a tasting for 8 to a dinner for 120, without a calculator and without mistakes.',
      sections: [
        ['Convert in one go', 'Enter the yield you need and Savour converts every quantity. The original recipe stays as it is.'],
        ["Understands units","Savour knows that 3 teaspoons make a tablespoon and 1000 grams a kilo. 20 teaspoons become 6 ⅔ tablespoons, and spoons and cups stay clean fractions instead of long decimals. Even without a yield, scale with one tap: ½×, 2×, 3× or 4×."],
        ['Counting in pieces', 'One recipe makes 50 brownies and you need 1,000 for an event? Enter the number of pieces and you immediately see what to weigh out.'],
        ['Ready for mise en place', 'Print the converted recipe straight away, or open it on your phone in cook mode.']
      ]
    }
  },
  {
    id: 'print',
    nl: {
      slug: 'recepten-printen',
      menu: 'Printen van recepten',
      short: 'Een los recept of een complete receptenmap in één keer, netjes geprint voor de keuken.',
      title: 'Printen van recepten: losse recepten en complete receptenmappen | Savour',
      desc: 'Print een los recept of een complete receptenmap in één keer, netjes opgemaakt voor de muur, de pass of de receptenklapper. Met Savour Pro met het logo van je restaurant.',
      h1: 'Printen van recepten',
      lead: 'Print één recept voor aan de muur, of een complete receptenmap voor de klapper. Snel, netjes en altijd de versie die klopt.',
      sections: [
        ['Een los recept printen', 'Open een recept en kies Printen. Je krijgt één rustige pagina met titel, opbrengst, ingrediënten en bereiding. Heb je het recept omgerekend, bijvoorbeeld naar 40 couverts, dan print je precies die hoeveelheden.'],
        ['Een complete receptenmap printen', 'Moeten alle ijsrecepten in de klapper voor de patisserie? Open de map en print hem in één keer: elk recept op een eigen pagina, in de volgorde van je map. Geen vijftig bestanden meer één voor één.'],
        ['Rustige opmaak', 'Groot en overzichtelijk. Leesbaar op een meter afstand, ook met een vlek erop.'],
        ['Altijd de laatste versie', 'Omdat je print vanuit Savour, hangt er altijd de versie aan de muur die nu klopt. Onderaan staat de printdatum, zodat je ziet of een map nog actueel is.'],
        ['Met het logo van je restaurant', 'Met Savour Pro staat bovenaan elke pagina het logo en de naam van je restaurant. Binnen een organisatie geldt het logo voor iedereen. Kies A4 voor de klapper of A5 voor een kleine map aan de pass.']
      ]
    },
    en: {
      slug: 'en/print-recipes',
      menu: 'Printing recipes',
      short: 'A single recipe or a complete recipe folder in one go, neatly printed for the kitchen.',
      title: 'Printing recipes: single recipes and complete recipe folders | Savour',
      desc: 'Print a single recipe or a complete recipe folder in one go, neatly laid out for the wall, the pass or the kitchen binder. With Savour Pro, with your restaurant’s logo.',
      h1: 'Printing recipes',
      lead: 'Print one recipe for the wall, or a complete recipe folder for the binder. Quick, neat and always the version that is right.',
      sections: [
        ['Print a single recipe', 'Open a recipe and choose Print. You get one calm page with title, yield, ingredients and method. Scaled the recipe, for example to 40 covers? Then you print exactly those quantities.'],
        ['Print a complete recipe folder', 'All the ice cream recipes need to go in the pastry binder? Open the folder and print it in one go: every recipe on its own page, in the order of your folder. No more fifty files one by one.'],
        ['Calm layout', 'Large and clear. Readable from a metre away, even with a stain on it.'],
        ['Always the latest version', 'Because you print from Savour, the version on the wall is always the one that is right now. The print date is at the bottom, so you can see whether a binder is still up to date.'],
        ['With your restaurant’s logo', 'With Savour Pro every page carries your restaurant’s logo and name at the top. Within a team the logo applies to everyone. Choose A4 for the binder or A5 for a small folder at the pass.']
      ]
    }
  },
  {
    id: 'cloud',
    nl: {
      "slug": "recepten-database",
      "menu": "Receptendatabase en archief",
      "short": "Al je recepten veilig in de cloud, online en offline op elk apparaat.",
      "title": "Receptendatabase en receptenarchief in de cloud, ook offline | Savour",
      "desc": "Savour is je receptendatabase en receptenarchief in de cloud: al je recepturen veilig online opgeslagen, op computer, tablet en telefoon, en ook zonder internet te openen in de keuken.",
      "h1": "Je receptendatabase, online en offline",
      "lead": "Al je recepten op één veilige plek in de cloud. Op elk apparaat, ook als de wifi in de koelcel wegvalt.",
      "sections": [
        [
          "Eén receptendatabase in de cloud",
          "Al je recepturen staan op één plek in de cloud, niet meer verspreid over laptops, telefoons en usb-sticks. Gaat je telefoon kapot of krijg je een nieuwe laptop, dan log je in en staat alles er weer. Wat je op de computer aanpast, zie je meteen op je telefoon."
        ],
        [
          "Op elk apparaat",
          "Op de computer importeer en orden je, in de keuken open je hetzelfde recept op je telefoon of tablet. Savour werkt in de browser en zet je zonder app store op je beginscherm: op iPhone, Android, tablet en computer."
        ],
        [
          "Ook offline",
          "In de koelcel, de kelder of op een evenement valt de wifi vaak weg. Heb je Savour één keer met internet geopend, dan staat je bibliotheek op je toestel en open je je recepten ook zonder verbinding. Aanpassen kan weer zodra je online bent."
        ],
        [
          "Een archief dat blijft",
          "Oude seizoensmenu’s, recepten van een vorige chef, het proeverijmenu van drie jaar geleden: in Savour raak je niets kwijt. Zet ze in een archiefmap en ze blijven doorzoekbaar. Stop je ooit met Pro, dan blijven al je recepten gewoon staan."
        ],
        [
          "Veilig en van jou",
          "Je recepten zijn alleen zichtbaar voor jou en voor wie jij uitnodigt in een keukenteam; ze worden per account afgeschermd opgeslagen. Met Savour Pro download je je hele receptenboek wanneer je wilt, als Word-bestanden of als back-up."
        ]
      ]
    },
    en: {
      "slug": "en/recipe-database",
      "menu": "Recipe database and archive",
      "short": "All your recipes safe in the cloud, online and offline on every device.",
      "title": "Recipe database and recipe archive in the cloud, also offline | Savour",
      "desc": "Savour is your recipe database and recipe archive in the cloud: all your recipes stored safely online, on computer, tablet and phone, and available without internet in the kitchen.",
      "h1": "Your recipe database, online and offline",
      "lead": "All your recipes in one safe place in the cloud. On every device, even when the wifi drops out in the walk-in.",
      "sections": [
        [
          "One recipe database in the cloud",
          "All your recipes live in one place in the cloud, no longer scattered across laptops, phones and USB sticks. If your phone breaks or you get a new laptop, you log in and everything is back. What you change on the computer, you see on your phone straight away."
        ],
        [
          "On every device",
          "Import and organise on the computer, open the same recipe on your phone or tablet in the kitchen. Savour runs in the browser and goes on your home screen without an app store: on iPhone, Android, tablet and computer."
        ],
        [
          "Offline too",
          "In the walk-in, the basement or at an event the wifi often drops out. Once you have opened Savour with internet, your library is stored on your device and you can open your recipes without a connection. Editing works again as soon as you are back online."
        ],
        [
          "An archive that lasts",
          "Old seasonal menus, recipes from a previous chef, the tasting menu from three years ago: in Savour you lose nothing. Put them in an archive folder and they stay searchable. If you ever stop Pro, all your recipes simply stay."
        ],
        [
          "Safe and yours",
          "Your recipes are only visible to you and to the people you invite to a kitchen team; they are stored separately per account. With Savour Pro you can download your whole recipe book whenever you like, as Word files or as a backup."
        ]
      ]
    }
  },
  {
    id: 'roadmap',
    soon: true,
    nl: {
      slug: 'binnenkort',
      menu: 'Binnenkort in Savour',
      short: 'Kostprijs per recept, allergenen en de geschiedenis van elk recept.',
      title: 'Binnenkort in Savour: kostprijs, allergenen en meer',
      desc: 'Waar we aan werken: kostprijs per recept, allergenen per gerecht, de geschiedenis van elk recept en een app voor iPhone en Android.',
      h1: 'Waar we aan werken',
      lead: 'Savour groeit met de keuken mee. Dit staat op de planning. Mis je iets? Laat het ons weten.',
      sections: [
        ['Kostprijs per recept', 'Zie per gerecht en per portie wat het kost, en wat er gebeurt als de prijs van een product verandert.'],
        ['Allergenen in één oogopslag', 'Per recept en per samengesteld gerecht, zodat je een vraag van een gast aan tafel direct kunt beantwoorden.'],
        ['Geschiedenis van elk recept', 'Zie wie wat heeft aangepast in een gedeeld recept, en zet zo nodig een eerdere versie terug.'],
        ['Een app voor iPhone en Android', 'Savour werkt nu in de browser op elk apparaat. Een losse app overwegen we, en jouw feedback telt mee.']
      ]
    },
    en: {
      slug: 'en/roadmap',
      menu: 'Coming soon',
      short: 'Cost per recipe, allergens and the history of every recipe.',
      title: 'Coming soon to Savour: costing, allergens and more',
      desc: 'What we are working on: cost per recipe, allergens per dish, the history of every recipe and an app for iPhone and Android.',
      h1: 'What we are working on',
      lead: 'Savour grows with the kitchen. This is on the roadmap. Missing something? Let us know.',
      sections: [
        ['Cost per recipe', 'See what each dish and each portion costs, and what happens when the price of a product changes.'],
        ['Allergens at a glance', 'Per recipe and per composed dish, so you can answer a guest’s question at the table straight away.'],
        ['History of every recipe', 'See who changed what in a shared recipe, and restore an earlier version when needed.'],
        ['An app for iPhone and Android', 'Savour now works in the browser on every device. We are considering a separate app, and your feedback counts.']
      ]
    }
  }
];

// ---- Voor wie ----
export const AUDIENCES = [
  {
    id: 'chefs',
    nl: {
      slug: 'voor-koks',
      menu: 'Koks',
      short: 'Voor chefs, sous-chefs en patissiers die hun recepturen willen bewaren.',
      title: 'Receptenapp en receptenplatform voor koks en chefs | Savour',
      desc: 'Savour is het culinaire platform voor koks in restaurants en de horeca: chefs, sous-chefs en patissiers. Al je recepturen georganiseerd op één plek, precies zoals je ze schreef.',
      h1: 'Voor koks',
      lead: 'Of je nu de keuken leidt, de sauzen maakt of in de patisserie staat: je recepten moeten kloppen en vindbaar zijn.',
      sections: [
        ['Jouw recepturen, één plek', 'Seizoensmenu’s, proeverijen, basisrecepten van jaren terug. In Savour staat het in één receptenboek, ingedeeld zoals jij werkt.'],
        ['Precies, tot op de gram', 'In de patisserie is een recept een formule. Savour bewaart je recepten precies zoals je ze schreef en verzint nooit hoeveelheden. Twijfelt de lezer bij een import, dan kijk je het zelf na.'],
        ['Opschalen op couverts en stuks', 'Van een proeverij voor 8 naar een diner voor 120, of van 50 bonbons naar 800. Savour rekent alles om.'],
        ['Je kennis bewaard', 'Wat je in de loop der jaren hebt opgebouwd, staat niet meer alleen in een schrift of in je hoofd. Het blijft, ook als je van keuken wisselt.']
      ]
    },
    en: {
      slug: 'en/for-chefs',
      menu: 'Chefs',
      short: 'For chefs, sous-chefs and pastry chefs who want to keep their recipes.',
      title: 'Recipe app for chefs, sous-chefs and pastry chefs | Savour',
      desc: 'Savour is made for cooks in the professional kitchen: chefs, sous-chefs and pastry chefs. All your recipes in one place, exactly as you wrote them.',
      h1: 'For chefs',
      lead: 'Whether you run the kitchen, make the sauces or work in pastry: your recipes have to be right and easy to find.',
      sections: [
        ['Your recipes, one place', 'Seasonal menus, tasting menus, base recipes from years ago. In Savour it is all in one recipe book, arranged the way you work.'],
        ['Precise, to the gram', 'In pastry a recipe is a formula. Savour keeps your recipes exactly as you wrote them and never invents quantities. If the reader is unsure during an import, you check it yourself.'],
        ['Scale by covers and pieces', 'From a tasting for 8 to a dinner for 120, or from 50 bonbons to 800. Savour converts everything.'],
        ['Your knowledge kept', 'What you have built up over the years no longer lives only in a notebook or in your head. It stays, even when you change kitchens.']
      ]
    }
  },
  {
    id: 'brigade',
    nl: {
      slug: 'voor-keukenbrigades',
      menu: 'Keukenbrigades',
      short: 'Voor het hele team: chef de parties, commis en stagiairs.',
      title: 'Receptenmanagement voor keukenbrigades | Savour',
      desc: 'Savour voor keukenbrigades: chef de parties, commis en stagiairs werken met dezelfde recepten in de app, op hun eigen telefoon. Receptmanagement waarbij jij bepaalt wie wat mag.',
      h1: 'Voor keukenbrigades',
      lead: 'Van chef de partie tot stagiair: je hele keukenteam kookt van hetzelfde recept, in elk restaurant en elke horecazaak waar je werkt.',
      sections: [
        ['Eén versie voor iedereen', 'Pas je een saus aan voor het nieuwe menu, dan werkt iedereen in het keukenteam direct met de nieuwe versie.'],
        ['Rechten per persoon', 'Jij beheert de map. Je sous-chef of chef de partie mag recepten toevoegen en aanpassen. Commis en stagiairs kunnen meekijken, maar niets veranderen.'],
        ['Op je eigen telefoon', 'Geen keukenteam met vlekken meer. Elk lid van het team opent de recepten van de partie op de eigen telefoon, met grote letters in de kookmodus.'],
        ['Nieuwe mensen sneller ingewerkt', 'Stagiairs en nieuwe koks lezen hoe het hier gedaan wordt, in plaats van het te moeten vragen tijdens de service. Lid zijn van een keukenteam is gratis; met een teamabonnement krijgt iedereen Savour Pro.']
      ]
    },
    en: {
      slug: 'en/for-kitchen-brigades',
      menu: 'Kitchen brigades',
      short: 'For the whole team: chefs de partie, commis and interns.',
      title: 'Recipe management for kitchen brigades | Savour',
      desc: 'Savour for kitchen brigades: chefs de partie, commis and interns work from the same recipes, on their own phones. You decide who can do what.',
      h1: 'For kitchen brigades',
      lead: 'From chef de partie to intern: your whole kitchen team cooks from the same recipe, in every restaurant you run.',
      sections: [
        ['One version for everyone', 'Adjust a sauce for the new menu and everyone in the kitchen team works with the new version straight away.'],
        ['Rights per person', 'You manage the folder. Your sous-chef or chef de partie can add and edit recipes. Commis and interns can view but not change anything.'],
        ['On your own phone', 'No more shared binder full of stains. Every member of the brigade opens the section’s recipes on their own phone, with large text in cook mode.'],
        ['New people up to speed faster', 'Interns and new cooks read how things are done here, instead of having to ask during service. Being a member of a kitchen team is free; with a team plan everyone gets Savour Pro.']
      ]
    }
  }
];

// ---- Over ons: het verhaal achter Savour (kern van het verhaal van de eigenaar, zonder namen) ----
export const STORY = {
  nl: {
    slug: 'over-savour',
    title: 'Over Savour: gebouwd door een chef, niet door een softwarebedrijf',
    desc: 'Het verhaal achter Savour: vijftien jaar recepten op losse papiertjes, vijftig keer op printen drukken, en een culinair receptenplatform dat na de service is gebouwd.',
    h1: 'Het verhaal achter Savour',
    lead: 'Savour is gebouwd door een chef, niet door een softwarebedrijf. Uit frustratie over recepten die overal lagen, behalve op de plek waar je ze nodig had.',
    chapters: [
      ['Vijftien jaar recepten op losse papiertjes', [
        'De chef achter Savour staat al vijftien jaar in de keuken. In al die tijd waren de recepten een rommeltje: papiertjes met koffievlekken, foto’s op verschillende telefoons, waarvan er een paar kapotgingen voordat de recepten waren veiliggesteld, en Word-documenten verspreid over mappen en laptops.',
        'Het lastigste was niet eens de rommel zelf, maar dat niets op één plek stond. Op het moment dat je een recept nodig had, midden in de mise-en-place of vlak voor de service, was het nergens te vinden.'
      ]],
      ['Vijftig keer op printen drukken', [
        'Als headchef lever je bijna alle recepten aan je koks. Toen eindelijk alles in losse Word-bestanden stond, kwam het volgende probleem: de bediening moest ze één voor één printen, omdat er geen manier was om er vijftig tegelijk af te drukken.',
        'Ergens tussen die stapels papier ontstond de vraag waar Savour mee begon: waarom bestaat hier niets voor dat gewoon werkt in een echte keuken?'
      ]],
      ['Gebouwd na de service', [
        'Geen programmeur, wel een chef die precies weet waar het knelt. Savour is stap voor stap gebouwd, maandenlang, in de weekenden en na de service.',
        'Elke functie is getest op de eigen recepten, in de eigen keuken: honderden Word-recepten tegelijk importeren, foto’s van kladjes met vlekken die er per ongeluk ondersteboven op staan, en mappen die het hele team kan openen. Een chef importeerde zo 1.400 recepten in ongeveer twee minuten.'
      ]],
      ['Waarom Savour €2,99 kost', [
        'Voor de moeilijke gevallen, zoals een foto van een handgeschreven kladje, gebruikt Savour AI. Dat kost per keer geld, en daarom bestaat Savour Pro.',
        'Maar Savour moest betaalbaar blijven voor elke kok, niet alleen voor grote groepen met een groot budget. €2,99 per maand is ongeveer wat die AI kost. Wat Savour zelf kan lezen, zoals Word en PDF, blijft gratis, net als tot 100 recepten bewaren.'
      ]],
      ['Wat Savour nu kan', [
        'Je hele receptenboek in een paar minuten importeren. Recepten ordenen in mappen, bijvoorbeeld al je ijsrecepten, en die hele map met één druk op de knop printen. Recepten en mappen delen met collega’s, die er zelf weer recepten aan kunnen toevoegen.',
        'En opschalen: haal je vijftig brownies uit één recept en heb je er duizend nodig, dan rekent Savour het om. Op de computer, de tablet en de telefoon in de keuken.'
      ]],
      ['Wat we nog willen bouwen', [
        'Kostprijs per recept en allergenen in één oogopslag staan bovenaan de lijst. Werkt Savour goed op computer, tablet en telefoon, dan kijken we of een eigen app voor iPhone en Android de investering waard is.',
        'Dat bepalen we niet achter een bureau, maar samen met de chefs die Savour gebruiken. Mis je iets in je keuken? Laat het ons weten.'
      ]]
    ],
    notesCaption: 'Een paar van de kladjes waar Savour mee begon.',
    appCaption: 'Hetzelfde soort recept, nu in Savour.',
    roadmapLink: 'Bekijk waar we aan werken',
    values: [
      ['Een recept moet kloppen', 'Savour verzint nooit hoeveelheden of stappen. Bij twijfel zie je het en beslis jij.'],
      ['Je kennis is van jou', 'Stop je ooit met Pro, dan blijven al je recepten gewoon staan.'],
      ['Gemaakt voor de keuken', 'Snel, rustig en leesbaar, ook met natte handen midden in de service.']
    ],
    valuesTitle: 'Waar we voor staan'
  },
  en: {
    slug: 'en/about',
    title: 'About Savour: built by a chef, not by a software company',
    desc: 'The story behind Savour: fifteen years of recipes on loose scraps of paper, pressing print fifty times, and a recipe app built after service.',
    h1: 'The story behind Savour',
    lead: 'Savour was built by a chef, not by a software company. Out of frustration with recipes that were everywhere, except where you needed them.',
    chapters: [
      ['Fifteen years of recipes on loose scraps', [
        'The chef behind Savour has been in kitchens for fifteen years. All that time the recipes were a mess: coffee-stained scraps of paper, photos on different phones, some of which broke before the recipes were saved, and Word documents scattered across folders and laptops.',
        'The hardest part was not even the mess itself, but that nothing was in one place. The moment you needed a recipe, in the middle of mise en place or just before service, it was nowhere to be found.'
      ]],
      ['Pressing print fifty times', [
        'As head chef you hand almost every recipe to your cooks. When everything was finally in separate Word files, the next problem appeared: front of house had to print them one by one, because there was no way to print fifty at once.',
        'Somewhere between those piles of paper came the question Savour started with: why is there nothing for this that simply works in a real kitchen?'
      ]],
      ['Built after service', [
        'Not a developer, but a chef who knows exactly where it hurts. Savour was built step by step, for months, at weekends and after service.',
        'Every feature was tested on our own recipes, in our own kitchen: importing hundreds of Word recipes at once, photos of stained notes that are accidentally upside down, and folders the whole team can open. One chef imported 1,400 recipes this way in about two minutes.'
      ]],
      ['Why Savour costs €2.99', [
        'For the hard cases, such as a photo of a handwritten note, Savour uses AI. That costs money every time, which is why Savour Pro exists.',
        'But Savour had to stay affordable for every cook, not only for large groups with big budgets. €2.99 a month is roughly what that AI costs. What Savour can read by itself, such as Word and PDF, stays free, as does keeping up to 100 recipes.'
      ]],
      ['What Savour does today', [
        'Import your whole recipe book in a few minutes. Organise recipes in folders, for example all your ice cream recipes, and print that whole folder with one press of a button. Share recipes and folders with colleagues, who can add recipes to them themselves.',
        'And scale: one recipe makes fifty brownies and you need a thousand? Savour does the maths. On the computer, the tablet and the phone in the kitchen.'
      ]],
      ['What we still want to build', [
        'Cost per recipe and allergens at a glance are at the top of the list. If Savour works well on computer, tablet and phone, we will see whether a separate app for iPhone and Android is worth the investment.',
        'We do not decide that behind a desk, but together with the chefs who use Savour. Missing something in your kitchen? Let us know.'
      ]]
    ],
    notesCaption: 'A few of the notes Savour started with.',
    appCaption: 'The same kind of recipe, now in Savour.',
    roadmapLink: 'See what we are working on',
    values: [
      ['A recipe has to be right', 'Savour never invents quantities or steps. When in doubt, you see it and you decide.'],
      ['Your knowledge is yours', 'If you ever stop Pro, all your recipes simply stay.'],
      ['Made for the kitchen', 'Fast, calm and readable, even with wet hands in the middle of service.']
    ],
    valuesTitle: 'What we stand for'
  }
};

// ---- Startpagina ----
export const HOME = {
  nl: {
    h1: 'Je hele receptenboek, op elke telefoon in de keuken.',
    lead: 'Savour is het receptenplatform voor de professionele, culinaire keuken: een receptenapp voor receptbeheer en het organiseren van al je recepturen. Je Word-bestanden, PDF’s en handgeschreven kladjes worden één geordend receptenboek, voor jou en je hele keukenteam. Veilig in de cloud, op elk apparaat en ook offline.',
    proof: '1.400 recepten uit Word geïmporteerd in 2 minuten. Getest in onze eigen keuken.',
    story: [
      'Op de achterkant van een bon. In een schrift dat na tien jaar service aan elkaar plakt. Op een foto die je ooit bij de pas maakte. Die kladjes zijn de kennis van je keuken, en ze raken kwijt, vervagen of zijn alleen leesbaar voor degene die ze schreef.',
      'Savour is gemaakt om die kennis te bewaren. Niet door alles over te typen, maar door je kladjes, mappen en bestanden in één keer om te zetten in recepten die kloppen en die je hele brigade kan lezen.'
    ],
    storyLink: 'Lees ons verhaal',
    featuresTitle: 'Wat Savour doet',
    audienceTitle: 'Voor wie',
    soonTitle: 'Waar we aan werken',
    soonLink: 'Bekijk wat er komt',
    priceTitle: 'Gratis beginnen',
    price: 'Tot 100 recepten gratis, met de Savour-lezer voor Word, PDF en tekst. Savour Pro kost €2,99 per maand of €29 per jaar: onbeperkt recepten, AI voor handgeschreven kladjes en foto’s, en je eigen keukenteams. Teams vanaf €1,20 per persoon.',
    priceLink: 'Bekijk de prijzen',
    faqTitle: 'Vragen over Savour',
    faq: [
      ['Wat is Savour?', 'Savour is een receptenplatform en receptenapp voor de professionele, culinaire keuken. Je organiseert al je recepturen op één plek, importeert ze uit Word, PDF of handgeschreven kladjes en deelt ze met je keukenteam: receptmanagement op computer, tablet en telefoon.'],
      ['Welke app gebruik ik om recepten te organiseren voor mijn restaurant?', 'Savour is gemaakt voor professionele keukens: je importeert je bestaande recepten, ordent ze in mappen en deelt ze met je team. Je begint gratis.'],
      ['Hoe digitaliseer ik handgeschreven recepten?', 'Maak een foto van het recept en upload hem in Savour. De AI zet hem om in een net recept met ingrediënten en bereiding, dat je daarna controleert.'],
      ['Kan ik recepten uit Word of PDF importeren?', 'Ja. Ook een bestand met honderden recepten tegelijk; Savour splitst ze zelf op.'],
      ['Hoe deel ik recepten met mijn keukenteam?', "Met een keukenteam. Je nodigt collega's uit en geeft ze rechten om mee te kijken of mee te werken."],
      ['Is Savour geschikt voor receptbeheer in de horeca?', 'Ja. Savour is gebouwd voor restaurants, hotels en catering: recepturen centraal beheren, delen met je keukenteam en ordenen per partie, menu of vestiging.'],
      [ "Werkt Savour ook offline?", "Ja. Open Savour één keer met internet en zet het op je beginscherm; daarna open je je recepten ook zonder verbinding, bijvoorbeeld in de koelcel. Aanpassen kan weer zodra je online bent." ],
      [ "Waar worden mijn recepten opgeslagen?", "In de cloud, afgeschermd per account. Je opent ze op computer, tablet en telefoon, en alleen jij en wie je uitnodigt in een keukenteam kunnen ze lezen." ],
      [ "Kan ik een hele receptenmap in één keer printen?", "Ja. Print losse recepten of een complete receptenmap in één keer, netjes opgemaakt voor de klapper in de keuken. Met Savour Pro staat het logo van je restaurant erop." ],
      ['Is Savour ook voor thuiskoks?', 'Het kan, maar Savour is gebouwd voor de professionele keuken: grote receptenboeken, teams en de service.']
    ]
  },
  en: {
    h1: 'Your whole recipe book, on every phone in the kitchen.',
    lead: 'Savour is the recipe management app for professional kitchens. Your Word files, PDFs and handwritten notes become one organised recipe book, for you and your whole kitchen team. Safe in the cloud, on every device and offline too.',
    proof: '1,400 recipes imported from Word in 2 minutes. Tested in our own kitchen.',
    story: [
      'On the back of a ticket. In a notebook that sticks together after ten years of service. In a photo you once took at the pass. Those notes are your kitchen’s knowledge, and they get lost, fade, or can only be read by the person who wrote them.',
      'Savour is made to keep that knowledge. Not by retyping everything, but by turning your notes, binders and files into recipes that are right and that your whole brigade can read, in one go.'
    ],
    storyLink: 'Read our story',
    featuresTitle: 'What Savour does',
    audienceTitle: 'Who it’s for',
    soonTitle: 'What we are working on',
    soonLink: 'See what is coming',
    priceTitle: 'Start for free',
    price: 'Up to 100 recipes free, with the Savour reader for Word, PDF and text. Savour Pro costs €2.99 per month or €29 per year: unlimited recipes, AI for handwritten notes and photos, and your own kitchen teams. Teams from €1.20 per person.',
    priceLink: 'See pricing',
    faqTitle: 'Questions about Savour',
    faq: [
      ['Which app do I use to organise recipes for my restaurant?', 'Savour is made for professional kitchens: you import your existing recipes, organise them in folders and share them with your team. You start for free.'],
      ['How do I digitise handwritten recipes?', 'Take a photo of the recipe and upload it to Savour. The AI turns it into a clean recipe with ingredients and method, which you then check.'],
      ['Can I import recipes from Word or PDF?', 'Yes. Even a file with hundreds of recipes at once; Savour splits them up itself.'],
      ['How do I share recipes with my kitchen team?', 'With a kitchen team. You invite colleagues and give them rights to view or to edit.'],
      ['Is Savour suitable for recipe management in hospitality?', 'Yes. Savour is built for restaurants, hotels and catering: manage recipes centrally, share them with your kitchen team and organise them by section, menu or location.'],
      [ "Does Savour work offline?", "Yes. Open Savour once with internet and add it to your home screen; after that you can open your recipes without a connection, for example in the walk-in. Editing works again as soon as you are online." ],
      [ "Where are my recipes stored?", "In the cloud, kept separate per account. You open them on computer, tablet and phone, and only you and the people you invite to a kitchen team can read them." ],
      [ "Can I print a whole recipe folder at once?", "Yes. Print single recipes or a complete recipe folder at once, neatly laid out for the binder in the kitchen. With Savour Pro your restaurant’s logo is on it." ],
      ['Is Savour for home cooks too?', 'It can be, but Savour is built for the professional kitchen: big recipe books, teams and service.']
    ]
  }
};

// ---- Blog ----
export const POSTS = [
  {
    id: 'notes',
    date: '2026-10-22',
    nl: {
      slug: 'blog/oude-kladjes-digitaliseren',
      title: 'Oude kladjes digitaliseren: zo red je je receptenschriften',
      desc: 'Handgeschreven recepten vervagen en raken kwijt. Zo zet je je oude schriften en kladjes stap voor stap om in een digitaal receptenboek, zonder alles over te typen.',
      h1: 'Oude kladjes digitaliseren: zo red je je receptenschriften',
      lead: 'Bijna elke chef heeft ze: schriften uit de leertijd, losse vellen met vlekken, foto’s van een whiteboard. Zo zorg je dat die kennis niet verloren gaat.',
      sections: [
        ['Begin met wat je echt gebruikt', 'Probeer niet alles in één weekend te doen. Begin met de recepten die je deze maand nodig hebt: de basissauzen, de fonds, de onderdelen van je huidige menu. De rest volgt als je er toch naar zoekt.'],
        ['Maak goede foto’s', 'Fotografeer bij daglicht, recht van boven, één pagina per foto. Een vlek of een scheve hoek is geen probleem, maar een schaduw over de tekst wel. Leg het papier plat op een donkere ondergrond.'],
        ['Laat het uitlezen, niet overtypen', 'Overtypen kost per recept al snel tien minuten en levert nieuwe typfouten op. Met een app die handschrift leest, zoals Savour, maak je van de foto een recept met ingrediënten en bereiding. Belangrijk: controleer altijd de hoeveelheden. Een goede app verzint niets en laat zien waar hij twijfelt.'],
        ['Geef elk recept een vaste vorm', 'Titel, opbrengst, ingrediënten met hoeveelheid en eenheid, en de bereiding in stappen. Als alle recepten dezelfde opbouw hebben, kan iedereen in de brigade ze lezen, ook zonder jouw handschrift te kennen.'],
        ['Bewaar het origineel', 'Gooi het schrift niet weg. Voeg eventueel de foto toe aan het recept. Het origineel vertelt soms meer dan de recepturen zelf: een aantekening in de kantlijn, een datum, een naam.']
      ],
      outro: 'Savour leest Word, PDF en foto’s van handgeschreven recepten en zet ze om in één receptenboek.'
    },
    en: {
      slug: 'en/blog/digitise-old-recipe-notes',
      title: 'Digitising old recipe notes: how to save your notebooks',
      desc: 'Handwritten recipes fade and get lost. How to turn your old notebooks and notes into a digital recipe book step by step, without retyping everything.',
      h1: 'Digitising old recipe notes: how to save your notebooks',
      lead: 'Almost every chef has them: notebooks from their apprenticeship, loose stained sheets, photos of a whiteboard. Here is how to make sure that knowledge is not lost.',
      sections: [
        ['Start with what you actually use', 'Do not try to do everything in one weekend. Start with the recipes you need this month: the base sauces, the stocks, the parts of your current menu. The rest follows whenever you look for it.'],
        ['Take good photos', 'Photograph in daylight, straight from above, one page per photo. A stain or a crooked corner is fine, a shadow across the text is not. Lay the paper flat on a dark surface.'],
        ['Have it read, do not retype', 'Retyping easily takes ten minutes per recipe and adds new typos. With an app that reads handwriting, such as Savour, you turn the photo into a recipe with ingredients and method. Important: always check the quantities. A good app invents nothing and shows where it is unsure.'],
        ['Give every recipe the same shape', 'Title, yield, ingredients with quantity and unit, and the method in steps. When all recipes share the same structure, everyone in the brigade can read them, without knowing your handwriting.'],
        ['Keep the original', 'Do not throw the notebook away. Add the photo to the recipe if you like. The original sometimes tells more than the recipe itself: a note in the margin, a date, a name.']
      ],
      outro: 'Savour reads Word, PDF and photos of handwritten recipes and turns them into one recipe book.'
    }
  },
  {
    id: 'structure',
    date: '2026-10-22',
    nl: {
      slug: 'blog/recepten-organiseren-in-de-keuken',
      title: 'Recepten organiseren in een fine-dining keuken',
      desc: 'Recepten organiseren in de culinaire keuken: hoe deel je honderden recepturen zo in dat iedereen in de brigade ze snel vindt? Een praktische indeling in mappen en categorieën.',
      h1: 'Recepten organiseren in een fine-dining keuken',
      lead: 'Een keuken met een wisselend menu heeft al snel honderden recepturen. Zonder vaste indeling vindt niemand iets terug, behalve degene die het opschreef.',
      sections: [
        ['Basis apart van het menu', 'Houd basisrecepten (fonds, jus, deeg, basissauzen) apart van de gerechten op het menu. De basis verandert zelden, het menu elk seizoen. Een gerecht verwijst naar de basis in plaats van die te herhalen.'],
        ['Indelen per partie', 'Werk je met parties, maak dan een map per partie: garde manger, saucier, patisserie. Zo opent iedereen tijdens de service alleen wat voor die post nodig is.'],
        ['Categorieën voor zoeken, mappen voor werken', 'Gebruik categorieën voor wat een recept is (saus, garnituur, dessert) en mappen voor waar je het gebruikt (lunchkaart, proeverij, evenement). Een recept kan in meerdere mappen staan zonder dubbel te bestaan.'],
        ['Eén eigenaar per receptuur', 'Spreek af wie een recept mag aanpassen. Zo voorkom je drie versies van dezelfde saus. In een app met rechten, zoals Savour, beheert de chef de map en kijkt de rest mee.'],
        ['Ruim op na elk seizoen', 'Zet oude menu’s in een archiefmap in plaats van ze te verwijderen. Zo blijft je actuele boek overzichtelijk en raak je niets kwijt.']
      ],
      outro: 'In Savour maak je zelf mappen en categorieën, en deel je mappen met je brigade met de rechten die jij kiest.'
    },
    en: {
      slug: 'en/blog/organising-recipes-in-the-kitchen',
      title: 'Organising recipes in a fine dining kitchen',
      desc: 'How do you arrange hundreds of recipes so everyone in the brigade finds them quickly? A practical structure in folders and categories.',
      h1: 'Organising recipes in a fine dining kitchen',
      lead: 'A kitchen with a changing menu soon has hundreds of recipes. Without a fixed structure nobody can find anything, except the person who wrote it down.',
      sections: [
        ['Base separate from the menu', 'Keep base recipes (stocks, jus, doughs, mother sauces) separate from the dishes on the menu. The base rarely changes, the menu changes every season. A dish refers to the base instead of repeating it.'],
        ['Arrange by section', 'If you work with sections, create a folder per section: garde manger, saucier, pastry. During service everyone opens only what their station needs.'],
        ['Categories for searching, folders for working', 'Use categories for what a recipe is (sauce, garnish, dessert) and folders for where you use it (lunch menu, tasting menu, event). A recipe can sit in several folders without existing twice.'],
        ['One owner per recipe', 'Agree who may change a recipe. That prevents three versions of the same sauce. In an app with rights, such as Savour, the chef manages the folder and the rest can view.'],
        ['Tidy up after each season', 'Move old menus to an archive folder instead of deleting them. Your current book stays clear and you lose nothing.']
      ],
      outro: 'In Savour you create your own folders and categories, and share folders with your brigade with the rights you choose.'
    }
  }
];
