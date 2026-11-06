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

  // Menuknop op telefoon en tablet: opent het menu over het scherm onder de kop. Sluiten met de knop, Escape,
  // een link in het menu, of als het scherm breed genoeg wordt voor het gewone menu.
  function setMenu(header, open) {
    var btn = header.querySelector('.site-menu-btn');
    var menu = header.querySelector('.site-mm');
    if (!btn || !menu) return;
    header.classList.toggle('menu-open', open);
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!btn.dataset.openLabel) btn.dataset.openLabel = btn.getAttribute('aria-label');
    btn.setAttribute('aria-label', open ? btn.dataset.closeLabel : btn.dataset.openLabel);
    document.body.classList.toggle('site-menu-open', open);
    if (open)
      document.documentElement.style.setProperty('--site-header-h', header.getBoundingClientRect().bottom + 'px');
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.site-menu-btn');
    if (btn) {
      var header = btn.closest('.site-header');
      setMenu(header, !header.classList.contains('menu-open'));
      return;
    }
    var link = e.target.closest && e.target.closest('.site-mm a');
    if (link) setMenu(link.closest('.site-header'), false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.site-header.menu-open').forEach(function (h) {
      setMenu(h, false);
      h.querySelector('.site-menu-btn').focus();
    });
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1040)
      document.querySelectorAll('.site-header.menu-open').forEach(function (h) {
        setMenu(h, false);
      });
  });

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

  // Import service: een pakketknop opent de overlay met het aanvraagformulier, met dat pakket al gekozen.
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
  // Buiten het venster klikken sluit het, maar alleen als de klik daar ook begon: tekst selecteren en de muis
  // buiten het venster loslaten sluit het dus niet.
  var downOnBackdrop = false;
  document.addEventListener('pointerdown', function (e) {
    downOnBackdrop = e.target.id === 'svcDialog';
  });
  document.addEventListener('click', function (e) {
    var open = e.target.closest && e.target.closest('[data-svc-open]');
    if (open) return openServiceDialog(Number(open.dataset.svcOpen));
    if ((e.target.id === 'svcDialog' && downOnBackdrop) || (e.target.closest && e.target.closest('[data-svc-close]')))
      closeServiceDialog();
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

  // Import service, aanvraag in de overlay: naar /api/aanleveren (actie request). Komt in /admin → Inladen en per mail.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.matches || !form.matches('[data-intake-request]')) return;
    e.preventDefault();
    var status = form.querySelector('.site-form-status');
    var btn = form.querySelector('button[type="submit"]');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    btn.disabled = true;
    status.textContent = form.dataset.busy;
    fetch('/api/aanleveren', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'request',
        language: form.dataset.lang,
        package: form.package.value,
        seats: form.seats.value,
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        restaurant: form.restaurant.value.trim(),
        notes: form.notes.value.trim(),
        website: form.website.value
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

  // Aanleverpagina import service (/aanleveren?t=...). Per stand van zaken één deel tonen:
  // goedgekeurd → betalen; betaald/aangeleverd → aanleveren (bestanden, mappen, leden); anders een melding.
  // Alles via /api/aanleveren; bestanden gaan rechtstreeks naar een afgeschermde opslag met een eenmalige uploadlink.
  function setupDeliver() {
    var root = document.querySelector('[data-deliver]');
    if (!root) return;
    var T = JSON.parse(root.dataset.texts);
    var lang = root.dataset.lang;
    var msg = root.querySelector('[data-deliver-msg]');
    var who = root.querySelector('[data-deliver-who]');
    var pay = root.querySelector('[data-stage="pay"]');
    var form = root.querySelector('[data-stage="deliver"]');
    var params = new URLSearchParams(location.search);
    var token = params.get('t') || '';
    var list = form.querySelector('[data-deliver-list]');
    var status = form.querySelector('.site-form-status');
    var folders = form.querySelector('#dvFolders');
    var membersList = form.querySelector('[data-members]');
    var uploaded = 0;
    var foldersEdited = false;
    var info = null;
    var euro = function (v) {
      var n = Number(v).toFixed(Number(v) % 1 ? 2 : 0);
      return lang === 'de' || lang === 'es' || lang === 'fr'
        ? n.replace('.', ',') + ' €'
        : '€' + (lang === 'nl' ? n.replace('.', ',') : n);
    };
    // De taalknop houdt de persoonlijke link vast.
    document.querySelectorAll('.site-lang a').forEach(function (a) {
      a.href = a.getAttribute('href') + location.search;
    });
    function say(text, ok) {
      msg.textContent = text;
      msg.hidden = false;
      msg.className = 'svc-deliver-msg' + (ok ? ' is-ok' : '');
    }
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

    // ---- Betalen ----
    function renderTotal() {
      var seats = Number((pay.querySelector('input[name="seats"]:checked') || {}).value || 5);
      var cents = info.price_cents;
      pay.querySelector('[data-pay-total]').innerHTML = '';
      [
        [T.service + (info.package ? ' · ' + info.package : ''), cents ? euro(cents / 100) + ' ' + T.once : T.free],
        [
          pay.querySelector('input[value="' + seats + '"] + span b').textContent,
          euro(info.seat_prices[seats]) + ' ' + T.perYear
        ]
      ].forEach(function (row) {
        var p = document.createElement('p');
        var a = document.createElement('span');
        var b = document.createElement('b');
        a.textContent = row[0];
        b.textContent = row[1];
        p.appendChild(a);
        p.appendChild(b);
        pay.querySelector('[data-pay-total]').appendChild(p);
      });
    }
    function showPay() {
      pay.hidden = false;
      pay.querySelectorAll('[data-seat-price]').forEach(function (el) {
        el.textContent = euro(info.seat_prices[el.dataset.seatPrice]) + ' ' + T.perYear;
      });
      var pick = pay.querySelector('input[name="seats"][value="' + (info.seats || 5) + '"]');
      if (pick) pick.checked = true;
      renderTotal();
      pay.addEventListener('change', renderTotal);
      pay.querySelector('[data-pay]').addEventListener('click', function () {
        var st = pay.querySelector('[data-pay-status]');
        var btn = this;
        btn.disabled = true;
        st.textContent = T.paying;
        api({ action: 'checkout', seats: (pay.querySelector('input[name="seats"]:checked') || {}).value })
          .then(function (d) {
            location.href = d.url;
          })
          .catch(function (err) {
            st.textContent = err.message || T.failed;
            btn.disabled = false;
          });
      });
    }

    // ---- Leden van de organisatie ----
    function memberRow(m) {
      var li = document.createElement('li');
      var input = document.createElement('input');
      var select = document.createElement('select');
      var del = document.createElement('button');
      input.type = 'email';
      input.placeholder = T.memberEmail;
      input.value = (m && m.email) || '';
      input.setAttribute('aria-label', T.memberEmail);
      [
        ['viewer', T.roleView],
        ['editor', T.roleEdit]
      ].forEach(function (o) {
        var opt = document.createElement('option');
        opt.value = o[0];
        opt.textContent = o[1];
        select.appendChild(opt);
      });
      select.value = (m && m.role) || 'viewer';
      del.type = 'button';
      del.className = 'svc-member-del';
      del.textContent = '×';
      del.setAttribute('aria-label', T.remove);
      del.addEventListener('click', function () {
        li.remove();
      });
      li.appendChild(input);
      li.appendChild(select);
      li.appendChild(del);
      membersList.appendChild(li);
      return input;
    }
    form.querySelector('[data-add-member]').addEventListener('click', function () {
      var max = (info.seats || 5) - 1;
      if (membersList.children.length >= max) return (status.textContent = T.tooMany[max]);
      memberRow().focus();
    });

    // ---- Bestanden ----
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
        .catch(function (err) {
          row.className = 'is-failed';
          row.lastChild.textContent = (err && err.message) || T.failed;
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
      var members = [].map
        .call(membersList.children, function (li) {
          return { email: li.querySelector('input').value.trim(), role: li.querySelector('select').value };
        })
        .filter(function (m) {
          return m.email;
        });
      var btn = form.querySelector('button[type="submit"]');
      var structure = form.querySelector('input[name="structure"]:checked');
      btn.disabled = true;
      status.textContent = T.busy;
      api({
        action: 'submit',
        structure: structure ? structure.value : '',
        folders: folders.value,
        match: form.match.value,
        notes: form.notes.value,
        members: members
      })
        .then(function () {
          status.textContent = '';
          btn.textContent = T.resubmit;
          say(T.thanks, true);
          msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function (err) {
          status.textContent = err.message || T.failed;
        })
        .then(function () {
          btn.disabled = false;
        });
    });
    function showDeliver() {
      form.hidden = false;
      form.querySelector('[data-members-hint]').textContent = T.membersHint[info.seats || 5] || '';
      if (info.structure) {
        var radio = [].find.call(form.querySelectorAll('input[name="structure"]'), function (r) {
          return r.value === info.structure;
        });
        if (radio) radio.checked = true;
      }
      if (info.folders) {
        folders.value = info.folders;
        foldersEdited = true;
      }
      if (info.match) form.match.value = info.match;
      if (info.notes) form.notes.value = info.notes;
      (info.members || []).forEach(memberRow);
      if (!(info.members || []).length && (info.seats || 5) > 1) memberRow();
      (info.files || []).forEach(function (name) {
        uploaded++;
        addRow(name, T.uploaded, 'is-done');
      });
      // Al eerder verstuurd: dezelfde knop slaat de wijzigingen op.
      if (info.status === 'ingediend') {
        form.querySelector('button[type="submit"]').textContent = T.resubmit;
        say(T.thanks, true);
      } else msg.hidden = true;
    }

    // ---- Stand van zaken ----
    var tries = 0;
    function load() {
      api({ action: 'get', session_id: params.get('session_id') || '' })
        .then(function (d) {
          info = d;
          who.hidden = false;
          who.textContent =
            T.hello + ' ' + (d.restaurant || d.name || '') + (d.package ? ' · ' + T.package + ': ' + d.package : '');
          if (d.status === 'aanvraag') return say(T.reviewing);
          if (d.status === 'afgewezen') return say(T.rejected);
          if (d.status === 'bezig') return say(T.importing, true);
          if (d.status === 'klaar') return say(T.closed);
          if (d.status === 'goedgekeurd') {
            // Net betaald: Stripe meldt de betaling binnen een paar seconden; tot die tijd even wachten.
            if (params.get('betaald') && tries++ < 20) {
              say(T.processing, true);
              return setTimeout(load, 3000);
            }
            msg.hidden = true;
            return showPay();
          }
          showDeliver();
        })
        .catch(function () {
          say(T.invalid);
        });
    }
    if (!token) return say(T.invalid);
    load();
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
      // Eigen test, bijvoorbeeld in incognito: open een pagina met ?intern en dit venster telt niet meer mee.
      if (/[?&]intern\b/.test(location.search)) localStorage.setItem('savour_intern', '1');
      if (localStorage.getItem('savour_intern')) return;
      var vid = localStorage.getItem('savour_visit_id');
      if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem('savour_visit_id', vid);
      }
      var key = 'sb_publishable_R8DGUuglOC3aFz5qv4xOgw_UGdQUyiD';
      var url = 'https://qmzfqfmpylkgcnxsedse.supabase.co/rest/v1/site_visits';
      var headers = {
        apikey: key,
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      };
      var visit = {
        visitor_id: vid,
        path: location.pathname + visitSourceQuery(),
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
        country: window.savourCountry ? window.savourCountry() : null
      };
      fetch(url, { method: 'POST', keepalive: true, headers: headers, body: JSON.stringify(visit) })
        .then(function (r) {
          // Zonder de kolom country (supabase/2026-10-27-land.sql nog niet uitgevoerd): opnieuw zonder land.
          if (r.status === 400 && visit.country) {
            delete visit.country;
            return fetch(url, { method: 'POST', keepalive: true, headers: headers, body: JSON.stringify(visit) });
          }
        })
        .catch(function () {});
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

  // Startpagina: echte totalen (recepten, keukenteams, accounts) uit de database. Lukt dat niet, dan blijft
  // de strook verborgen in plaats van oude of verzonnen getallen te tonen.
  function setupFigures() {
    var bands = document.querySelectorAll('[data-site-figures]');
    if (!bands.length || !window.fetch) return;
    fetch('/api/admin?cijfers=1')
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (d) {
        if (!d) return;
        var fmt = new Intl.NumberFormat(document.documentElement.lang || 'nl');
        var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        bands.forEach(function (band) {
          var cells = [].slice.call(band.querySelectorAll('[data-figure]'));
          var values = cells.map(function (el) {
            return d[el.getAttribute('data-figure')];
          });
          if (
            values.some(function (n) {
              return typeof n !== 'number';
            })
          )
            return;
          cells.forEach(function (el, i) {
            var label = el.previousElementSibling;
            if (values[i] === 1 && label && label.dataset.one) label.textContent = label.dataset.one;
          });
          band.hidden = false;
          // Optellen van 0 naar het echte getal (ruim een seconde), pas als de strook in beeld komt.
          var show = function () {
            if (still) {
              cells.forEach(function (el, i) {
                el.textContent = fmt.format(values[i]);
              });
              return;
            }
            var start = null;
            var step = function (now) {
              if (start == null) start = now;
              var p = Math.min(1, (now - start) / 1400);
              var ease = 1 - Math.pow(1 - p, 3);
              cells.forEach(function (el, i) {
                el.textContent = fmt.format(Math.round(values[i] * ease));
              });
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          };
          if (!('IntersectionObserver' in window)) return show();
          var io = new IntersectionObserver(
            function (entries) {
              if (
                entries.some(function (e) {
                  return e.isIntersecting;
                })
              ) {
                io.disconnect();
                show();
              }
            },
            { threshold: 0.4 }
          );
          io.observe(band);
        });
      })
      .catch(function () {});
  }

  // Ingrediëntenlijst met allergenen (/ingredientenlijst-allergenen): de lijst die Savour leest, doorzoekbaar op
  // naam, andere schrijfwijze of Engelse naam, en te filteren op één allergeen. Gegevens: tools/build-ingredientenlijst.mjs.
  function setupIngredientList() {
    var root = document.querySelector('[data-ingredient-list]');
    if (!root || !window.fetch) return;
    var T = JSON.parse(root.dataset.texts);
    var input = root.querySelector('.ing-search');
    var select = root.querySelector('.ing-filter');
    var list = root.querySelector('.ing-rows');
    var count = root.querySelector('.ing-count');
    var more = root.querySelector('.ing-more');
    var STEP = 60;
    var items = [];
    var found = [];
    var shown = 0;
    var esc = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    };
    var norm = function (s) {
      return String(s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
    };
    var codes = Object.keys(T.labels);
    var option = function (c) {
      return '<option value="' + c + '">' + esc(T.labels[c][0]) + '</option>';
    };
    select.innerHTML =
      '<option value="">' +
      esc(T.filter) +
      '</option><optgroup label="EU 14">' +
      codes
        .filter(function (c) {
          return !T.labels[c][1];
        })
        .map(option)
        .join('') +
      '</optgroup><optgroup label="+">' +
      codes
        .filter(function (c) {
          return T.labels[c][1];
        })
        .map(option)
        .join('') +
      '</optgroup>';

    function rowHtml(r) {
      var chips = r.codes.length
        ? r.codes
            .map(function (c) {
              var l = T.labels[c];
              return l ? '<span class="ing-chip' + (l[1] ? ' extra' : '') + '">' + esc(l[0]) + '</span>' : '';
            })
            .join('')
        : '<span class="ing-none">' + esc(T.none) + '</span>';
      var also = r.aliases.slice(0, 8).join(', ') + (r.aliases.length > 8 ? ' …' : '');
      var src = r.src
        .split('')
        .map(function (x) {
          return T.sourceNames[x];
        })
        .join(' + ');
      return (
        '<li><div class="ing-name"><b translate="no">' +
        esc(r.name) +
        '</b>' +
        (r.en ? '<span translate="no">' + esc(r.en) + '</span>' : '') +
        '</div><div class="ing-chips">' +
        chips +
        '</div>' +
        (also
          ? '<p class="ing-also"><span>' + esc(T.also) + ':</span> <span translate="no">' + esc(also) + '</span></p>'
          : '') +
        '<p class="ing-src">' +
        esc(T.source) +
        ': ' +
        esc(src) +
        '</p></li>'
      );
    }
    function showMore() {
      var next = found.slice(shown, shown + STEP);
      list.insertAdjacentHTML('beforeend', next.map(rowHtml).join(''));
      shown += next.length;
      more.hidden = shown >= found.length;
    }
    function run() {
      var q = norm(input.value);
      var code = select.value;
      var rank = function (r) {
        if (!q) return 0;
        if (r.key === q) return 0;
        if (r.key.indexOf(q) === 0) return 1;
        if (r.key.indexOf(q) >= 0) return 2;
        return r.search.indexOf(q) >= 0 ? 3 : -1;
      };
      found = items
        .map(function (r) {
          return [rank(r), r];
        })
        .filter(function (x) {
          return x[0] >= 0 && (!code || x[1].codes.indexOf(code) >= 0);
        })
        .sort(function (a, b) {
          return a[0] - b[0];
        })
        .map(function (x) {
          return x[1];
        });
      var fmt = new Intl.NumberFormat(document.documentElement.lang || 'nl');
      count.textContent = T.shown.replace('{n}', fmt.format(found.length)).replace('{total}', fmt.format(items.length));
      list.innerHTML = found.length ? '' : '<li class="ing-empty">' + esc(T.empty) + '</li>';
      shown = 0;
      showMore();
    }
    fetch(root.dataset.src)
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        items = d.items.map(function (x) {
          var aliases = x[2] ? x[2].split('|') : [];
          var en = x[3] ? x[3].split('|')[0] : '';
          return {
            name: x[0],
            codes: x[1] ? x[1].split(',') : [],
            aliases: aliases,
            en: en,
            src: x[4],
            key: norm(x[0]),
            search: norm([x[0]].concat(aliases, x[3] ? x[3].split('|') : []).join(' | '))
          };
        });
        var timer;
        input.addEventListener('input', function () {
          clearTimeout(timer);
          timer = setTimeout(run, 120);
        });
        select.addEventListener('change', run);
        more.addEventListener('click', showMore);
        run();
      })
      .catch(function () {
        list.innerHTML = '<li class="ing-empty">' + esc(T.empty) + '</li>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
    document.addEventListener('DOMContentLoaded', setupDeliver);
    document.addEventListener('DOMContentLoaded', setupFigures);
    document.addEventListener('DOMContentLoaded', setupIngredientList);
  } else {
    setup();
    setupDeliver();
    setupFigures();
    setupIngredientList();
  }
  logStaticVisit();
})();
