// Inloggen, account aanmaken, wachtwoord vergeten en uitloggen.

function openAuth(mode) {
  authMode = mode;
  // Het venster volgt het thema van de website (licht of donker), want het opent boven de publieke pagina's.
  $('authModal').classList.toggle('savour-light', document.documentElement.classList.contains('site-light'));
  $('authModal').classList.add('open');
  $('authFirstName').value = '';
  $('authLastName').value = '';
  // Bij inloggen niets leegmaken: de wachtwoordbeheerder van de browser kan de velden al hebben ingevuld.
  if (mode === 'signup') {
    $('authEmail').value = '';
    $('authPassword').value = '';
  }
  $('authNameField').style.display = mode === 'signup' ? 'grid' : 'none';
  $('authTitle').textContent = mode === 'signup' ? t('Account aanmaken') : t('Inloggen');
  $('authIntro').textContent =
    mode === 'signup' && invitedBy()
      ? t('Je bent uitgenodigd door een collega. Maak een account aan en probeer Savour Pro 7 dagen gratis.')
      : mode === 'signup'
        ? t('Maak een account aan om je persoonlijke receptenbibliotheek te openen.')
        : t('Log in om je persoonlijke receptenbibliotheek te openen.');
  $('authSubmit').textContent = mode === 'signup' ? t('Account aanmaken') : t('Inloggen');
  $('authEmailField').style.marginTop = mode === 'signup' ? '10px' : '0';
  $('authPassword').autocomplete = mode === 'signup' ? 'new-password' : 'current-password';
  // Vinkjes zoals de vorige keer; bij inloggen het onthouden e-mailadres en, als de browser het mag, het wachtwoord.
  // Bij account aanmaken geen vinkjes: een nieuw account blijft ingelogd en de browser mag het wachtwoord bewaren.
  const checks = document.querySelector('#authForm .auth-checks');
  if (checks) checks.style.display = mode === 'signup' ? 'none' : '';
  $('authStay').checked = mode === 'signup' || staySignedIn();
  $('authRemember').checked = mode === 'signup' || rememberPassword();
  if (mode === 'login') fillRememberedLogin();
  // Onder het formulier: wisselen tussen inloggen en account maken.
  if ($('authSwitch'))
    $('authSwitch').textContent = mode === 'signup' ? t('Ik heb al een account') : t('Account aanmaken');
  renderOauthButtons();
}

// Van inloggen naar account maken en terug; een al ingevuld e-mailadres blijft staan.
function switchAuthMode() {
  const email = $('authEmail').value;
  openAuth(authMode === 'signup' ? 'login' : 'signup');
  if (email && !$('authEmail').value) $('authEmail').value = email;
}

const REMEMBER_PASSWORD_KEY = 'savour_remember_password';
const LAST_EMAIL_KEY = 'savour_last_email';

function rememberPassword() {
  try {
    return localStorage.getItem(REMEMBER_PASSWORD_KEY) !== '0';
  } catch (_) {
    return true;
  }
}

// Het wachtwoord bewaart Savour nooit zelf: dat doet de wachtwoordbeheerder van de browser (veilig versleuteld).
// Savour onthoudt alleen het e-mailadres, en vraagt de browser om het bewaarde wachtwoord in te vullen.
async function fillRememberedLogin() {
  if (!rememberPassword()) return;
  let email = '';
  try {
    email = localStorage.getItem(LAST_EMAIL_KEY) || '';
    if (email && !$('authEmail').value) $('authEmail').value = email;
  } catch (_) {}
  // Chrome, Edge en Android: het bewaarde wachtwoord direct opvragen.
  if (window.PasswordCredential && navigator.credentials?.get) {
    try {
      const cred = await navigator.credentials.get({ password: true, mediation: 'optional' });
      if (cred?.password && $('authModal').classList.contains('open') && authMode === 'login') {
        $('authEmail').value = cred.id;
        $('authPassword').value = cred.password;
        $('authSubmit').focus();
        return;
      }
    } catch (_) {}
  }
  // Anders (o.a. Safari en iPhone): het juiste veld aantikken, dan toont de browser zijn bewaarde wachtwoord.
  setTimeout(() => {
    if (!$('authModal').classList.contains('open') || authMode !== 'login') return;
    ($('authEmail').value ? $('authPassword') : $('authEmail')).focus();
  }, 150);
}

async function saveLoginChoices(email, password, name) {
  const remember = $('authRemember').checked;
  try {
    localStorage.setItem(REMEMBER_PASSWORD_KEY, remember ? '1' : '0');
    if (remember) localStorage.setItem(LAST_EMAIL_KEY, email);
    else localStorage.removeItem(LAST_EMAIL_KEY);
  } catch (_) {}
  if (!remember) return;
  // Telefoons (Safari op iPhone, Chrome op Android) bieden "Wachtwoord bewaren?" pas aan na een navigatie na
  // het inloggen. Savour wisselt niet van pagina, dus hier een navigatie op dezelfde pagina (zelfde adres).
  try {
    history.pushState(history.state, '', location.href);
  } catch (_) {}
  if (!window.PasswordCredential || !navigator.credentials?.store) return;
  try {
    await navigator.credentials.store(new PasswordCredential({ id: email, password, name: name || email }));
  } catch (_) {}
}

function closeAuth() {
  $('authModal').classList.remove('open');
}

async function forgotPassword() {
  const email = $('authEmail').value.trim();
  if (!email) {
    toast(t('Vul eerst je e-mailadres in'));
    return;
  }
  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: location.origin + '/' });
    if (error) throw error;
    toast(t('Controleer je e-mail voor een link om je wachtwoord opnieuw in te stellen'));
  } catch (e) {
    console.error(e);
    toast(e.message || t('Wachtwoord herstellen is mislukt'));
  }
}

function authWelcome(name) {
  const n = name || 'bij Savour';
  return 'nl' === 'en' ? `Welcome ${n}` : `Welkom ${n}`;
}

async function submitAuth() {
  const email = $('authEmail').value.trim();
  const password = $('authPassword').value;
  const first = $('authFirstName')?.value.trim() || '';
  const last = $('authLastName')?.value.trim() || '';
  const name = [first, last].filter(Boolean).join(' ');
  if (!email || !password) {
    toast(t('Vul e-mailadres en wachtwoord in'));
    return;
  }
  if (authMode === 'signup' && (!first || !last)) {
    toast(t('Vul voornaam en achternaam in'));
    return;
  }
  $('authSubmit').disabled = true;
  $('authSubmit').textContent = 'Bezig...';
  // Voor het inloggen vastleggen, zodat de sessie meteen op de goede plek wordt bewaard (zie js/core/config.js).
  try {
    localStorage.setItem(STAY_SIGNED_IN_KEY, $('authStay').checked ? '1' : '0');
  } catch (_) {}
  try {
    if (authMode === 'signup') {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        // Via de link van een collega? Dan staat dat bij het account (cadeau: js/features/referral.js).
        data: invitedBy() ? { name, invited_by: invitedBy() } : { name }
      });
      if (error) throw error;
      // Bestaat het e-mailadres al, dan stuurt Supabase géén mail en meldt het (om privacyredenen) toch "gelukt",
      // met een lege lijst identities. Dan duidelijk zeggen wat er aan de hand is.
      if (data.user && Array.isArray(data.user.identities) && !data.user.identities.length) {
        await askConfirm(
          `${t('Dit e-mailadres heeft al een account')}\n\n${t('Er is geen nieuwe bevestigingsmail verstuurd. Log in met dit e-mailadres, of kies "Wachtwoord vergeten?" als je het wachtwoord niet meer weet.')}`,
          { confirmLabel: t('Inloggen') }
        ).then(login => login && openAuth('login'));
        return;
      }
      // Nieuw account: de server controleert dat het echt bestaat en mailt contact@savour.page.
      fetch('/api/bug-report', {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'signup', email, language: currentLanguage })
      }).catch(() => {});
      saveLoginChoices(email, password, name);
      closeAuth();
      if (data.session) {
        const ok = await startDatabaseSession(data.user);
        if (ok) toast(authWelcome(account.name || name || data.user.email));
      } else toast(t('Account aangemaakt — controleer je e-mail om te bevestigen'));
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      saveLoginChoices(email, password, data.user?.user_metadata?.name);
      closeAuth();
      const ok = await startDatabaseSession(data.user);
      if (ok) toast(authWelcome(account.name || data.user.user_metadata?.name || email));
    }
  } catch (e) {
    const raw = e.message || '';
    // Gewone situaties bij inloggen zijn geen fout in de app: niet in het foutenlogboek, wel een duidelijke uitleg.
    if (/email not confirmed/i.test(raw)) {
      console.warn('Inloggen: e-mailadres nog niet bevestigd');
      const again = await askConfirm(
        `${t('Bevestig eerst je e-mailadres')}\n\n${t('We hebben je een e-mail gestuurd met een link om je account te bevestigen. Kijk ook in je spam. Geen mail gekregen? Dan sturen we een nieuwe.')}`,
        { confirmLabel: t('Nieuwe bevestigingsmail sturen') }
      );
      if (again) {
        const { error } = await supabaseClient.auth.resend({ type: 'signup', email });
        toast(
          error
            ? /rate limit/i.test(error.message || '')
              ? t('Er zijn tijdelijk te veel e-mails aangevraagd. Probeer het later opnieuw.')
              : t('De bevestigingsmail kon niet worden verstuurd. Probeer het later opnieuw.')
            : t('Nieuwe bevestigingsmail verstuurd. Kijk ook in je spam.')
        );
      }
      return;
    }
    let msg = raw || t('Inloggen is mislukt');
    if (/invalid login credentials/i.test(raw)) {
      console.warn('Inloggen: onjuist e-mailadres of wachtwoord');
      msg = t('E-mailadres of wachtwoord klopt niet.');
    } else if (/user already registered/i.test(raw)) {
      console.warn('Aanmelden: e-mailadres bestaat al');
      msg = t('Dit e-mailadres heeft al een account. Log in of kies "Wachtwoord vergeten?".');
    } else if (/rate limit|email rate limit/i.test(raw)) {
      console.warn('Aanmelden: te veel e-mails');
      msg = t('Er zijn tijdelijk te veel registratie-e-mails aangevraagd. Probeer het later opnieuw.');
    } else console.error(e);
    toast(msg);
  } finally {
    $('authSubmit').disabled = false;
    $('authSubmit').textContent = authMode === 'signup' ? 'Account aanmaken' : 'Inloggen';
  }
}

// Accountactiviteit voor /admin (supabase/2026-11-10-accountactiviteit.sql): alleen het soort apparaat
// (telefoon, tablet of computer) en de tijd. Bij het openen, en daarna hooguit eens per 4 minuten zolang
// Savour in beeld is. Niet in de demo, niet offline en niet bij lokaal testen.
let lastActivityTouch = 0;
function accountDeviceType() {
  const ua = navigator.userAgent || '';
  // iPad op iPadOS doet zich voor als Mac, maar heeft een aanraakscherm.
  if (
    /iPad|Tablet/i.test(ua) ||
    (/Android/i.test(ua) && !/Mobi/i.test(ua)) ||
    (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)
  )
    return 'tablet';
  if (/Mobi|iPhone|iPod|Android/i.test(ua)) return 'telefoon';
  return 'computer';
}
async function touchAccountActivity(force = false) {
  if (!currentUser || demoMode || !navigator.onLine || document.visibilityState === 'hidden') return;
  if (/^(localhost|127\.)/.test(location.hostname)) return;
  if (!force && Date.now() - lastActivityTouch < 4 * 60000) return;
  lastActivityTouch = Date.now();
  try {
    await supabaseClient.rpc('savour_touch_activity', { _device: accountDeviceType() });
  } catch (_) {
    // Geen activiteit kunnen melden is geen probleem voor de gebruiker.
  }
}

// Eén optionele vraag voor nieuwe accounts: hoe vond je Savour? Een website kan niet altijd zien waar iemand
// vandaan komt (apps en mail geven niets door); zelf aangeven is het betrouwbaarst. Eén keer, kort na het openen
// van de app, alleen voor accounts van hooguit 30 dagen oud, nooit over een ander venster heen. Annuleren =
// overslaan, en dan vragen we het niet opnieuw. De server bewaart alleen het gekozen antwoord (api/admin.js).
const SIGNUP_SOURCE_CHOICES = [
  ['google', 'Google of een andere zoekmachine'],
  ['ai', 'ChatGPT of een andere AI'],
  ['social', 'Instagram, Facebook of TikTok'],
  ['linkedin', 'LinkedIn'],
  ['collega', 'Via een collega of vriend'],
  ['forum', 'Reddit of een forum'],
  ['anders', 'Anders']
];
async function askSignupSource() {
  if (!currentUser || demoMode || /^(localhost|127\.)/.test(location.hostname)) return;
  const created = Date.parse(currentUser.created_at || '');
  if (!created || Date.now() - created > 30 * 86400000 || currentUser.app_metadata?.signup_answer) return;
  const askedKey = 'savour_source_asked_' + currentUser.id;
  try {
    if (localStorage.getItem(askedKey)) return;
  } catch (_) {
    return;
  }
  const userId = currentUser.id;
  await new Promise(resolve => setTimeout(resolve, 8000));
  // Intussen uitgelogd, iets anders open (venster, menu, kookmodus) of niet in beeld: een volgende keer.
  if (
    currentUser?.id !== userId ||
    demoMode ||
    document.visibilityState === 'hidden' ||
    document.querySelector('.modal.open') ||
    document.body.classList.contains('cook-mode') ||
    document.body.classList.contains('mobile-menu-open')
  )
    return;
  try {
    localStorage.setItem(askedKey, '1');
  } catch (_) {}
  // Echt maar één keer per account, ook op een ander apparaat: eerst bij de server kijken of de vraag al eens is
  // getoond (een sessie op een ander apparaat kan een oude stand hebben), en meteen vastleggen dat hij nu getoond wordt.
  const fresh = (await supabaseClient.auth.getUser().catch(() => null))?.data?.user;
  if (!fresh || fresh.app_metadata?.signup_answer) return;
  if (!(await sendSignupAnswer({ answer: 'getoond' }))) return;
  const answer = await askChoice(
    `${t('Hoe heb je Savour gevonden?')}\n\n${t('Eén vraag, je mag hem overslaan. Zo weten we waar koks Savour vinden.')}`,
    SIGNUP_SOURCE_CHOICES.map(([value, label]) => ({ value, label: t(label) }))
  );
  // Anders: zelf invullen (mag leeg blijven).
  let other = '';
  if (answer === 'anders')
    other = ((await askText(t('Waar heb je Savour gevonden?'), '', { confirmLabel: t('Versturen') })) || '').trim();
  await sendSignupAnswer({ answer: answer || 'overgeslagen', other: other.slice(0, 100) });
}

// Antwoord op de herkomstvraag naar de server (api/admin.js, actie herkomst_antwoord). Geeft true als het lukte.
async function sendSignupAnswer(body) {
  try {
    const token = (await supabaseClient.auth.getSession()).data?.session?.access_token;
    if (!token) return false;
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action: 'herkomst_antwoord', ...body })
    });
    return response.ok;
  } catch (_) {
    // Alleen voor de cijfers; mislukt het, dan merkt de gebruiker daar niets van.
    return false;
  }
}

// Sessie verlopen in de app (de server weigert het token en verversen lukt niet): niet doorwerken met een
// sessie die niets meer kan opslaan. Lokaal uitloggen (de bewaarde gegevens op de server blijven staan),
// naar de homepage, en het inlogvenster met een duidelijke melding.
let appSessionExpiring = false;
async function appSessionExpired() {
  if (appSessionExpiring || demoMode || !currentUser) return;
  appSessionExpiring = true;
  try {
    await supabaseClient.auth.signOut({ scope: 'local' }).catch(() => null);
    clearSessionState();
    $('appShell').style.display = 'none';
    showLanding();
    openAuth('login');
    $('authIntro').textContent = t('Je sessie is verlopen. Log opnieuw in om verder te gaan.');
  } finally {
    appSessionExpiring = false;
  }
}

// Herkomst van het account voor /admin (api/admin.js, accountSource): één keer per account per browser de
// anonieme bezoekers-id meesturen. De server bewaart alleen het label (bijv. "Google"), niet de bezoeken.
async function sendAccountSource() {
  if (!currentUser || demoMode || !navigator.onLine || /^(localhost|127\.)/.test(location.hostname)) return;
  try {
    const visitor = localStorage.getItem('savour_visit_id');
    const doneKey = 'savour_source_sent_' + currentUser.id;
    if (!visitor || localStorage.getItem(doneKey)) return;
    const token = (await supabaseClient.auth.getSession()).data?.session?.access_token;
    if (!token) return;
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action: 'herkomst', visitor })
    });
    const result = await response.json().catch(() => ({}));
    // Vastgelegd (of al bekend): niet opnieuw sturen. Niets gevonden in deze browser: ook klaar voor deze browser.
    if (result?.ok) localStorage.setItem(doneKey, '1');
  } catch (_) {
    // Herkomst is alleen voor de cijfers; mislukt het, dan merkt de gebruiker daar niets van.
  }
}

// Na uitloggen (ook uit de demo) niets van het vorige account laten staan: geen gegevens, geen mappen in
// het menu en geen Admin-knop. Anders zie je in de demo of in een ander account de mappen van de vorige.
function clearSessionState() {
  demoMode = false;
  document.getElementById('demoBadge')?.remove();
  currentUser = null;
  recipes = [];
  folders = [];
  favorites = [];
  categories = [];
  sharedMaps = [];
  sharedRecipes = [];
  ['categoryNav', 'sharedNav'].forEach(id => {
    if ($(id)) $(id).innerHTML = '';
  });
  [$('navAdmin'), $('settingsAdmin')].filter(Boolean).forEach(el => (el.style.display = 'none'));
  setAdminLink(false);
}

function logout() {
  if (demoMode) {
    clearSessionState();
    showLanding();
    return;
  }
  clearOfflineSnapshot();
  supabaseClient.auth.signOut();
}

function showLanding() {
  if (demoMode) {
    demoMode = false;
    document.getElementById('demoBadge')?.remove();
  }
  // Publieke pagina's zijn altijd donker.
  document.body.classList.remove('savour-light');
  $('appShell').style.display = 'none';
  $('landingView').style.display = 'block';
  $('publicInfoShell').style.display = 'none';
  $('publicRecipeShell').style.display = 'none';
  $('publicInviteShell').style.display = 'none';
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
}

// ---- Inloggen of account maken met Google ----
// De knop verschijnt alleen als Google in Supabase aan staat (Authentication → Providers), zodat niemand op
// een knop drukt die nog niet werkt. Supabase stuurt de gebruiker daarna terug met de inloggegevens achter het
// #-teken; handleAuthRedirect hieronder herkent dat aan de bewaarde OAUTH_KEY.
const OAUTH_KEY = 'savour_oauth';
const OAUTH_NAMES = { google: 'Google' };
let oauthProviders = null;

async function loadOauthProviders() {
  if (oauthProviders) return oauthProviders;
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_KEY } });
    const external = (await response.json())?.external || {};
    oauthProviders = Object.keys(OAUTH_NAMES).filter(p => external[p] === true);
    return oauthProviders;
  } catch (_) {
    return [];
  }
}

async function renderOauthButtons() {
  const box = $('authOauth');
  if (!box) return;
  const providers = await loadOauthProviders();
  box.querySelectorAll('[data-provider]').forEach(btn => {
    btn.hidden = !providers.includes(btn.dataset.provider);
    btn.disabled = false;
  });
  box.hidden = !providers.length;
}

async function oauthLogin(provider) {
  if (!OAUTH_NAMES[provider]) return;
  document.querySelectorAll('#authOauth [data-provider]').forEach(btn => (btn.disabled = true));
  try {
    // Bij account maken staan de vinkjes verborgen en aan; bij inloggen telt "Ingelogd blijven" zoals gekozen.
    localStorage.setItem(STAY_SIGNED_IN_KEY, $('authStay').checked ? '1' : '0');
    localStorage.setItem(OAUTH_KEY, JSON.stringify({ provider, at: Date.now() }));
  } catch (_) {}
  // Terug naar dezelfde pagina (bijv. /join/... of /pro), zonder ?auth=..., zodat het venster niet opnieuw opent.
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}${location.pathname}`,
      queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined
    }
  });
  if (error) {
    console.error('Inloggen met', provider, 'mislukt:', error);
    takeOauthPending();
    renderOauthButtons();
    toast(t('Inloggen is mislukt. Probeer het opnieuw of gebruik je e-mailadres.'));
  }
}

// Leest (en wist) de bewaarde aanvraag; alleen geldig als die recent is.
function takeOauthPending() {
  try {
    const saved = JSON.parse(localStorage.getItem(OAUTH_KEY) || 'null');
    localStorage.removeItem(OAUTH_KEY);
    if (OAUTH_NAMES[saved?.provider] && Date.now() - Number(saved.at || 0) < 30 * 60 * 1000) return saved.provider;
  } catch (_) {}
  return '';
}

// Na Google: nieuw account? Dan naam, uitnodiging van een collega en de melding aan contact@savour.page,
// net als bij een account met e-mailadres.
async function finishOauthLogin(user) {
  const meta = user.user_metadata || {};
  const isNew = Date.now() - new Date(user.created_at).getTime() < 15 * 60 * 1000;
  const updates = {};
  const name = String(meta.name || meta.full_name || '').trim();
  if (!meta.name && name) updates.name = name;
  if (isNew && invitedBy() && !meta.invited_by) updates.invited_by = invitedBy();
  if (Object.keys(updates).length) {
    const { data, error } = await supabaseClient.auth.updateUser({ data: updates });
    if (error) console.error('Accountgegevens na inloggen niet bewaard:', error);
    else if (data?.user) user = data.user;
  }
  if (isNew)
    fetch('/api/bug-report', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'signup', email: user.email, language: currentLanguage })
    }).catch(() => {});
  const ok = await startDatabaseSession(user);
  if (ok) toast(authWelcome(account.name || user.email));
  return true;
}

// ---- Links uit e-mails (account bevestigen, wachtwoord herstellen) ----
// Supabase stuurt de gebruiker terug met inloggegevens achter het #-teken in de link.
// De Supabase-client leest die niet automatisch (detectSessionInUrl staat uit), dus dat doet Savour hier zelf.

// Nieuwe mails (docs/supabase-*.html) linken naar savour.page/?token_hash=...&type=...: de code wordt pas gebruikt
// als de gebruiker op "Doorgaan" klikt. Mailprogramma's die links vooraf openen om te controleren op virussen
// (Outlook, Hotmail, bedrijfsmail) verbruiken de link dan niet meer, waardoor hij "verlopen" leek.
const AUTH_LINK_TYPES = ['recovery', 'email', 'signup', 'invite', 'magiclink', 'email_change'];

function readAuthRedirect() {
  const q = new URLSearchParams(location.search);
  const tokenHash = q.get('token_hash');
  if (tokenHash && AUTH_LINK_TYPES.includes(q.get('type'))) return { tokenHash, type: q.get('type') };
  const hash = location.hash.startsWith('#') ? location.hash.slice(1) : '';
  if (!hash) return null;
  const p = new URLSearchParams(hash);
  if (p.get('error') || p.get('error_code'))
    return { error: p.get('error_description') || p.get('error'), code: p.get('error_code') || '' };
  const access_token = p.get('access_token'),
    refresh_token = p.get('refresh_token');
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token, type: p.get('type') || '' };
}

// Geeft true terug als de link is afgehandeld; anders gaat het opstarten gewoon verder.
async function handleAuthRedirect(redirect) {
  // De inloggegevens direct uit de adresbalk halen, zodat ze niet in de geschiedenis blijven staan.
  history.replaceState(null, '', location.pathname);
  // Het opstartscherm weg, zodat de vraag hieronder zichtbaar is (met de startpagina erachter).
  document.body.classList.remove('auth-booting');
  showLanding();
  // Terug van Google (en niet uit een e-maillink)?
  const oauth = redirect.tokenHash ? '' : takeOauthPending();
  if (redirect.error && oauth) {
    console.warn('Inloggen met', oauth, 'niet gelukt:', redirect.code, redirect.error);
    // Zelf afgebroken: gewoon terug naar het inlogvenster, zonder foutmelding.
    if (!/access_denied|cancel/i.test(`${redirect.code} ${redirect.error}`))
      toast(t('Inloggen is mislukt. Probeer het opnieuw of gebruik je e-mailadres.'));
    openAuth('login');
    return false;
  }
  if (redirect.error) {
    console.warn('Link uit e-mail niet geldig:', redirect.code, redirect.error);
    await askConfirm(
      `${t('Deze link werkt niet meer')}\n\n${t('Een link uit een e-mail werkt één keer en maar een uur. Vroeg je meerdere keren een nieuwe aan, dan werkt alleen de nieuwste. Vraag hieronder een nieuwe link aan en gebruik de nieuwste mail.')}`,
      { confirmLabel: t('Nieuwe link aanvragen') }
    ).then(again => again && openAuth('login'));
    return false;
  }
  let result;
  if (redirect.tokenHash) {
    // Pas na een klik: zo kan een virusscanner van de mail de link niet vooraf verbruiken.
    const proceed = await askConfirm(
      redirect.type === 'recovery'
        ? `${t('Nieuw wachtwoord instellen')}\n\n${t('Klik op Doorgaan om een nieuw wachtwoord voor je Savour-account te kiezen.')}`
        : `${t('Welkom bij Savour')}\n\n${t('Klik op Doorgaan om je account te bevestigen en in te loggen.')}`,
      { confirmLabel: t('Doorgaan') }
    );
    if (!proceed) return false;
    result = await supabaseClient.auth.verifyOtp({ token_hash: redirect.tokenHash, type: redirect.type });
    if (result.error) {
      return handleAuthRedirect({ error: result.error.message, code: result.error.code || 'otp' });
    }
  } else {
    result = await supabaseClient.auth.setSession({
      access_token: redirect.access_token,
      refresh_token: redirect.refresh_token
    });
  }
  const { data, error } = result;
  if (error || !data?.session?.user) {
    console.error('Sessie uit e-maillink mislukt:', error);
    toast(t('Deze link is ongeldig of verlopen. Vraag een nieuwe aan.'));
    return false;
  }
  if (oauth && !redirect.type) return finishOauthLogin(data.session.user);
  // Wachtwoord vergeten, of een account dat de beheerder heeft aangemaakt (uitnodiging): eerst een wachtwoord kiezen.
  if (redirect.type === 'recovery' || redirect.type === 'invite') {
    const ok = await startDatabaseSession(data.session.user);
    if (ok) {
      settingsTab = 'account';
      go('settings');
      toast(
        redirect.type === 'invite'
          ? t('Welkom bij Savour. Kies hieronder je wachtwoord')
          : t('Kies hieronder een nieuw wachtwoord')
      );
      $('accountPassword')?.focus();
    }
    return true;
  }
  showActivation(data.session.user);
  return true;
}

// Welkomstscherm na het bevestigen van het e-mailadres.
function showActivation(user) {
  window.__activationUser = user;
  ['landingView', 'appShell', 'publicInfoShell', 'publicRecipeShell', 'publicInviteShell'].forEach(id => {
    if ($(id)) $(id).style.display = 'none';
  });
  const first = String(user?.user_metadata?.name || '')
    .trim()
    .split(/\s+/)[0];
  $('activationTitle').textContent = first ? `Welkom bij Savour, ${first}.` : 'Welkom bij Savour.';
  $('activationShell').style.display = 'flex';
}

async function continueFromActivation() {
  const btn = $('activationContinue');
  if (btn) btn.disabled = true;
  const user = window.__activationUser || (await supabaseClient.auth.getUser()).data?.user;
  $('activationShell').style.display = 'none';
  if (btn) btn.disabled = false;
  if (!user) {
    showLanding();
    return;
  }
  await startDatabaseSession(user);
}
