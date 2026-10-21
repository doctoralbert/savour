-- Savour: teamlid toevoegen aan een gedeelde map via e-mailadres (2026-10-21)
--
-- De eigenaar van een gedeelde map vult een e-mailadres in. Heeft dat adres een Savour-account, dan wordt
-- die persoon direct lid (viewer of editor). Zo niet, dan geeft de functie 'not_found' terug en stuurt de
-- app een uitnodigingslink via het eigen mailprogramma van de eigenaar.
--
-- Veiligheid: alleen de eigenaar van de map kan de functie gebruiken, en de functie geeft geen gegevens
-- van anderen terug behalve de naam van wie is toegevoegd.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist dat 2026-10-20-beveiliging.sql en 2026-10-20-samenwerken.sql al zijn uitgevoerd.

begin;

create or replace function public.add_shared_map_member_by_email(_map_id uuid, _email text, _role text default 'viewer')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  map_owner uuid;
  member_id uuid;
  member_name text;
  wanted_role text := case when _role in ('viewer', 'editor') then _role else 'viewer' end;
begin
  if auth.uid() is null then
    raise exception 'Log eerst in';
  end if;
  select owner_id into map_owner from public.shared_maps where id = _map_id;
  if map_owner is null or map_owner <> auth.uid() then
    raise exception 'Alleen de eigenaar kan teamleden toevoegen';
  end if;

  select u.id into member_id
  from auth.users u
  where lower(u.email) = lower(trim(_email))
  limit 1;
  if member_id is null then
    return jsonb_build_object('status', 'not_found');
  end if;
  if member_id = map_owner then
    return jsonb_build_object('status', 'owner');
  end if;

  select coalesce(nullif(trim(p.name), ''), 'Teamlid') into member_name from public.profiles p where p.id = member_id;
  if exists (select 1 from public.shared_map_members where shared_map_id = _map_id and user_id = member_id) then
    return jsonb_build_object('status', 'already', 'name', coalesce(member_name, 'Teamlid'));
  end if;

  insert into public.shared_map_members (shared_map_id, user_id, role) values (_map_id, member_id, wanted_role);
  return jsonb_build_object('status', 'added', 'name', coalesce(member_name, 'Teamlid'), 'role', wanted_role);
end;
$$;

revoke all on function public.add_shared_map_member_by_email(uuid, text, text) from public, anon;
grant execute on function public.add_shared_map_member_by_email(uuid, text, text) to authenticated;

commit;
