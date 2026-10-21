// Talen: Nederlands (basis), Engels, Duits en Spaans.
//
// De app is in het Nederlands geschreven. Kiest de gebruiker een andere taal, dan wordt de woordenlijst
// voor die taal geladen (js/i18n/<taal>.js) en vertaalt deze vertaler alle zichtbare interfaceteksten op
// het moment dat ze op het scherm komen. Recepten, ingrediënten en namen die de gebruiker zelf invoert
// staan niet in de woordenlijst en blijven dus zoals ze zijn. Een element met translate="no" wordt altijd
// overgeslagen.

const I18N_LANGUAGES = { nl: 'Nederlands', en: 'English', de: 'Deutsch', es: 'Español' };
const I18N_ATTRIBUTES = ['placeholder', 'title', 'aria-label', 'alt'];
let currentLanguage = 'nl';
let i18nDictionary = null; // { strings: Map, patterns: [[RegExp, vervanging]] }
let i18nObserver = null;
const i18nTextState = new WeakMap(); // tekstknoop -> { original, shown }

function getSavedLanguage() {
  try {
    // savour.page/en of /eng opent direct in het Engels (zo ook /de, /deu, /es, /esp, /nl, /nld).
    const aliases = { eng: 'en', english: 'en', deu: 'de', esp: 'es', nld: 'nl' };
    const part = location.pathname.match(/^\/([a-z]{2,7})\/?$/i)?.[1]?.toLowerCase();
    const fromPath = part && (aliases[part] || part);
    const saved = (I18N_LANGUAGES[fromPath] && fromPath) || localStorage.getItem('savour_lang') || 'nl';
    return I18N_LANGUAGES[saved] ? saved : 'nl';
  } catch (e) {
    return 'nl';
  }
}

// Vertaalt één tekst; geeft null als er geen vertaling is.
function translateText(text) {
  if (!i18nDictionary || currentLanguage === 'nl') return null;
  // Een zacht afbreekstreepje (&shy;) hoort niet bij de tekst zelf.
  const key = String(text).replace(/­/g, '').replace(/\s+/g, ' ').trim();
  if (!key) return null;
  const direct = i18nDictionary.strings.get(key);
  if (direct) return direct;
  for (const [re, replacement] of i18nDictionary.patterns) {
    if (re.test(key)) return key.replace(re, replacement);
  }
  return null;
}

function isTranslatable(node) {
  const el = node.nodeType === 1 ? node : node.parentElement;
  return !el || !el.closest('[translate="no"], script, style, textarea, code');
}

function translateTextNode(node) {
  const state = i18nTextState.get(node);
  // Heeft de app de tekst zelf veranderd, dan is dat de nieuwe Nederlandse brontekst.
  const original = state && node.nodeValue === state.shown ? state.original : node.nodeValue;
  const translated = currentLanguage === 'nl' ? null : translateText(original);
  const shown = translated ? original.replace(original.trim(), translated) : original;
  i18nTextState.set(node, { original, shown });
  if (node.nodeValue !== shown) node.nodeValue = shown;
}

function translateAttributes(el) {
  for (const attr of I18N_ATTRIBUTES) {
    if (!el.hasAttribute(attr)) continue;
    const store = `i18n${attr.replace(/-(.)/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase())}`;
    // In het Nederlands hoeft alleen een eerder vertaald attribuut terug.
    if (currentLanguage === 'nl' && el.dataset[store] === undefined) continue;
    const current = el.getAttribute(attr);
    const original =
      el.dataset[store] !== undefined && current === el.dataset[store + 'Shown'] ? el.dataset[store] : current;
    const translated = currentLanguage === 'nl' ? null : translateText(original);
    const shown = translated || original;
    el.dataset[store] = original;
    el.dataset[store + 'Shown'] = shown;
    if (current !== shown) el.setAttribute(attr, shown);
  }
}

function translateTree(root) {
  if (!root || (root.nodeType === 1 && !isTranslatable(root))) return;
  if (root.nodeType === 3) {
    if (isTranslatable(root)) translateTextNode(root);
    return;
  }
  if (root.nodeType === 1) translateAttributes(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: n =>
      n.nodeType === 1 && n.matches('[translate="no"], script, style, textarea, code')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeType === 3) {
      if (n.nodeValue.trim()) translateTextNode(n);
    } else translateAttributes(n);
  }
}

function startI18nObserver() {
  if (i18nObserver) return;
  i18nObserver = new MutationObserver(mutations => {
    if (currentLanguage === 'nl' && !i18nDictionary) return;
    for (const m of mutations) {
      if (m.type === 'childList') m.addedNodes.forEach(n => translateTree(n));
      else if (m.type === 'characterData') {
        const state = i18nTextState.get(m.target);
        if (!state || m.target.nodeValue !== state.shown) translateTree(m.target);
      } else if (m.type === 'attributes') {
        const el = m.target;
        const store = `i18n${m.attributeName.replace(/-(.)/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase())}`;
        if (el.getAttribute(m.attributeName) !== el.dataset[store + 'Shown']) translateAttributes(el);
      }
    }
  });
  i18nObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: I18N_ATTRIBUTES
  });
}

function loadDictionary(lang) {
  window.SAVOUR_I18N = window.SAVOUR_I18N || {};
  if (window.SAVOUR_I18N[lang]) return Promise.resolve(window.SAVOUR_I18N[lang]);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `/js/i18n/${lang}.js`;
    s.onload = () => resolve(window.SAVOUR_I18N[lang]);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Wisselt van taal en vertaalt de hele pagina opnieuw.
async function setLanguage(lang) {
  if (!I18N_LANGUAGES[lang]) lang = 'nl';
  try {
    if (lang !== 'nl') {
      const raw = await loadDictionary(lang);
      i18nDictionary = {
        strings: new Map(Object.entries(raw.strings)),
        patterns: raw.patterns.map(([re, rep]) => [new RegExp(re), rep])
      };
    }
  } catch (e) {
    console.error('Taal kon niet worden geladen:', e);
    lang = 'nl';
  }
  currentLanguage = lang;
  if (lang === 'nl') i18nDictionary = null;
  try {
    localStorage.setItem('savour_lang', lang);
  } catch (e) {}
  document.documentElement.lang = lang;
  startI18nObserver();
  translateTree(document.body);
  const title = document.querySelector('title');
  if (title) {
    title.dataset.i18nOriginal = title.dataset.i18nOriginal || title.textContent;
    title.textContent = translateText(title.dataset.i18nOriginal) || title.dataset.i18nOriginal;
  }
  renderLanguageSwitches();
  document.documentElement.classList.remove('i18n-loading');
}

// Taalknop (NL/EN/DE/ES) op alle plekken met [data-lang-switch].
function renderLanguageSwitches() {
  document.querySelectorAll('[data-lang-switch]').forEach(host => {
    host.innerHTML = `<details class="lang-menu"><summary aria-label="Taal / Language" title="Taal / Language" translate="no">${currentLanguage.toUpperCase()}</summary><div class="lang-options" translate="no">${Object.entries(
      I18N_LANGUAGES
    )
      .map(
        ([code, name]) =>
          `<button type="button" class="${code === currentLanguage ? 'is-on' : ''}" onclick="setLanguage('${code}')"><span>${code.toUpperCase()}</span>${name}</button>`
      )
      .join('')}</div></details>`;
  });
}
