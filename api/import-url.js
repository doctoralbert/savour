// Recept importeren vanaf een webpagina (Recept toevoegen → Webpagina). De browser kan andere sites niet zelf
// ophalen, dus dat doet deze route. Alleen voor ingelogde gebruikers, alleen openbare http(s)-adressen (geen
// interne netwerken), hooguit 3 MB en 10 seconden. Teruggegeven: de recepten zoals de site ze zelf in vaste vorm
// aanbiedt (schema.org Recipe, bijna alle receptensites doen dat) en de leesbare tekst van de pagina als reserve.
// De browser zet het om naar Savour (recipeFromStructured in js/features/import.js); er wordt niets verzonnen.
import { lookup } from 'node:dns/promises';
import net from 'node:net';
import { getUserFromRequest } from './_lib/auth.js';

const MAX_BYTES = 3 * 1024 * 1024;
const TIMEOUT_MS = 10000;

// Interne en speciale adressen weigeren (beveiliging: de server mag niet als omweg naar binnen dienen).
function isPrivateAddress(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }
  const v = ip.toLowerCase();
  return (
    v === '::1' ||
    v === '::' ||
    v.startsWith('fc') ||
    v.startsWith('fd') ||
    v.startsWith('fe80') ||
    v.startsWith('::ffff:')
  );
}

export async function assertPublicUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('Dit is geen geldige link.');
  }
  if (!/^https?:$/.test(url.protocol)) throw new Error('Alleen links die beginnen met http of https.');
  if (url.username || url.password) throw new Error('Deze link kan niet worden geopend.');
  const host = url.hostname.replace(/^\[|\]$/g, '');
  const addresses = net.isIP(host) ? [{ address: host }] : await lookup(host, { all: true }).catch(() => []);
  if (!addresses.length) throw new Error('Deze website is niet gevonden.');
  if (addresses.some(a => isPrivateAddress(a.address))) throw new Error('Deze link kan niet worden geopend.');
  return url;
}

export async function fetchPage(raw) {
  let url = await assertPublicUrl(raw);
  for (let hop = 0; hop < 4; hop++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let res;
    try {
      res = await fetch(url, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SavourRecipeImport/1.0; +https://savour.page)',
          Accept: 'text/html,application/xhtml+xml,application/ld+json;q=0.9,*/*;q=0.5'
        }
      });
    } catch (e) {
      clearTimeout(timer);
      throw new Error(
        e.name === 'AbortError' ? 'De website reageerde niet op tijd.' : 'De website kon niet worden geopend.'
      );
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      clearTimeout(timer);
      url = await assertPublicUrl(new URL(res.headers.get('location'), url).href);
      continue;
    }
    if (!res.ok) {
      clearTimeout(timer);
      throw new Error(
        [401, 402, 403, 429, 451].includes(res.status)
          ? 'Deze website laat Savour de pagina niet ophalen. Kopieer de tekst van het recept en kies "Tekst invoeren".'
          : `De website gaf een foutmelding (${res.status}).`
      );
    }
    const reader = res.body.getReader();
    const chunks = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > MAX_BYTES) {
        controller.abort();
        break;
      }
      chunks.push(value);
    }
    clearTimeout(timer);
    return { html: Buffer.concat(chunks).toString('utf8'), finalUrl: url.href };
  }
  throw new Error('Deze link stuurt te vaak door.');
}

// Alle schema.org Recipe-objecten uit de JSON-LD van de pagina (ook binnen @graph of een lijst).
export function recipesFromJsonLd(html) {
  const found = [];
  const walk = node => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach(walk);
    const type = [].concat(node['@type'] || []).map(String);
    if (type.some(t => /(^|\/)Recipe$/i.test(t))) found.push(node);
    if (node['@graph']) walk(node['@graph']);
    if (node.mainEntity) walk(node.mainEntity);
    if (node.itemListElement && !type.some(t => /Recipe/i.test(t))) walk(node.itemListElement);
  };
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      walk(JSON.parse(m[1].trim()));
    } catch {
      // Sommige sites zetten ongeldige JSON in de pagina; die slaan we over.
    }
  }
  return found.slice(0, 50);
}

// Reserve: de leesbare tekst van de pagina (zonder scripts, stijlen, menu's en voetteksten).
function pageText(html) {
  return html
    .replace(/<(script|style|noscript|svg|nav|header|footer|form|iframe)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim()
    .slice(0, 60000);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log in om een recept van een website te importeren.' });
  const raw = String(req.body?.url || '').trim();
  if (!raw || raw.length > 2000) return res.status(400).json({ error: 'Vul een link in.' });
  try {
    const { html, finalUrl } = await fetchPage(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/\s+/g, ' ').trim().slice(0, 200);
    const recipes = recipesFromJsonLd(html);
    return res.status(200).json({ url: finalUrl, title, recipes, text: recipes.length ? '' : pageText(html) });
  } catch (e) {
    return res.status(400).json({ error: e.message || 'Deze pagina kon niet worden gelezen.' });
  }
}
