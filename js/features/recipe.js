// Een recept bekijken, verwijderen en delen.

// Recepten waarvan het originele kladje bewaard is (tabel recipe_sources). Alleen de nummers; de foto zelf
// wordt pas geladen als je "Origineel kladje bekijken" kiest.
let recipeSourceIds = new Set();
let recipeOpenContext = 'library';

async function loadRecipeSourceIds() {
  recipeSourceIds = new Set();
  if (!currentUser || demoMode) return;
  const { data, error } = await supabaseClient.from('recipe_sources').select('recipe_id').eq('user_id', currentUser.id);
  // Tabel bestaat nog niet (SQL niet uitgevoerd): dan is er gewoon geen origineel.
  if (!error) recipeSourceIds = new Set((data || []).map(r => String(r.recipe_id)));
}

async function showRecipeSource(id) {
  const { data, error } = await supabaseClient
    .from('recipe_sources')
    .select('image,image_path')
    .eq('recipe_id', id)
    .maybeSingle();
  if (error || (!data?.image && !data?.image_path)) return toast('Het origineel kon niet worden geladen.');
  let src = data.image || '';
  // Nieuwere kladjes staan in de opslag (bucket recipe-sources): een tijdelijke link van tien minuten.
  if (data.image_path) {
    const { data: signed, error: signError } = await supabaseClient.storage
      .from('recipe-sources')
      .createSignedUrl(data.image_path, 600);
    if (signError || !signed?.signedUrl) return toast('Het origineel kon niet worden geladen.');
    src = signed.signedUrl;
  }
  $('sourceImage').src = src;
  $('sourceModal').classList.add('open');
}

function closeSourceModal() {
  $('sourceModal').classList.remove('open');
  $('sourceImage').removeAttribute('src');
}

function openRecipe(id, context = 'library') {
  // Alleen vanuit een lijst onthouden (niet als je van het ene recept naar het andere gaat).
  if (!$('detail')?.classList.contains('active')) recipeReturnScroll = window.scrollY;
  currentId = id;
  const r = findRecipe(id);
  if (!r) return;
  recipeOpenContext = context;
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
  } else if (context === 'example') {
    recipeReturnView = 'exampleView';
    recipeReturnShared = null;
    recipeReturnFolder = null;
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
  // Recept van een collega in een keukenteam: toe te voegen aan je eigen recepten (eigen kopie), met Savour Pro.
  // Gratis teamleden kunnen alleen bekijken, printen en omrekenen.
  // Via een openbare link alleen als de maker dat heeft toegestaan (js/features/recipe-copy.js).
  if (!own && !r.linkSlug && !r.example) r.allowCopy = demoMode || isPro();
  const inShared = context === 'shared' || context === 'sharedFolder';
  const mayRemoveFromShared = !inShared || canEditShared(findSharedMap(currentShared));
  const removeAction = !mayRemoveFromShared
    ? null
    : context === 'shared'
      ? { label: 'Uit keukenteam halen', fn: `removeRecipeFromShared('${rid}')` }
      : context === 'sharedFolder'
        ? { label: 'Uit map halen', fn: `removeRecipeFromSharedFolder('${rid}')` }
        : context === 'folder'
          ? { label: 'Uit map halen', fn: `removeRecipeFromFolder('${rid}')` }
          : own
            ? { label: 'Verwijderen uit bibliotheek', fn: `deleteRecipe('${rid}')` }
            : null;
  const menuItems = [
    ingredients.length && `<button type="button" onclick="openRecipeScale()">${icon('plus')}Meer omrekenen</button>`,
    own &&
      ingredients.length &&
      `<button type="button" onclick="openIngredientLinks()">${icon('book')}Koppelen aan recept</button>`,
    own && `<button type="button" onclick="openFolderModal('${rid}')">${icon('folderPlus')}Toevoegen aan map</button>`,
    ingredients.length &&
      productsVisible(productScopeOf(r)) &&
      `<button type="button" onclick="openAllergenCard()">${icon('alert')}Allergenenkaart</button>`,
    removeAction &&
      `<button type="button" class="rp-menu-danger" onclick="${removeAction.fn}">${icon('trash')}${removeAction.label}</button>`
  ].filter(Boolean);
  const isFav = favorites.includes(r.id);
  const base = parseYield(r.yield);
  const meta = [
    r.yield ? `<span>${t('Opbrengst')}</span> <span id="rpYieldValue" translate="no">${esc(r.yield)}</span>` : '',
    ingredients.length
      ? countLabel(ingredients.filter(x => !recipePartName(x)).length, 'ingrediënt', 'ingrediënten')
      : '',
    steps.length ? countLabel(steps.filter(x => !recipePartName(x)).length, 'stap', 'stappen') : ''
  ].filter(Boolean);
  const scaleBar = ingredients.length
    ? `<div class="rp-yield" role="group" aria-label="Omrekenen"><button type="button" class="rp-yield-label rp-yield-more" onclick="openRecipeScale()" title="${esc(t('Meer omrekenen: op opbrengst of op wat je hebt'))}">Omrekenen</button>${recipeMultipliersHtml('setRecipeFactor')}<span id="rpFactor" class="rp-factor"></span><button type="button" id="rpYieldReset" class="btn-quiet" onclick="resetRecipeYield()" hidden>${icon('undo', { size: 16 })} Origineel</button></div>`
    : '';
  window._savourScaled = null;
  $('detailWrap').innerHTML = `<article class="rp">
    ${r.photo ? `<img class="rp-photo" src="${esc(r.photo)}" alt="">` : ''}
    <header class="rp-head">
      <div class="eyebrow">${esc(r.category || (own ? 'Eigen recepten' : 'Gedeeld recept'))}</div>
      <h1 class="rp-title">${esc(r.title)}</h1>
      ${meta.length ? `<p class="rp-meta">${meta.map(x => '<span>' + x + '</span>').join(' · ')}</p>` : ''}
      ${own ? '' : r.example ? '<p class="rp-note">Voorbeeldrecept. Zo ziet een recept er in Savour uit.</p>' : r.linkSlug ? `<p class="rp-note rp-note-link">${icon('share', { size: 16 })}<span>${r.allowCopy ? 'Gedeeld recept. Voeg het toe aan je eigen recepten om het aan te passen.' : 'Gedeeld recept. Je kunt het bekijken, omrekenen en printen; alleen de maker kan het aanpassen.'}</span></p>` : `<p class="rp-note">Gedeeld door een gebruiker. Alleen de maker van het recept kan het bewerken.</p>`}
      ${own && recipeSourceIds.has(String(r.id)) ? `<button type="button" class="btn-quiet rp-source" onclick="showRecipeSource('${rid}')">Origineel kladje bekijken</button>` : ''}
      <div class="rp-actions">
        <button type="button" class="btn gold" onclick="toggleCookMode()" aria-label="Kookmodus" title="Kookmodus">${icon('cook')}<span class="rp-label">Kookmodus</span></button>
        ${own ? `<button type="button" class="btn" onclick="editRecipe('${rid}')" aria-label="Bewerken" title="Bewerken">${icon('edit')}<span class="rp-label">Bewerken</span></button>` : ''}
        ${r.allowCopy ? `<button type="button" class="btn" onclick="copyLinkRecipe('${rid}')" aria-label="Toevoegen aan mijn recepten" title="Toevoegen aan mijn recepten">${icon('plus')}<span class="rp-label">Toevoegen aan mijn recepten</span></button>` : ''}
        <button type="button" class="btn" onclick="printCurrentRecipe()" aria-label="Printen" title="Printen">${icon('print')}<span class="rp-label">Printen</span></button>
        ${own ? `<button type="button" class="btn" onclick="shareRecipe('${rid}')" aria-label="Delen" title="Delen">${icon('share')}<span class="rp-label">Delen</span></button>` : ''}
        ${own ? `<button type="button" class="btn rp-icon-btn${isFav ? ' is-on' : ''}" id="rpFavorite" onclick="toggleRecipePageFavorite('${rid}')" aria-pressed="${isFav}" aria-label="Favoriet" title="Favoriet">${icon('star', { filled: isFav })}</button>` : ''}
        ${menuItems.length ? `<details class="rp-more"><summary class="btn rp-icon-btn" aria-label="Meer acties" title="Meer acties">${icon('more')}</summary><div class="rp-menu">${menuItems.join('')}</div></details>` : ''}
      </div>
      ${scaleBar}
    </header>
    <div class="rp-body">
      <section class="rp-section">
        <h2>Ingrediënten</h2>
        ${
          ingredients.length
            ? `<ul class="rp-ingredients" id="rpIngredients">${ingredients.map((x, i) => (recipePartName(x) ? `<li class="rp-part-head">${esc(recipePartName(x))}</li>` : `<li data-ing="${i}"><label><input type="checkbox"><span class="rp-ing-line">${ingredientHtml(x)}</span></label></li>`)).join('')}</ul>`
            : '<p class="muted">Geen ingrediënten vastgelegd.</p>'
        }
        <div id="rpAllergens"></div>
        <div id="rpSideNote"></div>
      </section>
      <section class="rp-section">
        <h2>Bereiding</h2>
        ${
          steps.length
            ? `<ol class="rp-steps">${steps.map((x, i) => (recipePartName(x) ? `<li class="rp-part-head">${esc(recipePartName(x))}</li>` : `<li><label><input type="checkbox"><span class="rp-step-num">${recipeStepNumbers(steps)[i]}</span><span class="rp-step-text">${esc(x)}</span></label></li>`)).join('')}</ol>`
            : '<p class="muted">Geen bereiding in de bron.</p>'
        }
      </section>
    </div>
  </article>`;
  renderIngredientLinks(r);
  renderRecipeAllergens(r);
  renderRecipeNote(r);
  go('detail');
}

// Notities en koppelingen staan los van het recept zelf; een eigen update, zodat het bewerken ongemoeid blijft.
async function saveRecipeFields(r, row) {
  if (demoMode) return true;
  const { data, error } = await supabaseClient.from('recipes').update(row).eq('id', r.id).select('id');
  if (!error && data?.length) return true;
  toast(
    /notes|ingredient_links/.test(error?.message || '')
      ? 'Dit kan zodra de database is bijgewerkt.'
      : 'Opslaan lukte niet; probeer het opnieuw'
  );
  return false;
}

// Notitie: een kleine aantekening naast het recept, zichtbaar voor iedereen die het recept kan zien.
function renderRecipeNote(r) {
  const host = $('rpSideNote');
  if (!host) return;
  const own = isOwnRecipe(r);
  const note = String(r.notes || '').trim();
  if (note)
    host.innerHTML = `<aside class="rp-side-note"><div class="rp-side-note-head"><span>Notitie</span>${own ? '<button type="button" onclick="editRecipeNote()">Wijzigen</button>' : ''}</div><p translate="no">${esc(note)}</p></aside>`;
  else
    host.innerHTML = own
      ? '<button type="button" class="rp-note-add" onclick="editRecipeNote()">＋ Notitie</button>'
      : '';
}

function editRecipeNote() {
  const r = findRecipe(currentId);
  const host = $('rpSideNote');
  if (!r || !host) return;
  host.innerHTML = `<aside class="rp-side-note"><div class="rp-side-note-head"><span>Notitie</span></div><textarea id="rpNoteInput" rows="4" aria-label="${esc(t('Notitie'))}" placeholder="${esc(t('Bijv. bij meer dan 5 kg langer laten rusten'))}">${esc(r.notes || '')}</textarea><div class="rp-side-note-actions"><button type="button" class="btn small" onclick="renderRecipeNote(findRecipe(currentId))">Annuleren</button><button type="button" class="btn small gold" onclick="saveRecipeNote()">Opslaan</button></div></aside>`;
  $('rpNoteInput').focus();
}

async function saveRecipeNote() {
  const r = findRecipe(currentId);
  const input = $('rpNoteInput');
  if (!r || !input) return;
  const notes = input.value.trim();
  if (!(await saveRecipeFields(r, { notes }))) return;
  r.notes = notes;
  renderRecipeNote(r);
}

// Koppeling: het recept dat bij een ingrediënt hoort. Zelf gekozen, of vanzelf als de naam precies gelijk is aan
// een recept. Een lege koppeling betekent: bewust geen recept. Alleen recepten die jij kunt openen tellen mee.
function ingredientLinkTarget(r, line, byTitle) {
  const name = ingredientNameOf(line).toLowerCase();
  const chosen = r.links?.[name];
  if (chosen === '') return null;
  const target = chosen ? findRecipe(chosen) : byTitle.get(name);
  return target && String(target.id) !== String(r.id) ? target : null;
}

function linkableRecipes(r) {
  return [...(r.example ? exampleRecipes() : []), ...recipes, ...sharedRecipes].filter(
    x => String(x.id) !== String(r.id)
  );
}

function recipesByTitle(r) {
  return new Map(
    linkableRecipes(r).map(x => [
      String(x.title || '')
        .trim()
        .toLowerCase(),
      x
    ])
  );
}

function renderIngredientLinks(r) {
  const byTitle = recipesByTitle(r);
  document.querySelectorAll('#rpIngredients li[data-ing]').forEach(li => {
    li.querySelector('.rp-ing-link')?.remove();
    li.classList.remove('has-link');
    const target = ingredientLinkTarget(r, r.ingredients[Number(li.dataset.ing)], byTitle);
    if (!target) return;
    li.classList.add('has-link');
    li.insertAdjacentHTML(
      'beforeend',
      `<button type="button" class="rp-ing-link" title="${esc(target.title)}" onclick="openLinkedRecipe('${escJs(target.id)}')">${icon('book', { size: 14 })}<span>Recept</span></button>`
    );
  });
}

function openLinkedRecipe(id) {
  const fromId = currentId;
  const from = findRecipe(fromId);
  const fromContext = recipeOpenContext;
  openRecipe(id);
  $('detailWrap')
    .querySelector('.rp')
    ?.insertAdjacentHTML(
      'afterbegin',
      `<button type="button" class="btn-quiet rp-link-back" onclick="openRecipe('${escJs(fromId)}','${escJs(fromContext)}')">← <span translate="no">${esc(from?.title || '')}</span></button>`
    );
  window.scrollTo(0, 0);
}

async function openIngredientLinks() {
  document.querySelector('.rp-more')?.removeAttribute('open');
  const r = findRecipe(currentId);
  if (!r) return;
  const byTitle = recipesByTitle(r);
  const lines = r.ingredients.filter(x => !recipePartName(x));
  const line = await askChoice(
    'Koppelen aan recept\n\nKies het ingrediënt waar een eigen recept bij hoort, bijvoorbeeld een basissaus.',
    lines.map(x => ({
      value: x,
      label: ingredientNameOf(x),
      hint: ingredientLinkTarget(r, x, byTitle)?.title || ''
    }))
  );
  if (line === null) return;
  const name = ingredientNameOf(line).toLowerCase();
  const target = await pickLinkedRecipe(r, ingredientNameOf(line), ingredientLinkTarget(r, line, byTitle));
  if (target === null) return;
  const links = { ...r.links, [name]: target };
  if (!(await saveRecipeFields(r, { ingredient_links: links }))) return;
  r.links = links;
  renderIngredientLinks(r);
}

// Zoekvenster met je recepten. Geeft het recept-id, '' om de koppeling weg te halen, of null bij annuleren.
function pickLinkedRecipe(r, name, current) {
  const list = sortRecipesByTitle(linkableRecipes(r));
  document.getElementById('linkPicker')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="linkPicker" role="dialog" aria-modal="true" aria-labelledby="linkPickerTitle"><form class="sv-dialog-box product-picker-box" novalidate>${modalCloseHtml()}<h2 id="linkPickerTitle" class="sv-dialog-title" translate="no">${esc(name)}</h2><input class="sv-dialog-input" type="text" autocomplete="off" placeholder="${esc(t('Zoek een recept'))}" aria-label="${esc(t('Zoek een recept'))}"><div class="sv-dialog-choices link-results"></div><div class="sv-dialog-actions">${current ? '<button type="button" class="btn" data-unlink>Koppeling weghalen</button>' : ''}<button type="button" class="btn" data-cancel>Annuleren</button></div></form></div>`
  );
  const el = document.getElementById('linkPicker');
  const input = el.querySelector('input');
  const results = el.querySelector('.link-results');
  const show = () => {
    const q = input.value.trim().toLowerCase();
    const found = list.filter(x => recipeTitleOf(x).toLowerCase().includes(q));
    results.innerHTML =
      found
        .slice(0, q ? 60 : 40)
        .map(
          x =>
            `<button type="button" class="sv-dialog-choice${current && String(current.id) === String(x.id) ? ' is-primary' : ''}" data-id="${esc(x.id)}" translate="no">${esc(recipeTitleOf(x))}</button>`
        )
        .join('') || '<p class="muted">Geen recepten gevonden.</p>';
  };
  show();
  input.addEventListener('input', show);
  return new Promise(resolve => {
    const done = value => {
      el.remove();
      resolve(value);
    };
    results.addEventListener('click', e => {
      const b = e.target.closest('[data-id]');
      if (b) done(b.dataset.id);
    });
    el.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      results.querySelector('[data-id]')?.click();
    });
    el.querySelector('[data-cancel]').addEventListener('click', () => done(null));
    el.querySelector('[data-unlink]')?.addEventListener('click', () => done(''));
    closableModal(el, () => done(null));
    setTimeout(() => input.focus(), 0);
  });
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
  const r = findRecipe(id);
  if (!r) return;
  if (r.teamId) return deleteTeamRecipe(r);
  if (!(await askConfirm(`Weet je zeker dat je ‘${r.title}’ uit je receptenbibliotheek wilt verwijderen?`))) return;
  const result = await deleteOwnRecipes([id]);
  if (!result.done) {
    toast('Recept kon niet worden verwijderd; probeer het opnieuw');
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
  // In de demo bestaat het recept niet in de database: een openbare link kan dan niet.
  if (demoMode) return toast('In de demo kun je geen recepten delen. Maak een gratis account om te delen.');
  activeShareTitle = r.title;
  let slug = '';
  let share = null;
  try {
    const { data, error } = await supabaseClient.rpc('create_public_recipe_share', { _recipe_id: r.id });
    if (error) throw error;
    slug = data?.slug || '';
    share = data;
  } catch (e) {
    console.error('Public share aanmaken mislukt', e);
    toast('Openbare link kon niet worden aangemaakt');
    return;
  }
  activeShareUrl = location.origin + '/r/' + encodeURIComponent(slug);
  $('shareLink').textContent = activeShareUrl;
  $('shareModal').classList.add('open');
  renderShareLinkState(r.id, share);
  renderShareCopyToggle(r.id);
}

function shareWhatsApp() {
  if (!activeShareUrl || !shareLinkUsable()) return;
  window.open(
    'https://wa.me/?text=' + encodeURIComponent(activeShareTitle + ' — ' + linkWithSource(activeShareUrl, 'whatsapp')),
    '_blank',
    'noopener'
  );
}

function shareTelegram() {
  if (!activeShareUrl || !shareLinkUsable()) return;
  window.open(
    'https://t.me/share/url?url=' +
      encodeURIComponent(linkWithSource(activeShareUrl, 'telegram')) +
      '&text=' +
      encodeURIComponent(activeShareTitle),
    '_blank',
    'noopener'
  );
}

// SMS: opent de berichten-app met de link al ingevuld (iPhone en Android).
function shareSms() {
  if (!activeShareUrl || !shareLinkUsable()) return;
  const body = activeShareTitle + ' — ' + linkWithSource(activeShareUrl, 'sms');
  window.location.href = 'sms:?&body=' + encodeURIComponent(body);
}

function shareEmail() {
  if (!activeShareUrl || !shareLinkUsable()) return;
  window.location.href =
    'mailto:?subject=' +
    encodeURIComponent('Savour · ' + activeShareTitle) +
    '&body=' +
    encodeURIComponent('Bekijk dit recept in Savour:\n\n' + linkWithSource(activeShareUrl, 'email'));
}

function closeShare() {
  $('shareModal').classList.remove('open');
}

function copyShare() {
  if (!shareLinkUsable()) return;
  navigator.clipboard?.writeText($('shareLink').textContent);
  toast('Deellink gekopieerd');
  closeShare();
}
