-- Meer namen die geen ingrediënt zijn (2026-11-07), voor iedereen. Savour stelt bij deze regels voor om ze weg te
-- halen; er verandert niets aan een recept zonder dat de kok ja zegt.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-07-geen-ingredient-leren.sql is eerder uitgevoerd.

insert into public.ingredient_list (lang, key, name, status)
values
  ('nl', 'recept', 'Recept', 'junk'),
  ('nl', 'recept basis ijsmousse', 'Recept basis ijsmousse', 'junk'),
  ('nl', 'sap en rasp', 'Sap en rasp', 'junk'),
  ('nl', 'schil', 'Schil', 'junk'),
  ('nl', 'schil en sap', 'Schil en sap', 'junk'),
  ('nl', 'smaakstoffen', 'Smaakstoffen', 'junk'),
  ('nl', 'terrine', 'Terrine', 'junk'),
  ('nl', 'u', 'U', 'junk'),
  ('nl', 'vlees/vis', 'Vlees/vis', 'junk'),
  ('nl', 'voor in het bak blik', 'Voor in het bak blik', 'junk'),
  ('nl', 'vulling', 'Vulling', 'junk'),
  ('nl', 'zeste', 'Zeste', 'junk')
on conflict (lang, key) do update set status = excluded.status, reviewed_at = now();
