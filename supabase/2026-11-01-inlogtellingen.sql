-- Hoe vaak elk account is ingelogd, voor /admin → Accounts. Komt uit het logboek van Supabase Auth.
-- Alleen de server (service role) mag dit aanroepen; gebruikers kunnen er niet bij.

create or replace function public.savour_admin_login_counts()
returns table (user_id uuid, logins bigint, logins_30_days bigint)
language sql
security definer
set search_path = public
as $$
  select
    (payload->>'actor_id')::uuid,
    count(*),
    count(*) filter (where created_at > now() - interval '30 days')
  from auth.audit_log_entries
  where payload->>'action' = 'login'
    and payload->>'actor_id' ~ '^[0-9a-f-]{36}$'
  group by 1;
$$;

revoke all on function public.savour_admin_login_counts() from public, anon, authenticated;
grant execute on function public.savour_admin_login_counts() to service_role;
