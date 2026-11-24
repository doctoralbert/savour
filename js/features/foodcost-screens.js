// Foodcost: de schermen (2026-11-24). Rekenen: foodcost.js; laden en opslaan: foodcost-data.js.
//
// 1. Recept → blok "Kostprijs" onder de allergenen: prijs per portie, foodcost %, marge, verkoopprijs en doel, en
//    per regel het bedrag. Klik op een bedrag: waar het vandaan komt (openCostLine).
// 2. Venster per kostproduct: prijs per verpakking, leverancier, opbrengst, gewicht per stuk, historie.
// 3. Tools → Foodcost: gerechten, ingrediënten, leveranciers, menu's (met menu engineering) en instellingen.
//
// Betrouwbaar: een regel zonder prijs, opbrengst of omrekening is "nog niet compleet" en het totaal heet dan
// "minstens". Savour vult nooit zelf een prijs of hoeveelheid in; het recept verandert nooit door de calculator.

let costTab = 'dishes';
let costFilter = 'all';
let costMenuOpen = null;

// Tekst voor een attribuut dat de vertaler niet vanzelf vertaalt (data-label op de telefoon).
const fcT = s => (typeof translateText === 'function' && translateText(s)) || s;

// ---- Getallen ----
function fcLocale() {
  return { nl: 'nl-NL', en: 'en-GB', de: 'de-DE', es: 'es-ES', fr: 'fr-FR' }[currentLanguage] || 'nl-NL';
}
function fcMoney(n, digits = 2) {
  if (!Number.isFinite(n)) return '–';
  return new Intl.NumberFormat(fcLocale(), {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(n);
}
// Prijs per gram of milliliter is klein: dan meer cijfers achter de komma.
function fcUnitMoney(n) {
  return fcMoney(n, n > 0 && n < 0.1 ? 4 : 2);
}
function fcPct(n) {
  return Number.isFinite(n) ? `${formatNumber(Math.round(n * 10) / 10)}%` : '–';
}
function fcQty(value, unit) {
  if (unit === 'g' && value >= 1000) return `${formatNumber(Math.round(value / 10) / 100)} kg`;
  if (unit === 'ml' && value >= 1000) return `${formatNumber(Math.round(value / 10) / 100)} l`;
  const v = formatNumber(Math.round(value * 100) / 100);
  return unit === 'stuk' ? `${v} ${t(value === 1 ? 'stuk' : 'stuks')}` : `${v} ${unit}`;
}
function fcInputNumber(v) {
  const n = parseAmount(String(v ?? '').replace(/[€\s%]/g, ''));
  return Number.isFinite(n) ? n : null;
}
function fcNum(v) {
  return v == null || v === '' ? '' : String(v).replace('.', scaleDecimalComma() ? ',' : '.');
}

function costTarget(rc) {
  return Number(rc?.target_pct) || Number(costData.settings.target_pct) || 30;
}
function costVat(rc) {
  return rc?.vat_pct != null ? Number(rc.vat_pct) : Number(costData.settings.vat_pct ?? 9);
}

// Korte uitleg van een open regel, voor naast de regel.
function costStatusText(x) {
  return (
    {
      'geen-prijs': 'prijs invullen',
      'geen-product': 'prijs invullen',
      'geen-hoeveelheid': 'geen hoeveelheid',
      eenheid:
        x.steps?.need === 'density'
          ? 'gewicht per liter?'
          : x.steps?.need === 'stuk'
            ? 'gewicht per stuk?'
            : x.steps?.need === 'opbrengst'
              ? 'omrekening?'
              : 'gewicht per ' + x.steps?.need + '?',
      'basisrecept-open': 'basisrecept niet compleet',
      'geen-opbrengst': 'opbrengst basisrecept?',
      kring: 'kring',
      overgeslagen: 'telt niet mee',
      vast: 'vast bedrag'
    }[x.status] || ''
  );
}

// ---- 1. Kostprijs van een recept: venster onder het ⋯-menu van het recept ----
// Niet op de receptpagina zelf (besluit eigenaar 24-11-2026): wie in de keuken een recept opent, ziet geen prijzen.
async function openRecipeCostDialog(id = currentId) {
  const r = findRecipe(id);
  if (!r) return;
  document.querySelector('.rp-more')?.removeAttribute('open');
  if (!costCanEdit() && !costVisible()) return costProNotice();
  await ensureFoodcost();
  if (costData.missing)
    return toast(
      t('De foodcost calculator staat klaar, maar de database is nog niet bijgewerkt. Probeer het later nog eens.')
    );
  const c = costOfRecipe(r);
  const rc = costRecipeSettings(r.id);
  const el = costDialog(
    `<h2 class="sv-dialog-title"><span>${esc(t('Kostprijs'))}</span> · <span translate="no">${esc(r.title)}</span></h2><div class="rp-cost">${recipeCostBody(r, c, rc)}</div>`,
    'kp-recipe'
  );
  el.dataset.recipe = String(r.id);
}

function recipeCostBody(r, c, rc) {
  const edit = costCanEdit();
  const rid = escJs(r.id);
  const min = c.complete ? '' : `<em>${t('minstens')}</em>`;
  const per = c.perPortion;
  // Per liter of kilo: handig voor een basisrecept (fond, saus, deeg) dat in gerechten terugkomt.
  const y = fcYieldAmount(r.yield);
  const perBase = y && (y.kind === 'g' || y.kind === 'ml') ? (c.total / y.value) * 1000 : null;
  const figures = [
    `<div class="kp-fig"><span>${t('Per portie')}</span><b>${per != null ? min + fcMoney(per) : '–'}</b>${per != null ? `<small><span class="kp-n">${formatNumber(c.portions.value)}</span> <span>${esc(t('porties'))}</span></small>` : ''}</div>`,
    `<div class="kp-fig"><span>${t('Totaal')}</span><b>${min}${fcMoney(c.total)}</b>${r.yield ? `<small translate="no">${esc(r.yield)}</small>` : ''}</div>`,
    perBase != null &&
      `<div class="kp-fig"><span>${t(y?.kind === 'ml' ? 'Per liter' : 'Per kilo')}</span><b>${min + fcMoney(perBase)}</b></div>`
  ]
    .filter(Boolean)
    .join('');
  const portionsAsk =
    per == null
      ? `<p class="kp-ask">${icon('alert', { size: 14 })}<span>${esc(t('Hoeveel porties levert dit recept? Dan rekent Savour de prijs per portie uit.'))}</span>${edit ? `<button type="button" class="btn-quiet" onclick="askCostPortions('${rid}')">${t('Porties invullen')}</button>` : ''}</p>`
      : c.portions.source === 'kok' && edit
        ? `<p class="kp-note">${esc(t('Porties door jou ingevuld bij de kostprijs.'))} <button type="button" class="btn-quiet" onclick="askCostPortions('${rid}')">${t('Aanpassen')}</button></p>`
        : '';
  const scaled = window._savourScaled?.recipe?.id === r.id ? window._savourScaled.factor : 1;
  const scaledNote =
    scaled !== 1
      ? `<p class="kp-note kp-scaled"><span>${esc(t('Omgerekend'))}</span> × <span class="kp-n">${formatNumber(scaled)}</span>: <b>${c.complete ? '' : `<span>${esc(t('minstens'))}</span> `}<span class="kp-n">${fcMoney(c.total * scaled)}</span></b></p>`
      : '';
  return `<div class="kp-figures">${figures}</div>${portionsAsk}${scaledNote}${costLinesHtml(r, c, scaled)}<p class="rp-allergens-source">${esc(t('Prijzen zonder btw. Alleen jij ziet je prijzen, ook in een keukenteam.'))}</p><p class="rp-allergens-links"><button type="button" class="btn-quiet" onclick="closeCostDialog();go('foodcost')">${t('Alle prijzen')}</button></p>`;
}

// De regels van een recept of gerecht met hun bedrag; klik: waar het bedrag vandaan komt.
// removable: bij een gerecht een kruisje per onderdeel om het van het bord te halen.
function costLinesHtml(r, c, scaled = 1, removable = false) {
  const rid = escJs(r.id);
  const open = c.lines.filter(x => !FC_DONE.has(x.status)).length;
  const openNote = open
    ? `<p class="rp-allergens-open">${icon('alert', { size: 14 })}<span><span>${esc(t('Nog niet compleet'))}</span>: <b>${open}</b> <span>${esc(t(open === 1 ? 'regel' : 'regels'))}</span>. <span>${esc(t('Het totaal is daarom een ondergrens; Savour telt nooit een ontbrekende prijs als € 0.'))}</span></span></p>`
    : '';
  return `${openNote}<ul class="kp-lines">${c.lines
    .map(x => {
      const i = r.ingredients.indexOf(x.line);
      const done = FC_DONE.has(x.status);
      const amount =
        done && x.status !== 'overgeslagen'
          ? `<b>${fcMoney(x.cost * scaled)}</b>`
          : `<span class="${done ? 'kp-chip-quiet' : 'kp-chip'}">${esc(t(costStatusText(x)))}</span>`;
      const extra = x.status === 'vast' ? `<small>${esc(t('vast bedrag'))}</small>` : '';
      return `<li><button type="button" onclick="openCostLine('${rid}', ${i})"><span class="kp-line-name" translate="no">${esc(x.line)}</span>${extra}${amount}</button>${removable ? `<button type="button" class="btn-quiet kp-line-x" onclick="removeDishPart('${rid}', ${i})" aria-label="${esc(t('Verwijderen'))}">×</button>` : ''}</li>`;
    })
    .join('')}</ul>`;
}

async function askCostPortions(id) {
  if (!costCanEdit()) return costProNotice();
  const now = costRecipeSettings(id)?.portions;
  const v = await askText(
    t('Hoeveel porties levert dit recept? Leeg laten: Savour gebruikt de opbrengst van het recept.'),
    now ? fcNum(now) : ''
  );
  if (v === null) return;
  const n = v.trim() === '' ? null : fcInputNumber(v);
  if (n !== null && !(n > 0)) return toast(t('Vul een aantal in, bijvoorbeeld 12.'));
  if (await saveCostRecipe(id, { portions: n })) costRefresh();
}

function costProNotice() {
  toast(t('Prijzen invullen kan met Savour Pro.'));
}

// Alles wat kosten toont opnieuw tekenen (recept, Tools → Foodcost, MEP).
function costRefresh() {
  const active = document.querySelector('#appShell .view.active')?.id;
  // Het venster Kostprijs van een recept staat open: opnieuw tekenen met de nieuwe getallen.
  const open = $('costDialog');
  if (open?.querySelector('.kp-recipe') && open.dataset.recipe) openRecipeCostDialog(open.dataset.recipe);
  if (open?.querySelector('.kp-dish') && open.dataset.dish) openDishEditor(open.dataset.dish);
  if (active === 'foodcost') renderFoodcost();
  if (active === 'mep') renderMepCost();
}

// ---- Herleiding van één regel ----
function openCostLine(recipeId, index) {
  const r = costFindRecipe(recipeId);
  if (!r) return;
  const line = r.ingredients[index];
  const c = costOfRecipe(r);
  const x = c.lines.find(l => l.line === line);
  if (!x) return;
  const edit = costCanEdit();
  const s = x.steps || {};
  const rid = escJs(r.id);
  const key = escJs(x.key);
  const rows = [];
  const row = (label, value) =>
    rows.push(`<div class="kp-trace-row"><span>${esc(t(label))}</span><span>${value}</span></div>`);
  if (s.recipe) {
    row(
      'Basisrecept',
      `<button type="button" class="btn-quiet" onclick="closeCostDialog();openRecipe('${escJs(s.recipe.id)}')" translate="no">${esc(s.recipe.title)}</button>`
    );
    if (s.sub) row('Kosten basisrecept', `${s.sub.complete ? '' : esc(t('minstens')) + ' '}${fcMoney(s.sub.total)}`);
    if (s.yieldAmount) row('Opbrengst basisrecept', `<span translate="no">${esc(s.recipe.yield)}</span>`);
    if (s.amount) row('Gebruikt', `<span translate="no">${esc(s.amount.text)}</span>`);
    if (s.share != null) row('Deel van het basisrecept', fcPct(s.share * 100));
  } else {
    if (s.product) row('Product', `<b translate="no">${esc(s.product.name)}</b>`);
    if (s.price) {
      const sup = s.supplier ? ` · <span translate="no">${esc(s.supplier.name)}</span>` : '';
      row(
        'Inkoopprijs',
        `<span class="kp-n">${fcMoney(Number(s.price.price))}</span> <span>${esc(t('voor'))}</span> <span translate="no">${esc(s.price.pack_text || fcQty(Number(s.price.pack_qty), s.price.pack_unit))}</span>${sup} <small>${esc(costDate(s.price.valid_from))}</small>`
      );
    }
    if (s.unitPrice) {
      if (s.unitPrice.discount) row('Korting leverancier', fcPct(s.unitPrice.discount));
      const u = s.unitPrice.unit;
      row(
        'Prijs per eenheid',
        u === 'stuk'
          ? `<span class="kp-n">${fcUnitMoney(s.unitPrice.perUnit)}</span> <span>${esc(t('per stuk'))}</span>`
          : `<span class="kp-n">${fcMoney(s.unitPrice.perUnit * 1000)}</span> <span>${esc(t(u === 'g' ? 'per kg' : 'per liter'))}</span> <small>(${fcUnitMoney(s.unitPrice.perUnit)}/${u})</small>`
      );
    }
    if (s.amount)
      row(
        'In het recept',
        `<span translate="no">${esc(s.amount.text)}</span>${s.amount.range ? ` <small>${esc(t('(hoogste waarde)'))}</small>` : ''}`
      );
    if (s.used != null && s.unitPrice) row('Omgerekend', fcQty(s.used, s.unitPrice.unit));
    if (x.status === 'ok')
      row(
        'Opbrengst na schoonmaken',
        s.yieldPct
          ? `<span class="kp-n">${fcPct(s.yieldPct)}</span> → <span>${esc(t('inkoop'))}</span> <span class="kp-n">${fcQty(s.bought, s.unitPrice.unit)}</span>`
          : `<small>${esc(t('niet ingevuld, gerekend met 100%'))}</small>`
      );
  }
  const total = FC_DONE.has(x.status)
    ? `<div class="kp-trace-total"><span>${esc(t(x.status === 'overgeslagen' ? 'Telt bewust niet mee' : 'Kosten van deze regel'))}</span><b>${x.status === 'overgeslagen' ? '' : fcMoney(x.cost)}</b></div>`
    : `<div class="kp-trace-total is-open"><span>${esc(t('Nog niet compleet'))}</span><b>${esc(t(costStatusText(x)))}</b></div>`;
  const why = {
    'geen-product': 'Savour weet nog niet wat je hiervoor betaalt. Vul de prijs in zoals op je factuur.',
    'geen-prijs': 'Er staat nog geen prijs bij dit product.',
    'geen-hoeveelheid':
      'Er staat geen hoeveelheid in deze regel. Kies of hij niet meetelt of een vast bedrag krijgt, of zet een hoeveelheid in het recept.',
    eenheid:
      s.need === 'density'
        ? 'Het recept rekent in liters of lepels, de prijs in kilo’s (of andersom). Vul in hoeveel 1 liter weegt.'
        : s.need === 'stuk'
          ? 'Het recept rekent in stuks, de prijs in kilo’s (of andersom). Vul in hoeveel 1 stuk weegt.'
          : s.need === 'opbrengst'
            ? 'De hoeveelheid past niet bij de opbrengst van het basisrecept (bijvoorbeeld gram tegenover liter). Vul bij het basisrecept in hoeveel 1 liter weegt.'
            : 'Vul in hoeveel deze eenheid weegt.',
    'basisrecept-open': 'Het basisrecept is zelf nog niet compleet. Open het en vul daar de ontbrekende prijzen in.',
    'geen-opbrengst': 'Het basisrecept heeft geen opbrengst die Savour kan lezen, zoals "2 liter" of "10 porties".',
    kring: 'Dit basisrecept gebruikt dit recept zelf weer. Savour telt het daarom niet mee.'
  }[x.status];
  const product = s.product || null;
  const actions = [
    r.dish
      ? `<button type="button" class="btn-quiet" onclick="openDishEditor('${rid}')">← ${esc(t('Gerecht'))}</button>`
      : `<button type="button" class="btn-quiet" onclick="openRecipeCostDialog('${rid}')">← ${esc(t('Kostprijs'))}</button>`
  ];
  if (edit && !s.recipe)
    actions.push(
      `<button type="button" class="btn gold" onclick="closeCostDialog();openCostProductEditor({ id: '${escJs(product?.id || '')}', key: '${key}', line: '${escJs(line)}', recipeId: '${rid}' })">${esc(t(product ? 'Prijs of product aanpassen' : 'Prijs invullen'))}</button>`
    );
  if (edit && s.recipe && x.status === 'eenheid' && s.need === 'opbrengst')
    actions.push(
      `<button type="button" class="btn gold" onclick="closeCostDialog();askCostDensity('${escJs(s.recipe.id)}')">${esc(t('Gewicht per liter invullen'))}</button>`
    );
  if (edit) {
    if (x.status === 'overgeslagen' || x.status === 'vast')
      actions.push(
        `<button type="button" class="btn" onclick="setCostChoice('${rid}', '${key}', null)">${esc(t('Weer gewoon meetellen'))}</button>`
      );
    else {
      actions.push(
        `<button type="button" class="btn" onclick="setCostChoice('${rid}', '${key}', { skip: true })">${esc(t('Telt niet mee'))}</button>`
      );
      actions.push(
        `<button type="button" class="btn" onclick="askCostFixed('${rid}', '${key}')">${esc(t('Vast bedrag'))}</button>`
      );
    }
  }
  costDialog(
    `<h2 class="sv-dialog-title" translate="no">${esc(line)}</h2>${why && !FC_DONE.has(x.status) ? `<p class="kp-why">${esc(t(why))}</p>` : ''}<div class="kp-trace">${rows.join('')}</div>${total}${actions.length ? `<div class="kp-actions">${actions.join('')}</div>` : ''}`
  );
}

function costDate(d) {
  if (!d) return '';
  const x = new Date(String(d).slice(0, 10) + 'T12:00:00');
  return Number.isNaN(x.getTime())
    ? ''
    : x.toLocaleDateString(fcLocale(), { day: 'numeric', month: 'short', year: 'numeric' });
}

function costDialog(html, cls = '') {
  closeCostDialog();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="costDialog" role="dialog" aria-modal="true"><div class="sv-dialog-box kp-dialog ${cls}">${modalCloseHtml()}${html}</div></div>`
  );
  const el = $('costDialog');
  closableModal(el, closeCostDialog);
  return el;
}
function closeCostDialog() {
  $('costDialog')?.remove();
}

async function setCostChoice(recipeId, key, choice) {
  if (!costCanEdit()) return costProNotice();
  const choices = { ...(costRecipeSettings(recipeId)?.choices || {}) };
  if (choice) choices[key] = choice;
  else delete choices[key];
  if (!(await saveCostRecipe(recipeId, { choices }))) return;
  closeCostDialog();
  costRefresh();
}
async function askCostFixed(recipeId, key) {
  const v = await askText(
    t('Vast bedrag voor deze regel in het hele recept (zonder btw), bijvoorbeeld 0,10 voor wat zout en peper.'),
    ''
  );
  if (v === null) return;
  const n = fcInputNumber(v);
  if (!(n >= 0)) return toast(t('Vul een bedrag in, bijvoorbeeld 0,10.'));
  await setCostChoice(recipeId, key, { fixed: n });
}
async function askCostDensity(recipeId) {
  if (!costCanEdit()) return costProNotice();
  const now = costRecipeSettings(recipeId)?.density;
  const v = await askText(
    t('Hoeveel kilo weegt 1 liter van dit basisrecept? Bijvoorbeeld 1 voor een saus of fond, 1,3 voor een siroop.'),
    now ? fcNum(now) : ''
  );
  if (v === null) return;
  const n = v.trim() === '' ? null : fcInputNumber(v);
  if (n !== null && !(n > 0)) return toast(t('Vul een getal in, bijvoorbeeld 1,05.'));
  if (await saveCostRecipe(recipeId, { density: n })) costRefresh();
}

// ---- 2. Kostproduct: prijs, verpakking, opbrengst ----
// { id } bestaand product, of { key, line } voor een nieuw product vanuit een receptregel.
async function openCostProductEditor({ id = '', key = '', line = '', recipeId = '' } = {}) {
  if (!costCanEdit()) return costProNotice();
  await ensureFoodcost();
  let cp = id ? costData.products.find(p => p.id === String(id)) : null;
  if (!cp && key) cp = costWorld(findRecipe(recipeId) || { ingredients: [] }).costProductFor(key) || null;
  const name =
    cp?.name ||
    (line
      ? ingredientNameOf(line)
          .replace(/,.*$/, '')
          .replace(/\(.*?\)/g, '')
          .trim()
      : key);
  const p = cp || {
    id: '',
    name: name.charAt(0).toLocaleUpperCase() + name.slice(1),
    aliases: key ? [key] : [],
    yield_pct: null,
    density: null,
    units: {},
    preferred_supplier_id: null
  };
  if (key && cp && !cp.aliases.some(a => productKey(a) === key) && productKey(cp.name) !== key)
    p.aliases = [...cp.aliases, key];
  const amount = line ? fcLineAmount(line) : null;
  const word = amount?.kind === 'woord' ? amount.word : '';
  const words = [...new Set([...Object.keys(p.units || {}).filter(w => w !== 'stuk'), ...(word ? [word] : [])])];
  const current = cp ? costCurrentPrice(cp) : null;
  const history = cp ? costPricesOf(cp) : [];
  const hint = fcYieldHint(p.name);
  const supplierOptions = [`<option value="">${esc(t('Geen leverancier'))}</option>`]
    .concat(
      costData.suppliers.map(
        s =>
          `<option value="${esc(s.id)}"${String(current?.price?.supplier_id || p.preferred_supplier_id || '') === String(s.id) ? ' selected' : ''}>${esc(s.name)}${Number(s.discount_pct) ? ` (−${fcPct(Number(s.discount_pct))})` : ''}</option>`
      )
    )
    .concat(`<option value="new">${esc(t('Nieuwe leverancier…'))}</option>`)
    .join('');
  const hist = history.length
    ? `<details class="kp-history"${history.length > 1 ? '' : ''}><summary><span>${esc(t('Prijshistorie'))}</span> <span class="kp-n">${history.length}</span></summary><ul>${history
        .map(
          h =>
            `<li><span>${esc(costDate(h.valid_from))}</span><span translate="no">${esc(h.pack_text || fcQty(Number(h.pack_qty), h.pack_unit))}</span><b>${fcMoney(Number(h.price))}</b><span translate="no">${esc(costSupplier(h.supplier_id)?.name || '')}</span><button type="button" class="btn-quiet" onclick="removeCostPriceAsk('${escJs(h.id)}', '${escJs(p.id)}')" aria-label="${esc(t('Verwijderen'))}">×</button></li>`
        )
        .join('')}</ul></details>`
    : '';
  const el = costDialog(
    `<h2 class="sv-dialog-title">${esc(t(cp ? 'Prijs en product' : 'Prijs invullen'))}</h2>
    ${!cp && key && costData.products.length ? `<div class="kp-pick"><p class="kp-why">${esc(t('Staat dit ingrediënt al in je prijslijst, bijvoorbeeld uit een ingeladen lijst van je leverancier? Kies het daar; Savour onthoudt dat deze naam bij dat product hoort.'))}</p><button type="button" class="btn gold" onclick="pickCostProductFor('${escJs(key)}', '${escJs(line)}', '${escJs(recipeId)}')">${esc(t('Kies uit je prijslijst'))}</button><p class="kp-or">${esc(t('of vul een nieuwe prijs in:'))}</p></div>` : ''}
    <form class="kp-form" novalidate onsubmit="event.preventDefault();saveCostProductForm()">
      <input type="hidden" name="id" value="${esc(p.id)}">
      <label class="product-field"><span>${t('Product')}</span><input class="sv-dialog-input" name="name" value="${esc(p.name)}" required translate="no"></label>
      <label class="product-field"><span>${t('Ook in recepten als')}</span><input class="sv-dialog-input" name="aliases" value="${esc(p.aliases.join(', '))}" translate="no"><small class="muted">${esc(t('Gescheiden door komma’s. Elke naam koppelt de ingrediëntregels met die naam aan deze prijs.'))}</small></label>
      <fieldset class="kp-fieldset"><legend>${t(current ? 'Nieuwe prijs (de oude blijft bewaard)' : 'Prijs')}</legend>
        <label class="product-field"><span>${t('Leverancier')}</span><select class="sv-dialog-input" name="supplier">${supplierOptions}</select></label>
        <label class="product-field"><span>${t('Verpakking zoals op de factuur')}</span><input class="sv-dialog-input" name="pack" value="${esc(current?.price?.pack_text || '')}" placeholder="${esc(t('Bijv. doos 6 × 1 kg, fles 0,75 l, per stuk'))}" oninput="costPackPreview()" translate="no"></label>
        <div class="kp-row"><label class="product-field"><span>${t('Inhoud')}</span><input class="sv-dialog-input" name="qty" inputmode="decimal" value="${esc(current ? fcNum(costPackShown(current.price).qty) : '')}"></label><label class="product-field"><span>${t('Eenheid')}</span><select class="sv-dialog-input" name="unit">${['kg', 'g', 'l', 'ml', 'stuk'].map(u => `<option value="${u}"${current && costPackShown(current.price).unit === u ? ' selected' : ''}>${esc(t(u === 'stuk' ? 'stuks' : u))}</option>`).join('')}</select></label><label class="product-field"><span>${t('Prijs zonder btw')} (€)</span><input class="sv-dialog-input" name="price" inputmode="decimal" placeholder="${esc(current ? fcNum(Number(current.price.price)) : '')}"></label></div>
        <small class="muted" id="costPackNote">${current ? `<span>${esc(t('Nu'))}</span>: <span class="kp-n">${fcMoney(Number(current.price.price))}</span> · <span class="kp-n">${esc(costDate(current.price.valid_from))}</span>. <span>${esc(t('Laat de prijs leeg om niets te veranderen.'))}</span>` : ''}</small>
        <label class="product-field kp-date"><span>${t('Geldig vanaf')}</span><input class="sv-dialog-input" type="date" name="from" value="${new Date().toISOString().slice(0, 10)}"></label>
      </fieldset>
      <fieldset class="kp-fieldset"><legend>${t('Omrekenen')}</legend>
        <label class="product-field"><span>${t('Opbrengst na schoonmaken')} (%)</span><input class="sv-dialog-input" name="yield" inputmode="decimal" value="${esc(fcNum(p.yield_pct ?? ''))}" placeholder="100"><small class="muted"><span>${esc(t('Leeg: Savour rekent met 100% en zegt dat erbij.'))}</span>${hint ? ` <span>${esc(t('Gangbaar'))}</span>: <span class="kp-n">${esc(hint)}</span> (Apicbase).` : ''}</small></label>
        <div class="kp-row"><label class="product-field"><span>${t('1 stuk weegt')} (g)</span><input class="sv-dialog-input" name="piece" inputmode="decimal" value="${esc(fcNum(p.units?.stuk ?? ''))}"></label><label class="product-field"><span>${t('1 liter weegt')} (kg)</span><input class="sv-dialog-input" name="density" inputmode="decimal" value="${esc(fcNum(p.density ?? ''))}"></label></div>
        ${words.map(w => `<label class="product-field"><span>1 <span translate="no">${esc(w)}</span> ${t('weegt')} (g)</span><input class="sv-dialog-input" name="word:${esc(w)}" inputmode="decimal" value="${esc(fcNum(p.units?.[w] ?? ''))}"></label>`).join('')}
        <small class="muted">${esc(t('Alleen nodig als het recept in stuks of lepels rekent en de prijs in kilo’s (of andersom). Savour vult dit nooit zelf in.'))}</small>
      </fieldset>
      ${hist}
      <div class="kp-actions"><button type="submit" class="btn gold">${t('Opslaan')}</button>${cp ? `<button type="button" class="btn-quiet kp-danger" onclick="removeCostProductAsk('${escJs(cp.id)}')">${t('Product verwijderen')}</button>` : ''}</div>
    </form>`,
    'kp-editor'
  );
  el.dataset.recipe = recipeId;
  el.querySelector('select[name=supplier]').addEventListener('change', async e => {
    if (e.target.value !== 'new') return;
    const s = await askCostSupplier();
    if (!s) {
      e.target.value = '';
      return;
    }
    e.target.insertAdjacentHTML('beforeend', `<option value="${esc(s.id)}">${esc(s.name)}</option>`);
    e.target.value = s.id;
  });
  if (!current) el.querySelector('input[name=pack]').focus();
}

// Zoekvenster met je kostproducten (bijv. de ingeladen Hanos-lijst). Kiezen voegt de naam uit het recept toe als
// schrijfwijze van dat product: daarna telt die regel (en elke andere met dezelfde naam) met die prijs.
function pickCostProductFor(key, line, recipeId) {
  const list = [...costData.products].sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  const words = productKey(ingredientNameOf(line) || key)
    .split(' ')
    .filter(w => w.length > 2);
  costDialog(
    `<h2 class="sv-dialog-title" translate="no">${esc(ingredientNameOf(line) || key)}</h2><p class="kp-why">${esc(t('Kies het product uit je prijslijst dat bij dit ingrediënt hoort.'))}</p><input class="sv-dialog-input" type="search" id="kpPickSearch" autocomplete="off" placeholder="${esc(t('Zoek in je prijslijst'))}" value="${esc(words[words.length - 1] || '')}"><div class="sv-dialog-choices kp-pick-results" id="kpPickResults"></div><div class="kp-actions"><button type="button" class="btn-quiet" onclick="openCostProductEditor({ key: '${escJs(key)}', line: '${escJs(line)}', recipeId: '${escJs(recipeId)}' })">← ${esc(t('Terug'))}</button></div>`,
    'kp-picker'
  );
  const input = $('kpPickSearch');
  const show = () => {
    const q = productKey(input.value);
    const found = list.filter(cp => !q || [cp.name, ...cp.aliases].some(n => productKey(n).includes(q)));
    $('kpPickResults').innerHTML =
      found
        .slice(0, 60)
        .map(cp => {
          const cur = costCurrentPrice(cp);
          const price = cur
            ? `${fcMoney(Number(cur.price.price))} · ${cur.price.pack_text || fcQty(Number(cur.price.pack_qty), cur.price.pack_unit)}`
            : t('geen prijs');
          return `<button type="button" class="sv-dialog-choice" onclick="linkCostProduct('${escJs(cp.id)}', '${escJs(key)}')"><span translate="no">${esc(cp.name)}</span><small translate="no">${esc(price)}</small></button>`;
        })
        .join('') || `<p class="muted">${esc(t('Niets gevonden. Probeer een ander woord.'))}</p>`;
  };
  input.addEventListener('input', show);
  show();
  input.focus();
}

async function linkCostProduct(id, key) {
  const cp = costData.products.find(p => p.id === String(id));
  if (!cp || !key) return;
  const saved = await saveCostProduct({ ...cp, aliases: [...cp.aliases, key] });
  if (!saved) return;
  closeCostDialog();
  toast(t('Gekoppeld'));
  costRefresh();
}

// Een verpakking zoals de kok hem leest: 6000 g → 6 kg.
function costPackShown(price) {
  const q = Number(price.pack_qty);
  if (price.pack_unit === 'g' && q >= 1000) return { qty: q / 1000, unit: 'kg' };
  if (price.pack_unit === 'ml' && q >= 1000) return { qty: q / 1000, unit: 'l' };
  return { qty: q, unit: price.pack_unit };
}

// Verpakking typen → inhoud en eenheid vanzelf invullen (en zichtbaar, zodat de kok het kan controleren).
function costPackPreview() {
  const form = document.querySelector('#costDialog .kp-form');
  if (!form) return;
  const parsed = fcParsePack(form.pack.value);
  if (!parsed) return;
  const shown = costPackShown({ pack_qty: parsed.qty, pack_unit: parsed.unit });
  form.qty.value = fcNum(Math.round(shown.qty * 1000) / 1000);
  form.unit.value = shown.unit;
}

async function saveCostProductForm() {
  const form = document.querySelector('#costDialog .kp-form');
  if (!form) return;
  const id = form.id.value;
  const before = id ? costData.products.find(p => p.id === id) : null;
  const name = form.name.value.trim();
  if (!name) return toast(t('Vul een naam in.'));
  const num = (v, check) => {
    if (String(v).trim() === '') return null;
    const n = fcInputNumber(v);
    return check(n) ? n : NaN;
  };
  const yieldPct = num(form.yield.value, n => n > 0 && n <= 100);
  const piece = num(form.piece.value, n => n > 0);
  const density = num(form.density.value, n => n > 0);
  if ([yieldPct, piece, density].some(Number.isNaN))
    return toast(t('Controleer de getallen: opbrengst tussen 1 en 100%, gewichten groter dan 0.'));
  const units = { ...(before?.units || {}) };
  if (piece) units.stuk = piece;
  else delete units.stuk;
  for (const input of form.querySelectorAll('input[name^="word:"]')) {
    const w = input.name.slice(5);
    const g = num(input.value, n => n > 0);
    if (Number.isNaN(g)) return toast(t('Controleer de getallen: opbrengst tussen 1 en 100%, gewichten groter dan 0.'));
    if (g) units[w] = g;
    else delete units[w];
  }
  // Nieuwe prijs: alleen als er een bedrag staat.
  let price = null;
  if (form.price.value.trim()) {
    const amount = fcInputNumber(form.price.value);
    const qty = fcInputNumber(form.qty.value);
    if (!(amount >= 0)) return toast(t('Vul een prijs in, bijvoorbeeld 18,90.'));
    if (!(qty > 0)) return toast(t('Vul de inhoud van de verpakking in, bijvoorbeeld 6 kg.'));
    const unit = form.unit.value;
    const base = unit === 'kg' ? ['g', 1000] : unit === 'l' ? ['ml', 1000] : [unit, 1];
    price = {
      supplier_id: form.supplier.value && form.supplier.value !== 'new' ? form.supplier.value : null,
      pack_text: form.pack.value.trim(),
      pack_qty: qty * base[1],
      pack_unit: base[0],
      price: amount,
      valid_from: form.from.value || new Date().toISOString().slice(0, 10)
    };
  } else if (!before && !piece && !density && !yieldPct) return toast(t('Vul een prijs in, bijvoorbeeld 18,90.'));
  const saved = await saveCostProduct({
    ...(before || {}),
    id,
    name,
    aliases: form.aliases.value
      .split(',')
      .map(a => a.trim())
      .filter(Boolean),
    yield_pct: yieldPct,
    density,
    units,
    preferred_supplier_id: price?.supplier_id || before?.preferred_supplier_id || null
  });
  if (!saved) return;
  if (price && !(await addCostPrice({ ...price, product_id: saved.id }))) return;
  closeCostDialog();
  toast(t('Opgeslagen'));
  costRefresh();
}

async function removeCostPriceAsk(priceId, productId) {
  if (
    !(await askConfirm(
      t(
        'Deze prijs verwijderen? Gebruik dit alleen voor een vergissing: een nieuwe prijs voeg je toe, dan blijft de oude bewaard.'
      ),
      { danger: true, confirmLabel: t('Verwijderen') }
    ))
  )
    return;
  if (!(await removeCostPrice(priceId))) return;
  costRefresh();
  openCostProductEditor({ id: productId });
}
async function removeCostProductAsk(id) {
  const cp = costData.products.find(p => p.id === id);
  if (!cp) return;
  if (
    !(await askConfirm(`${cp.name}\n\n${t('Product en alle prijzen verwijderen? Je recepten veranderen niet.')}`, {
      danger: true,
      confirmLabel: t('Verwijderen')
    }))
  )
    return;
  if (!(await costDelete('cost_products', id))) return;
  costData.products = costData.products.filter(p => p.id !== id);
  costData.prices = costData.prices.filter(p => String(p.product_id) !== id);
  closeCostDialog();
  costRefresh();
}

async function askCostSupplier(s = null) {
  const name = await askText(t('Naam van de leverancier'), s?.name || '');
  if (name === null || !name.trim()) return null;
  const d = await askText(
    t('Korting die je bij deze leverancier hebt afgesproken, in procenten. Leeg of 0: geen korting.'),
    s ? fcNum(s.discount_pct) : ''
  );
  if (d === null) return null;
  const pct = d.trim() === '' ? 0 : fcInputNumber(d);
  if (!(pct >= 0 && pct < 100)) {
    toast(t('Vul een percentage tussen 0 en 99 in.'));
    return null;
  }
  return saveCostSupplier({ id: s?.id || null, name: name.trim(), discount_pct: pct, note: s?.note || '' });
}

// ---- 3. Tools → Foodcost ----
function renderFoodcost() {
  const host = $('foodcostBody');
  if (!host) return;
  if (!costData.ready || costData.user !== (currentUser?.id || null)) {
    host.innerHTML = `<p class="muted">${esc(t('Laden…'))}</p>`;
    ensureFoodcost().then(
      () => document.querySelector('#appShell .view.active')?.id === 'foodcost' && renderFoodcost()
    );
    return;
  }
  if (
    costData.missing ||
    (costTab !== 'recipes' &&
      costTab !== 'ingredients' &&
      costTab !== 'suppliers' &&
      costTab !== 'settings' &&
      costData.dishesMissing)
  ) {
    host.innerHTML = `<div class="panel"><h3>${t('Foodcost')}</h3><p class="muted">${esc(t('De foodcost calculator staat klaar, maar de database is nog niet bijgewerkt. Probeer het later nog eens.'))}</p></div>`;
    return;
  }
  if (!costVisible()) {
    host.innerHTML = `<div class="panel products-pro"><h3>${t('Foodcost per gerecht')} <span class="pro-tag">Pro</span></h3><p class="muted">${esc(t('Savour rekent de kostprijs van je gerechten uit met de recepten die er al staan: per portie, door basisrecepten heen, met je eigen inkoopprijzen en korting. Een ontbrekende prijs telt nooit als € 0. Alleen jij ziet je prijzen.'))}</p><button class="btn gold" onclick="openProNav()">${t('Savour Pro bekijken')}</button></div>`;
    return;
  }
  const tabs = [
    ['dishes', 'Gerechten'],
    ['recipes', 'Recepten'],
    ['ingredients', 'Ingrediënten'],
    ['suppliers', 'Leveranciers'],
    ['menus', 'Menu’s'],
    ['settings', 'Instellingen']
  ];
  const body =
    costTab === 'ingredients'
      ? costIngredientsHtml()
      : costTab === 'suppliers'
        ? costSuppliersHtml()
        : costTab === 'menus'
          ? costMenusHtml()
          : costTab === 'settings'
            ? costSettingsHtml()
            : costTab === 'recipes'
              ? costRecipesHtml()
              : costDishesHtml();
  host.innerHTML = `<div class="kp-tabs" role="tablist">${tabs.map(([id, label]) => `<button type="button" role="tab" aria-selected="${costTab === id}" class="${costTab === id ? 'is-on' : ''}" onclick="setCostTab('${id}')">${esc(t(label))}</button>`).join('')}</div>${body}`;
}
function setCostTab(tab) {
  costTab = tab;
  costMenuOpen = null;
  renderFoodcost();
}

// Recepten waar de kok kosten van kan zien: eigen recepten en die uit keukenteams.
function costAllRecipes() {
  const seen = new Set();
  return [...recipes, ...(typeof sharedRecipes !== 'undefined' ? sharedRecipes : [])].filter(r => {
    if (!r || seen.has(String(r.id)) || !(r.ingredients || []).some(x => !recipePartName(x))) return false;
    seen.add(String(r.id));
    return true;
  });
}

function costRecipeRows() {
  return costAllRecipes()
    .map(r => {
      const c = costOfRecipe(r);
      const priced = c.lines.some(x => FC_DONE.has(x.status) && x.status !== 'overgeslagen');
      return { r, c, priced };
    })
    .sort((a, b) => a.r.title.localeCompare(b.r.title, 'nl'));
}

function costRecipesHtml() {
  const rows = costRecipeRows();
  const started = rows.filter(x => x.priced);
  const filters = [
    ['all', 'Met prijzen', started.length],
    ['open', 'Niet compleet', started.filter(x => !x.c.complete).length],
    ['none', 'Nog zonder prijzen', rows.length - started.length]
  ];
  const list =
    costFilter === 'open'
      ? started.filter(x => !x.c.complete)
      : costFilter === 'none'
        ? rows.filter(x => !x.priced)
        : started;
  const intro = started.length
    ? ''
    : `<div class="kp-empty"><p>${esc(t('Nog geen prijzen. Begin bij Ingrediënten: daar staan de ingrediënten die het vaakst in je recepten voorkomen. Of open een recept en kies in het menu ⋯ Kostprijs.'))}</p><button type="button" class="btn gold" onclick="setCostTab('ingredients')">${esc(t('Naar ingrediënten'))}</button></div>`;
  return `${intro}<div class="kp-filters">${filters.map(([id, label, n]) => `<button type="button" class="kp-filter${costFilter === id ? ' is-on' : ''}" onclick="costFilter='${id}';renderFoodcost()">${esc(t(label))} <small>${n}</small></button>`).join('')}</div><div class="kp-table kp-recipes"><div class="kp-thead"><span>${t('Recept')}</span><span>${t('Per portie')}</span><span>${t('Totaal')}</span><span>${t('Opbrengst')}</span><span></span></div>${list
    .map(
      x =>
        `<button type="button" class="kp-trow" onclick="openRecipeCostDialog('${escJs(x.r.id)}')"><span class="kp-name" translate="no">${esc(x.r.title)}</span><span data-label="${esc(fcT('Per portie'))}">${x.priced && x.c.perPortion != null ? (x.c.complete ? '' : '≥ ') + fcMoney(x.c.perPortion) : '–'}</span><span data-label="${esc(fcT('Totaal'))}">${x.priced ? (x.c.complete ? '' : '≥ ') + fcMoney(x.c.total) : '–'}</span><span data-label="${esc(fcT('Opbrengst'))}" translate="no">${esc(x.r.yield || '')}</span><span>${x.priced && !x.c.complete ? `<span class="kp-chip">${x.c.open} ${esc(t('open'))}</span>` : ''}</span></button>`
    )
    .join('')}${list.length ? '' : `<p class="muted kp-none">${esc(t('Geen recepten in deze lijst.'))}</p>`}</div>`;
}

// ---- Gerechten: een bord uit recepten en ingrediënten ----
function costDishesHtml() {
  const edit = costCanEdit();
  const dishes = costData.dishes.filter(d => !d.archived).map(d => ({ d, ...costOfDish(d) }));
  const head = `<div class="kp-section-head"><h3>${esc(t('Gerechten'))} <small>${dishes.length}</small></h3>${edit ? `<div class="kp-head-actions"><button type="button" class="btn btn-sm gold" onclick="newCostDish()">${esc(t('Gerecht maken'))}</button></div>` : ''}</div><p class="muted">${esc(t('Een gerecht is een bord zoals het op de kaart staat: porties van je recepten en losse ingrediënten, met een verkoopprijs. Bijvoorbeeld 160 g kabeljauw, 1 portie beurre blanc en 1 portie bloemkoolcrème.'))}</p>`;
  if (!dishes.length) return `<section class="kp-section">${head}</section>`;
  return `<section class="kp-section">${head}<div class="kp-table kp-dishes"><div class="kp-thead"><span>${t('Gerecht')}</span><span>${t('Kostprijs')}</span><span>${t('Verkoopprijs')}</span><span>${t('Foodcost %')}</span><span>${t('Marge')}</span></div>${dishes
    .map(
      x =>
        `<button type="button" class="kp-trow${x.over ? ' is-over' : ''}" onclick="openDishEditor('${escJs(x.d.id)}')"><span class="kp-name" translate="no">${esc(x.d.name)}</span><span data-label="${esc(fcT('Kostprijs'))}">${(x.c.complete ? '' : '≥ ') + fcMoney(x.c.total)}${x.c.complete ? '' : ` <span class="kp-chip">${x.c.open} ${esc(t('open'))}</span>`}</span><span data-label="${esc(fcT('Verkoopprijs'))}">${x.sell ? fcMoney(x.sell) : '–'}</span><span data-label="${esc(fcT('Foodcost %'))}">${x.pct != null ? (x.c.complete ? '' : '≥ ') + fcPct(x.pct) : '–'}</span><span data-label="${esc(fcT('Marge'))}">${x.margin != null ? fcMoney(x.margin) : '–'}</span></button>`
    )
    .join('')}</div></section>`;
}

async function newCostDish() {
  if (!costCanEdit()) return costProNotice();
  if (costData.dishesMissing)
    return toast(
      t('De foodcost calculator staat klaar, maar de database is nog niet bijgewerkt. Probeer het later nog eens.')
    );
  const name = await askText(t('Naam van het gerecht, zoals op de kaart'), '');
  if (name === null || !name.trim()) return;
  const d = await saveCostDish(
    { id: '', name: name.trim(), components: [], choices: {} },
    { name: name.trim(), components: [] }
  );
  if (!d) return;
  if (document.querySelector('#appShell .view.active')?.id === 'foodcost') renderFoodcost();
  openDishEditor(d.id);
}

function openDishEditor(id) {
  const d = costDish(id);
  if (!d) return;
  const edit = costCanEdit();
  const x = costOfDish(d);
  const did = escJs(d.id);
  const min = x.c.complete ? '' : `<em>${t('minstens')}</em>`;
  const suggest = fcSuggestedPrice(x.c.total, x.target);
  const vat = Number(costData.settings.vat_pct ?? 9);
  const figures = [
    `<div class="kp-fig"><span>${t('Kostprijs per bord')}</span><b>${min}${fcMoney(x.c.total)}</b></div>`,
    `<div class="kp-fig${x.over ? ' is-over' : ''}"><span>${t('Foodcost %')}</span><b>${x.pct != null ? (x.c.complete ? '' : '≥ ') + fcPct(x.pct) : '–'}</b><small><span>${esc(t('doel'))}</span> <span class="kp-n">${fcPct(x.target)}</span></small></div>`,
    `<div class="kp-fig"><span>${t('Marge per bord')}</span><b>${x.sell ? (x.c.complete ? '' : '≤ ') + fcMoney(x.sell - x.c.total) : '–'}</b>${x.sell && x.c.total > 0 ? `<small><span>${esc(t('factor'))}</span> <span class="kp-n">${formatNumber(Math.round((x.sell / x.c.total) * 10) / 10)}</span></small>` : ''}</div>`
  ].join('');
  const price = `<div class="kp-price"><label><span>${t('Verkoopprijs')} <small>(${t('zonder btw')})</small></span><input inputmode="decimal" value="${esc(fcNum(x.sell ?? ''))}" placeholder="${esc(suggest ? fcNum(Math.round(suggest * 100) / 100) : '')}" onchange="setDishField('${did}', 'sell_price', this.value)" ${edit ? '' : 'readonly'}></label><label><span>${t('Doel foodcost (%)')}</span><input inputmode="decimal" value="${esc(fcNum(d.target_pct ?? ''))}" placeholder="${esc(fcNum(x.target))}" onchange="setDishField('${did}', 'target_pct', this.value)" ${edit ? '' : 'readonly'}></label>${x.c.total > 0 ? `<p class="kp-suggest"><span>${esc(t('Voorgestelde prijs bij'))}</span> <span class="kp-n">${fcPct(x.target)}</span>: <b>${fcMoney(suggest)}</b> <span>${esc(t('zonder btw'))}</span> (<span class="kp-n">${fcMoney(fcWithVat(suggest, vat))}</span> <span>${esc(t('met btw'))}</span>)${x.c.complete ? '' : ` <em>${esc(t('of meer: nog niet compleet'))}</em>`}</p>` : ''}${x.sell ? `<p class="kp-note"><span>${esc(t('Op de kaart'))}</span>: <span class="kp-n">${fcMoney(fcWithVat(x.sell, vat))}</span> <span>${esc(t('met btw'))}</span></p>` : ''}${x.over ? `<p class="kp-alert">${icon('alert', { size: 14 })}<span>${esc(t('Boven je doel: deze prijs geeft meer foodcost dan je wilt.'))}</span></p>` : ''}</div>`;
  let allergens = '';
  try {
    if (productsVisible(productScopeOf(x.r))) allergens = allergenChips(recipeAllergenInfo(x.r).allergens, 'is-small');
  } catch (e) {}
  const parts = d.components.length
    ? costLinesHtml(x.r, x.c, 1, edit)
    : `<p class="muted">${esc(t('Nog geen onderdelen. Voeg een recept toe (bijvoorbeeld 1 portie beurre blanc) of een ingrediënt (bijvoorbeeld 160 g kabeljauwfilet).'))}</p>`;
  const el = costDialog(
    `<h2 class="sv-dialog-title" translate="no">${esc(d.name)}</h2><div class="rp-cost"><div class="kp-figures">${figures}</div>${price}${allergens ? `<div class="kp-allergens kp-dish-allergens">${allergens}</div>` : ''}<h3 class="kp-sub">${esc(t('Onderdelen per bord'))}</h3>${parts}${edit ? `<div class="kp-actions"><button type="button" class="btn" onclick="addDishRecipe('${did}')">${esc(t('Recept toevoegen'))}</button><button type="button" class="btn" onclick="addDishIngredient('${did}')">${esc(t('Ingrediënt toevoegen'))}</button><span class="kp-spacer"></span><button type="button" class="btn-quiet" onclick="renameDish('${did}')">${esc(t('Naam aanpassen'))}</button><button type="button" class="btn-quiet kp-danger" onclick="removeDishAsk('${did}')">${esc(t('Gerecht verwijderen'))}</button></div>` : ''}<p class="rp-allergens-source">${esc(t('Prijzen zonder btw. Alleen jij ziet je prijzen, ook in een keukenteam.'))}</p></div>`,
    'kp-dish'
  );
  el.dataset.dish = d.id;
}

async function setDishField(id, field, value) {
  if (!costCanEdit()) return costProNotice();
  const d = costDish(id);
  if (!d) return;
  const n = String(value).trim() === '' ? null : fcInputNumber(value);
  if (field === 'sell_price' && n !== null && !(n >= 0)) return toast(t('Vul een bedrag in, bijvoorbeeld 24,50.'));
  if (field === 'target_pct' && n !== null && !(n > 0 && n < 100))
    return toast(t('Vul een percentage tussen 1 en 99 in.'));
  if (await saveCostDish(d, { [field]: n })) costRefresh();
}

async function addDishRecipe(id) {
  const d = costDish(id);
  if (!d) return;
  const rid = await pickLinkedRecipe({ id: '' }, t('Recept toevoegen'), null);
  if (!rid) return openDishEditor(id);
  const r = findRecipe(rid);
  if (!r) return openDishEditor(id);
  const y = fcYieldAmount(r.yield);
  const suggestion = y && (y.kind === 'g' || y.kind === 'ml') ? '' : '1 ' + t('portie');
  const amount = await askText(
    `${r.title}\n\n${t('Hoeveel gaat er op één bord? Bijvoorbeeld 1 portie, 40 ml of 120 g. Het recept levert:')} ${r.yield || '–'}`,
    suggestion
  );
  if (amount === null || !amount.trim()) return openDishEditor(id);
  if (!parseIngredientAmount(amount.trim())) {
    toast(t('Begin met een hoeveelheid, bijvoorbeeld 1 portie of 40 ml.'));
    return openDishEditor(id);
  }
  await saveDishParts(d, [...d.components, { line: `${amount.trim()} ${r.title}`, recipe_id: String(r.id) }]);
}

async function addDishIngredient(id) {
  const d = costDish(id);
  if (!d) return;
  const line = await askText(
    t('Ingrediënt met de hoeveelheid per bord, bijvoorbeeld 160 g kabeljauwfilet of 3 blaadjes shiso.'),
    ''
  );
  if (line === null || !line.trim()) return openDishEditor(id);
  if (!parseIngredientAmount(line.trim())) {
    toast(t('Begin met een hoeveelheid, bijvoorbeeld 160 g kabeljauwfilet.'));
    return openDishEditor(id);
  }
  await saveDishParts(d, [...d.components, { line: line.trim() }]);
}

async function saveDishParts(d, components) {
  if (await saveCostDish(d, { components })) {
    costRefresh();
    openDishEditor(d.id);
  }
}
async function removeDishPart(id, i) {
  const d = costDish(id);
  if (!d) return;
  await saveDishParts(
    d,
    d.components.filter((_, n) => n !== i)
  );
}
async function renameDish(id) {
  const d = costDish(id);
  if (!d) return;
  const name = await askText(t('Naam van het gerecht, zoals op de kaart'), d.name);
  if (name && name.trim() && (await saveCostDish(d, { name: name.trim() }))) costRefresh();
  openDishEditor(id);
}
async function removeDishAsk(id) {
  const d = costDish(id);
  if (!d) return;
  if (
    !(await askConfirm(
      `${d.name}\n\n${t('Dit gerecht verwijderen? Het gaat ook uit je menu’s. Je recepten veranderen niet.')}`,
      { danger: true, confirmLabel: t('Verwijderen') }
    ))
  )
    return openDishEditor(id);
  if (!(await costDelete('cost_dishes', id))) return;
  costData.dishes = costData.dishes.filter(x => x.id !== id);
  costData.menuItems = costData.menuItems.filter(i => String(i.dish_id) !== id);
  closeCostDialog();
  costRefresh();
}

// Welke ingrediënten missen een prijs, het vaakst gebruikt eerst: daar begint de kok.
function costMissingIngredients() {
  const map = new Map();
  [...costAllRecipes(), ...costData.dishes.filter(d => !d.archived).map(costDishAsRecipe)].forEach(r => {
    const c = costOfRecipe(r);
    c.lines.forEach(x => {
      if (!['geen-product', 'geen-prijs', 'eenheid'].includes(x.status) || x.steps?.recipe) return;
      const m = map.get(x.key) || {
        key: x.key,
        line: x.line,
        recipeId: r.id,
        count: 0,
        status: x.status,
        product: x.steps?.product || null,
        need: x.steps?.need
      };
      m.count++;
      map.set(x.key, m);
    });
  });
  return [...map.values()].sort((a, b) => b.count - a.count || a.key.localeCompare(b.key, 'nl'));
}

function costIngredientsHtml() {
  const missing = costMissingIngredients();
  const edit = costCanEdit();
  const todo = missing.length
    ? `<section class="kp-section"><h3>${esc(t('Nog in te vullen'))} <small>${missing.length}</small></h3><p class="muted">${esc(t('Het vaakst gebruikt bovenaan: daar levert een prijs het meeste op.'))}</p><ul class="kp-todo">${missing
        .slice(0, 60)
        .map(
          m =>
            `<li><span translate="no">${esc(m.product?.name || m.key)}</span><small><span class="kp-n">${m.count}</span> <span>${esc(t(m.count === 1 ? 'recept' : 'recepten'))}</span> · <span>${esc(t(costStatusText({ status: m.status, steps: { need: m.need } })))}</span></small>${edit ? `<button type="button" class="btn btn-sm" onclick="openCostProductEditor({ id: '${escJs(m.product?.id || '')}', key: '${escJs(m.key)}', line: '${escJs(m.line)}', recipeId: '${escJs(m.recipeId)}' })">${esc(t(m.product ? 'Aanvullen' : 'Prijs invullen'))}</button>` : ''}</li>`
        )
        .join('')}</ul></section>`
    : '';
  const products = costData.products;
  const list = `<section class="kp-section"><div class="kp-section-head"><h3>${esc(t('Je prijzen'))} <small>${products.length}</small></h3>${edit ? `<div class="kp-head-actions"><button type="button" class="btn btn-sm" onclick="openCostImport()">${esc(t('Prijslijst inladen'))}</button><button type="button" class="btn btn-sm" onclick="openCostProductEditor({})">${esc(t('Product toevoegen'))}</button></div>` : ''}</div>${
    products.length
      ? `<div class="kp-table kp-products"><div class="kp-thead"><span>${t('Product')}</span><span>${t('Inkoop')}</span><span>${t('Per eenheid')}</span><span>${t('Leverancier')}</span><span>${t('Opbrengst')}</span></div>${products
          .map(cp => {
            const cur = costCurrentPrice(cp);
            const unit = cur ? fcUnitPrice(cur.price, cur.supplier) : null;
            const per = unit ? (unit.unit === 'stuk' ? unit.perUnit : unit.perUnit * 1000) : null;
            const perLabel = unit
              ? unit.unit === 'stuk'
                ? t('per stuk')
                : unit.unit === 'g'
                  ? t('per kg')
                  : t('per liter')
              : '';
            return `<button type="button" class="kp-trow" onclick="openCostProductEditor({ id: '${escJs(cp.id)}' })"><span class="kp-name" translate="no">${esc(cp.name)}</span><span data-label="${esc(fcT('Inkoop'))}">${cur ? `${fcMoney(Number(cur.price.price))} <small translate="no">${esc(cur.price.pack_text || fcQty(Number(cur.price.pack_qty), cur.price.pack_unit))}</small>` : `<span class="kp-chip">${esc(t('geen prijs'))}</span>`}</span><span data-label="${esc(fcT('Per eenheid'))}">${per != null ? `${fcUnitMoney(per)} <small>${esc(perLabel)}</small>` : '–'}</span><span data-label="${esc(fcT('Leverancier'))}" translate="no">${esc(cur?.supplier?.name || '')}</span><span data-label="${esc(fcT('Opbrengst'))}">${cp.yield_pct ? fcPct(Number(cp.yield_pct)) : '–'}</span></button>`;
          })
          .join('')}</div>`
      : `<p class="muted">${esc(t('Nog geen prijzen.'))}</p>`
  }</section>`;
  return todo + list;
}

function costSuppliersHtml() {
  const edit = costCanEdit();
  return `<section class="kp-section"><div class="kp-section-head"><h3>${esc(t('Leveranciers'))}</h3>${edit ? `<div class="kp-head-actions"><button type="button" class="btn btn-sm" onclick="addCostSupplierFromList()">${esc(t('Leverancier toevoegen'))}</button></div>` : ''}</div><p class="muted">${esc(t('De korting die je met een leverancier hebt afgesproken, telt bij elke prijs van die leverancier. De lijstprijs blijft zo herkenbaar.'))}</p>${
    costData.suppliers.length
      ? `<ul class="kp-suppliers">${costData.suppliers
          .map(s => {
            const n = costData.prices.filter(p => String(p.supplier_id) === String(s.id)).length;
            return `<li><b translate="no">${esc(s.name)}</b><span>${Number(s.discount_pct) ? `<span>${esc(t('korting'))}</span> <span class="kp-n">${fcPct(Number(s.discount_pct))}</span>` : esc(t('geen korting'))}</span><small><span class="kp-n">${n}</span> <span>${esc(t(n === 1 ? 'prijs' : 'prijzen'))}</span></small>${edit ? `<span class="kp-row-actions"><button type="button" class="btn btn-sm" onclick="openCostImport('${escJs(s.id)}')">${esc(t('Prijslijst inladen'))}</button><button type="button" class="btn-quiet" onclick="editCostSupplier('${escJs(s.id)}')">${esc(t('Aanpassen'))}</button></span>` : ''}</li>`;
          })
          .join('')}</ul>`
      : `<p class="muted">${esc(t('Nog geen leveranciers.'))}</p>`
  }</section>${costImportsHtml()}`;
}
async function addCostSupplierFromList() {
  if (await askCostSupplier()) renderFoodcost();
}
async function editCostSupplier(id) {
  const s = costSupplier(id);
  if (s && (await askCostSupplier(s))) costRefresh();
}

function costSettingsHtml() {
  const s = costData.settings;
  const edit = costCanEdit();
  return `<section class="kp-section kp-settings"><h3>${esc(t('Standaard voor al je gerechten'))}</h3><label class="product-field"><span>${t('Doel foodcost')} (%)</span><input class="sv-dialog-input" inputmode="decimal" value="${esc(fcNum(s.target_pct))}" onchange="setCostSetting('target_pct', this.value)" ${edit ? '' : 'readonly'}><small class="muted">${esc(t('30% is netjes voor fine dining; banqueting en grote aantallen zitten vaak lager. Per gerecht kun je een ander doel kiezen.'))}</small></label><label class="product-field"><span>${t('Btw op eten')} (%)</span><input class="sv-dialog-input" inputmode="decimal" value="${esc(fcNum(s.vat_pct))}" onchange="setCostSetting('vat_pct', this.value)" ${edit ? '' : 'readonly'}><small class="muted">${esc(t('Savour rekent altijd zonder btw. De btw gebruikt het alleen om de prijs op de kaart te tonen.'))}</small></label></section>`;
}
async function setCostSetting(field, value) {
  if (!costCanEdit()) return costProNotice();
  const n = fcInputNumber(value);
  const ok = field === 'target_pct' ? n > 0 && n < 100 : n >= 0 && n < 100;
  if (!ok) return toast(t('Vul een percentage tussen 1 en 99 in.'));
  if (await saveCostSettings({ [field]: n })) toast(t('Opgeslagen'));
}

// ---- Menu's en menu engineering ----
function costMenusHtml() {
  if (costMenuOpen) return costMenuHtml(costMenuOpen);
  const edit = costCanEdit();
  const menus = costData.menus.filter(m => !m.archived);
  return `<section class="kp-section"><div class="kp-section-head"><h3>${esc(t('Menu’s en kaarten'))}</h3>${edit ? `<div class="kp-head-actions"><button type="button" class="btn btn-sm" onclick="newCostMenu()">${esc(t('Menu maken'))}</button></div>` : ''}</div><p class="muted">${esc(t('Een kaart: losse gerechten met hun verkoopprijs, en met je verkoopcijfers de menu engineering. Een arrangement: een vaste prijs voor alle gangen samen.'))}</p>${
    menus.length
      ? `<ul class="kp-menus">${menus
          .map(m => {
            const n = costData.menuItems.filter(i => String(i.menu_id) === String(m.id)).length;
            return `<li><button type="button" onclick="costMenuOpen='${escJs(m.id)}';renderFoodcost()"><b translate="no">${esc(m.name)}</b><small><span>${esc(t(m.kind === 'arrangement' ? 'Arrangement' : 'Kaart'))}</span> · <span class="kp-n">${n}</span> <span>${esc(t(n === 1 ? 'gerecht' : 'gerechten'))}</span>${m.period ? ` · <span translate="no">${esc(m.period)}</span>` : ''}</small></button></li>`;
          })
          .join('')}</ul>`
      : `<p class="muted">${esc(t('Nog geen menu’s.'))}</p>`
  }</section>`;
}

async function newCostMenu() {
  if (!costCanEdit()) return costProNotice();
  const name = await askText(t('Naam van het menu of de kaart'), '');
  if (name === null || !name.trim()) return;
  const kind = await askChoice(t('Wat voor menu?'), [
    { value: 'kaart', label: t('Kaart'), hint: t('Losse gerechten, met menu engineering'), primary: true },
    { value: 'arrangement', label: t('Arrangement'), hint: t('Vaste prijs voor alle gangen samen') }
  ]);
  if (kind == null) return;
  const row = { name: name.trim(), kind };
  if (!demoMode) row.user_id = currentUser.id;
  const saved = await costWrite('cost_menus', row);
  if (!saved) return;
  costData.menus.push(saved);
  costMenuOpen = String(saved.id);
  renderFoodcost();
}

function costMenuItems(menuId) {
  return costData.menuItems
    .filter(i => String(i.menu_id) === String(menuId))
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map(i => {
      const d = i.dish_id ? costDish(i.dish_id) : null;
      if (!d) return null;
      const x = costOfDish(d);
      return { i, d, r: x.r, c: x.c, sell: x.sell, per: x.c.total, margin: x.margin };
    })
    .filter(Boolean);
}

function costMenuHtml(menuId) {
  const m = costData.menus.find(x => String(x.id) === String(menuId));
  if (!m) {
    costMenuOpen = null;
    return costMenusHtml();
  }
  const edit = costCanEdit();
  const items = costMenuItems(menuId);
  const back = `<button type="button" class="btn-quiet kp-back" onclick="costMenuOpen=null;renderFoodcost()">← ${esc(t('Menu’s'))}</button>`;
  const head = `<div class="kp-section-head"><h3 translate="no">${esc(m.name)}</h3>${edit ? `<div class="kp-head-actions"><button type="button" class="btn btn-sm" onclick="addCostMenuItem('${escJs(m.id)}')">${esc(t('Gerecht toevoegen'))}</button><button type="button" class="btn-quiet" onclick="editCostMenu('${escJs(m.id)}')">${esc(t('Aanpassen'))}</button></div>` : ''}</div>`;
  const allergenCodes = r => {
    try {
      return productsVisible(productScopeOf(r)) ? recipeAllergenInfo(r).allergens : [];
    } catch (e) {
      return [];
    }
  };
  const allIn = items.every(x => x.c.complete);
  if (m.kind === 'arrangement') {
    const total = items.reduce((s, x) => s + (x.per ?? 0), 0);
    const price = Number(m.price) > 0 ? Number(m.price) : null;
    const pct = price ? fcFoodcostPct(total, price) : null;
    const target = Number(costData.settings.target_pct) || 30;
    const rows = items
      .map(
        x =>
          `<div class="kp-trow"><span class="kp-name"><button type="button" class="btn-quiet" onclick="openDishEditor('${escJs(x.d.id)}')" translate="no">${esc(x.d.name)}</button></span><span data-label="${esc(fcT('Kostprijs'))}">${(x.c.complete ? '' : '≥ ') + fcMoney(x.per)}</span><span class="kp-allergens">${allergenChips(allergenCodes(x.r), 'is-small')}</span>${edit ? `<button type="button" class="btn-quiet" onclick="removeCostMenuItem('${escJs(x.i.id)}')" aria-label="${esc(t('Verwijderen'))}">×</button>` : '<span></span>'}</div>`
      )
      .join('');
    return `${back}<section class="kp-section">${head}<div class="kp-figures"><div class="kp-fig"><span>${t('Kostprijs arrangement')}</span><b>${allIn ? '' : `<em>${t('minstens')}</em>`}${fcMoney(total)}</b></div><div class="kp-fig${pct != null && pct > target ? ' is-over' : ''}"><span>${t('Foodcost %')}</span><b>${pct != null ? (allIn ? '' : '≥ ') + fcPct(pct) : '–'}</b><small><span>${esc(t('doel'))}</span> <span class="kp-n">${fcPct(target)}</span></small></div><div class="kp-fig"><span>${t('Prijs zonder btw')}</span><b>${price ? fcMoney(price) : '–'}</b>${edit ? `<small><button type="button" class="btn-quiet" onclick="setCostMenuPrice('${escJs(m.id)}')">${esc(t(price ? 'Aanpassen' : 'Invullen'))}</button></small>` : ''}</div></div><div class="kp-table kp-menu">${rows || `<p class="muted kp-none">${esc(t('Voeg de gangen toe.'))}</p>`}</div></section>`;
  }
  // Kaart: per gerecht marge en verkocht; menu engineering zodra er verkoopcijfers zijn.
  const me = fcMenuEngineering(
    items
      .filter(x => x.margin != null && x.i.sold != null)
      .map(x => ({ id: String(x.i.id), sold: Number(x.i.sold), margin: x.margin }))
  );
  const label = { star: 'Star', plowhorse: 'Plowhorse', puzzle: 'Puzzle', dog: 'Dog' };
  const rows = items
    .map(x => {
      const cls = me.classes[String(x.i.id)];
      const pct = x.per != null && x.sell ? fcFoodcostPct(x.per, x.sell) : null;
      return `<div class="kp-trow"><span class="kp-name"><button type="button" class="btn-quiet" onclick="openDishEditor('${escJs(x.d.id)}')" translate="no">${esc(x.d.name)}</button><span class="kp-allergens">${allergenChips(allergenCodes(x.r), 'is-small')}</span></span><span data-label="${esc(fcT('Kostprijs'))}">${(x.c.complete ? '' : '≥ ') + fcMoney(x.per)}</span><span data-label="${esc(fcT('Verkoopprijs'))}">${x.sell ? fcMoney(x.sell) : `<span class="kp-chip">${esc(t('prijs?'))}</span>`}</span><span data-label="Foodcost">${pct != null ? (x.c.complete ? '' : '≥ ') + fcPct(pct) : '–'}</span><span data-label="${esc(fcT('Marge'))}">${x.margin != null ? fcMoney(x.margin) : '–'}</span><span data-label="${esc(fcT('Verkocht'))}"><input class="kp-sold" inputmode="numeric" value="${x.i.sold ?? ''}" placeholder="0" onchange="setCostSold('${escJs(x.i.id)}', this.value)" ${edit ? '' : 'readonly'} aria-label="${esc(t('Verkocht'))}"></span><span>${cls ? `<span class="kp-class kp-${cls}">${label[cls]}</span>` : ''}</span>${edit ? `<button type="button" class="btn-quiet" onclick="removeCostMenuItem('${escJs(x.i.id)}')" aria-label="${esc(t('Verwijderen'))}">×</button>` : '<span></span>'}</div>`;
    })
    .join('');
  const notReady = items.filter(x => x.margin == null).length;
  const meText =
    me.avgMargin != null
      ? `<div class="kp-me"><p><span>${esc(t('Menu engineering volgens Kasavana en Smith: populair is minstens 70% van een gelijk aandeel'))}</span> (<span class="kp-n">${fcPct(me.popularShare * 100)}</span> <span>${esc(t('van de verkoop'))}</span>); <span>${esc(t('winstgevend is een marge van minstens het gewogen gemiddelde'))}</span> (<span class="kp-n">${fcMoney(me.avgMargin)}</span>).</p><ul class="kp-me-legend"><li><span class="kp-class kp-star">Star</span>${esc(t('populair en winstgevend: zo laten'))}</li><li><span class="kp-class kp-plowhorse">Plowhorse</span>${esc(t('populair, weinig marge: kijk naar portie of prijs'))}</li><li><span class="kp-class kp-puzzle">Puzzle</span>${esc(t('winstgevend, weinig verkocht: betere plek of beschrijving'))}</li><li><span class="kp-class kp-dog">Dog</span>${esc(t('weinig verkocht en weinig marge: vervangen?'))}</li></ul>${notReady ? `<p class="kp-note"><span class="kp-n">${notReady}</span> ${esc(t(notReady === 1 ? 'gerecht telt nog niet mee: kostprijs niet compleet of geen verkoopprijs.' : 'gerechten tellen nog niet mee: kostprijs niet compleet of geen verkoopprijs.'))}</p>` : ''}</div>`
      : `<p class="kp-note">${esc(t('Vul per gerecht in hoe vaak het verkocht is (bijvoorbeeld uit je kassa over een maand). Dan deelt Savour je kaart in: Stars, Plowhorses, Puzzles en Dogs.'))}</p>`;
  return `${back}<section class="kp-section">${head}<div class="kp-table kp-menu kp-card"><div class="kp-thead"><span>${t('Gerecht')}</span><span>${t('Kostprijs')}</span><span>${t('Verkoopprijs')}</span><span>Foodcost</span><span>${t('Marge')}</span><span>${t('Verkocht')}</span><span></span><span></span></div>${rows || `<p class="muted kp-none">${esc(t('Voeg gerechten toe.'))}</p>`}</div>${items.length ? meText : ''}</section>`;
}

async function addCostMenuItem(menuId) {
  if (!costCanEdit()) return costProNotice();
  const inMenu = new Set(
    costData.menuItems.filter(i => String(i.menu_id) === String(menuId)).map(i => String(i.dish_id))
  );
  const choices = costData.dishes
    .filter(d => !d.archived && !inMenu.has(d.id))
    .map(d => ({ value: d.id, label: d.name }));
  if (!choices.length) {
    toast(t('Maak eerst een gerecht: een bord uit je recepten en ingrediënten.'));
    costTab = 'dishes';
    costMenuOpen = null;
    renderFoodcost();
    return;
  }
  const id = await askChoice(t('Welk gerecht?'), choices);
  if (id == null) return;
  const row = { menu_id: menuId, dish_id: id, position: inMenu.size };
  if (!demoMode) row.user_id = currentUser.id;
  const saved = await costWrite('cost_menu_items', row);
  if (!saved) return;
  costData.menuItems.push(saved);
  renderFoodcost();
}
async function removeCostMenuItem(id) {
  if (!(await costDelete('cost_menu_items', id))) return;
  costData.menuItems = costData.menuItems.filter(i => String(i.id) !== String(id));
  renderFoodcost();
}
async function setCostSold(id, value) {
  if (!costCanEdit()) return costProNotice();
  const n = String(value).trim() === '' ? null : Math.round(fcInputNumber(value));
  if (n !== null && !(n >= 0)) return toast(t('Vul een aantal in, bijvoorbeeld 120.'));
  const item = costData.menuItems.find(i => String(i.id) === String(id));
  if (!item) return;
  const saved = await costWrite('cost_menu_items', { sold: n }, { id: demoMode ? null : id });
  if (!saved) return;
  item.sold = n;
  renderFoodcost();
}
async function setCostMenuPrice(id) {
  const m = costData.menus.find(x => String(x.id) === String(id));
  if (!m) return;
  const v = await askText(t('Prijs van het arrangement per persoon, zonder btw'), m.price ? fcNum(m.price) : '');
  if (v === null) return;
  const n = v.trim() === '' ? null : fcInputNumber(v);
  if (n !== null && !(n >= 0)) return toast(t('Vul een bedrag in, bijvoorbeeld 24,50.'));
  const saved = await costWrite('cost_menus', { price: n }, { id: demoMode ? null : id });
  if (!saved) return;
  m.price = n;
  renderFoodcost();
}
async function editCostMenu(id) {
  const m = costData.menus.find(x => String(x.id) === String(id));
  if (!m) return;
  const choice = await askChoice(m.name, [
    { value: 'name', label: t('Naam aanpassen') },
    { value: 'period', label: t('Periode van de verkoopcijfers') },
    { value: 'archive', label: t('Menu archiveren') }
  ]);
  if (choice == null) return;
  let changes = null;
  if (choice === 'name') {
    const v = await askText(t('Naam van het menu of de kaart'), m.name);
    if (v && v.trim()) changes = { name: v.trim() };
  } else if (choice === 'period') {
    const v = await askText(
      t('Over welke periode gaan de verkoopcijfers? Bijvoorbeeld: november 2026'),
      m.period || ''
    );
    if (v !== null) changes = { period: v.trim().slice(0, 80) };
  } else if (await askConfirm(t('Dit menu archiveren? Er wordt niets verwijderd.'))) changes = { archived: true };
  if (!changes) return;
  const saved = await costWrite('cost_menus', changes, { id: demoMode ? null : id });
  if (!saved) return;
  Object.assign(m, changes);
  if (changes.archived) costMenuOpen = null;
  renderFoodcost();
}

// ---- MEP-lijst: kosten van vandaag ----
// Per kaart: de onderdelen met een recept en een portie per couvert, maal de couverts van vandaag.
// Onderdelen zonder recept of portie tellen niet mee (dat staat erbij); een onvolledig recept maakt het "minstens".
function mepCostSummary(listId, day) {
  if (!costData.ready || costData.missing || !costVisible() || !day) return null;
  const cards = mepCardsOf(listId);
  let total = 0;
  let complete = true;
  let skipped = 0;
  let counted = 0;
  let open = 0;
  const perCard = cards.map(card => {
    const covers = Number(day.covers?.[card.id]) || 0;
    let sum = 0;
    mepSectionsOf(card.id).forEach(s =>
      mepItemsOf(s.id).forEach(it => {
        const r = it.recipe_id ? findRecipe(it.recipe_id) : null;
        if (!r || !(Number(it.portion_qty) > 0) || !covers) {
          if (covers) skipped++;
          return;
        }
        const amount = fcAmountOf(
          covers * Number(it.portion_qty),
          UNIT_INFO.get(fcWord(it.portion_unit)) || null,
          it.portion_unit || ''
        );
        const c = costOfRecipe(r);
        const share = fcShareOf(amount, fcYieldAmount(r.yield), costRecipeSettings(r.id));
        if (share == null) {
          skipped++;
          return;
        }
        counted++;
        if (!c.complete) {
          complete = false;
          open++;
        }
        sum += c.total * share;
      })
    );
    total += sum;
    return { card, covers, sum };
  });
  return counted || skipped ? { total, complete, skipped, counted, open, perCard } : null;
}

function renderMepCost() {
  const host = $('mepCost');
  if (!host) return;
  const day = typeof mepDay !== 'undefined' ? mepDay : null;
  if (!day || !mepOpenId) {
    host.innerHTML = '';
    return;
  }
  if (!costData.ready) {
    host.innerHTML = '';
    if (demoMode || isPro()) ensureFoodcost().then(() => costData.ready && renderMepCost());
    return;
  }
  const s = mepCostSummary(mepOpenId, day);
  if (!s || !s.counted) {
    host.innerHTML = '';
    return;
  }
  // Nooit € 0 tonen: zonder een enkele bekende prijs zegt Savour dat er nog geen prijzen zijn.
  const sum =
    s.total > 0 ? `${s.complete ? '' : esc(t('minstens')) + ' '}${fcMoney(s.total)}` : esc(t('nog geen prijzen'));
  host.innerHTML = `<details class="kp-mep"><summary><span>${esc(t('Grondstoffen vandaag'))}</span><b>${sum}</b></summary>`;
  host.querySelector('details').insertAdjacentHTML(
    'beforeend',
    `<ul>${s.perCard
      .filter(x => x.covers)
      .map(
        x =>
          `<li><span translate="no">${esc(x.card.name)}</span><small><span class="kp-n">${x.covers}</span> <span>${esc(t('couverts'))}</span></small><b>${x.sum > 0 ? fcMoney(x.sum) : '–'}</b></li>`
      )
      .join(
        ''
      )}</ul><p class="kp-note"><span>${esc(t('Alleen onderdelen met een gekoppeld recept en een portie per couvert tellen mee.'))}</span>${s.skipped ? ` <span class="kp-n">${s.skipped}</span> <span>${esc(t(s.skipped === 1 ? 'onderdeel telt niet mee.' : 'onderdelen tellen niet mee.'))}</span>` : ''}${s.open ? ` <span class="kp-n">${s.open}</span> <span>${esc(t(s.open === 1 ? 'recept is nog niet compleet.' : 'recepten zijn nog niet compleet.'))}</span>` : ''} <span>${esc(t('Alleen jij ziet deze bedragen.'))}</span></p>`
  );
}

// ---- Prijslijst inladen (CSV of Excel) ----
let costImport = null;

function openCostImport(supplierId = '') {
  if (!costCanEdit()) return costProNotice();
  costImport = { supplierId, rows: [], cols: {}, vat: 0, fileName: '' };
  const suppliers = costData.suppliers
    .map(
      s =>
        `<option value="${esc(s.id)}"${String(s.id) === String(supplierId) ? ' selected' : ''}>${esc(s.name)}</option>`
    )
    .join('');
  costDialog(
    `<h2 class="sv-dialog-title">${esc(t('Prijslijst inladen'))}</h2><p class="kp-why">${esc(t('Een prijslijst van je leverancier als Excel (.xlsx) of CSV, of geplakt uit een e-mail. Savour leest de kolommen; daarna keur je elke regel zelf goed. Er wordt niets opgeslagen voordat jij dat doet.'))}</p><label class="product-field"><span>${esc(t('Leverancier'))}</span><select class="sv-dialog-input" id="costImportSupplier"><option value="">${esc(t('Geen leverancier'))}</option>${suppliers}</select></label><div class="kp-actions"><label class="btn gold">${esc(t('Bestand kiezen'))}<input type="file" accept=".xlsx,.csv,.txt" hidden onchange="readCostImportFile(this.files[0]);this.value=''"></label></div><label class="product-field"><span>${esc(t('Of plak de lijst hier'))}</span><textarea class="sv-dialog-input" id="costImportText" rows="6" placeholder="Roomboter;doos 10 x 250 g;18,90"></textarea></label><div class="kp-actions"><button type="button" class="btn" onclick="readCostImportText()">${esc(t('Lezen'))}</button></div>`,
    'kp-import'
  );
}

async function readCostImportFile(file) {
  if (!file) return;
  const name = file.name.toLowerCase();
  try {
    let grid;
    if (name.endsWith('.xlsx')) {
      await ensureJSZip();
      grid = await costReadXlsx(file);
    } else grid = costReadDelimited(await file.text());
    costImport.fileName = file.name;
    startCostImportReview(grid);
  } catch (e) {
    console.warn(e);
    toast(t('Dit bestand kon niet worden geopend. Sla het opnieuw op als .xlsx of .csv, of plak de tekst.'));
  }
}
function readCostImportText() {
  const text = $('costImportText')?.value || '';
  if (!text.trim()) return toast(t('Plak eerst de prijslijst.'));
  costImport.fileName = t('geplakte tekst');
  startCostImportReview(costReadDelimited(text));
}

// CSV met ; of , of tabs (geplakt uit Excel). Aanhalingstekens worden gerespecteerd.
function costReadDelimited(text) {
  const lines = String(text)
    .replace(/\r/g, '')
    .split('\n')
    .filter(l => l.trim());
  const first = lines[0] || '';
  const sep = first.includes('\t')
    ? '\t'
    : (first.match(/;/g) || []).length >= (first.match(/,/g) || []).length
      ? ';'
      : ',';
  return lines.map(line => {
    const cells = [];
    let cur = '';
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (quoted && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else quoted = !quoted;
      } else if (ch === sep && !quoted) {
        cells.push(cur.trim());
        cur = '';
      } else cur += ch;
    }
    cells.push(cur.trim());
    return cells;
  });
}

// Eerste blad van een .xlsx als rijen met cellen (zelfde aanpak als de MEP-import, zonder opmaak).
async function costReadXlsx(file) {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const xml = async path => {
    const f = zip.file(path);
    return f ? new DOMParser().parseFromString(await f.async('string'), 'application/xml') : null;
  };
  const byTag = (doc, tag) => [...(doc?.getElementsByTagName(tag) || [])];
  const shared = byTag(await xml('xl/sharedStrings.xml'), 'si').map(si =>
    byTag(si, 't')
      .map(x => x.textContent)
      .join('')
  );
  const sheetPath = zip.file('xl/worksheets/sheet1.xml')
    ? 'xl/worksheets/sheet1.xml'
    : Object.keys(zip.files).find(p => /^xl\/worksheets\/[^/]+\.xml$/.test(p));
  const doc = await xml(sheetPath);
  const rows = [];
  for (const c of byTag(doc, 'c')) {
    const m = String(c.getAttribute('r') || '').match(/^([A-Z]+)(\d+)$/);
    if (!m) continue;
    const v = c.getElementsByTagName('v')[0];
    const type = c.getAttribute('t');
    let text = '';
    if (type === 's' && v) text = shared[Number(v.textContent)] || '';
    else if (type === 'inlineStr')
      text = byTag(c, 't')
        .map(x => x.textContent)
        .join('');
    else if (v) text = v.textContent;
    const r = Number(m[2]) - 1;
    const col = mepColNumber(m[1]) - 1;
    (rows[r] = rows[r] || [])[col] = String(text).trim();
  }
  return rows.filter(Boolean).map(r => Array.from(r, x => x || ''));
}

// Welke kolom is wat? Op de kopregel ("omschrijving", "prijs", "inhoud"), anders op de inhoud.
function costGuessColumns(grid) {
  const head = (grid[0] || []).map(x => String(x).toLowerCase());
  const find = re => head.findIndex(h => re.test(h));
  let cols = {
    name: find(
      /omschrijving|artikel(?!nr|nummer)|naam|product|description|name|bezeichnung|artículo|descripci|désignation|libell/
    ),
    pack: find(
      /verpak|inhoud|eenheid|pack|unit|size|inhalt|einheit|gebinde|envase|formato|unidad|condition|conditionnement/
    ),
    price: find(/prijs|price|preis|precio|prix|bedrag|tarif/),
    code: find(/artikelnr|artikelnummer|art\.?\s?nr|code|sku|ean|referen/)
  };
  const hasHead = cols.name >= 0 && cols.price >= 0;
  if (!hasHead) {
    // Zonder kopregel: tekst met letters = naam, het laatste getal = prijs, iets met een eenheid = verpakking.
    const sample = grid.slice(0, 20);
    const width = Math.max(...sample.map(r => r.length));
    const score = (i, test) => sample.filter(r => test(String(r[i] || ''))).length;
    const idx = [...Array(width).keys()];
    const priceCol = idx
      .filter(i => score(i, v => /^€?\s*\d+([.,]\d{1,4})?$/.test(v.trim())) > sample.length / 2)
      .pop();
    const packCol = idx.find(i => i !== priceCol && score(i, v => !!fcParsePack(v)) > sample.length / 3);
    const nameCol = idx.find(
      i => i !== priceCol && i !== packCol && score(i, v => /[a-zà-ÿ]{3}/i.test(v)) > sample.length / 2
    );
    cols = { name: nameCol ?? -1, pack: packCol ?? -1, price: priceCol ?? -1, code: -1 };
  }
  return { cols, hasHead };
}

function startCostImportReview(grid) {
  if (!grid.length) return toast(t('Savour vond geen regels in deze lijst.'));
  costImport.supplierId = $('costImportSupplier')?.value || costImport.supplierId || '';
  const { cols, hasHead } = costGuessColumns(grid);
  costImport.grid = grid;
  costImport.cols = cols;
  costImport.hasHead = hasHead;
  costImport.vat = 0;
  costImport.rows = costImportRows();
  renderCostImportReview();
}

// Elke regel die opgeslagen kan worden, staat ook in beeld: de kok keurt alles zelf goed.
const COST_IMPORT_MAX = 2000;
function costImportRows() {
  const { grid, cols, hasHead, vat } = costImport;
  const index = costProductIndex();
  return grid
    .slice(hasHead ? 1 : 0)
    .map((cells, n) => {
      const name = String(cells[cols.name] ?? '').trim();
      const packText = cols.pack >= 0 ? String(cells[cols.pack] ?? '').trim() : '';
      const rawPrice = fcInputNumber(String(cells[cols.price] ?? '').replace(/[^\d.,-]/g, ''));
      if (!name || !(rawPrice >= 0)) return null;
      // De verpakking staat soms in de naam: "Roomboter 10 x 250 g".
      const pack =
        fcParsePack(packText) ||
        fcParsePack(
          name.match(/(\d+\s*[x×]\s*)?\d+(?:[.,]\d+)?\s*(kg|g|gr|l|ltr|liter|ml|cl|dl|stuks?|st)\b/i)?.[0] || ''
        );
      const price = vat ? fcWithoutVat(rawPrice, vat) : rawPrice;
      const match = index.get(productKey(name)) || null;
      return {
        n,
        name,
        code: cols.code >= 0 ? String(cells[cols.code] ?? '').trim() : '',
        packText: packText || '',
        pack,
        rawPrice,
        price,
        match,
        // Alleen wat Savour zeker weet staat aan: een bekend product met een leesbare verpakking.
        use: !!match && !!pack
      };
    })
    .filter(Boolean)
    .slice(0, COST_IMPORT_MAX);
}

function renderCostImportReview() {
  const ci = costImport;
  const header = ci.grid[0] || [];
  const colSelect = (field, label) =>
    `<label class="product-field"><span>${esc(t(label))}</span><select class="sv-dialog-input" onchange="setCostImportCol('${field}', this.value)"><option value="-1">–</option>${header.map((h, i) => `<option value="${i}"${ci.cols[field] === i ? ' selected' : ''}>${esc(ci.hasHead ? h : `${t('Kolom')} ${i + 1}: ${h}`)}</option>`).join('')}</select></label>`;
  const chosen = ci.rows.filter(r => r.use).length;
  const rows = ci.rows
    .map(
      (r, i) =>
        `<li class="${r.use ? 'is-on' : ''}"><label><input type="checkbox" ${r.use ? 'checked' : ''} ${r.pack ? '' : 'disabled'} onchange="costImport.rows[${i}].use=this.checked;renderCostImportReview()"><span class="kp-imp-name" translate="no">${esc(r.name)}</span></label><span translate="no">${r.pack ? esc(fcQty(r.pack.qty, r.pack.unit)) : `<span class="kp-chip">${esc(t('verpakking?'))}</span>`}</span><b>${fcMoney(r.price)}</b><span class="kp-imp-match">${r.match ? `→ <span translate="no">${esc(r.match.name)}</span>` : `<small>${esc(t('nieuw product'))}</small>`}</span></li>`
    )
    .join('');
  costDialog(
    `<h2 class="sv-dialog-title">${esc(t('Prijslijst controleren'))}</h2><p class="kp-why">${esc(t('Kijk na wat Savour las. Aangevinkt wordt opgeslagen als nieuwe prijs; de oude prijzen blijven bewaard. Vink alleen aan wat klopt. Een regel zonder leesbare verpakking kan niet: vul die prijs met de hand in.'))}</p><div class="kp-row">${colSelect('name', 'Naam')}${colSelect('pack', 'Verpakking')}${colSelect('price', 'Prijs')}</div><label class="product-field"><span>${esc(t('Prijzen in deze lijst'))}</span><select class="sv-dialog-input" onchange="setCostImportVat(this.value)">${[
      0, 9, 21, 7, 19, 10, 5.5
    ]
      .map(
        v =>
          `<option value="${v}"${ci.vat === v ? ' selected' : ''}>${v ? `${esc(t('met'))} ${fcPct(v)} ${esc(t('btw (Savour haalt die eraf)'))}` : esc(t('zonder btw'))}</option>`
      )
      .join(
        ''
      )}</select></label><div class="kp-imp-tools"><button type="button" class="btn-quiet" onclick="costImport.rows.forEach(r=>r.use=!!r.pack);renderCostImportReview()">${esc(t('Alles met verpakking aanvinken'))}</button><button type="button" class="btn-quiet" onclick="costImport.rows.forEach(r=>r.use=false);renderCostImportReview()">${esc(t('Niets aanvinken'))}</button></div><ul class="kp-imp-rows">${rows}</ul>${ci.rows.length >= COST_IMPORT_MAX ? `<p class="kp-note">${esc(t('Alleen de eerste 2000 regels van het bestand staan hier; de rest is niet ingelezen.'))}</p>` : ''}<div class="kp-actions"><button type="button" class="btn gold" onclick="saveCostImport()" ${chosen ? '' : 'disabled'}><span class="kp-n">${chosen}</span> <span>${esc(t(chosen === 1 ? 'prijs opslaan' : 'prijzen opslaan'))}</span></button></div>`,
    'kp-import'
  );
}
function setCostImportCol(field, value) {
  costImport.cols[field] = Number(value);
  costImport.rows = costImportRows();
  renderCostImportReview();
}
function setCostImportVat(value) {
  costImport.vat = Number(value) || 0;
  const use = new Map(costImport.rows.map(r => [r.n, r.use]));
  costImport.rows = costImportRows().map(r => ({ ...r, use: use.has(r.n) ? use.get(r.n) : r.use }));
  renderCostImportReview();
}

async function saveCostImport() {
  const ci = costImport;
  const chosen = ci.rows.filter(r => r.use && r.pack);
  if (!chosen.length) return;
  // Gerechten voor en na deze lijst: welke zijn duurder geworden, welke komen boven hun doel.
  const dishState = () => new Map(costData.dishes.filter(d => !d.archived).map(d => [d.id, costOfDish(d)]));
  const before = dishState();
  let importId = null;
  const record = {
    supplier_id: ci.supplierId || null,
    file_name: String(ci.fileName || '').slice(0, 200),
    rows: ci.grid.slice(0, 2000),
    vat_included: ci.vat || null,
    approved: chosen.length
  };
  if (!demoMode) record.user_id = currentUser.id;
  const saved = await costWrite('cost_imports', record);
  if (!saved) return;
  importId = demoMode ? null : saved.id;
  costData.imports = [saved, ...costData.imports];
  let ok = 0;
  for (const r of chosen) {
    let cp = r.match;
    if (!cp)
      cp = await saveCostProduct({ id: '', name: r.name, aliases: [productKey(r.name)].filter(Boolean), units: {} });
    if (!cp) break;
    const price = await addCostPrice({
      product_id: cp.id,
      supplier_id: ci.supplierId || null,
      pack_text: r.packText || fcQty(r.pack.qty, r.pack.unit),
      pack_qty: r.pack.qty,
      pack_unit: r.pack.unit,
      price: Math.round(r.price * 10000) / 10000,
      source: 'lijst',
      import_id: importId,
      code: r.code
    });
    if (!price) break;
    ok++;
  }
  // Wat veranderde er door deze lijst? Duurder geworden en boven doel gekomen.
  const after = [...dishState()];
  const dearer = after.filter(([id, x]) => before.has(id) && x.c.total > before.get(id).c.total + 0.005);
  const newlyOver = after.filter(([id, x]) => x.over && !before.get(id)?.over);
  closeCostDialog();
  costTab = dearer.length || newlyOver.length ? 'dishes' : 'ingredients';
  costFilter = 'all';
  if (document.querySelector('#appShell .view.active')?.id !== 'foodcost') go('foodcost');
  else renderFoodcost();
  toast(
    `${ok} ${t(ok === 1 ? 'prijs opgeslagen' : 'prijzen opgeslagen')} · ${dearer.length} ${t(dearer.length === 1 ? 'gerecht duurder' : 'gerechten duurder')} · ${newlyOver.length} ${t('boven doel')}`
  );
}

function costImportsHtml() {
  if (!costData.imports.length) return '';
  return `<section class="kp-section"><h3>${esc(t('Ingeladen prijslijsten'))}</h3><ul class="kp-suppliers">${costData.imports
    .slice(0, 20)
    .map(
      i =>
        `<li><span translate="no">${esc(i.file_name || '')}</span><span translate="no">${esc(costSupplier(i.supplier_id)?.name || '')}</span><small><span class="kp-n">${esc(costDate(i.created_at))}</span> · <span class="kp-n">${i.approved}</span> <span>${esc(t(i.approved === 1 ? 'prijs' : 'prijzen'))}</span></small></li>`
    )
    .join('')}</ul></section>`;
}
