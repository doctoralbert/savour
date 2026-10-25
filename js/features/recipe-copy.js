// Recept overnemen: wie een recept openbaar deelt, kan ontvangers toestaan het aan hun eigen receptenbibliotheek
// toe te voegen (tabel recipe_share_settings, supabase/2026-10-25-recept-overnemen.sql). De ontvanger krijgt een
// eigen kopie die hij zelf kan aanpassen; het origineel blijft van de maker.

// Mag dit recept worden overgenomen? true/false, of null als de tabel er nog niet is (SQL niet uitgevoerd).
async function recipeAllowsCopy(recipeId) {
  try {
    const { data, error } = await supabaseClient
      .from('recipe_share_settings')
      .select('allow_copy')
      .eq('recipe_id', recipeId)
      .maybeSingle();
    if (error) return null;
    return !!data?.allow_copy;
  } catch (_) {
    return null;
  }
}

// Schakelaar in het deelvenster ("Recept delen") voor je eigen recept.
async function renderShareCopyToggle(recipeId) {
  const box = $('shareCopy');
  if (!box) return;
  box.hidden = true;
  const allowed = await recipeAllowsCopy(recipeId);
  if (allowed === null) return;
  box.hidden = false;
  box.innerHTML = `<label class="share-copy-toggle"><input type="checkbox" id="shareCopyInput"${allowed ? ' checked' : ''} onchange="setRecipeAllowsCopy('${escJs(recipeId)}', this.checked)"><span><b>Ontvangers mogen dit recept overnemen</b><small>Wie is ingelogd, kan het dan toevoegen aan de eigen recepten. Jouw recept blijft van jou.</small></span></label>`;
}

async function setRecipeAllowsCopy(recipeId, on) {
  const { error } = await supabaseClient
    .from('recipe_share_settings')
    .upsert({ recipe_id: recipeId, owner_id: currentUser.id, allow_copy: !!on, updated_at: new Date().toISOString() });
  if (error) {
    console.warn('Overnemen instellen mislukt', error);
    toast('Instelling kon niet worden opgeslagen');
    if ($('shareCopyInput')) $('shareCopyInput').checked = !on;
    return;
  }
  toast(on ? 'Ontvangers kunnen dit recept nu overnemen' : 'Overnemen staat uit');
}

// Kopie maken in de eigen bibliotheek van de ingelogde gebruiker.
async function copyLinkRecipe(id) {
  const r = findRecipe(id);
  if (!r || !r.allowCopy) return;
  if (demoMode || !currentUser) {
    toast('Log in om recepten over te nemen');
    return;
  }
  const key = `savour_copied_${currentUser.id}`;
  let copied = {};
  try {
    copied = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (_) {}
  const earlier = copied[r.id] && recipes.find(x => String(x.id) === String(copied[r.id]));
  if (earlier) {
    const choice = await askChoice(`Je hebt dit recept al overgenomen\n\n“${earlier.title}” staat in je recepten.`, [
      { label: 'Mijn kopie openen', value: 'open', primary: true },
      { label: 'Nog een kopie maken', value: 'again' }
    ]);
    if (choice === 'open') openRecipe(earlier.id);
    if (choice !== 'again') return;
  }
  if (!(await checkRecipeRoom(1))) return;
  const { data, error } = await supabaseClient
    .from('recipes')
    .insert({
      user_id: currentUser.id,
      title: r.title || 'Recept',
      description: r.description || null,
      yield_text: r.yield || null,
      ingredients: r.ingredients || [],
      steps: r.steps || [],
      category_id: null,
      photo_url: r.photo || null
    })
    .select('id')
    .single();
  if (error) {
    console.error('Recept overnemen mislukt', error);
    if (/savour_recipe_limit/.test(error.message || '')) await checkRecipeRoom(Infinity);
    else toast('Het recept kon niet worden toegevoegd');
    return;
  }
  copied[r.id] = data.id;
  try {
    localStorage.setItem(key, JSON.stringify(copied));
  } catch (_) {}
  await loadDatabaseState();
  refreshSidebar();
  renderRecipes();
  toast('Toegevoegd aan je recepten');
  openRecipe(data.id);
}
