import React from 'react';

interface HeroProps {
  onStart: () => void;
  onGroupRegister?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-end pb-20">
       {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
            src="/assets/sand_sculpture_poster.png" 
            alt="Sand Sculpting Contest" 
            className="w-full h-full object-cover" 
        />
        {/* Overlay for better text visibility if needed, though simpler is requested */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <button 
            onClick={onStart}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
        >
            Download Certificate
            <span className="material-icons-round ml-2 text-xl">download</span>
        </button>
      </div>
    </section>
  );
};