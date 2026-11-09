-- Accountactiviteit voor /admin (2026-11-10): wie is nu actief, en gebruikt iemand Savour op de telefoon,
-- tablet of computer. Per account per dag per soort apparaat één regel met het eerste en laatste moment.
-- Geen browsergegevens, geen IP-adres, geen pagina's: alleen het soort apparaat en de tijd.
-- De app meldt zich bij het openen en daarna elke 5 minuten zolang Savour in beeld is (js/features/auth.js).
-- Veilig om opnieuw te draaien. Verwijdert iemand zijn account, dan gaan deze regels mee weg.

create table if not exists public.account_activity (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  device text not null check (device in ('telefoon', 'tablet', 'computer')),
  first_at timestamptz not null default now(),
  last_at timestamptz not null default now(),
  primary key (user_id, day, device)
);
alter table public.account_activity enable row level security;
-- Geen policies: gebruikers lezen of schrijven deze tabel niet zelf, alleen via de functie hieronder.
-- De beheeromgeving (api/admin.js) leest hem met de service role.

-- De app meldt: "ik ben actief op dit soort apparaat". Alleen voor het eigen account (auth.uid()).
create or replace function public.savour_touch_activity(_device text)
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
  insert into public.account_activity (user_id, day, device) values (auth.uid(), today, _device)
  on conflict (user_id, day, device) do update set last_at = now();
end;
$$;
revoke all on function public.savour_touch_activity(text) from public, anon;
grant execute on function public.savour_touch_activity(text) to authenticated;
