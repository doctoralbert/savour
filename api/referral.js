// Nodig een collega uit: maakt iemand via jouw link (savour.page/?collega=<id>) een account en bevestigt die het
// e-mailadres en logt die in, dan krijg jij 14 dagen Savour Pro cadeau. De nieuwe collega heeft zelf de gewone 7 dagen proef.
// De app vraagt dit één keer aan na het inloggen (claimReferral in js/features/referral.js); alleen de server
// mag Pro geven. Grenzen: alleen nieuwe accounts (max. 30 dagen oud), één keer per account, nooit jezelf,
// en per uitnodiger hooguit MAX_REWARDS keer.
import { getUserFromRequest } from './_lib/auth.js';
import { getSubscription, getAuthUser, updateAppMetadata } from './_lib/supabase-admin.js';
import { extendGift } from './_lib/referral-reward.js';
import { stripe, hasStripe, PLAN_MONTHLY_EUR } from './_lib/stripe.js';

const DAY = 86400000;
const GIFT_DAYS = 14;
const MAX_REWARDS = 12;
const MAX_ACCOUNT_AGE_DAYS = 30;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const paid = sub => !!sub?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(sub.status);

// De 14 dagen voor de uitnodiger:
// - betaalt die en loopt het abonnement door: 14 dagen tegoed (naar rato van de maandprijs) op de volgende Stripe-factuur;
// - betaalt die maar heeft opgezegd: de dagen worden bewaard en gaan in zodra het betaalde abonnement afloopt
//   (api/stripe-webhook.js → applyPendingReferralDays);
// - anders: 14 dagen cadeau-Pro, na wat er nu nog loopt.
async function rewardInviter(inviterId) {
  const sub = await getSubscription(inviterId);
  if (paid(sub)) {
    if (sub.cancel_at_period_end || !hasStripe() || !sub.stripe_customer_id) return { type: 'pending' };
    await stripe(`customers/${encodeURIComponent(sub.stripe_customer_id)}/balance_transactions`, {
      amount: -Math.round(((PLAN_MONTHLY_EUR.month * GIFT_DAYS) / 30) * 100),
      currency: 'eur',
      description: 'Savour: 14 dagen cadeau voor het uitnodigen van een collega'
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

  // De uitnodiger: tot MAX_REWARDS keer 14 dagen.
  const inviterMeta = inviter.app_metadata || {};
  const count = Number(inviterMeta.referral_rewards) || 0;
  let reward = { type: 'max' };
  if (count < MAX_REWARDS) {
    reward = await rewardInviter(inviterId);
    const pending = (Number(inviterMeta.referral_pending_days) || 0) + (reward.type === 'pending' ? GIFT_DAYS : 0);
    await updateAppMetadata(inviterId, {
      ...inviterMeta,
      referral_rewards: count + 1,
      ...(pending ? { referral_pending_days: pending } : {})
    });
  }
  return { status: 'claimed', inviter: reward.type };
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
