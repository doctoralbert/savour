// Bouwt de publieke website: de startpagina (in index.html), de losse pagina's (functies, voor wie, over ons,
// prijzen, blog, FAQ, gids, contact, voorwaarden, privacy) in het Nederlands en Engels, en sitemap.xml.
// Zoekmachines en AI-assistenten lezen deze gewone HTML zonder JavaScript.
// Teksten: tools/site-content.mjs (website) en js/features/public-pages.js + de Pro-pagina (uit de app).
// Draai na het aanpassen van teksten:  node tools/build-i18n.mjs && node tools/build-seo.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import { strings, patterns } from './vertalingen.mjs';
import { UI, KLADJE, FEATURES, AUDIENCES, STORY, HOME, POSTS } from './site-content.mjs';

const ROOT = new URL('../', import.meta.url);
const SITE = 'https://savour.page';
const LANGS = ['nl', 'en'];
const read = p => fs.readFileSync(new URL(p, ROOT), 'utf8');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const url = slug => `${SITE}/${slug}`.replace(/\/$/, '') || SITE;
const href = slug => '/' + slug;

// ---- Teksten uit de app (bestaande informatiepagina's en de Pro-pagina) ----
const ctx = { console, fetch: () => Promise.reject(new Error('offline')), demoMode: false, recipes: [] };
vm.createContext(ctx);
vm.runInContext(read('js/core/helpers.js'), ctx);
vm.runInContext(read('js/features/public-pages.js'), ctx);
vm.runInContext(read('js/features/pro.js'), ctx);
const copy = vm.runInContext('siteCopy.nl', ctx);
const proHost = { innerHTML: '', dataset: { plansRequested: '1' }, isConnected: false };
ctx.proHost = proHost;
vm.runInContext('renderProPage(proHost)', ctx);
const proBody = proHost.innerHTML.replace(/<button[^>]*>[\s\S]*?<\/button>/g, '');

// Engelse vertaling van die app-teksten (zelfde regels als js/core/i18n.js, per stukje tekst tussen tags).
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

// ---- Bestaande informatiepagina's ----
const LEGACY = [
  {
    id: 'pro',
    nl: 'savour-pro',
    en: 'en/pro',
    title: ['Prijzen — Savour Pro en teamabonnementen', 'Pricing — Savour Pro and team plans'],
    h1: ['Prijzen', 'Pricing'],
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
const legacy = id => LEGACY.find(p => p.id === id);
const CONTACT_FORM = /<h2>Stuur ons een bericht<\/h2><form[\s\S]*?<\/form>/;
const blogSlug = { nl: 'blog', en: 'en/blog' };

// ---- Onderdelen ----
// inApp: de startpagina in index.html (knoppen openen inloggen/demo direct; taalknop wisselt zonder herladen).
function header(lang, alt, inApp) {
  const u = UI[lang];
  const q = lang === 'nl' ? '/' : '/en';
  const auth = mode => `href="${q}?auth=${mode}" data-auth="${mode}"`;
  const featureLinks = FEATURES.map(f => {
    const t = f[lang];
    return `<a href="${href(t.slug)}"${f.soon ? ` class="soon"` : ''}><b${f.soon ? ` data-soon="${u.soon}"` : ''}>${esc(t.menu)}</b><span>${esc(t.short)}</span></a>`;
  }).join('');
  const audienceLinks = AUDIENCES.map(a => `<a href="${href(a[lang].slug)}"><b>${esc(a[lang].menu)}</b><span>${esc(a[lang].short)}</span></a>`).join('');
  const other = lang === 'nl' ? 'en' : 'nl';
  const langLink = inApp
    ? `<a class="site-plain" href="${other === 'nl' ? '/' : '/en'}" data-set-lang="${other}">${u.other}</a>`
    : `<a class="site-plain" href="${alt}" hreflang="${other}">${u.other}</a>`;
  return `<header class="site-header"><div class="site-wrap">
<div class="site-logo"><a href="${u.home}" translate="no">SAVOUR</a><div class="site-drop"><p>${esc(u.logoLine)}</p><a href="${u.home}"><b>Home</b></a><a href="${href(STORY[lang].slug)}"><b>${u.about}</b></a><a href="${href(blogSlug[lang])}"><b>${u.blog}</b></a><a href="${href(legacy('contact')[lang])}"><b>${u.contact}</b></a></div></div>
<nav class="site-nav" aria-label="Savour">
<div class="site-item"><button type="button" aria-haspopup="true">${u.features}</button><div class="site-drop wide">${featureLinks}</div></div>
<div class="site-item"><button type="button" aria-haspopup="true">${u.audience}</button><div class="site-drop">${audienceLinks}</div></div>
<div class="site-item"><a href="${href(legacy('pro')[lang])}">${u.pricing}</a></div>
<div class="site-item"><a href="${href(STORY[lang].slug)}">${u.about}</a></div>
<div class="site-item"><a href="${href(blogSlug[lang])}">${u.blog}</a></div>
</nav>
<div class="site-actions">${langLink}<a class="site-plain" ${auth('login')}>${u.login}</a><a class="site-btn solid" ${auth('signup')}>${u.start}</a></div>
<button class="site-burger" type="button" aria-expanded="false" data-open="${u.menu}" data-close="${u.close}">${u.menu}</button>
</div></header>`;
}

function footer(lang, alt, inApp) {
  const u = UI[lang];
  const q = lang === 'nl' ? '/' : '/en';
  const li = (h, t) => `<li><a href="${h}">${esc(t)}</a></li>`;
  const other = lang === 'nl' ? 'en' : 'nl';
  const langLink = inApp
    ? `<a href="${other === 'nl' ? '/' : '/en'}" data-set-lang="${other}">${u.other}</a>`
    : `<a href="${alt}" hreflang="${other}">${u.other}</a>`;
  return `<footer class="site-foot"><div class="site-wrap">
<div class="site-foot-top">
<div class="site-foot-brand"><span translate="no">SAVOUR</span><p>${esc(u.footerTag)} ${lang === 'nl' ? 'Gemaakt door chefs uit Nederland, voor chefs.' : 'Made by chefs from the Netherlands, for chefs.'}</p><a class="site-btn" href="${q}?auth=signup" data-auth="signup">${u.start}</a></div>
<div><h4>${u.footerCols.features}</h4><ul>${FEATURES.map(f => li(href(f[lang].slug), f[lang].menu)).join('')}</ul></div>
<div><h4>${u.footerCols.audience}</h4><ul>${AUDIENCES.map(a => li(href(a[lang].slug), a[lang].menu)).join('')}</ul></div>
<div><h4>${u.footerCols.company}</h4><ul>${li(href(STORY[lang].slug), u.about)}${li(href(legacy('pro')[lang]), u.pricing)}${li(href(blogSlug[lang]), u.blog)}${li(href(legacy('contact')[lang]), u.contact)}</ul></div>
<div><h4>${u.footerCols.help}</h4><ul>${li(href(legacy('faq')[lang]), u.faq)}${li(href(legacy('guide')[lang]), u.guide)}${li(`${q}?info=bug`, u.bug)}<li><a href="${q}?auth=login" data-auth="login">${u.login}</a></li></ul></div>
</div>
<div class="site-foot-bottom"><span>© 2026 ${esc(u.company)}</span><nav>${`<a href="${href(legacy('terms')[lang])}">${u.terms}</a><a href="${href(legacy('privacy')[lang])}">${u.privacy}</a>`}${langLink}</nav></div>
</div></footer>`;
}

function kladje(lang) {
  const k = KLADJE[lang];
  return `<figure class="kladje-demo"><div class="kladje" aria-hidden="true"><b>${esc(k.note[0])}</b>${k.note.slice(1).map(l => `<span>${esc(l)}</span>`).join('')}</div>
<div class="kladje-recept"><h3>${esc(k.title)}</h3><small>${esc(k.meta)}</small><ul>${k.ingredients.map(i => `<li>${esc(i)}</li>`).join('')}</ul><ol>${k.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>
<figcaption>${esc(k.caption)}</figcaption></figure>`;
}

const rows = (items, lang) =>
  `<ul class="site-rows">${items
    .map(x => {
      const t = x[lang];
      return `<li><a href="${href(t.slug)}"><b>${esc(t.menu)}${x.soon ? `<span class="soon-tag">${UI[lang].soon}</span>` : ''}</b><span>${esc(t.short)}</span><i aria-hidden="true">→</i></a></li>`;
    })
    .join('')}</ul>`;

function ctaBlock(lang, inApp) {
  const u = UI[lang];
  const q = lang === 'nl' ? '/' : '/en';
  return `<section class="site-cta"><div class="site-wrap"><h2 class="reveal">${esc(u.ctaTitle)}</h2><p>${esc(u.ctaText)}</p><div class="site-cta-row"><a class="site-btn solid" href="${q}?auth=signup" data-auth="signup">${u.start}</a><a class="site-btn" href="${q}?demo=1" data-demo>${u.demo}</a></div></div></section>`;
}

// ---- Startpagina (ook gebruikt in index.html) ----
function homeBody(lang, inApp) {
  const h = HOME[lang];
  const u = UI[lang];
  const q = lang === 'nl' ? '/' : '/en';
  return `<section class="site-hero"><div class="site-wrap">
<div><span class="site-eyebrow">${esc(h.eyebrow)}</span><h1>${esc(h.h1)}</h1><p class="site-lead">${esc(h.lead)}</p><p class="site-proof">${esc(h.proof)}</p>
<div class="site-cta-row"><a class="site-btn solid" href="${q}?auth=signup" data-auth="signup">${u.start}</a><a class="site-btn" href="${q}?demo=1" data-demo>${u.demo}</a></div><p class="site-note" style="margin-top:10px">${esc(u.demoNote)}</p></div>
${kladje(lang)}
</div></section>
<section class="site-section"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.storyTitle)}</h2><div>${h.story.map(p => `<p>${esc(p)}</p>`).join('')}<p><a class="site-link" href="${href(STORY[lang].slug)}">${esc(h.storyLink)}</a></p></div></div></section>
<section class="site-section tint"><div class="site-wrap"><h2 class="reveal">${esc(h.featuresTitle)}</h2>${rows(FEATURES.filter(f => !f.soon), lang)}</div></section>
<section class="site-section"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.audienceTitle)}</h2>${rows(AUDIENCES, lang)}</div></section>
<section class="site-section tint"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.soonTitle)}</h2><div><ul class="site-rows">${FEATURES.find(f => f.soon)[lang].sections.map(([t, d]) => `<li><a href="${href(FEATURES.find(f => f.soon)[lang].slug)}"><b>${esc(t)}</b><span>${esc(d)}</span><i aria-hidden="true">→</i></a></li>`).join('')}</ul></div></div></section>
<section class="site-section"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.priceTitle)}</h2><div><p>${esc(h.price)}</p><p><a class="site-link" href="${href(legacy('pro')[lang])}">${esc(h.priceLink)}</a></p></div></div></section>
<section class="site-section tint"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.faqTitle)}</h2><div class="site-faq">${h.faq.map(([qq, a]) => `<details><summary>${esc(qq)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>
${ctaBlock(lang, inApp)}`;
}

// ---- Losse pagina's ----
function pageHead(lang, { title, desc, canonical, alternates, schema }) {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
${alternates.map(([l, h]) => `<link rel="alternate" hreflang="${l}" href="${h}">`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Savour">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/savour-og.png">
<meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f6f2ea">
<link rel="icon" type="image/png" href="/assets/savour-icon.png?v=57">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/site.css">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script src="/js/site.js" defer></script>
</head>
<body style="margin:0">
`;
}

const webPage = (lang, title, desc, canonical) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description: desc,
  url: canonical,
  inLanguage: lang,
  isPartOf: { '@type': 'WebSite', name: 'Savour', url: SITE + '/' },
  publisher: { '@type': 'Organization', name: 'Savour', url: SITE + '/', email: 'contact@savour.page' }
});

function writePage(slug, html) {
  const dir = new URL(`${slug}/`, ROOT);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(new URL('index.html', dir), html, 'utf8');
}

const sitemap = [];
function page({ lang, slugs, title, desc, crumbs, body, schema = [] }) {
  const canonical = url(slugs[lang]);
  const alternates = LANGS.filter(l => slugs[l]).map(l => [l, url(slugs[l])]);
  if (slugs.nl) alternates.push(['x-default', url(slugs.nl)]);
  const other = lang === 'nl' ? 'en' : 'nl';
  const alt = slugs[other] ? href(slugs[other]) : UI[other].home;
  const crumbHtml = crumbs?.length
    ? `<div class="site-crumbs"><a href="${UI[lang].home}">Home</a>${crumbs.map(c => ` / ${c[1] ? `<a href="${c[1]}">${esc(c[0])}</a>` : esc(c[0])}`).join('')}</div>`
    : '';
  const html =
    pageHead(lang, { title, desc, canonical, alternates, schema: [webPage(lang, title, desc, canonical), ...schema] }) +
    `<div class="site">${header(lang, alt, false)}<main>${body(crumbHtml)}</main>${ctaBlock(lang, false)}${footer(lang, alt, false)}</div>\n</body>\n</html>\n`;
  writePage(slugs[lang], html);
  sitemap.push({ loc: canonical, alternates });
}

const pageTop = (crumbHtml, h1, lead) =>
  `<section class="site-page-head"><div class="site-wrap site-narrow">${crumbHtml}<h1>${esc(h1)}</h1>${lead ? `<p class="site-lead">${esc(lead)}</p>` : ''}</div></section>`;
const sectionsHtml = sections => sections.map(([t, d]) => `<h2 class="reveal">${esc(t)}</h2><p>${esc(d)}</p>`).join('');

for (const lang of LANGS) {
  const u = UI[lang];
  // Functies
  for (const f of FEATURES) {
    const t = f[lang];
    const others = FEATURES.filter(x => x !== f && !x.soon);
    page({
      lang,
      slugs: { nl: f.nl.slug, en: f.en.slug },
      title: t.title,
      desc: t.desc,
      crumbs: [[u.features], [t.menu]],
      body: c =>
        pageTop(c, t.h1, t.lead) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${t.kladje ? `<div class="site-figure">${kladje(lang)}</div>` : ''}${sectionsHtml(t.sections)}${
          f.soon ? `<p class="site-note">${lang === 'nl' ? 'Wil je meedenken? Mail ons op' : 'Want to share ideas? Email us at'} <a href="mailto:contact@savour.page">contact@savour.page</a>.</p>` : ''
        }</div></article>
<section class="site-related"><div class="site-wrap site-narrow"><h2>${u.related}</h2>${rows(others.slice(0, 3), lang)}</div></section>`
    });
  }
  // Voor wie
  for (const a of AUDIENCES) {
    const t = a[lang];
    page({
      lang,
      slugs: { nl: a.nl.slug, en: a.en.slug },
      title: t.title,
      desc: t.desc,
      crumbs: [[u.audience], [t.menu]],
      body: c =>
        pageTop(c, t.h1, t.lead) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${sectionsHtml(t.sections)}</div></article>
<section class="site-related"><div class="site-wrap site-narrow"><h2>${u.features}</h2>${rows(FEATURES.filter(x => !x.soon), lang)}</div></section>`
    });
  }
  // Over ons
  {
    const s = STORY[lang];
    page({
      lang,
      slugs: { nl: STORY.nl.slug, en: STORY.en.slug },
      title: s.title,
      desc: s.desc,
      crumbs: [[u.about]],
      body: c =>
        pageTop(c, s.h1, s.lead) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose"><p>${esc(s.intro)}</p>
<div class="site-figure">${kladje(lang)}</div>
<div class="site-timeline">${s.timeline.map(([t, d], i) => `<details${i === 0 ? ' open' : ''}><summary><small>${String(i + 1).padStart(2, '0')}</small>${esc(t)}</summary><p>${esc(d)}</p></details>`).join('')}</div>
</div></article>
<section class="site-section tint"><div class="site-wrap"><h2 class="reveal">${esc(s.valuesTitle)}</h2><div class="site-values">${s.values.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div></div></section>`
    });
  }
  // Blog: overzicht en artikelen
  page({
    lang,
    slugs: blogSlug,
    title: lang === 'nl' ? 'Blog — Savour' : 'Blog — Savour',
    desc: u.blogLead,
    crumbs: [[u.blog]],
    body: c =>
      pageTop(c, u.blog, u.blogLead) +
      `<article class="site-article"><div class="site-wrap site-narrow"><ul class="site-posts">${POSTS.map(
        p => `<li><h2><a href="${href(p[lang].slug)}">${esc(p[lang].title)}</a></h2><p>${esc(p[lang].desc)}</p><a class="site-link" href="${href(p[lang].slug)}">${u.readArticle}</a></li>`
      ).join('')}</ul></div></article>`
  });
  for (const p of POSTS) {
    const t = p[lang];
    const date = new Date(p.date).toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    page({
      lang,
      slugs: { nl: p.nl.slug, en: p.en.slug },
      title: `${t.title} | Savour`,
      desc: t.desc,
      crumbs: [[u.blog, href(blogSlug[lang])]],
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: t.h1,
          description: t.desc,
          datePublished: p.date,
          inLanguage: lang,
          author: { '@type': 'Organization', name: 'Savour' },
          publisher: { '@type': 'Organization', name: 'Savour', logo: { '@type': 'ImageObject', url: `${SITE}/assets/savour-icon.png` } },
          mainEntityOfPage: url(t.slug)
        }
      ],
      body: c =>
        pageTop(c, t.h1, t.lead) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose"><p class="site-meta">${date}</p>${sectionsHtml(t.sections)}<p><em>${esc(t.outro)}</em></p></div></article>`
    });
  }
  // Bestaande informatiepagina's (inhoud uit de app)
  for (const p of LEGACY) {
    const i = lang === 'nl' ? 0 : 1;
    let body = p.id === 'pro' ? proBody : copy[p.id] || '';
    const formLine =
      lang === 'nl'
        ? 'Liever een formulier? <a href="/?info=contact">Open het contactformulier</a>.'
        : 'Prefer a form? <a href="/en?info=contact">Open the contact form</a>.';
    if (p.id === 'contact') body = body.replace(CONTACT_FORM, '%%FORM%%');
    let h1 = p.h1 ? p.h1[i] : copy[p.id + 'Title'];
    let lead = copy[p.id + 'Lead'] || '';
    let note = copy[p.id + 'Note'] || '';
    if (lang === 'en') {
      body = translateHtml(body);
      if (!p.h1) h1 = translateText(h1);
      lead = lead && translateText(lead);
      note = note && translateText(note);
    }
    body = body.replace('%%FORM%%', `<p>${formLine}</p>`);
    const schema = [];
    if (p.id === 'faq')
      schema.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [...body.matchAll(/<h2>([\s\S]*?)<\/h2>\s*<p>([\s\S]*?)<\/p>/g)].map(m => ({
          '@type': 'Question',
          name: m[1].replace(/<[^>]+>/g, ''),
          acceptedAnswer: { '@type': 'Answer', text: m[2].replace(/<[^>]+>/g, '') }
        }))
      });
    page({
      lang,
      slugs: { nl: p.nl, en: p.en },
      title: p.title[i],
      desc: p.desc[i],
      schema,
      body: c => pageTop(c, h1, lead) + `<article class="site-article"><div class="site-wrap site-narrow site-prose">${note ? `<p class="site-meta">${esc(note)}</p>` : ''}${body}</div></article>`
    });
  }
}

// ---- Startpagina in index.html (beide talen; CSS toont de juiste) ----
{
  const file = new URL('index.html', ROOT);
  let h = fs.readFileSync(file, 'utf8');
  const site = LANGS.map(
    lang =>
      `<div class="site" data-site-lang="${lang}" translate="no">${header(lang, null, true)}<main>${homeBody(lang, true)}</main>${footer(lang, null, true)}</div>`
  ).join('\n');
  const block = `<!-- SITE:START (gemaakt door tools/build-seo.mjs, niet met de hand aanpassen) -->\n${site}\n<!-- SITE:END -->`;
  if (h.includes('<!-- SITE:START')) h = h.replace(/<!-- SITE:START[\s\S]*?<!-- SITE:END -->/, () => block);
  else {
    const open = '<div class="landing" id="landingView">';
    const a = h.indexOf(open) + open.length;
    const b = h.indexOf('</div>\n<div id="publicInfoShell"');
    if (a < open.length || b < 0) throw new Error('Startpagina niet gevonden in index.html');
    h = h.slice(0, a) + '\n' + block + '\n' + h.slice(b);
  }
  fs.writeFileSync(file, h, 'utf8');
}

// ---- Sitemap ----
const today = new Date().toISOString().slice(0, 10);
const homeAlts = [['nl', SITE + '/'], ['en', SITE + '/en'], ['de', SITE + '/de'], ['es', SITE + '/es'], ['x-default', SITE + '/']];
const entry = (loc, alts, priority) =>
  `  <url><loc>${loc}</loc>${alts.map(([l, h]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${h}"/>`).join('')}<lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
const low = /\/(en\/)?(voorwaarden|terms|privacy|contact)$/;
const urls = [
  ...homeAlts.slice(0, 4).map(([, h], n) => entry(h, homeAlts, n ? '0.8' : '1.0')),
  ...sitemap.map(s => entry(s.loc, s.alternates, low.test(s.loc) ? '0.3' : '0.7'))
];
fs.writeFileSync(
  new URL('sitemap.xml', ROOT),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
  'utf8'
);

console.log(sitemap.length, "pagina's, startpagina en sitemap.xml gemaakt");
if (missing.size) {
  console.log(`\n${missing.size} stukjes zonder Engelse vertaling (blijven Nederlands):`);
  for (const m of missing) console.log(' -', m.slice(0, 110));
}
