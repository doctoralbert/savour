-- Producten en allergenen (2026-11-03, testversie)
--
-- Een product is een ingrediënt zoals de keuken het inkoopt: roomboter, slagroom, bloem. Een product heeft de
-- allergenen (de 14 uit de EU-wetgeving) en de namen waaronder het in recepten staat ("koude roomboter").
-- Savour koppelt receptregels op naam aan een product en telt zo de allergenen van een recept op.
-- Later komen hier ook inkoopprijzen bij (in een aparte tabel, zodat koks in een keukenteam geen prijzen zien).
--
-- - Eigen producten: horen bij je eigen recepten. Toevoegen en wijzigen kan met Savour Pro (ook in de proefweek).
--   Wie stopt met Pro houdt alles: lezen en verwijderen blijft altijd mogelijk.
-- - Producten van een keukenteam: iedereen in het team ziet ze (allergenen zijn een veiligheidszaak);
--   eigenaar en sous-chefs voegen toe en wijzigen. Staat het keukenteam op slot, dan is de lijst niet te gebruiken.
-- - allergens_known: de kok heeft de allergenen gecontroleerd. Pas dan telt "geen allergenen" ook echt als geen.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-01-keukenteam-alleen-met-pro.sql is eerder uitgevoerd.
-- Let op: voer daarna ook 2026-11-03-producten-opslaan-herstel.sql uit (de Pro-controle hieronder werkt niet
-- voor ingelogde gebruikers; het herstel vervangt die regels).

begin;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  team_id uuid references public.shared_maps (id) on delete cascade,
  name text not null check (length(btrim(name)) between 1 and 120),
  aliases text[] not null default '{}' check (cardinality(aliases) <= 50),
  allergens text[] not null default '{}' check (
    allergens <@ array['gluten', 'schaaldieren', 'ei', 'vis', 'pinda', 'soja', 'melk', 'noten', 'selderij',
                       'mosterd', 'sesam', 'sulfiet', 'lupine', 'weekdieren']::text[]
  ),
  allergens_known boolean not null default false,
  allergen_note text not null default '' check (length(allergen_note) <= 300),
  created_by uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((user_id is null) <> (team_id is null))
);

create index if not exists products_user_idx on public.products (user_id) where user_id is not null;
create index if not exists products_team_idx on public.products (team_id) where team_id is not null;

create or replace function public.savour_products_touched()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists products_touched on public.products;
create trigger products_touched before update on public.products
  for each row execute function public.savour_products_touched();

alter table public.products enable row level security;

drop policy if exists "products lezen" on public.products;
create policy "products lezen" on public.products for select using (
  user_id = auth.uid() or (team_id is not null and public.savour_team_member(team_id))
);

drop policy if exists "products toevoegen" on public.products;
create policy "products toevoegen" on public.products for insert with check (
  (user_id = auth.uid() and public.savour_is_pro(auth.uid()))
  or (user_id is null and team_id is not null and public.savour_team_can_edit(team_id))
);

drop policy if exists "products wijzigen" on public.products;
create policy "products wijzigen" on public.products for update
  using ((user_id = auth.uid() and public.savour_is_pro(auth.uid()))
         or (team_id is not null and public.savour_team_can_edit(team_id)))
  with check ((user_id = auth.uid() and public.savour_is_pro(auth.uid()))
              or (user_id is null and team_id is not null and public.savour_team_can_edit(team_id)));

drop policy if exists "products verwijderen" on public.products;
create policy "products verwijderen" on public.products for delete using (
  user_id = auth.uid() or (team_id is not null and public.savour_team_can_edit(team_id))
);

grant select, insert, update, delete on public.products to authenticated;

commit;

-- Controle: moet products tonen met rowsecurity = true.
select tablename, rowsecurity from pg_tables where schemaname = 'public' and tablename = 'products';
