-- Recept overnemen (2026-10-25)
--
-- Waarom: wie een recept openbaar deelt, kan ontvangers toestaan het aan hun eigen receptenbibliotheek toe te
-- voegen. De ontvanger krijgt dan een eigen kopie die hij zelf kan aanpassen; het origineel blijft van de maker.
-- Deze tabel bewaart per recept alleen of overnemen mag. Alleen de maker van het recept kan dat aan- of uitzetten.
-- Iedereen mag lezen óf het mag (dat staat bij de openbare link); de inhoud van het recept zit hier niet in.
-- Het kopiëren zelf is een gewoon nieuw recept van de ontvanger: de limiet van 100 recepten zonder Pro geldt.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create table if not exists public.recipe_share_settings (
  recipe_id uuid primary key references public.recipes (id) on delete cascade,
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  allow_copy boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.recipe_share_settings enable row level security;

drop policy if exists "Overnemen: iedereen leest" on public.recipe_share_settings;
create policy "Overnemen: iedereen leest" on public.recipe_share_settings
  for select using (true);

drop policy if exists "Overnemen: maker zet aan" on public.recipe_share_settings;
create policy "Overnemen: maker zet aan" on public.recipe_share_settings
  for insert to authenticated
  with check (
    owner_id = auth.uid()
    and exists (select 1 from public.recipes r where r.id = recipe_id and r.user_id = auth.uid())
  );

drop policy if exists "Overnemen: maker wijzigt" on public.recipe_share_settings;
create policy "Overnemen: maker wijzigt" on public.recipe_share_settings
  for update to authenticated
  using (owner_id = auth.uid())
  with check (
    owner_id = auth.uid()
    and exists (select 1 from public.recipes r where r.id = recipe_id and r.user_id = auth.uid())
  );

drop policy if exists "Overnemen: maker verwijdert" on public.recipe_share_settings;
create policy "Overnemen: maker verwijdert" on public.recipe_share_settings
  for delete to authenticated
  using (owner_id = auth.uid());

grant select on public.recipe_share_settings to anon, authenticated;
grant insert, update, delete on public.recipe_share_settings to authenticated;

commit;
