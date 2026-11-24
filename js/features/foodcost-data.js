// Foodcost: laden, opslaan en de demo (2026-11-24). Rekenen: foodcost.js; schermen: foodcost-screens.js.
//
// Alles is van jezelf (besluit eigenaar 24-11-2026): alleen jij ziet je prijzen, ook in een keukenteam. Toevoegen en
// wijzigen met Pro; wie stopt houdt alles (supabase/2026-11-24-foodcost.sql). Zolang die SQL nog niet is
// uitgevoerd, laadt Savour niets en toont het de calculator alleen in de demo.
//
// Een kostproduct (wat je inkoopt) heeft een naam en schrijfwijzen; Savour koppelt receptregels op dezelfde sleutel
// als de allergenen (ingredientKey). Een prijs wordt nooit overschreven: een nieuwe prijs is een nieuwe regel.

let costData = emptyCostData();
let costLoading = null;

function emptyCostData() {
  return {
    user: null, // voor wie geladen
    ready: false, // geladen (of demo)
    missing: false, // tabellen bestaan nog niet (SQL nog niet uitgevoerd)
    products: [],
    prices: [],
    suppliers: [],
    recipes: new Map(), // recipe_id → instellingen
    menus: [],
    menuItems: [],
    imports: [],
    settings: { target_pct: 30, vat_pct: 9 }
  };
}

// Mag deze gebruiker de calculator gebruiken (prijzen invullen)? Alles is Pro.
function costCanEdit() {
  return demoMode || isPro();
}
// Ziet de gebruiker de calculator? Met Pro, of als er al prijzen zijn (wie stopt met Pro houdt alles).
function costVisible() {
  return demoMode || isPro() || (costData.ready && costData.products.length > 0);
}

function ensureFoodcost() {
  const uid = currentUser?.id || null;
  // In de demo hangen de schrijfwijzen af van de taal van de demorecepten: na een taalwissel opnieuw vullen.
  if (costData.user !== uid || (demoMode && costData.lang !== currentLanguage)) {
    costData = emptyCostData();
    costLoading = null;
  }
  if (costData.ready || !uid) return Promise.resolve(costData);
  if (!costLoading)
    costLoading = loadFoodcost(uid).then(() => {
      costLoading = null;
      return costData;
    });
  return costLoading;
}

async function loadFoodcost(uid) {
  const next = emptyCostData();
  next.user = uid;
  if (demoMode) {
    next.lang = currentLanguage;
    fillDemoFoodcost(next);
    costData = next;
    return;
  }
  const q = t => supabaseClient.from(t).select('*');
  const [products, prices, suppliers, recipesRes, menus, items, settings, imports] = await Promise.all([
    q('cost_products').order('name'),
    q('cost_prices').order('valid_from', { ascending: false }).order('created_at', { ascending: false }),
    q('cost_suppliers').order('name'),
    q('cost_recipes'),
    q('cost_menus').order('created_at'),
    q('cost_menu_items').order('position'),
    q('cost_settings').maybeSingle(),
    supabaseClient
      .from('cost_imports')
      .select('id,supplier_id,file_name,approved,created_at')
      .order('created_at', { ascending: false })
      .limit(20)
  ]);
  if (products.error) {
    // Tabel bestaat nog niet: de SQL is nog niet uitgevoerd. Niets tonen dat niet kan werken.
    next.missing = /cost_products|does not exist|schema cache/i.test(products.error.message || '');
    next.ready = !next.missing;
    costData = next;
    return;
  }
  next.products = (products.data || []).map(costProductFromRow);
  next.prices = prices.data || [];
  next.suppliers = suppliers.data || [];
  (recipesRes.data || []).forEach(r => next.recipes.set(String(r.recipe_id), r));
  next.menus = menus.data || [];
  next.menuItems = items.data || [];
  next.imports = imports.data || [];
  if (settings.data) next.settings = settings.data;
  next.ready = true;
  costData = next;
}

function costProductFromRow(row) {
  return {
    ...row,
    id: String(row.id),
    aliases: Array.isArray(row.aliases) ? row.aliases : [],
    units: row.units && typeof row.units === 'object' ? row.units : {}
  };
}

// ---- Opzoeken ----

// Sleutel → kostproduct, op naam en schrijfwijzen.
function costProductIndex() {
  const map = new Map();
  costData.products.forEach(cp =>
    [cp.name, ...cp.aliases].forEach(n => {
      const k = productKey(n);
      if (k && !map.has(k)) map.set(k, cp);
    })
  );
  return map;
}

// De prijs die telt: de nieuwste van de vaste leverancier, anders de nieuwste. { price, supplier } of null.
function costCurrentPrice(cp) {
  const all = costPricesOf(cp);
  if (!all.length) return null;
  const pick = (cp.preferred_supplier_id && all.find(p => p.supplier_id === cp.preferred_supplier_id)) || all[0];
  return { price: pick, supplier: costSupplier(pick.supplier_id) };
}

function costPricesOf(cp) {
  return costData.prices
    .filter(p => String(p.product_id) === String(cp.id))
    .sort(
      (a, b) =>
        String(b.valid_from).localeCompare(String(a.valid_from)) ||
        String(b.created_at).localeCompare(String(a.created_at))
    );
}

function costSupplier(id) {
  return id ? costData.suppliers.find(s => String(s.id) === String(id)) || null : null;
}

function costRecipeSettings(id) {
  return costData.recipes.get(String(id)) || null;
}

// De wereld voor de rekenkern (fcRecipeCost) bij dit recept: dezelfde koppelingen als de allergenen.
function costWorld(r) {
  const byTitle = recipesByTitle(r);
  const index = costProductIndex();
  const scope = productScopeOf(r);
  const allergenIndex = productsReady ? productIndex(scope) : new Map();
  return {
    keyOf: ingredientKey,
    recipeFor: (rr, line) => ingredientLinkTarget(rr, line, byTitle),
    costProductFor: key => {
      const direct = index.get(key);
      if (direct) return direct;
      // Via het product voor de allergenen: "koude roomboter" is daar al gekoppeld aan Roomboter.
      const p = allergenIndex.get(key);
      if (p) for (const n of [p.name, ...p.aliases]) if (index.get(productKey(n))) return index.get(productKey(n));
      return null;
    },
    priceFor: costCurrentPrice,
    settingsFor: rr => costRecipeSettings(rr.id)
  };
}

function costOfRecipe(r) {
  return fcRecipeCost(r, costWorld(r));
}

// ---- Opslaan ----
// Elke schrijfactie geeft true/false en meldt een fout zelf. In de demo blijft alles in deze browser.

function costRowId() {
  return 'demo-' + Math.random().toString(36).slice(2, 10);
}

async function costWrite(table, row, { id = null, key = null } = {}) {
  if (demoMode) return { ...row, id: id || row.id || costRowId(), created_at: new Date().toISOString() };
  let res;
  if (id) res = await supabaseClient.from(table).update(row).eq('id', id).select().single();
  else if (key) res = await supabaseClient.from(table).upsert(row, { onConflict: key }).select().single();
  else res = await supabaseClient.from(table).insert(row).select().single();
  if (res.error) {
    console.warn(table, res.error);
    toast(
      /row-level security|permission/i.test(res.error.message || '')
        ? t('Opslaan lukt alleen met Savour Pro.')
        : t('Opslaan lukte niet. Probeer het opnieuw.')
    );
    return null;
  }
  return res.data;
}

async function costDelete(table, id) {
  if (demoMode) return true;
  const { error } = await supabaseClient.from(table).delete().eq('id', id);
  if (error) {
    toast(t('Verwijderen lukte niet. Probeer het opnieuw.'));
    return false;
  }
  return true;
}

async function saveCostProduct(cp) {
  const row = {
    name: cp.name.trim(),
    aliases: [...new Set(cp.aliases.map(a => String(a).trim()).filter(Boolean))].slice(0, 80),
    yield_pct: cp.yield_pct || null,
    density: cp.density || null,
    units: cp.units || {},
    preferred_supplier_id: cp.preferred_supplier_id || null,
    note: cp.note || ''
  };
  if (!demoMode) row.user_id = currentUser.id;
  const saved = await costWrite('cost_products', row, { id: cp.id && !String(cp.id).startsWith('new') ? cp.id : null });
  if (!saved) return null;
  const next = costProductFromRow({ ...cp, ...saved });
  costData.products = [...costData.products.filter(x => x.id !== next.id), next].sort((a, b) =>
    a.name.localeCompare(b.name, 'nl')
  );
  return next;
}

async function addCostPrice(price) {
  const row = {
    product_id: price.product_id,
    supplier_id: price.supplier_id || null,
    pack_text: price.pack_text || '',
    pack_qty: price.pack_qty,
    pack_unit: price.pack_unit,
    price: price.price,
    valid_from: price.valid_from || new Date().toISOString().slice(0, 10),
    source: price.source || 'hand',
    import_id: price.import_id || null,
    code: price.code || ''
  };
  if (!demoMode) row.user_id = currentUser.id;
  const saved = await costWrite('cost_prices', row);
  if (!saved) return null;
  costData.prices = [saved, ...costData.prices];
  return saved;
}

async function removeCostPrice(id) {
  if (!(await costDelete('cost_prices', id))) return false;
  costData.prices = costData.prices.filter(p => String(p.id) !== String(id));
  return true;
}

async function saveCostSupplier(s) {
  const row = { name: s.name.trim(), discount_pct: Number(s.discount_pct) || 0, note: s.note || '' };
  if (!demoMode) row.user_id = currentUser.id;
  const saved = await costWrite('cost_suppliers', row, { id: s.id || null });
  if (!saved) return null;
  costData.suppliers = [...costData.suppliers.filter(x => String(x.id) !== String(saved.id)), saved].sort((a, b) =>
    a.name.localeCompare(b.name, 'nl')
  );
  return saved;
}

async function saveCostRecipe(recipeId, changes) {
  const now = costRecipeSettings(recipeId) || {};
  const row = {
    recipe_id: recipeId,
    portions: now.portions ?? null,
    density: now.density ?? null,
    choices: now.choices || {},
    sell_price: now.sell_price ?? null,
    vat_pct: now.vat_pct ?? null,
    target_pct: now.target_pct ?? null,
    ...changes
  };
  if (!demoMode) row.user_id = currentUser.id;
  // Voorbeeldrecepten en recepten uit de demo staan niet in de database.
  const saved =
    demoMode || !isUuid(String(recipeId))
      ? { ...row }
      : await costWrite('cost_recipes', row, { key: 'user_id,recipe_id' });
  if (!saved) return null;
  costData.recipes.set(String(recipeId), saved);
  return saved;
}

async function saveCostSettings(changes) {
  const row = { ...costData.settings, ...changes };
  delete row.updated_at;
  if (!demoMode) row.user_id = currentUser.id;
  const saved = demoMode ? row : await costWrite('cost_settings', row, { key: 'user_id' });
  if (!saved) return null;
  costData.settings = saved;
  return saved;
}

// ---- Demo ----
// Prijzen voor een paar demorecepten, zodat je ziet hoe het werkt. Zelfbedachte prijzen, alleen voor de demo, en zo
// gekozen dat ze in de buurt liggen van een groothandel. Elk product hoort bij regels van demorecepten
// ([recept, regelnummer]); de schrijfwijzen komen uit die regels, zodat het in elke taal werkt.
// De beurre blanc is compleet (zout en peper tellen bewust niet mee); de eendenjus niet (knoflook: gewicht per teen
// ontbreekt), zodat je ziet wat "nog niet compleet" doet.
const DEMO_COST_PRODUCTS = [
  {
    lines: [
      ['beurre', 0],
      ['eendenjus', 1]
    ],
    pack: [1000, 'g'],
    price: 2.4,
    yield_pct: 90,
    units: { stuk: 30 }
  },
  { lines: [['beurre', 1]], pack: [750, 'ml'], price: 6.4, packText: 'fles 0,75 l' },
  {
    lines: [
      ['beurre', 2],
      ['rodeui', 1],
      ['mayonaise', 2]
    ],
    pack: [1000, 'ml'],
    price: 2.1,
    packText: 'fles 1 l'
  },
  {
    lines: [
      ['beurre', 3],
      ['eendenjus', 6],
      ['noisette', 0],
      ['mousse', 1]
    ],
    pack: [2500, 'g'],
    price: 18.9,
    packText: 'doos 10 × 250 g',
    supplier: 0
  },
  { lines: [['kalfsfond', 0]], pack: [10000, 'g'], price: 32, packText: 'doos 10 kg', supplier: 0 },
  { lines: [['kalfsfond', 1]], pack: [1000, 'g'], price: 1.1, yield_pct: 90, units: { stuk: 150 } },
  { lines: [['kalfsfond', 2]], pack: [1000, 'g'], price: 0.95, yield_pct: 85, units: { stuk: 100 } },
  { lines: [['kalfsfond', 3]], pack: [1000, 'g'], price: 2.2, wordOf: 3, wordGrams: 40 },
  { lines: [['kalfsfond', 4]], pack: [800, 'g'], price: 3.4, packText: 'blik 800 g', density: 1.1 },
  { lines: [['eendenjus', 0]], pack: [1000, 'g'], price: 2.5 },
  { lines: [['eendenjus', 2]], pack: [1000, 'g'], price: 6 },
  { lines: [['eendenjus', 3]], pack: [750, 'ml'], price: 9.95, packText: 'fles 0,75 l' },
  { lines: [['eendenjus', 5]], pack: [20, 'g'], price: 0.95, packText: 'bosje 20 g', wordOf: 5, wordGrams: 1 },
  { lines: [['mousse', 0]], pack: [2500, 'g'], price: 31.5, packText: 'zak 2,5 kg', supplier: 0 },
  { lines: [['mousse', 2]], pack: [30, 'stuk'], price: 7.2, packText: 'tray 30 stuks' },
  {
    lines: [
      ['mousse', 3],
      ['rodeui', 3]
    ],
    pack: [1000, 'g'],
    price: 1.5
  },
  { lines: [['mousse', 4]], pack: [1000, 'ml'], price: 4.2, packText: 'pak 1 l', density: 1 },
  // Kruidenolie en mayonaise staan op de demo-MEP-lijst: zo zie je de grondstoffen van een service.
  { lines: [['kruidenolie', 0]], pack: [1000, 'g'], price: 9 },
  { lines: [['kruidenolie', 1]], pack: [1000, 'g'], price: 18 },
  {
    lines: [
      ['kruidenolie', 2],
      ['mayonaise', 3]
    ],
    pack: [10000, 'ml'],
    price: 21.5,
    packText: 'can 10 l',
    supplier: 0
  },
  { lines: [['mayonaise', 0]], pack: [1, 'stuk'], price: 0.24, packText: 'per stuk' },
  { lines: [['mayonaise', 1]], pack: [1000, 'g'], price: 6.8, packText: 'pot 1 kg', density: 1.1 }
];
// Keuzes per recept: [recept, regelnummer, keuze].
const DEMO_COST_CHOICES = [
  ['beurre', 4, { skip: true }],
  ['beurre', 5, { skip: true }],
  ['kalfsfond', 5, { skip: true }],
  ['kalfsfond', 6, { fixed: 0.3 }],
  ['kruidenolie', 3, { skip: true }],
  ['mayonaise', 4, { skip: true }],
  ['mayonaise', 5, { skip: true }]
];
const DEMO_COST_RECIPES = {
  beurre: { target_pct: 30, sell_price: 4.5 },
  mousse: { sell_price: 9.5 },
  bloemkool: { sell_price: 6.5 },
  mayonaise: { density: 0.92 }, // 1 liter mayonaise weegt 0,92 kg: de MEP-lijst rekent in gram
  kruidenolie: {},
  eendenjus: {}
};
// Een voorbeeldkaart met verkoopcijfers, zodat je de menu engineering ziet. De bloemkoolcrème is nog niet compleet
// en telt daarom (zichtbaar) niet mee.
const DEMO_COST_MENU = [
  ['mousse', 120],
  ['beurre', 40],
  ['bloemkool', 35]
];

function fillDemoFoodcost(d) {
  d.suppliers = [{ id: 'demo-s-0', name: 'Groothandel', discount_pct: 4, note: '' }];
  const line = (key, i) => findRecipe('demo-' + key)?.ingredients[i] || '';
  DEMO_COST_PRODUCTS.forEach((x, n) => {
    const lines = x.lines.map(([k, i]) => line(k, i)).filter(Boolean);
    if (!lines.length) return;
    const name = ingredientNameOf(lines[0]).replace(/,.*$/, '').trim();
    const units = { ...(x.units || {}) };
    if (x.wordOf != null) {
      const a = fcLineAmount(lines[0]);
      if (a?.kind === 'woord') units[a.word] = x.wordGrams;
    }
    const id = 'demo-c-' + n;
    d.products.push({
      id,
      name: name.charAt(0).toLocaleUpperCase() + name.slice(1),
      aliases: lines.map(l => ingredientKey(l)),
      yield_pct: x.yield_pct || null,
      density: x.density || null,
      units,
      preferred_supplier_id: null,
      note: ''
    });
    const day = new Date();
    d.prices.push({
      id: 'demo-pr-' + n,
      product_id: id,
      supplier_id: x.supplier === 0 ? 'demo-s-0' : null,
      pack_text: x.packText || '',
      pack_qty: x.pack[0],
      pack_unit: x.pack[1],
      price: x.price,
      valid_from: day.toISOString().slice(0, 10),
      source: 'hand',
      created_at: day.toISOString()
    });
  });
  // Historie bij de roomboter: vorige maand goedkoper.
  const butter = d.prices.find(p => p.product_id === 'demo-c-3');
  if (butter) {
    const before = new Date(Date.now() - 32 * 86400000);
    d.prices.push({
      ...butter,
      id: 'demo-pr-old',
      price: 17.4,
      valid_from: before.toISOString().slice(0, 10),
      created_at: before.toISOString()
    });
  }
  Object.entries(DEMO_COST_RECIPES).forEach(([k, v]) => d.recipes.set('demo-' + k, { choices: {}, ...v }));
  DEMO_COST_CHOICES.forEach(([k, i, choice]) => {
    const l = line(k, i);
    if (!l) return;
    const rc = d.recipes.get('demo-' + k) || { choices: {} };
    rc.choices = { ...rc.choices, [ingredientKey(l)]: choice };
    d.recipes.set('demo-' + k, rc);
  });
  d.menus = [{ id: 'demo-m-0', name: 'Kaart (voorbeeld)', kind: 'kaart', price: null, period: '', archived: false }];
  d.menuItems = DEMO_COST_MENU.map(([k, sold], i) => ({
    id: 'demo-mi-' + i,
    menu_id: 'demo-m-0',
    recipe_id: 'demo-' + k,
    sold,
    position: i
  }));
  d.ready = true;
}
