// Demo-account met proefrecepten (er wordt niets opgeslagen).

// De demo in de taal van de bezoeker: recepten, categorieën, mappen en het keukenteam. Recepten worden in de app
// nooit vertaald; daarom staat de demo hier per taal klaar. Wisselt de bezoeker van taal, dan wisselt de demo mee.
const DEMO_TEXT = {
  nl: {
    categories: [
      ['Basisbereidingen', ['fond', 'olie', 'fermentatie', 'gel']],
      ['Sauzen', ['saus', 'jus', 'beurre', 'hollandaise', 'vinaigrette', 'glaze']],
      ['Garde', []],
      ['Patisserie', ['ijs', 'sorbet', 'mousse', 'bavarois', 'crémeux']],
      ['Vis', ['vis', 'garnalen', 'bisque', 'dashi']],
      ['Vlees', ['eend', 'kalf', 'veau']]
    ],
    sharedBy: 'Gedeeld door Chef Anna',
    team: 'Demo keukenteam',
    you: 'Jij'
  },
  en: {
    categories: [
      ['Base preparations', ['stock', 'oil', 'ferment', 'gel']],
      ['Sauces', ['sauce', 'jus', 'beurre', 'hollandaise', 'vinaigrette', 'glaze']],
      ['Garde manger', []],
      ['Pastry', ['ice cream', 'sorbet', 'mousse', 'bavarois', 'crémeux']],
      ['Fish', ['fish', 'prawn', 'bisque', 'dashi']],
      ['Meat', ['duck', 'veal', 'veau']]
    ],
    sharedBy: 'Shared by Chef Anna',
    team: 'Demo kitchen team',
    you: 'You'
  },
  de: {
    categories: [
      ['Grundzubereitungen', ['fond', 'öl', 'fermentation', 'gel']],
      ['Saucen', ['sauce', 'jus', 'beurre', 'hollandaise', 'vinaigrette', 'glasur']],
      ['Garde-manger', []],
      ['Patisserie', ['eis', 'sorbet', 'mousse', 'bavarois', 'crémeux']],
      ['Fisch', ['fisch', 'garnelen', 'bisque', 'dashi']],
      ['Fleisch', ['ente', 'kalb', 'veau']]
    ],
    sharedBy: 'Geteilt von Chefin Anna',
    team: 'Demo-Küchenteam',
    you: 'Du'
  },
  es: {
    categories: [
      ['Elaboraciones base', ['fondo', 'aceite', 'fermentación', 'gel']],
      ['Salsas', ['salsa', 'jugo', 'beurre', 'holandesa', 'vinagreta', 'glaseado']],
      ['Cuarto frío', []],
      ['Pastelería', ['helado', 'sorbete', 'mousse', 'bavarois', 'cremoso']],
      ['Pescado', ['pescado', 'gambas', 'bisque', 'dashi']],
      ['Carne', ['pato', 'ternera', 'veau']]
    ],
    sharedBy: 'Compartido por la chef Anna',
    team: 'Equipo de cocina demo',
    you: 'Tú'
  },
  fr: {
    categories: [
      ['Préparations de base', ['fond', 'huile', 'fermentation', 'gel']],
      ['Sauces', ['sauce', 'jus', 'beurre', 'hollandaise', 'vinaigrette', 'glaçage']],
      ['Garde-manger', []],
      ['Pâtisserie', ['glace', 'sorbet', 'mousse', 'bavarois', 'crémeux']],
      ['Poisson', ['poisson', 'crevettes', 'bisque', 'dashi']],
      ['Viande', ['canard', 'veau']]
    ],
    sharedBy: 'Partagé par la cheffe Anna',
    team: 'Équipe de cuisine démo',
    you: 'Toi'
  }
};

function startDemo() {
  // Tellen in /admin → Bezoekers → Demo (alleen op savour.page, niet voor bots of testbrowsers).
  logSavourVisit('/demo');
  demoMode = true;
  currentUser = { id: 'demo-user', email: 'demo@savour.local' };
  account = { name: 'Demo', role: 'Demo account', email: 'demo@savour.local', photo: '' };
  loadDemoData();
  showApp('recipes');
  // Het menu opnieuw opbouwen met de demomappen; de Admin-knop hoort nooit bij de demo.
  refreshSidebar();
  renderAdminNav();
  document.getElementById('demoBadge')?.remove();
  // In de bovenbalk, zodat het op de telefoon als smalle regel onder het logo staat (niet over de inhoud).
  (document.querySelector('#appShell .topbar') || document.body).insertAdjacentHTML(
    'beforeend',
    '<div id="demoBadge" class="demo-mode-badge">Demo account · niets wordt opgeslagen</div>'
  );
  toast('Demo geladen · 20 echte recepten');
}

// De proefrecepten in de taal van nu. Ook na het wisselen van taal (setLanguage), zonder iets op te slaan.
function loadDemoData() {
  const lang = DEMO_TEXT[currentLanguage] ? currentLanguage : 'en';
  const d = DEMO_TEXT[lang];
  categories = d.categories.map(([name]) => name);
  categoryKeywords = Object.fromEntries(d.categories.map(([name, keywords]) => [name, keywords]));
  // Echte recepten (js/data/demo-recipes.js) in de taal van de bezoeker. Het id hangt aan het recept, niet aan de
  // taal: wisselt de bezoeker van taal, dan blijft hetzelfde recept open.
  const toRecipe = (x, extra) => {
    const t = x[lang] || x.en;
    return {
      id: 'demo-' + x.key,
      title: t.title,
      description: '',
      yield: t.yield,
      ingredients: t.ingredients.slice(),
      steps: t.steps.slice(),
      photo: '',
      ...extra
    };
  };
  recipes = DEMO_RECIPES.map(x => toRecipe(x, { category: categories[x.cat] }));
  const inFolder = id => DEMO_RECIPES.filter(x => x.folder === id).map(x => 'demo-' + x.key);
  folders = [
    { id: 'demo-garde', name: 'Garde', recipeIds: inFolder('demo-garde'), system: false },
    { id: 'demo-pat', name: 'Patisserie', recipeIds: inFolder('demo-pat'), system: false },
    { id: 'demo-rot', name: 'Rotisserie', recipeIds: inFolder('demo-rot'), system: false },
    { id: 'demo-ent', name: 'Entremetier', recipeIds: inFolder('demo-ent'), system: false }
  ];
  favorites = ['demo-beurre', 'demo-kalfsfond', 'demo-anglaise'];
  // Voorbeeldproducten met allergenen (js/features/products.js), in dezelfde taal. De echte Savour-lijst komt
  // erbij zodra die geladen is, zodat de allergenen bij alle demorecepten kloppen.
  products = demoProducts();
  setCentralList(demoCentral());
  productsReady = true;
  loadDemoCentralList();
  // Een collega met eigen recepten in het keukenteam, om samenwerken te laten zien.
  sharedRecipes = DEMO_SHARED_RECIPES.map(x =>
    toRecipe(x, { id: 'demo-anna-' + x.key, category: d.sharedBy, shared: true, ownerId: 'demo-anna' })
  );
  sharedMaps = [
    {
      id: 'demo-shared',
      name: d.team,
      recipeIds: [
        ...['beurre', 'hollandaise', 'kalfsfond', 'eendenjus', 'bisque', 'gravlax', 'mousse', 'anglaise'].map(
          k => 'demo-' + k
        ),
        ...sharedRecipes.map(r => r.id)
      ],
      folders: [],
      photo: '',
      members: [
        { name: d.you, role: 'owner', userId: 'demo-user' },
        { name: 'Chef Anna', role: 'editor', userId: 'demo-anna' }
      ],
      ownerId: 'demo-user'
    }
  ];
}

// De Savour-lijst (alleen goedgekeurde namen, voor iedereen leesbaar) ook in de demo, na de vaste demonamen.
function loadDemoCentralList() {
  loadIngredientList().then(all => {
    if (!demoMode || !all) return;
    notIngredientAll = new Set(all.filter(x => x.status === 'junk').map(x => x.key));
    setCentralList([...demoCentral(), ...all]);
    const active = document.querySelector('#appShell .view.active')?.id;
    if (active === 'detail' && currentId) openRecipe(currentId, recipeOpenContext);
    else if (active === 'products') renderProducts();
  });
}

// Andere taal gekozen in de demo: de proefrecepten opnieuw, in die taal, en het scherm opnieuw tekenen.
function refreshDemoLanguage() {
  if (!demoMode) return;
  loadDemoData();
  refreshSidebar();
  const active = document.querySelector('#appShell .view.active')?.id || 'recipes';
  if (active === 'detail' && currentId) openRecipe(currentId);
  else go(active);
}
