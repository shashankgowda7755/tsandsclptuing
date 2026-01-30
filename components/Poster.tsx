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
    >
      {console.log('🖼️ Poster Rendered:', { userData, photo: userData.photo ? 'Present' : 'Missing' })}

      {/* Layer 1: Background Image */}
      <img
        src="/assets/poster.png?v=2"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />

      {/* Layer 2: Dynamic User Photo */}
      <div
        className="absolute rounded-lg overflow-hidden z-10 flex items-center justify-center bg-gray-100/50"
        style={{
          // Adjusted: Extend 0.35% to right (Left 2.25%, W 46.85%)
          left: '2.25%',
          top: '16.8%',
          width: '46.85%',
          height: '41%'
        }}
      >
        {userData.photo ? (
          <img
            src={userData.photo}
            className="w-full h-full object-cover grayscale"
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
          left: '51%',
          top: '19.5%',
          width: '40%',
          height: 'auto'
        }}
      >
        {(() => {
          const name = userData.fullName || 'Ram Kumar';
          const [first, ...rest] = name.split(' ');
          const last = rest.join(' ');
          const isLongName = name.length > 20;

          return (
            <>
              <h2
                className="text-white font-bold tracking-wide leading-none px-1 uppercase"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 800,
                  fontSize: isLongName ? '18px' : '28px', // Increased size for better visibility
                  textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                  marginBottom: '2px'
                }}
              >
                {first}
              </h2>
              {last && (
                <h2
                  className="text-white font-bold tracking-wide leading-none px-1 uppercase"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 700,
                    fontSize: isLongName ? '14px' : '22px', // Slightly smaller for last name
                    textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {last}
                </h2>
              )}
            </>
          );
        })()}
      </div>



    </div >
  );
};