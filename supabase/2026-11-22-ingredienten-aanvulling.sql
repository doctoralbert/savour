-- Dagrapport 22-11-2026: butternut is een pompoen, geen boter. Het trefwoord "butter" gaf deze vier regels in de
-- ingrediëntenlijst ten onrechte melk en lactose. Alleen die twee codes gaan eruit; de rest blijft staan.
-- (Een Spaanse regel voor butternut bestond op 23-11-2026 niet.) Eenmalig uitvoeren in de SQL-editor van Supabase.
update public.ingredient_list
set allergens = array_remove(array_remove(allergens, 'melk'), 'lactose')
where key in ('butternusskürbis', 'butternut squash', 'courge butternut', 'butternutpompoen')
  and status = 'approved';
