import React from 'react';

const OPPORTUNITIES = [
  {
    role: "Volunteer",
    desc: "Join our night patrol teams or help at the hatcheries. Perfect for individuals and small groups.",
    cta: "Sign Up to Volunteer",
    icon: "person_add"
  }
];

export const GetInvolvedSection: React.FC<{ onJoin?: () => void }> = ({ onJoin }) => {
  return (
    <section className="py-24 bg-stone-50 dark:bg-midnight overflow-hidden" id="get-involved">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-primary font-bold tracking-wider text-sm uppercase">Join the Movement</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-midnight dark:text-white mt-2">Become a Guardian of the Coast.</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-center lg:text-right font-medium">
            Every year, thousands of volunteers help us protect the Olive Ridley turtles. Your contribution makes a direct impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OPPORTUNITIES.map((opt, idx) => (
            <div key={idx} className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center text-center group hover:shadow-xl transition-all">
              <div className="bg-slate-50 dark:bg-midnight w-16 h-16 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-icons-round text-3xl">{opt.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-midnight dark:text-white mb-4">{opt.role}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                {opt.desc}
              </p>
              <button 
                onClick={onJoin}
                className="mt-auto w-full py-4 px-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 font-bold text-midnight dark:text-white hover:bg-midnight dark:hover:bg-white hover:text-white dark:hover:text-midnight transition-colors"
              >
                {opt.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
