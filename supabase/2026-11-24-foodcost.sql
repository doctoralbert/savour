-- Foodcost calculator (2026-11-24, testversie)
--
-- Inkoopprijzen, leveranciers en kostprijzen per recept. Besluit van de eigenaar (24-11-2026): alles is van jezelf.
-- Alleen jij ziet je prijzen, ook als je in een keukenteam zit; een teamgenoot ziet ze nooit. Toevoegen en
-- wijzigen kan met Savour Pro (ook in de proefweek). Wie stopt met Pro houdt alles: lezen en verwijderen blijft.
--
-- Waarom aparte tabellen en niet in public.products: producten (allergenen) zijn in een keukenteam voor iedereen
-- leesbaar, prijzen niet. Een prijs hoort bij een "kostproduct" van jezelf, dat Savour op naam aan receptregels
-- koppelt, net als bij de allergenen.
--
-- - cost_suppliers: je leveranciers, met de korting die je hebt afgesproken.
-- - cost_products:  wat je inkoopt, met opbrengst na schoonmaken, gewicht per stuk en "1 l = … kg". Alleen wat de
--                   kok zelf invult; Savour vult hier nooit iets in.
-- - cost_prices:    elke prijs is een nieuwe regel (prijshistorie). Een oude prijs wordt nooit overschreven.
-- - cost_imports:   een ingeladen prijslijst zoals hij was, en hoeveel regels de kok goedkeurde.
-- - cost_recipes:   per recept je verkoopprijs, doel %, porties en je keuzes per regel ("telt niet mee").
--                   Het recept zelf verandert nooit door de calculator.
-- - cost_menus / cost_menu_items: menu's en kaarten voor de foodcost van een menu en menu engineering.
-- - cost_settings:  je standaard doel % (30) en btw %.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-03-producten-opslaan-herstel.sql (savour_i_am_pro) is eerder uitgevoerd.

begin;

create table if not exists public.cost_suppliers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (length(btrim(name)) between 1 and 120),
  discount_pct numeric(5, 2) not null default 0 check (discount_pct >= 0 and discount_pct < 100),
  note text not null default '' check (length(note) <= 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cost_suppliers_user on public.cost_suppliers (user_id);

create table if not exists public.cost_products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (length(btrim(name)) between 1 and 120),
  -- De namen waaronder het in recepten staat (zoeksleutels, zoals bij producten).
  aliases text[] not null default '{}' check (cardinality(aliases) <= 80),
  -- Opbrengst na schoonmaken in procenten; leeg = niet ingevuld (Savour rekent dan met 100% en zegt dat).
  yield_pct numeric(5, 2) check (yield_pct is null or (yield_pct > 0 and yield_pct <= 100)),
  -- Kilo per liter (= gram per milliliter); leeg = onbekend.
  density numeric(8, 4) check (density is null or density > 0),
  -- Gram per stuk of per eigen woord: { "stuk": 30, "teen": 5 }.
  units jsonb not null default '{}'::jsonb check (jsonb_typeof(units) = 'object'),
  preferred_supplier_id uuid references public.cost_suppliers (id) on delete set null,
  note text not null default '' check (length(note) <= 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cost_products_user on public.cost_products (user_id);

create table if not exists public.cost_imports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  supplier_id uuid references public.cost_suppliers (id) on delete set null,
  file_name text not null default '' check (length(file_name) <= 200),
  -- De regels zoals ze in het bestand stonden, zodat er nooit iets verloren gaat.
  rows jsonb not null default '[]'::jsonb,
  vat_included numeric(5, 2),
  approved integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists cost_imports_user on public.cost_imports (user_id);

create table if not exists public.cost_prices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  product_id uuid not null references public.cost_products (id) on delete cascade,
  supplier_id uuid references public.cost_suppliers (id) on delete set null,
  -- De verpakking zoals op de factuur ("doos 6 × 1 kg") en wat Savour daarvan las (6000 g).
  pack_text text not null default '' check (length(pack_text) <= 120),
  pack_qty numeric(14, 4) not null check (pack_qty > 0),
  pack_unit text not null check (pack_unit in ('g', 'ml', 'stuk')),
  -- Prijs van de hele verpakking, zonder btw en vóór de korting van de leverancier.
  price numeric(12, 4) not null check (price >= 0),
  valid_from date not null default current_date,
  source text not null default 'hand' check (source in ('hand', 'lijst')),
  import_id uuid references public.cost_imports (id) on delete set null,
  code text not null default '' check (length(code) <= 60), -- artikelnummer van de leverancier
  created_at timestamptz not null default now()
);
create index if not exists cost_prices_product on public.cost_prices (product_id, valid_from desc, created_at desc);
create index if not exists cost_prices_user on public.cost_prices (user_id);

create table if not exists public.cost_recipes (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  recipe_id uuid not null references public.recipes (id) on delete cascade,
  portions numeric(10, 2) check (portions is null or portions > 0),
  density numeric(8, 4) check (density is null or density > 0),
  -- Per ingrediënt: { "zout": { "skip": true }, "kruiden": { "fixed": 0.10 } }.
  choices jsonb not null default '{}'::jsonb check (jsonb_typeof(choices) = 'object'),
  sell_price numeric(12, 4) check (sell_price is null or sell_price >= 0), -- zonder btw, per portie
  vat_pct numeric(5, 2) check (vat_pct is null or (vat_pct >= 0 and vat_pct < 100)),
  target_pct numeric(5, 2) check (target_pct is null or (target_pct > 0 and target_pct < 100)),
  updated_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);

create table if not exists public.cost_menus (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (length(btrim(name)) between 1 and 120),
  -- kaart: losse gerechten (menu engineering); arrangement: vaste prijs voor alle gerechten samen.
  kind text not null default 'kaart' check (kind in ('kaart', 'arrangement')),
  price numeric(12, 4) check (price is null or price >= 0), -- arrangementsprijs zonder btw
  period text not null default '' check (length(period) <= 80), -- "november 2026", voor de verkoopcijfers
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cost_menus_user on public.cost_menus (user_id);

create table if not exists public.cost_menu_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  menu_id uuid not null references public.cost_menus (id) on delete cascade,
  recipe_id uuid not null references public.recipes (id) on delete cascade,
  sold integer check (sold is null or sold >= 0), -- aantal verkocht in de periode
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists cost_menu_items_menu on public.cost_menu_items (menu_id);

create table if not exists public.cost_settings (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  target_pct numeric(5, 2) not null default 30 check (target_pct > 0 and target_pct < 100),
  vat_pct numeric(5, 2) not null default 9 check (vat_pct >= 0 and vat_pct < 100),
  updated_at timestamptz not null default now()
);

-- Bijgewerkt-tijd
create or replace function public.savour_cost_touched()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['cost_suppliers', 'cost_products', 'cost_recipes', 'cost_menus', 'cost_settings'] loop
    execute format('drop trigger if exists %I_touched on public.%I', t, t);
    execute format('create trigger %I_touched before update on public.%I for each row execute function public.savour_cost_touched()', t, t);
  end loop;
end $$;

-- ---- Rechten: alleen jijzelf. Lezen en verwijderen altijd, toevoegen en wijzigen met Pro. ----
do $$
declare t text;
begin
  foreach t in array array['cost_suppliers', 'cost_products', 'cost_imports', 'cost_prices', 'cost_recipes',
                           'cost_menus', 'cost_menu_items', 'cost_settings'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "%s lezen" on public.%I', t, t);
    execute format('create policy "%s lezen" on public.%I for select using (user_id = auth.uid())', t, t);
    execute format('drop policy if exists "%s toevoegen" on public.%I', t, t);
    execute format('create policy "%s toevoegen" on public.%I for insert with check (user_id = auth.uid() and public.savour_i_am_pro())', t, t);
    execute format('drop policy if exists "%s wijzigen" on public.%I', t, t);
    execute format('create policy "%s wijzigen" on public.%I for update using (user_id = auth.uid() and public.savour_i_am_pro()) with check (user_id = auth.uid() and public.savour_i_am_pro())', t, t);
    execute format('drop policy if exists "%s verwijderen" on public.%I', t, t);
    execute format('create policy "%s verwijderen" on public.%I for delete using (user_id = auth.uid())', t, t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

-- Een prijs wordt nooit gewijzigd, alleen toegevoegd (historie). Een verkeerde prijs kun je wel verwijderen.
drop policy if exists "cost_prices wijzigen" on public.cost_prices;
revoke update on public.cost_prices from authenticated;

-- Een prijs, import of menuregel mag alleen naar je eigen product, leverancier of menu wijzen.
create or replace function public.savour_cost_own_refs()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_table_name = 'cost_prices' then
    if not exists (select 1 from public.cost_products p where p.id = new.product_id and p.user_id = new.user_id) then
      raise exception 'Product hoort niet bij dit account';
    end if;
  end if;
  if tg_table_name in ('cost_prices', 'cost_imports') and new.supplier_id is not null then
    if not exists (select 1 from public.cost_suppliers s where s.id = new.supplier_id and s.user_id = new.user_id) then
      raise exception 'Leverancier hoort niet bij dit account';
    end if;
  end if;
  if tg_table_name = 'cost_products' and new.preferred_supplier_id is not null then
    if not exists (select 1 from public.cost_suppliers s where s.id = new.preferred_supplier_id and s.user_id = new.user_id) then
      raise exception 'Leverancier hoort niet bij dit account';
    end if;
  end if;
  if tg_table_name = 'cost_menu_items' then
    if not exists (select 1 from public.cost_menus m where m.id = new.menu_id and m.user_id = new.user_id) then
      raise exception 'Menu hoort niet bij dit account';
    end if;
  end if;
  return new;
end $$;
revoke all on function public.savour_cost_own_refs() from public, anon, authenticated;

do $$
declare t text;
begin
  foreach t in array array['cost_prices', 'cost_imports', 'cost_products', 'cost_menu_items'] loop
    execute format('drop trigger if exists %I_own_refs on public.%I', t, t);
    execute format('create trigger %I_own_refs before insert or update on public.%I for each row execute function public.savour_cost_own_refs()', t, t);
  end loop;
end $$;

commit;

-- Controle: moet 8 geven (alle tabellen met beveiliging aan).
select count(*) as tabellen_beveiligd from pg_tables
where schemaname = 'public' and tablename like 'cost\_%' and rowsecurity;
