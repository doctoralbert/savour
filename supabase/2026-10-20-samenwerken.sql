-- Savour: samenwerken in gedeelde mappen (2026-10-20)
-- Uitvoeren in Supabase > SQL Editor, na 2026-10-20-beveiliging.sql. Alles in één transactie.

begin;

-- 1) Mag de ingelogde gebruiker dit recept zien omdat het in een gedeelde map staat waar hij bij hoort?
--    SECURITY DEFINER zodat de controle zelf niet opnieuw door RLS loopt (sneller, geen kringverwijzing).
create or replace function public.can_view_shared_recipe(_recipe_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.shared_map_recipes smr
    join public.shared_maps sm on sm.id = smr.shared_map_id
    where smr.recipe_id = _recipe_id
      and (sm.owner_id = auth.uid()
           or exists (select 1 from public.shared_map_members m where m.shared_map_id = sm.id and m.user_id = auth.uid()))
  ) or exists (
    select 1
    from public.shared_folder_recipes sfr
    join public.shared_folders sf on sf.id = sfr.shared_folder_id
    join public.shared_maps sm on sm.id = sf.shared_map_id
    where sfr.recipe_id = _recipe_id
      and (sm.owner_id = auth.uid()
           or exists (select 1 from public.shared_map_members m where m.shared_map_id = sm.id and m.user_id = auth.uid()))
  );
$$;

-- Teamleden mogen recepten in hun gedeelde mappen lezen (niet wijzigen: dat blijft alleen de auteur).
drop policy if exists "savour_recipes_select_shared" on public.recipes;
create policy "savour_recipes_select_shared"
  on public.recipes for select to authenticated
  using (public.can_view_shared_recipe(id));

-- 2) Lid worden via de uitnodigingslink. Nieuwe leden zijn altijd viewer; de eigenaar past de rol aan.
create or replace function public.join_shared_map(_public_key text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  m public.shared_maps%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Log eerst in';
  end if;
  select * into m from public.shared_maps where public_key = _public_key limit 1;
  if not found then
    raise exception 'Uitnodiging niet gevonden';
  end if;
  if m.owner_id <> auth.uid()
     and not exists (select 1 from public.shared_map_members where shared_map_id = m.id and user_id = auth.uid()) then
    insert into public.shared_map_members (shared_map_id, user_id, role) values (m.id, auth.uid(), 'viewer');
  end if;
  return jsonb_build_object('id', m.id, 'name', m.name);
end;
$$;

-- 3) Ledenlijst van alle gedeelde mappen waar de gebruiker bij hoort, met naam.
--    Het e-mailadres krijgt alleen de eigenaar van de map te zien.
create or replace function public.get_my_shared_map_members()
returns table (shared_map_id uuid, user_id uuid, role text, name text, email text)
language sql
stable
security definer
set search_path = public
as $$
  select mm.shared_map_id, mm.user_id, mm.role,
         coalesce(nullif(trim(p.name), ''), 'Teamlid') as name,
         case when sm.owner_id = auth.uid() then p.email else null end as email
  from public.shared_map_members mm
  join public.shared_maps sm on sm.id = mm.shared_map_id
  left join public.profiles p on p.id = mm.user_id
  where sm.owner_id = auth.uid()
     or exists (select 1 from public.shared_map_members me where me.shared_map_id = sm.id and me.user_id = auth.uid());
$$;

-- 4) Een lid mag zelf de map verlaten; de eigenaar mag leden verwijderen.
drop policy if exists "savour_v41_shared_members_delete" on public.shared_map_members;
drop policy if exists "savour_shared_members_delete" on public.shared_map_members;
create policy "savour_shared_members_delete"
  on public.shared_map_members for delete to authenticated
  using (public.is_shared_map_owner(shared_map_id) or user_id = auth.uid());

-- Functies alleen voor ingelogde gebruikers.
revoke all on function public.can_view_shared_recipe(uuid) from public, anon;
revoke all on function public.join_shared_map(text) from public, anon;
revoke all on function public.get_my_shared_map_members() from public, anon;
grant execute on function public.can_view_shared_recipe(uuid) to authenticated;
grant execute on function public.join_shared_map(text) to authenticated;
grant execute on function public.get_my_shared_map_members() to authenticated;

commit;
