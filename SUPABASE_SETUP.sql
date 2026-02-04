-- ==============================================================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- ==============================================================================

-- 1. Create the table matching the JS 'Submission' object keys (camelCase quoted)
create table if not exists public.submissions (
  "id" uuid not null primary key,
  "schoolId" text,
  "schoolName" text,
  "studentName" text,
  "grade" text,
  "section" text,
  "phone" text,
  "email" text,
  "timestamp" text,
  "posterGenerated" boolean,
  "posterDownloaded" boolean,
  "optIn" boolean,
  "insertedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS) - Crucial for security
alter table public.submissions enable row level security;

-- 3. Create Policy: Allow anyone (anon) to INSERT data
create policy "Enable insert for anon"
on public.submissions for insert
with check (true);

-- 4. Create Policy: Allow anyone (anon) to UPDATE data (e.g. for marking 'posterDownloaded')
-- Note: In high-security apps, you'd restrict this, but for this public campaign it is standard.
create policy "Enable update for anon"
on public.submissions for update
using (true);

-- Optional: If you want to view data in a dashboard app later
create policy "Enable read for anon"
on public.submissions for select
using (true);
