// Laden van de bibliotheek uit Supabase en opbouwen van de sessie na inloggen.

async function ensureProfile(user) {
  if (!user) return;
  currentUser = user;
  const meta = user.user_metadata || {};
  const { data: profile } = await supabaseClient.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (!profile) {
    const name = (meta.name || '').trim() || '';
    const { error } = await supabaseClient
      .from('profiles')
      .insert({ id: user.id, email: user.email || '', name, function_title: meta.function_title || 'Chef-kok' });
    if (error) console.error('Profiel kon niet worden aangemaakt:', error);
  }
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

async function fetchDatabaseState() {
  if (!currentUser) throw new Error('Geen ingelogde gebruiker');
  const [recipesRes, categoriesRes, foldersRes, folderRecipesRes, favoritesRes, profileRes] = await Promise.all([
    selectAllRows('recipes', 'id,title,description,yield_text,ingredients,steps,photo_url,category_id,created_at', q =>
      q.eq('user_id', currentUser.id).order('title', { ascending: true })
    ),
    selectAllRows('categories', 'id,name', q => q.eq('user_id', currentUser.id).order('name')),
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
      role: prof.function_title || 'Chef-kok',
      email: prof.email || currentUser.email || '',
      photo: prof.avatar_url || ''
    };
    if (prof.theme) localStorage.setItem('savour_theme', prof.theme);
    applyTheme('dark');
  }
  try {
    const [smsRes, smrRes, smfRes, smfrRes, smmRes] = await Promise.all([
      selectAllRows('shared_maps', 'id,owner_id,name,photo_url,public_key,created_at', q => q.order('name')),
      selectAllRows('shared_map_recipes', 'shared_map_id,recipe_id'),
      selectAllRows('shared_folders', 'id,shared_map_id,name'),
      selectAllRows('shared_folder_recipes', 'shared_folder_id,recipe_id'),
      selectAllRows('shared_map_members', 'shared_map_id,user_id,role')
    ]);
    const optionalErr = smsRes.error || smrRes.error || smfRes.error || smfrRes.error || smmRes.error;
    if (optionalErr) {
      console.error('Savour shared-map load warning:', optionalErr);
      const ownedFallback = (smsRes.data || []).filter(m => m.owner_id === currentUser.id);
      sharedMaps = ownedFallback.map(m => ({
        id: m.id,
        name: m.name,
        recipeIds: [],
        folders: [],
        photo: m.photo_url || '',
        members: [
          { name: 'Jij', email: currentUser.email || '', role: 'owner', account: true, userId: currentUser.id }
        ],
        publicKey: m.public_key,
        ownerId: m.owner_id
      }));
      toast(t('Gedeelde mappen konden gedeeltelijk niet worden geladen.'));
    } else {
      const sms = smsRes.data || [],
        smr = smrRes.data || [],
        smf = smfRes.data || [],
        smfr = smfrRes.data || [],
        memberRows = smmRes.data || [];
      const ownedMaps = sms.filter(m => m.owner_id === currentUser.id);
      let memberRowsFresh = memberRows;
      const missingOwnerMemberships = ownedMaps.filter(
        map => !memberRows.some(x => x.shared_map_id === map.id && x.user_id === currentUser.id)
      );
      if (missingOwnerMemberships.length) {
        for (const map of missingOwnerMemberships) {
          const { error } = await supabaseClient
            .from('shared_map_members')
            .upsert(
              { shared_map_id: map.id, user_id: currentUser.id, role: 'owner' },
              { onConflict: 'shared_map_id,user_id' }
            );
          if (error) console.warn('Owner membership kon niet automatisch worden hersteld:', error);
        }
        const fresh = await selectAllRows('shared_map_members', 'shared_map_id,user_id,role');
        if (fresh.data) memberRowsFresh = fresh.data;
      }
      sharedMaps = sms
        .filter(
          m =>
            m.owner_id === currentUser.id ||
            memberRowsFresh.some(x => x.shared_map_id === m.id && x.user_id === currentUser.id)
        )
        .map(m => {
          const memberList = memberRowsFresh
            .filter(x => x.shared_map_id === m.id)
            .map(x => ({
              name: x.user_id === currentUser.id ? 'Jij' : 'Teamlid',
              email: '',
              role: x.role,
              account: true,
              userId: x.user_id
            }));
          if (!memberList.some(x => x.userId === currentUser.id))
            memberList.unshift({
              name: 'Jij',
              email: currentUser.email || '',
              role: 'owner',
              account: true,
              userId: currentUser.id
            });
          const mapRecipeIds = smr.filter(x => x.shared_map_id === m.id).map(x => x.recipe_id);
          const sf = smf
            .filter(x => x.shared_map_id === m.id && x.name !== 'A t/m Z')
            .map(f => ({
              id: f.id,
              name: f.name,
              recipeIds: smfr.filter(x => x.shared_folder_id === f.id).map(x => x.recipe_id),
              system: false
            }));
          return {
            id: m.id,
            name: m.name,
            recipeIds: mapRecipeIds,
            folders: sf,
            photo: m.photo_url || '',
            members: memberList,
            publicKey: m.public_key,
            ownerId: m.owner_id
          };
        });
    }
  } catch (e) {
    console.error('Savour shared-map load warning:', e);
    sharedMaps = [];
  }
  renderCategoryNav();
  renderSharedNav();
  return true;
}

// Laadt de bibliotheek en ruimt daarna exact dubbele recepten op (zie duplicates.js).
async function loadDatabaseState() {
  const result = await fetchDatabaseState();
  const cleaned = await v6CleanupExactDuplicates();
  if (cleaned) await fetchDatabaseState();
  return result;
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
    activateView('home');
    if ($('homeCards')) {
      $('homeCards').innerHTML =
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
    categories = [];
    account = {
      name: user?.user_metadata?.name || '',
      role: user?.user_metadata?.function_title || 'Chef-kok',
      email: user?.email || '',
      password: '',
      photo: ''
    };
    try {
      await ensureProfile(user);
      await migrateLegacySharedMaps();
      await loadDatabaseState();
      showApp('home');
      renderHome();
      updateProfileHeader();
      return true;
    } catch (error) {
      console.error('Savour sessie kon niet worden opgebouwd:', error);
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
