-- Bezoekers: kolom platform (desktop_web, mobile_web, native_app) in site_visits (2026-10-23)
--
-- Waarom: de website stuurt bij elk bezoek ook het platform mee, maar die kolom bestond niet. De database
-- weigerde daardoor elk bezoek en de bezoekersteller in /admin bleef staan. De app slaat bezoeken nu ook
-- zonder platform op; met deze kolom erbij werkt ook "Gebruik per platform" in /admin.
-- Ontbreekt het platform (oude bezoeken, of opgeslagen zonder), dan leidt de database het af uit de browser.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

alter table public.site_visits add column if not exists platform text;

-- Platform afleiden uit de browserregel (zelfde regels als savourAnalyticsPlatform in js/features/admin.js).
create or replace function public.savour_visit_platform(_ua text)
returns text
language sql
immutable
as $$
  select case
    when _ua ~* 'SavourApp/' then 'native_app'
    when _ua ~* 'Mobi|Android|iPhone|iPad|iPod' then 'mobile_web'
    else 'desktop_web' end;
$$;

-- Nieuwe bezoeken zonder platform: meteen invullen.
create or replace function public.savour_fill_visit_platform()
returns trigger
language plpgsql
as $$
begin
  if new.platform is null then new.platform := public.savour_visit_platform(new.user_agent); end if;
  return new;
end;
$$;
drop trigger if exists savour_visit_platform on public.site_visits;
create trigger savour_visit_platform before insert on public.site_visits
  for each row execute function public.savour_fill_visit_platform();

-- Bestaande bezoeken zonder platform alsnog invullen.
update public.site_visits set platform = public.savour_visit_platform(user_agent) where platform is null;

commit;

-- Supabase de nieuwe kolom meteen laten zien (anders soms pas na een paar minuten).
notify pgrst, 'reload schema';

-- Controle: aantal unieke bezoekers per platform.
select platform, count(distinct visitor_id) as bezoekers from public.site_visits group by platform;
