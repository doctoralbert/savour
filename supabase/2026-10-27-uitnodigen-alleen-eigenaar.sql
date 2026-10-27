-- Alleen de eigenaar kan mensen in een gedeelde map halen (2026-10-27)
--
-- Waarom: leden toevoegen op e-mailadres kon al alleen de eigenaar (add_shared_map_member_by_email en de
-- policy op shared_map_members). Maar elk lid kon de uitnodigingscode (shared_maps.public_key) lezen en zo zelf
-- een uitnodigingslink (savour.page/join/...) maken. Voortaan krijgt alleen de eigenaar die code, via
-- savour_my_shared_map_keys(). Belangrijk voor organisaties: anders kon een lid ongemerkt mensen toevoegen.
--
-- De app (js/data/database.js, loadMySharedMapKeys) vraagt de code al via deze functie op en valt terug op de
-- tabel zolang dit bestand nog niet is uitgevoerd.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

-- Lezen van shared_maps: alle kolommen behalve public_key. (Rijen blijven afgeschermd door de bestaande policies.)
revoke select on public.shared_maps from anon, authenticated;
grant select (id, owner_id, name, photo_url, created_at, updated_at) on public.shared_maps to authenticated;

-- De uitnodigingscodes van je eigen gedeelde mappen.
create or replace function public.savour_my_shared_map_keys()
returns table (id uuid, public_key text)
language sql
stable
security definer
set search_path = public
as $$
  select m.id, m.public_key from public.shared_maps m where m.owner_id = auth.uid();
$$;
revoke all on function public.savour_my_shared_map_keys() from public, anon;
grant execute on function public.savour_my_shared_map_keys() to authenticated;

commit;
