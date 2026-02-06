
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const QUEUE_KEY = 'offline_submission_queue';

// Google Apps Script URL (Hardcoded as requested for direct deployment)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqVLqizc9FiKoXzgtVhuDi2y_OAhZPC80dK_H4SNHLscJjms4KSLYDNdSDpB2ypzkt/exec";

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

    // 2. Check Connection check
    checkConnection();

    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => setLogs(prev => [`${new Date().toLocaleTimeString()}: ${msg}`, ...prev]);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    try {
      if (!GOOGLE_SCRIPT_URL) throw new Error("No VITE_GOOGLE_SCRIPT_URL in .env");
      
      // Simple ping (optional, or just assume connected if URL exists)
      // Since we can't easily GET the script without setup, we'll just check if URL is present
      // and maybe do a dummy fetch?
      
      setConnectionStatus('connected');
      addLog("Google Script configuration found.");
    } catch (e: any) {
      setConnectionStatus('error');
      addLog(`Config Error: ${e.message}`);
    }
  };

  const forceSync = async () => {
   addLog("Starting Force Sync to Google Sheets...");
   
   if (!GOOGLE_SCRIPT_URL) {
       addLog("Error: Missing Script URL");
       return;
   }

   const stored = localStorage.getItem(QUEUE_KEY);
   const batch = stored ? JSON.parse(stored) : [];

   if (batch.length === 0) {
       addLog("Queue is empty.");
       return;
   }

   addLog(`Processing ${batch.length} items...`);

   // Loop and send
   const successfulIds: string[] = [];

   for (const item of batch) {
       try {
           const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(item)
            });
            const result = await response.json();
            
            if (result.status === 'success') {
                addLog(`✅ Synced: ${item.studentName}`);
                successfulIds.push(item.id);
            } else {
                addLog(`❌ Failed: ${item.studentName} - ${result.message}`);
            }
       } catch (e: any) {
           addLog(`❌ Network Error: ${e.message}`);
       }
   }

   // Update queue
   if (successfulIds.length > 0) {
       const remaining = batch.filter((item: any) => !successfulIds.includes(item.id));
       localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
       setQueue(remaining);
       addLog("Queue updated.");
   }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono text-sm pt-24">
      <button onClick={onBack} className="mb-4 text-white border border-white px-3 py-1 hover:bg-white hover:text-black">
        ← Back
      </button>

      <h1 className="text-xl font-bold mb-4 border-b border-green-800 pb-2">GOOGLE SHEETS DEBUGGER</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <div className="mb-6">
                <h2 className="text-white mb-2">Connection Status</h2>
                <div className={`inline-block px-3 py-1 rounded ${connectionStatus === 'connected' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                    {connectionStatus.toUpperCase()}
                </div>
                <p className="text-xs mt-2 text-gray-500 truncate">Target: {GOOGLE_SCRIPT_URL}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-white mb-2">Local Queue ({queue.length})</h2>
                <div className="bg-gray-900 p-4 rounded h-64 overflow-auto border border-gray-800">
                    {queue.length === 0 ? (
                        <span className="opacity-50">Queue is empty.</span>
                    ) : (
                        <pre>{JSON.stringify(queue, null, 2)}</pre>
                    )}
                </div>
            </div>

            <button 
                onClick={forceSync}
                className="bg-green-600 text-black font-bold px-6 py-3 rounded hover:bg-green-500 w-full"
            >
                FORCE SYNC SCRIPT
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
