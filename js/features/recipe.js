// Een recept bekijken, verwijderen en delen.

// Recepten waarvan het originele kladje bewaard is (tabel recipe_sources). Alleen de nummers; de foto zelf
// wordt pas geladen als je "Origineel kladje bekijken" kiest.
let recipeSourceIds = new Set();

async function loadRecipeSourceIds() {
  recipeSourceIds = new Set();
  if (!currentUser || demoMode) return;
  const { data, error } = await supabaseClient.from('recipe_sources').select('recipe_id').eq('user_id', currentUser.id);
  // Tabel bestaat nog niet (SQL niet uitgevoerd): dan is er gewoon geen origineel.
  if (!error) recipeSourceIds = new Set((data || []).map(r => String(r.recipe_id)));
}

async function showRecipeSource(id) {
  const { data, error } = await supabaseClient.from('recipe_sources').select('image').eq('recipe_id', id).maybeSingle();
  if (error || !data?.image) return toast('Het origineel kon niet worden geladen.');
  $('sourceImage').src = data.image;
  $('sourceModal').classList.add('open');
}

function closeSourceModal() {
  $('sourceModal').classList.remove('open');
  $('sourceImage').removeAttribute('src');
}

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
  const rid = escJs(r.id);
  // Een recept van een teamlid is alleen-lezen: bekijken, printen en omrekenen.
  const own = isOwnRecipe(r);
  const inShared = context === 'shared' || context === 'sharedFolder';
  const mayRemoveFromShared = !inShared || canEditShared(findSharedMap(currentShared));
  const removeAction = !mayRemoveFromShared
    ? null
    : context === 'shared'
      ? { label: 'Uit gedeelde map halen', fn: `removeRecipeFromShared('${rid}')` }
      : context === 'sharedFolder'
        ? { label: 'Uit map halen', fn: `removeRecipeFromSharedFolder('${rid}')` }
        : context === 'folder'
          ? { label: 'Uit map halen', fn: `removeRecipeFromFolder('${rid}')` }
          : own
            ? { label: 'Verwijderen uit bibliotheek', fn: `deleteRecipe('${rid}')` }
            : null;
  const menuItems = [
    own && `<button type="button" onclick="shareRecipe('${rid}')">${icon('share')}Openbare link delen</button>`,
    own && `<button type="button" onclick="openFolderModal('${rid}')">${icon('folderPlus')}Toevoegen aan map</button>`,
    removeAction &&
      `<button type="button" class="rp-menu-danger" onclick="${removeAction.fn}">${icon('trash')}${removeAction.label}</button>`
  ].filter(Boolean);
  const isFav = favorites.includes(r.id);
  const base = parseYield(r.yield);
  const meta = [
    r.yield && !base ? `Opbrengst ${esc(r.yield)}` : '',
    ingredients.length ? `${ingredients.length} ingrediënten` : '',
    steps.length ? `${steps.length} stappen` : ''
  ].filter(Boolean);
  const yieldControl = base
    ? `<div class="rp-yield" role="group" aria-label="Opbrengst omrekenen"><span class="rp-yield-label">Opbrengst</span><div class="rp-stepper"><button type="button" class="rp-step" onclick="stepRecipeYield(-1)" aria-label="Minder">${icon('minus')}</button><input id="rpYieldInput" inputmode="decimal" value="${esc(formatNumber(base.value))}" oninput="setRecipeYield(this.value)" aria-label="Nieuwe opbrengst"><span class="rp-yield-unit">${esc(base.unit)}</span><button type="button" class="rp-step" onclick="stepRecipeYield(1)" aria-label="Meer">${icon('plus')}</button></div><span id="rpFactor" class="rp-factor"></span><button type="button" id="rpYieldReset" class="btn-quiet" onclick="resetRecipeYield()" hidden>${icon('undo', { size: 16 })} Origineel</button></div>`
    : '';
  window._savourScaled = null;
  $('detailWrap').innerHTML = `<article class="rp">
    ${r.photo ? `<img class="rp-photo" src="${esc(r.photo)}" alt="">` : ''}
    <header class="rp-head">
      <div class="eyebrow">${esc(r.category || 'Eigen recepten')}</div>
      <h1 class="rp-title">${esc(r.title)}</h1>
      ${meta.length ? `<p class="rp-meta">${meta.join(' · ')}</p>` : ''}
      ${own ? '' : `<p class="rp-note">Gedeeld recept van een teamlid. Alleen de maker kan het bewerken.</p>`}
      ${own && recipeSourceIds.has(String(r.id)) ? `<button type="button" class="btn-quiet rp-source" onclick="showRecipeSource('${rid}')">Origineel kladje bekijken</button>` : ''}
      <div class="rp-actions">
        <button type="button" class="btn gold" onclick="toggleCookMode()">${icon('cook')}Kookmodus</button>
        ${own ? `<button type="button" class="btn" onclick="editRecipe('${rid}')">${icon('edit')}Bewerken</button>` : ''}
        <button type="button" class="btn" onclick="printCurrentRecipe()">${icon('print')}Printen</button>
        ${own ? `<button type="button" class="btn rp-icon-btn${isFav ? ' is-on' : ''}" id="rpFavorite" onclick="toggleRecipePageFavorite('${rid}')" aria-pressed="${isFav}" aria-label="Favoriet" title="Favoriet">${icon('star', { filled: isFav })}</button>` : ''}
        ${menuItems.length ? `<details class="rp-more"><summary class="btn rp-icon-btn" aria-label="Meer acties" title="Meer acties">${icon('more')}</summary><div class="rp-menu">${menuItems.join('')}</div></details>` : ''}
      </div>
      ${yieldControl}
    </header>
    <div class="rp-body">
      <section class="rp-section">
        <h2>Ingrediënten</h2>
        ${
          ingredients.length
            ? `<ul class="rp-ingredients" id="rpIngredients">${ingredients.map((x, i) => `<li data-ing="${i}"><label><input type="checkbox"><span class="rp-ing-line">${ingredientHtml(x)}</span></label></li>`).join('')}</ul>`
            : '<p class="muted">Geen ingrediënten vastgelegd.</p>'
        }
      </section>
      <section class="rp-section">
        <h2>Bereiding</h2>
        ${
          steps.length
            ? `<ol class="rp-steps">${steps.map((x, i) => `<li><label><input type="checkbox"><span class="rp-step-num">${i + 1}</span><span class="rp-step-text">${esc(x)}</span></label></li>`).join('')}</ol>`
            : '<p class="muted">Geen bereiding in de bron.</p>'
        }
      </section>
    </div>
  </article>`;
  go('detail');
}

// Ster op de receptpagina: favoriet aan/uit en de knop direct bijwerken.
async function toggleRecipePageFavorite(id) {
  await toggleFavorite(id);
  const btn = $('rpFavorite');
  if (!btn) return;
  const on = favorites.includes(id) || favorites.some(x => String(x) === String(id));
  btn.classList.toggle('is-on', on);
  btn.setAttribute('aria-pressed', String(on));
  btn.innerHTML = icon('star', { filled: on });
}

// Kookmodus: alleen het recept in grote letters, en het scherm blijft aan (waar de browser dat toestaat).
let cookWakeLock = null;
async function toggleCookMode(force) {
  const on = typeof force === 'boolean' ? force : !document.body.classList.contains('cook-mode');
  document.body.classList.toggle('cook-mode', on);
  if (on) {
    if (!$('cookModeExit'))
      document.body.insertAdjacentHTML(
        'beforeend',
        `<button type="button" id="cookModeExit" class="cook-exit" onclick="toggleCookMode(false)">${icon('close')}Kookmodus sluiten</button>`
      );
    window.scrollTo(0, 0);
    try {
      cookWakeLock = await navigator.wakeLock?.request('screen');
    } catch (e) {
      cookWakeLock = null;
    }
  } else {
    $('cookModeExit')?.remove();
    try {
      await cookWakeLock?.release();
    } catch (e) {}
    cookWakeLock = null;
  }
}

async function deleteRecipe(id) {
  if (demoMode) {
    const r = recipes.find(x => String(x.id) === String(id));
    if (!r) return;
    if (!(await askConfirm(`Weet je zeker dat je “${r.title}” uit de demo wilt verwijderen?`))) return;
    recipes = recipes.filter(x => String(x.id) !== String(id));
    favorites = favorites.filter(x => String(x) !== String(id));
    folders.forEach(f => (f.recipeIds = (f.recipeIds || []).filter(x => String(x) !== String(id))));
    toast('Demo-recept verwijderd');
    refreshSidebar();
    renderRecipes();
    renderFolders();
    go('recipes');
    return;
  }
  if (!currentUser) return;
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  if (!(await askConfirm(`Weet je zeker dat je ‘${r.title}’ uit je receptenbibliotheek wilt verwijderen?`))) return;
  const { error } = await supabaseClient.from('recipes').delete().eq('id', id).eq('user_id', currentUser.id);
  if (error) {
    console.error(error);
    toast('Recept kon niet worden verwijderd: ' + error.message);
    return;
  }
  await loadDatabaseState();
  if (currentId === id) currentId = null;
  refreshSidebar();
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
