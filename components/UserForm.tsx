import React, { useState, useRef, useEffect } from 'react';
import { UserData } from '../types';
import { useApp } from '../context/AppContext';
import { DB } from '../services/db';
import { Upload, X, ChevronRight, Camera, Crop, Pencil, Mail, ChevronDown } from 'lucide-react';
import { COUNTRY_CODES } from '../utils/countries';

interface UserFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ userData, setUserData, onBack, onContinue }) => {
  const { selectedSchool, setCurrentSubmissionId } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cropperImageRef = useRef<HTMLImageElement>(null);

  const [error, setError] = useState<string>('');

  // Modal States
  const [showCamera, setShowCamera] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  // Temporary image storage for cropping
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [cropper, setCropper] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const submittingLock = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Photo Input Handlers ---
  // ... (Lines 33-172 remain unchanged, we skip to handleContinue)

  const handleContinue = async () => {
    if (isFormValid() && !isSubmitting && !submittingLock.current) {
      submittingLock.current = true;
      setIsSubmitting(true);
      console.log('📝 Form Continue Clicked');
      console.log('👤 User Data:', userData);
      console.log('🏫 Selected School:', selectedSchool);

      // Just store data locally and proceed to next step
      // Actual submission to Google Sheets will happen on Download
      try {
        // Generate a temporary ID for this session
        const tempId = `temp-${Date.now()}`;
        setCurrentSubmissionId(tempId);

        // Small delay for UX (button animation)
        await new Promise(resolve => setTimeout(resolve, 300));

        onContinue();
      } catch (e) {
        console.error("Error:", e);
        onContinue();
      } finally {
        submittingLock.current = false;
        setIsSubmitting(false);
      }
    } else if (!isFormValid()) {
      setError('Please fill all fields and add a photo to continue.');
    }
  };

  return (
    <div className="min-h-screen bg-canvas pt-20 pb-12 px-4 flex flex-col items-center justify-center">
      {/* ... (Lines 212-404 remain unchanged) ... */}

      {/* Continue Button - Floating/Sticky or Static */}
      <div className="pt-4">
        <button
          onClick={handleContinue}
          disabled={!isFormValid() || isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg transform active:scale-[0.98] ${isFormValid() && !isSubmitting
            ? 'bg-gradient-to-r from-saffron to-[#f97316] text-white shadow-saffron/30 hover:shadow-saffron/40 hover:-translate-y-1'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
            }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>Continue <ChevronRight size={20} /></>
          )}
        </button>
      </div>

    </div>
        </div >
      </div >

  {/* --- CAMERA MODAL (Unchanged Logic, just wrapper style tweak) --- */ }
{
  showCamera && (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-black rounded-2xl overflow-hidden aspect-[3/4] md:aspect-video flex items-center justify-center border border-stone-800">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/20"></div>

        {/* Controls */}
        <div className="absolute bottom-6 w-full flex items-center justify-center gap-8">
          <button
            onClick={stopCamera}
            className="w-12 h-12 rounded-full bg-stone-800 text-white flex items-center justify-center hover:bg-stone-700 transition-colors"
          >
            <X size={20} />
          </button>
          <button
            onClick={capturePhoto}
            className="w-16 h-16 rounded-full bg-white border-4 border-stone-300 flex items-center justify-center hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-sky-500"></div>
          </button>
          <div className="w-12"></div>
        </div>
      </div>
      <p className="text-white mt-4 text-sm font-medium opacity-80">Position your face within the frame</p>
    </div>
  )
}

{/* --- CROPPER MODAL (Unchanged Logic, consistent styling) --- */ }
{
  showCropper && tempImage && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <Crop size={20} className="text-sky-500" />
            <h3 className="font-bold text-lg text-slate-800">Adjust Photo</h3>
          </div>
          <button onClick={cancelCrop} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>
        <div className="relative flex-1 bg-slate-900 overflow-hidden min-h-[300px]">
          <img
            ref={cropperImageRef}
            src={tempImage}
            alt="Crop Preview"
            className="max-w-full opacity-0"
          />
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 z-10">
          <button
            onClick={cancelCrop}
            className="px-6 py-2.5 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveCrop}
            className="px-6 py-2.5 bg-indiaNavy hover:bg-indiaNavy/90 text-white font-bold rounded-xl shadow-lg shadow-indiaNavy/20 transition-colors"
          >
            Save Photo
          </button>
        </div>
      </div>
    </div>
  )
}

    </div >
  );
};