import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Heart, Flag, MapPin, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  onPrivacyClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 px-4 border-t border-stone-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        
        {/* Brand Section */}
        <div className="col-span-1 lg:col-span-1">
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-stone-100 tracking-tight leading-none">Save A Turtle</span>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1">Conservation Initiative</span>
          </div>
          <p className="text-sm leading-relaxed text-stone-400 mb-6">
            A community-led initiative to protect Olive Ridley Turtles and preserve our ocean's biodiversity.
          </p>
          <div className="flex gap-3">
            <SocialLink href="https://twitter.com/" icon={<Twitter size={18} />} color="hover:bg-blue-400" label="Twitter" />
            <SocialLink href="https://instagram.com/" icon={<Instagram size={18} />} color="hover:bg-pink-600" label="Instagram" />
            <SocialLink href="https://facebook.com/" icon={<Facebook size={18} />} color="hover:bg-blue-600" label="Facebook" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-stone-100 mb-6 uppercase text-xs tracking-wider flex items-center gap-2">
            <span className="w-8 h-px bg-teal-500"></span> Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            {/* <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">About the Mission</a></li> */}
            <li><a href="#events" className="hover:text-primary transition-colors flex items-center gap-2">Turtle Walks</a></li>
            <li><a href="#gallery" className="hover:text-primary transition-colors flex items-center gap-2">Gallery</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-stone-100 mb-6 uppercase text-xs tracking-wider flex items-center gap-2">
            <span className="w-8 h-px bg-white"></span> Legal
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={onPrivacyClick}
                className="hover:text-primary transition-colors text-left"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-stone-100 mb-6 uppercase text-xs tracking-wider flex items-center gap-2">
            <span className="w-8 h-px bg-blue-500"></span> Contact
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-stone-500 mt-0.5 shrink-0" />
              <span>
                Chennai, Tamil Nadu<br />
                India
              </span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-stone-600">&copy; {new Date().getFullYear()} Save a Turtle Initiative.</p>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; color: string; label: string }> = ({ href, icon, color, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white transition-all transform hover:scale-110 ${color}`}
  >
    {icon}
  </a>
);