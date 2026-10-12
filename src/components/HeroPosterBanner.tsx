import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  ShoppingCart, 
  Wrench, 
  Camera, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Lock
} from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { OfficialBrandLogo } from './OfficialBrandLogo';

interface HeroPosterBannerProps {
  onNavigateToSection?: (sectionId: string) => void;
  onSelectBrand?: (brandName: string) => void;
}

export const HeroPosterBanner: React.FC<HeroPosterBannerProps> = ({
  onNavigateToSection,
  onSelectBrand,
}) => {
  const [activeBrandModal, setActiveBrandModal] = useState<string | null>(null);

  const handleBrandClick = (brandName: string, category: string) => {
    if (onSelectBrand) {
      onSelectBrand(brandName);
    }
    setActiveBrandModal(`${category} - ${brandName}`);
  };

  const handleWhatsAppInquiry = (topic: string) => {
    const text = encodeURIComponent(
      `Hello Naga Reddy sir,\nI saw the official banner at iCare Computers and want to inquire about:\n• ${topic}\nPlease share in-store availability, pricing & warranty details.`
    );
    window.open(`https://wa.me/91${STORE_INFO.phone}?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="relative w-full bg-slate-100/80 py-4 sm:py-6 px-2 sm:px-4 lg:px-6 scroll-mt-20">
      <div id="hero-banner" className="absolute -top-20" />
      <div className="max-w-5xl mx-auto">
        
        {/* MAIN POSTER CONTAINER (Matching final 3.png exactly) */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-b from-[#eaf4fe] via-white to-[#f0f4f9] border border-slate-300/80">
          
          {/* DECORATIVE CURVED TOP CORNER ACCENTS */}
          <div className="absolute top-0 left-0 w-44 sm:w-72 h-36 sm:h-52 bg-gradient-to-br from-[#0052cc] via-[#0066cc] to-[#38bdf8] rounded-br-[100%] opacity-90 pointer-events-none z-0" />
          <div className="absolute top-0 left-0 w-36 sm:w-60 h-28 sm:h-44 border-b-4 sm:border-b-8 border-r-4 sm:border-r-8 border-[#f97316] rounded-br-[100%] opacity-90 pointer-events-none z-0" />
          <div className="absolute top-0 right-0 w-32 sm:w-48 h-24 sm:h-36 bg-gradient-to-bl from-sky-400/20 to-transparent rounded-bl-full pointer-events-none z-0" />

          {/* ======================================================== */}
          {/* 1. TOP HEADER: Slogan & Official Icare Computers Logo   */}
          {/* ======================================================== */}
          <div className="relative z-10 pt-4 sm:pt-6 px-4 sm:px-8 flex flex-col items-center">
            
            {/* Top Row: Left store badge, Right Slogan */}
            <div className="w-full flex items-center justify-between min-h-[44px]">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-sky-300/80 shadow-xs text-xs font-bold text-sky-950 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OFFLINE STORE SALES &amp; SERVICE</span>
                <span className="text-orange-500 font-extrabold">· BALLARI</span>
              </div>
              <div className="sm:hidden w-8" />
              
              {/* Top Right Signature Script: "Your Trusted Tech Partner!" */}
              <div 
                className="flex flex-col items-end leading-none select-none text-right"
                style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
              >
                <span className="text-[#0047ba] text-2xl sm:text-4xl lg:text-5xl font-bold italic tracking-tight">
                  Your Trusted
                </span>
                <span className="text-[#f97316] text-3xl sm:text-5xl lg:text-6xl font-black italic -mt-1 sm:-mt-2 drop-shadow-xs">
                  Tech Partner!
                </span>
              </div>
            </div>

            {/* Central Official Logo: Laptop in hand + "I care COMPUTERS" */}
            <div className="mt-2 sm:mt-3 flex flex-col items-center justify-center text-center">
              <div className="transform scale-100 sm:scale-105 lg:scale-110 origin-center">
                <BrandLogo variant="full" size="xl" />
              </div>
            </div>

            {/* Blue Ribbon Banner: SALES • SERVICE • CCTV & SECURITY */}
            <div className="mt-3 sm:mt-4 w-full max-w-2xl">
              <div className="bg-gradient-to-r from-[#002f6c] via-[#0047ba] to-[#002f6c] text-white py-1.5 sm:py-2 px-4 sm:px-6 rounded-full shadow-md flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm lg:text-base font-extrabold uppercase tracking-wider text-center">
                <span className="tracking-widest">SALES</span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#facc15] shrink-0" />
                <span className="tracking-widest">SERVICE</span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#facc15] shrink-0" />
                <span className="tracking-widest text-[#facc15]">CCTV &amp; SECURITY</span>
              </div>
            </div>
          </div>


          {/* ======================================================== */}
          {/* 2. SECTION: LAPTOPS                                      */}
          {/* ======================================================== */}
          <div className="relative z-10 mt-6 sm:mt-8 px-3 sm:px-6 lg:px-8">
            
            {/* Header Ribbon */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#00388d] text-white font-black text-xs sm:text-sm lg:text-base px-4 sm:px-6 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-xs">
                LAPTOPS
              </div>
              <div className="flex-1 bg-gradient-to-r from-[#facc15] via-[#fb923c] to-[#f97316] text-[#002f6c] font-bold text-[11px] sm:text-xs lg:text-sm px-4 py-1 sm:py-1.5 rounded-full shadow-xs truncate">
                Latest Laptops for Work, Study &amp; Entertainment
              </div>
            </div>

            {/* 5 Laptops Display Row */}
            <div className="bg-gradient-to-b from-white/90 to-slate-50/90 rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-xs">
              <div className="grid grid-cols-5 gap-2 sm:gap-3 items-end">
                
                {/* 1. Dell Laptop */}
                <div 
                  onClick={() => handleBrandClick('Dell', 'Laptops')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Dell Inspiron & Vostro Laptops"
                >
                  <div className="relative w-full aspect-[16/10] max-w-[150px] bg-slate-900 rounded-t-lg sm:rounded-t-xl p-1 sm:p-1.5 border border-slate-700 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full bg-gradient-to-br from-[#0076ce] via-[#1e40af] to-[#0f172a] rounded flex items-center justify-center overflow-hidden relative">
                      {/* Windows 11 Blue Bloom Wallpaper simulation */}
                      <div className="w-8 sm:w-14 h-8 sm:h-14 rounded-full bg-sky-400/40 blur-xs" />
                      <div className="absolute bottom-1 right-1 text-[6px] sm:text-[8px] font-mono text-white/70">Win 11</div>
                    </div>
                  </div>
                  {/* Base Deck */}
                  <div className="w-[108%] h-2 sm:h-3 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-b-md shadow-sm -mt-0.5" />
                </div>

                {/* 2. HP Laptop */}
                <div 
                  onClick={() => handleBrandClick('HP', 'Laptops')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="HP Pavilion & 15s Laptops"
                >
                  <div className="relative w-full aspect-[16/10] max-w-[150px] bg-slate-200 rounded-t-lg sm:rounded-t-xl p-1 sm:p-1.5 border border-slate-400 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 via-slate-200 to-sky-100 rounded flex items-center justify-center overflow-hidden relative">
                      {/* HP emblem on screen */}
                      <div className="w-5 sm:w-7 h-5 sm:h-7 rounded-full bg-[#0096D6] text-white text-[7px] sm:text-[9px] font-black italic flex items-center justify-center shadow-xs">hp</div>
                    </div>
                  </div>
                  <div className="w-[108%] h-2 sm:h-3 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-b-md shadow-sm -mt-0.5" />
                </div>

                {/* 3. Lenovo Laptop */}
                <div 
                  onClick={() => handleBrandClick('Lenovo', 'Laptops')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Lenovo ThinkPad & IdeaPad Laptops"
                >
                  <div className="relative w-full aspect-[16/10] max-w-[150px] bg-slate-900 rounded-t-lg sm:rounded-t-xl p-1 sm:p-1.5 border border-slate-700 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 via-rose-900 to-amber-900 rounded flex items-center justify-center overflow-hidden relative">
                      <div className="text-[7px] sm:text-[10px] font-black text-white/90 tracking-widest">Lenovo</div>
                    </div>
                  </div>
                  <div className="w-[108%] h-2 sm:h-3 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 rounded-b-md shadow-sm -mt-0.5" />
                </div>

                {/* 4. Acer Laptop */}
                <div 
                  onClick={() => handleBrandClick('Acer', 'Laptops')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Acer Aspire & Swift Laptops"
                >
                  <div className="relative w-full aspect-[16/10] max-w-[150px] bg-zinc-900 rounded-t-lg sm:rounded-t-xl p-1 sm:p-1.5 border border-zinc-700 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-teal-900 to-zinc-950 rounded flex items-center justify-center overflow-hidden relative">
                      <div className="text-[8px] sm:text-[11px] font-black text-emerald-400 italic">acer</div>
                    </div>
                  </div>
                  <div className="w-[108%] h-2 sm:h-3 bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-900 rounded-b-md shadow-sm -mt-0.5" />
                </div>

                {/* 5. ASUS Laptop */}
                <div 
                  onClick={() => handleBrandClick('ASUS', 'Laptops')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="ASUS VivoBook & TUF Gaming Laptops"
                >
                  <div className="relative w-full aspect-[16/10] max-w-[150px] bg-slate-950 rounded-t-lg sm:rounded-t-xl p-1 sm:p-1.5 border border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded flex items-center justify-center overflow-hidden relative">
                      <div className="text-[7px] sm:text-[10px] font-black text-white tracking-widest">ASUS</div>
                    </div>
                  </div>
                  <div className="w-[108%] h-2 sm:h-3 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-b-md shadow-sm -mt-0.5" />
                </div>

              </div>

              {/* 5 Laptop Brand Logos Underneath */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 grid grid-cols-5 gap-2 items-center text-center">
                <button
                  onClick={() => handleBrandClick('Dell', 'Laptops')}
                  className="p-1 sm:p-2 bg-white hover:bg-sky-50 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Dell Laptops"
                >
                  <OfficialBrandLogo name="dell" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('HP', 'Laptops')}
                  className="p-1 sm:p-2 bg-white hover:bg-sky-50 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="HP Laptops"
                >
                  <OfficialBrandLogo name="hp" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Lenovo', 'Laptops')}
                  className="p-1 sm:p-2 bg-white hover:bg-sky-50 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Lenovo Laptops"
                >
                  <OfficialBrandLogo name="lenovo" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Acer', 'Laptops')}
                  className="p-1 sm:p-2 bg-white hover:bg-sky-50 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Acer Laptops"
                >
                  <OfficialBrandLogo name="acer" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('ASUS', 'Laptops')}
                  className="p-1 sm:p-2 bg-white hover:bg-sky-50 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="ASUS Laptops"
                >
                  <OfficialBrandLogo name="asus" size="sm" />
                </button>
              </div>
            </div>

          </div>


          {/* ======================================================== */}
          {/* 3. SECTION: PRINTERS                                     */}
          {/* ======================================================== */}
          <div className="relative z-10 mt-6 sm:mt-8 px-3 sm:px-6 lg:px-8">
            
            {/* Header Ribbon */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#00388d] text-white font-black text-xs sm:text-sm lg:text-base px-4 sm:px-6 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-xs">
                PRINTERS
              </div>
              <div className="flex-1 bg-gradient-to-r from-[#facc15] via-[#fb923c] to-[#f97316] text-[#002f6c] font-bold text-[11px] sm:text-xs lg:text-sm px-4 py-1 sm:py-1.5 rounded-full shadow-xs truncate">
                Print Smarter, Work Better
              </div>
            </div>

            {/* 5 Printers Display Row */}
            <div className="bg-gradient-to-b from-white/90 to-slate-50/90 rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-xs">
              <div className="grid grid-cols-5 gap-2 sm:gap-3 items-end">
                
                {/* 1. HP Ink Tank Printer */}
                <div 
                  onClick={() => handleBrandClick('HP', 'Printers')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="HP All-in-One Ink Tank & Laser Printers"
                >
                  <div className="w-full aspect-[4/3] max-w-[150px] bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-lg p-1.5 border border-slate-700 shadow-md group-hover:scale-105 transition-transform duration-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[6px] text-slate-400 font-mono">
                      <span>HP TANK</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                    {/* Paper Sheet output */}
                    <div className="h-4 sm:h-6 bg-white rounded-t p-0.5 border border-slate-300 shadow-inner flex flex-col gap-0.5 justify-center">
                      <div className="h-1 bg-cyan-500 rounded-full w-3/4" />
                      <div className="h-1 bg-magenta-500 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>

                {/* 2. Canon MegaTank Printer */}
                <div 
                  onClick={() => handleBrandClick('Canon', 'Printers')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Canon MegaTank & LaserJet Printers"
                >
                  <div className="w-full aspect-[4/3] max-w-[150px] bg-gradient-to-b from-slate-900 via-zinc-900 to-black rounded-lg p-1.5 border border-zinc-700 shadow-md group-hover:scale-105 transition-transform duration-200 flex flex-col justify-between">
                    <div className="text-[6px] text-red-400 font-bold tracking-tight">Canon PIXMA</div>
                    {/* Paper output */}
                    <div className="h-4 sm:h-6 bg-white rounded-t p-0.5 border border-slate-300 shadow-inner flex items-center justify-center">
                      <span className="text-[5px] sm:text-[7px] font-bold text-slate-800">COLOR PRINT</span>
                    </div>
                  </div>
                </div>

                {/* 3. Epson EcoTank Printer */}
                <div 
                  onClick={() => handleBrandClick('Epson', 'Printers')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Epson EcoTank Multi-Function Printers"
                >
                  <div className="w-full aspect-[4/3] max-w-[150px] bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-lg p-1.5 border border-slate-700 shadow-md group-hover:scale-105 transition-transform duration-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[6px] text-blue-400 font-black">EPSON</span>
                      {/* 4 Ink Bottles dots */}
                      <div className="flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span className="w-1 h-1 rounded-full bg-pink-500" />
                        <span className="w-1 h-1 rounded-full bg-yellow-400" />
                        <span className="w-1 h-1 rounded-full bg-slate-900 border border-white" />
                      </div>
                    </div>
                    {/* Output sheet */}
                    <div className="h-4 sm:h-6 bg-white rounded-t p-0.5 border border-slate-300 flex items-center justify-center">
                      <div className="w-full h-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400" />
                    </div>
                  </div>
                </div>

                {/* 4. Brother Laser Printer */}
                <div 
                  onClick={() => handleBrandClick('Brother', 'Printers')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Brother Heavy-Duty Laser Printers"
                >
                  <div className="w-full aspect-[4/3] max-w-[150px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black rounded-lg p-1.5 border border-zinc-700 shadow-md group-hover:scale-105 transition-transform duration-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[6px] text-slate-300 font-bold">brother</span>
                      <span className="w-2.5 h-1.5 bg-emerald-500/80 rounded-xs" />
                    </div>
                    <div className="h-3 sm:h-4 bg-zinc-900 border-t border-zinc-600 rounded-b flex items-center justify-center">
                      <span className="text-[5px] text-zinc-400">LASER TRAY</span>
                    </div>
                  </div>
                </div>

                {/* 5. Pantum Laser Printer */}
                <div 
                  onClick={() => handleBrandClick('Pantum', 'Printers')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Pantum Monochrome Laser Printers"
                >
                  <div className="w-full aspect-[4/3] max-w-[150px] bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-lg p-1.5 border border-slate-300 shadow-md group-hover:scale-105 transition-transform duration-200 flex flex-col justify-between">
                    <div className="text-[6px] text-red-600 font-bold">PANTUM</div>
                    <div className="h-3 sm:h-4 bg-slate-200 border-t border-slate-400 rounded-b flex items-center justify-center">
                      <span className="text-[5px] text-slate-700">COMPACT</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 5 Printer Brand Logos Underneath */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 grid grid-cols-5 gap-2 items-center text-center">
                <button
                  onClick={() => handleBrandClick('HP', 'Printers')}
                  className="p-1 sm:p-2 bg-white hover:bg-sky-50 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="HP Printers"
                >
                  <OfficialBrandLogo name="hp" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Canon', 'Printers')}
                  className="p-1 sm:p-2 bg-white hover:bg-red-50 rounded-xl border border-slate-200/90 hover:border-red-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Canon Printers"
                >
                  <OfficialBrandLogo name="canon" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Epson', 'Printers')}
                  className="p-1 sm:p-2 bg-white hover:bg-blue-50 rounded-xl border border-slate-200/90 hover:border-blue-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Epson Printers"
                >
                  <OfficialBrandLogo name="epson" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Brother', 'Printers')}
                  className="p-1 sm:p-2 bg-white hover:bg-sky-50 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Brother Printers"
                >
                  <OfficialBrandLogo name="brother" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Pantum', 'Printers')}
                  className="p-1 sm:p-2 bg-white hover:bg-slate-50 rounded-xl border border-slate-200/90 hover:border-slate-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Pantum Printers"
                >
                  <OfficialBrandLogo name="pantum" size="sm" />
                </button>
              </div>
            </div>

          </div>


          {/* ======================================================== */}
          {/* 4. SECTION: CCTV & SECURITY                              */}
          {/* ======================================================== */}
          <div className="relative z-10 mt-6 sm:mt-8 px-3 sm:px-6 lg:px-8">
            
            {/* Header Ribbon */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#00388d] text-white font-black text-xs sm:text-sm lg:text-base px-4 sm:px-6 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-xs">
                CCTV &amp; SECURITY
              </div>
              <div className="flex-1 bg-gradient-to-r from-[#facc15] via-[#fb923c] to-[#f97316] text-[#002f6c] font-bold text-[11px] sm:text-xs lg:text-sm px-4 py-1 sm:py-1.5 rounded-full shadow-xs truncate">
                Complete Security Solutions for Home &amp; Business
              </div>
            </div>

            {/* CCTV Cameras & DVR Console Showcase */}
            <div className="bg-gradient-to-b from-white/90 to-slate-50/90 rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-xs">
              <div className="relative py-2 sm:py-4 flex flex-wrap items-center justify-around gap-2 sm:gap-4">
                
                {/* 1. White Bullet Camera */}
                <div 
                  onClick={() => handleBrandClick('CP PLUS', 'CCTV')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Outdoor Waterproof Bullet Camera"
                >
                  <div className="w-14 sm:w-20 h-10 sm:h-14 bg-gradient-to-r from-slate-200 to-slate-100 rounded-r-full rounded-l-md border border-slate-300 shadow-md flex items-center justify-end pr-1 sm:pr-2 group-hover:scale-105 transition-transform">
                    <div className="w-3.5 sm:w-5 h-3.5 sm:h-5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-red-600 animate-pulse" />
                    </div>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-600 mt-1">Bullet IP</span>
                </div>

                {/* 2. CP PLUS Bullet Camera */}
                <div 
                  onClick={() => handleBrandClick('CP PLUS', 'CCTV')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="CP PLUS HD Infrared Camera"
                >
                  <div className="w-16 sm:w-24 h-11 sm:h-15 bg-white rounded-r-full rounded-l-md border border-slate-300 shadow-md flex items-center justify-between px-1.5 group-hover:scale-105 transition-transform">
                    <span className="text-[6px] sm:text-[8px] font-bold text-red-600">CP PLUS</span>
                    <div className="w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-slate-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-red-600 mt-1">CP PLUS</span>
                </div>

                {/* 3. Hikvision PTZ Speed Dome Camera (Large Central) */}
                <div 
                  onClick={() => handleBrandClick('Hikvision', 'CCTV')}
                  className="flex flex-col items-center group cursor-pointer -mt-2"
                  title="Hikvision High-Definition Speed Dome PTZ"
                >
                  <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-full border-2 border-slate-300 shadow-xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-[6px] sm:text-[8px] font-black text-slate-800 tracking-wider">HIKVISION</span>
                    <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center shadow-inner mt-1">
                      <div className="w-3 sm:w-5 h-3 sm:h-5 rounded-full bg-blue-900/80 border border-cyan-400 flex items-center justify-center">
                        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-red-600" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-xs font-black text-[#d81e05] mt-1">HIKVISION PTZ</span>
                </div>

                {/* 4. Trueview Eyeball Dome Camera */}
                <div 
                  onClick={() => handleBrandClick('Trueview', 'CCTV')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Trueview Dome Camera"
                >
                  <div className="w-12 sm:w-18 h-12 sm:h-18 bg-white rounded-full border border-slate-300 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="w-7 sm:w-11 h-7 sm:h-11 rounded-full bg-slate-900 flex items-center justify-center">
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-rose-500/80" />
                    </div>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-700 mt-1">Trueview</span>
                </div>

                {/* 5. Honeywell Dome Camera */}
                <div 
                  onClick={() => handleBrandClick('Honeywell', 'CCTV')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Honeywell Commercial Camera"
                >
                  <div className="w-12 sm:w-18 h-12 sm:h-18 bg-white rounded-full border border-slate-300 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="w-7 sm:w-11 h-7 sm:h-11 rounded-full bg-slate-900 flex items-center justify-center">
                      <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-amber-400" />
                    </div>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-red-600 mt-1">Honeywell</span>
                </div>

                {/* 6. Dahua Bullet Camera */}
                <div 
                  onClick={() => handleBrandClick('Dahua', 'CCTV')}
                  className="flex flex-col items-center group cursor-pointer"
                  title="Dahua 4K Night Vision Camera"
                >
                  <div className="w-14 sm:w-20 h-10 sm:h-14 bg-gradient-to-l from-slate-200 to-white rounded-l-full rounded-r-md border border-slate-300 shadow-md flex items-center justify-start pl-1 sm:pl-2 group-hover:scale-105 transition-transform">
                    <div className="w-3.5 sm:w-5 h-3.5 sm:h-5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-red-600 mt-1">Dahua</span>
                </div>

              </div>

              {/* Central NVR / DVR Unit Console */}
              <div className="mt-2 flex justify-center">
                <div className="w-full max-w-sm sm:max-w-md h-6 sm:h-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-lg border border-slate-800 shadow-lg px-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[8px] sm:text-[10px] font-bold text-red-500">CP PLUS</span>
                  </div>
                  <span className="text-[7px] sm:text-[9px] font-mono text-slate-400">4K NVR / DVR EMBEDDED CONSOLE</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>

              {/* 5 CCTV Brand Logos Underneath */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 grid grid-cols-5 gap-2 items-center text-center">
                <button
                  onClick={() => handleBrandClick('CP PLUS', 'CCTV')}
                  className="p-1 sm:p-2 bg-white hover:bg-red-50 rounded-xl border border-slate-200/90 hover:border-red-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="CP PLUS Security"
                >
                  <OfficialBrandLogo name="cp plus" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Hikvision', 'CCTV')}
                  className="p-1 sm:p-2 bg-white hover:bg-red-50 rounded-xl border border-slate-200/90 hover:border-red-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Hikvision Surveillance"
                >
                  <OfficialBrandLogo name="hikvision" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Trueview', 'CCTV')}
                  className="p-1 sm:p-2 bg-white hover:bg-slate-50 rounded-xl border border-slate-200/90 hover:border-slate-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Trueview Cameras"
                >
                  <OfficialBrandLogo name="trueview" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Honeywell', 'CCTV')}
                  className="p-1 sm:p-2 bg-white hover:bg-red-50 rounded-xl border border-slate-200/90 hover:border-red-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Honeywell Security"
                >
                  <OfficialBrandLogo name="honeywell" size="sm" />
                </button>

                <button
                  onClick={() => handleBrandClick('Dahua', 'CCTV')}
                  className="p-1 sm:p-2 bg-white hover:bg-red-50 rounded-xl border border-slate-200/90 hover:border-red-400 shadow-2xs transition-all flex items-center justify-center h-8 sm:h-11 cursor-pointer"
                  title="Dahua Technology"
                >
                  <OfficialBrandLogo name="dahua" size="sm" />
                </button>
              </div>
            </div>

          </div>


          {/* ======================================================== */}
          {/* 5. 4 CORE PILLARS: SALES • SERVICE • CCTV • AMC          */}
          {/* ======================================================== */}
          <div className="relative z-10 mt-6 sm:mt-8 px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              
              {/* 1. SALES PILLAR */}
              <div 
                onClick={() => onNavigateToSection?.('offline-store')}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-400 transition-all flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Blue Circular Icon */}
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-[#0052cc] to-[#0096ff] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-2">
                  <ShoppingCart className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                {/* Pill */}
                <div className="bg-[#0052cc] text-white font-black text-[10px] sm:text-xs px-3 sm:px-4 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-xs mb-1">
                  SALES
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 font-semibold leading-snug">
                  Laptops, Desktops, Printers, Accessories &amp; More
                </p>
              </div>

              {/* 2. SERVICE PILLAR */}
              <div 
                onClick={() => onNavigateToSection?.('services')}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-orange-400 transition-all flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Orange Circular Icon */}
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f97316] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-2">
                  <Wrench className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                {/* Pill */}
                <div className="bg-[#ea580c] text-white font-black text-[10px] sm:text-xs px-3 sm:px-4 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-xs mb-1">
                  SERVICE
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 font-semibold leading-snug">
                  Expert Repair &amp; Maintenance
                </p>
              </div>

              {/* 3. CCTV & SECURITY PILLAR */}
              <div 
                onClick={() => onNavigateToSection?.('services')}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Green Circular Icon */}
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-[#15803d] to-[#22c55e] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-2">
                  <Camera className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                {/* Pill */}
                <div className="bg-[#15803d] text-white font-black text-[10px] sm:text-xs px-3 sm:px-4 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-xs mb-1">
                  CCTV &amp; SECURITY
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 font-semibold leading-snug">
                  Surveillance Systems, Installation &amp; Support
                </p>
              </div>

              {/* 4. AMC PILLAR */}
              <div 
                onClick={() => onNavigateToSection?.('services')}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-400 transition-all flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Purple Circular Icon */}
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-[#6b21a8] to-[#a855f7] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-2">
                  <ShieldCheck className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                {/* Pill */}
                <div className="bg-[#6b21a8] text-white font-black text-[10px] sm:text-xs px-3 sm:px-4 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-xs mb-1">
                  AMC
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 font-semibold leading-snug">
                  Annual Maintenance Contracts Available
                </p>
              </div>

            </div>
          </div>


          {/* ======================================================== */}
          {/* 6. BOTTOM CONTACT BANNER (Matching final 3.png exactly)  */}
          {/* ======================================================== */}
          <div className="relative z-10 mt-6 sm:mt-8 bg-gradient-to-r from-[#001f4d] via-[#00388d] to-[#001f4d] text-white p-4 sm:p-6 shadow-inner">
            
            {/* Top yellow/orange wave border line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#facc15] via-[#fb923c] to-[#facc15]" />

            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Phone Dial & Action Row */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Circular Orange Phone Icon Button */}
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-[#f97316] to-[#fb923c] hover:from-[#ea580c] hover:to-[#f97316] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 shrink-0"
                  title="Call Store Now"
                  aria-label="Call Store Now"
                >
                  <Phone className="w-6 sm:w-8 h-6 sm:h-8 text-white fill-white" />
                </a>

                {/* Inquiry Title & Phone Numbers */}
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide uppercase">
                    For Enquiries &amp; Orders
                  </span>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <a
                      href="tel:8951219206"
                      className="text-xl sm:text-3xl lg:text-4xl font-black text-[#facc15] hover:text-white transition-colors tracking-tight font-heading"
                    >
                      8951219206,
                    </a>
                    <a
                      href="tel:8217676626"
                      className="text-xl sm:text-3xl lg:text-4xl font-black text-[#facc15] hover:text-white transition-colors tracking-tight font-heading"
                    >
                      8217676626
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action Button */}
              <button
                onClick={() => handleWhatsAppInquiry('All Brands Laptops, Printers & CCTV')}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </button>

            </div>

            {/* Bottom Landmark Strip */}
            <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-center gap-2 text-center text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#facc15] shrink-0" />
              <span className="text-slate-100 font-medium">
                <strong className="text-[#facc15] font-bold">I care Computers</strong> – Your One-Stop Destination for All Your Computing Needs
              </span>
            </div>

            <div className="text-[10px] text-center text-slate-400 mt-1">
              #Opp Kumaraswamy Temple, Beside UCO Bank, Ballari - 583104
            </div>

            {/* Bottom golden wave border line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#f97316] via-[#facc15] to-[#f97316]" />

          </div>

        </div>

      </div>

      {/* QUICK BRAND INQUIRY MODAL */}
      {activeBrandModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {activeBrandModal}
              </h4>
              <button
                onClick={() => setActiveBrandModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600">
              <p>
                We provide genuine brand hardware, manufacturer warranty bill, and certified offline chip-level service for <strong>{activeBrandModal}</strong> at our Ballari showroom.
              </p>
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Physical Store in Ballari:</span>
                </div>
                <div>Walk in for live demonstration, stock confirmation, or expert repair consultation.</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  handleWhatsAppInquiry(activeBrandModal);
                  setActiveBrandModal(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Query</span>
              </button>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
