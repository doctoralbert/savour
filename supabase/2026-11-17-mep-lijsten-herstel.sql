-- Herstel op 2026-11-17-mep-lijsten.sql (draai dit na dat bestand).
-- De regel voor een nieuwe MEP-lijst riep savour_is_pro rechtstreeks aan. Die functie mag een ingelogde gebruiker
-- niet zelf uitvoeren, dus de database weigerde elke nieuwe lijst ("permission denied"). Nu gaat de controle via
-- een eigen functie die dat wel mag (security definer), net als de andere MEP-rechten.

-- Mag deze gebruiker een nieuwe lijst maken? Eigen lijst: met Pro, of als het de eerste is. Teamlijst: wie in het
-- keukenteam mag bewerken.
create or replace function public.savour_mep_can_create(_team uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select case
    when _team is null then
      public.savour_is_pro(auth.uid())
      or not exists (select 1 from public.mep_lists x where x.owner_id = auth.uid() and x.team_id is null)
    else public.savour_team_can_edit(_team)
  end;
$$;
grant execute on function public.savour_mep_can_create(uuid) to authenticated;

drop policy if exists mep_lists_insert on public.mep_lists;
create policy mep_lists_insert on public.mep_lists for insert with check (
  owner_id = auth.uid() and public.savour_mep_can_create(team_id)
);

-- savour_mep_free_list is alleen voor de andere functies; zelf aanroepen is niet nodig.
revoke execute on function public.savour_mep_free_list(uuid) from authenticated, anon, public;
