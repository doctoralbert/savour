// Vindbaarheid volgen: Google Search Console en Bing Webmaster Tools. Elke nacht (api/_lib/onderhoud.js) haalt de
// server de cijfers op en bewaart ze in seo_daily en seo_items (supabase/2026-11-23-zoekmachines.sql). /admin →
// Zoekmachines toont ze met een grafiek per land, en het dagrapport krijgt een korte trend. Instellen:
// docs/zoekmachines-volgen.md.
// Google: zelfde Google-app als AdSense (GOOGLE_ADSENSE_CLIENT_ID/-SECRET), alleen-lezen toegang via de knop
// "Koppel Search Console"; de refresh-token staat in admin_settings. Bing: API-sleutel in Vercel (BING_WEBMASTER_KEY).
// Alleen cijfers zoals Google en Bing ze geven; Savour rekent er niets bij.
import { select, upsert, insert, remove } from './supabase-admin.js';

const GOOGLE_SITE = process.env.GSC_SITE || 'sc-domain:savour.page';
const BING_SITE = process.env.BING_SITE_URL || 'https://savour.page/';
const SITE_ORIGIN = /^https?:\/\/(www\.)?savour\.page/;
export const SEARCH_TOKEN_KEY = 'searchconsole_refresh_token';
const searchClientId = () => process.env.GOOGLE_ADSENSE_CLIENT_ID;
const searchClientSecret = () => process.env.GOOGLE_ADSENSE_CLIENT_SECRET;
const bingKey = () => process.env.BING_WEBMASTER_KEY;

// Google geeft landen als drie letters ("deu"); Savour bewaart twee (vlag en naam in /admin). Onbekend: "zz".
const ISO3_TO_2 = Object.fromEntries(
  (
    'nld:nl bel:be deu:de aut:at che:ch lux:lu fra:fr esp:es prt:pt ita:it gbr:gb irl:ie dnk:dk swe:se nor:no fin:fi ' +
    'isl:is pol:pl cze:cz svk:sk hun:hu svn:si hrv:hr bih:ba srb:rs mne:me mkd:mk alb:al grc:gr cyp:cy mlt:mt bgr:bg ' +
    'rou:ro mda:md ukr:ua blr:by ltu:lt lva:lv est:ee rus:ru tur:tr geo:ge arm:am aze:az kaz:kz usa:us can:ca mex:mx ' +
    'gtm:gt cri:cr pan:pa cub:cu dom:do pri:pr col:co ven:ve ecu:ec per:pe bol:bo chl:cl arg:ar ury:uy pry:py bra:br ' +
    'aus:au nzl:nz jpn:jp kor:kr chn:cn hkg:hk twn:tw sgp:sg mys:my tha:th vnm:vn phl:ph idn:id ind:in pak:pk ' +
    'bgd:bd lka:lk npl:np are:ae sau:sa qat:qa kwt:kw bhr:bh omn:om isr:il jor:jo lbn:lb egy:eg mar:ma dza:dz ' +
    'tun:tn zaf:za nga:ng ken:ke gha:gh eth:et tza:tz uga:ug sen:sn civ:ci cmr:cm mus:mu irn:ir irq:iq and:ad ' +
    'mco:mc lie:li smr:sm abw:aw cuw:cw sur:sr'
  )
    .split(' ')
    .map(pair => pair.split(':'))
);
const countryCode = c => ISO3_TO_2[String(c || '').toLowerCase()] || 'zz';

const isoDay = date => date.toISOString().slice(0, 10);
const daysAgo = n => isoDay(new Date(Date.now() - n * 86400000));
const addDays = (day, n) => isoDay(new Date(Date.parse(`${day}T00:00:00Z`) + n * 86400000));

// ---- Koppelen (zelfde terugkeer op /admin als AdSense, met een eigen controlecode) ----

export function searchAuthUrl(origin, state) {
  if (!searchClientId() || !searchClientSecret()) throw new Error('De Google-gegevens ontbreken nog in Vercel.');
  const q = new URLSearchParams({
    client_id: searchClientId(),
    redirect_uri: `${origin}/admin`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    access_type: 'offline',
    prompt: 'consent',
    state: String(state || '')
  });
  return { url: `https://accounts.google.com/o/oauth2/v2/auth?${q}` };
}

async function searchGoogleToken(params) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: searchClientId(), client_secret: searchClientSecret(), ...params })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.error || 'google_token');
  return data;
}

export async function searchConnect(code, origin) {
  if (!code) throw new Error('Geen code van Google ontvangen.');
  const token = await searchGoogleToken({ code, grant_type: 'authorization_code', redirect_uri: `${origin}/admin` });
  if (!token.refresh_token) throw new Error('Google gaf geen blijvende toegang. Probeer het opnieuw.');
  await remove('admin_settings', `key=eq.${SEARCH_TOKEN_KEY}`);
  await insert('admin_settings', { key: SEARCH_TOKEN_KEY, value: token.refresh_token });
  return { ok: true };
}

export async function searchDisconnect() {
  await remove('admin_settings', `key=eq.${SEARCH_TOKEN_KEY}`);
  return { ok: true };
}

async function searchAccessToken() {
  if (!searchClientId() || !searchClientSecret()) return null;
  const rows = await select('admin_settings', `key=eq.${SEARCH_TOKEN_KEY}&select=value`);
  const refresh = rows?.[0]?.value;
  if (!refresh) return null;
  return (await searchGoogleToken({ refresh_token: refresh, grant_type: 'refresh_token' })).access_token;
}

// ---- Ophalen ----

// Alle rijen van één Search Analytics-vraag (Google geeft er hooguit 25.000 per keer).
async function googleRows(accessToken, body) {
  const out = [];
  for (let startRow = 0; startRow < 250000; startRow += 25000) {
    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GOOGLE_SITE)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, rowLimit: 25000, startRow })
      }
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error?.message || `Search Console-fout (${response.status})`);
    out.push(...(data.rows || []));
    if ((data.rows || []).length < 25000) break;
  }
  return out;
}

// Rijen met dezelfde sleutel samenvoegen (bijv. twee onbekende landen → "zz"): klikken en vertoningen optellen,
// de positie gewogen naar vertoningen. Nodig omdat de database één rij per sleutel wil.
function mergeRows(rows, keyOf) {
  const map = new Map();
  for (const r of rows) {
    const key = keyOf(r);
    const old = map.get(key);
    if (!old) {
      map.set(key, { ...r });
      continue;
    }
    const imp = old.impressions + r.impressions;
    if (old.position != null && r.position != null && imp)
      old.position = (old.position * old.impressions + r.position * r.impressions) / imp;
    old.clicks += r.clicks;
    old.impressions = imp;
  }
  return [...map.values()];
}

async function saveRows(table, rows, onConflict) {
  for (let i = 0; i < rows.length; i += 500) await upsert(table, rows.slice(i, i + 500), onConflict);
  return rows.length;
}

const pagePath = url => String(url || '').replace(SITE_ORIGIN, '') || '/';

async function fetchGoogle() {
  const accessToken = await searchAccessToken();
  if (!accessToken) return { skipped: 'niet gekoppeld' };
  // De eerste keer de hele geschiedenis die Google bewaart (16 maanden; zoektermen 90 dagen), daarna de laatste dagen:
  // Google vult recente dagen nog een paar dagen aan.
  const have = await select('seo_daily', 'select=day&source=eq.google&limit=1');
  const first = !have?.length;
  const end = daysAgo(1);
  const startDaily = first ? daysAgo(480) : daysAgo(8);
  const startItems = first ? daysAgo(90) : daysAgo(8);
  const now = new Date().toISOString();
  const daily = mergeRows(
    (await googleRows(accessToken, { startDate: startDaily, endDate: end, dimensions: ['date', 'country'] })).map(
      r => ({
        day: r.keys[0],
        source: 'google',
        country: countryCode(r.keys[1]),
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        position: r.position ?? null,
        fetched_at: now
      })
    ),
    r => `${r.day}|${r.country}`
  );
  const items = [];
  for (const [kind, dimension] of [
    ['query', 'query'],
    ['page', 'page']
  ]) {
    const rows = await googleRows(accessToken, {
      startDate: startItems,
      endDate: end,
      dimensions: ['date', 'country', dimension]
    });
    items.push(
      ...mergeRows(
        rows.map(r => ({
          day: r.keys[0],
          source: 'google',
          kind,
          country: countryCode(r.keys[1]),
          item: (kind === 'page' ? pagePath(r.keys[2]) : String(r.keys[2] || '')).slice(0, 300),
          clicks: r.clicks || 0,
          impressions: r.impressions || 0,
          position: r.position ?? null,
          fetched_at: now
        })),
        r => `${r.day}|${r.kind}|${r.country}|${r.item}`
      )
    );
  }
  return {
    days: await saveRows('seo_daily', daily, 'day,source,country'),
    items: await saveRows('seo_items', items, 'day,source,kind,country,item'),
    from: startDaily
  };
}

// Bing geeft datums als "/Date(1700000000000-0800)/" of als ISO-tekst.
function bingDay(value) {
  const ms = String(value || '').match(/Date\((-?\d+)/)?.[1];
  const date = ms ? new Date(Number(ms)) : new Date(value);
  return Number.isNaN(date.getTime()) ? null : isoDay(date);
}

async function bingCall(method) {
  const q = new URLSearchParams({ siteUrl: BING_SITE, apikey: bingKey() });
  const response = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/${method}?${q}`);
  const text = await response.text();
  if (!response.ok) throw new Error(`Bing ${method}: ${text.slice(0, 160) || response.status}`);
  const data = text ? JSON.parse(text) : {};
  return Array.isArray(data.d) ? data.d : [];
}

async function fetchBing() {
  if (!bingKey()) return { skipped: 'geen sleutel' };
  const now = new Date().toISOString();
  const daily = mergeRows(
    (await bingCall('GetRankAndTrafficStats'))
      .map(r => ({
        day: bingDay(r.Date),
        source: 'bing',
        country: '',
        clicks: Number(r.Clicks) || 0,
        impressions: Number(r.Impressions) || 0,
        position: null,
        fetched_at: now
      }))
      .filter(r => r.day),
    r => r.day
  );
  const items = [];
  for (const [kind, method] of [
    ['query', 'GetQueryStats'],
    ['page', 'GetPageStats']
  ]) {
    const rows = (await bingCall(method)).map(r => {
      const position = Number(r.AvgImpressionPosition);
      return {
        day: bingDay(r.Date),
        source: 'bing',
        kind,
        country: '',
        item: (kind === 'page' ? pagePath(r.Query || r.Page || r.Url) : String(r.Query || '')).slice(0, 300),
        clicks: Number(r.Clicks) || 0,
        impressions: Number(r.Impressions) || 0,
        position: Number.isFinite(position) && position > 0 ? position : null,
        fetched_at: now
      };
    });
    items.push(
      ...mergeRows(
        rows.filter(r => r.day && r.item),
        r => `${r.day}|${r.kind}|${r.item}`
      )
    );
  }
  return {
    days: await saveRows('seo_daily', daily, 'day,source,country'),
    items: await saveRows('seo_items', items, 'day,source,kind,country,item')
  };
}

// Nachtelijke taak: beide bronnen apart, zodat de ene niet stilvalt als de andere een fout geeft.
export async function fetchSearchStats() {
  const out = {};
  for (const [name, job] of [
    ['google', fetchGoogle],
    ['bing', fetchBing]
  ]) {
    try {
      out[name] = await job();
    } catch (error) {
      // Tabellen nog niet aangemaakt (supabase/2026-11-23-zoekmachines.sql): niets te doen.
      out[name] = { error: /seo_(daily|items)/.test(error.message || '') ? 'SQL nog niet uitgevoerd' : error.message };
    }
  }
  return out;
}

// ---- Lezen voor /admin en het dagrapport ----

async function selectEvery(table, query) {
  const out = [];
  for (let offset = 0; offset < 200000; offset += 1000) {
    const rows = (await select(table, `${query}&limit=1000&offset=${offset}`)) || [];
    out.push(...rows);
    if (rows.length < 1000) break;
  }
  return out;
}

// Totaal over rijen: klikken, vertoningen, klikratio en positie gewogen naar vertoningen.
function sumRows(rows) {
  let clicks = 0;
  let impressions = 0;
  let weighted = 0;
  let weight = 0;
  for (const r of rows) {
    clicks += Number(r.clicks) || 0;
    impressions += Number(r.impressions) || 0;
    if (r.position != null) {
      weighted += Number(r.position) * (Number(r.impressions) || 0);
      weight += Number(r.impressions) || 0;
    }
  }
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : null,
    position: weight ? weighted / weight : null
  };
}

// Zoektermen of pagina's van twee even lange periodes naast elkaar.
function compareItems(rows, from, prevFrom, limit) {
  const map = new Map();
  for (const r of rows) {
    if (r.day < prevFrom) continue;
    const entry = map.get(r.item) || { item: r.item, now: [], prev: [] };
    (r.day >= from ? entry.now : entry.prev).push(r);
    map.set(r.item, entry);
  }
  return [...map.values()]
    .map(e => ({ item: e.item, now: sumRows(e.now), prev: sumRows(e.prev) }))
    .sort((a, b) => b.now.impressions - a.now.impressions || b.prev.impressions - a.prev.impressions)
    .slice(0, limit);
}

// Gegevens voor /admin → Zoekmachines. days: lengte van de periode; country: twee letters of '' (alle landen).
export async function searchOverview({ days, country } = {}) {
  const span = Math.min(3650, Math.max(7, Number(days) || 28));
  const cc = /^[a-z]{2}$/.test(String(country || '')) ? String(country) : '';
  let tokenRow = [];
  try {
    tokenRow = await select('admin_settings', `key=eq.${SEARCH_TOKEN_KEY}&select=updated_at`);
  } catch (_) {}
  const status = {
    google: !searchClientId() || !searchClientSecret() ? 'setup' : tokenRow?.length ? 'ok' : 'connect',
    bing: bingKey() ? 'ok' : 'setup'
  };
  let daily;
  try {
    daily = await selectEvery(
      'seo_daily',
      `select=day,source,country,clicks,impressions,position,fetched_at&day=gte.${daysAgo(Math.max(span * 2, 35) + 3)}&order=day.asc`
    );
  } catch (error) {
    if (/seo_daily/.test(error.message || '')) return { status, sql: false };
    throw error;
  }
  // Periodes per bron vanaf de laatste dag met cijfers (Google loopt een paar dagen achter).
  const latest = {};
  for (const r of daily) if (!latest[r.source] || r.day > latest[r.source]) latest[r.source] = r.day;
  const periods = Object.fromEntries(
    Object.entries(latest).map(([source, end]) => [
      source,
      { end, from: addDays(end, -(span - 1)), prevFrom: addDays(end, -(span * 2 - 1)) }
    ])
  );
  const items = {};
  for (const source of ['google', 'bing']) {
    const p = periods[source];
    if (!p || (cc && source === 'bing')) continue;
    const rows = await selectEvery(
      'seo_items',
      `select=day,kind,item,clicks,impressions,position&source=eq.${source}&day=gte.${p.prevFrom}&day=lte.${p.end}${
        cc ? `&country=eq.${cc}` : ''
      }`
    );
    items[source] = {
      query: compareItems(
        rows.filter(r => r.kind === 'query'),
        p.from,
        p.prevFrom,
        30
      ),
      page: compareItems(
        rows.filter(r => r.kind === 'page'),
        p.from,
        p.prevFrom,
        30
      )
    };
  }
  const fetched = daily.reduce((max, r) => (r.fetched_at > max ? r.fetched_at : max), '');
  return {
    status,
    sql: true,
    days: span,
    country: cc,
    periods,
    fetched_at: fetched || null,
    daily: daily.map(({ fetched_at, ...r }) => r),
    items
  };
}

// ---- Trend voor het dagrapport ----

const nl = v => Math.round(v).toLocaleString('nl-NL');
const pct = (now, prev) =>
  now === prev ? 'gelijk' : prev ? `${now >= prev ? '+' : ''}${Math.round(((now - prev) / prev) * 100)}%` : 'nieuw';
const dayLabel = day =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', timeZone: 'UTC' });

// Korte tekst met wat er veranderde: laatste 7 dagen met cijfers tegen de 7 dagen ervoor, de landen en zoektermen die
// het meest stegen of daalden, en de weken van de laatste maand. Leeg als er (nog) niets is.
export async function searchTrendText() {
  let data;
  try {
    data = await searchOverview({ days: 7 });
  } catch (error) {
    return '';
  }
  if (!data?.sql || !data.daily?.length) return '';
  const lines = [];
  for (const source of ['google', 'bing']) {
    const p = data.periods[source];
    if (!p) continue;
    const name = source === 'google' ? 'Google' : 'Bing';
    const rows = data.daily.filter(r => r.source === source);
    const now = sumRows(rows.filter(r => r.day >= p.from && r.day <= p.end));
    const prev = sumRows(rows.filter(r => r.day >= p.prevFrom && r.day < p.from));
    lines.push(`${name}, ${dayLabel(p.from)} t/m ${dayLabel(p.end)} tegen de week ervoor:`);
    lines.push(`- Klikken: ${nl(now.clicks)} (was ${nl(prev.clicks)}, ${pct(now.clicks, prev.clicks)})`);
    lines.push(
      `- Vertoningen: ${nl(now.impressions)} (was ${nl(prev.impressions)}, ${pct(now.impressions, prev.impressions)})`
    );
    if (now.position != null && prev.position != null)
      lines.push(
        `- Gemiddelde positie: ${now.position.toFixed(1).replace('.', ',')} (was ${prev.position
          .toFixed(1)
          .replace(
            '.',
            ','
          )}, ${now.position < prev.position ? 'beter' : now.position > prev.position ? 'lager' : 'gelijk'})`
      );
    if (source === 'google') {
      // Landen met de grootste verschuiving in vertoningen.
      const byCountry = new Map();
      for (const r of rows) {
        if (r.day < p.prevFrom || r.day > p.end) continue;
        const e = byCountry.get(r.country) || { now: 0, prev: 0 };
        if (r.day >= p.from) e.now += r.impressions;
        else e.prev += r.impressions;
        byCountry.set(r.country, e);
      }
      const moved = [...byCountry]
        .filter(([cc, e]) => cc !== 'zz' && Math.abs(e.now - e.prev) >= 10)
        .sort((a, b) => Math.abs(b[1].now - b[1].prev) - Math.abs(a[1].now - a[1].prev))
        .slice(0, 4);
      if (moved.length)
        lines.push(
          `- Landen (vertoningen): ${moved
            .map(([cc, e]) => `${cc.toUpperCase()} ${nl(e.now)} (was ${nl(e.prev)})`)
            .join(', ')}`
        );
      // Vier weken op een rij: zie je een richting?
      const weeks = [3, 2, 1, 0].map(w => {
        const end = addDays(p.end, -7 * w);
        return sumRows(rows.filter(r => r.day > addDays(end, -7) && r.day <= end)).impressions;
      });
      const up = weeks.every((v, i) => !i || v > weeks[i - 1]);
      const down = weeks.every((v, i) => !i || v < weeks[i - 1]);
      lines.push(
        `- Vertoningen per week, laatste vier: ${weeks.map(nl).join(' → ')}${
          up ? ' (elke week meer)' : down ? ' (elke week minder)' : ''
        }`
      );
    }
    const queries = data.items[source]?.query || [];
    const movers = queries
      .map(q => ({ ...q, delta: q.now.impressions - q.prev.impressions }))
      .filter(q => Math.abs(q.delta) >= 5);
    const rising = movers
      .filter(q => q.delta > 0)
      .sort((a, b) => b.delta - a.delta)
      .slice(0, 5);
    const falling = movers
      .filter(q => q.delta < 0)
      .sort((a, b) => a.delta - b.delta)
      .slice(0, 3);
    if (rising.length)
      lines.push(
        `- Zoektermen omhoog: ${rising.map(q => `"${q.item}" ${nl(q.now.impressions)} (was ${nl(q.prev.impressions)})`).join(', ')}`
      );
    if (falling.length)
      lines.push(
        `- Zoektermen omlaag: ${falling.map(q => `"${q.item}" ${nl(q.now.impressions)} (was ${nl(q.prev.impressions)})`).join(', ')}`
      );
    lines.push('');
  }
  return lines.join('\n').trim();
}
