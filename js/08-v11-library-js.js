(function () {
  const safeText = v => String(v ?? '');
  const titleOf = r => safeText(r?.title || 'Ongetiteld');
  const normalizedId = id => String(id);
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  window.recipeLetters = function () {
    return allLetters.slice();
  };
  window.renderRecipeAlphabet = function () {
    const el = document.getElementById('recipeAlphabet');
    if (!el) return;
    el.innerHTML =
      '<button class="' +
      (!activeRecipeLetter ? 'active' : '') +
      '" onclick="filterRecipeAlphabet(\'\')">Alle</button>' +
      allLetters
        .map(
          l =>
            '<button class="' +
            (activeRecipeLetter === l ? 'active' : '') +
            '" onclick="filterRecipeAlphabet(\'' +
            l +
            '\')">' +
            l +
            '</button>'
        )
        .join('');
  };
  window.filterRecipeAlphabet = function (letter) {
    activeRecipeLetter = String(letter || '').toUpperCase();
    renderRecipes();
  };
  window.visibleRecipeList = function () {
    const q = safeText(
      document.getElementById('mobileRecipeSearch')?.value || document.getElementById('globalSearch')?.value
    )
      .toLocaleLowerCase('nl')
      .trim();
    let list = (recipes || []).filter(r => {
      const title = titleOf(r),
        first = title.trim().charAt(0).toUpperCase();
      const catOk = !activeCat || r.category === activeCat;
      const letterOk = !activeRecipeLetter || first === activeRecipeLetter;
      const folderOk =
        !activeFolderCategory ||
        folders.some(
          f =>
            String(f.id) === String(activeFolderCategory) && (f.recipeIds || []).some(id => String(id) === String(r.id))
        );
      const qOk = !q || title.toLocaleLowerCase('nl').includes(q);
      return catOk && letterOk && folderOk && qOk;
    });
    return list.slice().sort((a, b) => titleOf(a).localeCompare(titleOf(b), 'nl', { sensitivity: 'base' }));
  };
  function row(r, index, manage) {
    const id = normalizedId(r.id),
      checked = bulkSelectedIds.has(id);
    return (
      '<div class="recipe-library-row' +
      (manage ? ' manage' : '') +
      '" role="button" tabindex="0" onclick="openRecipe(\'' +
      escAttr(id) +
      "')\" onkeydown=\"if(event.key==='Enter'||event.key===' '){event.preventDefault();openRecipe('" +
      escAttr(id) +
      '\')}">' +
      (manage
        ? '<input class="row-check" type="checkbox" ' +
          (checked ? 'checked' : '') +
          ' aria-label="Selecteer ' +
          escAttr(titleOf(r)) +
          '" onclick="event.stopPropagation();toggleBulkRecipe(\'' +
          escAttr(id) +
          '\')">'
        : '<span class="row-index">' + (index + 1) + '</span>') +
      '<span class="row-title">' +
      esc(titleOf(r)) +
      '</span><span class="row-arrow">›</span></div>'
    );
  }
  window.renderRecipes = function () {
    if (!currentUser) return;
    renderRecipeAlphabet();
    renderCategoryBar();
    const list = visibleRecipeList();
    const count = document.getElementById('recipeCount');
    if (count) count.textContent = list.length + ' recepten' + (activeRecipeLetter ? ' · ' + activeRecipeLetter : '');
    const host = document.getElementById('recipeGrid');
    if (!host) return;
    let html = '<div class="recipe-library-shell">';
    if (bulkDeleteMode) {
      html +=
        '<div class="recipe-library-tools"><span class="v11-selected-note">' +
        bulkSelectedIds.size +
        ' geselecteerd</span><div class="bulk-actions"><button class="btn small" onclick="selectVisibleBulk()">Selecteer huidige resultaten</button><button class="btn small" onclick="clearBulkSelection()">Selectie wissen</button>' +
        (bulkSelectedIds.size
          ? '<button class="btn small delete-recipe" onclick="deleteBulkSelected()">Verwijderen (' +
            bulkSelectedIds.size +
            ')</button>'
          : '') +
        '<button class="btn small" onclick="toggleBulkDeleteMode()">Klaar</button></div></div>';
      html +=
        '<div class="v11-manage-query"><input id="v11ManageQuery" placeholder="Zoek namen om meerdere recepten te selecteren…" value="' +
        escAttr(window.bulkManageQuery || '') +
        '" oninput="window.bulkManageQuery=this.value;renderRecipes()"><button class="btn small" onclick="v11SelectMatches()">Selecteer zoekresultaten</button></div>';
    } else {
      html +=
        '<div class="recipe-library-tools"><span class="mini">' +
        list.length +
        ' recepten · één overzicht</span><button class="btn small" onclick="toggleBulkDeleteMode()">Verwijder recepten</button></div>';
    }
    html += list.length
      ? '<div class="recipe-library-list">' + list.map((r, i) => row(r, i, bulkDeleteMode)).join('') + '</div>'
      : '<div class="empty">Geen recepten gevonden.</div>';
    html += '</div>';
    host.innerHTML = html;
  };
  window.v11SelectMatches = function () {
    const q = safeText(window.bulkManageQuery || '')
      .toLocaleLowerCase('nl')
      .trim();
    if (!q) {
      toast('Vul eerst een zoekterm in');
      return;
    }
    (recipes || [])
      .filter(r => titleOf(r).toLocaleLowerCase('nl').includes(q))
      .forEach(r => bulkSelectedIds.add(String(r.id)));
    renderRecipes();
  };
  window.toggleBulkDeleteMode = function () {
    bulkDeleteMode = !bulkDeleteMode;
    bulkSelectedIds.clear();
    window.bulkManageQuery = '';
    renderRecipes();
  };
  window.selectVisibleBulk = function () {
    visibleRecipeList().forEach(r => bulkSelectedIds.add(String(r.id)));
    renderRecipes();
  };
  window.toggleBulkRecipe = function (id) {
    const k = String(id);
    if (bulkSelectedIds.has(k)) bulkSelectedIds.delete(k);
    else bulkSelectedIds.add(k);
    renderRecipes();
  };
  window.clearBulkSelection = function () {
    bulkSelectedIds.clear();
    renderRecipes();
  };
  window.renderFolderDetail = function () {
    if (!currentUser) return;
    const f = folders.find(x => String(x.id) === String(currentFolder).replace(/^folderpick:/, ''));
    if (!f) {
      go('folders');
      return;
    }
    let list = recipes
      .filter(r => (f.recipeIds || []).some(id => String(id) === String(r.id)))
      .sort((a, b) => titleOf(a).localeCompare(titleOf(b), 'nl'));
    const q = safeText(document.getElementById('globalSearch')?.value).toLocaleLowerCase('nl').trim();
    if (q) list = list.filter(r => titleOf(r).toLocaleLowerCase('nl').includes(q));
    const body = list.length
      ? '<div class="recipe-library-list">' + list.map((r, i) => row(r, i, false)).join('') + '</div>'
      : '<div class="empty">Deze map is nog leeg.</div>';
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
      '\')">＋<span>Recept toevoegen</span></button></div></div>' +
      body;
  };
  window.deleteFolder = async function (id) {
    if (!currentUser) return;
    const f = folders.find(x => String(x.id) === String(id));
    if (!f || f.system) return;
    if (
      !confirm(
        'Weet je zeker dat je de map “' + f.name + '” wilt verwijderen?\n\nDe recepten blijven in Alle recepten staan.'
      )
    )
      return;
    if (demoMode) {
      folders = folders.filter(x => String(x.id) !== String(id));
      if (String(currentFolder) === String(id)) currentFolder = null;
      renderFolders();
      renderHome();
      renderCategoryNav();
      go('folders');
      toast('Receptenmap verwijderd');
      return;
    }
    // Eerst alleen de koppelingen verwijderen; daarna de map zelf. De recepten blijven behouden.
    const rel = await supabaseClient.from('folder_recipes').delete().eq('folder_id', id);
    if (rel.error) {
      console.error(rel.error);
      toast('Mapkoppelingen konden niet worden verwijderd: ' + rel.error.message);
      return;
    }
    const result = await supabaseClient.from('folders').delete().eq('id', id).eq('user_id', currentUser.id);
    if (result.error) {
      console.error(result.error);
      toast('Receptenmap kon niet worden verwijderd: ' + result.error.message);
      return;
    }
    if (String(currentFolder) === String(id)) currentFolder = null;
    await loadDatabaseState();
    renderFolders();
    renderHome();
    renderCategoryNav();
    renderCategories();
    go('folders');
    toast('Receptenmap verwijderd');
  };
})();
