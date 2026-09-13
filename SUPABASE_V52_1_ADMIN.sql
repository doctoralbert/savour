-- Savour v52.1 admin migration
-- Run once after SUPABASE_V52_ADMIN.sql.
-- No admin email or password is stored in the frontend.
-- The existing admin account is granted access here by its email in the database only.

insert into public.savour_admin_users(user_id)
select id from auth.users
where lower(email) = lower('schreurs.jop@gmail.com')
on conflict (user_id) do nothing;

-- Replace the old claim function: admin access is granted explicitly in this migration.
drop function if exists public.claim_savour_admin();

create or replace function public.is_savour_admin()
returns boolean
language sql
security definer
set search_path = public, auth
as $$
  select exists (
    select 1 from public.savour_admin_users a
    where a.user_id = auth.uid()
  );
$$;
grant execute on function public.is_savour_admin() to authenticated;

create or replace function public.get_savour_admin_dashboard()
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  out jsonb;
begin
  if not exists (select 1 from public.savour_admin_users where user_id = auth.uid()) then
    raise exception 'not authorized';
  end if;

  select jsonb_build_object(
    'accounts', (select count(*) from auth.users),
    'recipes', (select count(*) from public.recipes),
    'folders', (select count(*) from public.folders),
    'shared_maps', (select count(*) from public.shared_maps),
    'visit_events', (select count(*) from public.site_visits),
    'visitors_all_time', (select count(distinct visitor_id) from public.site_visits),
    'visits_today', (select count(distinct visitor_id) from public.site_visits where visited_at >= date_trunc('day', now())),
    'visits_week', (select count(distinct visitor_id) from public.site_visits where visited_at >= date_trunc('week', now())),
    'visits_month', (select count(distinct visitor_id) from public.site_visits where visited_at >= date_trunc('month', now())),
    'accounts_list', coalesce((select jsonb_agg(x order by x.created_at desc) from (
      select u.id, u.email, u.created_at, u.last_sign_in_at,
             coalesce(nullif(p.name,''), split_part(coalesce(u.email,''),'@',1)) as name
      from auth.users u
      left join public.profiles p on p.id=u.id
      order by u.created_at desc limit 100
    ) x), '[]'::jsonb),
    'recent_visits', coalesce((select jsonb_agg(x order by x.visited_at desc) from (
      select visited_at, path, referrer, user_agent
      from public.site_visits
      order by visited_at desc limit 100
    ) x), '[]'::jsonb),
    'visitor_growth', coalesce((select jsonb_agg(jsonb_build_object(
      'label', label,
      'count', count,
      'cumulative', cumulative
    ) order by day) from (
      with days as (
        select generate_series(
          current_date - interval '29 days',
          current_date,
          interval '1 day'
        )::date as day
      ), daily as (
        select visited_at::date as day, count(distinct visitor_id)::int as count
        from public.site_visits
        where visited_at >= current_date - interval '29 days'
        group by 1
      )
      select d.day,
             to_char(d.day,'DD/MM') as label,
             coalesce(v.count,0)::int as count,
             sum(coalesce(v.count,0)) over (order by d.day)::int as cumulative
      from days d
      left join daily v on v.day=d.day
    ) x), '[]'::jsonb),
    'account_growth', coalesce((select jsonb_agg(jsonb_build_object('label',label,'count',count) order by day) from (
      select date_trunc('day', created_at)::date as day,
             to_char(date_trunc('day', created_at),'DD/MM') as label,
             count(*)::int as count
      from auth.users
      where created_at >= now() - interval '14 days'
      group by 1,2
    ) x), '[]'::jsonb)
  ) into out;
  return out;
end;
$$;

grant execute on function public.get_savour_admin_dashboard() to authenticated;
