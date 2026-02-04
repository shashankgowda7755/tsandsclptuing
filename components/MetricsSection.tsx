import React, { useEffect, useState, useRef } from 'react';

// Custom Hook for Count Up Animation
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

// Custom Hook for Intersection Observer (View Detection)
const useInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Trigger only once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return { ref, isInView };
};

export const MetricsSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  
  // Staggered counters
  const yearsCount = useCountUp(35, 2000, isInView);
  const volunteersCount = useCountUp(10000, 2500, isInView); // treating 10k as 10000 for calc
  const hatchlingsCount = useCountUp(200000, 3000, isInView);
  const distanceCount = useCountUp(14, 1500, isInView);

  return (
    <section ref={ref} className="bg-[#0B1221] py-20 px-4 md:px-8 lg:px-16 text-white min-h-[600px] flex items-center justify-center font-sans border-t border-white/5" id="impact">
      <div className={`max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Left Content */}
        <div>
          <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4 block animate-pulse">Restored</span>
          <h2 className="text-4xl md:text-5xl font-medium text-slate-200 mb-8">Coastal Conservation</h2>
          
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display font-bold text-7xl md:text-8xl text-white tabular-nums">
              {yearsCount}
            </span>
            <span className="text-3xl md:text-4xl font-bold text-emerald-500">years</span>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
            Over three decades of persistent dedication to restoring the natural beauty of our shores and protecting the Olive Ridley turtle.
          </p>

          <button className="bg-slate-200 text-slate-900 px-8 py-4 rounded-full font-bold text-sm md:text-base flex items-center gap-2 hover:bg-white transition-colors">
            Become a Volunteer
            <span className="material-icons-round text-lg">arrow_forward</span>
          </button>
        </div>

        {/* Right Stats Card */}
        <div className="bg-[#151F32] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-white/5 shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <span className="material-icons-round text-9xl text-white">volunteer_activism</span>
           </div>

           <div className="space-y-12 relative z-10">
             
             {/* Stat 1 */}
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8 transition-opacity duration-700 delay-300" style={{ opacity: isInView ? 1 : 0 }}>
               <div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Our Community</p>
                 <h3 className="text-xl md:text-2xl font-bold text-white">Volunteers Mobilized</h3>
               </div>
               <div className="text-left sm:text-right">
                 <span className="text-4xl md:text-5xl font-display font-bold text-[#3B82F6] tabular-nums">{(volunteersCount / 1000).toFixed(0)}k</span>
                 <span className="text-[#3B82F6] text-xl font-bold ml-1">people</span>
               </div>
             </div>

             {/* Stat 2 */}
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8 transition-opacity duration-700 delay-500" style={{ opacity: isInView ? 1 : 0 }}>
               <div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Global Impact</p>
                 <h3 className="text-xl md:text-2xl font-bold text-white">Hatchlings Released</h3>
               </div>
               <div className="text-left sm:text-right">
                 <span className="text-4xl md:text-5xl font-display font-bold text-[#3B82F6] tabular-nums">{(hatchlingsCount / 1000).toFixed(0)}k+</span>
               </div>
             </div>

             {/* Stat 3 */}
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-opacity duration-700 delay-700" style={{ opacity: isInView ? 1 : 0 }}>
               <div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Patrolled</p>
                 <h3 className="text-xl md:text-2xl font-bold text-white">Distance Covered</h3>
               </div>
               <div className="text-left sm:text-right">
                 <span className="text-4xl md:text-5xl font-display font-bold text-emerald-500 tabular-nums">{distanceCount}</span>
                 <span className="text-emerald-500 text-xl font-bold ml-1">km/night</span>
               </div>
             </div>

           </div>
        </div>

      </div>
    </section>
  );
};
