// Savour als app op het beginscherm (werkt dan ook offline, zie sw.js).
// Android en computer (Chrome, Edge, Samsung Internet): de knop opent het installatievenster van de browser.
// iPhone en iPad: Apple laat websites dat niet zelf doen; dan tonen we in drie stappen hoe het moet.
// Knoppen met [data-install-app] verdwijnen als Savour al als app geopend is.

let installPrompt = null;

function isInstalledApp() {
  return window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
}

function installPlatform() {
  const ua = navigator.userAgent || '';
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  // Ingebouwde browsers van apps (Instagram, Facebook, LinkedIn...) kunnen niet installeren.
  if (/Instagram|FBAN|FBAV|LinkedInApp|Line\/|; wv\)/.test(ua)) return 'inapp';
  if (ios) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg\//.test(ua)) return 'mac-safari';
  return 'desktop';
}

function renderInstallButtons() {
  document.querySelectorAll('[data-install-app]').forEach(el => (el.style.display = isInstalledApp() ? 'none' : ''));
}

async function installApp() {
  if (isInstalledApp()) {
    toast('Je gebruikt Savour al als app');
    return;
  }
  // Android en computer: het echte installatievenster van de browser.
  if (installPrompt) {
    const prompt = installPrompt;
    installPrompt = null;
    prompt.prompt();
    try {
      await prompt.userChoice;
    } catch (_) {}
    renderInstallButtons();
    return;
  }
  const steps = {
    ios: 'Savour op je beginscherm zetten\n\n1. Tik onderaan in Safari op Delen (het vierkantje met de pijl omhoog).\n2. Kies “Zet op beginscherm”.\n3. Tik op “Voeg toe”.\n\nLog daarna één keer in met “Ingelogd blijven” aan. Dan werkt Savour ook zonder internet.',
    inapp:
      'Open Savour eerst in je browser\n\nIn deze ingebouwde browser kun je niets installeren. Tik op ••• of het menu en kies “Open in browser” (Safari of Chrome). Kies daar opnieuw “App installeren”.',
    android:
      'Savour op je startscherm zetten\n\nTik rechtsboven in Chrome op ⋮ en kies “App installeren” of “Toevoegen aan startscherm”.\n\nLog daarna één keer in met “Ingelogd blijven” aan. Dan werkt Savour ook zonder internet.',
    'mac-safari': 'Savour als app installeren\n\nKies in Safari bovenin Archief → “Voeg toe aan Dock”.',
    desktop:
      'Savour als app installeren\n\nKlik rechts in de adresbalk op het installatie-icoon (een schermpje met een pijl), of kies in het menu van je browser “Savour installeren”.'
  };
  await askConfirm(steps[installPlatform()], { confirmLabel: 'Begrepen' });
}

// ---- Nieuwe versie van Savour (2026-11-11) ----
// Wie Savour dagenlang open laat staan (een tabblad, of de app op de achtergrond), draait anders een oude
// versie: zonder de nieuwste verbeteringen en beveiligingen. Savour kijkt daarom af en toe of er een nieuwe
// versie live staat (het versienummer van main.js in index.html) en biedt dan een knop aan om te vernieuwen.
// Nooit vanzelf herladen: dan zou de kok iets kwijtraken waar hij mee bezig is.
let appUpdateCheckedAt = 0;

function runningAppVersion() {
  const src = document.querySelector('script[src*="/js/main.js"]')?.getAttribute('src') || '';
  return (src.match(/[?&]v=([\w-]+)/) || [])[1] || '';
}

async function checkAppUpdate(force = false) {
  if (!force && Date.now() - appUpdateCheckedAt < 10 * 60000) return;
  appUpdateCheckedAt = Date.now();
  const running = runningAppVersion();
  if (!running || document.getElementById('appUpdateBar')) return;
  try {
    const html = await (await fetch('/index.html', { cache: 'no-store' })).text();
    const live = (html.match(/\/js\/main\.js\?v=([\w-]+)/) || [])[1] || '';
    if (live && live !== running) showAppUpdateBar();
  } catch (_) {
    // Geen verbinding: volgende keer opnieuw.
  }
}

function showAppUpdateBar() {
  if (document.getElementById('appUpdateBar')) return;
  const bar = document.createElement('div');
  bar.id = 'appUpdateBar';
  bar.className = 'app-update-bar';
  bar.setAttribute('role', 'status');
  bar.innerHTML = `<span>${esc(t('Er is een nieuwe versie van Savour.'))}</span><button type="button" class="btn small gold" onclick="reloadForUpdate()">${esc(t('Nu vernieuwen'))}</button>`;
  document.body.appendChild(bar);
}

async function reloadForUpdate() {
  // Midden in een import of met recepten die nog niet zijn opgeslagen: eerst vragen.
  if (
    typeof importNeedsWarning === 'function' &&
    importNeedsWarning() &&
    !(await askConfirm(
      `${t('Nu vernieuwen?')}\n\n${t('Je hebt recepten in de controle die nog niet zijn opgeslagen. Savour biedt ze daarna opnieuw aan, maar wijzigingen die je zelf hebt gemaakt gaan verloren.')}`,
      { confirmLabel: t('Toch vernieuwen') }
    ))
  )
    return;
  location.reload();
}
