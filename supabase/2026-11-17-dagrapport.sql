-- Dagrapport van Claude (2026-11-17): de dagelijkse controle (Claude-routine "Savour: dagelijkse controle van imports
-- door Claude") schrijft elke avond haar bevindingen hier, en Savour mailt ze naar contact@savour.page
-- (api/_lib/onderhoud.js → sendDailyReports, Vercel Cron /api/admin?taak=rapport). Zo komen de bevindingen per mail
-- in plaats van als meldingen van GitHub.
-- Alleen voor de server: RLS aan en geen regels, dus gewone gebruikers kunnen er niet bij.

create table if not exists public.daily_reports (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  report_date date not null default (now() at time zone 'Europe/Amsterdam')::date,
  subject text not null,
  -- Wat er geconstateerd is en wat Savour beter zou maken, in gewone taal.
  body text not null,
  -- Een kant-en-klare opdracht om naar Claude te sturen om het aan te pakken.
  prompt text,
  sent_at timestamptz
);

alter table public.daily_reports enable row level security;

create index if not exists daily_reports_unsent on public.daily_reports (created_at) where sent_at is null;
