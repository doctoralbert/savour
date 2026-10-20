// Savour 3.0 v4 final behaviour overrides
function renderFolders() {
  if (!currentUser) return;
  const pf = getOrderedPersonalFolders30().filter(f => !f.system);
  $('folderOverview').innerHTML =
    `<div class="panel" style="margin-bottom:14px"><p class="muted" style="margin:0;line-height:1.6">Organiseer je eigen recepten in mappen zoals jij werkt. De alfabetische A–Z-weergave vind je rechtstreeks in Alle recepten.</p></div><div class="folders">${pf.map(folderCard).join('')}</div>`;
}
async function createSharedMap() {
  if (!currentUser) return;
  let name = $('newSharedName').value.trim();
  if (!name) return;
  const { data: m, error } = await supabaseClient
    .from('shared_maps')
    .insert({ owner_id: currentUser.id, name })
    .select('id,name,owner_id,photo_url,public_key')
    .single();
  if (error) {
    console.error(error);
    toast('Gedeelde map kon niet worden aangemaakt');
    return;
  }
  const { error: me } = await supabaseClient
    .from('shared_map_members')
    .insert({ shared_map_id: m.id, user_id: currentUser.id, role: 'owner' });
  if (me) {
    console.error(me);
    toast('Eigenaar kon niet worden toegevoegd');
    return;
  }
  await loadDatabaseState();
  closeNewShared();
  currentShared = m.id;
  renderSharedNav();
  renderHome();
  go('shared');
  toast('Gedeelde map aangemaakt');
}
function startDemo() {
  demoMode = true;
  currentUser = { id: 'demo-user', email: 'demo@savour.local' };
  account = { name: 'Demo', role: 'Demo account', email: 'demo@savour.local', photo: '' };
  categories = ['Basisbereidingen', 'Sauzen', 'Garde', 'Patisserie', 'Vis', 'Vlees'];
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
  favorites = recipes.slice(0, 3).map(r => r.id);
  sharedMaps = [
    {
      id: 'demo-shared',
      name: 'Demo keukenteam',
      recipeIds: recipes.slice(0, 12).map(r => r.id),
      folders: [],
      photo: '',
      members: [{ name: 'Jij', role: 'owner', userId: 'demo-user' }],
      ownerId: 'demo-user'
    }
  ];
  showApp('recipes');
  document.getElementById('demoBadge')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    '<div id="demoBadge" class="demo-mode-badge">Demo account · niets wordt opgeslagen</div>'
  );
  toast('Demo geladen · 40 proefrecepten');
}
function printBundleHtml(list) {
  return uniqueRecipes(list)
    .map(r => {
      const ingredients = r.ingredients?.length ? r.ingredients : [];
      const steps = r.steps?.length ? r.steps : [];
      return `<article class="print-bundle-recipe">${r.photo ? `<img class="print-photo" src="${r.photo}" alt="">` : ''}<h1>${esc(r.title)}</h1>${r.yield ? `<div class="print-yield">Opbrengst · ${esc(r.yield)}</div>` : ''}<div class="print-bundle-columns"><div><h3>Ingrediënten</h3>${ingredients.length ? ingredients.map(x => `<div class="ingredient">${esc(x)}</div>`).join('') : `<div class="muted">Geen ingrediënten vastgelegd.</div>`}</div>${steps.length ? `<div><h3>Bereiding</h3>${steps.map((x, i) => `<div class="step"><b>${i + 1}.</b> ${esc(x)}</div>`).join('')}</div>` : ''}</div><div class="print-bundle-footer">Savour</div></article>`;
    })
    .join('');
}
