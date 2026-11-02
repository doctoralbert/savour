// Recepten importeren vanaf een webpagina en uit andere recepten-apps.
// - Webpagina: api/import-url.js haalt de pagina op; de meeste receptensites zetten het recept in vaste vorm
//   (schema.org Recipe) in de pagina. Anders leest de Savour-lezer de tekst.
// - Andere apps: Paprika (.paprikarecipes, .paprikarecipe), Mela (.melarecipes, .melarecipe), Mealie, Tandoor en
//   Flavorish (.zip met JSON), Recipe Keeper en Copy Me That (.zip of .html), Crouton (.crumb), MasterCook (.mx2, .mxp),
//   Cookmate (.mcb), Living Cookbook (.fdx, .fdxz), Evernote (.enex), CookBookManager (.zip met .yml), Plan to Eat en
//   andere (.csv), en elk JSON- of HTML-bestand met schema.org-recepten.
// - Een zip met losse documenten (Word, PDF, tekst) of foto's: elk bestand wordt gelezen alsof het los gekozen was.
// Alles komt in het controlescherm; er wordt niets opgeslagen voordat de chef op Opslaan klikt, en niets verzonnen.

// ---- Eén recept in vaste vorm naar een Savour-concept ----

function plainText(value) {
  const s = String(value ?? '');
  if (!/[<&]/.test(s)) return s.replace(/[ \t\r]+/g, ' ').trim();
  const doc = new DOMParser().parseFromString(`<div>${s.replace(/<br\s*\/?>/gi, '\n')}</div>`, 'text/html');
  return doc.body.textContent.replace(/[ \t]+/g, ' ').trim();
}

function textLines(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.flatMap(textLines);
  if (typeof value === 'object') return textLines(value.text ?? value.name ?? '');
  return plainText(value)
    .split(/\n+/)
    .map(l => l.trim())
    .filter(Boolean);
}

// Eenheden zoals Crouton ze opslaat.
const CROUTON_UNITS = {
  GRAMS: 'g',
  KGS: 'kg',
  MILLS: 'ml',
  LITERS: 'l',
  CUP: 'cup',
  TABLESPOON: 'tbsp',
  TEASPOON: 'tsp',
  POUND: 'lb',
  OUNCE: 'oz',
  FLUID_OUNCE: 'fl oz',
  PINCH: 'pinch',
  CAN: 'can',
  BUNCH: 'bunch'
};

// Ingrediënten: tekstregels, of objecten zoals in Mealie, Tandoor en Crouton (hoeveelheid, eenheid, product, notitie).
function structuredIngredients(value) {
  if (value == null) return [];
  if (typeof value === 'string') return textLines(value);
  if (!Array.isArray(value)) return structuredIngredients([value]);
  return value.flatMap(item => {
    if (item == null) return [];
    if (typeof item === 'string') return textLines(item);
    if (Array.isArray(item)) return structuredIngredients(item);
    const direct = item.text || item.original_text || item.originalText || item.display || item.raw || item.title;
    if (direct && typeof direct === 'string') return textLines(direct);
    const amount = item.quantity?.amount ?? item.amount ?? (typeof item.quantity === 'number' ? item.quantity : '');
    const unit =
      item.unit?.name ??
      item.unit?.abbreviation ??
      (typeof item.unit === 'string' ? item.unit : null) ??
      CROUTON_UNITS[item.quantity?.quantityType] ??
      '';
    const food = item.food?.name ?? item.ingredient?.name ?? item.name ?? item.product ?? '';
    const note = item.note ?? item.notes ?? item.comment ?? '';
    const hasMain = (amount && amount !== 0) || unit || food;
    const line = [amount && amount !== 0 ? amount : '', unit, food, note ? (hasMain ? `(${note})` : note) : '']
      .map(x => String(x || '').trim())
      .filter(Boolean)
      .join(' ');
    return line ? [plainText(line)] : [];
  });
}

// Bereiding: tekst, een lijst stappen (HowToStep), of secties met stappen (HowToSection), zoals op receptensites.
function structuredSteps(value) {
  if (value == null) return [];
  if (typeof value === 'string') {
    // Zonder lookbehind (oudere Safari op iPhone kent die niet): eerst ". 2) " omzetten naar een nieuwe regel.
    return plainText(value)
      .replace(/\.\s+(?=\d+[.)]\s)/g, '.\n')
      .split(/\n+/)
      .map(l => l.replace(/^\s*(?:stap\s*)?\d+[.)]\s*/i, '').trim())
      .filter(Boolean);
  }
  if (!Array.isArray(value)) value = [value];
  return value.flatMap(item => {
    if (item == null) return [];
    if (typeof item === 'string') return structuredSteps(item);
    const type = [].concat(item['@type'] || []).join(' ');
    if (/HowToSection/i.test(type) || (item.itemListElement && !item.text)) {
      const inner = structuredSteps(item.itemListElement || item.steps || []);
      return item.name ? [`${plainText(item.name).replace(/:$/, '')}:`, ...inner] : inner;
    }
    const text = item.text ?? item.instruction ?? item.step ?? item.description ?? item.name ?? '';
    return structuredSteps(String(text));
  });
}

function structuredYield(value) {
  if (value == null || value === '') return '';
  if (Array.isArray(value)) {
    const withNumber = value.map(v => plainText(v)).find(v => /\d/.test(v) && /\D/.test(v));
    return withNumber || structuredYield(value[0]);
  }
  if (typeof value === 'number') return `${value} ${t('porties')}`;
  const s = plainText(value);
  return /^\d+([.,]\d+)?$/.test(s) ? `${s} ${t('porties')}` : s;
}

// Zet een recept uit een andere app of website om naar een concept voor het controlescherm. null als het geen recept is.
function recipeFromStructured(obj, extra = {}) {
  if (!obj || typeof obj !== 'object') return null;
  const title = plainText(obj.name ?? obj.title ?? obj.recipe_name ?? obj.label ?? '').slice(0, 200);
  const ingredients = structuredIngredients(
    obj.recipeIngredient ?? obj.ingredients ?? obj.ingredient ?? obj.ingredientLines ?? obj.recipe_ingredient
  );
  let steps = structuredSteps(
    obj.recipeInstructions ?? obj.instructions ?? obj.directions ?? obj.method ?? obj.steps ?? obj.preparation
  );
  if (!title || (!ingredients.length && !steps.length)) return null;
  // Notities van de chef horen erbij; als laatste regel in de bereiding, zodat niets verloren gaat.
  const notes = textLines(obj.notes ?? obj.note ?? obj.recipeNotes ?? '');
  if (notes.length) steps = [...steps, `${t('Notities')}:`, ...notes];
  const cat = []
    .concat(obj.recipeCategory ?? obj.categories ?? obj.category ?? obj.recipe_category ?? [])
    .map(c => (typeof c === 'object' ? c?.name : c))
    .filter(Boolean)[0];
  return {
    title,
    ingredients,
    steps,
    yield: structuredYield(
      obj.recipeYield ?? obj.yield ?? obj.servings ?? obj.recipe_yield ?? obj.serves ?? obj.portions
    ),
    category: importCategory(title, plainText(cat || '')),
    photo: '',
    _fromPhoto: false,
    _needsReview: !ingredients.length,
    _unclear: [],
    ...extra
  };
}

// Zoekt recepten in willekeurige JSON: een lijst, een JSON-LD @graph, een Mealie- of Tandoor-export.
function recipesFromJson(data, extra) {
  const out = [];
  const seen = new Set();
  const walk = (node, depth = 0) => {
    if (!node || typeof node !== 'object' || depth > 6 || out.length >= 2000) return;
    if (Array.isArray(node)) return node.forEach(n => walk(n, depth + 1));
    const draft = recipeFromStructured(node, extra);
    if (draft && !seen.has(node)) {
      seen.add(node);
      out.push(draft);
      return;
    }
    for (const key of ['@graph', 'recipes', 'items', 'data', 'results', 'mainEntity', 'recipe'])
      if (node[key]) walk(node[key], depth + 1);
  };
  walk(data);
  return out;
}

// HTML met schema.org-recepten: JSON-LD of microdata (Recipe Keeper, Copy Me That, Paprika-HTML, websites).
function recipesFromHtml(html, extra) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const found = [];
  doc.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    try {
      found.push(...recipesFromJson(JSON.parse(s.textContent), extra));
    } catch (_) {}
  });
  if (found.length) return found;
  doc.querySelectorAll('[itemtype*="schema.org/Recipe" i]').forEach(el => {
    const prop = name =>
      [...el.querySelectorAll(`[itemprop="${name}"]`)].map(
        x => x.getAttribute('content') || x.innerText || x.textContent
      );
    const draft = recipeFromStructured(
      {
        name: prop('name')[0],
        recipeIngredient: prop('recipeIngredient').length ? prop('recipeIngredient') : prop('ingredients'),
        recipeInstructions: prop('recipeInstructions').join('\n'),
        recipeYield: prop('recipeYield')[0],
        recipeCategory: prop('recipeCategory')[0],
        notes: prop('recipeNotes').join('\n')
      },
      extra
    );
    if (draft) found.push(draft);
  });
  return found;
}

// CSV met kolomkoppen (Plan to Eat, spreadsheets): één recept per rij. null als de kolommen niet herkend worden.
function recipesFromCsv(text, extra) {
  const rows = parseCsv(text);
  if (rows.length < 2) return null;
  const head = rows[0].map(h => h.trim().toLowerCase());
  const col = (...names) => head.findIndex(h => names.some(n => h === n || h.includes(n)));
  const title = col('title', 'name', 'naam', 'titel', 'recipe');
  const ingr = col('ingredients', 'ingredient', 'ingrediënten', 'ingredienten');
  const steps = col('directions', 'instructions', 'method', 'bereiding', 'steps', 'preparation');
  if (title < 0 || (ingr < 0 && steps < 0)) return null;
  const yieldCol = col('servings', 'yield', 'opbrengst', 'porties', 'serves');
  const notes = col('notes', 'notities');
  return rows
    .slice(1)
    .map(r =>
      recipeFromStructured(
        {
          name: r[title],
          recipeIngredient: ingr >= 0 ? r[ingr] : '',
          recipeInstructions: steps >= 0 ? r[steps] : '',
          recipeYield: yieldCol >= 0 ? r[yieldCol] : '',
          notes: notes >= 0 ? r[notes] : ''
        },
        extra
      )
    )
    .filter(Boolean);
}

function parseCsv(text) {
  const sep =
    (text.split('\n')[0].match(/;/g) || []).length > (text.split('\n')[0].match(/,/g) || []).length ? ';' : ',';
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === sep) {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      if (row.some(c => c.trim())) rows.push(row);
      row = [];
      cell = '';
    } else cell += ch;
  }
  row.push(cell);
  if (row.some(c => c.trim())) rows.push(row);
  return rows;
}

// MasterCook .mx2 (XML): <RcpE name> met <IngR name qty unit> en <DirT>.
function recipesFromMx2(xml, extra) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  return [...doc.querySelectorAll('RcpE')]
    .map(r =>
      recipeFromStructured(
        {
          name: r.getAttribute('name'),
          recipeIngredient: [...r.querySelectorAll('IngR')].map(i =>
            [i.getAttribute('qty'), i.getAttribute('unit'), i.getAttribute('name')].filter(Boolean).join(' ')
          ),
          recipeInstructions: [...r.querySelectorAll('DirT')].map(d => d.textContent).join('\n'),
          recipeYield: r.querySelector('Serv')?.getAttribute('qty'),
          notes: r.querySelector('Natn, Note')?.textContent
        },
        extra
      )
    )
    .filter(Boolean);
}

// ---- Bestanden uit andere apps ----

const importScripts = {};
function loadImportScript(src, ready) {
  if (ready()) return Promise.resolve();
  importScripts[src] ||= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => {
      delete importScripts[src];
      reject(new Error('De importmodule kon niet worden geladen.'));
    };
    document.head.appendChild(s);
  });
  return importScripts[src];
}

function ensureJSZip() {
  return loadImportScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', () => window.JSZip);
}

function ensureYaml() {
  return loadImportScript('https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js', () => window.jsyaml);
}

async function recipesFromYaml(text, extra) {
  await ensureYaml();
  const data = jsyaml.load(text);
  return (Array.isArray(data) ? data : [data]).map(d => recipeFromCookbookManager(d, extra)).filter(Boolean);
}

// Een XML-bestand: Cookmate-kookboek, Living Cookbook (.fdx) of Evernote (.enex).
async function recipesFromXml(xml, extra, findPhoto) {
  const doc = xmlDoc(xml);
  if (!doc) return [];
  const root = doc.documentElement.tagName.toLowerCase();
  if (root === 'cookbook') return recipesFromCookmate(doc, extra, findPhoto);
  if (root === 'en-export') return recipesFromEnex(doc, extra);
  if (doc.getElementsByTagName('Recipe').length) return recipesFromFdx(doc, extra, findPhoto);
  return [];
}

async function gunzipText(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
}

// Paprika: een .paprikarecipe is een gecomprimeerd JSON-recept; .paprikarecipes is een zip vol daarvan.
// De foto van het recept (photo_data) gaat mee, verkleind zoals elke foto in Savour.
async function recipeFromPaprika(bytes, extra) {
  const data = JSON.parse(await gunzipText(bytes));
  const draft = recipeFromStructured(
    { ...data, recipeIngredient: data.ingredients, recipeInstructions: data.directions, recipeYield: data.servings },
    extra
  );
  if (draft && data.photo_data) draft.photo = await photoFromBase64(data.photo_data);
  return draft;
}

// ---- Foto's uit een export (base64 of een los bestand in de zip), verkleind zoals elke foto in Savour ----

const IMAGE_TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' };

async function photoFromBytes(bytes, name = 'foto.jpg') {
  const type = IMAGE_TYPES[String(name).split('.').pop().toLowerCase()] || 'image/jpeg';
  try {
    return await compressPhoto(new File([bytes], name, { type }));
  } catch (_) {
    return '';
  }
}

async function photoFromBase64(b64) {
  try {
    const blob = await (await fetch(`data:image/jpeg;base64,${String(b64).replace(/\s+/g, '')}`)).blob();
    return await photoFromBytes(blob);
  } catch (_) {
    return '';
  }
}

// Kopje in een lijst ("# Saus" in Mela, "[Saus]") zoals Savour het schrijft: "Saus:".
function sectionLines(value) {
  return String(value ?? '')
    .split('\n')
    .map(line => {
      const m = line.match(/^\s*(?:#+\s*(.+?)|\[([^\]]+)\])\s*$/);
      return m ? `${(m[1] || m[2]).trim().replace(/:$/, '')}:` : line;
    })
    .join('\n');
}

function xmlDoc(xml) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  return doc.getElementsByTagName('parsererror').length ? null : doc;
}

// ---- Mela: een .melarecipe is één JSON-recept; .melarecipes is een zip vol daarvan ----
async function recipeFromMela(data, extra) {
  const draft = recipeFromStructured(
    {
      title: data.title,
      ingredients: sectionLines(data.ingredients),
      instructions: sectionLines(data.instructions),
      notes: data.notes,
      yield: data.yield,
      categories: data.categories
    },
    extra
  );
  if (draft && Array.isArray(data.images) && data.images[0]) draft.photo = await photoFromBase64(data.images[0]);
  return draft;
}

// ---- Cookmate (.mcb, een zip met een XML-kookboek): <cookbook><recipe> met <li>-regels ----
async function recipesFromCookmate(doc, extra, findPhoto) {
  const out = [];
  for (const r of [...doc.getElementsByTagName('recipe')]) {
    const field = name => {
      const el = [...r.children].find(c => c.tagName.toLowerCase() === name);
      if (!el) return '';
      const items = [...el.getElementsByTagName('li')];
      return items.length ? items.map(li => li.textContent).join('\n') : el.textContent;
    };
    const draft = recipeFromStructured(
      {
        title: field('title'),
        ingredients: field('ingredient'),
        instructions: field('recipetext'),
        yield: field('quantity'),
        notes: field('comments'),
        category: field('category')
      },
      extra
    );
    if (!draft) continue;
    const image = field('imagepath').trim();
    if (image && findPhoto) draft.photo = await findPhoto(image);
    out.push(draft);
  }
  return out;
}

// ---- Living Cookbook (.fdx, XML; .fdxz is een zip met een .fdx en foto's) ----
async function recipesFromFdx(doc, extra, findPhoto) {
  const out = [];
  for (const r of [...doc.getElementsByTagName('Recipe')]) {
    const a = name => r.getAttribute(name) || '';
    const texts = tag => [...r.getElementsByTagName(tag)].map(el => el.textContent.trim()).filter(Boolean);
    const ingredients = [...r.getElementsByTagName('RecipeIngredient')].map(i => {
      const line = ['Quantity', 'Unit', 'Ingredient']
        .map(n => i.getAttribute(n) || '')
        .filter(Boolean)
        .join(' ');
      return i.getAttribute('Heading') === 'Y' ? `${line.replace(/:$/, '')}:` : line;
    });
    const draft = recipeFromStructured(
      {
        title: a('Name'),
        ingredients: ingredients.filter(Boolean),
        instructions: texts('ProcedureText'),
        notes: [a('Comments'), ...texts('RecipeTip'), ...texts('RecipeAuthorNote')].filter(Boolean).join('\n'),
        yield: a('Servings') || a('Yield')
      },
      extra
    );
    if (!draft) continue;
    const image = r.getElementsByTagName('RecipeImage')[0];
    if (image?.textContent.trim()) draft.photo = await photoFromBase64(image.textContent);
    else if (image?.getAttribute('FileName') && findPhoto)
      draft.photo = await findPhoto(image.getAttribute('FileName'));
    out.push(draft);
  }
  return out;
}

// ---- Evernote (.enex): elke notitie is een recept in vrije tekst; de Savour-lezer leest het ----
// Evernote zet elke regel in een eigen <div> binnen <en-note>; maak daar alinea's van, zodat elke regel een regel blijft.
function enexNoteHtml(content) {
  const doc = new DOMParser().parseFromString(
    content.replace(/<\?xml[^>]*>|<!DOCTYPE[^>]*>/gi, '').replace(/<(\/?)en-note\b/gi, '<$1div'),
    'text/html'
  );
  doc.querySelectorAll('div').forEach(div => {
    if (div.querySelector('div, p, ul, ol, table, h1, h2, h3, h4, h5, h6')) return;
    const p = doc.createElement('p');
    p.innerHTML = div.innerHTML;
    div.replaceWith(p);
  });
  return doc.body.innerHTML;
}

function recipesFromEnex(doc, extra) {
  return [...doc.getElementsByTagName('note')].flatMap(note => {
    const title = note.getElementsByTagName('title')[0]?.textContent.trim() || '';
    const text = htmlToRecipeText(enexNoteHtml(note.getElementsByTagName('content')[0]?.textContent || '')).trim();
    if (!text) return [];
    const drafts = readRecipesLocally(title ? `# ${title}\n${text}` : text, extra);
    // Eén recept in de notitie: dan is de titel van de notitie de receptnaam.
    if (drafts.length === 1 && title) drafts[0].title = title.slice(0, 200);
    // Notities zonder ingrediënten of bereiding zijn vaak geen recept: nakijken.
    drafts.forEach(d => {
      if (!d.ingredients?.length || !d.steps?.length) d._needsReview = true;
    });
    return drafts;
  });
}

// ---- Google Keep (Google Takeout, .zip met een .html per notitie): titel en inhoud, zonder de datum erboven ----
function keepNoteText(html) {
  if (!/class="note\b/.test(html)) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const content = doc.querySelector('.note .content');
  if (!content) return '';
  const title = (doc.querySelector('.note .title')?.textContent || doc.title || '').trim();
  content.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
  // Een lijstje in Keep (afvinklijst): elk item een regel.
  const items = [...content.querySelectorAll('.listitem .text')].map(x => x.textContent.trim());
  const body = items.length ? items.join('\n') : content.textContent;
  return title ? `# ${title}\n${body}` : body;
}

// ---- Flavorish (.zip): recipes/*.json met { recipe, ingredients, instructions, imageFilename } ----
async function recipeFromFlavorish(data, extra, findPhoto) {
  const entries = list =>
    (Array.isArray(list) ? [...list] : [])
      .sort((x, y) => (Number(x?.sort_order) || 0) - (Number(y?.sort_order) || 0))
      .map(e =>
        e?.is_group_header
          ? `${String(e.text || '')
              .trim()
              .replace(/:$/, '')}:`
          : e?.text
      )
      .filter(Boolean);
  const r = data.recipe || {};
  const draft = recipeFromStructured(
    {
      title: r.title,
      ingredients: entries(data.ingredients),
      instructions: entries(data.instructions),
      notes: r.notes,
      yield: r.servings,
      category: r.category
    },
    extra
  );
  if (draft && data.imageFilename && findPhoto) draft.photo = await findPhoto(data.imageFilename);
  return draft;
}

// ---- CookBookManager.com (.zip met één .yml per recept) ----
function recipeFromCookbookManager(data, extra) {
  if (!data || typeof data !== 'object' || !data.name) return null;
  const lines = v => (Array.isArray(v) ? v.map(x => String(x ?? '')) : String(v ?? '').split('\n'));
  return recipeFromStructured(
    {
      name: data.name,
      recipeIngredient: lines(data.ingredients),
      recipeInstructions: lines(data.directions),
      notes: [data.notes, data.video].filter(Boolean).join('\n'),
      recipeYield: data.servings,
      recipeCategory: Array.isArray(data.tags) ? data.tags[0] : data.tags
    },
    extra
  );
}

const APP_EXPORT_EXT =
  /\.(paprikarecipes|paprikarecipe|melarecipes|melarecipe|zip|mcb|crumb|mx2|mxp|fdx|fdxz|enex|ya?ml|xml)$/i;
// Losse documenten in een zip: gelezen alsof ze los gekozen waren (Word, PDF, tekst).
const ZIP_DOCUMENT_EXT = /\.(docx?|pdf|md|markdown|rtf|odt)$/i;
const ZIP_IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

// Leest een export uit een andere app. Geeft concepten terug (kan leeg zijn).
async function importAppExport(file) {
  const name = (file.name || '').toLowerCase();
  const extra = { sourceFile: file.name };
  if (name.endsWith('.paprikarecipe'))
    return [await recipeFromPaprika(await file.arrayBuffer(), extra)].filter(Boolean);
  if (name.endsWith('.crumb')) return recipesFromJson(JSON.parse(await file.text()), extra);
  if (name.endsWith('.melarecipe')) return [await recipeFromMela(JSON.parse(await file.text()), extra)].filter(Boolean);
  if (name.endsWith('.mx2')) return recipesFromMx2(await file.text(), extra);
  if (name.endsWith('.mxp')) return readRecipesLocally(await file.text(), extra);
  if (/\.(fdx|enex|xml)$/.test(name)) return nonEmptyExport(await recipesFromXml(await file.text(), extra));
  if (/\.ya?ml$/.test(name)) return nonEmptyExport(await recipesFromYaml(await file.text(), extra));
  // Zip (Paprika, Mela, Mealie, Tandoor, Flavorish, Recipe Keeper, Copy Me That, Cookmate, Living Cookbook,
  // CookBookManager, of losse documenten): elk bestand erin bekijken, ook een zip in een zip.
  await ensureJSZip();
  const drafts = [];
  const images = [];
  const readZip = async (data, depth) => {
    const zip = await JSZip.loadAsync(data);
    // Foto bij een recept, op bestandsnaam (Cookmate, Flavorish, Living Cookbook).
    const findPhoto = async path => {
      const base = String(path).split(/[\\/]/).pop().toLowerCase();
      const hit = Object.values(zip.files).find(e => !e.dir && e.name.split('/').pop().toLowerCase() === base);
      return hit ? photoFromBytes(await hit.async('uint8array'), base) : '';
    };
    for (const entry of Object.values(zip.files)) {
      if (entry.dir || drafts.length >= 2000) continue;
      const n = entry.name.toLowerCase();
      const short = entry.name.split('/').pop();
      // Verborgen bestanden van de Mac (__MACOSX, ._naam) overslaan.
      if (n.startsWith('__macosx/') || short.startsWith('._')) continue;
      const sub = { sourceFile: `${file.name} · ${short}` };
      try {
        if (n.endsWith('.paprikarecipe')) drafts.push(await recipeFromPaprika(await entry.async('uint8array'), sub));
        else if (n.endsWith('.melarecipe'))
          drafts.push(await recipeFromMela(JSON.parse(await entry.async('string')), sub));
        else if (n.endsWith('.json') || n.endsWith('.crumb')) {
          const json = JSON.parse(await entry.async('string'));
          if (json?.recipe && Array.isArray(json.ingredients))
            drafts.push(await recipeFromFlavorish(json, sub, findPhoto));
          else drafts.push(...recipesFromJson(json, sub));
        } else if (/\.(xml|fdx|enex)$/.test(n))
          drafts.push(...(await recipesFromXml(await entry.async('string'), sub, findPhoto)));
        else if (/\.ya?ml$/.test(n)) drafts.push(...(await recipesFromYaml(await entry.async('string'), sub)));
        else if (ZIP_DOCUMENT_EXT.test(n))
          drafts.push(...(await readImportFile(new File([await entry.async('blob')], short))));
        else if (ZIP_IMAGE_EXT.test(n)) images.push({ entry, short });
        else if (n.endsWith('.html') || n.endsWith('.htm')) {
          const html = await entry.async('string');
          const found = recipesFromHtml(html, sub);
          const keep = found.length ? '' : keepNoteText(html);
          drafts.push(
            ...(found.length ? found : readRecipesLocally(keep || htmlToRecipeText(html), sub)).map(d =>
              keep && !d.steps?.length ? { ...d, _needsReview: true } : d
            )
          );
        } else if (n.endsWith('.mx2')) drafts.push(...recipesFromMx2(await entry.async('string'), sub));
        else if (n.endsWith('.txt') || n.endsWith('.mxp'))
          drafts.push(...readRecipesLocally(await entry.async('string'), sub));
        else if (/\.(zip|fdxz|mcb|melarecipes)$/.test(n) && depth < 2)
          await readZip(await entry.async('uint8array'), depth + 1);
      } catch (e) {
        console.warn('Bestand in export overgeslagen', entry.name, e);
      }
    }
  };
  await readZip(await file.arrayBuffer(), 0);
  // Alleen foto's in de zip (geen receptbestanden): elke foto is een recept, net als bij losse foto's.
  // Staan er wel recepten in, dan zijn de foto's de foto's bij die recepten en worden ze niet apart gelezen.
  if (!drafts.filter(Boolean).length)
    for (const { entry, short } of images.slice(0, 200)) {
      try {
        drafts.push(
          ...(await importImageFile(
            new File([await entry.async('blob')], short, { type: IMAGE_TYPES[short.split('.').pop().toLowerCase()] })
          ))
        );
      } catch (e) {
        // Foto's lezen kan alleen met Pro: die melding direct doorgeven in plaats van "niets gevonden".
        if (e?.code === 'pro_required') throw e;
        console.warn('Foto in zip overgeslagen', entry.name, e);
      }
    }
  return nonEmptyExport(drafts);
}

function nonEmptyExport(drafts) {
  const list = drafts.filter(Boolean);
  if (!list.length) throw new Error(t('In deze export zijn geen recepten gevonden.'));
  return list;
}

// ---- Webpagina ----

async function importFromUrl(url) {
  const { data } = await supabaseClient.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error(t('Log in om een recept van een website te importeren.'));
  const response = await fetch('/api/import-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || t('Deze pagina kon niet worden gelezen.'));
  let host = url;
  try {
    host = new URL(result.url).hostname.replace(/^www\./, '');
  } catch (_) {}
  const extra = { sourceFile: host };
  const drafts = recipesFromJson(result.recipes || [], extra);
  if (drafts.length) return drafts;
  // Geen recept in vaste vorm: de lezer (en met Pro de AI) leest de tekst van de pagina.
  if (!result.text?.trim()) throw new Error(t('Op deze pagina is geen recept gevonden.'));
  return readTextRecipes({ name: host }, `${result.title || ''}\n\n${result.text}`);
}
