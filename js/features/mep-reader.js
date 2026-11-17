// MEP-lezer (2026-11-17): zet een Excel-blad, Word-tekst, geplakte tekst of de overschrijving van een foto om in
// regels voor een MEP-lijst: kaart, kopje of onderdeel. Geen schermcode, zodat hij zonder browser te testen is
// (tests/mep-lezer.test.mjs). De kok controleert alles in het controlescherm (js/features/mep-import.js).
// Net als de receptlezer verzint hij niets: een hoeveelheid haalt hij alleen uit de tekst als die er duidelijk
// staat ("40 gram", "3x", "1 borst pp"); bij twijfel blijft de tekst zoals hij was en krijgt de regel een vlag.

// Woorden die een nieuwe kaart beginnen (alleen als de cel of regel niets anders bevat).
const MEP_CARD_WORDS =
  /^(?:(?:à|a)\s*la\s*carte|banq?uett?ing|banquet|lunch|lunchkaart|diner|dinner|dinerkaart|buffet|brunch|high\s*tea|groep(?:en)?|evenement(?:en)?|events?|catering|room\s*service|bar|terras)$/i;

// Woorden die een kopje (gang) zijn, ook midden in een blok.
const MEP_COURSE_WORDS =
  /^(?:amuse(?:s|\s*bouche)?|bites?|hapjes?|snacks?|voor(?:gerecht)?(?:en)?|entree'?s?|entrées?|starters?|tussen(?:gerecht)?(?:en)?|soep(?:en)?|hoofd(?:gerecht)?(?:en)?|mains?|vis|vlees|vega(?:nistisch|tarisch)?|garnituur|garnituren|sauzen|kaas|kazen|pre[-\s]?dessert|dessert(?:s)?|nagerecht(?:en)?|friandises|mignardises|petit\s*fours?|brood|bijgerechten)(?:\s+\d+)?\b/i;

const MEP_UNITS = {
  g: 'g',
  gr: 'g',
  gram: 'g',
  grams: 'g',
  kg: 'kg',
  kilo: 'kg',
  ml: 'ml',
  cl: 'cl',
  l: 'l',
  liter: 'l',
  ltr: 'l'
};

function mepCleanText(s) {
  return String(s ?? '')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Kopjes zonder losse leestekens aan het eind ("Friandises," → "Friandises").
function mepCleanHeading(s) {
  return mepCleanText(s)
    .replace(/[,;:.\-–]+$/, '')
    .trim();
}

function mepNum(s) {
  return Number(String(s).replace(',', '.'));
}

// Eén onderdeel lezen: naam, portie per couvert, eenheid en opmerking. Wat tussen haakjes staat wordt de
// opmerking. Een hoeveelheid alleen als hij duidelijk is; anders blijft alles in de naam.
function mepParseItem(text) {
  const original = mepCleanText(text);
  let name = original;
  const notes = [];
  const doubts = [];
  // Opmerking tussen haakjes: "pulpo bbq 40 gram ( 1/2 tentakel)".
  name = name.replace(/\(\s*([^()]*?)\s*\)/g, (m, inner) => {
    if (inner) notes.push(inner);
    return ' ';
  });
  name = mepCleanText(name);
  let qty = null;
  let unit = null;
  let approx = false;
  const take = (re, toUnit) => {
    const m = name.match(re);
    if (!m) return false;
    approx = /\+\s*-|±|\bca\.?|\bcirca\b/i.test(m[1] || '');
    qty = mepNum(m[2]);
    unit = toUnit(m);
    name = mepCleanText(name.slice(0, m.index) + ' ' + name.slice(m.index + m[0].length));
    return true;
  };
  const pre = '(\\+\\s*-\\s*|±\\s*|\\bca\\.?\\s*|\\bcirca\\s+)?';
  // 40 gram, 100gr, 0,5 kg, 30 ml
  take(
    new RegExp(`${pre}\\b(\\d+(?:[.,]\\d+)?)\\s*(kg|kilo|grams?|gr|g|ml|cl|ltr|liter|l)\\b\\.?`, 'i'),
    m => MEP_UNITS[m[3].toLowerCase()]
  ) ||
    // 1 borst pp, 2 plakken p.p.
    take(
      new RegExp(
        `${pre}\\b(\\d+(?:[.,]\\d+)?)\\s+([a-zà-ÿ]+)\\s*(?:pp|p\\.p\\.|per\\s+(?:persoon|couvert|cover))(?=\\s|$)`,
        'i'
      ),
      m => m[3].toLowerCase()
    ) ||
    // 3x, 4 x
    take(new RegExp(`${pre}\\b(\\d+(?:[.,]\\d+)?)\\s*x\\s*$`, 'i'), () => 'st') ||
    // 3x agnolotti (vooraan)
    take(new RegExp(`^${pre}(\\d+(?:[.,]\\d+)?)\\s*x\\s+(?=\\D)`, 'i'), () => 'st');
  if (qty != null && !(qty > 0)) {
    qty = null;
    unit = null;
    name = original;
  }
  if (approx) {
    notes.unshift('±');
    doubts.push('ongeveer');
  }
  // Kilo's en liters zijn zelden per couvert: de kok kijkt het na.
  if (unit === 'kg' || unit === 'l') doubts.push('per couvert?');
  // Een kaal getal zonder eenheid ("witte druif 2"): niet zelf invullen, wel laten nakijken.
  if (qty == null && /\d/.test(name)) doubts.push('getal zonder eenheid');
  name = name
    .replace(/^[-–•*·]\s*/, '')
    .replace(/[,;:]+$/, '')
    .trim();
  if (!name) {
    // Alleen een hoeveelheid zonder naam: dan toch de oorspronkelijke tekst als naam.
    name = original;
    qty = null;
    unit = null;
  }
  return { name, qty, unit, note: notes.join(' · ') || null, doubts, original };
}

function mepIsCourse(text) {
  return MEP_COURSE_WORDS.test(mepCleanHeading(text));
}

// Een blok (regels zonder lege regel ertussen): de eerste regel is het kopje, de rest onderdelen. Een losse regel
// met een gangwoord ("Hoofd", "Tussen 2") midden in een blok begint een nieuw kopje. Uit Excel weten we ook wat vet
// staat: een vetgedrukte cel is een kopje, behalve als er een hoeveelheid in staat ("Pata negra 60 gram").
// Twee kopjes direct onder elkaar worden één: "Tussen 1" + "Agnolotti Ricotta" → "Tussen 1 · Agnolotti Ricotta".
function mepHasQty(text) {
  return mepParseItem(text).qty != null;
}

function mepBlockRows(block) {
  const rows = [];
  block.forEach((cell, i) => {
    const heading = cell.bold
      ? !mepHasQty(cell.text)
      : i === 0 || (mepIsCourse(cell.text) && !/\d/.test(cell.text) && !cell.note);
    if (heading) {
      const text = mepCleanHeading(cell.text);
      const prev = rows[rows.length - 1];
      if (prev?.type === 'section' && !prev.joined && prev.joinable) {
        prev.text = `${prev.text} · ${text}`;
        prev.original = `${prev.original} / ${mepCleanText(cell.text)}`;
        prev.joined = true;
      } else rows.push({ type: 'section', text, original: mepCleanText(cell.text), joinable: mepIsCourse(cell.text) });
      return;
    }
    const it = mepParseItem(cell.text);
    if (cell.note) {
      it.note = [it.note, mepCleanText(cell.note)].filter(Boolean).join(' · ');
      // De kolom ernaast hoort bij wat er stond.
      it.original = `${it.original} · ${mepCleanText(cell.note)}`;
    }
    const last = rows[rows.length - 1];
    if (last) last.joinable = false;
    rows.push({
      type: 'item',
      text: it.name,
      qty: it.qty,
      unit: it.unit,
      note: it.note,
      doubts: it.doubts,
      original: it.original
    });
  });
  rows.forEach(r => {
    delete r.joinable;
    delete r.joined;
  });
  return rows;
}

// Titel bovenaan: "MEP Garde", "mep pattiserie".
function mepLooksLikeTitle(text) {
  return /^\s*m\.?e\.?p\.?\b/i.test(text) || /mise\s*en\s*place/i.test(text);
}

// ---- Tekst (Word, geplakt, overschrijving van een foto) ----
// Lege regels scheiden de blokken; een regel met alleen een kaartnaam ("Banqueting") begint een nieuwe kaart.
function mepReadLines(text) {
  const lines = String(text || '')
    .replace(/\r/g, '')
    .split('\n')
    .map(l => l.replace(/^\s*(?:[-–•*·]|\d+[.)])\s+/, '').replace(/\*\*|__|^#+\s*/g, ''));
  let name = '';
  const rows = [];
  let block = [];
  const flush = () => {
    if (block.length) rows.push(...mepBlockRows(block));
    block = [];
  };
  for (const raw of lines) {
    const line = mepCleanText(raw);
    if (!line) {
      flush();
      continue;
    }
    if (!name && !rows.length && !block.length && mepLooksLikeTitle(line)) {
      name = line;
      continue;
    }
    if (MEP_CARD_WORDS.test(mepCleanHeading(line))) {
      flush();
      rows.push({ type: 'card', text: mepCleanHeading(line), original: line });
      continue;
    }
    block.push({ text: line });
  }
  flush();
  return { name, rows: mepWithDefaultCard(rows) };
}

// ---- Excel-blad ----
// cells: [{ row, col, text }] (1 = eerste rij/kolom). Kolommen worden van links naar rechts gelezen, elke kolom
// van boven naar beneden. Een kolom die alleen naast een gevulde cel staat, is de opmerking bij die cel.
function mepReadGrid(cells) {
  const all = (cells || []).map(c => ({ ...c, text: mepCleanText(c.text) })).filter(c => c.text);
  const at = new Map(all.map(c => [`${c.row}:${c.col}`, c]));
  let name = '';
  // Titel: de bovenste gevulde rij met één cel die op een titel lijkt (of de enige cel in rij 1).
  const firstRow = Math.min(...all.map(c => c.row));
  const top = all.filter(c => c.row === firstRow);
  if (top.length === 1 && mepLooksLikeTitle(top[0].text)) {
    name = top[0].text;
    top[0].used = true;
  }
  // Kaarten: cellen met alleen een kaartnaam.
  const cards = all.filter(c => !c.used && MEP_CARD_WORDS.test(mepCleanHeading(c.text)));
  cards.forEach(c => (c.used = true));
  // Opmerkingkolommen: elke gevulde cel heeft links ervan een gevulde (niet-kaart) cel.
  const cols = [...new Set(all.filter(c => !c.used).map(c => c.col))].sort((a, b) => a - b);
  const noteCols = new Set();
  for (const col of cols) {
    const own = all.filter(c => !c.used && c.col === col);
    const leftFilled = own.every(c => {
      const left = at.get(`${c.row}:${col - 1}`);
      return left && !left.used;
    });
    if (own.length && leftFilled && cols.includes(col - 1)) noteCols.add(col);
  }
  // Opmerkingen bij de cel links ervan (ook over twee kolommen: B ← C ← D).
  const noteOf = c => {
    const parts = [];
    for (let col = c.col + 1; noteCols.has(col); col++) {
      const n = at.get(`${c.row}:${col}`);
      if (!n) break;
      parts.push(n.text);
      n.used = true;
    }
    return parts.join(' · ');
  };
  // Bij welke kaart hoort een cel? De kaartcel met de grootste kolom ≤ deze kolom en een rij ≤ deze rij.
  const cardOf = c => {
    let best = null;
    for (const k of cards) {
      if (k.col > c.col || k.row > c.row) continue;
      if (!best || k.col > best.col || (k.col === best.col && k.row > best.row)) best = k;
    }
    return best;
  };
  const mainCols = cols.filter(col => !noteCols.has(col));
  // Per kaart (in volgorde: eerst zonder kaart, dan op kolom en rij) de blokken verzamelen.
  const groups = new Map();
  const order = [null, ...cards.slice().sort((a, b) => a.col - b.col || a.row - b.row)];
  order.forEach(k => groups.set(k, []));
  for (const col of mainCols) {
    const own = all.filter(c => !c.used && c.col === col && !noteCols.has(col)).sort((a, b) => a.row - b.row);
    let block = [];
    let blockCard;
    const flush = () => {
      if (block.length) groups.get(blockCard).push(block);
      block = [];
    };
    for (const c of own) {
      const card = cardOf(c);
      const prev = block[block.length - 1];
      if (prev && (c.row !== prev.row + 1 || card !== blockCard)) flush();
      if (!block.length) blockCard = card;
      block.push({ text: c.text, note: noteOf(c), row: c.row, bold: !!c.bold });
    }
    flush();
  }
  const rows = [];
  for (const k of order) {
    const blocks = groups.get(k);
    if (!blocks.length) continue;
    if (k) rows.push({ type: 'card', text: mepCleanHeading(k.text), original: k.text });
    blocks.forEach(b => rows.push(...mepBlockRows(b)));
  }
  return { name, rows: mepWithDefaultCard(rows) };
}

// Komt er later een kaart, maar staat er daarvoor al iets? Dan begint de lijst met "À la carte".
// Een kopje zonder onderdelen eronder dat geen gang is ("Duxelle uit vriezer" tussen twee gerechten) is
// waarschijnlijk een onderdeel van het gerecht erboven. De kok ziet een vlag en kiest zelf.
function mepWithDefaultCard(rows) {
  rows.forEach((r, i) => {
    if (r.type !== 'section' || mepIsCourse(r.text)) return;
    const next = rows[i + 1];
    if (next && next.type === 'item') return;
    const before = rows.slice(0, i).reverse();
    const prevSection = before.find(x => x.type === 'section' || x.type === 'card');
    if (prevSection?.type !== 'section') return;
    const it = mepParseItem(r.original || r.text);
    Object.assign(r, {
      type: 'item',
      text: it.name,
      qty: it.qty,
      unit: it.unit,
      note: it.note,
      doubts: ['kopje of onderdeel?', ...it.doubts]
    });
  });
  if (rows.length && rows[0].type !== 'card' && rows.some(r => r.type === 'card'))
    return [{ type: 'card', text: 'À la carte', original: '', added: true }, ...rows];
  return rows;
}

// CSV (Excel "opslaan als CSV"): puntkomma of komma als scheidingsteken, aanhalingstekens toegestaan.
function mepCsvCells(text) {
  const lines = String(text || '')
    .replace(/\r/g, '')
    .split('\n');
  const sep = (lines[0].match(/;/g) || []).length >= (lines[0].match(/,/g) || []).length ? ';' : ',';
  const cells = [];
  lines.forEach((line, r) => {
    let col = 0;
    let cur = '';
    let quoted = false;
    for (let i = 0; i <= line.length; i++) {
      const ch = line[i];
      if (quoted) {
        if (ch === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (ch === '"') quoted = false;
        else cur += ch ?? '';
      } else if (ch === '"') quoted = true;
      else if (ch === sep || ch === undefined) {
        if (cur.trim()) cells.push({ row: r + 1, col: col + 1, text: cur });
        cur = '';
        col++;
      } else cur += ch;
    }
  });
  return cells;
}

// Kolomletters ("B", "AA") naar een nummer (B = 2).
function mepColNumber(letters) {
  let n = 0;
  for (const ch of String(letters).toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n;
}
