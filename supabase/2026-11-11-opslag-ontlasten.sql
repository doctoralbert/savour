-- Database ontlasten (2026-11-11).
-- 1. Originele kladjes (recipe_sources) stonden als tekst (base64) ín de database: 131 van de 161 MB, terwijl
--    het gratis plan 500 MB database heeft. Ze gaan naar de privé-bucket recipe-sources (map <user_id>/),
--    waar opslag veel ruimer is. Nieuwe kladjes gaan meteen naar de bucket (js/features/import.js,
--    saveRecipeSources); bestaande verhuist api/_lib/onderhoud.js (elke nacht, tot alles over is).
--    Een kladje dat niet naar de bucket kon, blijft zoals vroeger in de kolom image staan: nooit iets kwijt.
-- 2. Geïmporteerde bestanden (import-uploads) blijven 60 dagen bewaard; daarna haalt api/_lib/onderhoud.js het
--    origineel weg. De rij in import_uploads (wat, wanneer, hoe het ging) blijft.
-- 3. storage_cleanup_queue: wordt een recept, kladje of account verwijderd, dan komt het bestand hier op de
--    lijst en haalt api/_lib/onderhoud.js het uit de opslag. Zo blijven er geen losse bestanden achter.
-- Veilig om opnieuw te draaien.

begin;

-- 1. Kladjes in de opslag
alter table public.recipe_sources add column if not exists image_path text check (length(image_path) <= 300);
alter table public.recipe_sources alter column image drop not null;
alter table public.recipe_sources drop constraint if exists recipe_sources_image_or_path;
alter table public.recipe_sources add constraint recipe_sources_image_or_path check (image is not null or image_path is not null);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('recipe-sources', 'recipe-sources', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = false, file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
drop policy if exists "recipe-sources eigen map uploaden" on storage.objects;
create policy "recipe-sources eigen map uploaden" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'recipe-sources' and (storage.foldername(name))[1] = auth.uid()::text);
-- Lezen: wie de rij in recipe_sources mag zien, mag ook de foto zien (de regels van recipe_sources gelden mee).
drop policy if exists "recipe-sources lezen" on storage.objects;
create policy "recipe-sources lezen" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'recipe-sources'
    and ((storage.foldername(name))[1] = auth.uid()::text
      or exists (select 1 from public.recipe_sources rs where rs.image_path = storage.objects.name))
  );
drop policy if exists "recipe-sources eigen map verwijderen" on storage.objects;
create policy "recipe-sources eigen map verwijderen" on storage.objects
  for delete to authenticated
  using (bucket_id = 'recipe-sources' and (storage.foldername(name))[1] = auth.uid()::text);

-- 3. Opruimlijst voor bestanden
create table if not exists public.storage_cleanup_queue (
  id bigint generated always as identity primary key,
  bucket text not null,
  path text not null,
  created_at timestamptz not null default now()
);
alter table public.storage_cleanup_queue enable row level security;
revoke all on public.storage_cleanup_queue from anon, authenticated;

create or replace function public.savour_queue_storage_cleanup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_table_name = 'recipe_sources' and old.image_path is not null then
    insert into public.storage_cleanup_queue (bucket, path) values ('recipe-sources', old.image_path);
  elsif tg_table_name = 'import_uploads' and old.storage_path is not null then
    insert into public.storage_cleanup_queue (bucket, path) values ('import-uploads', old.storage_path);
  end if;
  return old;
end;
$$;
drop trigger if exists recipe_sources_cleanup on public.recipe_sources;
create trigger recipe_sources_cleanup after delete on public.recipe_sources
  for each row execute function public.savour_queue_storage_cleanup();
drop trigger if exists import_uploads_cleanup on public.import_uploads;
create trigger import_uploads_cleanup after delete on public.import_uploads
  for each row execute function public.savour_queue_storage_cleanup();

commit;
