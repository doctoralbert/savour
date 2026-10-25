-- Recepten verwijderen, ook als ze in mappen of gedeelde mappen staan (2026-10-25)
--
-- Waarom: bij het verwijderen van veel recepten tegelijk (bijv. 1.800) mislukte het: de lijst met recepten paste
-- niet in één verzoek, en een recept dat nog in een map, gedeelde map of openbare link stond, kon niet weg
-- zolang die koppeling bestond. Deze functie ruimt eerst alle koppelingen naar de recepten op (elke tabel die
-- naar public.recipes verwijst: mappen, favorieten, gedeelde mappen, deellinks, originele kladjes, ...) en
-- verwijdert daarna de recepten zelf.
-- Alleen je EIGEN recepten: recepten van anderen in de lijst worden genegeerd. De app stuurt ze in delen.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.

begin;

create or replace function public.savour_delete_my_recipes(_ids uuid[])
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  _mine uuid[];
  _ref record;
  _count integer;
begin
  if auth.uid() is null then
    raise exception 'savour_not_logged_in';
  end if;
  if coalesce(array_length(_ids, 1), 0) > 500 then
    raise exception 'savour_too_many';
  end if;
  select array_agg(id) into _mine from public.recipes where id = any(_ids) and user_id = auth.uid();
  if _mine is null then
    return 0;
  end if;
  -- Alle koppelingen naar deze recepten opruimen (tabellen met een verwijzing naar public.recipes).
  for _ref in
    select c.conrelid::regclass as tbl, a.attname as col
    from pg_constraint c
    join pg_attribute a on a.attrelid = c.conrelid and a.attnum = c.conkey[1]
    where c.contype = 'f'
      and c.confrelid = 'public.recipes'::regclass
      and array_length(c.conkey, 1) = 1
      and c.conrelid <> 'public.recipes'::regclass
  loop
    execute format('delete from %s where %I = any($1)', _ref.tbl, _ref.col) using _mine;
  end loop;
  -- De bekende koppeltabellen ook expliciet (voor het geval een ervan geen formele verwijzing heeft).
  for _ref in
    select t as tbl from unnest(array[
      'folder_recipes', 'favorites', 'shared_map_recipes', 'shared_folder_recipes', 'recipe_sources'
    ]) as t
  loop
    if to_regclass('public.' || _ref.tbl) is not null and exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = _ref.tbl and column_name = 'recipe_id'
    ) then
      execute format('delete from public.%I where recipe_id = any($1)', _ref.tbl) using _mine;
    end if;
  end loop;
  delete from public.recipes where id = any(_mine) and user_id = auth.uid();
  get diagnostics _count = row_count;
  return _count;
end;
$$;

revoke all on function public.savour_delete_my_recipes(uuid[]) from public, anon;
grant execute on function public.savour_delete_my_recipes(uuid[]) to authenticated;

commit;
