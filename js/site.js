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
    // Aanvraagformulier inlaadservice: extra velden (pakket, organisatie-abonnement, restaurant) bovenaan het bericht.
    var extra = [].map
      .call(form.querySelectorAll('[data-extra]'), function (el) {
        return el.dataset.extra + ': ' + el.value.trim();
      })
      .join('\n');
    var message = form.message.value.trim();
    if (extra) message = extra + (message ? '\n\n' + message : '');
    fetch('/api/bug-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'contact',
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: message,
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

  // Inlaadservice: een pakketknop opent de overlay met het aanvraagformulier, met dat pakket al gekozen.
  function openServiceDialog(index) {
    var dialog = document.getElementById('svcDialog');
    if (!dialog) return;
    var select = document.getElementById('ifPackage');
    if (select && index >= 0 && index < select.options.length) select.selectedIndex = index;
    dialog.hidden = false;
    document.documentElement.classList.add('svc-dialog-open');
    var first = document.getElementById('ifName');
    if (first)
      setTimeout(function () {
        first.focus();
      }, 50);
  }
  function closeServiceDialog() {
    var dialog = document.getElementById('svcDialog');
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    document.documentElement.classList.remove('svc-dialog-open');
  }
  document.addEventListener('click', function (e) {
    var open = e.target.closest && e.target.closest('[data-svc-open]');
    if (open) return openServiceDialog(Number(open.dataset.svcOpen));
    if (e.target.id === 'svcDialog' || (e.target.closest && e.target.closest('[data-svc-close]'))) closeServiceDialog();
  });

  // Taalkeuze: klik ernaast of Esc sluit het venster.
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.site-lang[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeServiceDialog();
      document.querySelectorAll('.site-lang[open]').forEach(function (d) {
        d.removeAttribute('open');
      });
    }
  });

  // Aanleverpagina inlaadservice (/aanleveren?t=...): link controleren, bestanden uploaden en de indeling versturen.
  // Alles via /api/aanleveren; bestanden gaan rechtstreeks naar een afgeschermde opslag met een eenmalige uploadlink.
  function setupDeliver() {
    var form = document.querySelector('[data-deliver]');
    if (!form) return;
    var T = JSON.parse(form.dataset.texts);
    var msg = document.querySelector('[data-deliver-msg]');
    var token = new URLSearchParams(location.search).get('t') || '';
    var list = form.querySelector('[data-deliver-list]');
    var status = form.querySelector('.site-form-status');
    var folders = form.querySelector('#dvFolders');
    var uploaded = 0;
    var foldersEdited = false;
    // De taalknop houdt de persoonlijke link vast.
    document.querySelectorAll('.site-lang a').forEach(function (a) {
      a.href = a.getAttribute('href') + location.search;
    });
    function api(body) {
      body.token = token;
      return fetch('/api/aanleveren', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(function (r) {
        return r.json().then(function (d) {
          if (!r.ok) throw Object.assign(new Error(d.error || ''), { status: r.status });
          return d;
        });
      });
    }
    function addRow(name, text, cls) {
      var li = document.createElement('li');
      var b = document.createElement('b');
      var span = document.createElement('span');
      b.textContent = name;
      span.textContent = text;
      if (cls) li.className = cls;
      li.appendChild(b);
      li.appendChild(span);
      list.appendChild(li);
      return li;
    }
    function upload(file) {
      if (file.size > 50 * 1024 * 1024) return Promise.resolve(addRow(file.name, T.tooBig, 'is-failed'));
      var row = addRow(file.name, T.uploading, 'is-busy');
      return api({ action: 'upload', name: file.name, size: file.size, type: file.type })
        .then(function (d) {
          return fetch(d.url, {
            method: 'PUT',
            headers: { 'Content-Type': file.type || 'application/octet-stream', 'x-upsert': 'false' },
            body: file
          });
        })
        .then(function (r) {
          if (!r.ok) throw new Error();
          uploaded++;
          row.className = 'is-done';
          row.lastChild.textContent = T.uploaded;
        })
        .catch(function () {
          row.className = 'is-failed';
          row.lastChild.textContent = T.failed;
        });
    }
    // Drie bestanden tegelijk, zodat een grote map niet de hele verbinding vastzet.
    function uploadAll(files) {
      var queue = [].slice.call(files);
      function next() {
        var f = queue.shift();
        return f ? upload(f).then(next) : Promise.resolve();
      }
      return Promise.all([next(), next(), next()]);
    }
    folders.addEventListener('input', function () {
      foldersEdited = true;
    });
    form.addEventListener('change', function (e) {
      if (e.target.name === 'structure' && (!foldersEdited || !folders.value.trim())) {
        folders.value = e.target.dataset.folders;
        foldersEdited = false;
      }
      if (e.target.matches('[data-deliver-files]')) {
        uploadAll(e.target.files);
        e.target.value = '';
      }
    });
    var drop = form.querySelector('[data-deliver-drop]');
    ['dragenter', 'dragover'].forEach(function (t) {
      drop.addEventListener(t, function (e) {
        e.preventDefault();
        drop.classList.add('is-over');
      });
    });
    ['dragleave', 'drop'].forEach(function (t) {
      drop.addEventListener(t, function (e) {
        e.preventDefault();
        drop.classList.remove('is-over');
        if (t === 'drop' && e.dataTransfer) uploadAll(e.dataTransfer.files);
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!uploaded) {
        status.textContent = T.needFiles;
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var structure = form.querySelector('input[name="structure"]:checked');
      btn.disabled = true;
      status.textContent = T.busy;
      api({
        action: 'submit',
        structure: structure ? structure.value : '',
        folders: folders.value,
        match: form.match.value,
        notes: form.notes.value
      })
        .then(function () {
          status.textContent = '';
          msg.textContent = T.thanks;
          msg.hidden = false;
          msg.className = 'svc-deliver-msg is-ok';
          msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function (err) {
          status.textContent = err.message || T.failed;
        })
        .then(function () {
          btn.disabled = false;
        });
    });
    if (!token) {
      msg.textContent = T.invalid;
      return;
    }
    api({ action: 'get' })
      .then(function (d) {
        if (d.status === 'klaar') {
          msg.textContent = T.closed;
          return;
        }
        msg.hidden = true;
        form.hidden = false;
        var who = form.querySelector('[data-deliver-who]');
        who.textContent =
          T.hello + ' ' + (d.restaurant || d.name || '') + (d.package ? ' · ' + T.package + ': ' + d.package : '');
        // Eerder ingevuld? Dan staat het er weer.
        if (d.structure) {
          var radio = [].find.call(form.querySelectorAll('input[name="structure"]'), function (r) {
            return r.value === d.structure;
          });
          if (radio) radio.checked = true;
        }
        if (d.folders) {
          folders.value = d.folders;
          foldersEdited = true;
        }
        if (d.match) form.match.value = d.match;
        if (d.notes) form.notes.value = d.notes;
        (d.files || []).forEach(function (name) {
          uploaded++;
          addRow(name, T.uploaded, 'is-done');
        });
      })
      .catch(function () {
        msg.textContent = T.invalid;
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
    if (document.getElementById('appShell') || !/(^|\.)savour\.page$/.test(location.hostname)) return;
    // Testbrowsers en bots tellen niet mee.
    if (navigator.webdriver || /bot|crawl|spider|headless|lighthouse|electron|preview/i.test(navigator.userAgent || ''))
      return;
    // Alleen echte browsers (zelfde regel als api/admin.js).
    if (!/Chrome\/|CriOS|Safari\/|Firefox\/|FxiOS|Edg\//.test(navigator.userAgent || '')) return;
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
    ['bron', 'ref', 'utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) {
      var v = (q.get(k) || '').trim().slice(0, 40);
      if (v) out.push(k + '=' + encodeURIComponent(v));
    });
    ['collega', 'gclid', 'fbclid'].forEach(function (k) {
      if (q.has(k)) out.push(k);
    });
    return out.length ? '?' + out.join('&') : '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
    document.addEventListener('DOMContentLoaded', setupDeliver);
  } else {
    setup();
    setupDeliver();
  }
  logStaticVisit();
})();
