-- Savour leert van elk gebruik (2026-11-18).
-- Wat een kok verbetert, is de belangrijkste les: welke allergenen er echt in een ingrediënt zitten, en hoe de
-- MEP-lezer een lijst indeelde tegenover wat de kok opsloeg. De receptlezer had dit al (reader_examples,
-- recipe_import_origins). Elke avond leest Claude dit (dagelijkse controle) en stelt verbeteringen voor; de beheerder
-- zet ze in /admin met één klik aan. Niets verandert vanzelf.
--
-- learning_events: alleen van accounts met "Help de Savour-lezer verbeteren" aan (profiles.help_reader, standaard
--   aan). Een kok kan er alleen in schrijven, niet lezen; de beheerder leest via de server (api/admin.js).
--   source 'allergeen': key = de ingrediëntnaam, data = { name, allergens, savour } (wat Savour dacht).
--   source 'mep':       data = { as_read, as_saved } (regels van het controlescherm, alleen bij een verschil).
-- ai_lessons: korte lessen die de AI bij elke import meekrijgt (api/ai-import.js), alleen als status 'actief'.
--   Alleen de server leest en schrijft (geen policies).
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

create table if not exists public.learning_events (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  source text not null check (source in ('allergeen', 'mep')),
  lang text check (lang is null or lang in ('nl', 'en', 'de', 'es', 'fr')),
  key text check (key is null or length(btrim(key)) between 1 and 160),
  data jsonb not null default '{}'::jsonb check (pg_column_size(data) <= 40000),
  created_at timestamptz not null default now()
);
create index if not exists learning_events_source on public.learning_events (source, created_at desc);

alter table public.learning_events enable row level security;

drop policy if exists learning_events_insert on public.learning_events;
create policy learning_events_insert on public.learning_events for insert to authenticated with check (
  user_id = auth.uid()
  and coalesce((select p.help_reader from public.profiles p where p.id = auth.uid()), true)
);
-- Geen select-, update- of delete-policy: de kok schrijft alleen; de server (service role) leest en ruimt op.

create table if not exists public.ai_lessons (
  id bigint generated always as identity primary key,
  scope text not null default 'recept' check (scope in ('recept', 'mep', 'allergeen')),
  lesson text not null check (length(btrim(lesson)) between 3 and 400),
  status text not null default 'voorstel' check (status in ('voorstel', 'actief', 'uit')),
  source text not null default 'beheer' check (source in ('beheer', 'claude')),
  note text check (note is null or length(note) <= 600),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ai_lessons enable row level security;
-- Geen policies: alleen de server (api/admin.js en api/ai-import.js, service role) leest en schrijft.
