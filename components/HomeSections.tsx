import React from 'react';
import { Hero } from './Hero';

interface HomeSectionsProps {
  onJoin?: () => void;
  onStart?: () => void;
  onInitiativeClick?: (id: string) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col gap-0">
      {/* New Hero Section */}
      <Hero onStart={onStart || (() => {})} />
    </div>
  );
};
