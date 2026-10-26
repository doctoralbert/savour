// Beloning voor het uitnodigen van een collega (api/referral.js), gedeeld met api/stripe-webhook.js.
import { getSubscription, upsertSubscription, getAuthUser, updateAppMetadata } from './supabase-admin.js';

const DAY = 86400000;

// Cadeau-Pro: de dagen gaan in na wat er nu nog loopt (een eerdere cadeau-periode of een opgezegd abonnement
// dat nog doorloopt, of de gratis proefweek van een nieuw account), zodat er nooit dagen verloren gaan.
const TRIAL_DAYS = 7; // zelfde als supabase/2026-10-23-proef-7-dagen.sql
export async function extendGift(userId, days) {
  const sub = await getSubscription(userId);
  const end = sub?.current_period_end ? new Date(sub.current_period_end).getTime() : 0;
  const running = ['active', 'trialing', 'past_due', 'canceled'].includes(sub?.status) && end > Date.now();
  const user = await getAuthUser(userId);
  const trialEnd = user?.created_at ? new Date(user.created_at).getTime() + TRIAL_DAYS * DAY : 0;
  const start = Math.max(Date.now(), running ? end : 0, trialEnd);
  const until = new Date(start + days * DAY).toISOString();
  await upsertSubscription({
    user_id: userId,
    status: 'active',
    plan: 'gift',
    current_period_end: until,
    cancel_at_period_end: false
  });
  return until;
}

// Bewaarde cadeau-dagen (van iemand die betaalde maar had opgezegd) laten ingaan zodra het betaalde
// abonnement is afgelopen. Aangeroepen door de Stripe-webhook bij het einde van een abonnement.
export async function applyPendingReferralDays(userId) {
  const user = await getAuthUser(userId);
  const meta = user?.app_metadata || {};
  const days = Number(meta.referral_pending_days) || 0;
  if (!user?.id || days <= 0) return null;
  // Eerst op nul zetten: een dubbele melding van Stripe geeft zo nooit twee keer.
  await updateAppMetadata(userId, { ...meta, referral_pending_days: 0 });
  return extendGift(userId, days);
}
