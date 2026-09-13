-- Savour v50: openbare receptlinks
-- Voer dit eenmalig uit in Supabase SQL Editor.

create table if not exists public.public_recipe_shares (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null unique references public.recipes(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists public_recipe_shares_slug_idx on public.public_recipe_shares(slug);
create index if not exists public_recipe_shares_recipe_idx on public.public_recipe_shares(recipe_id);

alter table public.public_recipe_shares enable row level security;

-- Geen directe publieke tabeltoegang. De twee security-definer functies hieronder
-- regelen uitsluitend de benodigde acties.

drop function if exists public.create_public_recipe_share(uuid);
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
    update public.public_recipe_shares set enabled = true where id = existing.id;
    return jsonb_build_object('slug', existing.slug, 'enabled', true);
  end if;

  base_slug := trim(both '-' from regexp_replace(lower(coalesce(r.title, 'recept')), '[^a-z0-9]+', '-', 'g'));
  if base_slug = '' then base_slug := 'recept'; end if;
  final_slug := left(base_slug, 70) || '-' || left(replace(_recipe_id::text,'-',''), 8);

  insert into public.public_recipe_shares(recipe_id, owner_id, slug, enabled)
  values (_recipe_id, auth.uid(), final_slug, true)
  returning slug into final_slug;

  return jsonb_build_object('slug', final_slug, 'enabled', true);
end;
$$;

grant execute on function public.create_public_recipe_share(uuid) to authenticated;

drop function if exists public.get_public_recipe_by_slug(text);
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
    'slug', s.slug
  )
  from public.public_recipe_shares s
  join public.recipes r on r.id = s.recipe_id
  where s.slug = _slug
    and s.enabled = true
  limit 1;
$$;

grant execute on function public.get_public_recipe_by_slug(text) to anon, authenticated;
