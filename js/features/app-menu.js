// Telefoonmenu van de app (testversie, 2026-11-08): hetzelfde menu als op de website, over het hele scherm met
// bovenin SAVOUR en een kruisje. Account en uitloggen staan bovenaan, daarna zoeken, recepten, mappen,
// keukenteams en Tools; daarna Mijn Savour (Pro, collega uitnodigen, app, instellingen) en de taal. Opent met de menuknop rechtsboven.

function toggleMobileMenu(force) {
  const menu = $('appMenu');
  if (!menu) return;
  const open = typeof force === 'boolean' ? force : menu.hidden;
  if (open) renderAppMenu();
  menu.hidden = !open;
  if (open) menu.scrollTop = 0;
  document.body.classList.toggle('mobile-menu-open', open);
  const btn = $('mobileMenuBtn');
  if (btn) btn.setAttribute('aria-expanded', String(open));
  if (open) setTimeout(() => menu.querySelector('.app-mm-close')?.focus(), 30);
  else if (btn && menu.contains(document.activeElement)) btn.focus();
}

// Eén regel in een groep: titel met eventueel een korte toelichting eronder (zoals de functies op de website).
function appMenuItem(action, title, note = '', active = false) {
  return `<li><button type="button" class="${active ? 'is-active' : ''}" onclick="${action}"><b>${esc(title)}</b>${note ? `<span>${esc(note)}</span>` : ''}</button></li>`;
}

function appMenuGroup(title, items, open) {
  return `<details class="app-mm-group"${open ? ' open' : ''}><summary>${esc(title)}</summary><ul>${items.join('')}</ul></details>`;
}

function renderAppMenu() {
  const host = $('appMenuBody');
  if (!host) return;
  const active = document.querySelector('#appShell .view.active')?.id || '';
  const count = n => (n === 1 ? t('1 recept') : t(`${n} recepten`));

  // Account bovenaan, met uitloggen direct ernaast.
  const name = (account?.name || '').trim() || (demoMode ? 'Demo' : currentUser?.email || '');
  const mail = demoMode ? t('Demo account · niets wordt opgeslagen') : currentUser?.email || '';
  const accountHtml = `<div class="app-mm-account"><button type="button" class="app-mm-me" onclick="go('settings')"><span class="app-mm-avatar" aria-hidden="true">${esc((name[0] || 'S').toUpperCase())}</span><span><b>${esc(name)}</b><small>${esc(mail)}</small></span></button><button type="button" class="app-mm-logout" onclick="logout()">${esc(t('Uitloggen'))}</button></div>`;

  const search = `<button type="button" class="app-mm-search" onclick="openMobileSearch()"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>${esc(t('Zoek in al je recepten...'))}</button>`;

  const recipesGroup = appMenuGroup(
    t('Recepten'),
    [
      appMenuItem("go('recipes')", t('Alle recepten'), count(recipes.length), active === 'recipes'),
      appMenuItem("go('favorites')", t('Favorieten'), count(favorites.length), active === 'favorites'),
      appMenuItem("go('categories')", t('Categorieën'), '', active === 'categories'),
      appMenuItem("go('import')", t('Recept toevoegen'), '', active === 'import')
    ],
    true
  );

  // Dezelfde mappen en keukenteams als in de zijbalk op de computer (de keuze en volgorde uit Beheren).
  const settings = getCategorySettings();
  const byId = new Map(getOrderedPersonalFolders().map(f => [String(f.id), f]));
  const chosen = settings.order
    .map(id => byId.get(String(id)))
    .filter(Boolean)
    .filter(f => settings.selected.includes(String(f.id)));
  const foldersGroup = appMenuGroup(
    t('Recepten mappen'),
    [
      ...chosen.map(f => appMenuItem(`filterFolderCategory('${escJs(f.id)}')`, f.name, count(folderCount(f)))),
      appMenuItem("go('folderManage')", t('Mappen beheren')),
      appMenuItem('newFolder()', t('Recepten map toevoegen'))
    ],
    ['folders', 'folderManage', 'folderDetail'].includes(active)
  );

  const s = getSharedMenuSettings();
  const maps = new Map(sharedMaps.map(m => [String(m.id), m]));
  const teams = s.order
    .map(id => maps.get(id))
    .filter(Boolean)
    .filter(m => s.selected.includes(String(m.id)));
  const teamsGroup = appMenuGroup(
    t('Keukenteams'),
    [
      ...teams.map(m => appMenuItem(`openShared('${escJs(m.id)}')`, m.name)),
      appMenuItem("go('sharedManage')", t('Keukenteams beheren')),
      appMenuItem('newSharedMap()', t('Keukenteam maken'))
    ],
    ['shared', 'sharedManage', 'sharedFolderDetail', 'sharedMapManage'].includes(active)
  );

  const kitchenGroup = appMenuGroup(
    t('Tools'),
    [appMenuItem("go('products')", t('Allergenen'), '', active === 'products')],
    active === 'products'
  );

  const link = (action, label) => appMenuItem(action, label);
  const proLabel = ($('navProLabel')?.textContent || '').trim() || t('Savour Pro');
  const showTeam = $('navTeam') && $('navTeam').style.display !== 'none';
  const showInstall =
    !document.querySelector('[data-install-app]') ||
    document.querySelector('[data-install-app]').style.display !== 'none';
  // Abonnement, collega's, de app en instellingen onder één kopje.
  const mineGroup = `<details class="app-mm-group"${['pro', 'settings'].includes(active) ? ' open' : ''}><summary>${esc(t('Mijn Savour'))}</summary><ul>${link('openProNav()', proLabel)}${showTeam ? link('openTeamNav()', t('Mijn team')) : ''}${link('inviteColleague()', t('Collega uitnodigen'))}${showInstall ? link('installApp()', t('App installeren')) : ''}${link("go('settings')", t('Instellingen'))}${typeof adminLinkVisible !== 'undefined' && adminLinkVisible ? link("location.href='/admin'", 'Admin') : ''}</ul></details>`;

  const langs = `<div class="app-mm-lang" translate="no">${Object.keys(I18N_LANGUAGES)
    .map(
      code =>
        `<button type="button"${code === currentLanguage ? ' aria-current="true"' : ''} onclick="appMenuLanguage('${code}')">${code.toUpperCase()}</button>`
    )
    .join('')}</div>`;

  host.innerHTML = accountHtml + search + recipesGroup + foldersGroup + teamsGroup + kitchenGroup + mineGroup + langs;
}

// Andere taal kiezen in het menu: het menu blijft open, nu in de nieuwe taal.
async function appMenuLanguage(code) {
  await setLanguage(code);
  toggleMobileMenu(true);
}
