// Categorie voorstellen op trefwoorden in de receptnaam.
//
// De chef geeft per categorie trefwoorden op (bijv. IJs: ijs, sorbet). Savour zoekt die in de naam, ook
// midden in een samengesteld woord: "Citroensorbet" past bij "sorbet". Savour verandert nooit zelf een
// categorie: bij een nieuw recept wordt het voorstel alleen ingevuld (zichtbaar vóór opslaan) en voor
// bestaande recepten kiest de chef in een lijst wat er wordt aangepast.

function normalizeForMatch(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

// Laatste plek waar het trefwoord echt voorkomt, of -1. Een kort trefwoord (minder dan 5 letters) telt
// alleen aan het begin of eind van een woord: "ijs" past bij "citroenijs" en "ijstaart", niet bij "rijst".
function findKeyword(text, keyword) {
  const isLetter = ch => !!ch && /[a-z0-9]/.test(ch);
  for (let i = text.lastIndexOf(keyword); i >= 0; i = i ? text.lastIndexOf(keyword, i - 1) : -1) {
    if (keyword.length >= 5) return i;
    const atStart = !isLetter(text[i - 1]);
    const atEnd = !isLetter(text[i + keyword.length]);
    if (atStart || atEnd) return i;
  }
  return -1;
}

function keywordsOf(category) {
  return (categoryKeywords[category] || []).filter(Boolean);
}

// Geeft { category, keyword, conflicts } of null. Passen meerdere categorieën, dan volgt Savour de
// Nederlandse woordbouw: wat een gerecht ís staat vooraan ("Mousse van garnalen" is een mousse) en in een
// samengesteld woord achteraan ("Kalfsjus" is een jus). Daarom telt eerst het deel vóór "van/met/…" en
// daarin het trefwoord dat het laatst eindigt. De andere categorieën staan in conflicts, om na te kijken.
function suggestCategory(title) {
  const name = normalizeForMatch(title);
  if (!name) return null;
  const head = name.split(/\s(?:van|met|op|in|uit|en|of|a la|au|aux)\s/)[0];
  const hits = [];
  for (const category of categories) {
    let best = null;
    for (const keyword of keywordsOf(category)) {
      const k = normalizeForMatch(keyword).trim();
      if (!k) continue;
      const inHead = findKeyword(head, k);
      const inName = findKeyword(name, k);
      if (inName < 0) continue;
      const score = inHead >= 0 ? 100000 + inHead + k.length : inName + k.length;
      if (!best || score > best.score || (score === best.score && k.length > best.length))
        best = { category, keyword, score, length: k.length };
    }
    if (best) hits.push(best);
  }
  if (!hits.length) return null;
  // Gelijke stand: het langste (meest specifieke) trefwoord wint, bijv. "ossenhaas" boven "haas".
  hits.sort((a, b) => b.score - a.score || b.length - a.length);
  const { category, keyword } = hits[0];
  return { category, keyword, conflicts: hits.slice(1).map(h => h.category) };
}

// ---- Trefwoorden beheren (pagina Categorieën) ----

function parseKeywords(text) {
  const seen = new Set();
  return String(text || '')
    .split(/[,;\n]/)
    .map(k => k.trim().toLowerCase())
    .filter(k => k && !seen.has(k) && seen.add(k));
}

async function editCategoryKeywords(category) {
  if (!currentUser) return;
  if (!demoMode && !categoryKeywordsAvailable) {
    toast('Trefwoorden zijn nog niet beschikbaar: voer eerst de Supabase-update uit');
    return;
  }
  const value = await askText(
    `Trefwoorden voor ${category}\n\nGescheiden door komma's, bijvoorbeeld: ijs, sorbet, parfait. Savour zoekt ze in de receptnaam.`,
    keywordsOf(category).join(', '),
    { confirmLabel: 'Opslaan' }
  );
  if (value === null) return;
  const keywords = parseKeywords(value);
  if (!demoMode) {
    const { error } = await supabaseClient
      .from('categories')
      .update({ keywords })
      .eq('user_id', currentUser.id)
      .eq('name', category);
    if (error) {
      console.error(error);
      toast('Trefwoorden konden niet worden opgeslagen');
      return;
    }
  }
  categoryKeywords[category] = keywords;
  renderCategories();
  toast('Trefwoorden opgeslagen');
}

// Bestaand account: ontbrekende standaardcategorieën toevoegen, na bevestiging.
async function offerDefaultCategories() {
  if (!currentUser) return;
  const missing = DEFAULT_CATEGORIES.filter(c => !categories.includes(c.name));
  const emptyKeywords = DEFAULT_CATEGORIES.filter(c => categories.includes(c.name) && !keywordsOf(c.name).length);
  if (!missing.length && !emptyKeywords.length) {
    toast('Je hebt alle standaardcategorieën al');
    return;
  }
  const parts = [];
  if (missing.length) parts.push(`Nieuw: ${missing.map(c => c.name).join(', ')}.`);
  if (emptyKeywords.length) parts.push(`Krijgen trefwoorden: ${emptyKeywords.map(c => c.name).join(', ')}.`);
  if (
    !(await askConfirm(
      `Standaardcategorieën toevoegen?\n\n${parts.join(' ')} Je eigen categorieën en trefwoorden blijven staan.`,
      {
        confirmLabel: 'Toevoegen'
      }
    ))
  )
    return;
  if (demoMode) {
    missing.forEach(c => categories.push(c.name));
    [...missing, ...emptyKeywords].forEach(c => (categoryKeywords[c.name] = c.keywords.slice()));
  } else {
    try {
      const { data, error } = await loadCategoryRows();
      if (error) throw error;
      await addDefaultCategories(data || []);
      await loadDatabaseState();
    } catch (e) {
      console.error(e);
      toast('Standaardcategorieën konden niet worden toegevoegd');
      return;
    }
  }
  renderCategories();
  renderCategoryBar();
  toast('Standaardcategorieën toegevoegd');
}

// ---- Nieuw recept: voorstel invullen zolang de chef zelf geen categorie koos ----

function suggestEditorCategory() {
  const select = $('fCategory');
  const hint = $('fCategoryHint');
  if (!select || select.dataset.manual === '1') return;
  const suggestion = suggestCategory($('fTitle').value);
  const target = suggestion?.category || select.dataset.base || 'Eigen recepten';
  if ([...select.options].some(o => o.value === target)) select.value = target;
  if (hint) {
    hint.textContent = suggestion ? `Voorgesteld op trefwoord “${suggestion.keyword}”` : '';
    hint.hidden = !suggestion;
  }
}

function markEditorCategoryManual() {
  $('fCategory').dataset.manual = '1';
  if ($('fCategoryHint')) $('fCategoryHint').hidden = true;
}

// ---- Bestaande recepten: voorstellen tonen en bevestigen ----

let categorySuggestions = [];

function openCategorySuggestions() {
  categorySuggestions = recipes
    .map(r => ({ recipe: r, suggestion: suggestCategory(r.title) }))
    .filter(x => x.suggestion && x.suggestion.category !== x.recipe.category)
    .map(x => ({
      ...x,
      // Alleen recepten zonder categorie staan standaard aangevinkt; een bestaande keuze wijzigt alleen als de chef dat aanvinkt.
      checked: x.recipe.category === 'Eigen recepten' && !x.suggestion.conflicts.length
    }));
  categorySuggestionsModal().classList.add('open');
  renderCategorySuggestions();
}

function renderCategorySuggestions() {
  const host = $('categorySuggestionList');
  if (!host) return;
  host.innerHTML = categorySuggestions.length
    ? categorySuggestions
        .map(
          (x, i) =>
            `<label class="cat-suggest-row"><input type="checkbox" ${x.checked ? 'checked' : ''} onchange="categorySuggestions[${i}].checked=this.checked;updateCategorySuggestionButton()"><span><b translate="no">${esc(x.recipe.title)}</b><small><span translate="no">${esc(x.recipe.category)}</span> → <strong translate="no">${esc(x.suggestion.category)}</strong> · <span>trefwoord</span> <span translate="no">“${esc(x.suggestion.keyword)}”</span>${x.suggestion.conflicts.length ? ` · <em>past ook bij</em> <span translate="no">${esc(x.suggestion.conflicts.join(', '))}</span>` : ''}</small></span></label>`
        )
        .join('')
    : '<div class="empty">Geen voorstellen: alle recepten passen al bij hun trefwoorden.</div>';
  updateCategorySuggestionButton();
}

// Alleen de knop bijwerken, zodat de lijst (en de scrollpositie) blijft staan bij aanvinken.
function updateCategorySuggestionButton() {
  const apply = $('categorySuggestionApply');
  const count = categorySuggestions.filter(x => x.checked).length;
  if (apply) {
    apply.textContent = count ? `${count} recepten aanpassen` : 'Niets geselecteerd';
    apply.disabled = !count;
  }
}

function setAllCategorySuggestions(checked) {
  categorySuggestions.forEach(x => (x.checked = checked));
  renderCategorySuggestions();
}

function categorySuggestionsModal() {
  let m = document.getElementById('categorySuggestionDialog');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'categorySuggestionDialog';
  m.className = 'modal savour-bulk-modal';
  m.innerHTML =
    '<div class="modalbox"><div class="section-head"><div><h2>Categorieën voorstellen</h2><p class="muted" style="margin:4px 0 0">Op basis van je trefwoorden. Vink aan wat je wilt aanpassen; de rest blijft zoals het is.</p></div><button class="btn" onclick="closeCategorySuggestions()">Sluiten</button></div><div class="bulk-modal-list" id="categorySuggestionList"></div><div class="bulk-modal-actions"><div><button class="btn small" onclick="setAllCategorySuggestions(true)">Alles selecteren</button><button class="btn small" onclick="setAllCategorySuggestions(false)">Selectie wissen</button></div><button class="btn small gold" id="categorySuggestionApply" onclick="applyCategorySuggestions()">Aanpassen</button></div></div>';
  document.body.appendChild(m);
  return m;
}

// Een deel kan al zijn aangepast: lijst opnieuw opbouwen met wat er nu nog anders is.
function renderCategorySuggestionsAfterFailure() {
  toast('Niet alle categorieën konden worden aangepast');
  renderRecipes();
  openCategorySuggestions();
}

function closeCategorySuggestions() {
  document.getElementById('categorySuggestionDialog')?.classList.remove('open');
}

async function applyCategorySuggestions() {
  const chosen = categorySuggestions.filter(x => x.checked);
  if (!chosen.length) return;
  if (!demoMode) {
    const { data: cats, error: catError } = await supabaseClient
      .from('categories')
      .select('id,name')
      .eq('user_id', currentUser.id);
    if (catError) {
      console.error(catError);
      toast('Categorieën konden niet worden aangepast');
      return;
    }
    const idByName = Object.fromEntries((cats || []).map(c => [c.name, c.id]));
    // Per categorie één update voor alle gekozen recepten.
    const groups = {};
    chosen.forEach(x => (groups[x.suggestion.category] ||= []).push(x.recipe.id));
    for (const [name, ids] of Object.entries(groups)) {
      const { error } = await supabaseClient
        .from('recipes')
        .update({ category_id: idByName[name] || null })
        .in('id', ids)
        .eq('user_id', currentUser.id);
      if (error) {
        console.error(error);
        await loadDatabaseState();
        renderCategorySuggestionsAfterFailure();
        return;
      }
    }
    await loadDatabaseState();
  } else {
    chosen.forEach(x => (x.recipe.category = x.suggestion.category));
  }
  closeCategorySuggestions();
  renderCategories();
  renderCategoryBar();
  renderRecipes();
  toast(`${chosen.length} recepten aangepast`);
}
