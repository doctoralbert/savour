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
                e.target.classList.add('is-visible');
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        site.querySelectorAll('.reveal, .kladje-demo').forEach(function (el) {
          io.observe(el);
        });
      }
    });
  }

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
    } else if (a.dataset.setLang && typeof window.setLanguage === 'function') {
      e.preventDefault();
      window.setLanguage(a.dataset.setLang);
      history.replaceState(null, '', a.dataset.setLang === 'nl' ? '/' : '/' + a.dataset.setLang);
      window.scrollTo(0, 0);
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
