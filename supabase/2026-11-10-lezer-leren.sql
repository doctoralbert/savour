-- De Savour-lezer slimmer maken (2026-11-10): leren van wat de AI moest lezen en van wat koks verbeteren.
--
-- 1. reader_signals: ANONIEME tellingen van elke import, van iedereen. Geen receptinhoud, geen account:
--    soort bron, hoe zeker de lezer was, of de AI nodig was, en hoeveel regels de kok daarna veranderde.
-- 2. reader_examples: voorbeelden MET inhoud (brontekst, wat de lezer en de AI lazen, wat de kok opsloeg),
--    alleen van accounts met "Help de Savour-lezer verbeteren" aan (profiles.help_reader, standaard aan,
--    uit te zetten bij Instellingen). Alleen de beheerder kan ze inzien; de kok kan zijn eigen voorbeelden
--    weghalen, en bij het verwijderen van een account gaan ze mee. Alleen tekstbronnen (Word, PDF, tekst,
--    webpagina's), geen foto's.
-- Met de voorbeelden worden nieuwe lezer-tests gemaakt (tests/lezer.test.mjs); de lezer verandert nooit vanzelf.

alter table public.profiles add column if not exists help_reader boolean not null default true;

create table if not exists public.reader_signals (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  source_kind text not null check (length(source_kind) <= 20),
  file_ext text check (length(file_ext) <= 12),
  reader_confidence text check (length(reader_confidence) <= 10),
  by_ai boolean not null default false,
  ai_model text check (length(ai_model) <= 40),
  n_ingredients integer check (n_ingredients between 0 and 1000),
  n_steps integer check (n_steps between 0 and 1000),
  unclear integer check (unclear between 0 and 1000),
  edits jsonb check (pg_column_size(edits) <= 2000),
  agree jsonb check (pg_column_size(agree) <= 1000),
  language text check (length(language) <= 5)
);
alter table public.reader_signals enable row level security;
revoke all on public.reader_signals from anon, authenticated;
drop policy if exists "Beheerder leest leessignalen" on public.reader_signals;
create policy "Beheerder leest leessignalen" on public.reader_signals for select using (public.is_savour_admin());

-- Tegen misbruik: hooguit 2000 tellingen per account per dag. Deze teller staat los van de tellingen zelf,
-- zodat een telling nooit terug te voeren is op een account.
create table if not exists public.reader_signal_quota (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  n integer not null default 0,
  primary key (user_id, day)
);
alter table public.reader_signal_quota enable row level security;
revoke all on public.reader_signal_quota from anon, authenticated;

create or replace function public.savour_reader_signals(_rows jsonb)
 returns integer
 language plpgsql
 security definer
 set search_path to 'public'
as $$
declare
  me uuid := auth.uid();
  wanted integer;
  used integer;
begin
  if me is null or jsonb_typeof(_rows) <> 'array' then return 0; end if;
  wanted := least(jsonb_array_length(_rows), 200);
  insert into public.reader_signal_quota (user_id, day, n) values (me, current_date, 0)
    on conflict (user_id, day) do nothing;
  select n into used from public.reader_signal_quota where user_id = me and day = current_date for update;
  wanted := least(wanted, greatest(0, 2000 - used));
  if wanted = 0 then return 0; end if;
  update public.reader_signal_quota set n = n + wanted where user_id = me and day = current_date;
  insert into public.reader_signals
    (source_kind, file_ext, reader_confidence, by_ai, ai_model, n_ingredients, n_steps, unclear, edits, agree, language)
  select left(coalesce(r->>'source_kind', 'onbekend'), 20), left(r->>'file_ext', 12), left(r->>'reader_confidence', 10),
         coalesce((r->>'by_ai')::boolean, false), left(r->>'ai_model', 40),
         least(greatest(coalesce((r->>'n_ingredients')::int, 0), 0), 1000),
         least(greatest(coalesce((r->>'n_steps')::int, 0), 0), 1000),
         least(greatest(coalesce((r->>'unclear')::int, 0), 0), 1000),
         case when jsonb_typeof(r->'edits') = 'object' then r->'edits' end,
         case when jsonb_typeof(r->'agree') = 'object' then r->'agree' end,
         left(r->>'language', 5)
  from jsonb_array_elements(_rows) with ordinality as x(r, i)
  where i <= wanted;
  return wanted;
end;
$$;
revoke all on function public.savour_reader_signals(jsonb) from public, anon;
grant execute on function public.savour_reader_signals(jsonb) to authenticated;

create table if not exists public.reader_examples (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  source_kind text not null check (length(source_kind) <= 20),
  file_ext text check (length(file_ext) <= 12),
  reason text check (length(reason) <= 40),
  source_text text not null check (length(source_text) <= 20000),
  reader_result jsonb check (pg_column_size(reader_result) <= 60000),
  ai_result jsonb check (pg_column_size(ai_result) <= 60000),
  final_result jsonb check (pg_column_size(final_result) <= 60000),
  handled boolean not null default false
);
create index if not exists reader_examples_created on public.reader_examples (created_at desc);
alter table public.reader_examples enable row level security;
revoke all on public.reader_examples from anon;
grant select, insert, update, delete on public.reader_examples to authenticated;
drop policy if exists "Eigen voorbeelden delen" on public.reader_examples;
create policy "Eigen voorbeelden delen" on public.reader_examples for insert to authenticated
  with check (
    user_id = auth.uid()
    and coalesce((select help_reader from public.profiles where id = auth.uid()), true)
    and (select count(*) from public.reader_examples e
         where e.user_id = auth.uid() and e.created_at > now() - interval '1 day') < 300
  );
drop policy if exists "Eigen voorbeelden weghalen" on public.reader_examples;
create policy "Eigen voorbeelden weghalen" on public.reader_examples for delete to authenticated
  using (user_id = auth.uid() or public.is_savour_admin());
drop policy if exists "Beheerder leest voorbeelden" on public.reader_examples;
create policy "Beheerder leest voorbeelden" on public.reader_examples for select to authenticated
  using (public.is_savour_admin());
drop policy if exists "Beheerder markeert voorbeelden" on public.reader_examples;
create policy "Beheerder markeert voorbeelden" on public.reader_examples for update to authenticated
  using (public.is_savour_admin()) with check (public.is_savour_admin());
