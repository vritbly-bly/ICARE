import React from 'react';
import { Phone, Mail, MapPin, Globe, ArrowUp } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenPaymentQr?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPaymentQr }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      {/* Top Footer Strip: Mottos from the Card */}
      <div className="border-b border-slate-800 py-3 px-4 bg-slate-950/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="text-orange-400 font-bold tracking-widest uppercase text-[11px]">
            {STORE_INFO.motto}
          </div>
          <div className="text-slate-400 text-[11px]">
            {STORE_INFO.tagline}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-sm border border-slate-700/50 inline-block">
              <BrandLogo variant="compact" size="md" />
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your neighborhood IT powerhouse in Ballari for brand-new laptops, gaming rigs, Epson printers, Hikvision CCTV systems, and certified chip-level repairs.
            </p>

            <div className="pt-2 text-slate-400 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Proprietor:</span>
                <span className="text-white font-semibold">{STORE_INFO.proprietor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Phone:</span>
                <a href={`tel:${STORE_INFO.phone}`} className="text-sky-400 hover:underline">
                  {STORE_INFO.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-300">{STORE_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Hardware Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Hardware Catalog
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Laptops (HP, Dell, Lenovo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Gaming Desktops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All-in-One PCs &amp; Monitors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  EcoTank &amp; Laser Printers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  CCTV Security Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Gen4 NVMe SSDs &amp; RAM
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Maintenance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Technical Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Chip-Level Motherboard Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Laptop Screen Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fast 45-Min SSD Upgrade
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  CCTV Remote Mobile App Setup
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corporate &amp; School AMC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brands')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Authorized Brand Partners
                </button>
              </li>
            </ul>
          </div>

          {/* Store Location & Timings */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Store Timings &amp; Address
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  #Opp Kumaraswamy Temple, Beside UCO Bank, Ballari - 583104
                </span>
              </div>
              <div className="pt-1 text-[11px]">
                <div className="text-white font-medium">Mon - Sat: 9:30 AM – 9:00 PM</div>
                <div className="text-slate-400">Sunday: 10:00 AM – 2:00 PM</div>
              </div>
              <div className="pt-2">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 font-semibold inline-block text-[11px]"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} iCare Computers. All rights reserved. Registered Ballari IT Retailer &amp; Service Provider.
          </div>

          <div className="flex items-center gap-4">
            {onOpenPaymentQr && (
              <>
                <button
                  onClick={onOpenPaymentQr}
                  className="hover:text-sky-400 transition-colors text-slate-400"
                >
                  Store Payment QR
                </button>
                <span aria-hidden="true">·</span>
              </>
            )}
            <button
              onClick={() => onNavigate('catalog')}
              className="hover:text-slate-300 transition-colors"
            >
              Hardware Catalog
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
