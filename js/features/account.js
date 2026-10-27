// Account en instellingen: profiel, profielfoto, wachtwoord, thema en account verwijderen.

// Het gekozen thema ('dark' of 'light'); standaard donker.
function currentTheme() {
  return localStorage.getItem('savour_theme') === 'light' ? 'light' : 'dark';
}

// Past het thema toe. Het lichte thema geldt alleen binnen de app (ingelogd); publieke pagina's blijven donker.
function applyTheme(theme) {
  const value = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.savourTheme = value;
  document.body.classList.toggle('savour-light', !!currentUser && value === 'light');
  localStorage.setItem('savour_theme', value);
}

// Keuze uit Instellingen: direct toepassen en in het profiel bewaren (niet in de demo).
async function setTheme(theme) {
  const value = theme === 'light' ? 'light' : 'dark';
  applyTheme(value);
  if (currentUser && !demoMode) {
    const { error } = await supabaseClient.from('profiles').update({ theme: value }).eq('id', currentUser.id);
    if (error) {
      console.error('Thema opslaan mislukt:', error);
      toast(t('Weergave kon niet worden bewaard'));
    }
  }
}

async function saveAccount() {
  if (!currentUser) return;
  const name = $('accountName').value.trim();
  const organization = $('accountOrganization').value.trim();
  const email = $('accountEmail').value.trim();
  if (!email) {
    toast(t('Vul een geldig e-mailadres in'));
    return;
  }
  if (email !== currentUser.email) {
    const { data: authData, error: ae } = await supabaseClient.auth.updateUser({ email });
    if (ae) {
      console.error(ae);
      toast(ae.message || t('E-mailadres kon niet worden gewijzigd'));
      return;
    }
    const activeAuthEmail = authData?.user?.email || currentUser.email;
    if (activeAuthEmail !== email) {
      toast(t('Controleer je nieuwe e-mailadres om de wijziging te bevestigen'));
      return;
    }
    currentUser = authData.user;
  }
  const theme = localStorage.getItem('savour_theme') || 'dark';
  const { error } = await supabaseClient
    .from('profiles')
    .update({ name, organization, email: currentUser.email, theme })
    .eq('id', currentUser.id);
  if (error) {
    console.error(error);
    toast(t('Account kon niet worden opgeslagen'));
    return;
  }
  account = { ...account, name, organization, email: currentUser.email };
  updateProfileHeader();
  renderSettings();
  toast(t('Account opgeslagen'));
}

async function changePassword() {
  if (!currentUser) return;
  const value = $('accountPassword').value.trim();
  if (!value) {
    toast(t('Vul eerst een nieuw wachtwoord in'));
    return;
  }
  if (value.length < 6) {
    toast(t('Een wachtwoord moet minimaal 6 tekens bevatten'));
    return;
  }
  const { error } = await supabaseClient.auth.updateUser({ password: value });
  if (error) {
    console.error(error);
    toast(error.message || t('Wachtwoord kon niet worden gewijzigd'));
    return;
  }
  $('accountPassword').value = '';
  toast(t('Wachtwoord gewijzigd'));
}

function updateProfileHeader() {
  let a = document.querySelector('.profile .avatar');
  a.innerHTML = account.photo
    ? `<img src="${esc(account.photo)}" alt="Profielfoto">`
    : (account.name || 'M').charAt(0).toUpperCase();
  document.querySelector('.profile b').textContent = account.name || 'Mijn account';
  document.querySelector('.profile small').textContent = account.organization || '';
}

function startProfilePhoto(input) {
  let f = input.files[0];
  if (!f) return;
  let reader = new FileReader();
  reader.onload = e => openCrop(e.target.result, 'profile');
  reader.readAsDataURL(f);
}

function openCrop(src, target = 'profile') {
  cropTarget = target;
  cropImageSrc = src;
  cropZoom = 1;
  cropX = 0;
  cropY = 0;
  const img = $('cropImage');
  if (!img) return;
  img.src = src;
  img.onload = () => {
    positionCropImage();
  };
  $('cropZoom').value = '1';
  $('cropModal').classList.add('open');
  positionCropImage();
}

function positionCropImage() {
  const img = $('cropImage'),
    stage = $('cropStage');
  if (!img || !stage) return;
  const sw = stage.clientWidth || 360,
    sh = stage.clientHeight || 360,
    iw = img.naturalWidth || sw,
    ih = img.naturalHeight || sh;
  const scale = Math.max(sw / iw, sh / ih) * cropZoom;
  img.style.width = `${iw * scale}px`;
  img.style.height = `${ih * scale}px`;
  img.style.left = `${(sw - iw * scale) / 2 + cropX}px`;
  img.style.top = `${(sh - ih * scale) / 2 + cropY}px`;
}

function closeCrop() {
  cropTarget = null;
  cropImageSrc = '';
  $('cropModal')?.classList.remove('open');
}

// Zoomen en verslepen in het uitsnijvenster voor foto's.
function setupCropControls() {
  $('cropZoom')?.addEventListener('input', e => {
    cropZoom = Number(e.target.value) || 1;
    positionCropImage();
  });
  $('cropStage')?.addEventListener('pointerdown', e => {
    const stage = $('cropStage');
    if (!stage || !cropImageSrc) return;
    dragging = true;
    cropStartX = e.clientX;
    cropStartY = e.clientY;
    cropBaseX = cropX;
    cropBaseY = cropY;
    stage.setPointerCapture?.(e.pointerId);
    $('cropImage')?.classList.add('dragging');
  });
  $('cropStage')?.addEventListener('pointermove', e => {
    if (!dragging) return;
    cropX = cropBaseX + (e.clientX - cropStartX);
    cropY = cropBaseY + (e.clientY - cropStartY);
    positionCropImage();
  });
  $('cropStage')?.addEventListener('pointerup', () => {
    dragging = false;
    $('cropImage')?.classList.remove('dragging');
  });
  $('cropStage')?.addEventListener('pointercancel', () => {
    dragging = false;
    $('cropImage')?.classList.remove('dragging');
  });
}

async function saveCrop() {
  if (!cropTarget || !cropImageSrc) return;
  const img = $('cropImage'),
    stage = $('cropStage');
  if (!img || !stage) return;
  const canvas = document.createElement('canvas');
  const size = 320;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const sw = stage.clientWidth,
    sh = stage.clientHeight,
    iw = img.naturalWidth,
    ih = img.naturalHeight,
    scale = Math.max(sw / iw, sh / ih) * cropZoom;
  const left = (sw - iw * scale) / 2 + cropX,
    top = (sh - ih * scale) / 2 + cropY;
  const sx = Math.max(0, -left) / scale,
    sy = Math.max(0, -top) / scale,
    sSize = Math.min(iw - sx, ih - sy, sw / scale, sh / scale);
  ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, size, size);
  const data = canvas.toDataURL('image/jpeg', 0.88);
  if (cropTarget === 'profile' && currentUser) {
    const { error } = await supabaseClient.from('profiles').update({ avatar_url: data }).eq('id', currentUser.id);
    if (error) {
      console.error(error);
      toast(error.message || t('Profielfoto kon niet worden opgeslagen'));
      return;
    }
    account.photo = data;
    updateProfileHeader();
    renderSettings();
    toast(t('Profielfoto opgeslagen'));
  }
  closeCrop();
}

// Instellingen in delen: Account · Abonnement en organisatie · Weergave · Categorieën · Opschonen.
let settingsTab = 'account';

function showSettingsTab(tab) {
  settingsTab = tab;
  document.querySelectorAll('#settings [data-settings-tab]').forEach(el => {
    const on = el.dataset.settingsTab === tab;
    if (el.classList.contains('settings-pane')) el.hidden = !on;
    else {
      el.classList.toggle('on', on);
      // Op de telefoon schuift de tabbalk mee naar het gekozen tabblad.
      if (on) el.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }
  });
}

function renderSettings() {
  if (!currentUser) return;
  showSettingsTab(settingsTab);
  document.querySelectorAll('input[name="savourTheme"]').forEach(x => (x.checked = x.value === currentTheme()));
  $('accountName').value = account.name || '';
  $('accountOrganization').value = account.organization || '';
  $('accountEmail').value = account.email || '';
  $('accountPassword').value = account.password || '';
  $('accountAvatar').innerHTML = account.photo
    ? `<img src="${esc(account.photo)}" alt="Profielfoto">`
    : (account.name || 'M').charAt(0).toUpperCase();
  renderPlanSettings();
  renderTitleCleanup();
  $('settingsCategories').innerHTML = categories
    .map(
      c =>
        `<div class="member"><div><b>${esc(c)}</b></div><div style="display:flex;gap:7px;justify-content:flex-end"><button class="btn small" onclick="renameCategory('${escJs(c)}')">Naam wijzigen</button><button class="btn small" onclick="removeCategory('${escJs(c)}')">Verwijderen</button></div></div>`
    )
    .join('');
}

// ---- Receptnamen opschonen: nummers uit een receptenboek ("10.Asperges koken") ----
// Alleen eigen recepten, en alleen na bevestiging: de chef ziet vooraf wat er verandert.

function recipesWithTitleNumber() {
  return recipes.filter(r => stripTitleNumber(r.title) !== String(r.title || '').trim());
}

// Het blok "Recepten opschonen": nummers in namen en dubbele recepten. Altijd zichtbaar; zonder werk een geruststelling.
function renderTitleCleanup() {
  const panel = $('titleCleanupPanel');
  if (!panel) return;
  const found = recipesWithTitleNumber();
  const doubles = findDuplicateRecipeGroups();
  renderDuplicateCleanup(doubles);
  $('titleCleanup').innerHTML = '';
  if (!found.length && !doubles.length) {
    $('titleCleanup').innerHTML =
      '<p class="settings-ok">✓ Er is niets op te schonen: geen nummers voor receptnamen en geen dubbele recepten.</p>';
    return;
  }
  if (!found.length) return;
  const example = found[0];
  $('titleCleanup').innerHTML = `<p class="muted">${
    found.length === 1 ? '1 recept begint' : `${found.length} recepten beginnen`
  } met een nummer, bijvoorbeeld <span translate="no">“${esc(example.title)}”</span>. Savour kan die nummers weghalen: <span translate="no">“${esc(stripTitleNumber(example.title))}”</span>.</p><button class="btn gold" onclick="cleanRecipeTitleNumbers()">Nummers weghalen</button>`;
}

// ---- Dubbele recepten: precies hetzelfde (naam zonder nummer, opbrengst, ingrediënten, bereiding) ----
// Recepten met alleen dezelfde naam maar een andere inhoud tellen nooit als dubbel.

function findDuplicateRecipeGroups() {
  const sharedIds = new Set(
    sharedMaps.flatMap(m => [...m.recipeIds, ...m.folders.flatMap(f => f.recipeIds)]).map(String)
  );
  const folderIds = new Set(folders.flatMap(f => f.recipeIds).map(String));
  const favIds = new Set(favorites.map(String));
  // Welk exemplaar blijft: gedeeld, dan favoriet, dan in een map, dan met foto, dan het oudste.
  const score = r =>
    (sharedIds.has(String(r.id)) ? 1000 : 0) +
    (favIds.has(String(r.id)) ? 100 : 0) +
    (folderIds.has(String(r.id)) ? 10 : 0) +
    (r.photo ? 1 : 0);
  const groups = new Map();
  for (const r of recipes) {
    const fp = recipeFingerprint({ ...r, title: stripTitleNumber(r.title) });
    if (!groups.has(fp)) groups.set(fp, []);
    groups.get(fp).push(r);
  }
  return [...groups.values()]
    .filter(g => g.length > 1)
    .map(g => {
      const sorted = [...g].sort(
        (a, b) => score(b) - score(a) || String(a.createdAt).localeCompare(String(b.createdAt))
      );
      return { keep: sorted[0], remove: sorted.slice(1) };
    });
}

function renderDuplicateCleanup(groups) {
  const host = $('duplicateCleanup');
  if (!host) return;
  const count = groups.reduce((n, g) => n + g.remove.length, 0);
  host.innerHTML = count
    ? `<p class="muted">${count === 1 ? '1 recept staat' : `${count} recepten staan`} dubbel in je bibliotheek, bijvoorbeeld <span translate="no">“${esc(groups[0].keep.title)}”</span>. Van elk recept blijft er één staan.</p><button class="btn gold" onclick="cleanDuplicateRecipes()">Dubbele recepten opschonen</button>`
    : '';
}

async function cleanDuplicateRecipes() {
  const groups = findDuplicateRecipeGroups();
  const count = groups.reduce((n, g) => n + g.remove.length, 0);
  if (!count) return;
  const examples = groups
    .slice(0, 5)
    .map(g => `${g.keep.title} (${g.remove.length + 1}×)`)
    .join('\n');
  const more = groups.length > 5 ? `\n… en nog ${groups.length - 5}` : '';
  const ok = await askConfirm(
    `${count} dubbele recepten verwijderen?\n\nVan elk recept blijft er één staan. Alleen kopieën die precies hetzelfde zijn (naam, opbrengst, ingrediënten en bereiding) worden verwijderd. Mappen, favorieten en gedeelde mappen gaan over naar het recept dat blijft.\n\n${examples}${more}`,
    { confirmLabel: `${count} dubbele verwijderen` }
  );
  if (!ok) return;
  const removeIds = groups.flatMap(g => g.remove.map(r => r.id));
  const keeperOf = new Map(groups.flatMap(g => g.remove.map(r => [String(r.id), g.keep.id])));
  if (demoMode) {
    const gone = new Set(removeIds.map(String));
    favorites = [...new Set(favorites.map(id => keeperOf.get(String(id)) || id))];
    folders.forEach(f => (f.recipeIds = [...new Set(f.recipeIds.map(id => keeperOf.get(String(id)) || id))]));
    recipes = recipes.filter(r => !gone.has(String(r.id)));
  } else {
    // Eerst koppelingen naar het recept dat blijft, dan de kopieën verwijderen (zoals bij Verwijder recepten).
    const relink = [];
    folders.forEach(f =>
      f.recipeIds.forEach(
        id =>
          keeperOf.has(String(id)) &&
          relink.push(['folder_recipes', { folder_id: f.id, recipe_id: keeperOf.get(String(id)) }])
      )
    );
    favorites.forEach(
      id =>
        keeperOf.has(String(id)) &&
        relink.push(['favorites', { user_id: currentUser.id, recipe_id: keeperOf.get(String(id)) }])
    );
    sharedMaps.forEach(m =>
      m.recipeIds.forEach(
        id =>
          keeperOf.has(String(id)) &&
          relink.push(['shared_map_recipes', { shared_map_id: m.id, recipe_id: keeperOf.get(String(id)) }])
      )
    );
    const conflictKey = { folder_recipes: 'folder_id,recipe_id', shared_map_recipes: 'shared_map_id,recipe_id' };
    for (const [table, row] of relink) {
      const { error } = conflictKey[table]
        ? await supabaseClient.from(table).upsert(row, { onConflict: conflictKey[table] })
        : await supabaseClient.from(table).insert(row);
      // Bestaat de koppeling al (de bewaarde versie stond er ook), dan is dat prima.
      if (error && !/duplicate|unique/i.test(error.message || '')) console.warn('Koppeling overzetten', table, error);
    }
    let failed = 0;
    for (let i = 0; i < removeIds.length; i += 100) {
      const ids = removeIds.slice(i, i + 100);
      for (const table of ['folder_recipes', 'favorites', 'shared_map_recipes', 'shared_folder_recipes']) {
        const { error } = await supabaseClient.from(table).delete().in('recipe_id', ids);
        if (error) console.warn(`Koppelingen in ${table} konden niet worden verwijderd`, error);
      }
      const { error } = await supabaseClient.from('recipes').delete().in('id', ids).eq('user_id', currentUser.id);
      if (error) {
        console.error(error);
        failed += ids.length;
      }
    }
    await loadDatabaseState();
    if (failed) {
      renderRecipes();
      refreshSidebar();
      renderSettings();
      return toast(`${count - failed} dubbele recepten verwijderd, ${failed} niet gelukt. Probeer het opnieuw.`);
    }
  }
  renderRecipes();
  refreshSidebar();
  renderSettings();
  toast(`${count} dubbele recepten verwijderd`);
}

async function cleanRecipeTitleNumbers() {
  const found = recipesWithTitleNumber();
  if (!found.length) return;
  const examples = found
    .slice(0, 5)
    .map(r => `${r.title} → ${stripTitleNumber(r.title)}`)
    .join('\n');
  const more = found.length > 5 ? `\n… en nog ${found.length - 5}` : '';
  const ok = await askConfirm(`Nummers weghalen uit ${found.length} receptnamen?\n\n${examples}${more}`, {
    confirmLabel: 'Nummers weghalen'
  });
  if (!ok) return;
  let failed = 0;
  if (demoMode) found.forEach(r => (r.title = stripTitleNumber(r.title)));
  else {
    // Tien tegelijk: elke naam is anders, dus per recept één update.
    let next = 0;
    let done = 0;
    const work = async () => {
      while (next < found.length) {
        const r = found[next++];
        const { error } = await supabaseClient
          .from('recipes')
          .update({ title: stripTitleNumber(r.title) })
          .eq('id', r.id)
          .eq('user_id', currentUser.id);
        if (error) {
          console.error(error);
          failed++;
        }
        done++;
        if (done % 25 === 0) toast(`Receptnamen aanpassen… ${done} / ${found.length}`);
      }
    };
    await Promise.all(Array.from({ length: Math.min(10, found.length) }, work));
    await loadDatabaseState();
  }
  renderRecipes();
  renderSettings();
  toast(
    failed
      ? `${found.length - failed} receptnamen aangepast, ${failed} niet gelukt. Probeer het opnieuw.`
      : `${found.length} receptnamen aangepast`
  );
}

// Extend folder modal save for shared maps without changing the regular folder flow.
async function deleteAccount() {
  if (!currentUser) return;
  const ok = await askConfirm(
    'Weet je zeker dat je je account definitief wilt verwijderen?\n\nJe persoonlijke recepten, mappen, favorieten en profielgegevens worden verwijderd. Deze actie kan niet ongedaan worden gemaakt.'
  );
  if (!ok) return;
  try {
    const { error } = await supabaseClient.rpc('delete_my_account');
    if (error) throw error;
    await supabaseClient.auth.signOut();
    currentUser = null;
    recipes = [];
    folders = [];
    favorites = [];
    sharedMaps = [];
    sharedRecipes = [];
    account = { name: '', organization: '', email: '', password: '', photo: '' };
    showLanding();
    toast('Account verwijderd');
  } catch (e) {
    console.error(e);
    toast(e.message || 'Account kon niet worden verwijderd');
  }
}

// Knop in de bovenbalk: wisselen tussen licht en donker (zelfde keuze als in Instellingen → Weergave).
function toggleTheme() {
  setTheme(currentTheme() === 'light' ? 'dark' : 'light');
}
