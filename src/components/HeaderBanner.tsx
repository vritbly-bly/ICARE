import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Globe, Upload, Trash2, Camera, Laptop, Printer, Cpu, ShieldCheck, Wrench, Sparkles, Image as ImageIcon } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { STORE_INFO } from '../data/mockData';
import { useAdmin } from '../context/AdminContext';

interface HeaderBannerProps {
  onSelectCategory?: (category: string) => void;
  onExploreCatalog?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  const { isAdmin } = useAdmin();
  const [customBannerImage, setCustomBannerImage] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('icare_custom_banner_image');
      if (stored) return stored;
    } catch {
      // ignore
    }
    return STORE_INFO.defaultBannerUrl || null;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomBannerImage(result);
        try {
          localStorage.setItem('icare_custom_banner_image', result);
        } catch {
          // ignore
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomBanner = () => {
    if (!isAdmin) return;
    setCustomBannerImage(null);
    try {
      localStorage.removeItem('icare_custom_banner_image');
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

        {/* Banner Frame Container: Perfectly fits standard ~3.5:1 ratio on desktop and adjusts responsively */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden bg-slate-900 border border-slate-200/80 group">
          {/* Quick Floating Action to Upload / Change Image (ADMIN ONLY) */}
          {isAdmin && (
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-800 bg-white/95 hover:bg-white backdrop-blur-md rounded-lg shadow-md hover:shadow-lg border border-slate-200/80 flex items-center gap-1.5 transition-all cursor-pointer"
                title="Upload official high-resolution banner image (Admin Only)"
              >
                <Upload className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">
                  {customBannerImage ? 'Change Banner' : 'Upload Banner'}
                </span>
              </button>

              {customBannerImage && (
                <button
                  onClick={handleRemoveCustomBanner}
                  className="p-1.5 text-slate-600 hover:text-red-600 bg-white/95 hover:bg-red-50 backdrop-blur-md rounded-lg shadow-md border border-slate-200/80 transition-colors cursor-pointer"
                  title="Reset to default interactive banner (Admin Only)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {customBannerImage ? (
            /* USER'S CUSTOM UPLOADED BANNER - PERFECT FIT */
            <div className="relative w-full aspect-[3.4/1] min-h-[160px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[340px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={customBannerImage}
                alt="iCare Computers Official Header Banner"
                className="w-full h-full object-contain md:object-cover object-center select-none"
                referrerPolicy="no-referrer"
                onError={() => {
                  // Fallback to interactive banner if image file is missing or invalid
                  setCustomBannerImage(null);
                }}
              />

              {/* Clickable Action Hotspots over uploaded banner bottom strip */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pt-4 pb-2 px-3 sm:px-6 hidden sm:flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-4">
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="flex items-center gap-1.5 font-bold hover:text-orange-400 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-3 h-3" />
                    </span>
                    <span>Call: {STORE_INFO.phone}</span>
                  </a>
                  <a
                    href="mailto:icarecomputers@gmail.com"
                    className="hidden md:flex items-center gap-1.5 hover:text-orange-400 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Mail className="w-3 h-3" />
                    </span>
                    <span>icarecomputers@gmail.com</span>
                  </a>
                  <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Globe className="w-3 h-3" />
                    </span>
                    <span>www.icarecomputers.in</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 font-semibold text-[11px] text-slate-200">
                  {['Laptops', 'Desktops', 'Printers', 'CCTV', 'Accessories', 'AMC'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat.toLowerCase())}
                      className="hover:text-orange-400 transition-colors px-1 cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* HIGH-FIDELITY RECREATED BANNER MATCHING THE USER'S IMAGE */
            <div className="relative w-full aspect-[3.4/1] min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[380px] bg-white overflow-hidden flex flex-col justify-between">
              {/* Background Geometric Waves: Clean white left, sweeping royal blue & orange swooshes right */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Right Royal Blue Wave & Grid Pattern */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0284c7]/20 to-[#0052cc]"
                  style={{ clipPath: 'polygon(36% 0%, 100% 0%, 100% 100%, 54% 100%)' }}
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#0284c7] via-[#005bbb] to-[#003d99]"
                  style={{ clipPath: 'polygon(42% 0%, 100% 0%, 100% 100%, 58% 100%)' }}
                />
                
                {/* Orange Dynamic Curve Layer */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#c2410c]"
                  style={{ clipPath: 'polygon(55% 82%, 100% 82%, 100% 100%, 57% 100%)' }}
                />
                <div 
                  className="absolute top-1/2 right-0 w-[500px] h-[300px] bg-gradient-to-t from-[#ea580c] to-[#f97316] opacity-90"
                  style={{ clipPath: 'ellipse(65% 45% at 75% 75%)' }}
                />

                {/* Subtle tech dots pattern on blue area */}
                <div 
                  className="absolute right-0 top-0 w-1/2 h-full opacity-10" 
                  style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} 
                />

                {/* White reflective floor highlight */}
                <div className="absolute bottom-11 inset-x-0 h-24 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
              </div>

              {/* Main Banner Body: Left Branding + Right Hardware Showcase */}
              <div className="relative z-10 flex-1 grid grid-cols-12 items-center px-4 sm:px-8 lg:px-12 pt-3 sm:pt-6 pb-2">
                {/* Left 5-6 Columns: Brand Logo, Slogan, Pillars */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-5 space-y-1.5 sm:space-y-3">
                  {/* Brand Wordmark with Cupped Hand & Laptop Icon */}
                  <div className="flex items-center gap-3">
                    <BrandLogo variant="full" size="lg" />
                  </div>

                  {/* SALES | SERVICE | SOLUTIONS Pills */}
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black tracking-widest uppercase">
                    <span className="text-[#0062cc]">SALES</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[#ea580c]">SERVICE</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[#16a34a]">SOLUTIONS</span>
                  </div>

                  {/* Cursive Tagline with Orange Swash */}
                  <div className="pt-1">
                    <p 
                      className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#0052cc] leading-tight tracking-tight italic"
                      style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                    >
                      Your Trusted IT Partner for a Smarter Tomorrow
                    </p>
                    {/* Orange swoosh underline */}
                    <div className="w-24 sm:w-36 h-1 bg-gradient-to-r from-[#ea580c] via-[#f97316] to-transparent rounded-full mt-0.5" />
                  </div>
                </div>

                {/* Right 6-7 Columns: Hardware Hardware Showcase (Laptop, Monitor, Tower, Printer, CCTV) */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex items-end justify-end relative h-full">
                  {/* Hikvision CCTV Camera (Top Right) */}
                  <div className="absolute -top-2 sm:top-1 right-2 sm:right-6 flex flex-col items-center drop-shadow-xl z-20">
                    <div className="bg-white/95 px-2 py-1 rounded-md border border-slate-200 text-[9px] font-black text-slate-800 tracking-wider flex items-center gap-1 shadow-sm">
                      <Camera className="w-3 h-3 text-red-600" />
                      <span>HIKVISION CCTV</span>
                    </div>
                  </div>

                  {/* Interactive Tech Hardware Grid Cluster */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-xl pb-2 items-end">
                    {/* 1. Laptops */}
                    <div 
                      onClick={() => handleCategoryClick('laptops')}
                      className="bg-white/90 hover:bg-white backdrop-blur-xs p-2 rounded-xl shadow-lg border border-slate-200/90 text-center group cursor-pointer transition-all hover:-translate-y-1"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <Laptop className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-800">Laptops</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium">Dell • HP • Asus</div>
                    </div>

                    {/* 2. Desktops & Custom Rigs */}
                    <div 
                      onClick={() => handleCategoryClick('desktops')}
                      className="bg-white/90 hover:bg-white backdrop-blur-xs p-2 rounded-xl shadow-lg border border-slate-200/90 text-center group cursor-pointer transition-all hover:-translate-y-1"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-800">Desktops</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium">Core i3/i5/i7 Tower</div>
                    </div>

                    {/* 3. Printers */}
                    <div 
                      onClick={() => handleCategoryClick('printers')}
                      className="bg-white/90 hover:bg-white backdrop-blur-xs p-2 rounded-xl shadow-lg border border-slate-200/90 text-center group cursor-pointer transition-all hover:-translate-y-1"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-800">Printers</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium">Epson • Canon</div>
                    </div>

                    {/* 4. CCTV Kits */}
                    <div 
                      onClick={() => handleCategoryClick('cctv')}
                      className="bg-white/90 hover:bg-white backdrop-blur-xs p-2 rounded-xl shadow-lg border border-slate-200/90 text-center group cursor-pointer transition-all hover:-translate-y-1"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-800">CCTV 4K</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium">Night Vision Cam</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Multi-Tone Ribbon (Exact Match to Banner Bottom Bar) */}
              <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 text-white font-medium text-xs leading-none">
                {/* Left Blue Strip: Call, Email, Web */}
                <div className="col-span-12 md:col-span-7 bg-[#004099] px-4 sm:px-8 py-2.5 flex flex-wrap items-center gap-3 sm:gap-6">
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="flex items-center gap-1.5 hover:text-orange-300 transition-colors font-bold"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-3 h-3" />
                    </span>
                    <span>Call: {STORE_INFO.formattedPhone}</span>
                  </a>

                  <a
                    href="mailto:icarecomputers@gmail.com"
                    className="flex items-center gap-1.5 hover:text-orange-300 transition-colors text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-3 h-3" />
                    </span>
                    <span>icarecomputers@gmail.com</span>
                  </a>

                  <span className="hidden xl:flex items-center gap-1.5 text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Globe className="w-3 h-3" />
                    </span>
                    <span>www.icarecomputers.in</span>
                  </span>
                </div>

                {/* Right Orange Strip: Category Pills */}
                <div className="col-span-12 md:col-span-5 bg-[#ea580c] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-4 font-semibold text-[11px] uppercase tracking-wider">
                  {['Laptops', 'Desktops', 'Printers', 'CCTV', 'Accessories', 'AMC'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleCategoryClick(item.toLowerCase())}
                      className="hover:text-amber-200 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
