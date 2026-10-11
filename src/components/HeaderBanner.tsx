import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  Upload, 
  Trash2, 
  Camera, 
  Laptop, 
  Printer, 
  Cpu, 
  Wrench, 
  CloudUpload,
  MapPin,
  CheckCircle2,
  Tv,
  Wifi,
  HardDrive,
  Building2,
  ShieldCheck,
  Network,
  Award,
  Sparkles,
  ArrowUpRight,
  Store
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { STORE_INFO } from '../data/mockData';
import { useAdmin } from '../context/AdminContext';

interface HeaderBannerProps {
  onSelectCategory?: (category: string) => void;
  onExploreCatalog?: () => void;
  onOpenPublishSync?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onSelectCategory,
  onExploreCatalog,
  onOpenPublishSync,
}) => {
  const { isAdmin } = useAdmin();
  const [customBannerImage, setCustomBannerImage] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('icare_custom_banner_image');
      if (stored) return stored;
    } catch {
      // ignore
    }
    return null;
  });

  const [showUrlInput, setShowUrlInput] = useState(false);
  const [bannerUrlText, setBannerUrlText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleBannerUpdate = () => {
      try {
        const stored = localStorage.getItem('icare_custom_banner_image');
        setCustomBannerImage(stored || null);
      } catch {
        // ignore
      }
    };
    window.addEventListener('icare_banner_updated', handleBannerUpdate);
    return () => window.removeEventListener('icare_banner_updated', handleBannerUpdate);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, or SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      try {
        localStorage.setItem('icare_custom_banner_image', result);
        setCustomBannerImage(result);
        window.dispatchEvent(new Event('icare_banner_updated'));
      } catch {
        alert('Failed to save banner image. File may be too large for local cache.');
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyBannerUrl = () => {
    if (!bannerUrlText.trim()) return;
    try {
      localStorage.setItem('icare_custom_banner_image', bannerUrlText.trim());
      setCustomBannerImage(bannerUrlText.trim());
      window.dispatchEvent(new Event('icare_banner_updated'));
      setShowUrlInput(false);
      setBannerUrlText('');
    } catch {
      alert('Failed to save banner URL.');
    }
  };

  const handleRemoveCustomBanner = () => {
    try {
      localStorage.removeItem('icare_custom_banner_image');
      setCustomBannerImage(null);
      window.dispatchEvent(new Event('icare_banner_updated'));
    } catch {
      // ignore
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCategoryClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else if (onExploreCatalog) {
      onExploreCatalog();
    }
  };

  return (
    <section className="relative w-full bg-slate-100/80 border-b border-slate-200 py-3 sm:py-5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hidden File Input for Custom Banner Upload */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload custom banner image"
        />

        {/* Banner Frame Container: Perfectly fits standard ~2:1 or ~2.8:1 flex ratio on desktop */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden bg-white border border-slate-200/90 group">
          {/* Quick Floating Action to Upload / Change Image (ADMIN ONLY) */}
          {isAdmin && (
            <div className="absolute top-3 right-3 z-30 flex flex-col items-end gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-800 bg-white/95 hover:bg-white backdrop-blur-md rounded-lg shadow-md hover:shadow-lg border border-slate-200/80 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Set banner image from web URL (Admin Only)"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden sm:inline">Banner URL</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-800 bg-white/95 hover:bg-white backdrop-blur-md rounded-lg shadow-md hover:shadow-lg border border-slate-200/80 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Upload official high-resolution banner image (Admin Only)"
                >
                  <Upload className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden sm:inline">
                    {customBannerImage ? 'Upload New' : 'Upload Banner'}
                  </span>
                </button>

                {customBannerImage && (
                  <button
                    type="button"
                    onClick={handleRemoveCustomBanner}
                    className="p-1.5 text-slate-600 hover:text-red-600 bg-white/95 hover:bg-red-50 backdrop-blur-md rounded-lg shadow-md border border-slate-200/80 transition-colors cursor-pointer"
                    title="Reset to official vector banner (Admin Only)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {onOpenPublishSync && (
                  <button
                    type="button"
                    onClick={onOpenPublishSync}
                    className="px-2.5 py-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-md border border-emerald-400/40 flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Publish current banner changes to live visitors"
                  >
                    <CloudUpload className="w-3.5 h-3.5 text-white" />
                    <span className="hidden sm:inline">Sync to Visitors</span>
                  </button>
                )}
              </div>

              {/* Collapsible Banner URL Input */}
              {showUrlInput && (
                <div className="flex items-center gap-1.5 bg-white/95 p-1.5 rounded-xl shadow-lg border border-slate-200 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
                  <input
                    type="url"
                    value={bannerUrlText}
                    onChange={(e) => setBannerUrlText(e.target.value)}
                    placeholder="https://example.com/banner.jpg"
                    className="px-2 py-1 text-xs border border-slate-300 rounded-lg text-slate-900 w-56 sm:w-72 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyBannerUrl}
                    className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(false)}
                    className="px-1.5 py-1 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )}

          {customBannerImage ? (
            /* USER'S CUSTOM UPLOADED BANNER - PERFECT FIT */
            <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.3/1] lg:aspect-[2.5/1] min-h-[200px] sm:min-h-[280px] md:min-h-[360px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={customBannerImage}
                alt="iCare Computers Official Header Banner"
                className="w-full h-full object-contain md:object-cover object-center select-none"
                referrerPolicy="no-referrer"
                onError={() => {
                  setCustomBannerImage(null);
                }}
              />
            </div>
          ) : (
            /* EXECUTIVE BUSINESS PORTFOLIO & IT INFRASTRUCTURE BANNER */
            <div className="relative w-full aspect-[2.05/1] sm:aspect-[2.2/1] lg:aspect-[2.45/1] min-h-[320px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[540px] bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] overflow-hidden flex flex-col justify-between select-none">
              
              {/* TOP HEADER ROW: Left Cursive Slogan, Center Official Attached Logo, Right Credentials */}
              <div className="relative z-10 pt-3 sm:pt-5 lg:pt-6 px-4 sm:px-8 lg:px-12 grid grid-cols-12 items-center">
                {/* Left 3-4 Cols: "Your Trusted IT Partner!" in signature script */}
                <div className="col-span-12 sm:col-span-3 lg:col-span-3">
                  <div className="flex flex-col leading-none">
                    <span 
                      className="text-[#00388d] text-2xl sm:text-3xl lg:text-4xl font-bold italic"
                      style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                    >
                      Your
                    </span>
                    <span 
                      className="text-[#0055b8] text-2xl sm:text-3xl lg:text-4xl font-bold italic -mt-1 sm:-mt-1.5"
                      style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                    >
                      Trusted
                    </span>
                    <span 
                      className="text-[#f97316] text-3xl sm:text-4xl lg:text-5xl font-black italic -mt-1 sm:-mt-2 drop-shadow-xs"
                      style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                    >
                      IT Partner!
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                      <span>Ballari · Est. 2011 · Naga Reddy</span>
                    </span>
                  </div>
                </div>

                {/* Center 6 Cols: iCare COMPUTERS Official Attached Logo + Sub-strip */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-6 flex flex-col items-center justify-center text-center py-1 sm:py-0">
                  {/* Official Attached Logo Emblem & Wordmark (DO NOT CHANGE) */}
                  <div className="flex items-center justify-center">
                    <BrandLogo variant="full" size="xl" />
                  </div>

                  {/* Offline Store Sales & Service Strip */}
                  <div className="mt-1 sm:mt-1.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[9px] sm:text-[11px] lg:text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    <span className="text-[#0047ba]">OFFLINE STORE SALES</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                    <span className="text-[#0047ba]">ALL BRANDS SERVICE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                    <span className="text-[#0047ba]">CHIP-LEVEL LAB</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                    <span className="text-[#0047ba]">CCTV SURVEILLANCE</span>
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                    Physical Store in Ballari · Multi-Brand Sales &amp; Service · No Online Checkout
                  </div>
                </div>

                {/* Right 3 Cols: Credentials & Portfolio Highlights */}
                <div className="col-span-12 sm:col-span-3 lg:col-span-3 text-right hidden sm:block">
                  <div className="space-y-1">
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200/80 text-[10px] sm:text-xs font-bold text-orange-900">
                      Offline Store Counter
                    </div>
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200/80 text-[10px] sm:text-xs font-bold text-sky-900">
                      All Brands Sales &amp; Service
                    </div>
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-xs font-bold text-emerald-900">
                      Chip-Level Lab &amp; CCTV
                    </div>
                  </div>
                </div>
              </div>

              {/* MIDDLE 4 ENTERPRISE PORTFOLIO PILLARS */}
              <div className="relative z-10 px-3 sm:px-6 lg:px-8 my-auto py-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 max-w-7xl mx-auto">
                  
                  {/* PILLAR 1: OFFLINE STORE SALES (ALL BRANDS) */}
                  <div
                    onClick={() => handleCategoryClick('sales')}
                    className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-orange-400 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group p-2.5 sm:p-3.5"
                    title="Explore Offline Store Hardware Sales (All Brands)"
                  >
                    <div>
                      {/* Header Pill */}
                      <div className="bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#c2410c] text-white py-1 sm:py-1.5 px-2 rounded-lg sm:rounded-xl flex items-center justify-between gap-1 shadow-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                          <span className="text-[10px] sm:text-xs lg:text-sm font-black tracking-tight uppercase truncate">
                            STORE SALES (ALL BRANDS)
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-orange-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </div>
                      {/* Subtitle */}
                      <div className="text-[8px] sm:text-[10px] lg:text-[11px] font-bold text-orange-800 uppercase tracking-wider py-1">
                        LAPTOPS, PRINTERS &amp; CCTV
                      </div>
                    </div>

                    {/* Technical Capability Showcase */}
                    <div className="h-16 sm:h-24 lg:h-28 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950 rounded-lg sm:rounded-xl p-2 border border-slate-800 flex flex-col justify-between shadow-inner">
                      <div className="flex items-center justify-between text-[7px] sm:text-[9px] font-mono text-orange-300">
                        <span>OFFLINE COUNTER</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="text-[8px] sm:text-[10px] font-bold text-white leading-tight">
                          HP, Dell, Lenovo, Canon, CP PLUS
                        </div>
                        <div className="text-[7px] sm:text-[9px] text-slate-300 hidden sm:block">
                          Official manufacturer bill · Genuine warranty · Live demo
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[7px] sm:text-[8px] text-orange-400 font-semibold">
                        <Store className="w-2.5 h-2.5" />
                        <span>Walk-In Store in Ballari</span>
                      </div>
                    </div>
                  </div>

                  {/* PILLAR 2: CCTV SURVEILLANCE & SECURITY */}
                  <div
                    onClick={() => handleCategoryClick('portfolio')}
                    className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group p-2.5 sm:p-3.5"
                    title="View Commercial CCTV Deployments"
                  >
                    <div>
                      {/* Header Pill */}
                      <div className="bg-gradient-to-r from-[#16a34a] via-[#15803d] to-[#14532d] text-white py-1 sm:py-1.5 px-2 rounded-lg sm:rounded-xl flex items-center justify-between gap-1 shadow-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                          <span className="text-[10px] sm:text-xs lg:text-sm font-black tracking-tight uppercase truncate">
                            CCTV SURVEILLANCE
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </div>
                      {/* Subtitle */}
                      <div className="text-[8px] sm:text-[10px] lg:text-[11px] font-bold text-emerald-800 uppercase tracking-wider py-1">
                        INSTITUTIONAL SECURITY
                      </div>
                    </div>

                    {/* Technical Capability Showcase */}
                    <div className="h-16 sm:h-24 lg:h-28 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-lg sm:rounded-xl p-2 border border-slate-800 flex flex-col justify-between shadow-inner">
                      <div className="flex items-center justify-between text-[7px] sm:text-[9px] font-mono text-emerald-300">
                        <span>4K NVR ARCHITECTURE</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="text-[8px] sm:text-[10px] font-bold text-white leading-tight">
                          Commercial IP &amp; Dome Systems
                        </div>
                        <div className="text-[7px] sm:text-[9px] text-slate-300 hidden sm:block">
                          Remote live command · AI perimeter &amp; ANPR detection
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[7px] sm:text-[8px] text-emerald-400 font-semibold">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        <span>Zero-Blindspot Design</span>
                      </div>
                    </div>
                  </div>

                  {/* PILLAR 3: STRUCTURED NETWORK INFRASTRUCTURE */}
                  <div
                    onClick={() => handleCategoryClick('portfolio')}
                    className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group p-2.5 sm:p-3.5"
                    title="View Network Infrastructure Projects"
                  >
                    <div>
                      {/* Header Pill */}
                      <div className="bg-gradient-to-r from-[#4f46e5] via-[#4338ca] to-[#3730a3] text-white py-1 sm:py-1.5 px-2 rounded-lg sm:rounded-xl flex items-center justify-between gap-1 shadow-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Network className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                          <span className="text-[10px] sm:text-xs lg:text-sm font-black tracking-tight uppercase truncate">
                            NETWORK INFRA
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-indigo-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </div>
                      {/* Subtitle */}
                      <div className="text-[8px] sm:text-[10px] lg:text-[11px] font-bold text-indigo-800 uppercase tracking-wider py-1">
                        FIBRE, RACKS &amp; WI-FI 6
                      </div>
                    </div>

                    {/* Technical Capability Showcase */}
                    <div className="h-16 sm:h-24 lg:h-28 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-lg sm:rounded-xl p-2 border border-slate-800 flex flex-col justify-between shadow-inner">
                      <div className="flex items-center justify-between text-[7px] sm:text-[9px] font-mono text-indigo-300">
                        <span>GIGABIT SWITCHING</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="text-[8px] sm:text-[10px] font-bold text-white leading-tight">
                          Structured Fibre &amp; Cabling
                        </div>
                        <div className="text-[7px] sm:text-[9px] text-slate-300 hidden sm:block">
                          Server rack layout · Firewall gateway &amp; AP roaming
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[7px] sm:text-[8px] text-indigo-400 font-semibold">
                        <Wifi className="w-2.5 h-2.5" />
                        <span>High-Throughput Backbone</span>
                      </div>
                    </div>
                  </div>

                  {/* PILLAR 4: CORPORATE IT AMC & SLA */}
                  <div
                    onClick={() => handleCategoryClick('services')}
                    className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-orange-400 transition-all flex flex-col justify-between overflow-hidden cursor-pointer group p-2.5 sm:p-3.5"
                    title="View Corporate IT Annual Maintenance Contracts"
                  >
                    <div>
                      {/* Header Pill */}
                      <div className="bg-gradient-to-r from-[#ea580c] via-[#c2410c] to-[#9a3412] text-white py-1 sm:py-1.5 px-2 rounded-lg sm:rounded-xl flex items-center justify-between gap-1 shadow-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                          <span className="text-[10px] sm:text-xs lg:text-sm font-black tracking-tight uppercase truncate">
                            CORPORATE AMC &amp; SLA
                          </span>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-orange-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </div>
                      {/* Subtitle */}
                      <div className="text-[8px] sm:text-[10px] lg:text-[11px] font-bold text-orange-800 uppercase tracking-wider py-1">
                        PREVENTATIVE IT CONTRACTS
                      </div>
                    </div>

                    {/* Technical Capability Showcase */}
                    <div className="h-16 sm:h-24 lg:h-28 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 rounded-lg sm:rounded-xl p-2 border border-slate-800 flex flex-col justify-between shadow-inner">
                      <div className="flex items-center justify-between text-[7px] sm:text-[9px] font-mono text-amber-300">
                        <span>GUARANTEED SLA</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="text-[8px] sm:text-[10px] font-bold text-white leading-tight">
                          Enterprise Uptime Contracts
                        </div>
                        <div className="text-[7px] sm:text-[9px] text-slate-300 hidden sm:block">
                          Quarterly hardware audits · Priority on-site engineers
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[7px] sm:text-[8px] text-amber-400 font-semibold">
                        <Award className="w-2.5 h-2.5" />
                        <span>Dedicated Ballari Support</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ENTERPRISE TECHNOLOGY PARTNERS RIBBON STRIP */}
              <div className="relative z-10 px-3 sm:px-6 lg:px-8 py-1 sm:py-1.5">
                <div className="bg-white/95 rounded-xl border border-slate-200/90 shadow-xs px-2 sm:px-4 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                  {/* Left Block: Enterprise Systems Partners */}
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0 text-slate-800">
                    <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mr-1 hidden sm:inline">
                      Ecosystem Partners:
                    </span>
                    <span className="text-[#0052cc] font-black text-[10px] sm:text-xs tracking-tight">CISCO</span>
                    <span className="text-[#d81e05] font-black text-[9px] sm:text-[11px] tracking-tight">MikroTik</span>
                    <span className="text-[#007db8] font-black text-[10px] sm:text-xs tracking-tight">intel</span>
                    <span className="text-[#ed1c24] font-black text-[10px] sm:text-xs tracking-tight">AMD</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#007db8] text-white text-[7px] sm:text-[9px] font-serif font-black flex items-center justify-center shadow-xs">hp</span>
                    <span className="text-[#007db8] font-bold text-[10px] sm:text-xs tracking-tight">DELL</span>
                    <span className="text-[#e2231a] font-bold text-[10px] sm:text-xs tracking-tight">Lenovo</span>
                  </div>

                  <div className="h-4 w-px bg-slate-300 hidden md:block" />

                  {/* Right Block: Surveillance & Security Systems */}
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
                    <span className="text-[#c4161c] font-black text-[10px] sm:text-xs tracking-tight">CP PLUS</span>
                    <span className="text-[#d12420] font-black text-[10px] sm:text-xs tracking-tight">HIKVISION</span>
                    <span className="text-[#d62828] font-bold text-[9px] sm:text-[11px] italic">Trueview</span>
                    <span className="text-[#e52424] font-black text-[10px] sm:text-xs tracking-tight">Honeywell</span>
                    <span className="text-[#b91c1c] font-black text-[10px] sm:text-xs tracking-tight">@lhua</span>
                    <span className="text-[#ff7900] font-bold text-[9px] sm:text-[11px] tracking-tight">D-Link</span>
                  </div>
                </div>
              </div>

              {/* ROYAL BLUE BOTTOM STRIP (Phones, Location, Slogan) */}
              <div className="relative z-20 bg-gradient-to-r from-[#002666] via-[#00388d] to-[#002666] text-white px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
                
                {/* Left: Direct Phone Call to Naga Reddy */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110"
                    title="Call Naga Reddy"
                  >
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="text-xs sm:text-sm lg:text-base font-black text-white hover:text-orange-300 tracking-tight transition-colors"
                  >
                    8951219206, 8217676626
                  </a>
                </div>

                {/* Center: Location Landmark */}
                <div className="hidden md:flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-[#facc15] shrink-0" />
                  <div>
                    <span className="font-extrabold text-[#facc15] mr-1.5">iCare Computers</span>
                    <span className="text-slate-200">#Opp Kumaraswamy Temple, Beside UCO Bank, Ballari - 583104</span>
                  </div>
                </div>

                {/* Right: Slogan & Signature */}
                <div className="flex flex-col items-end leading-none">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-slate-200">
                    <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>IT INFRASTRUCTURE &amp; ENGINEERING LAB</span>
                  </div>
                  <div 
                    className="text-xs sm:text-sm font-bold text-[#facc15] italic pt-0.5"
                    style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                  >
                    Technology for a Smarter You!
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
