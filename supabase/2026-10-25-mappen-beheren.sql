-- Mappen in een gedeelde map beheren (2026-10-25)
--
-- Waarom: in een gedeelde map komen al snel veel mappen (per partie, per menu). Die moet je kunnen hernoemen,
-- in je eigen volgorde zetten en archiveren als ze niet meer nodig zijn (bijv. het menu van vorig seizoen).
-- Gearchiveerde mappen en hun recepten blijven bewaard; ze staan alleen onderaan onder "Archief".
-- Alleen de eigenaar en editors van de gedeelde map mogen dit, gecontroleerd in de database (functie hieronder).
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

alter table public.shared_folders add column if not exists position integer;
alter table public.shared_folders add column if not exists archived boolean not null default false;

-- Naam, plek in de volgorde en archief van één map. Geeft een fout als je geen eigenaar of editor bent.
create or replace function public.savour_update_shared_folder(
  _folder_id uuid,
  _name text default null,
  _position integer default null,
  _archived boolean default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  _map uuid;
begin
  select shared_map_id into _map from public.shared_folders where id = _folder_id;
  if _map is null then
    raise exception 'savour_folder_not_found';
  end if;
  if not exists (
    select 1 from public.shared_maps sm where sm.id = _map and sm.owner_id = auth.uid()
  ) and not exists (
    select 1 from public.shared_map_members m
    where m.shared_map_id = _map and m.user_id = auth.uid() and m.role in ('owner', 'editor')
  ) then
    raise exception 'savour_not_allowed';
  end if;
  if _name is not null and length(trim(_name)) = 0 then
    raise exception 'savour_empty_name';
  end if;
  update public.shared_folders
  set name = coalesce(nullif(trim(_name), ''), name),
      position = coalesce(_position, position),
      archived = coalesce(_archived, archived)
  where id = _folder_id;
end;
$$;

revoke all on function public.savour_update_shared_folder(uuid, text, integer, boolean) from public, anon;
grant execute on function public.savour_update_shared_folder(uuid, text, integer, boolean) to authenticated;

commit;
