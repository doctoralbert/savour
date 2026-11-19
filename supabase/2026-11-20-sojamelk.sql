-- Sojamelk in de Savour-lijst (2026-11-20), voor barista's en de koffiebar.
-- Waarom: havermelk (gluten), amandelmelk (noten) en melk stonden er al goed in, sojamelk niet. Savour noemde
-- sojamelk daardoor "nog niet bekend", en de Engelse "soy milk" uit de basislijst kreeg ten onrechte melk en lactose
-- (dat laatste is in de code opgelost: PLANT_NOT_DAIRY in js/features/products.js).
-- Nakijken vóór het draaien (gecontroleerd op 2026-11-20: geen van deze vijf regels bestaat al):
--   select lang, key, allergens from public.ingredient_list
--   where key in ('sojamelk', 'soy milk', 'sojamilch', 'leche de soja', 'lait de soja');
-- Bestaande regels blijven zoals ze zijn (on conflict do nothing).
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

insert into public.ingredient_list (lang, key, name, aliases, allergens, status, user_count)
values
  ('nl', 'sojamelk', 'Sojamelk', array['sojadrink','soja drink','barista sojamelk']::text[], array['soja']::text[], 'approved', 0),
  ('en', 'soy milk', 'Soy milk', array['soya milk','soy drink','soya drink']::text[], array['soja']::text[], 'approved', 0),
  ('de', 'sojamilch', 'Sojamilch', array['sojadrink']::text[], array['soja']::text[], 'approved', 0),
  ('es', 'leche de soja', 'Leche de soja', array['bebida de soja']::text[], array['soja']::text[], 'approved', 0),
  ('fr', 'lait de soja', 'Lait de soja', array['boisson au soja']::text[], array['soja']::text[], 'approved', 0)
on conflict (lang, key) do nothing;
