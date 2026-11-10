// Community: een forum in Savour (Mijn Savour → Community). Leden posten threads en reageren op elkaar; de
// beheerder kan berichten verbergen, vastzetten, sluiten en verwijderen. De echte regels (wie wat mag, naam bij
// een bericht, hooguit 10 berichten per uur) staan in Supabase: supabase/2026-11-10-community-forum.sql.
// Berichten zijn platte tekst: alles gaat door esc(); alleen webadressen worden klikbare links.

let communityThreadId = null; // open thread, of null voor de lijst
let communityComposing = false; // formulier "Nieuwe thread" open
let communityUnread = 0; // nieuwe reacties van anderen in je eigen threads (supabase/2026-11-10-community-ongelezen.sql)

// Aantal ongelezen reacties ophalen en, als het verandert, het menu opnieuw tekenen (getal bij Community).
async function refreshCommunityUnread() {
  let n = 0;
  if (currentUser && !demoMode && navigator.onLine) {
    const { data, error } = await supabaseClient.rpc('savour_forum_unread');
    if (!error) n = Number(data) || 0;
  }
  if (n === communityUnread) return;
  communityUnread = n;
  renderAppNav();
  if (document.body.classList.contains('mobile-menu-open')) renderAppMenu();
  $('mobileMenuBtn')?.toggleAttribute('data-badge', n > 0);
}

function communityIsAdmin() {
  return typeof adminLinkVisible !== 'undefined' && !!adminLinkVisible;
}

// Platte tekst met regeleinden; webadressen worden een link (nofollow, nieuw tabblad).
function communityText(text) {
  return esc(text || '')
    .replace(
      /https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"]/g,
      url => `<a href="${url}" target="_blank" rel="nofollow ugc noopener">${url}</a>`
    )
    .replace(/\n/g, '<br>');
}

// "5 minuten geleden", "gisteren", in de taal van de app.
function communityWhen(date) {
  const diff = (Date.parse(date) - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(currentLanguage || 'nl', { numeric: 'auto' });
  const steps = [
    [60, 'second'],
    [3600, 'minute', 60],
    [86400, 'hour', 3600],
    [604800, 'day', 86400],
    [2629800, 'week', 604800],
    [Infinity, 'month', 2629800]
  ];
  for (const [limit, unit, size = 1] of steps)
    if (Math.abs(diff) < limit) return rtf.format(Math.round(diff / size), unit);
  return '';
}

function communityAuthor(row) {
  const badge = row.author_is_admin ? ` <span class="cm-badge">${esc(t('Team Savour'))}</span>` : '';
  return `<b translate="no">${esc(row.author_name || t('Kok'))}</b>${badge}`;
}

function communityError(error) {
  const msg = String(error?.message || '');
  // Tabellen nog niet aangemaakt (SQL nog niet gedraaid).
  if (/forum_threads|forum_posts|does not exist|schema cache/i.test(msg))
    return t('De community wordt nog ingericht. Probeer het straks opnieuw.');
  // Meldingen uit de database (spamrem, niet ingelogd) staan ook in de vertalingen.
  return t(msg) || t('Er ging iets mis. Probeer het opnieuw.');
}

async function renderCommunity() {
  const host = $('communityBody');
  if (!host) return;
  if (demoMode || !currentUser) {
    host.innerHTML = `<div class="cm-empty"><p>${esc(t('In de demo kun je de community niet gebruiken. Maak een gratis account aan om mee te praten met andere koks.'))}</p></div>`;
    return;
  }
  if (communityThreadId) return renderCommunityThread(communityThreadId);
  host.innerHTML = `<p class="muted">${esc(t('Laden…'))}</p>`;
  const { data, error } = await supabaseClient
    .from('forum_threads')
    .select(
      'id,title,author_id,author_name,author_is_admin,created_at,last_activity_at,reply_count,pinned,locked,hidden'
    )
    .order('pinned', { ascending: false })
    .order('last_activity_at', { ascending: false })
    .limit(200);
  if (communityThreadId) return; // intussen een thread geopend
  const intro = `<div class="cm-intro"><p>${esc(t('Stel een vraag, deel een tip of vertel wat je mist in Savour. Andere koks en het team van Savour lezen mee.'))}</p><p class="cm-rules">${esc(t('Andere leden zien je naam uit je profiel, nooit je e-mailadres. Houd het vriendelijk en zonder reclame; berichten die daar niet aan voldoen, kunnen worden verborgen.'))}</p></div>`;
  const compose = communityComposing
    ? `<form class="cm-compose" onsubmit="event.preventDefault();postCommunityThread()"><label>${esc(t('Titel'))}<input id="cmTitle" maxlength="140" required autocomplete="off"></label><label>${esc(t('Bericht'))}<textarea id="cmBody" rows="6" maxlength="5000" required></textarea></label><div class="actions"><button type="submit" class="btn gold" id="cmPost">${esc(t('Plaatsen'))}</button><button type="button" class="btn" onclick="toggleCommunityCompose(false)">${esc(t('Annuleren'))}</button></div></form>`
    : `<div class="actions"><button type="button" class="btn gold" onclick="toggleCommunityCompose(true)">${esc(t('Nieuwe thread'))}</button></div>`;
  if (error) {
    host.innerHTML = intro + `<div class="cm-empty"><p>${esc(communityError(error))}</p></div>`;
    return;
  }
  const rows = (data || [])
    .map(th => {
      const replies = th.reply_count === 1 ? t('1 reactie') : `${th.reply_count} reacties`;
      const flags = [
        th.pinned ? `<span class="cm-flag">${esc(t('Vast'))}</span>` : '',
        th.locked ? `<span class="cm-flag">${esc(t('Gesloten'))}</span>` : '',
        th.hidden ? `<span class="cm-flag warn">${esc(t('Verborgen'))}</span>` : ''
      ].join('');
      return `<li><button type="button" class="cm-thread${th.hidden ? ' is-hidden' : ''}" onclick="openCommunityThread('${escJs(th.id)}')"><span class="cm-thread-title"><span translate="no">${esc(th.title)}</span>${flags}</span><span class="cm-meta">${communityAuthor(th)} · <span>${esc(replies)}</span> · <span translate="no">${esc(communityWhen(th.last_activity_at))}</span></span></button></li>`;
    })
    .join('');
  host.innerHTML =
    intro +
    compose +
    (rows
      ? `<ul class="cm-list">${rows}</ul>`
      : `<div class="cm-empty"><p>${esc(t('Nog geen threads. Begin het eerste gesprek!'))}</p></div>`);
  if (communityComposing) $('cmTitle')?.focus();
}

function toggleCommunityCompose(open) {
  communityComposing = !!open;
  renderCommunity();
}

async function postCommunityThread() {
  const title = ($('cmTitle')?.value || '').trim();
  const body = ($('cmBody')?.value || '').trim();
  if (title.length < 3 || !body) return toast(t('Vul een titel en een bericht in.'));
  const btn = $('cmPost');
  if (btn) btn.disabled = true;
  const { data, error } = await supabaseClient.from('forum_threads').insert({ title, body }).select('id').single();
  if (btn) btn.disabled = false;
  if (error) return toast(communityError(error));
  communityComposing = false;
  openCommunityThread(data.id);
}

function openCommunityThread(id) {
  communityThreadId = id;
  renderCommunity();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCommunityThread() {
  communityThreadId = null;
  renderCommunity();
}

async function renderCommunityThread(id) {
  const host = $('communityBody');
  host.innerHTML = `<p class="muted">${esc(t('Laden…'))}</p>`;
  const [{ data: th, error }, { data: posts, error: postError }] = await Promise.all([
    supabaseClient.from('forum_threads').select('*').eq('id', id).maybeSingle(),
    supabaseClient.from('forum_posts').select('*').eq('thread_id', id).order('created_at', { ascending: true })
  ]);
  if (communityThreadId !== id) return;
  // Je eigen thread geopend: alle reacties gelezen, het getal bij Community gaat omlaag.
  if (th && th.author_id === currentUser?.id)
    supabaseClient.rpc('savour_forum_mark_read', { _thread: id }).then(() => refreshCommunityUnread());
  const back = `<button type="button" class="btn cm-back" onclick="closeCommunityThread()">← ${esc(t('Alle threads'))}</button>`;
  if (error || postError || !th) {
    host.innerHTML =
      back +
      `<div class="cm-empty"><p>${esc(error || postError ? communityError(error || postError) : t('Deze thread bestaat niet meer.'))}</p></div>`;
    return;
  }
  const admin = communityIsAdmin();
  const mine = row => row.author_id === currentUser?.id;
  const actions = (row, kind) => {
    const out = [];
    if (admin && kind === 'thread') {
      out.push(
        `<button type="button" onclick="moderateCommunity('thread','${escJs(row.id)}','pinned',${!row.pinned})">${esc(t(row.pinned ? 'Losmaken' : 'Vastzetten'))}</button>`
      );
      out.push(
        `<button type="button" onclick="moderateCommunity('thread','${escJs(row.id)}','locked',${!row.locked})">${esc(t(row.locked ? 'Heropenen' : 'Sluiten'))}</button>`
      );
    }
    if (admin)
      out.push(
        `<button type="button" onclick="moderateCommunity('${kind}','${escJs(row.id)}','hidden',${!row.hidden})">${esc(t(row.hidden ? 'Tonen' : 'Verbergen'))}</button>`
      );
    if (admin || mine(row))
      out.push(
        `<button type="button" class="danger" onclick="deleteCommunityItem('${kind}','${escJs(row.id)}')">${esc(t('Verwijderen'))}</button>`
      );
    return out.length ? `<div class="cm-actions">${out.join('')}</div>` : '';
  };
  const message = (row, kind) =>
    `<article class="cm-post${row.hidden ? ' is-hidden' : ''}"><header>${communityAuthor(row)}<span class="cm-meta"><span translate="no">${esc(communityWhen(row.created_at))}</span>${row.edited_at ? ` · <span>${esc(t('bewerkt'))}</span>` : ''}${row.hidden ? ` · <span>${esc(t('Verborgen'))}</span>` : ''}</span></header><div class="cm-text" translate="no">${communityText(row.body)}</div>${actions(row, kind)}</article>`;
  const canReply = !th.locked || admin;
  const reply = canReply
    ? `<form class="cm-compose cm-reply" onsubmit="event.preventDefault();postCommunityReply('${escJs(th.id)}')"><label>${esc(t('Jouw reactie'))}<textarea id="cmReply" rows="4" maxlength="5000" required></textarea></label><div class="actions"><button type="submit" class="btn gold" id="cmReplyBtn">${esc(t('Reageren'))}</button></div></form>`
    : `<p class="muted cm-locked">${esc(t('Deze thread is gesloten; reageren kan niet meer.'))}</p>`;
  host.innerHTML = `${back}<h3 class="cm-title" translate="no">${esc(th.title)}</h3>${message(th, 'thread')}<div class="cm-replies"><h4>${esc(th.reply_count === 1 ? t('1 reactie') : `${th.reply_count} reacties`)}</h4>${(posts || []).map(p => message(p, 'post')).join('')}</div>${reply}`;
}

async function postCommunityReply(threadId) {
  const body = ($('cmReply')?.value || '').trim();
  if (!body) return;
  const btn = $('cmReplyBtn');
  if (btn) btn.disabled = true;
  const { error } = await supabaseClient.from('forum_posts').insert({ thread_id: threadId, body });
  if (btn) btn.disabled = false;
  if (error) return toast(communityError(error));
  renderCommunityThread(threadId);
}

// Beheerder: vastzetten, sluiten of verbergen (de database staat dit alleen de beheerder toe).
async function moderateCommunity(kind, id, field, value) {
  const table = kind === 'thread' ? 'forum_threads' : 'forum_posts';
  const { error } = await supabaseClient
    .from(table)
    .update({ [field]: value })
    .eq('id', id);
  if (error) return toast(communityError(error));
  renderCommunity();
}

// Eigen bericht (of als beheerder) verwijderen. Een thread verwijderen haalt ook de reacties weg.
async function deleteCommunityItem(kind, id) {
  const question =
    kind === 'thread'
      ? t('Deze thread verwijderen?\n\nAlle reacties erin worden ook verwijderd. Dit kan niet ongedaan worden gemaakt.')
      : t('Deze reactie verwijderen?\n\nDit kan niet ongedaan worden gemaakt.');
  if (!(await askConfirm(question, { confirmLabel: t('Verwijderen'), danger: true }))) return;
  const table = kind === 'thread' ? 'forum_threads' : 'forum_posts';
  const { error } = await supabaseClient.from(table).delete().eq('id', id);
  if (error) return toast(communityError(error));
  if (kind === 'thread') communityThreadId = null;
  renderCommunity();
}
