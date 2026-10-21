-- Savour Pro: abonnementen en AI-teller (2026-10-21)
--
-- Wie Pro is, staat in public.subscriptions. Die tabel wordt alleen door de server bijgewerkt (Stripe-
-- koppeling met de service-role-sleutel); gebruikers kunnen hun eigen regel alleen lezen. Zo kan niemand
-- zichzelf Pro maken. De AI-teller (public.ai_usage) telt per gebruiker per maand; limiet 500.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
--
-- Jezelf (of een tester) Pro geven zonder te betalen, bijvoorbeeld als eigenaar:
--   insert into public.subscriptions (user_id, status, plan, current_period_end)
--   select id, 'active', 'gift', '2099-12-31' from auth.users where email = 'jouw@email.nl'
--   on conflict (user_id) do update set status = 'active', plan = 'gift', current_period_end = '2099-12-31';

begin;

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  status text not null default 'inactive',   -- active, trialing, past_due, canceled, inactive
  plan text,                                  -- month, year of gift
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  month text not null,                        -- bijv. '2026-10' (Nederlandse tijd)
  count integer not null default 0,
  primary key (user_id, month)
);

alter table public.subscriptions enable row level security;
alter table public.ai_usage enable row level security;

drop policy if exists "savour_subscriptions_select_own" on public.subscriptions;
create policy "savour_subscriptions_select_own" on public.subscriptions
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "savour_ai_usage_select_own" on public.ai_usage;
create policy "savour_ai_usage_select_own" on public.ai_usage
  for select to authenticated using (user_id = auth.uid());
-- Bewust geen insert/update/delete-regels: alleen de server (service role) schrijft.

-- Is deze gebruiker nu Pro? Actief/proefperiode, of opgezegd maar de betaalde periode loopt nog.
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
  );
$$;

-- Hoeveel AI-imports heeft deze gebruiker deze maand nog? Alleen voor de server.
create or replace function public.savour_ai_allowance(_user uuid, _limit integer default 500)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'pro', public.savour_is_pro(_user),
    'used', coalesce((select count from public.ai_usage
                      where user_id = _user and month = to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM')), 0),
    'limit', _limit
  );
$$;

-- Telt één AI-import, maar alleen zolang de limiet niet is bereikt. Geeft het nieuwe aantal, of null.
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
  return new_count;
end;
$$;

-- Deze functies zijn alleen voor de server; gewone gebruikers en anonieme bezoekers kunnen ze niet aanroepen.
revoke all on function public.savour_is_pro(uuid) from public, anon, authenticated;
revoke all on function public.savour_ai_allowance(uuid, integer) from public, anon, authenticated;
revoke all on function public.savour_record_ai_use(uuid, integer) from public, anon, authenticated;
grant execute on function public.savour_is_pro(uuid) to service_role;
grant execute on function public.savour_ai_allowance(uuid, integer) to service_role;
grant execute on function public.savour_record_ai_use(uuid, integer) to service_role;

commit;

-- Controle: moet twee regels tonen (subscriptions en ai_usage) met rowsecurity = true.
select tablename, rowsecurity from pg_tables where schemaname = 'public' and tablename in ('subscriptions', 'ai_usage');
