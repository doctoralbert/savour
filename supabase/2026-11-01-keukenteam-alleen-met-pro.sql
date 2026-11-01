-- Een keukenteam werkt alleen als de eigenaar Savour Pro heeft (2026-11-01)
--
-- Waarom: wie in de proefweek een keukenteam maakt, kon het daarna gratis blijven gebruiken. Nu werkt een keukenteam
-- zolang de eigenaar Pro heeft (proefperiode, betaald, cadeau of teamabonnement). Daarna staat het op slot: niemand
-- kan er recepten in openen of wijzigen, tot de eigenaar weer Pro heeft. Er wordt niets verwijderd.
-- Eigenaar en leden kunnen het keukenteam nog wel zien, en verwijderen of verlaten.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create or replace function public.savour_team_open(_team uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select public.savour_is_pro(sm.owner_id) from public.shared_maps sm where sm.id = _team), false);
$$;

create or replace function public.savour_team_member(_team uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.savour_team_open(_team) and (
    exists (select 1 from public.shared_maps sm where sm.id = _team and sm.owner_id = auth.uid())
    or exists (select 1 from public.shared_map_members m where m.shared_map_id = _team and m.user_id = auth.uid())
  );
$$;

create or replace function public.savour_team_can_edit(_team uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.savour_team_open(_team) and (
    exists (select 1 from public.shared_maps sm where sm.id = _team and sm.owner_id = auth.uid())
    or exists (select 1 from public.shared_map_members m
               where m.shared_map_id = _team and m.user_id = auth.uid() and m.role in ('owner', 'editor'))
  );
$$;

-- Voor de app: welke van mijn keukenteams op slot staan, en tot wanneer de proefperiode van de eigenaar loopt.
create or replace function public.savour_team_status()
returns table (id uuid, locked boolean, trial_end timestamptz)
language sql stable security definer set search_path = public as $$
  select
    sm.id,
    not public.savour_is_pro(sm.owner_id),
    case when not public.savour_paid_pro(sm.owner_id) and u.created_at > now() - interval '7 days'
         then u.created_at + interval '7 days' end
  from public.shared_maps sm
  join auth.users u on u.id = sm.owner_id
  where sm.owner_id = auth.uid()
     or exists (select 1 from public.shared_map_members m where m.shared_map_id = sm.id and m.user_id = auth.uid());
$$;

revoke all on function public.savour_team_open(uuid) from public, anon;
revoke all on function public.savour_team_status() from public, anon;
grant execute on function public.savour_team_open(uuid) to authenticated;
grant execute on function public.savour_team_status() to authenticated;

commit;
