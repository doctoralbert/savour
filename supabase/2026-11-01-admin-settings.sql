-- Instellingen die alleen de server mag lezen, zoals de AdSense-koppeling in /admin.
-- RLS staat aan zonder regels en de rechten zijn weg: gebruikers kunnen hier nooit bij; de service-role wel.

create table if not exists public.admin_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.admin_settings enable row level security;
revoke all on public.admin_settings from anon, authenticated;
