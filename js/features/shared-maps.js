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
  // Zelf een gedeelde map maken is Pro; lid zijn van andermans map blijft gratis.
  if (!demoMode && !isPro()) return askForProSharedMap();
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
    if (/savour_pro_required/.test(error.message || '')) {
      closeNewShared();
      return askForProSharedMap();
    }
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
  refreshSidebar();
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

// Eén map in een gedeelde map als compacte rij, zodat ook 20+ mappen (per partie, per menu) overzichtelijk blijven.
function sharedFolderCard(m, f) {
  return `<button type="button" class="shared-folder-row${f.archived ? ' is-archived' : ''}" onclick="openSharedFolder('${escJs(m.id)}','${escJs(f.id)}')"><span class="ico">▱</span><b>${esc(f.name)}</b><small>${sharedFolderCount(m, f)} recepten</small><i aria-hidden="true">›</i></button>`;
}

function sharedFoldersHtml(m) {
  const active = (m.folders || []).filter(f => !f.archived);
  const archived = (m.folders || []).filter(f => f.archived);
  if (!active.length && !archived.length) return '<div class="empty">Nog geen mappen in deze gedeelde map.</div>';
  return (
    `<div class="shared-folder-list">${active.map(f => sharedFolderCard(m, f)).join('')}</div>` +
    (archived.length
      ? `<details class="shared-folder-archive"><summary>Archief (${archived.length})</summary><div class="shared-folder-list">${archived.map(f => sharedFolderCard(m, f)).join('')}</div></details>`
      : '')
  );
}

// ---- Uitleg: wat kan er allemaal in een gedeelde map (info-knop) ----
const SHARED_HELP = [
  [
    'Eén receptenboek voor je team',
    'Een gedeelde map is het receptenboek van je keuken. Iedereen die lid is, ziet dezelfde recepten op zijn eigen telefoon, tablet of computer. Past de maker een recept aan, dan ziet iedereen meteen de nieuwe versie.'
  ],
  [
    'Rollen',
    'Eigenaar: beheert de map, de leden en hun rol. Editor: voegt recepten en mappen toe, haalt ze uit de map en beheert de mappen. Viewer: bekijkt, print en rekent om. Een recept bewerken kan altijd alleen de maker van dat recept.'
  ],
  [
    'Recepten toevoegen',
    'Kies “Recept toevoegen” en vink recepten uit je eigen bibliotheek aan. Het recept blijft van jou: het staat in de gedeelde map en in je eigen recepten.'
  ],
  [
    'Mappen (receptenklappers)',
    'Deel de gedeelde map op in mappen, bijvoorbeeld per partie of per menu. Met “Mappen beheren” wijzig je de naam, zet je de mappen in jouw volgorde en archiveer je mappen die je niet meer gebruikt. Recepten in een gearchiveerde map blijven bewaard en staan onderaan onder “Archief”.'
  ],
  [
    'Team uitnodigen',
    'Nodig collega’s uit via WhatsApp, Telegram, e-mail of de uitnodigingslink. Na het inloggen worden ze lid als viewer; de eigenaar kan daarna hun rol aanpassen. Lid zijn van een gedeelde map is gratis.'
  ],
  [
    'Printen',
    'Print de hele gedeelde map, één map of een eigen selectie in één keer: met een inhoudsopgave, het nummer van elk recept onderaan de pagina en, met Savour Pro, het logo van je restaurant.'
  ],
  [
    'Omrekenen en kookmodus',
    'Reken elk recept om naar een andere opbrengst. De kookmodus toont alleen het recept in grote letters en houdt je scherm aan; vink ingrediënten en stappen af terwijl je werkt.'
  ],
  [
    'Recept overnemen',
    'Heeft de maker het toegestaan, dan zie je bij een recept “Toevoegen aan mijn recepten”. Je krijgt een eigen kopie die je zelf kunt aanpassen.'
  ],
  [
    'Zonder internet',
    'Recepten die je hebt geopend, blijven op je apparaat beschikbaar, ook in een keuken zonder wifi.'
  ],
  [
    'Map verlaten of verwijderen',
    'Een lid kan een gedeelde map altijd verlaten. Alleen de eigenaar kan de map verwijderen; de recepten zelf blijven dan in de bibliotheek van hun maker.'
  ]
];

function openSharedHelp() {
  let modal = $('sharedHelpModal');
  if (!modal) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="modal" id="sharedHelpModal" onclick="if(event.target===this)this.classList.remove('open')"><div class="modalbox shared-help-box"><div class="eyebrow">${t('Gedeelde map')}</div><h2>${t('Zo werkt een gedeelde map')}</h2><div class="shared-help">${SHARED_HELP.map(([h, p]) => `<section><h3>${esc(t(h))}</h3><p>${esc(t(p))}</p></section>`).join('')}</div><div class="actions"><a class="btn" href="${{ nl: '/blog/gedeelde-mappen-uitgelegd', en: '/en/blog/shared-folders-explained', de: '/de/blog/geteilte-ordner-erklaert', es: '/es/blog/carpetas-compartidas-explicadas' }[currentLanguage] || '/blog/gedeelde-mappen-uitgelegd'}" target="_blank" rel="noopener">${t('Lees het hele artikel')}</a><button class="btn gold" onclick="$('sharedHelpModal').classList.remove('open')">${t('Begrepen')}</button></div></div></div>`
    );
    modal = $('sharedHelpModal');
  }
  modal.classList.add('open');
}

// ---- Mappen beheren: hernoemen, volgorde en archief (eigenaar en editors) ----
function openSharedFolderManage(mapId) {
  const m = findSharedMap(mapId);
  if (!m || !canEditShared(m)) return;
  if (!sharedFoldersManageable) {
    toast('Mappen beheren is nog niet beschikbaar');
    return;
  }
  currentShared = String(mapId);
  let modal = $('sharedFolderManageModal');
  if (!modal) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="modal" id="sharedFolderManageModal" onclick="if(event.target===this)closeSharedFolderManage()"><div class="modalbox folder-manage-box"><h2>${t('Mappen beheren')}</h2><p class="muted">${t('Pas de naam aan, zet de mappen in jouw volgorde of archiveer mappen die je niet meer gebruikt. Recepten in een gearchiveerde map blijven bewaard.')}</p><div id="sfmList" class="sfm-list"></div><div class="actions"><button class="btn gold" onclick="closeSharedFolderManage()">${t('Klaar')}</button></div></div></div>`
    );
    modal = $('sharedFolderManageModal');
  }
  renderSharedFolderManage();
  modal.classList.add('open');
}

function closeSharedFolderManage() {
  $('sharedFolderManageModal')?.classList.remove('open');
  if (currentShared) renderShared(currentShared);
}

function renderSharedFolderManage() {
  const m = findSharedMap(currentShared);
  const host = $('sfmList');
  if (!m || !host) return;
  const active = m.folders.filter(f => !f.archived);
  const archived = m.folders.filter(f => f.archived);
  const row = (f, i, list) => {
    const fid = escJs(f.id);
    return `<div class="sfm-row${f.archived ? ' is-archived' : ''}"><input value="${esc(f.name)}" aria-label="${esc(t('Naam van de map'))}" maxlength="80" onchange="renameSharedFolderInline('${fid}', this)"><span class="sfm-count">${f.recipeIds.length}</span>${
      f.archived
        ? ''
        : `<button type="button" class="sfm-move" onclick="moveSharedFolder('${fid}', -1)" aria-label="${esc(t('Omhoog'))}"${i === 0 ? ' disabled' : ''}>↑</button><button type="button" class="sfm-move" onclick="moveSharedFolder('${fid}', 1)" aria-label="${esc(t('Omlaag'))}"${i === list.length - 1 ? ' disabled' : ''}>↓</button>`
    }<button type="button" class="sfm-archive" onclick="archiveSharedFolder('${fid}', ${!f.archived})">${f.archived ? t('Terugzetten') : t('Archiveren')}</button></div>`;
  };
  host.innerHTML =
    (active.length ? active.map(row).join('') : `<p class="muted">${t('Geen actieve mappen.')}</p>`) +
    (archived.length ? `<h3 class="sfm-head">${t('Archief')}</h3>` + archived.map(row).join('') : '');
}

async function updateSharedFolder(folderId, changes) {
  const { error } = await supabaseClient.rpc('savour_update_shared_folder', { _folder_id: folderId, ...changes });
  if (error) {
    console.error('Map bijwerken mislukt', error);
    toast(
      /not_allowed/.test(error.message || '')
        ? 'Alleen de eigenaar of een editor kan mappen beheren'
        : 'De map kon niet worden bijgewerkt'
    );
    return false;
  }
  return true;
}

async function renameSharedFolderInline(folderId, input) {
  const m = findSharedMap(currentShared);
  const f = m?.folders.find(x => String(x.id) === String(folderId));
  const name = String(input.value || '').trim();
  if (!f || !name || name === f.name) {
    if (f) input.value = f.name;
    return;
  }
  if (await updateSharedFolder(f.id, { _name: name })) {
    f.name = name;
    toast('Naam gewijzigd');
  } else input.value = f.name;
}

async function moveSharedFolder(folderId, step) {
  const m = findSharedMap(currentShared);
  if (!m) return;
  const active = m.folders.filter(f => !f.archived);
  const i = active.findIndex(f => String(f.id) === String(folderId));
  const j = i + step;
  if (i < 0 || j < 0 || j >= active.length) return;
  [active[i], active[j]] = [active[j], active[i]];
  // Nieuwe volgorde vastleggen voor alle actieve mappen (10, 20, 30, ...).
  const results = await Promise.all(active.map((f, k) => updateSharedFolder(f.id, { _position: (k + 1) * 10 })));
  if (results.every(Boolean)) active.forEach((f, k) => (f.position = (k + 1) * 10));
  m.folders = [...active, ...m.folders.filter(f => f.archived)];
  renderSharedFolderManage();
}

async function archiveSharedFolder(folderId, archived) {
  const m = findSharedMap(currentShared);
  const f = m?.folders.find(x => String(x.id) === String(folderId));
  if (!f || !(await updateSharedFolder(f.id, { _archived: archived }))) return;
  f.archived = archived;
  m.folders = [...m.folders.filter(x => !x.archived), ...m.folders.filter(x => x.archived)];
  renderSharedFolderManage();
  toast(archived ? 'Map gearchiveerd' : 'Map teruggezet');
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
  // Verkleind tot max. 2000px JPEG, zodat de foto de database niet onnodig zwaar maakt.
  let photo;
  try {
    photo = await compressPhoto(input.files[0], 1600);
  } catch {
    toast(t('Foto kon niet worden gelezen'));
    input.value = '';
    return;
  }
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
}

function openSharedFolder(mapId, folderId) {
  currentShared = mapId;
  currentFolder = 'sharedfolder:' + folderId;
  window.sharedFolderAlphabet = '';
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
  const mid = escJs(m.id);
  const list = (m.recipeIds || []).map(rid => findRecipe(rid)).filter(Boolean);
  $('sharedTitle').textContent = m.name;
  const photoInput = `<input type="file" accept="image/*" onchange="saveSharedPhoto('${mid}',this)" style="display:none">`;
  const photo = m.photo
    ? `<div class="shared-cover compact-shared-cover"><img src="${esc(m.photo)}" alt="Foto van ${esc(m.name)}"><div class="shared-cover-body"><label class="btn compact-action">✎<span>Foto wijzigen</span>${photoInput}</label></div></div>`
    : `<div class="shared-cover compact-shared-cover"><div class="shared-cover-empty"><label class="btn compact-action">＋<span>Foto toevoegen</span>${photoInput}</label></div></div>`;
  const foldersHtml = sharedFoldersHtml(m);
  const filtered = filterRecipesByLetter(list, window.sharedAlphabet);
  const recipeBlock = filtered.length
    ? '<div class="savour-v13-list">' + contextRecipeRowsHtml(filtered, 'shared') + '</div>'
    : '<div class="empty">Geen gedeelde recepten voor deze selectie.</div>';
  const actions =
    (canEdit
      ? `<button class="btn gold compact-action" onclick="openSharedRecipePicker('${mid}')">＋<span>Recept toevoegen</span></button>`
      : '') +
    (list.length
      ? `<button class="btn compact-action" onclick="printSharedMap('${mid}')">⎙<span>Recepten printen</span></button>`
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
        `<div class="member"><div><b>${esc(x.name)}</b><small class="muted member-sub">${esc(x.email || memberRoleLabel(m, x))}</small></div>${memberRoleControl(m, x, i)}</div>`
    )
    .join('');
  const teamButton = canManage
    ? `<button class="btn" style="width:100%;margin-top:12px" onclick="inviteShared('${mid}')">＋ Teamlid uitnodigen</button>`
    : `<button class="btn" style="width:100%;margin-top:12px" onclick="leaveSharedMap('${mid}')">Map verlaten</button>`;
  $('sharedWrap').innerHTML =
    photo +
    `<div class="layout"><div><div class="panel"><div class="folder-detail-head shared-main-head"><div><div class="eyebrow shared-eyebrow">Gedeelde map <button type="button" class="shared-help-btn" onclick="openSharedHelp()" aria-label="Uitleg over gedeelde mappen" title="Hoe werkt een gedeelde map?">i</button></div><h1>${esc(m.name)}</h1><p class="muted">${list.length} recepten · ${m.members.length} leden</p></div><div class="shared-map-actions">${actions}</div></div></div>` +
    `<div class="section-head"><h2>Mappen</h2><div class="shared-folder-tools">${canEdit ? `<button class="btn compact-action" onclick="newSharedFolder('${mid}')">＋<span>Nieuwe map</span></button>` : ''}${canEdit && (m.folders || []).length ? `<button class="btn compact-action" onclick="openSharedFolderManage('${mid}')">⚙<span>Mappen beheren</span></button>` : ''}</div></div>${foldersHtml}` +
    `<div class="section-head" style="margin-top:30px"><h2>Alle gedeelde recepten</h2><span class="mini">${list.length} recepten</span></div>` +
    contextAlphabetHtml(window.sharedAlphabet, 'filterSharedAlphabet') +
    `<div class="savour-v13-context-tools"><span class="mini">${filtered.length} recepten${window.sharedAlphabet ? ' · ' + window.sharedAlphabet : ''}</span></div>` +
    recipeBlock +
    `</div><aside class="rightcol"><div class="partner-slot"><small>Partnerpositie</small><b>Adverteer hier richting professionele keukens.</b><span>Een rustige positie naast de dagelijkse workflow, zonder de recepten te onderbreken.</span></div>` +
    `<div class="panel"><h3>Openbare uitnodigingslink</h3><div class="sharelink">https://savour.page/join/${esc(m.publicKey)}</div><button class="btn" style="width:100%;margin-top:10px" onclick="inviteShared('${mid}')">Link delen</button></div>` +
    `<div class="panel"><h3>Keukenteam</h3>${members}${teamButton}</div>` +
    `<div class="panel"><h3>Rechten</h3><p class="muted" style="line-height:1.5;margin:0">${SHARED_RIGHTS_TEXT}</p></div></aside></div>`;
}

function openSharedMapManage(id) {
  currentShared = id;
  go('sharedMapManage');
}

// Terug uit een map naar de gedeelde map waar die in zit (bijv. "← Kasteel Maurick").
function backToSharedMap() {
  if (currentShared && findSharedMap(currentShared)) openShared(currentShared);
  else go('sharedManage');
}

function renderSharedFolderDetail() {
  if (!currentUser) return;
  const m = findSharedMap(currentShared);
  const f = m?.folders?.find(x => String(x.id) === String(currentFolder).replace(/^sharedfolder:/, ''));
  if (!m || !f) {
    go('shared');
    return;
  }
  if ($('sharedFolderBack')) $('sharedFolderBack').textContent = `← ${m.name}`;
  const list = (f.recipeIds || []).map(id => findRecipe(id)).filter(Boolean);
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
        escJs(m.id) +
        "','" +
        escJs(f.id) +
        '\')">⎙<span>Print map</span></button>'
      : '') +
    (f.system
      ? ''
      : '<button class="btn gold compact-action" onclick="openSharedFolderRecipePicker(\'' +
        escJs(m.id) +
        "','" +
        escJs(f.id) +
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
  // Owner en editor mogen submappen maken.
  if (!currentUser || !m || !canEditShared(m)) {
    toast('Alleen de eigenaar of een editor kan een map aanmaken');
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
        `<button class="sub" onclick="openShared('${escJs(m.id)}')"><span class="ico">▱</span>${esc(m.name)}</button>`
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
    mid = escJs(m.id),
    cover = m.photo
      ? '<img class="savour-v30-cover" src="' + esc(m.photo) + '" alt="Foto van ' + esc(m.name) + '">'
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
    escJs(shareUrl) +
    '\').then(()=>toast(\'Link gekopieerd\'))">Link kopiëren</button></div></div></div><div class="savour-v30-manage-card"><h3>Leden & rechten</h3><p class="muted" style="font-size:12px;line-height:1.5">' +
    SHARED_RIGHTS_TEXT +
    '</p><div>' +
    members
      .map(
        (x, i) =>
          '<div class="savour-v30-member"><div><b>' +
          esc(x.name || 'Teamlid') +
          '</b><small class="muted" style="display:block">' +
          esc(x.email || memberRoleLabel(m, x)) +
          '</small></div><div class="member-actions">' +
          memberRoleControl(m, x, i) +
          (own && String(x.userId) !== String(m.ownerId)
            ? '<button class="btn small" onclick="removeSharedMember(\'' +
              mid +
              "','" +
              escJs(x.userId) +
              '\')">Verwijderen</button>'
            : '') +
          '</div></div>'
      )
      .join('') +
    '</div>' +
    (own
      ? '<button class="btn" style="margin-top:12px;width:100%" onclick="inviteShared(\'' +
        mid +
        '\')">＋ Teamlid uitnodigen</button>'
      : '<button class="btn" style="margin-top:12px;width:100%" onclick="leaveSharedMap(\'' +
        mid +
        '\')">Map verlaten</button>') +
    '</div></div>';
}

async function removeRecipeFromShared(id) {
  const m = sharedMaps.find(x => x.id === currentShared);
  if (!m || !currentUser) return;
  if (
    !(await askConfirm('Recept uit deze gedeelde map halen?\n\nHet blijft beschikbaar in Alle recepten.', {
      confirmLabel: 'Uit map halen',
      danger: false
    }))
  )
    return;

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
  if (
    !(await askConfirm('Recept uit deze map halen?\n\nHet blijft in de gedeelde map en in Alle recepten.', {
      confirmLabel: 'Uit map halen',
      danger: false
    }))
  )
    return;
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
  let next = await askText('Nieuwe naam voor deze gedeelde map', m.name);
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
    refreshSidebar();
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
  refreshSidebar();
  renderShared(id);
  toast('Gedeelde map hernoemd');
}

async function deleteSharedMap(id) {
  if (!currentUser) return;
  const m = sharedMaps.find(x => String(x.id) === String(id));
  if (!m || String(m.ownerId) !== String(currentUser.id)) return;
  if (
    !(await askConfirm(
      `Weet je zeker dat je de gedeelde map “${m.name}” wilt verwijderen?\n\nDe gedeelde map en de indeling worden verwijderd. Je persoonlijke recepten blijven behouden.`
    ))
  )
    return;
  if (demoMode) {
    sharedMaps = sharedMaps.filter(x => String(x.id) !== String(id));
    if (String(currentShared) === String(id)) currentShared = null;
    renderSharedManage();
    refreshSidebar();
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
  refreshSidebar();
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
  $('inviteEmail').value = '';
  $('inviteRole').value = 'viewer';
  $('inviteModal').classList.add('open');
}

// Teamlid direct toevoegen op e-mailadres. Bestaat er nog geen account, dan gaat er via het eigen
// mailprogramma van de eigenaar een uitnodiging met de link (Savour verstuurt zelf niets).
async function addMemberByEmail() {
  const m = findSharedMap(currentShared);
  const email = $('inviteEmail').value.trim();
  const role = $('inviteRole').value === 'editor' ? 'editor' : 'viewer';
  if (!m || !isSharedMapOwner(m)) return toast('Alleen de eigenaar kan teamleden toevoegen');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast('Vul een geldig e-mailadres in');
  let result;
  if (demoMode) {
    result = { status: 'added', name: email.split('@')[0], role };
    m.members.push({ name: result.name, role, userId: 'demo-' + Date.now(), email });
  } else {
    const { data, error } = await supabaseClient.rpc('add_shared_map_member_by_email', {
      _map_id: m.id,
      _email: email,
      _role: role
    });
    if (error) {
      console.error(error);
      return toast(
        /function|schema cache/i.test(error.message || '')
          ? 'Toevoegen via e-mail is nog niet beschikbaar: voer eerst de Supabase-update uit'
          : 'Teamlid kon niet worden toegevoegd'
      );
    }
    result = data || {};
  }
  if (result.status === 'added') {
    $('inviteEmail').value = '';
    if (!demoMode) await loadDatabaseState();
    if ($('sharedMapManage')?.classList.contains('active')) renderSharedMapManage(m.id);
    return toast(`${result.name} is toegevoegd als ${result.role === 'editor' ? 'editor' : 'viewer'}`);
  }
  if (result.status === 'already') return toast(`${result.name} is al lid van deze map`);
  if (result.status === 'owner') return toast('Dit is je eigen e-mailadres');
  if (
    await askConfirm(
      `Nog geen Savour-account voor ${email}\n\nStuur een uitnodiging per e-mail? Je eigen mailprogramma opent met de link. Na het aanmaken van een account opent de link de map.`,
      { confirmLabel: 'Uitnodiging mailen' }
    )
  )
    shareInviteEmail(email);
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
    'https://wa.me/?text=' +
      encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour: ' + linkWithSource(u, 'whatsapp')),
    '_blank',
    'noopener'
  );
}

function shareInviteTelegram() {
  const u = $('inviteLink').textContent;
  window.open(
    'https://t.me/share/url?url=' +
      encodeURIComponent(linkWithSource(u, 'telegram')) +
      '&text=' +
      encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour'),
    '_blank',
    'noopener'
  );
}

function shareInviteEmail(to = '') {
  const u = $('inviteLink').textContent;
  window.location.href =
    'mailto:' +
    String(to).replace(/[^\w.@+-]/g, '') +
    '?subject=' +
    encodeURIComponent('Uitnodiging voor ' + activeInviteTitle + ' in Savour') +
    '&body=' +
    encodeURIComponent(
      'Je bent uitgenodigd voor de gedeelde map ' + activeInviteTitle + ' in Savour.\n\n' + linkWithSource(u, 'email')
    );
}

async function changeMemberRole(id, index, role) {
  const m = findSharedMap(id);
  if (!m || !canManageShared(m) || !['editor', 'viewer'].includes(role)) return;
  const member = m.members[index];
  if (!member?.userId || String(member.userId) === String(m.ownerId)) return;
  if (demoMode) {
    member.role = role;
    toast('Rechten aangepast');
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
  if ($('sharedMapManage')?.classList.contains('active')) renderSharedMapManage(id);
  else renderShared(id);
  toast('Rechten aangepast');
}

// ---- Lid worden via een uitnodigingslink (/join/<sleutel>) ----
// De sleutel wordt bewaard tot de gebruiker is ingelogd. Dat kan ook na het aanmaken en bevestigen van een
// nieuw account in een ander tabblad; daarom localStorage, en hooguit 7 dagen geldig.
const PENDING_INVITE_KEY = 'savour_pending_invite';

function rememberInvite(key) {
  try {
    localStorage.setItem(PENDING_INVITE_KEY, JSON.stringify({ key, at: Date.now() }));
  } catch (e) {}
}

function takePendingInvite() {
  try {
    const saved = JSON.parse(localStorage.getItem(PENDING_INVITE_KEY) || 'null');
    localStorage.removeItem(PENDING_INVITE_KEY);
    if (saved?.key && Date.now() - Number(saved.at || 0) < 7 * 24 * 60 * 60 * 1000) return String(saved.key);
  } catch (e) {}
  return '';
}

// Voegt de ingelogde gebruiker toe aan de gedeelde map uit de bewaarde uitnodiging (als viewer).
async function acceptPendingInvite() {
  const key = takePendingInvite();
  if (!key || demoMode || !currentUser) return false;
  const { data, error } = await supabaseClient.rpc('join_shared_map', { _public_key: key });
  if (location.pathname.startsWith('/join/')) history.replaceState(null, '', '/');
  if (error || !data?.id) {
    console.error('Lid worden mislukt:', error);
    toast('Je kon niet aan de gedeelde map worden toegevoegd. Vraag een nieuwe uitnodigingslink.');
    return false;
  }
  await loadDatabaseState();
  await openShared(data.id);
  const m = findSharedMap(data.id);
  toast(
    m && isSharedMapOwner(m)
      ? 'Dit is je eigen gedeelde map.'
      : `Je bent lid van ${data.name}. De eigenaar bepaalt of je ook recepten mag toevoegen.`
  );
  return true;
}

// ---- Leden beheren ----

async function removeSharedMember(mapId, userId) {
  const m = findSharedMap(mapId);
  if (!m || !isSharedMapOwner(m) || String(userId) === String(m.ownerId)) return;
  const member = m.members.find(x => String(x.userId) === String(userId));
  if (
    !(await askConfirm(
      `${member?.name || 'Dit teamlid'} verwijderen uit “${m.name}”?\n\nDe recepten van dit teamlid verdwijnen uit de gedeelde map.`
    ))
  )
    return;
  if (demoMode) {
    m.members = m.members.filter(x => String(x.userId) !== String(userId));
    renderSharedMapManage(mapId);
    return;
  }
  const { error } = await supabaseClient
    .from('shared_map_members')
    .delete()
    .eq('shared_map_id', mapId)
    .eq('user_id', userId);
  if (error) {
    console.error(error);
    toast('Teamlid kon niet worden verwijderd');
    return;
  }
  await loadDatabaseState();
  renderSharedMapManage(mapId);
  toast('Teamlid verwijderd');
}

async function leaveSharedMap(mapId) {
  const m = findSharedMap(mapId);
  if (!m || !currentUser || isSharedMapOwner(m)) return;
  if (
    !(await askConfirm(
      `Weet je zeker dat je “${m.name}” wilt verlaten?\n\nJe eigen recepten blijven in je bibliotheek.`
    ))
  )
    return;
  if (!demoMode) {
    const { error } = await supabaseClient
      .from('shared_map_members')
      .delete()
      .eq('shared_map_id', mapId)
      .eq('user_id', currentUser.id);
    if (error) {
      console.error(error);
      toast('Je kon de gedeelde map niet verlaten');
      return;
    }
    await loadDatabaseState();
  } else sharedMaps = sharedMaps.filter(x => String(x.id) !== String(mapId));
  currentShared = null;
  renderSharedNav();
  go('sharedManage');
  toast('Je hebt de gedeelde map verlaten');
}
const SHARED_RIGHTS_TEXT =
  'Owner beheert de map en de leden. Editor kan recepten en mappen toevoegen en uit de map halen. Viewer kan recepten bekijken, printen en omrekenen. Alleen de maker van een recept kan het zelf bewerken.';

function memberRoleLabel(m, x) {
  if (x.role === 'owner' || String(x.userId) === String(m.ownerId)) return 'Eigenaar';
  return x.role === 'editor' ? 'Editor' : 'Viewer';
}

// Rolkeuze voor één teamlid. Alleen de eigenaar kiest, en de eigenaar zelf heeft geen keuze.
function memberRoleControl(m, x, i) {
  const isMapOwner = x.role === 'owner' || String(x.userId) === String(m.ownerId);
  if (isMapOwner || !canManageShared(m)) return `<span class="member-role">${memberRoleLabel(m, x)}</span>`;
  return `<select onchange="changeMemberRole('${escJs(m.id)}',${i},this.value)"><option value="editor" ${x.role === 'editor' ? 'selected' : ''}>Editor</option><option value="viewer" ${x.role !== 'editor' ? 'selected' : ''}>Viewer</option></select>`;
}
