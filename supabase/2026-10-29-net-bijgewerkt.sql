-- Net bijgewerkt (keukenteam): bij elke echte wijziging van een recept onthouden wanneer en door wie.
-- updated_at bestond al maar werd bij aanpassen niet bijgewerkt; updated_by is nieuw.
-- Veilig om vaker te draaien.

alter table public.recipes add column if not exists updated_by uuid;

create or replace function public.savour_recipe_touched()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- Alleen bij een inhoudelijke wijziging (titel, tekst, ingrediënten, bereiding, foto), niet bij bijv. een andere categorie.
  if row(new.title, new.description, new.yield_text, new.ingredients, new.steps, new.photo_url)
     is distinct from row(old.title, old.description, old.yield_text, old.ingredients, old.steps, old.photo_url) then
    new.updated_at := now();
    new.updated_by := coalesce(auth.uid(), new.updated_by);
  end if;
  return new;
end;
$$;

drop trigger if exists savour_recipe_touched on public.recipes;
create trigger savour_recipe_touched
  before update on public.recipes
  for each row execute function public.savour_recipe_touched();
