// Publieke website: taalkeuze, rustige beweging bij scrollen en de knoppen Inloggen / Gratis beginnen / demo.
// Wordt geladen op de losse pagina's (tools/build-seo.mjs) én op de startpagina in index.html.
(function () {
  function setup() {
    document.querySelectorAll('.site').forEach(function (site) {
      // Beweging: elementen verschijnen rustig zodra ze in beeld komen.
      if ('IntersectionObserver' in window && !site.classList.contains('site-motion')) {
        site.classList.add('site-motion');
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                io.unobserve(e.target);
                // Twee frames wachten: dan staat de beginstand eerst op het scherm en is de overgang te zien.
                requestAnimationFrame(() => requestAnimationFrame(() => e.target.classList.add('is-visible')));
              }
            });
          },
          { threshold: 0.15 }
        );
        site.querySelectorAll('.reveal').forEach(function (el) {
          io.observe(el);
        });
      }
    });
  }

  // Contactformulier op de losse contactpagina: versturen naar /api/bug-report (kind: contact).
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.matches || !form.matches('[data-contact-form]')) return;
    e.preventDefault();
    var status = form.querySelector('.site-form-status');
    var btn = form.querySelector('button[type="submit"]');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    btn.disabled = true;
    status.textContent = form.dataset.busy;
    fetch('/api/bug-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'contact',
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
        website: form.website.value,
        page: location.href,
        language: document.documentElement.lang || ''
      })
    })
      .then(function (r) {
        if (!r.ok) throw new Error();
        form.reset();
        status.textContent = form.dataset.ok;
      })
      .catch(function () {
        status.textContent = form.dataset.fail;
      })
      .then(function () {
        btn.disabled = false;
      });
  });

  // Taalkeuze: klik ernaast of Esc sluit het venster.
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.site-lang[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape')
      document.querySelectorAll('.site-lang[open]').forEach(function (d) {
        d.removeAttribute('open');
      });
  });

  // In de app (startpagina): inloggen, account maken en de demo openen zonder de pagina te herladen.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.site [data-auth], .site [data-demo], .site [data-set-lang]');
    if (!a) return;
    if (a.dataset.auth && typeof window.openAuth === 'function') {
      e.preventDefault();
      window.openAuth(a.dataset.auth);
    } else if (a.dataset.demo !== undefined && typeof window.startDemo === 'function') {
      e.preventDefault();
      window.startDemo();
    } else if (a.dataset.setLang) {
      // Elke taal heeft een eigen startpagina: keuze onthouden en daarheen gaan.
      e.preventDefault();
      try {
        localStorage.setItem('savour_lang', a.dataset.setLang);
      } catch (_) {}
      location.href = a.getAttribute('href');
    }
  });

  // Bezoek tellen op de losse pagina's (hier komen bezoekers van Google vaak binnen). De app zelf (index.html)
  // telt via logSavourVisit in js/features/admin.js; daar staat #appShell, dus hier dan niets doen.
  function logStaticVisit() {
    if (document.getElementById('appShell') || !/(^|.)savour.page$/.test(location.hostname)) return;
    try {
      var vid = localStorage.getItem('savour_visit_id');
      if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem('savour_visit_id', vid);
      }
      var key = 'sb_publishable_R8DGUuglOC3aFz5qv4xOgw_UGdQUyiD';
      fetch('https://qmzfqfmpylkgcnxsedse.supabase.co/rest/v1/site_visits', {
        method: 'POST',
        keepalive: true,
        headers: {
          apikey: key,
          Authorization: 'Bearer ' + key,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          visitor_id: vid,
          path: location.pathname + visitSourceQuery(),
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null
        })
      }).catch(function () {});
    } catch (_) {}
  }
  // Zelfde als savourVisitSourceQuery in js/features/admin.js: alleen de herkomst uit de link, nooit iets persoonlijks.
  function visitSourceQuery() {
    var q = new URLSearchParams(location.search);
    var out = [];
    ['bron', 'utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) {
      var v = (q.get(k) || '').trim().slice(0, 40);
      if (v) out.push(k + '=' + encodeURIComponent(v));
    });
    ['collega', 'gclid', 'fbclid'].forEach(function (k) {
      if (q.has(k)) out.push(k);
    });
    return out.length ? '?' + out.join('&') : '';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
  logStaticVisit();
})();
