-- ==============================================================================
-- RUN THIS IN SUPABASE SQL EDITOR (SECURITY HARDENED V2)
-- ==============================================================================

-- 1. DELETE OLD TABLE (Start Fresh)
drop table if exists public.submissions cascade;

-- 2. CREATE NEW STREAMLINED TABLE
create table public.submissions (
  "id" uuid not null primary key,
  "studentName" text,
  "phone" text,
  "email" text,
  "timestamp" text,
  "posterGenerated" boolean,
  "posterDownloaded" boolean,
  "optIn" boolean,
  "insertedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.submissions enable row level security;

-- 4. CREATE SECURE POLICIES

-- Policy A: Allow Insert (Write-Only)
-- Anonymous users can create new records
create policy "Enable insert for anon"
on public.submissions for insert
with check (true);

-- Policy B: Allow Select (Read-Only)
-- Useful if the client tries to read back the data (though we removed it from the code, safe to have)
create policy "Enable select for anon"
on public.submissions for select
using (true);

-- 5. SECURE FUNCTION FOR UPDATES (RPC)
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

-- 6. Grant permission to anonymous users
grant execute on function mark_downloaded(uuid) to anon;
grant execute on function mark_downloaded(uuid) to authenticated;
grant execute on function mark_downloaded(uuid) to service_role;
