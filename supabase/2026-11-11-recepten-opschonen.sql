-- Bestaande recepten opschonen (2026-11-11).
-- Na een import uit ChatGPT-tekst stonden er bij een klant "# Ingredients", "(Source: …)" en hele
-- ingrediëntenlijsten op één regel tussen de ingrediënten. Savour vraagt één keer of het die recepten mag
-- opschonen (js/features/import.js, offerRecipeTidy; regels in recipe-reader.js, tidyRecipeLines).
-- recipe_tidy_offers: het antwoord (ja/nee), zodat Savour het niet opnieuw vraagt.
-- recipe_tidy_backups: de versie van vóór het opschonen, zodat er nooit iets verloren gaat.
-- Veilig om opnieuw te draaien.

begin;

create table if not exists public.recipe_tidy_offers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  answer text not null check (answer in ('ja', 'nee')),
  recipes_changed integer not null default 0,
  answered_at timestamptz not null default now()
);
alter table public.recipe_tidy_offers enable row level security;
drop policy if exists "recipe_tidy_offers eigen" on public.recipe_tidy_offers;
create policy "recipe_tidy_offers eigen" on public.recipe_tidy_offers
  for all using (user_id = auth.uid() or public.is_savour_admin()) with check (user_id = auth.uid());

create table if not exists public.recipe_tidy_backups (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  recipe_id uuid not null references public.recipes (id) on delete cascade,
  before jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists recipe_tidy_backups_user_idx on public.recipe_tidy_backups (user_id, created_at desc);
alter table public.recipe_tidy_backups enable row level security;
drop policy if exists "recipe_tidy_backups lezen" on public.recipe_tidy_backups;
create policy "recipe_tidy_backups lezen" on public.recipe_tidy_backups
  for select using (user_id = auth.uid() or public.is_savour_admin());
drop policy if exists "recipe_tidy_backups toevoegen" on public.recipe_tidy_backups;
create policy "recipe_tidy_backups toevoegen" on public.recipe_tidy_backups
  for insert with check (
    user_id = auth.uid() and exists (select 1 from public.recipes r where r.id = recipe_id and r.user_id = auth.uid())
  );
revoke update, delete on public.recipe_tidy_backups from anon, authenticated;

commit;
