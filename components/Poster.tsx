import React from 'react';
import { UserData, Pledge, School } from '../types';

/* 
  POSTER COMPONENT - Uses image from public/assets/poster.png
  The image path is simple (no spaces) to ensure it works in production.
*/

interface PosterProps {
  id?: string;
  userData: UserData;
  school?: School | null;
  pledge?: Pledge;
  className?: string;
  showPlaceholderText?: boolean;
}

export const Poster: React.FC<PosterProps> = ({ id, userData, school, className = '', showPlaceholderText = true }) => {
  // Enforcing standard poster style regardless of input
  
  return (
    <div
      id={id || 'certificate-visual'}
      className={`relative aspect-[1455/2000] bg-white overflow-hidden text-gray-900 mx-auto shadow-sm ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      {console.log('🖼️ Poster Rendered:', { userData, photo: userData.photo ? 'Present' : 'Missing' })}

      {/* Layer 1: Background Image */}
      <img
        src="/assets/poster.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />

      {/* Layer 2: Dynamic User Photo */}
      <div
        className="absolute rounded-full overflow-hidden z-10 flex items-center justify-center bg-gray-100/50"
        style={{
          // Adjusted: Extend 0.35% to right (Left 2.25%, W 46.85%)
          left: '6.5%',
          top: '22.6%',
          width: '43%',
          aspectRatio: '1 / 1' // Forces a perfect circle based on width
        }}
      >
        {userData.photo ? (
          <img
            src={userData.photo}
            className="w-full h-full object-cover"
            alt="User Photo"
          />
        ) : (
          showPlaceholderText && (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-center p-4">
              <span className="text-gray-500 font-bold text-2xl leading-tight">Please add your photo</span>
            </div>
          )
        )}
      </div>

      {/* Layer 3: Dynamic User Name */}
      <div
        className="absolute z-10 flex flex-col items-start justify-center text-left"
        style={{
          // Shifted left and up to overlay 'HAFIZ KHAN' exactly
          left: '7%',
          top: '62%',
          width: '29.3%',
          height: 'auto'
        }}
      >
        {(() => {
          const name = userData.fullName || 'Ram Kumar';
          return (
             <h2
               className="text-black font-bold tracking-wide leading-none px-1 uppercase"
               style={{
                 fontFamily: '"Montserrat", sans-serif',
                 fontWeight: 800,
                 fontSize: '4cqi', // ~14px at 350px width, ~58px at 1455px width
                 textShadow: '0px 0.5cqi 1cqi rgba(0,0,0,0.5)',
                 marginBottom: '0',
                 whiteSpace: 'nowrap'
               }}
             >
               DEAR {name}
             </h2>
          );
        })()}
      </div>



    </div >
  );
};