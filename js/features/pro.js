// Savour Pro: abonnement (Stripe), de Pro-pagina, de abonnementsstatus in Instellingen en de melding bij
// importeren.
// Gratis: tot 100 eigen recepten, de Savour-lezer, lid zijn van gedeelde mappen.
// Pro: onbeperkt recepten, zelf gedeelde mappen maken en je team uitnodigen, AI-import (500 per maand).
// Nieuwe accounts: 7 dagen Pro gratis, maar ook dan tot 100 recepten (onbeperkt bewaren is alleen betaald).
// Teams: een pakket plekken voor een organisatie.
// De echte controle zit in de database (supabase/2026-10-22-gratis-pro-teams.sql en 2026-10-23-proef-7-dagen.sql)
// en op de server.

const PRO_PRICES = { month: '€2,99', year: '€29' };
const FREE_RECIPE_LIMIT = 100;
// Teampakketten: hoe groter het team, hoe lager de prijs per persoon. Elke plek krijgt volledig Pro.
const TEAM_PLANS = [
  { id: 'team5', seats: 5, month: '€8,99', year: '€89', perPerson: '€1,80' },
  { id: 'team10', seats: 10, month: '€14,99', year: '€149', perPerson: '€1,50' },
  { id: 'team25', seats: 25, month: '€29,99', year: '€299', perPerson: '€1,20' }
];
const PRO_INTENT_KEY = 'savour_pro_intent';

const TRIAL_DAYS = 7;

const EMPTY_PLAN = {
  pro: false,
  unlimited: false,
  source: 'free',
  status: '',
  plan: '',
  periodEnd: null,
  cancelAtEnd: false,
  trialEnd: null,
  team: null,
  recipeLimit: FREE_RECIPE_LIMIT,
  used: 0,
  limit: 500
};

// Status van de ingelogde gebruiker; geladen in loadPlanState().
let savourPlan = { ...EMPTY_PLAN };

function isPro() {
  return !!savourPlan.pro;
}

// Hoeveel eigen recepten mag deze gebruiker nog toevoegen? Infinity met betaald Pro (niet in de proefperiode).
function recipeRoomLeft() {
  return savourPlan.unlimited || demoMode ? Infinity : Math.max(0, savourPlan.recipeLimit - recipes.length);
}

// Melding als een gratis account (of proefperiode) aan de 100 recepten zit. Geeft true als er nog ruimte is.
async function checkRecipeRoom(count = 1) {
  const left = recipeRoomLeft();
  if (left >= count) return true;
  const who = savourPlan.source === 'trial' ? 'In de proefperiode bewaar je' : 'Je gratis account bewaart';
  if (
    await askConfirm(
      `${who} tot ${FREE_RECIPE_LIMIT} recepten\n\nMet Savour Pro bewaar je onbeperkt recepten (vanaf ${PRO_PRICES.month} per maand). Je bestaande recepten blijven altijd gewoon staan.`,
      { confirmLabel: 'Bekijk Savour Pro' }
    )
  )
    openPublicInfo('pro');
  return false;
}

// Leest het abonnement in één keer uit de database (savour_my_plan). Bestaat die functie nog niet (SQL niet
// uitgevoerd), dan zoals voorheen alleen het eigen abonnement en de AI-teller.
async function loadPlanState() {
  savourPlan = { ...EMPTY_PLAN };
  if (!currentUser || demoMode) return;
  const { data: p, error } = await supabaseClient.rpc('savour_my_plan');
  if (!error && p) {
    savourPlan = {
      ...EMPTY_PLAN,
      pro: !!p.pro,
      // Oude SQL zonder 'unlimited': toen gaf elke vorm van Pro onbeperkt recepten.
      unlimited: p.unlimited ?? !!p.pro,
      source: p.source || 'free',
      status: p.status || '',
      plan: p.plan || '',
      periodEnd: p.period_end ? new Date(p.period_end) : null,
      cancelAtEnd: !!p.cancel_at_period_end,
      hasCustomer: !!p.has_customer,
      trialEnd: p.trial_end ? new Date(p.trial_end) : null,
      team: p.team || null,
      recipeLimit: p.recipe_limit || FREE_RECIPE_LIMIT,
      used: p.used || 0
    };
    return;
  }
  try {
    const month = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit' })
      .format(new Date())
      .slice(0, 7);
    const [subRes, useRes] = await Promise.all([
      supabaseClient.from('subscriptions').select('*').eq('user_id', currentUser.id).maybeSingle(),
      supabaseClient.from('ai_usage').select('count').eq('user_id', currentUser.id).eq('month', month).maybeSingle()
    ]);
    const s = subRes.data;
    const periodEnd = s?.current_period_end ? new Date(s.current_period_end) : null;
    const running = !periodEnd || periodEnd > new Date();
    savourPlan = {
      ...EMPTY_PLAN,
      pro: !!s && ['active', 'trialing', 'past_due', 'canceled'].includes(s.status) && running,
      unlimited: true,
      // Zonder de nieuwe SQL bestaat de recepten-limiet nog niet in de database; dan ook niet in de app.
      recipeLimit: Infinity,
      status: s?.status || '',
      plan: s?.plan || '',
      periodEnd,
      cancelAtEnd: !!s?.cancel_at_period_end,
      hasCustomer: !!s?.stripe_customer_id,
      used: useRes.data?.count || 0,
      limit: 500
    };
  } catch (e) {
    console.warn('Abonnement kon niet worden geladen:', e);
  }
}

async function proApi(path, body = {}) {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error('Log eerst in.');
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(result.error || 'Er ging iets mis.'), { code: result.code });
  return result;
}

// Knop "Kies maand/jaar" of een teampakket ("team10_month"). Niet ingelogd? Eerst een account; daarna gaat
// het afrekenen vanzelf verder.
async function choosePro(plan) {
  const isTeam = /^team(5|10|25)_(month|year)$/.test(plan);
  if (!isTeam) plan = plan === 'year' ? 'year' : 'month';
  if (demoMode) return toast('In de demo kun je Savour Pro niet afsluiten.');
  if (!currentUser) {
    try {
      localStorage.setItem(PRO_INTENT_KEY, plan);
    } catch (e) {}
    return openAuth('signup');
  }
  // Eigen Pro (betaald) beheer je in het Stripe-portaal; een team kun je ook naast een proefperiode nemen.
  if (!isTeam && ['subscription', 'gift', 'team_owner', 'team_member'].includes(savourPlan.source))
    return openProPortal();
  let organization = '';
  if (isTeam) {
    if (savourPlan.team?.owner && savourPlan.team.active) return openProPortal();
    organization = String(
      (await askText('Naam van je organisatie\n\nDeze naam zien je teamleden.', account.organization || '', {
        confirmLabel: 'Verder naar betalen'
      })) || ''
    ).trim();
    if (!organization) return;
  }
  document.querySelectorAll('[data-pro-choose]').forEach(b => (b.disabled = true));
  try {
    const { url } = await proApi('/api/pro-checkout', { plan, organization });
    location.href = url;
  } catch (e) {
    document.querySelectorAll('[data-pro-choose]').forEach(b => (b.disabled = false));
    if (e.code === 'already_pro') return openProPortal();
    toast(e.code === 'not_configured' ? 'Betalen is nog niet ingesteld. Probeer het later opnieuw.' : e.message);
  }
}

async function openProPortal() {
  try {
    const { url } = await proApi('/api/pro-portal');
    location.href = url;
  } catch (e) {
    toast(e.code === 'not_configured' ? 'Abonnement beheren is nog niet ingesteld.' : e.message);
  }
}

// Na inloggen: stond er een Pro-keuze klaar (gekozen voordat er een account was)? Dan nu afrekenen.
async function resumeProIntent() {
  let plan = '';
  try {
    plan = localStorage.getItem(PRO_INTENT_KEY) || '';
    localStorage.removeItem(PRO_INTENT_KEY);
  } catch (e) {}
  if (plan && currentUser && (plan.startsWith('team') || !isPro())) await choosePro(plan);
}

// Terug van Stripe (?pro=success of ?pro=portal). De betaling komt via de webhook binnen; even opnieuw kijken.
async function handleProReturn() {
  const p = new URLSearchParams(location.search).get('pro');
  if (!p || !currentUser) return;
  history.replaceState(null, '', location.pathname);
  if (p === 'success') {
    toast('Bedankt! Je abonnement wordt geactiveerd…');
    // Tijdens de proefperiode is iemand al Pro: wacht op het betaalde abonnement zelf.
    const paid = () => ['subscription', 'team_owner'].includes(savourPlan.source);
    for (let i = 0; i < 8 && !paid(); i++) {
      await new Promise(r => setTimeout(r, 2000));
      await loadPlanState();
    }
    toast(paid() ? 'Welkom bij Savour Pro.' : 'Je betaling wordt nog verwerkt. Kijk zo nog even in Instellingen.');
    if (paid() && savourPlan.team?.owner) go('settings');
  } else await loadPlanState();
  renderPlanSettings();
  renderImportPlanNotice();
}

function formatProDate(d) {
  return d
    ? d.toLocaleDateString(document.documentElement.lang || 'nl', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
}

// ---- Pro-pagina (publiek én in de app) ----

// Welke abonnementen zijn op deze site ingesteld (GET /api/pro-checkout)? null = nog onbekend: dan alles tonen.
let proAvailablePlans = null;

function proPlanAvailable(plan) {
  return !proAvailablePlans || proAvailablePlans.includes(plan);
}

function renderProPage(host) {
  if (!host) return;
  if (proAvailablePlans === null && !host.dataset.plansRequested) {
    host.dataset.plansRequested = '1';
    fetch('/api/pro-checkout', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        // Lege lijst = Stripe nog helemaal niet ingesteld: dan alles tonen (afrekenen meldt het zelf).
        if (Array.isArray(d?.plans) && d.plans.length) {
          proAvailablePlans = d.plans;
          if (host.isConnected) renderProPage(host);
        }
      })
      .catch(() => {});
  }
  const paid = ['subscription', 'gift', 'team_owner', 'team_member'].includes(savourPlan.source);
  const card = (plan, price, per, note, primary) =>
    !paid && !proPlanAvailable(plan)
      ? ''
      : `<div class="pro-price${primary ? ' is-featured' : ''}">${primary ? '<span class="pro-badge">Voordeligst</span>' : ''}<h3>${plan === 'year' ? 'Jaarlijks' : 'Maandelijks'}</h3><div class="pro-amount"><strong>${price}</strong><span>${per}</span></div><p class="muted">${note}</p><button type="button" class="btn ${primary ? 'gold' : ''}" data-pro-choose onclick="choosePro('${plan}')">${paid ? 'Abonnement beheren' : plan === 'year' ? 'Kies jaarlijks' : 'Kies maandelijks'}</button></div>`;
  const teamCard = t => {
    const month = proPlanAvailable(`${t.id}_month`),
      year = proPlanAvailable(`${t.id}_year`);
    if (!month && !year) return '';
    return `<div class="pro-price pro-team${t.seats === 10 ? ' is-featured' : ''}">${t.seats === 10 ? '<span class="pro-badge">Meest gekozen</span>' : ''}<h3>Team ${t.seats}</h3><div class="pro-amount"><strong>${t.month}</strong><span>per maand</span></div><p class="muted">${t.seats} personen · ${t.perPerson} per persoon<br>of ${t.year} per jaar</p>${month ? `<button type="button" class="btn ${t.seats === 10 ? 'gold' : ''}" data-pro-choose onclick="choosePro('${t.id}_month')">Kies maandelijks</button>` : ''}${year ? `<button type="button" class="btn pro-year-link" data-pro-choose onclick="choosePro('${t.id}_year')">Kies jaarlijks</button>` : ''}</div>`;
  };
  const teamCards = TEAM_PLANS.map(teamCard).join('');
  const current =
    savourPlan.source === 'trial'
      ? `<div class="pro-current"><b>Je probeert Savour Pro gratis.</b> <span>Tot ${esc(formatProDate(savourPlan.trialEnd))}, met maximaal ${FREE_RECIPE_LIMIT} recepten. Daarna ga je vanzelf terug naar gratis; je betaalt niets zonder dat je zelf kiest.</span></div>`
      : isPro()
        ? `<div class="pro-current"><b>Je hebt Savour Pro.</b> <span>${savourPlan.used} van ${savourPlan.limit} AI-imports gebruikt deze maand.</span></div>`
        : '';
  host.innerHTML =
    current +
    `<p class="pro-trial-note"><strong>Nieuw bij Savour?</strong> Je probeert Savour Pro ${TRIAL_DAYS} dagen gratis, zonder betaalgegevens: AI-import en gedeelde mappen, tot ${FREE_RECIPE_LIMIT} recepten.</p>
    <div class="pro-prices">${card('month', PRO_PRICES.month, 'per maand', 'Maandelijks opzegbaar.', false)}${card('year', PRO_PRICES.year, 'per jaar', 'Twee maanden gratis ten opzichte van maandelijks.', true)}</div>
    <p class="pro-pay muted">Betalen met iDEAL, creditcard, Apple Pay, Google Pay of PayPal. Er wordt geen btw gerekend (kleineondernemersregeling). Opzeggen kan altijd; je houdt Pro tot het einde van de betaalde periode.</p>
    ${
      teamCards
        ? `<h2>Savour voor je hele team</h2>
    <p>Met een teamabonnement krijgt iedereen in je keuken Savour Pro. Hoe groter je team, hoe lager de prijs per persoon. Je nodigt je collega's uit op hun e-mailadres en kunt plekken altijd aan iemand anders geven.</p>
    <div class="pro-prices pro-team-prices">${teamCards}</div>
    <p class="pro-pay muted">Groter dan 25 personen of meerdere vestigingen? Neem contact op voor een prijs op maat.</p>`
        : ''
    }
    <h2>Wat zit erin?</h2>
    <table class="pro-compare">
      <thead><tr><th></th><th>Gratis</th><th>Pro</th></tr></thead>
      <tbody>
        <tr><td>Recepten bewaren</td><td>tot ${FREE_RECIPE_LIMIT}</td><td>onbeperkt</td></tr>
        <tr><td>Mappen, categorieën, zoeken en favorieten</td><td>✓</td><td>✓</td></tr>
        <tr><td>Omrekenen, printen, kookmodus en delen</td><td>✓</td><td>✓</td></tr>
        <tr><td>Importeren van Word, PDF en tekst met de Savour-lezer</td><td>✓</td><td>✓</td></tr>
        <tr><td>Lid zijn van een gedeelde map van een ander</td><td>✓</td><td>✓</td></tr>
        <tr><td>Zelf een gedeelde map maken en je team uitnodigen</td><td>–</td><td>✓</td></tr>
        <tr><td>AI leest foto's, handgeschreven en gescande recepten</td><td>–</td><td>✓</td></tr>
        <tr><td>AI-imports per maand</td><td>–</td><td>500</td></tr>
      </tbody>
    </table>
    <h2>Hoe werkt importeren?</h2>
    <p>Iedereen gebruikt de <strong>Savour-lezer</strong>: die leest Word, PDF en tekst direct en gratis in. Met <strong>Savour Pro</strong> leest daarnaast de AI wat de lezer niet zeker weet: foto's, handgeschreven kladjes, gescande pagina's en documenten zonder duidelijke indeling. De AI verzint nooit hoeveelheden of stappen; je controleert elk recept voordat het wordt opgeslagen.</p>
    <h2>Vragen</h2>
    <p><strong>Wat gebeurt er als ik stop met Pro?</strong><br>Je houdt al je recepten en gedeelde mappen. Je kunt alleen geen nieuwe recepten meer toevoegen boven de ${FREE_RECIPE_LIMIT} en geen nieuwe gedeelde mappen maken.</p>
    <p><strong>Moeten mijn teamleden ook betalen?</strong><br>Nee. Lid zijn van een gedeelde map is gratis. Wil je dat iedereen in je keuken Pro heeft, kies dan een teamabonnement.</p>
    <p><strong>Wat telt als een AI-import?</strong><br>Elke foto, gescande pagina of elk deel van een bestand dat de AI leest (ongeveer 8 recepten per deel). Wat de Savour-lezer zelf zeker leest, telt niet mee.</p>
    <p><strong>Wat als ik over de 500 heen ga?</strong><br>Dan leest de Savour-lezer verder en kun je de rest volgende maand met AI doen. Er komen nooit extra kosten bij.</p>
    <p><strong>Hoe zeg ik op?</strong><br>In Mijn account → Abonnement → Abonnement beheren. Daar wijzig je ook je betaalmethode en download je facturen.</p>`;
}

// ---- Zijbalk: "Savour Pro" (upgraden) of "Mijn abonnement" (al Pro), en Admin voor beheerders ----

function hasOwnPro() {
  return ['subscription', 'gift', 'team_owner', 'team_member'].includes(savourPlan.source);
}

function renderProNav() {
  const label = $('navProLabel');
  if (!label) return;
  const paid = savourPlan.hasCustomer && ['subscription', 'team_owner'].includes(savourPlan.source);
  label.textContent = paid ? 'Abonnement beheren' : hasOwnPro() ? 'Mijn abonnement' : 'Savour Pro';
}

// Betaald (eigen abonnement of team-eigenaar): direct naar "Abonnement beheren" bij Stripe. Cadeau of plek in
// andermans team: niets te beheren, dus de abonnementsinfo in Instellingen.
function openProNav() {
  if (!hasOwnPro()) return go('pro');
  if (savourPlan.hasCustomer && ['subscription', 'team_owner'].includes(savourPlan.source)) return openProPortal();
  go('settings');
  setTimeout(() => $('settingsPlan')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
}

// De server (api/admin.js, ADMIN_EMAILS) beslist of iemand beheerder is; de knop is alleen een snelkoppeling.
async function renderAdminNav() {
  const btn = $('navAdmin');
  if (!btn) return;
  btn.style.display = 'none';
  if (!currentUser || demoMode) return;
  try {
    if ((await adminApi('whoami')).admin) btn.style.display = '';
  } catch {
    // Geen beheerder of server niet bereikbaar: knop blijft verborgen.
  }
}

// ---- Abonnement en team in Instellingen ----

function renderPlanSettings() {
  renderProNav();
  const host = $('settingsPlan');
  if (!host) return;
  const s = savourPlan;
  const until = formatProDate(s.periodEnd);
  const ai = `<small>${s.used} van ${s.limit} AI-imports gebruikt deze maand.</small>`;
  const manage = s.hasCustomer ? '<button class="btn" onclick="openProPortal()">Abonnement beheren</button>' : '';
  const more = '<button class="btn gold" onclick="openPublicInfo(\'pro\')">Bekijk Savour Pro</button>';
  let row;
  if (s.source === 'gift')
    row = `<b>Savour Pro</b><small>Savour Pro is voor jou kosteloos geactiveerd${s.periodEnd ? ` tot ${esc(until)}` : ''}.</small>${ai}`;
  else if (s.source === 'subscription')
    row = `<b>Savour Pro</b><small>${esc(s.cancelAtEnd ? `Opgezegd. Je houdt Pro tot ${until}.` : `${s.plan === 'year' ? 'Jaarabonnement' : 'Maandabonnement'} · verlengt op ${until}`)}</small>${ai}`;
  else if (s.source === 'team_owner')
    row = `<b>Savour Pro · Team ${esc(s.team.seats)}</b><small>${esc(s.team.name)}${s.team.cancel_at_period_end ? ` · opgezegd, loopt tot ${esc(formatProDate(new Date(s.team.period_end)))}` : ''}</small>${ai}`;
  else if (s.source === 'team_member') row = `<b>Savour Pro</b><small>Via je team: ${esc(s.team.name)}.</small>${ai}`;
  else if (s.source === 'trial')
    row = `<b>Savour Pro · gratis proefperiode</b><small>Tot ${esc(formatProDate(s.trialEnd))}. ${recipes.length} van ${s.recipeLimit} recepten; onbeperkt bewaren kan met Savour Pro. Daarna ga je vanzelf terug naar gratis, tenzij je zelf Pro kiest.</small>${ai}`;
  else
    row = `<b>Gratis</b><small>${recipes.length} van ${s.recipeLimit === Infinity ? '∞' : s.recipeLimit} recepten. Met Savour Pro onbeperkt recepten, je eigen gedeelde mappen en AI-import.</small>`;
  const button = ['subscription', 'team_owner'].includes(s.source) || s.source === 'gift' ? manage : more;
  host.innerHTML = `<div class="plan-row"><div>${row}</div>${button}</div>${s.team?.owner ? renderTeamManager(s.team) : ''}`;
}

// Teamleden beheren: de eigenaar telt als eerste plek mee.
function renderTeamManager(team) {
  const members = team.members || [];
  const used = members.length + 1;
  const list = members
    .map(
      email =>
        `<div class="member"><div><b translate="no">${esc(email)}</b><small class="muted">Teamlid · Savour Pro</small></div><button class="btn small" onclick="removeTeamMember('${escJs(email)}')">Plek vrijgeven</button></div>`
    )
    .join('');
  const full = used >= team.seats;
  return `<div class="team-manager"><h4>Je team</h4><p class="muted">${used} van ${team.seats} plekken in gebruik (jij telt mee). Teamleden hebben Pro zodra ze inloggen met dit e-mailadres.</p><div class="member"><div><b translate="no">${esc(currentUser?.email || '')}</b><small class="muted">Eigenaar</small></div></div>${list}${
    full
      ? '<p class="muted">Alle plekken zijn bezet. Een groter team kies je via Abonnement beheren.</p>'
      : '<div class="team-add"><input id="teamMemberEmail" type="email" placeholder="naam@restaurant.nl" autocomplete="off"><button class="btn gold" onclick="addTeamMember()">Toevoegen</button></div>'
  }</div>`;
}

async function addTeamMember() {
  const email = ($('teamMemberEmail')?.value || '').trim();
  if (!email) return;
  const { error } = await supabaseClient.rpc('savour_team_add_member', { _email: email });
  if (error) {
    const msg = String(error.message || '');
    return toast(
      /team_full/.test(msg)
        ? 'Alle plekken in je team zijn bezet.'
        : /bad_email/.test(msg)
          ? 'Vul een geldig e-mailadres in.'
          : 'Teamlid kon niet worden toegevoegd.'
    );
  }
  await loadPlanState();
  renderPlanSettings();
  toast(`${email} heeft nu Savour Pro via je team`);
}

async function removeTeamMember(email) {
  if (
    !(await askConfirm(
      `Plek van ${email} vrijgeven?\n\nDiegene houdt al zijn recepten, maar heeft geen Pro meer via je team.`,
      { confirmLabel: 'Plek vrijgeven' }
    ))
  )
    return;
  const { error } = await supabaseClient.rpc('savour_team_remove_member', { _email: email });
  if (error) return toast('Plek kon niet worden vrijgegeven.');
  await loadPlanState();
  renderPlanSettings();
}

// ---- Kleine Pro-melding boven het alfabet in Alle recepten (alleen gratis en proefperiode) ----
// Wegklikken verbergt hem een week (per apparaat).

const PRO_HINT_KEY = 'savour_pro_hint_hidden';

function renderRecipeProHint() {
  const host = $('recipeProHint');
  if (!host) return;
  let hiddenAt = 0;
  try {
    hiddenAt = Number(localStorage.getItem(PRO_HINT_KEY)) || 0;
  } catch {}
  const show = !demoMode && !savourPlan.unlimited && Date.now() - hiddenAt > 7 * 86400000;
  if (!show) {
    host.innerHTML = '';
    return;
  }
  const daysLeft = savourPlan.trialEnd ? Math.max(1, Math.ceil((savourPlan.trialEnd - Date.now()) / 86400000)) : 0;
  const title =
    savourPlan.source === 'trial'
      ? `Savour Pro · nog ${daysLeft} ${daysLeft === 1 ? 'dag' : 'dagen'} gratis`
      : 'Savour Pro';
  host.innerHTML = `<div class="recipe-pro-hint"><b>${title}</b><span>Onbeperkt recepten, AI die je kladjes en foto's leest, en gedeelde mappen voor je team.</span><small>${recipes.length} van ${savourPlan.recipeLimit} recepten</small><button class="btn small gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button><button class="recipe-pro-hint-close" aria-label="Verbergen" title="Verbergen" onclick="hideRecipeProHint()">×</button></div>`;
}

function hideRecipeProHint() {
  try {
    localStorage.setItem(PRO_HINT_KEY, String(Date.now()));
  } catch {}
  $('recipeProHint').innerHTML = '';
}

// ---- Melding bovenaan het importscherm ----

function renderImportPlanNotice() {
  const host = $('importPlanNotice');
  if (!host) return;
  const left = recipeRoomLeft();
  host.innerHTML = isPro()
    ? `<div class="import-plan is-pro"><b>Savour Pro${savourPlan.source === 'trial' ? ' · proefperiode' : ''}</b><span>${savourPlan.used} van ${savourPlan.limit} AI-imports gebruikt deze maand. Eerst leest de Savour-lezer alles, gratis. Alleen waar die twijfelt, leest de AI automatisch na: alleen dat telt mee.${left === Infinity ? '' : ` In de proefperiode bewaar je tot ${savourPlan.recipeLimit} recepten (nog ${left}).`}</span></div>`
    : `<div class="import-plan"><b>Je importeert met de Savour-lezer</b><span>Word, PDF en tekst lees je gratis in${left === Infinity ? '' : ` (nog ${left} van ${savourPlan.recipeLimit} recepten in je gratis account)`}. Foto's, handgeschreven en gescande recepten leest de AI: alleen in Savour Pro.</span><button class="btn small gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button></div>`;
  document.querySelectorAll('[data-pro-only]').forEach(el => el.classList.toggle('is-locked', !isPro()));
}

// Melding wanneer een gratis gebruiker iets kiest dat alleen met Pro kan.
async function askForPro(what) {
  if (
    await askConfirm(
      `${what} lezen gaat met AI\n\nDat is onderdeel van Savour Pro (vanaf ${PRO_PRICES.month} per maand). Met de gratis Savour-lezer importeer je Word, PDF en tekst.`,
      {
        confirmLabel: 'Bekijk Savour Pro'
      }
    )
  )
    openPublicInfo('pro');
}

async function askForProSharedMap() {
  if (
    await askConfirm(
      `Een gedeelde map maken is Savour Pro\n\nMet Pro maak je gedeelde mappen en nodig je je team uit (vanaf ${PRO_PRICES.month} per maand). Lid zijn van de gedeelde map van een ander blijft gratis.`,
      { confirmLabel: 'Bekijk Savour Pro' }
    )
  )
    openPublicInfo('pro');
}
