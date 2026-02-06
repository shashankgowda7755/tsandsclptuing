import { Submission } from '../types';
import { supabase } from './supabaseClient';

const QUEUE_KEY = 'offline_submission_queue';

/**
 * Adds a submission to the local offline queue.
 * This guarantees no data loss even if the network is down.
 */
export const enqueueSubmission = (submission: Submission) => {
  try {
    const currentQueue = getQueue();
    // Avoid duplicates if possible
    if (!currentQueue.some(s => s.id === submission.id)) {
      currentQueue.push(submission);
      saveQueue(currentQueue);
      console.log(`📥 Queued submission: ${submission.studentName}`);
    }

    // Trigger immediate sync attempt if online
    if (navigator.onLine) {
      processQueue();
    }
  } catch (e) {
    console.error("Queue Error:", e);
  }
};

/**
 * Retrieves current queue from LocalStorage
 */
const getQueue = (): Submission[] => {
  try {
    const stored = localStorage.getItem(QUEUE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Saves queue to LocalStorage
 */
const saveQueue = (queue: Submission[]) => {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

let isSyncing = false;

/**
 * Attempts to send queued submissions to Supabase.
 * Removes them from the queue only upon successful confirmation.
 */
export const processQueue = async () => {
  if (isSyncing) return;
  if (!supabase) {
      // Supabase not configured (e.g. missing env vars), just return.
      return;
  }

  // 1. Snapshot the queue at the start of the process
  const batchToSync = getQueue();
  if (batchToSync.length === 0) return;

  isSyncing = true;
  console.log(`🔄 Syncing ${batchToSync.length} records to Supabase...`);

  try {
    // Attempt Batch Insert
    // We do NOT use .select() here to comply with INSERT-only RLS policy for anonymous users.
    const { error: batchError } = await supabase
        .from('submissions')
        .insert(batchToSync);

    if (!batchError) {
        // Success!
        saveQueue([]);
        console.log(`✅ Successfully synced ${batchToSync.length} records.`);
    } else {
        console.warn("⚠️ Batch sync failed, switching to sequential mode:", batchError.message);

        // Sequential Fallback (Robustness Strategy)
        const successfulIds: string[] = [];

        for (const item of batchToSync) {
            // Insert individually
            const { error: singleError } = await supabase
                .from('submissions')
                .insert([item]);
            
            if (!singleError) {
                successfulIds.push(item.id);
            } else {
                // If error is duplicate key (Postgres code 23505), we treat it as success (idempotency)
                if (singleError.code === '23505') {
                    console.log(`ℹ️ Record ${item.id} already exists. Skipping.`);
                    successfulIds.push(item.id);
                } else {
                    console.error(`❌ Sync failed for ${item.studentName}:`, singleError.message);
                }
            }
            // Slight delay to prevent rate limiting if many fail
            // await new Promise(r => setTimeout(r, 50));
        }
        
        // Update Queue with what succeeded
        if (successfulIds.length > 0) {
            const currentQueue = getQueue();
            const remainingQueue = currentQueue.filter(item => !successfulIds.includes(item.id));
            saveQueue(remainingQueue);
            console.log(`✅ Recovered: Synced ${successfulIds.length} records.`);
        }
    }

  } catch (err) {
    console.error('❌ Sync Exception:', err);
  } finally {
    isSyncing = false;
  }
};

/**
 * Starts the background sync process.
 * Call this once when the app mounts.
 * Returns a cleanup function.
 */
export const startQueueSync = (intervalMs = 10000) => {
  // Run on startup
  processQueue();

  // Set up interval
  const intervalId = setInterval(() => {
    if (navigator.onLine) {
      processQueue();
    }
  }, intervalMs);

  const handleOnline = () => {
    console.log("🌐 Back online! Syncing...");
    processQueue();
  };

  // Also listen for online status
  window.addEventListener('online', handleOnline);

  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('online', handleOnline);
  };
};
