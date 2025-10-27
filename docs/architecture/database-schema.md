# Database Schema
```sql
-- Supabase / Postgres schema for collaboration inquiries
create table if not exists collaboration_inquiries (
  id uuid primary key default gen_random_uuid(),
  submitted_at timestamptz not null default now(),
  name text not null,
  organization text,
  email citext not null,
  inquiry_type text not null check (inquiry_type in ('collaboration','booking','press','other')),
  message text not null check (char_length(message) <= 2000),
  target_artist text,
  source_path text,
  consent_newsletter boolean not null default false,
  user_agent text,
  ip_hash text
);

create index if not exists idx_collab_email on collaboration_inquiries (email);

create table if not exists notify_opt_ins (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  campaign text not null,
  opted_at timestamptz not null default now(),
  metadata jsonb default '{}'::jsonb
);

create unique index if not exists idx_notify_unique on notify_opt_ins (email, campaign);
```
