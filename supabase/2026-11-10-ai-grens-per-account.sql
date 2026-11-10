-- Eigen AI-grens per account (2026-11-10). Normaal heeft Savour Pro 150 AI-imports per maand (api/ai-import.js);
-- de beheerder kan één account een andere maandgrens geven, bijvoorbeeld een vroege klant die zijn archief overzet.
-- Alleen de server (seja rvice role) leest en schrijft dit; gebruikers kunnen het niet zien of aanpassen.
-- Geldt alleen voor betaald Pro: de proefweek blijft 15 AI-imports in totaal.

create table if not exists public.ai_limit_overrides (
  user_id uuid primary key references auth.users (id) on delete cascade,
  monthly_limit integer not null check (monthly_limit between 0 and 2000),
  note text,
  created_at timestamptz not null default now()
);
alter table public.ai_limit_overrides enable row level security;
revoke all on public.ai_limit_overrides from anon, authenticated;

-- De maandgrens voor dit account: de eigen grens als die er is, anders de standaard die de server meegeeft.
create or replace function public.savour_ai_monthly_limit(_user uuid, _default integer)
 returns integer
 language sql
 stable security definer
 set search_path to 'public'
as $$
  select coalesce((select monthly_limit from public.ai_limit_overrides where user_id = _user), _default);
$$;
revoke all on function public.savour_ai_monthly_limit(uuid, integer) from public, anon, authenticated;

-- Wat de app laat zien ("x van 200"): zelfde functie als in 2026-11-10-ai-grens-pro-150.sql, maar met de eigen grens.
create or replace function public.savour_my_plan()
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
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
    'ai_limit', case when trial_only then 15 else public.savour_ai_monthly_limit(me, 150) end,
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
$function$;

-- De eerste betalende Pro-klant (archief aan het overzetten): 200 per maand.
insert into public.ai_limit_overrides (user_id, monthly_limit, note)
values ('cf98ef46-99b7-483a-871b-136c8d04935e', 200, 'Eerste betalende Pro-klant, 2026-11-10')
on conflict (user_id) do update set monthly_limit = excluded.monthly_limit, note = excluded.note;
