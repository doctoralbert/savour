// Final v4 fixes: page isolation, compact library, safe folder actions, and honest empty methods.
function compactCard(r) {
  const isFav = favorites.includes(r.id);
  return `<article class="card compact-recipe-card" onclick="openRecipe('${escAttr(r.id)}')"><div class="card-body">${bulkDeleteMode ? `<label class="bulk-check"><input type="checkbox" data-bulk-recipe value="${escAttr(r.id)}" ${bulkSelectedIds.has(String(r.id)) ? 'checked' : ''} onclick="event.stopPropagation();toggleBulkRecipe('${escAttr(r.id)}')"><span>Selecteren</span></label>` : ''}<div class="cat">${esc(r.category || 'Eigen recepten')}</div><div class="row"><h3>${esc(r.title)}</h3><button class="fav" title="${isFav ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}" onclick="event.stopPropagation();toggleFavorite('${escAttr(r.id)}')">${isFav ? '★' : '☆'}</button></div>${r.yield ? `<div class="yield">${esc(r.yield)}</div>` : ''}<div class="compact-card-actions"><button class="btn small" onclick="event.stopPropagation();editRecipe('${escAttr(r.id)}')">Bewerken</button><button class="btn small delete-recipe" onclick="event.stopPropagation();deleteRecipe('${escAttr(r.id)}')">Verwijderen</button></div></div></article>`;
}
function openRecipe(id, context = 'library') {
  currentId = id;
  let r = recipes.find(x => String(x.id) === String(id));
  if (!r) return;
  if (context === 'sharedFolder') {
    recipeReturnView = 'sharedFolderDetail';
    recipeReturnShared = currentShared;
    recipeReturnFolder = currentFolder;
  } else if (context === 'shared') {
    recipeReturnView = 'shared';
    recipeReturnShared = currentShared;
    recipeReturnFolder = null;
  } else if (context === 'folder') {
    recipeReturnView = 'folderDetail';
    recipeReturnShared = null;
    recipeReturnFolder = currentFolder;
  } else if (context === 'favorite') {
    recipeReturnView = 'favorites';
    recipeReturnShared = null;
    recipeReturnFolder = null;
  } else {
    recipeReturnView = 'recipes';
    recipeReturnShared = null;
    recipeReturnFolder = null;
  }
  const ingredients = r.ingredients?.length ? r.ingredients : [];
  const steps = r.steps?.length ? r.steps : [];
  const photo = r.photo
    ? `<div style="margin-bottom:18px"><img src="${r.photo}" style="width:100%;max-height:420px;object-fit:cover;border-radius:8px;border:1px solid #293536"></div>`
    : '';
  const ctx = context;
  const removeButton =
    ctx === 'shared'
      ? `<button class="btn delete-recipe" onclick="removeRecipeFromShared('${escAttr(r.id)}')">Uit gedeelde map verwijderen</button>`
      : ctx === 'sharedFolder'
        ? `<button class="btn delete-recipe" onclick="removeRecipeFromSharedFolder('${escAttr(r.id)}')">Uit map verwijderen</button>`
        : ctx === 'folder'
          ? `<button class="btn delete-recipe" onclick="removeRecipeFromFolder('${escAttr(r.id)}')">Uit map verwijderen</button>`
          : ctx === 'favorite'
            ? `<button class="btn delete-recipe" onclick="toggleFavorite('${escAttr(r.id)}')">Verwijderen uit favorieten</button>`
            : `<button class="btn delete-recipe" onclick="deleteRecipe('${escAttr(r.id)}')">Verwijderen uit bibliotheek</button>`;
  $('detailWrap').innerHTML =
    `<div class="detail"><div class="detail-hero"><div class="detail-main">${photo}<div class="eyebrow">${esc(r.category || 'Eigen recepten')}</div><div class="row" style="align-items:flex-start"><h1>${esc(r.title)}</h1><button class="fav" onclick="toggleFavorite('${escAttr(r.id)}')">${favorites.includes(r.id) ? '★' : '☆'}</button></div>${r.yield ? `<div class="yield" style="font-size:14px;margin-top:8px">Opbrengst · ${esc(r.yield)}</div>` : ''}</div></div><div class="panel"><div class="columns"><div class="block"><h3>Ingrediënten</h3>${ingredients.length ? ingredients.map(x => `<div class="ingredient">${esc(x)}</div>`).join('') : `<div class="muted">Geen ingrediënten vastgelegd.</div>`}</div>${steps.length ? `<div class="block"><h3>Bereiding</h3>${steps.map((x, i) => `<div class="step"><span class="num">${i + 1}</span><span>${esc(x)}</span></div>`).join('')}</div>` : `<div class="block"><h3>Bereiding</h3><div class="muted">Geen bereiding in de bron.</div></div>`}</div></div><div class="detail-actions"><button class="btn gold" onclick="editRecipe('${escAttr(r.id)}')">Bewerken</button><button class="btn" onclick="shareRecipe('${escAttr(r.id)}')">Delen</button><button class="btn" onclick="openFolderModal('${escAttr(r.id)}')">＋ Toevoegen aan map</button><button class="btn" onclick="printRecipe('${escAttr(r.id)}')">Printen</button>${r.yield ? `<button class="btn" onclick="openScale('${escAttr(r.id)}')">Recept omrekenen</button>` : ''}${removeButton}</div></div>`;
  go('detail');
}
async function renameFolder(id) {
  if (!currentUser) return;
  const f = folders.find(x => String(x.id) === String(id));
  if (!f || f.system) return;
  const nextRaw = prompt('Nieuwe naam voor deze receptenmap', f.name);
  if (nextRaw === null) return;
  const next = nextRaw.trim();
  if (!next || next === f.name) return;
  if (folders.some(x => String(x.id) !== String(id) && !x.system && x.name.toLowerCase() === next.toLowerCase())) {
    toast('Deze receptenmap bestaat al');
    return;
  }
  if (demoMode) {
    f.name = next;
    renderFolders();
    renderFolderManage();
    renderHome();
    renderCategoryNav();
    if (String(currentFolder) === String(id)) renderFolderDetail();
    toast('Receptenmap hernoemd');
    return;
  }
  const { error } = await supabaseClient
    .from('folders')
    .update({ name: next })
    .eq('id', f.id)
    .eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Receptenmap kon niet worden hernoemd: ' + error.message);
    return;
  }
  await loadDatabaseState();
  renderFolders();
  renderFolderManage();
  renderHome();
  renderCategoryNav();
  renderCategories();
  if (String(currentFolder) === String(f.id)) renderFolderDetail();
  toast('Receptenmap hernoemd');
}
async function renameSharedMap(id) {
  if (!currentUser) return;
  const m = sharedMaps.find(x => String(x.id) === String(id));
  if (!m || String(m.ownerId) !== String(currentUser.id)) {
    toast(t('Je hebt geen rechten om deze gedeelde map te wijzigen'));
    return;
  }
  let next = prompt('Nieuwe naam voor deze gedeelde map', m.name);
  if (next === null) return;
  next = next.trim();
  if (!next || next === m.name) return;
  if (sharedMaps.some(x => String(x.id) !== String(id) && x.name.toLowerCase() === next.toLowerCase())) {
    toast('Deze gedeelde map bestaat al');
    return;
  }
  if (demoMode) {
    m.name = next;
    renderSharedManage();
    renderSharedNav();
    renderHome();
    return;
  }
  const { error } = await supabaseClient
    .from('shared_maps')
    .update({ name: next })
    .eq('id', id)
    .eq('owner_id', currentUser.id);
  if (error) {
    toast(error.message || 'Gedeelde map kon niet worden hernoemd');
    return;
  }
  await loadDatabaseState();
  currentShared = String(id);
  renderSharedManage();
  renderSharedNav();
  renderHome();
  renderShared(id);
  toast('Gedeelde map hernoemd');
}
function saveRecipe() {
  syncStructuredEditor();
  if (!currentUser) {
    toast('Log eerst in om een recept op te slaan');
    return;
  }
  const title = $('fTitle').value.trim();
  if (!title) {
    toast('Vul eerst een receptnaam in');
    $('fTitle').focus();
    return;
  }
  const ingredients = ($('fIngredients').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const steps = ($('fSteps').value || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);
  const categoryName = $('fCategory').value || 'Eigen recepten';
  const btn = document.querySelector('#editor .actions .btn.gold');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Opslaan…';
  }
  const done = () => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Opslaan';
    }
  };
  if (demoMode) {
    const old = currentId ? recipes.find(x => String(x.id) === String(currentId)) : null;
    const obj = {
      id: old?.id || 'demo-' + Date.now(),
      title,
      description: old?.description || '',
      yield: $('fYield').value.trim(),
      ingredients,
      steps,
      category: categoryName,
      photo: old?.photo || window.__aiImportedPhoto || ''
    };
    if (old) Object.assign(old, obj);
    else recipes.unshift(obj);
    window.__aiImportedPhoto = '';
    done();
    renderRecipes();
    renderHome();
    openRecipe(obj.id);
    toast('Recept opgeslagen');
    return;
  }
  (async () => {
    try {
      const old = currentId ? recipes.find(x => String(x.id) === String(currentId)) : null;
      let categoryId = null;
      if (categoryName && categoryName !== 'Eigen recepten') {
        const { data: cat, error } = await supabaseClient
          .from('categories')
          .select('id')
          .eq('user_id', currentUser.id)
          .eq('name', categoryName)
          .maybeSingle();
        if (error) throw error;
        categoryId = cat?.id || null;
      }
      let photo = old?.photo || window.__aiImportedPhoto || '';
      const file = $('fPhoto').files[0];
      const save = async () => {
        const payload = {
          title,
          description: old?.description || null,
          yield_text: $('fYield').value.trim() || null,
          ingredients,
          steps,
          category_id: categoryId,
          photo_url: photo || null
        };
        const result = currentId
          ? await supabaseClient.from('recipes').update(payload).eq('id', currentId).eq('user_id', currentUser.id)
          : await supabaseClient
              .from('recipes')
              .insert({ ...payload, user_id: currentUser.id })
              .select('id')
              .single();
        if (result.error) throw result.error;
        return currentId || result.data?.id;
      };
      let savedId;
      if (file) {
        photo = await readImageAsDataUrl(file);
        savedId = await save();
      } else savedId = await save();
      window.__aiImportedPhoto = '';
      await loadDatabaseState();
      done();
      toast('Recept opgeslagen');
      if (savedId) openRecipe(savedId);
    } catch (e) {
      console.error('Savour saveRecipe error', e);
      done();
      toast('Recept kon niet worden opgeslagen: ' + (e?.message || 'onbekende fout'));
    }
  })();
}
