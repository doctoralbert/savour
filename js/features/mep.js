// MEP-lijsten (mise-en-place), 2026-11-17. Eerst op savour-3.
// Per post een lijst met kaarten (à la carte, banqueting), kopjes per gang of gerecht en de onderdelen die klaar
// moeten staan. Tabellen en rechten: supabase/2026-11-17-mep-lijsten.sql.
// Beheren: eigen lijst met Savour Pro (zonder Pro één lijst om te proberen), in een keukenteam wie daar mag bewerken.
// De database bewaakt dezelfde regels (savour_mep_can_manage); wat hier staat is alleen gemak.
// Savour koppelt nooit zelf een recept: het stelt alleen voor, de kok kiest.

let mepLists = [];
let mepCards = [];
let mepSections = [];
let mepItems = [];
let mepLoaded = false; // al opgehaald voor dit account
let mepLoading = null; // lopende aanvraag
let mepOpenId = null; // open lijst, of null voor het overzicht
let mepCardId = null; // kaart die open staat
let mepShowArchived = false;
let mepSavedAt = null; // laatste opslag, voor "Opgeslagen 14:02"
// Lijst ('overzicht': de lijst in de huisstijl van Savour, met afvinkhokjes, couverts en kookmodus) of Bewerken.
// Printen geeft het witte A4-blad. Standaard Lijst; de keuze wordt in deze browser onthouden.
const MEP_MODES = ['overzicht', 'bewerken'];
let mepMode = (() => {
  try {
    const m = localStorage.getItem('savour_mep_mode');
    return MEP_MODES.includes(m) ? m : 'overzicht';
  } catch (_) {
    return 'overzicht';
  }
})();

// ---- Gegevens ----

function mepResetState() {
  mepLists = [];
  mepCards = [];
  mepSections = [];
  mepItems = [];
  mepLoaded = false;
  mepLoading = null;
  mepOpenId = null;
  mepCardId = null;
  mepDay = null;
  mepDemoDays = {};
  mepStopLive();
}

function mepError(error) {
  const msg = String(error?.message || error || '');
  if (/mep_|does not exist|schema cache/i.test(msg) && /relation|table|schema/i.test(msg))
    return t('MEP-lijsten worden nog ingericht. Probeer het straks opnieuw.');
  if (/row-level security|violates|permission/i.test(msg))
    return t('Dit mag je in deze lijst niet aanpassen. Vraag de eigenaar van het keukenteam of kijk bij Savour Pro.');
  if (looksOffline(error)) return t('Geen verbinding. Probeer het opnieuw zodra je weer online bent.');
  return t('Er ging iets mis. Probeer het opnieuw.');
}

// Tekst die Savour zelf als naam opslaat ("À la carte", "kopie", de demolijsten) meteen in de taal van de
// gebruiker; de vertaler (js/core/i18n.js) vertaalt alleen wat op het scherm staat.
const mepTr = s => (typeof translateText === 'function' && translateText(s)) || s;

const mepByPos = (a, b) => (a.position ?? 0) - (b.position ?? 0) || String(a.created_at).localeCompare(b.created_at);

async function loadMep(force = false) {
  // Demo: de voorbeeldlijsten uit de demorecepten (mepSeedDemo).
  if (demoMode) {
    if (!mepLoaded) mepSeedDemo();
    return true;
  }
  if (!currentUser) {
    mepLoaded = true;
    return true;
  }
  if (mepLoaded && !force) return true;
  if (mepLoading) return mepLoading;
  mepLoading = (async () => {
    const { data: lists, error } = await supabaseClient
      .from('mep_lists')
      .select('id,owner_id,team_id,name,archived,position,created_by,created_at,updated_at')
      .order('position')
      .order('created_at');
    if (error) throw error;
    const ids = (lists || []).map(l => l.id);
    const cards = [],
      sections = [],
      items = [];
    // Per 20 lijsten tegelijk, zodat de adresregel naar Supabase niet te lang wordt.
    for (let i = 0; i < ids.length; i += 20) {
      const part = ids.slice(i, i + 20);
      const [c, s, it] = await Promise.all([
        supabaseClient.from('mep_cards').select('*').in('list_id', part).limit(5000),
        supabaseClient.from('mep_sections').select('*').in('list_id', part).limit(5000),
        supabaseClient.from('mep_items').select('*').in('list_id', part).limit(10000)
      ]);
      for (const r of [c, s, it]) if (r.error) throw r.error;
      cards.push(...c.data);
      sections.push(...s.data);
      items.push(...it.data);
    }
    mepLists = lists || [];
    mepCards = cards;
    mepSections = sections;
    mepItems = items;
    mepLoaded = true;
    mepOffline = false;
    mepSaveCache();
    mepFlushQueue();
    return true;
  })();
  try {
    return await mepLoading;
  } catch (e) {
    // Geen verbinding: de lijsten zoals ze laatst op dit toestel stonden.
    if (looksOffline(e) && (await mepUseCache())) return true;
    throw e;
  } finally {
    mepLoading = null;
  }
}

function mepNewId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));
}

// Toevoegen, wijzigen en verwijderen. In de demo blijft alles in deze browser (niets wordt opgeslagen).
const MEP_TABLES = {
  mep_lists: () => mepLists,
  mep_cards: () => mepCards,
  mep_sections: () => mepSections,
  mep_items: () => mepItems
};

async function mepInsert(table, rows) {
  const list = Array.isArray(rows) ? rows : [rows];
  if (!list.length) return true;
  const now = new Date().toISOString();
  list.forEach(r => {
    r.id = r.id || mepNewId();
  });
  if (!demoMode) {
    for (let i = 0; i < list.length; i += 500) {
      const { error } = await supabaseClient.from(table).insert(list.slice(i, i + 500));
      if (error) {
        toast(mepError(error));
        return false;
      }
    }
  }
  MEP_TABLES[table]().push(...list.map(r => ({ created_at: now, ...r })));
  mepMarkSaved();
  return true;
}

async function mepUpdate(table, id, patch) {
  if (!demoMode) {
    const { error } = await supabaseClient.from(table).update(patch).eq('id', id);
    if (error) {
      toast(mepError(error));
      return false;
    }
  }
  const row = MEP_TABLES[table]().find(r => r.id === id);
  if (row) Object.assign(row, patch);
  mepMarkSaved();
  return true;
}

async function mepDelete(table, id) {
  if (!demoMode) {
    const { error } = await supabaseClient.from(table).delete().eq('id', id);
    if (error) {
      toast(mepError(error));
      return false;
    }
  }
  // Wat onder dit onderdeel hing, gaat in de database mee (on delete cascade); hier ook.
  if (table === 'mep_lists') {
    mepLists = mepLists.filter(r => r.id !== id);
    mepCards = mepCards.filter(r => r.list_id !== id);
    mepSections = mepSections.filter(r => r.list_id !== id);
    mepItems = mepItems.filter(r => r.list_id !== id);
  } else if (table === 'mep_cards') {
    const gone = new Set(mepSections.filter(s => s.card_id === id).map(s => s.id));
    mepCards = mepCards.filter(r => r.id !== id);
    mepSections = mepSections.filter(r => r.card_id !== id);
    mepItems = mepItems.filter(r => !gone.has(r.section_id));
  } else if (table === 'mep_sections') {
    mepSections = mepSections.filter(r => r.id !== id);
    mepItems = mepItems.filter(r => r.section_id !== id);
  } else mepItems = mepItems.filter(r => r.id !== id);
  mepMarkSaved();
  return true;
}

function mepMarkSaved() {
  mepSavedAt = new Date();
  const el = $('mepSaved');
  if (el) el.textContent = mepSavedText();
}

function mepSavedText() {
  if (!mepSavedAt) return '';
  const time = mepSavedAt.toLocaleTimeString(getSavedLanguage(), { hour: '2-digit', minute: '2-digit' });
  return demoMode ? t('Demo: niets wordt opgeslagen') : `${t('Opgeslagen')} ${time}`;
}

const mepListById = id => mepLists.find(l => l.id === id);
const mepCardsOf = listId => mepCards.filter(c => c.list_id === listId).sort(mepByPos);
const mepSectionsOf = cardId => mepSections.filter(s => s.card_id === cardId).sort(mepByPos);
const mepItemsOf = sectionId => mepItems.filter(i => i.section_id === sectionId).sort(mepByPos);

// ---- Rechten (gemak; de database beslist) ----

function mepTeam(l) {
  return l?.team_id ? findSharedMap(l.team_id) : null;
}

// Keukenteams waarin je een lijst mag maken.
function mepTeamsForNew() {
  if (demoMode) return [];
  return (sharedMaps || []).filter(m => !m.locked && canEditShared(m));
}

// ---- Scherm ----

async function renderMep() {
  const host = $('mepBody');
  if (!host) return;
  if (!currentUser && !demoMode) return;
  if (!mepLoaded) {
    host.innerHTML = `<p class="muted">${esc(t('Laden…'))}</p>`;
    try {
      await loadMep();
    } catch (e) {
      console.error(e);
      host.innerHTML = `<div class="mep-empty"><p>${esc(mepError(e))}</p><button type="button" class="btn" onclick="renderMep()">${esc(t('Probeer het opnieuw'))}</button></div>`;
      return;
    }
  }
  // Bezig met importeren (js/features/mep-import.js): dat scherm laten staan.
  if (mepImport) return renderMepImport();
  if (mepOpenId && !mepListById(mepOpenId)) mepOpenId = null;
  if (mepOpenId) return renderMepList();
  renderMepOverview();
}

function mepListMeta(l) {
  const cards = mepCardsOf(l.id);
  const n = mepItems.filter(i => i.list_id === l.id).length;
  const parts = [
    cards.length === 1 ? t('1 kaart') : t(`${cards.length} kaarten`),
    n === 1 ? t('1 onderdeel') : t(`${n} onderdelen`)
  ];
  return parts.join(' · ');
}

function mepListRow(l) {
  return `<li><button type="button" class="mep-list-row${l.archived ? ' is-archived' : ''}" onclick="openMepList('${escJs(l.id)}')"><span class="mep-list-name" translate="no">${esc(l.name)}</span><span class="mep-list-meta">${esc(mepListMeta(l))}</span>${icon('chevron')}</button></li>`;
}

function openMepList(id) {
  mepOpenId = id;
  const cards = mepCardsOf(id);
  if (!cards.some(c => c.id === mepCardId)) mepCardId = cards[0]?.id || null;
  renderMep();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderMepCard(l, card, can) {
  const cid = escJs(card.id);
  const cards = mepCardsOf(l.id);
  const idx = cards.findIndex(c => c.id === card.id);
  const cardBar = can
    ? `<div class="mep-card-bar"><button type="button" class="btn small" onclick="renameMepCard('${cid}')">${icon('edit')}${esc(t('Naam kaart'))}</button>${idx > 0 ? `<button type="button" class="btn small" onclick="moveMep('mep_cards','${cid}',-1)" aria-label="${esc(t('Kaart naar links'))}" title="${esc(t('Kaart naar links'))}">←</button>` : ''}${idx < cards.length - 1 ? `<button type="button" class="btn small" onclick="moveMep('mep_cards','${cid}',1)" aria-label="${esc(t('Kaart naar rechts'))}" title="${esc(t('Kaart naar rechts'))}">→</button>` : ''}<button type="button" class="btn small mep-danger" onclick="deleteMepCard('${cid}')">${icon('trash')}${esc(t('Kaart verwijderen'))}</button></div>`
    : '';
  const sections = mepSectionsOf(card.id);
  const blocks = sections.map((s, i) => renderMepSection(l, s, can, i, sections.length)).join('');
  const add = can
    ? `<form class="mep-add-section" onsubmit="event.preventDefault();addMepSection('${cid}')"><input id="mepNewSection" maxlength="160" placeholder="${esc(t('Nieuw kopje, bijvoorbeeld een gang of gerecht'))}" autocomplete="off"><button type="submit" class="btn">${icon('plus')}${esc(t('Kopje toevoegen'))}</button></form>`
    : '';
  const empty =
    !sections.length && !can ? `<div class="mep-empty"><p>${esc(t('Deze kaart is nog leeg.'))}</p></div>` : '';
  return cardBar + blocks + empty + add;
}

function mepQtyText(i) {
  if (i.portion_qty == null) return '';
  return `${formatNumber(Number(i.portion_qty))}${i.portion_unit ? ' ' + i.portion_unit : ''}`;
}

function renderMepSection(l, s, can, idx, count) {
  const sid = escJs(s.id);
  const items = mepItemsOf(s.id);
  const others = mepCardsOf(l.id).length > 1;
  const tools = can
    ? `<div class="mep-sec-tools">${idx > 0 ? `<button type="button" class="mep-icon" onclick="moveMep('mep_sections','${sid}',-1)" aria-label="${esc(t('Omhoog'))}" title="${esc(t('Omhoog'))}">↑</button>` : ''}${idx < count - 1 ? `<button type="button" class="mep-icon" onclick="moveMep('mep_sections','${sid}',1)" aria-label="${esc(t('Omlaag'))}" title="${esc(t('Omlaag'))}">↓</button>` : ''}<details class="rp-more"><summary class="mep-icon" aria-label="${esc(t('Meer acties'))}" title="${esc(t('Meer acties'))}">${icon('more')}</summary><div class="rp-menu">${others ? `<button type="button" onclick="moveMepSection('${sid}')">${icon('folder')}${esc(t('Naar andere kaart'))}</button>` : ''}<button type="button" onclick="copyMepSection('${sid}')">${icon('plus')}${esc(t('Kopiëren naar kaart'))}</button><button type="button" class="danger" onclick="deleteMepSection('${sid}')">${icon('trash')}${esc(t('Kopje verwijderen'))}</button></div></details></div>`
    : '';
  const title = can
    ? `<input class="mep-sec-name" value="${esc(s.name)}" maxlength="160" aria-label="${esc(t('Kopje'))}" onchange="setMepSection('${sid}', this)">`
    : `<h3 class="mep-sec-name" translate="no">${esc(s.name)}</h3>`;
  const rows = items.map((it, i) => renderMepItem(l, it, can, i, items.length)).join('');
  const add = can
    ? `<form class="mep-item mep-item-new" onsubmit="event.preventDefault();addMepItem('${sid}', this)"><input name="name" maxlength="200" placeholder="${esc(t('Nieuw onderdeel'))}" autocomplete="off" aria-label="${esc(t('Nieuw onderdeel'))}"><input name="qty" inputmode="decimal" placeholder="${esc(t('Portie'))}" aria-label="${esc(t('Portie'))}"><input name="unit" maxlength="20" placeholder="${esc(t('Eenheid'))}" aria-label="${esc(t('Eenheid'))}"><input name="note" maxlength="300" placeholder="${esc(t('Opmerking'))}" aria-label="${esc(t('Opmerking'))}"><button type="submit" class="btn small">${icon('plus')}<span>${esc(t('Toevoegen'))}</span></button></form>`
    : '';
  const head = `<div class="mep-item mep-item-head" aria-hidden="true"><span>${esc(t('Onderdeel'))}</span><span>${esc(t('Portie'))}</span><span>${can ? esc(t('Eenheid')) : ''}</span><span>${esc(t('Opmerking'))}</span><span>${esc(t('Recept'))}</span></div>`;
  return `<section class="mep-section${can ? ' can-edit' : ''}" data-section="${esc(s.id)}"><div class="mep-sec-head">${title}${tools}</div>${items.length || can ? head : ''}${rows}${add}${!items.length && !can ? `<p class="muted mep-none">${esc(t('Nog geen onderdelen.'))}</p>` : ''}</section>`;
}

function mepRecipeCell(l, it, can) {
  const iid = escJs(it.id);
  const r = it.recipe_id ? findRecipe(it.recipe_id) : null;
  if (it.recipe_id && r)
    return `<span class="mep-recipe"><button type="button" class="mep-recipe-link" onclick="openRecipe('${escJs(r.id)}','mep')" translate="no">${icon('book')}${esc(r.title)}</button>${can ? `<button type="button" class="mep-icon" onclick="unlinkMepRecipe('${iid}')" aria-label="${esc(t('Koppeling weghalen'))}" title="${esc(t('Koppeling weghalen'))}">${icon('close')}</button>` : ''}</span>`;
  if (it.recipe_id)
    return `<span class="mep-recipe muted">${esc(t('Recept niet beschikbaar'))}${can ? `<button type="button" class="mep-icon" onclick="unlinkMepRecipe('${iid}')" aria-label="${esc(t('Koppeling weghalen'))}" title="${esc(t('Koppeling weghalen'))}">${icon('close')}</button>` : ''}</span>`;
  return can
    ? `<button type="button" class="mep-link-btn" onclick="linkMepRecipe('${iid}')">${icon('book')}${esc(t('Koppelen'))}</button>`
    : '<span></span>';
}

function renderMepItem(l, it, can, idx, count) {
  const iid = escJs(it.id);
  if (!can)
    return `<div class="mep-item"><span class="mep-item-name" translate="no">${esc(it.name)}</span><span class="mep-item-qty">${esc(mepQtyText(it))}</span><span></span><span class="mep-item-note" translate="no">${esc(it.note || '')}</span>${mepRecipeCell(l, it, false)}</div>`;
  const qty = it.portion_qty == null ? '' : formatNumber(Number(it.portion_qty));
  return `<div class="mep-item" data-item="${esc(it.id)}"><input value="${esc(it.name)}" maxlength="200" aria-label="${esc(t('Onderdeel'))}" onchange="setMepItem('${iid}','name',this)"><input value="${esc(qty)}" inputmode="decimal" placeholder="${esc(t('Portie'))}" aria-label="${esc(t('Portie'))}" onchange="setMepItem('${iid}','portion_qty',this)"><input value="${esc(it.portion_unit || '')}" maxlength="20" placeholder="${esc(t('Eenheid'))}" aria-label="${esc(t('Eenheid'))}" onchange="setMepItem('${iid}','portion_unit',this)"><input value="${esc(it.note || '')}" maxlength="300" placeholder="${esc(t('Opmerking'))}" aria-label="${esc(t('Opmerking'))}" onchange="setMepItem('${iid}','note',this)">${mepRecipeCell(l, it, true)}<span class="mep-item-tools">${idx > 0 ? `<button type="button" class="mep-icon" onclick="moveMep('mep_items','${iid}',-1)" aria-label="${esc(t('Omhoog'))}" title="${esc(t('Omhoog'))}">↑</button>` : ''}${idx < count - 1 ? `<button type="button" class="mep-icon" onclick="moveMep('mep_items','${iid}',1)" aria-label="${esc(t('Omlaag'))}" title="${esc(t('Omlaag'))}">↓</button>` : ''}<button type="button" class="mep-icon mep-danger" onclick="deleteMepItem('${iid}')" aria-label="${esc(t('Onderdeel verwijderen'))}" title="${esc(t('Onderdeel verwijderen'))}">${icon('trash')}</button></span></div>`;
}

// ---- Lijsten ----

// teamId: vanaf het keukenteam-scherm, dan is de keuze al gemaakt.
async function newMepList(teamId = null) {
  if (!currentUser && !demoMode) return;
  if (!mepCanCreate()) return mepAskForPro();
  const teams = mepTeamsForNew();
  if (teamId && !teams.some(m => m.id === teamId)) teamId = null;
  if (!teamId && teams.length) {
    const choice = await askChoice(t('Voor wie is deze MEP-lijst?'), [
      { value: 'own', label: t('Alleen voor mij'), primary: true },
      ...teams.map(m => ({ value: m.id, label: m.name, hint: t('Keukenteam: je collega’s vinken mee af') }))
    ]);
    if (!choice) return;
    if (choice !== 'own') teamId = choice;
  }
  const name = (
    (await askText(t('Naam van de lijst, bijvoorbeeld je post (Garde, Entremetier)'), '', {
      confirmLabel: t('Maken')
    })) || ''
  ).trim();
  if (!name) return;
  const list = {
    id: mepNewId(),
    // Ook in een keukenteam is de maker de eigenaar van de rij; het team bepaalt wie de lijst ziet.
    owner_id: currentUser?.id || 'demo',
    team_id: teamId,
    name: name.slice(0, 120),
    archived: false,
    position: mepLists.length,
    created_by: currentUser?.id || null
  };
  if (!(await mepInsert('mep_lists', list))) return;
  const card = { id: mepNewId(), list_id: list.id, name: mepTr('À la carte'), position: 0 };
  await mepInsert('mep_cards', card);
  mepCardId = card.id;
  // Een nieuwe lijst is nog leeg: meteen in Bewerken. Gemaakt vanaf het keukenteam: terug gaat daarheen.
  mepMode = 'bewerken';
  if (!$('mep')?.classList.contains('active')) go('mep');
  if (teamId && document.querySelector('#shared.active, #mep.active')) mepReturnTeam = teamId;
  openMepList(list.id);
  setTimeout(() => $('mepNewSection')?.focus(), 80);
}

async function renameMepList(id) {
  const l = mepListById(id);
  const name = ((await askText(t('Naam van de lijst'), l.name)) || '').trim();
  if (!name || name === l.name) return;
  if (await mepUpdate('mep_lists', id, { name: name.slice(0, 120), updated_at: new Date().toISOString() }))
    renderMepList();
}

async function archiveMepList(id, archived) {
  if (!(await mepUpdate('mep_lists', id, { archived, updated_at: new Date().toISOString() }))) return;
  toast(archived ? t('Lijst gearchiveerd. Je vindt hem onderaan het overzicht.') : t('Lijst teruggezet'));
  if (archived) closeMepList();
  else renderMepList();
}

async function deleteMepList(id) {
  const l = mepListById(id);
  const n = mepItems.filter(i => i.list_id === id).length;
  if (
    !(await askConfirm(
      `${l.name} ${t('verwijderen?')}\n\n${t('Ook de afgevinkte dagen gaan weg. Dit kan niet ongedaan worden gemaakt.')}`,
      { danger: true }
    ))
  )
    return;
  if (!(await mepDelete('mep_lists', id))) return;
  toast(n ? t('MEP-lijst verwijderd') : t('Lege lijst verwijderd'));
  closeMepList();
}

// Een kopie van de hele lijst (bijvoorbeeld een nieuwe kaart voor het volgende seizoen). Zonder dagstand.
async function copyMepList(id) {
  const l = mepListById(id);
  if (!mepCanManage(l) || !mepCanCreate()) return mepAskForPro();
  const name = (
    (await askText(t('Naam van de kopie'), `${l.name} (${mepTr('kopie')})`, { confirmLabel: t('Kopie maken') })) || ''
  ).trim();
  if (!name) return;
  const copy = {
    id: mepNewId(),
    owner_id: currentUser?.id || 'demo',
    team_id: l.team_id,
    name: name.slice(0, 120),
    archived: false,
    position: mepLists.length,
    created_by: currentUser?.id || null
  };
  if (!(await mepInsert('mep_lists', copy))) return;
  const cardMap = new Map(),
    secMap = new Map();
  const cards = mepCardsOf(id).map(c => {
    const n = mepNewId();
    cardMap.set(c.id, n);
    return { id: n, list_id: copy.id, name: c.name, position: c.position };
  });
  const secs = mepSections
    .filter(s => s.list_id === id)
    .map(s => {
      const n = mepNewId();
      secMap.set(s.id, n);
      return { id: n, list_id: copy.id, card_id: cardMap.get(s.card_id), name: s.name, position: s.position };
    });
  const items = mepItems.filter(i => i.list_id === id).map(i => mepItemCopy(i, copy.id, secMap.get(i.section_id)));
  const ok =
    (await mepInsert('mep_cards', cards)) &&
    (await mepInsert('mep_sections', secs)) &&
    (await mepInsert('mep_items', items));
  if (!ok) toast(t('De kopie is niet helemaal gelukt. Kijk de lijst na.'));
  else toast(t('Kopie gemaakt'));
  mepCardId = null;
  openMepList(copy.id);
}

function mepItemCopy(i, listId, sectionId) {
  return {
    id: mepNewId(),
    list_id: listId,
    section_id: sectionId,
    name: i.name,
    portion_qty: i.portion_qty,
    portion_unit: i.portion_unit,
    note: i.note,
    recipe_id: i.recipe_id,
    position: i.position
  };
}

// ---- Kaarten ----

async function addMepCard(listId) {
  const name = (
    (await askText(t('Naam van de kaart, bijvoorbeeld Banqueting of een evenement'), '', {
      confirmLabel: t('Toevoegen')
    })) || ''
  ).trim();
  if (!name) return;
  const card = { id: mepNewId(), list_id: listId, name: name.slice(0, 80), position: mepCardsOf(listId).length };
  if (!(await mepInsert('mep_cards', card))) return;
  mepCardId = card.id;
  renderMepList();
}

async function renameMepCard(id) {
  const c = mepCards.find(x => x.id === id);
  const name = ((await askText(t('Naam van de kaart'), c.name)) || '').trim();
  if (!name || name === c.name) return;
  if (await mepUpdate('mep_cards', id, { name: name.slice(0, 80) })) renderMepList();
}

async function deleteMepCard(id) {
  const c = mepCards.find(x => x.id === id);
  const secs = mepSectionsOf(id);
  const n = mepItems.filter(i => secs.some(s => s.id === i.section_id)).length;
  const what = secs.length
    ? `${secs.length === 1 ? t('1 kopje') : t(`${secs.length} kopjes`)}, ${n === 1 ? t('1 onderdeel') : t(`${n} onderdelen`)}`
    : t('leeg');
  if (
    !(await askConfirm(
      `${c.name} ${t('verwijderen?')}\n\n${secs.length ? t('Alle kopjes en onderdelen op deze kaart gaan mee. Dit kan niet ongedaan worden gemaakt.') : t('Deze kaart is nog leeg.')}`,
      {
        danger: true
      }
    ))
  )
    return;
  if (!(await mepDelete('mep_cards', id))) return;
  mepCardId = null;
  renderMepList();
}

// ---- Kopjes ----

async function addMepSection(cardId) {
  const input = $('mepNewSection');
  const name = (input?.value || '').trim();
  if (!name) return input?.focus();
  const c = mepCards.find(x => x.id === cardId);
  const row = {
    id: mepNewId(),
    list_id: c.list_id,
    card_id: cardId,
    name: name.slice(0, 160),
    position: mepSectionsOf(cardId).length
  };
  if (!(await mepInsert('mep_sections', row))) return;
  renderMepList();
  // Meteen het eerste onderdeel kunnen typen.
  setTimeout(() => document.querySelector(`[data-section="${row.id}"] .mep-item-new input[name=name]`)?.focus(), 30);
}

async function setMepSection(id, input) {
  const s = mepSections.find(x => x.id === id);
  const name = input.value.trim();
  if (!name) {
    input.value = s.name;
    return toast(t('Een kopje heeft een naam nodig.'));
  }
  if (name === s.name) return;
  if (!(await mepUpdate('mep_sections', id, { name: name.slice(0, 160) }))) input.value = s.name;
}

async function deleteMepSection(id) {
  const s = mepSections.find(x => x.id === id);
  const n = mepItemsOf(id).length;
  if (
    n &&
    !(await askConfirm(
      `${s.name} ${t('verwijderen?')}\n\n${t('Alle onderdelen onder dit kopje gaan mee. Dit kan niet ongedaan worden gemaakt.')}`,
      { danger: true }
    ))
  )
    return;
  if (await mepDelete('mep_sections', id)) renderMepList();
}

async function mepPickCard(s, question) {
  const cards = mepCardsOf(s.list_id);
  return askChoice(
    question,
    cards.map(c => ({ value: c.id, label: c.name, hint: c.id === s.card_id ? t('Huidige kaart') : '' }))
  );
}

// Een gerecht verplaatsen naar een andere kaart (bijvoorbeeld van à la carte naar banqueting).
async function moveMepSection(id) {
  const s = mepSections.find(x => x.id === id);
  const to = await mepPickCard(s, t('Naar welke kaart?'));
  if (!to || to === s.card_id) return;
  if (!(await mepUpdate('mep_sections', id, { card_id: to, position: mepSectionsOf(to).length }))) return;
  toast(t('Kopje verplaatst'));
  renderMepList();
}

async function copyMepSection(id) {
  const s = mepSections.find(x => x.id === id);
  const to = await mepPickCard(s, t('Kopie naar welke kaart?'));
  if (!to) return;
  const row = {
    id: mepNewId(),
    list_id: s.list_id,
    card_id: to,
    name: (to === s.card_id ? `${s.name} (${mepTr('kopie')})` : s.name).slice(0, 160),
    position: mepSectionsOf(to).length
  };
  if (!(await mepInsert('mep_sections', row))) return;
  await mepInsert(
    'mep_items',
    mepItemsOf(id).map(i => mepItemCopy(i, s.list_id, row.id))
  );
  toast(t('Kopje gekopieerd'));
  mepCardId = to;
  renderMepList();
}

// ---- Onderdelen ----

// "40", "0,5", "1/2" of "1 1/2" als getal; leeg = geen portie. Geeft NaN bij iets anders.
function mepParseQty(text) {
  const s = String(text || '')
    .trim()
    .replace(',', '.');
  if (!s) return null;
  let m = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (m) return Number(m[1]) + Number(m[2]) / Number(m[3]);
  m = s.match(/^(\d+)\/(\d+)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  return /^\d*\.?\d+$/.test(s) ? Number(s) : NaN;
}

async function addMepItem(sectionId, form) {
  const name = form.name.value.trim();
  if (!name) return form.name.focus();
  const qty = mepParseQty(form.qty.value);
  if (Number.isNaN(qty) || qty === 0) {
    form.qty.focus();
    return toast(t('Vul bij portie een getal in, bijvoorbeeld 40 of 0,5. Of laat het leeg.'));
  }
  const s = mepSections.find(x => x.id === sectionId);
  const row = {
    id: mepNewId(),
    list_id: s.list_id,
    section_id: sectionId,
    name: name.slice(0, 200),
    portion_qty: qty,
    portion_unit: form.unit.value.trim().slice(0, 20) || null,
    note: form.note.value.trim().slice(0, 300) || null,
    recipe_id: null,
    position: mepItemsOf(sectionId).length
  };
  if (!(await mepInsert('mep_items', row))) return;
  renderMepList();
  setTimeout(() => document.querySelector(`[data-section="${sectionId}"] .mep-item-new input[name=name]`)?.focus(), 30);
}

async function setMepItem(id, field, input) {
  const it = mepItems.find(x => x.id === id);
  let value = input.value.trim();
  const old = () => {
    input.value =
      field === 'portion_qty' ? (it.portion_qty == null ? '' : formatNumber(Number(it.portion_qty))) : it[field] || '';
  };
  if (field === 'name' && !value) {
    old();
    return toast(t('Een onderdeel heeft een naam nodig.'));
  }
  if (field === 'portion_qty') {
    value = mepParseQty(value);
    if (Number.isNaN(value) || value === 0) {
      old();
      return toast(t('Vul bij portie een getal in, bijvoorbeeld 40 of 0,5. Of laat het leeg.'));
    }
  } else if (field !== 'name') value = value || null;
  if (value === it[field] || (value == null && it[field] == null)) return;
  if (!(await mepUpdate('mep_items', id, { [field]: value }))) old();
}

async function deleteMepItem(id) {
  const it = mepItems.find(x => x.id === id);
  if (!(await askConfirm(`${it.name} ${t('verwijderen?')}`, { danger: true }))) return;
  if (await mepDelete('mep_items', id)) renderMepList();
}

// Omhoog/omlaag (of links/rechts bij kaarten): de volgorde opnieuw nummeren en alleen wat verandert opslaan.
async function moveMep(table, id, dir) {
  const row = MEP_TABLES[table]().find(r => r.id === id);
  const siblings =
    table === 'mep_cards'
      ? mepCardsOf(row.list_id)
      : table === 'mep_sections'
        ? mepSectionsOf(row.card_id)
        : mepItemsOf(row.section_id);
  const i = siblings.findIndex(r => r.id === id);
  const j = i + dir;
  if (j < 0 || j >= siblings.length) return;
  [siblings[i], siblings[j]] = [siblings[j], siblings[i]];
  for (let k = 0; k < siblings.length; k++)
    if (siblings[k].position !== k && !(await mepUpdate(table, siblings[k].id, { position: k }))) break;
  renderMepList();
}

// ---- Recept koppelen (alleen voorstellen; de kok kiest) ----

function mepRecipePool(l) {
  const m = mepTeam(l);
  if (!m) return (recipes || []).filter(r => !r.example);
  const ids = new Set([...(m.recipeIds || []), ...(m.folders || []).flatMap(f => f.recipeIds || [])].map(String));
  return [...ids].map(findRecipe).filter(Boolean);
}

const mepNorm = s =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

const mepWords = s =>
  mepNorm(s)
    .split(/[^a-z0-9]+/)
    .filter(w => w.length > 2);

function mepRecipeSuggestions(name, pool) {
  const words = mepWords(name);
  return pool
    .map(r => {
      const title = mepWords(r.title);
      const score = words.filter(w => title.some(x => x.startsWith(w) || w.startsWith(x))).length;
      return { r, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || a.r.title.localeCompare(b.r.title))
    .slice(0, 6)
    .map(x => x.r);
}

async function linkMepRecipe(itemId) {
  const it = mepItems.find(x => x.id === itemId);
  const l = mepListById(it.list_id);
  const pool = mepRecipePool(l);
  if (!pool.length)
    return toast(mepTeam(l) ? t('Dit keukenteam heeft nog geen recepten.') : t('Je hebt nog geen recepten.'));
  let picks = mepRecipeSuggestions(it.name, pool);
  let question = picks.length
    ? `${t('Welk recept hoort bij')} ${it.name}?`
    : `${t('Geen recept gevonden dat lijkt op')} ${it.name}.`;
  for (;;) {
    const choice = await askChoice(question, [
      ...picks.map(r => ({ value: String(r.id), label: r.title })),
      { value: '__zoek', label: t('Ander recept zoeken'), primary: !picks.length }
    ]);
    if (!choice) return;
    if (choice !== '__zoek') {
      if (await mepUpdate('mep_items', itemId, { recipe_id: choice })) renderMepList();
      return;
    }
    const q = ((await askText(t('Zoek een recept op naam'), '', { confirmLabel: t('Zoeken') })) || '').trim();
    if (!q) return;
    const nq = mepNorm(q);
    picks = pool.filter(r => mepNorm(r.title).includes(nq)).slice(0, 8);
    question = picks.length ? t('Kies het recept') : `${t('Geen recept gevonden met')} “${q}”.`;
  }
}

async function unlinkMepRecipe(itemId) {
  if (await mepUpdate('mep_items', itemId, { recipe_id: null })) renderMepList();
}

// ---- Overzicht: de hele lijst op één A4 ----
// Zoals de Excel-lijsten in de keuken: de naam bovenaan, de kaarten naast elkaar in kolommen, per kopje de
// onderdelen met een vakje ervoor. Drie kolommen in totaal; een kaart met meer onderdelen krijgt meer kolommen.
// De letter wordt kleiner tot alles op één blad past (fitMepSheet).

// Hoeveel kolommen elke kaart krijgt (samen 3), naar het aantal regels.
function mepSheetColumns(cards, total = 3) {
  const rows = cards.map(c => mepSectionsOf(c.id).reduce((n, s) => n + 1.6 + mepItemsOf(s.id).length, 0));
  const sum = rows.reduce((a, b) => a + b, 0) || 1;
  if (!cards.length) return [];
  if (cards.length >= total) return cards.map(() => 1);
  // Elke kaart minstens één kolom; de rest naar verhouding van het aantal regels.
  const cols = cards.map(() => 1);
  let left = total - cards.length;
  while (left > 0) {
    let best = 0;
    for (let i = 1; i < cards.length; i++) if (rows[i] / cols[i] > rows[best] / cols[best]) best = i;
    cols[best]++;
    left--;
  }
  return cols;
}

// Eén regel op het blad. Met een dag erbij: de hoeveelheid voor de couverts, en wat al klaar (✓) of op voorraad (V) staat.
function mepSheetItem(it, day, covers) {
  const amount = day ? mepAmount(it, covers) : null;
  const qty = amount ? amount.total || amount.each : mepQtyText(it);
  const extra = [qty, it.note].filter(Boolean).join(' · ');
  const st = day?.items[it.id]?.status;
  const mark = st === 'klaar' || st === 'voorraad' ? '✓' : '';
  return `<li><span class="mep-box" aria-hidden="true">${mark}</span><span><span translate="no">${esc(it.name)}</span>${extra ? ` <small translate="no">${esc(extra)}</small>` : ''}</span></li>`;
}

// Het A4-blad. opts.day: de stand van een dag (couverts en hoeveelheden), opts.brand: logo en naam van het restaurant,
// opts.print: voor de printer (zonder de id's van het scherm).
function renderMepSheet(l, opts = {}) {
  const { day = null, brand = null, print = false, landscape = false } = opts;
  const cards = mepCardsOf(l.id).filter(c => mepSectionsOf(c.id).length);
  // Liggend is er plaats voor vier kolommen, staand voor drie.
  const total = landscape ? 4 : 3;
  const cols = mepSheetColumns(cards, total);
  const showCardNames = mepCardsOf(l.id).length > 1;
  const body = cards
    .map((c, i) => {
      const covers = day ? Number(day.covers[c.id]) || 0 : 0;
      const secs = mepSectionsOf(c.id)
        .map(s => {
          const items = mepItemsOf(s.id);
          return `<section class="mep-sheet-sec"><h4 translate="no">${esc(s.name)}</h4>${items.length ? `<ul>${items.map(it => mepSheetItem(it, day, covers)).join('')}</ul>` : ''}</section>`;
        })
        .join('');
      const coverText = covers ? `<span>${covers} ${esc(t('couverts'))}</span>` : '';
      const head = showCardNames
        ? `<h3><span translate="no">${esc(c.name)}</span>${coverText}</h3>`
        : covers
          ? `<h3>${coverText}</h3>`
          : '';
      return `<div class="mep-sheet-card" style="--cols:${cols[i]};grid-column:span ${cols[i]}">${head}<div class="mep-sheet-flow">${secs}</div></div>`;
    })
    .join('');
  const empty = !cards.length
    ? `<p class="mep-sheet-empty">${esc(t('Nog leeg. Kies Bewerken om kopjes en onderdelen toe te voegen.'))}</p>`
    : '';
  const logo = brand?.logo
    ? `<img class="mep-sheet-logo${brand.bw ? ' is-bw' : ''}" src="${esc(brand.logo)}" alt="">`
    : '';
  const title = `<div class="mep-sheet-title"><h2 translate="no">${esc(l.name)}</h2>${brand?.name ? `<span translate="no">${esc(brand.name)}</span>` : ''}</div>`;
  const sheet = `<article class="mep-sheet${print ? ' is-print' : ''}${landscape ? ' is-landscape' : ''}"${print ? '' : ' id="mepSheet"'}><header class="mep-sheet-head">${logo}${title}</header><div class="mep-sheet-grid" style="--grid:${total}">${body}${empty}</div></article>`;
  return print
    ? sheet
    : `<div class="mep-sheet-wrap">${sheet}<p class="mep-sheet-fit muted" id="mepSheetFit"></p></div>`;
}

// De letter zo groot maken als past (17 tot 8,5 px), zodat de lijst binnen één A4 valt. Op het scherm van een telefoon:
// gewoon groot onder elkaar. Geeft false als het ook met de kleinste letter niet op één blad past.
function fitMepSheet(sheet = $('mepSheet'), note = $('mepSheetFit')) {
  if (!sheet) return true;
  sheet.style.removeProperty('--fs');
  if (note) note.textContent = '';
  if (!sheet.classList.contains('is-print') && window.matchMedia('(max-width: 760px)').matches) return true;
  // Een paar pixels marge: het blad zelf is al precies een A4 hoog (afronding).
  const page = sheet.clientWidth * (sheet.classList.contains('is-landscape') ? 210 / 297 : 297 / 210) + 3;
  // Zo groot mogelijk (leesbaar in de keuken), maar alles op één blad.
  let fs = 17;
  sheet.style.setProperty('--fs', fs + 'px');
  while (sheet.scrollHeight > page && fs > 8.5) {
    fs -= 0.5;
    sheet.style.setProperty('--fs', fs + 'px');
  }
  const fits = sheet.scrollHeight <= page;
  if (!fits && note)
    note.textContent = t('Deze lijst is langer dan één A4. Bij printen loopt hij door op een tweede blad.');
  return fits;
}

// ---- Printen ----
// De lijst zoals je Excel-lijst: naam, kaarten, kopjes en onderdelen met een leeg hokje. Geen datum en geen couverts.
// Staand of liggend A4 (onthouden in deze browser). Bovenaan het logo van je restaurant, of bij een keukenteam dat
// van het team (fetchPrintBrand in print.js).

function mepSavedOrientation() {
  try {
    return localStorage.getItem('savour_mep_print') === 'liggend' ? 'liggend' : 'staand';
  } catch (_) {
    return 'staand';
  }
}

async function printMepList() {
  const l = mepListById(mepOpenId);
  if (!l) return;
  if (!mepItems.some(i => i.list_id === l.id)) return toast(t('Deze lijst heeft nog geen onderdelen om te printen.'));
  const saved = mepSavedOrientation();
  const choice = await askChoice(t('Hoe wil je printen?'), [
    {
      value: 'staand',
      label: t('A4 staand'),
      hint: t('Kaarten onder en naast elkaar, zoals een gewone lijst.'),
      primary: saved === 'staand'
    },
    {
      value: 'liggend',
      label: t('A4 liggend'),
      hint: t('Meer kolommen naast elkaar, handig bij meerdere kaarten.'),
      primary: saved === 'liggend'
    }
  ]);
  if (!choice) return;
  try {
    localStorage.setItem('savour_mep_print', choice);
  } catch (_) {}
  const landscape = choice === 'liggend';
  const brand = await fetchPrintBrand(l.team_id || null);
  document.getElementById('mepPrint')?.remove();
  const el = document.createElement('div');
  el.id = 'mepPrint';
  el.className = 'mep-print';
  el.innerHTML = renderMepSheet(l, { brand, print: true, landscape });
  document.body.appendChild(el);
  // Wachten tot het logo en de letters er zijn, anders klopt de maat niet of ontbreekt het logo op papier.
  await Promise.all(
    [...el.querySelectorAll('img')].map(img => (img.complete ? null : new Promise(r => (img.onload = img.onerror = r))))
  );
  await document.fonts?.ready;
  if (!fitMepSheet(el.querySelector('.mep-sheet'), null)) el.classList.add('is-long');
  // Marge 0: geen kop- en voettekst van de browser; de witruimte zit in het blad zelf (css/mep.css).
  const page = document.createElement('style');
  page.id = 'mepPrintPage';
  page.textContent = `@page { size: A4 ${landscape ? 'landscape' : 'portrait'}; margin: 0; }`;
  document.head.appendChild(page);
  document.body.classList.add('mep-printing');
  const pageTitle = document.title;
  document.title = l.name;
  const cleanup = () => {
    el.remove();
    page.remove();
    document.body.classList.remove('mep-printing');
    document.title = pageTitle;
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  setTimeout(() => window.print(), 80);
}

// Het ⋯-menu in de fotoband: vast op het scherm openklappen, want de band snijdt af wat erbuiten valt.
// Scrollen sluit het menu (anders blijft het los op het scherm hangen).
function mepPlaceMenu(details) {
  const menu = details.querySelector('.rp-menu');
  if (!menu) return;
  if (!details.open) {
    menu.removeAttribute('style');
    return;
  }
  const r = details.querySelector('summary').getBoundingClientRect();
  Object.assign(menu.style, {
    position: 'fixed',
    top: `${Math.round(r.bottom + 6)}px`,
    right: `${Math.max(8, Math.round(window.innerWidth - r.right))}px`,
    left: 'auto',
    zIndex: '80'
  });
  window.addEventListener('scroll', () => (details.open = false), { passive: true, once: true });
}

// ---- Vandaag: couverts, afvinken en live meekijken ----
// Een dag begint leeg: alles staat op "nodig" tot iemand het aantikt (nodig → bezig → klaar). "Op voorraad" is een
// aparte knop. Afvinken mag iedereen die de lijst ziet, ook zonder Pro (savour_mep_can_tick). Niets wordt
// automatisch overgenomen: voorraad van een vorige dag neemt de kok zelf over met een knop.
// Offline: wat je aantikt, staat meteen op je scherm en gaat mee zodra er weer verbinding is (mepQueue).

let mepDay = null; // { listId, day, covers: {cardId: n}, items: {itemId: {status, updated_by, updated_at}}, prevDay }
let mepDemoDays = {}; // in de demo: de dagen in deze browser
let mepTodoOnly = false; // alleen wat nog moet
let mepChannel = null; // Supabase Realtime
let mepChannelList = null;
let mepLiveState = ''; // 'live', 'connecting' of ''
let mepOffline = false; // geen verbinding: lijsten en dag uit de bewaarde stand van dit toestel
let mepQueue = []; // wijzigingen die nog naar de database moeten
let mepCachedDays = {}; // per lijst de laatst geopende dag, voor offline

const MEP_STATUS = {
  nodig: 'Nodig',
  bezig: 'Bezig',
  klaar: 'Klaar',
  voorraad: 'Op voorraad'
};
const MEP_NEXT = { nodig: 'bezig', bezig: 'klaar', klaar: 'nodig', voorraad: 'nodig' };

function mepDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function mepToday() {
  return mepDateKey(new Date());
}

function mepShiftDay(day, n) {
  const d = new Date(day + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return mepDateKey(d);
}

function mepDayLabel(day) {
  return new Date(day + 'T12:00:00').toLocaleDateString(getSavedLanguage(), {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

function mepDayTitle(day) {
  const today = mepToday();
  if (day === today) return t('Vandaag');
  if (day === mepShiftDay(today, -1)) return t('Gisteren');
  if (day === mepShiftDay(today, 1)) return t('Morgen');
  return mepDayLabel(day);
}

function mepCanTick(l) {
  if (demoMode) return true;
  const m = mepTeam(l);
  return !l.team_id || (!!m && !m.locked);
}

// Wie iets aantikte: je eigen voornaam, die van een teamlid, of "Collega".
function mepWho(userId) {
  if (!userId) return '';
  // Een korte naam helemaal ("Chef Anna"), een lange alleen de voornaam.
  const short = name => (name.trim().length <= 12 ? name.trim() : name.trim().split(/\s+/)[0]);
  if (String(userId) === String(currentUser?.id)) return short(account?.name || '') || t('Jij');
  for (const m of sharedMaps || []) {
    const x = (m.members || []).find(p => String(p.userId) === String(userId));
    if (x && x.name && x.name !== 'Jij') return short(x.name);
  }
  return t('Collega');
}

function mepTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString(getSavedLanguage(), { hour: '2-digit', minute: '2-digit' });
}

// Couverts × portie, in een handige eenheid (2400 g wordt 2,4 kg). Zonder couverts: de portie per couvert.
function mepAmount(it, covers) {
  if (it.portion_qty == null) return null;
  const unit = (it.portion_unit || '').trim();
  const each = `${formatNumber(Number(it.portion_qty))}${unit ? ' ' + unit : ''}`;
  if (!covers) return { total: '', each: `${each} ${t('p.p.')}` };
  let total = covers * Number(it.portion_qty);
  let u = unit;
  if (/^(g|gr|gram)$/i.test(unit) && total >= 1000) {
    total /= 1000;
    u = 'kg';
  } else if (/^ml$/i.test(unit) && total >= 1000) {
    total /= 1000;
    u = 'l';
  } else if (/^cl$/i.test(unit) && total >= 100) {
    total /= 100;
    u = 'l';
  }
  return { total: `${formatNumber(Math.round(total * 100) / 100)}${u ? ' ' + u : ''}`, each: `${covers} × ${each}` };
}

function mepStatusOf(itemId) {
  return mepDay?.items[itemId]?.status || 'nodig';
}

async function loadMepDay(listId, day) {
  const empty = { listId, day, covers: {}, items: {}, prevDay: null };
  if (demoMode) {
    const d = mepDemoDays[listId + '|' + day] || {};
    const prev = Object.keys(mepDemoDays)
      .filter(k => k.startsWith(listId + '|') && k.split('|')[1] < day)
      .filter(k => Object.values(mepDemoDays[k].items || {}).some(r => r.status !== 'nodig'))
      .map(k => k.split('|')[1])
      .sort()
      .pop();
    return { ...empty, covers: { ...(d.covers || {}) }, items: { ...(d.items || {}) }, prevDay: prev || null };
  }
  try {
    const [days, rows, prev] = await Promise.all([
      supabaseClient.from('mep_days').select('covers').eq('list_id', listId).eq('day', day).maybeSingle(),
      supabaseClient
        .from('mep_day_items')
        .select('list_id,item_id,day,status,updated_by,updated_at')
        .eq('list_id', listId)
        .eq('day', day),
      supabaseClient
        .from('mep_day_items')
        .select('day')
        .eq('list_id', listId)
        .lt('day', day)
        .neq('status', 'nodig')
        .order('day', { ascending: false })
        .limit(1)
    ]);
    for (const r of [days, rows, prev]) if (r.error) throw r.error;
    const result = {
      ...empty,
      covers: days.data?.covers || {},
      items: Object.fromEntries((rows.data || []).map(r => [r.item_id, r])),
      prevDay: prev.data?.[0]?.day || null
    };
    mepOffline = false;
    mepApplyQueue(result);
    mepCachedDays[listId] = result;
    mepSaveCache();
    return result;
  } catch (e) {
    if (!looksOffline(e)) toast(mepError(e));
    // Offline: de laatst bewaarde stand van deze dag op dit toestel, plus wat je intussen aantikte.
    const cached = mepCachedDays[listId];
    const result =
      cached?.day === day ? { ...cached, items: { ...cached.items }, covers: { ...cached.covers } } : { ...empty };
    mepOffline = looksOffline(e);
    mepApplyQueue(result);
    return result;
  }
}

function mepDayCards(l) {
  return mepCardsOf(l.id).filter(c => mepSectionsOf(c.id).some(s => mepItemsOf(s.id).length));
}

// Meteen op het scherm; daarna naar de database (of in de wachtrij als er geen verbinding is).
async function setMepStatus(itemId, status) {
  if (!mepDay) return;
  const row = {
    list_id: mepDay.listId,
    item_id: itemId,
    day: mepDay.day,
    status,
    updated_by: currentUser?.id || null,
    updated_at: new Date().toISOString()
  };
  mepDay.items[itemId] = row;
  mepRefreshToday();
  if (navigator.vibrate) navigator.vibrate(12);
  await mepWrite('mep_day_items', row);
}

async function setMepCovers(cardId, input) {
  if (!mepDay) return;
  const raw = String(input.value).trim();
  const n = raw === '' ? null : Math.round(Number(raw));
  if (n != null && (!Number.isFinite(n) || n < 0 || n > 9999)) {
    input.value = mepDay.covers[cardId] ?? '';
    return toast(t('Vul een aantal couverts in tussen 0 en 9999.'));
  }
  const covers = { ...mepDay.covers };
  if (n == null) delete covers[cardId];
  else covers[cardId] = n;
  mepDay.covers = covers;
  mepRefreshToday();
  await mepWrite('mep_days', {
    list_id: mepDay.listId,
    day: mepDay.day,
    covers,
    updated_by: currentUser?.id || null,
    updated_at: new Date().toISOString()
  });
}

// ---- Opslaan, wachtrij en offline ----

async function mepWrite(table, rows) {
  const list = Array.isArray(rows) ? rows : [rows];
  if (!list.length) return;
  if (demoMode) {
    for (const r of list) {
      const key = r.list_id + '|' + r.day;
      const d = (mepDemoDays[key] = mepDemoDays[key] || { covers: {}, items: {} });
      if (table === 'mep_days') d.covers = { ...r.covers };
      else d.items[r.item_id] = { ...r };
    }
    return;
  }
  const { error } = await supabaseClient
    .from(table)
    .upsert(list, { onConflict: table === 'mep_days' ? 'list_id,day' : 'item_id,day' });
  if (mepDay) mepCachedDays[mepDay.listId] = mepDay;
  if (error && looksOffline(error)) {
    mepQueue.push(...list.map(row => ({ table, row })));
    mepOffline = true;
  } else if (error) {
    toast(mepError(error));
    // Niet bewaard: de stand uit de database terughalen, zodat het scherm niets laat zien wat niet is opgeslagen.
    if (mepDay) {
      const { listId, day } = mepDay;
      const fresh = await loadMepDay(listId, day);
      if (mepDay?.listId === listId && mepDay.day === day) {
        mepDay = fresh;
        mepRefreshToday();
      }
    }
  }
  mepSaveCache();
  mepShowLive();
}

// Nog niet verstuurde wijzigingen op de stand van een dag leggen (offline aangetikt).
function mepApplyQueue(day) {
  for (const { table, row } of mepQueue) {
    if (row.list_id !== day.listId || row.day !== day.day) continue;
    if (table === 'mep_days') day.covers = { ...row.covers };
    else day.items[row.item_id] = { ...row };
  }
}

let mepFlushing = false;
async function mepFlushQueue() {
  if (mepFlushing || !mepQueue.length || demoMode || !currentUser || !navigator.onLine) return;
  mepFlushing = true;
  try {
    while (mepQueue.length) {
      const { table, row } = mepQueue[0];
      const { error } = await supabaseClient
        .from(table)
        .upsert(row, { onConflict: table === 'mep_days' ? 'list_id,day' : 'item_id,day' });
      if (error && looksOffline(error)) break;
      if (error) console.warn('MEP: wijziging niet bewaard', error);
      mepQueue.shift();
    }
    if (!mepQueue.length) {
      mepOffline = false;
      toast(t('Wat je offline afvinkte, is nu bewaard.'));
    }
    mepSaveCache();
    mepShowLive();
  } finally {
    mepFlushing = false;
  }
}

// De MEP-lijsten, de laatst geopende dag per lijst en de wachtrij op dit toestel bewaren (zelfde opslag als de
// offline bibliotheek, js/data/offline.js). Niet als "ingelogd blijven" uit staat.
async function mepSaveCache() {
  if (demoMode || !currentUser || !window.indexedDB || !staySignedIn()) return;
  try {
    const snap = {
      userId: currentUser.id,
      savedAt: new Date().toISOString(),
      lists: mepLists,
      cards: mepCards,
      sections: mepSections,
      items: mepItems,
      days: mepCachedDays,
      queue: mepQueue
    };
    await offlineStore('readwrite', store => store.put(JSON.parse(JSON.stringify(snap)), 'mep'));
  } catch (e) {
    console.warn('MEP offline bewaren lukte niet:', e);
  }
}

async function mepUseCache() {
  if (!window.indexedDB || !currentUser) return false;
  let snap = null;
  try {
    snap = await offlineStore('readonly', store => store.get('mep'));
  } catch (_) {}
  if (!snap || snap.userId !== currentUser.id) return false;
  mepLists = snap.lists || [];
  mepCards = snap.cards || [];
  mepSections = snap.sections || [];
  mepItems = snap.items || [];
  mepCachedDays = snap.days || {};
  mepQueue = [...(snap.queue || []), ...mepQueue];
  mepLoaded = true;
  mepOffline = true;
  return true;
}

// ---- Live meekijken (Supabase Realtime) ----

function mepStartLive(listId) {
  if (demoMode || !currentUser || offlineMode || !supabaseClient.channel) return mepShowLive();
  if (mepChannel && mepChannelList === listId) return mepShowLive();
  mepStopLive();
  mepChannelList = listId;
  mepLiveState = 'connecting';
  mepChannel = supabaseClient
    .channel('mep-' + listId)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'mep_day_items', filter: `list_id=eq.${listId}` },
      p => onMepLive('item', p.new)
    )
    .on('postgres_changes', { event: '*', schema: 'public', table: 'mep_days', filter: `list_id=eq.${listId}` }, p =>
      onMepLive('day', p.new)
    )
    .subscribe(status => {
      const was = mepLiveState;
      mepLiveState = status === 'SUBSCRIBED' ? 'live' : status === 'CLOSED' ? '' : 'connecting';
      // Opnieuw verbonden: versturen wat nog wachtte en ophalen wat intussen veranderde.
      if (status === 'SUBSCRIBED' && was !== 'live' && mepDay?.listId === listId) {
        mepFlushQueue().then(() => mepReloadDay());
      }
      mepShowLive();
    });
  mepShowLive();
}

async function mepReloadDay() {
  if (!mepDay) return;
  const { listId, day } = mepDay;
  const fresh = await loadMepDay(listId, day);
  if (mepDay?.listId === listId && mepDay.day === day) {
    mepDay = fresh;
    mepRefreshToday();
  }
}

function mepStopLive() {
  if (mepChannel) {
    try {
      supabaseClient.removeChannel(mepChannel);
    } catch (_) {}
  }
  mepChannel = null;
  mepChannelList = null;
  mepLiveState = '';
}

function onMepLive(kind, row) {
  if (!row || !mepDay || row.list_id !== mepDay.listId || row.day !== mepDay.day) return;
  if (kind === 'day') {
    mepDay.covers = row.covers || {};
    return mepRefreshToday();
  }
  const old = mepDay.items[row.item_id];
  // Je eigen wijziging komt ook terug; een oudere wijziging overschrijft nooit een nieuwere.
  if (old && old.status === row.status && old.updated_at === row.updated_at) return;
  if (old?.updated_at && row.updated_at && new Date(old.updated_at) > new Date(row.updated_at)) return;
  mepDay.items[row.item_id] = row;
  // Iets van een collega licht even op.
  mepRefreshToday(String(row.updated_by) !== String(currentUser?.id) ? row.item_id : null);
}

function mepShowLive() {
  const el = $('mepLive');
  if (!el) return;
  const l = mepListById(mepOpenId);
  let text = '';
  let cls = '';
  // In de demo staat "niets wordt opgeslagen" al bovenaan (mepSaved).
  if (demoMode) text = '';
  else if (mepOffline || offlineMode || !navigator.onLine) {
    text = mepQueue.length ? t('Offline · wordt bewaard zodra je verbinding hebt') : t('Offline');
    cls = 'is-off';
  } else if (mepLiveState === 'live') {
    text = l?.team_id ? t('Live met je team') : t('Live');
    cls = 'is-live';
  } else if (mepLiveState === 'connecting') text = t('Verbinden…');
  el.className = 'mep-live ' + cls;
  el.textContent = text;
}

// ---- Lijst: de MEP-lijst in de huisstijl van Savour ----
// Zoals een recept: titel, kaarten en kopjes in kolommen, bij elk onderdeel een afvinkhokje (zoals de ingrediënten
// van een recept) en de hoeveelheid voor de couverts van vandaag. Afvinken zet het onderdeel op klaar voor
// vandaag, voor het hele team (zelfde dagstand als Vandaag). Kookmodus: groot en zonder menu, scherm blijft aan
// (toggleCookMode uit js/features/recipe.js). Printen geeft het witte A4-blad (printMepList).

// ---- Demo ----
// Twee MEP-lijsten uit de demorecepten (js/data/demo-recipes.js), in de taal van de bezoeker: een eigen lijst voor de
// garde en een lijst van het demo-keukenteam voor de patisserie. Voor vandaag staan er couverts en heeft chef Anna
// al iets afgevinkt, zodat je ziet hoe het werkt met een team. Niets wordt opgeslagen.
function mepSeedDemo() {
  const title = key => findRecipe('demo-' + key)?.title || key;
  const now = Date.now();
  const lists = [
    {
      id: 'demo-mep-garde',
      name: `MEP ${mepTr('Garde')}`,
      team: null,
      cards: [
        [
          mepTr('À la carte'),
          [
            [
              `${mepTr('Voor')} · ${title('gravlax')}`,
              [
                ['gravlax', 60, 'g'],
                ['mayonaise', 15, 'g'],
                ['rodeui', 10, 'g'],
                ['kruidenolie', 5, 'ml']
              ]
            ],
            [
              `${mepTr('Tussen')} · ${title('gazpacho')}`,
              [
                ['gazpacho', 120, 'ml'],
                ['dashi', 15, 'ml'],
                ['kruidenolie', 5, 'ml']
              ]
            ]
          ]
        ],
        [
          mepTr('Banqueting'),
          [
            [
              `${mepTr('Voor')} · ${title('bloemkool')}`,
              [
                ['bloemkool', 80, 'g'],
                ['noisette', 10, 'ml'],
                ['rodeui', 10, 'g']
              ]
            ]
          ]
        ]
      ],
      covers: [40, 0],
      day: {
        gravlax: ['klaar', 'demo-anna', 95],
        kruidenolie: ['voorraad', 'demo-anna', 180]
      }
    },
    {
      id: 'demo-mep-pat',
      name: `MEP ${mepTr('Patisserie')}`,
      team: 'demo-shared',
      cards: [
        [
          mepTr('À la carte'),
          [
            [
              `${mepTr('Dessert')} · ${title('mousse')}`,
              [
                ['mousse', 80, 'g'],
                ['karnemelkijs', 50, 'g'],
                ['citroengel', 10, 'g']
              ]
            ],
            [
              mepTr('Friandises'),
              [
                ['financiers', 2, mepTr('st')],
                ['marshmallow', 2, mepTr('st')]
              ]
            ]
          ]
        ]
      ],
      covers: [40],
      day: { mousse: ['klaar', 'demo-anna', 60] }
    }
  ];
  mepLists = [];
  mepCards = [];
  mepSections = [];
  mepItems = [];
  mepDemoDays = {};
  lists.forEach((L, li) => {
    mepLists.push({
      id: L.id,
      owner_id: 'demo-user',
      team_id: L.team,
      name: L.name,
      archived: false,
      position: li,
      created_at: new Date(now - (10 - li) * 86400000).toISOString()
    });
    const day = { covers: {}, items: {} };
    L.cards.forEach(([cardName, secs], ci) => {
      const cardId = `${L.id}-k${ci}`;
      mepCards.push({ id: cardId, list_id: L.id, name: cardName, position: ci });
      if (L.covers[ci]) day.covers[cardId] = L.covers[ci];
      secs.forEach(([secName, items], si) => {
        const secId = `${cardId}-s${si}`;
        mepSections.push({ id: secId, list_id: L.id, card_id: cardId, name: secName, position: si });
        items.forEach(([key, qty, unit], ii) => {
          const itemId = `${secId}-o${ii}`;
          mepItems.push({
            id: itemId,
            list_id: L.id,
            section_id: secId,
            name: title(key),
            portion_qty: qty,
            portion_unit: unit,
            note: null,
            recipe_id: 'demo-' + key,
            position: ii
          });
          const st = L.day[key];
          // Alleen het eerste onderdeel met dit recept (kruidenolie staat twee keer op de lijst).
          if (st && !Object.values(day.items).some(r => r.key === key))
            day.items[itemId] = {
              key,
              list_id: L.id,
              item_id: itemId,
              day: mepToday(),
              status: st[0],
              updated_by: st[1],
              updated_at: new Date(now - st[2] * 60000).toISOString()
            };
        });
      });
    });
    mepDemoDays[L.id + '|' + mepToday()] = day;
  });
  mepLoaded = true;
}

// ---- Rechten (gemak; de database beslist: savour_mep_can_manage) ----
// MEP-lijsten maken en beheren is Savour Pro (ook de proefweek). Wie geen Pro (meer) heeft, houdt zijn lijsten en kan
// ze bekijken, afvinken en printen. In een keukenteam: eigenaar of sous-chef met Pro.
function mepCanManage(l) {
  if (!l) return false;
  if (demoMode) return true;
  if (l.team_id) {
    const m = mepTeam(l);
    return !!m && !m.locked && canEditShared(m);
  }
  return String(l.owner_id) === String(currentUser?.id) && isPro();
}

function mepCanCreate() {
  return demoMode || isPro();
}

async function mepAskForPro() {
  if (
    await askConfirm(
      `${t('MEP-lijsten maken is Savour Pro')}\n\n${t('Met Savour Pro maak en beheer je MEP-lijsten voor jezelf en je keukenteam. Afvinken en printen blijft voor iedereen gratis.')}`,
      { confirmLabel: t('Bekijk Savour Pro') }
    )
  )
    openPublicInfo('pro');
}

// ---- Overzicht van alle lijsten ----

let mepReturnTeam = null; // geopend vanaf het keukenteam-scherm: "terug" gaat daarheen

function renderMepOverview() {
  const host = $('mepBody');
  mepReturnTeam = null;
  mepSetBand(false);
  const heading = $('mepTitle');
  if (heading) heading.textContent = t('MEP-lijsten');
  // Knoppen in de fotoband, zoals bij Alle recepten.
  const headActions = $('mepHeadActions');
  if (headActions)
    headActions.innerHTML = `<button type="button" class="btn small gold" onclick="newMepList()">${icon('plus')}${esc(t('Nieuwe MEP-lijst'))}</button><button type="button" class="btn small" onclick="openMepImport()">${icon('download')}${esc(t('Importeren'))}</button>`;
  const active = mepLists.filter(l => !l.archived);
  const archived = mepLists.filter(l => l.archived);
  const groups = [];
  const own = active.filter(l => !l.team_id);
  if (own.length) groups.push({ title: t('Mijn lijsten'), lists: own });
  const teamIds = [...new Set(active.filter(l => l.team_id).map(l => l.team_id))];
  for (const id of teamIds)
    groups.push({
      title: findSharedMap(id)?.name || t('Keukenteam'),
      team: true,
      lists: active.filter(l => l.team_id === id)
    });
  const intro = `<p class="mep-intro">${esc(t('Per post een lijst met alles wat klaar moet staan. Vink af wat er staat; je collega’s zien het live. Vul de couverts in en Savour rekent uit hoeveel je nodig hebt.'))}</p>`;
  const body = groups.length
    ? groups
        .map(
          g =>
            `<section class="mep-group"><h3>${g.team ? icon('users') : ''}<span${g.team ? ' translate="no"' : ''}>${esc(g.title)}</span></h3><ul class="mep-lists">${g.lists.map(mepListRow).join('')}</ul></section>`
        )
        .join('')
    : `<div class="mep-empty"><p><b>${esc(t('Nog geen MEP-lijsten'))}</b></p><p>${esc(t('Begin met de lijst van je eigen post: kopjes per gerecht, en daaronder wat er klaar moet staan.'))}</p></div>`;
  const arch = archived.length
    ? `<section class="mep-group mep-archived"><button type="button" class="mep-archived-toggle" onclick="mepShowArchived=!mepShowArchived;renderMepOverview()" aria-expanded="${mepShowArchived}">${esc(t('Gearchiveerd'))} (${archived.length})</button>${mepShowArchived ? `<ul class="mep-lists">${archived.map(mepListRow).join('')}</ul>` : ''}</section>`
    : '';
  host.innerHTML = intro + body + arch;
}

// Een lijst open: de vaste kop van het scherm verbergen; de lijst heeft een eigen fotoband met knoppen.
function mepSetBand(on) {
  $('mep')?.classList.toggle('mep-has-band', !!on);
}

function closeMepList() {
  const team = mepReturnTeam;
  mepOpenId = null;
  mepDay = null;
  mepStopLive();
  if (document.body.classList.contains('cook-mode')) toggleCookMode(false);
  // Gekomen vanaf het keukenteam: daar weer naartoe.
  if (team && findSharedMap(team)) {
    mepReturnTeam = null;
    return openShared(team);
  }
  renderMep();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function setMepMode(mode) {
  mepMode = MEP_MODES.includes(mode) ? mode : 'overzicht';
  try {
    localStorage.setItem('savour_mep_mode', mepMode);
  } catch (_) {}
  renderMep();
}

// Waarom je een lijst alleen kunt bekijken (en afvinken).
function mepReadOnlyNote(l) {
  if (mepCanManage(l)) return '';
  const m = mepTeam(l);
  let text;
  if (m?.locked)
    text = t(
      'Dit keukenteam staat op slot tot de eigenaar Savour Pro heeft. Je kunt de lijst bekijken, maar niet afvinken.'
    );
  else if (m && !sharedRoleCanEdit(m)) return '';
  else if (m) text = t('Je bent sous-chef of eigenaar in dit keukenteam. Lijsten aanpassen kan met Savour Pro.');
  else text = t('Je lijsten blijven bewaard. Aanpassen kan met Savour Pro; afvinken en printen blijft gratis.');
  const pro = !m?.locked;
  return `<div class="mep-note"><span>${esc(text)}</span>${pro ? `<button type="button" class="btn small gold" onclick="openPublicInfo('pro')">${esc(t('Bekijk Savour Pro'))}</button>` : ''}</div>`;
}

// ---- Een lijst: fotoband met naam en knoppen, daaronder Lijst of Bewerken ----

function mepBandHtml(l, mode, can) {
  const team = mepTeam(l);
  const lid = escJs(l.id);
  const tick = mepCanTick(l);
  const back =
    mepReturnTeam && team
      ? `<button type="button" class="back kt-back mep-back-link" onclick="closeMepList()">← <span translate="no">${esc(team.name)}</span></button>`
      : `<button type="button" class="back kt-back mep-back-link" onclick="closeMepList()"><span aria-hidden="true">←</span>&nbsp;<span>${esc(t('Alle MEP-lijsten'))}</span></button>`;
  const menu = [
    mode === 'overzicht' && tick
      ? `<button type="button" onclick="clearMepTicks()">${icon('undo')}${esc(t('Lijst leegmaken'))}</button>`
      : '',
    can
      ? `<button type="button" onclick="renameMepList('${lid}')">${icon('edit')}${esc(t('Naam wijzigen'))}</button>`
      : '',
    can ? `<button type="button" onclick="copyMepList('${lid}')">${icon('plus')}${esc(t('Kopie maken'))}</button>` : '',
    can
      ? `<button type="button" onclick="archiveMepList('${lid}', ${!l.archived})">${icon('folder')}${esc(l.archived ? t('Terugzetten uit archief') : t('Archiveren'))}</button>`
      : '',
    can && l.archived
      ? `<button type="button" class="danger" onclick="deleteMepList('${lid}')">${icon('trash')}${esc(t('Verwijderen'))}</button>`
      : ''
  ].join('');
  const modeBtn = (m, label, ico = '') =>
    `<button type="button" class="${mode === m ? 'is-on' : ''}" aria-pressed="${mode === m}" onclick="setMepMode('${m}')">${ico ? icon(ico) : ''}${esc(label)}</button>`;
  const modes = can
    ? `<div class="mep-modes" role="group" aria-label="${esc(t('Weergave'))}">${modeBtn('overzicht', t('Lijst'))}${modeBtn('bewerken', t('Bewerken'), 'edit')}</div>`
    : '';
  const tools = [
    mode === 'overzicht'
      ? `<button type="button" class="btn compact-action mep-tool" onclick="toggleMepCookMode(true)">${icon('cook')}<span>${esc(t('Kookmodus'))}</span></button>`
      : '',
    `<button type="button" class="btn compact-action mep-tool" onclick="printMepList()">${icon('print')}<span>${esc(t('Printen'))}</span></button>`,
    menu
      ? `<details class="rp-more mep-more" ontoggle="mepPlaceMenu(this)"><summary class="btn compact-action rp-icon-btn" aria-label="${esc(t('Meer acties'))}" title="${esc(t('Meer acties'))}">${icon('more')}</summary><div class="rp-menu">${menu}</div></details>`
      : ''
  ].join('');
  const sub =
    mode === 'overzicht'
      ? `<p class="muted mep-band-sub" id="mepPageMeta"></p>`
      : `<p class="muted mep-band-sub"><span id="mepSaved" aria-live="polite">${esc(mepSavedText())}</span></p>`;
  return `${back}<div class="folder-detail-head mep-band" id="mepBand"><div class="mep-band-text"><div class="eyebrow"><span>${esc(t('MEP-lijst'))}</span>${team ? `&nbsp;<span aria-hidden="true">·</span>&nbsp;<span translate="no">${esc(team.name)}</span>` : ''}${l.archived ? `&nbsp;<span aria-hidden="true">·</span>&nbsp;<span>${esc(t('Gearchiveerd'))}</span>` : ''} ${helpButton('mep')}</div><h1 translate="no">${esc(l.name)}</h1>${sub}</div><div class="mep-band-actions">${modes}<div class="mep-band-tools">${tools}</div></div></div>`;
}

async function renderMepList() {
  const host = $('mepBody');
  const l = mepListById(mepOpenId);
  const can = mepCanManage(l);
  const mode = mepMode === 'bewerken' && can ? 'bewerken' : 'overzicht';
  mepSetBand(true);
  const cards = mepCardsOf(l.id);
  if (!cards.some(c => c.id === mepCardId)) mepCardId = cards[0]?.id || null;
  // De Lijst heeft de dagstand nodig (vinkjes en couverts van vandaag).
  if (mode === 'overzicht' && (!mepDay || mepDay.listId !== l.id || mepDay.day !== mepToday())) {
    host.innerHTML = `<p class="muted">${esc(t('Laden…'))}</p>`;
    const loaded = await loadMepDay(l.id, mepToday());
    if (mepOpenId !== l.id) return; // intussen iets anders geopend
    mepDay = loaded;
  }
  const team = mepTeam(l);
  const band = mepBandHtml(l, mode, can);
  if (mode === 'overzicht') {
    const empty = !mepItems.some(i => i.list_id === l.id);
    host.innerHTML =
      band +
      mepReadOnlyNote(l) +
      (empty
        ? `<div class="mep-empty"><p>${esc(t('Deze lijst heeft nog geen onderdelen.'))}</p>${can ? `<button type="button" class="btn" onclick="setMepMode('bewerken')">${icon('edit')}${esc(t('Lijst bewerken'))}</button>` : ''}</div>`
        : `<article class="mep-page" id="mepPage"><div class="mep-page-bar"><div class="mep-modes mep-filter" role="group" aria-label="${esc(t('Tonen'))}"><button type="button" id="mepFilterAll" onclick="setMepTodoOnly(false)">${esc(t('Alles'))}</button><button type="button" id="mepFilterTodo" onclick="setMepTodoOnly(true)">${esc(t('Alleen wat nog moet'))}</button></div><span id="mepLive" class="mep-live" role="status"></span></div><div class="mep-page-body" id="mepPageBody"></div></article>`);
    setViewPhoto($('mepBand'), 'mep:' + l.id, team?.photo);
    renderMepPageBody();
    mepStartLive(l.id);
    return;
  }
  mepStopLive();
  const lid = escJs(l.id);
  const tabs = `<div class="mep-tabs" role="tablist">${cards
    .map(
      c =>
        `<button type="button" role="tab" aria-selected="${c.id === mepCardId}" class="mep-tab${c.id === mepCardId ? ' is-on' : ''}" onclick="mepCardId='${escJs(c.id)}';renderMepList()"><span translate="no">${esc(c.name)}</span></button>`
    )
    .join(
      ''
    )}<button type="button" class="mep-tab mep-tab-add" onclick="addMepCard('${lid}')">${icon('plus')}${esc(t('Kaart'))}</button></div>`;
  const card = cards.find(c => c.id === mepCardId);
  host.innerHTML =
    band +
    tabs +
    (card
      ? renderMepCard(l, card, true)
      : `<div class="mep-empty"><p>${esc(t('Deze lijst heeft nog geen kaart.'))}</p></div>`);
  setViewPhoto($('mepBand'), 'mep:' + l.id, team?.photo);
}

// ---- Lijst: hokjes per onderdeel, per kaart één kolom van boven naar beneden ----

function setMepTodoOnly(on) {
  mepTodoOnly = !!on;
  renderMepPageBody();
}

// Na een vinkje (ook van een collega) of andere couverts: de kolommen en de regel onder de naam opnieuw.
function mepRefreshToday(flashId) {
  if ($('mepPage') || $('mepPageMeta')) renderMepPageBody(flashId);
}

function mepIsDone(itemId) {
  return ['klaar', 'voorraad'].includes(mepStatusOf(itemId));
}

function renderMepPageBody(flashId) {
  const l = mepListById(mepOpenId);
  if (!l || !mepDay) return;
  const can = mepCanTick(l);
  const cards = mepDayCards(l);
  const all = cards.flatMap(c => mepSectionsOf(c.id).flatMap(s => mepItemsOf(s.id)));
  const done = all.filter(it => mepIsDone(it.id)).length;
  const meta = $('mepPageMeta');
  if (meta)
    meta.innerHTML = [
      `<b>${esc(mepDayTitle(mepDay.day))}</b> ${esc(mepDayLabel(mepDay.day))}`,
      all.length ? `<span>${done} ${esc(t('van'))} ${all.length} ${esc(t('klaar'))}</span>` : ''
    ]
      .filter(Boolean)
      .join(' · ');
  $('mepFilterAll')?.classList.toggle('is-on', !mepTodoOnly);
  $('mepFilterTodo')?.classList.toggle('is-on', mepTodoOnly);
  const body = $('mepPageBody');
  if (!body) return mepShowLive();
  // Typ je net couverts in? Dan dat vakje (en wat erin staat) terugzetten na het opnieuw tekenen.
  const typing = document.activeElement?.closest?.('.mep-cover-mini') ? document.activeElement : null;
  const typingCard = typing?.dataset.card;
  const typingValue = typing?.value;
  // Elke kaart is één kolom die je van boven naar beneden leest, in de volgorde van het menu (Tussen 1, Tussen 2,
  // Hoofd); de kaarten staan naast elkaar, zoals in de Excel-lijsten van de keuken.
  body.style.setProperty('--cards', Math.min(cards.length, 3) || 1);
  body.classList.toggle('is-single', cards.length <= 1);
  const html = cards
    .map(c => {
      const n = Number(mepDay.covers[c.id]) || 0;
      const secs = mepSectionsOf(c.id)
        .map(s => {
          const items = mepItemsOf(s.id).filter(it => !mepTodoOnly || !mepIsDone(it.id));
          if (!items.length) return '';
          return `<section class="mep-page-sec"><h3 translate="no">${esc(s.name)}</h3><ul>${items.map(it => mepPageItem(it, n, can, it.id === flashId)).join('')}</ul></section>`;
        })
        .join('');
      if (!secs && mepTodoOnly) return '';
      // Kop van de kaart met een klein vakje voor de couverts: Savour rekent per onderdeel de hoeveelheid uit.
      const coversInput = `<label class="mep-cover-mini"><input type="number" inputmode="numeric" min="0" max="9999" step="1" data-card="${esc(c.id)}" value="${esc(String(mepDay.covers[c.id] ?? ''))}" placeholder="0" aria-label="${esc(t('couverts'))} ${esc(c.name)}" ${can ? '' : 'disabled'} onchange="setMepCovers('${escJs(c.id)}', this)"><small>${esc(t('couverts'))}</small></label>`;
      return `<div class="mep-page-card"><h4 class="mep-page-cardname"><span translate="no">${esc(c.name)}</span>${coversInput}</h4><div class="mep-page-cols">${secs}</div></div>`;
    })
    .join('');
  body.innerHTML =
    html ||
    (mepTodoOnly && all.length
      ? `<div class="mep-empty mep-alldone"><p><b>${esc(t('Alles staat klaar.'))}</b></p></div>`
      : '');
  if (typingCard) {
    const again = body.querySelector(`.mep-cover-mini input[data-card="${CSS.escape(typingCard)}"]`);
    if (again) {
      again.value = typingValue;
      again.focus();
    }
  }
  mepShowLive();
}

// Eén onderdeel: hokje, naam, hoeveelheid (couverts × portie) en de portie zelf; afgevinkt met wie en hoe laat.
function mepPageItem(it, covers, can, flash) {
  const isDone = mepIsDone(it.id);
  const amount = mepAmount(it, covers);
  const row = mepDay.items[it.id];
  const portion =
    it.portion_qty != null
      ? `${formatNumber(Number(it.portion_qty))}${it.portion_unit ? ' ' + it.portion_unit : ''}`
      : '';
  const sub = [amount?.total ? portion : '', it.note].filter(Boolean).join(' · ');
  const who =
    isDone && row?.updated_by
      ? `<em class="mep-page-tag">${esc(mepWho(row.updated_by))} · ${esc(mepTime(row.updated_at))}</em>`
      : '';
  const shown = amount ? amount.total || portion : '';
  const r = it.recipe_id ? findRecipe(it.recipe_id) : null;
  return `<li class="${isDone ? 'st-klaar' : 'st-nodig'}${flash ? ' is-flash' : ''}"><label><input type="checkbox" ${isDone ? 'checked' : ''} ${can ? '' : 'disabled'} onchange="setMepStatus('${escJs(it.id)}', this.checked ? 'klaar' : 'nodig')"><span class="mep-page-line"><span class="mep-page-name" translate="no">${esc(it.name)}</span>${shown ? ` <b class="mep-page-amount">${esc(shown)}</b>` : ''}${sub ? `<small translate="no">${esc(sub)}</small>` : ''}${who}</span></label>${r ? `<button type="button" class="mep-icon mep-page-recipe" onclick="toggleMepCookMode(false);openRecipe('${escJs(r.id)}','mep')" aria-label="${esc(t('Recept'))}: ${esc(r.title)}" title="${esc(r.title)}">${icon('book')}</button>` : ''}</li>`;
}

// ⋯ Lijst leegmaken: alle vinkjes van vandaag weg (de lijst zelf blijft). Voor iedereen in het team.
async function clearMepTicks() {
  if (!mepDay) return;
  const rows = Object.values(mepDay.items).filter(r => r.status !== 'nodig');
  if (!rows.length) return toast(t('Er staan geen vinkjes op de lijst.'));
  if (
    !(await askConfirm(
      `${t('Lijst leegmaken?')}\n\n${t('Alle vinkjes van vandaag gaan weg, ook bij je collega’s. De lijst zelf blijft staan.')}`,
      {
        confirmLabel: t('Leegmaken')
      }
    ))
  )
    return;
  const now = new Date().toISOString();
  const write = rows.map(r => ({
    list_id: mepDay.listId,
    item_id: r.item_id,
    day: mepDay.day,
    status: 'nodig',
    updated_by: currentUser?.id || null,
    updated_at: now
  }));
  write.forEach(r => (mepDay.items[r.item_id] = r));
  renderMepPageBody();
  await mepWrite('mep_day_items', write);
  toast(t('Lijst leeggemaakt'));
}

// Kookmodus: de kookmodus van recepten (menu weg, grote letters, scherm aan), voor de MEP-lijst.
function toggleMepCookMode(on) {
  if (on && mepMode !== 'overzicht') setMepMode('overzicht');
  toggleCookMode(on);
}

// ---- Op het keukenteam-scherm (js/features/shared-maps.js, renderShared) ----
// Een blok met de MEP-lijsten van dit team en per lijst hoeveel er vandaag klaar staat. Openen gaat naar dezelfde
// Lijst; "terug" brengt je weer bij het keukenteam.

function teamMepHtml(m) {
  return `<section class="kt-mep" id="ktMep" data-team="${esc(m.id)}" aria-label="${esc(t('MEP-lijsten'))}"></section>`;
}

async function renderTeamMep(m) {
  const host = $('ktMep');
  if (!host || !m) return;
  try {
    await loadMep();
  } catch (e) {
    host.innerHTML = '';
    return;
  }
  if (!$('ktMep') || $('ktMep').dataset.team !== String(m.id)) return;
  const lists = mepLists.filter(l => l.team_id === m.id && !l.archived);
  const canNew = !m.locked && canEditShared(m);
  if (!lists.length && !canNew) {
    host.innerHTML = '';
    return;
  }
  // Per lijst: hoeveel onderdelen vandaag zijn afgevinkt.
  const today = mepToday();
  const doneBy = {};
  if (demoMode) {
    for (const l of lists)
      doneBy[l.id] = Object.values(mepDemoDays[l.id + '|' + today]?.items || {}).filter(r =>
        ['klaar', 'voorraad'].includes(r.status)
      ).length;
  } else if (lists.length) {
    const { data } = await supabaseClient
      .from('mep_day_items')
      .select('list_id,status')
      .in(
        'list_id',
        lists.map(l => l.id)
      )
      .eq('day', today)
      .in('status', ['klaar', 'voorraad']);
    (data || []).forEach(r => (doneBy[r.list_id] = (doneBy[r.list_id] || 0) + 1));
  }
  if (!$('ktMep') || $('ktMep').dataset.team !== String(m.id)) return;
  const mid = escJs(m.id);
  const rows = lists
    .map(l => {
      const total = mepItems.filter(i => i.list_id === l.id).length;
      const done = doneBy[l.id] || 0;
      return `<button type="button" class="kt-folder kt-mep-list" onclick="openMepFromTeam('${escJs(l.id)}','${mid}')">${icon('list', { size: 24 })}<span><b translate="no">${esc(l.name)}</b><small><span>${done} ${esc(t('van'))} ${total} ${esc(t('klaar'))}</span> · <span>${esc(t('vandaag'))}</span></small></span></button>`;
    })
    .join('');
  host.innerHTML = `<div class="kt-section-head"><h2>${esc(t('MEP-lijsten'))}</h2><div class="kt-section-links">${canNew ? `<button type="button" class="kt-link" onclick="newMepList('${mid}')"><span aria-hidden="true">＋</span>&nbsp;<span>${esc(t('Nieuwe MEP-lijst'))}</span></button>` : ''}</div></div>${
    rows
      ? `<div class="kt-folder-grid">${rows}</div>`
      : `<div class="kt-folder-grid"><button type="button" class="kt-folder is-new" onclick="newMepList('${mid}')"><span class="kt-plus" aria-hidden="true">＋</span><span><b>${esc(t('Nieuwe MEP-lijst'))}</b><small>${esc(t('De lijst van een post, voor het hele team'))}</small></span></button></div>`
  }`;
}

function openMepFromTeam(listId, teamId) {
  go('mep');
  mepReturnTeam = teamId;
  openMepList(listId);
}
