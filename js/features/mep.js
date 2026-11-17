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
// Overzicht (de hele lijst op één A4, zoals de Excel-lijsten in de keuken) of Bewerken. Onthouden in deze browser.
let mepMode = (() => {
  try {
    return localStorage.getItem('savour_mep_mode') === 'bewerken' ? 'bewerken' : 'overzicht';
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

const mepByPos = (a, b) => (a.position ?? 0) - (b.position ?? 0) || String(a.created_at).localeCompare(b.created_at);

async function loadMep(force = false) {
  if (demoMode || !currentUser) {
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
    return true;
  })();
  try {
    return await mepLoading;
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

// De eerste eigen lijst van een account mag zonder Pro (savour_mep_free_list).
function mepFreeListId() {
  const own = mepLists
    .filter(l => !l.team_id && String(l.owner_id) === String(currentUser?.id))
    .sort((a, b) => String(a.created_at).localeCompare(b.created_at) || String(a.id).localeCompare(b.id));
  return own[0]?.id || null;
}

function mepCanManage(l) {
  if (!l) return false;
  if (demoMode) return true;
  if (l.team_id) {
    const m = mepTeam(l);
    return !!m && !m.locked && canEditShared(m);
  }
  return String(l.owner_id) === String(currentUser?.id) && (isPro() || l.id === mepFreeListId());
}

// Keukenteams waarin je een lijst mag maken.
function mepTeamsForNew() {
  if (demoMode) return [];
  return (sharedMaps || []).filter(m => !m.locked && canEditShared(m));
}

function mepOwnListCount() {
  return mepLists.filter(l => !l.team_id && String(l.owner_id) === String(currentUser?.id)).length;
}

async function mepAskForPro() {
  if (
    await askConfirm(
      `${t('Meer MEP-lijsten is Savour Pro')}\n\n${t('Met een gratis account probeer je één MEP-lijst. Met Savour Pro maak en beheer je zoveel lijsten als je wilt; afvinken blijft voor iedereen gratis.')}`,
      { confirmLabel: t('Bekijk Savour Pro') }
    )
  )
    openPublicInfo('pro');
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

function renderMepOverview() {
  const host = $('mepBody');
  const heading = $('mepTitle');
  if (heading) heading.textContent = t('MEP-lijsten');
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
  const intro = `<p class="mep-intro">${esc(t('Per post een lijst met alles wat klaar moet staan. Vul de couverts in, en Savour rekent uit hoeveel je nodig hebt. Je collega’s zien live wat klaar is.'))}</p>`;
  const actions = `<div class="mep-actions"><button type="button" class="btn gold" onclick="newMepList()">${icon('plus')}${esc(t('Nieuwe MEP-lijst'))}</button></div>`;
  const body = groups.length
    ? groups
        .map(
          g =>
            `<section class="mep-group"><h3>${g.team ? icon('users') : ''}<span translate="no">${esc(g.title)}</span></h3><ul class="mep-lists">${g.lists.map(mepListRow).join('')}</ul></section>`
        )
        .join('')
    : `<div class="mep-empty"><p><b>${esc(t('Nog geen MEP-lijsten'))}</b></p><p>${esc(t('Begin met de lijst van je eigen post: kopjes per gerecht, en daaronder wat er klaar moet staan.'))}</p></div>`;
  const arch = archived.length
    ? `<section class="mep-group mep-archived"><button type="button" class="mep-archived-toggle" onclick="mepShowArchived=!mepShowArchived;renderMepOverview()" aria-expanded="${mepShowArchived}">${esc(t('Gearchiveerd'))} (${archived.length})</button>${mepShowArchived ? `<ul class="mep-lists">${archived.map(mepListRow).join('')}</ul>` : ''}</section>`
    : '';
  host.innerHTML = intro + actions + body + arch;
}

function openMepList(id) {
  mepOpenId = id;
  const cards = mepCardsOf(id);
  if (!cards.some(c => c.id === mepCardId)) mepCardId = cards[0]?.id || null;
  renderMep();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function closeMepList() {
  mepOpenId = null;
  renderMep();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Waarom je een lijst alleen kunt bekijken.
function mepReadOnlyNote(l) {
  if (mepCanManage(l)) return '';
  const m = mepTeam(l);
  let text;
  if (m?.locked) text = t('Dit keukenteam staat op slot tot de eigenaar Savour Pro heeft. Alles blijft bewaard.');
  else if (m && !sharedRoleCanEdit(m))
    text = t('Je bekijkt deze lijst. De eigenaar of een sous-chef van het keukenteam past hem aan.');
  else if (m) text = t('Je bent sous-chef of eigenaar in dit keukenteam. Lijsten aanpassen kan met Savour Pro.');
  else
    text = t(
      'Met een gratis account beheer je één MEP-lijst. Deze lijst blijft bewaard; aanpassen kan weer met Savour Pro.'
    );
  const pro = !m?.locked && (!m || sharedRoleCanEdit(m));
  return `<div class="mep-note"><span>${esc(text)}</span>${pro ? `<button type="button" class="btn small gold" onclick="openPublicInfo('pro')">${esc(t('Bekijk Savour Pro'))}</button>` : ''}</div>`;
}

function renderMepList() {
  const host = $('mepBody');
  const l = mepListById(mepOpenId);
  const can = mepCanManage(l);
  const cards = mepCardsOf(l.id);
  if (!cards.some(c => c.id === mepCardId)) mepCardId = cards[0]?.id || null;
  const heading = $('mepTitle');
  if (heading) heading.textContent = l.name;
  const team = mepTeam(l);
  const lid = escJs(l.id);
  const menu = can
    ? [
        `<button type="button" onclick="renameMepList('${lid}')">${icon('edit')}${esc(t('Naam wijzigen'))}</button>`,
        `<button type="button" onclick="copyMepList('${lid}')">${icon('plus')}${esc(t('Kopie maken'))}</button>`,
        `<button type="button" onclick="archiveMepList('${lid}', ${!l.archived})">${icon('folder')}${esc(l.archived ? t('Terugzetten uit archief') : t('Archiveren'))}</button>`,
        l.archived
          ? `<button type="button" class="danger" onclick="deleteMepList('${lid}')">${icon('trash')}${esc(t('Verwijderen'))}</button>`
          : ''
      ].join('')
    : '';
  const mode = can ? mepMode : 'overzicht';
  const modes = can
    ? `<div class="mep-modes" role="group" aria-label="${esc(t('Weergave'))}"><button type="button" class="${mode === 'overzicht' ? 'is-on' : ''}" aria-pressed="${mode === 'overzicht'}" onclick="setMepMode('overzicht')">${esc(t('Overzicht'))}</button><button type="button" class="${mode === 'bewerken' ? 'is-on' : ''}" aria-pressed="${mode === 'bewerken'}" onclick="setMepMode('bewerken')">${icon('edit')}${esc(t('Bewerken'))}</button></div>`
    : '';
  const head = `<div class="mep-head"><button type="button" class="btn small mep-back" onclick="closeMepList()">${icon('back')}${esc(t('Alle MEP-lijsten'))}</button>${modes}<div class="mep-head-info">${team ? `<span class="mep-team">${icon('users')}<span translate="no">${esc(team.name)}</span></span>` : ''}${l.archived ? `<span class="mep-flag">${esc(t('Gearchiveerd'))}</span>` : ''}<span id="mepSaved" class="mep-saved" aria-live="polite">${esc(mepSavedText())}</span></div>${menu ? `<details class="rp-more mep-more"><summary class="btn rp-icon-btn" aria-label="${esc(t('Meer acties'))}" title="${esc(t('Meer acties'))}">${icon('more')}</summary><div class="rp-menu">${menu}</div></details>` : ''}</div>`;
  const tabs = `<div class="mep-tabs" role="tablist">${cards
    .map(
      c =>
        `<button type="button" role="tab" aria-selected="${c.id === mepCardId}" class="mep-tab${c.id === mepCardId ? ' is-on' : ''}" onclick="mepCardId='${escJs(c.id)}';renderMepList()"><span translate="no">${esc(c.name)}</span></button>`
    )
    .join(
      ''
    )}${can ? `<button type="button" class="mep-tab mep-tab-add" onclick="addMepCard('${lid}')">${icon('plus')}${esc(t('Kaart'))}</button>` : ''}</div>`;
  if (mode === 'overzicht') {
    host.innerHTML = head + mepReadOnlyNote(l) + renderMepSheet(l);
    fitMepSheet();
    // Nog een keer als Playfair Display net binnen is (andere breedte van de letters).
    document.fonts?.ready.then(() => $('mepSheet') && fitMepSheet());
    return;
  }
  const card = cards.find(c => c.id === mepCardId);
  host.innerHTML =
    head +
    mepReadOnlyNote(l) +
    tabs +
    (card
      ? renderMepCard(l, card, can)
      : `<div class="mep-empty"><p>${esc(t('Deze lijst heeft nog geen kaart.'))}</p></div>`);
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
    ? `<form class="mep-item mep-item-new" onsubmit="event.preventDefault();addMepItem('${sid}', this)"><input name="name" maxlength="200" placeholder="${esc(t('Nieuw onderdeel'))}" autocomplete="off" aria-label="${esc(t('Nieuw onderdeel'))}"><input name="qty" inputmode="decimal" placeholder="${esc(t('Per couvert'))}" aria-label="${esc(t('Per couvert'))}"><input name="unit" maxlength="20" placeholder="${esc(t('Eenheid'))}" aria-label="${esc(t('Eenheid'))}"><input name="note" maxlength="300" placeholder="${esc(t('Opmerking'))}" aria-label="${esc(t('Opmerking'))}"><button type="submit" class="btn small">${icon('plus')}<span>${esc(t('Toevoegen'))}</span></button></form>`
    : '';
  const head = `<div class="mep-item mep-item-head" aria-hidden="true"><span>${esc(t('Onderdeel'))}</span><span>${esc(t('Per couvert'))}</span><span>${can ? esc(t('Eenheid')) : ''}</span><span>${esc(t('Opmerking'))}</span><span>${esc(t('Recept'))}</span></div>`;
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
  return `<div class="mep-item" data-item="${esc(it.id)}"><input value="${esc(it.name)}" maxlength="200" aria-label="${esc(t('Onderdeel'))}" onchange="setMepItem('${iid}','name',this)"><input value="${esc(qty)}" inputmode="decimal" placeholder="${esc(t('Per couvert'))}" aria-label="${esc(t('Per couvert'))}" onchange="setMepItem('${iid}','portion_qty',this)"><input value="${esc(it.portion_unit || '')}" maxlength="20" placeholder="${esc(t('Eenheid'))}" aria-label="${esc(t('Eenheid'))}" onchange="setMepItem('${iid}','portion_unit',this)"><input value="${esc(it.note || '')}" maxlength="300" placeholder="${esc(t('Opmerking'))}" aria-label="${esc(t('Opmerking'))}" onchange="setMepItem('${iid}','note',this)">${mepRecipeCell(l, it, true)}<span class="mep-item-tools">${idx > 0 ? `<button type="button" class="mep-icon" onclick="moveMep('mep_items','${iid}',-1)" aria-label="${esc(t('Omhoog'))}" title="${esc(t('Omhoog'))}">↑</button>` : ''}${idx < count - 1 ? `<button type="button" class="mep-icon" onclick="moveMep('mep_items','${iid}',1)" aria-label="${esc(t('Omlaag'))}" title="${esc(t('Omlaag'))}">↓</button>` : ''}<button type="button" class="mep-icon mep-danger" onclick="deleteMepItem('${iid}')" aria-label="${esc(t('Onderdeel verwijderen'))}" title="${esc(t('Onderdeel verwijderen'))}">${icon('trash')}</button></span></div>`;
}

// ---- Lijsten ----

async function newMepList() {
  if (!currentUser && !demoMode) return;
  const teams = mepTeamsForNew();
  let teamId = null;
  if (teams.length) {
    const choice = await askChoice(t('Voor wie is deze MEP-lijst?'), [
      { value: 'own', label: t('Alleen voor mij'), primary: true },
      ...teams.map(m => ({ value: m.id, label: m.name, hint: t('Keukenteam: je collega’s vinken mee af') }))
    ]);
    if (!choice) return;
    if (choice !== 'own') teamId = choice;
  }
  if (!teamId && !demoMode && !isPro() && mepOwnListCount() >= 1) return mepAskForPro();
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
  const card = { id: mepNewId(), list_id: list.id, name: t('À la carte'), position: 0 };
  await mepInsert('mep_cards', card);
  mepCardId = card.id;
  openMepList(list.id);
  setTimeout(() => $('mepNewSection')?.focus(), 50);
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
      `${t('MEP-lijst definitief verwijderen?')}\n\n${l.name}: ${mepListMeta(l)}. ${t('Ook de afgevinkte dagen gaan weg. Dit kan niet ongedaan worden gemaakt.')}`,
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
  if (!l.team_id && !demoMode && !isPro()) return mepAskForPro();
  const name = (
    (await askText(t('Naam van de kopie'), `${l.name} (${t('kopie')})`, { confirmLabel: t('Kopie maken') })) || ''
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
      `${t('Kaart verwijderen?')}\n\n${c.name} (${what}). ${t('Dit kan niet ongedaan worden gemaakt.')}`,
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
      `${t('Kopje verwijderen?')}\n\n${s.name} (${n === 1 ? t('1 onderdeel') : t(`${n} onderdelen`)}). ${t('Dit kan niet ongedaan worden gemaakt.')}`,
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
    name: (to === s.card_id ? `${s.name} (${t('kopie')})` : s.name).slice(0, 160),
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
    return toast(t('Vul bij per couvert een getal in, bijvoorbeeld 40 of 0,5. Of laat het leeg.'));
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
      return toast(t('Vul bij per couvert een getal in, bijvoorbeeld 40 of 0,5. Of laat het leeg.'));
    }
  } else if (field !== 'name') value = value || null;
  if (value === it[field] || (value == null && it[field] == null)) return;
  if (!(await mepUpdate('mep_items', id, { [field]: value }))) old();
}

async function deleteMepItem(id) {
  const it = mepItems.find(x => x.id === id);
  if (!(await askConfirm(`${t('Onderdeel verwijderen?')}\n\n${it.name}`, { danger: true }))) return;
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

function setMepMode(mode) {
  mepMode = mode === 'bewerken' ? 'bewerken' : 'overzicht';
  try {
    localStorage.setItem('savour_mep_mode', mepMode);
  } catch (_) {}
  renderMep();
}

// Hoeveel kolommen elke kaart krijgt (samen 3), naar het aantal regels.
function mepSheetColumns(cards) {
  const rows = cards.map(c => mepSectionsOf(c.id).reduce((n, s) => n + 1.6 + mepItemsOf(s.id).length, 0));
  const total = rows.reduce((a, b) => a + b, 0) || 1;
  if (cards.length >= 3) return cards.map(() => 1);
  if (cards.length === 1) return [3];
  const first = Math.min(2, Math.max(1, Math.round((3 * rows[0]) / total)));
  return [first, 3 - first];
}

function mepSheetItem(it) {
  const qty = mepQtyText(it);
  const extra = [qty, it.note].filter(Boolean).join(' · ');
  return `<li><span class="mep-box" aria-hidden="true"></span><span><span translate="no">${esc(it.name)}</span>${extra ? ` <small translate="no">${esc(extra)}</small>` : ''}</span></li>`;
}

function renderMepSheet(l) {
  const cards = mepCardsOf(l.id).filter(c => mepSectionsOf(c.id).length);
  const cols = mepSheetColumns(cards);
  const showCardNames = mepCardsOf(l.id).length > 1;
  const body = cards
    .map((c, i) => {
      const secs = mepSectionsOf(c.id)
        .map(s => {
          const items = mepItemsOf(s.id);
          return `<section class="mep-sheet-sec"><h4 translate="no">${esc(s.name)}</h4>${items.length ? `<ul>${items.map(mepSheetItem).join('')}</ul>` : ''}</section>`;
        })
        .join('');
      return `<div class="mep-sheet-card" style="--cols:${cols[i]};grid-column:span ${cols[i]}">${showCardNames ? `<h3 translate="no">${esc(c.name)}</h3>` : ''}<div class="mep-sheet-flow">${secs}</div></div>`;
    })
    .join('');
  const empty = !cards.length
    ? `<p class="mep-sheet-empty">${esc(t('Nog leeg. Kies Bewerken om kopjes en onderdelen toe te voegen.'))}</p>`
    : '';
  return `<div class="mep-sheet-wrap"><article class="mep-sheet" id="mepSheet"><header class="mep-sheet-head"><h2 translate="no">${esc(l.name)}</h2><span class="mep-sheet-date">${esc(t('Datum'))}: ____________</span></header><div class="mep-sheet-grid">${body}${empty}</div></article><p class="mep-sheet-fit muted" id="mepSheetFit"></p></div>`;
}

// De letter zo groot maken als past (17 tot 8,5 px), zodat de lijst binnen één A4 valt. Op de telefoon: gewoon onder elkaar.
function fitMepSheet() {
  const sheet = $('mepSheet');
  const note = $('mepSheetFit');
  if (!sheet) return;
  const narrow = window.matchMedia('(max-width: 760px)').matches;
  sheet.style.removeProperty('--fs');
  if (note) note.textContent = '';
  if (narrow) return;
  // Een paar pixels marge: het blad zelf is al precies een A4 hoog (afronding).
  const page = (sheet.clientWidth * 297) / 210 + 3;
  // Zo groot mogelijk (leesbaar in de keuken), maar alles op één blad.
  let fs = 17;
  sheet.style.setProperty('--fs', fs + 'px');
  while (sheet.scrollHeight > page && fs > 8.5) {
    fs -= 0.5;
    sheet.style.setProperty('--fs', fs + 'px');
  }
  if (sheet.scrollHeight > page && note)
    note.textContent = t('Deze lijst is langer dan één A4. Bij printen loopt hij door op een tweede blad.');
}
