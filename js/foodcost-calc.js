// Gratis foodcost calculator op de website (blog "Gratis foodcost calculator", 2026-11-24). Wordt door js/site.js
// alleen geladen op een pagina met <div class="fc-calc">. Eenvoudig en los van de app: niets wordt opgeslagen behalve
// in deze browser (localStorage). De uitgebreide calculator in Savour (vanuit recepten, prijslijsten van leveranciers)
// is een apart project (docs/opdracht-foodcost-calculator.md).
// Rekenregels: kosten van een regel = hoeveelheid (in g, ml of stuks) × inkoopprijs per g/ml/stuk ÷ opbrengst.
// Een regel zonder prijs of hoeveelheid telt nooit als 0: het totaal heet dan "nog niet compleet".
(function () {
  var T = {
    nl: {
      dish: 'Gerecht',
      dishPh: 'Bijv. risotto met paddenstoelen',
      portions: 'Porties',
      currency: 'Valuta',
      ing: 'Ingrediënt',
      qty: 'Hoeveelheid',
      unit: 'Eenheid',
      price: 'Inkoopprijs',
      per: 'Per',
      yield: 'Opbrengst %',
      cost: 'Kosten',
      add: '+ Ingrediënt toevoegen',
      remove: 'Verwijderen',
      example: 'Voorbeeld laden',
      reset: 'Leegmaken',
      print: 'Printen',
      total: 'Kosten recept',
      perPortion: 'Kostprijs per portie',
      target: 'Doel-foodcost',
      advice: 'Adviesprijs zonder btw',
      vat: 'Btw %',
      adviceVat: 'Adviesprijs met btw',
      menu: 'Je kaartprijs zonder btw',
      menuPh: 'Bijv. 17,89',
      actual: 'Foodcost met jouw prijs',
      margin: 'Marge per bord',
      incomplete: function (n) {
        return n === 1
          ? '1 regel mist nog een prijs of hoeveelheid; de uitkomst volgt als alles compleet is.'
          : n + ' regels missen nog een prijs of hoeveelheid; de uitkomst volgt als alles compleet is.';
      },
      mismatch: 'Eenheid past niet bij de prijs',
      empty: 'Vul hierboven je ingrediënten in.',
      piece: 'stuk',
      perPiece: 'stuk',
      exampleNote: 'Voorbeeld met verzonnen inkoopprijzen, uit het artikel Foodcost berekenen.',
      saved: 'Wordt alleen in deze browser bewaard.',
      ingPh: 'Bijv. boter',
      vatDefault: '9'
    },
    en: {
      dish: 'Dish',
      dishPh: 'E.g. mushroom risotto',
      portions: 'Portions',
      currency: 'Currency',
      ing: 'Ingredient',
      qty: 'Quantity',
      unit: 'Unit',
      price: 'Purchase price',
      per: 'Per',
      yield: 'Yield %',
      cost: 'Cost',
      add: '+ Add ingredient',
      remove: 'Remove',
      example: 'Load example',
      reset: 'Clear',
      print: 'Print',
      total: 'Recipe cost',
      perPortion: 'Cost per portion',
      target: 'Target food cost',
      advice: 'Suggested price before tax',
      vat: 'Tax %',
      adviceVat: 'Suggested price with tax',
      menu: 'Your menu price before tax',
      menuPh: 'E.g. 17.89',
      actual: 'Food cost at your price',
      margin: 'Margin per plate',
      incomplete: function (n) {
        return n === 1
          ? '1 line is missing a price or quantity; the result follows once everything is complete.'
          : n + ' lines are missing a price or quantity; the result follows once everything is complete.';
      },
      mismatch: 'Unit does not match the price',
      empty: 'Enter your ingredients above.',
      piece: 'piece',
      perPiece: 'piece',
      exampleNote: 'Example with made-up purchase prices, from the article How to calculate food cost.',
      saved: 'Only saved in this browser.',
      ingPh: 'E.g. butter',
      vatDefault: ''
    },
    de: {
      dish: 'Gericht',
      dishPh: 'Z. B. Pilzrisotto',
      portions: 'Portionen',
      currency: 'Währung',
      ing: 'Zutat',
      qty: 'Menge',
      unit: 'Einheit',
      price: 'Einkaufspreis',
      per: 'Pro',
      yield: 'Ausbeute %',
      cost: 'Kosten',
      add: '+ Zutat hinzufügen',
      remove: 'Entfernen',
      example: 'Beispiel laden',
      reset: 'Leeren',
      print: 'Drucken',
      total: 'Kosten Rezeptur',
      perPortion: 'Wareneinsatz pro Portion',
      target: 'Ziel-Wareneinsatz',
      advice: 'Preisvorschlag netto',
      vat: 'MwSt. %',
      adviceVat: 'Preisvorschlag brutto',
      menu: 'Dein Kartenpreis netto',
      menuPh: 'Z. B. 17,89',
      actual: 'Wareneinsatz mit deinem Preis',
      margin: 'Rohertrag pro Teller',
      incomplete: function (n) {
        return n === 1
          ? '1 Zeile hat noch keinen Preis oder keine Menge; das Ergebnis folgt, sobald alles vollständig ist.'
          : n + ' Zeilen haben noch keinen Preis oder keine Menge; das Ergebnis folgt, sobald alles vollständig ist.';
      },
      mismatch: 'Einheit passt nicht zum Preis',
      empty: 'Trage oben deine Zutaten ein.',
      piece: 'Stück',
      perPiece: 'Stück',
      exampleNote: 'Beispiel mit ausgedachten Einkaufspreisen, aus dem Artikel Wareneinsatz berechnen.',
      saved: 'Wird nur in diesem Browser gespeichert.',
      ingPh: 'Z. B. Butter',
      vatDefault: ''
    },
    es: {
      dish: 'Plato',
      dishPh: 'P. ej. risotto de setas',
      portions: 'Raciones',
      currency: 'Moneda',
      ing: 'Ingrediente',
      qty: 'Cantidad',
      unit: 'Unidad',
      price: 'Precio de compra',
      per: 'Por',
      yield: 'Rendimiento %',
      cost: 'Coste',
      add: '+ Añadir ingrediente',
      remove: 'Quitar',
      example: 'Cargar ejemplo',
      reset: 'Vaciar',
      print: 'Imprimir',
      total: 'Coste de la receta',
      perPortion: 'Coste por ración',
      target: 'Food cost objetivo',
      advice: 'Precio sugerido sin IVA',
      vat: 'IVA %',
      adviceVat: 'Precio sugerido con IVA',
      menu: 'Tu precio de carta sin IVA',
      menuPh: 'P. ej. 17,89',
      actual: 'Food cost con tu precio',
      margin: 'Margen por plato',
      incomplete: function (n) {
        return n === 1
          ? 'A 1 línea le falta precio o cantidad; el resultado aparece cuando todo esté completo.'
          : 'A ' + n + ' líneas les falta precio o cantidad; el resultado aparece cuando todo esté completo.';
      },
      mismatch: 'La unidad no encaja con el precio',
      empty: 'Introduce tus ingredientes arriba.',
      piece: 'unidad',
      perPiece: 'unidad',
      exampleNote: 'Ejemplo con precios de compra inventados, del artículo Cómo calcular el food cost.',
      saved: 'Solo se guarda en este navegador.',
      ingPh: 'P. ej. mantequilla',
      vatDefault: ''
    },
    fr: {
      dish: 'Plat',
      dishPh: 'Ex. risotto aux champignons',
      portions: 'Portions',
      currency: 'Devise',
      ing: 'Ingrédient',
      qty: 'Quantité',
      unit: 'Unité',
      price: 'Prix d’achat',
      per: 'Par',
      yield: 'Rendement %',
      cost: 'Coût',
      add: '+ Ajouter un ingrédient',
      remove: 'Supprimer',
      example: 'Charger l’exemple',
      reset: 'Vider',
      print: 'Imprimer',
      total: 'Coût de la recette',
      perPortion: 'Coût matière par portion',
      target: 'Food cost cible',
      advice: 'Prix conseillé HT',
      vat: 'TVA %',
      adviceVat: 'Prix conseillé TTC',
      menu: 'Ton prix carte HT',
      menuPh: 'Ex. 17,89',
      actual: 'Food cost à ton prix',
      margin: 'Marge par assiette',
      incomplete: function (n) {
        return n === 1
          ? '1 ligne n’a pas encore de prix ou de quantité ; le résultat s’affiche quand tout est complet.'
          : n + ' lignes n’ont pas encore de prix ou de quantité ; le résultat s’affiche quand tout est complet.';
      },
      mismatch: 'L’unité ne correspond pas au prix',
      empty: 'Saisis tes ingrédients ci-dessus.',
      piece: 'pièce',
      perPiece: 'pièce',
      exampleNote: 'Exemple avec des prix d’achat inventés, tiré de l’article Calculer le food cost.',
      saved: 'Enregistré seulement dans ce navigateur.',
      ingPh: 'Ex. beurre',
      vatDefault: ''
    }
  };
  // Eenheden: soort (m = massa in g, v = volume in ml, p = stuk) en factor naar g, ml of stuk.
  var QTY = { g: ['m', 1], kg: ['m', 1000], ml: ['v', 1], cl: ['v', 10], dl: ['v', 100], l: ['v', 1000], st: ['p', 1] };
  var PER = { kg: ['m', 1000], g: ['m', 1], l: ['v', 1000], ml: ['v', 1], st: ['p', 1] };
  // Het rekenvoorbeeld uit "Foodcost berekenen" (risotto, verzonnen prijzen), zodat je ziet hoe het werkt.
  var EXAMPLE = {
    nl: [
      'Risotto met paddenstoelen',
      [
        'Paddenstoelenmix',
        'Parmezaan',
        'Kippenbouillon',
        'Arborio-rijst',
        'Witte wijn',
        'Sjalot, knoflook, kruiden',
        'Boter'
      ]
    ],
    en: [
      'Mushroom risotto',
      ['Mushroom mix', 'Parmesan', 'Chicken stock', 'Arborio rice', 'White wine', 'Shallot, garlic, herbs', 'Butter']
    ],
    de: [
      'Pilzrisotto',
      ['Pilzmischung', 'Parmesan', 'Hühnerbrühe', 'Arborio-Reis', 'Weißwein', 'Schalotte, Knoblauch, Kräuter', 'Butter']
    ],
    es: [
      'Risotto de setas',
      [
        'Mezcla de setas',
        'Parmesano',
        'Caldo de pollo',
        'Arroz arborio',
        'Vino blanco',
        'Chalota, ajo, hierbas',
        'Mantequilla'
      ]
    ],
    fr: [
      'Risotto aux champignons',
      [
        'Mélange de champignons',
        'Parmesan',
        'Bouillon de volaille',
        'Riz arborio',
        'Vin blanc',
        'Échalote, ail, herbes',
        'Beurre'
      ]
    ]
  };
  var EXAMPLE_ROWS = [
    ['120', 'g', '14', 'kg', '85'],
    ['25', 'g', '24', 'kg', '100'],
    ['350', 'ml', '1,2', 'l', '100'],
    ['90', 'g', '4,2', 'kg', '100'],
    ['50', 'ml', '6', 'l', '100'],
    ['1', 'st', '0,25', 'st', '100'],
    ['20', 'g', '9', 'kg', '100']
  ];
  var KEY = 'savour_fc_calc';

  function num(v) {
    var s = String(v == null ? '' : v)
      .trim()
      .replace(/\s/g, '');
    if (!s) return null;
    // 1.234,56 en 1,234.56 en 1234,56: de laatste komma of punt is het decimaalteken.
    var last = Math.max(s.lastIndexOf(','), s.lastIndexOf('.'));
    if (last >= 0) s = s.slice(0, last).replace(/[.,]/g, '') + '.' + s.slice(last + 1);
    var n = Number(s);
    return isFinite(n) ? n : null;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function setup(root) {
    var lang = (document.documentElement.lang || 'nl').slice(0, 2);
    var t = T[lang] || T.nl;
    var locale = { nl: 'nl-NL', en: 'en-GB', de: 'de-DE', es: 'es-ES', fr: 'fr-FR' }[lang] || 'nl-NL';
    var state = load() || blank();
    function blank() {
      return {
        dish: '',
        portions: '1',
        currency: 'EUR',
        target: 30,
        vat: t.vatDefault,
        menu: '',
        rows: [row(), row(), row()]
      };
    }
    function row(v) {
      v = v || [];
      return {
        name: v[0] || '',
        qty: v[1] || '',
        unit: v[2] || 'g',
        price: v[3] || '',
        per: v[4] || 'kg',
        yield: v[5] || '100'
      };
    }
    function load() {
      try {
        var s = JSON.parse(localStorage.getItem(KEY) || 'null');
        return s && Array.isArray(s.rows) ? s : null;
      } catch (e) {
        return null;
      }
    }
    function save() {
      try {
        localStorage.setItem(KEY, JSON.stringify(state));
      } catch (e) {}
    }
    function money(v) {
      try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: state.currency || 'EUR' }).format(v);
      } catch (e) {
        return v.toFixed(2);
      }
    }
    function pct(v) {
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(v) + '%';
    }
    // Kosten van één regel, of null als er iets ontbreekt; 'x' als eenheid en prijs niet bij elkaar passen.
    function lineCost(r) {
      var q = num(r.qty);
      var p = num(r.price);
      var y = num(r.yield);
      if (q == null || p == null || q < 0 || p < 0) return null;
      var qu = QTY[r.unit];
      var pu = PER[r.per];
      if (!qu || !pu || qu[0] !== pu[0]) return 'x';
      var yieldFactor = y && y > 0 && y <= 100 ? y / 100 : 1;
      return (q * qu[1] * (p / pu[1])) / yieldFactor;
    }
    var units = function (sel, list) {
      return list
        .map(function (u) {
          var label = u === 'st' ? t.piece : u;
          return '<option value="' + u + '"' + (u === sel ? ' selected' : '') + '>' + esc(label) + '</option>';
        })
        .join('');
    };
    function render() {
      root.innerHTML =
        '<div class="fc-head"><label class="fc-field fc-dish"><span>' +
        esc(t.dish) +
        '</span><input data-k="dish" value="' +
        esc(state.dish) +
        '" placeholder="' +
        esc(t.dishPh) +
        '"></label>' +
        '<label class="fc-field"><span>' +
        esc(t.portions) +
        '</span><input data-k="portions" inputmode="decimal" value="' +
        esc(state.portions) +
        '"></label>' +
        '<label class="fc-field"><span>' +
        esc(t.currency) +
        '</span><select data-k="currency">' +
        ['EUR', 'GBP', 'USD', 'CHF']
          .map(function (c) {
            return '<option' + (c === state.currency ? ' selected' : '') + '>' + c + '</option>';
          })
          .join('') +
        '</select></label></div>' +
        '<div class="fc-table" role="table"><div class="fc-row fc-th" role="row"><span>' +
        esc(t.ing) +
        '</span><span>' +
        esc(t.qty) +
        '</span><span>' +
        esc(t.unit) +
        '</span><span>' +
        esc(t.price) +
        '</span><span>' +
        esc(t.per) +
        '</span><span>' +
        esc(t.yield) +
        '</span><span>' +
        esc(t.cost) +
        '</span><span></span></div>' +
        state.rows
          .map(function (r, i) {
            return (
              '<div class="fc-row" role="row" data-i="' +
              i +
              '">' +
              '<input aria-label="' +
              esc(t.ing) +
              '" data-r="name" value="' +
              esc(r.name) +
              '" placeholder="' +
              esc(t.ingPh) +
              '">' +
              '<label class="fc-cell"><span class="fc-cap">' +
              esc(t.qty) +
              '</span>' +
              '<input aria-label="' +
              esc(t.qty) +
              '" data-r="qty" inputmode="decimal" value="' +
              esc(r.qty) +
              '" placeholder="' +
              esc(t.qty) +
              '"></label>' +
              '<label class="fc-cell"><span class="fc-cap">' +
              esc(t.unit) +
              '</span>' +
              '<select aria-label="' +
              esc(t.unit) +
              '" data-r="unit">' +
              units(r.unit, ['g', 'kg', 'ml', 'cl', 'dl', 'l', 'st']) +
              '</select></label>' +
              '<label class="fc-cell"><span class="fc-cap">' +
              esc(t.price) +
              '</span>' +
              '<input aria-label="' +
              esc(t.price) +
              '" data-r="price" inputmode="decimal" value="' +
              esc(r.price) +
              '" placeholder="' +
              esc(t.price) +
              '"></label>' +
              '<label class="fc-cell"><span class="fc-cap">' +
              esc(t.per) +
              '</span>' +
              '<select aria-label="' +
              esc(t.per) +
              '" data-r="per">' +
              units(r.per, ['kg', 'g', 'l', 'ml', 'st']) +
              '</select></label>' +
              '<label class="fc-cell"><span class="fc-cap">' +
              esc(t.yield) +
              '</span>' +
              '<input aria-label="' +
              esc(t.yield) +
              '" data-r="yield" inputmode="decimal" value="' +
              esc(r.yield) +
              '"></label>' +
              '<output class="fc-cost" data-cost></output>' +
              '<button type="button" class="fc-del" data-del aria-label="' +
              esc(t.remove) +
              '" title="' +
              esc(t.remove) +
              '">×</button></div>'
            );
          })
          .join('') +
        '</div>' +
        '<div class="fc-actions"><button type="button" class="fc-btn" data-add>' +
        esc(t.add) +
        '</button><span class="fc-spacer"></span>' +
        '<button type="button" class="fc-btn quiet" data-example>' +
        esc(t.example) +
        '</button><button type="button" class="fc-btn quiet" data-reset>' +
        esc(t.reset) +
        '</button><button type="button" class="fc-btn quiet" data-print>' +
        esc(t.print) +
        '</button></div>' +
        '<p class="fc-note" data-note></p>' +
        '<div class="fc-results">' +
        '<div class="fc-res"><span>' +
        esc(t.total) +
        '</span><b data-total>—</b></div>' +
        '<div class="fc-res is-main"><span>' +
        esc(t.perPortion) +
        '</span><b data-portion>—</b></div>' +
        '<div class="fc-res fc-target"><span>' +
        esc(t.target) +
        ' <b data-targetv>' +
        pct(state.target) +
        '</b></span><input type="range" min="15" max="50" step="1" data-k="target" value="' +
        esc(state.target) +
        '" aria-label="' +
        esc(t.target) +
        '"></div>' +
        '<div class="fc-res"><span>' +
        esc(t.advice) +
        '</span><b data-advice>—</b></div>' +
        '<label class="fc-res fc-field"><span>' +
        esc(t.vat) +
        '</span><input data-k="vat" inputmode="decimal" value="' +
        esc(state.vat) +
        '"></label>' +
        '<div class="fc-res"><span>' +
        esc(t.adviceVat) +
        '</span><b data-advicevat>—</b></div>' +
        '<label class="fc-res fc-field"><span>' +
        esc(t.menu) +
        '</span><input data-k="menu" inputmode="decimal" value="' +
        esc(state.menu) +
        '" placeholder="' +
        esc(t.menuPh) +
        '"></label>' +
        '<div class="fc-res"><span>' +
        esc(t.actual) +
        '</span><b data-actual>—</b></div>' +
        '<div class="fc-res"><span>' +
        esc(t.margin) +
        '</span><b data-margin>—</b></div>' +
        '</div><p class="fc-small">' +
        esc(t.saved) +
        '</p>';
      calc();
    }
    function calc() {
      var total = 0;
      var missing = 0;
      var wrong = 0;
      var used = 0;
      root.querySelectorAll('.fc-row[data-i]').forEach(function (el) {
        var r = state.rows[+el.getAttribute('data-i')];
        var c = lineCost(r);
        var out = el.querySelector('[data-cost]');
        var hasAny = r.name || r.qty || r.price;
        el.classList.toggle('is-bad', c === 'x' && !!hasAny);
        el.classList.toggle('is-missing', c == null && !!hasAny);
        if (c === 'x') {
          out.textContent = '!';
          out.title = t.mismatch;
          if (hasAny) wrong++;
        } else if (c == null) {
          out.textContent = '—';
          out.title = '';
          if (hasAny) missing++;
        } else {
          out.textContent = money(c);
          out.title = '';
          total += c;
          used++;
        }
      });
      var portions = num(state.portions);
      // Is er een regel onvolledig of past de eenheid niet, dan geen uitkomst: nooit een totaal dat compleet lijkt.
      var complete = used > 0 && !missing && !wrong;
      var perPortion = complete && portions && portions > 0 ? total / portions : null;
      var note = root.querySelector('[data-note]');
      note.textContent =
        !used && !missing && !wrong
          ? t.empty
          : [wrong ? t.mismatch + ' (' + wrong + ')' : '', missing ? t.incomplete(missing) : '']
              .filter(Boolean)
              .join(' · ');
      note.classList.toggle('is-warn', !!(missing || wrong));
      var set = function (k, v) {
        root.querySelector('[data-' + k + ']').textContent = v;
      };
      set('total', complete ? money(total) : '—');
      set('portion', perPortion != null ? money(perPortion) : '—');
      set('targetv', pct(state.target));
      var advice = perPortion != null ? perPortion / (state.target / 100) : null;
      set('advice', advice != null ? money(advice) : '—');
      var vat = num(state.vat);
      set('advicevat', advice != null && vat != null && vat >= 0 ? money(advice * (1 + vat / 100)) : '—');
      var menu = num(state.menu);
      set('actual', perPortion != null && menu ? pct((perPortion / menu) * 100) : '—');
      set('margin', perPortion != null && menu ? money(menu - perPortion) : '—');
      // Incompleet: de cijfers gelden alleen voor de regels die er staan.
      root.querySelector('.fc-results').classList.toggle('is-partial', !complete);
      save();
    }
    root.addEventListener('input', function (e) {
      var el = e.target;
      var k = el.getAttribute('data-k');
      var r = el.getAttribute('data-r');
      if (k) state[k] = k === 'target' ? Number(el.value) : el.value;
      if (r) state.rows[+el.closest('[data-i]').getAttribute('data-i')][r] = el.value;
      calc();
    });
    root.addEventListener('change', function (e) {
      var el = e.target;
      var k = el.getAttribute('data-k');
      var r = el.getAttribute('data-r');
      if (k) state[k] = el.value;
      if (r) state.rows[+el.closest('[data-i]').getAttribute('data-i')][r] = el.value;
      calc();
    });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-add')) {
        state.rows.push(row());
        render();
        var inputs = root.querySelectorAll('.fc-row[data-i] input[data-r="name"]');
        if (inputs.length) inputs[inputs.length - 1].focus();
      } else if (b.hasAttribute('data-del')) {
        state.rows.splice(+b.closest('[data-i]').getAttribute('data-i'), 1);
        if (!state.rows.length) state.rows.push(row());
        render();
      } else if (b.hasAttribute('data-reset')) {
        state = blank();
        render();
      } else if (b.hasAttribute('data-example')) {
        var ex = EXAMPLE[lang] || EXAMPLE.nl;
        state = blank();
        state.dish = ex[0];
        state.portions = '1';
        state.menu = lang === 'en' ? '17.89' : '17,89';
        state.rows = EXAMPLE_ROWS.map(function (v, i) {
          var dec = function (x) {
            return lang === 'en' ? String(x).replace(',', '.') : x;
          };
          return row([ex[1][i], dec(v[0]), v[1], dec(v[2]), v[3], dec(v[4])]);
        });
        render();
        var note = root.querySelector('[data-note]');
        note.textContent = t.exampleNote;
      } else if (b.hasAttribute('data-print')) {
        document.documentElement.classList.add('fc-printing');
        window.print();
        setTimeout(function () {
          document.documentElement.classList.remove('fc-printing');
        }, 500);
      }
    });
    render();
  }

  function init() {
    document.querySelectorAll('.fc-calc').forEach(function (root) {
      if (root.getAttribute('data-ready')) return;
      root.setAttribute('data-ready', '1');
      setup(root);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
