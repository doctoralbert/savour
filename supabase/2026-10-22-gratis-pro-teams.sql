-- Gratis, Pro en teams (2026-10-22)
--
-- Gratis: tot 100 eigen recepten, de Savour-lezer, lid zijn van gedeelde mappen.
-- Pro: onbeperkt recepten, zelf gedeelde mappen maken en je team uitnodigen, AI-import.
-- Nieuwe accounts krijgen 14 dagen Pro gratis (zonder betaalgegevens).
-- Teams: een organisatie neemt een pakket plekken (5, 10 of 25); iedereen op een plek heeft Pro.
--
-- Wat al bestaat blijft altijd bruikbaar: wie onder Pro uitkomt, houdt al zijn recepten en gedeelde
-- mappen. Alleen nieuwe recepten boven de 100 en nieuwe gedeelde mappen kunnen dan niet.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-10-21-savour-pro.sql is eerder uitgevoerd.

begin;

-- ---- Organisatie in het profiel ----
alter table public.profiles add column if not exists organization text;

-- ---- Teams: organisaties met een pakket plekken ----
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null unique references auth.users (id) on delete cascade,
  seats integer not null default 5,
  plan text,                                  -- bijv. team10_month, team25_year
  status text not null default 'inactive',    -- active, trialing, past_due, canceled, inactive
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Leden op e-mailadres: wie later een account maakt met dat adres, heeft meteen Pro.
create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  email text not null,
  added_at timestamptz not null default now(),
  primary key (organization_id, email)
);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;

-- Bewust geen regels voor gebruikers: de app leest een team alleen via savour_my_plan() en past het aan via
-- de savour_team_*-functies hieronder; afrekenen (server) maakt het team aan.

-- Is dit team nu actief (betaald, of opgezegd maar de betaalde periode loopt nog)?
create or replace function public.savour_org_active(_org public.organizations)
returns boolean language sql stable as $$
  select _org.status in ('active', 'trialing', 'past_due', 'canceled')
     and (_org.current_period_end is null or _org.current_period_end > now())
     and (_org.status <> 'canceled' or _org.current_period_end > now());
$$;

-- ---- Wie is Pro? ----
-- Eigen abonnement of cadeau (subscriptions), proefperiode (14 dagen na aanmaken), of een plek in een team.
create or replace function public.savour_is_pro(_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
      select 1 from public.subscriptions s
      where s.user_id = _user
        and s.status in ('active', 'trialing', 'past_due', 'canceled')
        and (s.current_period_end is null or s.current_period_end > now())
        and (s.status <> 'canceled' or s.current_period_end > now())
    )
    or exists (select 1 from auth.users u where u.id = _user and u.created_at > now() - interval '14 days')
    or exists (
      select 1 from public.organizations o
      where public.savour_org_active(o)
        and (o.owner_id = _user
             or exists (select 1 from public.organization_members m join auth.users u on lower(u.email) = lower(m.email)
                        where m.organization_id = o.id and u.id = _user))
    );
$$;

-- Alles wat de app over het eigen account moet weten, in één keer (voor de ingelogde gebruiker).
create or replace function public.savour_my_plan()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
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
    and s.status in ('active', 'trialing', 'past_due', 'canceled')
    and (s.current_period_end is null or s.current_period_end > now())
    and (s.status <> 'canceled' or s.current_period_end > now());
  select * into own_org from public.organizations where owner_id = me;
  select o.* into member_org from public.organizations o
    join public.organization_members m on m.organization_id = o.id
    where lower(m.email) = lower(my_email) and public.savour_org_active(o)
    limit 1;
  return jsonb_build_object(
    'pro', public.savour_is_pro(me),
    'source', case
      when sub_running and s.plan = 'gift' then 'gift'
      when sub_running then 'subscription'
      when own_org.id is not null and public.savour_org_active(own_org) then 'team_owner'
      when member_org.id is not null then 'team_member'
      when created > now() - interval '14 days' then 'trial'
      else 'free' end,
    'plan', s.plan,
    'status', s.status,
    'period_end', s.current_period_end,
    'cancel_at_period_end', coalesce(s.cancel_at_period_end, false),
    'has_customer', s.stripe_customer_id is not null,
    'trial_end', created + interval '14 days',
    'recipes', (select count(*) from public.recipes where user_id = me),
    'recipe_limit', 100,
    'used', coalesce((select count from public.ai_usage
                      where user_id = me and month = to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM')), 0),
    'team', case
      when own_org.id is not null then jsonb_build_object(
        'id', own_org.id, 'name', own_org.name, 'seats', own_org.seats, 'plan', own_org.plan,
        'active', public.savour_org_active(own_org), 'owner', true,
        'period_end', own_org.current_period_end, 'cancel_at_period_end', own_org.cancel_at_period_end,
        'members', coalesce((select jsonb_agg(m.email order by m.added_at) from public.organization_members m
                             where m.organization_id = own_org.id), '[]'::jsonb))
      when member_org.id is not null then jsonb_build_object(
        'id', member_org.id, 'name', member_org.name, 'owner', false, 'active', true)
      else null end
  );
end;
$$;

-- ---- Teamleden beheren (alleen de eigenaar, binnen het aantal plekken; de eigenaar telt mee) ----
create or replace function public.savour_team_add_member(_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  org public.organizations;
  clean text := lower(trim(_email));
begin
  select * into org from public.organizations where owner_id = auth.uid();
  if org.id is null then raise exception 'savour_no_team'; end if;
  if clean !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'savour_bad_email'; end if;
  if clean = lower(auth.jwt() ->> 'email') then return; end if;
  if (select count(*) from public.organization_members where organization_id = org.id) + 1 >= org.seats then
    raise exception 'savour_team_full';
  end if;
  insert into public.organization_members (organization_id, email) values (org.id, clean)
  on conflict do nothing;
end;
$$;

create or replace function public.savour_team_remove_member(_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.organization_members m
  using public.organizations o
  where m.organization_id = o.id and o.owner_id = auth.uid() and lower(m.email) = lower(trim(_email));
end;
$$;

create or replace function public.savour_team_rename(_name text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.organizations set name = left(trim(_name), 120), updated_at = now()
  where owner_id = auth.uid() and length(trim(_name)) > 0;
$$;

-- ---- Gratis: maximaal 100 eigen recepten (bestaande recepten blijven altijd staan) ----
create or replace function public.savour_check_recipe_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.savour_is_pro(new.user_id) then return new; end if;
  if (select count(*) from public.recipes where user_id = new.user_id) > 100 then
    raise exception 'savour_recipe_limit' using hint = 'Gratis account: maximaal 100 recepten. Met Savour Pro onbeperkt.';
  end if;
  return new;
end;
$$;
drop trigger if exists savour_recipe_limit on public.recipes;
-- AFTER: dan telt ook een recept dat in dezelfde opdracht net is toegevoegd mee.
create trigger savour_recipe_limit after insert on public.recipes
  for each row execute function public.savour_check_recipe_limit();

-- ---- Een gedeelde map maken is Pro (lid zijn van andermans map blijft gratis) ----
create or replace function public.savour_check_shared_map_pro()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.savour_is_pro(new.owner_id) then
    raise exception 'savour_pro_required' using hint = 'Een gedeelde map maken is onderdeel van Savour Pro.';
  end if;
  return new;
end;
$$;
drop trigger if exists savour_shared_map_pro on public.shared_maps;
create trigger savour_shared_map_pro before insert on public.shared_maps
  for each row execute function public.savour_check_shared_map_pro();

-- ---- Beheer: aantallen per gebruiker (alleen voor de server) ----
create or replace function public.savour_admin_user_stats()
returns table (user_id uuid, recipes bigint, ai_this_month integer)
language sql
stable
security definer
set search_path = public
as $$
  select u.id,
         (select count(*) from public.recipes r where r.user_id = u.id),
         coalesce((select a.count from public.ai_usage a
                   where a.user_id = u.id and a.month = to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM')), 0)
  from auth.users u;
$$;

revoke all on function public.savour_admin_user_stats() from public, anon, authenticated;
grant execute on function public.savour_admin_user_stats() to service_role;
revoke all on function public.savour_is_pro(uuid) from public, anon, authenticated;
grant execute on function public.savour_is_pro(uuid) to service_role;
grant execute on function public.savour_my_plan() to authenticated;
grant execute on function public.savour_team_add_member(text) to authenticated;
grant execute on function public.savour_team_remove_member(text) to authenticated;
grant execute on function public.savour_team_rename(text) to authenticated;

commit;

-- Controle: moet organizations en organization_members tonen met rowsecurity = true.
select tablename, rowsecurity from pg_tables
where schemaname = 'public' and tablename in ('organizations', 'organization_members');
