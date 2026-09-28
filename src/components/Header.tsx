import React, { useState } from 'react';
import { ShoppingBag, Phone, MapPin, Menu, X, Search, QrCode, Upload, ShieldCheck, Lock } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { useAdmin } from '../context/AdminContext';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchingCount?: number;
  onOpenPaymentQr?: () => void;
  onOpenEditLogoModal?: (tab?: 'store' | 'brands') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  searchQuery,
  onSearchChange,
  matchingCount,
  onOpenPaymentQr,
  onOpenEditLogoModal,
}) => {
  const { isAdmin, openLoginModal } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'catalog', label: 'Products & Ordering' },
    { id: 'services', label: 'Services & Upgrades' },
    { id: 'brands', label: 'Brands' },
    { id: 'contact', label: 'Find Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleSearchInput = (val: string) => {
    onSearchChange(val);
    if (val.trim().length > 0 && activeSection !== 'catalog') {
      onNavigate('catalog');
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
            <span className="text-emerald-400 font-medium">Free Doorstep Delivery in Ballari on orders &gt; ₹2,000</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Mon-Sat: 9:30 AM – 9:00 PM</span>
            <span className="text-slate-500">·</span>
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="text-white hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>Call Venkata Reddy: {STORE_INFO.formattedPhone}</span>
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
        {/* Zone 1: Brand Wordmark & Emblem with Edit Option */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handleNavClick('hero')}
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

        {/* Global Live Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-sm lg:max-w-md mx-2 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products, laptops, printers, CCTV..."
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim().length > 0 && activeSection !== 'catalog') {
                onNavigate('catalog');
              }
            }}
            className="w-full pl-8 pr-16 py-1.5 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {matchingCount !== undefined && (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded">
                  {matchingCount} found
                </span>
              )}
              <button
                onClick={() => onSearchChange('')}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links (Clean text with hover states) */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-600 shrink-0">
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

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Payment QR Button */}
          {onOpenPaymentQr && (
            <button
              onClick={onOpenPaymentQr}
              aria-label="Payment QR Code"
              title="Store Payment QR Code"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <QrCode className="w-4 h-4 text-sky-600" />
              <span className="hidden sm:inline">Payment QR</span>
            </button>
          )}

          {/* Admin Portal Button */}
          <button
            onClick={openLoginModal}
            aria-label={isAdmin ? 'Admin Portal Active' : 'Store Admin Login'}
            title={isAdmin ? 'Admin Mode (Active) - Click to manage' : 'Store Owner / Admin Login'}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
              isAdmin
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80'
            }`}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline text-[11px] font-bold">Admin</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline text-[11px]">Admin</span>
              </>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-sky-600" />
            <span className="hidden md:inline">Order Bag</span>
            {cartCount > 0 ? (
              <span className="inline-flex items-center justify-center min-w-[18px] h-4.5 px-1 text-[11px] font-bold text-white bg-orange-500 rounded-full tabular-nums">
                {cartCount}
              </span>
            ) : (
              <span className="text-[11px] text-slate-500 tabular-nums">0</span>
            )}
          </button>

          {/* Quick Call Action */}
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-sm shadow-sky-600/20 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Shop</span>
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

      {/* Mobile Search Bar (Directly below bar on mobile screens) */}
      <div className="sm:hidden px-4 pb-2.5 pt-0.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-xs bg-slate-100 focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
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
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openLoginModal();
              }}
              className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold rounded-xl text-center cursor-pointer border ${
                isAdmin
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Admin Mode Active (Tap to manage)</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>Store Owner / Admin Login</span>
                </>
              )}
            </button>

            {onOpenPaymentQr && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPaymentQr();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 rounded-xl text-center cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-sky-600" />
                <span>Store Payment QR Code</span>
              </button>
            )}

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-white bg-sky-600 rounded-xl text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call Venkata Reddy ({STORE_INFO.phone})</span>
            </a>
            <p className="text-[11px] text-center text-slate-500">
              #Opp Kumaraswamy Temple, Beside UCO Bank, Ballari
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
