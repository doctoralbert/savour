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

// Algemene tabeltoegang voor de server (beheerscherm, teams).
export function select(table, query) {
  return adminFetch(`/rest/v1/${table}?${query}`);
}

export function insert(table, row) {
  return adminFetch(`/rest/v1/${table}`, { method: 'POST', body: row, prefer: 'return=minimal' });
}

export function update(table, query, values) {
  return adminFetch(`/rest/v1/${table}?${query}`, { method: 'PATCH', body: values, prefer: 'return=minimal' });
}

export function remove(table, query) {
  return adminFetch(`/rest/v1/${table}?${query}`, { method: 'DELETE', prefer: 'return=minimal' });
}

// Nieuw account via een uitnodiging: Supabase mailt een link waarmee de gebruiker zelf een wachtwoord kiest.
export function inviteUser(email, data, redirectTo) {
  return adminFetch(`/auth/v1/invite?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: 'POST',
    body: { email, data }
  });
}

// Account definitief verwijderen uit Supabase Auth (de gegevens zijn dan al opgeruimd, zie api/admin.js).
export function deleteAuthUser(userId) {
  return adminFetch(`/auth/v1/admin/users/${encodeURIComponent(userId)}`, { method: 'DELETE' });
}

// E-mailadres van een account als bevestigd markeren (beheerder bevestigt handmatig, zie api/admin.js).
export function confirmAuthUser(userId) {
  return adminFetch(`/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    body: { email_confirm: true }
  });
}

// Instellingen van een account die alleen de server mag zetten (app_metadata), bijv. de eigen apparaten van de beheerder.
export function updateAppMetadata(userId, appMetadata) {
  return adminFetch(`/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    body: { app_metadata: appMetadata }
  });
}

// Alle accounts (Supabase Auth), per pagina van 1000.
export async function listUsers() {
  const users = [];
  for (let page = 1; page < 50; page++) {
    const data = await adminFetch(`/auth/v1/admin/users?page=${page}&per_page=1000`);
    const batch = data?.users || [];
    users.push(...batch);
    if (batch.length < 1000) break;
  }
  return users;
}

// Het team van een eigenaar: aanmaken of bijwerken (één team per eigenaar).
export async function upsertOrganization(row) {
  const rows = await adminFetch('/rest/v1/organizations?on_conflict=owner_id', {
    method: 'POST',
    body: { ...row, updated_at: new Date().toISOString() },
    prefer: 'resolution=merge-duplicates,return=representation'
  });
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

// Eén account opvragen (Supabase Auth), bijv. degene die een collega uitnodigde.
export async function getAuthUser(userId) {
  try {
    return await adminFetch(`/auth/v1/admin/users/${encodeURIComponent(userId)}`);
  } catch {
    return null;
  }
}
