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
      className={`relative aspect-[1080/1600] bg-white overflow-hidden text-gray-900 mx-auto shadow-sm ${className}`}
    >
      {console.log('🖼️ Poster Rendered:', { userData, photo: userData.photo ? 'Present' : 'Missing' })}

      {/* Layer 1: Background Image */}
      <img
        src="/assets/poster.png"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />

      {/* Layer 2: Dynamic User Photo */}
      <div
        className="absolute rounded-lg overflow-hidden z-10 flex items-center justify-center bg-gray-100/50"
        style={{
          // Adjusted: 'wider and less length'
          left: '4.9%',
          top: '16.8%',
          width: '55%',
          height: '34%'
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
        className="absolute z-10 flex items-center justify-start text-left"
        style={{
          // Shifted right to accommodate wider photo
          left: '55%', // was 52%
          top: '19%', 
          width: '45%',
          height: 'auto'
        }}
      >
        <h2
          className="text-white font-bold tracking-wide leading-tight px-1 uppercase"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: (userData.fullName || 'Ram Kumar').length > 20 ? '40px' : '55px',
            textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {userData.fullName || 'Ram Kumar'}
        </h2>
      </div>



    </div >
  );
};