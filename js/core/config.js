// Verbinding met Supabase (database + inloggen). De publishable key is bedoeld om openbaar te zijn;
// de echte beveiliging zit in de Row Level Security-regels van de database.

const SUPABASE_URL = 'https://qmzfqfmpylkgcnxsedse.supabase.co';

const SUPABASE_KEY = 'sb_publishable_R8DGUuglOC3aFz5qv4xOgw_UGdQUyiD';

// "Ingelogd blijven" (vinkje bij inloggen). Aan: de sessie staat in localStorage en blijft na het sluiten van de
// browser. Uit: in sessionStorage, dus uitgelogd zodra het venster dicht gaat (handig op een gedeelde keukencomputer).
const STAY_SIGNED_IN_KEY = 'savour_stay_signed_in';
function staySignedIn() {
  try {
    return localStorage.getItem(STAY_SIGNED_IN_KEY) !== '0';
  } catch (_) {
    return true;
  }
}
const authStorage = {
  getItem(key) {
    try {
      return sessionStorage.getItem(key) ?? localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  },
  setItem(key, value) {
    try {
      const [keep, drop] = staySignedIn() ? [localStorage, sessionStorage] : [sessionStorage, localStorage];
      keep.setItem(key, value);
      drop.removeItem(key);
    } catch (_) {}
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch (_) {}
  }
};

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storage: authStorage }
});

const IS_ADMIN_PATH = window.location.pathname.replace(/\/+$/, '') === '/admin';
