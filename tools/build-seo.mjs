// Bouwt de publieke website: de startpagina (in index.html), de losse pagina's (functies, voor wie, over ons,
// prijzen, blog, FAQ, gids, contact, voorwaarden, privacy) in het Nederlands, Engels, Duits en Spaans, en sitemap.xml.
// Zoekmachines en AI-assistenten lezen deze gewone HTML zonder JavaScript.
// Teksten: tools/site-content.mjs en tools/site-blog.mjs (NL en EN), tools/site-pages-de.mjs en -es.mjs (DE en ES),
// js/features/public-pages.js + de Pro-pagina (uit de app, vertaald via tools/vertalingen.mjs).
// Draai na het aanpassen van teksten:  node tools/build-i18n.mjs && node tools/build-seo.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import { strings, patterns } from './vertalingen.mjs';
import { UI, KLADJE, FEATURES, AUDIENCES, STORY, HOME, POSTS } from './site-content.mjs';
import { EXTRA_LANGS } from './site-content-extra.mjs';
import { KLADJE_REAL } from './site-kladje.mjs';
import { BLOG } from './site-blog.mjs';
import { DE } from './site-pages-de.mjs';
import { ES } from './site-pages-es.mjs';
import { APP_PAGE } from './site-app.mjs';
const PAGES = { de: DE, es: ES };

// Nieuwste blogartikelen eerst.
POSTS.unshift(...BLOG);

const ROOT = new URL('../', import.meta.url);
// Achtergrondfoto achter de bovenkant van de homepage. Alleen als het bestand bestaat; zonder bestand is de
// homepage zoals eerst (terugdraaien = assets/keuken/hero-keuken.jpg weghalen en opnieuw bouwen).
const HERO_FILE = new URL('assets/keuken/hero-keuken.jpg', ROOT);
const HERO_PHOTO = fs.existsSync(HERO_FILE) ? `/assets/keuken/hero-keuken.jpg?v=${fs.statSync(HERO_FILE).size}` : '';
const SITE = 'https://savour.page';
const LANGS = ['nl', 'en', 'de', 'es'];
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

// Vertaling van die app-teksten (zelfde regels als js/core/i18n.js, per stukje tekst tussen tags).
// Kolommen in tools/vertalingen.mjs: 0 = NL, 1 = EN, 2 = DE, 3 = ES.
const COLUMN = { en: 1, de: 2, es: 3 };
const missing = { en: new Set(), de: new Set(), es: new Set() };
const translators = Object.fromEntries(
  Object.entries(COLUMN).map(([lang, col]) => {
    const dict = new Map(strings.filter(r => r[col]).map(r => [r[0].replace(/\s+/g, ' ').trim(), r[col]]));
    const pats = patterns.filter(r => r[col]).map(r => [new RegExp(r[0]), r[col]]);
    const text = t => {
      const key = t.replace(/­/g, '').replace(/\s+/g, ' ').trim();
      if (!key || !/\p{L}/u.test(key)) return t;
      const direct = dict.get(key);
      if (direct) return t.replace(t.trim(), direct);
      for (const [re, to] of pats) if (re.test(key)) return t.replace(t.trim(), key.replace(re, to));
      missing[lang].add(key);
      return t;
    };
    const html = h =>
      h
        .split(/(<[^>]+>)/)
        .map(part => (part.startsWith('<') ? part : text(part)))
        .join('');
    return [lang, { text, html }];
  })
);

// ---- Bestaande informatiepagina's ----
const LEGACY = [
  {
    id: 'pro',
    nl: 'savour-pro',
    en: 'en/pro',
    title: ['Prijzen — Savour Pro en teamabonnementen', 'Pricing — Savour Pro and team plans'],
    h1: ['Prijzen', 'Pricing'],
    desc: [
      'Gratis beginnen met tot 100 recepten. Savour Pro vanaf €2,99 per maand: onbeperkt recepten, AI voor kladjes en gedeelde mappen. Ook teamabonnementen.',
      'Start free with up to 100 recipes. Savour Pro from €2.99 per month: unlimited recipes, AI for handwritten notes and shared folders. Team plans too.'
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
    title: ['Contact — Savour', 'Contact us — Savour'],
    desc: [
      'Vragen over Savour, receptbeheer voor je restaurant of een teamabonnement? Neem contact op via het formulier of contact@savour.page.',
      'Questions about Savour, recipe management for your restaurant or a team plan? Get in touch via the form or at contact@savour.page.'
    ]
  },
  {
    id: 'terms',
    nl: 'voorwaarden',
    en: 'en/terms',
    title: ['Algemene voorwaarden — Savour', 'Terms and conditions — Savour'],
    desc: [
      'De algemene voorwaarden van Savour: gratis account, Savour Pro, teamabonnementen, opzeggen en herroepingsrecht.',
      'The terms and conditions of Savour: free account, Savour Pro, team plans, cancelling and the right of withdrawal.'
    ]
  },
  {
    id: 'privacy',
    nl: 'privacy',
    en: 'en/privacy',
    title: ['Privacybeleid — Savour', 'Privacy policy — Savour'],
    desc: [
      'Hoe Savour met je gegevens en recepten omgaat: wat we bewaren, waarvoor, met wie we werken en welke rechten je hebt.',
      'How Savour handles your data and recipes: what we keep, why, who we work with and what rights you have.'
    ]
  }
];
const legacy = id => LEGACY.find(p => p.id === id);
const CONTACT_FORM = /<h2>Stuur ons een bericht<\/h2><form[\s\S]*?<\/form>/;
const blogSlug = { nl: 'blog', en: 'en/blog' };

// Duits en Spaans: menu en startpagina uit tools/site-content-extra.mjs, alle andere pagina's uit
// tools/site-pages-de.mjs en tools/site-pages-es.mjs. Ontbreekt er een vertaling, dan stopt het bouwen.
const HOME_LANGS = ['nl', 'en', 'de', 'es'];
for (const lang of ['de', 'es']) {
  const x = EXTRA_LANGS[lang];
  const P = PAGES[lang];
  const need = (v, what) => {
    if (!v) throw new Error(`${lang}: ${what} ontbreekt in tools/site-pages-${lang}.mjs`);
    return v;
  };
  UI[lang] = { ...UI.en, ...x.ui, ...P.ui };
  KLADJE[lang] = x.kladje;
  HOME[lang] = x.home;
  for (const f of FEATURES)
    f[lang] = { kladje: f.en.kladje, menu: x.items[f.id][0], short: x.items[f.id][1], ...need(P.features[f.id], f.id) };
  for (const a of AUDIENCES)
    a[lang] = { menu: x.items[a.id][0], short: x.items[a.id][1], ...need(P.audiences[a.id], a.id) };
  STORY[lang] = need(P.story, 'story');
  for (const p of POSTS) p[lang] = need(P.posts[p.en.slug], `blog ${p.en.slug}`);
  for (const p of LEGACY) p[lang] = need(P.legacy[p.id], p.id).slug;
  blogSlug[lang] = P.blogSlug;
}
// Alle taalversies van een pagina (voor hreflang en de taalknop).
const slugsOf = item => Object.fromEntries(LANGS.map(l => [l, typeof item[l] === 'string' ? item[l] : item[l].slug]));
const LOCALE = { nl: 'nl-NL', en: 'en-GB', de: 'de-DE', es: 'es-ES' };
const BLOG_TITLE = {
  nl: 'Blog over receptbeheer en de keuken — Savour',
  en: 'Blog about recipe management and the kitchen — Savour',
  de: DE.blogTitle,
  es: ES.blogTitle
};
const SOON_MAIL = { nl: 'Wil je meedenken? Mail ons op', en: 'Want to share ideas? Email us at', de: DE.ui.soonMail, es: ES.ui.soonMail };
// Contactformulier op de losse contactpagina (versturen via js/site.js naar /api/bug-report).
const FORM_TEXT = {
  nl: ['Stuur ons een bericht', 'Naam', 'E-mailadres', 'Onderwerp', 'Bericht', 'Waar kunnen we je mee helpen?', 'Bericht versturen', 'Bezig…', 'Bedankt. Je bericht is verstuurd; we reageren zo snel mogelijk.', 'Versturen is mislukt. Mail ons gerust op contact@savour.page.'],
  en: ['Send us a message', 'Name', 'Email address', 'Subject', 'Message', 'How can we help?', 'Send message', 'Sending…', 'Thank you. Your message has been sent; we will reply as soon as possible.', 'Sending failed. Feel free to email us at contact@savour.page.'],
  de: ['Schreib uns eine Nachricht', 'Name', 'E-Mail-Adresse', 'Betreff', 'Nachricht', 'Wie können wir helfen?', 'Nachricht senden', 'Wird gesendet…', 'Danke. Deine Nachricht wurde gesendet; wir antworten so schnell wie möglich.', 'Senden fehlgeschlagen. Schreib uns gern an contact@savour.page.'],
  es: ['Envíanos un mensaje', 'Nombre', 'Correo electrónico', 'Asunto', 'Mensaje', '¿En qué podemos ayudarte?', 'Enviar mensaje', 'Enviando…', 'Gracias. Tu mensaje se ha enviado; te responderemos lo antes posible.', 'No se pudo enviar. Escríbenos a contact@savour.page.']
};
function contactForm(lang) {
  const [title, name, email, subject, message, placeholder, send, busy, ok, fail] = FORM_TEXT[lang];
  const f = (id, label, input) => `<div class="site-field"><label for="${id}">${label}</label>${input}</div>`;
  return `<h2>${title}</h2><form class="site-form" data-contact-form data-busy="${esc(busy)}" data-ok="${esc(ok)}" data-fail="${esc(fail)}" novalidate>${f('cfName', name, '<input id="cfName" name="name" autocomplete="name" required maxlength="120">')}${f('cfEmail', email, '<input id="cfEmail" name="email" type="email" autocomplete="email" required maxlength="240">')}${f('cfSubject', subject, '<input id="cfSubject" name="subject" required maxlength="180">')}${f('cfMessage', message, `<textarea id="cfMessage" name="message" rows="6" required maxlength="12000" placeholder="${esc(placeholder)}"></textarea>`)}<div class="site-form-trap" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="site-form-row"><button class="site-btn solid" type="submit">${send}</button><span class="site-form-status" aria-live="polite"></span></div></form>`;
}
const homePath = lang => (lang === 'nl' ? '/' : '/' + lang);
const LANG_LABEL = { nl: 'NL', en: 'EN', de: 'DE', es: 'ES' };
const LANG_NAME = { nl: 'Nederlands', en: 'English', de: 'Deutsch', es: 'Español' };
// Taalkeuze. In de app wisselt hij zonder herladen; op losse pagina's gaat NL/EN naar dezelfde pagina in de
// andere taal en DE/ES naar de startpagina in die taal.
function langSwitch(lang, alts, inApp) {
  // Eén knop met de huidige taal; klikken opent een klein venster met de vier talen (zoals in de app).
  return `<details class="site-lang" translate="no"><summary aria-label="Taal / Language">${LANG_LABEL[lang]}</summary><div class="site-lang-menu">${HOME_LANGS.map(l => {
    const target = inApp ? homePath(l) : alts?.[l] || homePath(l);
    return `<a href="${target}" hreflang="${l}" data-set-lang="${l}"${l === lang ? ' aria-current="true"' : ''}><span>${LANG_LABEL[l]}</span>${LANG_NAME[l]}</a>`;
  }).join('')}</div></details>`;
}

// ---- Onderdelen ----
// inApp: de startpagina in index.html (knoppen openen inloggen/demo direct; taalknop wisselt zonder herladen).
function header(lang, alt, inApp) {
  const u = UI[lang];
  const q = homePath(lang);
  const auth = mode => `href="${q}?auth=${mode}" data-auth="${mode}"`;
  // Uitklapper als een menukaart: genummerde "gangen" met korte uitleg, over de volle breedte.
  const card = (title, intro, items) =>
    `<div class="site-menucard"><div class="site-wrap"><div class="site-menucard-intro"><span>${esc(title)}</span><p>${esc(intro)}</p></div><ol>${items
      .map(
        (x, i) =>
          `<li><a href="${href(x[lang].slug)}"><em>${String(i + 1).padStart(2, '0')}</em><b>${esc(x[lang].menu)}${x.soon ? `<small>${u.soon}</small>` : ''}</b><span>${esc(x[lang].short)}</span></a></li>`
      )
      .join('')}</ol></div></div>`;
  return `<header class="site-header"><div class="site-wrap">
<a class="site-logo" href="${u.home}" translate="no" title="Home">SAVOUR</a>
<nav class="site-nav" aria-label="Savour">
<div class="site-item"><button type="button" aria-haspopup="true">${u.features}</button>${card(u.features, u.featuresIntro, FEATURES)}</div>
<div class="site-item"><button type="button" aria-haspopup="true">${u.audience}</button>${card(u.audience, u.audienceIntro, AUDIENCES)}</div>
<div class="site-item"><a href="${href(legacy('pro')[lang])}">${u.pricing}</a></div>
<div class="site-item"><a href="${href(STORY[lang].slug)}">${u.about}</a></div>
<div class="site-item"><a href="${href(blogSlug[lang])}">${u.blog}</a></div>
</nav>
<div class="site-actions">${langSwitch(lang, alt, inApp)}<a class="site-btn site-login" ${auth('login')}>${u.login}</a><a class="site-btn solid" ${auth('signup')}>${u.start}</a></div>
</div></header>`;
}

function footer(lang, alt, inApp) {
  const u = UI[lang];
  const q = homePath(lang);
  const li = (h, t) => `<li><a href="${h}">${esc(t)}</a></li>`;
  return `<footer class="site-foot"><div class="site-wrap">
<div class="site-foot-top">
<div class="site-foot-brand"><span translate="no">SAVOUR</span><p>${esc(u.footerTag)} ${esc(u.madeBy || (lang === 'nl' ? 'Gemaakt door chefs, voor chefs.' : 'Made by chefs, for chefs.'))}</p><a class="site-btn" href="${q}?auth=signup" data-auth="signup">${u.start}</a></div>
<div><h4>${u.footerCols.features}</h4><ul>${FEATURES.map(f => li(href(f[lang].slug), f[lang].menu)).join('')}</ul></div>
<div><h4>${u.footerCols.audience}</h4><ul>${AUDIENCES.map(a => li(href(a[lang].slug), a[lang].menu)).join('')}</ul></div>
<div><h4>${u.footerCols.company}</h4><ul>${li(href(STORY[lang].slug), u.about)}${li(href(legacy('pro')[lang]), u.pricing)}${li(href(blogSlug[lang]), u.blog)}${li(href(legacy('contact')[lang]), u.contact)}</ul></div>
<div><h4>${u.footerCols.help}</h4><ul>${li(href(legacy('faq')[lang]), u.faq)}${li(href(legacy('guide')[lang]), u.guide)}${li(href(APP_PAGE[lang].slug), APP_PAGE[lang].menu)}${li(`${q}?info=bug`, u.bug)}<li><a href="${q}?auth=login" data-auth="login">${u.login}</a></li></ul></div>
</div>
<div class="site-foot-bottom"><span>© 2026 ${esc(u.company)}</span><nav>${`<a href="${href(legacy('terms')[lang])}">${u.terms}</a><a href="${href(legacy('privacy')[lang])}">${u.privacy}</a>`}</nav>${langSwitch(lang, alt, inApp)}</div>
</div></footer>`;
}

// Het echte kladje (marshmallow, hele foto) naast hetzelfde recept in Savour.
function kladje(lang) {
  const k = KLADJE_REAL[lang];
  return `<figure class="kladje-duo">
<div class="kladje-duo-photo"><span class="kladje-duo-tag">${esc(k.before)}</span><img src="/assets/kladjes/marshmallow-kladje.jpg" alt="${esc(k.alt)}" width="1100" height="969" loading="lazy"></div>
<div class="kladje-duo-card"><span class="kladje-duo-tag gold">${esc(k.after)}</span><h3>${esc(k.title)}</h3><small>${esc(k.meta)}</small><h4>${esc(k.ingredientsTitle)}</h4><ul>${k.ingredients.map(i => `<li>${esc(i)}</li>`).join('')}</ul><h4>${esc(k.stepsTitle)}</h4><ol>${k.steps.map(([t, d]) => `<li><b>${esc(t)}</b> ${esc(d)}</li>`).join('')}</ol><p class="kladje-duo-note">${esc(k.stepsNote)}</p></div>
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
  const q = homePath(lang);
  return `<section class="site-cta with-photo"><div class="site-wrap"><h2 class="reveal">${esc(u.ctaTitle)}</h2><p>${esc(u.ctaText)}</p><div class="site-cta-row"><a class="site-btn solid" href="${q}?auth=signup" data-auth="signup">${u.start}</a><a class="site-btn" href="${q}?demo=1" data-demo>${u.demo}</a></div></div></section>`;
}

// ---- Startpagina (ook gebruikt in index.html) ----
// Bovenaan echte schermafbeeldingen van de app (assets/app): bibliotheek op de laptop, recept op de telefoon.
const SHOT_ALT = {
  nl: ['Receptenbibliotheek in Savour op een laptop', 'Receptscherm in Savour op een telefoon'],
  en: ['Recipe library in Savour on a laptop', 'Recipe screen in Savour on a phone'],
  de: ['Rezeptbibliothek in Savour auf einem Laptop', 'Rezeptansicht in Savour auf dem Handy'],
  es: ['Biblioteca de recetas en Savour en un portátil', 'Pantalla de receta en Savour en un móvil']
};
function homeBody(lang, inApp) {
  const h = HOME[lang];
  const u = UI[lang];
  const q = homePath(lang);
  return `<section class="site-hero${HERO_PHOTO ? ' has-photo' : ''}"${HERO_PHOTO ? ` style="--hero-photo:url('${HERO_PHOTO}')"` : ''}><div class="site-wrap">
<div><h1>${esc(h.h1)}</h1><p class="site-lead">${esc(h.lead)}</p><p class="site-proof">${esc(h.proof)}</p>
<div class="site-cta-row"><a class="site-btn solid" href="${q}?auth=signup" data-auth="signup">${u.start}</a><a class="site-btn" href="${q}?demo=1" data-demo>${u.demo}</a></div><p class="site-note" style="margin-top:10px">${esc(u.demoNote)}</p></div>
<div class="hero-shots"><div class="hero-laptop"><img src="/assets/app/bibliotheek-${lang}.jpg" alt="${esc(SHOT_ALT[lang][0])}" width="1440" height="900"></div><div class="hero-phone"><img src="/assets/app/recept-${lang}.jpg" alt="${esc(SHOT_ALT[lang][1])}" width="520" height="1125"></div></div>
</div></section>
<section class="site-section"><div class="site-wrap"><div class="site-two"><h2 class="reveal">${esc(KLADJE_REAL[lang].heading)}</h2><div>${h.story.map(p => `<p>${esc(p)}</p>`).join('')}<p><a class="site-link" href="${href(STORY[lang].slug)}">${esc(h.storyLink)}</a></p></div></div>${kladje(lang)}</div></section>
<section class="site-section tint"><div class="site-wrap"><h2 class="reveal">${esc(h.featuresTitle)}</h2>${rows(FEATURES.filter(f => !f.soon), lang)}</div></section>
<section class="site-section"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.audienceTitle)}</h2>${rows(AUDIENCES, lang)}</div></section>
<section class="site-section dark"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.soonTitle)}</h2><div><ul class="site-rows">${FEATURES.find(f => f.soon)[lang].sections.map(([t, d]) => `<li><a href="${href(FEATURES.find(f => f.soon)[lang].slug)}"><b>${esc(t)}</b><span>${esc(d)}</span><i aria-hidden="true">→</i></a></li>`).join('')}</ul></div></div></section>
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
<meta property="og:image" content="${SITE}/assets/savour-og.png?v=2">
<meta property="og:locale" content="${{ nl: 'nl_NL', en: 'en_GB', de: 'de_DE', es: 'es_ES' }[lang] || 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d1314">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96.png"><link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192.png">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
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
  // Alle gemaakte pagina's staan in de map site/ (vercel.json en local-server.mjs zetten /slug om naar site/slug/).
  const dir = new URL(`site/${slug}/`, ROOT);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(new URL('index.html', dir), html, 'utf8');
}

const sitemap = [];
function page({ lang, slugs, title, desc, crumbs, body, schema = [] }) {
  const canonical = url(slugs[lang]);
  const alternates = LANGS.filter(l => slugs[l]).map(l => [l, url(slugs[l])]);
  if (slugs.nl) alternates.push(['x-default', url(slugs.nl)]);
  const alt = Object.fromEntries(LANGS.map(l => [l, slugs[l] ? href(slugs[l]) : homePath(l)]));
  const crumbHtml = crumbs?.length
    ? `<div class="site-crumbs"><a href="${UI[lang].home}">Home</a>${crumbs.map(c => ` / ${c[1] ? `<a href="${c[1]}">${esc(c[0])}</a>` : esc(c[0])}`).join('')}</div>`
    : '';
  const html =
    pageHead(lang, { title, desc, canonical, alternates, schema: [webPage(lang, title, desc, canonical), ...schema] }) +
    `<div class="site">${header(lang, alt, false)}<main>${body(crumbHtml)}</main>${ctaBlock(lang, false)}${footer(lang, alt, false)}</div>\n</body>\n</html>\n`;
  writePage(slugs[lang], html);
  sitemap.push({ loc: canonical, alternates });
}

// Over ons: hoofdstukken als doorlopend verhaal, met echte kladjes na het eerste en een echt scherm na "wat Savour nu kan".
function aboutChapters(s, lang) {
  return s.chapters
    .map(([t, ps], i) => {
      let extra = '';
      if (i === 0)
        extra = `<figure class="site-notes reveal">${['marshmallow', 'curd', 'basis-mayonaise']
          .map(n => `<img src="/assets/kladjes/${n}.jpg" alt="" loading="lazy">`)
          .join('')}<figcaption>${esc(s.notesCaption)}</figcaption></figure>`;
      if (i === 4)
        extra = `<figure class="site-notes app reveal"><div class="site-phone-frame"><img src="/assets/app/recept-${lang}.jpg" alt="" loading="lazy"></div><figcaption>${esc(s.appCaption)}</figcaption></figure>`;
      if (i === s.chapters.length - 1)
        extra = `<p><a class="site-link" href="${href(FEATURES.find(f => f.soon)[lang].slug)}">${esc(s.roadmapLink)}</a></p>`;
      return `<h2 class="reveal">${esc(t)}</h2>${ps.map(p => `<p>${esc(p)}</p>`).join('')}${extra}`;
    })
    .join('');
}

// Keukenfoto's van de eigenaar (assets/keuken) als band bovenaan de losse pagina's. Per pagina (Nederlandse slug)
// welke foto en welk deel van de foto in beeld blijft. Voorwaarden en privacy blijven rustig zonder foto.
const PHOTOS = {
  brigade: ['brigade.jpg', 'center 35%'],
  keuken: ['ingredienten-keuken.jpg', 'center 60%'],
  hout: ['ingredienten-hout.jpg', 'center 55%'],
  eend: ['eend-vuur.jpg', 'center 45%'],
  wortels: ['wortels.jpg', 'center 50%'],
  uien: ['uien.jpg', 'center 50%'],
  bloemen: ['bloemen.jpg', 'center 45%'],
  bloemenveld: ['bloemenveld.jpg', 'center 55%']
};
const PAGE_PHOTO = {
  'recepten-digitaliseren': 'hout',
  'recepten-organiseren': 'keuken',
  'recepten-delen': 'brigade',
  'recepten-opschalen': 'wortels',
  'recepten-printen': 'hout',
  binnenkort: 'bloemen',
  'voor-koks': 'hout',
  'voor-keukenbrigades': 'brigade',
  'over-savour': 'bloemenveld',
  blog: 'hout',
  'app-downloaden': 'wortels',
  'savour-pro': 'brigade',
  'veelgestelde-vragen': 'keuken',
  gids: 'hout',
  contact: 'wortels'
};
// Staande foto's (eend, uien) alleen in de fotoduo's: in een brede band worden ze te ver uitvergroot.
const BLOG_PHOTOS = ['wortels', 'keuken', 'brigade', 'hout'];
const photoFile = key => {
  const [file] = PHOTOS[key];
  return `/assets/keuken/${file}?v=${fs.statSync(new URL(`assets/keuken/${file}`, ROOT)).size}`;
};
const pageTop = (crumbHtml, h1, lead, photo) => {
  const p = photo && PHOTOS[photo];
  const style = p ? ` style="--page-photo:url('${photoFile(photo)}');--page-photo-pos:${p[1]}"` : '';
  return `<section class="site-page-head${p ? ' has-photo' : ''}"${style}><div class="site-wrap site-narrow">${crumbHtml}<h1>${esc(h1)}</h1>${lead ? `<p class="site-lead">${esc(lead)}</p>` : ''}</div></section>`;
};
// Twee staande foto's naast elkaar midden in de tekst (Voor wie-pagina's).
const photoDuo = (a, b) =>
  `<figure class="site-photo-duo reveal">${[a, b].map(k => `<img src="${photoFile(k)}" alt="" loading="lazy" style="object-position:${PHOTOS[k][1]}">`).join('')}</figure>`;
const sectionsHtml = sections => sections.map(([t, d]) => `<h2 class="reveal">${esc(t)}</h2><p>${esc(d)}</p>`).join('');

for (const lang of LANGS) {
  const u = UI[lang];
  // Functies
  for (const f of FEATURES) {
    const t = f[lang];
    const others = FEATURES.filter(x => x !== f && !x.soon);
    page({
      lang,
      slugs: slugsOf(f),
      title: t.title,
      desc: t.desc,
      crumbs: [[u.features], [t.menu]],
      body: c =>
        pageTop(c, t.h1, t.lead, PAGE_PHOTO[f.nl.slug]) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${t.kladje ? `<div class="site-figure">${kladje(lang)}</div>` : ''}${sectionsHtml(t.sections)}${
          f.soon ? `<p class="site-note">${SOON_MAIL[lang]} <a href="mailto:contact@savour.page">contact@savour.page</a>.</p>` : ''
        }</div></article>
<section class="site-related"><div class="site-wrap site-narrow"><h2>${u.related}</h2>${rows(others.slice(0, 3), lang)}</div></section>`
    });
  }
  // Voor wie
  for (const a of AUDIENCES) {
    const t = a[lang];
    page({
      lang,
      slugs: slugsOf(a),
      title: t.title,
      desc: t.desc,
      crumbs: [[u.audience], [t.menu]],
      body: c =>
        pageTop(c, t.h1, t.lead, PAGE_PHOTO[a.nl.slug]) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${sectionsHtml(t.sections.slice(0, 2))}${photoDuo(...(a.nl.slug === 'voor-koks' ? ['eend', 'uien'] : ['wortels', 'eend']))}${sectionsHtml(t.sections.slice(2))}</div></article>
<section class="site-related"><div class="site-wrap site-narrow"><h2>${u.features}</h2>${rows(FEATURES.filter(x => !x.soon), lang)}</div></section>`
    });
  }
  // Over ons
  {
    const s = STORY[lang];
    page({
      lang,
      slugs: slugsOf(STORY),
      title: s.title,
      desc: s.desc,
      crumbs: [[u.about]],
      body: c =>
        pageTop(c, s.h1, s.lead, PAGE_PHOTO[STORY.nl.slug]) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${aboutChapters(s, lang)}</div></article>
<section class="site-section tint"><div class="site-wrap"><h2 class="reveal">${esc(s.valuesTitle)}</h2><div class="site-values">${s.values.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div></div></section>`
    });
  }
  // Blog: overzicht en artikelen
  page({
    lang,
    slugs: blogSlug,
    title: BLOG_TITLE[lang],
    desc: u.blogLead,
    crumbs: [[u.blog]],
    body: c =>
      pageTop(c, u.blog, u.blogLead, PAGE_PHOTO.blog) +
      `<article class="site-article"><div class="site-wrap site-narrow"><ul class="site-posts">${POSTS.map(
        p => `<li><h2><a href="${href(p[lang].slug)}">${esc(p[lang].title)}</a></h2><p>${esc(p[lang].desc)}</p><a class="site-link" href="${href(p[lang].slug)}">${u.readArticle}</a></li>`
      ).join('')}</ul></div></article>`
  });
  for (const [n, p] of POSTS.entries()) {
    const t = p[lang];
    const date = new Date(p.date).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric' });
    page({
      lang,
      slugs: slugsOf(p),
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
        pageTop(c, t.h1, t.lead, BLOG_PHOTOS[n % BLOG_PHOTOS.length]) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose"><p class="site-meta">${date}</p>${sectionsHtml(t.sections)}<p><em>${esc(t.outro)}</em></p></div></article>`
    });
  }
  // App downloaden (tools/site-app.mjs)
  {
    const t = APP_PAGE[lang];
    page({
      lang,
      slugs: slugsOf(APP_PAGE),
      title: t.title,
      desc: t.desc,
      crumbs: [[t.menu]],
      body: c =>
        pageTop(c, t.h1, t.lead, PAGE_PHOTO[slugsOf(APP_PAGE).nl]) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${sectionsHtml(t.sections)}<p><a class="site-btn solid" href="${homePath(lang)}">${esc(t.open)}</a></p></div></article>`
    });
  }
  // Bestaande informatiepagina's (inhoud uit de app)
  for (const p of LEGACY) {
    // Titel, beschrijving en kop: NL en EN hier in LEGACY, DE en ES in tools/site-pages-*.mjs.
    const meta =
      lang === 'nl' || lang === 'en'
        ? { title: p.title[lang === 'nl' ? 0 : 1], desc: p.desc[lang === 'nl' ? 0 : 1], h1: p.h1?.[lang === 'nl' ? 0 : 1] }
        : PAGES[lang].legacy[p.id];
    let body = p.id === 'pro' ? proBody : copy[p.id] || '';
    if (p.id === 'contact') body = body.replace(CONTACT_FORM, '%%FORM%%');
    let h1 = meta.h1 || copy[p.id + 'Title'];
    let lead = copy[p.id + 'Lead'] || '';
    let note = copy[p.id + 'Note'] || '';
    if (lang !== 'nl') {
      const tr = translators[lang];
      body = tr.html(body);
      if (!meta.h1) h1 = tr.text(h1);
      lead = lead && tr.text(lead);
      note = note && tr.text(note);
    }
    body = body.replace('%%FORM%%', contactForm(lang));
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
      slugs: slugsOf(p),
      title: meta.title,
      desc: meta.desc,
      schema,
      body: c => pageTop(c, h1, lead, PAGE_PHOTO[p.nl]) + `<article class="site-article"><div class="site-wrap site-narrow site-prose">${note ? `<p class="site-meta">${esc(note)}</p>` : ''}${body}</div></article>`
    });
  }
}

// ---- Startpagina per taal ----
// index.html (savour.page/) krijgt alleen de Nederlandse startpagina. Voor /en, /de en /es maken we een kopie van
// index.html met de startpagina, titel, beschrijving en vragen in die taal: site/index-en.html enz.
// vercel.json en local-server.mjs sturen /en, /de en /es daarheen. De app zelf is in alle kopieën gelijk.
const HOME_META = {
  en: {
    title: 'Savour — recipe app for chefs: organise and share recipes',
    desc: 'Organise all your recipes in one app: import from Word, PDF and handwritten notes, share with your kitchen team and print whole folders. Free to try.',
    ogTitle: 'Savour — recipe management for professional kitchens',
    ogDesc: 'From scribbled note to a recipe that works. Your whole recipe book in one place, on computer and phone, shared with your kitchen team.',
    locale: 'en_GB'
  },
  de: {
    title: 'Savour — Rezept-App für Köche: Rezepte organisieren und teilen',
    desc: 'Organisiere alle Rezepte in einer App: aus Word, PDF und handschriftlichen Notizen importieren, mit dem Küchenteam teilen und ganze Ordner drucken. Kostenlos testen.',
    ogTitle: 'Savour — Rezeptverwaltung für Profiküchen',
    ogDesc: 'Von der Notiz zum Rezept, das stimmt. Dein ganzes Rezeptbuch an einem Ort, auf Computer und Handy, geteilt mit deinem Küchenteam.',
    locale: 'de_DE'
  },
  es: {
    title: 'Savour — app de recetas para chefs: organiza y comparte recetas',
    desc: 'Organiza todas tus recetas en una app: importa de Word, PDF y notas a mano, compártelas con tu equipo de cocina e imprime carpetas enteras. Pruébalo gratis.',
    ogTitle: 'Savour — gestión de recetas para cocinas profesionales',
    ogDesc: 'De la nota a una receta que funciona. Todo tu recetario en un solo sitio, en ordenador y móvil, compartido con tu equipo de cocina.',
    locale: 'es_ES'
  }
};
{
  const file = new URL('index.html', ROOT);
  let h = fs.readFileSync(file, 'utf8');
  const blockFor = lang =>
    `<!-- SITE:START (gemaakt door tools/build-seo.mjs, niet met de hand aanpassen) -->\n<div class="site" data-site-lang="${lang}" translate="no">${header(lang, null, true)}<main>${homeBody(lang, true)}</main>${footer(lang, null, true)}</div>\n<!-- SITE:END -->`;
  // De publieke schermen in de app (infopagina, gedeeld recept, map-uitnodiging) krijgen dezelfde kop en footer.
  // translate="no": die zijn al in de goede taal; de inhoud eronder vertaalt de app zelf.
  const withShells = (html, lang) =>
    html
      .replace(
        /<!-- SHELL-HEADER:START[^>]*-->[\s\S]*?<!-- SHELL-HEADER:END -->/g,
        () =>
          `<!-- SHELL-HEADER:START (tools/build-seo.mjs) -->${header(lang, null, true).replace('<header class="site-header"', '<header class="site-header" translate="no"')}<!-- SHELL-HEADER:END -->`
      )
      .replace(
        /<!-- SHELL-FOOTER:START[^>]*-->[\s\S]*?<!-- SHELL-FOOTER:END -->/g,
        () =>
          `<!-- SHELL-FOOTER:START (tools/build-seo.mjs) -->${footer(lang, null, true).replace('<footer class="site-foot"', '<footer class="site-foot" translate="no"')}<!-- SHELL-FOOTER:END -->`
      );
  // Vragen van de startpagina ook als FAQPage voor zoekmachines, in de taal van de pagina.
  const withFaq = (html, lang) =>
    html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (m, json) => {
      const list = JSON.parse(json);
      const faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: HOME[lang].faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
      };
      const i = list.findIndex(x => x['@type'] === 'FAQPage');
      if (i >= 0) list[i] = faq;
      else list.push(faq);
      return `<script type="application/ld+json">${JSON.stringify(list)}</script>`;
    });
  if (h.includes('<!-- SITE:START')) h = h.replace(/<!-- SITE:START[\s\S]*?<!-- SITE:END -->/, () => blockFor('nl'));
  else {
    const open = '<div class="landing" id="landingView">';
    const a = h.indexOf(open) + open.length;
    const b = h.indexOf('</div>\n<div id="publicInfoShell"');
    if (a < open.length || b < 0) throw new Error('Startpagina niet gevonden in index.html');
    h = h.slice(0, a) + '\n' + blockFor('nl') + '\n' + h.slice(b);
  }
  h = withShells(h, 'nl');
  h = withFaq(h, 'nl');
  fs.writeFileSync(file, h, 'utf8');
  for (const lang of ['en', 'de', 'es']) {
    const m = HOME_META[lang];
    const home = `${SITE}/${lang}`;
    const swap = (re, to) => {
      if (!re.test(x)) throw new Error(`index-${lang}: ${re} niet gevonden`);
      x = x.replace(re, () => to);
    };
    let x = withShells(
      h.replace(/<!-- SITE:START[\s\S]*?<!-- SITE:END -->/, () => blockFor(lang)),
      lang
    );
    swap(/<html lang="nl">/, `<html lang="${lang}">`);
    swap(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`);
    swap(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(m.desc)}">`);
    swap(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${home}">`);
    swap(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(m.ogTitle)}">`);
    swap(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(m.ogDesc)}">`);
    swap(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${home}">`);
    swap(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${m.locale}">`);
    x = withFaq(x, lang);
    x = x.replace('<!doctype html>', `<!doctype html>\n<!-- Gemaakt door tools/build-seo.mjs uit index.html: startpagina in het ${lang.toUpperCase()}. Niet met de hand aanpassen. -->`);
    fs.writeFileSync(new URL(`site/index-${lang}.html`, ROOT), x, 'utf8');
  }
}

// ---- Versienummer op CSS en JS ----
// Elke wijziging in css/ of js/ geeft een ander nummer (?v=...) in index.html en alle pagina's. Zo haalt de
// browser (en de offline-cache in sw.js) altijd de opmaak en scripts die bij de pagina horen.
{
  const { createHash } = await import('node:crypto');
  const hash = createHash('sha1');
  const walk = dir => {
    for (const f of fs.readdirSync(new URL(dir, ROOT)).sort()) {
      const rel = `${dir}${f}`;
      const st = fs.statSync(new URL(rel, ROOT));
      if (st.isDirectory()) walk(rel + '/');
      else if (/\.(css|js)$/.test(f)) hash.update(rel).update(fs.readFileSync(new URL(rel, ROOT)));
    }
  };
  walk('css/');
  walk('js/');
  const v = hash.digest('hex').slice(0, 10);
  const stamp = html => html.replace(/((?:href|src)="\/(?:css|js)\/[^"?]+)(\?v=[^"]*)?"/g, `$1?v=${v}"`);
  const files = ['index.html'];
  const walkSite = dir => {
    for (const f of fs.readdirSync(new URL(dir, ROOT))) {
      const rel = `${dir}${f}`;
      if (fs.statSync(new URL(rel, ROOT)).isDirectory()) walkSite(rel + '/');
      else if (f.endsWith('.html')) files.push(rel);
    }
  };
  walkSite('site/');
  for (const f of files) {
    const p = new URL(f, ROOT);
    fs.writeFileSync(p, stamp(fs.readFileSync(p, 'utf8')), 'utf8');
  }
  console.log(`versie ${v} op CSS en JS in ${files.length} bestanden`);
}

// ---- llms.txt: bloglijst voor AI-assistenten bijhouden (rest van het bestand blijft zoals het is) ----
{
  const file = new URL('llms.txt', ROOT);
  let t = fs.readFileSync(file, 'utf8');
  const blog =
    '## Blog\n\n' +
    POSTS.map(
      p =>
        `- [${p.en.title}](${url(p.en.slug)}) · [NL](${url(p.nl.slug)}) · [DE](${url(p.de.slug)}) · [ES](${url(p.es.slug)})`
    ).join('\n') +
    '\n\n';
  if (/## Blog\n[\s\S]*?(?=## )/.test(t)) t = t.replace(/## Blog\n[\s\S]*?(?=## )/, () => blog);
  else t = t.replace('## Company', () => blog + '## Company');
  fs.writeFileSync(file, t, 'utf8');
}

// ---- Sitemap ----
const today = new Date().toISOString().slice(0, 10);
const homeAlts = [['nl', SITE + '/'], ['en', SITE + '/en'], ['de', SITE + '/de'], ['es', SITE + '/es'], ['x-default', SITE + '/']];
const entry = (loc, alts, priority) =>
  `  <url><loc>${loc}</loc>${alts.map(([l, h]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${h}"/>`).join('')}<lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
const low = /\/((en|de|es)\/)?(voorwaarden|terms|privacy|contact|agb|datenschutz|kontakt|terminos|privacidad|contacto)$/;
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
for (const [lang, set] of Object.entries(missing))
  if (set.size) {
    console.log(`\n${set.size} stukjes zonder vertaling in het ${lang.toUpperCase()} (blijven Nederlands):`);
    for (const m of set) console.log(' -', m.slice(0, 110));
  }
