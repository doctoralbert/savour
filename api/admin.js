// Beheerscherm (/admin): accounts met hun abonnement, Pro cadeau geven, omzet en AI-kosten.
// Alleen voor beheerders: het e-mailadres van de ingelogde gebruiker moet in ADMIN_EMAILS staan
// (Vercel, komma-gescheiden). Wachtwoorden staan nooit in de code; inloggen gaat via Supabase.
import { getUserFromRequest } from './_lib/auth.js';
import { select, rpc, listUsers, getSubscription, upsertSubscription, hasServiceRole } from './_lib/supabase-admin.js';
import { stripe, hasStripe, PLAN_MONTHLY_EUR } from './_lib/stripe.js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'schreurs.jop@gmail.com')
  .split(',')
  .map(x => x.trim().toLowerCase())
  .filter(Boolean);

const running = row =>
  !!row &&
  ['active', 'trialing', 'past_due', 'canceled'].includes(row.status) &&
  (!row.current_period_end || new Date(row.current_period_end) > new Date());

// Omschrijving van het account zoals in de tabel: Gratis, Proef, Pro maand/jaar, Cadeau, Team.
function accountType(user, sub, ownOrg, memberOrg) {
  if (running(sub) && sub.plan === 'gift')
    return { type: 'gift', label: 'Pro · cadeau', until: sub.current_period_end };
  if (running(sub))
    return {
      type: 'pro',
      label: `Pro · ${sub.plan === 'year' ? 'jaar' : 'maand'}${sub.cancel_at_period_end ? ' (opgezegd)' : ''}`,
      until: sub.current_period_end
    };
  if (running(ownOrg))
    return { type: 'team', label: `Team ${ownOrg.seats} · eigenaar`, until: ownOrg.current_period_end };
  if (running(memberOrg)) return { type: 'team', label: `Team · ${memberOrg.name}` };
  const trialEnd = new Date(new Date(user.created_at).getTime() + 7 * 86400000);
  if (trialEnd > new Date()) return { type: 'trial', label: 'Proef', until: trialEnd.toISOString() };
  return { type: 'free', label: 'Gratis' };
}

// Echte OpenAI-kosten deze maand, als er een admin-sleutel is (OpenAI → Settings → Admin keys).
async function openAiCostsThisMonth() {
  const key = process.env.OPENAI_ADMIN_KEY;
  if (!key) return null;
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);
  try {
    const response = await fetch(
      `https://api.openai.com/v1/organization/costs?start_time=${Math.floor(start / 1000)}&limit=31`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    const usd = (data.data || [])
      .flatMap(bucket => bucket.results || [])
      .reduce((sum, r) => sum + Number(r.amount?.value || 0), 0);
    return { usd: Math.round(usd * 100) / 100 };
  } catch {
    return null;
  }
}

// Wat er de afgelopen 30 dagen via Stripe is betaald (min terugbetalingen).
async function stripeRevenue30Days() {
  if (!hasStripe()) return null;
  try {
    const since = Math.floor(Date.now() / 1000) - 30 * 86400;
    let total = 0;
    let after = '';
    for (let page = 0; page < 10; page++) {
      const data = await stripe(`charges?limit=100&created[gte]=${since}${after}`, null, 'GET');
      for (const c of data.data || []) if (c.paid) total += (c.amount - (c.amount_refunded || 0)) / 100;
      if (!data.has_more) break;
      after = `&starting_after=${data.data[data.data.length - 1].id}`;
    }
    return { eur: Math.round(total * 100) / 100 };
  } catch {
    return null;
  }
}

async function overview() {
  const [users, profiles, subs, orgs, members, stats, aiCost, revenue] = await Promise.all([
    listUsers(),
    select('profiles', 'select=id,name,organization'),
    select('subscriptions', 'select=*'),
    select('organizations', 'select=*'),
    select('organization_members', 'select=*'),
    rpc('savour_admin_user_stats', {}),
    openAiCostsThisMonth(),
    stripeRevenue30Days()
  ]);
  const byId = (rows, key = 'id') => new Map((rows || []).map(r => [r[key], r]));
  const profileOf = byId(profiles);
  const subOf = byId(subs, 'user_id');
  const ownOrgOf = byId(orgs, 'owner_id');
  const orgById = byId(orgs);
  const statsOf = byId(stats, 'user_id');
  const memberOrgOfEmail = new Map(
    (members || []).map(m => [String(m.email).toLowerCase(), orgById.get(m.organization_id)])
  );
  const accounts = users
    .map(u => {
      const p = profileOf.get(u.id) || {};
      const s = statsOf.get(u.id) || {};
      const sub = subOf.get(u.id);
      return {
        id: u.id,
        email: u.email,
        name: p.name || u.user_metadata?.name || '',
        organization: p.organization || u.user_metadata?.organization || '',
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        confirmed: !!(u.email_confirmed_at || u.confirmed_at),
        recipes: Number(s.recipes || 0),
        ai_this_month: Number(s.ai_this_month || 0),
        paid_stripe: !!sub?.stripe_subscription_id && running(sub),
        ...accountType(u, sub, ownOrgOf.get(u.id), memberOrgOfEmail.get(String(u.email).toLowerCase()))
      };
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Terugkerende omzet per maand: lopende, niet-opgezegde betaalde abonnementen en teams.
  const mrr = [...(subs || []), ...(orgs || [])]
    .filter(r => running(r) && r.stripe_subscription_id && !r.cancel_at_period_end)
    .reduce((sum, r) => sum + (PLAN_MONTHLY_EUR[r.plan] || 0), 0);
  const weekAgo = Date.now() - 7 * 86400000;
  return {
    accounts,
    totals: {
      accounts: accounts.length,
      new_7_days: accounts.filter(a => new Date(a.created_at) > weekAgo).length,
      unconfirmed: accounts.filter(a => !a.confirmed).length,
      free: accounts.filter(a => a.type === 'free').length,
      trial: accounts.filter(a => a.type === 'trial').length,
      pro: accounts.filter(a => a.type === 'pro').length,
      gift: accounts.filter(a => a.type === 'gift').length,
      teams: (orgs || []).filter(o => running(o) && o.stripe_subscription_id).length,
      team_members: accounts.filter(a => a.type === 'team').length,
      recipes: accounts.reduce((sum, a) => sum + a.recipes, 0),
      ai_this_month: accounts.reduce((sum, a) => sum + a.ai_this_month, 0),
      mrr_eur: Math.round(mrr * 100) / 100,
      stripe_30_days: revenue,
      openai_this_month: aiCost
    }
  };
}

// Pro cadeau geven (bijv. 30 dagen om te testen). Nooit over een betaald abonnement heen.
async function giftPro(userId, days) {
  const sub = await getSubscription(userId);
  if (sub?.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(sub.status))
    throw Object.assign(new Error('Dit account heeft al een betaald abonnement.'), { status: 409 });
  const until = new Date(Date.now() + Math.min(Math.max(Number(days) || 30, 1), 3650) * 86400000);
  await upsertSubscription({
    user_id: userId,
    status: 'active',
    plan: 'gift',
    current_period_end: until.toISOString()
  });
  return { until: until.toISOString() };
}

async function revokeGift(userId) {
  const sub = await getSubscription(userId);
  if (sub?.plan !== 'gift') throw Object.assign(new Error('Dit account heeft geen cadeau-Pro.'), { status: 409 });
  await upsertSubscription({ user_id: userId, status: 'inactive', current_period_end: new Date().toISOString() });
  return { ok: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = await getUserFromRequest(req);
  if (!user || !ADMIN_EMAILS.includes(String(user.email || '').toLowerCase()))
    return res.status(403).json({ error: 'Geen beheerdersrechten.' });
  const { action, user_id: userId, days } = req.body || {};
  if (action === 'whoami') return res.status(200).json({ admin: true, email: user.email });
  if (!hasServiceRole()) return res.status(503).json({ error: 'SUPABASE_SERVICE_ROLE_KEY ontbreekt in Vercel.' });
  try {
    if (action === 'overview') return res.status(200).json(await overview());
    if (action === 'gift' && userId) return res.status(200).json(await giftPro(userId, days));
    if (action === 'revoke_gift' && userId) return res.status(200).json(await revokeGift(userId));
    return res.status(400).json({ error: 'Onbekende actie.' });
  } catch (error) {
    console.error('Admin', action, error);
    return res.status(error.status || 500).json({ error: error.message || 'Er ging iets mis.' });
  }
}
