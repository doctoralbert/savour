-- MEP-lijsten (mise-en-place-lijsten), 2026-11-17. Eerst op savour-3.
-- Een MEP-lijst hoort bij een post (Garde, Rotisserie, Entremetier, Patisserie). Opbouw:
--   mep_lists     de lijst zelf: van één account, of van een keukenteam (team_id)
--   mep_cards     "kaarten" in de lijst: à la carte, banqueting, een evenement (naast elkaar of als tabblad)
--   mep_sections  kopjes per gang of gerecht ("Tussen 1 · Pulpo")
--   mep_items     de onderdelen die de post klaarzet, met optioneel een portie per couvert, een opmerking en een
--                 koppeling naar een Savour-recept
--   mep_days      de dag: couverts per kaart
--   mep_day_items de stand per onderdeel op die dag: nodig, bezig, klaar of voorraad; wie en wanneer
-- Rechten (afgesproken):
--   - Beheren (lijst, kaarten, kopjes, onderdelen): eigen lijst met Savour Pro; zonder Pro één lijst om te
--     proberen (de eerste). In een keukenteam: wie daar mag bewerken (savour_team_can_edit: team open, zelf Pro,
--     eigenaar of sous-chef).
--   - Afvinken en couverts invullen: iedereen die de lijst mag zien, ook zonder Pro. Een team op slot (eigenaar
--     zonder Pro) staat ook hier op slot: zien wel, afvinken niet.
-- Niets wordt automatisch verwijderd: een lijst archiveren zet archived = true.

-- ---- Tabellen ----
create table if not exists public.mep_lists (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  team_id uuid references public.shared_maps (id) on delete cascade,
  name text not null check (length(name) between 1 and 120),
  archived boolean not null default false,
  position integer not null default 0,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists mep_lists_owner on public.mep_lists (owner_id) where team_id is null;
create index if not exists mep_lists_team on public.mep_lists (team_id) where team_id is not null;

create table if not exists public.mep_cards (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.mep_lists (id) on delete cascade,
  name text not null check (length(name) between 1 and 80),
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists mep_cards_list on public.mep_cards (list_id);

create table if not exists public.mep_sections (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.mep_lists (id) on delete cascade,
  card_id uuid not null references public.mep_cards (id) on delete cascade,
  name text not null check (length(name) between 1 and 160),
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists mep_sections_card on public.mep_sections (card_id);

create table if not exists public.mep_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.mep_lists (id) on delete cascade,
  section_id uuid not null references public.mep_sections (id) on delete cascade,
  name text not null check (length(name) between 1 and 200),
  -- Portie per couvert, alleen als de kok die invult (60 couverts × 40 g = 2,4 kg). Leeg = gewoon afvinken.
  portion_qty numeric check (portion_qty is null or portion_qty > 0),
  portion_unit text check (portion_unit is null or length(portion_unit) <= 20),
  -- De tekst zoals de kok hem schreef ("pulpo bbq 40 gram (1/2 tentakel)"), zodat er bij importeren niets verloren gaat.
  note text check (note is null or length(note) <= 300),
  recipe_id uuid references public.recipes (id) on delete set null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists mep_items_section on public.mep_items (section_id);
create index if not exists mep_items_list on public.mep_items (list_id);

create table if not exists public.mep_days (
  list_id uuid not null references public.mep_lists (id) on delete cascade,
  day date not null,
  -- Couverts per kaart: { "<card_id>": 60 }.
  covers jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key (list_id, day)
);

create table if not exists public.mep_day_items (
  list_id uuid not null references public.mep_lists (id) on delete cascade,
  item_id uuid not null references public.mep_items (id) on delete cascade,
  day date not null,
  status text not null check (status in ('nodig', 'bezig', 'klaar', 'voorraad')),
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key (item_id, day)
);
create index if not exists mep_day_items_list_day on public.mep_day_items (list_id, day);

-- ---- Rechten ----
-- Mag deze gebruiker de lijst zien? Eigen lijst, of lid of eigenaar van het keukenteam.
create or replace function public.savour_mep_can_view(_list uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1 from public.mep_lists l
    where l.id = _list
      and (
        (l.team_id is null and l.owner_id = auth.uid())
        or (l.team_id is not null and (
          exists (select 1 from public.shared_maps sm where sm.id = l.team_id and sm.owner_id = auth.uid())
          or exists (select 1 from public.shared_map_members m where m.shared_map_id = l.team_id and m.user_id = auth.uid())
        ))
      )
  );
$$;

-- De eerste eigen lijst van een account: die mag zonder Pro (om te proberen).
create or replace function public.savour_mep_free_list(_user uuid)
returns uuid language sql stable security definer set search_path to 'public' as $$
  select l.id from public.mep_lists l
  where l.owner_id = _user and l.team_id is null
  order by l.created_at, l.id
  limit 1;
$$;

-- Mag deze gebruiker de lijst beheren (kaarten, kopjes, onderdelen, naam)?
create or replace function public.savour_mep_can_manage(_list uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1 from public.mep_lists l
    where l.id = _list
      and (
        (l.team_id is null and l.owner_id = auth.uid()
          and (public.savour_is_pro(auth.uid()) or l.id = public.savour_mep_free_list(auth.uid())))
        or (l.team_id is not null and public.savour_team_can_edit(l.team_id))
      )
  );
$$;

-- Mag deze gebruiker afvinken en couverts invullen? Iedereen die de lijst ziet; een team op slot niet.
create or replace function public.savour_mep_can_tick(_list uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select public.savour_mep_can_view(_list)
    and coalesce((select l.team_id is null or public.savour_team_open(l.team_id) from public.mep_lists l where l.id = _list), false);
$$;

grant execute on function public.savour_mep_can_view(uuid) to authenticated;
grant execute on function public.savour_mep_can_manage(uuid) to authenticated;
grant execute on function public.savour_mep_can_tick(uuid) to authenticated;
grant execute on function public.savour_mep_free_list(uuid) to authenticated;

alter table public.mep_lists enable row level security;
alter table public.mep_cards enable row level security;
alter table public.mep_sections enable row level security;
alter table public.mep_items enable row level security;
alter table public.mep_days enable row level security;
alter table public.mep_day_items enable row level security;

-- Lijsten. Nieuwe eigen lijst: met Pro, of als het de eerste is. Nieuwe teamlijst: wie in het team mag bewerken.
drop policy if exists mep_lists_select on public.mep_lists;
create policy mep_lists_select on public.mep_lists for select using (public.savour_mep_can_view(id));
drop policy if exists mep_lists_insert on public.mep_lists;
create policy mep_lists_insert on public.mep_lists for insert with check (
  owner_id = auth.uid()
  and (
    (team_id is null and (public.savour_is_pro(auth.uid())
      or not exists (select 1 from public.mep_lists x where x.owner_id = auth.uid() and x.team_id is null)))
    or (team_id is not null and public.savour_team_can_edit(team_id))
  )
);
drop policy if exists mep_lists_update on public.mep_lists;
create policy mep_lists_update on public.mep_lists for update
  using (public.savour_mep_can_manage(id)) with check (public.savour_mep_can_manage(id));
drop policy if exists mep_lists_delete on public.mep_lists;
create policy mep_lists_delete on public.mep_lists for delete using (public.savour_mep_can_manage(id));

-- Kaarten, kopjes en onderdelen: zien = de lijst zien, wijzigen = de lijst beheren.
drop policy if exists mep_cards_select on public.mep_cards;
create policy mep_cards_select on public.mep_cards for select using (public.savour_mep_can_view(list_id));
drop policy if exists mep_cards_write on public.mep_cards;
create policy mep_cards_write on public.mep_cards for all
  using (public.savour_mep_can_manage(list_id)) with check (public.savour_mep_can_manage(list_id));

drop policy if exists mep_sections_select on public.mep_sections;
create policy mep_sections_select on public.mep_sections for select using (public.savour_mep_can_view(list_id));
drop policy if exists mep_sections_write on public.mep_sections;
create policy mep_sections_write on public.mep_sections for all
  using (public.savour_mep_can_manage(list_id))
  with check (
    public.savour_mep_can_manage(list_id)
    and exists (select 1 from public.mep_cards c where c.id = card_id and c.list_id = mep_sections.list_id)
  );

drop policy if exists mep_items_select on public.mep_items;
create policy mep_items_select on public.mep_items for select using (public.savour_mep_can_view(list_id));
drop policy if exists mep_items_write on public.mep_items;
create policy mep_items_write on public.mep_items for all
  using (public.savour_mep_can_manage(list_id))
  with check (
    public.savour_mep_can_manage(list_id)
    and exists (select 1 from public.mep_sections s where s.id = section_id and s.list_id = mep_items.list_id)
  );

-- De dag: zien = de lijst zien; couverts en afvinken = savour_mep_can_tick (ook zonder Pro). Nooit verwijderen.
drop policy if exists mep_days_select on public.mep_days;
create policy mep_days_select on public.mep_days for select using (public.savour_mep_can_view(list_id));
drop policy if exists mep_days_insert on public.mep_days;
create policy mep_days_insert on public.mep_days for insert with check (public.savour_mep_can_tick(list_id));
drop policy if exists mep_days_update on public.mep_days;
create policy mep_days_update on public.mep_days for update
  using (public.savour_mep_can_tick(list_id)) with check (public.savour_mep_can_tick(list_id));

drop policy if exists mep_day_items_select on public.mep_day_items;
create policy mep_day_items_select on public.mep_day_items for select using (public.savour_mep_can_view(list_id));
drop policy if exists mep_day_items_insert on public.mep_day_items;
create policy mep_day_items_insert on public.mep_day_items for insert with check (
  public.savour_mep_can_tick(list_id)
  and exists (select 1 from public.mep_items i where i.id = item_id and i.list_id = mep_day_items.list_id)
);
drop policy if exists mep_day_items_update on public.mep_day_items;
create policy mep_day_items_update on public.mep_day_items for update
  using (public.savour_mep_can_tick(list_id)) with check (public.savour_mep_can_tick(list_id));

-- Live meekijken: wijzigingen in de dagstand gaan via Supabase Realtime naar het team (alleen wat je mag zien).
do $$
begin
  begin
    alter publication supabase_realtime add table public.mep_day_items;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.mep_days;
  exception when duplicate_object then null;
  end;
end $$;
