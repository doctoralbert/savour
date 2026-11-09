-- AI-imports in de proefweek (2026-11-09): wie alleen de 7 dagen gratis Pro heeft (nog niet betaald), kan in die
-- proefweek in totaal 15 AI-imports doen. Betaald Pro blijft 500 per maand. Plus een logboek per AI-import, zodat
-- /admin per account ziet hoeveel er vandaag, in het laatste uur en deze week zijn gedaan (spam herkennen).
-- Veilig om opnieuw te draaien. Er wordt niets verwijderd.

-- 1. Logboek: één regel per gelukte AI-import. Alleen de server (service role) leest en schrijft; geen policies.
create table if not exists public.ai_usage_log (
  id bigserial primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  at timestamptz not null default now()
);
create index if not exists ai_usage_log_user_at on public.ai_usage_log (user_id, at desc);
create index if not exists ai_usage_log_at on public.ai_usage_log (at desc);
alter table public.ai_usage_log enable row level security;

-- 2. Alleen in de proefweek (Pro via de 7 dagen, niet via een abonnement of organisatie)?
create or replace function public.savour_ai_trial_only(_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.savour_is_pro(_user) and not public.savour_paid_pro(_user);
$$;

-- 3. Hoeveel AI-imports mag deze gebruiker nog? Proefweek: 15 in totaal (alle maanden samen, want de proefweek kan
--    over een maandgrens lopen). Betaald: _limit per maand (de server geeft 500 mee).
create or replace function public.savour_ai_allowance(_user uuid, _limit integer default 500)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select case
    when public.savour_ai_trial_only(_user) then jsonb_build_object(
      'pro', true,
      'trial', true,
      'used', coalesce((select sum(count) from public.ai_usage where user_id = _user), 0),
      'limit', least(_limit, 15))
    else jsonb_build_object(
      'pro', public.savour_is_pro(_user),
      'trial', false,
      'used', coalesce((select count from public.ai_usage
                        where user_id = _user and month = to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM')), 0),
      'limit', _limit)
  end;
$$;

-- 4. Een gelukte AI-import tellen (per maand, zoals altijd) en in het logboek zetten. Geeft terug wat de gebruiker
--    nu heeft gebruikt: in de proefweek het totaal, anders deze maand.
create or replace function public.savour_record_ai_use(_user uuid, _limit integer default 500)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  this_month text := to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM');
  new_count integer;
begin
  insert into public.ai_usage (user_id, month, count) values (_user, this_month, 1)
  on conflict (user_id, month) do update set count = public.ai_usage.count + 1
    where public.ai_usage.count < _limit
  returning count into new_count;
  if new_count is not null then
    insert into public.ai_usage_log (user_id) values (_user);
  end if;
  if public.savour_ai_trial_only(_user) then
    return coalesce((select sum(count) from public.ai_usage where user_id = _user), 0);
  end if;
  return new_count;
end;
$$;

-- 5. Het abonnement in de app: in de proefweek telt het totaal en is de grens 15 (ai_limit).
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
  trial_only boolean;
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
  trial_only := public.savour_ai_trial_only(me);
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
    'ai_limit', case when trial_only then 15 else 500 end,
    'used', case
      when trial_only then coalesce((select sum(count) from public.ai_usage where user_id = me), 0)
      else coalesce((select count from public.ai_usage
                     where user_id = me and month = to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM')), 0) end,
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
