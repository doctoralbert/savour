-- Savour: openbare receptlinks met tijdslimiet en uitzetten; overnemen weer opslaan (2026-10-26)
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
-- Alles in één transactie: lukt één stap niet, dan verandert er niets.

begin;

-- 1) "Ontvangers mogen dit recept overnemen" opslaan werkte niet meer: voor opslaan (upsert) heeft de database
--    leesrecht op alle kolommen nodig. Ingelogde gebruikers krijgen dat weer, maar zien alleen de instelling van
--    hun eigen recepten en van recepten die ze toch al mogen zien (openbaar gedeeld of in hun gedeelde map).
--    Bezoekers zonder account zien alleen óf en tot wanneer overnemen mag, nooit wie de maker is.
grant select on public.recipe_share_settings to authenticated;
revoke select on public.recipe_share_settings from anon;
grant select (recipe_id, allow_copy, allow_copy_until) on public.recipe_share_settings to anon;

drop policy if exists "Overnemen: iedereen leest" on public.recipe_share_settings;
drop policy if exists "Overnemen: bezoekers lezen" on public.recipe_share_settings;
drop policy if exists "Overnemen: ingelogd lezen" on public.recipe_share_settings;
create policy "Overnemen: bezoekers lezen" on public.recipe_share_settings
  for select to anon using (true);
create policy "Overnemen: ingelogd lezen" on public.recipe_share_settings
  for select to authenticated using (
    owner_id = auth.uid()
    or public.can_view_shared_recipe(recipe_id)
    or exists (select 1 from public.public_recipe_shares s where s.recipe_id = recipe_share_settings.recipe_id and s.enabled)
  );

-- 2) Tot wanneer een openbare link werkt. Leeg = onbeperkt (zoals alle bestaande links).
alter table public.public_recipe_shares add column if not exists expires_at timestamptz;

-- 3) Een link opvragen geeft alleen een recept zolang de link aan staat en niet verlopen is.
create or replace function public.get_public_recipe_by_slug(_slug text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'id', r.id,
    'title', r.title,
    'description', r.description,
    'yield_text', r.yield_text,
    'ingredients', r.ingredients,
    'steps', r.steps,
    'photo_url', r.photo_url,
    'slug', s.slug,
    'expires_at', s.expires_at
  )
  from public.public_recipe_shares s
  join public.recipes r on r.id = s.recipe_id
  where s.slug = _slug
    and s.enabled = true
    and (s.expires_at is null or s.expires_at > now())
  limit 1;
$$;

-- 4) Het deelvenster openen maakt de link (eerste keer: aan, onbeperkt), maar zet een uitgezette of verlopen
--    link niet stiekem weer aan. Geeft de huidige stand terug.
create or replace function public.create_public_recipe_share(_recipe_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.recipes%rowtype;
  existing public.public_recipe_shares%rowtype;
  base_slug text;
  final_slug text;
begin
  select * into r from public.recipes where id = _recipe_id and user_id = auth.uid();
  if not found then
    raise exception 'Recept niet gevonden of geen eigenaar';
  end if;

  select * into existing from public.public_recipe_shares where recipe_id = _recipe_id;
  if found then
    return jsonb_build_object(
      'slug', existing.slug,
      'enabled', existing.enabled and (existing.expires_at is null or existing.expires_at > now()),
      'expires_at', existing.expires_at
    );
  end if;

  base_slug := trim(both '-' from regexp_replace(lower(coalesce(r.title, 'recept')), '[^a-z0-9]+', '-', 'g'));
  if base_slug = '' then base_slug := 'recept'; end if;
  final_slug := left(base_slug, 70) || '-' || left(replace(_recipe_id::text, '-', ''), 8);

  insert into public.public_recipe_shares (recipe_id, owner_id, slug, enabled)
  values (_recipe_id, auth.uid(), final_slug, true)
  returning slug into final_slug;

  return jsonb_build_object('slug', final_slug, 'enabled', true, 'expires_at', null);
end;
$$;

-- 5) Link aan of uit zetten en hoelang hij werkt (_hours: 1, 24, 168; leeg = onbeperkt). Alleen de maker.
create or replace function public.set_public_recipe_share(_recipe_id uuid, _enabled boolean, _hours numeric default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s public.public_recipe_shares%rowtype;
begin
  if not exists (select 1 from public.recipes where id = _recipe_id and user_id = auth.uid()) then
    raise exception 'Recept niet gevonden of geen eigenaar';
  end if;
  perform public.create_public_recipe_share(_recipe_id);
  update public.public_recipe_shares
     set enabled = _enabled,
         expires_at = case when _enabled and _hours is not null and _hours > 0
                           then now() + make_interval(secs => (_hours * 3600)::double precision)
                           else null end
   where recipe_id = _recipe_id
  returning * into s;
  return jsonb_build_object('slug', s.slug, 'enabled', s.enabled, 'expires_at', s.expires_at);
end;
$$;

revoke all on function public.set_public_recipe_share(uuid, boolean, numeric) from public, anon;
grant execute on function public.set_public_recipe_share(uuid, boolean, numeric) to authenticated;

commit;
