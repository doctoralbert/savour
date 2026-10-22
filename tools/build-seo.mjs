// Maakt vindbare losse pagina's (Over, FAQ, Gids, Pro, voorwaarden, privacy, contact) in het Nederlands en
// Engels, plus sitemap.xml. Zoekmachines en AI-assistenten lezen deze gewone HTML zonder JavaScript.
// De teksten komen uit de app zelf (js/features/public-pages.js en de Pro-pagina in js/features/pro.js),
// de Engelse vertaling uit tools/vertalingen.mjs. Draai na het aanpassen van die teksten:
//   node tools/build-i18n.mjs && node tools/build-seo.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import { strings, patterns } from './vertalingen.mjs';

const ROOT = new URL('../', import.meta.url);
const SITE = 'https://savour.page';
const read = p => fs.readFileSync(new URL(p, ROOT), 'utf8');

// ---- Teksten uit de app laden (zonder browser) ----
const ctx = { console, fetch: () => Promise.reject(new Error('offline')), demoMode: false, recipes: [] };
vm.createContext(ctx);
vm.runInContext(read('js/core/helpers.js'), ctx);
vm.runInContext(read('js/features/public-pages.js'), ctx);
vm.runInContext(read('js/features/pro.js'), ctx);
const copy = vm.runInContext('siteCopy.nl', ctx);
const proHost = { innerHTML: '', dataset: { plansRequested: '1' }, isConnected: false };
ctx.proHost = proHost;
vm.runInContext('renderProPage(proHost)', ctx);
// Alleen de algemene uitleg: geen knoppen om af te rekenen (dat gebeurt in de app).
const proBody = proHost.innerHTML.replace(/<button[^>]*>[\s\S]*?<\/button>/g, '');

const CONTACT_FORM = /<h2>Stuur ons een bericht<\/h2><form[\s\S]*?<\/form>/;

// ---- Pagina's ----
const PAGES = [
  {
    id: 'about',
    nl: 'over-savour',
    en: 'en/about',
    title: ['Over Savour — receptbeheer voor professionele keukens', 'About Savour — recipe management for professional kitchens'],
    desc: [
      'Savour is een professioneel platform om recepten te beheren, organiseren en delen. Gemaakt door chefs uit Nederland, voor chefs en keukenteams.',
      'Savour is a professional platform to manage, organise and share recipes. Made by chefs from the Netherlands, for chefs and kitchen teams.'
    ]
  },
  {
    id: 'pro',
    nl: 'savour-pro',
    en: 'en/pro',
    title: ['Savour Pro — prijzen en abonnementen', 'Savour Pro — pricing and plans'],
    desc: [
      'Gratis beginnen met tot 100 recepten. Savour Pro vanaf €2,99 per maand: onbeperkt recepten, AI-import van foto’s en kladjes, gedeelde mappen. Teamabonnementen voor hele keukens.',
      'Start free with up to 100 recipes. Savour Pro from €2.99 per month: unlimited recipes, AI import of photos and handwritten notes, shared folders. Team plans for whole kitchens.'
    ]
  },
  {
    id: 'faq',
    nl: 'veelgestelde-vragen',
    en: 'en/faq',
    title: ['Veelgestelde vragen over Savour', 'Frequently asked questions about Savour'],
    desc: [
      'Antwoorden over Savour: recepten importeren uit Word, PDF en foto’s, gratis en Pro, gedeelde mappen en werken in de keuken.',
      'Answers about Savour: importing recipes from Word, PDF and photos, free and Pro, shared folders and working in the kitchen.'
    ]
  },
  {
    id: 'guide',
    nl: 'gids',
    en: 'en/guide',
    title: ['Gids: werken met recepten in Savour', 'Guide: working with recipes in Savour'],
    desc: [
      'Stap voor stap: je receptenboek importeren, ordenen in mappen en categorieën, opschalen, kookmodus, printen en delen met je team.',
      'Step by step: import your recipe book, organise it in folders and categories, scale, cook mode, print and share with your team.'
    ]
  },
  {
    id: 'contact',
    nl: 'contact',
    en: 'en/contact',
    title: ['Contact — Savour', 'Contact — Savour'],
    desc: ['Neem contact op met Savour via contact@savour.page.', 'Get in touch with Savour at contact@savour.page.']
  },
  {
    id: 'terms',
    nl: 'voorwaarden',
    en: 'en/terms',
    title: ['Algemene voorwaarden — Savour', 'Terms and conditions — Savour'],
    desc: ['De algemene voorwaarden van Savour.', 'The terms and conditions of Savour.']
  },
  {
    id: 'privacy',
    nl: 'privacy',
    en: 'en/privacy',
    title: ['Privacybeleid — Savour', 'Privacy policy — Savour'],
    desc: ['Hoe Savour met je gegevens omgaat.', 'How Savour handles your data.']
  }
];

// ---- Vertalen naar het Engels (zelfde regels als js/core/i18n.js, per stukje tekst tussen tags) ----
const dict = new Map(strings.map(r => [r[0].replace(/\s+/g, ' ').trim(), r[1]]));
const pats = patterns.map(r => [new RegExp(r[0]), r[1]]);
const missing = new Set();
function translateText(text) {
  const key = text.replace(/­/g, '').replace(/\s+/g, ' ').trim();
  if (!key || !/\p{L}/u.test(key)) return text;
  const direct = dict.get(key);
  if (direct) return text.replace(text.trim(), direct);
  for (const [re, rep] of pats) if (re.test(key)) return text.replace(text.trim(), key.replace(re, rep));
  missing.add(key);
  return text;
}
const translateHtml = html =>
  html
    .split(/(<[^>]+>)/)
    .map(part => (part.startsWith('<') ? part : translateText(part)))
    .join('');

// ---- Opmaak ----
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const urlFor = (page, lang) => `${SITE}/${page[lang]}`;
const NAV = {
  nl: ['Over Savour', 'Savour Pro', 'Veelgestelde vragen', 'Gids', 'Contact', 'Algemene voorwaarden', 'Privacybeleid'],
  en: ['About Savour', 'Savour Pro', 'FAQ', 'Guide', 'Contact', 'Terms and conditions', 'Privacy policy']
};
const UI = {
  nl: { open: 'Open Savour', start: 'Gratis beginnen', home: '/', other: 'English', ctaTitle: 'Probeer Savour gratis', ctaText: 'Tot 100 recepten gratis, en 7 dagen Savour Pro om te proberen. Geen betaalgegevens nodig.', contactForm: 'Liever een formulier? <a href="/?info=contact">Open het contactformulier</a>.' },
  en: { open: 'Open Savour', start: 'Start for free', home: '/en', other: 'Nederlands', ctaTitle: 'Try Savour for free', ctaText: 'Up to 100 recipes free, and 7 days of Savour Pro to try. No payment details needed.', contactForm: 'Prefer a form? <a href="/en?info=contact">Open the contact form</a>.' }
};

// Vraag-en-antwoord uit de FAQ voor zoekmachines (FAQPage).
function faqSchema(html) {
  const items = [...html.matchAll(/<h2>([\s\S]*?)<\/h2>\s*<p>([\s\S]*?)<\/p>/g)].map(m => ({
    '@type': 'Question',
    name: m[1].replace(/<[^>]+>/g, ''),
    acceptedAnswer: { '@type': 'Answer', text: m[2].replace(/<[^>]+>/g, '') }
  }));
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items };
}

function pageHtml(page, lang) {
  const i = lang === 'nl' ? 0 : 1;
  const ui = UI[lang];
  let body = page.id === 'pro' ? proBody : copy[page.id] || '';
  if (page.id === 'contact') body = body.replace(CONTACT_FORM, `<p>${ui.contactForm}</p>`);
  let title = copy[page.id + 'Title'] || NAV.nl[PAGES.indexOf(page)];
  let lead = copy[page.id + 'Lead'] || '';
  let note = copy[page.id + 'Note'] || '';
  if (lang === 'en') {
    if (page.id === 'contact') body = body.replace(`<p>${UI.nl.contactForm}</p>`, `<p>${ui.contactForm}</p>`);
    body = translateHtml(body);
    [title, lead, note] = [title, lead, note].map(t => (t ? translateText(t) : t));
  }
  const alt = PAGES.map((p, n) => `<a href="/${p[lang]}"${p === page ? ' aria-current="page"' : ''}>${NAV[lang][n]}</a>`).join('');
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title[i],
      description: page.desc[i],
      url: urlFor(page, lang),
      inLanguage: lang,
      isPartOf: { '@type': 'WebSite', name: 'Savour', url: SITE + '/' },
      publisher: { '@type': 'Organization', name: 'Savour', url: SITE + '/', email: 'contact@savour.page' }
    }
  ];
  if (page.id === 'faq') schema.push(faqSchema(body));
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(page.title[i])}</title>
<meta name="description" content="${esc(page.desc[i])}">
<link rel="canonical" href="${urlFor(page, lang)}">
<link rel="alternate" hreflang="nl" href="${urlFor(page, 'nl')}">
<link rel="alternate" hreflang="en" href="${urlFor(page, 'en')}">
<link rel="alternate" hreflang="x-default" href="${urlFor(page, 'nl')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Savour">
<meta property="og:title" content="${esc(page.title[i])}">
<meta property="og:description" content="${esc(page.desc[i])}">
<meta property="og:url" content="${urlFor(page, lang)}">
<meta property="og:image" content="${SITE}/assets/savour-og.png">
<meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d1314">
<link rel="icon" type="image/png" href="/assets/savour-icon.png?v=57">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/seo-pages.css">
<script type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : schema)}</script>
</head>
<body>
<header class="sp-top"><a class="sp-brand" href="${ui.home}" translate="no">SAVOUR</a><div class="sp-actions"><a class="sp-lang" href="/${page[lang === 'nl' ? 'en' : 'nl']}">${ui.other}</a><a class="sp-btn" href="${ui.home}">${ui.open}</a></div></header>
<main class="sp-main">
<article>
<h1>${esc(title)}</h1>
${lead ? `<p class="sp-lead">${esc(lead)}</p>` : ''}${note ? `<p class="sp-note">${esc(note)}</p>` : ''}
<div class="sp-body">${body}</div>
</article>
<aside class="sp-cta"><h2>${ui.ctaTitle}</h2><p>${ui.ctaText}</p><a class="sp-btn gold" href="${ui.home}">${ui.start}</a></aside>
</main>
<footer class="sp-footer"><nav aria-label="Savour">${alt}</nav><p>© 2026 Savour · ${lang === 'nl' ? 'door chefs uit Nederland, voor chefs' : 'by chefs from the Netherlands, for chefs'}</p></footer>
</body>
</html>
`;
}

// ---- Wegschrijven ----
for (const page of PAGES)
  for (const lang of ['nl', 'en']) {
    const dir = new URL(`${page[lang]}/`, ROOT);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(new URL('index.html', dir), pageHtml(page, lang), 'utf8');
  }

const today = new Date().toISOString().slice(0, 10);
const entry = (loc, alts, priority) =>
  `  <url><loc>${loc}</loc>${alts.map(([l, h]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${h}"/>`).join('')}<lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
const homeAlts = [['nl', SITE + '/'], ['en', SITE + '/en'], ['de', SITE + '/de'], ['es', SITE + '/es'], ['x-default', SITE + '/']];
const urls = [
  ...homeAlts.slice(0, 4).map(([, h], n) => entry(h, homeAlts, n ? '0.8' : '1.0')),
  ...PAGES.flatMap(p =>
    ['nl', 'en'].map(lang =>
      entry(urlFor(p, lang), [['nl', urlFor(p, 'nl')], ['en', urlFor(p, 'en')], ['x-default', urlFor(p, 'nl')]], ['terms', 'privacy', 'contact'].includes(p.id) ? '0.3' : '0.7')
    )
  )
];
fs.writeFileSync(
  new URL('sitemap.xml', ROOT),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
  'utf8'
);

console.log(PAGES.length * 2, "pagina's en sitemap.xml gemaakt");
if (missing.size) {
  console.log(`\n${missing.size} stukjes zonder Engelse vertaling (blijven Nederlands):`);
  for (const m of missing) console.log(' -', m.slice(0, 110));
}
