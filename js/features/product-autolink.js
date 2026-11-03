// Alles automatisch koppelen (2026-11-03): de ingrediëntnamen zonder product in één keer regelen, zodat een kok
// niet honderden namen met de hand hoeft te koppelen. Per naam, in deze volgorde:
//   1. een eigen recept met dezelfde naam ("groente fond" → recept Groentefond): de allergenen van dat recept tellen mee;
//   2. een bestaand product met dezelfde naam, zonder spaties of in meervoud ("olijf olie", "tomaten");
//   3. de familie (product-families.js): "boerenkool zonder stronk" → Boerenkool, "limoenrasp" → Citrus,
//      "kabeljauwfilet zonder vel" → Kabeljauw, "bonk" → Aardappel;
//   4. een product vooraan of achteraan in de naam ("zwarte peper heel" → Zwarte peper) of een kleine tikfout;
//   5. een nieuw product uit de basislijst, of op een trefwoord ("zelfrijzendbakmeel": gluten);
//   6. anders blijft de naam staan, net als namen die te algemeen zijn ("sap", "coulis") en combinaties.
// De kok ziet eerst alles wat Savour gaat doen en kan elk product daarna nog aanpassen.
//
// Producten opruimen: hetzelfde voor producten die er al zijn. Varianten worden één product ("Boerenkool blad" en
// "Boerenkool zonder steel" → Boerenkool), rommel en te algemene namen gaan weg, producten met de naam van een
// eigen recept worden een koppeling met dat recept, en allergenen die niet kloppen met de naam worden verbeterd.

const compactKey = k => k.replace(/[\s-]+/g, '');
const singularKey = k => (k.length > 4 ? k.replace(/(en|es|s|n)$/, '') : k);

// Aantal wijzigingen om van a naar b te komen (Levenshtein), met een plafond voor snelheid.
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// Eigen recepten op naam, ook als de naam begint met "recept" ("recept basis roomijs" → Basis roomijs).
function ownRecipesByTitle(scope) {
  const byTitle = new Map();
  if (scope !== 'own') return byTitle;
  for (const r of recipes || []) {
    if (r.teamId) continue;
    const k = compactKey(productKey(r.title));
    if (k && !byTitle.has(k)) byTitle.set(k, r);
  }
  return byTitle;
}
const recipeForName = (byTitle, key) =>
  byTitle.get(compactKey(key)) || byTitle.get(compactKey(key.replace(/^recept /, '')));

// Bestaande producten per familie. Een product dat zelf de naam van de familie heeft ("Boerenkool") gaat voor.
function productsByFamily(scope) {
  const map = new Map();
  for (const p of productsIn(scope)) {
    const f = productFamily(p.name);
    if (!f?.key) continue;
    const plain = productKey(p.name) === productKey(f.name);
    if (!map.has(f.key) || plain) map.set(f.key, p);
  }
  return map;
}

// Achter een product geplakt, maar een ander product: kippenbouillon is geen kip, appelazijn geen appel.
const COMPOUND_OWN_PRODUCT =
  /^(en|s)?(azijn|olie|bouillon|fond|saus|likeur|poeder|pasta|melk|room|boter|deeg|meel|bloem|vet|jus|creme|crème|gel|ijs|mousse|chips|thee|extract|aroma|essence|wijn|bier|kaas|brood|koek|taart|zout|suiker|mayo|mayonaise|ketchup|chutney|jam|confituur|compote|gelei|sorbet|schuim|crumble|praline|ganache|karamel|siroop)/;

function autoLinkPlan(scope) {
  const names = [];
  for (const p of productsIn(scope))
    for (const n of [p.name, ...p.aliases]) {
      const k = productKey(n);
      if (k) names.push([k, p]);
    }
  const byCompact = new Map();
  const bySingular = new Map();
  for (const [k, p] of names) {
    if (!byCompact.has(compactKey(k))) byCompact.set(compactKey(k), p);
    if (!bySingular.has(singularKey(compactKey(k)))) bySingular.set(singularKey(compactKey(k)), p);
  }
  const byTitle = ownRecipesByTitle(scope);
  const byFamily = productsByFamily(scope);
  const fuzzy = key => {
    const c = compactKey(key);
    if (c.length < 6) return null;
    const max = c.length >= 9 ? 2 : 1;
    let best = null;
    let bestD = max + 1;
    let tie = false;
    for (const [k, p] of names) {
      const d = editDistance(c, compactKey(k), max);
      if (d < bestD) {
        best = p;
        bestD = d;
        tie = false;
      } else if (d === bestD && best && best.id !== p.id) tie = true;
    }
    return best && !tie ? best : null;
  };

  // Een samengesteld woord dat begint met een product: "aardappelschijf" → Aardappel, "appelstroop" → Appel.
  // Alleen als de wettelijke allergenen precies gelijk zijn, zodat "bloemkool" nooit bloem (gluten) wordt.
  const compound = key => {
    const c = compactKey(key);
    const eu = allergensEu(allergenHints(key));
    let best = null;
    for (const [k, p] of names) {
      const pk = compactKey(k);
      if (pk.length < 4 || c.length - pk.length < 3 || !c.startsWith(pk) || (best && pk.length <= best[0])) continue;
      if (COMPOUND_OWN_PRODUCT.test(c.slice(pk.length))) continue;
      const own = allergensEu(p.allergens);
      if (own.length === eu.length && own.every(a => eu.includes(a))) best = [pk.length, p];
    }
    return best ? best[1] : null;
  };
  const plan = { recipe: [], product: [], create: new Map(), rest: [], generic: [] };
  const create = (fam, x, allergens) => {
    const id = fam?.key || compactKey(x.key);
    const c = plan.create.get(id) || {
      name: fam?.name || capitalizeFirst(x.key),
      keys: [],
      allergens: new Set(),
      count: 0
    };
    c.keys.push(x.key);
    allergens.forEach(a => c.allergens.add(a));
    allergenHints(x.key).forEach(a => c.allergens.add(a));
    c.count += x.count;
    plan.create.set(id, c);
  };
  for (const x of productTodo(scope)) {
    const key = x.key;
    if (/\s(en|of|met)\s|[&/+]/.test(key)) {
      plan.rest.push(x);
      continue;
    }
    const recipe = recipeForName(byTitle, key);
    if (recipe) {
      plan.recipe.push({ ...x, recipe });
      continue;
    }
    // Nooit koppelen aan een product zonder een allergeen dat de naam doet vermoeden: "pinda olie" is geen olie.
    const hints = allergensEu(allergenHints(key));
    const fits = p => p && hints.every(c => p.allergens.includes(c));
    const exact = [byCompact.get(compactKey(key)), bySingular.get(singularKey(compactKey(key)))].find(fits);
    if (exact) {
      plan.product.push({ ...x, product: exact });
      continue;
    }
    const fam = productFamily(key);
    if (fam?.kind === 'junk' || fam?.kind === 'generic') {
      (fam.kind === 'generic' ? plan.generic : plan.rest).push(x);
      continue;
    }
    const family = fam?.key && byFamily.get(fam.key);
    if (fits(family)) {
      plan.product.push({ ...x, product: family });
      continue;
    }
    if (fam && fam.kind !== 'base' && !family) {
      create(fam, x, fam.allergens);
      continue;
    }
    const product = [productSuggestionFor(scope, key), fuzzy(key), compound(key)].find(fits);
    if (product) {
      plan.product.push({ ...x, product });
      continue;
    }
    // De basislijst kent de kern van de naam: "boerenkool zonder stronk" wordt product Boerenkool.
    const base = ingredientBaseMatch(fam?.name || key);
    if (base) {
      const existing = byCompact.get(compactKey(productKey(base.name)));
      if (fits(existing)) {
        plan.product.push({ ...x, product: existing });
        continue;
      }
      create(fam?.kind === 'base' ? fam : null, x, base.allergens);
      continue;
    }
    // Niet in de basislijst, maar een trefwoord zegt wat erin zit ("zelfrijzendbakmeel": gluten). Zonder trefwoord
    // weet Savour niet of het allergeenvrij is; dan blijft de naam staan.
    if (allergenHints(key).length) {
      create(fam?.kind === 'base' ? fam : null, x, []);
      continue;
    }
    plan.rest.push(x);
  }
  return plan;
}

const capitalize = s => capitalizeFirst(s);

function autoLinkRow(name, target, count) {
  const n = count == null ? '' : `<small>${count === 1 ? t('in 1 recept') : t(`in ${count} recepten`)}</small>`;
  return `<li><span translate="no">${esc(name)}</span><span class="autolink-arrow">→</span><b translate="no">${esc(target)}</b>${n}</li>`;
}

function autoLinkSection(title, items, { open = false } = {}) {
  return items.length
    ? `<details class="autolink-section"${open ? ' open' : ''}><summary><b>${items.length}</b> <span>${t(title)}</span></summary><ul class="autolink-list">${items.join('')}</ul></details>`
    : '';
}

async function openAutoLink() {
  const scope = productScope;
  if (!canEditProducts(scope)) return;
  await loadIngredientBase();
  const plan = autoLinkPlan(scope);
  const creates = [...plan.create.values()].sort((a, b) => b.count - a.count);
  const total = plan.recipe.length + plan.product.length + creates.reduce((n, c) => n + c.keys.length, 0);
  if (!total) {
    toast('Savour vond geen namen meer om automatisch te koppelen');
    return;
  }
  const byCount = (a, b) => b.count - a.count;
  const rest = plan.rest.length + plan.generic.length;
  document.getElementById('autoLink')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="autoLink" role="dialog" aria-modal="true" aria-labelledby="autoLinkTitle"><div class="sv-dialog-box allergen-check-box">${modalCloseHtml()}<h2 id="autoLinkTitle" class="sv-dialog-title">Alles automatisch koppelen</h2><p class="sv-dialog-text">Dit gaat Savour doen. Klik op een regel om te zien welke namen het zijn. Elk product kun je daarna nog aanpassen.</p>${autoLinkSection(
      'namen koppelen aan je eigen recept',
      [...plan.recipe].sort(byCount).map(x => autoLinkRow(x.key, x.recipe.title, x.count))
    )}${autoLinkSection(
      'namen koppelen aan een bestaand product',
      [...plan.product].sort(byCount).map(x => autoLinkRow(x.key, x.product.name, x.count))
    )}${autoLinkSection(
      'nieuwe producten maken',
      creates.map(c => autoLinkRow(c.keys.join(', '), c.name, c.count))
    )}${rest ? `<p class="muted autolink-rest">${rest} ${rest === 1 ? 'naam herkent' : 'namen herkent'} Savour niet zeker. Die blijven staan bij Nog te koppelen.</p>` : ''}<div class="sv-dialog-actions"><button type="button" class="btn" data-close>Annuleren</button><button type="button" class="btn gold" data-ok>Alles koppelen</button></div></div></div>`
  );
  const el = $('autoLink');
  const close = () => el.remove();
  closableModal(el, close);
  el.querySelector('[data-close]').addEventListener('click', close);
  el.querySelector('[data-ok]').addEventListener('click', async ev => {
    ev.target.disabled = true;
    ev.target.textContent = t('Bezig met koppelen…');
    const done = await runAutoLink(scope, plan, creates);
    close();
    if (done) toast(`${done} namen gekoppeld`);
    renderProducts();
  });
}

async function runAutoLink(scope, plan, creates) {
  let done = 0;
  // 1. Namen bij bestaande producten. Doet een naam een extra kenmerk vermoeden ("gerookte makreel": histamine),
  // dan komt dat erbij: liever een allergeen te veel dan te weinig.
  const byProduct = new Map();
  for (const x of plan.product) byProduct.set(x.product.id, [...(byProduct.get(x.product.id) || []), x.key]);
  const updates = [...byProduct].map(([id, keys]) => {
    const p = products.find(y => y.id === id);
    const allergens = withDerived(productKey(p.name), [...p.allergens, ...keys.flatMap(allergenHints)]).filter(
      a => p.allergens.includes(a) || allergenShown(a, scope)
    );
    return { ...p, aliases: [...new Set([...p.aliases, ...keys])].slice(0, 500), allergens };
  });
  for (let i = 0; i < updates.length; i += 8) {
    const saved = await Promise.all(updates.slice(i, i + 8).map(writeProduct));
    saved.forEach((p, j) => p && (done += byProduct.get(updates[i + j].id).length));
  }
  // 2. Nieuwe producten.
  if (creates.length) {
    const rows = creates.map(c => ({
      scope,
      name: c.name,
      aliases: c.keys.filter(k => k !== productKey(c.name)),
      allergens: withDerived(productKey(c.name), [...c.allergens]).filter(a => allergenShown(a, scope)),
      known: true,
      note: ''
    }));
    if (await insertProducts(rows)) done += creates.reduce((n, c) => n + c.keys.length, 0);
  }
  // 3. Koppelingen naar eigen recepten.
  done += await linkNamesToRecipes(scope, new Map(plan.recipe.map(x => [x.key, x.recipe])));
  saveOfflineSnapshot();
  return done;
}

// ---- Producten opruimen ----

function productCleanupPlan(scope) {
  const byTitle = ownRecipesByTitle(scope);
  const plan = { recipe: [], merge: [], remove: [], fix: [] };
  const clusters = new Map();
  for (const p of productsIn(scope)) {
    const recipe = recipeForName(byTitle, productKey(p.name));
    if (recipe) {
      plan.recipe.push({ product: p, recipe });
      continue;
    }
    const f = productFamily(p.name);
    if (f?.kind === 'junk' || f?.kind === 'generic') {
      plan.remove.push({ product: p, kind: f.kind });
      continue;
    }
    if (!f?.key) continue;
    if (!clusters.has(f.key)) clusters.set(f.key, { fam: f, members: [], names: new Map() });
    const c = clusters.get(f.key);
    c.members.push(p);
    c.names.set(f.name, (c.names.get(f.name) || 0) + 1);
  }
  const touched = new Set();
  for (const { fam, members, names } of clusters.values()) {
    // Naam: bij een groep, vissoort of vakkennis de vaste naam. Anders een product dat al zo heet ("Tomaat" naast
    // "Tomatensap"), of de kern die het vaakst voorkomt ("Kersen" uit "Kersen coulis" en "Kersen puree").
    const sameName = (a, b) => compactKey(productKey(a)) === compactKey(productKey(b));
    const plain = members.find(p => names.has(p.name) || [...names.keys()].some(n => sameName(n, p.name)));
    const name =
      fam.kind !== 'base'
        ? fam.name
        : plain
          ? plain.name
          : [...names].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)[0][0];
    const target = members.find(p => sameName(p.name, name)) || members[0];
    if (members.length === 1 && sameName(target.name, name)) continue;
    const key = productKey(name);
    const aliases = [
      ...new Set(members.flatMap(p => [p.name, ...p.aliases].map(productKey)).filter(k => k && k !== key))
    ].slice(0, 500);
    const all = [
      ...members.flatMap(p => p.allergens),
      ...fam.allergens,
      ...members.flatMap(p => allergenKeywords(p.name))
    ];
    const allergens = withDerived(key, all).filter(a => allergenShown(a, scope) || all.includes(a));
    plan.merge.push({ target, members, name, aliases, allergens, known: members.every(p => p.known) });
    members.forEach(p => touched.add(p.id));
  }
  // Allergenen die niet kloppen met de naam: wat een trefwoord doet vermoeden erbij, wat een uitzondering zegt eraf
  // ("pindakaas" is geen zuivel, "oost-indische kers" geen steenfruit).
  for (const p of productsIn(scope)) {
    if (touched.has(p.id) || plan.recipe.some(x => x.product === p) || plan.remove.some(x => x.product === p)) continue;
    const next = withDerived(productKey(p.name), [...p.allergens, ...allergenKeywords(p.name)]).filter(
      a => p.allergens.includes(a) || allergenShown(a, scope)
    );
    const same = next.length === p.allergens.length && next.every(a => p.allergens.includes(a));
    if (!same) plan.fix.push({ product: p, allergens: next });
  }
  return plan;
}

const allergenNames = codes => codes.map(a => t(ALLERGEN_LABEL.get(a) || a)).join(', ') || t('Geen allergenen');

function openProductCleanup() {
  const scope = productScope;
  if (!canEditProducts(scope)) return;
  const plan = productCleanupPlan(scope);
  const total = plan.recipe.length + plan.merge.length + plan.remove.length + plan.fix.length;
  if (!total) {
    toast('Je producten zijn al netjes');
    return;
  }
  // Elke regel heeft een vinkje: wat je uitzet, laat Savour staan.
  const check = (kind, i, html) =>
    `<li class="cleanup-row"><label><input type="checkbox" checked data-kind="${kind}" data-i="${i}"><span class="cleanup-text">${html}</span></label></li>`;
  const section = (title, rows, explain) =>
    rows.length
      ? `<details class="autolink-section"><summary><b>${rows.length}</b> <span>${t(title)}</span></summary>${explain ? `<p class="muted cleanup-explain">${t(explain)}</p>` : ''}<ul class="autolink-list cleanup-list">${rows.join('')}</ul></details>`
      : '';
  const merges = plan.merge.map((x, i) =>
    check(
      'merge',
      i,
      `<span translate="no">${esc(x.members.map(p => p.name).join(', '))}</span><span class="autolink-arrow">→</span><b translate="no">${esc(x.name)}</b><small>${esc(allergenNames(shownAllergens(x.allergens, scope)))}</small>`
    )
  );
  const recipesRows = plan.recipe.map((x, i) =>
    check(
      'recipe',
      i,
      `<span translate="no">${esc(x.product.name)}</span><span class="autolink-arrow">→</span><b translate="no">${esc(x.recipe.title)}</b>`
    )
  );
  const fixes = plan.fix.map((x, i) => {
    const added = x.allergens.filter(a => !x.product.allergens.includes(a));
    const removed = x.product.allergens.filter(a => !x.allergens.includes(a));
    return check(
      'fix',
      i,
      `<b translate="no">${esc(x.product.name)}</b>${added.length ? `<small class="cleanup-add">+ ${esc(allergenNames(added))}</small>` : ''}${removed.length ? `<small class="cleanup-remove">− ${esc(allergenNames(removed))}</small>` : ''}`
    );
  });
  const removes = plan.remove.map((x, i) => check('remove', i, `<b translate="no">${esc(x.product.name)}</b>`));
  document.getElementById('productCleanup')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="productCleanup" role="dialog" aria-modal="true" aria-labelledby="productCleanupTitle"><div class="sv-dialog-box allergen-check-box">${modalCloseHtml()}<h2 id="productCleanupTitle" class="sv-dialog-title">Producten opruimen</h2><p class="sv-dialog-text">Dit gaat Savour doen. Klik op een regel om te zien wat het is, en zet een vinkje uit als je iets wilt laten staan.</p>${section(
      'producten samenvoegen',
      merges,
      'Varianten worden één product. De oude namen blijven als schrijfwijze bewaard en de allergenen tellen op.'
    )}${section(
      'producten worden een koppeling met je eigen recept',
      recipesRows,
      'Dit zijn je eigen recepten. De allergenen van het recept tellen dan mee.'
    )}${section('allergenen verbeteren', fixes, 'Op basis van de naam: wat erbij komt en wat eraf gaat.')}${section(
      'producten weghalen',
      removes,
      'Geen ingrediënt, of te algemeen om te weten wat erin zit (zoals "sap" of "olie"). De namen komen terug bij Nog te koppelen.'
    )}<div class="sv-dialog-actions"><button type="button" class="btn" data-close>Annuleren</button><button type="button" class="btn gold" data-ok>Opruimen</button></div></div></div>`
  );
  const el = $('productCleanup');
  const close = () => el.remove();
  closableModal(el, close);
  el.querySelector('[data-close]').addEventListener('click', close);
  el.querySelector('[data-ok]').addEventListener('click', async ev => {
    const chosen = kind =>
      [...el.querySelectorAll(`input[data-kind="${kind}"]:checked`)].map(b => plan[kind][Number(b.dataset.i)]);
    const picked = { recipe: chosen('recipe'), merge: chosen('merge'), fix: chosen('fix'), remove: chosen('remove') };
    ev.target.disabled = true;
    ev.target.textContent = t('Bezig met opruimen…');
    const done = await runProductCleanup(scope, picked);
    close();
    if (done) toast(`${done} producten opgeruimd`);
    renderProducts();
  });
}

async function runProductCleanup(scope, plan) {
  let done = 0;
  const inBatches = async (list, fn) => {
    for (let i = 0; i < list.length; i += 8) {
      const results = await Promise.all(list.slice(i, i + 8).map(fn));
      done += results.filter(Boolean).length;
    }
  };
  // 1. Eigen recepten: eerst de koppelingen, dan pas het product weg.
  const links = new Map();
  for (const x of plan.recipe)
    for (const n of [x.product.name, ...x.product.aliases]) if (productKey(n)) links.set(productKey(n), x.recipe);
  await linkNamesToRecipes(scope, links);
  await inBatches(plan.recipe, x => deleteProduct(x.product));
  // 2. Samenvoegen: eerst het ene product bijwerken, pas daarna de andere weghalen.
  await inBatches(plan.merge, async x => {
    const saved = await writeProduct({
      ...x.target,
      name: x.name,
      aliases: x.aliases,
      allergens: x.allergens,
      known: x.known
    });
    if (!saved) return false;
    for (const p of x.members) if (p.id !== x.target.id) await deleteProduct(p);
    return true;
  });
  // 3. Allergenen verbeteren.
  await inBatches(plan.fix, x => writeProduct({ ...x.product, allergens: x.allergens }));
  // 4. Weghalen.
  await inBatches(plan.remove, x => deleteProduct(x.product));
  saveOfflineSnapshot();
  return done;
}
