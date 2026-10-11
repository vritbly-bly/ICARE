import React from 'react';
import { Phone, Mail, MapPin, Globe, ArrowUp, Lock, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { useAdmin } from '../context/AdminContext';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenDashboard?: () => void;
  onOpenPublishSync?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { isAdmin, openLoginModal } = useAdmin();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      {/* Top Footer Strip */}
      <div className="border-b border-slate-800 py-3.5 px-4 bg-slate-950/80">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-sm border border-slate-700/50 inline-block">
              <BrandLogo variant="compact" size="md" />
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Ballari&apos;s established technical engineering laboratory and institutional IT partner. Over 15 years delivering specialized chip-level motherboard restoration, commercial surveillance networks, and corporate maintenance SLAs.
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

          {/* Core Technical Solutions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Services &amp; Capabilities
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Chip-Level Motherboard Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Turnkey CCTV Surveillance Networks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Structured CAT6 Gigabit Cabling &amp; LAN
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  CAD &amp; 3D Workstation Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corporate Annual Maintenance Contracts (AMC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  SSD Upgrades &amp; Thermal Overhauls
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation & Case Studies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Store &amp; Portfolio
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('offline-store')}
                  className="text-orange-400 hover:text-orange-300 font-bold transition-colors cursor-pointer text-left"
                >
                  🏬 Offline Store Sales (All Brands)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Naga Reddy &amp; iCare Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hospital &amp; Clinical Deployments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Industrial Warehouse Surveillance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  BGA Rework &amp; Optical Microscope Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brands')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Authorized Technology Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Store Location &amp; Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Lab Visiting & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Visit Our Technical Lab
            </h4>
            <div className="flex items-start gap-2 text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{STORE_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <div>{STORE_INFO.hoursWeekdays}</div>
                <div className="text-slate-500 text-[11px]">{STORE_INFO.hoursSunday}</div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 text-[11px] font-semibold transition-colors"
              >
                <span>Google Maps Landmark Pin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {STORE_INFO.name}. All business rights reserved. Proprietor: {STORE_INFO.proprietor}.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openLoginModal}
              className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {isAdmin ? <ShieldCheck className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3" />}
              <span>{isAdmin ? 'Admin Active' : 'Store Admin'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
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
