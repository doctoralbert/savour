-- Accountactiviteit: ook het aantal bezoeken per account (2026-11-10). Een bezoek = de app openen, of terugkomen
-- nadat Savour minstens 30 minuten niet in beeld was. Interessanter dan "keer ingelogd", omdat koks meestal
-- ingelogd blijven. Per account per dag per soort apparaat een teller; geen extra gegevens.
-- Veilig om opnieuw te draaien. Vereist supabase/2026-11-10-accountactiviteit.sql.

alter table public.account_activity add column if not exists opens integer not null default 0;

-- Oude versie (alleen apparaat) weg, zodat er geen twee versies naast elkaar bestaan.
drop function if exists public.savour_touch_activity(text);

create or replace function public.savour_touch_activity(_device text, _new_visit boolean default false)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := (now() at time zone 'Europe/Amsterdam')::date;
begin
  if auth.uid() is null or _device not in ('telefoon', 'tablet', 'computer') then
    return;
  end if;
  insert into public.account_activity (user_id, day, device, opens)
  values (auth.uid(), today, _device, case when _new_visit then 1 else 0 end)
  on conflict (user_id, day, device) do update
    set last_at = now(),
        opens = public.account_activity.opens + case when _new_visit then 1 else 0 end;
end;
$$;
revoke all on function public.savour_touch_activity(text, boolean) from public, anon;
grant execute on function public.savour_touch_activity(text, boolean) to authenticated;
