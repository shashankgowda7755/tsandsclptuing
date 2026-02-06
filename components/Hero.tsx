import React from 'react';

interface HeroProps {
  onStart: () => void;
  onGroupRegister?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative h-[calc(100vh-8rem)] mt-32 w-full overflow-hidden flex flex-col items-center">
       {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
            src="/assets/hero_bg.png" 
            alt="Sand Sculpting Contest" 
            className="w-full h-full object-cover object-top" 
        />
        {/* Overlay for better text visibility if needed, though simpler is requested */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-start pt-24 text-center">
        
        {/* Badge */}
        <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm border border-white/50">
            <span className="text-teal-700 font-bold tracking-widest text-xs sm:text-sm uppercase">
                ENVIRONMENTAL INITIATIVE
            </span>
        </div>

        {/* Main Title */}
        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl text-midnight mb-2 tracking-tight leading-none uppercase drop-shadow-sm">
            SAND SCULPTING
        </h1>
        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl text-teal-700 mb-6 tracking-tight leading-none uppercase drop-shadow-sm">
            CONTEST
        </h1>

        {/* Subtitle */}
        <p className="text-midnight/80 text-lg sm:text-xl md:text-2xl font-medium mb-8 max-w-2xl leading-relaxed">
            Thank you for participating in the initiative
        </p>

        {/* Date & Location Removed as per request */}
        <div className="mb-12"></div>

        {/* CTA Button */}
        <button 
            onClick={onStart}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
        >
            Click here to download certificate
            <span className="material-icons-round ml-2 text-xl">download</span>
        </button>

      </div>
    </section>
  );
};