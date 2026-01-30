import React from 'react';

const galleryImages = [
  { src: '/assets/turtle_hero_bg_3.png', alt: 'Releasing hatchlings at dawn', span: 'col-span-1 md:col-span-2 row-span-2' },
  { src: '/assets/turtle_hero_bg_2.jpg', alt: 'Night patrol team', span: 'col-span-1' },
  { src: '/assets/turtle_hero_bg.jpeg', alt: 'Olive Ridley Turtle', span: 'col-span-1' },
  { src: '/assets/poster.png', alt: 'Conservation awareness', span: 'col-span-1 md:col-span-2' },
  // Duplicating for grid effect if needed, or just keeping these 4 for a nice mosaic
];

export const GallerySection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-midnight relative overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-wider text-sm uppercase"> captured moments</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-midnight dark:text-white mt-2 mb-6">Gallery</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Glimpses of our community in action, from night patrols to dawn releases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryImages.map((img, idx) => (
            <div key={idx} className={`relative group overflow-hidden rounded-2xl ${img.span}`}>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.alt}</p>
              </div>
            </div>
          ))}
          {/* Add a generic placeholder for user to put up more */}

        </div>
      </div>
    </section>
  );
};
