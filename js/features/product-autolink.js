// Alles automatisch koppelen (2026-11-03): de ingrediëntnamen zonder product in één keer regelen, zodat een kok
// niet honderden namen met de hand hoeft te koppelen. Per naam, in deze volgorde:
//   1. een eigen recept met dezelfde naam ("groente fond" → recept Groentefond): de allergenen van dat recept tellen mee;
//   2. een bestaand product: dezelfde naam zonder spaties of meervoud ("olijf olie", "tomaten"), het product vooraan of
//      achteraan in de naam ("zwarte peper heel" → Zwarte peper), of een kleine tikfout ("parmazaan" → Parmezaan);
//   3. een nieuw product uit de basislijst, met de allergenen die Savour erbij kent;
//   4. anders blijft de naam staan, net als combinaties zoals "zout en peper".
// De kok ziet eerst alles wat Savour gaat doen en kan elk product daarna nog aanpassen.

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
  // Eigen recepten die je kunt wijzigen, op naam.
  const own = scope === 'own' ? (recipes || []).filter(r => !r.teamId) : [];
  const byTitle = new Map();
  for (const r of own) {
    const k = compactKey(productKey(r.title));
    if (k && !byTitle.has(k)) byTitle.set(k, r);
  }
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

  const plan = { recipe: [], product: [], create: new Map(), rest: [] };
  for (const x of productTodo(scope)) {
    const key = x.key;
    if (/\s(en|of|met)\s|[&/+]/.test(key)) {
      plan.rest.push(x);
      continue;
    }
    const recipe = byTitle.get(compactKey(key));
    if (recipe) {
      plan.recipe.push({ ...x, recipe });
      continue;
    }
    // Nooit koppelen aan een product zonder een allergeen dat de naam doet vermoeden: "pinda olie" is geen olie.
    const hints = allergensEu(allergenHints(key));
    const fits = p => p && hints.every(c => p.allergens.includes(c));
    const product = [
      byCompact.get(compactKey(key)),
      bySingular.get(singularKey(compactKey(key))),
      productSuggestionFor(scope, key),
      fuzzy(key)
    ].find(fits);
    if (product) {
      plan.product.push({ ...x, product });
      continue;
    }
    const base = ingredientBaseMatch(key);
    if (base) {
      const baseKey = productKey(base.name);
      const existing = byCompact.get(compactKey(baseKey));
      if (fits(existing)) {
        plan.product.push({ ...x, product: existing });
        continue;
      }
      // Een nieuw product heet zoals in het recept: "worcester saus" wordt geen product "saus".
      const c = plan.create.get(key) || { name: key, keys: [], allergens: new Set(base.allergens), count: 0 };
      c.keys.push(key);
      allergenHints(key).forEach(a => c.allergens.add(a));
      c.count += x.count;
      plan.create.set(key, c);
      continue;
    }
    plan.rest.push(x);
  }
  return plan;
}

const capitalize = s => s.charAt(0).toLocaleUpperCase('nl-NL') + s.slice(1);

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
  const row = (name, target, count) =>
    `<li><span translate="no">${esc(name)}</span><span class="autolink-arrow">→</span><b translate="no">${esc(target)}</b><small>${count === 1 ? 'in 1 recept' : `in ${count} recepten`}</small></li>`;
  const section = (title, items) =>
    items.length
      ? `<details class="autolink-section"><summary><b>${items.length}</b> <span>${title}</span></summary><ul class="autolink-list">${items.join('')}</ul></details>`
      : '';
  const byCount = (a, b) => b.count - a.count;
  document.getElementById('autoLink')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="autoLink" role="dialog" aria-modal="true" aria-labelledby="autoLinkTitle"><div class="sv-dialog-box allergen-check-box">${modalCloseHtml()}<h2 id="autoLinkTitle" class="sv-dialog-title">Alles automatisch koppelen</h2><p class="sv-dialog-text">Dit gaat Savour doen. Klik op een regel om te zien welke namen het zijn. Elk product kun je daarna nog aanpassen.</p>${section(
      'namen koppelen aan je eigen recept',
      [...plan.recipe].sort(byCount).map(x => row(x.key, x.recipe.title, x.count))
    )}${section(
      'namen koppelen aan een bestaand product',
      [...plan.product].sort(byCount).map(x => row(x.key, x.product.name, x.count))
    )}${section(
      'nieuwe producten maken',
      creates.map(c => row(c.keys.join(', '), capitalize(c.name), c.count))
    )}${plan.rest.length ? `<p class="muted autolink-rest">${plan.rest.length} ${plan.rest.length === 1 ? 'naam herkent' : 'namen herkent'} Savour niet zeker. Die blijven staan bij Nog te koppelen.</p>` : ''}<div class="sv-dialog-actions"><button type="button" class="btn" data-close>Annuleren</button><button type="button" class="btn gold" data-ok>Alles koppelen</button></div></div></div>`
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
  // 1. Namen bij bestaande producten.
  const byProduct = new Map();
  for (const x of plan.product) byProduct.set(x.product.id, [...(byProduct.get(x.product.id) || []), x.key]);
  const updates = [...byProduct].map(([id, keys]) => {
    const p = products.find(y => y.id === id);
    return { ...p, aliases: [...new Set([...p.aliases, ...keys])].slice(0, 500) };
  });
  for (let i = 0; i < updates.length; i += 8) {
    const saved = await Promise.all(updates.slice(i, i + 8).map(writeProduct));
    saved.forEach((p, j) => p && (done += byProduct.get(updates[i + j].id).length));
  }
  // 2. Nieuwe producten.
  if (creates.length) {
    const rows = creates.map(c => ({
      scope,
      name: capitalize(c.name),
      aliases: c.keys.filter(k => k !== c.name),
      allergens: withDerived(c.name, [...c.allergens]).filter(a => allergenShown(a, scope)),
      known: true,
      note: ''
    }));
    if (await insertProducts(rows)) done += creates.reduce((n, c) => n + c.keys.length, 0);
  }
  // 3. Koppelingen naar eigen recepten, per recept opgeslagen.
  const targets = new Map(plan.recipe.map(x => [x.key, x.recipe]));
  if (targets.size)
    for (const r of recipesForProductScope(scope)) {
      if (r.teamId || !Array.isArray(r.ingredients)) continue;
      const links = { ...(r.links || {}) };
      let changed = false;
      for (const line of r.ingredients) {
        const target = targets.get(ingredientKey(line));
        const name = ingredientNameOf(line).toLowerCase();
        if (!target || String(target.id) === String(r.id) || name in links) continue;
        links[name] = String(target.id);
        changed = true;
      }
      if (changed && (await saveRecipeFields(r, { ingredient_links: links }))) r.links = links;
    }
  done += plan.recipe.length;
  saveOfflineSnapshot();
  return done;
}
