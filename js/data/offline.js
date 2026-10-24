// Offline in de keuken: na elke geslaagde start bewaart Savour de bibliotheek op dit toestel (IndexedDB).
// Valt de verbinding weg, dan opent Savour die laatste stand, alleen om te lezen. Zodra er weer verbinding
// is, laadt Savour opnieuw. De pagina zelf blijft offline beschikbaar via sw.js (service worker).

let offlineMode = false;
const OFFLINE_DB = 'savour-offline';

function offlineStore(mode, run) {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open(OFFLINE_DB, 1);
    open.onupgradeneeded = () => open.result.createObjectStore('snapshot');
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const tx = open.result.transaction('snapshot', mode);
      const req = run(tx.objectStore('snapshot'));
      tx.oncomplete = () => resolve(req?.result);
      tx.onerror = () => reject(tx.error);
    };
  });
}

// Na het laden van de bibliotheek: de laatste stand bewaren (per toestel, alleen het eigen account).
async function saveOfflineSnapshot() {
  if (demoMode || offlineMode || !currentUser || !window.indexedDB) return;
  // Niet ingelogd blijven (bijv. een gedeelde keukencomputer): dan ook niets op het toestel achterlaten.
  if (!staySignedIn()) return clearOfflineSnapshot();
  try {
    const snap = {
      userId: currentUser.id,
      email: currentUser.email,
      savedAt: new Date().toISOString(),
      account: { ...account, password: '' },
      recipes,
      folders,
      favorites,
      categories,
      sharedMaps,
      sharedRecipes
    };
    await offlineStore('readwrite', store => store.put(JSON.parse(JSON.stringify(snap)), 'last'));
  } catch (e) {
    console.warn('Offline bewaren lukte niet:', e);
  }
}

async function loadOfflineSnapshot() {
  if (!window.indexedDB) return null;
  try {
    return (await offlineStore('readonly', store => store.get('last'))) || null;
  } catch {
    return null;
  }
}

// Uitloggen: de bewaarde bibliotheek van dit toestel wissen (een ander mag hem niet offline zien).
async function clearOfflineSnapshot() {
  if (!window.indexedDB) return;
  try {
    await offlineStore('readwrite', store => store.delete('last'));
  } catch {}
}

// Is dit een verbindingsprobleem (en geen fout in de gegevens)?
function looksOffline(error) {
  return (
    !navigator.onLine || /fetch|network|Failed to fetch|Load failed|NetworkError/i.test(String(error?.message || error))
  );
}

// Savour openen met de bewaarde bibliotheek. Geeft true als dat lukte.
async function startOfflineSession(userId) {
  const snap = await loadOfflineSnapshot();
  if (!snap || (userId && snap.userId !== userId)) return false;
  offlineMode = true;
  currentUser = { id: snap.userId, email: snap.email };
  demoMode = false;
  account = snap.account || account;
  recipes = snap.recipes || [];
  folders = snap.folders || [];
  favorites = snap.favorites || [];
  categories = snap.categories || [];
  sharedMaps = snap.sharedMaps || [];
  sharedRecipes = snap.sharedRecipes || [];
  $('landingView').style.display = 'none';
  $('appShell').style.display = 'grid';
  showApp('recipes');
  refreshSidebar();
  updateProfileHeader();
  showOfflineBanner(snap.savedAt);
  return true;
}

function showOfflineBanner(savedAt) {
  if ($('offlineBanner')) return;
  const when = savedAt
    ? new Date(savedAt).toLocaleString(document.documentElement.lang || 'nl', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div id="offlineBanner" class="offline-banner" role="status"><b>Offline</b><span>Je ziet je recepten zoals ze ${when ? `op ${esc(when)} ` : ''}op dit toestel stonden. Wijzigen kan weer zodra je verbinding hebt.</span></div>`
  );
}

// Weer verbinding na offline werken: opnieuw laden, zodat alles weer actueel en bewerkbaar is.
window.addEventListener('online', () => {
  if (offlineMode) location.reload();
});
