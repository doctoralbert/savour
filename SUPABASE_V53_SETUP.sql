-- Savour v53: persistent theme preference per profile.
alter table public.profiles add column if not exists theme text not null default 'dark';
update public.profiles set theme='dark' where theme is null or theme not in ('dark','light');
