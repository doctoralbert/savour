// Verbinding met Supabase (database + inloggen). De publishable key is bedoeld om openbaar te zijn;
// de echte beveiliging zit in de Row Level Security-regels van de database.

const SUPABASE_URL = 'https://qmzfqfmpylkgcnxsedse.supabase.co';

const SUPABASE_KEY = 'sb_publishable_R8DGUuglOC3aFz5qv4xOgw_UGdQUyiD';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
});

const IS_ADMIN_PATH = window.location.pathname.replace(/\/+$/, '') === '/admin';
