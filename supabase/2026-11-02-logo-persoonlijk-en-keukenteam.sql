-- Logo op prints apart aan of uit (2026-11-02)
--
-- - Persoonlijk: print_brands.on_personal. Uit = je eigen prints (recepten en mappen buiten een keukenteam) zonder logo.
-- - Per keukenteam: shared_maps.print_logo. Uit = prints uit dat keukenteam zonder logo. Alleen de eigenaar wijzigt het
--   (de bestaande RLS op shared_maps laat alleen de eigenaar wijzigen).
-- Beide staan standaard aan, dus er verandert niets voor wie niets aanpast.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-10-24-logo-op-prints.sql is eerder uitgevoerd.

begin;

alter table public.print_brands add column if not exists on_personal boolean not null default true;
alter table public.shared_maps add column if not exists print_logo boolean not null default true;

create or replace function public.savour_print_brand(_map text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  base uuid := me;
  owner uuid;
  team_logo boolean;
  b public.print_brands;
begin
  if me is null then return null; end if;
  if _map is not null then
    select sm.owner_id, sm.print_logo into base, team_logo from public.shared_maps sm
     where sm.id::text = _map
       and (sm.owner_id = me or exists (select 1 from public.shared_map_members mm
                                         where mm.shared_map_id = sm.id and mm.user_id = me));
    if base is null then base := me; end if;
    -- Keukenteam met het logo uitgezet: geen logo.
    if team_logo is false then return null; end if;
  end if;
  owner := public.savour_brand_owner(base);
  if not public.savour_is_pro(owner) then return null; end if;
  select * into b from public.print_brands where user_id = owner;
  if b.user_id is null or (b.logo is null and coalesce(b.name, '') = '') then return null; end if;
  -- Eigen prints (geen keukenteam) met het logo uitgezet: geen logo.
  if _map is null and b.on_personal is false then return null; end if;
  return jsonb_build_object('name', b.name, 'logo', b.logo, 'bw', b.bw, 'team', owner <> me);
end $$;

grant execute on function public.savour_print_brand(text) to authenticated;

commit;

-- Controle: moet twee rijen tonen (on_personal en print_logo).
select table_name, column_name from information_schema.columns
 where table_schema = 'public' and column_name in ('on_personal', 'print_logo');
