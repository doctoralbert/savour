-- Land bij bezoekers en gebruikers (2026-10-27)
--
-- Waarom: in /admin een vlaggetje bij elke bezoeker (Bezoekers) en elke gebruiker (Accounts). Het land wordt in de
-- browser geschat uit de tijdzone (js/country.js), zonder IP-adres; we bewaren alleen de landcode (bijv. NL).
-- Bezoeken: site_visits.country (bij elk bezoek). Gebruikers: profiles.country (bij inloggen bijgewerkt).
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

alter table public.site_visits add column if not exists country text;
alter table public.site_visits drop constraint if exists site_visits_country_check;
alter table public.site_visits add constraint site_visits_country_check check (country is null or country ~ '^[A-Z]{2}$');

alter table public.profiles add column if not exists country text;
alter table public.profiles drop constraint if exists profiles_country_check;
alter table public.profiles add constraint profiles_country_check check (country is null or country ~ '^[A-Z]{2}$');

commit;
