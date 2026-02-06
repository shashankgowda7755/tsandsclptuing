import React from 'react';
import { Flag, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onGroupRegister?: () => void;
}

interface SlideConfig {
  image: string;
  alignment: 'left' | 'center';
}

export const Hero: React.FC<HeroProps> = ({ onStart, onGroupRegister }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  
  const slides: SlideConfig[] = [
    { image: '/assets/turtle_hero_bg_3.png', alignment: 'left' },
    { image: '/assets/turtle_hero_bg_2.jpg', alignment: 'center' }, // "smaw int middle" interpreted as center
    { image: '/assets/turtle_hero_bg.jpeg', alignment: 'center' }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // Increased slightly for readability
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentSlideIndex];

  return (
    <section className="relative h-[105dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div key={slide.image} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img 
                src={slide.image} 
                alt={`Hero Background ${index + 1}`} 
                className="absolute inset-0 w-full h-full object-cover" 
            />
            {/* Dynamic overlay based on alignment */}
            <div className={`absolute inset-0 ${
                slide.alignment === 'left' 
                ? 'bg-gradient-to-r from-midnight/70 via-midnight/40 to-transparent' 
                : 'bg-gradient-to-br from-midnight/40 via-blue-900/20 to-transparent'
            }`}></div>
          </div>
        ))}
      </div>

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 transition-all duration-1000 ${
          currentSlide.alignment === 'left' ? 'text-left' : 'text-center'
      }`}>
        <div className={`w-full ${currentSlide.alignment === 'left' ? 'max-w-3xl' : 'max-w-4xl mx-auto'}`}>
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-xs font-bold tracking-wider mb-6 uppercase animate-pulse">
                Olive Ridley Conservation Season 2026
            </span>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-2xl">
                Saving Our<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-teal-200">Sea Turtles.</span>
            </h1>
                Join Chennai's oldest community-led conservation effort. Patrolling Marina to Besant Nagar.
            
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${currentSlide.alignment === 'center' ? 'justify-center' : 'justify-start'}`}>
                <button 
                    onClick={onStart}
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold rounded-full text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
                >
                    Download Certificate
                    <span className="material-icons-round ml-2 text-lg sm:text-xl">download</span>
                </button>

            </div>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce cursor-pointer hover:text-white transition-colors"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="material-icons-round text-3xl">keyboard_arrow_down</span>
      </div>
    </section>
  );
};