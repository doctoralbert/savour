-- Foutenlogboek (2026-10-25)
--
-- Waarom: fouten die bij gebruikers in de browser optreden, zie je nu pas als iemand het meldt. De app stuurt
-- ze voortaan zelf naar deze tabel (js/core/errors.js); je ziet ze in /admin onder "Fouten".
-- Zonder namen, e-mailadressen of IP-adressen: alleen de foutmelding, de plek in de code, de pagina en het
-- soort apparaat. Gebruikers kunnen alleen een melding toevoegen, niet lezen; lezen en wissen doet de server.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create table if not exists public.app_errors (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  message text not null check (length(message) <= 500),
  source text check (source is null or length(source) <= 300),
  line integer,
  col integer,
  stack text check (stack is null or length(stack) <= 2000),
  page text check (page is null or length(page) <= 300),
  platform text check (platform is null or length(platform) <= 40),
  user_agent text check (user_agent is null or length(user_agent) <= 300),
  app_version text check (app_version is null or length(app_version) <= 40)
);

create index if not exists app_errors_created_at on public.app_errors (created_at desc);

alter table public.app_errors enable row level security;

-- Iedereen (ook zonder account, bijvoorbeeld op de startpagina) mag een melding toevoegen; niemand mag lezen.
drop policy if exists "app_errors melden" on public.app_errors;
create policy "app_errors melden" on public.app_errors for insert to anon, authenticated with check (true);
grant insert on public.app_errors to anon, authenticated;

commit;

-- Controle: moet app_errors tonen met rowsecurity = true.
select tablename, rowsecurity from pg_tables where schemaname = 'public' and tablename = 'app_errors';
