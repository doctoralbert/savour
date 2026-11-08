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
    letter: l => `Demo ${l} · basisrecept`,
    extras: [
      'Beurre blanc',
      'Bloemkool crème',
      'Citroen gel',
      'Dashi vinaigrette',
      'Eendenjus',
      'Fermentatie basis',
      'Garnalen bisque',
      'Hollandaise',
      'IJs van karnemelk',
      'Jus de veau',
      'Kruidenolie',
      'Limoen gel',
      'Miso glaze',
      'Noisette boter'
    ],
    lines: n => [`${n} gram basisingrediënt`, '20 gram smaakmaker'],
    steps: ['Bereid de basis zorgvuldig voor.', 'Werk af en controleer de structuur.'],
    beurre: {
      yield: '4 personen',
      ingredients: [
        '2 sjalotten, fijngesnipperd',
        '1 deciliter droge witte wijn',
        '5 eetlepels witte wijnazijn',
        '250 gram koude roomboter, in blokjes',
        'zout naar smaak',
        'witte peper naar smaak'
      ],
      steps: [
        'Breng sjalot, wijn en azijn aan de kook en laat inkoken tot er ongeveer 2 eetlepels vocht over is.',
        'Zet het vuur laag en klop de boter blokje voor blokje erdoor, tot de saus gebonden en glanzend is.',
        'Laat de saus niet meer koken. Passeer door een fijne zeef en breng op smaak met zout en peper.',
        'Direct serveren of maximaal een uur au bain-marie warm houden.'
      ]
    },
    shared: ['Bouillabaisse', 'Crème brûlée', 'Gepocheerde peer'],
    sharedYield: '10 porties',
    sharedLines: ['500 gram basis', '2 deciliter room', 'zout naar smaak'],
    sharedSteps: ['Bereid volgens de werkwijze van de sectie.', 'Proef en werk af.'],
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
    letter: l => `Demo ${l} · base recipe`,
    extras: [
      'Beurre blanc',
      'Cauliflower cream',
      'Lemon gel',
      'Dashi vinaigrette',
      'Duck jus',
      'Ferment base',
      'Prawn bisque',
      'Hollandaise',
      'Buttermilk ice cream',
      'Jus de veau',
      'Herb oil',
      'Lime gel',
      'Miso glaze',
      'Brown butter'
    ],
    lines: n => [`${n} grams base ingredient`, '20 grams seasoning'],
    steps: ['Prepare the base carefully.', 'Finish and check the texture.'],
    beurre: {
      yield: '4 portions',
      ingredients: [
        '2 shallots, finely chopped',
        '1 decilitre dry white wine',
        '5 tablespoons white wine vinegar',
        '250 grams cold butter, diced',
        'salt to taste',
        'white pepper to taste'
      ],
      steps: [
        'Bring the shallot, wine and vinegar to the boil and reduce until about 2 tablespoons of liquid remain.',
        'Turn the heat down low and whisk in the butter cube by cube until the sauce is bound and glossy.',
        'Do not let the sauce boil again. Pass through a fine sieve and season with salt and pepper.',
        'Serve straight away or keep warm in a bain-marie for up to an hour.'
      ]
    },
    shared: ['Bouillabaisse', 'Crème brûlée', 'Poached pear'],
    sharedYield: '10 portions',
    sharedLines: ['500 grams base', '2 decilitres cream', 'salt to taste'],
    sharedSteps: ['Prepare following the section’s method.', 'Taste and finish.'],
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
    letter: l => `Demo ${l} · Grundrezept`,
    extras: [
      'Beurre blanc',
      'Blumenkohlcreme',
      'Zitronengel',
      'Dashi-Vinaigrette',
      'Entenjus',
      'Fermentationsbasis',
      'Garnelenbisque',
      'Hollandaise',
      'Buttermilcheis',
      'Jus de veau',
      'Kräuteröl',
      'Limettengel',
      'Miso-Glasur',
      'Nussbutter'
    ],
    lines: n => [`${n} Gramm Grundzutat`, '20 Gramm Würze'],
    steps: ['Bereite die Basis sorgfältig vor.', 'Vollende und prüfe die Konsistenz.'],
    beurre: {
      yield: '4 Personen',
      ingredients: [
        '2 Schalotten, fein gewürfelt',
        '1 Deziliter trockener Weißwein',
        '5 Esslöffel Weißweinessig',
        '250 Gramm kalte Butter, in Würfeln',
        'Salz nach Geschmack',
        'weißer Pfeffer nach Geschmack'
      ],
      steps: [
        'Schalotte, Wein und Essig aufkochen und einkochen, bis etwa 2 Esslöffel Flüssigkeit übrig sind.',
        'Hitze reduzieren und die Butter Würfel für Würfel einschlagen, bis die Sauce gebunden und glänzend ist.',
        'Die Sauce nicht mehr kochen lassen. Durch ein feines Sieb passieren und mit Salz und Pfeffer abschmecken.',
        'Sofort servieren oder höchstens eine Stunde im Wasserbad warm halten.'
      ]
    },
    shared: ['Bouillabaisse', 'Crème brûlée', 'Pochierte Birne'],
    sharedYield: '10 Portionen',
    sharedLines: ['500 Gramm Basis', '2 Deziliter Sahne', 'Salz nach Geschmack'],
    sharedSteps: ['Nach der Arbeitsweise des Postens zubereiten.', 'Abschmecken und vollenden.'],
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
    letter: l => `Demo ${l} · receta base`,
    extras: [
      'Beurre blanc',
      'Crema de coliflor',
      'Gel de limón',
      'Vinagreta de dashi',
      'Jugo de pato',
      'Base de fermentación',
      'Bisque de gambas',
      'Salsa holandesa',
      'Helado de suero de mantequilla',
      'Jus de veau',
      'Aceite de hierbas',
      'Gel de lima',
      'Glaseado de miso',
      'Mantequilla avellana'
    ],
    lines: n => [`${n} gramos de ingrediente base`, '20 gramos de condimento'],
    steps: ['Prepara la base con cuidado.', 'Termina y comprueba la textura.'],
    beurre: {
      yield: '4 personas',
      ingredients: [
        '2 chalotas, picadas finas',
        '1 decilitro de vino blanco seco',
        '5 cucharadas de vinagre de vino blanco',
        '250 gramos de mantequilla fría, en dados',
        'sal al gusto',
        'pimienta blanca al gusto'
      ],
      steps: [
        'Lleva a ebullición la chalota, el vino y el vinagre y reduce hasta que queden unas 2 cucharadas de líquido.',
        'Baja el fuego y añade la mantequilla dado a dado batiendo, hasta que la salsa esté ligada y brillante.',
        'No dejes que la salsa vuelva a hervir. Pásala por un colador fino y sazona con sal y pimienta.',
        'Sirve enseguida o mantenla caliente al baño maría como máximo una hora.'
      ]
    },
    shared: ['Bouillabaisse', 'Crème brûlée', 'Pera escalfada'],
    sharedYield: '10 raciones',
    sharedLines: ['500 gramos de base', '2 decilitros de nata', 'sal al gusto'],
    sharedSteps: ['Prepara según el método de la partida.', 'Prueba y termina.'],
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
    letter: l => `Démo ${l} · recette de base`,
    extras: [
      'Beurre blanc',
      'Crème de chou-fleur',
      'Gel de citron',
      'Vinaigrette au dashi',
      'Jus de canard',
      'Base de fermentation',
      'Bisque de crevettes',
      'Sauce hollandaise',
      'Glace au babeurre',
      'Jus de veau',
      'Huile aux herbes',
      'Gel de citron vert',
      'Laque au miso',
      'Beurre noisette'
    ],
    lines: n => [`${n} grammes d’ingrédient de base`, '20 grammes d’assaisonnement'],
    steps: ['Prépare la base avec soin.', 'Termine et vérifie la texture.'],
    beurre: {
      yield: '4 personnes',
      ingredients: [
        '2 échalotes, finement ciselées',
        '1 décilitre de vin blanc sec',
        '5 cuillères à soupe de vinaigre de vin blanc',
        '250 grammes de beurre froid, en dés',
        'sel à volonté',
        'poivre blanc à volonté'
      ],
      steps: [
        'Porte l’échalote, le vin et le vinaigre à ébullition et fais réduire jusqu’à environ 2 cuillères à soupe de liquide.',
        'Baisse le feu et incorpore le beurre dé par dé au fouet, jusqu’à ce que la sauce soit liée et brillante.',
        'Ne fais plus bouillir la sauce. Passe-la au chinois fin et assaisonne de sel et de poivre.',
        'Sers tout de suite ou garde au chaud au bain-marie une heure au maximum.'
      ]
    },
    shared: ['Bouillabaisse', 'Crème brûlée', 'Poire pochée'],
    sharedYield: '10 portions',
    sharedLines: ['500 grammes de base', '2 décilitres de crème', 'sel à volonté'],
    sharedSteps: ['Prépare selon la méthode de la partie.', 'Goûte et termine.'],
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
  toast('Demo geladen · 40 proefrecepten');
}

// De proefrecepten in de taal van nu. Ook na het wisselen van taal (setLanguage), zonder iets op te slaan.
function loadDemoData() {
  const d = DEMO_TEXT[currentLanguage] || DEMO_TEXT.en;
  categories = d.categories.map(([name]) => name);
  categoryKeywords = Object.fromEntries(d.categories.map(([name, keywords]) => [name, keywords]));
  const [basis, sauces] = categories;
  const titles = [...recipeLetters().map(d.letter), ...d.extras];
  recipes = titles.slice(0, 40).map((title, i) => ({
    id: 'demo-r' + i,
    title,
    description: '',
    yield: i % 3 === 0 ? '1 liter' : '',
    ingredients: d.lines(100 + i * 5),
    steps: d.steps.slice(),
    category: categories[i % categories.length],
    photo: ''
  }));
  folders = [
    { id: 'demo-garde', name: 'Garde', recipeIds: recipes.slice(0, 8).map(r => r.id), system: false },
    { id: 'demo-pat', name: 'Patisserie', recipeIds: recipes.slice(8, 16).map(r => r.id), system: false },
    { id: 'demo-rot', name: 'Rotisserie', recipeIds: recipes.slice(16, 24).map(r => r.id), system: false },
    { id: 'demo-ent', name: 'Entremetier', recipeIds: recipes.slice(24, 32).map(r => r.id), system: false }
  ];
  // Eén volledig uitgewerkt recept, zodat de demo laat zien hoe een echt recept eruitziet.
  Object.assign(
    recipes.find(r => r.title === 'Beurre blanc'),
    {
      category: sauces,
      yield: d.beurre.yield,
      ingredients: d.beurre.ingredients.slice(),
      steps: d.beurre.steps.slice()
    }
  );
  recipes.forEach(r => r.category === undefined && (r.category = basis));
  favorites = recipes.slice(0, 3).map(r => r.id);
  // Voorbeeldproducten met allergenen (js/features/products.js), in dezelfde taal.
  products = demoProducts();
  setCentralList(DEMO_CENTRAL);
  productsReady = true;
  // Een collega met eigen recepten in het keukenteam, om samenwerken te laten zien.
  sharedRecipes = d.shared.map((title, i) => ({
    id: 'demo-anna-' + i,
    title,
    description: '',
    yield: d.sharedYield,
    ingredients: d.sharedLines.slice(),
    steps: d.sharedSteps.slice(),
    category: d.sharedBy,
    photo: '',
    shared: true,
    ownerId: 'demo-anna'
  }));
  sharedMaps = [
    {
      id: 'demo-shared',
      name: d.team,
      recipeIds: [...recipes.slice(0, 12).map(r => r.id), ...sharedRecipes.map(r => r.id)],
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

// Andere taal gekozen in de demo: de proefrecepten opnieuw, in die taal, en het scherm opnieuw tekenen.
function refreshDemoLanguage() {
  if (!demoMode) return;
  loadDemoData();
  refreshSidebar();
  const active = document.querySelector('#appShell .view.active')?.id || 'recipes';
  if (active === 'detail' && currentId) openRecipe(currentId);
  else go(active);
}
