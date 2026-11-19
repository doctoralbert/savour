-- Meel krijgt gluten (2026-11-19).
-- Waarom: een Nederlandstalige kok die een Duits, Frans of Spaans recept importeert, kreeg bij bloem geen
-- gluten-waarschuwing. De regel nl/meel in de Savour-lijst had geen allergenen, maar wel de buitenlandse namen
-- mehl, harina, farine, farines en flour als andere schrijfwijze. Daardoor won "meel zonder allergenen" van de juiste
-- regel in de eigen taal. Dit stond ook in de dagrapporten van 17 en 18 november.
-- 1. nl/meel krijgt gluten (alleen als er nog geen allergenen staan).
-- 2. De buitenlandse namen gaan uit de aliassen van nl/meel; ze hebben in hun eigen taal al een regel mét gluten.
--    Nakijken vóór het draaien (gecontroleerd op 2026-11-19: alle vier met gluten en fodmap):
--      select lang, key, allergens from public.ingredient_list
--      where (lang = 'de' and key = 'mehl') or (lang = 'es' and key = 'harina')
--         or (lang = 'fr' and key = 'farine') or (lang = 'en' and key = 'flour');
-- Er worden geen andere regels aangepast. Ook de code herkent gluten nu in Mehl, farine, harina en farina
-- (js/features/products.js, test: tests/allergenen-bloem.test.mjs).
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

update public.ingredient_list
set allergens = array['gluten']
where lang = 'nl' and key = 'meel' and status = 'approved' and coalesce(array_length(allergens, 1), 0) = 0;

update public.ingredient_list
set aliases = array(select a from unnest(aliases) a where a not in ('mehl', 'harina', 'farine', 'farines', 'flour'))
where lang = 'nl' and key = 'meel';
