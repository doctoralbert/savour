-- Inlaadservice: aanleveringen (2026-10-27)
--
-- Waarom: de beheerder maakt in /admin → Inladen een persoonlijke aanleverlink voor een keuken. Via die link
-- (savour.page/aanleveren?t=...) uploadt de keuken zijn recepten en geeft de mappenstructuur door.
-- Alleen de server (api/aanleveren.js en api/admin.js, met de service-role-sleutel) mag in de tabel en de opslag;
-- gebruikers en bezoekers kunnen er niets uit halen. Bestanden staan in de privé-bucket 'aanleveringen'
-- en worden na het inladen door de beheerder verwijderd.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create table if not exists public.recipe_intakes (
  id bigint generated always as identity primary key,
  token text not null unique check (length(token) >= 24),
  created_at timestamptz not null default now(),
  name text check (length(name) <= 120),
  email text check (length(email) <= 240),
  restaurant text check (length(restaurant) <= 160),
  package text check (length(package) <= 120),
  plan text check (length(plan) <= 60),
  language text not null default 'nl' check (language in ('nl', 'en', 'de', 'es')),
  status text not null default 'open' check (status in ('open', 'ingediend', 'bezig', 'klaar')),
  structure text check (length(structure) <= 80),
  folders text check (length(folders) <= 6000),
  match text check (length(match) <= 3000),
  notes text check (length(notes) <= 6000),
  submitted_at timestamptz,
  files_deleted_at timestamptz
);

create index if not exists recipe_intakes_created_at on public.recipe_intakes (created_at desc);

alter table public.recipe_intakes enable row level security;
-- Geen policies: zonder service-role-sleutel is de tabel dicht.
revoke all on public.recipe_intakes from anon, authenticated;

-- Privé-opslag voor de aangeleverde bestanden (max. 50 MB per bestand). Geen policies op storage.objects
-- voor deze bucket: alleen de server maakt eenmalige upload- en downloadlinks.
insert into storage.buckets (id, name, public, file_size_limit)
values ('aanleveringen', 'aanleveringen', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = 52428800;

commit;
