import React from 'react';
import { MetricsSection } from './MetricsSection';
import { GallerySection } from './GallerySection';
import { InitiativesSection } from './InitiativesSection';
import { WhatWeDoSection } from './WhatWeDoSection';
import { GetInvolvedSection } from './GetInvolvedSection';
import { FeaturedStorySection } from './FeaturedStorySection';
import { EventSection } from './EventSection';
import { SandSculptureHero } from './SandSculptureHero';

interface HomeSectionsProps {
  onJoin?: () => void;
  onStart?: () => void;
  onInitiativeClick?: (id: string) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({ onJoin, onStart, onInitiativeClick }) => {
  return (
    <div className="flex flex-col gap-0">
      {/* New Hero Section */}
      <SandSculptureHero onDownload={onStart || (() => {})} />
      
      <InitiativesSection onJoin={onJoin} onInitiativeClick={onInitiativeClick} />
      
      <WhatWeDoSection />
      
      <GetInvolvedSection onJoin={onJoin} />
      
      <FeaturedStorySection />

      <EventSection onJoin={onJoin} />

      <GallerySection />



      <GallerySection />
    </div>
  );
};
