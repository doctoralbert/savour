-- Proefperiode: 7 dagen, en ook tijdens de proef maximaal 100 recepten (2026-10-23)
--
-- Waarom: met 14 dagen onbeperkt uploaden kon iemand in de proef zijn hele receptenboek erin zetten en
-- daarna gratis blijven. Nu probeer je 7 dagen alles van Pro (AI-import, gedeelde mappen maken), maar
-- onbeperkt recepten bewaren is alleen voor een betaald abonnement, cadeau of teamplek.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-10-22-gratis-pro-teams.sql is eerder uitgevoerd.

begin;

-- Betaald Pro: eigen abonnement of cadeau, of een plek in een actief team. Zonder proefperiode.
create or replace function public.savour_paid_pro(_user uuid)
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
    or exists (
      select 1 from public.organizations o
      where public.savour_org_active(o)
        and (o.owner_id = _user
             or exists (select 1 from public.organization_members m join auth.users u on lower(u.email) = lower(m.email)
                        where m.organization_id = o.id and u.id = _user))
    );
$$;

-- Pro-functies (AI-import, gedeelde mappen maken): betaald Pro, of de eerste 7 dagen na het aanmaken.
create or replace function public.savour_is_pro(_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.savour_paid_pro(_user)
    or exists (select 1 from auth.users u where u.id = _user and u.created_at > now() - interval '7 days');
$$;

-- Zelfde als in 2026-10-22, met 7 dagen proef en 'unlimited' (onbeperkt recepten, alleen betaald Pro).
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

-- Maximaal 100 eigen recepten, ook tijdens de proef. Bestaande recepten blijven altijd staan.
create or replace function public.savour_check_recipe_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.savour_paid_pro(new.user_id) then return new; end if;
  if (select count(*) from public.recipes where user_id = new.user_id) > 100 then
    raise exception 'savour_recipe_limit' using hint = 'Maximaal 100 recepten zonder Savour Pro. Met Savour Pro onbeperkt.';
  end if;
  return new;
end;
$$;

revoke all on function public.savour_paid_pro(uuid) from public, anon, authenticated;
grant execute on function public.savour_paid_pro(uuid) to service_role;
revoke all on function public.savour_is_pro(uuid) from public, anon, authenticated;
grant execute on function public.savour_is_pro(uuid) to service_role;
grant execute on function public.savour_my_plan() to authenticated;

commit;
