-- Welke allergenen houdt een productlijst bij? (2026-11-03, testversie)
--
-- Bij de eerste keer kiest de kok: alleen de 14 wettelijke allergenen van de EU, of aanvullen met extra kenmerken
-- (lactose, gevogelte, histamine ...). Eén regel per eigen lijst en één per keukenteam. Wat niet gekozen is, blijft
-- bij de producten bewaard maar Savour toont het niet.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-03-producten-allergenen.sql en 2026-11-03-producten-opslaan-herstel.sql.

begin;

create table if not exists public.product_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  team_id uuid references public.shared_maps (id) on delete cascade,
  allergen_extras text[] not null default '{}',
  updated_at timestamptz not null default now(),
  check ((user_id is null) <> (team_id is null))
);

alter table public.product_settings drop constraint if exists product_settings_extras_check;
alter table public.product_settings add constraint product_settings_extras_check check (
  allergen_extras <@ array['lactose', 'varkensvlees', 'rundvlees', 'lam', 'wild', 'gevogelte', 'alcohol', 'ui',
                           'knoflook', 'peulvruchten', 'mais', 'nachtschade', 'paddenstoelen', 'pijnboompitten',
                           'kokos', 'maanzaad', 'kiwi', 'steenfruit', 'koriander', 'glutamaat', 'histamine',
                           'fructose', 'fodmap']::text[]
);

create unique index if not exists product_settings_user_uq on public.product_settings (user_id) where user_id is not null;
create unique index if not exists product_settings_team_uq on public.product_settings (team_id) where team_id is not null;

drop trigger if exists product_settings_touched on public.product_settings;
create trigger product_settings_touched before update on public.product_settings
  for each row execute function public.savour_products_touched();

alter table public.product_settings enable row level security;

drop policy if exists "product_settings lezen" on public.product_settings;
create policy "product_settings lezen" on public.product_settings for select using (
  user_id = auth.uid() or (team_id is not null and public.savour_team_member(team_id))
);

drop policy if exists "product_settings toevoegen" on public.product_settings;
create policy "product_settings toevoegen" on public.product_settings for insert with check (
  (user_id = auth.uid() and public.savour_i_am_pro())
  or (user_id is null and team_id is not null and public.savour_team_can_edit(team_id))
);

drop policy if exists "product_settings wijzigen" on public.product_settings;
create policy "product_settings wijzigen" on public.product_settings for update
  using ((user_id = auth.uid() and public.savour_i_am_pro())
         or (team_id is not null and public.savour_team_can_edit(team_id)))
  with check ((user_id = auth.uid() and public.savour_i_am_pro())
              or (user_id is null and team_id is not null and public.savour_team_can_edit(team_id)));

drop policy if exists "product_settings verwijderen" on public.product_settings;
create policy "product_settings verwijderen" on public.product_settings for delete using (
  user_id = auth.uid() or (team_id is not null and public.savour_team_can_edit(team_id))
);

grant select, insert, update, delete on public.product_settings to authenticated;

commit;

-- Controle: moet 'true' tonen.
select to_regclass('public.product_settings') is not null as klaar;
