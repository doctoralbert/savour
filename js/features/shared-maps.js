// Gedeelde mappen: samenwerken met collega's.

// Rechten binnen een gedeelde map: owner beheert, editor voegt toe en bewerkt, viewer bekijkt.
// Let op: dit bepaalt alleen wat de interface toont. De database (Supabase RLS) moet dezelfde regels afdwingen.
function isSharedMapOwner(m) {
  return !!currentUser && !!m && String(m.ownerId) === String(currentUser.id);
}

function canEditShared(m) {
  return (
    isSharedMapOwner(m) ||
    !!m?.members?.some(
      x => String(x.userId) === String(currentUser?.id) && ['owner', 'editor'].includes(String(x.role))
    )
  );
}

function canManageShared(m) {
  return isSharedMapOwner(m);
}

function findSharedMap(id) {
  return (sharedMaps || []).find(m => String(m.id) === String(id));
}

function newSharedMap() {
  $('newSharedName').value = '';
  $('newSharedModal').classList.add('open');
}

function closeNewShared() {
  $('newSharedModal').classList.remove('open');
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

async function openShared(id) {
  currentShared = String(id);
  const m = sharedMaps.find(x => String(x.id) === currentShared);
  if (!m) {
    const { data: map, error } = await supabaseClient
      .from('shared_maps')
      .select('id,owner_id,name,photo_url,public_key,created_at')
      .eq('id', currentShared)
      .maybeSingle();
    if (error) {
      console.error(error);
      toast(error.message || 'Gedeelde map kon niet worden geladen');
      return;
    }
    if (!map) {
      toast('Deze gedeelde map bestaat niet meer of je hebt geen toegang.');
      return;
    }
    const [{ data: smr }, { data: smf }, { data: smfr }, { data: smm }] = await Promise.all([
      supabaseClient.from('shared_map_recipes').select('shared_map_id,recipe_id').eq('shared_map_id', currentShared),
      supabaseClient.from('shared_folders').select('id,shared_map_id,name').eq('shared_map_id', currentShared),
      supabaseClient.from('shared_folder_recipes').select('shared_folder_id,recipe_id'),
      supabaseClient.from('shared_map_members').select('shared_map_id,user_id,role').eq('shared_map_id', currentShared)
    ]);
    const recipeIds = (smr || []).map(x => x.recipe_id);
    const foldersForMap = (smf || [])
      .filter(f => f.name !== 'A t/m Z')
      .map(f => ({
        id: f.id,
        name: f.name,
        recipeIds: (smfr || []).filter(x => x.shared_folder_id === f.id).map(x => x.recipe_id),
        system: false
      }));
    sharedMaps = [
      {
        id: map.id,
        name: map.name,
        recipeIds,
        folders: foldersForMap,
        photo: map.photo_url || '',
        members: (smm || []).map(x => ({
          name: x.user_id === currentUser.id ? 'Jij' : 'Teamlid',
          email: '',
          role: x.role,
          account: true,
          userId: x.user_id
        })),
        publicKey: map.public_key,
        ownerId: map.owner_id
      },
      ...sharedMaps.filter(x => String(x.id) !== currentShared)
    ];
  }
  renderSharedNav();
  go('shared');
}

function sharedFolderCount(m, f) {
  return f.recipeIds.length;
}

function sharedFolderCard(m, f) {
  return `<div class="shared-folder" onclick="openSharedFolder('${m.id}','${f.id}')"><span class="ico">▱</span><b>${esc(f.name)}</b><small>${sharedFolderCount(m, f)} recepten</small></div>`;
}

function newSharedFolder(mapId) {
  currentShared = String(mapId);
  $('newSharedFolderName').value = '';
  $('newSharedFolderModal').classList.add('open');
  setTimeout(() => $('newSharedFolderName')?.focus(), 30);
}

function closeSharedFolderModal() {
  $('newSharedFolderModal').classList.remove('open');
}

async function saveSharedPhoto(mapId, input) {
  if (!currentUser || !input?.files?.[0]) return;
  const m = sharedMaps.find(x => String(x.id) === String(mapId));
  if (!m || String(m.ownerId) !== String(currentUser.id)) {
    toast(t('Je hebt geen rechten om de foto te wijzigen'));
    return;
  }
  const file = input.files[0];
  if (file.size > 3 * 1024 * 1024) {
    toast(t('De foto is te groot. Maximum 3 MB.'));
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = async () => {
    const photo = String(reader.result || '');
    const { error } = await supabaseClient
      .from('shared_maps')
      .update({ photo_url: photo })
      .eq('id', mapId)
      .eq('owner_id', currentUser.id);
    if (error) {
      console.error('saveSharedPhoto', error);
      toast(error.message || t('Foto kon niet worden opgeslagen'));
      return;
    }
    await loadDatabaseState();
    currentShared = String(mapId);
    renderShared(mapId);
    toast(t('Foto opgeslagen'));
  };
  reader.onerror = () => toast(t('Foto kon niet worden gelezen'));
  reader.readAsDataURL(file);
}

function openSharedFolder(mapId, folderId) {
  currentShared = mapId;
  currentFolder = 'sharedfolder:' + folderId;
  window.sharedAlphabetLetter = '';
  go('sharedFolderDetail');
}

function renderShared(id) {
  const m = findSharedMap(id);
  if (!m) {
    $('sharedTitle').textContent = 'Gedeelde mappen';
    $('sharedWrap').innerHTML = '<div class="empty">Nog geen gedeelde mappen. Klik op “Gedeelde map toevoegen”.</div>';
    return;
  }
  const canEdit = canEditShared(m);
  const canManage = canManageShared(m);
  const isOwner = isSharedMapOwner(m);
  const mid = escAttr(m.id);
  const list = (m.recipeIds || []).map(rid => recipes.find(r => String(r.id) === String(rid))).filter(Boolean);
  $('sharedTitle').textContent = m.name;
  const photoInput = `<input type="file" accept="image/*" onchange="saveSharedPhoto('${mid}',this)" style="display:none">`;
  const photo = m.photo
    ? `<div class="shared-cover compact-shared-cover"><img src="${m.photo}" alt="Foto van ${esc(m.name)}"><div class="shared-cover-body"><label class="btn compact-action">✎<span>Foto wijzigen</span>${photoInput}</label></div></div>`
    : `<div class="shared-cover compact-shared-cover"><div class="shared-cover-empty"><label class="btn compact-action">＋<span>Foto toevoegen</span>${photoInput}</label></div></div>`;
  const foldersHtml = (m.folders || []).map(f => sharedFolderCard(m, f)).join('');
  const filtered = filterRecipesByLetter(list, window.sharedAlphabet);
  const recipeBlock = filtered.length
    ? '<div class="savour-v13-list">' + contextRecipeRowsHtml(filtered, 'shared') + '</div>'
    : '<div class="empty">Geen gedeelde recepten voor deze selectie.</div>';
  const actions =
    (canEdit
      ? `<button class="btn gold compact-action" onclick="openSharedRecipePicker('${mid}')">＋<span>Recept toevoegen</span></button>`
      : '') +
    (list.length
      ? `<button class="btn compact-action" onclick="printSharedMap('${mid}')">⎙<span>Print map</span></button>`
      : '') +
    `<button class="btn compact-action" onclick="inviteShared('${mid}')">♧<span>Team uitnodigen</span></button>` +
    (m.ownerId === currentUser.id
      ? `<button class="btn compact-action" onclick="renameSharedMap('${mid}')">✎<span>Naam wijzigen</span></button><button class="btn compact-action danger-action" onclick="deleteSharedMap('${mid}')">⌫<span>Verwijderen</span></button>`
      : '') +
    (isOwner
      ? `<button class="btn compact-action" title="Beheer gedeelde map" onclick="openSharedMapManage('${mid}')">⚙<span>Beheer</span></button>`
      : '');
  const members = (m.members || [])
    .map(
      (x, i) =>
        `<div class="member"><div><b>${esc(x.name)}</b><small class="muted">${x.account ? 'Account actief' : 'Uitgenodigd'}</small></div><select ${canManage ? '' : 'disabled'} onchange="changeMemberRole('${mid}',${i},this.value)"><option ${x.role === 'owner' ? 'selected' : ''}>owner</option><option ${x.role === 'editor' ? 'selected' : ''}>editor</option><option ${x.role === 'viewer' ? 'selected' : ''}>viewer</option></select></div>`
    )
    .join('');
  $('sharedWrap').innerHTML =
    photo +
    `<div class="layout"><div><div class="panel"><div class="folder-detail-head shared-main-head"><div><div class="eyebrow">Gedeelde map</div><h1>${esc(m.name)}</h1><p class="muted">${list.length} recepten · ${m.members.length} leden</p></div><div class="shared-map-actions">${actions}</div></div></div>` +
    `<div class="section-head"><h2>Mappen</h2>${canEdit ? `<button class="btn compact-action" onclick="newSharedFolder('${mid}')">＋<span>Nieuwe map</span></button>` : ''}</div><div class="shared-folder-grid">${foldersHtml}</div>` +
    `<div class="section-head" style="margin-top:30px"><h2>Alle gedeelde recepten</h2><span class="mini">${list.length} recepten</span></div>` +
    contextAlphabetHtml(window.sharedAlphabet, 'filterSharedAlphabet') +
    `<div class="savour-v13-context-tools"><span class="mini">${filtered.length} recepten${window.sharedAlphabet ? ' · ' + window.sharedAlphabet : ''}</span></div>` +
    recipeBlock +
    `</div><aside class="rightcol"><div class="partner-slot"><small>Partnerpositie</small><b>Adverteer hier richting professionele keukens.</b><span>Een rustige positie naast de dagelijkse workflow, zonder de recepten te onderbreken.</span></div>` +
    `<div class="panel"><h3>Openbare uitnodigingslink</h3><div class="sharelink">https://savour.page/join/${esc(m.publicKey)}</div><button class="btn" style="width:100%;margin-top:10px" onclick="inviteShared('${mid}')">Link delen</button></div>` +
    `<div class="panel"><h3>Keukenteam</h3>${members}${canManage ? `<button class="btn" style="width:100%;margin-top:12px" onclick="openMember('${mid}')">＋ Persoon toevoegen</button>` : ''}</div>` +
    `<div class="panel"><h3>Rechten</h3><p class="muted" style="line-height:1.5;margin:0">Owner beheert de map. Editor kan recepten toevoegen en bewerken. Viewer kan recepten bekijken.</p></div></aside></div>`;
}

function openSharedMapManage(id) {
  currentShared = id;
  go('sharedMapManage');
}

function renderSharedFolderDetail() {
  if (!currentUser) return;
  const m = findSharedMap(currentShared);
  const f = m?.folders?.find(x => String(x.id) === String(currentFolder).replace(/^sharedfolder:/, ''));
  if (!m || !f) {
    go('shared');
    return;
  }
  const list = (f.recipeIds || []).map(id => recipes.find(r => String(r.id) === String(id))).filter(Boolean);
  const filtered = filterRecipesByLetter(list, window.sharedFolderAlphabet);
  const body = filtered.length
    ? '<div class="savour-v13-list">' + contextRecipeRowsHtml(filtered, 'sharedFolder') + '</div>'
    : '<div class="empty">Deze gedeelde map bevat geen recepten voor deze selectie.</div>';
  $('sharedFolderDetailWrap').innerHTML =
    '<div class="shared-folder-head"><div><div class="eyebrow">Gedeelde map · ' +
    esc(m.name) +
    '</div><h1>' +
    esc(f.name) +
    '</h1><span class="pill">' +
    list.length +
    ' recepten</span></div><div class="folder-map-actions">' +
    (list.length
      ? '<button class="btn compact-action" onclick="printSharedFolder(\'' +
        escAttr(m.id) +
        "','" +
        escAttr(f.id) +
        '\')">⎙<span>Print map</span></button>'
      : '') +
    (f.system
      ? ''
      : '<button class="btn gold compact-action" onclick="openSharedFolderRecipePicker(\'' +
        escAttr(m.id) +
        "','" +
        escAttr(f.id) +
        '\')">＋<span>Recept toevoegen</span></button>') +
    '</div></div><div style="margin-top:18px">' +
    contextAlphabetHtml(window.sharedFolderAlphabet, 'filterSharedFolderAlphabet') +
    '</div><div class="savour-v13-context-tools"><span class="mini">' +
    filtered.length +
    ' recepten' +
    (window.sharedFolderAlphabet ? ' · ' + window.sharedFolderAlphabet : '') +
    '</span></div>' +
    body;
}

function openSharedRecipePicker(id) {
  const m = findSharedMap(id);
  if (!m) return;
  if (!canEditShared(m)) {
    toast('Je hebt geen rechten om recepten toe te voegen aan deze gedeelde map');
    return;
  }
  currentFolder = 'shared:' + id;
  $('folderModalTitle').textContent = 'Recepten aan gedeelde map toevoegen';
  $('pickerSearch').value = '';
  filterPicker('');
  $('folderModal').classList.add('open');
  folderTargetRecipe = null;
}

function openSharedFolderRecipePicker(mapId, folderId) {
  const m = findSharedMap(mapId),
    f = m?.folders?.find(x => String(x.id) === String(folderId));
  if (!m || !f) return;
  if (!canEditShared(m)) {
    toast('Je hebt geen rechten om recepten toe te voegen aan deze gedeelde map');
    return;
  }
  folderTargetRecipe = null;
  currentShared = mapId;
  currentFolder = 'sharedfolderpick:' + folderId;
  $('folderModalTitle').textContent = 'Recepten aan gedeelde map toevoegen';
  $('pickerSearch').value = '';
  filterPicker('');
  $('folderModal').classList.add('open');
}

async function createSharedFolder() {
  const m = findSharedMap(currentShared);
  if (!canEditShared(m)) {
    toast('Alleen een beheerder of editor kan een gedeelde map aanmaken');
    return;
  }
  if (!currentUser) return;
  if (!m || String(m.ownerId) !== String(currentUser.id)) {
    toast(t('Je hebt geen rechten om een map toe te voegen'));
    return;
  }
  const name = $('newSharedFolderName').value.trim();
  if (!name) return;
  if (m.folders.some(f => String(f.name).trim().toLowerCase() === name.toLowerCase())) {
    toast(t('Deze map bestaat al'));
    return;
  }
  const { error } = await supabaseClient.from('shared_folders').insert({ shared_map_id: m.id, name });
  if (error) {
    console.error('createSharedFolder', error);
    toast(error.message || t('Map kon niet worden aangemaakt'));
    return;
  }
  closeSharedFolderModal();
  await loadDatabaseState();
  currentShared = m.id;
  renderShared(m.id);
  toast(t('Map aangemaakt'));
}

async function saveSharedMapSelection() {
  const id = String(currentFolder).slice(7);
  if (!canEditShared(findSharedMap(id))) {
    toast('Je hebt geen rechten om recepten toe te voegen');
    return;
  }
  const ids = [...document.querySelectorAll('[data-shared-check]:checked')].map(x => x.dataset.sharedCheck);
  for (const recipeId of ids) {
    const { error } = await supabaseClient
      .from('shared_map_recipes')
      .upsert({ shared_map_id: id, recipe_id: recipeId }, { onConflict: 'shared_map_id,recipe_id' });
    if (error) {
      console.error(error);
      toast(error.message || 'Recept kon niet aan de gedeelde map worden toegevoegd');
      return;
    }
  }
  closeFolderModal();
  await loadDatabaseState();
  renderShared(id);
  toast('Recepten toegevoegd aan gedeelde map');
}

async function saveSharedFolderSelection() {
  if (!canEditShared(findSharedMap(currentShared))) {
    toast('Je hebt geen rechten om recepten toe te voegen');
    return;
  }
  const fid = String(currentFolder).slice(17);
  const ids = [...document.querySelectorAll('[data-shared-folder-check]:checked')].map(
    x => x.dataset.sharedFolderCheck
  );
  for (const recipeId of ids)
    await supabaseClient
      .from('shared_folder_recipes')
      .upsert({ shared_folder_id: fid, recipe_id: recipeId }, { onConflict: 'shared_folder_id,recipe_id' });
  closeFolderModal();
  await loadDatabaseState();
  renderSharedFolderDetail();
  toast('Recepten toegevoegd aan gedeelde map');
}

// Gedeelde mappen in de zijbalk (alleen de gekozen mappen, in eigen volgorde), plus snelknop.
function renderSharedNav() {
  const el = $('sharedNav');
  if (!el) return;
  const s = getSharedMenuSettings();
  const map = new Map(sharedMaps.map(m => [String(m.id), m]));
  const chosen = s.order
    .map(id => map.get(id))
    .filter(Boolean)
    .filter(m => s.selected.includes(String(m.id)));
  el.innerHTML = chosen
    .map(
      m =>
        `<button class="sub" onclick="openShared('${escAttr(m.id)}')"><span class="ico">▱</span>${esc(m.name)}</button>`
    )
    .join('');
  addQuickButton('sharedNav', 'Gedeelde map toevoegen', () => newSharedMap());
}

function renderSharedManage() {
  if (!currentUser) return;
  const host = $('manageSharedMaps');
  if (!host) return;
  const list = getOrderedSharedMaps();
  host.innerHTML = list.length
    ? list
        .map(m => managerItemHtml('shared', m, (getSharedMenuSettings()?.selected || []).includes(String(m.id))))
        .join('')
    : '<div class="empty">Nog geen gedeelde mappen. Maak je eerste map aan.</div>';
}

// Beheerpagina van één gedeelde map: naam, foto, deellink en leden met rechten.
function renderSharedMapManage(id) {
  id = id || currentShared;
  currentShared = id;
  const m = findSharedMap(id),
    host = $('sharedMapManageWrap');
  if (!host) return;
  if (!m) {
    host.innerHTML = '<div class="empty">Gedeelde map niet gevonden.</div>';
    return;
  }
  const own = isSharedMapOwner(m),
    members = m.members || [],
    mid = escAttr(m.id),
    cover = m.photo
      ? '<img class="savour-v30-cover" src="' + escAttr(m.photo) + '" alt="Foto van ' + esc(m.name) + '">'
      : '<div class="savour-v30-cover-empty">Nog geen foto voor deze gedeelde map.</div>',
    shareUrl = 'https://savour.page/join/' + encodeURIComponent(m.publicKey || m.id);
  host.innerHTML =
    '<div class="section-head"><div><div class="eyebrow">Gedeelde map beheren</div><h1 style="font-family:Playfair Display;margin:6px 0 4px">' +
    esc(m.name) +
    '</h1><p class="muted" style="margin:0">' +
    members.length +
    ' leden · ' +
    (m.recipeIds || []).length +
    ' recepten</p></div><button class="btn" onclick="go(\'shared\')">← Terug</button></div><div class="savour-v30-manage-grid"><div class="savour-v30-manage-card"><h3>Algemeen</h3>' +
    cover +
    '<div class="savour-v30-manage-actions">' +
    (own
      ? '<button class="btn" onclick="renameSharedMap(\'' +
        mid +
        '\')">Naam wijzigen</button><label class="btn">Afbeelding wijzigen<input type="file" accept="image/*" onchange="saveSharedPhoto(\'' +
        mid +
        '\',this)" style="display:none"></label><button class="btn" style="border-color:#704a43;color:#d5aaa0" onclick="deleteSharedMap(\'' +
        mid +
        '\')">Gedeelde map verwijderen</button>'
      : '<span class="muted">Alleen de eigenaar kan de mapinstellingen wijzigen.</span>') +
    '</div><div style="margin-top:18px"><h3>Delen</h3><div class="sharelink">' +
    esc(shareUrl) +
    '</div><div class="savour-v30-manage-actions" style="margin-top:10px"><button class="btn gold" onclick="inviteShared(\'' +
    mid +
    '\')">Delen / uitnodigen</button><button class="btn" onclick="navigator.clipboard?.writeText(\'' +
    escAttr(shareUrl) +
    '\').then(()=>toast(\'Link gekopieerd\'))">Link kopiëren</button></div></div></div><div class="savour-v30-manage-card"><h3>Leden & rechten</h3><p class="muted" style="font-size:12px;line-height:1.5">Owner beheert de map. Editor kan recepten toevoegen en bewerken. Viewer kan recepten bekijken.</p><div>' +
    members
      .map(
        (x, i) =>
          '<div class="savour-v30-member"><div><b>' +
          esc(x.name || 'Teamlid') +
          '</b><small class="muted" style="display:block">' +
          esc(x.email || '') +
          (x.account ? ' · account actief' : '') +
          '</small></div><select ' +
          (!own ? 'disabled' : '') +
          ' onchange="changeMemberRole(\'' +
          mid +
          "'," +
          i +
          ',this.value)"><option value="owner" ' +
          (x.role === 'owner' ? 'selected' : '') +
          '>Owner</option><option value="editor" ' +
          (x.role === 'editor' ? 'selected' : '') +
          '>Editor</option><option value="viewer" ' +
          (x.role === 'viewer' ? 'selected' : '') +
          '>Viewer</option></select></div>'
      )
      .join('') +
    '</div>' +
    (own
      ? '<button class="btn" style="margin-top:12px;width:100%" onclick="openMember(\'' +
        mid +
        '\')">＋ Lid toevoegen</button>'
      : '') +
    '</div></div>';
}

async function removeRecipeFromShared(id) {
  const m = sharedMaps.find(x => x.id === currentShared);
  if (!m || !currentUser) return;
  if (!confirm('Recept uit deze gedeelde map verwijderen? Het blijft beschikbaar in Alle recepten.')) return;

  // Alleen de koppeling met deze gedeelde map verwijderen. Het recept zelf
  // wordt hier NOOIT uit public.recipes verwijderd.
  const { error } = await supabaseClient
    .from('shared_map_recipes')
    .delete()
    .eq('shared_map_id', m.id)
    .eq('recipe_id', id);
  if (error) {
    console.error(error);
    toast(error.message || 'Recept kon niet uit de gedeelde map worden verwijderd');
    return;
  }

  // Verwijder eventuele koppelingen met submappen binnen alleen deze map.
  const { data: mapFolders } = await supabaseClient.from('shared_folders').select('id').eq('shared_map_id', m.id);
  for (const f of mapFolders || []) {
    const { error: fe } = await supabaseClient
      .from('shared_folder_recipes')
      .delete()
      .eq('shared_folder_id', f.id)
      .eq('recipe_id', id);
    if (fe) {
      console.error(fe);
      toast(fe.message || 'Recept kon niet uit een gedeelde map worden verwijderd');
      return;
    }
  }

  // Extra veiligheidscontrole: het persoonlijke recept moet nog bestaan.
  const { data: stillThere, error: checkError } = await supabaseClient
    .from('recipes')
    .select('id')
    .eq('id', id)
    .eq('user_id', currentUser.id)
    .maybeSingle();
  if (checkError) {
    console.error(checkError);
    toast('Controle van het persoonlijke recept is mislukt');
    return;
  }
  if (!stillThere) {
    toast('WAARSCHUWING: het persoonlijke recept kon niet worden gevonden');
    await loadDatabaseState();
    renderRecipes();
    return;
  }

  await loadDatabaseState();
  renderShared(m.id);
  toast('Recept uit gedeelde map verwijderd; persoonlijke recept behouden');
}

async function removeRecipeFromSharedFolder(id) {
  const m = sharedMaps.find(x => x.id === currentShared);
  const f = m?.folders?.find(x => x.id === String(currentFolder).replace(/^sharedfolder:/, ''));
  if (!m || !f || f.system) return;
  if (!confirm('Recept uit deze map verwijderen? Het blijft in de gedeelde map en in Alle recepten.')) return;
  const { error } = await supabaseClient
    .from('shared_folder_recipes')
    .delete()
    .eq('shared_folder_id', f.id)
    .eq('recipe_id', id);
  if (error) {
    console.error(error);
    toast('Recept kon niet uit de gedeelde map worden verwijderd');
    return;
  }
  await loadDatabaseState();
  renderSharedFolderDetail();
  toast('Recept uit gedeelde map verwijderd');
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

async function deleteSharedMap(id) {
  if (!currentUser) return;
  const m = sharedMaps.find(x => String(x.id) === String(id));
  if (!m || String(m.ownerId) !== String(currentUser.id)) return;
  if (
    !confirm(
      `Weet je zeker dat je de gedeelde map “${m.name}” wilt verwijderen?\n\nDe gedeelde map en de indeling worden verwijderd. Je persoonlijke recepten blijven behouden.`
    )
  )
    return;
  if (demoMode) {
    sharedMaps = sharedMaps.filter(x => String(x.id) !== String(id));
    if (String(currentShared) === String(id)) currentShared = null;
    renderSharedManage();
    renderHome();
    go('sharedManage');
    return;
  }
  const { error } = await supabaseClient.from('shared_maps').delete().eq('id', id).eq('owner_id', currentUser.id);
  if (error) {
    console.error(error);
    toast(error.message || 'Gedeelde map kon niet worden verwijderd');
    return;
  }
  if (String(currentShared) === String(id)) currentShared = null;
  await loadDatabaseState();
  renderSharedManage();
  renderSharedNav();
  renderHome();
  go('sharedManage');
  toast('Gedeelde map verwijderd');
}

const sharedOrderStorageKey = () => `savour_shared_map_order_${currentUser?.id || 'local'}`;

function getOrderedSharedMaps() {
  return orderedByStoredIds(sharedMaps, sharedOrderStorageKey());
}

function getSharedMenuSettings() {
  const ids = sharedMaps.map(x => String(x.id));
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(`savour_shared_menu_${currentUser?.id || 'local'}`) || 'null');
  } catch (e) {}
  if (!saved) return { selected: ids, order: ids };
  const valid = new Set(ids);
  let order = Array.isArray(saved.order) ? saved.order.map(String).filter(id => valid.has(id)) : [];
  ids.forEach(id => {
    if (!order.includes(id)) order.push(id);
  });
  let selected = Array.isArray(saved.selected) ? saved.selected.map(String).filter(id => valid.has(id)) : [];
  const known = new Set(Array.isArray(saved.known) ? saved.known.map(String) : []);
  ids.forEach(id => {
    if (!known.has(id) && !selected.includes(id)) selected.push(id);
  });
  return { selected: [...new Set(selected)], order };
}

function saveSharedMenuSettings(selected, order) {
  const ids = sharedMaps.map(x => String(x.id));
  const valid = new Set(ids);
  const cleanOrder = [...new Set((order || ids).map(String).filter(id => valid.has(id)))];
  ids.forEach(id => {
    if (!cleanOrder.includes(id)) cleanOrder.push(id);
  });
  const cleanSelected = [...new Set((selected || []).map(String).filter(id => valid.has(id)))];
  localStorage.setItem(
    `savour_shared_menu_${currentUser?.id || 'local'}`,
    JSON.stringify({ selected: cleanSelected, order: cleanOrder, known: ids })
  );
}

function inviteShared(id) {
  let m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  currentShared = id;
  activeInviteTitle = m.name;
  const base = 'https://savour.page/join/' + encodeURIComponent(m.publicKey || m.id);
  $('inviteLink').textContent = base;
  $('inviteModal').classList.add('open');
}

function closeInvite() {
  $('inviteModal').classList.remove('open');
}

function copyInvite() {
  navigator.clipboard?.writeText($('inviteLink').textContent);
  toast('Uitnodigingslink gekopieerd');
}

function shareInviteWhatsApp() {
  const u = $('inviteLink').textContent;
  window.open(
    'https://wa.me/?text=' + encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour: ' + u),
    '_blank',
    'noopener'
  );
}

function shareInviteTelegram() {
  const u = $('inviteLink').textContent;
  window.open(
    'https://t.me/share/url?url=' +
      encodeURIComponent(u) +
      '&text=' +
      encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour'),
    '_blank',
    'noopener'
  );
}

function shareInviteEmail() {
  const u = $('inviteLink').textContent;
  window.location.href =
    'mailto:?subject=' +
    encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour') +
    '&body=' +
    encodeURIComponent('Je bent uitgenodigd voor de gedeelde map ' + activeInviteTitle + ' in Savour.\n\n' + u);
}

function openMember(id) {
  currentShared = id;
  $('memberName').value = '';
  $('memberEmail').value = '';
  $('memberRole').value = 'viewer';
  $('memberModal').classList.add('open');
}

function closeMember() {
  $('memberModal').classList.remove('open');
}

async function createMember() {
  const m = sharedMaps.find(x => x.id === currentShared);
  let name = $('memberName').value.trim();
  let email = $('memberEmail').value.trim();
  let role = $('memberRole').value;
  if (!m || !name || !email) return;
  toast('Het koppelen van teamleden aan echte accounts doen we in de volgende stap.');
  closeMember();
}

async function changeMemberRole(id, index, role) {
  const m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  const member = m.members[index];
  if (!member?.userId) {
    toast('Dit teamlid heeft nog geen gekoppeld account');
    return;
  }
  const { error } = await supabaseClient
    .from('shared_map_members')
    .update({ role })
    .eq('shared_map_id', id)
    .eq('user_id', member.userId);
  if (error) {
    console.error(error);
    toast('Rechten konden niet worden aangepast');
    return;
  }
  await loadDatabaseState();
  renderShared(id);
  toast('Rechten aangepast');
}
