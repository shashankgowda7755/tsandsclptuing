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
  if (isSyncing || !supabase) return;

  // 1. Snapshot the queue at the start of the process
  const batchToSync = getQueue();
  if (batchToSync.length === 0) return;

  isSyncing = true;

  try {
    console.log(`🔄 Syncing ${batchToSync.length} records to Supabase...`);

    // SECURITY & RELIABILITY FIX:
    // 1. We removed .select() because RLS 'INSERT ONLY' policy forbids returning data.
    //    Using .select() was causing the sync to fail even if the insert worked.
    // 2. We use 'ignoreDuplicates: true' to safely handle retries without needing 'upsert'
    //    (which requires permissions we don't have).

    const { error } = await supabase
      .from('submissions')
      .insert(batchToSync, { ignoreDuplicates: true });

    if (!error) {
      // Success on batch
      markBatchAsSynced(batchToSync);
    } else {
      console.warn('⚠️ Batch sync failed, attempting sequential sync:', error.message);

      // 3. Fallback: Sequential Sync
      // If batch fails (e.g. payload issue), try one by one to save as much as possible.
      const successfulIds: string[] = [];

      for (const item of batchToSync) {
        // Slight delay to prevent rate limiting if we have many
        await new Promise(r => setTimeout(r, 100));

        const { error: singleError } = await supabase
          .from('submissions')
          .insert(item, { ignoreDuplicates: true });

        if (!singleError) {
          successfulIds.push(item.id);
        } else {
          console.error(`❌ Failed to sync ${item.studentName} (${item.id}):`, singleError.message);
        }
      }

      // Remove only the ones that succeeded
      if (successfulIds.length > 0) {
        const currentQueue = getQueue();
        // Keep items that were NOT in the successful list
        const remainingQueue = currentQueue.filter(item => !successfulIds.includes(item.id));
        saveQueue(remainingQueue);
        console.log(`✅ Recovered: Successfully synced ${successfulIds.length} records individually.`);
      }
    }

  } catch (err) {
    console.error('❌ Sync Exception:', err);
  } finally {
    isSyncing = false;
  }
};

const markBatchAsSynced = (batch: Submission[]) => {
      console.log(`✅ Successfully synced ${batch.length} records!`);

      // 2. Remove ONLY the items we successfully synced.
      const currentQueue = getQueue();
      const syncedIds = new Set(batch.map(s => s.id));

      const remainingQueue = currentQueue.filter(item => !syncedIds.has(item.id));
      saveQueue(remainingQueue);
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
