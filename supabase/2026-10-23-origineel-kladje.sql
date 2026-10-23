-- Het originele kladje bij een recept bewaren (2026-10-23)
--
-- Waarom: bij een foto van een handgeschreven recept bewaart Savour de foto voortaan apart van de receptfoto,
-- zodat je onder het recept "Origineel kladje bekijken" kunt kiezen en altijd terugziet wat er op het papier
-- stond. Zonder deze tabel blijft Savour werken zoals voorheen (het kladje wordt dan de receptfoto).
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

do $$
declare
  id_type text;
begin
  -- Zelfde type als recipes.id (uuid of getal), zodat de koppeling klopt.
  select format_type(atttypid, atttypmod) into id_type
  from pg_attribute where attrelid = 'public.recipes'::regclass and attname = 'id';
  execute format(
    'create table if not exists public.recipe_sources (
       recipe_id %s primary key references public.recipes (id) on delete cascade,
       user_id uuid not null references auth.users (id) on delete cascade,
       image text not null,
       created_at timestamptz not null default now()
     )', id_type);
end $$;

alter table public.recipe_sources enable row level security;

-- Alleen je eigen originelen zien, toevoegen en verwijderen.
drop policy if exists "recipe_sources eigen lezen" on public.recipe_sources;
create policy "recipe_sources eigen lezen" on public.recipe_sources for select using (user_id = auth.uid());
drop policy if exists "recipe_sources eigen toevoegen" on public.recipe_sources;
create policy "recipe_sources eigen toevoegen" on public.recipe_sources for insert
  with check (user_id = auth.uid() and exists (select 1 from public.recipes r where r.id = recipe_id and r.user_id = auth.uid()));
drop policy if exists "recipe_sources eigen verwijderen" on public.recipe_sources;
create policy "recipe_sources eigen verwijderen" on public.recipe_sources for delete using (user_id = auth.uid());

-- Controle: moet recipe_sources tonen met rowsecurity = true.
select tablename, rowsecurity from pg_tables where schemaname = 'public' and tablename = 'recipe_sources';
