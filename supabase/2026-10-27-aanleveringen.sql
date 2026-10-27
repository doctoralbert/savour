-- Inlaadservice: aanvragen en aanleveringen (2026-10-27)
--
-- Waarom: een keuken vraagt op de site de inlaadservice aan. De beheerder keurt de aanvraag goed of af in
-- /admin → Inladen. Na goedkeuring krijgt de klant een persoonlijke link (savour.page/aanleveren?t=...):
-- eerst betalen (organisatie-abonnement + pakket via Stripe), daarna recepten uploaden, de mappenstructuur
-- en de e-mailadressen van de leden doorgeven. De beheerder laadt de recepten in de organisatie en geeft hem
-- vrij: iedereen krijgt dan een mail om een wachtwoord te kiezen. Daarna worden de aangeleverde bestanden
-- en gegevens gewist.
--
-- Alleen de server (api/aanleveren.js, api/admin.js en api/stripe-webhook.js, met de service-role-sleutel)
-- mag in de tabel en de opslag; gebruikers en bezoekers kunnen er niets uit halen. Bestanden staan in de
-- privé-bucket 'aanleveringen'.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create table if not exists public.recipe_intakes (
  id bigint generated always as identity primary key,
  token text not null unique check (length(token) >= 24),
  created_at timestamptz not null default now(),
  language text not null default 'nl' check (language in ('nl', 'en', 'de', 'es')),
  -- aanvraag → goedgekeurd → betaald → ingediend → bezig → klaar; of afgewezen
  status text not null default 'aanvraag'
    check (status in ('aanvraag', 'goedgekeurd', 'afgewezen', 'betaald', 'ingediend', 'bezig', 'klaar')),
  -- De aanvraag
  name text check (length(name) <= 120),
  email text check (length(email) <= 240),
  restaurant text check (length(restaurant) <= 160),
  package text check (length(package) <= 20),
  seats integer check (seats in (5, 10, 25)),
  request_notes text check (length(request_notes) <= 6000),
  -- Goedkeuring en betaling
  price_cents integer check (price_cents >= 0),
  approved_at timestamptz,
  rejected_at timestamptz,
  owner_id uuid references auth.users (id) on delete set null,
  organization_id uuid references public.organizations (id) on delete set null,
  paid_at timestamptz,
  -- De aanlevering (wordt gewist na het vrijgeven)
  structure text check (length(structure) <= 80),
  folders text check (length(folders) <= 6000),
  match text check (length(match) <= 3000),
  notes text check (length(notes) <= 6000),
  members jsonb not null default '[]'::jsonb,
  submitted_at timestamptz,
  -- Inladen en vrijgeven
  shared_map_id uuid references public.shared_maps (id) on delete set null,
  imported_count integer not null default 0,
  released_at timestamptz,
  wiped_at timestamptz
);

-- Eerder aangemaakte versie van deze tabel bijwerken.
alter table public.recipe_intakes drop column if exists plan;
alter table public.recipe_intakes drop column if exists files_deleted_at;
alter table public.recipe_intakes add column if not exists seats integer check (seats in (5, 10, 25));
alter table public.recipe_intakes add column if not exists request_notes text check (length(request_notes) <= 6000);
alter table public.recipe_intakes add column if not exists price_cents integer check (price_cents >= 0);
alter table public.recipe_intakes add column if not exists approved_at timestamptz;
alter table public.recipe_intakes add column if not exists rejected_at timestamptz;
alter table public.recipe_intakes add column if not exists owner_id uuid references auth.users (id) on delete set null;
alter table public.recipe_intakes add column if not exists organization_id uuid references public.organizations (id) on delete set null;
alter table public.recipe_intakes add column if not exists paid_at timestamptz;
alter table public.recipe_intakes add column if not exists members jsonb not null default '[]'::jsonb;
alter table public.recipe_intakes add column if not exists shared_map_id uuid references public.shared_maps (id) on delete set null;
alter table public.recipe_intakes add column if not exists imported_count integer not null default 0;
alter table public.recipe_intakes add column if not exists released_at timestamptz;
alter table public.recipe_intakes add column if not exists wiped_at timestamptz;
alter table public.recipe_intakes drop constraint if exists recipe_intakes_status_check;
-- Rijen uit de eerste testversie (status 'open') worden gewone aanvragen.
update public.recipe_intakes
set status = 'aanvraag'
where status not in ('aanvraag', 'goedgekeurd', 'afgewezen', 'betaald', 'ingediend', 'bezig', 'klaar');
alter table public.recipe_intakes add constraint recipe_intakes_status_check
  check (status in ('aanvraag', 'goedgekeurd', 'afgewezen', 'betaald', 'ingediend', 'bezig', 'klaar'));
alter table public.recipe_intakes alter column status set default 'aanvraag';

create index if not exists recipe_intakes_created_at on public.recipe_intakes (created_at desc);

alter table public.recipe_intakes enable row level security;
-- Geen policies: zonder service-role-sleutel is de tabel dicht.
revoke all on public.recipe_intakes from anon, authenticated;

-- Welkomstlinks: na het vrijgeven krijgt elk lid een mail met een eigen link (14 dagen geldig). Pas bij het
-- klikken maakt de server een verse wachtwoordlink (die van Supabase zelf verloopt al na een uur).
-- Verlopen links worden bij het volgende vrijgeven opgeruimd.
create table if not exists public.welcome_links (
  token text primary key check (length(token) >= 32),
  email text not null check (length(email) <= 240),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '14 days'
);
alter table public.welcome_links enable row level security;
revoke all on public.welcome_links from anon, authenticated;

-- Privé-opslag voor de aangeleverde bestanden (max. 50 MB per bestand). Geen policies op storage.objects
-- voor deze bucket: alleen de server maakt eenmalige upload- en downloadlinks.
insert into storage.buckets (id, name, public, file_size_limit)
values ('aanleveringen', 'aanleveringen', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = 52428800;

commit;
