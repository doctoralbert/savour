// Handleiding, onderdeel "Ordenen en terugvinden".

export const group = {
  id: 'ordenen',
  nl: {
    name: 'Ordenen en terugvinden',
    intro: 'Je recepten terugvinden tussen honderden andere: zoeken, categorieën met trefwoorden, mappen, favorieten en opschonen.'
  },
  en: {
    name: 'Organising and finding',
    intro: 'Find your recipes among hundreds of others: search, categories with keywords, folders, favourites and cleaning up.'
  }
};

export const pages = [
  {
    id: 'ordenen',
    related: ['zoeken', 'categorieen', 'mappen'],
    nl: {
      slug: 'handleiding-ordenen-en-zoeken',
      menu: 'Overzicht: ordenen en zoeken',
      h1: 'Ordenen en zoeken',
      title: 'Recepten ordenen en zoeken: mappen, categorieën, favorieten | Handleiding Savour',
      desc: 'Zo orden je je recepten in Savour: een receptenbibliotheek van A tot Z, zoeken op ingrediënt en techniek, categorieën met trefwoorden, mappen, favorieten en opschonen.',
      lead: 'Je beurre blanc in drie seconden terugvinden, ook tussen honderden recepten.',
      sections: [
        [
          'Alle recepten',
          'Onder “Alle recepten” staan al je eigen recepten, genummerd en op alfabet. Met de letters A–Z spring je naar een beginletter, en met de categorieën bovenaan zie je alleen één soort recept.'
        ],
        [
          'Vier manieren om te ordenen',
          'Savour heeft vier manieren, die je naast elkaar gebruikt:',
          [
            '[Zoeken](#zoeken): op naam, ingrediënt, component of techniek.',
            '[Categorieën](#categorieen): wat een recept is, zoals sauzen of patisserie. Elk recept heeft er één.',
            '[Mappen](#mappen): hoe jij werkt, zoals per partie, menu of seizoen. Een recept kan in meerdere mappen staan.',
            '[Favorieten](#favorieten): de recepten die je het vaakst gebruikt.'
          ]
        ],
        [
          'Opschonen',
          'Na een grote import haal je met [Opschonen](#opschonen) nummers voor receptnamen en dubbele recepten weg.'
        ],
        [
          'Met je team',
          'Je eigen mappen zie alleen jij. Wil je recepten met je brigade delen, gebruik dan een [keukenteam](#keukenteams) met eigen mappen.'
        ],
        [
          'Voorbeelden',
          'Ideeën voor een indeling lees je in [Receptenmappen indelen: voorbeelden](/blog/receptenmappen-indelen-voorbeelden) en in de tip [Categorieën en mappen](#tips-ordenen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-organise-and-search',
      menu: 'Overview: organising and searching',
      h1: 'Organising and searching',
      title: 'Organise and search recipes: folders, categories, favourites | Savour user guide',
      desc: 'How to organise recipes in Savour: an A–Z recipe library, search by ingredient and technique, categories with keywords, folders, favourites and clean-up.',
      lead: 'Find your beurre blanc in three seconds, even among hundreds of recipes.',
      sections: [
        [
          'All recipes',
          '“All recipes” holds all your own recipes, numbered and in alphabetical order. The letters A–Z jump to a first letter, and the categories at the top show just one kind of recipe.'
        ],
        [
          'Four ways to organise',
          'Savour has four ways, used side by side:',
          [
            '[Search](#zoeken): by name, ingredient, component or technique.',
            '[Categories](#categorieen): what a recipe is, such as sauces or pastry. Each recipe has one.',
            '[Folders](#mappen): how you work, such as by section, menu or season. A recipe can be in several folders.',
            '[Favourites](#favorieten): the recipes you use most.'
          ]
        ],
        [
          'Cleaning up',
          'After a big import, [Clean up](#opschonen) removes numbers in front of recipe names and duplicate recipes.'
        ],
        [
          'With your team',
          'Only you see your own folders. To share recipes with your brigade, use a [kitchen team](#keukenteams) with its own folders.'
        ],
        [
          'Examples',
          'Ideas for a structure are in [Recipe folder examples](/en/blog/recipe-folder-examples) and in the tip [Categories and folders](#tips-ordenen).'
        ]
      ]
    }
  },
  {
    id: 'zoeken',
    related: ['categorieen', 'favorieten', 'ordenen'],
    nl: {
      slug: 'handleiding-recepten-zoeken',
      menu: 'Zoeken en Alle recepten',
      title: 'Recepten zoeken op naam, ingrediënt of techniek | Handleiding Savour',
      desc: 'Zo zoek je in Savour: op receptnaam, ingrediënt, component of techniek, met de letters A–Z en filteren op categorie. Ook op je telefoon.',
      lead: 'Vind het recept, of het recept waar die ene saus in zit.',
      sections: [
        [
          'Zoeken',
          'Typ in de zoekbalk bovenin een receptnaam, een ingrediënt, een component of een techniek. Je ziet meteen de recepten die erbij passen. Zo vind je ook alle recepten waar je beurre noisette in gebruikt.'
        ],
        [
          'Op je telefoon',
          'Op een telefoon tik je bovenin op het vergrootglas om te zoeken.'
        ],
        [
          'Alle recepten',
          'Onder “Alle recepten” staan je recepten genummerd en op alfabet. Met de letters A–Z spring je naar een beginletter.'
        ],
        [
          'Filteren op categorie',
          'Bovenaan bij Alle recepten staan je [categorieën](#categorieen). Tik er een aan en je ziet alleen die soort recepten.'
        ],
        [
          'Terug naar je plek',
          'Open je een recept en ga je terug, dan kom je weer op dezelfde plek in de lijst.'
        ],
        [
          'Recepten in een keukenteam',
          'In een [keukenteam](#keukenteams) heeft het team een eigen bibliotheek met de recepten van het team, en zoek je in die recepten.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-search-recipes',
      menu: 'Search and All recipes',
      title: 'Search recipes by name, ingredient or technique | Savour user guide',
      desc: 'How to search in Savour: by recipe name, ingredient, component or technique, with the letters A–Z and filtering by category. On your phone too.',
      lead: 'Find the recipe, or the recipe that uses that one sauce.',
      sections: [
        [
          'Search',
          'Type a recipe name, an ingredient, a component or a technique in the search bar at the top. You see the matching recipes straight away. That way you also find every recipe that uses beurre noisette.'
        ],
        [
          'On your phone',
          'On a phone, tap the magnifying glass at the top to search.'
        ],
        [
          'All recipes',
          '“All recipes” shows your recipes numbered and in alphabetical order. The letters A–Z jump to a first letter.'
        ],
        [
          'Filtering by category',
          'Your [categories](#categorieen) are at the top of All recipes. Tap one to see only that kind of recipe.'
        ],
        [
          'Back to your place',
          'Open a recipe and go back, and you return to the same place in the list.'
        ],
        [
          'Recipes in a kitchen team',
          'In a [kitchen team](#keukenteams) the team has its own library with the team’s recipes, and you search those recipes.'
        ]
      ]
    }
  },
  {
    id: 'categorieen',
    related: ['categorie-trefwoorden', 'mappen', 'tips-ordenen'],
    nl: {
      slug: 'handleiding-categorieen',
      menu: 'Categorieën',
      title: 'Categorieën voor je recepten: sauzen, garnituren, patisserie | Handleiding',
      desc: 'Zo werk je met categorieën in Savour: wat een categorie is, categorieën toevoegen, hernoemen en verwijderen, en de standaardlijst voor de professionele keuken.',
      lead: 'Een categorie zegt wat een recept is: een saus, een garnituur, een dessert.',
      sections: [
        [
          'Wat een categorie is',
          'Elk recept heeft één categorie, zoals sauzen, ijs of garnituren. Bovenaan bij Alle recepten filter je er direct op, en in het menu staat “Categorieën” met al je recepten per soort.'
        ],
        [
          'Zelf beheren',
          'Ga naar Mijn account → Categorieën, of kies Categorieën in het menu. Met “＋ Categorie toevoegen” maak je een nieuwe; je kunt een naam wijzigen of een categorie verwijderen. De lijst is persoonlijk en wordt ook gebruikt bij het invoeren en importeren van recepten.'
        ],
        [
          'Standaardlijst',
          'Met “Standaardlijst” zet je in één keer een lijst neer die past bij de professionele keuken. Je eigen categorieën blijven staan.'
        ],
        [
          'Automatisch voorstellen',
          'Met trefwoorden stelt Savour zelf een categorie voor op basis van de receptnaam, bijvoorbeeld sorbet → IJs. Zie [Trefwoorden en categorieën voorstellen](#categorie-trefwoorden).'
        ],
        [
          'Categorie of map',
          'Gebruik categorieën voor wat een recept is, en [mappen](#mappen) voor hoe je werkt. Meer daarover in [Categorieën en mappen](#tips-ordenen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-categories',
      menu: 'Categories',
      title: 'Categories for your recipes: sauces, garnishes, pastry | User guide',
      desc: 'How to work with categories in Savour: what a category is, adding, renaming and deleting categories, and the default list for professional kitchens.',
      lead: 'A category says what a recipe is: a sauce, a garnish, a dessert.',
      sections: [
        [
          'What a category is',
          'Each recipe has one category, such as sauces, ice cream or garnishes. You filter on it at the top of All recipes, and the menu has “Categories” with all your recipes by kind.'
        ],
        [
          'Managing them',
          'Go to My account → Categories, or choose Categories in the menu. “＋ Add category” creates a new one; you can rename or delete a category. The list is personal and is also used when entering and importing recipes.'
        ],
        [
          'Default list',
          '“Default list” adds a list suited to professional kitchens in one go. Your own categories stay.'
        ],
        [
          'Suggested automatically',
          'With keywords Savour suggests a category based on the recipe name, for example sorbet → Ice cream. See [Keywords and suggested categories](#categorie-trefwoorden).'
        ],
        [
          'Category or folder',
          'Use categories for what a recipe is, and [folders](#mappen) for how you work. More in [Categories and folders](#tips-ordenen).'
        ]
      ]
    }
  },
  {
    id: 'categorie-trefwoorden',
    related: ['categorieen', 'opschonen'],
    nl: {
      slug: 'handleiding-trefwoorden-en-categorieen-voorstellen',
      menu: 'Trefwoorden en categorieën voorstellen',
      title: 'Trefwoorden: Savour stelt de categorie van je recepten voor | Handleiding',
      desc: 'Zo gebruik je trefwoorden in Savour: per categorie woorden opgeven, zoals sorbet voor IJs, en in één keer een categorie laten voorstellen voor al je recepten.',
      lead: 'Laat Savour het sorteerwerk doen, en bevestig zelf wat er verandert.',
      sections: [
        [
          'Trefwoorden opgeven',
          'Ga naar Categorieën en kies bij een categorie “Trefwoorden”. Geef woorden op die in de receptnaam voorkomen, bijvoorbeeld sorbet, granité en parfait voor IJs.'
        ],
        [
          'Bij nieuwe recepten',
          'Staat zo’n woord in de naam van een nieuw of geïmporteerd recept, dan kiest Savour die categorie. Past de naam bij meerdere categorieën, dan vraagt Savour welke je bedoelt. Bij een gelijke stand wint het langste, meest specifieke woord, zoals “ossenhaas” boven “haas”.'
        ],
        [
          'Categorieën voorstellen',
          'Met “Categorieën voorstellen” zoekt Savour voor al je recepten in één keer een passende categorie op basis van de trefwoorden. Je ziet eerst wat er verandert en bevestigt het zelf.'
        ],
        [
          'Tip',
          'Begin met de [standaardlijst](#categorieen), vul de trefwoorden aan met de woorden die jouw keuken gebruikt en laat daarna voorstellen. Recepten die nergens bij passen, blijven in hun categorie staan.'
        ]
      ]
    },
    en: {
      slug: 'en/guide-keywords-and-suggested-categories',
      menu: 'Keywords and suggested categories',
      title: 'Keywords: Savour suggests the category of your recipes | User guide',
      desc: 'How to use keywords in Savour: give each category words, such as sorbet for Ice cream, and have a category suggested for all your recipes at once.',
      lead: 'Let Savour do the sorting, and confirm what changes yourself.',
      sections: [
        [
          'Adding keywords',
          'Go to Categories and choose “Keywords” for a category. Enter words that appear in recipe names, for example sorbet, granita and parfait for Ice cream.'
        ],
        [
          'For new recipes',
          'If such a word is in the name of a new or imported recipe, Savour picks that category. If the name fits several categories, Savour asks which you mean. On a tie, the longest, most specific word wins, such as “tenderloin” over “loin”.'
        ],
        [
          'Suggest categories',
          '“Suggest categories” finds a fitting category for all your recipes at once, based on the keywords. You first see what will change and confirm it yourself.'
        ],
        [
          'Tip',
          'Start with the [default list](#categorieen), add the words your kitchen uses as keywords and then let Savour suggest. Recipes that fit nowhere keep their category.'
        ]
      ]
    }
  },
  {
    id: 'mappen',
    related: ['categorieen', 'printen-map', 'keukenteam-mappen'],
    nl: {
      slug: 'handleiding-receptenmappen',
      menu: 'Receptenmappen',
      title: 'Receptenmappen: per partie, menu of seizoen ordenen | Handleiding Savour',
      desc: 'Zo werk je met receptenmappen in Savour: mappen maken, recepten toevoegen, een recept in meerdere mappen, mappen in het menu en in volgorde zetten, en een map printen.',
      lead: 'Orden je recepten zoals je keuken werkt: per partie, per menu of per seizoen.',
      sections: [
        [
          'Een map maken',
          'Kies in het menu onder Recepten mappen “Recepten map toevoegen” en geef de map een naam, bijvoorbeeld “Garde manger”, “Lunchkaart” of “Kerst”.'
        ],
        [
          'Recepten in een map',
          'Open een map en kies welke recepten erin horen. Of zet een recept vanuit het recept zelf in een map: kies ⋯ en “Toevoegen aan map”. Een recept kan in meerdere mappen staan.'
        ],
        [
          'Uit een map halen',
          'Open het recept vanuit de map en kies ⋯ “Uit map halen”. Het recept blijft in je bibliotheek.'
        ],
        [
          'Menu en volgorde',
          'Kies welke mappen in het menu verschijnen en sleep ze in de volgorde die voor jou logisch is.'
        ],
        [
          'Een map printen',
          'Print een hele map in één keer, met voorblad, inhoudsopgave en het nummer van elk recept onderaan de pagina. Zie [Meerdere recepten printen](#printen-map).'
        ],
        [
          'Alleen voor jou',
          'Je eigen mappen zie alleen jij. Mappen die je met je team deelt, maak je in een [keukenteam](#keukenteam-mappen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-recipe-folders',
      menu: 'Recipe folders',
      title: 'Recipe folders: organise by section, menu or season | Savour user guide',
      desc: 'How to work with recipe folders in Savour: creating folders, adding recipes, one recipe in several folders, folders in the menu and in order, and printing a folder.',
      lead: 'Organise your recipes the way your kitchen works: by section, menu or season.',
      sections: [
        [
          'Creating a folder',
          'In the menu under Recipe folders choose “Add recipe folder” and give it a name, for example “Garde manger”, “Lunch menu” or “Christmas”.'
        ],
        [
          'Recipes in a folder',
          'Open a folder and choose which recipes belong in it. Or add a recipe to a folder from the recipe itself: choose ⋯ and “Add to folder”. A recipe can be in several folders.'
        ],
        [
          'Removing from a folder',
          'Open the recipe from the folder and choose ⋯ “Remove from folder”. The recipe stays in your library.'
        ],
        [
          'Menu and order',
          'Choose which folders appear in the menu and drag them into the order that makes sense to you.'
        ],
        [
          'Printing a folder',
          'Print a whole folder at once, with cover page, table of contents and each recipe’s number at the bottom of the page. See [Printing several recipes](#printen-map).'
        ],
        [
          'Only for you',
          'Only you see your own folders. Folders you share with your team are made in a [kitchen team](#keukenteam-mappen).'
        ]
      ]
    }
  },
  {
    id: 'favorieten',
    related: ['zoeken', 'mappen'],
    nl: {
      slug: 'handleiding-favorieten',
      menu: 'Favorieten',
      title: 'Favoriete recepten met een sterretje | Handleiding Savour',
      desc: 'Zo gebruik je favorieten in Savour: een recept een sterretje geven en je favorieten snel openen in het menu of bovenin op je telefoon.',
      lead: 'De recepten die je elke dienst nodig hebt, altijd met één tik.',
      sections: [
        [
          'Een favoriet maken',
          'Open een recept en kies “Favoriet”, of tik op het sterretje. Nog een keer tikken haalt het sterretje weer weg.'
        ],
        [
          'Je favorieten openen',
          'Je favorieten staan onder Favorieten in het menu. Op een telefoon open je ze met het sterretje bovenin.'
        ],
        [
          'Favoriet of map',
          'Favorieten zijn handig voor de recepten die je nu veel gebruikt. Voor een vaste indeling, zoals per partie, gebruik je [mappen](#mappen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-favourites',
      menu: 'Favourites',
      title: 'Favourite recipes with a star | Savour user guide',
      desc: 'How to use favourites in Savour: give a recipe a star and open your favourites quickly from the menu or at the top on your phone.',
      lead: 'The recipes you need every service, always one tap away.',
      sections: [
        [
          'Making a favourite',
          'Open a recipe and choose “Favourite”, or tap the star. Tapping again removes the star.'
        ],
        [
          'Opening your favourites',
          'Your favourites are under Favourites in the menu. On a phone you open them with the star at the top.'
        ],
        [
          'Favourite or folder',
          'Favourites are handy for the recipes you use a lot right now. For a fixed structure, such as by section, use [folders](#mappen).'
        ]
      ]
    }
  },
  {
    id: 'opschonen',
    related: ['recept-verwijderen', 'import-controleren', 'categorie-trefwoorden'],
    nl: {
      slug: 'handleiding-opschonen',
      menu: 'Opschonen: nummers en dubbele recepten',
      title: 'Opschonen: nummers voor receptnamen en dubbele recepten | Handleiding Savour',
      desc: 'Zo ruim je je receptenbibliotheek op in Savour: nummers voor receptnamen weghalen en dubbele recepten samenvoegen, met mappen, favorieten en keukenteams erbij.',
      lead: 'Na een grote import alles netjes, zonder iets kwijt te raken.',
      sections: [
        [
          'Waar',
          'Ga naar Mijn account → Opschonen. Savour kijkt of er nummers voor receptnamen staan, zoals “12. Kalfsjus”, en of recepten dubbel in je bibliotheek staan. Je ziet altijd eerst wat er verandert.'
        ],
        [
          'Nummers weghalen',
          'Kwamen je recepten uit een genummerd receptenboek, dan haal je de nummers in één keer weg met “Nummers weghalen”. Savour laat eerst voorbeelden zien.'
        ],
        [
          'Dubbele recepten',
          'Savour zoekt kopieën die precies hetzelfde zijn: dezelfde naam, opbrengst, ingrediënten en bereiding. Van elk recept blijft er één staan. Mappen, favorieten en keukenteams gaan over naar het recept dat blijft.'
        ],
        [
          'Bijna hetzelfde',
          'Recepten die net iets verschillen, zoals een andere hoeveelheid, ziet Savour niet als dubbel. Die vergelijk je zelf en verwijder je met [Recepten verwijderen](#recept-verwijderen).'
        ]
      ]
    },
    en: {
      slug: 'en/guide-clean-up',
      menu: 'Clean up: numbers and duplicates',
      title: 'Clean up: numbers in recipe names and duplicate recipes | Savour user guide',
      desc: 'How to tidy your recipe library in Savour: remove numbers in front of recipe names and merge duplicate recipes, keeping folders, favourites and kitchen teams.',
      lead: 'Everything tidy after a big import, without losing anything.',
      sections: [
        [
          'Where',
          'Go to My account → Clean up. Savour checks for numbers in front of recipe names, such as “12. Veal jus”, and for recipes that appear twice in your library. You always see what will change first.'
        ],
        [
          'Removing numbers',
          'If your recipes came from a numbered recipe book, remove the numbers in one go with “Remove numbers”. Savour shows examples first.'
        ],
        [
          'Duplicate recipes',
          'Savour looks for copies that are exactly the same: same name, yield, ingredients and method. One of each recipe stays. Folders, favourites and kitchen teams move to the recipe that stays.'
        ],
        [
          'Almost the same',
          'Savour does not treat recipes that differ slightly, such as a different quantity, as duplicates. Compare those yourself and delete them with [Deleting recipes](#recept-verwijderen).'
        ]
      ]
    }
  }
];
