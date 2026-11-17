// Test van de MEP-lezer (js/features/mep-reader.js), zonder browser.
// Draaien: npm run test:mep
// Verzonnen voorbeelden in de vorm van echte keukenlijsten (Excel met kolommen naast elkaar, vet voor gerechten,
// een kolom "banqueting", opmerkingen in de kolom ernaast) en geplakte tekst.
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../js/features/mep-reader.js', import.meta.url), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(source, ctx);
const { mepReadGrid, mepReadLines, mepParseItem, mepCsvCells } = ctx;

// Korte weergave: "K:Kaart", "#Kopje", "-Onderdeel [40 g] (opmerking) !twijfel".
const show = res =>
  res.rows.map(r =>
    r.type === 'card'
      ? `K:${r.text}`
      : r.type === 'section'
        ? `#${r.text}`
        : `-${r.text}${r.qty != null ? ` [${r.qty} ${r.unit}]` : ''}${r.note ? ` (${r.note})` : ''}${r.doubts?.length ? ` !${r.doubts.join(',')}` : ''}`
  );

const cell = (ref, text, bold = false) => {
  const m = ref.match(/^([A-Z]+)(\d+)$/);
  return { row: Number(m[2]), col: ctx.mepColNumber(m[1]), text, bold };
};

const cases = [
  {
    name: 'Onderdeel: gram, stuks per couvert, haakjes en ongeveer',
    run: () =>
      [
        'Zalm 40 gram (1/2 moot)',
        'Bloemkool 2x',
        '3x ravioli spinazie',
        'eend 1 borst pp',
        'kabeljauw +- 120gr',
        'radijs 6x gesneden',
        'peer 2'
      ]
        .map(t => mepParseItem(t))
        .map(i => `${i.name}|${i.qty ?? ''}|${i.unit ?? ''}|${i.note ?? ''}|${i.doubts.join(',')}`),
    expect: [
      'Zalm|40|g|1/2 moot|',
      'Bloemkool|2|st||',
      'ravioli spinazie|3|st||',
      'eend|1|borst||',
      'kabeljauw|120|g|±|ongeveer',
      'radijs 6x gesneden||||getal zonder eenheid',
      'peer 2||||getal zonder eenheid'
    ]
  },
  {
    name: 'Excel: titel, twee kaarten naast elkaar, lege regels tussen gerechten',
    run: () =>
      show(
        mepReadGrid([
          cell('B1', 'MEP Saucier', true),
          cell('B2', 'Voor · Zalm'),
          cell('B3', 'zalm gemarineerd 40 gram'),
          cell('B4', 'dille olie'),
          cell('B6', 'Hoofd'),
          cell('B7', 'Lamsrug 120gr'),
          cell('B8', 'lamsjus'),
          cell('E2', 'banqueting'),
          cell('F3', 'Voor kreeft'),
          cell('F4', 'kreeft 1/2 (staart)'),
          cell('F5', 'bisque')
        ])
      ),
    expect: [
      'K:À la carte',
      '#Voor · Zalm',
      '-zalm gemarineerd [40 g]',
      '-dille olie',
      '#Hoofd',
      '-Lamsrug [120 g]',
      '-lamsjus',
      'K:banqueting',
      '#Voor kreeft',
      '-kreeft 1/2 (staart) !getal zonder eenheid',
      '-bisque'
    ]
  },
  {
    name: 'Excel: vet = gerecht, twee kopjes onder elkaar worden één, opmerking in de kolom ernaast',
    run: () =>
      show(
        mepReadGrid([
          cell('B1', 'mep garde'),
          cell('B2', 'Tussen 1', true),
          cell('B3', 'Gnocchi', true),
          cell('B4', 'gnocchi 5x'),
          cell('C4', 'gebakken in boter'),
          cell('B5', 'salie'),
          cell('B6', 'Asperge', true),
          cell('B7', 'asperge 3x'),
          cell('B8', 'Ham 30 gram', true),
          cell('B9', 'hollandaise')
        ])
      ),
    expect: [
      '#Tussen 1 · Gnocchi',
      '-gnocchi [5 st] (gebakken in boter)',
      '-salie',
      '#Asperge',
      '-asperge [3 st]',
      '-Ham [30 g]',
      '-hollandaise'
    ]
  },
  {
    name: 'Excel: losse vette regel tussen twee gerechten wordt een onderdeel met vlag, geen samengevoegd kopje',
    run: () =>
      show(
        mepReadGrid([
          cell('B2', 'Hoofd eend', true),
          cell('B3', 'eendenborst 90 gram'),
          cell('B4', 'Fond uit vriezer', true),
          cell('B5', 'Hoofd vega', true),
          cell('B6', 'knolselderij')
        ])
      ),
    expect: [
      '#Hoofd eend',
      '-eendenborst [90 g]',
      '-Fond uit vriezer !kopje of onderdeel?',
      '#Hoofd vega',
      '-knolselderij'
    ]
  },
  {
    name: 'Geplakte tekst: titel, blokken, kaart op een eigen regel, markdown-tekens',
    run: () => {
      const r = mepReadLines(`MEP Patisserie

**Dessert 1**
- Chocolade mousse 60 gr
- Krokant

Banqueting

Dessert
Panna cotta
Rood fruit (vers)`);
      return [r.name, ...show(r)];
    },
    expect: [
      'MEP Patisserie',
      'K:À la carte',
      '#Dessert 1',
      '-Chocolade mousse [60 g]',
      '-Krokant',
      'K:Banqueting',
      '#Dessert',
      '-Panna cotta',
      '-Rood fruit (vers)'
    ]
  },
  {
    name: 'CSV met puntkomma en aanhalingstekens',
    run: () =>
      mepCsvCells('MEP Koud;;\n"Voor; koud";;banquet\nburrata 50 gram;;bites').map(c => `${c.row}:${c.col}:${c.text}`),
    expect: ['1:1:MEP Koud', '2:1:Voor; koud', '2:3:banquet', '3:1:burrata 50 gram', '3:3:bites']
  }
];

let ok = 0;
for (const c of cases) {
  const got = c.run();
  const same = JSON.stringify(got) === JSON.stringify(c.expect);
  if (same) ok++;
  else {
    console.log(`✗ ${c.name}`);
    console.log('  verwacht:', c.expect);
    console.log('  gekregen:', got);
  }
}
console.log(`${ok} van ${cases.length} geslaagd`);
if (ok !== cases.length) process.exit(1);
