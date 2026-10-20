// Een recept bekijken, verwijderen en delen.

function openRecipe(id, context = 'library') {
  currentId = id;
  const r = findRecipe(id);
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
    ? `<div style="margin-bottom:18px"><img src="${esc(r.photo)}" style="width:100%;max-height:420px;object-fit:cover;border-radius:8px;border:1px solid #293536"></div>`
    : '';
  const ctx = context;
  // Een recept van een teamlid is alleen-lezen: bekijken, printen en omrekenen.
  const own = isOwnRecipe(r);
  const inShared = ctx === 'shared' || ctx === 'sharedFolder';
  const mayRemoveFromShared = !inShared || canEditShared(findSharedMap(currentShared));
  const removeButton = !mayRemoveFromShared
    ? ''
    : ctx === 'shared'
      ? `<button class="btn delete-recipe" onclick="removeRecipeFromShared('${escJs(r.id)}')">Uit gedeelde map verwijderen</button>`
      : ctx === 'sharedFolder'
        ? `<button class="btn delete-recipe" onclick="removeRecipeFromSharedFolder('${escJs(r.id)}')">Uit map verwijderen</button>`
        : ctx === 'folder'
          ? `<button class="btn delete-recipe" onclick="removeRecipeFromFolder('${escJs(r.id)}')">Uit map verwijderen</button>`
          : ctx === 'favorite'
            ? `<button class="btn delete-recipe" onclick="toggleFavorite('${escJs(r.id)}')">Verwijderen uit favorieten</button>`
            : own
              ? `<button class="btn delete-recipe" onclick="deleteRecipe('${escJs(r.id)}')">Verwijderen uit bibliotheek</button>`
              : '';
  const favButton = own
    ? `<button class="fav" onclick="toggleFavorite('${escJs(r.id)}')">${favorites.includes(r.id) ? '★' : '☆'}</button>`
    : '';
  const ownActions = own
    ? `<button class="btn gold" onclick="editRecipe('${escJs(r.id)}')">Bewerken</button><button class="btn" onclick="shareRecipe('${escJs(r.id)}')">Delen</button><button class="btn" onclick="openFolderModal('${escJs(r.id)}')">＋ Toevoegen aan map</button>`
    : '';
  const sharedNote = own
    ? ''
    : `<p class="muted shared-recipe-note">Gedeeld recept van een teamlid. Alleen de maker kan het bewerken.</p>`;
  $('detailWrap').innerHTML =
    `<div class="detail"><div class="detail-hero"><div class="detail-main">${photo}<div class="eyebrow">${esc(r.category || 'Eigen recepten')}</div><div class="row" style="align-items:flex-start"><h1>${esc(r.title)}</h1>${favButton}</div>${r.yield ? `<div class="yield" style="font-size:14px;margin-top:8px">Opbrengst · ${esc(r.yield)}</div>` : ''}${sharedNote}</div></div><div class="panel"><div class="columns"><div class="block"><h3>Ingrediënten</h3>${ingredients.length ? ingredients.map(x => `<div class="ingredient">${esc(x)}</div>`).join('') : `<div class="muted">Geen ingrediënten vastgelegd.</div>`}</div>${steps.length ? `<div class="block"><h3>Bereiding</h3>${steps.map((x, i) => `<div class="step"><span class="num">${i + 1}</span><span>${esc(x)}</span></div>`).join('')}</div>` : `<div class="block"><h3>Bereiding</h3><div class="muted">Geen bereiding in de bron.</div></div>`}</div></div><div class="detail-actions">${ownActions}<button class="btn" onclick="printRecipe('${escJs(r.id)}')">Printen</button>${r.yield ? `<button class="btn" onclick="openScale('${escJs(r.id)}')">Recept omrekenen</button>` : ''}${removeButton}</div></div>`;
  go('detail');
}

async function deleteRecipe(id) {
  if (demoMode) {
    const r = recipes.find(x => String(x.id) === String(id));
    if (!r) return;
    if (!confirm(`Weet je zeker dat je “${r.title}” uit de demo wilt verwijderen?`)) return;
    recipes = recipes.filter(x => String(x.id) !== String(id));
    favorites = favorites.filter(x => String(x) !== String(id));
    folders.forEach(f => (f.recipeIds = (f.recipeIds || []).filter(x => String(x) !== String(id))));
    toast('Demo-recept verwijderd');
    renderHome();
    renderRecipes();
    renderFolders();
    go('recipes');
    return;
  }
  if (!currentUser) return;
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  if (!confirm(`Weet je zeker dat je ‘${r.title}’ uit je receptenbibliotheek wilt verwijderen?`)) return;
  const { error } = await supabaseClient.from('recipes').delete().eq('id', id).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Recept kon niet worden verwijderd: ' + error.message);
    return;
  }
  await loadDatabaseState();
  if (currentId === id) currentId = null;
  renderHome();
  renderRecipes();
  renderFavorites();
  renderFolders();
  if (currentShared) renderShared(currentShared);
  toast('Recept uit bibliotheek verwijderd');
  go('recipes');
}

async function shareRecipe(id) {
  let r = recipes.find(x => x.id === id);
  if (!r) return;
  activeShareTitle = r.title;
  let slug = '';
  try {
    const { data, error } = await supabaseClient.rpc('create_public_recipe_share', { _recipe_id: r.id });
    if (error) throw error;
    slug = data?.slug || '';
  } catch (e) {
    console.error('Public share aanmaken mislukt', e);
    toast('Openbare link kon niet worden aangemaakt');
    return;
  }
  activeShareUrl = location.origin + '/r/' + encodeURIComponent(slug);
  $('shareLink').textContent = activeShareUrl;
  $('shareModal').classList.add('open');
}

function shareWhatsApp() {
  if (!activeShareUrl) return;
  window.open(
    'https://wa.me/?text=' + encodeURIComponent(activeShareTitle + ' — ' + activeShareUrl),
    '_blank',
    'noopener'
  );
}

function shareTelegram() {
  if (!activeShareUrl) return;
  window.open(
    'https://t.me/share/url?url=' +
      encodeURIComponent(activeShareUrl) +
      '&text=' +
      encodeURIComponent(activeShareTitle),
    '_blank',
    'noopener'
  );
}

function shareEmail() {
  if (!activeShareUrl) return;
  window.location.href =
    'mailto:?subject=' +
    encodeURIComponent('Savour · ' + activeShareTitle) +
    '&body=' +
    encodeURIComponent('Bekijk dit recept in Savour:\n\n' + activeShareUrl);
}

function closeShare() {
  $('shareModal').classList.remove('open');
}

function copyShare() {
  navigator.clipboard?.writeText($('shareLink').textContent);
  toast('Deellink gekopieerd');
  closeShare();
}
