-- Community: ongelezen reacties in je eigen threads (2026-11-10). Savour onthoudt per lid tot wanneer hij een
-- thread heeft gelezen; bij het menu-item Community staat het aantal nieuwe reacties van anderen in threads die
-- hij zelf is begonnen. Alleen je eigen leesstand; niemand anders kan die zien.
-- Veilig om opnieuw te draaien. Vereist supabase/2026-11-10-community-forum.sql.

create table if not exists public.forum_reads (
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  thread_id uuid not null references public.forum_threads (id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (user_id, thread_id)
);
alter table public.forum_reads enable row level security;

drop policy if exists "Forum: eigen leesstand" on public.forum_reads;
create policy "Forum: eigen leesstand" on public.forum_reads for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, update, delete on public.forum_reads to authenticated;
revoke all on public.forum_reads from anon;

-- Thread gelezen: nu.
create or replace function public.savour_forum_mark_read(_thread uuid)
returns void
language sql
security invoker
set search_path = public
as $$
  insert into public.forum_reads (user_id, thread_id, read_at) values (auth.uid(), _thread, now())
  on conflict (user_id, thread_id) do update set read_at = now();
$$;

-- Aantal nieuwe reacties van anderen in je eigen threads, sinds je die thread het laatst opende.
create or replace function public.savour_forum_unread()
returns integer
language sql
stable
security invoker
set search_path = public
as $$
  select count(*)::integer
  from public.forum_posts p
  join public.forum_threads t on t.id = p.thread_id
  left join public.forum_reads r on r.thread_id = t.id and r.user_id = auth.uid()
  where t.author_id = auth.uid()
    and not t.hidden
    and not p.hidden
    and p.author_id is distinct from auth.uid()
    and p.created_at > coalesce(r.read_at, t.created_at);
$$;

revoke all on function public.savour_forum_mark_read(uuid) from public, anon;
revoke all on function public.savour_forum_unread() from public, anon;
grant execute on function public.savour_forum_mark_read(uuid) to authenticated;
grant execute on function public.savour_forum_unread() to authenticated;
