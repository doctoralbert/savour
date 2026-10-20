// Kleine hulpfuncties die overal gebruikt worden.

function $(id) {
  return document.getElementById(id);
}

function esc(s) {
  return String(s ?? '').replace(
    /[&<>"']/g,
    m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]
  );
}

function escAttr(s) {
  return String(s ?? '').replace(/'/g, "'");
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
