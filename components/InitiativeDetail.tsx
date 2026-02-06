import React, { useEffect } from 'react';

interface InitiativeDetailProps {
  initiativeId: string;
  onBack: () => void;
  onJoin: () => void;
}

export const InitiativeDetail: React.FC<InitiativeDetailProps> = ({ initiativeId, onBack, onJoin }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    switch (initiativeId) {
      case 'cleanup':
        return (
          <>
            {/* Cleanup Specific Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
                        
                        <h2 className="font-['DM_Serif_Display'] text-3xl text-slate-900 dark:text-white mb-6">Transforming Chennai's Coastline</h2>
                        <p className="mb-4">Join Chennai's Largest Coastal Conservation Movement. For over 15 years, SAVEaTURTLE has been restoring Chennai's beautiful coastline to its natural glory. What started as a small group of concerned citizens has grown into a powerful movement with nearly 1,000 tons of trash removed from our beaches.</p>
                        
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">The Impact in Numbers</h3>
                        <p className="mb-4">SAVEaTURTLE has organized over 750 beach cleanups, mobilized more than 107,000 volunteers, and removed approximately 973 tons of trash from coastal ecosystems. These aren't just statistics - they represent real impact on marine life, beach health, and community awareness.</p>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">How Our Impact Has Grown</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Early Years:</strong> Dozens of volunteers collecting tons per cleanup.</li>
                            <li><strong>Growth Phase:</strong> Hundreds of regular participants.</li>
                            <li><strong>Current Scale:</strong> Thousands of volunteers annually, removing over 100 tons per year.</li>
                            <li><strong>Recent Milestones:</strong> Individual seasons seeing 185+ tons collected with 20,000+ volunteers.</li>
                        </ul>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">What We Clean</h3>
                        <p className="mb-4">The trash collected tells a story about consumption patterns: Plastic bottles, caps, food wrappers, cigarette butts, fishing nets (deadly for turtles), styrofoam, and general litter. Every piece removed prevents microplastics from entering the ocean.</p>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">International Coastal Cleanup Day</h3>
                        <p className="mb-4">Every third Saturday of September, we participate in the International Coastal Cleanup, joining millions worldwide. It is our largest annual event, uniting schools, colleges, corporates, and NGOs in a powerful display of solidarity, contributing to global ocean conservation data.</p>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">A Typical Beach Cleanup</h3>
                        <p className="mb-4">It begins with an early morning gathering at sunrise. After a safety and sorting orientation, teams spread out for collection. The event concludes with weighing, sorting for recycling, and community building. Duration is typically 2-3 hours.</p>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">Who Makes This Possible</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Educational Institutions:</strong> Students gaining hands-on experience.</li>
                            <li><strong>Corporate Partners:</strong> Engaging employees in meaningful CSR.</li>
                            <li><strong>Government Collaboration:</strong> Working with Forest Dept, Corp of Chennai, and others.</li>
                            <li><strong>Community:</strong> Neighborhood associations, NGOs, individuals, and families.</li>
                        </ul>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">Why Beach Cleanups Matter</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Protecting Marine Life:</strong> Every piece of plastic removed is one less obstacle for the 300+ turtle nests we monitor.</li>
                            <li><strong>Data Collection:</strong> Helps identify pollution sources and inform policy.</li>
                            <li><strong>Community Awareness:</strong> Participants become ambassadors for change.</li>
                            <li><strong>Immediate Impact:</strong> Visible results are a powerful motivator.</li>
                        </ul>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">Beyond Collection: Education & Advocacy</h3>
                        <p className="mb-4">Our cleanups include waste audits, sustainable alternatives workshops, and policy advocacy. We aim for behavior change—volunteers often report reducing single-use plastics and promoting cleanups in their networks ("The Ripple Effect").</p>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">Frequency and Schedule</h3>
                        <p className="mb-4">We organize Weekly/Monthly regular cleanups, special events (Int'l Coastal Cleanup), custom group cleanups for schools/corporates, and seasonal intensives.</p>
                        <p className="mb-4"><strong>Upcoming:</strong> Join us this Saturday at 6:00 AM on Marina Beach!</p>
    
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">What We Provide</h3>
                        <p className="mb-4">We provide collection bags, gloves, safety equipment, refreshments, expert guidance, educational materials, and participation certificates. You just bring enthusiasm!</p>
                       
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-8 mb-4">Join the Movement</h3>
                        <p className="mb-4">Whether individual, group, school, or corporate, your contribution matters. Contact SAVEaTURTLE to join upcoming cleanups. If you can pick up trash, you can make a difference!</p>
                    </div>

                    {/* Gallery Placeholder - reusing existing images since cleanup_1..10 are missing */}
                    <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mt-12 mb-6">Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden">
                                <img src="/assets/cleanup_cover.png" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Cleanup activity" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 sticky top-24">
                        <h3 className="font-['DM_Serif_Display'] text-2xl text-slate-900 dark:text-white mb-2">Join the Movement</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Ready to make a difference? Register now to participate in our next cleanup drive.</p>
                        
                        <button 
                            onClick={onJoin}
                            className="block w-full py-4 bg-[#0EA5E9] hover:bg-sky-500 text-white font-bold text-center rounded-xl transition-all shadow-lg shadow-sky-500/20 transform hover:-translate-y-1 mb-4"
                        >
                            Register as Start
                        </button>

                        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm mt-8">Follow us on Instagram for the latest updates and event details.</p>
                        <div
                            className="block w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-center rounded-xl transition-all shadow-lg shadow-pink-500/20 opacity-70 cursor-not-allowed">
                            Visit Instagram
                        </div>
                    </div>
                </div>
            </div>
          </>
        );
      
      default:
        // Generic template for other initiatives
        return (
          <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center">
            <h2 className="font-['DM_Serif_Display'] text-3xl text-slate-900 dark:text-white mb-6">Coming Soon</h2>
            <p className="text-slate-600 dark:text-slate-300">Detailed information about this initiative will be available shortly.</p>
            <button 
                onClick={onJoin}
                className="mt-8 px-8 py-3 bg-[#0EA5E9] hover:bg-sky-500 text-white font-bold rounded-full transition-all"
            >
                Register Interest
            </button>
          </div>
        );
    }
  };

  const getHeaderInfo = () => {
      switch(initiativeId) {
          case 'cleanup':
              return {
                  title: 'Beach Cleanups',
                  tag: 'Restoration',
                  image: '/assets/cleanup_cover.png',
                  subtext: 'Every Weekend • Chennai Coastline'
              };
          case 'turtle':
              return {
                  title: 'Turtle Walks',
                  tag: 'Conservation',
                  image: '/assets/turtle_cover.png',
                  subtext: 'Seasonal (Jan - Apr) • Marina to Besant Nagar'
              };
          case 'sand':
              return {
                  title: 'Sand Sculpture Contest',
                  tag: 'Awareness',
                  image: '/assets/sand_sculpture.png',
                  subtext: 'Annual Event • Marina Beach'
              };
          default:
              return {
                  title: 'Initiative',
                  tag: 'Event',
                  image: '/assets/cleanup_cover.png', 
                  subtext: 'Join us to make a difference'
              };
      }
  };

  const header = getHeaderInfo();

  return (
    <div className="bg-[#F0F9FF] dark:bg-[#0F172A] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
          <img src={header.image} alt={header.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="absolute top-24 left-4 md:left-8 z-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-all"
          >
             <span className="material-icons-outlined text-2xl">arrow_back</span>
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="max-w-7xl mx-auto">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#0EA5E9] text-white text-sm font-bold uppercase tracking-wider mb-4 shadow-lg">
                    {header.tag}
                  </span>
                  <h1 className="font-['DM_Serif_Display'] text-5xl md:text-7xl text-white leading-tight drop-shadow-lg mb-4">
                    {header.title}
                  </h1>
                  <div className="flex items-center gap-6 text-slate-200 text-sm md:text-base font-medium">
                      <div className="flex items-center gap-2">
                          <span className="material-icons-outlined">info</span>
                          <span>{header.subtext}</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
          {renderContent()}
      </section>
    </div>
  );
};
