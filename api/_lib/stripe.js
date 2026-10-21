// Stripe zonder extra pakket: de REST-API met fetch, en de controle van webhook-handtekeningen met crypto.
import crypto from 'node:crypto';

// Stripe verwacht formuliervelden, ook voor geneste waarden: line_items[0][price]=...
function formEncode(obj, prefix = '', out = new URLSearchParams()) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    const name = prefix ? `${prefix}[${key}]` : key;
    if (typeof value === 'object') formEncode(value, name, out);
    else out.append(name, String(value));
  }
  return out;
}

export function hasStripe() {
  return !!process.env.STRIPE_SECRET_KEY;
}

export async function stripe(path, params, method = 'POST') {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY ontbreekt in Vercel Environment Variables.');
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: method === 'GET' ? undefined : formEncode(params || {})
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || `Stripe-fout (${response.status})`);
  return data;
}

// Controleert of een webhook echt van Stripe komt (header Stripe-Signature: t=...,v1=...).
export function verifyStripeSignature(rawBody, header, secret, toleranceSeconds = 300) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(
    String(header)
      .split(',')
      .map(p => p.split('='))
      .filter(p => p.length === 2)
  );
  const signatures = String(header)
    .split(',')
    .filter(p => p.startsWith('v1='))
    .map(p => p.slice(3));
  const timestamp = Number(parts.t);
  if (!timestamp || !signatures.length) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > toleranceSeconds) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawBody}`, 'utf8').digest('hex');
  return signatures.some(sig => {
    const a = Buffer.from(sig, 'hex');
    const b = Buffer.from(expected, 'hex');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}

// Lees de ruwe body (nodig voor de handtekening). Lokaal zet local-server.mjs hem al klaar in req.rawBody.
export async function readRawBody(req) {
  if (typeof req.rawBody === 'string') return req.rawBody;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

// Welke prijs hoort bij maand of jaar (ingesteld in Vercel).
export function priceFor(plan) {
  return plan === 'year' ? process.env.STRIPE_PRICE_YEAR : process.env.STRIPE_PRICE_MONTH;
}

export function planForPrice(priceId) {
  if (priceId && priceId === process.env.STRIPE_PRICE_YEAR) return 'year';
  if (priceId && priceId === process.env.STRIPE_PRICE_MONTH) return 'month';
  return null;
}
