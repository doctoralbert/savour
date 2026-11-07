-- Ingrediëntenlijst vullen met de producten van de beheerder (2026-11-07)
--
-- De beheerder heeft al honderden producten met gecontroleerde allergenen (Producten & allergenen). Die hoeven niet
-- één voor één opnieuw goedgekeurd te worden in /admin → Ingrediënten: dit zet ze in één keer in de
-- ingrediëntenlijst (taal Nederlands), met hun schrijfwijzen en allergenen. Alleen producten waarvan de allergenen
-- gecontroleerd zijn (allergens_known). Een naam die al in de lijst staat, blijft zoals hij is.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-06-ingredientenlijst-goedkeuren.sql is eerder uitgevoerd.

insert into public.ingredient_list (lang, key, name, head, aliases, allergens, status, user_count)
select distinct on (lower(btrim(p.name)))
  'nl',
  lower(btrim(p.name)),
  btrim(p.name),
  null,
  coalesce(
    (
      select array_agg(a)
      from (
        select distinct lower(btrim(x)) as a
        from unnest(p.aliases) as x
        where length(btrim(x)) between 1 and 120
        limit 50
      ) s
    ),
    '{}'
  ),
  p.allergens,
  'approved',
  1
from public.products p
join auth.users u on u.id = p.user_id
where lower(u.email) = 'schreurs.jop@gmail.com'
  and p.team_id is null
  and p.allergens_known
  and length(btrim(p.name)) between 1 and 120
order by lower(btrim(p.name)), cardinality(p.aliases) desc
on conflict (lang, key) do nothing;
