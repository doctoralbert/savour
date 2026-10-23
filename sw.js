// Service worker: Savour blijft openen zonder internet (bijvoorbeeld als de wifi in de keuken wegvalt).
// Pagina's: eerst het netwerk, anders de laatst bewaarde versie. Opmaak, scripts, lettertypes en afbeeldingen:
// meteen uit de cache en op de achtergrond bijwerken. API-routes en de database gaan nooit via de cache.
const CACHE = 'savour-v1';

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

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Nooit cachen: serverfuncties, de database (Supabase) en betalen.
  if (url.pathname.startsWith('/api/') || /supabase\.co$|stripe\.com$/.test(url.hostname)) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          if (res.ok) caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('/index.html')))
    );
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  const trustedCdn = /^(cdn\.jsdelivr\.net|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(url.hostname);
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
        .catch(() => hit);
      return hit || fresh;
    })
  );
});
