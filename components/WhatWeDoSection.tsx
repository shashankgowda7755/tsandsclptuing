import React from 'react';

const SERVICES = [
  {
    title: "Night Patrols",
    desc: "Join volunteers in the silence of the night to scan the high-tide line for nesting tracks and protect vulnerable mother turtles.",
    icon: "nights_stay",
    color: "bg-blue-500"
  },
  {
    title: "Nest Relocation",
    desc: "Safely collect and relocate eggs to protected hatcheries where they can incubate away from predators and human interference.",
    icon: "egg",
    color: "bg-emerald-500"
  },
  {
    title: "Hatchling Release",
    desc: "Experience the magic of watching thousands of tiny hatchlings make their first journey to the ocean at dawn.",
    icon: "waves",
    color: "bg-amber-500"
  },
  {
    title: "Education Programs",
    desc: "We visit schools and colleges to inspire the next generation of environmental stewards through workshops and field trips.",
    icon: "school",
    color: "bg-purple-500"
  }
];

export const WhatWeDoSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-white/5" id="what-we-do">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-wider text-sm uppercase">Our Mission</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-midnight dark:text-white mt-2 mb-6">How We Make a Difference</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            From the first track on the sand to the last hatchling in the water, our specialized teams work around the clock during nesting season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-surface-dark p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-secondary/30 transition-all group hover:-translate-y-2">
              <div className={`${service.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="material-icons-round text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-midnight dark:text-white mb-4">{service.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
