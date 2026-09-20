-- Preparation only: apply in a new Supabase project after reviewing FREE_SETUP.md.
-- No browser access to provider cache or request budgets.
create table public.research_projects (
 id uuid primary key,
 owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 title text not null check (length(title) between 1 and 300),
 data jsonb not null check (jsonb_typeof(data) = 'object' and octet_length(data::text) <= 2000000),
 revision bigint not null default 1,
 updated_at timestamptz not null default now()
);
alter table public.research_projects enable row level security;
create policy "Read own projects" on public.research_projects for select to authenticated using (owner_id = auth.uid());
create policy "Create own projects" on public.research_projects for insert to authenticated with check (owner_id = auth.uid());
create policy "Update own projects" on public.research_projects for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Delete own projects" on public.research_projects for delete to authenticated using (owner_id = auth.uid());
revoke all on public.research_projects from anon;
grant select, insert, update, delete on public.research_projects to authenticated;
create function public.guard_research_project() returns trigger language plpgsql set search_path = '' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(new.owner_id::text, 0));
 if TG_OP = 'INSERT' and (select count(*) from public.research_projects where owner_id = new.owner_id) >= 5 then
  raise exception 'Project limit reached';
 end if;
 if TG_OP = 'UPDATE' then
  if new.owner_id <> old.owner_id then raise exception 'Owner cannot change'; end if;
  new.revision := old.revision + 1;
 end if;
 new.updated_at := now();
 return new;
end $$;
create trigger guard_research_project before insert or update on public.research_projects for each row execute function public.guard_research_project();

create table public.paper_search_cache (cache_key text primary key, response jsonb not null, expires_at timestamptz not null);
alter table public.paper_search_cache enable row level security;
revoke all on public.paper_search_cache from anon, authenticated;
create table public.paper_search_budget (bucket text primary key, day date not null, used integer not null default 0);
alter table public.paper_search_budget enable row level security;
revoke all on public.paper_search_budget from anon, authenticated;
-- Atomic daily caps: 20 uncached searches per user, 100 total for this beta.
-- These are request caps, not a guarantee of provider credit consumption.
create function public.take_paper_search_budget(user_id uuid) returns boolean language plpgsql security definer set search_path = '' as $$
declare
 today date := (now() at time zone 'UTC')::date;
 global_used integer;
 user_used integer;
begin
 perform pg_advisory_xact_lock(73492761);
 insert into public.paper_search_budget values ('global', today, 0) on conflict do nothing;
 insert into public.paper_search_budget values (user_id::text, today, 0) on conflict do nothing;
 update public.paper_search_budget set used=0, day=today where bucket in ('global',user_id::text) and day<>today;
 select used into global_used from public.paper_search_budget where bucket='global';
 select used into user_used from public.paper_search_budget where bucket=user_id::text;
 if global_used >= 100 or user_used >= 20 then return false; end if;
 update public.paper_search_budget set used=used+1 where bucket in ('global',user_id::text);
 return true;
end $$;
revoke all on function public.take_paper_search_budget(uuid) from public, anon, authenticated;
grant execute on function public.take_paper_search_budget(uuid) to service_role;
