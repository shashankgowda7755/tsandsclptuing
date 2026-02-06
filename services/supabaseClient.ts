import { createClient } from '@supabase/supabase-js';

// Access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single instance of the Supabase client
// We add 'auth: { persistSession: false }' because for anonymous public submissions,
// we often don't need to persist a session, which can sometimes cause issues if localStorage is wonky.
export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    })
  : null;

if (!supabase) {
  console.warn('⚠️ Supabase credentials not found. Offline queue will persist but not sync.');
}
