-- Herstel: producten opslaan (2026-11-03, testversie)
--
-- Waarom: de regels van public.products controleerden Pro met savour_is_pro(auth.uid()). Die functie mag een
-- ingelogde gebruiker bewust niet zelf aanroepen (anders kan iedereen de Pro-status van anderen opvragen),
-- waardoor elke poging om een product op te slaan werd geweigerd. Nu gaat het via savour_i_am_pro(): die geeft
-- alleen je eigen Pro-status terug.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-03-producten-allergenen.sql is eerder uitgevoerd.

begin;

create or replace function public.savour_i_am_pro()
returns boolean language sql stable security definer set search_path = public as $$
  select auth.uid() is not null and public.savour_is_pro(auth.uid());
$$;

revoke all on function public.savour_i_am_pro() from public, anon;
grant execute on function public.savour_i_am_pro() to authenticated;

drop policy if exists "products toevoegen" on public.products;
create policy "products toevoegen" on public.products for insert with check (
  (user_id = auth.uid() and public.savour_i_am_pro())
  or (user_id is null and team_id is not null and public.savour_team_can_edit(team_id))
);

drop policy if exists "products wijzigen" on public.products;
create policy "products wijzigen" on public.products for update
  using ((user_id = auth.uid() and public.savour_i_am_pro())
         or (team_id is not null and public.savour_team_can_edit(team_id)))
  with check ((user_id = auth.uid() and public.savour_i_am_pro())
              or (user_id is null and team_id is not null and public.savour_team_can_edit(team_id)));

commit;

-- Controle: moet true geven (ingelogde gebruikers mogen de nieuwe functie aanroepen).
select has_function_privilege('authenticated', 'public.savour_i_am_pro()', 'execute') as werkt;
