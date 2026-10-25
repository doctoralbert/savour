// Receptenlijsten binnen mappen (persoonlijk en gedeeld).

// Gedeelde bouwstenen voor receptenlijsten binnen mappen: alfabetbalk, genummerde rijen en letterfilter.

function recipeTitleOf(r) {
  return String(r?.title || 'Zonder titel').trim();
}

function sortRecipesByTitle(list) {
  return (list || [])
    .slice()
    .sort((a, b) => recipeTitleOf(a).localeCompare(recipeTitleOf(b), 'nl', { sensitivity: 'base' }));
}

function contextAlphabetHtml(selected, handler) {
  return (
    '<div class="savour-v13-alphabet"><button class="' +
    (!selected ? 'active' : '') +
    '" onclick="' +
    handler +
    "('')\">Alle</button>" +
    ALPHABET_LETTERS.map(
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
    ).join('') +
    '</div>'
  );
}

// removeFn: naam van de functie die een recept uit deze map haalt; dan staat er een kruisje achter elk recept.
function contextRecipeRowsHtml(list, context, removeFn = '') {
  const removeLabel = esc(t('Uit deze map halen'));
  return sortRecipesByTitle(list)
    .map((r, i) => {
      const id = escJs(r.id);
      const remove = removeFn
        ? `<button type="button" class="savour-row-remove" title="${removeLabel}" aria-label="${removeLabel}" onclick="event.stopPropagation();${removeFn}('${id}')">×</button>`
        : '';
      return (
        '<div class="savour-v13-row' +
        (removeFn ? ' has-remove' : '') +
        '" role="button" tabindex="0" onclick="openRecipe(\'' +
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
        esc(recipeTitleOf(r)) +
        '</span>' +
        remove +
        '<span class="savour-v13-arrow">›</span></div>'
      );
    })
    .join('');
}

function filterRecipesByLetter(list, letter) {
  return (list || []).filter(r => !letter || recipeTitleOf(r).charAt(0).toUpperCase() === letter);
}

function filterFolderAlphabet(letter) {
  window.folderAlphabet = String(letter || '').toUpperCase();
  renderFolderDetail();
}

function filterSharedAlphabet(letter) {
  window.sharedAlphabet = String(letter || '').toUpperCase();
  renderShared(currentShared);
}

function filterSharedFolderAlphabet(letter) {
  window.sharedFolderAlphabet = String(letter || '').toUpperCase();
  renderSharedFolderDetail();
}
