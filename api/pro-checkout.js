// Start het afrekenen voor Savour Pro (maand of jaar) via een Stripe-betaalpagina.
// iDEAL, kaart, Apple Pay/Google Pay en PayPal stel je in het Stripe-dashboard in; Stripe toont ze vanzelf.
import { getUserFromRequest } from './_lib/auth.js';
import { stripe, priceFor, hasStripe } from './_lib/stripe.js';
import { getSubscription, upsertSubscription, hasServiceRole } from './_lib/supabase-admin.js';
import { siteOrigin } from './_lib/origin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasStripe() || !hasServiceRole())
    return res.status(503).json({ error: 'Betalen is nog niet ingesteld.', code: 'not_configured' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log in om Savour Pro te nemen.' });
  try {
    const plan = req.body?.plan === 'year' ? 'year' : 'month';
    const price = priceFor(plan);
    if (!price) return res.status(503).json({ error: 'Betalen is nog niet ingesteld.', code: 'not_configured' });

    const sub = await getSubscription(user.id);
    if (sub?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(sub.status))
      return res.status(409).json({ error: 'Je hebt Savour Pro al.', code: 'already_pro' });

    // Eén Stripe-klant per Savour-gebruiker.
    let customer = sub?.stripe_customer_id;
    if (!customer) {
      const created = await stripe('customers', { email: user.email, metadata: { user_id: user.id } });
      customer = created.id;
      await upsertSubscription({ user_id: user.id, stripe_customer_id: customer, status: sub?.status || 'inactive' });
    }

    const origin = siteOrigin(req);
    const session = await stripe('checkout/sessions', {
      mode: 'subscription',
      customer,
      client_reference_id: user.id,
      line_items: [{ price, quantity: 1 }],
      subscription_data: { metadata: { user_id: user.id } },
      allow_promotion_codes: 'true',
      locale: 'nl',
      success_url: `${origin}/?pro=success`,
      cancel_url: `${origin}/pro`
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Savour Pro checkout', error);
    return res.status(500).json({ error: 'Afrekenen kon niet worden gestart. Probeer het later opnieuw.' });
  }
}
