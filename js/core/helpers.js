// Kleine hulpfuncties die overal gebruikt worden.

function $(id) {
  return document.getElementById(id);
}

// Maakt tekst veilig voor HTML: als inhoud én als waarde van een attribuut (value="...", src="...").
function esc(s) {
  return String(s ?? '').replace(
    /[&<>"']/g,
    m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]
  );
}

// Maakt tekst veilig als argument tussen enkele aanhalingstekens in een onclick="fn('...')".
// Eerst als JavaScript-tekst, daarna voor het HTML-attribuut eromheen.
function escJs(s) {
  return (
    String(s ?? '')
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n')
      // Unicode-regeleinden (U+2028/U+2029) zijn in JavaScript-tekst niet toegestaan.
      .replace(new RegExp('[' + String.fromCharCode(0x2028, 0x2029) + ']', 'g'), c =>
        c.charCodeAt(0) === 0x2028 ? '\\u2028' : '\\u2029'
      )
      .replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[m])
  );
}

function toast(t) {
  $('toast').textContent = t;
  $('toast').style.display = 'block';
  setTimeout(() => ($('toast').style.display = 'none'), 1800);
}

function t(text) {
  return String(text ?? '');
}

function formatNumber(n) {
  return Math.abs(n - Math.round(n)) < 1e-9
    ? String(Math.round(n))
    : String(Math.round(n * 1000) / 1000).replace('.', ',');
}

// Zoekt een recept in de eigen bibliotheek én in de gedeelde recepten van teamleden.
function findRecipe(id) {
  return (
    (recipes || []).find(r => String(r.id) === String(id)) ||
    (sharedRecipes || []).find(r => String(r.id) === String(id)) ||
    (linkRecipes || []).find(r => String(r.id) === String(id)) ||
    null
  );
}

// Is dit recept van de ingelogde gebruiker zelf (en dus te bewerken)?
function isOwnRecipe(r) {
  return !!r && !r.shared;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ''));
}

function orderedByStoredIds(items, key) {
  let ids = [];
  try {
    const raw = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(raw)) ids = raw.map(String);
  } catch (e) {}
  const map = new Map(items.map(x => [String(x.id), x]));
  const out = ids.map(id => map.get(id)).filter(Boolean);
  items.forEach(x => {
    if (!out.some(y => String(y.id) === String(x.id))) out.push(x);
  });
  return out;
}

function saveStoredOrder(items, key) {
  localStorage.setItem(key, JSON.stringify(items.map(x => String(x.id))));
}

// Verkleint een foto tot maximaal maxSize pixels (langste zijde) en zet hem om naar JPEG.
// Zo blijft een telefoonfoto onder de uploadlimiet van Vercel (4,5 MB) en wordt de database niet onnodig zwaar.
async function compressPhoto(file, maxSize = 2000, type = 'image/jpeg') {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('Deze foto kan niet worden gelezen. Gebruik JPG, PNG of WEBP.'));
      i.src = url;
    });
    const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL(type, 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}
