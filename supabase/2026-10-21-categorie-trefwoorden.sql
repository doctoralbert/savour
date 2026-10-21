-- Savour: trefwoorden per categorie (2026-10-21)
--
-- Per categorie bewaart de chef een lijst trefwoorden, bijvoorbeeld IJs: ijs, sorbet, parfait.
-- Savour stelt daarmee een categorie voor op basis van de receptnaam. De chef bevestigt altijd zelf.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run.
-- Veilig om vaker uit te voeren. De bestaande beveiliging (alleen je eigen categorieën) blijft gelden.

alter table public.categories
  add column if not exists keywords text[] not null default '{}';

-- Controle: moet één regel tonen met data_type ARRAY.
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'categories' and column_name = 'keywords';
