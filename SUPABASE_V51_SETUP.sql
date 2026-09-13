-- Savour v51: publieke uitnodigingspagina voor gedeelde mappen
-- Voer dit uit nadat SUPABASE_V50_PUBLIC_SHARING.sql is uitgevoerd.

drop function if exists public.get_public_shared_map_invite(text);
create or replace function public.get_public_shared_map_invite(_public_key text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object('id',m.id,'name',m.name,'photo_url',m.photo_url,'public_key',m.public_key)
  from public.shared_maps m
  where m.public_key = _public_key
  limit 1;
$$;

grant execute on function public.get_public_shared_map_invite(text) to anon, authenticated;
