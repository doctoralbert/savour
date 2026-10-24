-- Logo op prints (2026-10-24)
--
-- Pro en teams kunnen recepten en mappen printen met het logo en de naam van hun restaurant rechtsboven.
-- - Pro: je eigen logo.
-- - Team: het logo van de team-eigenaar geldt voor iedereen in het team.
-- - Gedeelde map: het logo van wie de map beheert (of van diens team).
-- Het logo wordt alleen gebruikt zolang de eigenaar ervan Pro is. Zonder dit bestand print Savour zoals voorheen.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Vereist: 2026-10-22-gratis-pro-teams.sql is eerder uitgevoerd.

begin;

create table if not exists public.print_brands (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text check (name is null or length(name) <= 120),
  logo text check (logo is null or (logo like 'data:image/png;base64,%' or logo like 'data:image/jpeg;base64,%') and length(logo) <= 400000),
  bw boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.print_brands enable row level security;

-- Alleen je eigen logo zien en aanpassen; andermans logo komt alleen via savour_print_brand().
drop policy if exists "print_brands eigen lezen" on public.print_brands;
create policy "print_brands eigen lezen" on public.print_brands for select using (user_id = auth.uid());
drop policy if exists "print_brands eigen toevoegen" on public.print_brands;
create policy "print_brands eigen toevoegen" on public.print_brands for insert with check (user_id = auth.uid());
drop policy if exists "print_brands eigen wijzigen" on public.print_brands;
create policy "print_brands eigen wijzigen" on public.print_brands for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "print_brands eigen verwijderen" on public.print_brands;
create policy "print_brands eigen verwijderen" on public.print_brands for delete using (user_id = auth.uid());

-- Welk logo hoort bij deze gebruiker? Teamlid: dat van de team-eigenaar (als die er een heeft), anders het eigen.
create or replace function public.savour_brand_owner(_user uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select o.owner_id from public.organizations o
       join public.organization_members m on m.organization_id = o.id
       join auth.users u on lower(u.email) = lower(m.email)
      where u.id = _user and public.savour_org_active(o)
        and exists (select 1 from public.print_brands b where b.user_id = o.owner_id)
      limit 1),
    _user);
$$;

-- Logo voor een print. Zonder map: jouw logo (of dat van je team). Met een gedeelde map waar je lid van bent:
-- het logo van wie de map beheert. Geeft null als er geen logo is of de eigenaar ervan geen Pro is.
create or replace function public.savour_print_brand(_map text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  base uuid := me;
  owner uuid;
  b public.print_brands;
begin
  if me is null then return null; end if;
  if _map is not null then
    select sm.owner_id into base from public.shared_maps sm
     where sm.id::text = _map
       and (sm.owner_id = me or exists (select 1 from public.shared_map_members mm
                                         where mm.shared_map_id = sm.id and mm.user_id = me));
    if base is null then base := me; end if;
  end if;
  owner := public.savour_brand_owner(base);
  if not public.savour_is_pro(owner) then return null; end if;
  select * into b from public.print_brands where user_id = owner;
  if b.user_id is null or (b.logo is null and coalesce(b.name, '') = '') then return null; end if;
  return jsonb_build_object('name', b.name, 'logo', b.logo, 'bw', b.bw, 'team', owner <> me);
end $$;

grant execute on function public.savour_print_brand(text) to authenticated;
revoke execute on function public.savour_brand_owner(uuid) from public, anon, authenticated;

commit;

-- Controle: moet print_brands tonen met rowsecurity = true.
select tablename, rowsecurity from pg_tables where schemaname = 'public' and tablename = 'print_brands';
