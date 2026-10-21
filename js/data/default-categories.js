// Standaardcategorieën voor een nieuw account, met trefwoorden waarmee Savour een categorie voorstelt.
// De chef kan alles daarna aanpassen op de pagina Categorieën.
//
// Trefwoorden worden gezocht in de receptnaam, zonder hoofdletters en accenten (crème = creme).
// Een trefwoord van minder dan 5 letters telt alleen aan het begin of eind van een woord, dus "ijs" past
// bij "citroenijs" maar niet bij "rijst". Vermijd korte trefwoorden die in veel woorden voorkomen
// (zoals "ham" in champignon of "ree" in puree).

const DEFAULT_CATEGORIES = [
  {
    name: 'Basisbereidingen',
    keywords: [
      'fond',
      'bouillon',
      'consommé',
      'dashi',
      'olie',
      'boter',
      'gel',
      'poeder',
      'pickle',
      'ingelegd',
      'fermentatie',
      'garum',
      'azijn'
    ]
  },
  {
    name: 'Sauzen & dressings',
    keywords: [
      'saus',
      'sauce',
      'jus',
      'hollandaise',
      'béarnaise',
      'beurre blanc',
      'beurre',
      'mayonaise',
      'mayo',
      'aioli',
      'vinaigrette',
      'dressing',
      'glaze',
      'pesto',
      'salsa',
      'gastrique'
    ]
  },
  {
    name: 'Soepen',
    keywords: ['soep', 'bisque', 'velouté', 'gazpacho', 'minestrone', 'chowder', 'potage', 'bouillabaisse']
  },
  {
    name: 'Koude keuken',
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
      'gravad',
      'crudo',
      'sashimi',
      'tataki',
      'galantine',
      'ballotine'
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
      'tong',
      'zeebaars',
      'zeebrasem',
      'makreel',
      'tonijn',
      'heilbot',
      'forel',
      'schol',
      'snoekbaars',
      'haring',
      'paling',
      'ansjovis',
      'garnaal',
      'garnalen',
      'gamba',
      'kreeft',
      'langoustine',
      'oester',
      'mossel',
      'coquille',
      'sint-jakobsschelp',
      'krab',
      'inktvis',
      'octopus',
      'kaviaar'
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
      'biefstuk',
      'entrecote',
      'ossenhaas',
      'ribeye',
      'tournedos',
      'ossenstaart',
      'ossentong',
      'wang',
      'gehakt',
      'worst',
      'spareribs',
      'buikspek',
      'bacon',
      'procureur',
      'fricandeau'
    ]
  },
  {
    name: 'Gevogelte & wild',
    keywords: [
      'kip',
      'kippen',
      'poulet',
      'eend',
      'duif',
      'parelhoen',
      'kalkoen',
      'fazant',
      'kwartel',
      'gans',
      'hert',
      'reerug',
      'reebout',
      'everzwijn',
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
      'bloemkool',
      'asperge',
      'wortel',
      'biet',
      'kool',
      'broccoli',
      'spinazie',
      'prei',
      'venkel',
      'selderij',
      'pompoen',
      'courgette',
      'aubergine',
      'paprika',
      'tomaat',
      'tomaten',
      'champignon',
      'paddenstoel',
      'artisjok',
      'erwt',
      'erwten',
      'boon',
      'bonen',
      'linzen',
      'witlof',
      'andijvie',
      'sjalot'
    ]
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
      'rösti',
      'risotto',
      'rijst',
      'pasta',
      'gnocchi',
      'polenta',
      'couscous',
      'bulgur',
      'quinoa',
      'noedel',
      'ravioli',
      'tagliatelle',
      'lasagne',
      'spaghetti',
      'orzo'
    ]
  },
  {
    name: 'Brood & deeg',
    keywords: [
      'brood',
      'focaccia',
      'brioche',
      'zuurdesem',
      'ciabatta',
      'baguette',
      'pizza',
      'deeg',
      'cracker',
      'croissant',
      'crostini',
      'naan'
    ]
  },
  {
    name: 'Patisserie & desserts',
    keywords: [
      'dessert',
      'mousse',
      'bavarois',
      'taart',
      'tarte',
      'tartelet',
      'cake',
      'gebak',
      'crème brûlée',
      'panna cotta',
      'tiramisu',
      'soufflé',
      'ganache',
      'crémeux',
      'macaron',
      'financier',
      'madeleine',
      'meringue',
      'sabayon',
      'clafoutis',
      'crumble',
      'cheesecake',
      'brownie',
      'koek',
      'chocolade',
      'praline',
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
      'stoofpeer',
      'crêpe',
      'wafel',
      'beignet',
      'éclair',
      'soes'
    ]
  },
  {
    name: 'IJs & sorbets',
    keywords: ['ijs', 'roomijs', 'sorbet', 'parfait', 'granité', 'granita', 'semifreddo', 'gelato']
  },
  {
    name: 'Dranken',
    keywords: ['drank', 'cocktail', 'mocktail', 'limonade', 'smoothie', 'sap', 'siroop', 'thee', 'koffie', 'infusie']
  }
];

// Voegt de standaardcategorieën toe die nog ontbreken. Bestaat een categorie al zonder trefwoorden,
// dan krijgt die de standaardtrefwoorden; eigen trefwoorden blijven altijd staan.
async function addDefaultCategories(existing = []) {
  const byName = new Map(existing.map(c => [c.name, c]));
  const missing = DEFAULT_CATEGORIES.filter(c => !byName.has(c.name)).map(c => ({
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
  for (const c of DEFAULT_CATEGORIES) {
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
