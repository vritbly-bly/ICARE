import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Globe, Upload, Trash2, Camera, Laptop, Printer, Cpu, ShieldCheck, Wrench, Sparkles, Image as ImageIcon, CloudUpload } from 'lucide-react';
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
  const [isUploading, setIsUploading] = useState(false);

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
          window.dispatchEvent(new Event('icare_banner_updated'));
        } catch {
          // ignore
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyBannerUrl = () => {
    if (!bannerUrlText.trim()) return;
    try {
      new URL(bannerUrlText.trim());
      setCustomBannerImage(bannerUrlText.trim());
      localStorage.setItem('icare_custom_banner_image', bannerUrlText.trim());
      window.dispatchEvent(new Event('icare_banner_updated'));
      setBannerUrlText('');
      setShowUrlInput(false);
    } catch {
      // invalid URL
    }
  };

  const handleRemoveCustomBanner = () => {
    if (!isAdmin) return;
    setCustomBannerImage(null);
    try {
      localStorage.removeItem('icare_custom_banner_image');
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

        {/* Banner Frame Container: Perfectly fits standard ~3.5:1 ratio on desktop and adjusts responsively */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden bg-slate-900 border border-slate-200/80 group">
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
                    title="Reset to default interactive banner (Admin Only)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {onOpenPublishSync && (
                  <button
                    type="button"
                    onClick={onOpenPublishSync}
                    className="px-2.5 py-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-md border border-emerald-400/40 flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Publish current banner & catalog changes to live visitors"
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
            /* HIGH-FIDELITY FAITHFUL RECREATION OF USER'S REFURBISHED PREMIUM LAPTOPS BANNER */
            <div className="relative w-full aspect-[3.4/1] min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px] bg-white overflow-hidden flex flex-col justify-between select-none">
              {/* Wooden Tabletop Surface in middle/lower section */}
              <div 
                className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, #d8b88d 0%, #c49d68 15%, #b58953 45%, #9e723e 75%, #875e2c 100%)',
                  boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                {/* Wood plank subtle lines */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.08)_50%,transparent_100%)] bg-[length:140px_100%]" />
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#5a3915_1px,transparent_1px)] bg-[size:16px_16px]" />
              </div>

              {/* Upper White Backdrop */}
              <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-slate-50 via-white to-amber-50/40 pointer-events-none" />

              {/* Dynamic Bottom-Right Sweeping Royal Blue Wave */}
              <div 
                className="absolute right-0 bottom-0 w-[68%] h-[56%] pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(135deg, #0056b3 0%, #003d82 45%, #00224d 100%)',
                  clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '-8px -4px 20px rgba(0,35,80,0.4)'
                }}
              >
                {/* Cyan Glow Wave Edge */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#38bdf8] to-transparent opacity-80"
                  style={{
                    clipPath: 'polygon(17% 0%, 20% 0%, 3% 100%, 0% 100%)'
                  }}
                />
                {/* Digital Circuit Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '18px 18px'
                  }}
                />
              </div>

              {/* TOP HEADER ROW: Left Brand Logo, Center Cursive Slogan, Right Cursive Slogan */}
              <div className="relative z-20 pt-2 sm:pt-4 px-3 sm:px-6 md:px-8 grid grid-cols-12 items-start">
                {/* Left 4 Cols: iCare Logo */}
                <div className="col-span-12 sm:col-span-4 flex items-center gap-2">
                  <BrandLogo variant="full" size="md" />
                </div>

                {/* Center 5 Cols: 'Your Trusted Tech Partner :' */}
                <div className="col-span-12 sm:col-span-4 text-center hidden sm:block pt-0.5">
                  <p 
                    className="text-lg sm:text-2xl md:text-3xl font-bold text-[#005bbb] tracking-tight italic"
                    style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                  >
                    Your Trusted Tech Partner :
                  </p>
                </div>

                {/* Right 3 Cols: 'Smart Choice for a Smarter Tomorrow' */}
                <div className="col-span-12 sm:col-span-4 text-right hidden sm:block pt-0.5 pr-2">
                  <p 
                    className="text-lg sm:text-2xl md:text-3xl font-bold text-[#005bbb] tracking-tight italic"
                    style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                  >
                    Smart Choice for a <span className="text-[#0047ba]">Smarter Tomorrow</span>
                  </p>
                </div>
              </div>

              {/* CENTER CORE: 'REFURBISHED PREMIUM LAPTOPS' + Laptops Row */}
              <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-1">
                {/* Emblem Badge Cluster */}
                <div className="flex flex-col items-center text-center space-y-0.5 sm:space-y-1 drop-shadow-md">
                  {/* Green 'REFURBISHED' pill badge */}
                  <div className="inline-flex items-center px-4 sm:px-6 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white font-extrabold text-[10px] sm:text-xs md:text-sm tracking-wider uppercase border border-emerald-300 shadow-md">
                    <span>REFURBISHED</span>
                  </div>

                  {/* 3D Chrome Metallic 'PREMIUM' Heading */}
                  <h2 
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none"
                    style={{
                      textShadow: `
                        0 1px 0 #b0c4de,
                        0 2px 0 #87a9d0,
                        0 3px 0 #5c8fc2,
                        0 4px 0 #3275b4,
                        0 5px 0 #1b538e,
                        0 6px 1px rgba(0,0,0,0.1),
                        0 0 5px rgba(0,0,0,0.1),
                        0 1px 3px rgba(0,0,0,0.3),
                        0 3px 5px rgba(0,0,0,0.2),
                        0 5px 10px rgba(0,0,0,0.25)
                      `,
                      background: 'linear-gradient(to bottom, #ffffff 0%, #f0f4f8 40%, #d4e0ee 70%, #9cb8d8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'white',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  >
                    PREMIUM
                  </h2>

                  {/* Red Glossy 'LAPTOPS' Box */}
                  <div className="inline-flex items-center justify-center px-6 sm:px-10 py-0.5 sm:py-1 rounded-lg bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-sm sm:text-lg md:text-2xl tracking-widest uppercase shadow-lg shadow-red-900/30 border border-red-400">
                    <span>LAPTOPS</span>
                  </div>

                  {/* Subtitle: High Performance | Great Reliability | Affordable Prices */}
                  <div className="flex items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-xs md:text-sm font-bold text-slate-800 pt-0.5">
                    <span>High Performance</span>
                    <span className="text-slate-400">|</span>
                    <span>Great Reliability</span>
                    <span className="text-slate-400">|</span>
                    <span>Affordable Prices</span>
                  </div>
                </div>

                {/* LAPTOPS ROW ON WOODEN TABLE: Left cluster & Right cluster */}
                <div className="w-full flex items-end justify-between px-2 sm:px-6 md:px-10 mt-1 sm:mt-2">
                  {/* Left 4 Laptops (Lenovo, HP, Dell, ASUS) */}
                  <div className="flex items-end -space-x-4 sm:-space-x-6 md:-space-x-8">
                    {/* Laptop 1: Lenovo */}
                    <div className="w-16 sm:w-24 md:w-32 lg:w-40 transition-transform hover:-translate-y-2 cursor-pointer drop-shadow-xl" onClick={() => handleCategoryClick('laptops')}>
                      <div className="relative bg-slate-900 rounded-t-md p-1 border border-slate-700 aspect-[16/10] overflow-hidden flex flex-col justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto" />
                        <div className="absolute inset-1.5 bg-gradient-to-br from-slate-900 via-red-950 to-slate-950 rounded flex items-center justify-center">
                          <span className="text-[7px] sm:text-[9px] font-black text-white bg-red-600 px-1 py-0.5 rounded">Lenovo</span>
                        </div>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-md shadow-md" />
                    </div>

                    {/* Laptop 2: HP (with Windows 11 Bloom Wallpaper) */}
                    <div className="w-20 sm:w-32 md:w-44 lg:w-52 transition-transform hover:-translate-y-2 cursor-pointer drop-shadow-2xl z-10" onClick={() => handleCategoryClick('laptops')}>
                      <div className="relative bg-slate-900 rounded-t-md p-1.5 border border-slate-600 aspect-[16/10] overflow-hidden flex flex-col justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto" />
                        <div className="absolute inset-1.5 bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-900 rounded flex flex-col items-center justify-center p-1">
                          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-white/60 flex items-center justify-center text-white text-[8px] sm:text-[10px] font-serif italic font-bold">hp</div>
                          <span className="text-[6px] sm:text-[8px] text-white/90 font-mono mt-0.5">Windows 11</span>
                        </div>
                      </div>
                      <div className="h-2 sm:h-2.5 bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 rounded-b-md shadow-lg" />
                    </div>

                    {/* Laptop 3: Dell Latitude */}
                    <div className="w-18 sm:w-28 md:w-36 lg:w-44 transition-transform hover:-translate-y-2 cursor-pointer drop-shadow-xl" onClick={() => handleCategoryClick('laptops')}>
                      <div className="relative bg-slate-900 rounded-t-md p-1 border border-slate-700 aspect-[16/10] overflow-hidden flex flex-col justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto" />
                        <div className="absolute inset-1.5 bg-gradient-to-br from-sky-900 via-blue-950 to-slate-950 rounded flex items-center justify-center">
                          <span className="text-[7px] sm:text-[10px] font-black tracking-widest text-sky-400">DELL</span>
                        </div>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gradient-to-b from-slate-600 to-slate-900 rounded-b-md shadow-md" />
                    </div>
                  </div>

                  {/* Right 3 Laptops (Acer, ASUS, Dell) */}
                  <div className="flex items-end -space-x-4 sm:-space-x-6 md:-space-x-8">
                    {/* Laptop 4: ASUS */}
                    <div className="w-18 sm:w-28 md:w-36 lg:w-44 transition-transform hover:-translate-y-2 cursor-pointer drop-shadow-xl" onClick={() => handleCategoryClick('laptops')}>
                      <div className="relative bg-slate-900 rounded-t-md p-1 border border-slate-700 aspect-[16/10] overflow-hidden flex flex-col justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto" />
                        <div className="absolute inset-1.5 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900 rounded flex items-center justify-center">
                          <span className="text-[7px] sm:text-[10px] font-black tracking-wider text-slate-200">ASUS</span>
                        </div>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gradient-to-b from-slate-600 to-slate-900 rounded-b-md shadow-md" />
                    </div>

                    {/* Laptop 5: HP Pavilion (Right Center) */}
                    <div className="w-20 sm:w-32 md:w-44 lg:w-52 transition-transform hover:-translate-y-2 cursor-pointer drop-shadow-2xl z-10" onClick={() => handleCategoryClick('laptops')}>
                      <div className="relative bg-slate-900 rounded-t-md p-1.5 border border-slate-600 aspect-[16/10] overflow-hidden flex flex-col justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto" />
                        <div className="absolute inset-1.5 bg-gradient-to-tr from-cyan-600 via-sky-600 to-blue-900 rounded flex flex-col items-center justify-center p-1">
                          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-white/60 flex items-center justify-center text-white text-[8px] sm:text-[10px] font-serif italic font-bold">hp</div>
                          <span className="text-[6px] sm:text-[8px] text-white/90 font-mono mt-0.5">Core i5 / i7</span>
                        </div>
                      </div>
                      <div className="h-2 sm:h-2.5 bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 rounded-b-md shadow-lg" />
                    </div>

                    {/* Laptop 6: Acer */}
                    <div className="w-16 sm:w-24 md:w-32 lg:w-40 transition-transform hover:-translate-y-2 cursor-pointer drop-shadow-xl" onClick={() => handleCategoryClick('laptops')}>
                      <div className="relative bg-slate-900 rounded-t-md p-1 border border-slate-700 aspect-[16/10] overflow-hidden flex flex-col justify-between">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mx-auto" />
                        <div className="absolute inset-1.5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded flex items-center justify-center">
                          <span className="text-[7px] sm:text-[9px] font-bold text-emerald-400">acer</span>
                        </div>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-md shadow-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* LOWER ROW OVERLAYS: Brand Badges + Checkmarks + Yellow Starburst + Enquiries Phone */}
              <div className="relative z-20 grid grid-cols-12 items-end px-3 sm:px-6 md:px-8 pb-2 pt-1 gap-2">
                {/* Left 5 Cols: Brand Logo Badges & Trust Icons */}
                <div className="col-span-12 sm:col-span-5 space-y-1">
                  {/* Brand Logos: Dell, HP, Lenovo, acer, ASUS */}
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 px-2.5 py-1 rounded-lg border border-slate-200/90 shadow-sm w-fit">
                    <span className="w-5 h-5 rounded-full bg-[#0076ce] text-white text-[7px] font-black flex items-center justify-center">DELL</span>
                    <span className="w-5 h-5 rounded-full bg-[#0096d6] text-white text-[8px] font-serif italic font-bold flex items-center justify-center">hp</span>
                    <span className="bg-[#e2231a] text-white text-[7px] font-black px-1.5 py-0.5 rounded">Lenovo</span>
                    <span className="text-[#83b817] font-bold text-[9px] lowercase">acer</span>
                    <span className="text-slate-800 font-black text-[8px] tracking-wider">ASUS</span>
                  </div>

                  {/* 5 Trust Circular Badges */}
                  <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[9px] text-slate-800 font-bold">
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px]">⚙</span>
                      <span className="hidden md:inline">Refurbished</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px]">🛡</span>
                      <span className="hidden md:inline">Tested</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center text-[8px]">✓</span>
                      <span className="hidden md:inline">A+ Grade</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px]">₹</span>
                      <span className="hidden md:inline">Budget</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center text-[8px]">★</span>
                      <span className="hidden md:inline">Warranty</span>
                    </div>
                  </div>
                </div>

                {/* Right 7 Cols (Inside Blue Wave): Silver Dell Laptop + Checkmarks + Yellow Badge + Orders Phone */}
                <div className="col-span-12 sm:col-span-7 flex items-center justify-end gap-2 sm:gap-4 text-white">
                  {/* Checklist: Students, WFH, Office */}
                  <div className="hidden lg:flex flex-col gap-0.5 text-[10px] font-semibold text-sky-100">
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[8px] font-bold">✓</span><span>Ideal for Students</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[8px] font-bold">✓</span><span>Work from Home</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[8px] font-bold">✓</span><span>Office Usage</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[8px] font-bold">✓</span><span>Business Needs</span></div>
                  </div>

                  {/* Yellow Starburst Badge: 'Same Performance Less Price More Value!' */}
                  <div className="relative bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 text-red-900 px-2 sm:px-3 py-1.5 rounded-xl font-black text-center shadow-lg border-2 border-yellow-200 rotate-[-2deg] hidden sm:block">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-tight leading-tight">Same Performance</div>
                    <div className="text-[11px] sm:text-xs text-red-700">Less Price</div>
                    <div className="text-[10px] sm:text-[11px] font-extrabold text-slate-900">More Value!</div>
                  </div>

                  {/* Enquiries & Orders Callout */}
                  <div className="text-right">
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-sky-200">Enquiries &amp; Orders</div>
                    <a href="tel:8951219206" className="text-sm sm:text-lg md:text-xl font-black text-yellow-300 hover:text-yellow-200 tracking-tight block">
                      8951219206, 821766626
                    </a>
                  </div>

                  {/* QR Box: VISIT WEBSITE */}
                  <div className="hidden md:flex flex-col items-center bg-white p-1 rounded-md text-slate-900 shadow-md">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 bg-slate-900 text-white rounded flex items-center justify-center font-mono text-[9px] font-bold">
                      QR
                    </div>
                    <span className="text-[6px] font-extrabold uppercase mt-0.5 tracking-tighter">VISIT</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM STRIP: Exact Call, Email, Web, Categories */}
              <div className="relative z-30 grid grid-cols-1 md:grid-cols-12 text-white font-medium text-xs leading-none">
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
