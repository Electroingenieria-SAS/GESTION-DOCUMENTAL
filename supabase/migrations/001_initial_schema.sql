create extension if not exists pgcrypto;

create type public.app_role as enum ('super_admin','admin_documental','responsable_oficina','consulta');
create type public.archive_stage as enum ('Gestión','Central','Histórico');
create type public.expedient_status as enum ('Activo','Transferencia','Cerrado');

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'consulta',
  office text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.expedients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id),
  entity text not null,
  office text not null,
  process text,
  series text not null,
  subseries text not null,
  document_type text not null,
  description text not null,
  initial_date date,
  final_date date,
  folio_from integer,
  folio_to integer,
  folio_count integer generated always as (
    case when folio_from is not null and folio_to is not null then folio_to - folio_from + 1 end
  ) stored,
  box text,
  folder text,
  archive_stage public.archive_stage not null default 'Gestión',
  archive_stage_code text not null,
  trd_key text not null,
  status public.expedient_status not null default 'Activo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_dates check (final_date is null or initial_date is null or final_date >= initial_date),
  constraint valid_folios check (folio_to is null or folio_from is null or folio_to >= folio_from),
  constraint valid_stage_code check (
    (archive_stage='Gestión' and archive_stage_code='000') or
    (archive_stage='Central' and archive_stage_code='001') or
    (archive_stage='Histórico' and archive_stage_code='002')
  )
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.expedients enable row level security;
alter table public.audit_events enable row level security;

create or replace function public.current_role() returns public.app_role
language sql stable security definer set search_path=public as $$
  select coalesce((select role from public.profiles where user_id=auth.uid()), 'consulta'::public.app_role)
$$;

create policy "profiles_self_read" on public.profiles for select to authenticated
using (user_id=auth.uid() or public.current_role() in ('super_admin','admin_documental'));

create policy "profiles_admin_update" on public.profiles for update to authenticated
using (public.current_role() in ('super_admin','admin_documental'))
with check (public.current_role() in ('super_admin','admin_documental'));

create policy "expedients_read" on public.expedients for select to authenticated using (
  public.current_role() in ('super_admin','admin_documental','consulta') or
  (public.current_role()='responsable_oficina' and office=(select office from public.profiles where user_id=auth.uid()))
);

create policy "expedients_insert" on public.expedients for insert to authenticated with check (
  public.current_role() in ('super_admin','admin_documental') or
  (public.current_role()='responsable_oficina' and office=(select office from public.profiles where user_id=auth.uid()))
);

create policy "expedients_update" on public.expedients for update to authenticated using (
  public.current_role() in ('super_admin','admin_documental') or
  (public.current_role()='responsable_oficina' and office=(select office from public.profiles where user_id=auth.uid()))
) with check (
  public.current_role() in ('super_admin','admin_documental') or
  (public.current_role()='responsable_oficina' and office=(select office from public.profiles where user_id=auth.uid()))
);

create policy "audit_read_admin" on public.audit_events for select to authenticated
using (public.current_role() in ('super_admin','admin_documental'));

create policy "audit_insert_authenticated" on public.audit_events for insert to authenticated
with check (actor_id=auth.uid());

-- MFA: las operaciones críticas se implementarán mediante RPC o Edge Functions
-- y deberán exigir AAL2 antes de ejecutar mutaciones sensibles.
