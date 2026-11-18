-- MEP-lijsten: maken en beheren is Savour Pro (2026-11-17). Draai dit na 2026-11-17-mep-lijsten.sql en -herstel.sql.
-- Eerder mocht een gratis account één lijst maken om te proberen; dat vervalt. De proefweek telt als Pro
-- (savour_is_pro). Wie geen Pro (meer) heeft, houdt zijn lijsten en kan ze bekijken, afvinken en printen
-- (savour_mep_can_tick blijft zoals hij was). Er wordt niets verwijderd.

-- Een nieuwe lijst: eigen lijst alleen met Pro; in een keukenteam wie daar mag bewerken (team open, zelf Pro).
create or replace function public.savour_mep_can_create(_team uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select case
    when _team is null then public.savour_is_pro(auth.uid())
    else public.savour_team_can_edit(_team)
  end;
$$;

-- Een lijst aanpassen (kaarten, kopjes, onderdelen, naam): eigen lijst alleen met Pro.
create or replace function public.savour_mep_can_manage(_list uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1 from public.mep_lists l
    where l.id = _list
      and (
        (l.team_id is null and l.owner_id = auth.uid() and public.savour_is_pro(auth.uid()))
        or (l.team_id is not null and public.savour_team_can_edit(l.team_id))
      )
  );
$$;
