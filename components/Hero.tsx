import React from 'react';
import { Flag, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-tricolor-gradient selection:bg-orange-100 selection:text-orange-900 pt-20 pb-10">

      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indiaGreen/10 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[40%] w-[500px] h-[500px] bg-indiaNavy/5 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ffffff'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">

        {/* Main Heading */}
        <h1 className="font-display font-black tracking-tighter leading-[0.85] mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <span className="block text-5xl md:text-8xl text-stone-500 mb-2 tracking-tight">
            Pledge for
          </span>
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 text-6xl md:text-9xl font-black tracking-tight leading-none pb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-saffron via-stone-400 to-indiaGreen drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.5)]">
              my indian flag
            </span>
          </div>
        </h1>

        <p className="text-2xl md:text-3xl text-subText mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
          My promise for the Indian flag
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-indiaNavy text-white font-medium text-xl rounded-full shadow-xl shadow-stone-900/10 hover:shadow-2xl hover:shadow-stone-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          Pledge Now
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div >
  );
};