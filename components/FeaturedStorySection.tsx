import React from 'react';

export const FeaturedStorySection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-white/5" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-midnight to-blue-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
            <div className="w-full lg:w-1/2 relative h-64 lg:h-auto">
              <img 
                src="/assets/turtle_cover.png" 
                alt="Release highlight" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-midnight/60 via-transparent to-transparent"></div>
            </div>
            
            <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-secondary text-midnight text-xs font-black uppercase tracking-widest rounded-full">Mission Highlight</span>
                <span className="text-secondary/80 text-sm font-bold tracking-wider">Feat. Season 2025</span>
              </div>
              
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
                A Record Season: 45,000 Lives Saved.
              </h2>
              
              <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed mb-10">
                Last season saw our highest ever volunteer turnout, resulting in the successful release of over 45,000 Olive Ridley hatchlings. It's a testament to what a community can achieve when united by a single purpose.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <a 
                  href="https://en.wikipedia.org/wiki/Olive_ridley_sea_turtle#Conservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-secondary text-midnight font-bold rounded-2xl hover:bg-teal-300 transition-all flex items-center justify-center gap-2"
                >
                  View Full Report
                  <span className="material-icons-round">assessment</span>
                </a> */}
                {/* <a 
                  href="https://www.youtube.com/results?search_query=olive+ridley+hatchlings+chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  Watch Highlights
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
