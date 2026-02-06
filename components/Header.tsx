import React, { useState } from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  onDownload?: () => void;
  onSecretDebug?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onDownload, onSecretDebug }) => {
  const [clickCount, setClickCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
     setClickCount(prev => {
         const newCount = prev + 1;
         if (newCount >= 5) {
             if (onSecretDebug) onSecretDebug();
             return 0;
         }
         setTimeout(() => setClickCount(0), 2000); // Reset if not fast enough
         return newCount;
     });
     onLogoClick();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md dark:bg-midnight' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight text-midnight dark:text-white leading-none">Sand Sculpting Contest</h1>
            </div>
          </div>
          
            {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {/* Links removed as per request */}
          </div>

          <div className="flex items-center gap-4">
             {/* Desktop Download Button */}
             <button 
                onClick={onDownload}
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover transition-all transform hover:-translate-y-0.5"
             >
                Download Certificate
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
            <button 
                onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onDownload) onDownload();
                }}
                className="w-full mt-4 flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover transition-all"
            >
                Download Certificate
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};