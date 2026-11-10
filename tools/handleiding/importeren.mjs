// Handleiding, onderdeel "Recepten importeren": algemene pagina's, één pagina per bron en per andere recepten-app.
// Beschrijf alleen wat Savour echt leest (js/features/import.js en js/features/import-apps.js).

export const group = {
  id: 'importeren',
  nl: {
    name: 'Recepten importeren',
    intro:
      'Je recepten naar Savour halen: uit Word, PDF, foto’s, tekst, websites, notitie-apps en meer dan vijftien andere recepten-apps.'
  },
  en: {
    name: 'Importing recipes',
    intro:
      'Bring your recipes into Savour: from Word, PDF, photos, text, websites, notes apps and more than fifteen other recipe apps.'
  }
};

// Sjabloon voor de pagina per recepten-app, in elke taal. Duits, Spaans en Frans: tools/handleiding/talen.mjs.
export const APP_TPL = {
  nl: {
    slug: s => `handleiding-importeren-uit-${s}`,
    menu: n => `Overstappen vanuit ${n}`,
    h1: n => `Recepten importeren uit ${n}`,
    title: n => `Recepten uit ${n} importeren in Savour | Handleiding`,
    need: 'Wat je nodig hebt',
    needText: (n, files) => `Een export uit ${n}: ${files}.`,
    exportHead: n => `Exporteren uit ${n}`,
    importHead: 'Importeren in Savour',
    importIntro: 'Daarna in Savour:',
    carriesHead: 'Wat er meegaat',
    categoryHead: 'Categorie',
    steps: [
      'Kies in het menu “Recept toevoegen” en dan “Recept importeren”.',
      'Kies “Uit een andere recepten-app” en kies het exportbestand. Een zip hoef je niet eerst uit te pakken.',
      'Kies “Verwerken”. Savour leest alle recepten uit het bestand.',
      'Controleer de recepten in het [controlescherm](#import-controleren) en kies “Alle recepten opslaan”.'
    ],
    category:
      'De categorie: komt een trefwoord van een van je [categorieën](#categorie-trefwoorden) in de receptnaam voor, dan kiest Savour die. Anders neemt Savour de categorie uit de app over als je een categorie met precies die naam hebt, en zo niet, dan “Eigen recepten”. Je past het per recept aan in het controlescherm.'
  },
  en: {
    slug: s => `en/guide-import-from-${s}`,
    menu: n => `Moving from ${n}`,
    h1: n => `Import recipes from ${n}`,
    title: n => `Import your ${n} recipes into Savour | User guide`,
    need: 'What you need',
    needText: (n, files) => `An export from ${n}: ${files}.`,
    exportHead: n => `Exporting from ${n}`,
    importHead: 'Importing into Savour',
    importIntro: 'Then in Savour:',
    carriesHead: 'What comes across',
    categoryHead: 'Category',
    steps: [
      'Choose “Add recipe” in the menu and then “Import recipe”.',
      'Choose “From another recipe app” and pick the export file. There is no need to unzip a zip first.',
      'Choose “Process”. Savour reads all recipes from the file.',
      'Check the recipes in the [review screen](#import-controleren) and choose “Save all recipes”.'
    ],
    category:
      'The category: if a keyword of one of your [categories](#categorie-trefwoorden) appears in the recipe name, Savour picks that one. Otherwise Savour uses the app’s category if you have a category with exactly that name, and if not, “My recipes”. You change it per recipe in the review screen.'
  }
};

// Eén pagina in één taal voor een recepten-app. t: { files, desc, lead, need?, export, exportSteps?, carries, carriesList?, extra? }
export function appPageLang(tpl, name, slug, t) {
  return {
    slug: tpl.slug(slug),
    menu: tpl.menu(name),
    h1: tpl.h1(name),
    title: tpl.title(name),
    desc: t.desc,
    lead: t.lead,
    sections: [
      [tpl.need, t.need ?? tpl.needText(name, t.files)],
      [tpl.exportHead(name), t.export, t.exportSteps],
      // 'shared': voor elke app gelijk; in het hoofdstuk Overstappen staat dit één keer bovenaan.
      [tpl.importHead, tpl.importIntro, tpl.steps, 'shared'],
      [tpl.carriesHead, t.carries, t.carriesList],
      [tpl.categoryHead, tpl.category, undefined, 'shared'],
      ...(t.extra || [])
    ]
  };
}

// Eén pagina per recepten-app, steeds met dezelfde opbouw. app: naam en slug, zodat andere talen hem kunnen opbouwen.
function appPage({ id, name, slug, files, related = [], nl, en }) {
  return {
    id,
    app: { name, slug },
    related: [...related, 'overstappen', 'import-controleren'],
    nl: appPageLang(APP_TPL.nl, name, slug, { ...nl, files: files.nl }),
    en: appPageLang(APP_TPL.en, name, slug, { ...en, files: files.en })
  };
}

export const pages = [
  {
    id: 'importeren',
    related: ['import-controleren', 'overstappen', 'import-service'],
    nl: {
      slug: 'handleiding-importeren',
      menu: 'Overzicht: recepten importeren',
      h1: 'Recepten importeren',
      title: 'Recepten importeren uit Word, PDF, foto’s en andere apps | Handleiding Savour',
      desc: 'Alle manieren om recepten in Savour te zetten: Word, PDF, foto’s van kladjes, tekst, een website, notitie-apps, CSV en exports uit Paprika, Mela, Mealie en meer.',
      lead: 'Je hele receptenmap in één keer naar Savour, uit welke bron dan ook. Hier vind je per bron hoe het werkt.',
      sections: [
        [
          'Waar begin je',
          'Kies in het menu “Recept toevoegen” en dan “Recept importeren”. Je ziet de bronnen waaruit je kunt importeren. Elke bron opent een bestandskiezer die alleen de passende bestanden toont. Je kunt bestanden ook naar het scherm slepen.'
        ],
        [
          'Bestanden en documenten',
          'Deze bronnen leest de Savour-lezer, gratis en zonder AI:',
          [
            '[Word](#import-word): .doc en .docx, ook met honderden recepten in één document.',
            '[PDF](#import-pdf): digitale PDF’s. Een gescande PDF leest de AI (Savour Pro).',
            '[Tekst typen of plakken](#import-tekst): uit een mail, WhatsApp of een notitie.',
            '[Andere tekstbestanden](#import-tekstbestanden): .txt, .md, .rtf, .odt, .html en Pages.',
            '[Spreadsheets en CSV](#import-csv): Excel of Google Sheets, opgeslagen als .csv.',
            '[JSON en schema.org](#import-json): recepten in vaste vorm, en Savour-bestanden.',
            '[Een hele map of zip](#import-hele-map): alles door elkaar in één keer.'
          ]
        ],
        [
          'Foto’s en websites',
          'Foto’s van handgeschreven of gescande recepten en de camera lees je met de AI van Savour Pro: zie [Foto’s en kladjes](#import-fotos). Een recept van een website haal je binnen met de link: zie [Recept van een website](#import-website).'
        ],
        [
          'Overstappen vanuit een andere app',
          'Savour leest exports uit [Paprika](#import-paprika), [Mela](#import-mela), [Mealie](#import-mealie), [Tandoor](#import-tandoor), [Recipe Keeper](#import-recipe-keeper), [Copy Me That](#import-copy-me-that), [Crouton](#import-crouton), [MasterCook](#import-mastercook), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook), [Evernote](#import-evernote), [Google Keep](#import-google-keep), [Flavorish](#import-flavorish), [CookBookManager](#import-cookbookmanager) en [Plan to Eat](#import-plan-to-eat). Notities uit Apple Notes, OneNote, Notion en andere apps: zie [Notitie-apps](#import-notitie-apps). Het overzicht staat bij [Overstappen naar Savour](#overstappen).'
        ],
        [
          'Altijd eerst controleren',
          'Er wordt niets opgeslagen voordat jij het hebt gezien. In het [controlescherm](#import-controleren) zie je per recept wat er is gelezen, en wat Savour niet zeker weet. Savour verzint nooit hoeveelheden, ingrediënten of stappen.'
        ],
        [
          'Gratis en Savour Pro',
          'Met een gratis account lees je Word, PDF, tekst en exports uit andere apps in, tot je 100 recepten hebt. Heb je minder ruimte over dan je importeert, dan slaat Savour de eerste recepten op die passen en blijven de andere in het controlescherm staan. Met [Savour Pro](#gratis-en-pro) bewaar je onbeperkt recepten en leest de AI foto’s, gescande PDF’s en recepten waarover de lezer twijfelt, tot 150 imports per maand. Zie [Wanneer helpt de AI](#import-ai).'
        ],
        [
          'Geen tijd om het zelf te doen',
          'Met de [import service](#import-service) zetten de koks achter Savour je hele receptenmap voor je over.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-recipes',
      menu: 'Overview: importing recipes',
      h1: 'Importing recipes',
      title: 'Import recipes from Word, PDF, photos and other apps | Savour user guide',
      desc: 'Every way to get recipes into Savour: Word, PDF, photos of notes, text, a website, notes apps, CSV and exports from Paprika, Mela, Mealie and more.',
      lead: 'Your whole recipe folder into Savour at once, whatever the source. Here you find how it works for each source.',
      sections: [
        [
          'Where to start',
          'Choose “Add recipe” in the menu and then “Import recipe”. You see the sources you can import from. Each source opens a file picker that only shows matching files. You can also drag files onto the screen.'
        ],
        [
          'Files and documents',
          'The Savour reader reads these sources, free and without AI:',
          [
            '[Word](#import-word): .doc and .docx, even with hundreds of recipes in one document.',
            '[PDF](#import-pdf): digital PDFs. A scanned PDF is read by AI (Savour Pro).',
            '[Typing or pasting text](#import-tekst): from an email, WhatsApp or a note.',
            '[Other text files](#import-tekstbestanden): .txt, .md, .rtf, .odt, .html and Pages.',
            '[Spreadsheets and CSV](#import-csv): Excel or Google Sheets, saved as .csv.',
            '[JSON and schema.org](#import-json): recipes in a structured format, and Savour files.',
            '[A whole folder or zip](#import-hele-map): everything mixed, in one go.'
          ]
        ],
        [
          'Photos and websites',
          'Photos of handwritten or scanned recipes and the camera are read by Savour Pro’s AI: see [Photos and notes](#import-fotos). Bring in a recipe from a website with its link: see [Recipe from a website](#import-website).'
        ],
        [
          'Moving from another app',
          'Savour reads exports from [Paprika](#import-paprika), [Mela](#import-mela), [Mealie](#import-mealie), [Tandoor](#import-tandoor), [Recipe Keeper](#import-recipe-keeper), [Copy Me That](#import-copy-me-that), [Crouton](#import-crouton), [MasterCook](#import-mastercook), [Cookmate](#import-cookmate), [Living Cookbook](#import-living-cookbook), [Evernote](#import-evernote), [Google Keep](#import-google-keep), [Flavorish](#import-flavorish), [CookBookManager](#import-cookbookmanager) and [Plan to Eat](#import-plan-to-eat). Notes from Apple Notes, OneNote, Notion and other apps: see [Notes apps](#import-notitie-apps). The overview is in [Moving to Savour](#overstappen).'
        ],
        [
          'Always review first',
          'Nothing is saved before you have seen it. The [review screen](#import-controleren) shows per recipe what was read, and what Savour is unsure about. Savour never invents quantities, ingredients or steps.'
        ],
        [
          'Free and Savour Pro',
          'A free account imports Word, PDF, text and exports from other apps, up to 100 recipes. If you have less room left than you import, Savour saves the first recipes that fit and the rest stay in the review screen. With [Savour Pro](#gratis-en-pro) you keep unlimited recipes and AI reads photos, scanned PDFs and recipes the reader has doubts about, up to 150 imports a month. See [When the AI helps](#import-ai).'
        ],
        [
          'No time to do it yourself',
          'With the [import service](#import-service), the chefs behind Savour move your whole recipe folder over for you.'
        ]
      ]
    }
  },
  {
    id: 'import-controleren',
    related: ['importeren', 'import-ai', 'import-problemen'],
    nl: {
      slug: 'handleiding-import-controleren',
      menu: 'Import controleren en opslaan',
      title: 'Geïmporteerde recepten controleren voor je ze opslaat | Handleiding Savour',
      desc: 'Het controlescherm van Savour: per recept titel, ingrediënten, bereiding, opbrengst en categorie nakijken, meldingen bij twijfel, dubbele recepten en alles in één keer opslaan.',
      lead: 'Voordat er iets wordt opgeslagen, zie je precies wat Savour heeft gelezen.',
      sections: [
        [
          'Het controlescherm',
          'Na het verwerken opent “Meerdere recepten importeren”. Bovenaan zie je hoeveel recepten er zijn gevonden en uit hoeveel bestanden, en of alles duidelijk is gelezen. Daaronder staat elk recept als kaart met de velden Titel, Ingrediënten, Bereiding, Opbrengst en Categorie. Je past alles direct in de kaart aan.'
        ],
        [
          'Meldingen bij twijfel',
          'Savour laat zien waar het niet zeker is:',
          [
            '“Automatisch verbeterd”: kleine tikfouten die de lezer zelf heeft verbeterd, zodat je ze kunt nalopen.',
            '“Niet goed leesbaar, controleer”: een stuk dat je beter even naast het origineel legt.',
            '“Mogelijk onvolledig”: er lijkt iets te ontbreken. Recepten die niet volledig in de bron staan, worden overgeslagen; met “Toch importeren” neem je ze alsnog op, gemarkeerd om later na te kijken.'
          ]
        ],
        [
          'Een recept weghalen of een foto draaien',
          'Hoort een kaart er niet bij, bijvoorbeeld een inhoudsopgave of een notitie die geen recept is, dan haal je hem weg met het kruisje. Bij een recept van een foto draai je de foto met “Draai foto” een kwartslag.'
        ],
        [
          'Opslaan',
          'Kies “Alle recepten opslaan”. Staat een recept al precies zo in je bibliotheek, of staat het twee keer in de import, dan slaat Savour het maar één keer op en meldt hoeveel dubbele recepten zijn overgeslagen. Met “Terug naar importeren” ga je terug zonder op te slaan.'
        ],
        [
          'Bij een gratis account',
          'Heb je minder dan 100 recepten over, dan vraagt Savour of het de recepten opslaat die nog passen. De andere blijven in het controlescherm staan; met [Savour Pro](#gratis-en-pro) bewaar je onbeperkt recepten.'
        ],
        [
          'Wat je daarna doet',
          'Nummers voor receptnamen uit een oud receptenboek (“12. Kalfsjus”) haal je in één keer weg bij [Opschonen](#opschonen). Daarna [orden je de recepten](#ordenen) in categorieën en mappen.'
        ],
        [
          'Waar je op let',
          'Lees vooral de getallen, de eenheden en de opbrengst na. Een 3 en een 8 of een 1 en een 7 zijn op een vlekkerig kladje snel verwisseld. Bij een recept van een foto open je later het origineel met “Origineel kladje bekijken”.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-review-import',
      menu: 'Reviewing and saving an import',
      title: 'Review imported recipes before you save them | Savour user guide',
      desc: 'Savour’s review screen: check title, ingredients, method, yield and category per recipe, messages when in doubt, duplicate recipes and saving everything in one go.',
      lead: 'Before anything is saved, you see exactly what Savour has read.',
      sections: [
        [
          'The review screen',
          'After processing, “Import multiple recipes” opens. At the top you see how many recipes were found and from how many files, and whether everything was read clearly. Below, each recipe is a card with the fields Title, Ingredients, Method, Yield and Category. You change anything directly in the card.'
        ],
        [
          'Messages when in doubt',
          'Savour shows where it is not sure:',
          [
            '“Corrected automatically”: small typos the reader fixed itself, so you can check them.',
            '“Not clearly readable, please check”: a part you should compare with the original.',
            '“Possibly incomplete”: something seems to be missing. Recipes that are not complete in the source are skipped; with “Import anyway” you still add them, marked to check later.'
          ]
        ],
        [
          'Removing a recipe or rotating a photo',
          'If a card does not belong, for example a table of contents or a note that is not a recipe, remove it with the cross. For a recipe from a photo, “Rotate photo” turns the photo a quarter turn.'
        ],
        [
          'Saving',
          'Choose “Save all recipes”. If a recipe is already in your library exactly like this, or appears twice in the import, Savour saves it only once and tells you how many duplicates were skipped. “Back to import” returns without saving.'
        ],
        [
          'On a free account',
          'If you have room for fewer than the recipes you import, Savour asks whether to save the ones that still fit. The others stay in the review screen; with [Savour Pro](#gratis-en-pro) you keep unlimited recipes.'
        ],
        [
          'What to do next',
          'Remove numbers in front of recipe names from an old recipe book (“12. Veal jus”) in one go with [Clean up](#opschonen). Then [organise the recipes](#ordenen) in categories and folders.'
        ],
        [
          'What to look out for',
          'Check the numbers, units and yield in particular. A 3 and an 8 or a 1 and a 7 are easily mixed up on a stained note. For a recipe from a photo, open the original later with “View original note”.'
        ]
      ]
    }
  },
  {
    id: 'import-word',
    related: ['import-pdf', 'import-hele-map', 'tips-recept-schrijven'],
    nl: {
      slug: 'handleiding-importeren-uit-word',
      menu: 'Word-bestanden (.doc, .docx)',
      h1: 'Recepten importeren uit Word',
      title: 'Recepten importeren uit Word (.doc en .docx) | Handleiding Savour',
      desc: 'Zo zet je recepten uit Word in Savour: een document met honderden recepten wordt automatisch opgesplitst in titel, opbrengst, ingrediënten en bereiding.',
      lead: 'Eén Word-document met je hele receptenboek, of honderd losse bestanden: Savour splitst ze zelf op.',
      sections: [
        [
          'Zo importeer je',
          'Kies “Recept toevoegen” → “Recept importeren” → “Word-bestand”. Kies één of meer .doc- of .docx-bestanden en kies “Verwerken”. Daarna [controleer je de recepten](#import-controleren).'
        ],
        [
          'Wat de Savour-lezer herkent',
          'De Savour-lezer splitst een document zelf in losse recepten, ook als het honderden recepten bevat. Per recept herkent hij de titel, de opbrengst, de ingrediënten en de bereiding. Dat werkt gratis en zonder AI.'
        ],
        [
          'Hoe Savour een nieuw recept herkent',
          'Een nieuw recept begint bij een kop in Word (Kop 1), bij een vetgedrukte regel die op een receptnaam lijkt, of bij een receptnaam gevolgd door een nieuw kopje “Ingrediënten”. Kopjes als “Ingrediënten”, “Bereiding” en “Werkwijze” helpen de lezer het best. Een regel die eindigt op een dubbele punt, zoals “Deeg:”, wordt een [deel van het recept](#recept-delen).'
        ],
        [
          'Oude .doc-bestanden',
          'Ook oude .doc-bestanden uit Word 97–2003 worden gelezen. Lukt dat bij een bestand niet, sla het dan in Word op als .docx en probeer opnieuw.'
        ],
        [
          'Tabellen',
          'Staan je ingrediënten in een tabel, dan wordt elke rij een regel, met de cellen achter elkaar. Controleer bij tabellen de volgorde van hoeveelheid en product.'
        ],
        [
          'Tips voor het beste resultaat',
          'Geef elk recept een duidelijke titel als kop, zet ingrediënten op losse regels met de hoeveelheid vooraan en schrijf “Bereiding” boven de stappen. Meer tips: [Een recept dat iedereen hetzelfde maakt](#tips-recept-schrijven).'
        ],
        [
          'Pages en Google Docs',
          'Een Pages-bestand kan Savour niet lezen: exporteer het in Pages als Word (.docx) of PDF. Uit Google Docs kies je Bestand → Downloaden → Microsoft Word (.docx).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-from-word',
      menu: 'Word files (.doc, .docx)',
      h1: 'Import recipes from Word',
      title: 'Import recipes from Word (.doc and .docx) | Savour user guide',
      desc: 'How to get recipes from Word into Savour: a document with hundreds of recipes is split automatically into title, yield, ingredients and method.',
      lead: 'One Word document with your whole recipe book, or a hundred separate files: Savour splits them up itself.',
      sections: [
        [
          'How to import',
          'Choose “Add recipe” → “Import recipe” → “Word file”. Pick one or more .doc or .docx files and choose “Process”. Then [review the recipes](#import-controleren).'
        ],
        [
          'What the Savour reader recognises',
          'The Savour reader splits a document into separate recipes on its own, even when it holds hundreds of them. For each recipe it recognises the title, yield, ingredients and method. This is free and uses no AI.'
        ],
        [
          'How Savour spots a new recipe',
          'A new recipe starts at a Word heading (Heading 1), at a bold line that looks like a recipe name, or at a recipe name followed by a new “Ingredients” heading. Headings such as “Ingredients”, “Method” and “Preparation” help the reader most. A line ending in a colon, such as “Dough:”, becomes a [part of the recipe](#recept-delen).'
        ],
        [
          'Old .doc files',
          'Old .doc files from Word 97–2003 are read too. If a file does not work, save it in Word as .docx and try again.'
        ],
        [
          'Tables',
          'If your ingredients are in a table, each row becomes one line with the cells in order. With tables, check the order of quantity and product.'
        ],
        [
          'Tips for the best result',
          'Give each recipe a clear title as a heading, put ingredients on separate lines with the quantity first and write “Method” above the steps. More tips: [A recipe everyone makes the same way](#tips-recept-schrijven).'
        ],
        [
          'Pages and Google Docs',
          'Savour cannot read a Pages file: export it in Pages as Word (.docx) or PDF. In Google Docs choose File → Download → Microsoft Word (.docx).'
        ]
      ]
    }
  },
  {
    id: 'import-pdf',
    related: ['import-word', 'import-fotos', 'import-ai'],
    nl: {
      slug: 'handleiding-importeren-uit-pdf',
      menu: 'PDF-bestanden',
      h1: 'Recepten importeren uit PDF',
      title: 'Recepten importeren uit een PDF, ook gescand | Handleiding Savour',
      desc: 'Zo importeer je recepten uit PDF in Savour: digitale PDF’s leest de Savour-lezer gratis, gescande PDF’s leest de AI met Savour Pro.',
      lead: 'Een digitaal receptenboek, een export uit een ander programma of een scan van een kladje.',
      sections: [
        [
          'Zo importeer je',
          'Kies “Recept toevoegen” → “Recept importeren” → “PDF-bestand”, kies één of meer PDF’s en kies “Verwerken”. Daarna [controleer je de recepten](#import-controleren).'
        ],
        [
          'Digitale PDF',
          'Een PDF die uit Word, een ander programma of een website komt, bevat tekst. Die leest de Savour-lezer gratis, op dezelfde manier als een [Word-bestand](#import-word): hij splitst het in recepten en herkent titel, opbrengst, ingrediënten en bereiding. Een grote witruimte op een pagina geldt als scheiding.'
        ],
        [
          'Gescande PDF',
          'Een scan is een foto in een PDF, zonder tekst. Die leest de AI van [Savour Pro](#gratis-en-pro), net als [een foto](#import-fotos). Zonder Pro meldt Savour dat het bestand geen leesbare tekst bevat.'
        ],
        [
          'Twee kolommen en opmaak',
          'In een PDF met twee kolommen of veel opmaak kan de volgorde van regels anders uitpakken. Kijk zulke recepten extra goed na. Heb je het originele Word-bestand nog, importeer dan liever dat.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-from-pdf',
      menu: 'PDF files',
      h1: 'Import recipes from PDF',
      title: 'Import recipes from a PDF, scanned or digital | Savour user guide',
      desc: 'How to import recipes from PDF into Savour: the Savour reader reads digital PDFs for free, AI reads scanned PDFs with Savour Pro.',
      lead: 'A digital recipe book, an export from another program or a scan of a note.',
      sections: [
        [
          'How to import',
          'Choose “Add recipe” → “Import recipe” → “PDF file”, pick one or more PDFs and choose “Process”. Then [review the recipes](#import-controleren).'
        ],
        [
          'Digital PDF',
          'A PDF made from Word, another program or a website contains text. The Savour reader reads it for free, the same way as a [Word file](#import-word): it splits it into recipes and recognises title, yield, ingredients and method. A large blank space on a page counts as a break.'
        ],
        [
          'Scanned PDF',
          'A scan is a photo inside a PDF, without text. AI reads it with [Savour Pro](#gratis-en-pro), just like [a photo](#import-fotos). Without Pro, Savour tells you the file contains no readable text.'
        ],
        [
          'Two columns and layout',
          'In a PDF with two columns or a lot of layout, the order of lines can come out differently. Check such recipes extra carefully. If you still have the original Word file, import that instead.'
        ]
      ]
    }
  },
  {
    id: 'import-fotos',
    related: ['import-controleren', 'recept-foto', 'tips-kladjes'],
    nl: {
      slug: 'handleiding-fotos-en-kladjes-importeren',
      menu: 'Foto’s, kladjes en de camera',
      h1: 'Foto’s en kladjes importeren',
      title: 'Handgeschreven recepten en kladjes van een foto lezen | Handleiding Savour',
      desc: 'Zo zet je handgeschreven recepten, kladjes en kookboekpagina’s in Savour: foto’s uploaden of de camera gebruiken, de AI leest ze en het originele kladje blijft bewaard.',
      lead: 'Het kladje bij de pass, het schrift van je opleiding of een pagina uit een kookboek: één foto en het staat erin.',
      sections: [
        [
          'Foto’s uploaden',
          'Kies “Recept toevoegen” → “Recept importeren” → “Foto’s” en kies één of meer foto’s (.jpg, .png of .webp). Elke foto wordt als recept gelezen. Dit werkt met [Savour Pro](#gratis-en-pro), tot 150 imports per maand.'
        ],
        [
          'De camera gebruiken',
          'Kies “Foto maken met je camera”. Op een telefoon opent de camera; op een computer de webcam. Leg het kladje plat, in goed licht, en maak de foto recht van boven met de hele pagina in beeld.'
        ],
        [
          'Wat de AI doet',
          'Savour zet de foto eerst rechtop en leest dan een kopie met meer contrast. De AI leest wat er staat en verzint niets: wat niet op het kladje staat, staat ook niet in het recept. Twijfelt de AI, dan zie je dat in het [controlescherm](#import-controleren).'
        ],
        [
          'Het origineel blijft bewaard',
          'Bij een recept dat van een foto is gelezen, blijft het kladje bewaard. Open het recept en kies “Origineel kladje bekijken” om het naast het recept te leggen.'
        ],
        [
          'Meerdere foto’s in een zip',
          'Heb je al je foto’s in een zip-bestand, kies die dan bij “Uit een andere recepten-app” of “Alle bestanden door elkaar”. Staan er alleen foto’s in, dan leest Savour elke foto als recept. Zie [Een hele map of zip](#import-hele-map).'
        ],
        [
          'Tips voor een goede foto',
          'Eén recept per foto, geen schaduw van je telefoon, geen flits op glanzend papier. Kijk daarna vooral de getallen na. Meer tips: [Van kladje naar receptkaart](#tips-kladjes).'
        ],
        [
          'iPhone-foto’s (HEIC)',
          'Savour leest .jpg, .png en .webp. Bewaart je iPhone foto’s als HEIC, kies dan op de iPhone bij Instellingen → Camera → Formaten “Meest compatibel”, of gebruik de camera in Savour zelf.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-photos-and-notes',
      menu: 'Photos, notes and the camera',
      h1: 'Importing photos and handwritten notes',
      title: 'Read handwritten recipes and notes from a photo | Savour user guide',
      desc: 'How to get handwritten recipes, notes and cookbook pages into Savour: upload photos or use the camera, AI reads them and the original note is kept.',
      lead: 'The note at the pass, your culinary school notebook or a page from a cookbook: one photo and it’s in.',
      sections: [
        [
          'Uploading photos',
          'Choose “Add recipe” → “Import recipe” → “Photos” and pick one or more photos (.jpg, .png or .webp). Each photo is read as a recipe. This works with [Savour Pro](#gratis-en-pro), up to 150 imports a month.'
        ],
        [
          'Using the camera',
          'Choose “Take a photo with your camera”. On a phone the camera opens; on a computer the webcam. Lay the note flat, in good light, and take the photo straight from above with the whole page in view.'
        ],
        [
          'What the AI does',
          'Savour first turns the photo upright and then reads a higher-contrast copy. The AI reads what is there and invents nothing: what is not on the note is not in the recipe. When the AI is unsure, you see it in the [review screen](#import-controleren).'
        ],
        [
          'The original is kept',
          'For a recipe read from a photo, the note is kept. Open the recipe and choose “View original note” to compare it with the recipe.'
        ],
        [
          'Several photos in a zip',
          'If your photos are in a zip file, choose it under “From another recipe app” or “All files mixed”. If it contains only photos, Savour reads each photo as a recipe. See [A whole folder or zip](#import-hele-map).'
        ],
        [
          'Tips for a good photo',
          'One recipe per photo, no shadow from your phone, no flash on glossy paper. Then check the numbers in particular. More tips: [From scribbled note to recipe card](#tips-kladjes).'
        ],
        [
          'iPhone photos (HEIC)',
          'Savour reads .jpg, .png and .webp. If your iPhone saves photos as HEIC, choose “Most Compatible” under Settings → Camera → Formats, or use the camera inside Savour.'
        ]
      ]
    }
  },
  {
    id: 'import-tekst',
    related: ['import-controleren', 'recept-maken', 'import-notitie-apps'],
    nl: {
      slug: 'handleiding-tekst-plakken',
      menu: 'Tekst typen of plakken',
      h1: 'Recepten importeren uit tekst',
      title: 'Een recept plakken uit een mail, WhatsApp of notitie | Handleiding Savour',
      desc: 'Zo plak je recepten in Savour: tekst uit een e-mail, WhatsApp, een website of een notitie-app, ook meerdere recepten tegelijk. De Savour-lezer deelt ze op.',
      lead: 'Een recept dat een collega appte, of een hele lijst uit je notities: plakken en klaar.',
      sections: [
        [
          'Zo werkt het',
          'Kies “Recept toevoegen” → “Recept importeren” → “Tekst invoeren”. Typ of plak de tekst in het vak en kies “Verwerken”. Je kunt meerdere recepten tegelijk plakken.'
        ],
        [
          'Wat Savour herkent',
          'De Savour-lezer splitst de tekst in recepten en herkent titel, opbrengst, ingrediënten en bereiding, net als bij een [Word-bestand](#import-word). Plak je uit Word of een mail, dan onthoudt Savour vetgedrukte regels: die zijn vaak een receptnaam of een deel als “Deeg”.'
        ],
        [
          'Zo plak je het netst',
          'Zet de titel bovenaan, dan de ingrediënten op losse regels met de hoeveelheid vooraan, en dan de bereiding. Een witregel tussen twee recepten helpt de lezer.'
        ],
        [
          'Liever zelf invullen',
          'Wil je een recept veld voor veld invullen, gebruik dan [Zelf invoeren](#recept-maken).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-paste-text',
      menu: 'Typing or pasting text',
      h1: 'Import recipes from text',
      title: 'Paste a recipe from an email, WhatsApp or a note | Savour user guide',
      desc: 'How to paste recipes into Savour: text from an email, WhatsApp, a website or a notes app, even several recipes at once. The Savour reader splits them up.',
      lead: 'A recipe a colleague texted you, or a whole list from your notes: paste and done.',
      sections: [
        [
          'How it works',
          'Choose “Add recipe” → “Import recipe” → “Enter text”. Type or paste the text into the box and choose “Process”. You can paste several recipes at once.'
        ],
        [
          'What Savour recognises',
          'The Savour reader splits the text into recipes and recognises title, yield, ingredients and method, just like a [Word file](#import-word). When you paste from Word or an email, Savour remembers bold lines: these are often a recipe name or a part such as “Dough”.'
        ],
        [
          'Pasting it neatly',
          'Put the title at the top, then the ingredients on separate lines with the quantity first, then the method. A blank line between two recipes helps the reader.'
        ],
        ['Rather fill it in yourself', 'To fill in a recipe field by field, use [Enter manually](#recept-maken).']
      ]
    }
  },
  {
    id: 'import-tekstbestanden',
    related: ['import-hele-map', 'import-notitie-apps', 'import-word'],
    nl: {
      slug: 'handleiding-tekstbestanden-importeren',
      menu: 'Tekst, Markdown, RTF, ODT en HTML',
      h1: 'Tekstbestanden importeren',
      title: 'Recepten importeren uit .txt, .md, .rtf, .odt en .html | Handleiding Savour',
      desc: 'Zo importeer je recepten uit tekstbestanden in Savour: platte tekst, Markdown, RTF, OpenOffice en LibreOffice (.odt), webpagina’s (.html) en Pages.',
      lead: 'Bestanden uit Kladblok, TextEdit, LibreOffice, Obsidian of een opgeslagen webpagina.',
      sections: [
        [
          'Zo importeer je',
          'Kies “Recept toevoegen” → “Recept importeren” → “Andere bestanden” en kies je bestanden. Kies “Verwerken” en [controleer de recepten](#import-controleren).'
        ],
        [
          'Welke bestanden',
          'De Savour-lezer leest deze bestanden gratis:',
          [
            '.txt: platte tekst uit Kladblok, TextEdit of een notitie-app.',
            '.md: Markdown uit Obsidian, Notion, Bear, Joplin en andere apps. Een kop met # wordt een receptnaam.',
            '.rtf: Rich Text uit WordPad of TextEdit.',
            '.odt: OpenOffice en LibreOffice Writer.',
            '.html: een opgeslagen webpagina. Staat het recept er in vaste vorm (schema.org) in, dan neemt Savour dat over; anders leest de lezer de tekst.'
          ]
        ],
        [
          'Pages',
          'Een Pages-bestand kan Savour niet lezen. Kies in Pages Archief → Exporteer naar → Word of PDF, en importeer dat bestand.'
        ],
        [
          'Veel bestanden tegelijk',
          'Heb je honderden losse notities, kies dan [Hele map kiezen](#import-hele-map) of zet ze in een zip.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-text-files',
      menu: 'Text, Markdown, RTF, ODT and HTML',
      h1: 'Importing text files',
      title: 'Import recipes from .txt, .md, .rtf, .odt and .html | Savour user guide',
      desc: 'How to import recipes from text files into Savour: plain text, Markdown, RTF, OpenOffice and LibreOffice (.odt), web pages (.html) and Pages.',
      lead: 'Files from Notepad, TextEdit, LibreOffice, Obsidian or a saved web page.',
      sections: [
        [
          'How to import',
          'Choose “Add recipe” → “Import recipe” → “Other files” and pick your files. Choose “Process” and [review the recipes](#import-controleren).'
        ],
        [
          'Which files',
          'The Savour reader reads these files for free:',
          [
            '.txt: plain text from Notepad, TextEdit or a notes app.',
            '.md: Markdown from Obsidian, Notion, Bear, Joplin and other apps. A heading with # becomes a recipe name.',
            '.rtf: Rich Text from WordPad or TextEdit.',
            '.odt: OpenOffice and LibreOffice Writer.',
            '.html: a saved web page. If the recipe is in it in a structured format (schema.org), Savour uses that; otherwise the reader reads the text.'
          ]
        ],
        [
          'Pages',
          'Savour cannot read a Pages file. In Pages choose File → Export To → Word or PDF, and import that file.'
        ],
        [
          'Many files at once',
          'With hundreds of separate notes, use [Choose a whole folder](#import-hele-map) or put them in a zip.'
        ]
      ]
    }
  },
  {
    id: 'import-hele-map',
    related: ['import-tekstbestanden', 'import-fotos', 'overstappen'],
    nl: {
      slug: 'handleiding-hele-map-of-zip-importeren',
      menu: 'Een hele map of zip',
      h1: 'Een hele map of zip importeren',
      title: 'Een hele map of zip met recepten in één keer importeren | Handleiding Savour',
      desc: 'Zo importeer je al je receptbestanden tegelijk in Savour: een hele map met Word, PDF, foto’s en tekst door elkaar, of een zip met documenten of foto’s.',
      lead: 'Je hele receptenmap van de computer in één keer naar Savour, ook als er van alles door elkaar staat.',
      sections: [
        [
          'Alle bestanden door elkaar',
          'Kies “Recept toevoegen” → “Recept importeren” → “Alle bestanden door elkaar”. Je kiest dan Word, PDF, foto’s, tekstbestanden en exports uit andere apps in één keer.'
        ],
        [
          'Hele map kiezen',
          'Kies “Hele map kiezen” en wijs een map aan. Savour neemt alle bestanden mee die het kan lezen, ook uit mappen in die map. Bestanden die het niet kan lezen, slaat het over.'
        ],
        [
          'Een zip-bestand',
          'Een zip hoef je niet uit te pakken. Savour bekijkt elk bestand in de zip:',
          [
            'Word, PDF, Markdown, RTF en ODT worden gelezen alsof je ze los had gekozen.',
            'Exports uit andere recepten-apps in de zip worden herkend, ook een zip in een zip.',
            'Staan er alleen foto’s in, dan wordt elke foto als recept gelezen (Savour Pro).',
            'Staan er recepten én foto’s in, dan zijn de foto’s de foto’s bij die recepten.'
          ]
        ],
        [
          'Voortgang',
          'Bij veel bestanden zie je de voortgang per bestand. Gaat er bij een bestand iets mis, dan meldt Savour welk bestand en waarom, en gaat het verder met de rest.'
        ],
        [
          'Daarna',
          'Alle recepten komen samen in één [controlescherm](#import-controleren). Bij elk recept staat uit welk bestand het komt.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-folder-or-zip',
      menu: 'A whole folder or zip',
      h1: 'Importing a whole folder or zip',
      title: 'Import a whole folder or zip of recipes at once | Savour user guide',
      desc: 'How to import all your recipe files into Savour at once: a whole folder with Word, PDF, photos and text mixed, or a zip with documents or photos.',
      lead: 'Your whole recipe folder from the computer into Savour at once, even when everything is mixed together.',
      sections: [
        [
          'All files mixed',
          'Choose “Add recipe” → “Import recipe” → “All files mixed”. You then pick Word, PDF, photos, text files and exports from other apps in one go.'
        ],
        [
          'Choose a whole folder',
          'Choose “Choose a whole folder” and point to a folder. Savour takes every file it can read, including files in subfolders. Files it cannot read are skipped.'
        ],
        [
          'A zip file',
          'No need to unzip a zip. Savour looks at every file inside:',
          [
            'Word, PDF, Markdown, RTF and ODT are read as if you had picked them separately.',
            'Exports from other recipe apps in the zip are recognised, even a zip inside a zip.',
            'If it holds only photos, each photo is read as a recipe (Savour Pro).',
            'If it holds recipes and photos, the photos belong to those recipes.'
          ]
        ],
        [
          'Progress',
          'With many files you see the progress per file. If something goes wrong with a file, Savour tells you which file and why, and carries on with the rest.'
        ],
        [
          'Next',
          'All recipes come together in one [review screen](#import-controleren). Each recipe shows which file it came from.'
        ]
      ]
    }
  },
  {
    id: 'import-website',
    related: ['import-json', 'import-controleren'],
    nl: {
      slug: 'handleiding-recept-van-website-importeren',
      menu: 'Recept van een website',
      h1: 'Een recept van een website importeren',
      title: 'Een recept van een website importeren met de link | Handleiding Savour',
      desc: 'Zo haal je een recept van een website naar Savour: plak de link, Savour leest het recept uit de pagina. Werkt met de meeste receptensites.',
      lead: 'Plak de link van een receptpagina en Savour haalt het recept eruit, zonder reclame en verhalen.',
      sections: [
        [
          'Zo werkt het',
          'Kies “Recept toevoegen” → “Recept importeren” → “Webpagina (link)”. Plak de link van de receptpagina en kies “Verwerken”. Je moet ingelogd zijn.'
        ],
        [
          'Wat Savour leest',
          'De meeste receptensites zetten hun recepten in een vaste opmaak (schema.org) in de pagina. Die leest Savour direct: titel, ingrediënten, bereiding en opbrengst. Staat het recept niet in die opmaak, dan leest de Savour-lezer de tekst van de pagina, en met Pro zo nodig de AI.'
        ],
        [
          'Geen recept gevonden',
          'Vindt Savour op de pagina geen recept, dan meldt het dat en wordt er niets verzonnen. Kopieer in dat geval de tekst van het recept en gebruik [Tekst invoeren](#import-tekst).'
        ],
        [
          'Pagina’s achter een inlog',
          'Pagina’s waarvoor je moet inloggen of betalen, kan Savour niet openen. Kopieer dan de tekst, of sla de pagina op als .html en importeer die bij [Andere bestanden](#import-tekstbestanden).'
        ],
        [
          'Bron vermelden',
          'Gebruik je een recept van een ander, zet de bron dan in een [notitie](#recept-notities) bij het recept.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-from-website',
      menu: 'Recipe from a website',
      h1: 'Import a recipe from a website',
      title: 'Import a recipe from a website with its link | Savour user guide',
      desc: 'How to bring a recipe from a website into Savour: paste the link and Savour reads the recipe from the page. Works with most recipe sites.',
      lead: 'Paste the link of a recipe page and Savour pulls out the recipe, without ads and life stories.',
      sections: [
        [
          'How it works',
          'Choose “Add recipe” → “Import recipe” → “Web page (link)”. Paste the link of the recipe page and choose “Process”. You need to be logged in.'
        ],
        [
          'What Savour reads',
          'Most recipe sites publish their recipes in a standard format (schema.org) inside the page. Savour reads it directly: title, ingredients, method and yield. If the recipe is not in that format, the Savour reader reads the page text, and with Pro the AI where needed.'
        ],
        [
          'No recipe found',
          'If Savour finds no recipe on the page, it tells you and nothing is made up. In that case copy the recipe text and use [Enter text](#import-tekst).'
        ],
        [
          'Pages behind a login',
          'Savour cannot open pages that need a login or payment. Copy the text, or save the page as .html and import it under [Other files](#import-tekstbestanden).'
        ],
        [
          'Credit the source',
          'Using someone else’s recipe? Put the source in a [note](#recept-notities) on the recipe.'
        ]
      ]
    }
  },
  {
    id: 'import-csv',
    related: ['import-plan-to-eat', 'import-json'],
    nl: {
      slug: 'handleiding-csv-en-excel-importeren',
      menu: 'Excel, Google Sheets en CSV',
      h1: 'Recepten importeren uit Excel en CSV',
      title: 'Recepten importeren uit Excel, Google Sheets of CSV | Handleiding Savour',
      desc: 'Zo importeer je een receptenlijst uit Excel of Google Sheets in Savour: opslaan als CSV met kolommen voor titel, ingrediënten en bereiding, één recept per rij.',
      lead: 'Houd je recepten bij in een spreadsheet? Met de juiste kolomnamen staan ze in één keer in Savour.',
      sections: [
        [
          'Eén recept per rij',
          'Savour leest een CSV-bestand met kolomkoppen in de eerste rij en één recept per rij. Het scheidingsteken mag een komma of puntkomma zijn.'
        ],
        [
          'Kolomnamen',
          'Savour herkent deze kolommen, met hoofdletters of zonder:',
          [
            'Titel: title, name, naam, titel of recipe (verplicht).',
            'Ingrediënten: ingredients, ingredient of ingrediënten.',
            'Bereiding: directions, instructions, method, bereiding, steps of preparation.',
            'Opbrengst: servings, yield, opbrengst, porties of serves.',
            'Notities: notes of notities.'
          ]
        ],
        [
          'Meerdere regels in één cel',
          'Zet in de cel voor ingrediënten elk ingrediënt op een eigen regel (in Excel met Alt+Enter, op een Mac met Option+Enter). Hetzelfde geldt voor de stappen van de bereiding.'
        ],
        [
          'Opslaan als CSV',
          'In Excel kies je Bestand → Opslaan als → CSV UTF-8. In Google Sheets kies je Bestand → Downloaden → Kommagescheiden waarden (.csv).'
        ],
        [
          'Importeren',
          'Kies “Recept toevoegen” → “Recept importeren” → “Andere bestanden” of “Uit een andere recepten-app”, kies het .csv-bestand en kies “Verwerken”. Herkent Savour de kolommen niet, dan leest de Savour-lezer het bestand als tekst.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-csv-and-excel',
      menu: 'Excel, Google Sheets and CSV',
      h1: 'Import recipes from Excel and CSV',
      title: 'Import recipes from Excel, Google Sheets or CSV | Savour user guide',
      desc: 'How to import a recipe list from Excel or Google Sheets into Savour: save as CSV with columns for title, ingredients and method, one recipe per row.',
      lead: 'Keep your recipes in a spreadsheet? With the right column names they are in Savour in one go.',
      sections: [
        [
          'One recipe per row',
          'Savour reads a CSV file with column headers in the first row and one recipe per row. The separator can be a comma or a semicolon.'
        ],
        [
          'Column names',
          'Savour recognises these columns, in upper or lower case:',
          [
            'Title: title, name, naam, titel or recipe (required).',
            'Ingredients: ingredients, ingredient or ingrediënten.',
            'Method: directions, instructions, method, bereiding, steps or preparation.',
            'Yield: servings, yield, opbrengst, porties or serves.',
            'Notes: notes or notities.'
          ]
        ],
        [
          'Several lines in one cell',
          'In the ingredients cell, put each ingredient on its own line (Alt+Enter in Excel, Option+Enter on a Mac). The same goes for the method steps.'
        ],
        [
          'Saving as CSV',
          'In Excel choose File → Save As → CSV UTF-8. In Google Sheets choose File → Download → Comma-separated values (.csv).'
        ],
        [
          'Importing',
          'Choose “Add recipe” → “Import recipe” → “Other files” or “From another recipe app”, pick the .csv file and choose “Process”. If Savour does not recognise the columns, the Savour reader reads the file as text.'
        ]
      ]
    }
  },
  {
    id: 'import-json',
    related: ['downloaden', 'import-website', 'import-csv'],
    nl: {
      slug: 'handleiding-json-en-schema-org-importeren',
      menu: 'JSON, schema.org en back-ups',
      h1: 'JSON, schema.org en Savour-bestanden',
      title: 'Recepten importeren uit JSON, JSON-LD en een Savour-back-up | Handleiding',
      desc: 'Zo importeer je recepten in vaste vorm in Savour: JSON en JSON-LD met schema.org Recipe, HTML met schema.org, een Savour-importbestand en je eigen Savour-back-up.',
      lead: 'Recepten die al netjes in vakjes staan: van een ander programma, een website of je eigen back-up.',
      sections: [
        [
          'schema.org Recipe',
          'Veel programma’s en websites bewaren recepten in de vaste vorm van schema.org (Recipe), als JSON-LD of in HTML. Savour leest daaruit de naam, ingrediënten, bereiding (ook in stappen en secties), opbrengst, categorie en notities.'
        ],
        [
          'JSON-bestanden',
          'Kies een .json-bestand bij “Andere bestanden” of “Uit een andere recepten-app”. Savour zoekt de recepten zelf op in het bestand, ook in een lijst of in een export van Mealie of Tandoor. Een willekeurig JSON-bestand zonder recepten in herkenbare vorm kan Savour niet lezen.'
        ],
        [
          'Je Savour-back-up terugzetten',
          'Een [back-up die je uit Savour downloadt](#downloaden) (.json) kun je weer importeren bij “Andere bestanden”. De recepten komen in het [controlescherm](#import-controleren); recepten die al precies zo in je bibliotheek staan, worden niet dubbel opgeslagen.'
        ],
        [
          'Savour-importbestand',
          'Bij de [import service](#import-service) krijg je soms een Savour-importbestand (.json) met recepten die al zijn uitgelezen en nagekeken. Ook dat kies je bij “Andere bestanden”; opslaan gebeurt pas als jij op Opslaan klikt.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-json-and-schema-org',
      menu: 'JSON, schema.org and backups',
      h1: 'JSON, schema.org and Savour files',
      title: 'Import recipes from JSON, JSON-LD and a Savour backup | User guide',
      desc: 'How to import structured recipes into Savour: JSON and JSON-LD with schema.org Recipe, HTML with schema.org, a Savour import file and your own Savour backup.',
      lead: 'Recipes that are already neatly in fields: from another program, a website or your own backup.',
      sections: [
        [
          'schema.org Recipe',
          'Many programs and websites store recipes in the schema.org Recipe format, as JSON-LD or inside HTML. Savour reads the name, ingredients, method (including steps and sections), yield, category and notes.'
        ],
        [
          'JSON files',
          'Pick a .json file under “Other files” or “From another recipe app”. Savour finds the recipes in the file itself, also in a list or in a Mealie or Tandoor export. Savour cannot read an arbitrary JSON file without recipes in a recognisable form.'
        ],
        [
          'Restoring your Savour backup',
          'A [backup you download from Savour](#downloaden) (.json) can be imported again under “Other files”. The recipes appear in the [review screen](#import-controleren); recipes already in your library exactly like this are not saved twice.'
        ],
        [
          'Savour import file',
          'With the [import service](#import-service) you sometimes receive a Savour import file (.json) with recipes that have already been read and checked. Pick it under “Other files” too; nothing is saved until you click Save.'
        ]
      ]
    }
  },
  {
    id: 'import-notitie-apps',
    related: ['import-tekstbestanden', 'import-evernote', 'import-google-keep'],
    nl: {
      slug: 'handleiding-importeren-uit-notitie-apps',
      menu: 'Notitie-apps: Notes, OneNote, Notion',
      h1: 'Recepten uit notitie-apps importeren',
      title: 'Recepten uit Apple Notes, OneNote, Notion en Obsidian importeren | Handleiding',
      desc: 'Zo zet je recepten uit notitie-apps in Savour: Apple Notes, Google Docs, OneNote, Notion, Obsidian, Bear, Joplin en Simplenote, via Word, PDF, Markdown of tekst.',
      lead: 'Staan je recepten verspreid over notities op je telefoon? Zo krijg je ze in Savour.',
      sections: [
        [
          'De korte weg',
          'Voor één of een paar recepten: open de notitie, kopieer de tekst en plak hem bij [Tekst invoeren](#import-tekst). Je kunt meerdere recepten tegelijk plakken.'
        ],
        [
          'Apple Notes',
          'Op een Mac kies je een notitie en dan Archief → Exporteer als PDF, en importeer je die [PDF](#import-pdf). Op een iPhone kopieer je de tekst en plak je hem bij Tekst invoeren.'
        ],
        [
          'Google Docs',
          'Kies Bestand → Downloaden → Microsoft Word (.docx) en importeer het [Word-bestand](#import-word). Eén document met al je recepten is prima.'
        ],
        [
          'Microsoft OneNote',
          'Exporteer een pagina of sectie als Word of PDF (Bestand → Exporteren) en importeer dat bestand. Een losse pagina kun je ook kopiëren en plakken.'
        ],
        [
          'Notion',
          'Kies bij de pagina met je recepten ⋯ → Exporteren → Markdown & CSV. Je krijgt een zip met .md-bestanden; kies die zip bij “Alle bestanden door elkaar”. Zie [Een hele map of zip](#import-hele-map).'
        ],
        [
          'Obsidian, Bear, Joplin en Simplenote',
          'Deze apps bewaren notities als Markdown of tekst, of kunnen ze zo exporteren. Kies de map met .md- of .txt-bestanden met “Hele map kiezen”, of zet ze in een zip. Elk bestand is dan een recept, met de kop met # als receptnaam.'
        ],
        [
          'Evernote en Google Keep',
          'Daarvoor heeft Savour een eigen import: zie [Evernote](#import-evernote) en [Google Keep](#import-google-keep).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-from-notes-apps',
      menu: 'Notes apps: Notes, OneNote, Notion',
      h1: 'Import recipes from notes apps',
      title: 'Import recipes from Apple Notes, OneNote, Notion and Obsidian | User guide',
      desc: 'How to bring recipes from notes apps into Savour: Apple Notes, Google Docs, OneNote, Notion, Obsidian, Bear, Joplin and Simplenote, via Word, PDF, Markdown or text.',
      lead: 'Recipes scattered across notes on your phone? This is how you get them into Savour.',
      sections: [
        [
          'The quick way',
          'For one or a few recipes: open the note, copy the text and paste it under [Enter text](#import-tekst). You can paste several recipes at once.'
        ],
        [
          'Apple Notes',
          'On a Mac select a note and choose File → Export as PDF, then import that [PDF](#import-pdf). On an iPhone, copy the text and paste it under Enter text.'
        ],
        [
          'Google Docs',
          'Choose File → Download → Microsoft Word (.docx) and import the [Word file](#import-word). One document with all your recipes is fine.'
        ],
        [
          'Microsoft OneNote',
          'Export a page or section as Word or PDF (File → Export) and import that file. You can also copy and paste a single page.'
        ],
        [
          'Notion',
          'On the page with your recipes choose ⋯ → Export → Markdown & CSV. You get a zip with .md files; pick that zip under “All files mixed”. See [A whole folder or zip](#import-hele-map).'
        ],
        [
          'Obsidian, Bear, Joplin and Simplenote',
          'These apps store notes as Markdown or text, or can export them that way. Pick the folder of .md or .txt files with “Choose a whole folder”, or put them in a zip. Each file is then a recipe, with the # heading as the recipe name.'
        ],
        [
          'Evernote and Google Keep',
          'Savour has its own import for these: see [Evernote](#import-evernote) and [Google Keep](#import-google-keep).'
        ]
      ]
    }
  },
  {
    id: 'import-ai',
    related: ['import-fotos', 'gratis-en-pro', 'import-controleren'],
    nl: {
      slug: 'handleiding-savour-lezer-en-ai',
      menu: 'De Savour-lezer en de AI',
      title: 'De Savour-lezer en AI: wanneer leest de AI je recepten | Handleiding',
      desc: 'Hoe Savour recepten leest: eerst altijd de Savour-lezer, gratis en zonder AI. De AI van Savour Pro leest foto’s, scans en recepten met twijfel, tot 150 per maand.',
      lead: 'Wat de Savour-lezer doet, wanneer de AI erbij komt en waarom er nooit iets wordt verzonnen.',
      sections: [
        [
          'De Savour-lezer gaat altijd eerst',
          'Word, PDF, tekst en exports uit andere apps leest de Savour-lezer: een eigen programma dat recepten opsplitst en titel, opbrengst, ingrediënten en bereiding herkent. Dat is gratis en er gaat niets naar een AI.'
        ],
        [
          'Wanneer de AI helpt',
          'Met [Savour Pro](#gratis-en-pro) komt de AI erbij voor:',
          [
            'Foto’s van handgeschreven of gescande recepten, en de camera.',
            'Gescande PDF’s zonder tekst.',
            'Recepten waarover de Savour-lezer twijfelt: die worden opnieuw gelezen.'
          ]
        ],
        [
          'Zonder Pro',
          'Op een gratis account zie je hoeveel recepten met twijfel zijn gelezen. Die zijn gemarkeerd, zodat je ze zelf kunt nalopen in het [controlescherm](#import-controleren). Er gaat niets verloren.'
        ],
        [
          'De limiet',
          'Savour Pro leest tot 150 imports per maand met AI. Is de limiet bereikt, dan neemt de Savour-lezer het over, gemarkeerd om te controleren.'
        ],
        [
          'Nooit verzonnen',
          'De AI mag alleen lezen wat er staat. Staat de bereiding niet op het kladje, dan staat hij ook niet in het recept. Waarom dat zo belangrijk is, lees je in [Waarom AI je recept nooit mag verzinnen](/blog/ai-mag-je-recept-niet-verzinnen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-savour-reader-and-ai',
      menu: 'The Savour reader and AI',
      title: 'The Savour reader and AI: when AI reads your recipes | User guide',
      desc: 'How Savour reads recipes: always the Savour reader first, free and without AI. Savour Pro’s AI reads photos, scans and doubtful recipes, up to 150 a month.',
      lead: 'What the Savour reader does, when AI steps in and why nothing is ever made up.',
      sections: [
        [
          'The Savour reader always goes first',
          'Word, PDF, text and exports from other apps are read by the Savour reader: Savour’s own program that splits recipes and recognises title, yield, ingredients and method. It is free and nothing goes to an AI.'
        ],
        [
          'When the AI helps',
          'With [Savour Pro](#gratis-en-pro) the AI steps in for:',
          [
            'Photos of handwritten or scanned recipes, and the camera.',
            'Scanned PDFs without text.',
            'Recipes the Savour reader has doubts about: these are read again.'
          ]
        ],
        [
          'Without Pro',
          'On a free account you see how many recipes were read with doubts. They are marked so you can check them yourself in the [review screen](#import-controleren). Nothing is lost.'
        ],
        [
          'The limit',
          'Savour Pro reads up to 150 imports a month with AI. When the limit is reached, the Savour reader takes over, marked for review.'
        ],
        [
          'Never made up',
          'The AI may only read what is there. If the method is not on the note, it is not in the recipe. Why this matters: [Why AI should never invent your recipe](/en/blog/ai-should-never-invent-recipes).'
        ]
      ]
    }
  },
  {
    id: 'overstappen',
    related: ['importeren', 'import-service', 'import-problemen'],
    nl: {
      slug: 'handleiding-overstappen-naar-savour',
      menu: 'Overstappen naar Savour',
      title: 'Overstappen naar Savour vanuit een andere recepten-app | Handleiding',
      desc: 'Alle recepten-apps waaruit je naar Savour overstapt: Paprika, Mela, Mealie, Tandoor, Recipe Keeper, Copy Me That, Crouton, MasterCook, Cookmate, Living Cookbook en meer.',
      lead: 'Vanuit welke app je ook komt: maak een export, kies het bestand en je recepten staan in Savour.',
      sections: [
        [
          'Zo werkt overstappen',
          'Bijna elke recepten-app kan een export maken: een bestand met al je recepten. Dat bestand kies je in Savour bij “Uit een andere recepten-app”. Savour herkent zelf uit welke app het komt.'
        ],
        [
          'Apps met een eigen import',
          'Per app staat beschreven hoe je de export maakt:',
          [
            '[Paprika](#import-paprika): .paprikarecipes en .paprikarecipe',
            '[Mela](#import-mela): .melarecipes en .melarecipe',
            '[Mealie](#import-mealie): .zip met JSON',
            '[Tandoor](#import-tandoor): .json of .zip',
            '[Recipe Keeper](#import-recipe-keeper): .zip',
            '[Copy Me That](#import-copy-me-that): .zip met HTML',
            '[Crouton](#import-crouton): .zip met .crumb',
            '[MasterCook](#import-mastercook): .mx2 en .mxp',
            '[Cookmate](#import-cookmate): .mcb',
            '[Living Cookbook](#import-living-cookbook): .fdx en .fdxz',
            '[Evernote](#import-evernote): .enex',
            '[Google Keep](#import-google-keep): .zip uit Google Takeout',
            '[Flavorish](#import-flavorish): .zip',
            '[CookBookManager](#import-cookbookmanager): .zip met .yml',
            '[Plan to Eat](#import-plan-to-eat): .csv',
            '[Pepperplate](#import-pepperplate): zonder exportbestand'
          ]
        ],
        [
          'Staat je app er niet bij?',
          'Kijk of je app kan exporteren als CSV, HTML, JSON (schema.org), Word, PDF of tekst; die leest Savour bijna altijd. Zie [Excel en CSV](#import-csv), [JSON en schema.org](#import-json) en [Tekstbestanden](#import-tekstbestanden). Lukt het niet, [neem dan contact op](/contact): stuur een voorbeeld van je export mee.'
        ],
        [
          'Je oude app opzeggen',
          'Houd je oude app nog even naast Savour tot je alles hebt nagekeken. Bewaar het exportbestand als back-up.'
        ],
        [
          'Vergelijken',
          'Twijfel je nog? In [Savour, Paprika, Meez of Galley](/blog/savour-paprika-meez-galley-vergelijken) zetten we de verschillen en de doelgroep per app op een rij.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-moving-to-savour',
      menu: 'Moving to Savour',
      title: 'Move to Savour from another recipe app | Savour user guide',
      desc: 'Every recipe app you can move to Savour from: Paprika, Mela, Mealie, Tandoor, Recipe Keeper, Copy Me That, Crouton, MasterCook, Cookmate, Living Cookbook and more.',
      lead: 'Whichever app you come from: make an export, pick the file and your recipes are in Savour.',
      sections: [
        [
          'How moving works',
          'Almost every recipe app can make an export: a file with all your recipes. Pick that file in Savour under “From another recipe app”. Savour recognises which app it came from by itself.'
        ],
        [
          'Apps with their own import',
          'Each app has a page on how to make the export:',
          [
            '[Paprika](#import-paprika): .paprikarecipes and .paprikarecipe',
            '[Mela](#import-mela): .melarecipes and .melarecipe',
            '[Mealie](#import-mealie): .zip with JSON',
            '[Tandoor](#import-tandoor): .json or .zip',
            '[Recipe Keeper](#import-recipe-keeper): .zip',
            '[Copy Me That](#import-copy-me-that): .zip with HTML',
            '[Crouton](#import-crouton): .zip with .crumb',
            '[MasterCook](#import-mastercook): .mx2 and .mxp',
            '[Cookmate](#import-cookmate): .mcb',
            '[Living Cookbook](#import-living-cookbook): .fdx and .fdxz',
            '[Evernote](#import-evernote): .enex',
            '[Google Keep](#import-google-keep): .zip from Google Takeout',
            '[Flavorish](#import-flavorish): .zip',
            '[CookBookManager](#import-cookbookmanager): .zip with .yml',
            '[Plan to Eat](#import-plan-to-eat): .csv',
            '[Pepperplate](#import-pepperplate): no export file'
          ]
        ],
        [
          'Your app is not listed?',
          'Check whether your app can export as CSV, HTML, JSON (schema.org), Word, PDF or text; Savour almost always reads those. See [Excel and CSV](#import-csv), [JSON and schema.org](#import-json) and [Text files](#import-tekstbestanden). If it doesn’t work, [get in touch](/en/contact) and send a sample of your export.'
        ],
        [
          'Cancelling your old app',
          'Keep your old app next to Savour for a while until you have checked everything. Keep the export file as a backup.'
        ],
        [
          'Comparing',
          'Still deciding? [Savour vs Paprika, Meez and Galley](/en/blog/savour-vs-paprika-meez-galley) lists the differences and who each app is for.'
        ]
      ]
    }
  },
  appPage({
    id: 'import-paprika',
    name: 'Paprika',
    slug: 'paprika',
    files: {
      nl: 'een .paprikarecipes-bestand (alle recepten) of een .paprikarecipe-bestand (één recept)',
      en: 'a .paprikarecipes file (all recipes) or a .paprikarecipe file (one recipe)'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Paprika Recipe Manager in Savour: exporteer als .paprikarecipes en importeer het bestand, met foto’s, notities en opbrengst.',
      lead: 'Van Paprika naar Savour in een paar minuten, met je foto’s erbij.',
      export:
        'Kies in Paprika de recepten die je wilt meenemen (of alles) en kies Exporteren. Kies als formaat “Paprika Recipe Format”. Op de computer vind je Exporteren in het menu Bestand; op een telefoon of tablet via het deelmenu. De precieze plek verschilt per versie.',
      carries:
        'Savour neemt over: de naam, ingrediënten, bereiding, opbrengst (servings), notities (onderaan de bereiding) en de foto van het recept.',
      extra: [
        [
          'Ook als HTML',
          'Exporteerde je uit Paprika als HTML, dan kun je die bestanden of de zip ook kiezen; Savour leest de recepten uit de HTML.'
        ]
      ]
    },
    en: {
      desc: 'How to move your recipes from Paprika Recipe Manager to Savour: export as .paprikarecipes and import the file, with photos, notes and yield.',
      lead: 'From Paprika to Savour in a few minutes, photos included.',
      export:
        'In Paprika, select the recipes you want to take along (or all) and choose Export. Choose “Paprika Recipe Format” as the format. On a computer Export is in the File menu; on a phone or tablet in the share menu. The exact place differs per version.',
      carries:
        'Savour takes over: the name, ingredients, method, yield (servings), notes (at the end of the method) and the recipe photo.',
      extra: [
        [
          'As HTML too',
          'If you exported from Paprika as HTML, you can pick those files or the zip as well; Savour reads the recipes from the HTML.'
        ]
      ]
    }
  }),
  appPage({
    id: 'import-mela',
    name: 'Mela',
    slug: 'mela',
    files: {
      nl: 'een .melarecipes-archief (meerdere recepten) of een .melarecipe-bestand (één recept)',
      en: 'a .melarecipes archive (several recipes) or a .melarecipe file (one recipe)'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Mela in Savour: exporteer als .melarecipes en importeer het archief, met foto, kopjes, notities en opbrengst.',
      lead: 'Je Mela-recepten met foto’s en kopjes naar Savour.',
      export:
        'Op de Mac klik je in Mela met de rechtermuisknop op “Alle” in het menu links en kies je de export van alle recepten. Kies waar je het .melarecipes-archief bewaart. Een kleinere selectie exporteer je op dezelfde manier vanuit een andere categorie, zoals Favorieten. Eén recept deel je als .melarecipe.',
      carries:
        'Savour neemt over: de naam, ingrediënten, bereiding, opbrengst, notities en de eerste foto. Kopjes in je ingrediënten of bereiding (“# Saus”) worden [delen van het recept](#recept-delen), zoals “Saus:”.'
    },
    en: {
      desc: 'How to move your recipes from Mela to Savour: export as .melarecipes and import the archive, with photo, headings, notes and yield.',
      lead: 'Your Mela recipes with photos and headings into Savour.',
      export:
        'On a Mac, right-click “All” in Mela’s left-hand menu and choose to export all recipes. Choose where to save the .melarecipes archive. Export a smaller selection the same way from another category, such as Favourites. Share a single recipe as .melarecipe.',
      carries:
        'Savour takes over: the name, ingredients, method, yield, notes and the first photo. Headings in your ingredients or method (“# Sauce”) become [parts of the recipe](#recept-delen), such as “Sauce:”.'
    }
  }),
  appPage({
    id: 'import-mealie',
    name: 'Mealie',
    slug: 'mealie',
    files: {
      nl: 'een export van je recepten als JSON, los of in een .zip',
      en: 'an export of your recipes as JSON, on its own or in a .zip'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Mealie in Savour: exporteer je recepten als JSON of zip en importeer het bestand. Ingrediënten met hoeveelheid en eenheid gaan mee.',
      lead: 'Van je eigen Mealie-server naar Savour.',
      export:
        'Exporteer in Mealie je recepten als JSON. Afhankelijk van je versie vind je dat bij het exporteren van recepten of bij gegevensbeheer. Je krijgt een .json-bestand of een .zip met JSON-bestanden.',
      carries:
        'Savour neemt over: de naam, ingrediënten (ook als hoeveelheid, eenheid, product en notitie apart staan), bereiding, opbrengst en notities.'
    },
    en: {
      desc: 'How to move your recipes from Mealie to Savour: export your recipes as JSON or a zip and import the file. Ingredients with quantity and unit come across.',
      lead: 'From your own Mealie server to Savour.',
      export:
        'Export your recipes from Mealie as JSON. Depending on your version you find this under exporting recipes or under data management. You get a .json file or a .zip with JSON files.',
      carries:
        'Savour takes over: the name, ingredients (also when quantity, unit, food and note are stored separately), method, yield and notes.'
    }
  }),
  appPage({
    id: 'import-tandoor',
    name: 'Tandoor',
    slug: 'tandoor',
    files: {
      nl: 'een export als .json, of een .zip met JSON-bestanden',
      en: 'an export as .json, or a .zip with JSON files'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Tandoor Recipes in Savour: exporteer je recepten als JSON en importeer het bestand.',
      lead: 'Van Tandoor Recipes naar Savour.',
      export:
        'Open in Tandoor de instellingen en kies Exporteren. Kies een exporttype met recepten in JSON in schema.org-vorm, kies “Alle recepten” of een selectie en download het bestand als het klaar is.',
      carries:
        'Savour neemt over: de naam, ingrediënten, bereiding (ook in stappen), opbrengst en notities. Foto’s zitten niet in zo’n export.'
    },
    en: {
      desc: 'How to move your recipes from Tandoor Recipes to Savour: export your recipes as JSON and import the file.',
      lead: 'From Tandoor Recipes to Savour.',
      export:
        'Open the settings in Tandoor and choose Export. Choose an export type with recipes as JSON in schema.org form, choose “All recipes” or a selection and download the file when it is ready.',
      carries:
        'Savour takes over: the name, ingredients, method (including steps), yield and notes. Photos are not part of such an export.'
    }
  }),
  appPage({
    id: 'import-recipe-keeper',
    name: 'Recipe Keeper',
    slug: 'recipe-keeper',
    files: {
      nl: 'het .zip-bestand dat Recipe Keeper bij exporteren maakt',
      en: 'the .zip file Recipe Keeper makes when you export'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Recipe Keeper in Savour: exporteer je recepten als zip en importeer die in één keer.',
      lead: 'Van Recipe Keeper naar Savour, met al je recepten in één zip.',
      export:
        'Kies in Recipe Keeper in de instellingen de export van je recepten. Je krijgt een .zip-bestand. Pak het niet uit.',
      carries:
        'Savour neemt over: de naam, ingrediënten, bereiding, opbrengst, categorie en notities, zoals ze in de export staan.'
    },
    en: {
      desc: 'How to move your recipes from Recipe Keeper to Savour: export your recipes as a zip and import it in one go.',
      lead: 'From Recipe Keeper to Savour, with all your recipes in one zip.',
      export:
        'In Recipe Keeper, choose the export of your recipes in the settings. You get a .zip file. Don’t unzip it.',
      carries: 'Savour takes over: the name, ingredients, method, yield, category and notes, as they are in the export.'
    }
  }),
  appPage({
    id: 'import-copy-me-that',
    name: 'Copy Me That',
    slug: 'copy-me-that',
    files: { nl: 'een .zip-export met de optie HTML', en: 'a .zip export with the HTML option' },
    nl: {
      desc: 'Zo zet je je recepten uit Copy Me That in Savour: exporteer als HTML, je krijgt een zip, en importeer die in Savour.',
      lead: 'Van Copy Me That naar Savour.',
      export:
        'Kies in Copy Me That bij je account de export van je recepten en kies de optie “HTML”. Je krijgt een .zip-bestand.',
      carries:
        'Savour neemt over: de naam, ingrediënten, bereiding, opbrengst en notities. Staat een recept niet in vaste vorm in de HTML, dan leest de Savour-lezer de tekst.'
    },
    en: {
      desc: 'How to move your recipes from Copy Me That to Savour: export as HTML, you get a zip, and import it into Savour.',
      lead: 'From Copy Me That to Savour.',
      export:
        'In Copy Me That, choose the export of your recipes in your account and pick the “HTML” option. You get a .zip file.',
      carries:
        'Savour takes over: the name, ingredients, method, yield and notes. If a recipe is not in a structured form in the HTML, the Savour reader reads the text.'
    }
  }),
  appPage({
    id: 'import-crouton',
    name: 'Crouton',
    slug: 'crouton',
    files: {
      nl: 'een .zip met .crumb-bestanden, of één .crumb-bestand',
      en: 'a .zip of .crumb files, or a single .crumb file'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Crouton in Savour: exporteer je recepten als zip met .crumb-bestanden en importeer die.',
      lead: 'Van Crouton op iPhone, iPad of Mac naar Savour.',
      export:
        'Open Crouton op iOS of macOS en ga naar de instellingen. Kies de export van je recepten (de precieze naam verschilt per versie). Je krijgt een .zip met per recept een .crumb-bestand.',
      carries: 'Savour neemt over: de naam, ingrediënten met hoeveelheid en eenheid, bereiding, opbrengst en notities.'
    },
    en: {
      desc: 'How to move your recipes from Crouton to Savour: export your recipes as a zip of .crumb files and import it.',
      lead: 'From Crouton on iPhone, iPad or Mac to Savour.',
      export:
        'Open Crouton on iOS or macOS and go to the settings. Choose the export of your recipes (the exact name differs per version). You get a .zip with a .crumb file per recipe.',
      carries: 'Savour takes over: the name, ingredients with quantity and unit, method, yield and notes.'
    }
  }),
  appPage({
    id: 'import-mastercook',
    name: 'MasterCook',
    slug: 'mastercook',
    files: {
      nl: 'een .mx2-bestand (MasterCook XML) of een .mxp-bestand',
      en: 'an .mx2 file (MasterCook XML) or an .mxp file'
    },
    nl: {
      desc: 'Zo zet je je recepten uit MasterCook in Savour: exporteer als .mx2 of .mxp en importeer het bestand.',
      lead: 'Van MasterCook naar Savour, ook met oude kookboeken.',
      export:
        'Open in MasterCook het kookboek en kies Bestand → Exporteren. Kies als formaat MasterCook (.mx2) of de oudere tekstexport (.mxp).',
      carries:
        'Savour neemt over: de naam, ingrediënten met hoeveelheid en eenheid, bereiding, porties en notities. Een .mxp-bestand leest de Savour-lezer als tekst; kijk die recepten iets beter na.'
    },
    en: {
      desc: 'How to move your recipes from MasterCook to Savour: export as .mx2 or .mxp and import the file.',
      lead: 'From MasterCook to Savour, old cookbooks included.',
      export:
        'Open the cookbook in MasterCook and choose File → Export. Choose MasterCook (.mx2) or the older text export (.mxp) as the format.',
      carries:
        'Savour takes over: the name, ingredients with quantity and unit, method, servings and notes. The Savour reader reads an .mxp file as text; check those recipes a little more closely.'
    }
  }),
  appPage({
    id: 'import-cookmate',
    name: 'Cookmate',
    slug: 'cookmate',
    files: {
      nl: 'een .mcb-bestand, de export van Cookmate (vroeger My Cookbook)',
      en: 'an .mcb file, the export from Cookmate (formerly My Cookbook)'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Cookmate (My Cookbook) in Savour: exporteer als .mcb en importeer het bestand, met foto’s.',
      lead: 'Van Cookmate naar Savour, met de foto’s van je recepten.',
      export:
        'Kies in Cookmate de export of back-up van je recepten. Bewaar het .mcb-bestand op je telefoon of computer; Savour leest het zonder dat je het uitpakt.',
      carries:
        'Savour neemt over: de naam, ingrediënten, bereiding, opbrengst, opmerkingen (onderaan de bereiding) en de foto als die in de export zit.'
    },
    en: {
      desc: 'How to move your recipes from Cookmate (My Cookbook) to Savour: export as .mcb and import the file, with photos.',
      lead: 'From Cookmate to Savour, with your recipe photos.',
      export:
        'In Cookmate, choose the export or backup of your recipes. Save the .mcb file on your phone or computer; Savour reads it without unpacking.',
      carries:
        'Savour takes over: the name, ingredients, method, yield, comments (at the end of the method) and the photo if it is in the export.'
    }
  }),
  appPage({
    id: 'import-living-cookbook',
    name: 'Living Cookbook',
    slug: 'living-cookbook',
    files: { nl: 'een .fdx- of .fdxz-bestand', en: 'an .fdx or .fdxz file' },
    nl: {
      desc: 'Zo zet je je recepten uit Living Cookbook in Savour: exporteer je kookboek als FDX of FDXZ en importeer het bestand, met foto’s en tips.',
      lead: 'Van Living Cookbook naar Savour.',
      export:
        'Exporteer in Living Cookbook je kookboek of je recepten in het formaat FDX of FDXZ (FDXZ is een gecomprimeerde versie met foto’s). Een .lcb-bestand (de kookboekdatabase zelf) kan Savour niet lezen.',
      carries:
        'Savour neemt over: de naam, ingrediënten met hoeveelheid en eenheid, bereidingsstappen, porties, opmerkingen, tips en de foto.'
    },
    en: {
      desc: 'How to move your recipes from Living Cookbook to Savour: export your cookbook as FDX or FDXZ and import the file, with photos and tips.',
      lead: 'From Living Cookbook to Savour.',
      export:
        'In Living Cookbook, export your cookbook or recipes in the FDX or FDXZ format (FDXZ is a compressed version with photos). Savour cannot read an .lcb file (the cookbook database itself).',
      carries:
        'Savour takes over: the name, ingredients with quantity and unit, method steps, servings, comments, tips and the photo.'
    }
  }),
  appPage({
    id: 'import-evernote',
    name: 'Evernote',
    slug: 'evernote',
    files: { nl: 'een .enex-bestand met je receptnotities', en: 'an .enex file with your recipe notes' },
    related: ['import-notitie-apps'],
    nl: {
      desc: 'Zo zet je recepten uit Evernote in Savour: exporteer je receptnotities als .enex, Savour leest elke notitie als recept.',
      lead: 'Recepten die je jarenlang in Evernote bewaarde, in één keer naar Savour.',
      export:
        'Kies in Evernote de notities met je recepten (of een hele notitieblok) en kies Bestand → Notities exporteren. Kies het formaat .enex en bewaar het bestand.',
      carries:
        'Elke notitie wordt één recept, met de titel van de notitie als receptnaam. De tekst leest de Savour-lezer: ingrediënten, bereiding en opbrengst. Notities zonder ingrediënten of bereiding (bijvoorbeeld een lijstje) worden als “nakijken” gemarkeerd, zodat je ze in het controlescherm makkelijk weghaalt. Labels (tags) en bijlagen gaan niet mee.'
    },
    en: {
      desc: 'How to move recipes from Evernote to Savour: export your recipe notes as .enex and Savour reads each note as a recipe.',
      lead: 'Recipes you kept in Evernote for years, into Savour in one go.',
      export:
        'In Evernote, select the notes with your recipes (or a whole notebook) and choose File → Export Notes. Choose the .enex format and save the file.',
      carries:
        'Each note becomes one recipe, with the note title as the recipe name. The Savour reader reads the text: ingredients, method and yield. Notes without ingredients or method (a list, for example) are marked for review so you can remove them easily in the review screen. Tags and attachments don’t come across.'
    }
  }),
  appPage({
    id: 'import-google-keep',
    name: 'Google Keep',
    slug: 'google-keep',
    files: {
      nl: 'een .zip uit Google Takeout met je Keep-notities',
      en: 'a .zip from Google Takeout with your Keep notes'
    },
    related: ['import-notitie-apps'],
    nl: {
      desc: 'Zo zet je recepten uit Google Keep in Savour: download je notities met Google Takeout als zip en importeer die. Elke notitie wordt een recept.',
      lead: 'Je receptnotities uit Google Keep naar Savour.',
      export:
        'Ga naar Google Takeout (takeout.google.com), kies alleen “Keep” en maak de export. Download de .zip als Google laat weten dat hij klaar is.',
      exportSteps: undefined,
      carries:
        'Elke notitie wordt één recept, met de titel van de notitie als receptnaam; de datum erboven valt weg. Afvinklijstjes worden een regel per item. Notities zonder bereiding (bijvoorbeeld een boodschappenlijst) worden als “nakijken” gemarkeerd, zodat je ze in het controlescherm weghaalt.'
    },
    en: {
      desc: 'How to move recipes from Google Keep to Savour: download your notes as a zip with Google Takeout and import it. Each note becomes a recipe.',
      lead: 'Your recipe notes from Google Keep into Savour.',
      export:
        'Go to Google Takeout (takeout.google.com), select only “Keep” and create the export. Download the .zip when Google tells you it is ready.',
      carries:
        'Each note becomes one recipe, with the note title as the recipe name; the date above it is left out. Checklists become one line per item. Notes without a method (a shopping list, for example) are marked for review so you can remove them in the review screen.'
    }
  }),
  appPage({
    id: 'import-flavorish',
    name: 'Flavorish',
    slug: 'flavorish',
    files: {
      nl: 'het .zip-bestand dat Flavorish bij exporteren maakt',
      en: 'the .zip file Flavorish makes when you export'
    },
    nl: {
      desc: 'Zo zet je je recepten uit Flavorish in Savour: exporteer je recepten als zip en importeer die, met foto’s en kopjes.',
      lead: 'Van Flavorish naar Savour, met je foto’s.',
      export:
        'Open in Flavorish het tabblad Account. Kies bij “Import & Export” de export van je recepten. Je krijgt een .zip met je recepten en foto’s.',
      carries:
        'Savour neemt over: de naam, ingrediënten en bereiding in de goede volgorde, kopjes als [delen van het recept](#recept-delen), porties, notities en de foto.'
    },
    en: {
      desc: 'How to move your recipes from Flavorish to Savour: export your recipes as a zip and import it, with photos and headings.',
      lead: 'From Flavorish to Savour, with your photos.',
      export:
        'Open the Account tab in Flavorish. Under “Import & Export” choose to export your recipes. You get a .zip with your recipes and photos.',
      carries:
        'Savour takes over: the name, ingredients and method in the right order, headings as [parts of the recipe](#recept-delen), servings, notes and the photo.'
    }
  }),
  appPage({
    id: 'import-cookbookmanager',
    name: 'CookBookManager',
    slug: 'cookbookmanager',
    files: {
      nl: 'de YAML-export van CookBookManager.com: een .zip met een .yml-bestand per recept',
      en: 'the YAML export from CookBookManager.com: a .zip with one .yml file per recipe'
    },
    nl: {
      desc: 'Zo zet je je recepten uit CookBookManager.com in Savour: kies de YAML-export, je krijgt een zip, en importeer die in Savour.',
      lead: 'Van CookBookManager.com naar Savour.',
      export: 'Kies op CookBookManager.com de export van je recepten en kies het formaat YAML. Bewaar de .zip.',
      carries:
        'Savour neemt over: de naam, ingrediënten, bereiding, porties, notities (met een videolink als die er is) en het eerste label als categorie. Een ingrediëntregel die eindigt op een dubbele punt wordt een [deel van het recept](#recept-delen).'
    },
    en: {
      desc: 'How to move your recipes from CookBookManager.com to Savour: choose the YAML export, you get a zip, and import it into Savour.',
      lead: 'From CookBookManager.com to Savour.',
      export: 'On CookBookManager.com choose the export of your recipes and pick the YAML format. Save the .zip.',
      carries:
        'Savour takes over: the name, ingredients, method, servings, notes (with a video link if there is one) and the first tag as category. An ingredient line ending in a colon becomes a [part of the recipe](#recept-delen).'
    }
  }),
  appPage({
    id: 'import-plan-to-eat',
    name: 'Plan to Eat',
    slug: 'plan-to-eat',
    files: { nl: 'een .csv-export van je recepten', en: 'a .csv export of your recipes' },
    related: ['import-csv'],
    nl: {
      desc: 'Zo zet je je recepten uit Plan to Eat in Savour: exporteer je recepten als CSV en importeer het bestand.',
      lead: 'Van Plan to Eat naar Savour.',
      export: 'Kies in Plan to Eat bij je instellingen de export van je recepten als CSV en download het bestand.',
      carries:
        'Savour leest de kolommen voor titel, ingrediënten, bereiding, porties en notities. Hoe Savour kolommen herkent, staat bij [Excel en CSV](#import-csv).'
    },
    en: {
      desc: 'How to move your recipes from Plan to Eat to Savour: export your recipes as CSV and import the file.',
      lead: 'From Plan to Eat to Savour.',
      export: 'In Plan to Eat, choose the export of your recipes as CSV in your settings and download the file.',
      carries:
        'Savour reads the columns for title, ingredients, method, servings and notes. How Savour recognises columns is in [Excel and CSV](#import-csv).'
    }
  }),
  {
    id: 'import-pepperplate',
    related: ['overstappen', 'import-website', 'import-tekst'],
    nl: {
      slug: 'handleiding-importeren-uit-pepperplate',
      menu: 'Overstappen vanuit Pepperplate',
      h1: 'Recepten uit Pepperplate overzetten',
      title: 'Recepten uit Pepperplate overzetten naar Savour | Handleiding',
      desc: 'Zo zet je recepten uit Pepperplate over naar Savour: Pepperplate heeft geen bruikbaar exportbestand, maar met de link of door te kopiëren lukt het wel.',
      lead: 'Pepperplate heeft geen export die Savour kan lezen. Zo krijg je je recepten toch over.',
      sections: [
        [
          'Waarom geen eigen import',
          'Pepperplate maakt geen exportbestand met recepten in vaste vorm. Andere apps halen recepten op door met je Pepperplate-wachtwoord in te loggen. Savour doet dat bewust niet: Savour vraagt nooit om je wachtwoord van een andere dienst.'
        ],
        [
          'Recepten van websites',
          'Kwam een recept oorspronkelijk van een website, importeer het dan opnieuw met de link: zie [Recept van een website](#import-website).'
        ],
        [
          'Eigen recepten',
          'Open het recept in Pepperplate, kopieer de tekst en plak die bij [Tekst invoeren](#import-tekst). Je kunt meerdere recepten achter elkaar plakken; laat een witregel tussen de recepten.'
        ],
        [
          'Veel recepten',
          'Heb je honderden recepten en geen tijd om te kopiëren, dan zet de [import service](#import-service) ze voor je over.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-from-pepperplate',
      menu: 'Moving from Pepperplate',
      h1: 'Moving recipes from Pepperplate',
      title: 'Move your recipes from Pepperplate to Savour | User guide',
      desc: 'How to move recipes from Pepperplate to Savour: Pepperplate has no usable export file, but with the link or by copying it still works.',
      lead: 'Pepperplate has no export Savour can read. This is how you still get your recipes across.',
      sections: [
        [
          'Why there is no dedicated import',
          'Pepperplate does not make an export file with structured recipes. Other apps fetch recipes by logging in with your Pepperplate password. Savour deliberately doesn’t: Savour never asks for your password to another service.'
        ],
        [
          'Recipes from websites',
          'If a recipe originally came from a website, import it again with the link: see [Recipe from a website](#import-website).'
        ],
        [
          'Your own recipes',
          'Open the recipe in Pepperplate, copy the text and paste it under [Enter text](#import-tekst). You can paste several recipes in a row; leave a blank line between them.'
        ],
        [
          'Many recipes',
          'With hundreds of recipes and no time to copy them, the [import service](#import-service) moves them over for you.'
        ]
      ]
    }
  },
  {
    id: 'import-service',
    related: ['importeren', 'overstappen', 'import-json'],
    nl: {
      slug: 'handleiding-import-service',
      menu: 'De import service',
      title: 'De import service: laat je receptenmap overzetten | Handleiding Savour',
      desc: 'Geen tijd om zelf te importeren? Met de import service van Savour zetten koks je hele receptenmap over, in de indeling die jij kiest, recept voor recept nagekeken.',
      lead: 'Geen tijd om het zelf te doen? Dan zetten de koks achter Savour je receptenmap voor je over.',
      sections: [
        [
          'Wat het is',
          'Bij de import service lever je je recepten aan zoals ze zijn: Word, PDF, foto’s, kladjes of een export uit een andere app. De koks achter Savour zetten ze over in de indeling die jij kiest en leggen elk recept naast het origineel.'
        ],
        [
          'Aanvragen',
          'Op de pagina [Import service](/recepten-laten-inladen) vraag je het aan en zie je wat het kost. Daarna lever je je bestanden aan via de site.'
        ],
        [
          'Wat je terugkrijgt',
          'Je recepten staan in je eigen Savour-account, of je krijgt een Savour-importbestand dat je zelf [importeert](#import-json). Je kijkt ze na in het [controlescherm](#import-controleren) voordat ze worden opgeslagen.'
        ],
        [
          'Meer lezen',
          'Hoe het in de praktijk gaat, lees je in [Je receptenmap laten overzetten](/blog/receptenmap-laten-overzetten).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-service',
      menu: 'The import service',
      title: 'The import service: have your recipe folder moved over | Savour user guide',
      desc: 'No time to import yourself? With Savour’s import service, chefs move your whole recipe folder over, in the structure you choose, checked recipe by recipe.',
      lead: 'No time to do it yourself? The chefs behind Savour move your recipe folder over for you.',
      sections: [
        [
          'What it is',
          'With the import service you hand in your recipes as they are: Word, PDF, photos, notes or an export from another app. The chefs behind Savour move them over in the structure you choose and check every recipe against the original.'
        ],
        [
          'Requesting it',
          'On the [Import service](/en/recipe-import-service) page you request it and see the price. Then you upload your files via the site.'
        ],
        [
          'What you get back',
          'Your recipes are in your own Savour account, or you receive a Savour import file to [import](#import-json) yourself. You check them in the [review screen](#import-controleren) before they are saved.'
        ],
        [
          'Read more',
          'How it works in practice: [Have your recipe folder moved over](/en/blog/have-your-recipe-folder-moved-over).'
        ]
      ]
    }
  },
  {
    id: 'import-problemen',
    related: ['import-controleren', 'probleem-melden', 'import-ai'],
    nl: {
      slug: 'handleiding-problemen-bij-importeren',
      menu: 'Problemen bij importeren',
      title: 'Problemen bij het importeren van recepten oplossen | Handleiding Savour',
      desc: 'Wat te doen als importeren niet lukt: geen recepten gevonden, een bestand dat niet gelezen wordt, recepten die aan elkaar plakken, foto’s zonder Pro en meer.',
      lead: 'De meest voorkomende meldingen bij het importeren, en wat je eraan doet.',
      sections: [
        [
          '“In deze export zijn geen recepten gevonden”',
          'Savour herkent de recepten in het bestand niet. Kijk of je de goede export hebt gekozen (zie de pagina van je app bij [Overstappen naar Savour](#overstappen)). Een willekeurige zip of JSON zonder recepten in herkenbare vorm kan Savour niet lezen.'
        ],
        [
          '“Dit bestand bevat geen leesbare tekst”',
          'Waarschijnlijk is het een gescande PDF. Die leest de AI met [Savour Pro](#gratis-en-pro). Zie [PDF-bestanden](#import-pdf).'
        ],
        [
          '“Foto’s lezen gaat met AI: alleen in Savour Pro”',
          'Foto’s, de camera en scans worden door de AI gelezen. Probeer de 7 dagen Pro gratis, of typ het recept over met [Zelf invoeren](#recept-maken).'
        ],
        [
          'Twee recepten plakken aan elkaar',
          'De lezer zag geen nieuwe receptnaam. Pas het aan in het controlescherm, of zet in het document de titel van elk recept als kop of vetgedrukt en importeer opnieuw.'
        ],
        [
          'Ingrediënten staan bij de bereiding',
          'Zet in je document een kopje “Ingrediënten” en “Bereiding”. Savour markeert zulke recepten als twijfel; met Pro leest de AI ze opnieuw.'
        ],
        [
          'Een .doc of Pages-bestand lukt niet',
          'Sla een oud .doc-bestand in Word op als .docx. Een Pages-bestand exporteer je in Pages als Word of PDF.'
        ],
        ['Nummers voor de receptnamen', 'Haal ze na het opslaan in één keer weg met [Opschonen](#opschonen).'],
        [
          'Recepten zijn dubbel',
          'Precies dezelfde recepten slaat Savour maar één keer op. Bijna-dubbele recepten vind je met [Opschonen](#opschonen).'
        ],
        [
          'Nog steeds niet goed',
          'Kies “Probleem melden” onderaan de site en stuur je bestand of een screenshot mee. Zie [Probleem melden en contact](#probleem-melden).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-problems',
      menu: 'Problems when importing',
      title: 'Fix problems when importing recipes | Savour user guide',
      desc: 'What to do when importing doesn’t work: no recipes found, a file that cannot be read, recipes stuck together, photos without Pro and more.',
      lead: 'The most common messages when importing, and what to do about them.',
      sections: [
        [
          '“No recipes were found in this export”',
          'Savour does not recognise the recipes in the file. Check that you picked the right export (see your app’s page under [Moving to Savour](#overstappen)). Savour cannot read an arbitrary zip or JSON without recipes in a recognisable form.'
        ],
        [
          '“This file contains no readable text”',
          'It is probably a scanned PDF. AI reads it with [Savour Pro](#gratis-en-pro). See [PDF files](#import-pdf).'
        ],
        [
          '“Reading photos uses AI: Savour Pro only”',
          'Photos, the camera and scans are read by AI. Try the free 7 days of Pro, or type the recipe with [Enter manually](#recept-maken).'
        ],
        [
          'Two recipes are stuck together',
          'The reader saw no new recipe name. Fix it in the review screen, or make each recipe title a heading or bold in the document and import again.'
        ],
        [
          'Ingredients end up in the method',
          'Add an “Ingredients” and a “Method” heading to your document. Savour marks such recipes as doubtful; with Pro the AI reads them again.'
        ],
        [
          'A .doc or Pages file doesn’t work',
          'Save an old .doc file as .docx in Word. Export a Pages file in Pages as Word or PDF.'
        ],
        ['Numbers in front of recipe names', 'Remove them all at once after saving with [Clean up](#opschonen).'],
        [
          'Duplicate recipes',
          'Savour saves exactly identical recipes only once. Find near-duplicates with [Clean up](#opschonen).'
        ],
        [
          'Still not right',
          'Choose “Report a problem” at the bottom of the site and attach your file or a screenshot. See [Report a problem and contact](#probleem-melden).'
        ]
      ]
    }
  }
];
