-- Keukenteams en brigade (2026-10-28)
--
-- Waarom: een gedeelde map heet voortaan "keukenteam": de plek met de recepten en mappen van een zaak, met een
-- brigade (leden met een rol). Twee dingen veranderen in de database:
--
-- 1. Recepten van een keukenteam blijven van het keukenteam. Een recept met team_id hoort bij dat keukenteam en
--    staat op naam van de eigenaar van het keukenteam; created_by onthoudt wie het maakte. Vertrekt een kok of
--    verwijdert hij zijn account, dan blijven die recepten dus gewoon in het keukenteam. De eigenaar en de
--    sous-chefs (rol editor) mogen ze bewerken en verwijderen; de hele brigade mag ze lezen.
--    Je eigen recepten (zonder team_id) blijven van jou en tellen als enige mee voor de grens van 100 gratis.
-- 2. Een brigade-abonnement (Brigade 5/10/25, tabel organizations) hoort bij één keukenteam: shared_map_id.
--
-- Veilig voor de huidige app: bestaande recepten krijgen geen team_id en alle bestaande regels blijven werken.
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

-- ---- Kolommen ----
alter table public.recipes add column if not exists team_id uuid references public.shared_maps (id) on delete cascade;
alter table public.recipes add column if not exists created_by uuid references auth.users (id) on delete set null;
create index if not exists recipes_team_id on public.recipes (team_id) where team_id is not null;
alter table public.organizations add column if not exists shared_map_id uuid references public.shared_maps (id) on delete set null;

-- ---- Rechten in een keukenteam ----
create or replace function public.savour_team_member(_team uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.shared_maps sm where sm.id = _team and sm.owner_id = auth.uid())
      or exists (select 1 from public.shared_map_members m where m.shared_map_id = _team and m.user_id = auth.uid());
$$;
create or replace function public.savour_team_can_edit(_team uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.shared_maps sm where sm.id = _team and sm.owner_id = auth.uid())
      or exists (select 1 from public.shared_map_members m
                 where m.shared_map_id = _team and m.user_id = auth.uid() and m.role in ('owner', 'editor'));
$$;
revoke all on function public.savour_team_member(uuid) from public, anon;
revoke all on function public.savour_team_can_edit(uuid) from public, anon;
grant execute on function public.savour_team_member(uuid) to authenticated;
grant execute on function public.savour_team_can_edit(uuid) to authenticated;

-- ---- Een teamrecept staat altijd op naam van de eigenaar van het keukenteam ----
-- Bij aanmaken: user_id wordt de eigenaar, created_by wie het maakte. Daarna kunnen team_id en user_id niet meer
-- veranderen (een recept verhuist niet stilletjes van het team naar iemand persoonlijk, of andersom).
create or replace function public.savour_team_recipe_owner()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    if new.team_id is not null then
      select owner_id into new.user_id from public.shared_maps where id = new.team_id;
      if new.user_id is null then raise exception 'savour_team_not_found'; end if;
      new.created_by := coalesce(auth.uid(), new.created_by);
    end if;
  else
    new.team_id := old.team_id;
    new.user_id := old.user_id;
    new.created_by := old.created_by;
  end if;
  return new;
end;
$$;
drop trigger if exists savour_team_recipe_owner on public.recipes;
create trigger savour_team_recipe_owner before insert or update on public.recipes
  for each row execute function public.savour_team_recipe_owner();

-- ---- Regels op recepten ----
-- Eigen recepten: zoals altijd (user_id = jij). Toevoegen: eigen recept, of een teamrecept als je mag bewerken.
drop policy if exists savour_v41_recipes_insert on public.recipes;
create policy savour_v41_recipes_insert on public.recipes for insert
  with check ((team_id is null and user_id = auth.uid()) or (team_id is not null and public.savour_team_can_edit(team_id)));
drop policy if exists savour_team_recipes_select on public.recipes;
create policy savour_team_recipes_select on public.recipes for select
  using (team_id is not null and public.savour_team_member(team_id));
drop policy if exists savour_team_recipes_update on public.recipes;
create policy savour_team_recipes_update on public.recipes for update
  using (team_id is not null and public.savour_team_can_edit(team_id))
  with check (team_id is not null and public.savour_team_can_edit(team_id));
drop policy if exists savour_team_recipes_delete on public.recipes;
create policy savour_team_recipes_delete on public.recipes for delete
  using (team_id is not null and public.savour_team_can_edit(team_id));

-- Koppelen aan het keukenteam en zijn mappen: je eigen recept (zoals nu) of een recept van dit keukenteam.
drop policy if exists "Editors can add shared recipes" on public.shared_map_recipes;
create policy "Editors can add shared recipes" on public.shared_map_recipes for insert
  with check (
    public.savour_team_can_edit(shared_map_id)
    and exists (select 1 from public.recipes r where r.id = recipe_id
                and (r.team_id = shared_map_id or (r.team_id is null and r.user_id = auth.uid())))
  );
drop policy if exists "Editors can add shared folder recipes" on public.shared_folder_recipes;
create policy "Editors can add shared folder recipes" on public.shared_folder_recipes for insert
  with check (
    exists (select 1 from public.shared_folders sf
            join public.recipes r on r.id = recipe_id
            where sf.id = shared_folder_id and public.savour_team_can_edit(sf.shared_map_id)
              and (r.team_id = sf.shared_map_id or (r.team_id is null and r.user_id = auth.uid())))
  );

-- ---- Grens van 100 gratis recepten: alleen je eigen recepten ----
create or replace function public.savour_check_recipe_limit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.savour_paid_pro(new.user_id) then return new; end if;
  if new.team_id is not null then
    if (select count(*) from public.recipes where team_id = new.team_id) > 100 then
      raise exception 'savour_recipe_limit' using hint = 'Maximaal 100 recepten in een keukenteam zonder Savour Pro van de eigenaar.';
    end if;
    return new;
  end if;
  if (select count(*) from public.recipes where user_id = new.user_id and team_id is null) > 100 then
    raise exception 'savour_recipe_limit' using hint = 'Maximaal 100 recepten zonder Savour Pro. Met Savour Pro onbeperkt.';
  end if;
  return new;
end;
$$;

-- Eigen recepten in bulk verwijderen (Instellingen → Opschonen e.d.): nooit teamrecepten.
create or replace function public.savour_delete_my_recipes(_ids uuid[])
returns integer language plpgsql security definer set search_path = public as $$
declare
  _mine uuid[];
  _ref record;
  _count integer;
begin
  if auth.uid() is null then raise exception 'savour_not_logged_in'; end if;
  if coalesce(array_length(_ids, 1), 0) > 500 then raise exception 'savour_too_many'; end if;
  select array_agg(id) into _mine from public.recipes where id = any(_ids) and user_id = auth.uid() and team_id is null;
  if _mine is null then return 0; end if;
  for _ref in
    select c.conrelid::regclass as tbl, a.attname as col
    from pg_constraint c
    join pg_attribute a on a.attrelid = c.conrelid and a.attnum = c.conkey[1]
    where c.contype = 'f' and c.confrelid = 'public.recipes'::regclass
      and array_length(c.conkey, 1) = 1 and c.conrelid <> 'public.recipes'::regclass
  loop
    execute format('delete from %s where %I = any($1)', _ref.tbl, _ref.col) using _mine;
  end loop;
  delete from public.recipes where id = any(_mine) and user_id = auth.uid() and team_id is null;
  get diagnostics _count = row_count;
  return _count;
end;
$$;

-- ---- Abonnementsoverzicht: eigen recepten tellen, en bij welk keukenteam de brigade hoort ----
create or replace function public.savour_my_plan()
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  my_email text;
  created timestamptz;
  s public.subscriptions;
  own_org public.organizations;
  member_org public.organizations;
  sub_running boolean;
begin
  if me is null then return null; end if;
  select email, created_at into my_email, created from auth.users where id = me;
  select * into s from public.subscriptions where user_id = me;
  sub_running := s.user_id is not null
    and s.status in ('active', 'trialing', 'past_due')
    and (s.current_period_end is null or s.current_period_end > now());
  select * into own_org from public.organizations where owner_id = me;
  select o.* into member_org from public.organizations o
    join public.organization_members m on m.organization_id = o.id
    where lower(m.email) = lower(my_email) and public.savour_org_active(o)
    limit 1;
  return jsonb_build_object(
    'pro', public.savour_is_pro(me),
    'unlimited', public.savour_paid_pro(me),
    'source', case
      when sub_running and s.plan = 'gift' then 'gift'
      when sub_running then 'subscription'
      when own_org.id is not null and public.savour_org_active(own_org) then 'team_owner'
      when member_org.id is not null then 'team_member'
      when created > now() - interval '7 days' then 'trial'
      else 'free' end,
    'plan', s.plan,
    'status', s.status,
    'period_end', s.current_period_end,
    'cancel_at_period_end', coalesce(s.cancel_at_period_end, false),
    'has_customer', s.stripe_customer_id is not null,
    'trial_end', created + interval '7 days',
    'recipes', (select count(*) from public.recipes where user_id = me and team_id is null),
    'recipe_limit', 100,
    'used', coalesce((select count from public.ai_usage
                      where user_id = me and month = to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM')), 0),
    'team', case
      when own_org.id is not null then jsonb_build_object(
        'id', own_org.id, 'name', own_org.name, 'seats', own_org.seats, 'plan', own_org.plan,
        'active', public.savour_org_active(own_org), 'owner', true, 'team_id', own_org.shared_map_id,
        'period_end', own_org.current_period_end, 'cancel_at_period_end', own_org.cancel_at_period_end,
        'members', coalesce((select jsonb_agg(m.email order by m.added_at) from public.organization_members m
                             where m.organization_id = own_org.id), '[]'::jsonb))
      when member_org.id is not null then jsonb_build_object(
        'id', member_org.id, 'name', member_org.name, 'owner', false, 'active', true,
        'team_id', member_org.shared_map_id)
      else null end
  );
end;
$$;

-- Een keukenteam maken kan met Pro, of als je een brigade-abonnement afrekent (dan bestaat je organizations-rij al;
-- api/pro-checkout.js maakt het keukenteam dan aan).
create or replace function public.savour_check_shared_map_pro()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not public.savour_is_pro(new.owner_id)
     and not exists (select 1 from public.organizations o where o.owner_id = new.owner_id) then
    raise exception 'savour_pro_required' using hint = 'Een keukenteam maken is onderdeel van Savour Pro.';
  end if;
  return new;
end;
$$;

-- Brigade-abonnement aan een eigen keukenteam koppelen (de eigenaar kiest bij welk keukenteam het hoort).
create or replace function public.savour_link_brigade(_team uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.shared_maps where id = _team and owner_id = auth.uid()) then
    raise exception 'savour_not_allowed';
  end if;
  update public.organizations set shared_map_id = _team, updated_at = now() where owner_id = auth.uid();
end;
$$;
revoke all on function public.savour_link_brigade(uuid) from public, anon;
grant execute on function public.savour_link_brigade(uuid) to authenticated;

commit;
