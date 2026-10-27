// Stripe meldt hier betalingen en wijzigingen in abonnementen. Alleen meldingen met een geldige
// handtekening (STRIPE_WEBHOOK_SECRET) worden verwerkt; daarna wordt public.subscriptions bijgewerkt.
//
// Instellen in Stripe → Developers → Webhooks → Add endpoint: https://savour.page/api/stripe-webhook
// met de gebeurtenissen checkout.session.completed en customer.subscription.created/updated/deleted.
import { stripe, verifyStripeSignature, readRawBody, planForPrice, TEAM_SEATS } from './_lib/stripe.js';
import { upsertSubscription, findSubscriptionByCustomer, update, select } from './_lib/supabase-admin.js';
import { sendMail, thankYouMail } from './_lib/mail.js';
import { applyPendingReferralDays } from './_lib/referral-reward.js';

// De ruwe body is nodig voor de handtekening, dus niet automatisch laten omzetten.
export const config = { api: { bodyParser: false } };

async function applySubscription(sub, userId) {
  if (!userId) return;
  const item = sub.items?.data?.[0];
  // Nieuwere Stripe-versies zetten de periode op het abonnementsitem, oudere op het abonnement zelf.
  const periodEnd = sub.current_period_end ?? item?.current_period_end;
  // Opzeggen: oudere Stripe-versies zetten cancel_at_period_end, nieuwere vullen cancel_at (de einddatum).
  const endsAt = sub.cancel_at || (sub.cancel_at_period_end ? periodEnd : null);
  const until = endsAt || periodEnd ? new Date((endsAt || periodEnd) * 1000).toISOString() : null;
  // Teamabonnement: het team bijwerken, niet het persoonlijke abonnement.
  if (sub.metadata?.organization_id) {
    const plan = planForPrice(item?.price?.id);
    await update('organizations', `id=eq.${encodeURIComponent(sub.metadata.organization_id)}`, {
      status: sub.status,
      ...(plan ? { plan, seats: TEAM_SEATS[plan.split('_')[0]] } : {}),
      stripe_subscription_id: sub.id,
      current_period_end: until,
      cancel_at_period_end: !!endsAt,
      updated_at: new Date().toISOString()
    });
    return;
  }
  await upsertSubscription({
    user_id: userId,
    status: sub.status,
    plan: planForPrice(item?.price?.id) || 'month',
    stripe_customer_id: sub.customer,
    stripe_subscription_id: sub.id,
    current_period_end: until,
    cancel_at_period_end: !!endsAt
  });
}

// Bedankmail na een geslaagde aankoop. Een mislukte mail mag het abonnement nooit tegenhouden.
async function sendThankYou(session, sub, userId) {
  try {
    const to = session.customer_details?.email || session.customer_email;
    if (!to) return;
    const plan = planForPrice(sub.items?.data?.[0]?.price?.id) || '';
    const team = plan.startsWith('team');
    let name = session.customer_details?.name || '';
    if (userId) {
      const [profile] = await select('profiles', `id=eq.${encodeURIComponent(userId)}&select=name`).catch(() => []);
      name = profile?.name || name;
    }
    await sendMail({ to, ...thankYouMail({ name, team, seats: team ? TEAM_SEATS[plan.split('_')[0]] : 0 }) });
  } catch (error) {
    console.error('Bedankmail', error);
  }
}

async function userIdFor(sub) {
  if (sub.metadata?.user_id) return sub.metadata.user_id;
  const row = await findSubscriptionByCustomer(sub.customer);
  return row?.user_id || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const raw = await readRawBody(req);
  if (!verifyStripeSignature(raw, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET))
    return res.status(400).json({ error: 'Ongeldige handtekening' });
  try {
    const event = JSON.parse(raw);
    const obj = event.data?.object || {};
    if (event.type === 'checkout.session.completed' && obj.mode === 'subscription' && obj.subscription) {
      const sub = await stripe(`subscriptions/${obj.subscription}`, null, 'GET');
      const userId = obj.client_reference_id || (await userIdFor(sub));
      await applySubscription(sub, userId);
      // Inlaadservice: de aanvraag staat op betaald en de klant kan aanleveren. Geen bedankmail: de accounts
      // krijgen pas een mail als de beheerder de organisatie vrijgeeft (api/admin.js).
      const intakeId = obj.metadata?.intake_id || sub.metadata?.intake_id;
      if (intakeId && /^d+$/.test(intakeId))
        await update('recipe_intakes', `id=eq.${intakeId}&status=eq.goedgekeurd`, {
          status: 'betaald',
          paid_at: new Date().toISOString()
        });
      else await sendThankYou(obj, sub, userId);
    } else if (event.type?.startsWith('customer.subscription.')) {
      // Meldingen kunnen dubbel of in de verkeerde volgorde komen: daarom de actuele stand bij Stripe opvragen.
      const sub = await stripe(`subscriptions/${obj.id}`, null, 'GET').catch(() => obj);
      const userId = await userIdFor(sub);
      await applySubscription(sub, userId);
      // Abonnement afgelopen: bewaarde cadeau-dagen voor het uitnodigen van collega's laten ingaan.
      if (sub.status === 'canceled' && userId && !sub.metadata?.organization_id)
        await applyPendingReferralDays(userId).catch(e => console.error('Cadeau-dagen collega', e));
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Stripe webhook', error);
    // 500 laat Stripe het later opnieuw proberen.
    return res.status(500).json({ error: 'Verwerken mislukt' });
  }
}
