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
  $('appShell').style.display = 'none';
  $('landingView').style.display = 'block';
  $('publicInfoShell').style.display = 'none';
  $('publicRecipeShell').style.display = 'none';
  $('publicInviteShell').style.display = 'none';
  document.querySelectorAll('#appShell .view').forEach(v => v.classList.remove('active'));
}
