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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
