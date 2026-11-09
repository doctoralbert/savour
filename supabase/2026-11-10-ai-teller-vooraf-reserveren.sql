-- AI-teller: eerst een plek reserveren, dan pas de AI laten lezen (2026-11-10).
-- Tot nu toe telde api/ai-import.js een import pas als de AI klaar was. Startte iemand veel imports tegelijk
-- (een stapel bestanden), dan konden er een paar door de controle glippen voordat de teller vol stond: die
-- kostten wel geld, maar werden niet geteld. Nu reserveert de server vooraf één plek; mislukt de lezing, dan
-- geeft hij die plek terug. Zo komt niemand ooit boven de grens (15 in de proefweek, 500 per maand met Pro).
-- Veilig om opnieuw te draaien. Alleen de server (service role) mag deze functies aanroepen.

-- 1. Plek reserveren. Geeft het nieuwe aantal terug, of null als de grens al bereikt is.
create or replace function public.savour_reserve_ai_use(_user uuid, _limit integer default 500)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  this_month text := to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM');
  trial boolean := public.savour_ai_trial_only(_user);
  lim integer := case when public.savour_ai_trial_only(_user) then least(_limit, 15) else _limit end;
  used integer;
begin
  -- Eén gebruiker tegelijk: imports die gelijktijdig binnenkomen wachten hier even op elkaar.
  perform pg_advisory_xact_lock(hashtext('savour_ai_use:' || _user::text));
  if trial then
    used := coalesce((select sum(count) from public.ai_usage where user_id = _user), 0);
  else
    used := coalesce((select count from public.ai_usage where user_id = _user and month = this_month), 0);
  end if;
  if used >= lim then
    return null;
  end if;
  insert into public.ai_usage (user_id, month, count) values (_user, this_month, 1)
  on conflict (user_id, month) do update set count = public.ai_usage.count + 1;
  insert into public.ai_usage_log (user_id) values (_user);
  return used + 1;
end;
$$;

-- 2. Plek teruggeven als de AI niets bruikbaars opleverde (de import telt dan niet).
create or replace function public.savour_release_ai_use(_user uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  this_month text := to_char(now() at time zone 'Europe/Amsterdam', 'YYYY-MM');
begin
  perform pg_advisory_xact_lock(hashtext('savour_ai_use:' || _user::text));
  update public.ai_usage set count = count - 1 where user_id = _user and month = this_month and count > 0;
  delete from public.ai_usage_log
  where id = (select id from public.ai_usage_log where user_id = _user order by at desc, id desc limit 1);
end;
$$;

-- 3. Niet aan te roepen vanuit de app (anders kon iemand zijn eigen teller terugzetten).
revoke all on function public.savour_reserve_ai_use(uuid, integer) from public, anon, authenticated;
revoke all on function public.savour_release_ai_use(uuid) from public, anon, authenticated;
grant execute on function public.savour_reserve_ai_use(uuid, integer) to service_role;
grant execute on function public.savour_release_ai_use(uuid) to service_role;
