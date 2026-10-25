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
    if (failed) reportError(`Bestand kon niet laden: ${failed.replace(location.origin, '')}`);
    else reportError(e.message, { source: e.filename, line: e.lineno, col: e.colno, stack: e.error?.stack });
  },
  true
);
window.addEventListener('unhandledrejection', e => {
  const r = e.reason;
  reportError(r?.message || String(r || 'Onbekende fout'), { stack: r?.stack });
});
