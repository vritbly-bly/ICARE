import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Star, CheckCircle, Upload, Edit3, Trash2, Plus } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { BrandEcosystem } from '../types';
import { 
  getBrandEcosystem, 
  deleteBrandFromEcosystem 
} from '../utils/brandManager';
import { OfficialBrandLogo } from './OfficialBrandLogo';

interface BrandSectionProps {
  onSelectBrand?: (brandName: string) => void;
  onOpenEditLogoModal?: (tab?: 'store' | 'brands', brandName?: string, category?: 'laptops' | 'printers' | 'cctv') => void;
}

export const BrandSection: React.FC<BrandSectionProps> = ({ 
  onSelectBrand,
  onOpenEditLogoModal 
}) => {
  const [ecosystem, setEcosystem] = useState<BrandEcosystem>(getBrandEcosystem);

  useEffect(() => {
    const handleUpdate = () => {
      setEcosystem(getBrandEcosystem());
    };
    window.addEventListener('icare_brand_logos_updated', handleUpdate);
    return () => window.removeEventListener('icare_brand_logos_updated', handleUpdate);
  }, []);

  const handleBrandClick = (brandName: string) => {
    if (onSelectBrand) {
      onSelectBrand(brandName);
    } else {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDeleteBrand = (category: 'laptops' | 'printers' | 'cctv', brandName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${brandName}" from ${category}?`)) {
      const updated = deleteBrandFromEcosystem(category, brandName);
      setEcosystem(updated);
    }
  };

  return (
    <section id="brands" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with "Add Brand" and "Manage Logos" Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1.5">
              <span>Official Authorized Spares &amp; Retail</span>
              <span>·</span>
              <span>Ballari Distribution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              World-Class Technology Brands Handled
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              We supply 100% genuine components, factory seals, and official manufacturer warranty for all international computer, printing, and security brands.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenEditLogoModal?.('brands')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Add a new brand partner or upload logos"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Brand Logo</span>
            </button>

            <button
              onClick={() => onOpenEditLogoModal?.('brands')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              title="Upload, customize or delete logos"
            >
              <Upload className="w-3.5 h-3.5 text-sky-600" />
              <span>Manage Logos</span>
            </button>
          </div>
        </div>

        {/* 3 Categories of Brands (With Official Brand Logos, Add, Edit & Delete) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* 1. LAPTOP BRANDS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
                  <span>LAPTOP BRANDS</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {ecosystem.laptops?.length || 0} Makes
                  </span>
                  <button
                    onClick={() => onOpenEditLogoModal?.('brands', undefined, 'laptops')}
                    className="p-1 text-sky-600 hover:bg-sky-50 rounded-md transition-colors cursor-pointer"
                    title="Add Laptop Brand"
                    aria-label="Add Laptop Brand"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {ecosystem.laptops?.map((brand) => (
                  <div key={brand.name} className="relative group">
                    <button
                      onClick={() => handleBrandClick(brand.name)}
                      className="w-full p-2.5 bg-white hover:bg-slate-50/90 rounded-xl border border-slate-200/90 hover:border-sky-400 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center h-14 group/btn cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      title={`Official ${brand.name} Partner - Click to filter products`}
                      aria-label={`Official ${brand.name} Logo`}
                    >
                      <div className="w-full flex items-center justify-center group-hover/btn:scale-105 transition-transform duration-200">
                        <OfficialBrandLogo name={brand.name} size="md" />
                      </div>
                    </button>

                    {/* Action buttons on hover: Edit & Delete */}
                    <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEditLogoModal?.('brands', brand.name, 'laptops');
                        }}
                        className="p-1 bg-white/95 hover:bg-sky-50 text-slate-400 hover:text-sky-600 rounded-md border border-slate-200 shadow-xs cursor-pointer"
                        title={`Upload / Edit ${brand.name} logo`}
                        aria-label={`Edit ${brand.name} logo`}
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteBrand('laptops', brand.name, e)}
                        className="p-1 bg-white/95 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md border border-slate-200 shadow-xs cursor-pointer"
                        title={`Delete ${brand.name}`}
                        aria-label={`Delete ${brand.name}`}
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Inline Add Brand Tile */}
                <button
                  type="button"
                  onClick={() => onOpenEditLogoModal?.('brands', undefined, 'laptops')}
                  className="p-2 border border-dashed border-slate-200 hover:border-sky-400 rounded-xl bg-slate-50/60 hover:bg-sky-50/40 transition-colors flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-sky-600 cursor-pointer h-14"
                  title="Add another Laptop brand"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Add</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
              Motherboards, original screens, keyboards, hinges &amp; adapters available.
            </p>
          </div>

          {/* 2. PRINTER BRANDS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span>PRINTER BRANDS</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {ecosystem.printers?.length || 0} Brands
                  </span>
                  <button
                    onClick={() => onOpenEditLogoModal?.('brands', undefined, 'printers')}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                    title="Add Printer Brand"
                    aria-label="Add Printer Brand"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {ecosystem.printers?.map((brand) => (
                  <div key={brand.name} className="relative group">
                    <button
                      onClick={() => handleBrandClick(brand.name)}
                      className="w-full p-2.5 bg-white hover:bg-slate-50/90 rounded-xl border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center h-14 group/btn cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      title={`Official ${brand.name} Partner - Click to filter products`}
                      aria-label={`Official ${brand.name} Logo`}
                    >
                      <div className="w-full flex items-center justify-center group-hover/btn:scale-105 transition-transform duration-200">
                        <OfficialBrandLogo name={brand.name} size="md" />
                      </div>
                    </button>

                    <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEditLogoModal?.('brands', brand.name, 'printers');
                        }}
                        className="p-1 bg-white/95 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-md border border-slate-200 shadow-xs cursor-pointer"
                        title={`Upload / Edit ${brand.name} logo`}
                        aria-label={`Edit ${brand.name} logo`}
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteBrand('printers', brand.name, e)}
                        className="p-1 bg-white/95 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md border border-slate-200 shadow-xs cursor-pointer"
                        title={`Delete ${brand.name}`}
                        aria-label={`Delete ${brand.name}`}
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => onOpenEditLogoModal?.('brands', undefined, 'printers')}
                  className="p-2 border border-dashed border-slate-200 hover:border-blue-400 rounded-xl bg-slate-50/60 hover:bg-blue-50/40 transition-colors flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-blue-600 cursor-pointer h-14"
                  title="Add another Printer brand"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Add</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
              Ink bottles, laser toners, pickup rollers &amp; printhead maintenance.
            </p>
          </div>

          {/* 3. CCTV BRANDS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  <span>CCTV BRANDS</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {ecosystem.cctv?.length || 0} Partners
                  </span>
                  <button
                    onClick={() => onOpenEditLogoModal?.('brands', undefined, 'cctv')}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                    title="Add CCTV Brand"
                    aria-label="Add CCTV Brand"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {ecosystem.cctv?.map((brand) => (
                  <div key={brand.name} className="relative group">
                    <button
                      onClick={() => handleBrandClick(brand.name)}
                      className="w-full p-2.5 bg-white hover:bg-slate-50/90 rounded-xl border border-slate-200/90 hover:border-rose-400 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center h-14 group/btn cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                      title={`Official ${brand.name} Partner - Click to filter products`}
                      aria-label={`Official ${brand.name} Logo`}
                    >
                      <div className="w-full flex items-center justify-center group-hover/btn:scale-105 transition-transform duration-200">
                        <OfficialBrandLogo name={brand.name} size="md" />
                      </div>
                    </button>

                    <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEditLogoModal?.('brands', brand.name, 'cctv');
                        }}
                        className="p-1 bg-white/95 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-md border border-slate-200 shadow-xs cursor-pointer"
                        title={`Upload / Edit ${brand.name} logo`}
                        aria-label={`Edit ${brand.name} logo`}
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteBrand('cctv', brand.name, e)}
                        className="p-1 bg-white/95 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md border border-slate-200 shadow-xs cursor-pointer"
                        title={`Delete ${brand.name}`}
                        aria-label={`Delete ${brand.name}`}
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => onOpenEditLogoModal?.('brands', undefined, 'cctv')}
                  className="p-2 border border-dashed border-slate-200 hover:border-rose-400 rounded-xl bg-slate-50/60 hover:bg-rose-50/40 transition-colors flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-rose-600 cursor-pointer h-14"
                  title="Add another CCTV brand"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Add</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
              Full color night vision, NVR/DVR boxes, surveillance HDDs &amp; app setup.
            </p>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Real Verified Testimonials from Ballari customers */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Client Testimonials &amp; Local Reputation
              </h3>
              <p className="text-xs text-slate-500">
                Verified feedback from Ballari professionals, doctors, and students
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>4.9 / 5 Average Rating (180+ Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
