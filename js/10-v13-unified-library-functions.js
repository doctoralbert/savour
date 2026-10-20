(function () {
  const v13Letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const v13Text = v => String(v ?? '').trim();
  const v13Title = r => v13Text(r?.title || 'Zonder titel');
  const v13Sorted = list =>
    (list || []).slice().sort((a, b) => v13Title(a).localeCompare(v13Title(b), 'nl', { sensitivity: 'base' }));
  function v13Alphabet(selected, handler) {
    return (
      '<div class="savour-v13-alphabet"><button class="' +
      (!selected ? 'active' : '') +
      '" onclick="' +
      handler +
      "('')\">Alle</button>" +
      v13Letters
        .map(
          l =>
            '<button class="' +
            (selected === l ? 'active' : '') +
            '" onclick="' +
            handler +
            "('" +
            l +
            '\')">' +
            l +
            '</button>'
        )
        .join('') +
      '</div>'
    );
  }
  function v13Rows(list, context) {
    const sorted = v13Sorted(list);
    return sorted
      .map((r, i) => {
        const id = escAttr(r.id);
        return (
          '<div class="savour-v13-row" role="button" tabindex="0" onclick="openRecipe(\'' +
          id +
          "','" +
          (context || '') +
          "')\" onkeydown=\"if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('" +
          id +
          "','" +
          (context || '') +
          '\')}"><span class="savour-v13-number">' +
          String(i + 1).padStart(3, '0') +
          '</span><span class="savour-v13-name">' +
          esc(v13Title(r)) +
          '</span><span class="savour-v13-arrow">›</span></div>'
        );
      })
      .join('');
  }
  function v13Filter(list, letter) {
    return (list || []).filter(r => !letter || v13Title(r).charAt(0).toUpperCase() === letter);
  }
  function v13Mount(host, list, letter, handler, context, empty) {
    const filtered = v13Filter(list, letter);
    host.innerHTML =
      v13Alphabet(letter, handler) +
      '<div class="savour-v13-context-tools"><span class="mini">' +
      filtered.length +
      ' recepten' +
      (letter ? ' · ' + letter : '') +
      '</span></div>' +
      (filtered.length
        ? '<div class="savour-v13-list">' + v13Rows(filtered, context) + '</div>'
        : '<div class="empty">' + (empty || 'Geen recepten gevonden.') + '</div>');
  }
  window.v13FolderAlphabet = '';
  window.v13SharedAlphabet = '';
  window.v13SharedFolderAlphabet = '';
  window.filterV13FolderAlphabet = function (letter) {
    window.v13FolderAlphabet = String(letter || '').toUpperCase();
    renderFolderDetail();
  };
  window.filterV13SharedAlphabet = function (letter) {
    window.v13SharedAlphabet = String(letter || '').toUpperCase();
    renderShared(currentShared);
  };
  window.filterV13SharedFolderAlphabet = function (letter) {
    window.v13SharedFolderAlphabet = String(letter || '').toUpperCase();
    renderSharedFolderDetail();
  };

  window.renderFolderDetail = function () {
    if (!currentUser) return;
    const f = folders.find(x => String(x.id) === String(currentFolder).replace(/^folderpick:/, ''));
    if (!f) {
      go('folders');
      return;
    }
    let list = (f.recipeIds || []).map(id => recipes.find(r => String(r.id) === String(id))).filter(Boolean);
    const q = v13Text(document.getElementById('globalSearch')?.value).toLocaleLowerCase('nl').trim();
    if (q) list = list.filter(r => v13Title(r).toLocaleLowerCase('nl').includes(q));
    const filtered = v13Filter(list, window.v13FolderAlphabet);
    const body = filtered.length
      ? '<div class="savour-v13-list">' + v13Rows(filtered, 'folder') + '</div>'
      : '<div class="empty">Deze map bevat geen recepten voor deze selectie.</div>';
    document.getElementById('folderDetailWrap').innerHTML =
      '<div class="folder-detail-head"><div><div class="eyebrow">Receptenmap</div><h1 style="font-family:\'Playfair Display\';font-size:40px;margin:7px 0">' +
      esc(f.name) +
      '</h1><span class="pill">' +
      list.length +
      ' recepten</span></div><div class="folder-map-actions">' +
      (list.length
        ? '<button class="btn compact-action" onclick="printFolder(\'' +
          escAttr(f.id) +
          '\')">⎙<span>Print map</span></button>'
        : '') +
      '<button class="btn compact-action" onclick="renameFolder(\'' +
      escAttr(f.id) +
      '\')">✎<span>Naam wijzigen</span></button><button class="btn compact-action" onclick="deleteFolder(\'' +
      escAttr(f.id) +
      '\')">×<span>Verwijderen</span></button><button class="btn compact-action" onclick="openRecipePickerForFolder(\'' +
      escAttr(f.id) +
      '\')">＋<span>Recept toevoegen</span></button></div></div><div style="margin-top:18px">' +
      v13Alphabet(window.v13FolderAlphabet, 'filterV13FolderAlphabet') +
      '</div><div class="savour-v13-context-tools"><span class="mini">' +
      filtered.length +
      ' recepten' +
      (window.v13FolderAlphabet ? ' · ' + window.v13FolderAlphabet : '') +
      '</span></div>' +
      body;
  };

  window.renderShared = function (id) {
    let m = sharedMaps.find(x => String(x.id) === String(id));
    if (!m) {
      $('sharedTitle').textContent = 'Gedeelde mappen';
      $('sharedWrap').innerHTML =
        '<div class="empty">Nog geen gedeelde mappen. Klik op “Gedeelde map toevoegen”.</div>';
      return;
    }
    let list = (m.recipeIds || []).map(rid => recipes.find(r => String(r.id) === String(rid))).filter(Boolean);
    $('sharedTitle').textContent = m.name;
    let photo = m.photo
      ? '<div class="shared-cover compact-shared-cover"><img src="' +
        m.photo +
        '" alt="Foto van ' +
        esc(m.name) +
        '"><div class="shared-cover-body"><label class="btn compact-action">✎<span>Foto wijzigen</span><input type="file" accept="image/*" onchange="saveSharedPhoto(\'' +
        escAttr(m.id) +
        '\',this)" style="display:none"></label></div></div>'
      : '<div class="shared-cover compact-shared-cover"><div class="shared-cover-empty"><label class="btn compact-action">＋<span>Foto toevoegen</span><input type="file" accept="image/*" onchange="saveSharedPhoto(\'' +
        escAttr(m.id) +
        '\',this)" style="display:none"></label></div></div>';
    let foldersHtml = (m.folders || []).map(f => sharedFolderCard(m, f)).join('');
    const filtered = v13Filter(list, window.v13SharedAlphabet);
    const recipeBlock = filtered.length
      ? '<div class="savour-v13-list">' + v13Rows(filtered, 'shared') + '</div>'
      : '<div class="empty">Geen gedeelde recepten voor deze selectie.</div>';
    $('sharedWrap').innerHTML =
      photo +
      '<div class="layout"><div><div class="panel"><div class="folder-detail-head shared-main-head"><div><div class="eyebrow">Gedeelde map</div><h1>' +
      esc(m.name) +
      '</h1><p class="muted">' +
      list.length +
      ' recepten · ' +
      m.members.length +
      ' leden</p></div><div class="shared-map-actions"><button class="btn gold compact-action" onclick="openSharedRecipePicker(\'' +
      escAttr(m.id) +
      '\')">＋<span>Recept toevoegen</span></button>' +
      (list.length
        ? '<button class="btn compact-action" onclick="printSharedMap(\'' +
          escAttr(m.id) +
          '\')">⎙<span>Print map</span></button>'
        : '') +
      '<button class="btn compact-action" onclick="inviteShared(\'' +
      escAttr(m.id) +
      '\')">♧<span>Team uitnodigen</span></button>' +
      (m.ownerId === currentUser.id
        ? '<button class="btn compact-action" onclick="renameSharedMap(\'' +
          escAttr(m.id) +
          '\')">✎<span>Naam wijzigen</span></button><button class="btn compact-action danger-action" onclick="deleteSharedMap(\'' +
          escAttr(m.id) +
          '\')">⌫<span>Verwijderen</span></button>'
        : '') +
      '</div></div></div><div class="section-head"><h2>Mappen</h2><button class="btn compact-action" onclick="newSharedFolder(\'' +
      escAttr(m.id) +
      '\')">＋<span>Nieuwe map</span></button></div><div class="shared-folder-grid">' +
      foldersHtml +
      '</div><div class="section-head" style="margin-top:30px"><h2>Alle gedeelde recepten</h2><span class="mini">' +
      list.length +
      ' recepten</span></div>' +
      v13Alphabet(window.v13SharedAlphabet, 'filterV13SharedAlphabet') +
      '<div class="savour-v13-context-tools"><span class="mini">' +
      filtered.length +
      ' recepten' +
      (window.v13SharedAlphabet ? ' · ' + window.v13SharedAlphabet : '') +
      '</span></div>' +
      recipeBlock +
      '</div><aside class="rightcol"><div class="partner-slot"><small>Partnerpositie</small><b>Adverteer hier richting professionele keukens.</b><span>Een rustige positie naast de dagelijkse workflow, zonder de recepten te onderbreken.</span></div><div class="panel"><h3>Openbare uitnodigingslink</h3><div class="sharelink">https://savour.page/join/' +
      esc(m.publicKey) +
      '</div><button class="btn" style="width:100%;margin-top:10px" onclick="inviteShared(\'' +
      escAttr(m.id) +
      '\')">Link delen</button></div><div class="panel"><h3>Keukenteam</h3>' +
      (m.members || [])
        .map(
          (x, i) =>
            '<div class="member"><div><b>' +
            esc(x.name) +
            '</b><small class="muted">' +
            (x.account ? 'Account actief' : 'Uitgenodigd') +
            '</small></div><select onchange="changeMemberRole(\'' +
            escAttr(m.id) +
            "'," +
            i +
            ',this.value)"><option ' +
            (x.role === 'owner' ? 'selected' : '') +
            '>owner</option><option ' +
            (x.role === 'editor' ? 'selected' : '') +
            '>editor</option><option ' +
            (x.role === 'viewer' ? 'selected' : '') +
            '>viewer</option></select></div>'
        )
        .join('') +
      '<button class="btn" style="width:100%;margin-top:12px" onclick="openMember(\'' +
      escAttr(m.id) +
      '\')">＋ Persoon toevoegen</button></div><div class="panel"><h3>Rechten</h3><p class="muted" style="line-height:1.5;margin:0">Owner beheert de map. Editor kan recepten toevoegen en bewerken. Viewer kan recepten bekijken.</p></div></aside></div>';
  };

  window.renderSharedFolderDetail = function () {
    if (!currentUser) return;
    let m = sharedMaps.find(x => String(x.id) === String(currentShared));
    let f = m?.folders?.find(x => String(x.id) === String(currentFolder).replace(/^sharedfolder:/, ''));
    if (!m || !f) {
      go('shared');
      return;
    }
    let list = (f.recipeIds || []).map(id => recipes.find(r => String(r.id) === String(id))).filter(Boolean);
    const filtered = v13Filter(list, window.v13SharedFolderAlphabet);
    const body = filtered.length
      ? '<div class="savour-v13-list">' + v13Rows(filtered, 'sharedFolder') + '</div>'
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
      v13Alphabet(window.v13SharedFolderAlphabet, 'filterV13SharedFolderAlphabet') +
      '</div><div class="savour-v13-context-tools"><span class="mini">' +
      filtered.length +
      ' recepten' +
      (window.v13SharedFolderAlphabet ? ' · ' + window.v13SharedFolderAlphabet : '') +
      '</span></div>' +
      body;
  };
})();
