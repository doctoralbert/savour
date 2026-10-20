// Inloggen, account aanmaken, wachtwoord vergeten en uitloggen.

function openAuth(mode) {
  authMode = mode;
  $('authModal').classList.add('open');
  $('authFirstName').value = '';
  $('authLastName').value = '';
  $('authEmail').value = '';
  $('authPassword').value = '';
  $('authNameField').style.display = mode === 'signup' ? 'grid' : 'none';
  $('authTitle').textContent = mode === 'signup' ? t('Account aanmaken') : t('Inloggen');
  $('authIntro').textContent =
    mode === 'signup'
      ? t('Maak een account aan om je persoonlijke receptenbibliotheek te openen.')
      : t('Log in om je persoonlijke receptenbibliotheek te openen.');
  $('authSubmit').textContent = mode === 'signup' ? t('Account aanmaken') : t('Inloggen');
  $('authEmailField').style.marginTop = mode === 'signup' ? '10px' : '0';
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
  try {
    if (authMode === 'signup') {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        data: { name, function_title: 'Chef-kok' }
      });
      if (error) throw error;
      closeAuth();
      if (data.session) {
        const ok = await startDatabaseSession(data.user);
        if (ok) toast(authWelcome(account.name || name || data.user.email));
      } else toast(t('Account aangemaakt — controleer je e-mail om te bevestigen'));
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
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

function logout() {
  if (demoMode) {
    demoMode = false;
    document.getElementById('demoBadge')?.remove();
    currentUser = null;
    recipes = [];
    folders = [];
    favorites = [];
    categories = [];
    sharedMaps = [];
    showLanding();
    return;
  }
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

function readAuthRedirect() {
  const hash = location.hash.startsWith('#') ? location.hash.slice(1) : '';
  if (!hash) return null;
  const p = new URLSearchParams(hash);
  if (p.get('error') || p.get('error_code')) return { error: p.get('error_description') || p.get('error') };
  const access_token = p.get('access_token'),
    refresh_token = p.get('refresh_token');
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token, type: p.get('type') || '' };
}

// Geeft true terug als de link is afgehandeld; anders gaat het opstarten gewoon verder.
async function handleAuthRedirect(redirect) {
  // De inloggegevens direct uit de adresbalk halen, zodat ze niet in de geschiedenis blijven staan.
  history.replaceState(null, '', location.pathname + location.search);
  if (redirect.error) {
    console.warn('Link uit e-mail niet geldig:', redirect.error);
    toast(t('Deze link is ongeldig of verlopen. Vraag een nieuwe aan.'));
    return false;
  }
  const { data, error } = await supabaseClient.auth.setSession({
    access_token: redirect.access_token,
    refresh_token: redirect.refresh_token
  });
  if (error || !data?.session?.user) {
    console.error('Sessie uit e-maillink mislukt:', error);
    toast(t('Deze link is ongeldig of verlopen. Vraag een nieuwe aan.'));
    return false;
  }
  if (redirect.type === 'recovery') {
    const ok = await startDatabaseSession(data.session.user);
    if (ok) {
      go('settings');
      toast(t('Kies hieronder een nieuw wachtwoord'));
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
