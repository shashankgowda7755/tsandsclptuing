import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50 dark:bg-midnight" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
              <img 
                src="/assets/turtle_hero_bg_2.jpg" 
                alt="Conservation in action" 
                className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/5] md:aspect-square"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-xl z-20 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <span className="material-icons-round text-primary text-3xl">history_edu</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-midnight dark:text-white">35+</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Years of Legacy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <span className="text-primary font-bold tracking-wider text-sm uppercase">About the Initiative</span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-midnight dark:text-white mt-2 mb-8 leading-tight">
              A Legacy of Protection on<br/>
              <span className="text-primary">Chennai's Shores.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 font-medium">
              <p>
                Founded in 1988, the Olive Ridley Conservation initiative is one of India's longest-running community efforts. We patrol the 14km stretch between Neelangarai and Besant Nagar, ensuring every nest is protected and every hatchling reaches the sea.
              </p>
              <p>
                Our mission goes beyond conservation; we aim to foster a deep connection between the citizens of Chennai and their marine neighbors through education and active participation.
              </p>
            </div>
            
            {/* <a 
              href="https://en.wikipedia.org/wiki/Olive_ridley_sea_turtle"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 px-8 py-4 bg-midnight dark:bg-white text-white dark:text-midnight font-bold rounded-full hover:bg-midnight-light dark:hover:bg-slate-100 transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 w-fit"
            >
              Read Our Full Story
              <span className="material-icons-round">arrow_forward</span>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};
