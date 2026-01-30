import React from 'react';
import { MetricsSection } from './MetricsSection';
import { GallerySection } from './GallerySection';
import { InitiativesSection } from './InitiativesSection';

interface HomeSectionsProps {
  onJoin?: () => void;
  onInitiativeClick?: (id: string) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({ onJoin, onInitiativeClick }) => {
  return (
    <>
      {/* Report Banner */}
      <div className="bg-red-600 text-white relative z-20 shadow-lg border-b-4 border-red-800">
        <div className="max-w-7xl mx-auto px-3 py-2 sm:px-6 sm:py-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-white/20 p-1.5 sm:p-2 rounded-full animate-pulse">
              <span className="material-icons-round text-xl sm:text-2xl">sos</span>
            </div>
            <div>
              <p className="font-bold text-sm sm:text-lg leading-tight">Report a Stranded Turtle</p>
              <p className="text-[10px] sm:text-xs text-red-100 opacity-90 max-w-[250px] sm:max-w-none mx-auto sm:mx-0">Dead or alive, your report helps us track population health.</p>
            </div>
          </div>
          <a className="flex items-center gap-1.5 sm:gap-2 bg-white text-red-700 px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-red-50 transition-colors shadow-sm" href="tel:+917305807017">
            <span className="material-icons-round text-lg sm:text-xl">phone_in_talk</span>
            7305807017
          </a>
        </div>
      </div>

      <MetricsSection />

      <GallerySection />

      {/* Schedule Section */}
      <section className="py-24 bg-white dark:bg-midnight-light relative" id="schedule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-wider text-sm uppercase">Join the Journey</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-midnight dark:text-white mt-2 mb-6">The Experience &amp; Events</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Timeline */}
            <div>
              <h3 className="text-2xl font-display font-bold text-midnight dark:text-white mb-8 flex items-center gap-2">
                <span className="material-icons-round text-secondary">timeline</span>
                The Night Walk
              </h3>
              <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700 space-y-12">
                {[
                  { time: '11:30 PM', title: 'Assembly @ Marina', desc: 'Briefing on do\'s and don\'ts. Get your red-light torches ready.', color: 'bg-primary' },
                  { time: '12:30 AM', title: 'The Patrol Begins', desc: 'Walking in silence, scanning the high-tide line for tracks.', color: 'bg-white border-secondary' },
                  { time: '02:00 AM', title: 'Nesting & Collection', desc: 'If a nest is found, volunteers help measure and relocate eggs safely.', color: 'bg-white border-secondary' },
                  { time: '05:00 AM', title: 'Arrival @ Besant Nagar', desc: 'End of the walk at the hatchery. Relocation of eggs to protected pits.', color: 'bg-white border-secondary' }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className={`absolute -left-[41px] top-0 ${item.color.includes('primary') ? 'bg-primary border-white' : 'bg-white dark:bg-surface-dark border-secondary'} border-4 w-6 h-6 rounded-full`}></div>
                    <span className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-bold mb-2">{item.time}</span>
                    <h4 className="font-bold text-lg text-midnight dark:text-white">{item.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Dates */}
            <div>
              <h3 className="text-2xl font-display font-bold text-midnight dark:text-white mb-8 flex items-center gap-2">
                <span className="material-icons-round text-primary">calendar_month</span>
                Upcoming Patrol Dates
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-secondary/30 hover:shadow-md transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-rose-100 dark:border-rose-900/30">Upcoming Walk</div>
                      <span className="text-gray-400 text-xs flex items-center font-medium">
                        <span className="material-icons-round text-[14px] mr-1 text-gray-300">location_on</span> 
                        <a href="https://maps.app.goo.gl/EZKYqzY5uLDtURHeA" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Pattinambakkam (Lighthouse Backside)</a>
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-xl text-midnight dark:text-white mb-1">Saturday, 31 Jan '26</h4>
                    <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
                        <div className="flex items-center gap-2">
                           <span className="material-icons-round text-base text-gray-400">schedule</span>
                           12:15 AM - 04:00 AM
                        </div>
                         <div className="flex items-center gap-2">
                           <span className="material-icons-round text-base text-gray-400">person</span>
                           POC: Vijay (73058 07017)
                        </div>
                    </div>

                    {/* Do's and Don'ts Mini-List */}
                    <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-3 text-xs space-y-2 mb-4">
                        <div>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">✅ Do's</span>
                            <ul className="list-disc pl-4 space-y-0.5 text-gray-600 dark:text-gray-300">
                                <li>Stay together as teams</li>
                                <li>Bring own water bottle</li>
                                <li>Wear comfortable footwear</li>
                            </ul>
                        </div>
                        <div>
                            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">❌ Don'ts</span>
                            <ul className="list-disc pl-4 space-y-0.5 text-gray-600 dark:text-gray-300">
                                <li>No large bags or expensive accessories</li>
                                <li>Do not enter the water</li>
                                <li>No children below 12 years</li>
                            </ul>
                        </div>
                    </div>

                  </div>
                  <button onClick={onJoin} className="w-full sm:w-auto px-6 py-3 bg-secondary/10 text-teal-700 dark:text-secondary hover:bg-secondary hover:text-white rounded-xl text-sm font-bold transition-all whitespace-nowrap shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2">
                    Register Now
                    <span className="material-icons-round text-sm">arrow_forward</span>
                  </button>
                </div>
                {/* More dates... simplified for brevity */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-blue-50 dark:bg-slate-900 border-t border-blue-100 dark:border-white/5" id="community">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Copy structure from code.html for Community section */}
           <div className="flex flex-col lg:flex-row gap-12 items-start">
             <div className="lg:w-1/3 w-full">
                <div className="bg-gradient-to-br from-midnight to-blue-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <h3 className="font-display font-bold text-3xl mb-4 relative z-10">Bring Your Team</h3>
                    <p className="text-blue-100 mb-8 relative z-10">Corporate teams, school groups, and college clubs make the biggest impact.</p>
                    <button onClick={onJoin} className="w-full py-3 bg-secondary hover:bg-teal-400 text-midnight font-bold rounded-lg transition-colors relative z-10">Register Group</button>
                </div>
             </div>
             {/* Partners Grid */}
             <div className="lg:w-2/3 w-full">
                <h3 className="font-display font-bold text-2xl text-midnight dark:text-white mb-4">Student &amp; Community Partners</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Simplified partner blocks */}
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                        <span className="font-bold text-sm text-midnight dark:text-white">Loyola Nature Club</span>
                    </div>
                    {/* Add more as needed */}
                </div>
             </div>
           </div>
        </div>
      </section>

      <InitiativesSection onJoin={onJoin} onInitiativeClick={onInitiativeClick} />
    </>
  );
};
