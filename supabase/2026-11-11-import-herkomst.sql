-- Wat de kok zelf nog verandert aan een geïmporteerd recept (2026-11-11).
-- Dé bron om de Savour-lezer slimmer te maken: elke verbetering van een kok laat zien wat de lezer (of de AI)
-- fout deed. Per geïmporteerd recept bewaren we:
--   as_read  = wat de lezer of de AI las (vóór de kok iets veranderde),
--   as_saved = wat de kok opsloeg na het controlescherm.
-- Wat hij later nog aanpast, zie je door as_saved te vergelijken met het recept zoals het nu is.
-- Alleen voor accounts met "Help de Savour-lezer verbeteren" aan (profiles.help_reader); de kok ziet en
-- verwijdert zijn eigen rijen mee met het recept. De dagelijkse controle (Claude) leest dit; de lezer
-- verandert nooit vanzelf. Veilig om opnieuw te draaien.

begin;

create table if not exists public.recipe_import_origins (
  recipe_id uuid primary key references public.recipes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  upload_id uuid,
  result_id uuid,
  source_kind text check (length(source_kind) <= 20),
  file_ext text check (length(file_ext) <= 12),
  by_ai boolean not null default false,
  reader_confidence text check (length(reader_confidence) <= 10),
  as_read jsonb not null check (pg_column_size(as_read) <= 60000),
  as_saved jsonb not null check (pg_column_size(as_saved) <= 60000),
  created_at timestamptz not null default now()
);
create index if not exists recipe_import_origins_created_idx on public.recipe_import_origins (created_at desc);
alter table public.recipe_import_origins enable row level security;
drop policy if exists "recipe_import_origins lezen" on public.recipe_import_origins;
create policy "recipe_import_origins lezen" on public.recipe_import_origins
  for select using (user_id = auth.uid() or public.is_savour_admin());
drop policy if exists "recipe_import_origins toevoegen" on public.recipe_import_origins;
create policy "recipe_import_origins toevoegen" on public.recipe_import_origins
  for insert with check (
    user_id = auth.uid()
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.help_reader)
    and exists (select 1 from public.recipes r where r.id = recipe_id and r.user_id = auth.uid())
  );
drop policy if exists "recipe_import_origins verwijderen" on public.recipe_import_origins;
create policy "recipe_import_origins verwijderen" on public.recipe_import_origins
  for delete using (user_id = auth.uid());
revoke update on public.recipe_import_origins from anon, authenticated;

commit;
