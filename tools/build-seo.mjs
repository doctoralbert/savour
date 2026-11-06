// Bouwt de publieke website: de startpagina (in index.html), de losse pagina's (functies, voor wie, over ons,
// prijzen, blog, FAQ, gids, contact, voorwaarden, privacy) in het Nederlands, Engels, Duits en Spaans, en sitemap.xml.
// Zoekmachines en AI-assistenten lezen deze gewone HTML zonder JavaScript.
// Teksten: tools/site-content.mjs en tools/site-blog.mjs (NL en EN), tools/site-pages-de.mjs, -es.mjs en -fr.mjs (DE, ES en FR),
// js/features/public-pages.js + de Pro-pagina (uit de app, vertaald via tools/vertalingen.mjs).
// Draai na het aanpassen van teksten:  node tools/build-i18n.mjs && node tools/build-seo.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import { strings, patterns } from './vertalingen.mjs';
import { UI, KLADJE, FEATURES, AUDIENCES, STORY, HOME, POSTS } from './site-content.mjs';
import { EXTRA_LANGS } from './site-content-extra.mjs';
import { KLADJE_REAL } from './site-kladje.mjs';
import { BLOG } from './site-blog.mjs';
import { TEMP_POSTS_DE } from './site-blog-temperaturen-de.mjs';
import {
  ALLERGEN_POST,
  ALLERGEN_POST_DE,
  ALLERGEN_POST_ES,
  ALLERGEN_POST_FR,
  LIST_PAGE,
  LIST_SLUGS
} from './site-blog-allergenen.mjs';
import { NUMBERS_POST, NUMBERS_POST_DE, NUMBERS_POST_ES, NUMBERS_POST_FR } from './site-blog-cijfers.mjs';
import { TEMP_POSTS_ES } from './site-blog-temperaturen-es.mjs';
import { TEMP_POSTS_FR } from './site-blog-temperaturen-fr.mjs';
import { DE } from './site-pages-de.mjs';
import { ES } from './site-pages-es.mjs';
import { FR } from './site-pages-fr.mjs';
import { EXTRA_FR, APP_PAGE_FR, DELIVER_FR, DELIVER_FLOW_FR, SERVICE_FR, KLADJE_FR } from './site-fr-extra.mjs';
import { stringsFr, patternsFr } from './vertalingen-fr.mjs';
import { VERDIEPING } from './site-verdieping.mjs';
import { VERDIEPING_TALEN } from './site-verdieping-talen.mjs';
import { BLOG_RICH } from './site-blog-rich.mjs';
import { FEATURE_RICH } from './site-feature-rich.mjs';
import { PAGE_RICH } from './site-page-rich.mjs';
import { APP_PAGE } from './site-app.mjs';
import { SERVICE, SERVICE_TIERS, FREE_KITCHENS } from './site-service.mjs';
import { DELIVER, DELIVER_FLOW } from './site-deliver.mjs';
import {
  GUIDE_UI,
  GUIDE_HOME,
  GUIDE,
  GUIDE_CHAPTERS,
  GUIDE_SUFFIX,
  RELEASES_PAGE,
  RELEASES
} from './site-handleiding.mjs';
const PAGES = { de: DE, es: ES, fr: FR };
// Blogs over kerntemperaturen en sous-vide in het Duits, Spaans en Frans (tools/site-blog-temperaturen-*.mjs).
Object.assign(DE.posts, TEMP_POSTS_DE);
Object.assign(ES.posts, TEMP_POSTS_ES);
Object.assign(FR.posts, TEMP_POSTS_FR);
Object.assign(DE.posts, ALLERGEN_POST_DE);
Object.assign(ES.posts, ALLERGEN_POST_ES);
Object.assign(FR.posts, ALLERGEN_POST_FR);
Object.assign(DE.posts, NUMBERS_POST_DE);
Object.assign(ES.posts, NUMBERS_POST_ES);
Object.assign(FR.posts, NUMBERS_POST_FR);
EXTRA_LANGS.fr = EXTRA_FR;
APP_PAGE.fr = APP_PAGE_FR;
DELIVER.fr = DELIVER_FR;
DELIVER_FLOW.fr = DELIVER_FLOW_FR;
SERVICE.fr = SERVICE_FR;
KLADJE_REAL.fr = KLADJE_FR;

// Nieuwste blogartikelen eerst.
POSTS.unshift(NUMBERS_POST, ALLERGEN_POST, ...BLOG);

const ROOT = new URL('../', import.meta.url);
// Achtergrondfoto achter de bovenkant van de homepage. Alleen als het bestand bestaat; zonder bestand is de
// homepage zoals eerst (terugdraaien = assets/keuken/hero-keuken.jpg weghalen en opnieuw bouwen).
const HERO_FILE = new URL('assets/keuken/hero-keuken.jpg', ROOT);
const HERO_PHOTO = fs.existsSync(HERO_FILE) ? `/assets/keuken/hero-keuken.jpg?v=${fs.statSync(HERO_FILE).size}` : '';
const SITE = 'https://savour.page';
const LANGS = ['nl', 'en', 'de', 'es', 'fr'];
const read = p => fs.readFileSync(new URL(p, ROOT), 'utf8');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const url = slug => `${SITE}/${slug}`.replace(/\/$/, '') || SITE;
const href = slug => '/' + slug;
// Alle sitepagina's met hun adres per taal (gevuld door page()). Zo wijst een link in een vertaalde tekst, die het
// Nederlandse adres gebruikt, vanzelf naar dezelfde pagina in de taal van die tekst.
const PATH_INDEX = new Map();
const localPath = (path, lang) => {
  const [p, hash] = path.split('#');
  if (p === '/' || p === '') return homePath(lang) + (hash ? `#${hash}` : '');
  const hit = PATH_INDEX.get(p.replace(/\/$/, ''));
  return (hit?.[lang] ? href(hit[lang]) : p) + (hash ? `#${hash}` : '');
};
// Dezelfde organisatie als in de kop van index.html (@id), zodat zoekmachines alle pagina's aan deze Savour koppelen.
const ORG = {
  '@type': 'Organization',
  '@id': SITE + '/#organization',
  name: 'Savour',
  url: SITE + '/',
  logo: { '@type': 'ImageObject', url: `${SITE}/assets/savour-icon.png` },
  email: 'contact@savour.page'
};

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
// Kolommen in tools/vertalingen.mjs: 0 = NL, 1 = EN, 2 = DE, 3 = ES; Frans (4) komt uit tools/vertalingen-fr.mjs.
const COLUMN = { en: 1, de: 2, es: 3, fr: 4 };
const missing = { en: new Set(), de: new Set(), es: new Set(), fr: new Set() };
const allStrings = strings.map(r => [r[0], r[1], r[2], r[3], stringsFr[r[0].replace(/\s+/g, ' ').trim()]]);
const allPatterns = patterns.map(r => [r[0], r[1], r[2], r[3], patternsFr[r[0]]]);
const translators = Object.fromEntries(
  Object.entries(COLUMN).map(([lang, col]) => {
    const dict = new Map(allStrings.filter(r => r[col]).map(r => [r[0].replace(/\s+/g, ' ').trim(), r[col]]));
    const pats = allPatterns.filter(r => r[col]).map(r => [new RegExp(r[0]), r[col]]);
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

// Import service (tools/site-service.mjs) als kernpunt tussen de functies, vóór "Binnenkort".
{
  const svc = { id: 'inladen', service: true, nl: SERVICE.nl.feature, en: SERVICE.en.feature };
  FEATURES.splice(
    FEATURES.findIndex(f => f.soon),
    0,
    svc
  );
  for (const [l, P] of [
    ['de', DE],
    ['es', ES],
    ['fr', FR]
  ]) {
    const { menu, short, ...rest } = SERVICE[l].feature;
    EXTRA_LANGS[l].items.inladen = [menu, short];
    P.features.inladen = rest;
  }
}

// Duits en Spaans: menu en startpagina uit tools/site-content-extra.mjs, alle andere pagina's uit
// tools/site-pages-de.mjs, -es.mjs en -fr.mjs. Ontbreekt er een vertaling, dan stopt het bouwen.
const HOME_LANGS = ['nl', 'en', 'de', 'es', 'fr'];
for (const lang of ['de', 'es', 'fr']) {
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
for (const lang of HOME_LANGS) HOME[lang].faq.push(...SERVICE[lang].faqs.slice(0, 2));
// Extra alinea's voor de kortste pagina's (tools/site-verdieping.mjs).
for (const [id, extra] of Object.entries(VERDIEPING)) {
  const item =
    id === 'app'
      ? APP_PAGE
      : FEATURES.find(f => f.id === id) || AUDIENCES.find(a => a.id === id) || POSTS.find(p => p.en.slug === id);
  if (!item) throw new Error(`Verdieping: pagina ${id} niet gevonden`);
  for (const [lang, sections] of Object.entries({ ...extra, ...VERDIEPING_TALEN[id] }))
    item[lang].sections.push(...sections);
}
// Uitgebreide opmaak per blogartikel (tools/site-blog-rich.mjs): In het kort, blokken bij secties en extra secties.
// In de teksten staan links als code, zodat ze in elke taal naar het goede adres gaan: @post:<Engels adres>,
// @feature:<id>, @service, @list en @demo; {lang} in een pad wordt de taal ("/assets/app/mappen-{lang}.jpg").
const richNeed = (v, what) => {
  if (!v) throw new Error(`Blog-opmaak: ${what} niet gevonden`);
  return v;
};
const richLink = (s, lang) =>
  s
    .replace(/\{lang\}/g, lang)
    .replace(/@post:([\w/-]+)/g, (_, slug) =>
      href(
        richNeed(
          POSTS.find(q => q.en.slug === slug),
          slug
        )[lang].slug
      )
    )
    .replace(/@feature:(\w+)/g, (_, id) =>
      href(
        richNeed(
          FEATURES.find(f => f.id === id),
          id
        )[lang].slug
      )
    )
    .replace(/@service\b/g, () => href(SERVICE[lang].feature.slug))
    .replace(/@list\b/g, () => href(LIST_SLUGS[lang]))
    .replace(/@demo\b/g, () => `${lang === 'nl' ? '/' : '/' + lang}?demo=1`);
const richMap = (x, lang) =>
  typeof x === 'string'
    ? richLink(x, lang)
    : Array.isArray(x)
      ? x.map(y => richMap(y, lang))
      : x && typeof x === 'object'
        ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, richMap(v, lang)]))
        : x;
for (const [slug, langs] of Object.entries(BLOG_RICH)) {
  const p = richNeed(
    POSTS.find(q => q.en.slug === slug),
    `blog ${slug}`
  );
  p.rich = true;
  for (const [lang, raw] of Object.entries(langs)) {
    const r = richMap(raw, lang);
    const t = p[lang];
    if (r.brief) t.brief = r.brief;
    for (const [i, blocks] of Object.entries(r.extra || {}))
      richNeed(t.sections[i], `${slug} sectie ${i}`).push(...blocks);
    if (r.add) t.sections.push(...r.add);
  }
}

// Beschrijving van de keukenfoto's, voor zoekmachines en schermlezers.
const PHOTO_ALT = {
  wortels: {
    nl: 'Verse wortels op een werkbank in de keuken',
    en: 'Fresh carrots on a kitchen workbench',
    de: 'Frische Karotten auf einer Küchenarbeitsplatte',
    es: 'Zanahorias frescas en una mesa de cocina',
    fr: 'Carottes fraîches sur un plan de travail de cuisine'
  },
  uien: {
    nl: 'Uien in de professionele keuken',
    en: 'Onions in a professional kitchen',
    de: 'Zwiebeln in der Profiküche',
    es: 'Cebollas en una cocina profesional',
    fr: 'Oignons dans une cuisine professionnelle'
  },
  eend: {
    nl: 'Eend wordt bereid boven het vuur',
    en: 'Duck being cooked over the fire',
    de: 'Ente wird über dem Feuer zubereitet',
    es: 'Pato cocinándose sobre el fuego',
    fr: 'Canard cuit au-dessus du feu'
  }
};

// Alle taalversies van een pagina (voor hreflang en de taalknop).
const slugsOf = item => Object.fromEntries(LANGS.map(l => [l, typeof item[l] === 'string' ? item[l] : item[l].slug]));
const LOCALE = { nl: 'nl-NL', en: 'en-GB', de: 'de-DE', es: 'es-ES', fr: 'fr-FR' };
// Blogarchief over meerdere bladzijden: zoveel artikelen per bladzijde, met deze woorden in het adres en de knoppen.
const BLOG_PER_PAGE = 8;
const RELEASES_PER_PAGE = 4;
const BLOG_PAGE_WORD = { nl: 'pagina', en: 'page', de: 'seite', es: 'pagina', fr: 'page' };
const BLOG_PAGER = {
  nl: { label: 'Bladzijden van het blog', page: 'Pagina', newer: 'Nieuwer', older: 'Ouder' },
  en: { label: 'Blog pages', page: 'Page', newer: 'Newer', older: 'Older' },
  de: { label: 'Seiten des Blogs', page: 'Seite', newer: 'Neuer', older: 'Älter' },
  es: { label: 'Páginas del blog', page: 'Página', newer: 'Más recientes', older: 'Anteriores' },
  fr: { label: 'Pages du blog', page: 'Page', newer: 'Plus récents', older: 'Plus anciens' }
};
// Datum (en bij uitgebreide artikelen de leestijd) onder een blogartikel.
const READ_TIME = { nl: 'min lezen', en: 'min read', de: 'Min. Lesezeit', es: 'min de lectura', fr: 'min de lecture' };
const postDate = (p, lang) =>
  p.date
    ? `<time datetime="${p.date}">${new Date(p.date).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric' })}</time>`
    : '';
const BRIEF = { nl: 'In het kort', en: 'In short', de: 'Kurz gesagt', es: 'En resumen', fr: 'En bref' };
const MORE = { nl: 'Lees ook', en: 'Read next', de: 'Weiterlesen', es: 'Sigue leyendo', fr: 'À lire aussi' };
// Leestijd: alle tekst van het artikel, 200 woorden per minuut.
const readMinutes = t => {
  const words = [
    t.lead,
    ...(t.brief || []),
    ...t.sections.flat(2).map(x => (typeof x === 'object' ? Object.values(x).flat().join(' ') : x))
  ]
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
// Drie andere artikelen onder een uitgebreid artikel: de volgende in het archief.
const moreReading = (n, lang) =>
  `<nav class="post-more" aria-label="${esc(MORE[lang])}"><h2>${esc(MORE[lang])}</h2><ul>${[1, 2, 3]
    .map(k => POSTS[(n + k) % POSTS.length])
    .map(q => `<li><a href="${href(q[lang].slug)}">${esc(q[lang].title)}${postDate(q, lang)}</a></li>`)
    .join('')}</ul></nav>`;
const BLOG_TITLE = {
  nl: 'Blog over receptbeheer en de keuken — Savour',
  en: 'Blog about recipe management and the kitchen — Savour',
  de: DE.blogTitle,
  es: ES.blogTitle,
  fr: FR.blogTitle
};
const SOON_MAIL = {
  nl: 'Wil je meedenken? Mail ons op',
  en: 'Want to share ideas? Email us at',
  de: DE.ui.soonMail,
  es: ES.ui.soonMail,
  fr: FR.ui.soonMail
};
// Contactformulier op de losse contactpagina (versturen via js/site.js naar /api/bug-report).
const FORM_TEXT = {
  nl: [
    'Stuur ons een bericht',
    'Naam',
    'E-mailadres',
    'Onderwerp',
    'Bericht',
    'Waar kunnen we je mee helpen?',
    'Bericht versturen',
    'Bezig…',
    'Bedankt. Je bericht is verstuurd; we reageren zo snel mogelijk.',
    'Versturen is mislukt. Mail ons gerust op contact@savour.page.'
  ],
  en: [
    'Send us a message',
    'Name',
    'Email address',
    'Subject',
    'Message',
    'How can we help?',
    'Send message',
    'Sending…',
    'Thank you. Your message has been sent; we will reply as soon as possible.',
    'Sending failed. Feel free to email us at contact@savour.page.'
  ],
  de: [
    'Schreib uns eine Nachricht',
    'Name',
    'E-Mail-Adresse',
    'Betreff',
    'Nachricht',
    'Wie können wir helfen?',
    'Nachricht senden',
    'Wird gesendet…',
    'Danke. Deine Nachricht wurde gesendet; wir antworten so schnell wie möglich.',
    'Senden fehlgeschlagen. Schreib uns gern an contact@savour.page.'
  ],
  es: [
    'Envíanos un mensaje',
    'Nombre',
    'Correo electrónico',
    'Asunto',
    'Mensaje',
    '¿En qué podemos ayudarte?',
    'Enviar mensaje',
    'Enviando…',
    'Gracias. Tu mensaje se ha enviado; te responderemos lo antes posible.',
    'No se pudo enviar. Escríbenos a contact@savour.page.'
  ],
  fr: [
    'Envoie-nous un message',
    'Nom',
    'Adresse e-mail',
    'Objet',
    'Message',
    "Comment pouvons-nous t'aider ?",
    'Envoyer le message',
    'Envoi en cours…',
    'Merci. Ton message a bien été envoyé ; nous te répondrons dès que possible.',
    "L'envoi a échoué. Écris-nous directement à contact@savour.page."
  ]
};
function contactForm(lang) {
  const [title, name, email, subject, message, placeholder, send, busy, ok, fail] = FORM_TEXT[lang];
  const f = (id, label, input) => `<div class="site-field"><label for="${id}">${label}</label>${input}</div>`;
  return `<h2>${title}</h2><form class="site-form" data-contact-form data-busy="${esc(busy)}" data-ok="${esc(ok)}" data-fail="${esc(fail)}" novalidate>${f('cfName', name, '<input id="cfName" name="name" autocomplete="name" required maxlength="120">')}${f('cfEmail', email, '<input id="cfEmail" name="email" type="email" autocomplete="email" required maxlength="240">')}${f('cfSubject', subject, '<input id="cfSubject" name="subject" required maxlength="180">')}${f('cfMessage', message, `<textarea id="cfMessage" name="message" rows="6" required maxlength="12000" placeholder="${esc(placeholder)}"></textarea>`)}<div class="site-form-trap" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="site-form-row"><button class="site-btn solid" type="submit">${send}</button><span class="site-form-status" aria-live="polite"></span></div></form>`;
}
const homePath = lang => (lang === 'nl' ? '/' : '/' + lang);
const LANG_LABEL = { nl: 'NL', en: 'EN', de: 'DE', es: 'ES', fr: 'FR' };
const LANG_NAME = { nl: 'Nederlands', en: 'English', de: 'Deutsch', es: 'Español', fr: 'Français' };
// Taalkeuze. In de app wisselt hij zonder herladen; op losse pagina's gaat NL/EN naar dezelfde pagina in de
// andere taal en DE/ES naar de startpagina in die taal.
function langSwitch(lang, alts, inApp) {
  // Eén knop met de huidige taal; klikken opent een klein venster met de talen (zoals in de app).
  return `<details class="site-lang" translate="no"><summary aria-label="Taal / Language">${LANG_LABEL[lang]}</summary><div class="site-lang-menu">${HOME_LANGS.map(
    l => {
      const target = inApp ? homePath(l) : alts?.[l] || homePath(l);
      return `<a href="${target}" hreflang="${l}" data-set-lang="${l}"${l === lang ? ' aria-current="true"' : ''}><span>${LANG_LABEL[l]}</span>${LANG_NAME[l]}</a>`;
    }
  ).join('')}</div></details>`;
}

// Menu op telefoon en tablet (tot 1040 px breed): achter de menuknop, over het hele scherm onder de kop.
// Functies en Voor wie klappen open met korte uitleg; daaronder de vaste pagina's, inloggen, de demo en de taal.
const MENU_LABEL = {
  nl: ['Menu openen', 'Menu sluiten'],
  en: ['Open menu', 'Close menu'],
  de: ['Menü öffnen', 'Menü schließen'],
  es: ['Abrir menú', 'Cerrar menú'],
  fr: ['Ouvrir le menu', 'Fermer le menu']
};
function mobileMenu(lang, alt, inApp) {
  const u = UI[lang];
  const q = homePath(lang);
  const group = (title, items, open) =>
    `<details class="site-mm-group"${open ? ' open' : ''}><summary>${esc(title)}</summary><ul>${items
      .map(
        x =>
          `<li><a href="${href(x[lang].slug)}"><b>${esc(x[lang].menu)}${x.soon ? `<small>${u.soon}</small>` : ''}</b><span>${esc(x[lang].short)}</span></a></li>`
      )
      .join('')}</ul></details>`;
  const link = (h, label) => `<li><a href="${h}">${esc(label)}</a></li>`;
  const langs = HOME_LANGS.map(l => {
    const target = inApp ? homePath(l) : alt?.[l] || homePath(l);
    return `<a href="${target}" hreflang="${l}" data-set-lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${LANG_LABEL[l]}</a>`;
  }).join('');
  return `<div class="site-mm" hidden><div class="site-wrap">${group(u.features, FEATURES, false)}${group(u.audience, AUDIENCES, false)}<ul class="site-mm-links">${link(href(legacy('pro')[lang]), u.pricing)}${link(href(STORY[lang].slug), u.about)}${link(href(blogSlug[lang]), u.blog)}${link(guideHref(lang, GUIDE_HOME), GUIDE_UI[lang].footer)}</ul><div class="site-mm-actions"><a class="site-btn solid" href="${q}?auth=signup" data-auth="signup">${u.start}</a><a class="site-btn" href="${q}?auth=login" data-auth="login">${u.login}</a><a class="site-mm-demo" href="${q}?demo=1" data-demo>${u.demo}</a></div><div class="site-mm-lang" translate="no">${langs}</div></div></div>`;
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
<div class="site-actions">${langSwitch(lang, alt, inApp)}<a class="site-btn site-login" ${auth('login')}>${u.login}</a><a class="site-btn solid" ${auth('signup')}>${u.start}</a><button type="button" class="site-menu-btn" aria-expanded="false" aria-label="${MENU_LABEL[lang][0]}" data-close-label="${MENU_LABEL[lang][1]}"><span></span></button></div>
</div>${mobileMenu(lang, alt, inApp)}</header>`;
}

// Handleiding (kolom Hulp) en release notes (kolom Savour) staan alleen in de footer. Talen zonder eigen versie linken naar het Engels.
function guideHref(lang, pages) {
  return href(pages[GUIDE_HOME[lang] ? lang : 'en'].slug);
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
<div><h4>${u.footerCols.company}</h4><ul>${li(href(STORY[lang].slug), u.about)}${li(href(legacy('pro')[lang]), u.pricing)}${li(href(blogSlug[lang]), u.blog)}${li(href(legacy('contact')[lang]), u.contact)}${li(guideHref(lang, RELEASES_PAGE), GUIDE_UI[lang].releases)}</ul></div>
<div><h4>${u.footerCols.help}</h4><ul>${li(href(legacy('faq')[lang]), u.faq)}${GUIDE_HOME[lang] ? '' : li(href(legacy('guide')[lang]), u.guide)}${li(guideHref(lang, GUIDE_HOME), GUIDE_UI[lang].footer)}${li(href(APP_PAGE[lang].slug), APP_PAGE[lang].menu)}${li(`${q}?info=bug`, u.bug)}<li><a href="${q}?auth=login" data-auth="login">${u.login}</a></li></ul></div>
</div>
<div class="site-foot-bottom"><span>© 2026 ${esc(u.company)}</span><nav>${`<a href="${href(legacy('terms')[lang])}">${u.terms}</a><a href="${href(legacy('privacy')[lang])}">${u.privacy}</a>`}</nav>${langSwitch(lang, alt, inApp)}</div>
</div></footer>`;
}

// Het echte kladje (marshmallow, hele foto) naast hetzelfde recept in Savour.
function kladje(lang) {
  const k = KLADJE_REAL[lang];
  return `<figure class="kladje-duo">
<div class="kladje-duo-photo"><span class="kladje-duo-tag">${esc(k.before)}</span><img src="/assets/kladjes/marshmallow-kladje.jpg" alt="${esc(k.alt)}" width="1100" height="972" loading="lazy"></div>
<div class="kladje-duo-card"><span class="kladje-duo-tag gold">${esc(k.after)}</span><h3>${esc(k.title)}</h3><small>${esc(k.meta)}</small><h4>${esc(k.ingredientsTitle)}</h4><ul>${k.ingredients.map(i => `<li>${esc(i)}</li>`).join('')}</ul><h4>${esc(k.stepsTitle)}</h4><ol>${k.steps.map(([t, d]) => `<li><b>${esc(t)}</b> ${esc(d)}</li>`).join('')}</ol><p class="kladje-duo-note">${esc(k.stepsNote)}</p></div>
<figcaption>${esc(k.caption)}</figcaption></figure>`;
}

// Functies onder een voor-wie-pagina: wat voor die lezer het meest telt, per pagina anders.
const AUDIENCE_FEATURES = {
  chefs: ['digitise', 'scale', 'cloud', 'inladen'],
  brigade: ['share', 'organise', 'print']
};
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

// ---- Import service ----
// Bedragen staan als "€164,99" in site-service.mjs; in het Engels met een punt, in het Duits en Spaans met het euroteken erachter.
const euro = (p, lang) =>
  lang === 'de' || lang === 'es' || lang === 'fr' ? p.slice(1) + ' €' : lang === 'en' ? p.replace(',', '.') : p;
const serviceHref = lang => href(FEATURES.find(f => f.service)[lang].slug);
// Pakketten voor de knoppen en de keuzelijst in het formulier: [label, prijs]; de laatste is "meer, in overleg".
const servicePackages = lang => {
  const s = SERVICE[lang];
  return [...SERVICE_TIERS.map(([n, p]) => [s.tier(n), euro(p, lang)]), [s.tierMore, s.custom]];
};
// Aanvraagformulier in de overlay: gaat naar /api/aanleveren (actie request), komt in /admin → Inladen en in de mail.
const PACKAGE_KEYS = ['p100', 'p500', 'p1000', 'meer'];
function intakeForm(lang) {
  const [, name, email, , , , , busy, , fail] = FORM_TEXT[lang];
  const s = SERVICE[lang];
  const fm = s.form;
  const f = (id, label, input) => `<div class="site-field"><label for="${id}">${esc(label)}</label>${input}</div>`;
  const opts = list => list.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join('');
  const packages = servicePackages(lang).map(([t, p], i, all) => [
    PACKAGE_KEYS[i],
    i === all.length - 1 ? fm.packageMore : `${t} · ${p}`
  ]);
  const seats = fm.teamOptions.map((t, i) => [[5, 10, 25][i] || '', t]);
  return `<form class="site-form" data-intake-request data-lang="${lang}" data-busy="${esc(busy)}" data-ok="${esc(s.requestOk)}" data-fail="${esc(fail)}" novalidate><div class="site-field-pair">${f('ifPackage', fm.package, `<select id="ifPackage" name="package">${opts(packages)}</select>`)}${f('ifTeam', fm.team, `<select id="ifTeam" name="seats">${opts(seats)}</select>`)}</div>${f('ifName', name, '<input id="ifName" name="name" autocomplete="name" required maxlength="120">')}${f('ifEmail', email, '<input id="ifEmail" name="email" type="email" autocomplete="email" required maxlength="240">')}${f('ifPlace', fm.restaurant, '<input id="ifPlace" name="restaurant" autocomplete="organization" required maxlength="160">')}${f('ifMessage', fm.message, `<textarea id="ifMessage" name="notes" rows="3" maxlength="6000" placeholder="${esc(fm.placeholder)}"></textarea>`)}<div class="site-form-trap" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div><div class="site-form-row"><button class="site-btn solid" type="submit">${esc(fm.send)}</button><span class="site-form-status" aria-live="polite"></span></div></form>`;
}
const freeBadge = (lang, button) => {
  const s = SERVICE[lang];
  return FREE_KITCHENS
    ? `<div class="svc-free"><div><b>${esc(s.free(FREE_KITCHENS))}</b><span>${esc(s.freeNote)}</span></div>${button || ''}</div>`
    : '';
};
// Overlay met het aanvraagformulier; een pakketknop (data-svc-open="2") opent hem met dat pakket gekozen (js/site.js).
function serviceDialog(lang) {
  const s = SERVICE[lang];
  return `<div class="svc-dialog" id="svcDialog" hidden><div class="svc-dialog-box" role="dialog" aria-modal="true" aria-labelledby="svcDialogTitle"><button type="button" class="svc-dialog-close" data-svc-close aria-label="${esc(s.close)}">×</button><span class="svc-kicker">${esc(s.kicker)}</span><h2 id="svcDialogTitle">${esc(s.form.title)}</h2><p class="svc-dialog-note">${esc(s.payNote)}</p>${intakeForm(lang)}</div></div>`;
}
// Alles onder de tekst op de servicepagina: introductieaanbod, wat je krijgt, indeling, stappen, pakketten en de overlay.
function serviceBlock(lang) {
  const s = SERVICE[lang];
  const featured = 1;
  return `${freeBadge(lang, `<button type="button" class="site-btn solid" data-svc-open="${featured}">${esc(s.bandButton)}</button>`)}
<h2 class="reveal">${esc(s.includedTitle)}</h2><ul class="svc-list">${s.included.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
<h2 class="reveal">${esc(s.structureTitle)}</h2><p>${esc(s.structureText)}</p><div class="svc-structures">${s.structures.map(([t, folders]) => `<div><b>${esc(t)}</b><span>${folders.map(x => `<i>${esc(x)}</i>`).join('')}</span></div>`).join('')}</div>
<h2 class="reveal">${esc(s.stepsTitle)}</h2><ol class="svc-steps">${s.steps.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join('')}</ol>
<h2 class="reveal" id="pakketten">${esc(s.priceTitle)}</h2><p>${esc(s.priceIntro)}</p><div class="svc-prices">${servicePackages(
    lang
  )
    .map(
      ([t, p], i, all) =>
        `<button type="button" class="svc-price${i === featured ? ' is-featured' : ''}" data-svc-open="${i}"><span>${esc(t)}</span><strong${i === all.length - 1 ? ' class="small"' : ''}>${esc(p)}</strong><em>${esc(s.choose)} →</em></button>`
    )
    .join('')}</div><p class="site-note">${esc(s.example)}</p>
<div class="site-faq svc-faq">${s.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
${serviceDialog(lang)}`;
}
// Aanleverpagina (alleen via een persoonlijke link). js/site.js toont per stand van zaken één deel:
// betalen (na goedkeuring), aanleveren (na betalen) of een melding.
function deliverBody(lang) {
  const d = DELIVER[lang];
  const w = DELIVER_FLOW[lang];
  const structures = SERVICE[lang].structures;
  const texts = {
    uploading: d.uploading,
    uploaded: d.uploaded,
    failed: d.failed,
    tooBig: d.tooBig,
    busy: d.busy,
    needFiles: d.needFiles,
    thanks: d.thanks,
    invalid: d.invalid,
    closed: d.closed,
    hello: d.hello,
    package: d.package,
    perYear: w.perYear,
    once: w.once,
    free: w.free,
    paying: w.paying,
    processing: w.processing,
    reviewing: w.reviewing,
    rejected: w.rejected,
    importing: w.importing,
    membersHint: [2, 5, 10, 25].reduce((o, n) => ({ ...o, [n]: w.membersHint(n) }), {}),
    tooMany: [4, 9, 24].reduce((o, n) => ({ ...o, [n]: w.tooMany(n) }), {}),
    memberEmail: w.memberEmail,
    roleView: w.roleView,
    roleEdit: w.roleEdit,
    remove: w.remove,
    service: w.service,
    resubmit: w.resubmit
  };
  return `<div data-deliver data-lang="${lang}" data-texts="${esc(JSON.stringify(texts))}">
<p class="svc-deliver-who" data-deliver-who hidden></p>
<section class="svc-pay" data-stage="pay" hidden>
<h2>${esc(w.payTitle)}</h2><p>${esc(w.payIntro)}</p>
<p class="site-note"><b>${esc(w.seatsLabel)}</b></p>
<div class="svc-seat-choice">${[5, 10, 25].map(n => `<label><input type="radio" name="seats" value="${n}"><span><b>${esc(w.seats(n))}</b><small>${esc(w.seatsNote(n))}</small><em data-seat-price="${n}"></em></span></label>`).join('')}</div>
<div class="svc-total" data-pay-total></div>
<div class="site-form-row"><button class="site-btn solid" type="button" data-pay>${esc(w.payButton)}</button><span class="site-form-status" aria-live="polite" data-pay-status></span></div>
<p class="site-note">${esc(w.payNote)}</p>
</section>
<form class="site-form svc-deliver" data-stage="deliver" hidden novalidate>
<h2>${esc(d.structureTitle)}</h2><p class="site-note">${esc(d.structureHint)}</p>
<div class="svc-choice">${structures.map(([t, folders], i) => `<label><input type="radio" name="structure" value="${esc(t)}" data-folders="${esc(i === structures.length - 1 ? '' : folders.join('\n'))}"${i === 0 ? ' checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div>
<div class="site-field"><label for="dvFolders">${esc(d.foldersLabel)}</label><textarea id="dvFolders" name="folders" rows="6" maxlength="6000">${esc(structures[0][1].join('\n'))}</textarea></div>
<div class="site-field"><label for="dvMatch">${esc(d.matchLabel)}</label><textarea id="dvMatch" name="match" rows="2" maxlength="3000" placeholder="${esc(d.matchPlaceholder)}"></textarea></div>
<h2>${esc(d.filesTitle)}</h2><p class="site-note">${esc(d.filesHint)}</p>
<label class="svc-drop" data-deliver-drop><input type="file" multiple data-deliver-files><span>${esc(d.drop)}</span></label>
<ul class="svc-files" data-deliver-list></ul>
<h2>${esc(d.notesTitle)}</h2>
<div class="site-field"><textarea id="dvNotes" name="notes" rows="4" maxlength="6000" placeholder="${esc(d.notesPlaceholder)}" aria-label="${esc(d.notesTitle)}"></textarea></div>
<h2>${esc(w.membersTitle)}</h2><p class="site-note" data-members-hint></p>
<ul class="svc-members" data-members></ul>
<p><button type="button" class="site-btn" data-add-member>${esc(w.addMember)}</button></p>
<div class="site-form-row"><button class="site-btn solid" type="submit">${esc(d.submit)}</button><span class="site-form-status" aria-live="polite"></span></div>
<p class="site-note">${esc(w.wiped)}</p>
</form>
<p class="svc-deliver-msg" data-deliver-msg>…</p></div>`;
}
// Opvallend blok op de startpagina, direct onder "Wat Savour doet".
function serviceBand(lang) {
  const s = SERVICE[lang];
  return `<section class="site-section svc-band"><div class="site-wrap site-two"><div><span class="svc-kicker">${esc(s.kicker)}</span><h2 class="reveal">${esc(s.bandTitle)}</h2></div><div><p>${esc(s.bandText)}</p>${FREE_KITCHENS ? `<p class="svc-band-free">${esc(s.free(FREE_KITCHENS))}</p>` : ''}<div class="site-cta-row"><a class="site-btn solid" href="${serviceHref(lang)}#pakketten">${esc(s.bandButton)}</a></div></div></div></section>`;
}
// Blok onderaan de prijzenpagina.
function serviceTeaser(lang) {
  const s = SERVICE[lang];
  return `<div class="svc-teaser"><h2>${esc(s.proTitle)}</h2><p>${esc(s.proText)}</p>${FREE_KITCHENS ? `<p class="svc-band-free">${esc(s.free(FREE_KITCHENS))}</p>` : ''}<p><a class="site-btn solid" href="${serviceHref(lang)}#pakketten">${esc(s.bandButton)}</a></p></div>`;
}

// ---- Startpagina (ook gebruikt in index.html) ----
// Bovenaan echte schermafbeeldingen van de app (assets/app): bibliotheek op de laptop, recept op de telefoon.
const SHOT_ALT = {
  nl: ['Receptenbibliotheek in Savour op een laptop', 'Receptscherm in Savour op een telefoon'],
  en: ['Recipe library in Savour on a laptop', 'Recipe screen in Savour on a phone'],
  de: ['Rezeptbibliothek in Savour auf einem Laptop', 'Rezeptansicht in Savour auf dem Handy'],
  es: ['Biblioteca de recetas en Savour en un portátil', 'Pantalla de receta en Savour en un móvil'],
  fr: ['Bibliothèque de recettes Savour sur un ordinateur portable', 'Écran de recette Savour sur un téléphone']
};
// Strook met live cijfers onder de opening; js/site.js vult de getallen via /api/admin?cijfers=1.
// Zonder antwoord (offline, fout) blijft de strook verborgen: er staan nooit verzonnen getallen.
const FIGURES = {
  // Per getal: [meervoud, enkelvoud] (bij precies 1).
  nl: [
    'Savour in cijfers',
    ['recepten in Savour', 'recept in Savour'],
    ['keukenteams aangemaakt', 'keukenteam aangemaakt'],
    ['accounts', 'account']
  ],
  en: [
    'Savour in numbers',
    ['recipes in Savour', 'recipe in Savour'],
    ['kitchen teams created', 'kitchen team created'],
    ['accounts', 'account']
  ],
  de: [
    'Savour in Zahlen',
    ['Rezepte in Savour', 'Rezept in Savour'],
    ['Küchenteams erstellt', 'Küchenteam erstellt'],
    ['Konten', 'Konto']
  ],
  es: [
    'Savour en cifras',
    ['recetas en Savour', 'receta en Savour'],
    ['equipos de cocina creados', 'equipo de cocina creado'],
    ['cuentas', 'cuenta']
  ],
  fr: [
    'Savour en chiffres',
    ['recettes dans Savour', 'recette dans Savour'],
    ['équipes de cuisine créées', 'équipe de cuisine créée'],
    ['comptes', 'compte']
  ]
};
const FIGURES_LIVE = {
  nl: 'Live uit de database',
  en: 'Live from the database',
  de: 'Live aus der Datenbank',
  es: 'En directo de la base de datos',
  fr: 'En direct de la base de données'
};
// Lijnpictogrammen bij de cijfers: receptenboek, keukenteam, account.
const FIGURE_ICONS = {
  recipes:
    '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="M9 7.5h6M9 11h4"/>',
  teams:
    '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.3c2.5-.4 4.6 1.3 5 4.7"/>',
  accounts: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.7 3.6-6 7-6s6.2 2.3 7 6"/>'
};
function figuresBand(lang) {
  const [title, ...labels] = FIGURES[lang];
  return `<section class="site-figures" data-site-figures hidden aria-label="${esc(title)}"><div class="site-wrap"><div class="site-figures-head"><span class="site-figures-kicker">${esc(title)}</span><span class="site-figures-live"><i aria-hidden="true"></i>${esc(FIGURES_LIVE[lang])}</span></div><dl>${[
    'recipes',
    'teams',
    'accounts'
  ]
    .map(
      (k, i) =>
        `<div><svg class="site-figures-icon" viewBox="0 0 24 24" aria-hidden="true">${FIGURE_ICONS[k]}</svg><dt data-one="${esc(labels[i][1])}">${esc(labels[i][0])}</dt><dd data-figure="${k}">0</dd></div>`
    )
    .join('')}</dl></div></section>`;
}
function homeBody(lang, inApp) {
  const h = HOME[lang];
  const u = UI[lang];
  const q = homePath(lang);
  return `<section class="site-hero${HERO_PHOTO ? ' has-photo' : ''}"${HERO_PHOTO ? ` style="--hero-photo:url('${HERO_PHOTO}')"` : ''}><div class="site-wrap">
<div><h1>${esc(h.h1)}</h1><p class="site-lead">${esc(h.lead)}</p><p class="site-proof">${esc(h.proof)}</p>
<div class="site-cta-row"><a class="site-btn solid" href="${q}?auth=signup" data-auth="signup">${u.start}</a><a class="site-btn" href="${q}?demo=1" data-demo>${u.demo}</a></div><p class="site-note" style="margin-top:10px">${esc(u.demoNote)}</p></div>
<div class="hero-shots"><div class="hero-laptop"><img src="/assets/app/bibliotheek-${lang}.jpg" alt="${esc(SHOT_ALT[lang][0])}" width="1440" height="900"></div><div class="hero-phone"><img src="/assets/app/recept-${lang}.jpg" alt="${esc(SHOT_ALT[lang][1])}" width="520" height="1125"></div></div>
</div></section>
${figuresBand(lang)}
<section class="site-section"><div class="site-wrap"><div class="site-two"><h2 class="reveal">${esc(KLADJE_REAL[lang].heading)}</h2><div>${h.story.map(p => `<p>${esc(p)}</p>`).join('')}<p><a class="site-link" href="${href(STORY[lang].slug)}">${esc(h.storyLink)}</a></p></div></div>${kladje(lang)}</div></section>
<section class="site-section tint"><div class="site-wrap"><h2 class="reveal">${esc(h.featuresTitle)}</h2>${rows(
    FEATURES.filter(f => !f.soon),
    lang
  )}</div></section>
${serviceBand(lang)}
<section class="site-section"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.audienceTitle)}</h2>${rows(AUDIENCES, lang)}</div></section>
<section class="site-section dark"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.soonTitle)}</h2><div><ul class="site-rows">${FEATURES.find(
    f => f.soon
  )
    [lang].sections.map(
      ([t, d]) =>
        `<li><a href="${href(FEATURES.find(f => f.soon)[lang].slug)}"><b>${esc(t)}</b><span>${esc(d)}</span><i aria-hidden="true">→</i></a></li>`
    )
    .join('')}</ul></div></div></section>
<section class="site-section"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.priceTitle)}</h2><div><p>${esc(h.price)}</p><p><a class="site-link" href="${href(legacy('pro')[lang])}">${esc(h.priceLink)}</a></p></div></div></section>
<section class="site-section tint"><div class="site-wrap site-two"><h2 class="reveal">${esc(h.faqTitle)}</h2><div class="site-faq">${h.faq.map(([qq, a]) => `<details><summary>${esc(qq)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>
${ctaBlock(lang, inApp)}`;
}

// Zoekmachines kappen lange titels en beschrijvingen af (Bing meldt het als fout): 60 en 160 tekens.
function fitTitle(title, max = 60) {
  const short = String(title).replace(
    /\s*[—–|-]\s*(Handleiding Savour|Handleiding|Savour user guide|User guide|Handbuch Savour|Handbuch|Manual de Savour|Manual|Manuel Savour|Manuel|Savour)$/,
    ''
  );
  if (String(title).length <= max) return title;
  if (short.length <= max) return short;
  // Eerst het deel voor een dubbele punt of gedachtestreepje (de hele kop), pas daarna voor een komma.
  for (const sep of [/\s*[:—–]\s*/, /\s*,\s*/]) {
    const part = short.split(sep)[0];
    if (part.length >= 25 && part.length <= max) return part;
  }
  return short.slice(0, max).replace(/\s+\S*$/, '');
}
function fitDesc(desc, max = 160) {
  const d = String(desc);
  if (d.length <= max) return d;
  const cut = d.slice(0, max);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  if (end >= 80) return cut.slice(0, end + 1);
  return cut.slice(0, max - 1).replace(/[\s,;:]+\S*$/, '') + '…';
}

// ---- Losse pagina's ----
function pageHead(lang, { title: longTitle, desc: longDesc, canonical, alternates, schema, hidden }) {
  const title = fitTitle(longTitle);
  const desc = fitDesc(longDesc);
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${hidden ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<link rel="canonical" href="${canonical}">
${alternates.map(([l, h]) => `<link rel="alternate" hreflang="${l}" href="${h}">`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Savour">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/${lang === 'en' ? 'savour-og-en.png?v=2' : 'savour-og.png?v=2'}">
<meta property="og:locale" content="${{ nl: 'nl_NL', en: 'en_GB', de: 'de_DE', es: 'es_ES', fr: 'fr_FR' }[lang] || 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d1314">
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96.png"><link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192.png">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/site.css">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script src="/js/country.js" defer></script>
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
  isPartOf: { '@type': 'WebSite', '@id': SITE + '/#website', name: 'Savour', url: SITE + '/' },
  publisher: ORG
});

function writePage(slug, html) {
  // Alle gemaakte pagina's staan in de map site/ (vercel.json en local-server.mjs zetten /slug om naar site/slug/).
  const dir = new URL(`site/${slug}/`, ROOT);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(new URL('index.html', dir), html, 'utf8');
}

const sitemap = [];
function page({ lang, slugs, title, desc, crumbs, body, schema = [], hidden = false }) {
  for (const l of LANGS) if (slugs[l]) PATH_INDEX.set(href(slugs[l]), slugs);
  const canonical = url(slugs[lang]);
  const alternates = LANGS.filter(l => slugs[l]).map(l => [l, url(slugs[l])]);
  if (slugs.nl) alternates.push(['x-default', url(slugs.nl)]);
  const alt = Object.fromEntries(LANGS.map(l => [l, slugs[l] ? href(slugs[l]) : homePath(l)]));
  const crumbHtml = crumbs?.length
    ? `<div class="site-crumbs"><a href="${UI[lang].home}">Home</a>${crumbs.map(c => ` / ${c[1] ? `<a href="${c[1]}">${esc(c[0])}</a>` : esc(c[0])}`).join('')}</div>`
    : '';
  // Kruimelpad ook voor zoekmachines: Home › (tussenpagina's met een link) › deze pagina. Heeft het laatste
  // kruimeltje een link (blogartikel › Blog), dan komt de titel van de pagina zelf erachter.
  const last = crumbs?.[crumbs.length - 1];
  const trail = crumbs?.length
    ? [
        ['Home', SITE + homePath(lang)],
        ...crumbs.filter(c => c[1]).map(c => [c[0], SITE + c[1]]),
        ...(last[1] ? [[title.replace(/ \| [^|]*Savour$/, ''), canonical]] : [[last[0], canonical]])
      ]
    : [];
  const breadcrumb = trail.length
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }))
        }
      ]
    : [];
  const html =
    pageHead(lang, {
      title,
      desc,
      canonical,
      alternates,
      hidden,
      schema: [webPage(lang, title, desc, canonical), ...breadcrumb, ...schema]
    }) +
    `<div class="site">${header(lang, alt, false)}<main>${body(crumbHtml)}</main>${hidden ? '' : ctaBlock(lang, false)}${footer(lang, alt, false)}</div>\n</body>\n</html>\n`;
  writePage(slugs[lang], html);
  if (!hidden) sitemap.push({ loc: canonical, alternates, file: `site/${slugs[lang]}/index.html` });
}

// Echte kladjes (opgepoetst, niets aan de tekst veranderd) op Over ons, als polaroids op een prikbord. Recepten worden nooit vertaald.
const KLADJE_WALL = [
  ['over-marshmallow', 'Marshmallow'],
  ['over-spongecake', 'Spongecake lavas'],
  ['over-eendenhuid', 'Eendenhuid krokant'],
  ['over-mousse', 'Witte chocolade mousse']
];

// Over ons: hoofdstukken als doorlopend verhaal, met echte kladjes na het eerste en een echt scherm na "wat Savour nu kan".
function aboutChapters(s, lang) {
  return s.chapters
    .map(([t, ps], i) => {
      let extra = '';
      if (i === 0)
        extra = `<figure class="kladje-wall reveal"><div class="kladje-wall-grid">${KLADJE_WALL.map(
          ([file, name]) =>
            `<div class="kladje-card"><img src="/assets/kladjes/${file}.jpg" alt="${esc(name)}" width="900" height="900" loading="lazy"><span translate="no">${esc(name)}</span></div>`
        ).join('')}</div><figcaption>${esc(s.notesCaption)}</figcaption></figure>`;
      if (i === 4)
        extra = `<figure class="site-notes app reveal"><div class="site-phone-frame"><img src="/assets/app/recept-${lang}.jpg" alt="${esc(SHOT_ALT[lang][1])}" loading="lazy"></div><figcaption>${esc(s.appCaption)}</figcaption></figure>`;
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
  eend: ['eend-vuur.jpg', 'center 50%'],
  wortels: ['wortels.jpg', 'center 50%'],
  uien: ['uien.jpg', 'center 50%'],
  bloemen: ['bloemen.jpg', 'center 45%'],
  bloemenveld: ['bloemenveld.jpg', 'center 55%'],
  // Het bord staat midden in de foto: op de laptop ingezoomd en links uitgelijnd, zodat het rechts naast de tekst staat.
  bord: ['bord-pass.jpg', 'center 55%', '160% auto', '0% 58%']
};
// De ingrediëntenlijst met de allergenen per taal (tools/build-ingredientenlijst.mjs): { code: [extra, nl, en, de, es, fr] }.
const INGREDIENT_LIST = JSON.parse(fs.readFileSync(new URL('assets/data/ingredientenlijst.json', ROOT), 'utf8'));
const PAGE_PHOTO = {
  'recepten-digitaliseren': 'hout',
  'recepten-organiseren': 'keuken',
  'recepten-database': 'brigade',
  'recepten-laten-inladen': 'eend',
  'recepten-delen': 'brigade',
  'recepten-opschalen': 'wortels',
  'recepten-printen': 'uien',
  binnenkort: 'bloemen',
  'voor-koks': 'eend',
  'voor-keukenbrigades': 'brigade',
  'over-savour': 'bord',
  blog: 'hout',
  'app-downloaden': 'wortels',
  'savour-pro': 'brigade',
  'veelgestelde-vragen': 'keuken',
  gids: 'bloemenveld',
  contact: 'eend'
};
const BLOG_PHOTOS = ['wortels', 'uien', 'keuken', 'eend', 'brigade', 'hout'];
const photoFile = key => {
  const [file] = PHOTOS[key];
  return `/assets/keuken/${file}?v=${fs.statSync(new URL(`assets/keuken/${file}`, ROOT)).size}`;
};
// Functie- en voor-wiepagina's (tools/site-feature-rich.mjs): drie voordelen onder de kop, afwisselend tekst en
// een scherm uit de app, en vragen onderaan.
const FAQ_TITLE = {
  nl: 'Veelgestelde vragen',
  en: 'Frequently asked questions',
  de: 'Häufige Fragen',
  es: 'Preguntas frecuentes',
  fr: 'Questions fréquentes'
};
const featureRich = (id, lang) => {
  const r = FEATURE_RICH[id]?.[lang] || PAGE_RICH[id]?.[lang];
  return r ? richMap(r, lang) : null;
};
// Donkere strook met echte cijfers (Prijzen, Over ons).
const featureFacts = (id, lang) => {
  const r = featureRich(id, lang);
  return r?.facts
    ? `<section class="feat-facts"><div class="site-wrap"><dl>${r.facts.map(([n, d]) => `<div class="reveal"><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl></div></section>`
    : '';
};
const featureBand = (id, lang) => {
  const r = featureRich(id, lang);
  return r?.benefits
    ? `<section class="feat-band"><div class="site-wrap"><ul>${r.benefits.map(([h, d]) => `<li class="reveal"><b>${esc(h)}</b><span>${esc(d)}</span></li>`).join('')}</ul></div></section>`
    : '';
};
const featureShow = (id, lang) => {
  const r = featureRich(id, lang);
  return r?.showcase
    ? `<section class="feat-show"><div class="site-wrap">${r.showcase
        .map(
          (x, i) =>
            `<div class="feat-row${i % 2 ? ' flip' : ''} reveal"><div><h2>${esc(x.title)}</h2><p>${proseText(x.text)}</p></div><figure><img src="${x.shot}" alt="${esc(x.alt)}" loading="lazy"></figure></div>`
        )
        .join('')}</div></section>`
    : '';
};
const featureFaq = (id, lang) => {
  const r = featureRich(id, lang);
  return r?.faq
    ? `<section class="site-section tint"><div class="site-wrap site-two"><h2 class="reveal">${esc(FAQ_TITLE[lang])}</h2><div class="site-faq">${r.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${proseText(a)}</p></details>`).join('')}</div></div></section>`
    : '';
};
const pageTop = (crumbHtml, h1, lead, photo) => {
  const p = photo && PHOTOS[photo];
  const style = p
    ? ` style="--page-photo:url('${photoFile(photo)}');--page-photo-pos:${p[1]}${p[2] ? `;--page-photo-size:${p[2]};--page-photo-pos-wide:${p[3]}` : ''}"`
    : '';
  return `<section class="site-page-head${p ? ' has-photo' : ''}"${style}><div class="site-wrap site-narrow">${crumbHtml}<h1>${esc(h1)}</h1>${lead ? `<p class="site-lead">${esc(lead)}</p>` : ''}</div></section>`;
};
// Twee staande foto's naast elkaar midden in de tekst (Voor wie-pagina's).
const photoDuo = (lang, a, b) =>
  `<figure class="site-photo-duo reveal">${[a, b].map(k => `<img src="${photoFile(k)}" alt="${esc(PHOTO_ALT[k]?.[lang] || PHOTO_ALT[k]?.en || '')}" loading="lazy" style="object-position:${PHOTOS[k][1]}">`).join('')}</figure>`;
// Een sectie is [kop, tekst] met eventueel als derde deel een opsomming (lijst met teksten) of een tabel
// ({ head: [...], rows: [[...]] }). Tekst mag alinea's (witregel) en links ([tekst](https://… of /pad)) bevatten.
const proseText = s =>
  esc(s)
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g, (_, label, to) =>
      /^https?:/.test(to) ? `<a href="${to}" rel="noopener">${label}</a>` : `<a href="${to}">${label}</a>`
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
// Uitgebreide artikelen kunnen na de tekst ook blokken hebben die iets toevoegen (nooit alleen opvulling):
//   { tip: [kop, tekst] }   een tip uit de keuken          { warn: [kop, tekst] }  iets om op te letten
//   { quote: tekst }        de kernzin van het artikel     { shot: pad, alt, caption }  een echt scherm uit de app
const BOX_ICON = {
  tip: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  warn: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4.5M12 17.5v.01"/>'
};
const postBlock = x => {
  for (const kind of ['tip', 'warn'])
    if (x[kind])
      return `<aside class="post-box${kind === 'warn' ? ' note' : ''}"><svg viewBox="0 0 24 24" aria-hidden="true">${BOX_ICON[kind]}</svg><div><b>${esc(x[kind][0])}</b><p>${proseText(x[kind][1])}</p></div></aside>`;
  if (x.quote) return `<p class="post-quote reveal">${esc(x.quote)}</p>`;
  if (x.shot)
    return `<figure class="post-shot${x.wide ? ' wide' : ''} reveal"><img src="${x.shot}" alt="${esc(x.alt)}" loading="lazy"><figcaption>${esc(x.caption)}</figcaption></figure>`;
  // Twee beelden naast elkaar: { duo: [[pad, alt], [pad, alt]], caption }
  if (x.duo)
    return `<figure class="post-duo reveal"><div>${x.duo.map(([src, alt]) => `<img src="${src}" alt="${esc(alt)}" loading="lazy">`).join('')}</div><figcaption>${esc(x.caption)}</figcaption></figure>`;
  // Stappen: { steps: [[kop, tekst], ...] }
  if (x.steps)
    return `<ol class="post-steps">${x.steps.map(([h, d]) => `<li><b>${esc(h)}</b><span>${proseText(d)}</span></li>`).join('')}</ol>`;
  // Checklist: { check: [tekst, ...], title }
  if (x.check)
    return `<div class="post-check">${x.title ? `<b>${esc(x.title)}</b>` : ''}<ul>${x.check.map(li => `<li>${proseText(li)}</li>`).join('')}</ul></div>`;
  // Twee kanten naast elkaar: { compare: [[kop, [punten]], [kop, [punten]]] }
  if (x.compare)
    return `<div class="post-compare">${x.compare.map(([h, items], i) => `<div class="${i ? 'is-good' : ''}"><b>${esc(h)}</b><ul>${items.map(li => `<li>${proseText(li)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  // Eén getal dat het verhaal draagt: { fact: [getal, uitleg] }
  if (x.fact)
    return `<p class="post-fact reveal"><strong>${esc(x.fact[0])}</strong><span>${proseText(x.fact[1])}</span></p>`;
  // Voorbeeld zoals het in een recept staat: { example: [kop, [regels]] }
  if (x.example)
    return `<div class="post-example"><b>${esc(x.example[0])}</b><div translate="no">${x.example[1].map(l => `<p>${proseText(l)}</p>`).join('')}</div></div>`;
  // Vragen en antwoorden: { faq: [[vraag, antwoord], ...] }
  if (x.faq)
    return `<div class="site-faq post-faq">${x.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${proseText(a)}</p></details>`).join('')}</div>`;
  // Verwijzing naar een pagina of artikel: { see: [kop, pad, tekst] }
  if (x.see)
    return `<a class="post-see" href="${x.see[1]}"><b>${esc(x.see[0])}</b><span>${esc(x.see[2])}</span><i aria-hidden="true">→</i></a>`;
  return null;
};
const sectionExtra = x =>
  !x || typeof x !== 'object'
    ? ''
    : !Array.isArray(x) && postBlock(x) != null
      ? postBlock(x)
      : Array.isArray(x)
        ? `<ul>${x.map(li => `<li>${proseText(li)}</li>`).join('')}</ul>`
        : `<div class="site-table-wrap"><table class="site-table"><thead><tr>${x.head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${x.rows
            .map(
              r =>
                `<tr>${r
                  .map((c, i) =>
                    i
                      ? `<td data-label="${esc(x.head[i] || '')}">${proseText(c)}</td>`
                      : `<th scope="row">${proseText(c)}</th>`
                  )
                  .join('')}</tr>`
            )
            .join('')}</tbody></table></div>${x.note ? `<p class="site-table-note">${proseText(x.note)}</p>` : ''}`;
const sectionsHtml = sections =>
  sections
    .map(
      ([t, d, ...extra]) =>
        `<h2 class="reveal">${esc(t)}</h2>${String(d)
          .split('\n\n')
          .map(p => `<p>${proseText(p)}</p>`)
          .join('')}${extra.map(sectionExtra).join('')}`
    )
    .join('');

for (const lang of LANGS) {
  const u = UI[lang];
  // Functies
  for (const f of FEATURES) {
    const t = f[lang];
    // Ook interessant: de drie functies die na deze komen, zodat niet elke pagina dezelfde drie toont.
    const live = FEATURES.filter(x => !x.soon);
    const at = live.indexOf(f);
    const others = [1, 2, 3].map(n => live[(at + n + live.length) % live.length]).filter(x => x !== f);
    page({
      lang,
      slugs: slugsOf(f),
      title: t.title,
      desc: t.desc,
      crumbs: [[u.features], [t.menu]],
      body: c =>
        pageTop(c, t.h1, t.lead, PAGE_PHOTO[f.nl.slug]) +
        featureBand(f.id, lang) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${t.kladje ? `<div class="site-figure">${kladje(lang)}</div>` : ''}${sectionsHtml(t.sections)}${f.service ? serviceBlock(lang) : ''}${
          f.soon
            ? `<p class="site-note">${SOON_MAIL[lang]} <a href="mailto:contact@savour.page">contact@savour.page</a>.</p>`
            : ''
        }</div></article>${featureShow(f.id, lang)}${featureFaq(f.id, lang)}
<section class="site-related"><div class="site-wrap site-narrow"><h2>${u.related}</h2>${rows(others.slice(0, 3), lang)}</div></section>`
    });
  }
  // Aanleverpagina van de import service (alleen via een persoonlijke link)
  {
    const d = DELIVER[lang];
    page({
      lang,
      hidden: true,
      slugs: Object.fromEntries(LANGS.map(l => [l, DELIVER[l].slug])),
      title: d.title,
      desc: d.lead,
      body: c =>
        pageTop(c, d.h1, d.lead, PAGE_PHOTO[SERVICE.nl.feature.slug]) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${deliverBody(lang)}</div></article>`
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
        featureBand(a.id, lang) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${sectionsHtml(t.sections.slice(0, 2))}${photoDuo(lang, ...(a.nl.slug === 'voor-koks' ? ['wortels', 'uien'] : ['wortels', 'eend']))}${sectionsHtml(t.sections.slice(2))}</div></article>${featureShow(a.id, lang)}${featureFaq(a.id, lang)}
<section class="site-related"><div class="site-wrap site-narrow"><h2>${u.features}</h2>${rows(
          FEATURES.filter(x => (AUDIENCE_FEATURES[a.id] || []).includes(x.id)),
          lang
        )}</div></section>`
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
        featureFacts('about', lang) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${aboutChapters(s, lang)}</div></article>${featureFaq('about', lang)}
<section class="site-section tint"><div class="site-wrap"><h2 class="reveal">${esc(s.valuesTitle)}</h2><div class="site-values">${s.values.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div></div></section>`
    });
  }
  // Blog: overzicht over meerdere bladzijden (BLOG_PER_PAGE artikelen, nieuwste eerst) en de artikelen.
  // Bladzijde 1 is /blog, daarna /blog/pagina-2 enz.: één deel achter /blog, dus de rewrite voor artikelen geldt ook.
  const pages = Math.ceil(POSTS.length / BLOG_PER_PAGE);
  const pageSlugs = i =>
    i ? Object.fromEntries(LANGS.map(l => [l, `${blogSlug[l]}/${BLOG_PAGE_WORD[l]}-${i + 1}`])) : blogSlug;
  for (let i = 0; i < pages; i++) {
    const list = POSTS.slice(i * BLOG_PER_PAGE, (i + 1) * BLOG_PER_PAGE);
    const pageLink = j => href(pageSlugs(j)[lang]);
    const pager =
      pages > 1
        ? `<nav class="site-pager" aria-label="${esc(BLOG_PAGER[lang].label)}">${i ? `<a class="site-pager-step" href="${pageLink(i - 1)}" rel="prev">← ${esc(BLOG_PAGER[lang].newer)}</a>` : '<span></span>'}<span class="site-pager-pages">${Array.from(
            { length: pages },
            (_, j) => (j === i ? `<span aria-current="page">${j + 1}</span>` : `<a href="${pageLink(j)}">${j + 1}</a>`)
          ).join(
            ''
          )}</span>${i < pages - 1 ? `<a class="site-pager-step" href="${pageLink(i + 1)}" rel="next">${esc(BLOG_PAGER[lang].older)} →</a>` : '<span></span>'}</nav>`
        : '';
    const name = i ? `${u.blog} · ${BLOG_PAGER[lang].page} ${i + 1}` : u.blog;
    page({
      lang,
      slugs: pageSlugs(i),
      title: i ? `${BLOG_TITLE[lang]} · ${BLOG_PAGER[lang].page} ${i + 1}` : BLOG_TITLE[lang],
      desc: u.blogLead,
      crumbs: i ? [[u.blog, href(blogSlug[lang])], [`${BLOG_PAGER[lang].page} ${i + 1}`]] : [[u.blog]],
      body: c =>
        pageTop(c, name, u.blogLead, PAGE_PHOTO.blog) +
        `<article class="site-article"><div class="site-wrap site-narrow"><ul class="site-posts">${list
          .map(
            p =>
              `<li><h2><a href="${href(p[lang].slug)}">${esc(p[lang].title)}</a></h2><p>${esc(p[lang].desc)}</p><div class="site-post-meta"><a class="site-link" href="${href(p[lang].slug)}">${u.readArticle}</a>${postDate(p, lang)}</div></li>`
          )
          .join('')}</ul>${pager}</div></article>`
    });
  }
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
          image: SITE + photoFile(BLOG_PHOTOS[n % BLOG_PHOTOS.length]).replace(/\?.*/, ''),
          author: ORG,
          publisher: ORG,
          mainEntityOfPage: url(t.slug)
        }
      ],
      body: c =>
        pageTop(c, t.h1, t.lead, BLOG_PHOTOS[n % BLOG_PHOTOS.length]) +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose"><p class="site-meta">${date}${p.rich ? ` · ${readMinutes(t)} ${READ_TIME[lang]}` : ''}</p>${t.brief ? `<section class="post-brief"><h2>${esc(BRIEF[lang])}</h2><ul>${t.brief.map(b => `<li>${proseText(b)}</li>`).join('')}</ul></section>` : ''}${sectionsHtml(t.sections)}<p><em>${esc(t.outro)}</em></p>${p.rich ? moreReading(n, lang) : ''}</div></article>`
    });
  }
  // Ingrediëntenlijst met allergenen (tools/site-blog-allergenen.mjs); js/site.js laadt en doorzoekt de lijst.
  {
    const t = LIST_PAGE[lang];
    const texts = {
      search: t.search,
      filter: t.filter,
      name: t.name,
      allergens: t.allergens,
      also: t.also,
      source: t.source,
      none: t.none,
      more: t.more,
      empty: t.empty,
      shown: t.shown('{n}', '{total}'),
      sourceNames: t.sourceNames,
      labels: Object.fromEntries(
        Object.entries(INGREDIENT_LIST.labels).map(([code, l]) => [code, [l[1 + LANGS.indexOf(lang)], l[0]]])
      )
    };
    page({
      lang,
      slugs: LIST_SLUGS,
      title: t.title,
      desc: t.desc,
      crumbs: [[t.h1]],
      body: c =>
        pageTop(c, t.h1, t.lead) +
        `<article class="site-article"><div class="site-wrap site-narrow"><div class="ing-list" data-ingredient-list data-src="/assets/data/ingredientenlijst.json?v=${INGREDIENT_LIST.count}" data-texts="${esc(JSON.stringify(texts))}"><div class="ing-tools"><input type="search" class="ing-search" placeholder="${esc(t.search)}" aria-label="${esc(t.search)}"><select class="ing-filter" aria-label="${esc(t.filter)}"></select></div><p class="ing-count" aria-live="polite">${esc(t.count(INGREDIENT_LIST.count.toLocaleString(LOCALE[lang])))}</p><ul class="ing-rows"><li class="ing-empty">${esc(t.loading)}</li></ul><button type="button" class="site-btn ing-more" hidden>${esc(t.more)}</button></div><div class="site-prose">${sectionsHtml(t.sections)}</div></div></article>`
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
    // De oude Gids is in het Nederlands en Engels opgegaan in de handleiding (vercel.json stuurt /gids door).
    if (p.id === 'guide' && GUIDE_HOME[lang]) continue;
    // Titel, beschrijving en kop: NL en EN hier in LEGACY, DE en ES in tools/site-pages-*.mjs.
    const meta =
      lang === 'nl' || lang === 'en'
        ? {
            title: p.title[lang === 'nl' ? 0 : 1],
            desc: p.desc[lang === 'nl' ? 0 : 1],
            h1: p.h1?.[lang === 'nl' ? 0 : 1]
          }
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
    if (p.id === 'pro') body += serviceTeaser(lang);
    // Vragenpagina: ook de vragen over de import service (komen zo ook in het FAQPage-schema).
    if (p.id === 'faq')
      body += SERVICE[lang].faqs
        .map(
          ([q, a]) => `<h2>${esc(q)}</h2>
<p>${esc(a)}</p>`
        )
        .join('');
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
      body: c =>
        pageTop(c, h1, lead, PAGE_PHOTO[p.nl]) +
        (p.id === 'pro' ? featureBand('pro', lang) + featureFacts('pro', lang) : '') +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose">${note ? `<p class="site-meta">${esc(note)}</p>` : ''}${body}</div></article>` +
        (p.id === 'pro' ? featureShow('pro', lang) : '')
    });
  }

  // ---- Handleiding en release notes (alleen NL en EN; alleen gelinkt vanuit de footer) ----
  if (GUIDE_HOME[lang]) {
    const gu = GUIDE_UI[lang];
    const home = GUIDE_HOME[lang];
    const pair = get => Object.fromEntries(Object.keys(GUIDE_HOME).map(l => [l, get(l)]));
    // Links in de tekst: [tekst](#pagina-id), [tekst](#pagina-id#kopje) of [tekst](/pad). Een onbekende pagina
    // laat de bouw stoppen, zodat er nooit een dode link in de handleiding staat.
    const anchorId = h =>
      h
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    // Elk onderwerp is een stuk van zijn hoofdstuk (id = pagina-id). Kopjes krijgen een id dat binnen het hoofdstuk
    // uniek is; kopjesIds onthoudt per onderwerp welk id bij welk kopje hoort.
    const chapterOf = new Map(GUIDE_CHAPTERS.flatMap(ch => ch.pages.map(g => [g.id, ch])));
    const headIds = new Map();
    for (const ch of GUIDE_CHAPTERS) {
      const used = new Set(ch.pages.map(g => g.id));
      for (const g of ch.pages) {
        const ids = new Map();
        for (const [h] of g[lang].sections) {
          let id = anchorId(h);
          for (let n = 2; used.has(id); n++) id = `${anchorId(h)}-${n}`;
          used.add(id);
          if (!ids.has(anchorId(h))) ids.set(anchorId(h), id);
        }
        headIds.set(g.id, ids);
      }
    }
    const chapterHref = (ch, l = lang) => href(ch.pages[0][l].slug);
    const guideHref = (g, anchor) => {
      const ch = chapterOf.get(g.id);
      if (anchor) return `${chapterHref(ch)}#${headIds.get(g.id).get(anchor) || anchor}`;
      return g === ch.pages[0] ? chapterHref(ch) : `${chapterHref(ch)}#${g.id}`;
    };
    const chapterName = (ch, l = lang) => (ch.own ? ch.pages[0][l].h1 : ch.group[l].name);
    const guideLink = target => {
      if (!target.startsWith('#')) return /^https?:/.test(target) ? target : localPath(target, lang);
      const [id, anchor] = target.slice(1).split('#');
      const to = GUIDE.find(g => g.id === id);
      if (!to) throw new Error(`Handleiding: onbekende link naar #${id}`);
      return guideHref(to, anchor);
    };
    const guideText = s =>
      esc(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, target) => {
        const to = guideLink(target);
        return /^https?:/.test(to) ? `<a href="${to}" rel="noopener">${label}</a>` : `<a href="${to}">${label}</a>`;
      });
    const guideSection = (g, [h, text, list]) =>
      `<h3 id="${headIds.get(g.id).get(anchorId(h)) || anchorId(h)}">${esc(h)}</h3>${String(text)
        .split('\n\n')
        .map(p => `<p>${guideText(p)}</p>`)
        .join('')}${list ? `<ul>${list.map(x => `<li>${guideText(x)}</li>`).join('')}</ul>` : ''}`;
    const chapterNav = current =>
      `<nav class="site-guide-toc" aria-label="${esc(gu.chapters)}"><h2>${esc(gu.chapters)}</h2><ol>${GUIDE_CHAPTERS.map(
        ch =>
          ch === current
            ? `<li aria-current="page"><b>${esc(chapterName(ch))}</b></li>`
            : `<li><a href="${chapterHref(ch)}">${esc(chapterName(ch))}</a></li>`
      ).join('')}</ol><a class="site-link" href="${href(home.slug)}">${esc(gu.allTopics)}</a></nav>`;
    page({
      lang,
      slugs: pair(l => GUIDE_HOME[l].slug),
      title: home.title,
      desc: home.desc,
      crumbs: [[home.h1]],
      body: c =>
        pageTop(c, home.h1, home.lead, 'bloemenveld') +
        `<article class="site-article"><div class="site-wrap site-narrow site-prose site-guide-home"><nav class="site-guide-jump" aria-label="${esc(gu.chapters)}">${GUIDE_CHAPTERS.map(
          ch => `<a href="#${ch.id}">${esc(chapterName(ch))}</a>`
        ).join('')}</nav>${GUIDE_CHAPTERS.map(
          ch =>
            `<section class="site-guide-group" id="${ch.id}"><h2><a href="${chapterHref(ch)}">${esc(chapterName(ch))}</a></h2><p>${guideText(ch.own ? ch.pages[0][lang].lead : ch.group[lang].intro)}</p><ul class="site-guide-list">${ch.pages
              .map(g => `<li><a href="${guideHref(g)}">${esc(g[lang].menu)}</a><span>${esc(g[lang].lead)}</span></li>`)
              .join('')}</ul></section>`
        ).join(
          ''
        )}<section class="site-guide-group"><h2>${esc(RELEASES_PAGE[lang].h1)}</h2><p>${esc(RELEASES_PAGE[lang].lead)} <a href="${href(RELEASES_PAGE[lang].slug)}">${esc(gu.open)}</a></p></section></div></article>`
    });
    // Titel: "Recepten importeren | Handleiding Savour", met hetzelfde achtervoegsel als de onderwerpen.
    const suffix = GUIDE_SUFFIX[lang];
    for (const [n, ch] of GUIDE_CHAPTERS.entries()) {
      const first = ch.pages[0][lang];
      const name = chapterName(ch);
      const intro = ch.own ? first.lead : ch.group[lang].intro;
      const prev = GUIDE_CHAPTERS[n - 1];
      const next = GUIDE_CHAPTERS[n + 1];
      // Wat voor elke app gelijk is (importeren, categorie), staat één keer vóór de apps.
      const shared = ch.pages.find(g => g.app)?.[lang].sections.filter(s => s[3] === 'shared') || [];
      const topic = g => {
        const t = g[lang];
        const own = t.sections.filter(s => s[3] !== 'shared');
        // Het eerste onderwerp van Overstappen is het hoofdstuk zelf: de kop en inleiding staan al bovenaan.
        const head = g === ch.pages[0] && ch.own ? '' : `<h2>${esc(t.h1)}</h2><p class="site-meta">${esc(t.lead)}</p>`;
        return `<section class="site-guide-topic" id="${g.id}">${head}${own.map(s => guideSection(g, s)).join('')}</section>`;
      };
      const firstApp = ch.pages.find(g => g.app);
      const sharedHtml = shared.length
        ? `<section class="site-guide-topic">${shared.map(s => guideSection(firstApp, s)).join('')}</section>`
        : '';
      const topics = ch.pages.map(g => (g === firstApp ? sharedHtml : '') + topic(g)).join('');
      const onPage =
        ch.pages.length > 1
          ? `<nav class="site-guide-onpage" aria-label="${esc(gu.onPage)}"><b>${esc(gu.onPage)}</b>${ch.pages
              .map(
                g =>
                  `<a href="${g === ch.pages[0] ? '#' + g.id : guideHref(g).replace(/^[^#]*/, '')}">${esc(g[lang].menu)}</a>`
              )
              .join('')}</nav>`
          : '';
      // Zie ook: onderwerpen uit andere hoofdstukken waar dit hoofdstuk naar verwijst.
      const relatedIds = [...new Set(ch.pages.flatMap(g => g.related || []))].filter(id => {
        if (!GUIDE.some(x => x.id === id)) throw new Error(`Handleiding: onbekende verwante pagina ${id}`);
        return chapterOf.get(id) !== ch;
      });
      const related = relatedIds.length
        ? `<aside class="site-guide-related"><h2>${esc(gu.related)}</h2><ul>${relatedIds
            .slice(0, 8)
            .map(id => {
              const to = GUIDE.find(x => x.id === id);
              return `<li><a href="${guideHref(to)}">${esc(to[lang].menu)}</a></li>`;
            })
            .join('')}</ul></aside>`
        : '';
      page({
        lang,
        slugs: pair(l => ch.pages[0][l].slug),
        title: `${name} | ${suffix}`,
        desc: first.desc,
        crumbs: [[home.h1, href(home.slug)], [name]],
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: name,
            description: first.desc,
            inLanguage: lang,
            about: { '@id': SITE + '/#app' },
            author: ORG,
            publisher: ORG,
            mainEntityOfPage: url(first.slug)
          }
        ],
        body: c =>
          pageTop(c, name, intro, BLOG_PHOTOS[n % BLOG_PHOTOS.length]) +
          `<article class="site-article"><div class="site-wrap site-narrow site-prose">${onPage}${topics}${related}<nav class="site-guide-pager">${
            prev
              ? `<a href="${chapterHref(prev)}"><small>← ${esc(gu.prev)}</small>${esc(chapterName(prev))}</a>`
              : `<a href="${href(home.slug)}"><small>←</small>${esc(gu.overview)}</a>`
          }${next ? `<a class="next" href="${chapterHref(next)}"><small>${esc(gu.next)} →</small>${esc(chapterName(next))}</a>` : ''}</nav>${chapterNav(ch)}</div></article>`
      });
    }
    // Release notes over meerdere bladzijden, zoals het blog: RELEASES_PER_PAGE versies per bladzijde, nieuwste eerst.
    // Bladzijde 2 en verder: release-notes-pagina-2 (één deel, dus de gewone rewrite voor losse pagina's geldt).
    const rp = RELEASES_PAGE[lang];
    const rPages = Math.ceil(RELEASES.length / RELEASES_PER_PAGE);
    const rSlugs = i =>
      pair(l => (i ? `${RELEASES_PAGE[l].slug}-${BLOG_PAGE_WORD[l]}-${i + 1}` : RELEASES_PAGE[l].slug));
    for (let i = 0; i < rPages; i++) {
      const list = RELEASES.slice(i * RELEASES_PER_PAGE, (i + 1) * RELEASES_PER_PAGE);
      const pageLink = j => href(rSlugs(j)[lang]);
      const pager = `<nav class="site-pager" aria-label="${esc(rp.h1)}">${i ? `<a class="site-pager-step" href="${pageLink(i - 1)}" rel="prev">← ${esc(BLOG_PAGER[lang].newer)}</a>` : '<span></span>'}<span class="site-pager-pages">${Array.from(
        { length: rPages },
        (_, j) => (j === i ? `<span aria-current="page">${j + 1}</span>` : `<a href="${pageLink(j)}">${j + 1}</a>`)
      ).join(
        ''
      )}</span>${i < rPages - 1 ? `<a class="site-pager-step" href="${pageLink(i + 1)}" rel="next">${esc(BLOG_PAGER[lang].older)} →</a>` : '<span></span>'}</nav>`;
      page({
        lang,
        slugs: rSlugs(i),
        title: i ? `${rp.title} · ${BLOG_PAGER[lang].page} ${i + 1}` : rp.title,
        desc: rp.desc,
        crumbs: i ? [[rp.h1, href(rp.slug)], [`${BLOG_PAGER[lang].page} ${i + 1}`]] : [[rp.h1]],
        body: c =>
          pageTop(c, i ? `${rp.h1} · ${BLOG_PAGER[lang].page} ${i + 1}` : rp.h1, rp.lead, 'hout') +
          `<article class="site-article"><div class="site-wrap site-narrow site-prose site-releases">${releaseList(list, lang, gu)}${rPages > 1 ? pager : ''}</div></article>`
      });
    }
  }
}
function releaseList(list, lang, gu) {
  return `${list
    .map(
      r =>
        `<section id="v${esc(r.version)}"><h2>${esc(gu.version)} ${esc(r.version)}</h2><p class="site-meta">${new Date(r.date).toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric' })}</p><ul>${r[lang].map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`
    )
    .join('')}`;
}

// ---- Doorverwijzingen voor de handleiding ----
// Elk onderwerp staat nu in zijn hoofdstuk. Het oude adres van een losse pagina stuurt (301) door naar dat stuk, en
// de oude map in site/ gaat weg. Handmatige doorverwijzingen in vercel.json blijven staan.
{
  const moves = GUIDE_CHAPTERS.flatMap(ch =>
    ch.pages.slice(1).flatMap(g =>
      Object.keys(GUIDE_HOME).map(l => ({
        source: href(g[l].slug),
        destination: `${href(ch.pages[0][l].slug)}#${g.id}`,
        permanent: true
      }))
    )
  );
  const file = new URL('vercel.json', ROOT);
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  const sources = new Set(moves.map(m => m.source));
  config.redirects = [...config.redirects.filter(r => !sources.has(r.source)), ...moves];
  fs.writeFileSync(file, JSON.stringify(config, null, 2) + '\n', 'utf8');
  for (const m of moves) fs.rmSync(new URL(`site${m.source}/`, ROOT), { recursive: true, force: true });
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
    ogDesc:
      'From scribbled note to a recipe that works. Your whole recipe book in one place, on computer and phone, shared with your kitchen team.',
    locale: 'en_GB'
  },
  de: {
    title: 'Savour — Rezepturverwaltung für Köche: Rezepte organisieren und teilen',
    desc: 'Rezepturverwaltung für Restaurant und Großküche: alle Rezepte aus Word, PDF und handschriftlichen Notizen importieren, mit dem Küchenteam teilen und ganze Ordner drucken.',
    ogTitle: 'Savour — Rezeptverwaltung für Profiküchen',
    ogDesc:
      'Von der Notiz zum Rezept, das stimmt. Dein ganzes Rezeptbuch an einem Ort, auf Computer und Handy, geteilt mit deinem Küchenteam.',
    locale: 'de_DE'
  },
  es: {
    title: 'Savour — app de recetas para chefs: organiza y comparte recetas',
    desc: 'Organiza todas tus recetas en una app: importa de Word, PDF y notas a mano, compártelas con tu equipo de cocina e imprime carpetas enteras. Pruébalo gratis.',
    ogTitle: 'Savour — gestión de recetas para cocinas profesionales',
    ogDesc:
      'De la nota a una receta que funciona. Todo tu recetario en un solo sitio, en ordenador y móvil, compartido con tu equipo de cocina.',
    locale: 'es_ES'
  },
  fr: {
    title: 'Savour — application de recettes pour chefs : organiser et partager',
    desc: 'Organise toutes tes recettes dans une application : importe Word, PDF et notes manuscrites, partage-les avec ton équipe et imprime des dossiers entiers.',
    ogTitle: 'Savour — gestion des recettes pour cuisines professionnelles',
    ogDesc:
      'De la note griffonnée à la recette qui fonctionne. Tout ton livre de recettes au même endroit, sur ordinateur et téléphone, partagé avec ton équipe de cuisine.',
    locale: 'fr_FR'
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
        mainEntity: HOME[lang].faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a }
        }))
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
  for (const lang of ['en', 'de', 'es', 'fr']) {
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
    swap(/<title>[^<]*<\/title>/, `<title>${esc(fitTitle(m.title))}</title>`);
    swap(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(fitDesc(m.desc))}">`);
    swap(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${home}">`);
    swap(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(m.ogTitle)}">`);
    if (lang === 'en')
      swap(
        /<meta property="og:image" content="[^"]*">/,
        `<meta property="og:image" content="${SITE}/assets/savour-og-en.png?v=2">`
      );
    swap(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${esc(m.ogDesc)}">`
    );
    swap(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${home}">`);
    swap(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${m.locale}">`);
    x = withFaq(x, lang);
    x = x.replace(
      '<!doctype html>',
      `<!doctype html>\n<!-- Gemaakt door tools/build-seo.mjs uit index.html: startpagina in het ${lang.toUpperCase()}. Niet met de hand aanpassen. -->`
    );
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
        `- [${p.en.title}](${url(p.en.slug)}) · [NL](${url(p.nl.slug)}) · [DE](${url(p.de.slug)}) · [ES](${url(p.es.slug)}) · [FR](${url(p.fr.slug)})`
    ).join('\n') +
    '\n\n';
  if (/## Blog\n[\s\S]*?(?=## )/.test(t)) t = t.replace(/## Blog\n[\s\S]*?(?=## )/, () => blog);
  else t = t.replace('## Company', () => blog + '## Company');
  fs.writeFileSync(file, t, 'utf8');
}

// ---- Sitemap ----
// lastmod is de dag waarop de tekst van een pagina echt veranderde, niet de dag van het bouwen: zoekmachines
// negeren een datum die bij elke bouwronde verspringt. Per pagina bewaren we een vingerafdruk van de inhoud
// (zonder versienummers en witruimte) in tools/sitemap-datums.json; alleen bij een andere afdruk komt er een nieuwe datum.
const today = new Date().toISOString().slice(0, 10);
const DATES_FILE = new URL('tools/sitemap-datums.json', ROOT);
const dates = fs.existsSync(DATES_FILE) ? JSON.parse(fs.readFileSync(DATES_FILE, 'utf8')) : {};
const { createHash: sitemapHash } = await import('node:crypto');
const lastmod = (loc, file, onlySite) => {
  let t = read(file);
  // Startpagina's: alleen de kop en de startpagina zelf; de app eronder verandert los van de tekst.
  if (onlySite) t = t.slice(0, t.indexOf('</head>')) + (t.match(/<!-- SITE:START[\s\S]*?<!-- SITE:END -->/) || [''])[0];
  const print = sitemapHash('sha1')
    .update(t.replace(/\?v=[^"'&\s)]*/g, '').replace(/\s+/g, ''))
    .digest('hex')
    .slice(0, 16);
  if (dates[loc]?.hash !== print) dates[loc] = { hash: print, date: today };
  return dates[loc].date;
};
const homeAlts = [
  ['nl', SITE + '/'],
  ['en', SITE + '/en'],
  ['de', SITE + '/de'],
  ['es', SITE + '/es'],
  ['fr', SITE + '/fr'],
  ['x-default', SITE + '/']
];
const entry = (loc, alts, priority, date) =>
  `  <url><loc>${loc}</loc>${alts.map(([l, h]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${h}"/>`).join('')}<lastmod>${date}</lastmod><priority>${priority}</priority></url>`;
const low =
  /\/((en|de|es|fr)\/)?(voorwaarden|terms|privacy|contact|agb|datenschutz|kontakt|terminos|privacidad|contacto|conditions|confidentialite)$/;
const urls = [
  ...homeAlts
    .slice(0, 5)
    .map(([l, h], n) =>
      entry(h, homeAlts, n ? '0.8' : '1.0', lastmod(h, l === 'nl' ? 'index.html' : `site/index-${l}.html`, true))
    ),
  ...sitemap.map(s => entry(s.loc, s.alternates, low.test(s.loc) ? '0.3' : '0.7', lastmod(s.loc, s.file)))
];
fs.writeFileSync(
  DATES_FILE,
  JSON.stringify(
    Object.fromEntries(Object.entries(dates).filter(([loc]) => urls.some(u => u.includes(`<loc>${loc}</loc>`)))),
    null,
    1
  ) + '\n',
  'utf8'
);
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
