// Database-aanroepen namens de server, met de service-role-sleutel (alleen op Vercel, nooit in de browser).
// Nodig voor Pro: alleen de server mag abonnementen en de AI-teller bijwerken.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qmzfqfmpylkgcnxsedse.supabase.co';

export function hasServiceRole() {
  return !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}

async function adminFetch(path, { method = 'GET', body, prefer } = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY ontbreekt in Vercel Environment Variables.');
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(data?.message || `Database-fout (${response.status})`);
  return data;
}

export function rpc(name, args) {
  return adminFetch(`/rest/v1/rpc/${name}`, { method: 'POST', body: args });
}

export async function getSubscription(userId) {
  const rows = await adminFetch(`/rest/v1/subscriptions?user_id=eq.${encodeURIComponent(userId)}&select=*`);
  return rows?.[0] || null;
}

export async function findSubscriptionByCustomer(customerId) {
  const rows = await adminFetch(
    `/rest/v1/subscriptions?stripe_customer_id=eq.${encodeURIComponent(customerId)}&select=*`
  );
  return rows?.[0] || null;
}

// Maakt of werkt de abonnementsregel van een gebruiker bij.
export function upsertSubscription(row) {
  return adminFetch('/rest/v1/subscriptions?on_conflict=user_id', {
    method: 'POST',
    body: { ...row, updated_at: new Date().toISOString() },
    prefer: 'resolution=merge-duplicates,return=minimal'
  });
}
