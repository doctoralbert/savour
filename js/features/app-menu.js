// Menu van de app, op de telefoon en op de computer (2026-11-08). Eén bron (appMenuData) voor twee weergaven:
// - telefoon: menuknop rechtsboven, over het hele scherm met SAVOUR en een kruisje (toggleMobileMenu);
// - computer (testversie): bovenbalk zoals op de website, met per groep een menukaart over de volle breedte
//   (toggleAppNav). De initiaal rechtsboven opent Mijn Savour.

// De groepen van het menu met hun regels. active: de weergave die nu open staat.
function appMenuData() {
  const active = document.querySelector('#appShell .view.active')?.id || '';
  const count = n => (n === 1 ? t('1 recept') : t(`${n} recepten`));
  const item = (action, title, note = '', on = false, ico = '') => ({ action, title, note, active: on, icon: ico });

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
        item("go('recipes')", t('Alle recepten'), count(recipes.length), active === 'recipes', 'book'),
        item("go('favorites')", t('Favorieten'), count(favorites.length), active === 'favorites', 'star'),
        item("go('categories')", t('Categorieën'), '', active === 'categories', 'tag'),
        item("go('import')", t('Recept toevoegen'), '', active === 'import', 'plus')
      ]
    },
    {
      id: 'folders',
      title: t('Recepten mappen'),
      short: t('Mappen'),
      intro: t('Jouw mappen, in jouw volgorde.'),
      on: ['folders', 'folderManage', 'folderDetail'].includes(active),
      items: [
        ...chosen.map(f =>
          item(`filterFolderCategory('${escJs(f.id)}')`, f.name, count(folderCount(f)), false, 'folder')
        ),
        item("go('folderManage')", t('Mappen beheren'), '', false, 'settings'),
        item('newFolder()', t('Recepten map toevoegen'), '', false, 'folderPlus')
      ]
    },
    {
      id: 'teams',
      title: t('Keukenteams'),
      intro: t('Eén receptenboek voor je hele brigade.'),
      on: ['shared', 'sharedManage', 'sharedFolderDetail', 'sharedMapManage'].includes(active),
      items: [
        ...teams.map(m => item(`openShared('${escJs(m.id)}')`, m.name, '', false, 'users')),
        item("go('sharedManage')", t('Keukenteams beheren'), '', false, 'settings'),
        item('newSharedMap()', t('Keukenteam maken'), '', false, 'userPlus')
      ]
    },
    {
      id: 'tools',
      title: t('Tools'),
      intro: t('Hulpmiddelen voor in de keuken.'),
      on: active === 'products',
      items: [
        item("go('products')", t('Allergenen'), t('De 14 allergenen bij elk recept.'), active === 'products', 'leaf')
      ]
    },
    {
      id: 'mine',
      title: t('Mijn Savour'),
      intro: t('Je abonnement, collega’s en instellingen.'),
      on: ['pro', 'settings'].includes(active),
      items: [
        item('openProNav()', proLabel, '', false, 'sparkle'),
        ...(showTeam ? [item('openTeamNav()', t('Mijn team'), '', false, 'users')] : []),
        item('inviteColleague()', t('Collega uitnodigen'), '', false, 'gift'),
        ...(showInstall ? [item('installApp()', t('App installeren'), '', false, 'download')] : []),
        item("go('settings')", t('Instellingen'), '', active === 'settings', 'settings'),
        // Alleen in de bovenbalk op de computer: op de telefoon staat de knop al bovenin.
        { ...item('toggleTheme()', t('Licht of donker'), '', false, 'moon'), desk: true },
        ...(admin ? [item("location.href='/admin'", 'Admin', '', false, 'shield')] : [])
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

// ---- Computer: bovenbalk met uitklapmenu's ----
// Elk kopje (en Mijn Savour rechts) klapt bij aanwijzen een overzichtelijk lijstje uit, direct onder de knop.
// Klikken werkt ook (tablet, toetsenbord): dan blijft het open tot je iets kiest, ernaast klikt of Escape drukt.

let appNavOpen = '';

// De lijst onder een knop: per regel de naam en eventueel een korte toelichting.
function appNavDropHtml(g) {
  const me = appMenuAccount();
  const head =
    g.id === 'mine'
      ? `<div class="app-drop-me"><span class="app-drop-avatar" aria-hidden="true">${esc(me.initial)}</span><span><b>${esc(me.name)}</b><small>${esc(me.mail)}</small></span></div>`
      : `<div class="app-drop-kicker">${esc(g.title)}</div>`;
  const items = g.items
    .map(
      x =>
        `<li><button type="button" role="menuitem" class="${x.active ? 'is-active' : ''}" onclick="appNavPick(this);${x.action}"><span class="app-drop-ico" aria-hidden="true">${x.icon ? icon(x.icon, { size: 17 }) : ''}</span><span class="app-drop-text"><b>${esc(x.title)}</b>${x.note ? `<small>${esc(x.note)}</small>` : ''}</span><i class="app-drop-go" aria-hidden="true">→</i></button></li>`
    )
    .join('');
  const foot =
    g.id === 'mine'
      ? `<div class="app-drop-foot"><div class="app-nav-lang" translate="no">${Object.keys(I18N_LANGUAGES)
          .map(
            code =>
              `<button type="button"${code === currentLanguage ? ' aria-current="true"' : ''} onclick="appNavLanguage('${code}')">${code.toUpperCase()}</button>`
          )
          .join(
            ''
          )}</div><button type="button" class="app-nav-logout" onclick="appNavPick(this);logout()">${esc(t('Uitloggen'))}</button></div>`
      : '';
  return `<div class="app-nav-drop${g.id === 'mine' ? ' is-right' : ''}" role="menu" aria-label="${esc(g.title)}">${head}<ul>${items}</ul>${foot}</div>`;
}

function appNavItemHtml(g, label) {
  const open = appNavOpen === g.id;
  return `<div class="app-nav-item${open ? ' is-open' : ''}" data-nav-group="${g.id}" onmouseleave="appNavLeave(this)"><button type="button" class="app-nav-btn${g.on ? ' is-on' : ''}" aria-haspopup="true" aria-expanded="${open}" onclick="toggleAppNav('${g.id}')">${label}<i aria-hidden="true"></i></button>${appNavDropHtml(g)}</div>`;
}

// De knoppen in de bovenbalk, en rechts Mijn Savour met je initiaal.
function renderAppNav() {
  const host = $('appNav');
  if (!host) return;
  const groups = appMenuData();
  host.innerHTML = groups
    .filter(g => g.id !== 'mine')
    .map(g => appNavItemHtml(g, esc(g.short || g.title)))
    .join('');
  const mineHost = $('appNavMine');
  const mine = groups.find(g => g.id === 'mine');
  if (mineHost && mine)
    mineHost.innerHTML = appNavItemHtml(
      mine,
      `<span class="app-nav-avatar" aria-hidden="true">${esc(appMenuAccount().initial)}</span><span class="app-nav-mine-label">${esc(mine.title)}</span>`
    );
}

// Open of dicht zetten zonder alles opnieuw te tekenen (dan blijft aanwijzen met de muis goed werken).
function syncAppNav() {
  document.querySelectorAll('.app-nav-item').forEach(item => {
    const open = item.dataset.navGroup === appNavOpen;
    item.classList.toggle('is-open', open);
    item.querySelector('.app-nav-btn')?.setAttribute('aria-expanded', String(open));
  });
}

// Klikken op een kopje: open, of dicht als hij al open stond.
function toggleAppNav(id) {
  appNavOpen = !id || appNavOpen === id ? '' : id;
  syncAppNav();
}

function closeAppNav() {
  if (!appNavOpen) return;
  appNavOpen = '';
  syncAppNav();
}

// Iets gekozen: het lijstje dicht, ook al staat de muis er nog boven (tot je de muis weghaalt).
function appNavPick(el) {
  el.closest('.app-nav-item')?.classList.add('is-picked');
  closeAppNav();
}

function appNavLeave(item) {
  item.classList.remove('is-picked');
}

// Taal kiezen in Mijn Savour: het menu blijft open, nu in de nieuwe taal.
async function appNavLanguage(code) {
  await setLanguage(code);
  appNavOpen = 'mine';
  renderAppNav();
}
