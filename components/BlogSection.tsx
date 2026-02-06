import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'The Journey of an Olive Ridley',
    excerpt: 'Trace the incredible 10,000 mil journey these ancient mariners undertake to reach the shores of Chennai.',
    image: '/assets/turtle_hero_bg.jpeg',
    date: 'February 2, 2026',
    category: 'Conservation'
  },
  {
    id: 2,
    title: 'Why Night Patrols Matter',
    excerpt: 'Understanding the critical role of volunteer night patrols in protecting vulnerable nests from predators and poachers.',
    image: '/assets/turtle_hero_bg_2.jpg',
    date: 'January 28, 2026',
    category: 'Volunteering'
  },
  {
    id: 3,
    title: 'Hatchling Release Protocol',
    excerpt: 'A guide to how we safely release thousands of hatchlings back into the ocean every season.',
    image: '/assets/turtle_hero_bg_3.png',
    date: 'January 15, 2026',
    category: 'Education'
  }
];

export const BlogSection: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50 dark:bg-slate-900" id="blogs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider text-sm uppercase">Read & Learn</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-midnight dark:text-white mt-2 mb-6">Turtle Tales</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stories from the shore, conservation insights, and updates from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-midnight rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-midnight/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-xs text-secondary font-semibold mb-3 flex items-center gap-2">
                  <span className="material-icons-round text-sm">calendar_today</span>
                  {post.date}
                </div>
                <h3 className="font-display font-bold text-xl text-midnight dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                {/* Link Removed */}
                {/* <a 
                  href="https://www.youtube.com/results?search_query=olive+ridley+turtle+conservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold text-sm uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all w-fit"
                >
                  Read Article
                  <span className="material-icons-round text-lg">arrow_right_alt</span>
                </a> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
