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
    logoLine: 'Van kladje naar een recept dat klopt. Gemaakt door chefs uit Nederland, voor chefs.',
    more: 'Lees meer',
    related: 'Ook interessant',
    ctaTitle: 'Je recepten verdienen een betere plek dan een la.',
    ctaText: 'Begin gratis met tot 100 recepten en probeer Savour Pro 7 dagen. Geen betaalgegevens nodig.',
    footerTag: 'De receptenapp voor de professionele keuken.',
    footerCols: { features: 'Functies', audience: 'Voor wie', company: 'Savour', help: 'Hulp' },
    faq: 'Veelgestelde vragen',
    guide: 'Gids',
    contact: 'Contact',
    terms: 'Algemene voorwaarden',
    privacy: 'Privacybeleid',
    bug: 'Probleem melden',
    company: 'Savour · KvK 89674871 · Nederland · contact@savour.page',
    soon: 'Binnenkort',
    readArticle: 'Lees het artikel',
    blogLead: 'Praktische stukken over recepten, organisatie en werken in de keuken.'
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
    logoLine: 'From scribbled note to a recipe that works. Made by chefs from the Netherlands, for chefs.',
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
    company: 'Savour · KvK 89674871 · The Netherlands · contact@savour.page',
    soon: 'Coming soon',
    readArticle: 'Read the article',
    blogLead: 'Practical pieces about recipes, organisation and working in the kitchen.'
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
      desc: "Digitaliseer je recepten zonder overtypen. Importeer Word en PDF in één keer en laat handgeschreven kladjes en foto's uitlezen. Hoeveelheden worden nooit verzonnen.",
      h1: 'Recepten digitaliseren zonder overtypen',
      lead: 'Je receptenschriften, Word-bestanden en kladjes met koffievlekken worden in één keer een geordend receptenboek.',
      kladje: true,
      sections: [
        ['Word en PDF in één keer', 'Sleep een Word-bestand of PDF in Savour, ook als er honderden recepten in staan. De Savour-lezer herkent zelf waar een recept begint en eindigt, en zet titel, ingrediënten en bereiding op de juiste plek. Nummers voor titels en kleine typfouten zoals 18oc in plaats van 180°C worden netjes opgeruimd. Een chef importeerde zo 1.400 recepten in ongeveer twee minuten.'],
        ['Handgeschreven recepten en foto’s', 'Maak een foto van een kladje, een bladzijde uit je schrift of een scan uit een oude map. De AI leest het handschrift en maakt er een net recept van. Dat werkt ook als de foto scheef is of het papier vlekken heeft. Dit is onderdeel van Savour Pro.'],
        ['Niets verzonnen', 'Een recept moet kloppen. Savour verzint nooit hoeveelheden, ingrediënten of stappen. Twijfelt de lezer, dan zie je dat recept gemarkeerd en kijk je het zelf na voordat het wordt opgeslagen.'],
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
        ['Nothing made up', 'A recipe has to be right. Savour never invents quantities, ingredients or steps. If the reader is unsure, the recipe is flagged and you check it yourself before it is saved.'],
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
      title: 'Recepten organiseren: je receptenboek in mappen en categorieën | Savour',
      desc: 'Organiseer al je recepten in één receptenboek: eigen mappen en categorieën, zoeken op titel en ingrediënt, A tot Z en favorieten. Op computer, tablet en telefoon.',
      h1: 'Recepten organiseren zoals jouw keuken werkt',
      lead: 'Eén receptenboek voor alles wat je ooit hebt gemaakt, ingedeeld op jouw manier.',
      sections: [
        ['Jouw indeling', 'Sauzen, fonds, garnituren, patisserie, het proeverijmenu van dit seizoen. Je maakt zelf mappen en categorieën. Een recept kan in meerdere mappen staan, zodat je jus zowel bij de fonds als bij het lammenu hoort.'],
        ['Zoeken op wat je weet', 'Weet je alleen nog dat er yuzu in zat? Savour zoekt in titels, ingrediënten en bereiding. Of blader van A tot Z door je hele boek.'],
        ['Rustig en snel', 'Geen overvolle schermen. Een lijst met titels, een ster voor je favorieten en één tik naar het recept. Gemaakt om midden in de service snel iets op te zoeken.'],
        ['Op elk apparaat', 'Op de computer orden en importeer je, in de keuken gebruik je je telefoon of tablet met grote letters in de kookmodus. Er hoeft niets geïnstalleerd te worden.']
      ]
    },
    en: {
      slug: 'en/organise-recipes',
      menu: 'Organise recipes',
      short: 'Folders, categories and search by ingredient. Your beurre blanc in three seconds.',
      title: 'Organise recipes: your recipe book in folders and categories | Savour',
      desc: 'Organise all your recipes in one recipe book: your own folders and categories, search by title and ingredient, A to Z and favourites. On computer, tablet and phone.',
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
      short: 'Gedeelde mappen met rechten: jij beheert, je sous-chef past aan, de rest kijkt mee.',
      title: 'Recepturen delen met je keukenteam en brigade | Savour',
      desc: 'Deel recepturen met je keukenteam via gedeelde mappen met rechten. Iedereen werkt met dezelfde versie, van sous-chef tot stagiair.',
      h1: 'Recepturen delen met je brigade',
      lead: 'Iedereen in de keuken werkt met dezelfde versie. Geen foto’s van foto’s in de groepsapp meer.',
      sections: [
        ['Gedeelde mappen', 'Maak een map voor je keuken, je partie of het nieuwe menu en nodig je team uit. Wat jij aanpast, ziet iedereen direct.'],
        ['Rechten per persoon', 'Jij beheert de map. Je sous-chef of chef de partie mag recepten toevoegen en aanpassen. Commis en stagiairs kunnen meekijken, maar niets veranderen.'],
        ['Nieuwe mensen sneller ingewerkt', 'Een nieuwe kok heeft op de eerste dag alle recepten van de partie op de telefoon, in de versie die jij hebt goedgekeurd.'],
        ['Losse recepten delen', 'Wil je één recept doorsturen, bijvoorbeeld naar een collega in een andere zaak? Deel het met een link.']
      ]
    },
    en: {
      slug: 'en/share-recipes',
      menu: 'Share with your brigade',
      short: 'Shared folders with rights: you manage, your sous-chef edits, the rest can view.',
      title: 'Share recipes with your kitchen team and brigade | Savour',
      desc: 'Share recipes with your kitchen team in shared folders with rights. Everyone works from the same version, from sous-chef to intern.',
      h1: 'Share recipes with your brigade',
      lead: 'Everyone in the kitchen works from the same version. No more photos of photos in the group chat.',
      sections: [
        ['Shared folders', 'Create a folder for your kitchen, your section or the new menu and invite your team. What you change, everyone sees straight away.'],
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
        ['Counting in pieces', 'One recipe makes 50 brownies and you need 1,000 for an event? Enter the number of pieces and you immediately see what to weigh out.'],
        ['Ready for mise en place', 'Print the converted recipe straight away, or open it on your phone in cook mode.']
      ]
    }
  },
  {
    id: 'print',
    nl: {
      slug: 'recepten-printen',
      menu: 'Printen en receptenmappen',
      short: 'Een hele map in één keer naar de printer, netjes voor de receptenklapper.',
      title: 'Recepten printen: hele receptenmappen in één keer | Savour',
      desc: 'Print losse recepten of een hele receptenmap in één keer, netjes opgemaakt voor de receptenklapper in de keuken.',
      h1: 'Recepten printen, ook een hele map tegelijk',
      lead: 'Soms werkt papier aan de muur gewoon het best. Dan moet het snel en netjes.',
      sections: [
        ['Een hele map in één keer', 'Moeten alle ijsrecepten in de klapper voor de patisserie? Print de hele map in één keer, in plaats van vijftig bestanden één voor één.'],
        ['Rustige opmaak', 'Titel, opbrengst, ingrediënten en bereiding, groot en overzichtelijk. Leesbaar op een meter afstand, ook met een vlek erop.'],
        ['Altijd de laatste versie', 'Omdat je print vanuit Savour, hangt er altijd de versie aan de muur die nu klopt.']
      ]
    },
    en: {
      slug: 'en/print-recipes',
      menu: 'Printing and binders',
      short: 'A whole folder to the printer in one go, neat for the binder.',
      title: 'Print recipes: whole recipe folders at once | Savour',
      desc: 'Print single recipes or a whole recipe folder at once, neatly laid out for the binder in the kitchen.',
      h1: 'Print recipes, even a whole folder at once',
      lead: 'Sometimes paper on the wall simply works best. Then it has to be quick and neat.',
      sections: [
        ['A whole folder at once', 'All the ice cream recipes need to go in the pastry binder? Print the whole folder at once, instead of fifty files one by one.'],
        ['Calm layout', 'Title, yield, ingredients and method, large and clear. Readable from a metre away, even with a stain on it.'],
        ['Always the latest version', 'Because you print from Savour, the version on the wall is always the one that is right now.']
      ]
    }
  },
  {
    id: 'roadmap',
    soon: true,
    nl: {
      slug: 'binnenkort',
      menu: 'Binnenkort in Savour',
      short: 'Kostprijs per recept, allergenen, receptkaarten met je eigen logo.',
      title: 'Binnenkort in Savour: kostprijs, allergenen en meer',
      desc: 'Waar we aan werken: kostprijs per recept, allergenen per gerecht, receptkaarten met je eigen logo en een app voor iPhone en Android.',
      h1: 'Waar we aan werken',
      lead: 'Savour groeit met de keuken mee. Dit staat op de planning. Mis je iets? Laat het ons weten.',
      sections: [
        ['Kostprijs per recept', 'Zie per gerecht en per portie wat het kost, en wat er gebeurt als de prijs van een product verandert.'],
        ['Allergenen in één oogopslag', 'Per recept en per samengesteld gerecht, zodat je een vraag van een gast aan tafel direct kunt beantwoorden.'],
        ['Receptkaarten met je eigen logo', 'Geprinte recepten in de stijl van jouw zaak.'],
        ['Een app voor iPhone en Android', 'Savour werkt nu in de browser op elk apparaat. Een losse app overwegen we, en jouw feedback telt mee.']
      ]
    },
    en: {
      slug: 'en/roadmap',
      menu: 'Coming soon',
      short: 'Cost per recipe, allergens, recipe cards with your own logo.',
      title: 'Coming soon to Savour: costing, allergens and more',
      desc: 'What we are working on: cost per recipe, allergens per dish, recipe cards with your own logo and an app for iPhone and Android.',
      h1: 'What we are working on',
      lead: 'Savour grows with the kitchen. This is on the roadmap. Missing something? Let us know.',
      sections: [
        ['Cost per recipe', 'See what each dish and each portion costs, and what happens when the price of a product changes.'],
        ['Allergens at a glance', 'Per recipe and per composed dish, so you can answer a guest’s question at the table straight away.'],
        ['Recipe cards with your own logo', 'Printed recipes in the style of your restaurant.'],
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
      slug: 'voor-chefs',
      menu: 'Chefs en sous-chefs',
      short: 'Voor de chef die de recepturen van de keuken bewaakt.',
      title: 'Receptenapp voor chefs en sous-chefs in de fine dining | Savour',
      desc: 'Savour is gemaakt voor chefs en sous-chefs in de fine dining: al je recepturen op één plek, gedeeld met je brigade, altijd de juiste versie.',
      h1: 'Voor chefs en sous-chefs',
      lead: 'Jij bent verantwoordelijk voor elk bord dat de pas verlaat. Dan moet elk recept kloppen, voor iedereen in de keuken.',
      sections: [
        ['Jouw recepturen, één plek', 'Seizoensmenu’s, proeverijen, basisrecepten van jaren terug. In Savour staat het in één receptenboek, ingedeeld zoals jij werkt.'],
        ['Het menu verandert, de brigade gaat mee', 'Pas je een saus aan voor het nieuwe menu, dan werkt iedereen in de gedeelde map direct met de nieuwe versie.'],
        ['Je kennis bewaard', 'Wat je in de loop der jaren hebt opgebouwd, staat niet meer alleen in een schrift of in je hoofd. Het blijft, ook als mensen vertrekken.']
      ]
    },
    en: {
      slug: 'en/for-chefs',
      menu: 'Chefs and sous-chefs',
      short: 'For the chef who looks after the kitchen’s recipes.',
      title: 'Recipe app for chefs and sous-chefs in fine dining | Savour',
      desc: 'Savour is made for chefs and sous-chefs in fine dining: all your recipes in one place, shared with your brigade, always the right version.',
      h1: 'For chefs and sous-chefs',
      lead: 'You are responsible for every plate that leaves the pass. So every recipe has to be right, for everyone in the kitchen.',
      sections: [
        ['Your recipes, one place', 'Seasonal menus, tasting menus, base recipes from years ago. In Savour it is all in one recipe book, arranged the way you work.'],
        ['The menu changes, the brigade follows', 'Adjust a sauce for the new menu and everyone in the shared folder works with the new version straight away.'],
        ['Your knowledge kept', 'What you have built up over the years no longer lives only in a notebook or in your head. It stays, even when people leave.']
      ]
    }
  },
  {
    id: 'pastry',
    nl: {
      slug: 'voor-patissiers',
      menu: 'Patissiers',
      short: 'Voor de patisserie, waar elke gram telt.',
      title: 'Receptenapp voor patissiers: precieze recepturen | Savour',
      desc: 'Savour voor patissiers: precieze recepturen, opschalen op grammen en stuks, en een hele map in één keer printen voor de klapper.',
      h1: 'Voor patissiers',
      lead: 'In de patisserie is een recept een formule. Eén verkeerde gram en het gaat mis.',
      sections: [
        ['Recepturen die kloppen', 'Savour bewaart je recepten precies zoals je ze schreef en verzint nooit hoeveelheden. Twijfelt de lezer bij een import, dan kijk je het zelf na.'],
        ['Opschalen op stuks', 'Van één plaat naar twintig, of van 50 bonbons naar 800. Savour rekent alles om.'],
        ['De klapper altijd actueel', 'Print je hele map met ijs, deeg of glazuren in één keer, zodat er altijd de laatste versie aan de muur hangt.']
      ]
    },
    en: {
      slug: 'en/for-pastry-chefs',
      menu: 'Pastry chefs',
      short: 'For the pastry section, where every gram counts.',
      title: 'Recipe app for pastry chefs: precise recipes | Savour',
      desc: 'Savour for pastry chefs: precise recipes, scaling by grams and pieces, and printing a whole folder at once for the binder.',
      h1: 'For pastry chefs',
      lead: 'In pastry a recipe is a formula. One wrong gram and it fails.',
      sections: [
        ['Recipes that are right', 'Savour keeps your recipes exactly as you wrote them and never invents quantities. If the reader is unsure during an import, you check it yourself.'],
        ['Scale by pieces', 'From one tray to twenty, or from 50 bonbons to 800. Savour converts everything.'],
        ['The binder always up to date', 'Print your whole folder of ice creams, doughs or glazes at once, so the latest version is always on the wall.']
      ]
    }
  },
  {
    id: 'brigade',
    nl: {
      slug: 'voor-de-brigade',
      menu: 'De hele brigade',
      short: 'Voor chef de parties, commis en stagiairs.',
      title: 'Recepten voor de hele keukenbrigade | Savour',
      desc: 'Savour voor de keukenbrigade: chef de parties, commis en stagiairs werken met dezelfde recepten, op hun eigen telefoon.',
      h1: 'Voor de hele brigade',
      lead: 'Van chef de partie tot stagiair: iedereen kookt van hetzelfde recept.',
      sections: [
        ['Op je eigen telefoon', 'Geen gedeelde map met vlekken meer. Elk lid van de brigade opent de recepten van de partie op de eigen telefoon, met grote letters in de kookmodus.'],
        ['Gratis voor teamleden', 'Lid zijn van een gedeelde map is gratis. Met een teamabonnement krijgt iedereen in de keuken Savour Pro.'],
        ['Leren van de keuken', 'Stagiairs en nieuwe koks lezen hoe het hier gedaan wordt, in plaats van het te moeten vragen tijdens de service.']
      ]
    },
    en: {
      slug: 'en/for-kitchen-brigades',
      menu: 'The whole brigade',
      short: 'For chefs de partie, commis and interns.',
      title: 'Recipes for the whole kitchen brigade | Savour',
      desc: 'Savour for the kitchen brigade: chefs de partie, commis and interns work from the same recipes, on their own phones.',
      h1: 'For the whole brigade',
      lead: 'From chef de partie to intern: everyone cooks from the same recipe.',
      sections: [
        ['On your own phone', 'No more shared binder full of stains. Every member of the brigade opens the section’s recipes on their own phone, with large text in cook mode.'],
        ['Free for team members', 'Being a member of a shared folder is free. With a team plan everyone in the kitchen gets Savour Pro.'],
        ['Learning from the kitchen', 'Interns and new cooks read how things are done here, instead of having to ask during service.']
      ]
    }
  }
];

// ---- Over ons: het verhaal als tijdlijn (zonder namen) ----
export const STORY = {
  nl: {
    slug: 'over-savour',
    title: 'Over Savour: gemaakt door chefs uit Nederland, voor chefs',
    desc: 'Het verhaal van Savour: van schriftjes vol vlekken en Word-bestanden van honderden pagina’s naar een receptenapp voor de professionele keuken.',
    h1: 'Het verhaal van Savour',
    lead: 'Savour is niet bedacht door een softwarebedrijf dat een kans zag in de horeca. Het is gemaakt door chefs die hun eigen recepten kwijtraakten.',
    intro: 'We zetten het verhaal hieronder op een rij, zoals het ging: van het eerste schrift tot de app die je nu gebruikt.',
    timeline: [
      ['Het eerste schrift', 'Het begint zoals bij bijna elke kok: als leerling schrijf je alles op. Sauzen, garnituren, wat je proeft en wat je anders zou doen. Eén schrift wordt er twee, dan vijf. Die schriften liggen er nog, vergeeld en vol vlekken. Een deel is niet meer te lezen, ook niet door degene die het schreef.'],
      ['Jaren in de keuken', 'Vijftien jaar koken, van commis tot chef. De recepten verhuizen mee: naar losse vellen, naar foto’s op drie verschillende telefoons, naar berichten in de groepsapp. Alles bestaat ergens, maar nooit op het moment dat je het zoekt.'],
      ['De printer', 'Als chef zet je uiteindelijk alles in Word. Honderden recepten in losse bestanden. Wanneer de patisserie een nieuwe klapper nodig heeft, print iemand van de bediening ze één voor één, vijftig keer. Daar ontstaat het idee: dit moet anders kunnen.'],
      ['Savour', 'Na de service en in de weekenden wordt Savour gebouwd. Getest op de eigen recepten, in de eigen keuken: 1.400 recepten uit Word in twee minuten, kladjes met koffievlekken die nette recepten worden, en mappen die de hele brigade kan openen.'],
      ['Wat nu komt', 'Kostprijs per recept, allergenen, receptkaarten met je eigen logo. We bouwen wat chefs echt nodig hebben, dus we horen graag wat jij mist.']
    ],
    values: [
      ['Een recept moet kloppen', 'Savour verzint nooit hoeveelheden of stappen. Bij twijfel zie je het en beslis jij.'],
      ['Je kennis is van jou', 'Stop je ooit met Pro, dan blijven al je recepten gewoon staan.'],
      ['Gemaakt voor de keuken', 'Snel, rustig en leesbaar, ook met natte handen midden in de service.']
    ],
    valuesTitle: 'Waar we voor staan'
  },
  en: {
    slug: 'en/about',
    title: 'About Savour: made by chefs from the Netherlands, for chefs',
    desc: 'The story of Savour: from stained notebooks and Word files hundreds of pages long to a recipe app for professional kitchens.',
    h1: 'The story of Savour',
    lead: 'Savour was not dreamt up by a software company that spotted an opportunity in hospitality. It was made by chefs who kept losing their own recipes.',
    intro: 'Here is the story as it happened: from the first notebook to the app you use today.',
    timeline: [
      ['The first notebook', 'It starts like it does for almost every cook: as an apprentice you write everything down. Sauces, garnishes, what you taste and what you would do differently. One notebook becomes two, then five. Those notebooks still exist, yellowed and full of stains. Some pages can no longer be read, not even by the person who wrote them.'],
      ['Years in the kitchen', 'Fifteen years of cooking, from commis to chef. The recipes move along: to loose sheets, to photos on three different phones, to messages in the group chat. Everything exists somewhere, but never at the moment you need it.'],
      ['The printer', 'As a chef you eventually put everything in Word. Hundreds of recipes in separate files. When the pastry section needs a new binder, someone from front of house prints them one by one, fifty times. That is where the idea starts: there has to be a better way.'],
      ['Savour', 'Savour is built after service and at weekends. Tested on our own recipes, in our own kitchen: 1,400 recipes from Word in two minutes, coffee-stained notes that become clean recipes, and folders the whole brigade can open.'],
      ['What comes next', 'Cost per recipe, allergens, recipe cards with your own logo. We build what chefs actually need, so we would love to hear what you are missing.']
    ],
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
    eyebrow: 'Voor chefs in de fine dining',
    h1: 'Van kladje naar een recept dat klopt.',
    lead: 'Savour is de receptenapp voor de professionele keuken. Je Word-bestanden, PDF’s en handgeschreven kladjes worden één geordend receptenboek, voor jou en je brigade.',
    proof: '1.400 recepten uit Word geïmporteerd in 2 minuten. Getest in onze eigen keuken.',
    storyTitle: 'Elk recept begint ergens op papier.',
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
    price: 'Tot 100 recepten gratis, met de Savour-lezer voor Word, PDF en tekst. Savour Pro kost €2,99 per maand of €29 per jaar: onbeperkt recepten, AI voor handgeschreven kladjes en foto’s, en je eigen gedeelde mappen. Teams vanaf €1,20 per persoon.',
    priceLink: 'Bekijk de prijzen',
    faqTitle: 'Vragen over Savour',
    faq: [
      ['Welke app gebruik ik om recepten te organiseren voor mijn restaurant?', 'Savour is gemaakt voor professionele keukens: je importeert je bestaande recepten, ordent ze in mappen en deelt ze met je team. Je begint gratis.'],
      ['Hoe digitaliseer ik handgeschreven recepten?', 'Maak een foto van het recept en upload hem in Savour. De AI zet hem om in een net recept met ingrediënten en bereiding, dat je daarna controleert.'],
      ['Kan ik recepten uit Word of PDF importeren?', 'Ja. Ook een bestand met honderden recepten tegelijk; Savour splitst ze zelf op.'],
      ['Hoe deel ik recepten met mijn keukenteam?', "Met een gedeelde map. Je nodigt collega's uit en geeft ze rechten om mee te kijken of mee te werken."],
      ['Is Savour ook voor thuiskoks?', 'Het kan, maar Savour is gebouwd voor de professionele keuken: grote receptenboeken, teams en de service.']
    ]
  },
  en: {
    eyebrow: 'For chefs in fine dining',
    h1: 'From scribbled note to a recipe that works.',
    lead: 'Savour is the recipe app for professional kitchens. Your Word files, PDFs and handwritten notes become one organised recipe book, for you and your brigade.',
    proof: '1,400 recipes imported from Word in 2 minutes. Tested in our own kitchen.',
    storyTitle: 'Every recipe starts somewhere on paper.',
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
    price: 'Up to 100 recipes free, with the Savour reader for Word, PDF and text. Savour Pro costs €2.99 per month or €29 per year: unlimited recipes, AI for handwritten notes and photos, and your own shared folders. Teams from €1.20 per person.',
    priceLink: 'See pricing',
    faqTitle: 'Questions about Savour',
    faq: [
      ['Which app do I use to organise recipes for my restaurant?', 'Savour is made for professional kitchens: you import your existing recipes, organise them in folders and share them with your team. You start for free.'],
      ['How do I digitise handwritten recipes?', 'Take a photo of the recipe and upload it to Savour. The AI turns it into a clean recipe with ingredients and method, which you then check.'],
      ['Can I import recipes from Word or PDF?', 'Yes. Even a file with hundreds of recipes at once; Savour splits them up itself.'],
      ['How do I share recipes with my kitchen team?', 'With a shared folder. You invite colleagues and give them rights to view or to edit.'],
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
      title: 'Recepten organiseren in een fine-dining keuken: een indeling die werkt',
      desc: 'Hoe deel je honderden recepturen zo in dat iedereen in de brigade ze snel vindt? Een praktische indeling in mappen en categorieën.',
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
      title: 'Organising recipes in a fine dining kitchen: a structure that works',
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
