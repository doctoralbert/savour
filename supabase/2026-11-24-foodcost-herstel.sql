-- Herstel: foodcost-producten en -prijzen opslaan, en gerechten (2026-11-24, testversie)
--
-- 1. Gerechten. Een gerecht op de kaart is iets anders dan een recept (opmerking eigenaar 24-11-2026): een bord
--    bestaat uit onderdelen, zoals "1 portie beurre blanc" (een recept), "160 g kabeljauwfilet" (een ingrediënt) en
--    "1 portie bloemkoolcrème". cost_dishes bewaart die onderdelen met de verkoopprijs en het doel; menu's wijzen
--    voortaan naar gerechten (cost_menu_items.dish_id). Ook gerechten zijn alleen van jezelf.
--
-- 2. Opslaan herstellen:
-- Waarom: de controle in 2026-11-24-foodcost.sql (savour_cost_own_refs) las in één regel velden die niet in elke
-- tabel bestaan, zoals new.supplier_id bij een product. Postgres geeft dan de fout "record new has no field ...",
-- waardoor elk product, elke prijs, elke import en elk menugerecht werd geweigerd. Leveranciers hebben die controle
-- niet; die werden wel opgeslagen.
-- Nu heeft elke tabel een eigen controle die alleen zijn eigen velden leest. Wat er gecontroleerd wordt, blijft
-- hetzelfde: een prijs, import of menuregel mag alleen naar je eigen product, leverancier of menu wijzen.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-24-foodcost.sql is eerder uitgevoerd.

begin;

-- ---- 1. Gerechten ----
create table if not exists public.cost_dishes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (length(btrim(name)) between 1 and 120),
  -- Onderdelen per bord: [{ "line": "1 portie Beurre blanc", "recipe_id": "<uuid>" }, { "line": "160 g kabeljauwfilet" }].
  components jsonb not null default '[]'::jsonb check (jsonb_typeof(components) = 'array' and jsonb_array_length(components) <= 60),
  -- Per onderdeel: { "kabeljauwfilet": { "skip": true } } of { "garnituur": { "fixed": 0.40 } }.
  choices jsonb not null default '{}'::jsonb check (jsonb_typeof(choices) = 'object'),
  sell_price numeric(12, 4) check (sell_price is null or sell_price >= 0), -- zonder btw, per bord
  target_pct numeric(5, 2) check (target_pct is null or (target_pct > 0 and target_pct < 100)),
  note text not null default '' check (length(note) <= 300),
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cost_dishes_user on public.cost_dishes (user_id);

drop trigger if exists cost_dishes_touched on public.cost_dishes;
create trigger cost_dishes_touched before update on public.cost_dishes
  for each row execute function public.savour_cost_touched();

alter table public.cost_dishes enable row level security;
drop policy if exists "cost_dishes lezen" on public.cost_dishes;
create policy "cost_dishes lezen" on public.cost_dishes for select using (user_id = auth.uid());
drop policy if exists "cost_dishes toevoegen" on public.cost_dishes;
create policy "cost_dishes toevoegen" on public.cost_dishes for insert
  with check (user_id = auth.uid() and public.savour_i_am_pro());
drop policy if exists "cost_dishes wijzigen" on public.cost_dishes;
create policy "cost_dishes wijzigen" on public.cost_dishes for update
  using (user_id = auth.uid() and public.savour_i_am_pro())
  with check (user_id = auth.uid() and public.savour_i_am_pro());
drop policy if exists "cost_dishes verwijderen" on public.cost_dishes;
create policy "cost_dishes verwijderen" on public.cost_dishes for delete using (user_id = auth.uid());
grant select, insert, update, delete on public.cost_dishes to authenticated;

-- Een menuregel wijst naar een gerecht (recipe_id blijft bestaan maar is niet meer verplicht).
alter table public.cost_menu_items add column if not exists dish_id uuid references public.cost_dishes (id) on delete cascade;
alter table public.cost_menu_items alter column recipe_id drop not null;
alter table public.cost_menu_items drop constraint if exists cost_menu_items_iets;
alter table public.cost_menu_items add constraint cost_menu_items_iets check (dish_id is not null or recipe_id is not null);

-- ---- 2. Opslaan herstellen ----

create or replace function public.savour_cost_check_price()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.cost_products p where p.id = new.product_id and p.user_id = new.user_id) then
    raise exception 'Product hoort niet bij dit account';
  end if;
  if new.supplier_id is not null
     and not exists (select 1 from public.cost_suppliers s where s.id = new.supplier_id and s.user_id = new.user_id) then
    raise exception 'Leverancier hoort niet bij dit account';
  end if;
  return new;
end $$;

create or replace function public.savour_cost_check_import()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.supplier_id is not null
     and not exists (select 1 from public.cost_suppliers s where s.id = new.supplier_id and s.user_id = new.user_id) then
    raise exception 'Leverancier hoort niet bij dit account';
  end if;
  return new;
end $$;

create or replace function public.savour_cost_check_product()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.preferred_supplier_id is not null
     and not exists (select 1 from public.cost_suppliers s where s.id = new.preferred_supplier_id and s.user_id = new.user_id) then
    raise exception 'Leverancier hoort niet bij dit account';
  end if;
  return new;
end $$;

create or replace function public.savour_cost_check_menu_item()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.cost_menus m where m.id = new.menu_id and m.user_id = new.user_id) then
    raise exception 'Menu hoort niet bij dit account';
  end if;
  if new.dish_id is not null
     and not exists (select 1 from public.cost_dishes d where d.id = new.dish_id and d.user_id = new.user_id) then
    raise exception 'Gerecht hoort niet bij dit account';
  end if;
  return new;
end $$;

revoke all on function public.savour_cost_check_price() from public, anon, authenticated;
revoke all on function public.savour_cost_check_import() from public, anon, authenticated;
revoke all on function public.savour_cost_check_product() from public, anon, authenticated;
revoke all on function public.savour_cost_check_menu_item() from public, anon, authenticated;

drop trigger if exists cost_prices_own_refs on public.cost_prices;
create trigger cost_prices_own_refs before insert or update on public.cost_prices
  for each row execute function public.savour_cost_check_price();

drop trigger if exists cost_imports_own_refs on public.cost_imports;
create trigger cost_imports_own_refs before insert or update on public.cost_imports
  for each row execute function public.savour_cost_check_import();

drop trigger if exists cost_products_own_refs on public.cost_products;
create trigger cost_products_own_refs before insert or update on public.cost_products
  for each row execute function public.savour_cost_check_product();

drop trigger if exists cost_menu_items_own_refs on public.cost_menu_items;
create trigger cost_menu_items_own_refs before insert or update on public.cost_menu_items
  for each row execute function public.savour_cost_check_menu_item();

-- De oude, gecombineerde controle wordt niet meer gebruikt.
drop function if exists public.savour_cost_own_refs();

commit;

-- Controle: moet 4 geven (en cost_dishes bestaat) (vier tabellen met de nieuwe controle).
select count(*) as controles from pg_trigger
where tgname in ('cost_prices_own_refs', 'cost_imports_own_refs', 'cost_products_own_refs', 'cost_menu_items_own_refs')
  and not tgisinternal;
