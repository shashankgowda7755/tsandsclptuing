import React, { useState, useRef, useEffect } from 'react';
import { UserData } from '../types';
import { useApp } from '../context/AppContext';
import { Poster } from './Poster';
import { Download, Share2, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { DB } from '../services/db';

interface SuccessProps {
  userData: UserData;
  onReset: () => void;
}

export const Success: React.FC<SuccessProps> = ({ userData, onReset }) => {
  const { selectedSchool } = useApp();
  const posterRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // One-time submission lock
  const hasSubmitted = useRef(false);

  // ========================================
  // SUBMIT TO GOOGLE SHEETS - ONCE ON MOUNT
  // ========================================
  useEffect(() => {
    if (!hasSubmitted.current && selectedSchool) {
      hasSubmitted.current = true;

      const studentData = {
        name: userData.fullName,
        grade: userData.class,
        section: userData.section,
        phone: `${userData.countryCode} ${userData.phone}`,
        email: userData.email,
        message: 'I Pledge to honor the National Flag',
        photoUrl: userData.photo,
        optIn: userData.optInSimilarEvents
      };

      // Async submission
      DB.submitForm(selectedSchool.id, studentData)
        .then(() => console.log("✅ Data submitted to Google Sheets"))
        .catch(e => console.error("❌ Submission error:", e));
    }
  }, []); // Empty deps = runs once on mount

  // 3. THE GENERATION LOGIC (The "Invisible Clone" Strategy)
  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!posterRef.current || !(window as any).html2canvas) return null;

    try {
      // A. Select the element we want to capture (the visible poster)
      const elementToCapture = posterRef.current;

      // B. Clone it (Create an invisible copy to manipulate)
      // We cast to HTMLElement to access style properties easily
      const clone = elementToCapture.cloneNode(true) as HTMLElement;

      // C. Force High-Res Dimensions on the Clone
      // This ensures the download is always HD (800px width as per snippet), 
      // even if the user is on a small mobile screen.
      // C. Force High-Res Dimensions on the Clone - User Requested 1500x1600
      clone.style.position = 'fixed';
      clone.style.top = '-10000px';   // Hide it off-screen
      clone.style.left = '-10000px';
      
      // Set to 1455px width as requested
      clone.style.width = '1455px';    

      // Set to 2000px height as requested
      clone.style.height = '2000px';
      
      clone.style.transform = 'none'; // Remove any CSS scaling
      clone.style.margin = '0';
      clone.style.boxShadow = 'none';
      clone.style.borderRadius = '0'; // Ensure no rounded corners on the output image

      // Fix text size for the HD clone (since we forced width to 800px)
      // The snippet specifically sets h2 to 32px
      const nameElement = clone.querySelector('h2');
      if (nameElement) {
        // Updated logic: Increase size to match 1080px width
        // Base width 1080px -> Font ~75px
        const nameLength = userData.fullName.length;
        nameElement.style.fontSize = nameLength > 20 ? '45px' : nameLength > 13 ? '60px' : '75px';
        nameElement.style.whiteSpace = 'nowrap';
        nameElement.style.fontWeight = '550';
        nameElement.style.textAlign = 'center';
        nameElement.style.fontFamily = '"Montserrat", sans-serif';

        // Fix positioning: Move to center and slightly up (57%) as per user request
        const nameContainer = nameElement.parentElement;
        if (nameContainer) {
          // We no longer manually override position here.
          // Poster.tsx now handles specific layouts (Public vs School) correctly.
          // nameContainer.style.width = '100%';
          // nameContainer.style.left = '0';
          // nameContainer.style.top = '59%'; 
        }
      }

      document.body.appendChild(clone);

      // Wait a moment for images in clone to resolve (sometimes needed for Safari)
      await new Promise(resolve => setTimeout(resolve, 100));

      // D. Render the Clone to an Image using html2canvas
      const canvas = await (window as any).html2canvas(clone, {
        scale: 2,               // 2x Scale for Retina/Crisp quality
        useCORS: true,          // Allow external images
        backgroundColor: null   // Transparent background if needed
      });

      // F. Cleanup (Remove the invisible clone)
      document.body.removeChild(clone);

      return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

    } catch (err) {
      console.error("Error generating image:", err);
      // Try to cleanup if clone was appended
      const clone = document.body.lastElementChild;
      if (clone && (clone as HTMLElement).style?.top === '-10000px') {
        document.body.removeChild(clone);
      }
      return null;
    }
  };

  const handleDownload = async () => {
    try {
      if (!userData?.fullName) {
        onReset(); // Go back if no data
        return;
      }

      setIsProcessing(true);
      
      // 1. Generate the Image
      const blob = await generateImageBlob(); // Renamed from generateImage() to match existing
      if (!blob) throw new Error('Failed to generate image');
      
      // 2. Create Download Link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Turtle_Pledge_${userData.fullName.replace(/\s+/g, '_')}.png`; // Updated filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Cleanup

      setIsProcessing(false); // Renamed from setIsGenerating

    } catch (error) {
      console.error('Download error:', error);
      setIsProcessing(false); // Renamed from setIsGenerating
      alert('Could not download image. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      if (!userData?.fullName) return;

      setIsProcessing(true); // Renamed from setIsGenerating

      const blob = await generateImageBlob(); // Renamed from generateImage() to match existing
      if (!blob) throw new Error('Failed to capture image');

      const file = new File([blob], `turtle_pledge.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Turtle Pledge', // Updated title
          text: `I’ve taken the pledge to protect and conserve our sea turtles.\nI invite you to take the pledge here:\nhttps://saveaturtle.in/\n\n#SaveATurtle #TurtlePledge`, // Updated text
        });
      } else {
        // Fallback
        alert('Sharing is not supported on this browser/device.'); // Updated alert
      }
      setIsProcessing(false); // Renamed from setIsGenerating
    } catch (error) {
      console.error('Share error:', error);
      setIsProcessing(false); // Renamed from setIsGenerating
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20 pb-12 px-4 flex flex-col items-center">

      <div className="w-full max-w-lg flex flex-col items-center text-center animate-fade-in">

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          {/* Replaced CheckCircle with material-icons-round */}
          <span className="material-icons-round text-4xl text-green-600">volunteer_activism</span>
        </div>

        <h1 className="text-3xl font-display font-bold text-indiaNavy mb-2">Pledge Taken! 🐢</h1> {/* Updated emoji */}
        <p className="text-stone-500 mb-8">
          You have successfully pledged to protect our marine life. {/* Updated text */}
        </p>

        {/* Visible Preview Area */}
        {/* We wrap the Poster in a container that controls its width on screen */}
        <div className="relative mb-8 w-full max-w-[350px] shadow-xl rounded-none md:rounded-lg overflow-hidden border border-gray-200">
          {/* We attach the ref here to capture this DOM structure */}
          <div ref={posterRef}>
            <Poster userData={userData} school={selectedSchool} showPlaceholderText={false} />
          </div>

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-2" />
                <span className="text-xs font-bold text-orange-600">GENERATING...</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="w-full space-y-3">
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="flex-1 py-4 bg-stone-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-stone-900 transition-colors disabled:opacity-50"
            >
              <Download size={20} /> Download
            </button>
            <button
              onClick={handleShare}
              disabled={isProcessing}
              className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              <Share2 size={20} /> Share
            </button>
          </div>

          <button
            onClick={onReset}
            className="w-full py-3 bg-white border-2 border-indiaNavy text-indiaNavy font-bold text-sm hover:bg-indiaNavy hover:text-white flex items-center justify-center gap-2 mt-4 rounded-xl transition-all"
          >
            <RefreshCw size={16} /> RETURN HOME
          </button>
        </div>

      </div>
    </div>
  );
};