-- Notitie naast een recept en koppelingen van ingrediënten naar andere recepten.
-- ingredient_links: { "bechamelsaus": "<recept-id>" }, op naam van het ingrediënt. Een lege waarde betekent: bewust geen recept.
-- Geen nieuwe rechten nodig: wie een recept mag bewerken, mag ook de notitie en koppelingen aanpassen.

alter table public.recipes add column if not exists notes text not null default '';
alter table public.recipes add column if not exists ingredient_links jsonb not null default '{}'::jsonb;
