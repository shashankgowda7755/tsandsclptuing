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
// Google Apps Script URL from env
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

/**
 * Attempts to send queued submissions to Google Sheets via Apps Script.
 * Removes them from the queue only upon successful confirmation.
 */
export const processQueue = async () => {
  if (isSyncing) return;
  if (!GOOGLE_SCRIPT_URL) {
      console.warn("⚠️ VITE_GOOGLE_SCRIPT_URL not set in .env");
      return;
  }

  // 1. Snapshot the queue at the start of the process
  const batchToSync = getQueue();
  if (batchToSync.length === 0) return;

  isSyncing = true;

  try {
    console.log(`🔄 Syncing ${batchToSync.length} records to Google Sheets...`);

    // For Google Sheets Web App, we often need to send one by one if batching isn't explicitly handled 
    // in the GAS script I provided (which expects a single object or we'd need to loop there).
    // The previous GAS script I wrote expects `JSON.parse(e.postData.contents)` and processes ONE row.
    // So we will loop here.

    const successfulIds: string[] = [];

    for (const item of batchToSync) {
        try {
            // Using 'no-cors' mode is tricky because we can't read the response status, 
            // BUT standard POST to GAS execution often returns valid JSON if we use 'text/plain' 
            // Content-Type to avoid preflight issues in some browsers, though GAS supports CORS now.
            
            // Standard fetch
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                // Using text/plain prevents preflight OPTIONS request which GAS sometimes dislikes
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(item)
            });

            const result = await response.json();
            
            if (result.status === 'success') {
                successfulIds.push(item.id);
            } else {
                console.error(`❌ GAS Error for ${item.studentName}:`, result.message);
            }
        } catch (postErr) {
             console.error(`❌ Network/Fetch Error for ${item.studentName}:`, postErr);
        }
        
        // Slight delay
        await new Promise(r => setTimeout(r, 200));
    }

    // Remove only the ones that succeeded
    if (successfulIds.length > 0) {
      const currentQueue = getQueue();
      const remainingQueue = currentQueue.filter(item => !successfulIds.includes(item.id));
      saveQueue(remainingQueue);
      console.log(`✅ Successfully synced ${successfulIds.length} records to Google Sheets.`);
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
