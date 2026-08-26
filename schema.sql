-- =======================================================
-- DDL STRUTTURA TABELLE E POLITICHE DI SICUREZZA (RLS)
-- Portale "Val di Scalve" - Supabase Database Schema
-- =======================================================

-- 1. TABELLA LUOGHI (PLACES)
create table if not exists places (
  id text primary key,
  category text,
  municipality text,
  image text,
  coordinates text,
  map_url text,
  external_link_url text,
  external_link_label jsonb,
  rating numeric,
  featured boolean,
  title jsonb,
  description jsonb,
  practical_info jsonb
);

-- 2. TABELLA EVENTI (EVENTS)
create table if not exists events (
  id text primary key,
  date text,
  time text,
  location text,
  municipality text,
  image text,
  external_link_url text,
  external_link_label jsonb,
  organizer text,
  title jsonb,
  description jsonb
);

-- 3. ABILITAZIONE ROW LEVEL SECURITY (RLS)
alter table places enable row level security;
alter table events enable row level security;

-- 4. POLITICHE DI SICUREZZA (RLS)
-- Lettura pubblica per tutti i visitatori (Turisti)
drop policy if exists "Lettura pubblica luoghi" on places;
create policy "Lettura pubblica luoghi" on places for select using (true);

drop policy if exists "Lettura pubblica eventi" on events;
create policy "Lettura pubblica eventi" on events for select using (true);

-- Scrittura/Modifica/Eliminazione riservata agli Amministratori Autenticati LATO BACKEND
drop policy if exists "Modifica luoghi admin" on places;
create policy "Modifica luoghi admin" on places for all using (auth.role() = 'authenticated');

drop policy if exists "Modifica eventi admin" on events;
create policy "Modifica eventi admin" on events for all using (auth.role() = 'authenticated');
