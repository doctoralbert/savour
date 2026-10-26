// Inloggen, account aanmaken, wachtwoord vergeten en uitloggen.

function openAuth(mode) {
  authMode = mode;
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
    console.error(e);
    let msg = e.message || t('Inloggen is mislukt');
    if (/rate limit|email rate limit/i.test(msg))
      msg = t('Er zijn tijdelijk te veel registratie-e-mails aangevraagd. Probeer het later opnieuw.');
    toast(msg);
  } finally {
    $('authSubmit').disabled = false;
    $('authSubmit').textContent = authMode === 'signup' ? 'Account aanmaken' : 'Inloggen';
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
