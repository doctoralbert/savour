import { randomBytes } from 'node:crypto';
import {
  select,
  insert,
  update,
  hasServiceRole,
  storageUploadUrl,
  storageList,
  getSubscription,
  upsertSubscription,
  upsertOrganization,
  passwordLink
} from './_lib/supabase-admin.js';
import { sendMail } from './_lib/mail.js';
import { intakeMail } from './_lib/intake-mail.js';
import { stripe, hasStripe, priceFor } from './_lib/stripe.js';
import { siteOrigin } from './_lib/origin.js';
import {
  INTAKE_BUCKET as BUCKET,
  PACKAGES,
  SEAT_YEAR_EUR,
  deliverLink,
  packageLabel,
  cleanText as clean,
  isEmail
} from './_lib/intake.js';

// Import service, klantkant. Geen account nodig: de lange, geheime token in de link is de toegang.
// - request:  aanvraag vanaf de website (zonder token); de beheerder krijgt een mail en ziet hem in /admin → Inladen
// - get:      stand van zaken voor de aanleverpagina
// - checkout: na goedkeuring betalen (teamabonnement per jaar + pakket) via Stripe
// - upload:   eenmalige uploadlink voor één bestand in de privé-bucket (pas na betalen)
// - submit:   mappenstructuur, opmerkingen en de e-mailadressen van de leden
// GET ?welkom=...: welkomstlink uit de mail na het vrijgeven → verse wachtwoordlink (zie welcome_links).
const MAX_SIZE = 50 * 1024 * 1024;
const MAX_FILES = 300;
const ALLOWED =
  /\.(docx?|pdf|jpe?g|png|heic|heif|webp|gif|tiff?|txt|rtf|odt|pages|xlsx?|ods|numbers|csv|json|html?|xml|zip|paprikarecipes|mx2|md)$/i;
const DELIVERING = ['betaald', 'ingediend'];

// Alleen veilige tekens in de opslagnaam; de tijd ervoor voorkomt dat twee bestanden elkaar overschrijven.
const safeName = name =>
  `${Date.now().toString(36)}-${
    clean(name, 140)
      .normalize('NFKD')
      .replace(/[^\w.\- ]+/g, '')
      .replace(/\s+/g, '_') || 'bestand'
  }`;
// Voor de klant: zonder het tijdvoorvoegsel.
const shownName = name => name.replace(/^[a-z0-9]+-/, '').replace(/_/g, ' ');

async function findIntake(token) {
  if (!/^[a-f0-9]{32,64}$/.test(String(token || ''))) return null;
  const rows = await select('recipe_intakes', `token=eq.${token}&select=*`);
  return rows?.[0] || null;
}

async function notifyAdmin(subject, text) {
  await sendMail({
    to: process.env.BUG_REPORT_TO || 'contact@savour.page',
    subject,
    text,
    html: `<pre style="font-family:inherit;white-space:pre-wrap">${text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])}</pre>`
  }).catch(e => console.warn('Inladen: mail aan beheerder niet verstuurd', e.message));
}

async function request(body) {
  // Verborgen veld dat alleen spambots invullen: niets doen, wel 'gelukt' melden.
  if (body.website) return { ok: true };
  const row = {
    token: randomBytes(24).toString('hex'),
    language: ['nl', 'en', 'de', 'es'].includes(body.language) ? body.language : 'nl',
    name: clean(body.name, 120),
    email: clean(body.email, 240).toLowerCase(),
    restaurant: clean(body.restaurant, 160),
    package: Object.hasOwn(PACKAGES, body.package) ? body.package : null,
    seats: [5, 10, 25].includes(Number(body.seats)) ? Number(body.seats) : null,
    request_notes: clean(body.notes, 6000) || null
  };
  if (!row.name || !isEmail(row.email) || !row.restaurant)
    throw Object.assign(new Error('Vul je naam, e-mailadres en restaurant in.'), { status: 400 });
  // Hooguit drie open aanvragen per e-mailadres per dag, tegen per ongeluk dubbel versturen of misbruik.
  const since = new Date(Date.now() - 86400000).toISOString();
  const recent = await select(
    'recipe_intakes',
    `email=eq.${encodeURIComponent(row.email)}&created_at=gt.${since}&select=id`
  );
  if ((recent || []).length >= 3) return { ok: true };
  await insert('recipe_intakes', row);
  const summary = `Pakket: ${packageLabel(row.package) || 'weet nog niet'}
Organisatie: ${row.seats ? `${row.seats} personen` : 'weet nog niet'}
Taal: ${row.language}

${row.request_notes || ''}

Goedkeuren of afwijzen: /admin → Inladen.`;
  // Ook in /admin → Berichten, net als het contactformulier. Lukt dat niet, dan gaat de mail gewoon door.
  await insert('contact_messages', {
    kind: 'contact',
    name: row.name,
    email: row.email,
    subject: `Import service: aanvraag van ${row.restaurant}`.slice(0, 180),
    message: summary,
    language: row.language
  }).catch(e => console.warn('Inladen: niet in Berichten gezet', e.message));
  await notifyAdmin(
    `Savour import service: nieuwe aanvraag van ${row.restaurant}`,
    `Nieuwe aanvraag voor de import service\n\nRestaurant: ${row.restaurant}\nNaam: ${row.name}\nE-mail: ${row.email}\nPakket: ${packageLabel(row.package) || 'weet nog niet'}\nOrganisatie: ${row.seats ? `${row.seats} personen` : 'weet nog niet'}\nTaal: ${row.language}\n\n${row.request_notes || ''}\n\nGoedkeuren of afwijzen: savour.page/admin → Inladen.`
  );
  await sendMail({ to: row.email, ...intakeMail('received', row) }).catch(e =>
    console.warn('Inladen: ontvangstbevestiging niet verstuurd', e.message)
  );
  return { ok: true };
}

// Terug van Stripe: de betaling zelf bij Stripe nakijken, zodat de klant niet op de webhook hoeft te wachten
// (die komt ook, maar soms later). Alleen een afgeronde, betaalde sessie van deze aanvraag telt.
async function paidCheck(intake, sessionId) {
  if (intake.status !== 'goedgekeurd' || !/^cs_[A-Za-z0-9_]+$/.test(String(sessionId || '')) || !hasStripe())
    return intake;
  const session = await stripe(`checkout/sessions/${sessionId}`, null, 'GET').catch(() => null);
  const paid = session?.status === 'complete' && ['paid', 'no_payment_required'].includes(session.payment_status);
  if (!paid || String(session.metadata?.intake_id) !== String(intake.id)) return intake;
  const values = { status: 'betaald', paid_at: new Date().toISOString() };
  await update('recipe_intakes', `id=eq.${intake.id}&status=eq.goedgekeurd`, values);
  return { ...intake, ...values };
}

async function state(intake) {
  const files = DELIVERING.includes(intake.status) ? await storageList(BUCKET, `${intake.id}/`) : [];
  const p = PACKAGES[intake.package];
  return {
    status: intake.status,
    name: intake.name,
    restaurant: intake.restaurant,
    package: packageLabel(intake.package, intake.language),
    price_cents: intake.price_cents ?? p?.cents ?? null,
    seats: intake.seats || 5,
    seat_prices: SEAT_YEAR_EUR,
    structure: intake.structure,
    folders: intake.folders,
    match: intake.match,
    notes: intake.notes,
    members: intake.members || [],
    files: files.map(f => shownName(f.name))
  };
}

async function checkout(intake, body, origin) {
  if (intake.status !== 'goedgekeurd')
    throw Object.assign(new Error('Deze bestelling kan nu niet worden betaald.'), { status: 409 });
  if (!hasStripe())
    throw Object.assign(new Error('Betalen is nog niet ingesteld (Stripe-sleutel ontbreekt).'), { status: 503 });
  if (!intake.owner_id)
    throw Object.assign(new Error('Deze aanvraag is nog niet klaar om te betalen.'), { status: 409 });
  const seats = [5, 10, 25].includes(Number(body.seats)) ? Number(body.seats) : intake.seats || 5;
  const plan = `team${seats}_year`;
  const price = priceFor(plan);
  if (!price) throw Object.assign(new Error(`Betalen is nog niet ingesteld (prijs Team ${seats}).`), { status: 503 });
  const ownerId = intake.owner_id;

  const [existing] = await select('organizations', `owner_id=eq.${encodeURIComponent(ownerId)}&select=*`);
  if (existing?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(existing.status))
    throw Object.assign(
      new Error('Op dit e-mailadres is al een organisatie actief. Mail ons op contact@savour.page.'),
      { status: 409 }
    );
  const org = await upsertOrganization({ owner_id: ownerId, name: intake.restaurant || intake.name, seats, plan });

  // Eén Stripe-klant per Savour-gebruiker (zelfde regel als api/pro-checkout.js).
  const sub = await getSubscription(ownerId);
  let customer = sub?.stripe_customer_id;
  if (customer) {
    const c = await stripe(`customers/${encodeURIComponent(customer)}`, null, 'GET').catch(() => null);
    if (!c || c.deleted) customer = null;
  }
  if (!customer) {
    customer = (
      await stripe('customers', {
        email: intake.email,
        name: intake.restaurant || undefined,
        metadata: { user_id: ownerId }
      })
    ).id;
    await upsertSubscription({ user_id: ownerId, stripe_customer_id: customer, status: sub?.status || 'inactive' });
  }

  const cents = intake.price_cents ?? PACKAGES[intake.package]?.cents ?? 0;
  const line_items = [{ price, quantity: 1 }];
  if (cents > 0)
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: cents,
        product_data: { name: `Savour import service · ${packageLabel(intake.package, intake.language) || 'op maat'}` }
      }
    });
  const back = deliverLink(origin, intake);
  const session = await stripe('checkout/sessions', {
    mode: 'subscription',
    customer,
    client_reference_id: ownerId,
    line_items,
    metadata: { intake_id: String(intake.id) },
    subscription_data: { metadata: { user_id: ownerId, organization_id: org?.id, intake_id: String(intake.id) } },
    allow_promotion_codes: 'true',
    locale: intake.language === 'en' ? 'en' : intake.language,
    // Stripe vult {CHECKOUT_SESSION_ID} zelf in; daarmee controleren we de betaling bij terugkomst (zie paidCheck).
    success_url: `${back}&betaald=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: back
  });
  await update('recipe_intakes', `id=eq.${intake.id}`, { seats, organization_id: org?.id || null });
  return { url: session.url };
}

async function submit(intake, body) {
  const seats = intake.seats || 5;
  const owner = String(intake.email || '').toLowerCase();
  const seen = new Set([owner]);
  const members = [];
  for (const m of Array.isArray(body.members) ? body.members : []) {
    const email = clean(m?.email, 240).toLowerCase();
    if (!email || seen.has(email)) continue;
    if (!isEmail(email)) throw Object.assign(new Error(`Ongeldig e-mailadres: ${email}`), { status: 400 });
    seen.add(email);
    members.push({ email, role: m?.role === 'editor' ? 'editor' : 'viewer' });
  }
  // Jij (de eigenaar) telt als eerste plek mee.
  if (members.length > seats - 1)
    throw Object.assign(new Error(`Je team heeft ${seats} plekken: jij en ${seats - 1} collega's.`), {
      status: 400
    });
  const values = {
    structure: clean(body.structure, 80),
    folders: clean(body.folders, 6000),
    match: clean(body.match, 3000),
    notes: clean(body.notes, 6000),
    members,
    submitted_at: new Date().toISOString(),
    status: 'ingediend'
  };
  await update('recipe_intakes', `id=eq.${intake.id}`, values);
  const files = await storageList(BUCKET, `${intake.id}/`);
  const who = intake.restaurant || intake.name || intake.email;
  await notifyAdmin(
    `Savour import service: aanlevering van ${who}`,
    `Nieuwe aanlevering voor de import service\n\nVoor: ${who}\nPakket: ${packageLabel(intake.package) || '-'}\nOrganisatie: ${seats} plekken\nBestanden: ${files.length}\nLeden: ${members.map(m => `${m.email} (${m.role === 'editor' ? 'bewerken' : 'bekijken'})`).join(', ') || '-'}\nIndeling: ${values.structure || '-'}\n\nMappen:\n${values.folders || '-'}\n\nWelk recept in welke map:\n${values.match || '-'}\n\nOpmerkingen:\n${values.notes || '-'}\n\nInladen en vrijgeven: savour.page/admin → Inladen.`
  );
  return { ok: true, files: files.length };
}

// Welkomstlink → verse wachtwoordlink. Ongeldig of verlopen: naar het inlogscherm (daar kan "Wachtwoord vergeten?").
async function welcome(req, res) {
  const token = String(req.query?.welkom || '');
  // Alleen naar onze eigen adressen terugsturen (savour.page, de testversie op Vercel of lokaal).
  const host = String(req.headers.host || '');
  const origin = /^(localhost|127.0.0.d+)(:d+)?$/.test(host)
    ? `http://${host}`
    : /^((www.)?savour.page|[a-z0-9-]+.vercel.app)$/.test(host)
      ? `https://${host}`
      : 'https://savour.page';
  try {
    if (/^[a-f0-9]{32,64}$/.test(token)) {
      const [row] = await select(
        'welcome_links',
        `token=eq.${token}&expires_at=gt.${new Date().toISOString()}&select=email`
      );
      if (row) {
        res.writeHead(302, { Location: await passwordLink(row.email, origin), 'Cache-Control': 'no-store' });
        return res.end();
      }
    }
  } catch (e) {
    console.error('Welkomstlink', e);
  }
  res.writeHead(302, { Location: `${origin}/?auth=login`, 'Cache-Control': 'no-store' });
  return res.end();
}

export default async function handler(req, res) {
  if (!hasServiceRole()) return res.status(503).json({ error: 'Niet beschikbaar.' });
  if (req.method === 'GET' && req.query?.welkom) return welcome(req, res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { action, token } = req.body || {};
  try {
    if (action === 'request') return res.status(200).json(await request(req.body));
    const intake = await findIntake(token);
    if (!intake) return res.status(404).json({ error: 'Deze link klopt niet.' });
    if (action === 'get') return res.status(200).json(await state(await paidCheck(intake, req.body.session_id)));
    if (action === 'checkout') return res.status(200).json(await checkout(intake, req.body, siteOrigin(req)));
    if (!DELIVERING.includes(intake.status)) return res.status(409).json({ error: 'Aanleveren kan nu niet.' });

    if (action === 'upload') {
      const name = clean(req.body.name, 200);
      const size = Number(req.body.size) || 0;
      if (!name || !ALLOWED.test(name))
        return res.status(400).json({ error: 'Dit bestandstype kunnen we niet gebruiken.' });
      if (size > MAX_SIZE) return res.status(400).json({ error: 'Bestand is groter dan 50 MB.' });
      const existing = await storageList(BUCKET, `${intake.id}/`);
      if (existing.length >= MAX_FILES) return res.status(400).json({ error: 'Maximaal aantal bestanden bereikt.' });
      return res.status(200).json({ url: await storageUploadUrl(BUCKET, `${intake.id}/${safeName(name)}`) });
    }
    if (action === 'submit') return res.status(200).json(await submit(intake, req.body));
    return res.status(400).json({ error: 'Onbekende actie.' });
  } catch (error) {
    if (!error.status) console.error('Aanleveren', action, error);
    return res.status(error.status || 500).json({
      error: error.status ? error.message : 'Er ging iets mis. Probeer het opnieuw of mail contact@savour.page.'
    });
  }
}
