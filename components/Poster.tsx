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
  const isPublic = school?.id === 'citizen';

  return (
    <div
      id={id || 'certificate-visual'}
      className={`relative ${isPublic ? 'aspect-[1080/1300]' : 'aspect-[1080/1600]'} bg-white overflow-hidden text-gray-900 mx-auto shadow-sm ${className}`}
    >
      {console.log('🖼️ Poster Rendered:', { school, userData, logoUrl: school?.logoUrl, photo: userData.photo ? 'Present' : 'Missing' })}

      {/* Layer 1: Background Image */}
      <img
        src={isPublic ? "/assets/PUBLIC.png" : "/assets/poster.png"}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
        onError={(e) => {
          // Fallback if public poster doesn't exist yet
          if (isPublic) {
            e.currentTarget.src = "/assets/poster.png";
          }
        }}
      />

      {/* Layer 1.5: School Logo - Hide for Public as they have a custom background */}
      {school && !isPublic && (school.posterLogoUrl || school.logoUrl || school.icon) && (
        <div
          className="absolute z-20 flex items-center justify-center p-1"
          style={{
            left: school.logoPosition?.left || '23.95%',
            top: school.logoPosition?.top || '85.29%',
            width: school.logoPosition?.width || '19.14%',
            height: school.logoPosition?.height || '5.94%'
          }}
        >
          {school.posterLogoUrl || school.logoUrl ? (
            <img src={school.posterLogoUrl || school.logoUrl} alt={school.name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-4xl filter drop-shadow-md">{school.icon}</span>
          )}
        </div>
      )}


      {/* Layer 2: Dynamic User Photo */}
      <div
        className="absolute rounded-full overflow-hidden z-10 flex items-center justify-center bg-gray-100/50"
        style={isPublic ? {
          // Public Poster Photo Coordinates (1080x1300)
          // X: 305.1px, Y: 401.7px, W: 400.3px, H: 401.2px
          left: '28.25%',
          top: '30.90%',
          width: '37.06%',
          height: '30.86%'
        } : {
          // Standard School Poster Photo Coordinates
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
        style={isPublic ? {
          // Public Poster Name - FORCE CENTER ALIGNMENT
          // Using standard centering technique instead of bounding box to ensure perfect center
          left: '50%',
          top: '65.25%',
          width: 'auto',
          minWidth: '60%', // Ensure enough space
          transform: 'translateX(-50%)', // Pivot precisely on center
          height: '5.51%'
        } : {
          // Standard School Poster Coordinates (1080x1600) - FORCE CENTER ALIGNMENT
          left: '50%',
          top: '61.29%',
          width: 'auto',
          minWidth: '60%',
          transform: 'translateX(-50%)',
          height: '6.04%'
        }}
      >
        <h2
          className="text-black font-bold tracking-wide leading-none w-full text-center px-1"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 550,
            whiteSpace: 'nowrap',
            // Public poster (1080x1300) gets smaller fonts than School poster (1080x1600)
            fontSize: isPublic
              ? ((userData.fullName || 'Ram Kumar').length > 20 ? '14px' : (userData.fullName || 'Ram Kumar').length > 13 ? '18px' : '24px')
              : ((userData.fullName || 'Ram Kumar').length > 20 ? '18px' : (userData.fullName || 'Ram Kumar').length > 13 ? '24px' : '30px')
          }}
        >
          {userData.fullName || 'Ram Kumar'}
        </h2>
      </div>

    </div >
  );
};