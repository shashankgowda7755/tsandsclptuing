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

    // We use upsert to handle potential duplicate retries gracefully.
    // ignoreDuplicates: true means if ID exists, do nothing (idempotent).
    const { error } = await supabase
      .from('submissions')
      .upsert(batchToSync, { onConflict: 'id', ignoreDuplicates: true });

    if (error) {
      console.error('❌ Supabase Sync Error:', error);
      // If error, we keep data in queue to retry later
    } else {
      console.log(`✅ Successfully synced ${batchToSync.length} records!`);

      // 2. Remove ONLY the items we successfully synced.
      // We must read the queue again because new items might have been added
      // while the network request was in flight.
      const currentQueue = getQueue();
      const syncedIds = new Set(batchToSync.map(s => s.id));

      const remainingQueue = currentQueue.filter(item => !syncedIds.has(item.id));
      saveQueue(remainingQueue);
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
