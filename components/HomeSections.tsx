import React from 'react';
import { MetricsSection } from './MetricsSection';
import { GallerySection } from './GallerySection';
import { InitiativesSection } from './InitiativesSection';
import { WhatWeDoSection } from './WhatWeDoSection';
import { GetInvolvedSection } from './GetInvolvedSection';
import { FeaturedStorySection } from './FeaturedStorySection';
import { EventSection } from './EventSection';

interface HomeSectionsProps {
  onJoin?: () => void;
  onInitiativeClick?: (id: string) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({ onJoin, onInitiativeClick }) => {
  return (
    <>
      <MetricsSection />
      
      
      <WhatWeDoSection />
      
      <GetInvolvedSection onJoin={onJoin} />
      
      <FeaturedStorySection />

      <EventSection onJoin={onJoin} />

      <GallerySection />



      <InitiativesSection onJoin={onJoin} onInitiativeClick={onInitiativeClick} />
    </>
  );
};
