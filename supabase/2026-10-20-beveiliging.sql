-- Savour: beveiligingsreparatie Supabase (2026-10-20)
-- Uitvoeren in Supabase > SQL Editor. Alles gebeurt in één transactie: lukt één stap niet, dan verandert er niets.

begin;

-- 1) Niemand mag zichzelf meer lid maken van andermans gedeelde map.
--    Voorheen kon elke ingelogde gebruiker zichzelf toevoegen aan elke map, met elke rol (ook 'editor').
--    Alleen de eigenaar voegt nu leden toe. (Savour zelf gebruikt het alleen om de eigenaar toe te voegen.)
drop policy if exists "savour_v41_shared_members_insert" on public.shared_map_members;
create policy "savour_shared_members_insert_owner_only"
  on public.shared_map_members for insert to authenticated
  with check (public.is_shared_map_owner(shared_map_id));

-- Alleen bekende rollen toestaan voor nieuwe en gewijzigde leden (bestaande rijen blijven ongemoeid).
alter table public.shared_map_members
  drop constraint if exists shared_map_members_role_check;
alter table public.shared_map_members
  add constraint shared_map_members_role_check check (role in ('owner', 'editor', 'viewer')) not valid;

-- 2) Deze functie gaf iedereen (ook zonder account) het e-mailadres bij een volledige naam.
--    Savour gebruikt hem nergens; weg ermee (privacy / AVG).
drop function if exists public.lookup_login_email(text);

-- 3) Dubbele regels opruimen. Er stonden van elke regel twee versies (een oude en een 'v41'-versie).
--    Ze deden hetzelfde, op één na: de v41-regel voor folder_recipes controleerde niet of het recept van jou is.
drop policy if exists "Users can view own categories" on public.categories;
drop policy if exists "Users can create own categories" on public.categories;
drop policy if exists "Users can update own categories" on public.categories;
drop policy if exists "Users can delete own categories" on public.categories;

drop policy if exists "Users can view own favorites" on public.favorites;
drop policy if exists "Users can create own favorites" on public.favorites;
drop policy if exists "Users can remove own favorites" on public.favorites;

drop policy if exists "Users can view own folders" on public.folders;
drop policy if exists "Users can create own folders" on public.folders;
drop policy if exists "Users can update own folders" on public.folders;
drop policy if exists "Users can delete own folders" on public.folders;

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can create own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

drop policy if exists "Users can view own recipes" on public.recipes;
drop policy if exists "Users can create own recipes" on public.recipes;
drop policy if exists "Users can update own recipes" on public.recipes;
drop policy if exists "Users can delete own recipes" on public.recipes;

drop policy if exists "Users can view recipes in own folders" on public.folder_recipes;
drop policy if exists "Users can remove recipes from own folders" on public.folder_recipes;
drop policy if exists "savour_v41_folder_recipes_insert" on public.folder_recipes; -- de zwakkere variant
-- "Users can add recipes to own folders" blijft: die controleert map én recept.

commit;

-- Controle achteraf (los uitvoeren): elke tabel hoort per actie nog maar één regel te hebben.
-- select tablename, cmd, count(*) from pg_policies where schemaname = 'public' group by 1, 2 order by 1, 2;
