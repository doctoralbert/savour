// Foutenlogboek: fouten die bij gebruikers in de browser optreden, gaan naar de tabel app_errors
// (supabase/2026-10-25-foutenlogboek.sql) en zijn te zien in /admin onder "Fouten".
// Geen namen of e-mailadressen: e-mailadressen in een melding worden weggehaald. Per pagina hooguit
// 10 meldingen, en elke fout één keer. Lokaal testen (localhost, 127.x) stuurt niets.
//
// Uitzondering op "topniveau-code in main.js": de luisteraars hieronder moeten zo vroeg mogelijk staan, zodat
// ook een fout tijdens het laden van een ander script wordt gezien.

const reportedErrors = new Set();
let errorReportCount = 0;

function reportError(message, { source = '', line = null, col = null, stack = '' } = {}) {
  try {
    const clean = s => String(s || '').replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[e-mail]');
    const origin = location.origin;
    const msg = clean(message).trim().slice(0, 500);
    const src = String(source || '').replace(origin, '');
    if (!msg || errorReportCount >= 10) return;
    // Ruis van browser-extensies en bekende onschuldige meldingen negeren.
    if (/ResizeObserver loop|^Script error\.?$|extension:\/\//i.test(`${msg} ${src} ${stack}`)) return;
    const key = `${msg}|${src}|${line}`;
    if (reportedErrors.has(key)) return;
    reportedErrors.add(key);
    errorReportCount++;
    if (/^(localhost|127\.)/.test(location.hostname) || typeof supabaseClient === 'undefined') return;
    const ua = navigator.userAgent || '';
    // Zoekmachines en voorvertoningen (WhatsApp, Google-weergave, testtools) laden pagina's half en breken scripts
    // af: geen fout voor gebruikers. Alleen echte browsers melden.
    if (/bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|whatsapp/i.test(ua)) return;
    if (!/Chrome|CriOS|Safari|Firefox|FxiOS|Edg\//.test(ua)) return;
    const view = document.querySelector('#appShell .view.active')?.id;
    supabaseClient
      .from('app_errors')
      .insert({
        message: msg,
        source: src.slice(0, 300) || null,
        line: Number.isFinite(line) ? line : null,
        col: Number.isFinite(col) ? col : null,
        stack: clean(stack).split(origin).join('').slice(0, 2000) || null,
        page: (location.pathname + (view ? ` · ${view}` : '')).slice(0, 300),
        platform: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'mobiel' : 'desktop',
        user_agent: ua.slice(0, 300),
        app_version: (document.querySelector('script[src*="/js/main.js"]')?.src.split('v=')[1] || '').slice(0, 40)
      })
      .then(
        () => {},
        () => {}
      );
  } catch (_) {
    // Het foutenlogboek mag zelf nooit iets laten mislukken.
  }
}

window.addEventListener(
  'error',
  e => {
    // Een bestand dat niet laadt (bijv. een script of stylesheet) geeft een fout zonder message.
    // Alleen scripts en stylesheets: een kapotte receptfoto is geen fout in de app.
    const t = e.target;
    const failed = t && t !== window && /^(SCRIPT|LINK)$/.test(t.tagName || '') ? t.src || t.href : '';
    // Advertenties en statistieken van Google worden vaak door een adblocker tegengehouden: geen fout van Savour.
    if (
      failed &&
      /googlesyndication|doubleclick|googletagservices|googletagmanager|google-analytics|adservice|fundingchoices/i.test(
        failed
      )
    )
      return;
    // Geen internet (bijv. telefoon in de kelder) of de pagina wordt al verlaten: dan breekt het laden af zonder fout van Savour.
    if (failed && (navigator.onLine === false || window.__savourLeaving)) return;
    if (failed) reportError(`Bestand kon niet laden: ${failed.replace(location.origin, '')}`);
    else reportError(e.message, { source: e.filename, line: e.lineno, col: e.colno, stack: e.error?.stack });
  },
  true
);
window.addEventListener('unhandledrejection', e => {
  const r = e.reason;
  reportError(r?.message || String(r || 'Onbekende fout'), { stack: r?.stack });
});

// Onthouden dat de pagina wordt verlaten: scripts die dan nog laden breken af, dat is geen fout.
window.addEventListener('pagehide', () => (window.__savourLeaving = true));

// Fouten die de app zelf afvangt (en toont als melding) komen via console.error ook in het logboek.
(() => {
  const original = console.error.bind(console);
  console.error = (...args) => {
    original(...args);
    try {
      const e = args.find(a => a instanceof Error || (a && typeof a === 'object' && typeof a.message === 'string'));
      const text = args.filter(a => typeof a === 'string').join(' ');
      const message = [text, e?.message].filter(Boolean).join(': ');
      if (message) reportError(message, { stack: e?.stack || '' });
    } catch (_) {}
  };
})();
