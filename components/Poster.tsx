import React from 'react';
import { UserData, Pledge, School } from '../types';

/* 
  POSTER COMPONENT - Uses image from public/assets/poster_bg.png
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
  return (
    <div
      id={id || 'certificate-visual'}
      className={`relative aspect-[1080/1600] bg-white overflow-hidden text-gray-900 mx-auto shadow-sm ${className}`}
    >

      {/* Layer 1: Background Image */}
      <img
        src="/assets/poster.png"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />

      {/* Layer 1.5: School Logo */}
      {school && (school.logoUrl || school.icon) && (
        <div
          className="absolute z-20 flex items-center justify-center p-1"
          style={{
            left: school.logoPosition?.left || '23.95%',
            top: school.logoPosition?.top || '85.29%',
            width: school.logoPosition?.width || '19.14%',
            height: school.logoPosition?.height || '5.94%'
          }}
        >
          {school.logoUrl ? (
            <img src={school.logoUrl} alt={school.name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-4xl filter drop-shadow-md">{school.icon}</span>
          )}
        </div>
      )}


      {/* Layer 2: Dynamic User Photo */}
      <div
        className="absolute rounded-full overflow-hidden z-10 flex items-center justify-center bg-gray-100/50"
        style={{
          left: '26.07%',
          top: '30.31%',
          width: '40.78%',
          height: '27.59%'
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
        className="absolute z-10 flex items-center justify-center"
        style={{
          left: '25.79%',
          top: '61.29%',
          width: '48.43%',
          height: '6.04%'
        }}
      >
        <h2
          className="text-black font-bold tracking-wide leading-none w-full text-center"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 550,
            whiteSpace: 'nowrap',
            fontSize: (userData.fullName || 'Ram Kumar').length > 20 ? '18px' : (userData.fullName || 'Ram Kumar').length > 13 ? '24px' : '30px'
          }}
        >
          {userData.fullName || 'Ram Kumar'}
        </h2>
      </div>

    </div >
  );
};