-- ==============================================================================
-- RUN THIS IN SUPABASE SQL EDITOR (SECURITY HARDENED V2)
-- ==============================================================================

-- 1. Create the table (if it doesn't exist)
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

-- 2. Enable Row Level Security (RLS)
alter table public.submissions enable row level security;

-- 3. DROP INSECURE POLICIES (Clean slate)
drop policy if exists "Enable insert for anon" on public.submissions;
drop policy if exists "Enable update for anon" on public.submissions;
drop policy if exists "Enable read for anon" on public.submissions;

-- 4. CREATE SECURE POLICIES

-- Policy A: Allow Insert (Write-Only)
-- Anonymous users can create new records, but cannot see or edit existing ones.
create policy "Enable insert for anon"
on public.submissions for insert
with check (true);

-- Policy B: Block Select/Update/Delete
-- (No policy created = Default Deny. This is what we want.)

-- 5. SECURE FUNCTION FOR UPDATES (RPC)
-- Instead of giving UPDATE permission on the table, we create a specific function
-- that allows *only* flipping the 'posterDownloaded' flag for a specific ID.

create or replace function mark_downloaded(sub_id uuid)
returns void
language plpgsql
security definer -- Runs with admin privileges
as $$
begin
  update public.submissions
  set "posterDownloaded" = true
  where id = sub_id;
end;
$$;

-- Grant permission to anonymous users to call this specific function
grant execute on function mark_downloaded(uuid) to anon;
grant execute on function mark_downloaded(uuid) to authenticated;
grant execute on function mark_downloaded(uuid) to service_role;
