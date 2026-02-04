import React from 'react';

const events = [
  {
    id: 1,
    title: 'Weekend Turtle Walk',
    date: 'Feb 10, Sat',
    time: '11:00 PM - 4:00 AM',
    location: 'Neelangarai Beach',
    type: 'Field Work',
    spots: '5 spots left'
  },
  {
    id: 2,
    title: 'Mega Beach Cleanup',
    date: 'Feb 11, Sun',
    time: '6:30 AM - 9:00 AM',
    location: 'Besant Nagar (Elliot\'s Beach)',
    type: 'Community',
    spots: 'Open to all'
  },
  {
    id: 3,
    title: 'Hatchling Release Event',
    date: 'Feb 17, Sat',
    time: '5:30 PM - 7:00 PM',
    location: 'Hatchery, Besant Nagar',
    type: 'Public Event',
    spots: 'Registration Required'
  }
];

interface EventSectionProps {
  onJoin?: () => void;
}

export const EventSection: React.FC<EventSectionProps> = ({ onJoin }) => {
  return (
    <section className="py-24 bg-midnight text-white relative overflow-hidden" id="events">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-secondary font-bold tracking-wider text-sm uppercase">Get Involved</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mt-2">Upcoming Events</h2>
            <p className="text-blue-100 mt-4 text-lg">
              Join us on the ground. Whether it's a night walk or a morning cleanup, your presence makes a difference.
            </p>
          </div>
          <button 
            onClick={onJoin}
            className="px-6 py-3 border border-white/20 rounded-full font-bold hover:bg-white hover:text-midnight transition-colors"
          >
            Join Our Next Walk
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-primary rounded-xl px-4 py-2 text-center shadow-lg">
                  <span className="block text-xs uppercase font-bold text-white/80">{event.date.split(',')[0].split(' ')[0]}</span>
                  <span className="block text-2xl font-bold font-display">{event.date.split(',')[0].split(' ')[1]}</span>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${event.type === 'Field Work' ? 'border-secondary text-secondary' : 'border-blue-300 text-blue-300'}`}>
                  {event.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
              
              <div className="space-y-3 text-sm text-gray-300 mt-4">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-base opacity-70">schedule</span>
                  {event.time}
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-base opacity-70">place</span>
                  {event.location}
                </div>
                <div className="flex items-center gap-3 text-secondary font-medium">
                  <span className="material-icons-round text-base">confirmation_number</span>
                  {event.spots}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-end">
                <button 
                  onClick={onJoin}
                  className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all hover:text-primary"
                >
                  Register
                  <span className="material-icons-round text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
