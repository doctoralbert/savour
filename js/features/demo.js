// Demo-account met proefrecepten (er wordt niets opgeslagen).

function startDemo() {
  demoMode = true;
  currentUser = { id: 'demo-user', email: 'demo@savour.local' };
  account = { name: 'Demo', role: 'Demo account', email: 'demo@savour.local', photo: '' };
  categories = ['Basisbereidingen', 'Sauzen', 'Garde', 'Patisserie', 'Vis', 'Vlees'];
  categoryKeywords = {
    Basisbereidingen: ['fond', 'olie', 'fermentatie', 'gel'],
    Sauzen: ['saus', 'jus', 'beurre', 'hollandaise', 'vinaigrette', 'glaze'],
    Patisserie: ['ijs', 'sorbet', 'mousse', 'bavarois', 'crémeux'],
    Vis: ['vis', 'garnalen', 'bisque', 'dashi'],
    Vlees: ['eend', 'kalf', 'veau']
  };
  const letters = recipeLetters();
  const extras = [
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
  ];
  const titles = [...letters.map(l => `Demo ${l} · basisrecept`), ...extras];
  recipes = titles.slice(0, 40).map((title, i) => ({
    id: 'demo-r' + i,
    title,
    description: '',
    yield: i % 3 === 0 ? '1 liter' : '',
    ingredients: [`${100 + i * 5} gram basisingrediënt`, `20 gram smaakmaker`],
    steps: [`Bereid de basis zorgvuldig voor.`, `Werk af en controleer de structuur.`],
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
      category: 'Sauzen',
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
    }
  );
  favorites = recipes.slice(0, 3).map(r => r.id);
  // Een collega met eigen recepten in de gedeelde map, om samenwerken te laten zien.
  sharedRecipes = ['Bouillabaisse', 'Crème brûlée', 'Gepocheerde peer'].map((title, i) => ({
    id: 'demo-anna-' + i,
    title,
    description: '',
    yield: '10 porties',
    ingredients: ['500 gram basis', '2 deciliter room', 'zout naar smaak'],
    steps: ['Bereid volgens de werkwijze van de sectie.', 'Proef en werk af.'],
    category: 'Gedeeld door Chef Anna',
    photo: '',
    shared: true,
    ownerId: 'demo-anna'
  }));
  sharedMaps = [
    {
      id: 'demo-shared',
      name: 'Demo keukenteam',
      recipeIds: [...recipes.slice(0, 12).map(r => r.id), ...sharedRecipes.map(r => r.id)],
      folders: [],
      photo: '',
      members: [
        { name: 'Jij', role: 'owner', userId: 'demo-user' },
        { name: 'Chef Anna', role: 'editor', userId: 'demo-anna' }
      ],
      ownerId: 'demo-user'
    }
  ];
  showApp('recipes');
  document.getElementById('demoBadge')?.remove();
  // In de bovenbalk, zodat het op de telefoon als smalle regel onder het logo staat (niet over de inhoud).
  (document.querySelector('#appShell .topbar') || document.body).insertAdjacentHTML(
    'beforeend',
    '<div id="demoBadge" class="demo-mode-badge">Demo account · niets wordt opgeslagen</div>'
  );
  toast('Demo geladen · 40 proefrecepten');
}
