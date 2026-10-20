// ReceptcategorieÃ«n beheren.

function renderCategories() {
  if (!currentUser) return;
  const el = $('categoryPageList');
  if (!el) return;
  el.innerHTML = categories.length
    ? categories
        .map(
          c =>
            `<div class="category-page-item"><div><b>${esc(c)}</b><small>${recipes.filter(r => r.category === c).length} recepten</small></div><div style="display:flex;gap:7px"><button class="btn small" onclick="renameCategory('${escJs(c)}')">Naam wijzigen</button><button class="btn small delete-recipe" onclick="removeCategory('${escJs(c)}')">Verwijderen</button></div></div>`
        )
        .join('')
    : `<div class="empty">Nog geen categorieën. Voeg je eerste categorie toe.</div>`;
}

async function addCategory() {
  if (!currentUser) return;
  let name = prompt('Naam van de nieuwe categorie');
  if (!name) return;
  name = name.trim();
  if (!name) return;
  if (categories.includes(name)) {
    toast('Deze categorie bestaat al');
    return;
  }
  const { error } = await supabaseClient.from('categories').insert({ user_id: currentUser.id, name });
  if (error) {
    console.error(error);
    toast('Categorie kon niet worden toegevoegd');
    return;
  }
  await loadDatabaseState();
  renderCategoryBar();
  renderSettings();
  renderCategories();
  toast('Categorie toegevoegd');
}

async function renameCategory(oldName) {
  if (!currentUser) return;
  let next = prompt('Nieuwe naam voor deze categorie', oldName);
  if (next === null) return;
  next = next.trim();
  if (!next || next === oldName) return;
  if (categories.includes(next)) {
    toast('Deze categorie bestaat al');
    return;
  }
  const { data: cat } = await supabaseClient
    .from('categories')
    .select('id')
    .eq('user_id', currentUser.id)
    .eq('name', oldName)
    .maybeSingle();
  if (!cat) {
    toast('Categorie niet gevonden');
    return;
  }
  const { error } = await supabaseClient
    .from('categories')
    .update({ name: next })
    .eq('id', cat.id)
    .eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Categorie kon niet worden hernoemd');
    return;
  }
  await loadDatabaseState();
  renderCategoryBar();
  renderSettings();
  renderCategories();
  renderRecipes();
  toast('Categorie hernoemd');
}

async function removeCategory(name) {
  if (!currentUser) return;
  if (!confirm(`Weet je zeker dat je de categorie “${name}” wilt verwijderen?`)) return;
  const { data: cat } = await supabaseClient
    .from('categories')
    .select('id')
    .eq('user_id', currentUser.id)
    .eq('name', name)
    .maybeSingle();
  if (!cat) {
    toast('Categorie niet gevonden');
    return;
  }
  const { error } = await supabaseClient.from('categories').delete().eq('id', cat.id).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Categorie kon niet worden verwijderd');
    return;
  }
  await loadDatabaseState();
  renderCategoryBar();
  renderSettings();
  renderCategories();
  renderRecipes();
  toast('Categorie verwijderd');
}
