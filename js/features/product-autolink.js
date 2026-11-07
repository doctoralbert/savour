// Alles automatisch koppelen (2026-11-03): de ingrediëntnamen zonder product in één keer regelen, zodat een kok
// niet honderden namen met de hand hoeft te koppelen. Per naam, in deze volgorde:
//   1. een eigen recept met dezelfde naam ("groente fond" → recept Groentefond): de allergenen van dat recept tellen mee;
//   2. een bestaand product met dezelfde naam, zonder spaties of in meervoud ("olijf olie", "tomaten");
//   3. de familie (product-families.js): "boerenkool zonder stronk" → Boerenkool, "limoenrasp" → Limoen,
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
// Afkortingen die koks gebruiken voor een basisrecept.
const RECIPE_ABBREVIATIONS = { jdv: 'jus de veau', jdc: 'jus de canard' };
const recipeForName = (byTitle, key) =>
  byTitle.get(compactKey(key)) ||
  byTitle.get(compactKey(RECIPE_ABBREVIATIONS[key] || key.replace(/^(recept|receptuur)\s+/, '')));

// Wat koppelen aan een eigen recept zou doen voor een naam: linkable = er is een regel die het recept krijgt,
// stuck = er is een regel die het niet krijgt (in het recept zelf, of de kok koos al iets anders).
function recipeLinkReach(scope, key, recipe) {
  let linkable = false;
  let stuck = false;
  for (const r of recipesForProductScope(scope)) {
    if (r.teamId) continue;
    for (const line of r.ingredients || []) {
      if (recipePartName(line) || ingredientKey(line) !== key) continue;
      if (String(r.id) === String(recipe.id) || ingredientNameOf(line).toLowerCase() in (r.links || {})) stuck = true;
      else linkable = true;
    }
  }
  return { linkable, stuck };
}

// Bestaande producten per familie. Een product dat zelf de naam van de familie heeft ("Boerenkool") gaat voor.
function productsByFamily(scope) {
  const map = new Map();
  for (const p of productsIn(scope)) {
    const f = productFamilyFor(p.name, p.allergens);
    if (!f?.key) continue;
    const plain = productKey(p.name) === productKey(f.name);
    if (!map.has(f.key) || plain) map.set(f.key, p);
  }
  return map;
}

// Achter een product geplakt, maar een ander product: kippenbouillon is geen kip, appelazijn geen appel.
const COMPOUND_OWN_PRODUCT =
  /^(en|s)?(azijn|olie|bouillon|fond|saus|likeur|poeder|pasta|melk|room|boter|deeg|meel|bloem|vet|jus|creme|crème|gel|ijs|mousse|chips|thee|extract|aroma|essence|wijn|bier|kaas|brood|koek|taart|zout|suiker|mayo|mayonaise|ketchup|chutney|jam|confituur|compote|gelei|sorbet|schuim|crumble|praline|ganache|karamel|siroop|champignon|paddenstoel|zwam|zaad|pitten|koekjes|zetmeel)/;

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
    let id = fam?.key || compactKey(x.key);
    let name = fam?.name || capitalizeFirst(x.key);
    // Bestaat er al een product met die naam dat niet past (ander allergeen), dan heet het nieuwe product naar de
    // naam zelf: nooit twee producten "Kip".
    if (byCompact.has(compactKey(productKey(name)))) {
      id = compactKey(x.key);
      name = capitalizeFirst(x.key);
    }
    const c = plan.create.get(id) || {
      name,
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
    // Combinaties ("zout en peper") niet, tenzij het één vrucht of kruid is ("limoen rasp en sap") of een
    // kruidenmengsel ("tijm en rozemarijn").
    const combo = /\s(en|of|met)\s|[&/+]/.test(key);
    if (combo && !['produce', 'known'].includes(productFamily(key)?.kind)) {
      plan.rest.push(x);
      continue;
    }
    const recipe = recipeForName(byTitle, key);
    if (recipe) {
      // Een regel in het recept zelf ("500 gram couscous" in recept Couscous) of waar de kok al iets koos (ook "niet
      // koppelen") wordt geen koppeling. Voor die regels zoekt Savour een product; anders blijft de naam eeuwig staan.
      const { linkable, stuck } = recipeLinkReach(scope, key, recipe);
      if (linkable) plan.recipe.push({ ...x, recipe });
      if (!stuck) continue;
    }
    // Nooit koppelen aan een product zonder een allergeen dat de naam doet vermoeden: "pinda olie" is geen olie.
    const hints = allergensEu(allergenHints(key));
    const fits = p => p && hints.every(c => p.allergens.includes(c));
    const exact = [byCompact.get(compactKey(key)), bySingular.get(singularKey(compactKey(key)))].find(fits);
    if (exact) {
      plan.product.push({ ...x, product: exact });
      continue;
    }
    const fam = productFamilyFor(key, allergenHints(key));
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
      // NEVO geeft de kern van de naam: "kropsla rauw" en "sla krop- gekookt" worden samen product Kropsla.
      const own = base.nevo || base.named ? { key: compactKey(base.name), name: capitalizeFirst(base.name) } : null;
      create(own || (fam?.kind === 'base' ? fam : null), x, base.allergens);
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
    // Gaat er onderweg iets mis, dan sluit het venster toch: wat al gekoppeld is, blijft gekoppeld.
    let done = 0;
    try {
      done = await runAutoLink(scope, plan, creates);
    } catch (err) {
      console.warn('Automatisch koppelen:', err);
      toast('Niet alles kon gekoppeld worden; probeer het opnieuw');
    }
    close();
    if (done) toast(`${done} namen gekoppeld`);
    renderProducts();
  });
}

// quiet: vanzelf op de achtergrond (koppelen.js). Dan worden nieuwe ingrediënten een voorstel dat de kok nog
// bevestigt, en koppelt Savour niets aan recepten: dat vraagt het eerst bij Nakijken.
async function runAutoLink(scope, plan, creates, { quiet = false } = {}) {
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
    // Komt er een allergeen bij een bevestigd ingrediënt, dan wordt het weer een voorstel: de kok kijkt het na.
    const added = allergens.some(a => !p.allergens.includes(a));
    return { ...p, aliases: [...new Set([...p.aliases, ...keys])].slice(0, 500), allergens, known: p.known && !added };
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
      known: !quiet,
      note: ''
    }));
    if (await insertProducts(rows)) done += creates.reduce((n, c) => n + c.keys.length, 0);
  }
  // 3. Koppelingen naar eigen recepten.
  if (!quiet) done += await linkNamesToRecipes(scope, new Map(plan.recipe.map(x => [x.key, x.recipe])));
  saveOfflineSnapshot();
  return done;
}

// ---- Producten opruimen ----

// Producten op een naam van één woord ("chocolade", "amarant"), om te zien of een schrijfwijze over iets anders gaat.
function productsByWord(scope) {
  const map = new Map();
  for (const p of productsIn(scope))
    for (const n of [p.name, ...p.aliases]) {
      const k = productKey(n);
      if (k && !k.includes(' ') && !map.has(familyStem(k))) map.set(familyStem(k), p);
    }
  return map;
}

// Een schrijfwijze met een woord dat zelf een ander product is, en niet in de naam van dit product staat: geeft dat
// andere product, of null. "Volle melk" blijft dus bij Melk, "chocolade melk" niet.
function foreignAlias(alias, p, byWord) {
  // Combinaties ("peper en zout") horen bij beide en blijven waar ze staan.
  if (/\s(en|of|met)\s|[&/+]/.test(productKey(alias))) return null;
  const own = new Set(familyCoreWords(productKey(p.name)).map(familyStem));
  for (const w of familyCoreWords(productKey(alias))) {
    const s = familyStem(w);
    if (own.has(s) || FAMILY_PRODUCE_WORDS.has(w)) continue;
    const other = byWord.get(s);
    if (other && other.id !== p.id) return other;
  }
  return null;
}

function productCleanupPlan(scope) {
  const byTitle = ownRecipesByTitle(scope);
  const byWord = productsByWord(scope);
  const plan = { recipe: [], apart: [], split: [], merge: [], remove: [], fix: [] };
  const clusters = new Map();
  const touched = new Set();
  for (const original of productsIn(scope)) {
    let p = original;
    const recipe = recipeForName(byTitle, productKey(p.name));
    if (recipe) {
      plan.recipe.push({ product: p, recipe });
      continue;
    }
    // Een schrijfwijze met een eigen allergeen onder een hoofdproduct ("amandel pasta": FODMAP, onder Amandel) wordt
    // een eigen product. Wat alleen die naam meebracht, gaat er bij het hoofdproduct af. Daarna telt het product
    // zonder die schrijfwijze, ook bij het samenvoegen.
    const head = productFamily(p.name);
    if (head?.kind === 'head') {
      const out = p.aliases.filter(
        a => productFamily(a)?.key === head.key && productFamilyFor(a, allergenHints(a))?.key !== head.key
      );
      if (out.length) {
        const aliases = p.aliases.filter(a => !out.includes(a));
        const expected = new Set(
          withDerived(productKey(p.name), [
            ...head.allergens,
            ...allergenKeywords(p.name),
            ...aliases.flatMap(allergenHints)
          ])
        );
        const outHints = new Set(out.flatMap(allergenHints));
        const allergens = p.allergens.filter(a => expected.has(a) || !outHints.has(a));
        p = { ...p, aliases, allergens };
        plan.apart.push({ product: p, out, removed: original.allergens.filter(a => !allergens.includes(a)) });
        touched.add(p.id);
      }
    }
    const f = productFamilyFor(p.name, p.allergens);
    const vague = f?.kind === 'junk' || f?.kind === 'generic';
    // Uit elkaar halen: namen die bij een ander product horen ("citroensap" in Citrus hoort bij Citroen). Is het
    // product zelf te algemeen (Citrus) of een mengsel (Kruiden), dan gaat alles wat ergens anders hoort weg.
    const wide = vague || (f?.kind === 'known' && f.name === 'Kruiden');
    const moves = new Map();
    const keep = [];
    const move = (fam, a) => {
      if (!moves.has(fam.key)) moves.set(fam.key, { fam, aliases: [] });
      moves.get(fam.key).aliases.push(a);
    };
    for (const a of p.aliases) {
      const fa = productFamily(a);
      const strong = ['produce', 'fish', 'known', 'head'].includes(fa?.kind);
      if (fa?.key && fa.key !== f?.key && (strong || wide)) move(fa, a);
      else if (!vague && fa?.key && f?.key && fa.key !== f.key && foreignAlias(a, p, byWord)) {
        // "chocolade melk" bij Melk: er staat een ander ingrediënt in. Past het bij dat product, dan daarheen;
        // anders een eigen product.
        const other = foreignAlias(a, p, byWord);
        const hints = allergenHints(a);
        const fits = hints.every(x => other.allergens.includes(x) || FAMILY_SOFT_ALLERGENS.has(x));
        move(fits ? productFamilyFor(other.name, other.allergens) || fa : fa, a);
      } else if (!vague) keep.push(a);
    }
    if (moves.size) {
      plan.split.push({ product: p, moves: [...moves.values()], keep, drop: vague });
      touched.add(p.id);
      continue;
    }
    if (vague) {
      plan.remove.push({ product: p, kind: f.kind });
      continue;
    }
    if (!f?.key) continue;
    if (!clusters.has(f.key)) clusters.set(f.key, { fam: f, members: [], names: new Map() });
    const c = clusters.get(f.key);
    c.members.push(p);
    c.names.set(f.name, (c.names.get(f.name) || 0) + 1);
  }
  for (const { fam, members, names } of clusters.values()) {
    // Naam: bij een groep, vissoort of vakkennis de vaste naam. Anders een product dat al zo heet ("Tomaat" naast
    // "Tomatensap"), of de kern die het vaakst voorkomt ("Kersen" uit "Kersen coulis" en "Kersen puree").
    const sameName = (a, b) => compactKey(productKey(a)) === compactKey(productKey(b));
    // Een rommelige naam ("Of butter =", "…. gram wasabi poeder") wordt netjes, ook als er niets samen te voegen is.
    const messy = n => /[=:…]|^[^a-zà-ÿ]|^(of|x|b|grams?|gram)\s/i.test(n.trim());
    const plain = members.find(
      p => !messy(p.name) && (names.has(p.name) || [...names.keys()].some(n => sameName(n, p.name)))
    );
    const name =
      fam.kind !== 'base'
        ? fam.name
        : plain
          ? plain.name
          : [...names].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)[0][0];
    const target = members.find(p => sameName(p.name, name)) || members[0];
    if (members.length === 1 && (target.name === name || (sameName(target.name, name) && !messy(target.name))))
      continue;
    const key = productKey(name);
    const aliases = [
      ...new Set(members.flatMap(p => [p.name, ...p.aliases].map(productKey)).filter(k => k && k !== key))
    ].slice(0, 500);
    // Per product wat de naam doet vermoeden, met de uitzonderingen van dat product zelf: "amandelmelk" is geen
    // zuivel, ook niet als het onder Amandel komt.
    const all = [
      ...members.flatMap(p => withDerived(productKey(p.name), [...p.allergens, ...allergenKeywords(p.name)])),
      ...fam.allergens
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
  const total =
    plan.recipe.length +
    plan.apart.length +
    plan.split.length +
    plan.merge.length +
    plan.remove.length +
    plan.fix.length;
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
  const splits = plan.split.map((x, i) =>
    check(
      'split',
      i,
      `<b translate="no">${esc(x.product.name)}</b><span class="autolink-arrow">→</span><span translate="no">${esc(x.moves.map(m => m.fam.name).join(', '))}</span>${x.drop ? `<small>${t('daarna weg')}</small>` : ''}`
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
  const aparts = plan.apart.map((x, i) =>
    check(
      'apart',
      i,
      `<span translate="no">${esc(x.out.join(', '))}</span><span class="autolink-arrow">→</span><b>${t('eigen product')}</b><small translate="no">${esc(t('uit'))} ${esc(x.product.name)}${x.removed.length ? ` · − ${esc(allergenNames(x.removed))}` : ''}</small>`
    )
  );
  const removes = plan.remove.map((x, i) => check('remove', i, `<b translate="no">${esc(x.product.name)}</b>`));
  document.getElementById('productCleanup')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="productCleanup" role="dialog" aria-modal="true" aria-labelledby="productCleanupTitle"><div class="sv-dialog-box allergen-check-box">${modalCloseHtml()}<h2 id="productCleanupTitle" class="sv-dialog-title">Producten opruimen</h2><p class="sv-dialog-text">Dit gaat Savour doen. Klik op een regel om te zien wat het is, en zet een vinkje uit als je iets wilt laten staan.</p>${section(
      'producten uit elkaar halen',
      splits,
      'Namen die bij een ander product horen, gaan naar dat product. Bestaat het nog niet, dan maakt Savour het.'
    )}${section(
      'schrijfwijzen worden een eigen product',
      aparts,
      'Deze namen hebben een allergeen dat het hoofdproduct niet heeft, zoals FODMAP in amandelpasta of alcohol in likeur. Ze worden een eigen product; wat alleen die naam meebracht, gaat bij het hoofdproduct af.'
    )}${section(
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
    const picked = {
      recipe: chosen('recipe'),
      apart: chosen('apart'),
      split: chosen('split'),
      merge: chosen('merge'),
      fix: chosen('fix'),
      remove: chosen('remove')
    };
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
  // 1b. Schrijfwijzen met een eigen allergeen: eerst het eigen product (of erbij bij een product dat er al is), pas
  // daarna weg bij het hoofdproduct. Wordt het hoofdproduct ook samengevoegd, dan doet stap 2 dat laatste.
  const merged = new Set(plan.merge.flatMap(x => x.members.map(p => p.id)));
  for (const x of plan.apart) {
    const groups = new Map();
    for (const a of x.out) {
      const fam = productFamilyFor(a, allergenHints(a));
      const g = groups.get(fam.key) || { fam, aliases: [] };
      g.aliases.push(a);
      groups.set(fam.key, g);
    }
    let ok = true;
    const byFamily = productsByFamily(scope);
    const rows = [];
    for (const { fam, aliases } of groups.values()) {
      const hints = aliases.flatMap(allergenHints);
      const target = byFamily.get(fam.key);
      if (target && target.id !== x.product.id) {
        const allergens = withDerived(productKey(target.name), [...target.allergens, ...hints]).filter(
          a => target.allergens.includes(a) || allergenShown(a, scope)
        );
        const all = [...new Set([...target.aliases, ...aliases])].slice(0, 500);
        if (!(await writeProduct({ ...target, aliases: all, allergens }))) ok = false;
      } else {
        const key = productKey(fam.name);
        rows.push({
          scope,
          name: fam.name,
          aliases: aliases.filter(a => productKey(a) !== key),
          allergens: withDerived(key, [...fam.allergens, ...allergenKeywords(fam.name), ...hints]).filter(a =>
            allergenShown(a, scope)
          ),
          known: true,
          note: ''
        });
      }
    }
    if (rows.length && !(await insertProducts(rows))) ok = false;
    if (!ok) continue;
    if (!merged.has(x.product.id)) await writeProduct(x.product);
    done++;
  }
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
  // 3. Uit elkaar halen, één product tegelijk: eerst de namen bij het juiste product (of een nieuw product), pas
  // daarna weg bij het oude. Allergenen die de namen doen vermoeden, komen erbij.
  for (const x of plan.split) {
    let ok = true;
    const byFamily = productsByFamily(scope);
    const rows = [];
    for (const m of x.moves) {
      const hints = m.aliases.flatMap(allergenHints);
      const target = byFamily.get(m.fam.key);
      if (target && target.id !== x.product.id) {
        const allergens = withDerived(productKey(target.name), [...target.allergens, ...hints]).filter(
          a => target.allergens.includes(a) || allergenShown(a, scope)
        );
        const aliases = [...new Set([...target.aliases, ...m.aliases])].slice(0, 500);
        if (!(await writeProduct({ ...target, aliases, allergens }))) ok = false;
      } else {
        const key = productKey(m.fam.name);
        rows.push({
          scope,
          name: m.fam.name,
          aliases: [...new Set(m.aliases.filter(a => a !== key))].slice(0, 500),
          allergens: withDerived(key, [...m.fam.allergens, ...allergenKeywords(m.fam.name), ...hints]).filter(a =>
            allergenShown(a, scope)
          ),
          known: true,
          note: ''
        });
      }
    }
    if (rows.length && !(await insertProducts(rows))) ok = false;
    if (!ok) continue;
    if (x.drop) await deleteProduct(x.product);
    else await writeProduct({ ...x.product, aliases: x.keep });
    done++;
  }
  // 4. Allergenen verbeteren.
  await inBatches(plan.fix, x => writeProduct({ ...x.product, allergens: x.allergens }));
  // 5. Weghalen.
  await inBatches(plan.remove, x => deleteProduct(x.product));
  saveOfflineSnapshot();
  return done;
}

// ---- Receptregels nakijken ----
// Dezelfde controle als bij het importeren (readerLineChecks), nu over je bestaande recepten, plus regels die
// geen ingrediënt zijn ("gas patronen", "laten trekken"). Elke regel met een vinkje; er verandert alleen wat je
// aangevinkt laat, en per recept wordt alles in één keer opgeslagen.
function recipeLineCheckPlan(scope) {
  const rows = [];
  for (const r of recipesForProductScope(scope)) {
    if (r.teamId || !Array.isArray(r.ingredients)) continue;
    const found = new Set();
    for (const c of readerLineChecks(r.ingredients)) {
      rows.push({ recipe: r, ...c });
      found.add(c.line);
    }
    for (const line of r.ingredients) {
      if (found.has(line) || recipePartName(line)) continue;
      if (productFamily(ingredientKey(line))?.kind === 'junk')
        rows.push({ recipe: r, line, to: '', why: 'Geen ingrediënt', action: 'remove' });
    }
  }
  return rows;
}

function openRecipeLineCheck() {
  const scope = productScope;
  if (scope !== 'own' || !canEditProducts(scope)) return;
  const rows = recipeLineCheckPlan(scope);
  if (!rows.length) {
    toast('Geen rommelige regels gevonden');
    return;
  }
  const label = { replace: 'aanpassen', step: 'naar de bereiding', remove: 'weghalen' };
  const groups = ['remove', 'step', 'replace']
    .map(action => {
      const items = rows
        .map((x, i) => [x, i])
        .filter(([x]) => x.action === action)
        .map(
          ([x, i]) =>
            `<li class="cleanup-row"><label><input type="checkbox" checked data-i="${i}"><span class="cleanup-text"><span translate="no">${esc(x.line)}</span>${x.action === 'replace' ? `<span class="autolink-arrow">→</span><b translate="no">${esc(x.to)}</b>` : ''}<small translate="no">${esc(x.recipe.title)}</small></span></label></li>`
        );
      return items.length
        ? `<details class="autolink-section"><summary><b>${items.length}</b> <span>${t(`regels ${label[action]}`)}</span></summary><ul class="autolink-list cleanup-list">${items.join('')}</ul></details>`
        : '';
    })
    .join('');
  document.getElementById('recipeLineCheck')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="recipeLineCheck" role="dialog" aria-modal="true" aria-labelledby="recipeLineCheckTitle"><div class="sv-dialog-box allergen-check-box">${modalCloseHtml()}<h2 id="recipeLineCheckTitle" class="sv-dialog-title">Receptregels nakijken</h2><p class="sv-dialog-text">Regels in je recepten die geen ingrediënt lijken, of een tikfout bevatten. Klik op een groep om de regels te zien, en zet een vinkje uit als je iets wilt laten staan.</p>${groups}<div class="sv-dialog-actions"><button type="button" class="btn" data-close>Annuleren</button><button type="button" class="btn gold" data-ok>Aanpassen</button></div></div></div>`
  );
  const el = $('recipeLineCheck');
  const close = () => el.remove();
  closableModal(el, close);
  el.querySelector('[data-close]').addEventListener('click', close);
  el.querySelector('[data-ok]').addEventListener('click', async ev => {
    const chosen = [...el.querySelectorAll('input[data-i]:checked')].map(b => rows[Number(b.dataset.i)]);
    ev.target.disabled = true;
    ev.target.textContent = t('Bezig met aanpassen…');
    const done = await runRecipeLineCheck(chosen);
    close();
    if (done) toast(done === 1 ? 'Regels aangepast in 1 recept' : `Regels aangepast in ${done} recepten`);
    renderProducts();
  });
}

async function runRecipeLineCheck(rows) {
  const byRecipe = new Map();
  for (const x of rows) byRecipe.set(x.recipe, [...(byRecipe.get(x.recipe) || []), x]);
  let done = 0;
  for (const [r, list] of byRecipe) {
    const ingredients = [...r.ingredients];
    const steps = [...(r.steps || [])];
    for (const x of list) {
      const at = ingredients.indexOf(x.line);
      if (at < 0) continue;
      if (x.action === 'replace') ingredients[at] = x.to;
      else {
        ingredients.splice(at, 1);
        if (x.action === 'step') steps.push(x.line);
      }
    }
    const fields = { ingredients, ...(steps.length !== (r.steps || []).length ? { steps } : {}) };
    if (await saveRecipeFields(r, fields)) {
      r.ingredients = ingredients;
      r.steps = steps;
      done++;
    }
  }
  saveOfflineSnapshot();
  return done;
}
