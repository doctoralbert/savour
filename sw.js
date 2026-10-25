// Service worker: Savour blijft openen zonder internet (bijvoorbeeld als de wifi in de keuken wegvalt).
// Pagina's, opmaak en scripts van Savour zelf: eerst het netwerk, anders de laatst bewaarde versie (zo past de
// opmaak altijd bij de pagina). Lettertypes, afbeeldingen en bibliotheken: meteen uit de cache en op de achtergrond
// bijwerken. API-routes en de database gaan nooit via de cache.
// Let op: een stylesheet of script krijgt nooit een pagina (HTML) als vervanging; dan zou de site zonder opmaak laden.
const CACHE = 'savour-v3';

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache => cache.addAll(['/', '/index.html']))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Eerst het netwerk; lukt dat niet, dan de bewaarde versie. Alleen goede antwoorden worden bewaard.
function networkFirst(req, fallback) {
  return fetch(req)
    .then(res => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    })
    .catch(() => caches.match(req).then(hit => hit || fallback()));
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Nooit cachen: serverfuncties, de database (Supabase) en betalen.
  if (url.pathname.startsWith('/api/') || /supabase\.co$|stripe\.com$/.test(url.hostname)) return;
  const sameOrigin = url.origin === self.location.origin;

  if (req.mode === 'navigate') {
    // Offline en deze pagina nog nooit geopend: de app (index.html) opent met de bewaarde bibliotheek.
    event.respondWith(networkFirst(req, () => caches.match('/index.html').then(hit => hit || Response.error())));
    return;
  }
  if (sameOrigin && /\.(css|js)$/.test(url.pathname)) {
    // Offline: dezelfde opmaak of hetzelfde script van een eerdere versie (ander ?v=) is beter dan niets.
    event.respondWith(
      networkFirst(req, () => caches.match(req, { ignoreSearch: true }).then(hit => hit || Response.error()))
    );
    return;
  }

  const trustedCdn = /^(cdn\.jsdelivr\.net|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(
    url.hostname
  );
  if (!sameOrigin && !trustedCdn) return;
  event.respondWith(
    caches.match(req).then(hit => {
      const fresh = fetch(req)
        .then(res => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => hit || Response.error());
      return hit || fresh;
    })
  );
});
