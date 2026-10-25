// Gedeeld recept (/r/<slug>, zie vercel.json): dezelfde pagina als altijd (index.html), maar met de receptnaam en
// een eigen voorbeeldplaatje in de kop. WhatsApp, Telegram, iMessage en e-mail lezen die kop en tonen zo een
// preview van het recept zelf in plaats van de algemene Savour-afbeelding.
//   /api/recept?slug=...         → index.html met titel, beschrijving en og:image van dit recept
//   /api/recept?slug=...&img=1   → het voorbeeldplaatje (PNG, 1200 × 630) in de huisstijl
// Alleen recepten die de eigenaar zelf openbaar heeft gedeeld (get_public_recipe_by_slug); niets anders.
import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from '@vercel/og';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qmzfqfmpylkgcnxsedse.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_R8DGUuglOC3aFz5qv4xOgw_UGdQUyiD';
const SITE = 'https://savour.page';
const GOLD = '#e8ca8d';
const INK = '#f3efe6';
const MUTED = '#a9aaa3';

const esc = t =>
  String(t ?? '').replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);
const clean = t =>
  String(t ?? '')
    .replace(/\s+/g, ' ')
    .trim();
const file = name => fs.readFileSync(path.join(process.cwd(), name));

async function publicRecipe(slug) {
  if (!slug || slug.length > 200) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_recipe_by_slug`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ _slug: slug })
  });
  if (!res.ok) return null;
  return (await res.json()) || null;
}

// Hoeveelheid vooraan (met eenheid) los van de rest, om die vet te zetten. Zelfde eenheden als js/features/scale.js.
const UNITS = new Set(
  'g gr gram kg kilo mg l liter dl deciliter cl centiliter ml milliliter el eetlepel eetlepels tl theelepel theelepels st stuk stuks takje takjes teen teentjes blad blaadjes bos bosje bosjes plak plakken vel vellen blik pak zakje snuf mespunt scheut'.split(
    ' '
  )
);
function quantityParts(line) {
  const s = clean(line);
  const m = s.match(/^(\d+(?:[.,]\d+)?(?:\s*\/\s*\d+)?)(?:\s+([^\s\d]+))?/);
  if (!m) return ['', s];
  const unit = m[2] && UNITS.has(m[2].toLowerCase().replace(/[.,]$/, '')) ? ` ${m[2]}` : '';
  const amount = m[1] + unit;
  return [amount, s.slice(amount.length).trim()];
}

// ---- Pagina: index.html met de kop van dit recept ----
function pageHtml(recipe, slug) {
  let html = file('index.html').toString('utf8');
  const url = `${SITE}/r/${encodeURIComponent(slug)}`;
  const title = recipe ? `${clean(recipe.title) || 'Recept'} · Savour` : 'Recept · Savour';
  const parts = [];
  if (recipe?.yield_text) parts.push(`Opbrengst ${clean(recipe.yield_text)}`);
  if (recipe?.ingredients?.length) parts.push(`${recipe.ingredients.length} ingrediënten`);
  if (recipe?.steps?.length) parts.push(`${recipe.steps.length} stappen`);
  const desc = recipe
    ? `${parts.join(' · ')}${parts.length ? '. ' : ''}Gedeeld via Savour, receptbeheer voor de professionele keuken.`
    : 'Een gedeeld recept in Savour.';
  const image = `${SITE}/api/recept?slug=${encodeURIComponent(slug)}&img=1`;
  const set = (re, to) => {
    html = html.replace(re, () => to);
  };
  set(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  set(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`);
  set(/<meta property="og:type" content="[^"]*">/, '<meta property="og:type" content="article">');
  set(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  set(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
  set(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${esc(url)}">`);
  set(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(image)}">`);
  set(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${esc(url)}">`);
  // Een gedeeld recept hoort niet in zoekmachines (het is van de kok, niet van Savour).
  html = html.replace('</head>', '<meta name="robots" content="noindex">\n</head>');
  return html;
}

// ---- Voorbeeldplaatje ----
const el = (type, style, children) => ({ type, props: { style, children } });
const box = (style, children) => el('div', { display: 'flex', ...style }, children);

function titleSize(title, photo) {
  const n = title.length;
  const base = n <= 14 ? 84 : n <= 22 ? 70 : n <= 34 ? 58 : n <= 50 ? 48 : 40;
  // Het langste woord moet op één regel passen (Playfair vet is ongeveer 0,6 em per letter).
  const longest = Math.max(...title.split(' ').map(w => w.length));
  const width = photo ? 600 : 520;
  return Math.min(photo ? Math.round(base * 0.9) : base, Math.floor(width / (longest * 0.6)));
}

function previewImage(recipe) {
  const title = clean(recipe?.title) || 'Recept';
  const photo = recipe?.photo_url && /^(https:|data:image\/)/.test(recipe.photo_url) ? recipe.photo_url : '';
  const all = (Array.isArray(recipe?.ingredients) ? recipe.ingredients : []).map(clean).filter(Boolean);
  const max = photo ? 3 : 6;
  const shown = all.slice(0, max);
  const more = all.length - shown.length;
  const line = x => {
    const [q, rest] = quantityParts(x);
    return box(
      {
        padding: '9px 0',
        borderBottom: '1px solid #243031',
        fontSize: photo ? 22 : 24,
        color: INK,
        overflow: 'hidden'
      },
      [
        q ? el('span', { fontWeight: 700, marginRight: 10 }, q) : null,
        el('span', { color: '#d9d5cb' }, rest.slice(0, 48))
      ].filter(Boolean)
    );
  };
  const ingredients = box({ flexDirection: 'column' }, [
    el(
      'div',
      { fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 28, color: GOLD, marginBottom: 6 },
      'Ingrediënten'
    ),
    ...shown.map(line),
    ...(more > 0 ? [el('div', { fontSize: 20, color: MUTED, marginTop: 12 }, `+ ${more} meer`)] : [])
  ]);
  const left = box(
    { flexDirection: 'column', width: photo ? 600 : 520, marginRight: 52 },
    [
      el('div', { width: 64, height: 3, background: GOLD, marginBottom: 26 }, ''),
      el(
        'div',
        {
          fontFamily: 'Playfair Display',
          fontWeight: 700,
          fontSize: titleSize(title, photo),
          lineHeight: 1.05,
          color: INK
        },
        title.slice(0, 80)
      ),
      recipe?.yield_text
        ? box({ marginTop: 22, fontSize: 26, color: MUTED }, [
            el('span', { marginRight: 10 }, 'Opbrengst'),
            el('span', { color: INK, fontWeight: 700 }, clean(recipe.yield_text).slice(0, 40))
          ])
        : null,
      photo && shown.length ? box({ marginTop: 26, flexDirection: 'column' }, [ingredients]) : null
    ].filter(Boolean)
  );
  const right = photo
    ? el('img', { width: 360, height: 330, objectFit: 'cover', borderRadius: 18 }, undefined)
    : box(
        {
          flexDirection: 'column',
          flex: 1,
          background: '#0e191a',
          border: '1px solid #2a3637',
          borderRadius: 18,
          padding: '28px 34px'
        },
        [ingredients]
      );
  if (photo) right.props.src = photo;
  return box(
    {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      padding: '52px 68px 44px',
      background: 'linear-gradient(135deg, #0f1a1b 0%, #071011 55%, #030707 100%)',
      fontFamily: 'DM Sans',
      color: INK
    },
    [
      box({ justifyContent: 'space-between', alignItems: 'center' }, [
        el(
          'div',
          { fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 28, letterSpacing: 10, color: INK },
          'SAVOUR'
        ),
        el('div', { fontSize: 17, letterSpacing: 4, color: GOLD }, 'GEDEELD RECEPT')
      ]),
      box(
        { flex: 1, alignItems: 'center', marginTop: 18 },
        [left, shown.length || photo ? right : null].filter(Boolean)
      ),
      box({ justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 20 }, [
        el('div', { color: GOLD, fontWeight: 700 }, 'savour.page'),
        el('div', { color: MUTED }, 'Receptbeheer voor de professionele keuken')
      ])
    ]
  );
}

async function imagePng(recipe) {
  const fonts = [
    { name: 'DM Sans', data: file('assets/fonts/dmsans-400.ttf'), weight: 400, style: 'normal' },
    { name: 'DM Sans', data: file('assets/fonts/dmsans-700.ttf'), weight: 700, style: 'normal' },
    { name: 'Playfair Display', data: file('assets/fonts/playfair-700.ttf'), weight: 700, style: 'normal' }
  ];
  const response = new ImageResponse(previewImage(recipe), { width: 1200, height: 630, fonts });
  return Buffer.from(await response.arrayBuffer());
}

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const slug = String(req.query?.slug || url.searchParams.get('slug') || '');
  const wantsImage = (req.query?.img || url.searchParams.get('img')) === '1';
  let recipe = null;
  try {
    recipe = await publicRecipe(slug);
  } catch (e) {
    console.error('Gedeeld recept ophalen', e);
  }
  try {
    if (wantsImage) {
      if (!recipe) {
        res.status(302);
        res.setHeader('Location', '/assets/savour-og.png');
        return res.end();
      }
      const png = await imagePng(recipe);
      res.status(200);
      res.setHeader('Content-Type', 'image/png');
      // Een uur vers, daarna op de achtergrond vernieuwen: een aangepast recept krijgt zo vanzelf een nieuw plaatje.
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
      return res.end(png);
    }
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
    return res.end(pageHtml(recipe, slug));
  } catch (e) {
    console.error('Gedeeld recept', e);
    // Altijd een werkende pagina: dan zonder eigen preview.
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(file('index.html'));
  }
}
