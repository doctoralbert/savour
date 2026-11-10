-- Kladjes terug naar "Origineel bekijken" (10-11-2026).
--
-- Op 10 november om 20:19 werden twintig gefotografeerde kladjes in één keer opgeslagen. Het apart bewaren van
-- de originelen (recipe_sources) liep in één verzoek van ±17 MB vast op de tijdslimiet van de database. Daarna
-- zette de app de kladjes als terugval in recipes.photo_url. Daardoor werd het laden van die bibliotheek zo
-- zwaar dat de telefoon "canceling statement due to statement timeout" kreeg.
--
-- Dit zet die twintig kladjes alsnog waar ze horen: als origineel (recipe_sources), en haalt ze weg als
-- receptfoto. Er gaat niets verloren: het kladje blijft te zien via "Origineel bekijken". Receptteksten
-- blijven onaangeroerd. Alleen deze ene import (19:19 UTC) en alleen recepten zonder origineel.
-- De app slaat originelen voortaan één voor één op (saveRecipeSources in js/features/import.js).

begin;

with kladjes as (
  select r.id, r.user_id, r.photo_url
  from public.recipes r
  where r.photo_url like 'data:image/jpeg;base64,%'
    and r.created_at >= '2026-11-10 19:19:00+00'
    and r.created_at <  '2026-11-10 19:20:00+00'
    and not exists (select 1 from public.recipe_sources s where s.recipe_id = r.id)
),
bewaard as (
  insert into public.recipe_sources (recipe_id, user_id, image)
  select id, user_id, photo_url from kladjes
  returning recipe_id
)
update public.recipes r
set photo_url = null
from bewaard b
where r.id = b.recipe_id;

-- Controle: dit moet 0 zijn.
select count(*) as nog_als_receptfoto
from public.recipes r
where r.photo_url like 'data:image/jpeg;base64,%'
  and r.created_at >= '2026-11-10 19:19:00+00'
  and r.created_at <  '2026-11-10 19:20:00+00';

commit;
