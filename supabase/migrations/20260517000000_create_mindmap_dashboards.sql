create table if not exists public.mindmap_dashboards (
  id text primary key,
  file_name text not null unique,
  title text not null,
  category text not null check (category in ('cat-semi', 'cat-invest', 'cat-ai')),
  topic text,
  tags text[] not null default '{}',
  line_count integer not null default 0,
  char_count integer not null default 0,
  source text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_mindmap_dashboards_updated_at on public.mindmap_dashboards;
create trigger set_mindmap_dashboards_updated_at
before update on public.mindmap_dashboards
for each row
execute function public.set_updated_at();

alter table public.mindmap_dashboards enable row level security;

drop policy if exists "Public dashboard read" on public.mindmap_dashboards;
create policy "Public dashboard read"
on public.mindmap_dashboards
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated dashboard manage" on public.mindmap_dashboards;
create policy "Authenticated dashboard manage"
on public.mindmap_dashboards
for all
to authenticated
using (true)
with check (true);

