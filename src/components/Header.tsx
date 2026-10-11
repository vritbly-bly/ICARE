import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Search, 
  Upload, 
  ShieldCheck, 
  Lock, 
  MessageSquare,
  Clock
} from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { useAdmin } from '../context/AdminContext';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenEditLogoModal?: (tab?: 'store' | 'brands') => void;
  onOpenDashboard?: () => void;
  onOpenPublishSync?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenEditLogoModal,
}) => {
  const { isAdmin, openLoginModal } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'offline-store', label: 'Store Sales & Service' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services & Scope' },
    { id: 'portfolio', label: 'Case Studies' },
    { id: 'lab', label: 'Technical Lab' },
    { id: 'brands', label: 'All Brands' },
    { id: 'contact', label: 'Store Location' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleSearchInput = (val: string) => {
    onSearchChange(val);
    if (val.trim().length > 0 && activeSection !== 'offline-store' && activeSection !== 'services') {
      onNavigate('offline-store');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>#Opp Kumaraswamy Temple, Beside UCO Bank, Ballari - 583104</span>
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-orange-300 font-bold">🏬 Offline Store Sales &amp; Multi-Brand Service · No Online Checkout</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Mon-Sat: 9:30 AM – 9:00 PM</span>
            </span>
            <span className="text-slate-500">·</span>
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="text-white hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>Call Naga Reddy: {STORE_INFO.formattedPhone}</span>
            </a>
            <span className="text-slate-500">·</span>
            <button
              onClick={openLoginModal}
              className={`flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                isAdmin ? 'text-emerald-400 hover:text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title={isAdmin ? 'Admin privileges active - Click to manage' : 'Store Owner / Admin Login'}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Active</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  <span>Admin</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handleNavClick('hero-banner')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 -m-1 shrink-0"
            aria-label="iCare Computers Home"
          >
            <BrandLogo variant="compact" size="md" />
          </button>

          {isAdmin && onOpenEditLogoModal && (
            <button
              onClick={() => onOpenEditLogoModal('store')}
              className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Upload or change logo (Admin)"
              aria-label="Upload logo"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Global Capability Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-xs lg:max-w-sm mx-2 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search in-store stock, laptops, CCTV, printer toners, lab..."
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              title="Clear Search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-600 shrink-0">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-colors whitespace-nowrap py-1 cursor-pointer hover:text-sky-600 ${
                activeSection === link.id
                  ? 'text-sky-600 font-bold border-b-2 border-sky-600'
                  : 'text-slate-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Direct Inquiries Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* WhatsApp Direct Action */}
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>

          {/* Quick Call Naga Reddy Action */}
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-sm shadow-sky-600/20 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Naga Reddy</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 xl:hidden rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activeSection === link.id
                    ? 'bg-sky-50 text-sky-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-white bg-sky-600 rounded-xl text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call Naga Reddy ({STORE_INFO.formattedPhone})</span>
            </a>

            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>

            <p className="text-[11px] text-center text-slate-500 pt-1">
              #Opp Kumaraswamy Temple, Beside UCO Bank, Ballari - 583104
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
