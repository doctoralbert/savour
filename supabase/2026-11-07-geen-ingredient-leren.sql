-- Leren van "Geen ingrediënt" (2026-11-07, testversie)
--
-- Drukt een kok bij Allergenen → Nakijken een naam weg als "Geen ingrediënt" ("massa", "boiron coulis", "laten
-- trekken"), dan onthoudt Savour dat voor dat account: bij nieuwe recepten stelt Savour zelf voor om die regel weg
-- te halen. In /admin → Ingrediënten ziet de beheerder welke namen koks wegdrukken (alleen de naam en het aantal
-- accounts). Wat de beheerder daar bevestigt, krijgt in de ingrediëntenlijst de stand 'junk' en geldt voor iedereen.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-11-06-ingredientenlijst-goedkeuren.sql is eerder uitgevoerd.

begin;

create table if not exists public.ingredient_feedback (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  key text not null check (length(btrim(key)) between 1 and 120),
  kind text not null check (kind in ('not_ingredient')),
  created_at timestamptz not null default now(),
  primary key (user_id, key, kind)
);

alter table public.ingredient_feedback enable row level security;

drop policy if exists ingredient_feedback_own_select on public.ingredient_feedback;
create policy ingredient_feedback_own_select on public.ingredient_feedback
  for select to authenticated using (user_id = auth.uid());
drop policy if exists ingredient_feedback_own_insert on public.ingredient_feedback;
create policy ingredient_feedback_own_insert on public.ingredient_feedback
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists ingredient_feedback_own_delete on public.ingredient_feedback;
create policy ingredient_feedback_own_delete on public.ingredient_feedback
  for delete to authenticated using (user_id = auth.uid());

grant select, insert, delete on public.ingredient_feedback to authenticated;

-- Nieuwe stand in de ingrediëntenlijst: 'junk' = geen ingrediënt, voor iedereen. Iedereen mag die rijen lezen.
alter table public.ingredient_list drop constraint if exists ingredient_list_status_check;
alter table public.ingredient_list
  add constraint ingredient_list_status_check check (status in ('approved', 'rejected', 'junk'));

drop policy if exists ingredient_list_read_approved on public.ingredient_list;
create policy ingredient_list_read_approved on public.ingredient_list
  for select to anon, authenticated
  using (status in ('approved', 'junk'));

-- Wat de beheerder al wegdrukte: deze namen zijn voor iedereen geen ingrediënt.
insert into public.ingredient_list (lang, key, name, status)
values
  ('nl', 'massa', 'Massa', 'junk'),
  ('nl', 'basis massa', 'Basis massa', 'junk'),
  ('nl', 'coulis', 'Coulis', 'junk'),
  ('nl', 'boiron coulis', 'Boiron coulis', 'junk'),
  ('nl', 'puree', 'Puree', 'junk')
on conflict (lang, key) do update set status = excluded.status, reviewed_at = now();

commit;
