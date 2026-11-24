// Gratis foodcost calculator op de website (blog "Gratis foodcost calculator", 2026-11-24). Wordt door js/site.js
// alleen geladen op een pagina met <div class="fc-calc">. Eenvoudig en los van de app: niets wordt opgeslagen behalve
// in deze browser (localStorage). De uitgebreide calculator in Savour (vanuit recepten, prijslijsten van leveranciers)
// is een apart project (docs/opdracht-foodcost-calculator.md).
// Opbouw: links de invoer in compacte rijen, rechts het resultaat dat meeschuift. Printen geeft een net blad op één
// liggend A4 (tabel en uitkomsten als tekst, geen invulvakken).
// Rekenregels: kosten van een regel = hoeveelheid (in g, ml of stuks) × inkoopprijs per g/ml/stuk ÷ opbrengst.
// Een regel zonder prijs of hoeveelheid, of met een eenheid die niet bij de prijs past, geeft geen uitkomst.
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
      yield: 'Opbrengst',
      cost: 'Kosten',
      add: '+ Ingrediënt',
      remove: 'Verwijderen',
      example: 'Voorbeeld',
      reset: 'Leegmaken',
      print: 'Printen',
      result: 'Resultaat',
      total: 'Kosten recept',
      perPortion: 'Kostprijs per portie',
      target: 'Doel-foodcost',
      advice: 'Adviesprijs zonder btw',
      vat: 'Btw',
      adviceVat: 'Adviesprijs met btw',
      menu: 'Je kaartprijs zonder btw',
      menuPh: '0,00',
      actual: 'Foodcost met jouw prijs',
      margin: 'Marge per bord',
      incomplete: function (n) {
        return n === 1
          ? '1 regel mist nog een prijs of hoeveelheid; de uitkomst volgt als alles compleet is.'
          : n + ' regels missen nog een prijs of hoeveelheid; de uitkomst volgt als alles compleet is.';
      },
      mismatch: 'Eenheid past niet bij de prijs',
      empty: 'Vul links je ingrediënten in.',
      piece: 'stuk',
      exampleNote: 'Voorbeeld met verzonnen inkoopprijzen, uit het artikel Foodcost berekenen.',
      saved: 'Wordt alleen in deze browser bewaard.',
      ingPh: 'Bijv. boter',
      vatDefault: '9',
      made: 'Gemaakt met de gratis foodcost calculator van Savour',
      printed: 'Geprint op',
      excl: 'zonder btw'
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
      yield: 'Yield',
      cost: 'Cost',
      add: '+ Ingredient',
      remove: 'Remove',
      example: 'Example',
      reset: 'Clear',
      print: 'Print',
      result: 'Result',
      total: 'Recipe cost',
      perPortion: 'Cost per portion',
      target: 'Target food cost',
      advice: 'Suggested price before tax',
      vat: 'Tax',
      adviceVat: 'Suggested price with tax',
      menu: 'Your menu price before tax',
      menuPh: '0.00',
      actual: 'Food cost at your price',
      margin: 'Margin per plate',
      incomplete: function (n) {
        return n === 1
          ? '1 line is missing a price or quantity; the result follows once everything is complete.'
          : n + ' lines are missing a price or quantity; the result follows once everything is complete.';
      },
      mismatch: 'Unit does not match the price',
      empty: 'Enter your ingredients on the left.',
      piece: 'piece',
      exampleNote: 'Example with made-up purchase prices, from the article How to calculate food cost.',
      saved: 'Only saved in this browser.',
      ingPh: 'E.g. butter',
      vatDefault: '',
      made: 'Made with the free food cost calculator by Savour',
      printed: 'Printed on',
      excl: 'before tax'
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
      yield: 'Ausbeute',
      cost: 'Kosten',
      add: '+ Zutat',
      remove: 'Entfernen',
      example: 'Beispiel',
      reset: 'Leeren',
      print: 'Drucken',
      result: 'Ergebnis',
      total: 'Kosten Rezeptur',
      perPortion: 'Wareneinsatz pro Portion',
      target: 'Ziel-Wareneinsatz',
      advice: 'Preisvorschlag netto',
      vat: 'MwSt.',
      adviceVat: 'Preisvorschlag brutto',
      menu: 'Dein Kartenpreis netto',
      menuPh: '0,00',
      actual: 'Wareneinsatz mit deinem Preis',
      margin: 'Rohertrag pro Teller',
      incomplete: function (n) {
        return n === 1
          ? '1 Zeile hat noch keinen Preis oder keine Menge; das Ergebnis folgt, sobald alles vollständig ist.'
          : n + ' Zeilen haben noch keinen Preis oder keine Menge; das Ergebnis folgt, sobald alles vollständig ist.';
      },
      mismatch: 'Einheit passt nicht zum Preis',
      empty: 'Trag links deine Zutaten ein.',
      piece: 'Stück',
      exampleNote: 'Beispiel mit ausgedachten Einkaufspreisen, aus dem Artikel Wareneinsatz berechnen.',
      saved: 'Wird nur in diesem Browser gespeichert.',
      ingPh: 'Z. B. Butter',
      vatDefault: '',
      made: 'Erstellt mit dem kostenlosen Wareneinsatz-Rechner von Savour',
      printed: 'Gedruckt am',
      excl: 'netto'
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
      yield: 'Rendimiento',
      cost: 'Coste',
      add: '+ Ingrediente',
      remove: 'Quitar',
      example: 'Ejemplo',
      reset: 'Vaciar',
      print: 'Imprimir',
      result: 'Resultado',
      total: 'Coste de la receta',
      perPortion: 'Coste por ración',
      target: 'Food cost objetivo',
      advice: 'Precio sugerido sin IVA',
      vat: 'IVA',
      adviceVat: 'Precio sugerido con IVA',
      menu: 'Tu precio de carta sin IVA',
      menuPh: '0,00',
      actual: 'Food cost con tu precio',
      margin: 'Margen por plato',
      incomplete: function (n) {
        return n === 1
          ? 'A 1 línea le falta precio o cantidad; el resultado aparece cuando todo esté completo.'
          : 'A ' + n + ' líneas les falta precio o cantidad; el resultado aparece cuando todo esté completo.';
      },
      mismatch: 'La unidad no encaja con el precio',
      empty: 'Introduce tus ingredientes a la izquierda.',
      piece: 'unidad',
      exampleNote: 'Ejemplo con precios de compra inventados, del artículo Cómo calcular el food cost.',
      saved: 'Solo se guarda en este navegador.',
      ingPh: 'P. ej. mantequilla',
      vatDefault: '',
      made: 'Hecho con la calculadora de food cost gratuita de Savour',
      printed: 'Impreso el',
      excl: 'sin IVA'
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
      yield: 'Rendement',
      cost: 'Coût',
      add: '+ Ingrédient',
      remove: 'Supprimer',
      example: 'Exemple',
      reset: 'Vider',
      print: 'Imprimer',
      result: 'Résultat',
      total: 'Coût de la recette',
      perPortion: 'Coût matière par portion',
      target: 'Food cost cible',
      advice: 'Prix conseillé HT',
      vat: 'TVA',
      adviceVat: 'Prix conseillé TTC',
      menu: 'Ton prix carte HT',
      menuPh: '0,00',
      actual: 'Food cost à ton prix',
      margin: 'Marge par assiette',
      incomplete: function (n) {
        return n === 1
          ? '1 ligne n’a pas encore de prix ou de quantité ; le résultat s’affiche quand tout est complet.'
          : n + ' lignes n’ont pas encore de prix ou de quantité ; le résultat s’affiche quand tout est complet.';
      },
      mismatch: 'L’unité ne correspond pas au prix',
      empty: 'Saisis tes ingrédients à gauche.',
      piece: 'pièce',
      exampleNote: 'Exemple avec des prix d’achat inventés, tiré de l’article Calculer le food cost.',
      saved: 'Enregistré seulement dans ce navigateur.',
      ingPh: 'Ex. beurre',
      vatDefault: '',
      made: 'Réalisé avec le calculateur de food cost gratuit de Savour',
      printed: 'Imprimé le',
      excl: 'HT'
    }
  };
  // Eenheden: soort (m = massa in g, v = volume in ml, p = stuk) en factor naar g, ml of stuk.
  var QTY = { g: ['m', 1], kg: ['m', 1000], ml: ['v', 1], cl: ['v', 10], dl: ['v', 100], l: ['v', 1000], st: ['p', 1] };
  var PER = { kg: ['m', 1000], g: ['m', 1], l: ['v', 1000], ml: ['v', 1], st: ['p', 1] };
  // Het rekenvoorbeeld uit "Foodcost berekenen" (risotto, verzonnen prijzen): € 4,10 per portie, 22,9% bij € 17,89.
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
    function unitLabel(u) {
      return u === 'st' ? t.piece : u;
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
    // Alle uitkomsten in één keer; complete = er is iets ingevuld en niets ontbreekt of botst.
    function compute() {
      var total = 0;
      var missing = 0;
      var wrong = 0;
      var used = 0;
      var lines = state.rows.map(function (r) {
        var c = lineCost(r);
        var hasAny = !!(r.name || r.qty || r.price);
        if (c === 'x') {
          if (hasAny) wrong++;
        } else if (c == null) {
          if (hasAny) missing++;
        } else {
          total += c;
          used++;
        }
        return { r: r, c: c, hasAny: hasAny };
      });
      var complete = used > 0 && !missing && !wrong;
      var portions = num(state.portions);
      var perPortion = complete && portions && portions > 0 ? total / portions : null;
      var advice = perPortion != null ? perPortion / (state.target / 100) : null;
      var vat = num(state.vat);
      var menu = num(state.menu);
      return {
        lines: lines,
        total: total,
        used: used,
        missing: missing,
        wrong: wrong,
        complete: complete,
        perPortion: perPortion,
        advice: advice,
        adviceVat: advice != null && vat != null && vat >= 0 ? advice * (1 + vat / 100) : null,
        actual: perPortion != null && menu ? (perPortion / menu) * 100 : null,
        margin: perPortion != null && menu ? menu - perPortion : null
      };
    }
    function options(sel, list) {
      return list
        .map(function (u) {
          return '<option value="' + u + '"' + (u === sel ? ' selected' : '') + '>' + esc(unitLabel(u)) + '</option>';
        })
        .join('');
    }
    function cell(cap, html) {
      return '<label class="fc-cell"><span class="fc-cap">' + esc(cap) + '</span>' + html + '</label>';
    }
    function render() {
      root.innerHTML =
        '<div class="fc-grid"><div class="fc-main">' +
        '<div class="fc-head">' +
        '<label class="fc-field fc-dish"><span>' +
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
        '<div class="fc-table" role="table">' +
        '<div class="fc-row fc-th" role="row"><span>' +
        esc(t.ing) +
        '</span><span>' +
        esc(t.qty) +
        '</span><span></span><span>' +
        esc(t.price) +
        '</span><span>' +
        esc(t.per) +
        '</span><span>' +
        esc(t.yield) +
        ' %</span><span class="fc-num">' +
        esc(t.cost) +
        '</span><span></span></div>' +
        state.rows
          .map(function (r, i) {
            return (
              '<div class="fc-row" role="row" data-i="' +
              i +
              '">' +
              '<input class="fc-name" aria-label="' +
              esc(t.ing) +
              '" data-r="name" value="' +
              esc(r.name) +
              '" placeholder="' +
              esc(t.ingPh) +
              '">' +
              cell(
                t.qty,
                '<input aria-label="' +
                  esc(t.qty) +
                  '" data-r="qty" inputmode="decimal" value="' +
                  esc(r.qty) +
                  '" placeholder="0">'
              ) +
              cell(
                t.unit,
                '<select aria-label="' +
                  esc(t.unit) +
                  '" data-r="unit">' +
                  options(r.unit, ['g', 'kg', 'ml', 'cl', 'dl', 'l', 'st']) +
                  '</select>'
              ) +
              cell(
                t.price,
                '<input aria-label="' +
                  esc(t.price) +
                  '" data-r="price" inputmode="decimal" value="' +
                  esc(r.price) +
                  '" placeholder="0,00">'
              ) +
              cell(
                t.per,
                '<select aria-label="' +
                  esc(t.per) +
                  '" data-r="per">' +
                  options(r.per, ['kg', 'g', 'l', 'ml', 'st']) +
                  '</select>'
              ) +
              cell(
                t.yield + ' %',
                '<input aria-label="' +
                  esc(t.yield) +
                  '" data-r="yield" inputmode="decimal" value="' +
                  esc(r.yield) +
                  '">'
              ) +
              '<output class="fc-cost fc-num" data-cost></output>' +
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
        '<button type="button" class="fc-link" data-example>' +
        esc(t.example) +
        '</button><button type="button" class="fc-link" data-reset>' +
        esc(t.reset) +
        '</button></div>' +
        '<p class="fc-note" data-note></p>' +
        '</div>' +
        '<aside class="fc-side" aria-live="polite">' +
        '<div class="fc-kicker">' +
        esc(t.result) +
        '</div>' +
        '<div class="fc-line"><span>' +
        esc(t.total) +
        '</span><b data-total>—</b></div>' +
        '<div class="fc-big"><span>' +
        esc(t.perPortion) +
        '</span><b data-portion>—</b></div>' +
        '<div class="fc-target"><div class="fc-line"><span>' +
        esc(t.target) +
        '</span><b data-targetv>' +
        pct(state.target) +
        '</b></div><input type="range" min="15" max="50" step="1" data-k="target" value="' +
        esc(state.target) +
        '" aria-label="' +
        esc(t.target) +
        '"></div>' +
        '<div class="fc-line"><span>' +
        esc(t.advice) +
        '</span><b data-advice>—</b></div>' +
        '<div class="fc-line fc-inline"><label for="fcVat">' +
        esc(t.vat) +
        '</label><span class="fc-vat"><input id="fcVat" data-k="vat" inputmode="decimal" value="' +
        esc(state.vat) +
        '" placeholder="0"> %</span><b data-advicevat>—</b></div>' +
        '<div class="fc-sep"></div>' +
        '<label class="fc-field"><span>' +
        esc(t.menu) +
        '</span><input data-k="menu" inputmode="decimal" value="' +
        esc(state.menu) +
        '" placeholder="' +
        esc(t.menuPh) +
        '"></label>' +
        '<div class="fc-line"><span>' +
        esc(t.actual) +
        '</span><b data-actual>—</b></div>' +
        '<div class="fc-line"><span>' +
        esc(t.margin) +
        '</span><b data-margin>—</b></div>' +
        '<button type="button" class="fc-btn fc-print" data-print>' +
        esc(t.print) +
        '</button>' +
        '<p class="fc-small">' +
        esc(t.saved) +
        '</p>' +
        '</aside></div>';
      calc();
    }
    function calc() {
      var d = compute();
      root.querySelectorAll('.fc-row[data-i]').forEach(function (el) {
        var l = d.lines[+el.getAttribute('data-i')];
        var out = el.querySelector('[data-cost]');
        el.classList.toggle('is-bad', l.c === 'x' && l.hasAny);
        el.classList.toggle('is-missing', l.c == null && l.hasAny);
        out.textContent = l.c === 'x' ? '!' : l.c == null ? '—' : money(l.c);
        out.title = l.c === 'x' ? t.mismatch : '';
      });
      var note = root.querySelector('[data-note]');
      note.textContent =
        !d.used && !d.missing && !d.wrong
          ? t.empty
          : [d.wrong ? t.mismatch + ' (' + d.wrong + ')' : '', d.missing ? t.incomplete(d.missing) : '']
              .filter(Boolean)
              .join(' · ');
      note.classList.toggle('is-warn', !!(d.missing || d.wrong));
      var set = function (k, v) {
        root.querySelector('[data-' + k + ']').textContent = v;
      };
      set('total', d.complete ? money(d.total) : '—');
      set('portion', d.perPortion != null ? money(d.perPortion) : '—');
      set('targetv', pct(state.target));
      set('advice', d.advice != null ? money(d.advice) : '—');
      set('advicevat', d.adviceVat != null ? money(d.adviceVat) : '—');
      set('actual', d.actual != null ? pct(d.actual) : '—');
      set('margin', d.margin != null ? money(d.margin) : '—');
      save();
    }
    // Printen: een net blad op één liggend A4, los van de invulvakken.
    function printSheet() {
      var d = compute();
      var day = new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
      var rows = d.lines
        .filter(function (l) {
          return l.hasAny;
        })
        .map(function (l) {
          var r = l.r;
          return (
            '<tr><td>' +
            esc(r.name) +
            '</td><td class="fc-num">' +
            esc(r.qty) +
            ' ' +
            esc(unitLabel(r.unit)) +
            '</td><td class="fc-num">' +
            (num(r.price) != null ? money(num(r.price)) : '—') +
            ' / ' +
            esc(unitLabel(r.per)) +
            '</td><td class="fc-num">' +
            esc(r.yield || '100') +
            '%</td><td class="fc-num">' +
            (typeof l.c === 'number' ? money(l.c) : '—') +
            '</td></tr>'
          );
        })
        .join('');
      var line = function (label, value, strong) {
        return (
          '<tr' +
          (strong ? ' class="is-strong"' : '') +
          '><th>' +
          esc(label) +
          '</th><td class="fc-num">' +
          esc(value) +
          '</td></tr>'
        );
      };
      var res =
        line(t.total, d.complete ? money(d.total) : '—') +
        line(t.portions, state.portions || '—') +
        line(t.perPortion, d.perPortion != null ? money(d.perPortion) : '—', true) +
        line(t.target, pct(state.target)) +
        line(t.advice, d.advice != null ? money(d.advice) : '—') +
        (num(state.vat) != null
          ? line(t.adviceVat + ' (' + state.vat + '%)', d.adviceVat != null ? money(d.adviceVat) : '—')
          : '') +
        (num(state.menu)
          ? line(t.menu, money(num(state.menu))) +
            line(t.actual, d.actual != null ? pct(d.actual) : '—') +
            line(t.margin, d.margin != null ? money(d.margin) : '—')
          : '');
      var sheet = document.createElement('div');
      sheet.className = 'fc-sheet';
      sheet.innerHTML =
        '<header><div class="fc-sheet-logo">SAVOUR</div><div class="fc-sheet-date">' +
        esc(t.printed) +
        ' ' +
        esc(day) +
        '</div></header>' +
        '<h1>' +
        esc(state.dish || t.dish) +
        '</h1>' +
        '<div class="fc-sheet-body"><table class="fc-sheet-ing"><thead><tr><th>' +
        esc(t.ing) +
        '</th><th class="fc-num">' +
        esc(t.qty) +
        '</th><th class="fc-num">' +
        esc(t.price) +
        '</th><th class="fc-num">' +
        esc(t.yield) +
        '</th><th class="fc-num">' +
        esc(t.cost) +
        '</th></tr></thead><tbody>' +
        rows +
        '</tbody></table>' +
        '<table class="fc-sheet-res"><tbody>' +
        res +
        '</tbody></table></div>' +
        (d.missing || d.wrong
          ? '<p class="fc-sheet-warn">' + esc(root.querySelector('[data-note]').textContent) + '</p>'
          : '') +
        '<footer>' +
        esc(t.made) +
        ' · savour.page</footer>';
      var page = document.createElement('style');
      page.textContent = '@page { size: A4 landscape; margin: 12mm; }';
      document.head.appendChild(page);
      document.body.appendChild(sheet);
      document.documentElement.classList.add('fc-printing');
      var done = function () {
        sheet.remove();
        page.remove();
        document.documentElement.classList.remove('fc-printing');
        window.removeEventListener('afterprint', done);
      };
      window.addEventListener('afterprint', done);
      window.print();
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
      if (k) state[k] = k === 'target' ? Number(el.value) : el.value;
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
        var dec = function (x) {
          return lang === 'en' ? String(x).replace(',', '.') : x;
        };
        state = blank();
        state.dish = ex[0];
        state.portions = '1';
        state.menu = dec('17,89');
        state.rows = EXAMPLE_ROWS.map(function (v, i) {
          return row([ex[1][i], dec(v[0]), v[1], dec(v[2]), v[3], dec(v[4])]);
        });
        render();
        root.querySelector('[data-note]').textContent = t.exampleNote;
      } else if (b.hasAttribute('data-print')) {
        printSheet();
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
