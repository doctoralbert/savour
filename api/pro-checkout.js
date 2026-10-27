// Start het afrekenen voor Savour Pro (maand of jaar) of een teamabonnement (team5/10/25) via een
// Stripe-betaalpagina. iDEAL, kaart, Apple Pay/Google Pay en PayPal stel je in het Stripe-dashboard in.
import { getUserFromRequest } from './_lib/auth.js';
import { stripe, priceFor, hasStripe, isPlan, configuredPlans, TEAM_SEATS } from './_lib/stripe.js';
import {
  getSubscription,
  upsertSubscription,
  upsertOrganization,
  select,
  insert,
  insertReturning,
  update,
  hasServiceRole
} from './_lib/supabase-admin.js';
import { siteOrigin } from './_lib/origin.js';

export default async function handler(req, res) {
  // GET: welke abonnementen zijn ingesteld? De Pro-pagina toont alleen die (geen sleutels of prijs-ID's).
  if (req.method === 'GET') return res.status(200).json({ plans: configuredPlans() });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasStripe() || !hasServiceRole())
    return res.status(503).json({ error: 'Betalen is nog niet ingesteld.', code: 'not_configured' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log in om Savour Pro te nemen.' });
  try {
    const plan = isPlan(req.body?.plan) ? req.body.plan : 'month';
    const team = plan.split('_')[0];
    const isTeam = Object.hasOwn(TEAM_SEATS, team);
    const price = priceFor(plan);
    if (!price) return res.status(503).json({ error: 'Betalen is nog niet ingesteld.', code: 'not_configured' });

    const sub = await getSubscription(user.id);
    if (!isTeam && sub?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(sub.status))
      return res.status(409).json({ error: 'Je hebt Savour Pro al.', code: 'already_pro' });

    // Team: het team bestaat al vóór het betalen (status inactive); de webhook zet het daarna actief.
    let organizationId = null;
    if (isTeam) {
      const [existing] = await select('organizations', `owner_id=eq.${encodeURIComponent(user.id)}&select=*`);
      if (existing?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(existing.status))
        return res.status(409).json({ error: 'Je hebt al een teamabonnement.', code: 'already_pro' });
      // Het brigade-abonnement hoort bij een keukenteam (shared_maps) van deze gebruiker. Bestaat dat nog niet,
      // dan maken we het hier aan met de opgegeven naam (zonder Pro kan de gebruiker dat zelf nog niet).
      const teamId = String(req.body?.team || '');
      let [map] = /^[0-9a-f-]{36}$/i.test(teamId)
        ? await select('shared_maps', `id=eq.${teamId}&owner_id=eq.${encodeURIComponent(user.id)}&select=id,name`)
        : [];
      const newName = String(req.body?.team_name || '')
        .trim()
        .slice(0, 120);
      if (!map && !newName) return res.status(400).json({ error: 'Kies eerst een keukenteam.' });
      const org = await upsertOrganization({
        owner_id: user.id,
        name: map?.name || newName,
        seats: TEAM_SEATS[team],
        plan,
        ...(map ? { shared_map_id: map.id } : {})
      });
      organizationId = org?.id;
      if (!map) {
        [map] = await insertReturning('shared_maps', [{ owner_id: user.id, name: newName }]);
        await insert('shared_map_members', { shared_map_id: map.id, user_id: user.id, role: 'owner' });
        await update('organizations', `id=eq.${org.id}`, { shared_map_id: map.id });
      }
    }

    // Eén Stripe-klant per Savour-gebruiker. Een klant uit de testomgeving (of een verwijderde) bestaat niet
    // bij de live-sleutel: dan maken we een nieuwe en vergeten we het oude test-abonnement.
    let customer = sub?.stripe_customer_id;
    if (customer && !(await customerExists(customer))) customer = null;
    if (!customer) {
      const created = await stripe('customers', { email: user.email, metadata: { user_id: user.id } });
      customer = created.id;
      await upsertSubscription({
        user_id: user.id,
        stripe_customer_id: customer,
        ...(sub?.stripe_customer_id ? { stripe_subscription_id: null } : {}),
        status: sub?.status || 'inactive'
      });
    }

    const origin = siteOrigin(req);
    const session = await stripe('checkout/sessions', {
      mode: 'subscription',
      customer,
      client_reference_id: user.id,
      line_items: [{ price, quantity: 1 }],
      subscription_data: {
        metadata: isTeam ? { user_id: user.id, organization_id: organizationId } : { user_id: user.id }
      },
      allow_promotion_codes: 'true',
      locale: 'nl',
      success_url: `${origin}/?pro=success`,
      cancel_url: `${origin}/pro`
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Savour Pro checkout', error);
    // De melding van Stripe (bijv. "No such price") bevat geen geheimen en helpt bij het oplossen.
    return res.status(500).json({ error: `Afrekenen kon niet worden gestart (${error.message || 'onbekende fout'}).` });
  }
}

async function customerExists(id) {
  try {
    const c = await stripe(`customers/${encodeURIComponent(id)}`, null, 'GET');
    return !c.deleted;
  } catch {
    return false;
  }
}
