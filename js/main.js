// Opstarten van Savour. Dit bestand wordt als laatste geladen, zodat alle functies al bestaan.

// Taal: Nederlands, tenzij de gebruiker met de taalknop iets anders koos. Het thema kiest de gebruiker in Instellingen.
setLanguage(getSavedLanguage());
applyTheme(currentTheme());

setupCropControls();
setupImportDropZone();

// Bezoek anoniem tellen (willekeurige code in de browser, geen IP-adres) voor de cijfers op /admin.
if (!IS_ADMIN_PATH) logSavourVisit();

// Beheeromgeving op /admin.
if (IS_ADMIN_PATH) {
  setTimeout(async () => {
    adminRenderLogin();
    const {
      data: { session }
    } = await supabaseClient.auth.getSession();
    // Al ingelogd in de app als beheerder: meteen het dashboard, zonder opnieuw inloggen. De server controleert
    // bij elke beheeractie zelf of dit account beheerder is (ADMIN_EMAILS in api/admin.js).
    if (session && (await adminIsAllowed())) adminShowDashboard(session.user);
  }, 0);
}

// Een open "⋯"-menu of taalmenu sluit bij een klik ernaast of na het kiezen van een actie.
document.addEventListener('click', e => {
  document.querySelectorAll('details.rp-more[open], details.lang-menu[open]').forEach(d => {
    if (!d.contains(e.target) || e.target.closest('.rp-menu button, .lang-options button')) d.open = false;
  });
});

// Escape sluit de kookmodus.
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.body.classList.contains('cook-mode')) toggleCookMode(false);
});

// Terug/vooruit in de browser: de actieve weergave opnieuw tekenen.
window.addEventListener('popstate', () => {
  const active = document.querySelector('#appShell .view.active')?.id;
  if (currentUser && active) renderActiveView(active);
});

// Zodra de pagina is opgebouwd: linklijst op publieke pagina's, alfabetbalken en zijbalkmenu's tekenen.
document.addEventListener('DOMContentLoaded', ensurePublicFooter);
setTimeout(ensurePublicFooter, 300);
document.addEventListener('DOMContentLoaded', () => {
  drawAlphabet('recipeAlphabet', 'library');
  drawAlphabet('favoriteAlphabet', 'favorite');
});
document.addEventListener('DOMContentLoaded', () =>
  setTimeout(() => {
    try {
      renderCategoryNav();
      renderSharedNav();
    } catch (e) {
      console.error(e);
    }
  }, 50)
);

// Openbare links: /r/<slug> toont een gedeeld recept, /join/<sleutel> een uitnodiging voor een gedeelde map.
const publicRecipeMatch = location.pathname.match(/^\/r\/([^/]+)\/?$/);
const publicInviteMatch = location.pathname.match(/^\/join\/([^/]+)\/?$/);
if (publicRecipeMatch) window.__publicRecipeRoute = decodeURIComponent(publicRecipeMatch[1]);
if (publicInviteMatch) window.__publicInviteRoute = decodeURIComponent(publicInviteMatch[1]);
// /pro opent de pagina Savour Pro (ingelogd in de app, anders publiek).
window.__proRoute = /^\/pro\/?$/.test(location.pathname);
// ?info=contact (of about, faq, ...) opent die informatiepagina; gebruikt door de losse pagina's van tools/build-seo.mjs.
window.__infoRoute = new URLSearchParams(location.search).get('info');
if (!PUBLIC_PAGE_LABELS[window.__infoRoute]) window.__infoRoute = null;
// ?auth=login / ?auth=signup en ?demo=1: knoppen op de losse pagina's van de website (tools/build-seo.mjs).
window.__authRoute = ['login', 'signup'].includes(new URLSearchParams(location.search).get('auth'))
  ? new URLSearchParams(location.search).get('auth')
  : null;
window.__demoRoute = new URLSearchParams(location.search).get('demo') === '1';
// ?team=1: link uit de bedankmail na een teamaankoop; na inloggen meteen naar het teamblok.
window.__teamRoute = new URLSearchParams(location.search).get('team') === '1';
// ?collega=<id>: uitnodiging van een collega (js/features/referral.js). Niet ingelogd? Dan meteen 'Account aanmaken'.
if (new URLSearchParams(location.search).get('collega')) {
  rememberReferral(new URLSearchParams(location.search).get('collega'));
  if (invitedBy() && !window.__authRoute) window.__authRoute = 'signup';
}

// Bestaande sessie herstellen, of de landingspagina tonen.
(async () => {
  try {
    if (window.__publicRecipeRoute) {
      // Niet ingelogd: de openbare receptpagina. Wel ingelogd: gewoon de app, en daarna het recept (alleen-lezen).
      const { data: existing } = await supabaseClient.auth.getSession();
      if (!existing?.session?.user) {
        document.body.classList.remove('auth-booting');
        await openPublicRecipeBySlug(window.__publicRecipeRoute);
        return;
      }
    }
    if (window.__publicInviteRoute) {
      // Uitnodiging onthouden. Al ingelogd? Dan gewoon doorgaan: na het laden wordt de gebruiker lid.
      rememberInvite(window.__publicInviteRoute);
      const { data: existing } = await supabaseClient.auth.getSession();
      if (!existing?.session?.user) {
        document.body.classList.remove('auth-booting');
        await openPublicInvite(window.__publicInviteRoute);
        return;
      }
    }
    // Teruggekomen via een link uit een e-mail (account bevestigen of wachtwoord herstellen)?
    const authRedirect = readAuthRedirect();
    if (authRedirect && (await handleAuthRedirect(authRedirect))) return;
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    if (data.session?.user) {
      document.body.classList.add('auth-restoring');
      $('landingView').style.display = 'none';
      $('appShell').style.display = 'grid';
      activateView('recipes');
      const ok = await startDatabaseSession(data.session.user);
      if (!ok) sessionStorage.setItem('savour_session_active', '1');
      else if (window.__publicRecipeRoute) await openLinkRecipe(window.__publicRecipeRoute);
    } else {
      // Geen sessie en geen internet: de bewaarde bibliotheek openen als die er is.
      if (!navigator.onLine && (await startOfflineSession())) return;
      sessionStorage.removeItem('savour_session_active');
      currentUser = null;
      showLanding();
      if (window.__proRoute) openPublicInfo('pro');
      else if (window.__infoRoute) openPublicInfo(window.__infoRoute);
      else if (window.__authRoute) openAuth(window.__authRoute);
      else if (window.__demoRoute) startDemo();
      else if (window.__teamRoute) openAuth('login');
      if (window.__authRoute || window.__demoRoute) history.replaceState(null, '', location.pathname);
    }
  } catch (e) {
    console.error('Sessie kon niet worden hersteld:', e);
    if (looksOffline(e) && (await startOfflineSession())) return;
    sessionStorage.removeItem('savour_session_active');
    currentUser = null;
    showLanding();
  } finally {
    document.body.classList.remove('auth-restoring');
    document.body.classList.remove('auth-booting');
  }
})();

// Inloggen en uitloggen (ook vanuit een ander tabblad).
supabaseClient.auth.onAuthStateChange(async (event, session) => {
  if (
    event === 'SIGNED_IN' &&
    session?.user &&
    sessionStorage.getItem('savour_session_active') === '1' &&
    !currentUser
  ) {
    try {
      await startDatabaseSession(session.user);
    } catch (e) {
      console.error('Database na login kon niet worden geladen:', e);
    }
  }
  if (event === 'SIGNED_OUT') {
    sessionStorage.removeItem('savour_session_active');
    currentUser = null;
    document.body.classList.remove('savour-light');
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    $('landingView').style.display = 'block';
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  }
});

// Offline werken en installeren op het beginscherm (sw.js). Alleen op https of lokaal testen.
if ('serviceWorker' in navigator && (location.protocol === 'https:' || /^(localhost|127.)/.test(location.hostname)))
  navigator.serviceWorker.register('/sw.js').catch(e => console.warn('Offline werken niet beschikbaar:', e));

// App installeren (js/features/install.js): de browser meldt wanneer installeren kan; de knop gebruikt dat moment.
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  installPrompt = e;
  renderInstallButtons();
});
window.addEventListener('appinstalled', () => {
  installPrompt = null;
  renderInstallButtons();
  toast('Savour staat nu op je beginscherm');
});
renderInstallButtons();
