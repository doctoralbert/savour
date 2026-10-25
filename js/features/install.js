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
