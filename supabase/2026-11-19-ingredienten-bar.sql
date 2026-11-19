-- Savour-lijst aanvullen met barproducten (2026-11-19), voor bartenders en cocktailkaarten.
-- Getest in de app: deze namen kende Savour nog niet. Allergenen alleen wat zeker in het product zit; bij twijfel
-- liever één te veel (falernum en orgeat: amandel = noten). Gedistilleerd uit graan (whisky, jenever) bevat volgens de
-- EU-regels geen gluten meer. Wijnbasis (vermouth, sherry, prosecco, cava, Lillet) bevat sulfiet.
-- Bestaande namen blijven zoals ze zijn (on conflict do nothing).
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

insert into public.ingredient_list (lang, key, name, aliases, allergens, status, user_count)
values
  -- Nederlands
  ('nl', 'tequila', 'Tequila', array['tequila blanco','tequila reposado','tequila añejo']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'mezcal', 'Mezcal', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'whiskey', 'Whiskey', array['rye whiskey','rye','scotch','scotch whisky','single malt','blended whisky','irish whiskey']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'cachaça', 'Cachaça', array['cachaca']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'absint', 'Absint', array['absinthe','absinth']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'jenever', 'Jenever', array['jonge jenever','oude jenever','korenwijn']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'grappa', 'Grappa', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'pastis', 'Pastis', array['pernod','ouzo','sambuca','anijslikeur']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'vermout', 'Vermout', array['vermouth','rode vermouth','droge vermouth','witte vermouth','dry vermouth','sweet vermouth','zoete vermouth','rosso vermouth','bianco vermouth']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('nl', 'sherry', 'Sherry', array['fino sherry','fino','manzanilla','amontillado','oloroso','pedro ximénez']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('nl', 'prosecco', 'Prosecco', array['mousserende wijn','sparkling wine']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('nl', 'cava', 'Cava', array[]::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('nl', 'lillet', 'Lillet', array['lillet blanc','lillet rosé']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('nl', 'aperol', 'Aperol', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'chartreuse', 'Chartreuse', array['groene chartreuse','gele chartreuse']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'bénédictine', 'Bénédictine', array['benedictine']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'drambuie', 'Drambuie', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'galliano', 'Galliano', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'curaçao', 'Curaçao', array['curacao','blue curaçao','blue curacao','oranje curaçao']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'amaro', 'Amaro', array['fernet branca','fernet','averna','montenegro']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'vlierbloesemlikeur', 'Vlierbloesemlikeur', array['st-germain','st germain','saint-germain']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'koffielikeur', 'Koffielikeur', array['kahlua','kahlúa','tia maria']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'eierlikeur', 'Eierlikeur', array[]::text[], array['ei','alcohol']::text[], 'approved', 0),
  ('nl', 'frangelico', 'Frangelico', array['hazelnootlikeur']::text[], array['noten','alcohol']::text[], 'approved', 0),
  ('nl', 'falernum', 'Falernum', array['velvet falernum']::text[], array['noten','alcohol']::text[], 'approved', 0),
  ('nl', 'orgeat', 'Orgeat', array['orgeatsiroop','amandelsiroop']::text[], array['noten']::text[], 'approved', 0),
  ('nl', 'cocktailbitter', 'Cocktailbitter', array['angostura','angostura bitters','peychaud bitters','peychaud''s bitters','orange bitters','sinaasappelbitter','bitters']::text[], array['alcohol']::text[], 'approved', 0),
  ('nl', 'agavesiroop', 'Agavesiroop', array['agavestroop','agave']::text[], array['fructose','fodmap']::text[], 'approved', 0),
  ('nl', 'cola', 'Cola', array[]::text[], array[]::text[], 'approved', 0),
  ('nl', 'clamato', 'Clamato', array[]::text[], array['weekdieren']::text[], 'approved', 0),
  -- Engels
  ('en', 'tequila', 'Tequila', array['blanco tequila','reposado tequila']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'mezcal', 'Mezcal', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'whiskey', 'Whiskey', array['rye whiskey','rye','scotch','scotch whisky','single malt','irish whiskey']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'cachaça', 'Cachaça', array['cachaca']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'absinthe', 'Absinthe', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'vermouth', 'Vermouth', array['sweet vermouth','dry vermouth','red vermouth','white vermouth','rosso vermouth','bianco vermouth']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('en', 'sherry', 'Sherry', array['fino sherry','fino','manzanilla','amontillado','oloroso','pedro ximénez']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('en', 'prosecco', 'Prosecco', array['sparkling wine']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('en', 'cava', 'Cava', array[]::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('en', 'lillet', 'Lillet', array['lillet blanc']::text[], array['sulfiet','alcohol']::text[], 'approved', 0),
  ('en', 'aperol', 'Aperol', array[]::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'chartreuse', 'Chartreuse', array['green chartreuse','yellow chartreuse']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'curaçao', 'Curaçao', array['curacao','blue curaçao','blue curacao','orange curaçao']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'amaro', 'Amaro', array['fernet branca','fernet','averna']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'elderflower liqueur', 'Elderflower liqueur', array['st-germain','st germain']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'coffee liqueur', 'Coffee liqueur', array['kahlua','kahlúa','tia maria']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'frangelico', 'Frangelico', array['hazelnut liqueur']::text[], array['noten','alcohol']::text[], 'approved', 0),
  ('en', 'falernum', 'Falernum', array['velvet falernum']::text[], array['noten','alcohol']::text[], 'approved', 0),
  ('en', 'orgeat', 'Orgeat', array['orgeat syrup','almond syrup']::text[], array['noten']::text[], 'approved', 0),
  ('en', 'bitters', 'Bitters', array['angostura','angostura bitters','peychaud''s bitters','peychaud bitters','orange bitters']::text[], array['alcohol']::text[], 'approved', 0),
  ('en', 'agave syrup', 'Agave syrup', array['agave nectar','agave']::text[], array[]::text[], 'approved', 0),
  ('en', 'cola', 'Cola', array[]::text[], array[]::text[], 'approved', 0),
  ('en', 'clamato', 'Clamato', array[]::text[], array['weekdieren']::text[], 'approved', 0)
on conflict (lang, key) do nothing;
