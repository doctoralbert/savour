// Menu van de app, op de telefoon en op de computer (2026-11-08). Eén bron (appMenuData) voor twee weergaven:
// - telefoon: menuknop rechtsboven, over het hele scherm met SAVOUR en een kruisje (toggleMobileMenu);
// - computer (testversie): bovenbalk zoals op de website, met per groep een menukaart over de volle breedte
//   (toggleAppNav). De initiaal rechtsboven opent Mijn Savour.

// De groepen van het menu met hun regels. active: de weergave die nu open staat.
function appMenuData() {
  const active = document.querySelector('#appShell .view.active')?.id || '';
  const count = n => (n === 1 ? t('1 recept') : t(`${n} recepten`));
  const item = (action, title, note = '', on = false) => ({ action, title, note, active: on });

  // Dezelfde mappen en keukenteams als in de zijbalk (de keuze en volgorde uit Beheren).
  const settings = getCategorySettings();
  const byId = new Map(getOrderedPersonalFolders().map(f => [String(f.id), f]));
  const chosen = settings.order
    .map(id => byId.get(String(id)))
    .filter(Boolean)
    .filter(f => settings.selected.includes(String(f.id)));
  const s = getSharedMenuSettings();
  const maps = new Map(sharedMaps.map(m => [String(m.id), m]));
  const teams = s.order
    .map(id => maps.get(id))
    .filter(Boolean)
    .filter(m => s.selected.includes(String(m.id)));
  const proLabel = ($('navProLabel')?.textContent || '').trim() || t('Savour Pro');
  const showTeam = $('navTeam') && $('navTeam').style.display !== 'none';
  const install = document.querySelector('[data-install-app]');
  const showInstall = !install || install.style.display !== 'none';
  const admin = typeof adminLinkVisible !== 'undefined' && adminLinkVisible;

  return [
    {
      id: 'recipes',
      title: t('Recepten'),
      intro: t('Je hele receptenboek, je favorieten en de categorieën.'),
      open: true,
      on: ['recipes', 'favorites', 'categories', 'import', 'detail', 'editor'].includes(active),
      items: [
        item("go('recipes')", t('Alle recepten'), count(recipes.length), active === 'recipes'),
        item("go('favorites')", t('Favorieten'), count(favorites.length), active === 'favorites'),
        item("go('categories')", t('Categorieën'), '', active === 'categories'),
        item("go('import')", t('Recept toevoegen'), '', active === 'import')
      ]
    },
    {
      id: 'folders',
      title: t('Recepten mappen'),
      short: t('Mappen'),
      intro: t('Jouw mappen, in jouw volgorde.'),
      on: ['folders', 'folderManage', 'folderDetail'].includes(active),
      items: [
        ...chosen.map(f => item(`filterFolderCategory('${escJs(f.id)}')`, f.name, count(folderCount(f)))),
        item("go('folderManage')", t('Mappen beheren')),
        item('newFolder()', t('Recepten map toevoegen'))
      ]
    },
    {
      id: 'teams',
      title: t('Keukenteams'),
      intro: t('Eén receptenboek voor je hele brigade.'),
      on: ['shared', 'sharedManage', 'sharedFolderDetail', 'sharedMapManage'].includes(active),
      items: [
        ...teams.map(m => item(`openShared('${escJs(m.id)}')`, m.name)),
        item("go('sharedManage')", t('Keukenteams beheren')),
        item('newSharedMap()', t('Keukenteam maken'))
      ]
    },
    {
      id: 'tools',
      title: t('Tools'),
      intro: t('Hulpmiddelen voor in de keuken.'),
      on: active === 'products',
      items: [item("go('products')", t('Allergenen'), t('De 14 allergenen bij elk recept.'), active === 'products')]
    },
    {
      id: 'mine',
      title: t('Mijn Savour'),
      intro: t('Je abonnement, collega’s en instellingen.'),
      on: ['pro', 'settings'].includes(active),
      items: [
        item('openProNav()', proLabel),
        ...(showTeam ? [item('openTeamNav()', t('Mijn team'))] : []),
        item('inviteColleague()', t('Collega uitnodigen')),
        ...(showInstall ? [item('installApp()', t('App installeren'))] : []),
        item("go('settings')", t('Instellingen'), '', active === 'settings'),
        // Alleen in de bovenbalk op de computer: op de telefoon staat de knop al bovenin.
        { ...item('toggleTheme()', t('Licht of donker')), desk: true },
        ...(admin ? [item("location.href='/admin'", 'Admin')] : [])
      ]
    }
  ];
}

function appMenuAccount() {
  const name = (account?.name || '').trim() || (demoMode ? 'Demo' : currentUser?.email || '');
  const mail = demoMode ? t('Demo account · niets wordt opgeslagen') : currentUser?.email || '';
  return { name, mail, initial: (name[0] || 'S').toUpperCase() };
}

// ---- Telefoon ----

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

function renderAppMenu() {
  const host = $('appMenuBody');
  if (!host) return;
  const me = appMenuAccount();
  const accountHtml = `<div class="app-mm-account"><button type="button" class="app-mm-me" onclick="go('settings')"><span class="app-mm-avatar" aria-hidden="true">${esc(me.initial)}</span><span><b>${esc(me.name)}</b><small>${esc(me.mail)}</small></span></button><button type="button" class="app-mm-logout" onclick="logout()">${esc(t('Uitloggen'))}</button></div>`;
  const search = `<button type="button" class="app-mm-search" onclick="openMobileSearch()"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>${esc(t('Zoek in al je recepten...'))}</button>`;
  const groups = appMenuData()
    .map(
      g =>
        `<details class="app-mm-group"${g.open || g.on ? ' open' : ''}><summary>${esc(g.title)}</summary><ul>${g.items
          .filter(x => !x.desk)
          .map(
            x =>
              `<li><button type="button" class="${x.active ? 'is-active' : ''}" onclick="${x.action}"><b>${esc(x.title)}</b>${x.note ? `<span>${esc(x.note)}</span>` : ''}</button></li>`
          )
          .join('')}</ul></details>`
    )
    .join('');
  const langs = `<div class="app-mm-lang" translate="no">${Object.keys(I18N_LANGUAGES)
    .map(
      code =>
        `<button type="button"${code === currentLanguage ? ' aria-current="true"' : ''} onclick="appMenuLanguage('${code}')">${code.toUpperCase()}</button>`
    )
    .join('')}</div>`;
  host.innerHTML = accountHtml + search + groups + langs;
}

// Andere taal kiezen in het menu: het menu blijft open, nu in de nieuwe taal.
async function appMenuLanguage(code) {
  await setLanguage(code);
  toggleMobileMenu(true);
}

// ---- Computer: bovenbalk met menukaarten ----

let appNavOpen = '';

// De knoppen in de bovenbalk (zonder Mijn Savour: dat zit achter de initiaal rechtsboven).
function renderAppNav() {
  const host = $('appNav');
  if (!host) return;
  const groups = appMenuData().filter(g => g.id !== 'mine');
  host.innerHTML = groups
    .map(
      g =>
        `<button type="button" class="app-nav-btn${g.on ? ' is-on' : ''}${appNavOpen === g.id ? ' is-open' : ''}" aria-expanded="${appNavOpen === g.id}" onclick="toggleAppNav('${g.id}')">${esc(g.short || g.title)}<i aria-hidden="true"></i></button>`
    )
    .join('');
  const me = appMenuAccount();
  const avatar = $('appNavMe');
  if (avatar) {
    avatar.textContent = me.initial;
    avatar.setAttribute('aria-expanded', String(appNavOpen === 'mine'));
    avatar.classList.toggle('is-open', appNavOpen === 'mine');
  }
}

// Een menukaart openen of sluiten. Dezelfde groep nog eens: dicht.
function toggleAppNav(id) {
  appNavOpen = !id || appNavOpen === id ? '' : id;
  const panel = $('appNavPanel');
  if (!panel) return;
  const g = appMenuData().find(x => x.id === appNavOpen);
  if (!g) {
    panel.hidden = true;
    panel.innerHTML = '';
    renderAppNav();
    return;
  }
  const me = appMenuAccount();
  const head =
    g.id === 'mine'
      ? `<div class="app-nav-intro"><span>${esc(me.name)}</span><p>${esc(me.mail)}</p><button type="button" class="app-nav-logout" onclick="logout()">${esc(t('Uitloggen'))}</button><div class="app-nav-lang" translate="no">${Object.keys(
          I18N_LANGUAGES
        )
          .map(
            code =>
              `<button type="button"${code === currentLanguage ? ' aria-current="true"' : ''} onclick="appNavLanguage('${code}')">${code.toUpperCase()}</button>`
          )
          .join('')}</div></div>`
      : `<div class="app-nav-intro"><span>${esc(g.title)}</span><p>${esc(g.intro)}</p></div>`;
  panel.innerHTML = `<div class="app-nav-card">${head}<ol>${g.items
    .map(
      (x, i) =>
        `<li><button type="button" class="${x.active ? 'is-active' : ''}" onclick="${x.action}"><em>${String(i + 1).padStart(2, '0')}</em><b>${esc(x.title)}</b>${x.note ? `<span>${esc(x.note)}</span>` : ''}</button></li>`
    )
    .join('')}</ol></div>`;
  panel.hidden = false;
  renderAppNav();
}

// Taal kiezen in Mijn Savour: de kaart blijft open, nu in de nieuwe taal.
async function appNavLanguage(code) {
  await setLanguage(code);
  appNavOpen = '';
  toggleAppNav('mine');
}

function closeAppNav() {
  if (appNavOpen) toggleAppNav('');
}
