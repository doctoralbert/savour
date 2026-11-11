-- Importeren: niets meer kwijt (2026-11-11).
-- Aanleiding: een Pro-klant deed 148 AI-imports en hield 0 recepten over. De AI las alles goed, maar de recepten
-- stonden alleen in de browser tot de kok op "Alle recepten opslaan" klikte; venster dicht = alles weg, terwijl
-- het ons wel geld kostte. Nu:
-- 1. import_uploads: elk bestand dat iemand importeert, met het origineel in de privé-bucket import-uploads
--    (map <user_id>/<upload_id>/). Zo kunnen wij een mislukte import altijd terugzien en oplossen.
-- 2. ai_import_results: de server bewaart elk AI-resultaat meteen, nog vóór de browser het krijgt. Wat niet is
--    opgeslagen, biedt Savour bij de volgende keer openen weer aan (js/features/import.js, offerPendingAiImports).
-- Veilig om opnieuw te draaien.

begin;

-- 1. Geüploade bestanden
create table if not exists public.import_uploads (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  filename text not null default '' check (length(filename) <= 400),
  storage_path text,
  size_bytes bigint,
  mime text check (length(mime) <= 200),
  status text not null default 'bezig' check (status in ('bezig', 'gelezen', 'opgeslagen', 'mislukt')),
  ai_parts integer not null default 0,
  recipes_found integer,
  recipes_saved integer not null default 0,
  note text check (length(note) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists import_uploads_user_idx on public.import_uploads (user_id, created_at desc);
alter table public.import_uploads enable row level security;
drop policy if exists "import_uploads eigen" on public.import_uploads;
create policy "import_uploads eigen" on public.import_uploads
  for select using (user_id = auth.uid() or public.is_savour_admin());
drop policy if exists "import_uploads toevoegen" on public.import_uploads;
create policy "import_uploads toevoegen" on public.import_uploads
  for insert with check (user_id = auth.uid());
drop policy if exists "import_uploads bijwerken" on public.import_uploads;
create policy "import_uploads bijwerken" on public.import_uploads
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
-- De kok mag status en tellingen bijwerken, niet de AI-teller (ai_parts telt de server).
revoke update on public.import_uploads from authenticated;
grant update (storage_path, status, recipes_found, recipes_saved, note, updated_at) on public.import_uploads to authenticated;

-- Privé-bucket voor de originelen (max. 50 MB per bestand). Ieder alleen in de eigen map.
insert into storage.buckets (id, name, public, file_size_limit)
values ('import-uploads', 'import-uploads', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = 52428800;
drop policy if exists "import-uploads eigen map uploaden" on storage.objects;
create policy "import-uploads eigen map uploaden" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'import-uploads' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "import-uploads eigen map lezen" on storage.objects;
create policy "import-uploads eigen map lezen" on storage.objects
  for select to authenticated
  using (bucket_id = 'import-uploads' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_savour_admin()));

-- 2. AI-resultaten, direct door de server bewaard (service role). De kok leest alleen zijn eigen resultaten.
create table if not exists public.ai_import_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  upload_id uuid,
  filename text not null default '',
  kind text not null default 'tekst' check (kind in ('tekst', 'foto')),
  model text not null default '',
  recipes jsonb not null default '[]'::jsonb,
  recipe_count integer not null default 0,
  created_at timestamptz not null default now(),
  handled_at timestamptz,
  handled text check (handled in ('opgeslagen', 'al-opgeslagen', 'weggegooid'))
);
create index if not exists ai_import_results_open_idx
  on public.ai_import_results (user_id, created_at desc) where handled_at is null;
create index if not exists ai_import_results_upload_idx on public.ai_import_results (upload_id);
alter table public.ai_import_results enable row level security;
drop policy if exists "ai_import_results eigen" on public.ai_import_results;
create policy "ai_import_results eigen" on public.ai_import_results
  for select using (user_id = auth.uid() or public.is_savour_admin());
revoke insert, update, delete on public.ai_import_results from anon, authenticated;

-- Elk AI-resultaat telt mee bij het bestand waar het bij hoort (alleen een bestand van dezelfde gebruiker).
create or replace function public.savour_ai_result_to_upload()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.upload_id is not null then
    update public.import_uploads
    set ai_parts = ai_parts + 1, updated_at = now()
    where id = new.upload_id and user_id = new.user_id;
  end if;
  return new;
end;
$$;
drop trigger if exists ai_import_results_to_upload on public.ai_import_results;
create trigger ai_import_results_to_upload
  after insert on public.ai_import_results
  for each row execute function public.savour_ai_result_to_upload();

-- De kok meldt wat er met zijn resultaten is gebeurd (opgeslagen, al opgeslagen of bewust weggegooid).
create or replace function public.savour_mark_ai_results(_ids uuid[], _how text)
returns integer
language sql
security definer
set search_path = public
as $$
  with done as (
    update public.ai_import_results
    set handled_at = now(), handled = _how
    where id = any(_ids) and user_id = auth.uid() and handled_at is null
      and _how in ('opgeslagen', 'al-opgeslagen', 'weggegooid')
    returning 1
  )
  select count(*)::integer from done;
$$;
revoke all on function public.savour_mark_ai_results(uuid[], text) from public, anon;
grant execute on function public.savour_mark_ai_results(uuid[], text) to authenticated;

commit;

-- 3. Doorlopen als het scherm wegvalt (2026-11-11, aanvulling). Elke AI-aanvraag krijgt van de browser een vaste
-- sleutel (request_key). Valt de verbinding weg (telefoon weggelegd, andere app) en probeert de browser het
-- opnieuw, dan wacht de server op het resultaat van de eerste aanvraag of geeft hij het bewaarde resultaat terug:
-- niet nog een keer betalen en niet nog een keer tellen. Rijen met status 'bezig' zijn nog onderweg.
begin;
alter table public.ai_import_results add column if not exists request_key text check (length(request_key) <= 80);
alter table public.ai_import_results add column if not exists status text not null default 'klaar';
alter table public.ai_import_results drop constraint if exists ai_import_results_status_check;
alter table public.ai_import_results add constraint ai_import_results_status_check check (status in ('bezig', 'klaar'));
create unique index if not exists ai_import_results_request_key_idx
  on public.ai_import_results (user_id, request_key) where request_key is not null;

-- AI-delen per bestand pas tellen als het resultaat klaar is.
create or replace function public.savour_ai_result_to_upload()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.upload_id is not null and new.status = 'klaar'
     and (tg_op = 'INSERT' or old.status is distinct from 'klaar') then
    update public.import_uploads
    set ai_parts = ai_parts + 1, updated_at = now()
    where id = new.upload_id and user_id = new.user_id;
  end if;
  return new;
end;
$$;
drop trigger if exists ai_import_results_to_upload on public.ai_import_results;
create trigger ai_import_results_to_upload
  after insert or update of status on public.ai_import_results
  for each row execute function public.savour_ai_result_to_upload();
commit;
