// Opstarten van Savour. Dit bestand wordt als laatste geladen, zodat alle functies al bestaan.

// Nederlands is de vaste taal; de app gebruikt altijd het donkere thema.
document.documentElement.lang = 'nl';
applyTheme('dark');

setupCropControls();
setupImportDropZone();

if (IS_ADMIN_PATH) {
  setTimeout(async () => {
    adminRenderLogin();
    const {
      data: { session }
    } = await supabaseClient.auth.getSession();
    if (session && sessionStorage.getItem('savour_admin_session') === '1' && (await adminIsAllowed()))
      adminShowDashboard(session.user);
  }, 0);
} else {
  /* Analytics disabled until the site_visits schema is verified. */
}

// Apply the refresh-safe language and header button after DOM is ready.
window.addEventListener('popstate', () => {
  document.documentElement.lang = 'nl';
  const active = document.querySelector('#appShell .view.active')?.id;
  if (currentUser && active) renderActiveView(active);
});

// Zodra de pagina is opgebouwd: publieke navigatie, alfabetbalken en zijbalkmenu's tekenen.
document.addEventListener('DOMContentLoaded', ensurePublicNav, { once: true });
setTimeout(ensurePublicNav, 250);
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

// Savour startup: run only after all auth, database and language declarations exist.
const publicRecipeMatch = location.pathname.match(/^\/r\/([^/]+)\/?$/);

const publicInviteMatch = location.pathname.match(/^\/join\/([^/]+)\/?$/);

if (publicRecipeMatch) {
  window.__publicRecipeRoute = decodeURIComponent(publicRecipeMatch[1]);
}

if (publicInviteMatch) {
  window.__publicInviteRoute = decodeURIComponent(publicInviteMatch[1]);
}

(async () => {
  try {
    if (window.__publicRecipeRoute) {
      document.body.classList.remove('auth-booting');
      await openPublicRecipeBySlug(window.__publicRecipeRoute);
      return;
    }
    if (window.__publicInviteRoute) {
      document.body.classList.remove('auth-booting');
      await openPublicInvite(window.__publicInviteRoute);
      return;
    }
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
    $('appShell').style.display = 'none';
    $('publicInfoShell').style.display = 'none';
    $('publicRecipeShell').style.display = 'none';
    $('landingView').style.display = 'block';
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  }
});
