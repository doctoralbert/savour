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

function contextRecipeRowsHtml(list, context) {
  return sortRecipesByTitle(list)
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
        esc(recipeTitleOf(r)) +
        '</span><span class="savour-v13-arrow">›</span></div>'
      );
    })
    .join('');
}

function filterRecipesByLetter(list, letter) {
  return (list || []).filter(r => !letter || recipeTitleOf(r).charAt(0).toUpperCase() === letter);
}

function filterV13FolderAlphabet(letter) {
  window.v13FolderAlphabet = String(letter || '').toUpperCase();
  renderFolderDetail();
}

function filterV13SharedAlphabet(letter) {
  window.v13SharedAlphabet = String(letter || '').toUpperCase();
  renderShared(currentShared);
}

function filterV13SharedFolderAlphabet(letter) {
  window.v13SharedFolderAlphabet = String(letter || '').toUpperCase();
  renderSharedFolderDetail();
}
