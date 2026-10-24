// Publieke website: telefoonmenu, rustige beweging bij scrollen en de knoppen Inloggen / Gratis beginnen / demo.
// Wordt geladen op de losse pagina's (tools/build-seo.mjs) én op de startpagina in index.html.
(function () {
  function setup() {
    document.querySelectorAll('.site').forEach(function (site) {
      // Telefoonmenu open en dicht.
      var header = site.querySelector('.site-header');
      var burger = site.querySelector('.site-burger');
      if (header && burger && !burger.dataset.ready) {
        burger.dataset.ready = '1';
        burger.addEventListener('click', function () {
          var open = header.classList.toggle('open');
          burger.textContent = open ? burger.dataset.close : burger.dataset.open;
          burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      }

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

  // Kladje-schuif: links het echte kladje, rechts hetzelfde recept in Savour.
  document.addEventListener('input', function (e) {
    if (!e.target.classList || !e.target.classList.contains('kladje-ba-range')) return;
    var fig = e.target.closest('.kladje-ba');
    if (fig) fig.style.setProperty('--pos', e.target.value + '%');
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
