// Opent het Stripe-klantportaal: opzeggen, betaalmethode wijzigen, facturen downloaden.
import { getUserFromRequest } from './_lib/auth.js';
import { stripe, hasStripe } from './_lib/stripe.js';
import { getSubscription, hasServiceRole } from './_lib/supabase-admin.js';
import { siteOrigin } from './_lib/origin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasStripe() || !hasServiceRole())
    return res.status(503).json({ error: 'Betalen is nog niet ingesteld.', code: 'not_configured' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log opnieuw in.' });
  try {
    const sub = await getSubscription(user.id);
    if (!sub?.stripe_customer_id) return res.status(404).json({ error: 'Er is nog geen abonnement om te beheren.' });
    const session = await stripe('billing_portal/sessions', {
      customer: sub.stripe_customer_id,
      return_url: `${siteOrigin(req)}/?pro=portal`
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Savour Pro portal', error);
    return res.status(500).json({ error: 'Abonnement beheren kon niet worden geopend.' });
  }
}
