// Laden van de bibliotheek uit Supabase en opbouwen van de sessie na inloggen.

async function ensureProfile(user) {
  if (!user) return;
  currentUser = user;
  const meta = user.user_metadata || {};
  const { data: profile } = await supabaseClient.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (!profile) {
    const name = (meta.name || '').trim() || '';
    // Alleen toevoegen als het profiel er echt nog niet is: mislukte de controle hierboven (verbinding, twee tabbladen
    // tegelijk), dan bestaat het misschien al en mag er niets worden overschreven.
    const { error } = await supabaseClient
      .from('profiles')
      .upsert({ id: user.id, email: user.email || '', name }, { onConflict: 'id', ignoreDuplicates: true });
    if (error) console.error('Profiel kon niet worden aangemaakt:', error);
    // Apart, zodat een profiel ook wordt aangemaakt als de kolom organization nog niet bestaat.
    if (meta.organization)
      await supabaseClient.from('profiles').update({ organization: meta.organization }).eq('id', user.id);
    // Nieuw account: start met de standaardcategorieën (alleen als er nog geen enkele categorie is).
    try {
      const { data: cats, error: catError } = await loadCategoryRows();
      if (!catError && !(cats || []).length) await addDefaultCategories([]);
    } catch (e) {
      console.error('Standaardcategorieën konden niet worden toegevoegd:', e);
    }
  }
  // Land voor het vlaggetje in /admin (geschat uit de tijdzone, js/country.js). Alleen bijwerken als het anders
  // is; zonder de kolom country (supabase/2026-10-27-land.sql) gebeurt er niets.
  const country = window.savourCountry ? window.savourCountry() : null;
  if (country && (!profile || ('country' in profile && profile.country !== country)))
    await supabaseClient.from('profiles').update({ country }).eq('id', user.id);
  // Nieuwe accounts starten leeg. A–Z is een filterfunctie, geen fysieke map.
  // Bestaande oude A t/m Z-mappen blijven in de database staan maar worden in de UI verborgen.
}

async function migrateLegacySharedMaps() {
  if (!currentUser) return;
  let legacy = [];
  try {
    legacy = JSON.parse(localStorage.getItem('receptenapp_sharedmaps') || '[]');
  } catch (e) {
    legacy = [];
  }
  if (!Array.isArray(legacy) || !legacy.length) return;
  const { data: existing } = await supabaseClient.from('shared_maps').select('id,name').eq('owner_id', currentUser.id);
  const existingNames = new Set((existing || []).map(x => x.name));
  const { data: dbRecipes } = await supabaseClient.from('recipes').select('id,title').eq('user_id', currentUser.id);
  const byTitle = new Map((dbRecipes || []).map(r => [r.title.toLowerCase(), r.id]));
  for (const lm of legacy) {
    if (!lm?.name || existingNames.has(lm.name)) continue;
    const { data: m, error } = await supabaseClient
      .from('shared_maps')
      .insert({ owner_id: currentUser.id, name: lm.name, photo_url: lm.photo || null })
      .select('id')
      .single();
    if (error || !m) continue;
    await supabaseClient
      .from('shared_map_members')
      .insert({ shared_map_id: m.id, user_id: currentUser.id, role: 'owner' });
    const oldIds = Array.isArray(lm.recipeIds) ? lm.recipeIds : [];
    const mapped = [];
    for (const oldId of oldIds) {
      const rid = byTitle.get(String(oldId).toLowerCase());
      if (rid) mapped.push(rid);
    }
    if (mapped.length)
      await supabaseClient.from('shared_map_recipes').upsert(
        mapped.map(recipe_id => ({ shared_map_id: m.id, recipe_id })),
        { onConflict: 'shared_map_id,recipe_id' }
      );
    for (const lf of lm.folders || []) {
      if (!lf?.name || (lf.system && lf.name === 'A t/m Z')) continue;
      const { data: sf } = await supabaseClient
        .from('shared_folders')
        .insert({ shared_map_id: m.id, name: lf.name })
        .select('id')
        .single();
      if (!sf) continue;
      const ids = (lf.recipeIds || []).map(oldId => byTitle.get(String(oldId).toLowerCase())).filter(Boolean);
      if (ids.length)
        await supabaseClient.from('shared_folder_recipes').upsert(
          ids.map(recipe_id => ({ shared_folder_id: sf.id, recipe_id })),
          { onConflict: 'shared_folder_id,recipe_id' }
        );
    }
    existingNames.add(lm.name);
  }
  localStorage.removeItem('receptenapp_sharedmaps');
}

// Mappen in gedeelde mappen, met volgorde en archief (supabase/2026-10-25-mappen-beheren.sql). Zonder die SQL
// zoals voorheen: dan kunnen ze nog niet worden geordend of gearchiveerd.
async function selectSharedFolders() {
  const res = await selectAllRows('shared_folders', 'id,shared_map_id,name,position,archived');
  sharedFoldersManageable = !res.error;
  return res.error ? selectAllRows('shared_folders', 'id,shared_map_id,name') : res;
}

async function selectAllRows(table, select = '*', build = q => q, pageSize = 1000) {
  let all = [];
  for (let offset = 0; ; offset += pageSize) {
    let q = supabaseClient.from(table).select(select);
    q = build(q);
    const { data, error } = await q.range(offset, offset + pageSize - 1);
    if (error) return { data: all, error };
    const rows = data || [];
    all.push(...rows);
    if (rows.length < pageSize) break;
  }
  return { data: all, error: null };
}

// Categorieën met trefwoorden. Is supabase/2026-10-21-categorie-trefwoorden.sql nog niet uitgevoerd,
// dan bestaat de kolom keywords niet: dan laden we alleen de namen, zodat de app gewoon blijft werken.
let categoryKeywordsAvailable = true;
async function loadCategoryRows() {
  const byUser = q => q.eq('user_id', currentUser.id).order('name');
  const res = await selectAllRows('categories', 'id,name,keywords', byUser);
  categoryKeywordsAvailable = !res.error;
  return res.error ? selectAllRows('categories', 'id,name', byUser) : res;
}

// Laadt de volledige bibliotheek van de ingelogde gebruiker: recepten, categorieën, mappen, favorieten,
// profiel en gedeelde mappen.
async function loadDatabaseState() {
  if (!currentUser) throw new Error('Geen ingelogde gebruiker');
  const [recipesRes, categoriesRes, foldersRes, folderRecipesRes, favoritesRes, profileRes] = await Promise.all([
    selectAllRows('recipes', 'id,title,description,yield_text,ingredients,steps,photo_url,category_id,created_at', q =>
      q.eq('user_id', currentUser.id).order('title', { ascending: true })
    ),
    loadCategoryRows(),
    selectAllRows('folders', 'id,name', q => q.eq('user_id', currentUser.id).order('name')),
    selectAllRows('folder_recipes', 'folder_id,recipe_id'),
    selectAllRows('favorites', 'recipe_id', q => q.eq('user_id', currentUser.id)),
    supabaseClient.from('profiles').select('*').eq('id', currentUser.id).maybeSingle()
  ]);
  const coreErr =
    recipesRes.error ||
    categoriesRes.error ||
    foldersRes.error ||
    folderRecipesRes.error ||
    favoritesRes.error ||
    profileRes.error;
  if (coreErr) {
    console.error('Savour core database load error:', coreErr);
    throw coreErr;
  }
  const rs = recipesRes.data || [],
    cs = categoriesRes.data || [],
    fs = foldersRes.data || [],
    fr = folderRecipesRes.data || [],
    favs = favoritesRes.data || [],
    prof = profileRes.data;
  categories = cs.map(c => c.name);
  categoryKeywords = Object.fromEntries(cs.map(c => [c.name, Array.isArray(c.keywords) ? c.keywords : []]));
  const catMap = Object.fromEntries(cs.map(c => [c.id, c.name]));
  recipes = rs.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description || '',
    yield: r.yield_text || '',
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    steps: Array.isArray(r.steps) ? r.steps : [],
    category: catMap[r.category_id] || 'Eigen recepten',
    categoryId: r.category_id || null,
    photo: r.photo_url || '',
    createdAt: r.created_at || '',
    dbId: r.id
  }));
  const seenFolderNames = new Set();
  folders = fs
    .filter(f => f.name !== 'A t/m Z')
    .filter(f => {
      if (seenFolderNames.has(f.name)) return false;
      seenFolderNames.add(f.name);
      return true;
    })
    .map(f => ({
      id: f.id,
      name: f.name,
      recipeIds: fr.filter(x => x.folder_id === f.id && recipes.some(r => r.id === x.recipe_id)).map(x => x.recipe_id),
      system: false
    }));
  favorites = favs.map(x => x.recipe_id);
  if (prof) {
    account = {
      ...account,
      name: prof.name || '',
      organization: prof.organization || '',
      email: prof.email || currentUser.email || '',
      photo: prof.avatar_url || ''
    };
    applyTheme(prof.theme || currentTheme());
  }
  try {
    await loadSharedMapsState();
  } catch (e) {
    console.error('Savour shared-map load warning:', e);
    sharedMaps = [];
    sharedRecipes = [];
    toast(t('Gedeelde mappen konden niet worden geladen.'));
  }
  renderCategoryNav();
  renderSharedNav();
  return true;
}

window.showDatabaseError = function showDatabaseError(error) {
  console.error('Savour database error:', error);
  try {
    if ($('landingView')) $('landingView').style.display = 'none';
    if ($('publicInfoShell')) $('publicInfoShell').style.display = 'none';
    if ($('publicRecipeShell')) $('publicRecipeShell').style.display = 'none';
    if ($('publicInviteShell')) $('publicInviteShell').style.display = 'none';
    if ($('appShell')) $('appShell').style.display = 'grid';
    if ($('appShell')) $('appShell').classList.remove('public-info-mode');
    activateView('recipes');
    if ($('recipeGrid')) {
      $('recipeGrid').innerHTML =
        `<div class=\"empty\" style=\"grid-column:1/-1\"><strong>Je bent ingelogd, maar je recepten konden niet worden geladen.</strong><br><span class=\"muted\">Controleer de verbinding met je receptenbibliotheek en probeer het opnieuw.</span><br><button class=\"btn\" style=\"margin-top:14px\" onclick=\"retryDatabaseSession()\">Opnieuw proberen</button></div>`;
    }
  } catch (uiError) {
    console.error('Savour database error UI failed:', uiError);
  }
};

async function startDatabaseSession(user) {
  if (sessionStartPromise) return sessionStartPromise;
  sessionStartPromise = (async () => {
    currentUser = user;
    demoMode = false;
    recipes = [];
    folders = [];
    favorites = [];
    sharedMaps = [];
    sharedRecipes = [];
    categories = [];
    account = {
      name: user?.user_metadata?.name || '',
      organization: user?.user_metadata?.organization || '',
      email: user?.email || '',
      password: '',
      photo: ''
    };
    try {
      await ensureProfile(user);
      await migrateLegacySharedMaps();
      await loadDatabaseState();
      await loadPlanState();
      await loadRecipeSourceIds();
      saveOfflineSnapshot();
      renderProNav();
      renderAdminNav();
      // Eerst eventueel het welkom van het team, daarna (bij een lege bibliotheek) het algemene welkom.
      greetTeamMember()
        .then(claimReferral)
        .then(greetReferralRewards)
        .then(() => setTimeout(welcomeNewUser, 600));
      if (window.__proRoute) openPublicInfo('pro');
      else if (window.__infoRoute) openPublicInfo(window.__infoRoute);
      else showApp('recipes');
      if (window.__teamRoute) {
        window.__teamRoute = false;
        history.replaceState(null, '', location.pathname);
        openTeamNav();
      }
      refreshSidebar();
      updateProfileHeader();
      // Kwam de gebruiker binnen via een gedeelde receptlink (/r/...)? Dan dat recept openen (alleen-lezen).
      if (window.__publicRecipeRoute) await openLinkRecipe(window.__publicRecipeRoute);
      // Kwam de gebruiker binnen via een uitnodigingslink? Dan nu lid worden en de map openen.
      await acceptPendingInvite();
      // Terug van Stripe, of koos de gebruiker Pro vóór het aanmaken van een account?
      await handleProReturn();
      await resumeProIntent();
      return true;
    } catch (error) {
      console.error('Savour sessie kon niet worden opgebouwd:', error);
      // Geen verbinding (bijv. wifi weg in de keuken)? Dan de bewaarde bibliotheek van dit toestel openen.
      if (looksOffline(error) && (await startOfflineSession(user?.id))) return true;
      window.showDatabaseError(error);
      return false;
    }
  })().finally(() => {
    sessionStartPromise = null;
  });
  return sessionStartPromise;
}

async function retryDatabaseSession() {
  if (!currentUser) return;
  const ok = await startDatabaseSession(currentUser);
  if (ok) toast(t('Bibliotheek geladen'));
}

// Uitnodigingscodes (public_key) van de eigen gedeelde mappen: { mapId: code }. Leden krijgen ze niet te zien
// (supabase/2026-10-27-uitnodigen-alleen-eigenaar.sql). Bestaat die functie nog niet, dan rechtstreeks uit de tabel.
async function loadMySharedMapKeys() {
  if (!currentUser || demoMode) return {};
  let { data, error } = await supabaseClient.rpc('savour_my_shared_map_keys');
  if (error)
    ({ data } = await supabaseClient.from('shared_maps').select('id,public_key').eq('owner_id', currentUser.id));
  return Object.fromEntries((data || []).map(r => [r.id, r.public_key]));
}

// Laadt de gedeelde mappen waar de gebruiker eigenaar of lid van is, met submappen, leden (met naam)
// en de recepten die teamleden erin hebben gezet.
async function loadSharedMapsState() {
  const [smsRes, smrRes, smfRes, smfrRes, smmRes, keys] = await Promise.all([
    selectAllRows('shared_maps', 'id,owner_id,name,photo_url,created_at', q => q.order('name')),
    selectAllRows('shared_map_recipes', 'shared_map_id,recipe_id'),
    selectSharedFolders(),
    selectAllRows('shared_folder_recipes', 'shared_folder_id,recipe_id'),
    selectAllRows('shared_map_members', 'shared_map_id,user_id,role'),
    loadMySharedMapKeys()
  ]);
  const loadError = smsRes.error || smrRes.error || smfRes.error || smfrRes.error || smmRes.error;
  if (loadError) throw loadError;
  const sms = smsRes.data || [],
    smr = smrRes.data || [],
    smf = smfRes.data || [],
    smfr = smfrRes.data || [];
  let memberRows = smmRes.data || [];

  // Eigenaars horen zelf ook als lid in de ledentabel te staan; herstel dat waar het ontbreekt.
  const missingOwner = sms.filter(
    m =>
      m.owner_id === currentUser.id && !memberRows.some(x => x.shared_map_id === m.id && x.user_id === currentUser.id)
  );
  for (const map of missingOwner) {
    const { error } = await supabaseClient
      .from('shared_map_members')
      .upsert(
        { shared_map_id: map.id, user_id: currentUser.id, role: 'owner' },
        { onConflict: 'shared_map_id,user_id' }
      );
    if (error) console.warn('Eigenaar kon niet als lid worden hersteld:', error);
    else memberRows = [...memberRows, { shared_map_id: map.id, user_id: currentUser.id, role: 'owner' }];
  }

  // Volledige ledenlijst met namen (een gewoon lid ziet via de tabel alleen zichzelf).
  const { data: namedMembers, error: membersError } = await supabaseClient.rpc('get_my_shared_map_members');
  if (membersError) console.warn('Ledenlijst met namen niet beschikbaar:', membersError);
  const allMembers = membersError ? memberRows : namedMembers || [];

  const visibleMaps = sms.filter(
    m => m.owner_id === currentUser.id || memberRows.some(x => x.shared_map_id === m.id && x.user_id === currentUser.id)
  );
  sharedMaps = visibleMaps.map(m => {
    const members = allMembers
      .filter(x => x.shared_map_id === m.id)
      .map(x => ({
        name: x.user_id === currentUser.id ? 'Jij' : x.name || 'Teamlid',
        email: x.email || '',
        role: x.user_id === m.owner_id ? 'owner' : x.role,
        account: true,
        userId: x.user_id
      }))
      // Eigenaar bovenaan, daarna op naam.
      .sort((a, b) => (a.role === 'owner' ? -1 : b.role === 'owner' ? 1 : a.name.localeCompare(b.name, 'nl')));
    if (!members.some(x => x.userId === currentUser.id))
      members.unshift({
        name: 'Jij',
        email: currentUser.email || '',
        role: m.owner_id === currentUser.id ? 'owner' : 'viewer',
        account: true,
        userId: currentUser.id
      });
    return {
      id: m.id,
      name: m.name,
      recipeIds: smr.filter(x => x.shared_map_id === m.id).map(x => x.recipe_id),
      folders: smf
        .filter(x => x.shared_map_id === m.id && x.name !== 'A t/m Z')
        .map(f => ({
          id: f.id,
          name: f.name,
          position: f.position ?? null,
          archived: !!f.archived,
          recipeIds: smfr.filter(x => x.shared_folder_id === f.id).map(x => x.recipe_id),
          system: false
        }))
        // In de gekozen volgorde; mappen zonder plek (nieuw) achteraan op naam.
        .sort((a, b) => (a.position ?? 1e9) - (b.position ?? 1e9) || a.name.localeCompare(b.name, 'nl')),
      photo: m.photo_url || '',
      members,
      publicKey: keys[m.id] || '',
      ownerId: m.owner_id
    };
  });
  await loadSharedRecipes();
}

// Haalt recepten van teamleden op die in gedeelde mappen staan (alleen-lezen voor de gebruiker).
async function loadSharedRecipes() {
  const own = new Set(recipes.map(r => String(r.id)));
  const ids = [
    ...new Set(sharedMaps.flatMap(m => [...m.recipeIds, ...m.folders.flatMap(f => f.recipeIds)]).map(String))
  ].filter(id => !own.has(id));
  const rows = [];
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await supabaseClient
      .from('recipes')
      .select('id,user_id,title,description,yield_text,ingredients,steps,photo_url')
      .in('id', ids.slice(i, i + 100));
    if (error) {
      console.warn('Gedeelde recepten konden niet worden geladen:', error);
      break;
    }
    rows.push(...(data || []));
  }
  const authorName = userId => {
    for (const m of sharedMaps) {
      const member = m.members.find(x => String(x.userId) === String(userId));
      if (member && member.name !== 'Jij') return member.name;
    }
    return 'Teamlid';
  };
  sharedRecipes = rows.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description || '',
    yield: r.yield_text || '',
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    steps: Array.isArray(r.steps) ? r.steps : [],
    category: 'Gedeeld door ' + authorName(r.user_id),
    photo: r.photo_url || '',
    shared: true,
    ownerId: r.user_id
  }));
}
