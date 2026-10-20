// Opstarten van Savour. Dit bestand wordt als laatste geladen, zodat alle functies al bestaan.

// Nederlands is de vaste taal. Het thema (donker/licht) kiest de gebruiker in Instellingen.
document.documentElement.lang = 'nl';
applyTheme(currentTheme());

setupCropControls();
setupImportDropZone();

// Beheeromgeving op /admin. (Bezoekersstatistieken staan uit tot de tabel site_visits is gecontroleerd,
// daarom wordt logSavourVisit() nog nergens aangeroepen.)
if (IS_ADMIN_PATH) {
  setTimeout(async () => {
    adminRenderLogin();
    const {
      data: { session }
    } = await supabaseClient.auth.getSession();
    if (session && sessionStorage.getItem('savour_admin_session') === '1' && (await adminIsAllowed()))
      adminShowDashboard(session.user);
  }, 0);
}

// Terug/vooruit in de browser: de actieve weergave opnieuw tekenen.
window.addEventListener('popstate', () => {
  document.documentElement.lang = 'nl';
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

// Bestaande sessie herstellen, of de landingspagina tonen.
(async () => {
  try {
    if (window.__publicRecipeRoute) {
      document.body.classList.remove('auth-booting');
      await openPublicRecipeBySlug(window.__publicRecipeRoute);
      return;
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
    } else {
      sessionStorage.removeItem('savour_session_active');
      currentUser = null;
      showLanding();
    }
  } catch (e) {
    console.error('Sessie kon niet worden hersteld:', e);
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
