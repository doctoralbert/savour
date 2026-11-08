// Allergenen-scherm (2026-11-07): drie tabbladen in gewone taal.
//   Nakijken     één vraag tegelijk: klopt dit voorstel, wat is deze naam, is dit je eigen recept, mag deze regel weg?
//   Ingrediënten de lijst met wat erin zit, per ingrediënt "bevestigd" of "voorstel".
//   Allergenen   welke allergenen je aanzet naast de 14 wettelijke.
// Koppelen gebeurt vanzelf (autoLinkQuietly): Savour zoekt bij elke naam uit je recepten het ingrediënt en zet nieuwe
// ingrediënten klaar als voorstel. Er verandert nooit iets in een recept zonder dat de kok daar ja op zegt.
// Elke regel van een recept heeft zo één van drie standen: bevestigd, voorstel of onbekend.

let productTab = '';
// Overgeslagen vragen (alleen dit bezoek) en vragen waar de kok "nee" op zei (blijvend, in deze browser).
const reviewSkipped = new Set();
const REVIEW_NO_KEY = 'savour_review_no';
function reviewNo() {
  try {
    return new Set(JSON.parse(localStorage.getItem(REVIEW_NO_KEY) || '[]'));
  } catch (_) {
    return new Set();
  }
}
function rememberReviewNo(id) {
  const set = reviewNo();
  set.add(id);
  try {
    localStorage.setItem(REVIEW_NO_KEY, JSON.stringify([...set].slice(-2000)));
  } catch (_) {}
}

// ---- Vanzelf koppelen ----
let autoLinkBusy = false;
let autoLinkDoneFor = '';

// Koppelt op de achtergrond wat Savour zeker genoeg weet. Eén keer per stand van de recepten en ingrediënten.
async function autoLinkQuietly(scope = 'own') {
  if (autoLinkBusy || !canEditProducts(scope)) return 0;
  const todo = productTodo(scope);
  const stamp = `${scope}:${todo.length}:${productsIn(scope).length}`;
  if (!todo.length || autoLinkDoneFor === stamp) return 0;
  autoLinkBusy = true;
  try {
    await loadIngredientBase();
    const plan = autoLinkPlan(scope);
    const creates = [...plan.create.values()];
    if (!plan.product.length && !creates.length) return 0;
    const done = await runAutoLink(scope, { ...plan, recipe: [] }, creates, { quiet: true });
    return done;
  } catch (e) {
    console.warn('Vanzelf koppelen:', e);
    return 0;
  } finally {
    autoLinkBusy = false;
    autoLinkDoneFor = `${scope}:${productTodo(scope).length}:${productsIn(scope).length}`;
    if (document.querySelector('#products.view.active')) renderProducts();
  }
}

// In hoeveel recepten elk ingrediënt voorkomt (id → aantal).
function productUsage(scope) {
  const counts = new Map();
  const byTitle = recipesByTitle({ id: null });
  const indexes = new Map();
  for (const r of recipesForProductScope(scope)) {
    const seen = new Set();
    for (const x of recipeAllergenInfo(r, scope, new Set(), byTitle, indexes).lines) {
      const id = x.product?.id;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      counts.set(id, (counts.get(id) || 0) + 1);
    }
  }
  return counts;
}

// Welke ingrediënten uit de Savour-lijst deze keuken gebruikt: id → { product, keys, count }.
function centralUsage(scope) {
  const used = new Map();
  const byTitle = recipesByTitle({ id: null });
  const indexes = new Map();
  for (const r of recipesForProductScope(scope)) {
    const seen = new Set();
    for (const x of recipeAllergenInfo(r, scope, new Set(), byTitle, indexes).lines) {
      if (!x.product?.central) continue;
      const u = used.get(x.product.id) || { product: x.product, keys: new Set(), count: 0 };
      u.keys.add(x.key);
      if (!seen.has(x.product.id)) u.count++;
      seen.add(x.product.id);
      used.set(x.product.id, u);
    }
  }
  return used;
}

// ---- Nakijken ----

// Alle open vragen, de vraag die de meeste recepten helpt eerst.
function reviewQueue(scope) {
  const no = reviewNo();
  const usage = productUsage(scope);
  const items = [];
  for (const p of productsIn(scope))
    if (!p.known) items.push({ id: `confirm:${p.id}`, type: 'confirm', product: p, count: usage.get(p.id) || 0 });
  // Uit de Savour-lijst, maar per merk verschillend (gelatine, sojasaus): één keer per keuken bevestigen.
  for (const u of centralUsage(scope).values())
    if (u.product.brand)
      items.push({ id: `brand:${u.product.id}`, type: 'brand', product: u.product, keys: [...u.keys], count: u.count });
  const todo = productTodo(scope);
  // Een naam die op een eigen recept lijkt ("groente fond" → Groentefond): eerst vragen, nooit vanzelf.
  const byTitle = ownRecipesByTitle(scope);
  for (const x of todo) {
    // Geen ingrediënt (vaste regels of geleerd): dat vraagt Savour hieronder per naam, niet als "Wat is dit?".
    if (isNotIngredient(x.key)) continue;
    const recipe = recipeForName(byTitle, x.key);
    if (recipe && recipeLinkReach(scope, x.key, recipe).linkable && !no.has(`recipe:${x.key}`))
      items.push({ id: `recipe:${x.key}`, type: 'recipe', key: x.key, recipe, count: x.count });
    else items.push({ id: `unknown:${x.key}`, type: 'unknown', key: x.key, count: x.count });
  }
  if (scope === 'own') {
    // Regels die geen ingrediënt zijn ("massa", "boiron coulis"): één vraag per naam, voor alle recepten tegelijk.
    const notIngredient = new Map();
    for (const x of recipeLineCheckPlan(scope)) {
      const key = ingredientKey(x.line);
      if (x.why === 'Geen ingrediënt' && key) {
        if (no.has(`not:${key}`)) continue;
        if (!notIngredient.has(key)) notIngredient.set(key, []);
        notIngredient.get(key).push(x);
        continue;
      }
      const id = `line:${x.recipe.id}:${x.line}`;
      if (!no.has(id)) items.push({ id, type: 'line', ...x, count: 1 });
    }
    for (const [key, rows] of notIngredient)
      items.push({
        id: `not:${key}`,
        type: 'not',
        key,
        rows,
        learned: learnedNotIngredient(key),
        count: new Set(rows.map(x => x.recipe.id)).size
      });
  }
  const order = { recipe: 0, unknown: 1, brand: 2, not: 3, confirm: 4, line: 5 };
  return items.sort((a, b) => b.count - a.count || order[a.type] - order[b.type]);
}

function reviewCardHtml(item, scope) {
  const inRecipes = n => (n === 1 ? t('in 1 recept') : t(`in ${n} recepten`));
  const skip = `<button type="button" class="btn-quiet" onclick="reviewSkip('${escJs(item.id)}')">Later</button>`;
  if (item.type === 'confirm') {
    const codes = shownAllergens(item.product.allergens, scope);
    return `<p class="review-kicker">Klopt dit?</p><h3 class="review-name" translate="no">${esc(item.product.name)}</h3><p class="review-sub">${item.count ? inRecipes(item.count) : t('nog in geen recept')}</p><div class="review-allergens"><span>Hier zit volgens Savour in:</span>${codes.length ? allergenChips(codes) : `<b>${t('geen allergenen')}</b>`}</div><div class="review-actions"><button type="button" class="btn gold" onclick="reviewConfirm('${escJs(item.product.id)}')">Klopt</button><button type="button" class="btn" onclick="reviewEdit('${escJs(item.product.id)}')">Aanpassen</button>${skip}</div><p class="review-note">Controleer het etiket als je twijfelt: elk merk is anders.</p>`;
  }
  if (item.type === 'brand') {
    const codes = shownAllergens(item.product.allergens, scope);
    return `<p class="review-kicker">${t('Verschilt per merk')}</p><h3 class="review-name" translate="no">${esc(item.product.name)}</h3><p class="review-sub">${inRecipes(item.count)}</p><div class="review-allergens"><span>${t('Volgens de Savour-lijst:')}</span>${codes.length ? allergenChips(codes) : `<b>${t('geen allergenen')}</b>`}</div><p class="review-sub">${t('Klopt dat ook voor het merk dat jij gebruikt? Kijk op het etiket.')}</p><div class="review-actions"><button type="button" class="btn gold" onclick="reviewBrandYes('${escJs(item.product.id)}')">${t('Klopt voor mijn merk')}</button><button type="button" class="btn" onclick="reviewBrandEdit('${escJs(item.product.id)}')">Aanpassen</button>${skip}</div>`;
  }
  if (item.type === 'recipe')
    return `<p class="review-kicker">Is dit je eigen recept?</p><h3 class="review-name" translate="no">${esc(item.key)}</h3><p class="review-sub"><span>${inRecipes(item.count)}</span> · <span>${t('lijkt op je recept')}</span> <b translate="no">${esc(item.recipe.title)}</b></p><div class="review-actions"><button type="button" class="btn gold" onclick="reviewRecipeYes('${escJs(item.key)}','${escJs(item.recipe.id)}')">Ja, dat recept</button><button type="button" class="btn" onclick="reviewRecipeNo('${escJs(item.key)}')">Nee</button>${skip}</div><p class="review-note">Dan tellen de allergenen van dat recept mee.</p>`;
  if (item.type === 'not') {
    const why = item.learned
      ? t('Dit heb je eerder weggehaald als geen ingrediënt.')
      : t('Dit lijkt geen ingrediënt, maar een stukje uitleg of bereiding.');
    return `<p class="review-kicker">${t('Weghalen?')}</p><h3 class="review-name" translate="no">${esc(item.key)}</h3><p class="review-sub"><span>${inRecipes(item.count)}</span> · <span>${why}</span></p><div class="review-actions"><button type="button" class="btn gold" onclick="reviewNotYes('${escJs(item.id)}')">${t(item.count === 1 ? 'Ja, weghalen' : `Ja, weghalen uit alle ${item.count}`)}</button><button type="button" class="btn" onclick="reviewNotNo('${escJs(item.key)}')">Is wel een ingrediënt</button>${skip}</div>`;
  }
  if (item.type === 'line') {
    const ask = { replace: 'Aanpassen?', step: 'Naar de bereiding?', remove: 'Weghalen?' }[item.action];
    const yes = { replace: 'Ja, aanpassen', step: 'Ja, verplaatsen', remove: 'Ja, weghalen' }[item.action];
    const to =
      item.action === 'replace'
        ? `<p class="review-sub"><span>${t('Wordt:')}</span> <b translate="no">${esc(item.to)}</b></p>`
        : '';
    return `<p class="review-kicker"><span>${t(item.why)}</span>. <span>${t(ask)}</span></p><h3 class="review-name review-line" translate="no">${esc(item.line)}</h3><p class="review-sub"><span>${t('in je recept')}</span> <b translate="no">${esc(item.recipe.title)}</b></p>${to}<div class="review-actions"><button type="button" class="btn gold" onclick="reviewLineYes('${escJs(item.id)}')">${t(yes)}</button><button type="button" class="btn" onclick="reviewLineNo('${escJs(item.id)}')">Laten staan</button>${skip}</div>`;
  }
  const guess = productSuggestionFor(scope, item.key);
  const own = scope === 'own';
  return `<p class="review-kicker">Wat is dit?</p><h3 class="review-name" translate="no">${esc(item.key)}</h3><p class="review-sub"><span>${inRecipes(item.count)}</span> · <span>${t('Savour weet niet welk ingrediënt dit is')}</span></p><div class="review-actions">${guess ? `<button type="button" class="btn gold" onclick="linkTodoTo('${escJs(item.key)}','${escJs(guess.id)}')">Hoort bij ${esc(guess.name)}</button>` : ''}<button type="button" class="btn${guess ? '' : ' gold'}" onclick="linkTodoIngredient('${escJs(item.key)}')">Kies ingrediënt</button>${own ? `<button type="button" class="btn" onclick="linkTodoRecipe('${escJs(item.key)}')">Mijn eigen recept</button><button type="button" class="btn" onclick="removeTodoLines('${escJs(item.key)}')">Geen ingrediënt</button>` : ''}${skip}</div>`;
}

function reviewTabHtml(scope, queue) {
  const open = queue.filter(x => !reviewSkipped.has(x.id));
  if (!queue.length)
    return `<div class="panel review-done"><h3>Alles is nagekeken</h3><p class="muted">Nieuwe recepten koppelt Savour vanzelf. Komt er iets bij waar Savour twijfelt, dan zie je het hier.</p></div>`;
  if (!open.length)
    return `<div class="panel review-done"><h3>Je hebt alles bekeken</h3><p class="muted">${queue.length === 1 ? 'Eén vraag heb je voor later bewaard.' : `${queue.length} vragen heb je voor later bewaard.`}</p><button type="button" class="btn" onclick="reviewSkipped.clear();renderProducts()">Opnieuw bekijken</button></div>`;
  const item = open[0];
  const confirms = queue.filter(x => x.type === 'confirm').length;
  const bulk =
    confirms > 1
      ? `<p class="review-bulk"><button type="button" class="btn-quiet" onclick="openUncheckedReview()">Alle ${confirms} voorstellen tegelijk bekijken</button></p>`
      : '';
  return `<div class="review-progress"><span>${t(`Vraag ${queue.length - open.length + 1} van ${queue.length}`)}</span><i><b style="width:${((queue.length - open.length) / queue.length) * 100}%"></b></i></div><div class="panel review-card">${reviewCardHtml(item, scope)}</div>${bulk}`;
}

function reviewSkip(id) {
  reviewSkipped.add(id);
  renderProducts();
}

async function reviewConfirm(id) {
  const p = products.find(x => x.id === id);
  if (p && (await writeProduct({ ...p, known: true }))) {
    saveOfflineSnapshot();
    renderProducts();
  }
}

// Een eigen versie van een ingrediënt uit de Savour-lijst: zelfde naam en schrijfwijzen, bevestigd door deze keuken.
async function reviewBrandYes(id) {
  const item = reviewQueue(productScope).find(x => x.id === `brand:${id}`);
  if (!item) return;
  const p = item.product;
  const key = productKey(p.name);
  const saved = await insertProducts([
    {
      scope: productScope,
      name: p.name,
      aliases: [...new Set([...p.aliases, ...item.keys].map(productKey))].filter(k => k && k !== key).slice(0, 50),
      allergens: [...p.allergens],
      known: true,
      note: ''
    }
  ]);
  if (saved) {
    saveOfflineSnapshot();
    renderProducts();
  }
}

async function reviewBrandEdit(id) {
  const item = reviewQueue(productScope).find(x => x.id === `brand:${id}`);
  if (!item) return;
  if (await openProductEditor({ scope: productScope, name: item.product.name, alias: item.keys[0] })) renderProducts();
}

async function reviewEdit(id) {
  const p = products.find(x => x.id === id);
  if (p && (await openProductEditor({ product: p, scope: p.scope }))) renderProducts();
}

async function reviewRecipeYes(key, recipeId) {
  const target = findRecipe(recipeId);
  if (target && (await linkNamesToRecipes(productScope, new Map([[key, target]])))) {
    toast(`${key} → ${target.title}`);
    renderProducts();
  }
}

function reviewRecipeNo(key) {
  rememberReviewNo(`recipe:${key}`);
  renderProducts();
}

async function reviewLineYes(id) {
  const x = reviewQueue(productScope).find(q => q.id === id);
  if (x && (await runRecipeLineCheck([x]))) renderProducts();
}

// "massa" uit alle recepten weg, en onthouden: bij nieuwe recepten stelt Savour het zelf voor.
async function reviewNotYes(id) {
  const x = reviewQueue(productScope).find(q => q.id === id);
  if (!x) return;
  rememberNotIngredient(x.key);
  const done = await runRecipeLineCheck(x.rows);
  if (done) toast(done === 1 ? 'Weggehaald uit 1 recept' : `Weggehaald uit ${done} recepten`);
  renderProducts();
}

function reviewNotNo(key) {
  rememberReviewNo(`not:${key}`);
  renderProducts();
}

function reviewLineNo(id) {
  rememberReviewNo(id);
  renderProducts();
}

// ---- Ingrediënten ----

let productStatusFilter = '';

function ingredientsTabHtml(scope, edit) {
  const list = productsIn(scope);
  const open = list.filter(p => !p.known).length;
  const central = [...centralUsage(scope).values()].filter(
    u => !list.some(p => productKey(p.name) === productKey(u.product.name))
  ).length;
  const filter = (id, label) =>
    `<button type="button" class="${productStatusFilter === id ? 'on' : ''}" onclick="productStatusFilter='${id}';renderProductList()">${t(label)}</button>`;
  return `<div class="panel products-list-panel"><div class="products-list-tools"><div class="products-search"><span>⌕</span><input id="productSearchInput" value="${esc(productSearch)}" placeholder="${esc(t('Zoek een ingrediënt'))}" autocomplete="off" oninput="productSearch=this.value;renderProductList()"></div>${edit ? '<button type="button" class="btn gold" onclick="addProduct()">＋ Ingrediënt</button>' : ''}</div><div class="products-filter">${filter('', `Alle (${list.length})`)}${filter('open', `Voorstel (${open})`)}${filter('known', `Bevestigd (${list.length - open})`)}${filter('central', `Savour-lijst (${central})`)}</div><p class="muted products-brand-note">${t('Staat een ingrediënt in de Savour-lijst, dan telt het meteen mee. Is het bij jouw merk anders? Open het en maak je eigen versie; die gaat dan voor.')}</p><div id="productList"></div></div>`;
}

// ---- Allergenen aanzetten ----

function allergensTabHtml(scope, edit) {
  const on = new Set(productExtras.get(scope) || []);
  const eu = ALLERGENS.filter(a => !a[2])
    .map(a => `<span class="allergen-chip">${esc(t(a[1]))}</span>`)
    .join('');
  const groups = ALLERGEN_EXTRA_GROUPS.map(
    ([title, codes]) =>
      `<p class="allergen-pick-head">${esc(t(title))}</p><div class="allergen-pick">${codes
        .map(
          code =>
            `<label class="allergen-pick-item"><input type="checkbox" ${on.has(code) ? 'checked' : ''} ${edit ? '' : 'disabled'} onchange="toggleAllergenExtra('${code}', this.checked)"><span>${esc(t(ALLERGEN_LABEL.get(code)))}</span></label>`
        )
        .join('')}</div>`
  ).join('');
  return `<div class="panel"><h3>Altijd aan</h3><p class="muted">De 14 allergenen die je volgens de wet moet kunnen noemen.</p><div class="allergen-chips">${eu}</div></div><div class="panel"><h3>Zelf aanzetten</h3><p class="muted">Waar gasten vaak naar vragen, voor hun geloof, dieet of een intolerantie. Wat je uitzet, blijft bewaard; je ziet het alleen niet meer.</p>${groups}</div>`;
}

async function toggleAllergenExtra(code, checked) {
  const scope = productScope;
  const current = new Set(productExtras.get(scope) || []);
  if (checked) current.add(code);
  else current.delete(code);
  await setAllergenExtras(
    scope,
    ALLERGENS.map(a => a[0]).filter(c => current.has(c))
  );
}

// ---- Bij een recept: openklappen en de allergenenkaart ----

const RECIPE_ALLERGENS_OPEN = 'savour_recipe_allergens_open';
function recipeAllergensOpen() {
  try {
    return localStorage.getItem(RECIPE_ALLERGENS_OPEN) === '1';
  } catch (_) {
    return false;
  }
}
function toggleRecipeAllergens() {
  const open = !recipeAllergensOpen();
  try {
    localStorage.setItem(RECIPE_ALLERGENS_OPEN, open ? '1' : '0');
  } catch (_) {}
  const r = findRecipe(currentId);
  if (r) renderRecipeAllergens(r);
}

// Allergenenkaart: per ingrediënt van het recept een punt bij elk allergeen dat erin zit. Bovenaan het recept als
// geheel. Een vraagteken: Savour weet het nog niet zeker. Het recept en zijn basisrecepten tellen mee.
function openAllergenCard() {
  const r = findRecipe(currentId);
  if (!r) return;
  const scope = productScopeOf(r);
  const info = recipeAllergenInfo(r, scope);
  const shown = ALLERGENS.filter(([c, , extra]) => !extra || (allergenShown(c, scope) && info.allergens.includes(c)));
  // Afkorting uit de naam in de taal van de kok ("Glu", "Lai"); niet nog eens vertalen.
  const short = label => (translateText(label) || label).replace(/'s$/, '').slice(0, 3);
  const dot = '<span class="ac-dot" aria-label="bevat"></span>';
  const maybe = '<span class="ac-maybe" aria-label="nog niet zeker">?</span>';
  const codesOf = x =>
    x.status === 'product'
      ? x.product.allergens
      : x.status === 'recipe'
        ? x.sub?.allergens || []
        : x.status === 'unchecked'
          ? x.product?.allergens || []
          : [];
  const rows = info.lines
    .filter(x => x.status !== 'part')
    .map(x => {
      const codes = codesOf(x);
      const unsure =
        x.status === 'unknown' || x.status === 'unchecked' || (x.status === 'recipe' && x.sub?.unknown.length);
      const name =
        x.status === 'recipe'
          ? `<b translate="no">${esc(x.target.title)}</b><small>${t('basisrecept')}</small>`
          : `<b translate="no">${esc(x.product?.name || ingredientNameOf(x.line))}</b>${x.status === 'unknown' ? `<small>${t('nog onbekend')}</small>` : x.status === 'unchecked' ? `<small>${t('voorstel')}</small>` : ''}`;
      return `<tr><th scope="row">${name}</th>${shown.map(([c]) => `<td>${codes.includes(c) ? dot : unsure ? (x.status === 'unknown' ? maybe : '') : ''}</td>`).join('')}</tr>`;
    })
    .join('');
  const total = `<tr class="ac-total"><th scope="row">${t('Hele recept')}</th>${shown.map(([c]) => `<td>${info.allergens.includes(c) ? dot : ''}</td>`).join('')}</tr>`;
  const head = `<tr><th></th>${shown.map(([c, label]) => `<th scope="col" title="${esc(t(label))}"><span translate="no">${esc(short(t(label)))}</span></th>`).join('')}</tr>`;
  const note = info.unknown.length
    ? `<p class="ac-note">${icon('alert', { size: 14 })}<span>${t('Nog niet compleet. Bij een vraagteken weet Savour nog niet wat erin zit.')}</span></p>`
    : `<p class="ac-note">${t('Compleet: alle ingrediënten zijn nagekeken.')}</p>`;
  document.getElementById('allergenCard')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="allergenCard" role="dialog" aria-modal="true" aria-labelledby="allergenCardTitle"><div class="sv-dialog-box allergen-card-box">${modalCloseHtml()}<h2 id="allergenCardTitle" class="sv-dialog-title">${t('Allergenenkaart')}</h2><p class="sv-dialog-text" translate="no">${esc(r.title)}</p><div class="ac-wrap"><table class="ac-table"><thead>${head}</thead><tbody>${total}${rows}</tbody></table></div>${note}<p class="ac-legend">${dot} <span>${t('bevat')}</span> · ${maybe} <span>${t('nog niet zeker')}</span></p></div></div>`
  );
  const el = $('allergenCard');
  closableModal(el, () => el.remove());
}

// Een ingrediënt uit de Savour-lijst openen: wat je opslaat, wordt je eigen versie voor deze keuken.
async function openCentralProduct(name) {
  if (await openProductEditor({ scope: productScope, name })) renderProducts();
}
