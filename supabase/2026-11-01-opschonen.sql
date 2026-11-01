-- Achterkant opgeruimd (2026-11-01). Waarom: de Supabase-controle meldde functies die ook zonder inloggen aan te
-- roepen zijn, en drie functies zonder vaste search_path. Geen van allen was misbruikt of misbruikbaar (ze doen niets
-- zonder ingelogde gebruiker), maar wat niet openbaar hoeft, staat nu ook niet open. De werking verandert niet.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

alter function public.savour_org_active(public.organizations) set search_path = public;
alter function public.savour_visit_platform(text) set search_path = public;
alter function public.savour_fill_visit_platform() set search_path = public;

-- Alleen voor ingelogde gebruikers.
revoke all on function public.delete_my_account() from public, anon;
revoke all on function public.savour_team_add_member(text) from public, anon;
revoke all on function public.savour_team_remove_member(text) from public, anon;
revoke all on function public.savour_team_rename(text) from public, anon;
grant execute on function public.delete_my_account() to authenticated;
grant execute on function public.savour_team_add_member(text) to authenticated;
grant execute on function public.savour_team_remove_member(text) to authenticated;
grant execute on function public.savour_team_rename(text) to authenticated;

-- Triggers en interne hulpfuncties: nooit rechtstreeks aan te roepen.
revoke all on function public.rls_auto_enable() from public, anon, authenticated;
revoke all on function public.savour_check_recipe_limit() from public, anon, authenticated;
revoke all on function public.savour_check_shared_map_pro() from public, anon, authenticated;
revoke all on function public.savour_team_recipe_owner() from public, anon, authenticated;
revoke all on function public.savour_free_brigade_seats() from public, anon, authenticated;
revoke all on function public.savour_free_member_seat() from public, anon, authenticated;

commit;
