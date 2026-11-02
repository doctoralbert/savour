// Handleiding (user guide) en release notes voor de publieke site, in het Nederlands en Engels. Alleen gelinkt
// vanuit de footer (kolommen Hulp en Savour). tools/build-seo.mjs maakt er losse pagina's van (/handleiding,
// /en/user-guide, ...). Een sectie is [kop, tekst] of [kop, tekst, [opsomming]]. Beschrijf alleen wat de app echt doet.
import * as start from './handleiding/start.mjs';
import * as importeren from './handleiding/importeren.mjs';
import * as recepten from './handleiding/recepten.mjs';
import * as ordenen from './handleiding/ordenen.mjs';
import * as keuken from './handleiding/keuken.mjs';
import * as printen from './handleiding/printen.mjs';
import * as samenwerken from './handleiding/samenwerken.mjs';
import * as account from './handleiding/account.mjs';
import * as tips from './handleiding/tips.mjs';
import { appPageLang } from './handleiding/importeren.mjs';
import { TALEN, RELEASES_TALEN } from './handleiding/talen.mjs';
import { OVERLAY as DE } from './handleiding/de/index.mjs';
import { OVERLAY as ES } from './handleiding/es/index.mjs';
import { OVERLAY as FR } from './handleiding/fr/index.mjs';

// Talen met een eigen vertaling van alle pagina's (tools/handleiding/{de,es,fr}). Ontbreekt een pagina, dan stopt de bouw.
const OVERLAYS = { de: DE, es: ES, fr: FR };

export const GUIDE_UI = {
  nl: {
    footer: 'Handleiding',
    releases: 'Release notes',
    chapters: 'Hoofdstukken',
    prev: 'Vorige',
    next: 'Volgende',
    overview: 'Overzicht handleiding',
    open: 'Lees verder',
    inGroup: 'In dit onderdeel:',
    allTopics: 'Alle onderwerpen van de handleiding',
    onPage: 'Op deze pagina',
    related: 'Zie ook',
    version: 'Versie'
  },
  en: {
    footer: 'User guide',
    releases: 'Release notes',
    chapters: 'Chapters',
    prev: 'Previous',
    next: 'Next',
    overview: 'User guide overview',
    open: 'Read more',
    inGroup: 'In this section:',
    allTopics: 'All topics in the user guide',
    onPage: 'On this page',
    related: 'See also',
    version: 'Version'
  },
  ...Object.fromEntries(Object.entries(TALEN).map(([l, t]) => [l, t.ui]))
};

export const GUIDE_HOME = {
  nl: {
    slug: 'handleiding',
    title: 'Handleiding Savour: zo werk je met de receptenapp voor koks',
    desc: 'De complete handleiding van Savour: recepten importeren uit Word, PDF en foto’s, bewerken, ordenen, omrekenen, kookmodus, printen, delen en keukenteams.',
    h1: 'Handleiding',
    lead: 'Alles over werken met Savour, stap voor stap: van je eerste import en overstappen vanuit een andere app tot een keukenteam dat uit dezelfde recepten werkt.'
  },
  en: {
    slug: 'en/user-guide',
    title: 'Savour user guide: how to use the recipe app for chefs',
    desc: 'The complete Savour user guide: import recipes from Word, PDF and photos, edit, organise, scale, cook mode, print, share and kitchen teams.',
    h1: 'User guide',
    lead: 'Everything about working with Savour, step by step: from your first import to a kitchen team cooking from the same recipes.'
  },
  ...Object.fromEntries(Object.entries(TALEN).map(([l, t]) => [l, t.home]))
};

// De pagina's staan per onderdeel in tools/handleiding/*.mjs. Volgorde hier = volgorde in het overzicht en
// van vorige/volgende. Links in de tekst: [tekst](#pagina-id) of [tekst](/pad); build-seo controleert ze.
const MODULES = [start, importeren, recepten, ordenen, keuken, printen, samenwerken, account, tips];

export const GUIDE_GROUPS = [...MODULES.map(m => m.group), tips.helpGroup].map(gr => {
  const out = { ...gr };
  for (const [lang, o] of Object.entries(OVERLAYS)) {
    if (!o.groups[gr.id]) throw new Error(`Handleiding ${lang}: onderdeel ${gr.id} ontbreekt`);
    out[lang] = o.groups[gr.id];
  }
  return out;
});

const SUFFIX = { nl: 'Handleiding Savour', en: 'Savour user guide', ...Object.fromEntries(Object.entries(TALEN).map(([l, t]) => [l, t.titleSuffix])) };

const withDefaults = (p, group) => {
  const out = { ...p, group: p.group || group };
  for (const [lang, o] of Object.entries(OVERLAYS)) {
    if (p.app) {
      const t = o.apps[p.id];
      if (!t) throw new Error(`Handleiding ${lang}: app-pagina ${p.id} ontbreekt`);
      out[lang] = appPageLang(TALEN[lang].app, p.app.name, p.app.slug, t);
    } else {
      if (!o.pages[p.id]) throw new Error(`Handleiding ${lang}: pagina ${p.id} ontbreekt`);
      out[lang] = o.pages[p.id];
    }
  }
  for (const lang of Object.keys(SUFFIX)) {
    const t = { ...out[lang] };
    t.h1 ||= t.menu;
    t.title ||= `${t.h1} | ${SUFFIX[lang]}`;
    out[lang] = t;
  }
  return out;
};

export const GUIDE = GUIDE_GROUPS.flatMap(gr =>
  MODULES.flatMap(m => m.pages.map(p => withDefaults(p, m.group.id))).filter(p => p.group === gr.id)
);

// Release notes: nieuwste bovenaan. Alleen wat gebruikers merken; versienummer major.minor.patch.
export const RELEASES_PAGE = {
  nl: {
    slug: 'release-notes',
    title: 'Release notes: wat is er nieuw in Savour',
    desc: 'Alle versies van Savour met wat er per versie nieuw of verbeterd is: importeren, omrekenen, keukenteams, printen, delen en meer.',
    h1: 'Release notes',
    lead: 'Wat er per versie nieuw is in Savour. De nieuwste versie staat bovenaan.'
  },
  en: {
    slug: 'en/release-notes',
    title: 'Release notes: what’s new in Savour',
    desc: 'Every Savour version and what is new or improved in it: importing, scaling, kitchen teams, printing, sharing and more.',
    h1: 'Release notes',
    lead: 'What’s new in each version of Savour. The latest version is at the top.'
  },
  ...Object.fromEntries(Object.entries(TALEN).map(([l, t]) => [l, t.releasesPage]))
};

const RELEASES_NL_EN = [
  {
    version: '3.7.0',
    date: '2026-11-02',
    nl: [
      'Overstappen uit nog meer recepten-apps: Mela, Cookmate, Living Cookbook, Evernote, Google Keep, Flavorish en CookBookManager. Foto’s en kopjes gaan mee.',
      'Een zip met Word-, PDF-, tekst- of Markdown-bestanden, of alleen foto’s, wordt in één keer gelezen.',
      'Een uitgebreide handleiding met een pagina per onderwerp en per recepten-app.'
    ],
    en: [
      'Move from even more recipe apps: Mela, Cookmate, Living Cookbook, Evernote, Google Keep, Flavorish and CookBookManager. Photos and headings come along.',
      'A zip with Word, PDF, text or Markdown files, or only photos, is read in one go.',
      'An extensive user guide with a page per topic and per recipe app.'
    ]
  },
  {
    version: '3.6.0',
    date: '2026-11-01',
    nl: [
      'Keukenteams: één receptenboek voor je brigade, met een eigen startpagina met mappen en bibliotheek, print- en instellingenknop.',
      'Recepten in delen, zoals deeg, vulling en saus, elk met eigen ingrediënten en bereiding.',
      'Notities bij een recept en koppelingen van een ingrediënt naar een basisrecept.',
      'Omrekenen uitgebreid: eigen factor, gewenste opbrengst of “Ik heb” in één venster, snelknoppen van ¼× tot 10×.',
      'Een hele receptenmap printen, en Savour Pro voor iedereen in een organisatie.',
      'Savour in het Frans: de app en de hele site.',
      'Welkomstscherm met een startlijst en voorbeeldrecepten voor nieuwe gebruikers.',
      'De Savour-lezer leert van de notities van koks, en recepten worden nooit meer dubbel opgeslagen.',
      'Telefoon: recept en keukenteam compacter.',
      'Advertenties in de app voor accounts zonder Pro.'
    ],
    en: [
      'Kitchen teams: one recipe book for your brigade, with its own start page with folders and library, plus print and settings buttons.',
      'Recipes in parts, such as dough, filling and sauce, each with its own ingredients and method.',
      'Notes on a recipe and links from an ingredient to a base recipe.',
      'More scaling: your own factor, a target yield or “I have” in one window, with quick buttons from ¼× to 10×.',
      'Print a whole recipe folder, and Savour Pro for everyone in an organisation.',
      'Savour in French: the app and the whole site.',
      'A welcome screen with a checklist and example recipes for new users.',
      'The Savour reader learns from chefs’ notes, and recipes are never saved twice.',
      'Phone: recipe and kitchen team pages are more compact.',
      'Ads in the app for accounts without Pro.'
    ]
  },
  {
    version: '3.5.0',
    date: '2026-10-27',
    nl: [
      'Import service: de koks achter Savour zetten je hele receptenmap voor je over, met aanvragen, betalen en aanleveren op de site.',
      'Abonnementen voor organisaties van 5, 10 en 25 mensen.',
      'Alleen de eigenaar haalt mensen uit een gedeelde map.'
    ],
    en: [
      'Import service: the chefs behind Savour move your whole recipe folder over for you, with requesting, paying and uploading on the site.',
      'Plans for organisations of 5, 10 and 25 people.',
      'Only the owner can remove people from a shared folder.'
    ]
  },
  {
    version: '3.4.0',
    date: '2026-10-26',
    nl: [
      'Omrekenen met eenheden: van theelepels naar eetlepels, van kilo naar gram, met nette breuken.',
      'Importeren van een webpagina en uit andere recepten-apps zoals Paprika, Mealie en Tandoor.',
      'Openbare receptlinks met een tijdslimiet, en een link uitzetten.',
      'Omrekenen en kookmodus ook voor wie een gedeeld recept opent zonder account.',
      'Delen via sms, en een knop voor het lichte of donkere thema.',
      'De Savour-lezer leest ook oude .doc-bestanden.',
      'Wachtwoord vergeten en inloggen met een nog niet bevestigd e-mailadres werken duidelijker.'
    ],
    en: [
      'Scaling with units: from teaspoons to tablespoons, from kilos to grams, with clean fractions.',
      'Import from a web page and from other recipe apps such as Paprika, Mealie and Tandoor.',
      'Public recipe links with a time limit, and turning a link off.',
      'Scaling and cook mode also for people who open a shared recipe without an account.',
      'Sharing by SMS, and a button for the light or dark theme.',
      'The Savour reader also reads old .doc files.',
      'Forgotten passwords and logging in with an unconfirmed email address work more clearly.'
    ]
  },
  {
    version: '3.3.0',
    date: '2026-10-25',
    nl: [
      'Recept overnemen: de maker kan ontvangers toestaan een gedeeld recept aan hun eigen recepten toe te voegen, ook voor een beperkte tijd.',
      'Gedeelde mappen: mappen beheren, archiveren en recepten van collega’s overnemen.',
      'Uitleg per scherm met het i-knopje.',
      'Downloaden als echt Word-bestand (.docx) met Savour Pro.',
      'Nieuwe printopmaak met vette hoeveelheden en een compacte inhoudsopgave.',
      'Een collega uitnodigen met Pro als cadeau.',
      'Een gedeeld recept heeft een eigen voorbeeldplaatje in WhatsApp.'
    ],
    en: [
      'Copying recipes: the maker can allow recipients to add a shared recipe to their own recipes, also for a limited time.',
      'Shared folders: manage and archive folders, and copy colleagues’ recipes.',
      'An explanation for every screen behind the i button.',
      'Download as a real Word file (.docx) with Savour Pro.',
      'A new print layout with bold quantities and a compact table of contents.',
      'Invite a colleague and get Pro as a thank-you.',
      'A shared recipe has its own preview image in WhatsApp.'
    ]
  },
  {
    version: '3.2.0',
    date: '2026-10-24',
    nl: [
      'Printen met het logo van je restaurant (Savour Pro en teams).',
      'Zelf kiezen welke recepten je print.',
      'Terug uit een recept kom je weer op dezelfde plek in de lijst.'
    ],
    en: [
      'Printing with your restaurant’s logo (Savour Pro and teams).',
      'Choose which recipes to print.',
      'Coming back from a recipe returns you to the same place in the list.'
    ]
  },
  {
    version: '3.1.0',
    date: '2026-10-23',
    nl: [
      'Offline werken: recepten die je hebt geopend, blijven beschikbaar zonder internet.',
      'Het originele kladje blijft bewaard bij een recept dat van een foto is gelezen.',
      'Camera voor kladjes direct in de app (Savour Pro).',
      'Sneller opstarten.'
    ],
    en: [
      'Working offline: recipes you have opened stay available without internet.',
      'The original note is kept with a recipe that was read from a photo.',
      'A camera for notes right in the app (Savour Pro).',
      'Faster start-up.'
    ]
  },
  {
    version: '3.0.0',
    date: '2026-10-21',
    nl: [
      'Savour 3.0: een nieuwe, opnieuw ontworpen versie met een nieuwe receptpagina.',
      'De Savour-lezer opnieuw gebouwd en getest op echte receptenbestanden; PDF-import werkt.',
      'Savour Pro: onbeperkt recepten en AI voor foto’s en twijfelgevallen; gratis tot 100 recepten.',
      'Engels, Duits en Spaans met een taalknop bovenin.',
      'Categorieën voorstellen op basis van trefwoorden in de receptnaam, met een standaardlijst voor de keuken.',
      'Dubbele recepten opschonen in Instellingen.',
      'Samenwerken in gedeelde mappen.'
    ],
    en: [
      'Savour 3.0: a new, redesigned version with a new recipe page.',
      'The Savour reader rebuilt and tested on real recipe files; PDF import works.',
      'Savour Pro: unlimited recipes and AI for photos and doubtful recipes; free up to 100 recipes.',
      'English, German and Spanish with a language button at the top.',
      'Suggested categories based on keywords in the recipe name, with a default list for kitchens.',
      'Clean up duplicate recipes in Settings.',
      'Working together in shared folders.'
    ]
  }
];

// Elke versie ook in het Duits, Spaans en Frans (tools/handleiding/talen.mjs).
export const RELEASES = RELEASES_NL_EN.map(r => {
  const t = RELEASES_TALEN[r.version];
  if (!t) throw new Error(`Release notes ${r.version}: vertaling ontbreekt`);
  return { ...r, ...t };
});
