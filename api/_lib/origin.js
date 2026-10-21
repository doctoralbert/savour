// Het adres waar Stripe na betalen naar terugstuurt. Alleen bekende adressen, zodat niemand een
// betaling naar een vreemde site kan laten doorsturen.
export function siteOrigin(req) {
  const origin = String(req.headers?.origin || '');
  const allowed =
    /^https:\/\/(www\.)?savour\.page$/.test(origin) ||
    /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) ||
    /^http:\/\/(localhost|127\.0\.0\.\d+)(:\d+)?$/.test(origin);
  return allowed ? origin : 'https://savour.page';
}
