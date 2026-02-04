import React, { useState } from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  onJoin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onJoin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white dark:bg-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
             <img src="/assets/turtle_hero.png" alt="Turtle Logo" className="h-10 w-auto object-contain mix-blend-multiply dark:mix-blend-screen" />
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight text-midnight dark:text-white leading-none">SAVE A TURTLE</h1>
            </div>
          </div>
          
            {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors" href="#about">About Us</a>
            <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors" href="#events">Events</a>
            <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors" href="#gallery">Gallery</a>
            <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors" href="#blogs">Blogs</a>
            {/* Keeping existing functional links if needed, but prioritizing user request */}
            {/* <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors" href="#schedule">The Walk</a> */}
          </div>

          <div className="flex items-center gap-4">
             {/* Desktop Donate Button */}
             <button 
                onClick={onJoin}
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover transition-all transform hover:-translate-y-0.5"
             >
                Join Us
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-icons-round text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-midnight border-b border-gray-100 dark:border-white/10 shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5" href="#about">About Us</a>
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5" href="#events">Events</a>
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5" href="#gallery">Gallery</a>
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5" href="#blogs">Blogs</a>
            <button 
                onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onJoin) onJoin();
                }}
                className="w-full mt-4 flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover transition-all"
            >
                Join Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};