-- Ingrediëntenlijst aanvullen met goedkeuring (2026-11-06, testversie)
--
-- Savour herkent ingrediënten met een vaste basislijst (js/data/ingredient-*.json). Komen er in recepten namen voor
-- die Savour nog niet kent, dan ziet de beheerder die in /admin → Ingrediënten: alleen de naam, het aantal accounts
-- waarin hij voorkomt en de taal. Nooit het recept, de hoeveelheid of wie het is. Pas wat de beheerder goedkeurt,
-- komt in de lijst die de app gebruikt; afgewezen namen komen niet meer terug.
--
-- - status 'approved': hoort in de lijst. Iedereen mag deze rijen lezen (de app gebruikt ze voor voorstellen).
-- - status 'rejected': geen ingrediënt, of te algemeen. Alleen de server ziet deze rijen.
-- - head: het hoofdproduct ("kalfs jus" → Kalf). Leeg = een eigen ingrediënt.
-- - Schrijven gaat alleen via de server (api/admin.js, service role); er is bewust geen policy voor insert/update.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create table if not exists public.ingredient_list (
  id bigint generated always as identity primary key,
  lang text not null check (lang in ('nl', 'en', 'de', 'es', 'fr')),
  key text not null check (length(btrim(key)) between 1 and 120),
  name text not null check (length(btrim(name)) between 1 and 120),
  head text check (head is null or length(btrim(head)) between 1 and 120),
  aliases text[] not null default '{}' check (cardinality(aliases) <= 50),
  allergens text[] not null default '{}',
  status text not null check (status in ('approved', 'rejected')),
  user_count int not null default 0,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz not null default now(),
  unique (lang, key)
);

alter table public.ingredient_list enable row level security;

drop policy if exists ingredient_list_read_approved on public.ingredient_list;
create policy ingredient_list_read_approved on public.ingredient_list
  for select to anon, authenticated
  using (status = 'approved');

grant select on public.ingredient_list to anon, authenticated;

commit;
