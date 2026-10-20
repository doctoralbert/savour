// Gedeelde helper voor API-routes. Bestanden die met _ beginnen worden door Vercel niet als route gepubliceerd.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qmzfqfmpylkgcnxsedse.supabase.co';
// De publishable key is publiek (staat ook in index.html); hiermee mag de server een sessietoken laten controleren.
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_R8DGUuglOC3aFz5qv4xOgw_UGdQUyiD';

// Geeft de ingelogde Supabase-gebruiker terug, of null als het token ontbreekt of ongeldig is.
export async function getUserFromRequest(req) {
  const header = String(req.headers?.authorization || '');
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return null;
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return null;
    const user = await response.json();
    return user?.id ? user : null;
  } catch {
    return null;
  }
}
