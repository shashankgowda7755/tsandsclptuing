
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const QUEUE_KEY = 'offline_submission_queue';

export const Debug: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [queue, setQueue] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // 1. Check Queue
    const loadQueue = () => {
      const stored = localStorage.getItem(QUEUE_KEY);
      setQueue(stored ? JSON.parse(stored) : []);
    };
    loadQueue();
    const interval = setInterval(loadQueue, 2000);

    // 2. Check Connection
    checkConnection();

    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => setLogs(prev => [`${new Date().toLocaleTimeString()}: ${msg}`, ...prev]);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    try {
      if (!supabase) throw new Error("Supabase client not initialized");
      const { data, error } = await supabase.from('submissions').select('count').limit(1);
      if (error) throw error;
      setConnectionStatus('connected');
      addLog("Supabase connection OK");
    } catch (e: any) {
      setConnectionStatus('error');
      addLog(`Connection Failed: ${e.message}`);
    }
  };

  const forceSync = async () => {
   addLog("Starting Force Sync...");
   
   // Replicate logic from submissionQueue.ts exactly for testing
   if (!supabase) {
       addLog("No Supabase Client");
       return;
   }

   const stored = localStorage.getItem(QUEUE_KEY);
   const batch = stored ? JSON.parse(stored) : [];

   if (batch.length === 0) {
       addLog("Queue is empty.");
       return;
   }

   addLog(`Attempting to sync ${batch.length} items...`);

   const { error } = await supabase
      .from('submissions')
      .insert(batch, { ignoreDuplicates: true });

   if (error) {
       addLog(`Sync Error: ${error.message} (Code: ${error.code})`);
       console.error("DEBUG SYNC ERROR:", error);
   } else {
       addLog("Sync Success! Clearing LocalStorage queue.");
       localStorage.removeItem(QUEUE_KEY);
       setQueue([]);
   }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono text-sm pt-24">
      <button onClick={onBack} className="mb-4 text-white border border-white px-3 py-1 hover:bg-white hover:text-black">
        ← Back
      </button>

      <h1 className="text-xl font-bold mb-4 border-b border-green-800 pb-2">SYSTEM DEBUGGER</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <div className="mb-6">
                <h2 className="text-white mb-2">Supabase Connection</h2>
                <div className={`inline-block px-3 py-1 rounded ${connectionStatus === 'connected' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                    {connectionStatus.toUpperCase()}
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-white mb-2">Local Queue ({queue.length})</h2>
                <div className="bg-gray-900 p-4 rounded h-64 overflow-auto border border-gray-800">
                    {queue.length === 0 ? (
                        <span className="opacity-50">Queue is empty. Submissions are clearing successfully.</span>
                    ) : (
                        <pre>{JSON.stringify(queue, null, 2)}</pre>
                    )}
                </div>
            </div>

            <button 
                onClick={forceSync}
                className="bg-green-600 text-black font-bold px-6 py-3 rounded hover:bg-green-500 w-full"
            >
                FORCE SYNC QUEUE
            </button>
        </div>

        <div>
            <h2 className="text-white mb-2">Logs</h2>
            <div className="bg-gray-900 p-4 rounded h-[500px] overflow-auto border border-gray-800">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 border-b border-gray-800 pb-1">{log}</div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
