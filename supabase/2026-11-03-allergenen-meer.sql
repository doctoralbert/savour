-- Nog meer kenmerken bij producten (2026-11-03, testversie)
--
-- Erbij: lam en schaap, wild, gevogelte, paddenstoelen, pijnboompitten, kokos, maanzaad, histamine, fructose en
-- FODMAP. Bestaande producten blijven zoals ze zijn.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-03-allergenen-uitgebreid.sql is eerder uitgevoerd.

begin;

alter table public.products drop constraint if exists products_allergens_check;
alter table public.products add constraint products_allergens_check check (
  allergens <@ array['gluten', 'schaaldieren', 'ei', 'vis', 'pinda', 'soja', 'melk', 'noten', 'selderij',
                     'mosterd', 'sesam', 'sulfiet', 'lupine', 'weekdieren',
                     'lactose', 'varkensvlees', 'rundvlees', 'lam', 'wild', 'gevogelte', 'alcohol', 'ui', 'knoflook',
                     'peulvruchten', 'mais', 'nachtschade', 'paddenstoelen', 'pijnboompitten', 'kokos', 'maanzaad',
                     'kiwi', 'steenfruit', 'koriander', 'glutamaat', 'histamine', 'fructose', 'fodmap']::text[]
);

commit;

-- Controle: moet de nieuwe regel tonen met 'fodmap' erin.
select pg_get_constraintdef(oid) as regel from pg_constraint where conname = 'products_allergens_check';
