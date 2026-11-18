-- Keukenteam in de proefweek (2026-11-17): zolang de eigenaar alleen de proefweek heeft (geen betaald Pro,
-- teamabonnement of Pro van de beheerder), kan het keukenteam hooguit 10 recepten krijgen. Met betaald Pro is
-- er geen grens. Heeft de eigenaar daarna helemaal geen Pro meer, dan staat het team op slot zoals afgesproken
-- (savour_team_open, supabase/2026-11-01-keukenteam-alleen-met-pro.sql); alles blijft bewaard.
-- Wat al in een team staat, blijft altijd staan: de grens geldt alleen voor toevoegen.
-- De app toont de grens ook (js/features/shared-maps.js, TEAM_TRIAL_RECIPES); de echte controle is hier.

-- Is er nog ruimte in dit keukenteam? Betaald Pro van de eigenaar: altijd; anders minder dan 10 recepten.
create or replace function public.savour_team_room(_team uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(
    (select public.savour_paid_pro(sm.owner_id) from public.shared_maps sm where sm.id = _team),
    false
  )
  or (select count(distinct r.recipe_id) from public.shared_map_recipes r where r.shared_map_id = _team) < 10;
$$;

grant execute on function public.savour_team_room(uuid) to authenticated;

-- Een nieuw recept in een keukenteam (import of kopie met team_id): ook ruimte nodig.
drop policy if exists "savour_v41_recipes_insert" on public.recipes;
create policy "savour_v41_recipes_insert" on public.recipes
  for insert
  with check (
    ((team_id is null) and (user_id = auth.uid()))
    or ((team_id is not null) and public.savour_team_can_edit(team_id) and public.savour_team_room(team_id))
  );

-- Een recept aan een keukenteam koppelen: alleen met ruimte.
drop policy if exists "Editors can add shared recipes" on public.shared_map_recipes;
create policy "Editors can add shared recipes" on public.shared_map_recipes
  for insert
  with check (
    public.savour_team_can_edit(shared_map_id)
    and public.savour_team_room(shared_map_id)
    and exists (
      select 1 from public.recipes r
      where r.id = shared_map_recipes.recipe_id
        and ((r.team_id = shared_map_recipes.shared_map_id) or ((r.team_id is null) and (r.user_id = auth.uid())))
    )
  );

-- Een eigen recept in een map van het keukenteam zetten telt ook als toevoegen; een recept dat al in het team
-- staat in een andere teammap zetten niet.
drop policy if exists "Editors can add shared folder recipes" on public.shared_folder_recipes;
create policy "Editors can add shared folder recipes" on public.shared_folder_recipes
  for insert
  with check (
    exists (
      select 1
      from public.shared_folders sf
      join public.recipes r on r.id = shared_folder_recipes.recipe_id
      where sf.id = shared_folder_recipes.shared_folder_id
        and public.savour_team_can_edit(sf.shared_map_id)
        and (
          (r.team_id = sf.shared_map_id)
          or ((r.team_id is null) and (r.user_id = auth.uid()) and public.savour_team_room(sf.shared_map_id))
        )
    )
  );
