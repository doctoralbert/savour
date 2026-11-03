-- Meer schrijfwijzen per product (2026-11-03, testversie)
--
-- "Alles automatisch koppelen" zet alle schrijfwijzen uit je recepten bij het juiste product. Een veelgebruikt
-- product zoals suiker of zout kan er zo meer dan 50 krijgen; de grens gaat naar 500.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

alter table public.products drop constraint if exists products_aliases_check;
alter table public.products add constraint products_aliases_check check (cardinality(aliases) <= 500);

commit;

-- Controle: moet 500 in de regel tonen.
select pg_get_constraintdef(oid) as regel from pg_constraint where conname = 'products_aliases_check';
