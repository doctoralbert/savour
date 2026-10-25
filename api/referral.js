// Nodig een collega uit: wie via iemands link (savour.page/?collega=<id>) een account maakt en het e-mailadres
// bevestigt, krijgt samen met degene die uitnodigde een maand Savour Pro cadeau.
// De app vraagt dit één keer aan na het inloggen (claimReferral in js/features/referral.js); alleen de server
// mag Pro geven. Grenzen: alleen nieuwe accounts (max. 30 dagen oud), één keer per account, nooit jezelf,
// en per uitnodiger hooguit MAX_REWARDS maanden.
import { getUserFromRequest } from './_lib/auth.js';
import { getSubscription, upsertSubscription, getAuthUser, updateAppMetadata } from './_lib/supabase-admin.js';
import { stripe, hasStripe, PLAN_MONTHLY_EUR } from './_lib/stripe.js';

const DAY = 86400000;
const GIFT_DAYS = 30;
const MAX_REWARDS = 12;
const MAX_ACCOUNT_AGE_DAYS = 30;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const paid = sub => !!sub?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(sub.status);

// Cadeau-Pro verlengen: na de lopende cadeau-periode (of de proefweek) komen er dagen bij.
async function extendGift(userId, days, notBefore = 0) {
  const sub = await getSubscription(userId);
  const runningGift =
    sub?.plan === 'gift' && sub.status === 'active' && sub.current_period_end
      ? new Date(sub.current_period_end).getTime()
      : 0;
  const start = Math.max(Date.now(), runningGift, notBefore);
  const until = new Date(start + days * DAY).toISOString();
  await upsertSubscription({ user_id: userId, status: 'active', plan: 'gift', current_period_end: until });
  return until;
}

// Betaalt de uitnodiger al? Dan een maand tegoed op de volgende Stripe-factuur in plaats van cadeau-Pro.
async function rewardInviter(inviterId) {
  const sub = await getSubscription(inviterId);
  if (paid(sub)) {
    if (!hasStripe() || !sub.stripe_customer_id) return { type: 'none' };
    await stripe(`customers/${encodeURIComponent(sub.stripe_customer_id)}/balance_transactions`, {
      amount: -Math.round(PLAN_MONTHLY_EUR.month * 100),
      currency: 'eur',
      description: 'Savour: een maand cadeau voor het uitnodigen van een collega'
    });
    return { type: 'credit' };
  }
  return { type: 'gift', until: await extendGift(inviterId, GIFT_DAYS) };
}

async function claim(user) {
  const meta = user.app_metadata || {};
  if (meta.referral_claimed) return { status: 'already' };
  const inviterId = String(user.user_metadata?.invited_by || '');
  if (!UUID.test(inviterId) || inviterId === user.id) return { status: 'none' };
  // Pas na het bevestigen van het e-mailadres; tot dan probeert de app het later opnieuw.
  if (!user.email_confirmed_at) return { status: 'unconfirmed' };
  const created = new Date(user.created_at).getTime();
  if (!created || Date.now() - created > MAX_ACCOUNT_AGE_DAYS * DAY) {
    await updateAppMetadata(user.id, { ...meta, referral_claimed: 'te-oud' });
    return { status: 'expired' };
  }
  const inviter = await getAuthUser(inviterId);
  if (!inviter?.id) {
    await updateAppMetadata(user.id, { ...meta, referral_claimed: 'onbekend' });
    return { status: 'none' };
  }
  // Eerst vastleggen dat dit account geclaimd heeft, zodat twee gelijktijdige aanvragen niet dubbel geven.
  await updateAppMetadata(user.id, { ...meta, referral_claimed: new Date().toISOString(), referred_by: inviterId });

  // De nieuwe collega: een maand Pro na de proefweek (niet over een betaald abonnement heen).
  let mine = null;
  if (!paid(await getSubscription(user.id))) mine = await extendGift(user.id, GIFT_DAYS, created + 7 * DAY);

  // De uitnodiger: tot MAX_REWARDS keer een maand.
  const inviterMeta = inviter.app_metadata || {};
  const count = Number(inviterMeta.referral_rewards) || 0;
  let reward = { type: 'max' };
  if (count < MAX_REWARDS) {
    reward = await rewardInviter(inviterId);
    await updateAppMetadata(inviterId, { ...inviterMeta, referral_rewards: count + 1 });
  }
  return { status: 'claimed', until: mine, inviter: reward.type };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Log eerst in.' });
  try {
    const { action } = req.body || {};
    if (action === 'claim') return res.status(200).json(await claim(user));
    if (action === 'stats')
      return res.status(200).json({ rewards: Number(user.app_metadata?.referral_rewards) || 0, max: MAX_REWARDS });
    return res.status(400).json({ error: 'Onbekende actie.' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message || 'Er ging iets mis.' });
  }
}
