// Handleiding (user guide) en release notes voor de publieke site, in het Nederlands en Engels. Alleen gelinkt
// vanuit de footer (kolommen Hulp en Savour). tools/build-seo.mjs maakt er losse pagina's van (/handleiding, /en/user-guide, ...).
// Een sectie is [kop, tekst] of [kop, tekst, [opsomming]]. Beschrijf alleen wat de app echt doet.

export const GUIDE_UI = {
  nl: {
    footer: 'Handleiding',
    releases: 'Release notes',
    chapters: 'Hoofdstukken',
    prev: 'Vorige',
    next: 'Volgende',
    overview: 'Overzicht handleiding',
    open: 'Lees verder'
  },
  en: {
    footer: 'User guide',
    releases: 'Release notes',
    chapters: 'Chapters',
    prev: 'Previous',
    next: 'Next',
    overview: 'User guide overview',
    open: 'Read more'
  },
  // Geen eigen versie in deze talen: de footer linkt naar de Engelse pagina's.
  de: { footer: 'Handbuch (Englisch)', releases: 'Release Notes (Englisch)' },
  es: { footer: 'Manual (en inglés)', releases: 'Notas de versión (en inglés)' },
  fr: { footer: 'Guide (en anglais)', releases: 'Notes de version (en anglais)' }
};

export const GUIDE_HOME = {
  nl: {
    slug: 'handleiding',
    title: 'Handleiding Savour: zo werk je met de receptenapp voor koks',
    desc: 'De complete handleiding van Savour: recepten importeren uit Word, PDF en foto’s, bewerken, ordenen, omrekenen, kookmodus, printen, delen en keukenteams.',
    h1: 'Handleiding',
    lead: 'Alles over werken met Savour, stap voor stap: van je eerste import tot een keukenteam dat uit dezelfde recepten werkt.'
  },
  en: {
    slug: 'en/user-guide',
    title: 'Savour user guide: how to use the recipe app for chefs',
    desc: 'The complete Savour user guide: import recipes from Word, PDF and photos, edit, organise, scale, cook mode, print, share and kitchen teams.',
    h1: 'User guide',
    lead: 'Everything about working with Savour, step by step: from your first import to a kitchen team cooking from the same recipes.'
  }
};

export const GUIDE = [
  {
    id: 'importeren',
    nl: {
      slug: 'handleiding-importeren',
      menu: 'Recepten importeren',
      title: 'Recepten importeren uit Word, PDF, foto’s en andere apps | Handleiding Savour',
      desc: 'Zo importeer je recepten in Savour: Word (.doc, .docx), PDF, foto’s van handgeschreven kladjes, tekstbestanden, een webpagina of een export uit Paprika, Mealie en andere recepten-apps.',
      h1: 'Recepten importeren',
      lead: 'Je hele receptenmap in één keer naar Savour: uit Word, PDF, foto’s, een website of een andere recepten-app.',
      sections: [
        [
          'Waar begin je',
          'Kies in het menu “Recept toevoegen” en dan “Recept importeren”. Je ziet de bronnen waaruit je kunt importeren. Elke bron opent een bestandskiezer die alleen de passende bestanden toont; je kunt bestanden ook hierheen slepen. Met “Alle bestanden door elkaar” kies je alles tegelijk, en met “Hele map kiezen” een hele map met verschillende soorten bestanden.',
          [
            'Word: .doc en .docx',
            'PDF',
            'Foto’s van handgeschreven of gescande recepten (Savour Pro)',
            'Andere bestanden: tekst (.txt, .md, .rtf), OpenDocument (.odt), Pages, HTML, CSV en JSON',
            'Een link naar een recept op een website',
            'Een export uit een andere recepten-app',
            'Tekst die je zelf typt of plakt, bij “Tekst invoeren”'
          ]
        ],
        [
          'Word, PDF en tekst: de Savour-lezer',
          'Bestanden worden gelezen door de Savour-lezer, gratis en zonder AI. Hij splitst een groot document zelf op in losse recepten, ook als het honderden recepten bevat, en herkent per recept de titel, de opbrengst, de ingrediënten en de bereiding. Nummers voor receptnamen uit een oud receptenboek kun je in het controlescherm in één keer weghalen met “Nummers weghalen”.'
        ],
        [
          'Eerst controleren, dan opslaan',
          'Voordat er iets wordt opgeslagen, zie je in “Import controleren” wat er is herkend. Savour verzint nooit hoeveelheden, ingrediënten of stappen. Twijfelt de lezer, dan zie je dat:',
          [
            '“Automatisch verbeterd”: kleine tikfouten die de lezer zelf heeft verbeterd, zodat je ze kunt nalopen.',
            '“Niet goed leesbaar, controleer”: een stuk dat je beter even naast het origineel legt.',
            '“Mogelijk onvolledig”: er lijkt iets te ontbreken. Met “Toch importeren” neem je het recept toch op, gemarkeerd zodat je het later kunt nakijken.'
          ]
        ],
        [
          'Foto’s van kladjes en handschrift',
          'Met Savour Pro leest AI foto’s van handgeschreven of gescande recepten, tot 500 imports per maand. Fotografeer bij goed licht, recht van boven en met de hele pagina in beeld. Op een telefoon kun je ook direct de camera gebruiken. Het originele kladje blijft bewaard: in het recept open je het met “Origineel kladje bekijken”. Controleer vooral de getallen; een 3 en een 8 zijn op een vlekkerig kladje snel verwisseld.'
        ],
        [
          'Een recept van een website',
          'Plak de link van een receptpagina. Veel receptsites zetten hun recepten in een vaste opmaak (schema.org) die Savour direct kan lezen. Wordt er op de pagina geen recept gevonden, dan meldt Savour dat; er wordt niets bij verzonnen.'
        ],
        [
          'Overstappen vanuit een andere recepten-app',
          'Maak in je oude app een export en kies dat bestand bij “Uit een andere recepten-app”. Savour leest exports uit onder meer Paprika (.paprikarecipes), Mealie, Tandoor, Recipe Keeper, Copy Me That, Crouton (.crumb), MasterCook (.mx2, .mxp) en Plan to Eat (.csv), en recepten in schema.org-JSON of HTML.'
        ],
        [
          'Wanneer helpt de AI',
          'De Savour-lezer gaat altijd eerst. Alleen recepten waarover hij twijfelt, laat Savour Pro opnieuw lezen door AI. Op een gratis account zie je hoeveel recepten met twijfel zijn gelezen, zodat je die zelf kunt nalopen.'
        ],
        [
          'Geen tijd om het zelf te doen',
          'Met de import service zetten de koks achter Savour je hele receptenmap voor je over, in de indeling die jij kiest, en wordt elk recept naast het origineel gelegd. Kijk bij “Import service” op de site.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-import-recipes',
      menu: 'Importing recipes',
      title: 'Import recipes from Word, PDF, photos and other apps | Savour user guide',
      desc: 'How to import recipes into Savour: Word (.doc, .docx), PDF, photos of handwritten notes, text files, a web page or an export from Paprika, Mealie and other recipe apps.',
      h1: 'Importing recipes',
      lead: 'Your whole recipe folder into Savour at once: from Word, PDF, photos, a website or another recipe app.',
      sections: [
        [
          'Where to start',
          'Choose “Add recipe” in the menu and then “Import recipe”. You will see the sources you can import from. Each source opens a file picker that only shows matching files; you can also drag files in. With “All files mixed” you pick everything at once, and with “Choose a whole folder” a whole folder with different kinds of files.',
          [
            'Word: .doc and .docx',
            'PDF',
            'Photos of handwritten or scanned recipes (Savour Pro)',
            'Other files: text (.txt, .md, .rtf), OpenDocument (.odt), Pages, HTML, CSV and JSON',
            'A link to a recipe on a website',
            'An export from another recipe app',
            'Text you type or paste yourself, under “Enter text”'
          ]
        ],
        [
          'Word, PDF and text: the Savour reader',
          'Files are read by the Savour reader, free and without AI. It splits a large document into separate recipes on its own, even when it holds hundreds of them, and recognises the title, yield, ingredients and method of each recipe. Numbers in front of recipe names from an old recipe book can be removed in one go with “Remove numbers” in the review screen.'
        ],
        [
          'Review first, then save',
          'Before anything is saved, “Review import” shows what was recognised. Savour never invents quantities, ingredients or steps. When the reader has doubts, you see it:',
          [
            'Corrected automatically: small typos the reader fixed itself, so you can check them.',
            'Not clearly readable: a part you should compare with the original.',
            'Possibly incomplete: something seems to be missing. With “Import anyway” you still add the recipe, marked so you can check it later.'
          ]
        ],
        [
          'Photos of notes and handwriting',
          'With Savour Pro, AI reads photos of handwritten or scanned recipes, up to 500 imports a month. Take the photo in good light, straight from above, with the whole page in view. On a phone you can also use the camera directly. The original note is kept: open it from the recipe with “View original note”. Check the numbers in particular; a 3 and an 8 are easily mixed up on a stained note.'
        ],
        [
          'A recipe from a website',
          'Paste the link of a recipe page. Many recipe sites publish their recipes in a standard format (schema.org) that Savour reads directly. If no recipe is found on the page, Savour tells you; nothing is made up.'
        ],
        [
          'Moving from another recipe app',
          'Make an export in your old app and choose that file under “From another recipe app”. Savour reads exports from Paprika (.paprikarecipes), Mealie, Tandoor, Recipe Keeper, Copy Me That, Crouton (.crumb), MasterCook (.mx2, .mxp) and Plan to Eat (.csv), among others, plus recipes in schema.org JSON or HTML.'
        ],
        [
          'When the AI helps',
          'The Savour reader always goes first. Only recipes it has doubts about are read again by AI on Savour Pro. On a free account you see how many recipes were read with doubts, so you can check them yourself.'
        ],
        [
          'No time to do it yourself',
          'With the import service, the chefs behind Savour move your whole recipe folder over for you, in the structure you choose, and check every recipe against the original. See “Import service” on the site.'
        ]
      ]
    }
  },
  {
    id: 'bewerken',
    nl: {
      slug: 'handleiding-recept-bewerken',
      menu: 'Recept maken en bewerken',
      title: 'Een recept maken en bewerken: ingrediënten, delen, notities | Handleiding Savour',
      desc: 'Zo maak en bewerk je een recept in Savour: naam, categorie, opbrengst, ingrediënten en bereiding, een recept in delen zoals deeg en saus, notities en koppelingen naar basisrecepten.',
      h1: 'Recept maken en bewerken',
      lead: 'Hoe je een recept invoert zodat het omrekenen, printen en delen goed gaat.',
      sections: [
        [
          'Een nieuw recept',
          'Kies “Recept toevoegen” en dan “Zelf invoeren”, of open een bestaand recept en kies “Bewerken”. Een recept heeft een naam, een categorie, een opbrengst, ingrediënten, bereidingsstappen en eventueel een foto.'
        ],
        [
          'Opbrengst',
          'Vul in wat het recept oplevert, bijvoorbeeld “1 liter”, “40 stuks” of “8 couverts”. Met een opbrengst kun je later omrekenen naar precies de hoeveelheid die je nodig hebt.'
        ],
        [
          'Ingrediënten',
          'Zet elk ingrediënt op een eigen regel, met de hoeveelheid vooraan: “250 g boter”, “1,5 l room”, “2 el mosterd”. Met “＋ Ingrediënt toevoegen” maak je een nieuwe regel. Savour herkent de hoeveelheid en de eenheid, zet ze vet in het recept en rekent ze om.',
          [
            'Getallen: 1, 1,5, 1.000, ½, 1½, 1 1/2 en een bereik als 2-3.',
            'Eenheden die omrekenen: g, kg, mg, ml, cl, dl, l, tl, el, en ook tsp, tbsp, cup, oz en lb.',
            'Stuks, takjes, teentjes, blaadjes, bosjes en plakken worden herkend, maar niet omgerekend naar een andere eenheid.',
            '“Naar smaak”, “snuf”, “mespunt” en “scheut” worden bewust niet omgerekend.'
          ]
        ],
        [
          'Bereiding',
          'Schrijf de bereiding in korte stappen, één handeling per stap. Met “＋ Bereidingsstap toevoegen” maak je een nieuwe stap. Zet kritische punten erbij: temperaturen, tijden, dikte of kleur.'
        ],
        [
          'Een recept in delen',
          'Bestaat je recept uit meerdere delen, zoals deeg, vulling en saus? Kies “＋ Deel toevoegen” en geef elk deel een naam, eigen ingrediënten en een eigen bereiding. Je kunt zoveel delen toevoegen als je wilt. Bij het importeren wordt een regel die eindigt op een dubbele punt, zoals “Deeg:”, als kop van een deel herkend.'
        ],
        [
          'Categorie en foto',
          'Kies een categorie, zoals sauzen, garnituren of patisserie. Een foto van het gerecht is optioneel; je kunt hem uitsnijden zodat het mooiste deel in beeld staat.'
        ],
        [
          'Notitie bij een recept',
          'Open een eigen recept en kies “＋ Notitie” voor een vaste opmerking naast het recept, bijvoorbeeld “bij meer dan 5 kg langer laten rusten”. Met “Wijzigen” pas je hem aan. Bij het printen kies je of notities meegaan.'
        ],
        [
          'Koppelen aan een basisrecept',
          'Gebruik je een eigen basisrecept als ingrediënt, zoals een fond in je jus? Heet het ingrediënt precies zoals dat recept, dan koppelt Savour ze vanzelf. Anders kies je in het recept via ⋯ “Koppelen aan recept” welk ingrediënt bij welk recept hoort. Naast het ingrediënt staat dan “Recept”: één tik en je zit in het basisrecept, met een knop terug.'
        ],
        [
          'Wie mag bewerken',
          'Een recept kan alleen worden bewerkt door de maker. In een keukenteam zien anderen het recept wel, en ze kunnen het met “Toevoegen aan mijn recepten” als eigen kopie overnemen en die aanpassen.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-edit-recipes',
      menu: 'Creating and editing recipes',
      title: 'Create and edit a recipe: ingredients, parts, notes | Savour user guide',
      desc: 'How to create and edit a recipe in Savour: name, category, yield, ingredients and method, a recipe in parts such as dough and sauce, notes and links to base recipes.',
      h1: 'Creating and editing recipes',
      lead: 'How to enter a recipe so that scaling, printing and sharing work well.',
      sections: [
        [
          'A new recipe',
          'Choose “Add recipe” and then “Enter manually”, or open an existing recipe and choose “Edit”. A recipe has a name, a category, a yield, ingredients, method steps and optionally a photo.'
        ],
        [
          'Yield',
          'Enter what the recipe makes, for example “1 litre”, “40 pieces” or “8 covers”. With a yield you can later scale to exactly the amount you need.'
        ],
        [
          'Ingredients',
          'Put each ingredient on its own line, with the quantity first: “250 g butter”, “1.5 l cream”, “2 tbsp mustard”. “＋ Add ingredient” creates a new line. Savour recognises the quantity and unit, shows them in bold and scales them.',
          [
            'Numbers: 1, 1.5, 1,000, ½, 1½, 1 1/2 and a range such as 2-3.',
            'Units that convert: g, kg, mg, ml, cl, dl, l, tsp, tbsp, cup, oz and lb, plus the Dutch tl and el.',
            'Pieces, sprigs, cloves, leaves, bunches and slices are recognised, but not converted to another unit.',
            '“To taste”, “pinch” and “dash” are deliberately not scaled.'
          ]
        ],
        [
          'Method',
          'Write the method in short steps, one action per step. “＋ Add step” creates a new step. Add the critical points: temperatures, times, thickness or colour.'
        ],
        [
          'A recipe in parts',
          'Does your recipe have several parts, such as dough, filling and sauce? Choose “＋ Add part” and give each part a name, its own ingredients and its own method. You can add as many parts as you like. When importing, a line ending in a colon, such as “Dough:”, is recognised as the heading of a part.'
        ],
        [
          'Category and photo',
          'Choose a category, such as sauces, garnishes or pastry. A photo of the dish is optional; you can crop it so the best part is in view.'
        ],
        [
          'A note on a recipe',
          'Open one of your recipes and choose “＋ Note” for a lasting remark next to the recipe, for example “rest longer above 5 kg”. Use “Change” to edit it. When printing, you choose whether notes are included.'
        ],
        [
          'Linking to a base recipe',
          'Do you use one of your own base recipes as an ingredient, like a stock in your jus? If the ingredient has exactly the same name as that recipe, Savour links them automatically. Otherwise, choose “Link to recipe” under ⋯ in the recipe and pick which ingredient belongs to which recipe. “Recipe” then appears next to the ingredient: one tap takes you to the base recipe, with a button back.'
        ],
        [
          'Who can edit',
          'Only the maker of a recipe can edit it. In a kitchen team others can see the recipe, and with “Add to my recipes” they can take their own copy and change that.'
        ]
      ]
    }
  },
  {
    id: 'ordenen',
    nl: {
      slug: 'handleiding-ordenen-en-zoeken',
      menu: 'Ordenen en zoeken',
      title: 'Recepten ordenen en zoeken: mappen, categorieën, favorieten | Handleiding Savour',
      desc: 'Zo orden je je recepten in Savour: receptenbibliotheek van A tot Z, zoeken op ingrediënt en techniek, categorieën met trefwoorden, receptenmappen, favorieten en dubbele recepten opschonen.',
      h1: 'Ordenen en zoeken',
      lead: 'Je beurre blanc in drie seconden terugvinden, ook tussen honderden recepten.',
      sections: [
        [
          'Alle recepten',
          'Onder “Alle recepten” staan al je eigen recepten, genummerd en op alfabet. Met de letters A–Z spring je naar een beginletter, en met de categorieën bovenaan zie je alleen één soort recept.'
        ],
        [
          'Zoeken',
          'Zoek bovenin op receptnaam, ingrediënt, component of techniek. Zo vind je ook het recept waar die ene saus in zit.'
        ],
        [
          'Categorieën',
          'Een categorie zegt wat voor recept het is, zoals sauzen, ijs of garnituren. Je beheert de lijst zelf onder Mijn account → Categorieën: toevoegen, naam wijzigen of verwijderen.',
          [
            '“Standaardlijst” zet in één keer een lijst neer die past bij de professionele keuken; je eigen categorieën blijven staan.',
            'Trefwoorden: geef per categorie woorden op, bijvoorbeeld sorbet voor IJs. Staat zo’n woord in de receptnaam, dan stelt Savour die categorie voor.',
            '“Categorieën voorstellen” zoekt voor al je recepten een passende categorie. Je bevestigt altijd zelf wat er verandert.'
          ]
        ],
        [
          'Receptenmappen',
          'Mappen orden je zoals jij werkt: per partie, per menu of per seizoen. Een recept kan in meerdere mappen staan. Open een map en kies welke recepten erin horen, of zet een recept vanuit het recept zelf in een map via ⋯ “Toevoegen aan map”. Je kiest welke mappen in het menu staan en sleept ze in jouw volgorde. Je eigen mappen zie alleen jij.'
        ],
        [
          'Favorieten',
          'Met het sterretje maak je een recept favoriet. Je favorieten staan apart onder Favorieten in het menu.'
        ],
        [
          'Opruimen',
          'Met “Verwijder recepten” verwijder je meerdere recepten tegelijk. Onder Mijn account → Opschonen zoekt Savour nummers voor receptnamen en dubbele recepten. Je ziet altijd eerst wat er verandert; Savour verwijdert nooit zelf iets zonder dat jij het vraagt.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-organise-and-search',
      menu: 'Organising and searching',
      title: 'Organise and search recipes: folders, categories, favourites | Savour user guide',
      desc: 'How to organise recipes in Savour: an A–Z recipe library, search by ingredient and technique, categories with keywords, recipe folders, favourites and cleaning up duplicate recipes.',
      h1: 'Organising and searching',
      lead: 'Find your beurre blanc in three seconds, even among hundreds of recipes.',
      sections: [
        [
          'All recipes',
          '“All recipes” holds all your own recipes, numbered and in alphabetical order. The letters A–Z jump to a first letter, and the categories at the top show just one kind of recipe.'
        ],
        [
          'Search',
          'Search at the top by recipe name, ingredient, component or technique. That way you also find the recipe that uses that one sauce.'
        ],
        [
          'Categories',
          'A category says what kind of recipe it is, such as sauces, ice cream or garnishes. You manage the list yourself under My account → Categories: add, rename or delete.',
          [
            '“Default list” adds a list suited to professional kitchens in one go; your own categories stay.',
            'Keywords: give each category words, for example sorbet for Ice cream. When such a word is in a recipe name, Savour suggests that category.',
            '“Suggest categories” finds a fitting category for all your recipes. You always confirm what changes.'
          ]
        ],
        [
          'Recipe folders',
          'Organise folders the way you work: by section, by menu or by season. A recipe can be in several folders. Open a folder and choose which recipes belong in it, or add a recipe to a folder from the recipe itself via ⋯ “Add to folder”. You choose which folders appear in the menu and drag them into your own order. Only you see your own folders.'
        ],
        [
          'Favourites',
          'The star makes a recipe a favourite. Your favourites have their own place under Favourites in the menu.'
        ],
        [
          'Cleaning up',
          '“Delete recipes” removes several recipes at once. Under My account → Clean up, Savour finds numbers in front of recipe names and duplicate recipes. You always see what will change first; Savour never deletes anything on its own without you asking.'
        ]
      ]
    }
  },
  {
    id: 'omrekenen',
    nl: {
      slug: 'handleiding-omrekenen',
      menu: 'Omrekenen',
      title: 'Recepten omrekenen en opschalen: factor, opbrengst, eenheden | Handleiding Savour',
      desc: 'Zo reken je een recept om in Savour: snelknoppen van ¼× tot 10×, een eigen factor, een gewenste opbrengst of “ik heb 3 kg van dit ingrediënt”, met eenheden en nette breuken.',
      h1: 'Omrekenen',
      lead: 'Van 8 couverts naar 120, of van wat je nog hebt naar het hele recept, zonder rekenfouten.',
      sections: [
        [
          'Snelknoppen',
          'Onder elk recept met ingrediënten staat “Omrekenen” met de knoppen ¼×, ½×, 1½×, 2×, 3×, 4×, 5× en 10×. Eén tik en alle hoeveelheden zijn omgerekend. Met de terugknop zie je weer het origineel.'
        ],
        [
          'Meer omrekenen',
          'Via ⋯ “Meer omrekenen” kies je één van drie manieren. Wat je in het ene veld invult, maakt de andere leeg.',
          [
            'Factor: een eigen getal, bijvoorbeeld 2,5 of 0,75.',
            'Opbrengst: de hoeveelheid die je nodig hebt, als het recept een opbrengst heeft. Is het recept voor 1 liter en heb je 3,5 liter nodig, vul dan 3,5 in.',
            'Ik heb: je hebt nog 3,2 kg van één ingrediënt? Kies het ingrediënt en vul in hoeveel je hebt; Savour rekent de rest van het recept eromheen.'
          ]
        ],
        [
          'Eenheden en afronding',
          'Savour rekent binnen dezelfde soort eenheid naar een handige maat: 0,25 kg wordt 250 g, 20 tl wordt 6 ⅔ el. Lepels en cups krijgen nette breuken, grammen en milliliters hele getallen. Hoeveelheden als “naar smaak” blijven staan zoals ze zijn.'
        ],
        [
          'Het origineel verandert nooit',
          'Omrekenen verandert alleen wat je op het scherm ziet. Het opgeslagen recept blijft precies zoals het was. Print je een omgerekend recept, dan print je de omgerekende hoeveelheden.'
        ],
        [
          'Proeven blijft nodig',
          'Niet alles schaalt een-op-een. Inkooktijden worden langer in een grotere pan, zout, zuur en specerijen proef je bij grote hoeveelheden opnieuw af, en bij gebak verandert de baktijd met een andere vorm. Gelatine en agar reken je wel exact mee met het vocht.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-scale-recipes',
      menu: 'Scaling',
      title: 'Scale recipes: factor, yield, units and fractions | Savour user guide',
      desc: 'How to scale a recipe in Savour: quick buttons from ¼× to 10×, your own factor, a target yield or “I have 3 kg of this ingredient”, with unit conversion and clean fractions.',
      h1: 'Scaling',
      lead: 'From 8 covers to 120, or from what you have left to the whole recipe, without calculation errors.',
      sections: [
        [
          'Quick buttons',
          'Every recipe with ingredients shows “Convert” with the buttons ¼×, ½×, 1½×, 2×, 3×, 4×, 5× and 10×. One tap and all quantities are converted. The reset button brings back the original.'
        ],
        [
          'More scaling',
          'Under ⋯ “More scaling options” you choose one of three ways. Filling in one field clears the others.',
          [
            'Factor: your own number, for example 2.5 or 0.75.',
            'Yield: the amount you need, if the recipe has a yield. If the recipe makes 1 litre and you need 3.5 litres, enter 3.5.',
            'I have: 3.2 kg of one ingredient left? Choose the ingredient and enter how much you have; Savour works out the rest of the recipe around it.'
          ]
        ],
        [
          'Units and rounding',
          'Savour converts within the same kind of unit to a practical size: 0.25 kg becomes 250 g, 24 tbsp becomes 1 ½ cup. Spoons and cups get clean fractions, grams and millilitres whole numbers. Amounts like “to taste” stay as they are.'
        ],
        [
          'The original never changes',
          'Scaling only changes what you see on screen. The saved recipe stays exactly as it was. Print a scaled recipe and you print the scaled quantities.'
        ],
        [
          'Tasting is still needed',
          'Not everything scales one to one. Reduction takes longer in a bigger pan, salt, acid and spices need tasting again in large batches, and baking times change with a different tin. Gelatine and agar do scale exactly with the liquid.'
        ]
      ]
    }
  },
  {
    id: 'keuken',
    nl: {
      slug: 'handleiding-kookmodus-en-offline',
      menu: 'Kookmodus en offline',
      title: 'Kookmodus, offline werken en Savour als app | Handleiding Savour',
      desc: 'Werken met Savour in de keuken: kookmodus met grote letters en afvinken, recepten zonder internet en Savour als app op het beginscherm van je telefoon of tablet.',
      h1: 'Kookmodus en offline',
      lead: 'Savour op de telefoon of tablet in de keuken, ook met natte handen en zonder wifi.',
      sections: [
        [
          'Kookmodus',
          'Kies “Kookmodus” in een recept. Je ziet alleen het recept, in grote letters, en Savour probeert je scherm aan te houden zodat je het niet steeds hoeft aan te raken. Vink ingrediënten en stappen af terwijl je werkt.'
        ],
        [
          'Afvinken',
          'Ook buiten de kookmodus vink je ingrediënten af die je al hebt afgewogen. Zo zie je in één oogopslag waar je gebleven was.'
        ],
        [
          'Zonder internet',
          'Recepten die je hebt geopend, blijven op je apparaat beschikbaar, ook in een keuken of koelcel zonder wifi. Lezen werkt dan gewoon; voor opslaan en wijzigen heb je weer internet nodig.'
        ],
        [
          'Savour als app',
          'Je hebt geen app store nodig. Zet Savour op het beginscherm van je telefoon of tablet, dan opent het als een gewone app. Onder Mijn account staat de knop “App installeren”; op de pagina “App downloaden” staat per toestel hoe het werkt.'
        ],
        [
          'Op elk apparaat',
          'Savour werkt in de browser op computer, tablet en telefoon. Importeren, ordenen en printen gaat het fijnst op een computer; raadplegen in de keuken op een telefoon of tablet. Je recepten staan in de cloud: op een nieuw apparaat log je in en alles staat er weer.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-cook-mode-and-offline',
      menu: 'Cook mode and offline',
      title: 'Cook mode, working offline and Savour as an app | Savour user guide',
      desc: 'Working with Savour in the kitchen: cook mode with large text and tick-offs, recipes without internet and Savour as an app on the home screen of your phone or tablet.',
      h1: 'Cook mode and offline',
      lead: 'Savour on a phone or tablet in the kitchen, even with wet hands and no wifi.',
      sections: [
        [
          'Cook mode',
          'Choose “Cooking mode” in a recipe. You see only the recipe, in large text, and Savour tries to keep your screen on so you don’t have to keep touching it. Tick off ingredients and steps as you work.'
        ],
        [
          'Ticking off',
          'Outside cook mode you can also tick off ingredients you have already weighed. You see at a glance where you left off.'
        ],
        [
          'Without internet',
          'Recipes you have opened stay available on your device, even in a kitchen or walk-in without wifi. Reading works as normal; saving and changing need internet again.'
        ],
        [
          'Savour as an app',
          'No app store needed. Add Savour to the home screen of your phone or tablet and it opens like a regular app. Under My account you find the “Install app” button, and the “App” page shows how it works on each device.'
        ],
        [
          'On every device',
          'Savour runs in the browser on computer, tablet and phone. Importing, organising and printing are easiest on a computer; looking things up in the kitchen on a phone or tablet. Your recipes live in the cloud: on a new device you log in and everything is there.'
        ]
      ]
    }
  },
  {
    id: 'printen',
    nl: {
      slug: 'handleiding-printen',
      menu: 'Printen',
      title: 'Recepten printen: los recept of hele map, met logo | Handleiding Savour',
      desc: 'Zo print je recepten in Savour: een los recept, omgerekend of niet, of een hele receptenmap met voorblad en inhoudsopgave, op A4 of A5 en met het logo van je restaurant.',
      h1: 'Printen',
      lead: 'Een los recept voor aan de muur, of je complete receptenmap voor de map aan de pass.',
      sections: [
        [
          'Een los recept',
          'Kies “Printen” in een recept. Heb je het recept omgerekend, dan print je de omgerekende hoeveelheden.'
        ],
        [
          'Meerdere recepten of een hele map',
          'Print een receptenmap, een keukenteam of al je recepten in één keer. Bij “Welke recepten wil je printen?” kies je zelf welke recepten meegaan, met “Alles” of “Niets” als snelle start.',
          [
            '“Met voorblad en inhoud”: een voorblad en een inhoudsopgave, en het nummer van elk recept onderaan de pagina.',
            '“A5, voor een kleine map aan de pass” in plaats van A4.',
            '“Met foto’s” en “Met notities”: kies of foto’s en notities meegaan.'
          ]
        ],
        [
          'Met het logo van je restaurant',
          'Met Savour Pro staat het logo van je restaurant op je prints. Stel het in onder Mijn account → Abonnement en team → Logo op prints, met de naam die op de print komt. Kies “Logo in zwart-wit printen” voor een keukenprinter. In een keukenteam geldt het logo van de eigenaar.'
        ],
        [
          'Al je recepten',
          'Onder Mijn account print je al je recepten in één keer in de printopmaak van Savour. Met Savour Pro download je ze ook: elk recept als eigen Word-bestand, alles in één Word-bestand, of als back-up.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-print-recipes',
      menu: 'Printing',
      title: 'Print recipes: a single recipe or a whole folder, with your logo | Savour user guide',
      desc: 'How to print recipes in Savour: a single recipe, scaled or not, or a whole recipe folder with cover page and table of contents, on A4 or A5 and with your restaurant’s logo.',
      h1: 'Printing',
      lead: 'A single recipe for the wall, or your complete recipe folder for the binder at the pass.',
      sections: [
        [
          'A single recipe',
          'Choose “Print” in a recipe. If you have scaled the recipe, you print the scaled quantities.'
        ],
        [
          'Several recipes or a whole folder',
          'Print a recipe folder, a kitchen team or all your recipes at once. At “Which recipes do you want to print?” you choose which recipes go in, with “All” or “None” as a quick start.',
          [
            '“With cover page and contents”: a cover page, a table of contents and each recipe’s number at the bottom of the page.',
            '“A5, for a small binder at the pass” instead of A4.',
            '“With photos” and “With notes”: choose whether photos and notes are included.'
          ]
        ],
        [
          'With your restaurant’s logo',
          'With Savour Pro your restaurant’s logo is on your prints. Set it up under My account → Subscription and organisation → Logo on prints, with the name that appears on the print. Choose “Print logo in black and white” for a kitchen printer. In a kitchen team the owner’s logo is used.'
        ],
        [
          'All your recipes',
          'Under My account you print all your recipes at once in Savour’s print layout. With Savour Pro you can also download them: each recipe as its own Word file, everything in one Word file, or as a backup.'
        ]
      ]
    }
  },
  {
    id: 'delen',
    nl: {
      slug: 'handleiding-delen-en-keukenteams',
      menu: 'Delen en keukenteams',
      title: 'Recepten delen en keukenteams met rollen | Handleiding Savour',
      desc: 'Zo deel je recepten in Savour: een link via WhatsApp, Telegram, sms of e-mail met tijdslimiet, en keukenteams met de rollen eigenaar, editor en viewer voor je hele brigade.',
      h1: 'Delen en keukenteams',
      lead: 'Eén recept snel doorsturen, of één receptenboek voor je hele brigade.',
      sections: [
        [
          'Eén recept delen',
          'Kies “Delen” in een recept. Je stuurt het direct via WhatsApp, Telegram, sms of e-mail, of kopieert de link. Wie de link opent, ziet het recept, ook zonder account, en kan het omrekenen en de kookmodus gebruiken.'
        ],
        [
          'Hoelang de link werkt',
          'Bij “Hoelang?” kies je 1 uur, 1 dag, 1 week of onbeperkt. Met “Link uitzetten” kan niemand het recept nog openen. Zet je “Ontvangers mogen dit recept overnemen” aan, dan kunnen ontvangers met een account het recept aan hun eigen recepten toevoegen.'
        ],
        [
          'Een keukenteam',
          'Een keukenteam is het receptenboek van je keuken. Iedereen die lid is, ziet dezelfde recepten op de eigen telefoon, tablet of computer. Past de maker een recept aan, dan ziet iedereen meteen de nieuwe versie.'
        ],
        [
          'Rollen',
          'Er zijn drie rollen:',
          [
            'Eigenaar: beheert het keukenteam, de leden en hun rol.',
            'Editor: voegt recepten en mappen toe, haalt ze eruit en beheert de mappen.',
            'Viewer: bekijkt, print en rekent om.'
          ]
        ],
        [
          'Recepten en mappen in het team',
          'Kies “Recept toevoegen” en vink recepten uit je eigen bibliotheek aan; het recept blijft van jou. Deel het team op in mappen, bijvoorbeeld per partie of per menu. Met “Mappen beheren” wijzig je namen, zet je ze in volgorde en archiveer je mappen die je niet meer gebruikt. Recepten in een gearchiveerde map blijven bewaard onder “Archief”.'
        ],
        [
          'Je team uitnodigen',
          'Nodig collega’s uit via WhatsApp, Telegram, e-mail of de uitnodigingslink. Na het inloggen worden ze lid als viewer; de eigenaar kan daarna hun rol aanpassen. Lid zijn van een keukenteam is gratis.'
        ],
        [
          'Een recept van een collega overnemen',
          'Bij elk recept van een collega zie je “Toevoegen aan mijn recepten”. Je krijgt een eigen kopie die je zelf kunt aanpassen; het origineel blijft van de maker.'
        ],
        [
          'Savour Pro en het keukenteam',
          'Een keukenteam maken kan met Savour Pro, ook tijdens de gratis proefweek. Het team werkt zolang de eigenaar Pro heeft. Stopt dat, dan staat het team op slot, maar blijft alles bewaard tot de eigenaar weer Pro heeft.'
        ],
        [
          'Verlaten of verwijderen',
          'Een lid kan een keukenteam altijd verlaten. Alleen de eigenaar kan het verwijderen; de recepten zelf blijven dan in de bibliotheek van hun maker.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-sharing-and-kitchen-teams',
      menu: 'Sharing and kitchen teams',
      title: 'Share recipes and kitchen teams with roles | Savour user guide',
      desc: 'How to share recipes in Savour: a link via WhatsApp, Telegram, SMS or email with a time limit, and kitchen teams with owner, editor and viewer roles for your whole brigade.',
      h1: 'Sharing and kitchen teams',
      lead: 'Send one recipe quickly, or keep one recipe book for your whole brigade.',
      sections: [
        [
          'Sharing one recipe',
          'Choose “Share” in a recipe. Send it straight via WhatsApp, Telegram, SMS or email, or copy the link. Whoever opens the link sees the recipe, even without an account, and can scale it and use cook mode.'
        ],
        [
          'How long the link works',
          'At “For how long?” choose 1 hour, 1 day, 1 week or unlimited. With “Turn link off” nobody can open the recipe any more. Switch on “Recipients may copy this recipe” and recipients with an account can add it to their own recipes.'
        ],
        [
          'A kitchen team',
          'A kitchen team is your kitchen’s recipe book. Every member sees the same recipes on their own phone, tablet or computer. When the maker changes a recipe, everyone sees the new version right away.'
        ],
        [
          'Roles',
          'There are three roles:',
          [
            'Owner: manages the kitchen team, its members and their roles.',
            'Editor: adds recipes and folders, removes them and manages the folders.',
            'Viewer: views, prints and scales.'
          ]
        ],
        [
          'Recipes and folders in the team',
          'Choose “Add recipe” and tick recipes from your own library; the recipe stays yours. Split the team into folders, for example by section or by menu. “Manage folders” lets you rename them, put them in order and archive folders you no longer use. Recipes in an archived folder are kept under “Archive”.'
        ],
        [
          'Inviting your team',
          'Invite colleagues via WhatsApp, Telegram, email or the invitation link. After logging in they join as viewers; the owner can then change their role. Being a member of a kitchen team is free.'
        ],
        [
          'Copying a colleague’s recipe',
          'Every recipe from a colleague shows “Add to my recipes”. You get your own copy to change as you like; the original stays with its maker.'
        ],
        [
          'Savour Pro and kitchen teams',
          'Creating a kitchen team needs Savour Pro, including during the free trial week. The team works as long as the owner has Pro. If that stops, the team is locked, but everything is kept until the owner has Pro again.'
        ],
        [
          'Leaving or deleting',
          'A member can always leave a kitchen team. Only the owner can delete it; the recipes themselves then stay in their makers’ libraries.'
        ]
      ]
    }
  },
  {
    id: 'account',
    nl: {
      slug: 'handleiding-account-en-pro',
      menu: 'Account en Savour Pro',
      title: 'Account, Savour Pro, downloaden en instellingen | Handleiding Savour',
      desc: 'Je account in Savour: gratis tot 100 recepten, Savour Pro en de proefweek, recepten downloaden als Word of back-up, thema en taal, en wat er gebeurt als je stopt.',
      h1: 'Account en Savour Pro',
      lead: 'Wat gratis kan, wat Savour Pro toevoegt en hoe je je recepten altijd houdt.',
      sections: [
        [
          'Gratis en Savour Pro',
          'Een gratis account bewaart tot 100 recepten, leest Word, PDF en tekst in met de Savour-lezer en kan lid zijn van keukenteams. Savour Pro kost €2,99 per maand of €29 per jaar.',
          [
            'Onbeperkt recepten bewaren.',
            'AI voor foto’s, handschrift en twijfelgevallen, tot 500 imports per maand.',
            'Zelf keukenteams maken en je team uitnodigen.',
            'Printen met het logo van je restaurant.',
            'Downloaden als Word-bestand of als back-up.',
            'Geen advertenties in de app.'
          ]
        ],
        [
          'De proefweek',
          'Nieuwe accounts krijgen 7 dagen Savour Pro gratis, zonder betaalgegevens. Ook in de proefweek bewaar je tot 100 recepten.'
        ],
        [
          'Organisaties',
          'Voor een hele keuken zijn er abonnementen voor 5, 10 of 25 mensen (€8,99, €14,99 of €29,99 per maand). Iedereen in de organisatie heeft dan Savour Pro.'
        ],
        [
          'Stoppen met Pro',
          'Stop je met Pro, dan blijven al je recepten staan. Alleen nieuwe recepten toevoegen boven de 100 kan dan niet meer.'
        ],
        [
          'Je account',
          'Onder Mijn account pas je je naam, profielfoto, e-mailadres en wachtwoord aan, of log je uit. Onder “Abonnement en team” beheer je je abonnement, en onderaan kun je je account definitief verwijderen.'
        ],
        [
          'Weergave en taal',
          'Kies onder “Weergave” het donkere of lichte thema; je keuze wordt in je account bewaard. Met de taalknop bovenin zet je Savour in het Nederlands, Engels, Duits, Spaans of Frans. Je recepten worden nooit vertaald.'
        ],
        [
          'Een collega uitnodigen',
          'Kies onder Mijn account “Collega uitnodigen” en stuur je persoonlijke link. Maakt je collega een account aan, bevestigt die het e-mailadres en logt die in, dan krijg jij 14 dagen Savour Pro cadeau.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-account-and-pro',
      menu: 'Account and Savour Pro',
      title: 'Account, Savour Pro, downloads and settings | Savour user guide',
      desc: 'Your Savour account: free up to 100 recipes, Savour Pro and the trial week, downloading recipes as Word or a backup, theme and language, and what happens if you stop.',
      h1: 'Account and Savour Pro',
      lead: 'What is free, what Savour Pro adds, and how you always keep your recipes.',
      sections: [
        [
          'Free and Savour Pro',
          'A free account keeps up to 100 recipes, imports Word, PDF and text with the Savour reader and can be a member of kitchen teams. Savour Pro costs €2.99 a month or €29 a year.',
          [
            'Unlimited recipes.',
            'AI for photos, handwriting and doubtful recipes, up to 500 imports a month.',
            'Create your own kitchen teams and invite your team.',
            'Print with your restaurant’s logo.',
            'Download as a Word file or as a backup.',
            'No ads in the app.'
          ]
        ],
        [
          'The trial week',
          'New accounts get 7 days of Savour Pro for free, no payment details needed. During the trial you keep up to 100 recipes.'
        ],
        [
          'Organisations',
          'For a whole kitchen there are plans for 5, 10 or 25 people (€8.99, €14.99 or €29.99 a month). Everyone in the organisation then has Savour Pro.'
        ],
        [
          'Stopping Pro',
          'If you stop Pro, all your recipes stay. Only adding new recipes above 100 is no longer possible.'
        ],
        [
          'Your account',
          'Under My account you change your name, profile photo, email address and password, or log out. Under “Subscription and organisation” you manage your subscription, and at the bottom you can delete your account permanently.'
        ],
        [
          'Theme and language',
          'Choose the dark or light theme under “Appearance”; your choice is saved in your account. The language button at the top switches Savour to English, Dutch, German, Spanish or French. Your recipes are never translated.'
        ],
        [
          'Inviting a colleague',
          'Choose “Invite a colleague” under My account and send your personal link. When your colleague creates an account, confirms their email address and logs in, you get 14 days of Savour Pro as a thank-you.'
        ]
      ]
    }
  }
];

// Release notes: nieuwste bovenaan. Alleen wat gebruikers merken; versienummer major.minor.patch.
export const RELEASES_PAGE = {
  nl: {
    slug: 'release-notes',
    title: 'Release notes: wat is er nieuw in Savour',
    desc: 'Alle versies van Savour met wat er per versie nieuw of verbeterd is: importeren, omrekenen, keukenteams, printen, delen en meer.',
    h1: 'Release notes',
    lead: 'Wat er per versie nieuw is in Savour. De nieuwste versie staat bovenaan.'
  },
  en: {
    slug: 'en/release-notes',
    title: 'Release notes: what’s new in Savour',
    desc: 'Every Savour version and what is new or improved in it: importing, scaling, kitchen teams, printing, sharing and more.',
    h1: 'Release notes',
    lead: 'What’s new in each version of Savour. The latest version is at the top.'
  }
};

export const RELEASES = [
  {
    version: '3.6.0',
    date: '2026-11-01',
    nl: [
      'Keukenteams: één receptenboek voor je brigade, met een eigen startpagina met mappen en bibliotheek, print- en instellingenknop.',
      'Recepten in delen, zoals deeg, vulling en saus, elk met eigen ingrediënten en bereiding.',
      'Notities bij een recept en koppelingen van een ingrediënt naar een basisrecept.',
      'Omrekenen uitgebreid: eigen factor, gewenste opbrengst of “Ik heb” in één venster, snelknoppen van ¼× tot 10×.',
      'Een hele receptenmap printen, en Savour Pro voor iedereen in een organisatie.',
      'Savour in het Frans: de app en de hele site.',
      'Welkomstscherm met een startlijst en voorbeeldrecepten voor nieuwe gebruikers.',
      'De Savour-lezer leert van de notities van koks, en recepten worden nooit meer dubbel opgeslagen.',
      'Telefoon: recept en keukenteam compacter.',
      'Advertenties in de app voor accounts zonder Pro.'
    ],
    en: [
      'Kitchen teams: one recipe book for your brigade, with its own start page with folders and library, plus print and settings buttons.',
      'Recipes in parts, such as dough, filling and sauce, each with its own ingredients and method.',
      'Notes on a recipe and links from an ingredient to a base recipe.',
      'More scaling: your own factor, a target yield or “I have” in one window, with quick buttons from ¼× to 10×.',
      'Print a whole recipe folder, and Savour Pro for everyone in an organisation.',
      'Savour in French: the app and the whole site.',
      'A welcome screen with a checklist and example recipes for new users.',
      'The Savour reader learns from chefs’ notes, and recipes are never saved twice.',
      'Phone: recipe and kitchen team pages are more compact.',
      'Ads in the app for accounts without Pro.'
    ]
  },
  {
    version: '3.5.0',
    date: '2026-10-27',
    nl: [
      'Import service: de koks achter Savour zetten je hele receptenmap voor je over, met aanvragen, betalen en aanleveren op de site.',
      'Abonnementen voor organisaties van 5, 10 en 25 mensen.',
      'Alleen de eigenaar haalt mensen uit een gedeelde map.'
    ],
    en: [
      'Import service: the chefs behind Savour move your whole recipe folder over for you, with requesting, paying and uploading on the site.',
      'Plans for organisations of 5, 10 and 25 people.',
      'Only the owner can remove people from a shared folder.'
    ]
  },
  {
    version: '3.4.0',
    date: '2026-10-26',
    nl: [
      'Omrekenen met eenheden: van theelepels naar eetlepels, van kilo naar gram, met nette breuken.',
      'Importeren van een webpagina en uit andere recepten-apps zoals Paprika, Mealie en Tandoor.',
      'Openbare receptlinks met een tijdslimiet, en een link uitzetten.',
      'Omrekenen en kookmodus ook voor wie een gedeeld recept opent zonder account.',
      'Delen via sms, en een knop voor het lichte of donkere thema.',
      'De Savour-lezer leest ook oude .doc-bestanden.',
      'Wachtwoord vergeten en inloggen met een nog niet bevestigd e-mailadres werken duidelijker.'
    ],
    en: [
      'Scaling with units: from teaspoons to tablespoons, from kilos to grams, with clean fractions.',
      'Import from a web page and from other recipe apps such as Paprika, Mealie and Tandoor.',
      'Public recipe links with a time limit, and turning a link off.',
      'Scaling and cook mode also for people who open a shared recipe without an account.',
      'Sharing by SMS, and a button for the light or dark theme.',
      'The Savour reader also reads old .doc files.',
      'Forgotten passwords and logging in with an unconfirmed email address work more clearly.'
    ]
  },
  {
    version: '3.3.0',
    date: '2026-10-25',
    nl: [
      'Recept overnemen: de maker kan ontvangers toestaan een gedeeld recept aan hun eigen recepten toe te voegen, ook voor een beperkte tijd.',
      'Gedeelde mappen: mappen beheren, archiveren en recepten van collega’s overnemen.',
      'Uitleg per scherm met het i-knopje.',
      'Downloaden als echt Word-bestand (.docx) met Savour Pro.',
      'Nieuwe printopmaak met vette hoeveelheden en een compacte inhoudsopgave.',
      'Een collega uitnodigen met Pro als cadeau.',
      'Een gedeeld recept heeft een eigen voorbeeldplaatje in WhatsApp.'
    ],
    en: [
      'Copying recipes: the maker can allow recipients to add a shared recipe to their own recipes, also for a limited time.',
      'Shared folders: manage and archive folders, and copy colleagues’ recipes.',
      'An explanation for every screen behind the i button.',
      'Download as a real Word file (.docx) with Savour Pro.',
      'A new print layout with bold quantities and a compact table of contents.',
      'Invite a colleague and get Pro as a thank-you.',
      'A shared recipe has its own preview image in WhatsApp.'
    ]
  },
  {
    version: '3.2.0',
    date: '2026-10-24',
    nl: [
      'Printen met het logo van je restaurant (Savour Pro en teams).',
      'Zelf kiezen welke recepten je print.',
      'Terug uit een recept kom je weer op dezelfde plek in de lijst.'
    ],
    en: [
      'Printing with your restaurant’s logo (Savour Pro and teams).',
      'Choose which recipes to print.',
      'Coming back from a recipe returns you to the same place in the list.'
    ]
  },
  {
    version: '3.1.0',
    date: '2026-10-23',
    nl: [
      'Offline werken: recepten die je hebt geopend, blijven beschikbaar zonder internet.',
      'Het originele kladje blijft bewaard bij een recept dat van een foto is gelezen.',
      'Camera voor kladjes direct in de app (Savour Pro).',
      'Sneller opstarten.'
    ],
    en: [
      'Working offline: recipes you have opened stay available without internet.',
      'The original note is kept with a recipe that was read from a photo.',
      'A camera for notes right in the app (Savour Pro).',
      'Faster start-up.'
    ]
  },
  {
    version: '3.0.0',
    date: '2026-10-21',
    nl: [
      'Savour 3.0: een nieuwe, opnieuw ontworpen versie met een nieuwe receptpagina.',
      'De Savour-lezer opnieuw gebouwd en getest op echte receptenbestanden; PDF-import werkt.',
      'Savour Pro: onbeperkt recepten en AI voor foto’s en twijfelgevallen; gratis tot 100 recepten.',
      'Engels, Duits en Spaans met een taalknop bovenin.',
      'Categorieën voorstellen op basis van trefwoorden in de receptnaam, met een standaardlijst voor de keuken.',
      'Dubbele recepten opschonen in Instellingen.',
      'Samenwerken in gedeelde mappen.'
    ],
    en: [
      'Savour 3.0: a new, redesigned version with a new recipe page.',
      'The Savour reader rebuilt and tested on real recipe files; PDF import works.',
      'Savour Pro: unlimited recipes and AI for photos and doubtful recipes; free up to 100 recipes.',
      'English, German and Spanish with a language button at the top.',
      'Suggested categories based on keywords in the recipe name, with a default list for kitchens.',
      'Clean up duplicate recipes in Settings.',
      'Working together in shared folders.'
    ]
  }
];
