-- Berichten in /admin (2026-10-25)
--
-- Waarom: contactberichten en bugmeldingen gaan per mail naar contact@savour.page. Voortaan worden ze ook hier
-- bewaard, zodat je ze in /admin onder "Berichten" ziet, met een teller voor ongelezen berichten.
-- Alleen de server (api/bug-report.js en api/admin.js, met de service-role-sleutel) mag erin schrijven en lezen;
-- gebruikers en bezoekers kunnen niets uit deze tabel halen. Een meegestuurde screenshot staat alleen in de mail.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind text not null default 'contact' check (kind in ('contact', 'bug')),
  name text check (length(name) <= 120),
  email text check (length(email) <= 240),
  subject text check (length(subject) <= 180),
  message text check (length(message) <= 12000),
  page text check (page is null or length(page) <= 500),
  language text check (language is null or length(language) <= 10),
  has_screenshot boolean not null default false,
  read_at timestamptz
);

create index if not exists contact_messages_created_at on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;
-- Geen policies: zonder service-role-sleutel is de tabel dicht.
revoke all on public.contact_messages from anon, authenticated;

commit;
