-- Savour-indicatie: mediaanprijzen uit de anonieme prijzen van keukens die meedoen (2026-11-24, testversie)
--
-- Waarom: wie geen prijslijst van een groothandel heeft, kan anders niet beginnen met de foodcost calculator.
-- Geen enkele Nederlandse partij biedt indicatieprijzen; het bewezen model (MarginEdge, VS) is een mediaan uit de
-- geanonimiseerde prijzen van de eigen gebruikers. Zie docs/onderzoek-foodcost.md, hoofdstuk 6.
--
-- Zo werkt het:
-- - cost_settings.share_prices: de keuken doet mee (standaard UIT; aan te zetten in Foodcost → Instellingen).
-- - cost_settings.use_indications: indicaties meetellen als je zelf geen prijs hebt (standaard aan; altijd zichtbaar
--   als "indicatie").
-- - savour_cost_indications(): per ingrediënt (de naam waaronder koks het aan een product koppelden, bijv. "suiker")
--   en per eenheid (g, ml, stuk) de MEDIAAN van de prijs per eenheid na korting, zonder btw. Alleen:
--     * prijzen van de laatste 90 dagen, per product de nieuwste;
--     * per keuken één waarde (de mediaan van die keuken), zodat één grote keuken niet alles bepaalt;
--     * als minstens 5 verschillende keukens meedoen voor dat ingrediënt.
--   Nooit een losse prijs, nooit wie welke prijs betaalt. Alleen aan te roepen door ingelogde Pro-gebruikers.
-- - Opbrengst na schoonmaken telt niet mee (dat verschilt per keuken): het is de inkoopprijs per eenheid.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-24-foodcost.sql en 2026-11-24-foodcost-herstel.sql zijn eerder uitgevoerd.

begin;

alter table public.cost_settings add column if not exists share_prices boolean not null default false;
alter table public.cost_settings add column if not exists use_indications boolean not null default true;

create or replace function public.savour_cost_indications()
returns table (key text, unit text, per_unit numeric, kitchens integer, newest date)
language sql stable security definer set search_path = public as $$
  with latest as (
    select distinct on (pr.product_id)
      pr.product_id, pr.user_id, pr.pack_qty, pr.pack_unit, pr.price, pr.valid_from,
      coalesce(s.discount_pct, 0) as discount_pct
    from public.cost_prices pr
    left join public.cost_suppliers s on s.id = pr.supplier_id
    where pr.valid_from >= current_date - 90 and pr.pack_qty > 0
    order by pr.product_id, pr.valid_from desc, pr.created_at desc
  ),
  per_kitchen as (
    select lower(btrim(a.key)) as key, l.pack_unit as unit, l.user_id,
      percentile_cont(0.5) within group (order by l.price * (1 - l.discount_pct / 100) / l.pack_qty) as value,
      max(l.valid_from) as newest
    from latest l
    join public.cost_settings cs on cs.user_id = l.user_id and cs.share_prices
    join public.cost_products p on p.id = l.product_id
    cross join lateral unnest(p.aliases) as a(key)
    where length(btrim(a.key)) between 2 and 80
    group by 1, 2, 3
  )
  select key, unit, round(percentile_cont(0.5) within group (order by value)::numeric, 6), count(*)::integer, max(newest)
  from per_kitchen
  where public.savour_i_am_pro()
  group by key, unit
  having count(*) >= 5;
$$;

revoke all on function public.savour_cost_indications() from public, anon;
grant execute on function public.savour_cost_indications() to authenticated;

commit;

-- Controle: moet true geven (de functie bestaat en ingelogde gebruikers mogen hem aanroepen).
select has_function_privilege('authenticated', 'public.savour_cost_indications()', 'execute') as werkt;
