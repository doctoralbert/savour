// Printen van recepten en mappen.
// Met Pro of een team staat rechtsboven het logo en de naam van je restaurant (Instellingen → Abonnement en team).
// Database: supabase/2026-10-24-logo-op-prints.sql. Zonder die SQL print Savour zoals voorheen, zonder logo.

const PRINT_OPTIONS_KEY = 'savour_print_options';
const PRINT_LOGO_MAX = 600; // px, langste zijde; genoeg voor scherp printen klein rechtsboven

// Eigen logo-instellingen (rij in print_brands). undefined = nog niet geladen, false = SQL nog niet uitgevoerd.
let printBrandOwn;

function uniqueRecipes(list) {
  const seen = new Set();
  return list.filter(r => {
    if (!r || seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}

// Het logo dat bij deze print hoort: dat van je team of jezelf, of bij een gedeelde map dat van wie hem beheert.
async function fetchPrintBrand(mapId) {
  if (!currentUser || demoMode) return null;
  try {
    const { data, error } = await supabaseClient.rpc('savour_print_brand', { _map: mapId ? String(mapId) : null });
    return error ? null : data || null;
  } catch (_) {
    return null;
  }
}

function savedPrintOptions() {
  try {
    return { photos: true, cover: true, size: 'a4', ...JSON.parse(localStorage.getItem(PRINT_OPTIONS_KEY) || '{}') };
  } catch (_) {
    return { photos: true, cover: true, size: 'a4' };
  }
}

// Klein venster vlak voor het printen: foto's, voorblad (alleen bij meerdere recepten) en A4 of A5.
// Geeft de keuzes, of null bij annuleren. De laatste keuze wordt onthouden.
function askPrintOptions(list) {
  const o = savedPrintOptions();
  const hasPhotos = list.some(r => r.photo);
  const many = list.length > 1;
  document.getElementById('printOptions')?.remove();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="modal sv-dialog open" id="printOptions" role="dialog" aria-modal="true" aria-labelledby="printOptionsTitle"><form class="sv-dialog-box print-options" novalidate><h2 id="printOptionsTitle" class="sv-dialog-title">${many ? `${list.length} recepten printen` : 'Recept printen'}</h2>${
      hasPhotos
        ? `<label class="print-option"><input type="checkbox" name="photos"${o.photos ? ' checked' : ''}><span>Met foto's</span></label>`
        : ''
    }${
      many
        ? `<label class="print-option"><input type="checkbox" name="cover"${o.cover ? ' checked' : ''}><span>Met voorblad en inhoud</span></label>`
        : ''
    }<div class="print-sizes" role="radiogroup" aria-label="Papierformaat"><label class="print-option"><input type="radio" name="size" value="a4"${o.size !== 'a5' ? ' checked' : ''}><span>A4</span></label><label class="print-option"><input type="radio" name="size" value="a5"${o.size === 'a5' ? ' checked' : ''}><span>A5, voor een kleine map aan de pass</span></label></div><div class="sv-dialog-actions"><button type="button" class="btn" data-cancel>Annuleren</button><button type="submit" class="btn gold">Printen</button></div></form></div>`
  );
  const el = document.getElementById('printOptions');
  const form = el.querySelector('form');
  return new Promise(resolve => {
    const done = value => {
      el.remove();
      resolve(value);
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const chosen = {
        photos: form.photos ? form.photos.checked : o.photos,
        cover: form.cover ? form.cover.checked : o.cover,
        size: form.querySelector('input[name="size"]:checked')?.value === 'a5' ? 'a5' : 'a4'
      };
      try {
        localStorage.setItem(PRINT_OPTIONS_KEY, JSON.stringify(chosen));
      } catch (_) {}
      done(chosen);
    });
    el.querySelector('[data-cancel]').addEventListener('click', () => done(null));
    el.addEventListener('mousedown', e => {
      if (e.target === el) done(null);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Escape') done(null);
    });
    setTimeout(() => form.querySelector('[type="submit"]').focus(), 0);
  });
}

async function openPrintBundle(list, { title = '', mapId = null } = {}) {
  list = uniqueRecipes(list);
  if (!list.length) {
    toast('Geen recepten om te printen');
    return;
  }
  const [brand, options] = await Promise.all([fetchPrintBrand(mapId), askPrintOptions(list)]);
  if (!options) return;
  let old = document.getElementById('printBundle');
  if (old) old.remove();
  let el = document.createElement('div');
  el.id = 'printBundle';
  el.className = 'print-bundle' + (options.size === 'a5' ? ' print-a5' : '');
  el.innerHTML = printBundleHtml(list, { brand, options, title });
  document.body.appendChild(el);
  // Papierformaat voor de printer.
  const page = document.createElement('style');
  page.id = 'printPageSize';
  page.textContent = `@page { size: ${options.size === 'a5' ? 'A5' : 'A4'}; margin: ${options.size === 'a5' ? '10mm' : '14mm'}; }`;
  document.head.appendChild(page);
  let cleanup = () => {
    el.remove();
    page.remove();
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  // Wachten tot het logo en de foto's geladen zijn, anders ontbreken ze soms op papier.
  await Promise.all(
    [...el.querySelectorAll('img')].map(img => (img.complete ? null : new Promise(r => (img.onload = img.onerror = r))))
  );
  setTimeout(() => window.print(), 80);
}

// Een recept dat niet van jou is, komt uit een gedeelde map: dan hoort het logo van die map erbij.
function printRecipe(id) {
  let r = findRecipe(id);
  if (!r) return;
  const map = recipes.some(x => x.id === r.id) ? null : sharedMaps.find(m => m.recipeIds.includes(r.id));
  openPrintBundle([r], { mapId: map?.id || null });
}

function printBrandHtml(brand) {
  if (!brand) return '';
  return `<header class="print-brand${brand.bw ? ' is-bw' : ''}">${brand.logo ? `<img src="${esc(brand.logo)}" alt="">` : ''}${
    brand.name ? `<span translate="no">${esc(brand.name)}</span>` : ''
  }</header>`;
}

function printBundleHtml(list, { brand = null, options = {}, title = '' } = {}) {
  list = uniqueRecipes(list);
  const top = printBrandHtml(brand);
  const day = new Date().toLocaleDateString(currentLanguage === 'nl' ? 'nl-NL' : currentLanguage, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const foot = `<div class="print-bundle-footer"><span>Gemaakt met Savour</span><span>Geprint op ${esc(day)}</span></div>`;
  const cover =
    options.cover && list.length > 1
      ? `<section class="print-cover">${
          brand?.logo ? `<img class="print-cover-logo${brand.bw ? ' is-bw' : ''}" src="${esc(brand.logo)}" alt="">` : ''
        }${brand?.name ? `<div class="print-cover-name" translate="no">${esc(brand.name)}</div>` : ''}<h1 translate="no">${esc(
          title || 'Recepten'
        )}</h1><div class="print-cover-count">${list.length} recepten</div><ol class="print-cover-list">${list
          .map(r => `<li translate="no">${esc(r.title)}</li>`)
          .join('')}</ol>${foot}</section>`
      : '';
  return (
    cover +
    list
      .map(r => {
        const ingredients = r.ingredients?.length ? r.ingredients : [];
        const steps = r.steps?.length ? r.steps : [];
        const photo =
          r.photo && options.photos !== false ? `<img class="print-photo" src="${esc(r.photo)}" alt="">` : '';
        return `<article class="print-bundle-recipe">${top}${photo}<h1>${esc(r.title)}</h1>${r.yield ? `<div class="print-yield">Opbrengst · ${esc(r.yield)}</div>` : ''}<div class="print-bundle-columns"><div><h3>Ingrediënten</h3>${ingredients.length ? ingredients.map(x => `<div class="ingredient">${esc(x)}</div>`).join('') : `<div class="muted">Geen ingrediënten vastgelegd.</div>`}</div>${steps.length ? `<div><h3>Bereiding</h3>${steps.map((x, i) => `<div class="step"><b>${i + 1}.</b> ${esc(x)}</div>`).join('')}</div>` : ''}</div>${foot}</article>`;
      })
      .join('')
  );
}

function printFolder(id) {
  if (!currentUser) return;
  let f = folders.find(x => x.id === id);
  if (!f) return;
  let list = f.system && f.name === 'A t/m Z' ? [...recipes] : recipes.filter(r => f.recipeIds.includes(r.id));
  if (!list.length) {
    toast('Deze map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list, { title: f.name });
}

function printSharedMap(id) {
  let m = sharedMaps.find(x => x.id === id);
  if (!m) return;
  let list = m.recipeIds.map(rid => findRecipe(rid)).filter(Boolean);
  if (!list.length) {
    toast('Deze gedeelde map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list, { title: m.name, mapId: m.id });
}

function printSharedFolder(mapId, folderId) {
  let m = sharedMaps.find(x => x.id === mapId);
  let f = m?.folders?.find(x => x.id === folderId);
  if (!m || !f) return;
  let list = (f.system && f.name === 'A t/m Z' ? m.recipeIds : f.recipeIds).map(rid => findRecipe(rid)).filter(Boolean);
  if (!list.length) {
    toast('Deze gedeelde map bevat nog geen recepten');
    return;
  }
  openPrintBundle(list, { title: f.system ? m.name : `${m.name} · ${f.name}`, mapId: m.id });
}

// ---- Instellingen: logo op prints ----

async function loadOwnPrintBrand() {
  printBrandOwn = null;
  if (!currentUser || demoMode) return;
  const { data, error } = await supabaseClient
    .from('print_brands')
    .select('name,logo,bw')
    .eq('user_id', currentUser.id)
    .maybeSingle();
  printBrandOwn = error ? false : data || null;
}

async function renderPrintBrandSettings() {
  const host = $('printBrandSettings');
  if (!host) return;
  const s = savourPlan;
  if (demoMode || !currentUser) {
    host.innerHTML = `<p class="muted">Met Savour Pro print je recepten en mappen met het logo en de naam van je restaurant rechtsboven. In de demo kun je dit niet instellen.</p>`;
    return;
  }
  if (s.source === 'team_member') {
    host.innerHTML = `<p class="muted">Je print met het logo van je team (${esc(s.team?.name || '')}). Dat logo stelt de eigenaar van het team in.</p>`;
    return;
  }
  if (!isPro()) {
    host.innerHTML = `<p class="muted">Print je recepturen als eigen receptenboek, met het logo en de naam van je restaurant rechtsboven op elke pagina. Dit is onderdeel van Savour Pro.</p><div class="actions"><button class="btn gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button></div>`;
    return;
  }
  if (printBrandOwn === undefined) await loadOwnPrintBrand();
  if (printBrandOwn === false) {
    host.innerHTML = `<p class="muted">Logo op prints is binnenkort beschikbaar.</p>`;
    return;
  }
  const b = printBrandOwn || {};
  const name = b.name ?? (account?.organization || s.team?.name || '');
  host.innerHTML = `<p class="muted">${s.source === 'team_owner' ? 'Dit logo staat op de prints van iedereen in je team.' : 'Dit logo staat rechtsboven op elke pagina die je print.'}</p><div class="print-brand-setup"><div class="print-brand-preview${b.bw ? ' is-bw' : ''}" id="printBrandPreview" aria-label="Voorbeeld van een geprinte pagina"><div class="pbp-top">${b.logo ? `<img src="${esc(b.logo)}" alt="">` : ''}<span translate="no">${esc(name)}</span></div><div class="pbp-title"></div><div class="pbp-line"></div><div class="pbp-line"></div><div class="pbp-line short"></div></div><div class="print-brand-fields"><div class="field"><label>Naam op de print</label><input id="printBrandName" value="${esc(name)}" placeholder="Bijv. Restaurant De Zwaan" maxlength="120" autocomplete="organization" oninput="previewPrintBrand()"></div><div class="actions"><label class="btn">${b.logo ? 'Ander logo kiezen' : 'Logo kiezen'}<input type="file" id="printBrandFile" accept="image/png,image/jpeg,image/webp" onchange="choosePrintLogo(this)" style="display:none"></label>${b.logo ? '<button class="btn" onclick="removePrintLogo()">Logo weghalen</button>' : ''}</div><label class="print-option"><input type="checkbox" id="printBrandBw"${b.bw ? ' checked' : ''} onchange="previewPrintBrand()"><span>Logo in zwart-wit printen (beter op een keukenprinter)</span></label><div class="actions"><button class="btn gold" onclick="savePrintBrand()">Opslaan</button></div></div></div>`;
}

// Nieuw gekozen logo, nog niet opgeslagen.
let printLogoDraft = null;

async function choosePrintLogo(input) {
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  try {
    // PNG houdt een doorzichtige achtergrond; foto's als JPG.
    printLogoDraft = await compressPhoto(file, PRINT_LOGO_MAX, file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png');
    if (printLogoDraft.length > 400000) {
      printLogoDraft = await compressPhoto(file, 400, 'image/jpeg');
    }
    previewPrintBrand();
  } catch (e) {
    toast(e.message || 'Dit logo kan niet worden gelezen. Gebruik PNG of JPG.');
  }
}

function previewPrintBrand() {
  const box = $('printBrandPreview');
  if (!box) return;
  const logo = printLogoDraft || printBrandOwn?.logo || '';
  box.classList.toggle('is-bw', !!$('printBrandBw')?.checked);
  box.querySelector('.pbp-top').innerHTML =
    `${logo ? `<img src="${esc(logo)}" alt="">` : ''}<span translate="no">${esc($('printBrandName')?.value || '')}</span>`;
}

async function savePrintBrand(removeLogo = false) {
  const row = {
    user_id: currentUser.id,
    name: ($('printBrandName')?.value || '').trim().slice(0, 120) || null,
    logo: removeLogo ? null : printLogoDraft || printBrandOwn?.logo || null,
    bw: !!$('printBrandBw')?.checked,
    updated_at: new Date().toISOString()
  };
  const { error } = await supabaseClient.from('print_brands').upsert(row, { onConflict: 'user_id' });
  if (error) {
    console.warn('Logo kon niet worden opgeslagen:', error);
    toast('Opslaan lukte niet. Probeer een kleiner logo.');
    return;
  }
  printBrandOwn = { name: row.name, logo: row.logo, bw: row.bw };
  printLogoDraft = null;
  toast(removeLogo ? 'Logo weggehaald' : 'Opgeslagen. Je volgende print heeft dit logo.');
  renderPrintBrandSettings();
}

async function removePrintLogo() {
  if (
    !(await askConfirm('Logo weghalen?\n\nJe prints krijgen dan alleen de naam van je restaurant.', {
      confirmLabel: 'Weghalen'
    }))
  )
    return;
  savePrintBrand(true);
}
