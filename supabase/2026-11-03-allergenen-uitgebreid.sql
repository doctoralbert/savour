-- Uitgebreide allergenenlijst (2026-11-03, testversie)
--
-- Naast de 14 wettelijke allergenen kan een product nu ook extra kenmerken hebben waar gasten naar vragen:
-- lactose (los van melk: lactosevrije room bevat nog melkeiwit), varkensvlees, rundvlees, alcohol, ui, knoflook,
-- peulvruchten, maïs, glutamaat, nachtschade, kiwi, steenfruit en koriander. Bestaande producten blijven zoals ze zijn.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-03-producten-allergenen.sql is eerder uitgevoerd.

begin;

alter table public.products drop constraint if exists products_allergens_check;
alter table public.products add constraint products_allergens_check check (
  allergens <@ array['gluten', 'schaaldieren', 'ei', 'vis', 'pinda', 'soja', 'melk', 'noten', 'selderij',
                     'mosterd', 'sesam', 'sulfiet', 'lupine', 'weekdieren',
                     'lactose', 'varkensvlees', 'rundvlees', 'alcohol', 'ui', 'knoflook', 'peulvruchten', 'mais',
                     'glutamaat', 'nachtschade', 'kiwi', 'steenfruit', 'koriander']::text[]
);

commit;

-- Controle: moet de nieuwe regel tonen met 'koriander' erin.
select pg_get_constraintdef(oid) as regel from pg_constraint where conname = 'products_allergens_check';
