-- Savour: overneem-instellingen afschermen (2026-10-26)
-- Uitvoeren: Supabase-dashboard → SQL Editor → dit hele bestand plakken → Run. Veilig om vaker uit te voeren.
--
-- De tabel recipe_share_settings ("mag dit recept worden overgenomen?") was voor iedereen leesbaar, ook de kolom
-- owner_id (wie de maker is). Recepten zelf staan er niet in, maar wie de maker is hoort niemand te kunnen
-- opvragen. De openbare receptpagina heeft alleen nodig óf en tot wanneer overnemen mag: alleen die kolommen
-- blijven leesbaar. De maker kan zijn instelling gewoon blijven wijzigen (regels in 2026-10-25-recept-overnemen.sql).

begin;

revoke select on public.recipe_share_settings from anon, authenticated;
grant select (recipe_id, allow_copy, allow_copy_until) on public.recipe_share_settings to anon, authenticated;

commit;
