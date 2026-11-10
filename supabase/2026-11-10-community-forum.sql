-- Community: een forum in Savour (2026-11-10). Leden posten threads en reageren; de beheerder (is_savour_admin)
-- kan berichten verbergen, vastzetten en sluiten. Alle ingelogde accounts mogen meelezen en meeschrijven.
-- Bij een bericht staat alleen de naam uit het profiel, nooit het e-mailadres.
-- Verwijdert iemand zijn account, dan blijven zijn berichten staan als "Verwijderd account" (zonder naam), zodat
-- gesprekken van anderen heel blijven.
-- Veilig om opnieuw te draaien.

-- 1. Tabellen
create table if not exists public.forum_threads (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users (id) on delete set null default auth.uid(),
  author_name text not null default '',
  author_is_admin boolean not null default false,
  title text not null check (char_length(btrim(title)) between 3 and 140),
  body text not null check (char_length(btrim(body)) between 1 and 5000),
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  last_activity_at timestamptz not null default now(),
  reply_count integer not null default 0,
  pinned boolean not null default false,
  locked boolean not null default false,
  hidden boolean not null default false
);
create index if not exists forum_threads_activity on public.forum_threads (pinned desc, last_activity_at desc);

create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.forum_threads (id) on delete cascade,
  author_id uuid references auth.users (id) on delete set null default auth.uid(),
  author_name text not null default '',
  author_is_admin boolean not null default false,
  body text not null check (char_length(btrim(body)) between 1 and 5000),
  created_at timestamptz not null default now(),
  edited_at timestamptz,
  hidden boolean not null default false
);
create index if not exists forum_posts_thread on public.forum_posts (thread_id, created_at);

-- 2. Naam en beheerdersteken vullen bij het plaatsen (niet door de app te kiezen), en een rem op spam:
--    hooguit 10 berichten (threads + reacties) per uur per account.
create or replace function public.savour_forum_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  recent integer;
begin
  new.author_id := auth.uid();
  if new.author_id is null then
    raise exception 'Log in om mee te doen in de community.';
  end if;
  select count(*) into recent from (
    select 1 from public.forum_threads where author_id = new.author_id and created_at > now() - interval '1 hour'
    union all
    select 1 from public.forum_posts where author_id = new.author_id and created_at > now() - interval '1 hour'
  ) x;
  if recent >= 10 then
    raise exception 'Je hebt het afgelopen uur al veel berichten geplaatst. Probeer het later nog eens.';
  end if;
  new.author_name := coalesce(nullif(btrim((select p.name from public.profiles p where p.id = new.author_id)), ''), 'Kok');
  new.author_is_admin := public.is_savour_admin();
  new.created_at := now();
  new.edited_at := null;
  new.hidden := false;
  if tg_table_name = 'forum_threads' then
    new.last_activity_at := now();
    new.reply_count := 0;
    new.pinned := false;
    new.locked := false;
  end if;
  return new;
end;
$$;

drop trigger if exists forum_threads_before_insert on public.forum_threads;
create trigger forum_threads_before_insert before insert on public.forum_threads
  for each row execute function public.savour_forum_before_insert();
drop trigger if exists forum_posts_before_insert on public.forum_posts;
create trigger forum_posts_before_insert before insert on public.forum_posts
  for each row execute function public.savour_forum_before_insert();

-- 3. Bewerken: een lid past alleen de tekst van zijn eigen bericht aan; de rest (naam, verbergen, vastzetten,
--    sluiten) kan alleen de beheerder. Account verwijderd (author_id wordt leeg): naam weg.
create or replace function public.savour_forum_before_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- De teller van reacties (savour_forum_count_replies) mag het aantal en de laatste activiteit bijwerken.
  if current_setting('savour.forum_counting', true) = '1' then
    return new;
  end if;
  if new.author_id is null and old.author_id is not null then
    new.author_name := 'Verwijderd account';
    return new;
  end if;
  if not public.is_savour_admin() then
    new.author_id := old.author_id;
    new.author_name := old.author_name;
    new.author_is_admin := old.author_is_admin;
    new.created_at := old.created_at;
    new.hidden := old.hidden;
    if tg_table_name = 'forum_threads' then
      new.pinned := old.pinned;
      new.locked := old.locked;
      new.reply_count := old.reply_count;
      new.last_activity_at := old.last_activity_at;
    end if;
  end if;
  if new.body is distinct from old.body or (tg_table_name = 'forum_threads' and new.title is distinct from old.title) then
    new.edited_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists forum_threads_before_update on public.forum_threads;
create trigger forum_threads_before_update before update on public.forum_threads
  for each row execute function public.savour_forum_before_update();
drop trigger if exists forum_posts_before_update on public.forum_posts;
create trigger forum_posts_before_update before update on public.forum_posts
  for each row execute function public.savour_forum_before_update();

-- 4. Aantal reacties en laatste activiteit van een thread bijhouden.
create or replace function public.savour_forum_count_replies()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  t uuid := coalesce(new.thread_id, old.thread_id);
begin
  perform set_config('savour.forum_counting', '1', true);
  update public.forum_threads ft set
    reply_count = (select count(*) from public.forum_posts p where p.thread_id = t and not p.hidden),
    last_activity_at = greatest(ft.created_at, coalesce((select max(p.created_at) from public.forum_posts p where p.thread_id = t and not p.hidden), ft.created_at))
  where ft.id = t;
  perform set_config('savour.forum_counting', '', true);
  return null;
end;
$$;

drop trigger if exists forum_posts_count on public.forum_posts;
create trigger forum_posts_count after insert or delete or update of hidden on public.forum_posts
  for each row execute function public.savour_forum_count_replies();

-- 5. Rechten (RLS)
alter table public.forum_threads enable row level security;
alter table public.forum_posts enable row level security;

drop policy if exists "Forum: leden lezen" on public.forum_threads;
create policy "Forum: leden lezen" on public.forum_threads for select to authenticated
  using (not hidden or author_id = auth.uid() or public.is_savour_admin());
drop policy if exists "Forum: leden plaatsen" on public.forum_threads;
create policy "Forum: leden plaatsen" on public.forum_threads for insert to authenticated
  with check (auth.uid() is not null);
drop policy if exists "Forum: eigen bericht of beheerder wijzigt" on public.forum_threads;
create policy "Forum: eigen bericht of beheerder wijzigt" on public.forum_threads for update to authenticated
  using (author_id = auth.uid() or public.is_savour_admin());
drop policy if exists "Forum: eigen bericht of beheerder verwijdert" on public.forum_threads;
create policy "Forum: eigen bericht of beheerder verwijdert" on public.forum_threads for delete to authenticated
  using (author_id = auth.uid() or public.is_savour_admin());

drop policy if exists "Forum: leden lezen reacties" on public.forum_posts;
create policy "Forum: leden lezen reacties" on public.forum_posts for select to authenticated
  using (
    (not hidden or author_id = auth.uid() or public.is_savour_admin())
    and exists (select 1 from public.forum_threads t where t.id = thread_id)
  );
drop policy if exists "Forum: leden reageren" on public.forum_posts;
create policy "Forum: leden reageren" on public.forum_posts for insert to authenticated
  with check (
    auth.uid() is not null
    and exists (
      select 1 from public.forum_threads t
      where t.id = thread_id and not t.hidden and (not t.locked or public.is_savour_admin())
    )
  );
drop policy if exists "Forum: eigen reactie of beheerder wijzigt" on public.forum_posts;
create policy "Forum: eigen reactie of beheerder wijzigt" on public.forum_posts for update to authenticated
  using (author_id = auth.uid() or public.is_savour_admin());
drop policy if exists "Forum: eigen reactie of beheerder verwijdert" on public.forum_posts;
create policy "Forum: eigen reactie of beheerder verwijdert" on public.forum_posts for delete to authenticated
  using (author_id = auth.uid() or public.is_savour_admin());

grant select, insert, update, delete on public.forum_threads, public.forum_posts to authenticated;
revoke all on public.forum_threads, public.forum_posts from anon;
