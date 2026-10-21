-- Bezoekers: kolom platform (desktop_web, mobile_web, native_app) in site_visits (2026-10-23)
--
-- Waarom: de website stuurt bij elk bezoek ook het platform mee, maar die kolom bestond niet. De database
-- weigerde daardoor elk bezoek en de bezoekersteller in /admin bleef staan. De app slaat bezoeken nu ook
-- zonder platform op; met deze kolom erbij werkt ook de verdeling desktop / mobiel / app in /admin.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

alter table public.site_visits add column if not exists platform text;

-- Supabase de nieuwe kolom meteen laten zien (anders soms pas na een paar minuten).
notify pgrst, 'reload schema';
