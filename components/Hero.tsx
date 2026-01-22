import React from 'react';
import { Flag, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-white selection:bg-orange-100 selection:text-orange-900 pt-20 pb-10">

      {/* Soft Gradient Background (Reference Match) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #FFF0E5 0%, #FFFFFF 45%, #E6F4EA 100%)' }} />

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">

        {/* Main Heading */}
        <h1 className="font-display font-black tracking-tighter leading-[0.85] mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <span className="block text-5xl md:text-8xl text-stone-700 mb-4 tracking-tight font-bold">
            Pledge for
          </span>
          <div className="flex justify-center gap-x-2 md:gap-x-4 text-5xl md:text-7xl lg:text-[10rem] font-black tracking-wide leading-none pb-6 whitespace-nowrap">
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(180deg, #FF671F 0%, #FFFFFF 53%, #046A38 100%)',
              WebkitTextStroke: '2px #1c1917',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              paddingBottom: '0.1em'
            }}>
              My Indian Flag
            </span>
          </div>
        </h1>

        <p className="text-2xl md:text-3xl text-stone-600 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
          My promise for the Indian flag
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-saffron to-[#f97316] text-white font-bold text-xl rounded-full shadow-2xl shadow-saffron/30 hover:shadow-saffron/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          Pledge Now
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>

      </div>
    </div >
  );
};