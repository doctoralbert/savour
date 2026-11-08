// Standaardcategorieën voor een nieuw account, met trefwoorden waarmee Savour een categorie voorstelt.
// De chef kan alles daarna aanpassen op de pagina Categorieën.
//
// Trefwoorden worden gezocht in de receptnaam, zonder hoofdletters en accenten (crème = creme).
// Een trefwoord van minder dan 5 letters telt alleen aan het begin of eind van een woord, dus "ijs" past
// bij "citroenijs" maar niet bij "rijst". Passen meerdere trefwoorden, dan wint bij gelijke stand het
// langste. Daarom staan woorden als "radijs", "ijsbergsla" en "varkenshaas" er voluit in: zo komen ze
// niet bij IJs of Wild terecht.

const DEFAULT_CATEGORIES = [
  {
    name: 'Amuse',
    keywords: [
      'amuse',
      'amuse-bouche',
      'hapje',
      'hapjes',
      'canapé',
      'bite',
      'bites',
      'bitterbal',
      'kroket',
      'crostini',
      'toast',
      'borrel',
      'finger food',
      'lollipop',
      'gougère',
      'cromesquis'
    ]
  },
  {
    name: 'Basisbereidingen',
    keywords: [
      'fond',
      'fumet',
      'bouillon',
      'court-bouillon',
      'consommé',
      'dashi',
      'olie',
      'boter',
      'beurre noisette',
      'ghee',
      'pickle',
      'ingelegd',
      'inmaak',
      'fermentatie',
      'gefermenteerd',
      'zoetzuur',
      'pekel',
      'pekelvocht',
      'marinade',
      'garum',
      'azijn',
      'poeder',
      'krokant',
      'kruidenmix',
      'specerij'
    ]
  },
  {
    name: 'Warme sauzen',
    keywords: [
      'saus',
      'sauce',
      'jus',
      'hollandaise',
      'béarnaise',
      'beurre blanc',
      'beurre rouge',
      'beurre',
      'demi-glace',
      'glace de viande',
      'bordelaise',
      'choron',
      'mousseline',
      'maltaise',
      'béchamel',
      'mornay',
      'espagnole',
      'poivrade',
      'chasseur',
      'bercy',
      'nantua',
      'américaine',
      'gastrique',
      'roux'
    ]
  },
  {
    name: 'Koude sauzen',
    keywords: [
      'mayonaise',
      'mayo',
      'aioli',
      'vinaigrette',
      'dressing',
      'pesto',
      'salsa',
      'remoulade',
      'tartaarsaus',
      'cocktailsaus',
      'gribiche',
      'ravigote',
      'chimichurri',
      'romesco',
      'tapenade',
      'gremolata',
      'rouille',
      'ponzu',
      'chutney',
      'relish',
      'dip',
      'hummus'
    ]
  },
  {
    name: 'Soepen',
    keywords: [
      'soep',
      'bisque',
      'velouté',
      'gazpacho',
      'bouillabaisse',
      'minestrone',
      'chowder',
      'potage',
      'vichyssoise',
      'borsjtsj',
      'laksa',
      'tom kha'
    ]
  },
  {
    name: 'Garde',
    keywords: [
      'salade',
      'tartaar',
      'tartare',
      'carpaccio',
      'terrine',
      'paté',
      'rillette',
      'ceviche',
      'gravlax',
      'crudo',
      'sashimi',
      'tataki',
      'tiradito',
      'poké',
      'galantine',
      'ballotine',
      'vitello tonnato',
      'foie gras',
      'coleslaw',
      'rauwkost',
      'crudité'
    ]
  },
  {
    name: 'Vis & schaaldieren',
    keywords: [
      'vis',
      'zalm',
      'kabeljauw',
      'skrei',
      'tarbot',
      'griet',
      'tong',
      'zeetong',
      'zeebaars',
      'zeebrasem',
      'dorade',
      'makreel',
      'tonijn',
      'heilbot',
      'forel',
      'schol',
      'schar',
      'poon',
      'pieterman',
      'snoekbaars',
      'snoek',
      'zeeduivel',
      'wijting',
      'heek',
      'harder',
      'sardine',
      'ansjovis',
      'haring',
      'bokking',
      'paling',
      'stokvis',
      'bacalhau',
      'gravedlax',
      'garnaal',
      'garnalen',
      'gamba',
      'kreeft',
      'langoustine',
      'oester',
      'mossel',
      'coquille',
      'sint-jakobsschelp',
      'kokkel',
      'scheermes',
      'venusschelp',
      'krab',
      'inktvis',
      'pijlinktvis',
      'calamari',
      'sepia',
      'octopus',
      'kaviaar',
      'kuit',
      'zeeëgel'
    ]
  },
  {
    name: 'Vlees',
    keywords: [
      'vlees',
      'rund',
      'kalf',
      'varken',
      'lams',
      'boeuf',
      'ossenhaas',
      'varkenshaas',
      'kalfshaas',
      'lamshaas',
      'entrecote',
      'ribeye',
      'rib-eye',
      'côte de boeuf',
      'biefstuk',
      'tournedos',
      'chateaubriand',
      'picanha',
      'bavette',
      'sukade',
      'klapstuk',
      'staart',
      'ossenstaart',
      'ossentong',
      'wang',
      'zwezerik',
      'nier',
      'lever',
      'merg',
      'rundervet',
      'buikspek',
      'pancetta',
      'guanciale',
      'bacon',
      'spareribs',
      'ribs',
      'kotelet',
      'karbonade',
      'schnitzel',
      'rollade',
      'fricandeau',
      'procureur',
      'gehakt',
      'gehaktbal',
      'burger',
      'hamburger',
      'worst',
      'chorizo',
      'salami',
      'saté',
      'rendang',
      'shoarma',
      'pulled pork'
    ]
  },
  {
    name: 'Gevogelte & wild',
    keywords: [
      'kip',
      'kippen',
      'poulet',
      'poussin',
      'coquelet',
      'eend',
      'canard',
      'duif',
      'parelhoen',
      'kalkoen',
      'fazant',
      'patrijs',
      'kwartel',
      'gans',
      'houtsnip',
      'hert',
      'hinde',
      'reerug',
      'reebout',
      'reewild',
      'everzwijn',
      'wild zwijn',
      'haas',
      'hazen',
      'konijn',
      'wild'
    ]
  },
  {
    name: 'Groenten & garnituren',
    keywords: [
      'groente',
      'garnituur',
      'asperge',
      'bloemkool',
      'broccoli',
      'romanesco',
      'spruit',
      'kool',
      'spitskool',
      'savooiekool',
      'boerenkool',
      'zuurkool',
      'koolrabi',
      'wortel',
      'peen',
      'pastinaak',
      'biet',
      'knolselderij',
      'selderij',
      'venkel',
      'prei',
      'uien',
      'sjalot',
      'knoflook',
      'champignon',
      'paddenstoel',
      'cantharel',
      'eekhoorntjesbrood',
      'shiitake',
      'oesterzwam',
      'morielje',
      'bonen',
      'boon',
      'sperzieboon',
      'tuinbonen',
      'erwt',
      'erwten',
      'doperwt',
      'peultjes',
      'kikkererwt',
      'linzen',
      'edamame',
      'maïskolf',
      'witlof',
      'andijvie',
      'spinazie',
      'snijbiet',
      'postelein',
      'rucola',
      'waterkers',
      'ijsbergsla',
      'zeekraal',
      'lamsoor',
      'courgette',
      'aubergine',
      'paprika',
      'tomaat',
      'tomaten',
      'komkommer',
      'pompoen',
      'butternut',
      'zoete aardappel',
      'artisjok',
      'aardpeer',
      'schorseneren',
      'raapstelen',
      'radijs',
      'rammenas',
      'avocado',
      'paksoi',
      'pak choi'
    ]
  },
  {
    name: 'Creme',
    keywords: ['creme', 'emulsie', 'espuma', 'schuim']
  },
  {
    name: 'Aardappel, rijst & pasta',
    keywords: [
      'aardappel',
      'friet',
      'frites',
      'pommes',
      'kriel',
      'gratin',
      'dauphinois',
      'rösti',
      'risotto',
      'rijst',
      'paella',
      'pilaf',
      'pasta',
      'gnocchi',
      'polenta',
      'couscous',
      'bulgur',
      'quinoa',
      'gierst',
      'noedel',
      'mie',
      'udon',
      'soba',
      'ravioli',
      'tortellini',
      'agnolotti',
      'tagliatelle',
      'pappardelle',
      'spaghetti',
      'linguine',
      'penne',
      'lasagne',
      'orzo',
      'macaroni',
      'fregola'
    ]
  },
  {
    name: 'Brood & deeg',
    keywords: [
      'brood',
      'broodje',
      'focaccia',
      'brioche',
      'zuurdesem',
      'ciabatta',
      'baguette',
      'pizza',
      'deeg',
      'croissant',
      'cracker',
      'naan',
      'pita',
      'platbrood',
      'flatbread',
      'bao',
      'tortilla',
      'bagel',
      'grissini',
      'lavash',
      'knäckebröd'
    ]
  },
  {
    name: 'Patisserie & desserts',
    keywords: [
      'dessert',
      'nagerecht',
      'mousse',
      'bavarois',
      'taart',
      'tarte',
      'tartelet',
      'cake',
      'gebakje',
      'crème brûlée',
      'crème caramel',
      'crème pâtissière',
      'crème anglaise',
      'crémeux',
      'panna cotta',
      'tiramisu',
      'soufflé',
      'ganache',
      'macaron',
      'financier',
      'madeleine',
      'meringue',
      'pavlova',
      'sabayon',
      'zabaglione',
      'clafoutis',
      'crumble',
      'cheesecake',
      'brownie',
      'koek',
      'koekje',
      'cookie',
      'chocolade',
      'praline',
      'bonbon',
      'karamel',
      'caramel',
      'compote',
      'coulis',
      'pudding',
      'pâte sucrée',
      'pâte brisée',
      'pâte sablée',
      'pâte à choux',
      'choux',
      'sablé',
      'soes',
      'profiterole',
      'éclair',
      'millefeuille',
      'mille-feuille',
      'opera',
      'entremet',
      'dacquoise',
      'joconde',
      'biscuit',
      'génoise',
      'frangipane',
      'amandelspijs',
      'marsepein',
      'nougat',
      'fudge',
      'gelei',
      'confituur',
      'crêpe',
      'wafel',
      'beignet',
      'churro',
      'baba',
      'savarin',
      'canelé',
      'kouign-amann',
      'petit four',
      'friandise',
      'mignardise',
      'muffin',
      'donut',
      'stoofpeer',
      'pain perdu',
      'scone'
    ]
  },
  {
    name: 'IJs & sorbets',
    keywords: [
      'ijs',
      'roomijs',
      'schepijs',
      'softijs',
      'waterijs',
      'ijstaart',
      'sorbet',
      'parfait',
      'granité',
      'granita',
      'semifreddo',
      'gelato',
      'frozen yoghurt',
      'bombe glacée',
      'sundae',
      'coupe'
    ]
  },
  {
    name: 'Dranken',
    keywords: [
      'drank',
      'cocktail',
      'mocktail',
      'limonade',
      'smoothie',
      'milkshake',
      'shake',
      'sap',
      "jus d'orange",
      'siroop',
      'thee',
      'ijsthee',
      'koffie',
      'infusie',
      'kombucha',
      'punch',
      'sangria',
      'lassi'
    ]
  }
];

// Namen en extra trefwoorden in de andere talen van Savour (2026-11-08). Een nieuw account krijgt de categorieën in
// de taal waarin het werkt; de Nederlandse trefwoorden blijven erbij, voor recepten met een Nederlandse naam.
// [naam, trefwoorden] per taal, op de Nederlandse naam.
const DEFAULT_CATEGORY_I18N = {
  Amuse: {
    en: ['Amuse-bouche', ['canapé', 'canapes', 'appetizer', 'snack', 'bite']],
    de: ['Amuse-Bouche', ['häppchen', 'fingerfood', 'appetizer']],
    es: ['Aperitivos', ['aperitivo', 'tapa', 'canapé', 'bocado']],
    fr: ['Amuse-bouche', ['amuse-gueule', 'mise en bouche', 'canapé', 'bouchée']]
  },
  Basisbereidingen: {
    en: ['Base preparations', ['stock', 'broth', 'base', 'ferment', 'pickle', 'oil']],
    de: ['Grundzubereitungen', ['fond', 'brühe', 'basis', 'fermentiert', 'öl']],
    es: ['Elaboraciones base', ['fondo', 'caldo', 'base', 'fermentado', 'aceite']],
    fr: ['Préparations de base', ['fond', 'bouillon', 'base', 'fermenté', 'huile']]
  },
  'Warme sauzen': {
    en: ['Hot sauces', ['sauce', 'jus', 'gravy', 'velouté', 'hollandaise', 'beurre blanc']],
    de: ['Warme Saucen', ['sauce', 'soße', 'jus', 'velouté', 'hollandaise']],
    es: ['Salsas calientes', ['salsa', 'jugo', 'velouté', 'holandesa']],
    fr: ['Sauces chaudes', ['sauce', 'jus', 'velouté', 'hollandaise', 'beurre blanc']]
  },
  'Koude sauzen': {
    en: ['Cold sauces', ['dressing', 'vinaigrette', 'mayonnaise', 'aioli', 'pesto', 'salsa']],
    de: ['Kalte Saucen', ['dressing', 'vinaigrette', 'mayonnaise', 'aioli', 'pesto']],
    es: ['Salsas frías', ['aliño', 'vinagreta', 'mayonesa', 'alioli', 'pesto']],
    fr: ['Sauces froides', ['vinaigrette', 'mayonnaise', 'aïoli', 'pesto', 'condiment']]
  },
  Soepen: {
    en: ['Soups', ['soup', 'bisque', 'chowder', 'consommé', 'gazpacho']],
    de: ['Suppen', ['suppe', 'bisque', 'consommé', 'gazpacho']],
    es: ['Sopas', ['sopa', 'crema', 'bisque', 'consomé', 'gazpacho']],
    fr: ['Soupes', ['soupe', 'potage', 'velouté', 'bisque', 'consommé']]
  },
  Garde: {
    en: ['Garde manger', ['salad', 'terrine', 'tartare', 'carpaccio', 'ceviche']],
    de: ['Garde-manger', ['salat', 'terrine', 'tatar', 'carpaccio']],
    es: ['Cuarto frío', ['ensalada', 'terrina', 'tartar', 'carpaccio', 'ceviche']],
    fr: ['Garde-manger', ['salade', 'terrine', 'tartare', 'carpaccio']]
  },
  'Vis & schaaldieren': {
    en: ['Fish & seafood', ['fish', 'salmon', 'cod', 'prawn', 'shrimp', 'lobster', 'scallop', 'mussels', 'oyster', 'crab']],
    de: ['Fisch & Meeresfrüchte', ['fisch', 'lachs', 'kabeljau', 'garnele', 'hummer', 'jakobsmuschel', 'muscheln']],
    es: ['Pescados y mariscos', ['pescado', 'salmón', 'bacalao', 'gamba', 'langosta', 'vieira', 'mejillones']],
    fr: ['Poissons et fruits de mer', ['poisson', 'saumon', 'cabillaud', 'crevette', 'homard', 'saint-jacques', 'moules']]
  },
  Vlees: {
    en: ['Meat', ['beef', 'pork', 'lamb', 'veal', 'steak', 'ribs', 'brisket']],
    de: ['Fleisch', ['rind', 'schwein', 'lamm', 'kalb', 'steak', 'braten']],
    es: ['Carnes', ['ternera', 'cerdo', 'cordero', 'buey', 'chuletón', 'costillas']],
    fr: ['Viandes', ['bœuf', 'boeuf', 'porc', 'agneau', 'veau', 'côte']]
  },
  'Gevogelte & wild': {
    en: ['Poultry & game', ['chicken', 'duck', 'pigeon', 'quail', 'venison', 'game', 'turkey']],
    de: ['Geflügel & Wild', ['huhn', 'hähnchen', 'ente', 'taube', 'wachtel', 'hirsch', 'reh', 'wild']],
    es: ['Aves y caza', ['pollo', 'pato', 'pichón', 'codorniz', 'ciervo', 'caza']],
    fr: ['Volailles et gibier', ['poulet', 'canard', 'pigeon', 'caille', 'cerf', 'chevreuil', 'gibier']]
  },
  'Groenten & garnituren': {
    en: ['Vegetables & garnishes', ['vegetable', 'garnish', 'purée', 'roasted', 'pickled']],
    de: ['Gemüse & Beilagen', ['gemüse', 'beilage', 'püree']],
    es: ['Verduras y guarniciones', ['verdura', 'guarnición', 'puré']],
    fr: ['Légumes et garnitures', ['légume', 'garniture', 'purée']]
  },
  Creme: {
    en: ['Creams', ['cream', 'custard', 'crémeux']],
    de: ['Cremes', ['creme', 'crème']],
    es: ['Cremas', ['crema', 'natilla']],
    fr: ['Crèmes', ['crème', 'crémeux']]
  },
  'Aardappel, rijst & pasta': {
    en: ['Potato, rice & pasta', ['potato', 'rice', 'risotto', 'pasta', 'gnocchi', 'noodles']],
    de: ['Kartoffeln, Reis & Pasta', ['kartoffel', 'reis', 'risotto', 'pasta', 'nudeln', 'gnocchi']],
    es: ['Patata, arroz y pasta', ['patata', 'arroz', 'risotto', 'pasta', 'ñoquis']],
    fr: ['Pommes de terre, riz et pâtes', ['pomme de terre', 'riz', 'risotto', 'pâtes', 'gnocchi']]
  },
  'Brood & deeg': {
    en: ['Bread & dough', ['bread', 'dough', 'brioche', 'focaccia', 'pastry']],
    de: ['Brot & Teig', ['brot', 'teig', 'brioche', 'focaccia']],
    es: ['Pan y masas', ['pan', 'masa', 'brioche', 'focaccia']],
    fr: ['Pains et pâtes', ['pain', 'pâte', 'brioche', 'focaccia']]
  },
  'Patisserie & desserts': {
    en: ['Pastry & desserts', ['dessert', 'cake', 'tart', 'mousse', 'ganache', 'cookie', 'meringue']],
    de: ['Patisserie & Desserts', ['dessert', 'kuchen', 'torte', 'mousse', 'ganache', 'baiser']],
    es: ['Pastelería y postres', ['postre', 'pastel', 'tarta', 'mousse', 'ganache', 'merengue']],
    fr: ['Pâtisserie et desserts', ['dessert', 'gâteau', 'tarte', 'mousse', 'ganache', 'meringue']]
  },
  'IJs & sorbets': {
    en: ['Ice cream & sorbets', ['ice cream', 'sorbet', 'gelato', 'parfait', 'granita']],
    de: ['Eis & Sorbets', ['eis', 'sorbet', 'gelato', 'parfait']],
    es: ['Helados y sorbetes', ['helado', 'sorbete', 'granizado', 'parfait']],
    fr: ['Glaces et sorbets', ['glace', 'sorbet', 'parfait', 'granité']]
  },
  Dranken: {
    en: ['Drinks', ['drink', 'cocktail', 'lemonade', 'syrup', 'smoothie']],
    de: ['Getränke', ['getränk', 'cocktail', 'limonade', 'sirup']],
    es: ['Bebidas', ['bebida', 'cóctel', 'limonada', 'sirope']],
    fr: ['Boissons', ['boisson', 'cocktail', 'limonade', 'sirop']]
  }
};

// De standaardcategorieën in een taal: naam in die taal, trefwoorden in die taal plus de Nederlandse.
function defaultCategoriesFor(lang = typeof currentLanguage === 'undefined' ? 'nl' : currentLanguage) {
  return DEFAULT_CATEGORIES.map(c => {
    const own = DEFAULT_CATEGORY_I18N[c.name]?.[lang];
    return own ? { name: own[0], keywords: [...new Set([...own[1], ...c.keywords])] } : c;
  });
}

// Voegt de standaardcategorieën toe die nog ontbreken. Bestaat een categorie al zonder trefwoorden,
// dan krijgt die de standaardtrefwoorden; eigen trefwoorden blijven altijd staan.
async function addDefaultCategories(existing = []) {
  const byName = new Map(existing.map(c => [c.name, c]));
  const defaults = defaultCategoriesFor();
  const missing = defaults.filter(c => !byName.has(c.name)).map(c => ({
    user_id: currentUser.id,
    name: c.name,
    keywords: c.keywords
  }));
  if (missing.length) {
    let { error } = await supabaseClient.from('categories').insert(missing);
    // Zonder de trefwoorden-kolom (SQL nog niet uitgevoerd) alleen de namen toevoegen.
    if (error)
      ({ error } = await supabaseClient.from('categories').insert(missing.map(({ keywords, ...rest }) => rest)));
    if (error) throw error;
  }
  for (const c of defaults) {
    const current = byName.get(c.name);
    if (current && Array.isArray(current.keywords) && !current.keywords.length) {
      await supabaseClient
        .from('categories')
        .update({ keywords: c.keywords })
        .eq('id', current.id)
        .eq('user_id', currentUser.id);
    }
  }
  return missing.length;
}
