-- Uiachtigen (2026-11-03, testversie)
--
-- Het kenmerk "ui" heet nu "Uiachtigen": ui, sjalot, prei, bieslook, daslook, lente-ui en knoflook. Producten van de
-- startlijst die al zijn gemaakt, krijgen het erbij: alles met knoflook, en bieslook. Verder verandert er niets.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

update public.products
set allergens = array_append(allergens, 'ui')
where not ('ui' = any (allergens))
  and ('knoflook' = any (allergens) or lower(btrim(name)) in ('bieslook', 'daslook', 'lente-ui', 'lenteui', 'bosui'));

commit;

-- Controle: moet 0 tonen.
select count(*) as nog_zonder_ui from public.products
where not ('ui' = any (allergens))
  and ('knoflook' = any (allergens) or lower(btrim(name)) in ('bieslook', 'daslook', 'lente-ui', 'lenteui', 'bosui'));
