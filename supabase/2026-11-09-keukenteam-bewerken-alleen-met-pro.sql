-- Keukenteam: bewerken alleen met Savour Pro (2026-11-09).
-- Wie gratis is, kan in een keukenteam alleen bekijken (en printen en omrekenen), ook als die sous-chef of
-- eigenaar is gemaakt. Recepten toevoegen, aanpassen, verwijderen, overnemen in het team en mappen beheren kan met
-- Savour Pro: zelf betaald, in de proefweek, of via een teamabonnement (organisatie) waar je lid van bent.
-- savour_is_pro() telt dat allemaal mee. Daarnaast blijft gelden dat het team open moet zijn (eigenaar heeft Pro).
-- Veilig om opnieuw te draaien. Er wordt niets verwijderd: alleen de rechten veranderen.

-- 1. De centrale controle: rol sous-chef of eigenaar, team open, én zelf Pro.
create or replace function public.savour_team_can_edit(_team uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.savour_team_open(_team)
    and public.savour_is_pro(auth.uid())
    and (
      exists (select 1 from public.shared_maps sm where sm.id = _team and sm.owner_id = auth.uid())
      or exists (select 1 from public.shared_map_members m
                 where m.shared_map_id = _team and m.user_id = auth.uid() and m.role in ('owner', 'editor'))
    );
$$;

-- 2. Recepten uit het team of uit een teammap halen, en teammappen maken, hernoemen of verwijderen: dezelfde
--    controle (voorheen alleen op de rol).
drop policy if exists "Editors can remove shared recipes" on public.shared_map_recipes;
create policy "Editors can remove shared recipes" on public.shared_map_recipes
  for delete using (public.savour_team_can_edit(shared_map_id));

drop policy if exists "Editors can remove shared folder recipes" on public.shared_folder_recipes;
create policy "Editors can remove shared folder recipes" on public.shared_folder_recipes
  for delete using (
    exists (select 1 from public.shared_folders sf
            where sf.id = shared_folder_recipes.shared_folder_id and public.savour_team_can_edit(sf.shared_map_id))
  );

drop policy if exists "Editors can create shared folders" on public.shared_folders;
create policy "Editors can create shared folders" on public.shared_folders
  for insert with check (public.savour_team_can_edit(shared_map_id));

drop policy if exists "Editors can update shared folders" on public.shared_folders;
create policy "Editors can update shared folders" on public.shared_folders
  for update using (public.savour_team_can_edit(shared_map_id));

drop policy if exists "Editors can delete shared folders" on public.shared_folders;
create policy "Editors can delete shared folders" on public.shared_folders
  for delete using (public.savour_team_can_edit(shared_map_id));
