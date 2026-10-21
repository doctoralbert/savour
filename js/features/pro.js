// Savour Pro: abonnement (Stripe), de Pro-pagina, de abonnementsstatus in Instellingen en de melding bij
// importeren. Gratis: alles behalve AI. Pro: AI-import (foto's, handgeschreven, gescande PDF's en rommelige
// bestanden), max. 500 per maand. De echte controle gebeurt op de server (api/ai-import.js).

const PRO_PRICES = { month: '€2,99', year: '€29' };
const PRO_INTENT_KEY = 'savour_pro_intent';

// Status van de ingelogde gebruiker; geladen in loadPlanState().
let savourPlan = { pro: false, status: '', plan: '', periodEnd: null, cancelAtEnd: false, used: 0, limit: 500 };

function isPro() {
  return !!savourPlan.pro;
}

// Leest abonnement en AI-teller. Bestaan de tabellen nog niet (SQL niet uitgevoerd), dan blijft alles gratis.
async function loadPlanState() {
  savourPlan = { pro: false, status: '', plan: '', periodEnd: null, cancelAtEnd: false, used: 0, limit: 500 };
  if (!currentUser || demoMode) return;
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
      pro: !!s && ['active', 'trialing', 'past_due', 'canceled'].includes(s.status) && running,
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

// Knop "Kies maand/jaar". Niet ingelogd? Eerst een account; daarna gaat het afrekenen vanzelf verder.
async function choosePro(plan) {
  plan = plan === 'year' ? 'year' : 'month';
  if (demoMode) return toast('In de demo kun je Savour Pro niet afsluiten.');
  if (!currentUser) {
    try {
      localStorage.setItem(PRO_INTENT_KEY, plan);
    } catch (e) {}
    return openAuth('signup');
  }
  if (isPro()) return openProPortal();
  document.querySelectorAll('[data-pro-choose]').forEach(b => (b.disabled = true));
  try {
    const { url } = await proApi('/api/pro-checkout', { plan });
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
  if (plan && currentUser && !isPro()) await choosePro(plan);
}

// Terug van Stripe (?pro=success of ?pro=portal). De betaling komt via de webhook binnen; even opnieuw kijken.
async function handleProReturn() {
  const p = new URLSearchParams(location.search).get('pro');
  if (!p || !currentUser) return;
  history.replaceState(null, '', location.pathname);
  if (p === 'success') {
    toast('Bedankt! Je abonnement wordt geactiveerd…');
    for (let i = 0; i < 8 && !isPro(); i++) {
      await new Promise(r => setTimeout(r, 2000));
      await loadPlanState();
    }
    toast(isPro() ? 'Welkom bij Savour Pro.' : 'Je betaling wordt nog verwerkt. Kijk zo nog even in Instellingen.');
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

function renderProPage(host) {
  if (!host) return;
  const pro = isPro();
  const card = (plan, price, per, note, primary) =>
    `<div class="pro-price${primary ? ' is-featured' : ''}">${primary ? '<span class="pro-badge">Voordeligst</span>' : ''}<h3>${plan === 'year' ? 'Jaarlijks' : 'Maandelijks'}</h3><div class="pro-amount"><strong>${price}</strong><span>${per}</span></div><p class="muted">${note}</p><button type="button" class="btn ${primary ? 'gold' : ''}" data-pro-choose onclick="choosePro('${plan}')">${pro ? 'Abonnement beheren' : plan === 'year' ? 'Kies jaarlijks' : 'Kies maandelijks'}</button></div>`;
  host.innerHTML =
    (pro
      ? `<div class="pro-current"><b>Je hebt Savour Pro.</b> <span>${savourPlan.used} van ${savourPlan.limit} AI-imports gebruikt deze maand.</span></div>`
      : '') +
    `<div class="pro-prices">${card('month', PRO_PRICES.month, 'per maand', 'Maandelijks opzegbaar.', false)}${card('year', PRO_PRICES.year, 'per jaar', 'Twee maanden gratis ten opzichte van maandelijks.', true)}</div>
    <p class="pro-pay muted">Betalen met iDEAL, creditcard, Apple Pay, Google Pay of PayPal. Prijzen inclusief btw. Opzeggen kan altijd; je houdt Pro tot het einde van de betaalde periode.</p>
    <h2>Wat zit erin?</h2>
    <table class="pro-compare">
      <thead><tr><th></th><th>Gratis</th><th>Pro</th></tr></thead>
      <tbody>
        <tr><td>Recepten, mappen, categorieën en zoeken</td><td>✓</td><td>✓</td></tr>
        <tr><td>Gedeelde mappen en samenwerken met je team</td><td>✓</td><td>✓</td></tr>
        <tr><td>Omrekenen, printen, kookmodus en delen</td><td>✓</td><td>✓</td></tr>
        <tr><td>Importeren van Word, PDF en tekst met de Savour-lezer</td><td>✓</td><td>✓</td></tr>
        <tr><td>AI leest foto's en handgeschreven recepten</td><td>–</td><td>✓</td></tr>
        <tr><td>AI leest gescande PDF's en rommelige documenten</td><td>–</td><td>✓</td></tr>
        <tr><td>AI-imports per maand</td><td>–</td><td>500</td></tr>
      </tbody>
    </table>
    <h2>Hoe werkt importeren?</h2>
    <p>Iedereen gebruikt de <strong>Savour-lezer</strong>: die leest Word, PDF en tekst met duidelijke kopjes (zoals “Ingrediënten” en “Bereiding”) direct en gratis in. Met <strong>Savour Pro</strong> leest daarnaast de AI wat de lezer niet kan: foto's, handgeschreven kladjes, gescande pagina's en documenten zonder duidelijke indeling. De AI verzint nooit hoeveelheden of stappen; je controleert elk recept voordat het wordt opgeslagen.</p>
    <h2>Vragen</h2>
    <p><strong>Wat telt als een AI-import?</strong><br>Elke foto, gescande pagina of elk bestand dat de AI leest. Een lang document telt per deel van ongeveer 8 recepten. Bestanden die de Savour-lezer zelf goed leest, tellen niet mee.</p>
    <p><strong>Wat als ik over de 500 heen ga?</strong><br>Dan leest de Savour-lezer verder en kun je de rest volgende maand met AI doen. Er komen nooit extra kosten bij.</p>
    <p><strong>Hoe zeg ik op?</strong><br>In Mijn account → Abonnement → Abonnement beheren. Daar wijzig je ook je betaalmethode en download je facturen.</p>`;
}

// ---- Abonnement in Instellingen ----

function renderPlanSettings() {
  const host = $('settingsPlan');
  if (!host) return;
  if (isPro()) {
    const until = formatProDate(savourPlan.periodEnd);
    const line =
      savourPlan.plan === 'gift'
        ? 'Savour Pro is voor jou kosteloos geactiveerd.'
        : savourPlan.cancelAtEnd
          ? `Opgezegd. Je houdt Pro tot ${until}.`
          : `${savourPlan.plan === 'year' ? 'Jaarabonnement' : 'Maandabonnement'} · verlengt op ${until}`;
    host.innerHTML = `<div class="plan-row"><div><b>Savour Pro</b><small>${esc(line)}</small><small>${savourPlan.used} van ${savourPlan.limit} AI-imports gebruikt deze maand.</small></div>${savourPlan.hasCustomer ? '<button class="btn" onclick="openProPortal()">Abonnement beheren</button>' : ''}</div>`;
  } else {
    host.innerHTML = `<div class="plan-row"><div><b>Gratis</b><small>Alles van Savour, met de Savour-lezer voor Word, PDF en tekst. AI-import (foto's, handgeschreven en gescande recepten) zit in Savour Pro.</small></div><button class="btn gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button></div>`;
  }
}

// ---- Melding bovenaan het importscherm ----

function renderImportPlanNotice() {
  const host = $('importPlanNotice');
  if (!host) return;
  host.innerHTML = isPro()
    ? `<div class="import-plan is-pro"><b>Savour Pro</b><span>${savourPlan.used} van ${savourPlan.limit} AI-imports gebruikt deze maand. Bestanden die de Savour-lezer zelf goed leest, tellen niet mee.</span></div>`
    : `<div class="import-plan"><b>Je importeert met de Savour-lezer</b><span>Word, PDF en tekst met duidelijke kopjes (“Ingrediënten”, “Bereiding”) worden direct en gratis ingelezen. Foto's, handgeschreven en gescande recepten leest de AI: alleen in Savour Pro.</span><button class="btn small gold" onclick="openPublicInfo('pro')">Bekijk Savour Pro</button></div>`;
  document.querySelectorAll('[data-pro-only]').forEach(el => el.classList.toggle('is-locked', !isPro()));
}

// Melding wanneer een gratis gebruiker iets kiest dat alleen met AI kan (foto, gescande PDF).
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
