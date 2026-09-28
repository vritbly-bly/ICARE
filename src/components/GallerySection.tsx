import React, { useState } from 'react';
import { 
  Store, 
  Wrench, 
  Camera, 
  Cpu, 
  Truck, 
  Zap, 
  Calendar, 
  MapPin, 
  Maximize2, 
  X, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS, STORE_INFO } from '../data/mockData';

interface GallerySectionProps {
  onBookService: (serviceName?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookService }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'showroom' | 'repairs' | 'cctv' | 'custom_pc' | 'delivery'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Works' },
    { id: 'showroom', label: 'Store Showroom' },
    { id: 'repairs', label: 'Repair Lab' },
    { id: 'cctv', label: 'CCTV Deployments' },
    { id: 'custom_pc', label: 'Custom Rigs' },
    { id: 'delivery', label: 'Customer Handovers' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'showroom':
        return Store;
      case 'repairs':
        return Wrench;
      case 'cctv':
        return Camera;
      case 'custom_pc':
        return Cpu;
      case 'delivery':
        return Truck;
      default:
        return Zap;
    }
  };

  return (
    <section id="gallery" className="py-14 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1.5">
              <span>On-Site Portfolio &amp; Workshop</span>
              <span>·</span>
              <span>Ballari Verified Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Store Gallery &amp; Installation Showcase
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Take a closer look inside our Ballari retail showroom, precision chip-level motherboard repair lab, bespoke gaming PC builds, and commercial CCTV deployments.
            </p>
          </div>

          {/* Filter Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-sky-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                {/* Visual Canvas Representation */}
                <div className={`relative h-56 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between text-white overflow-hidden`}>
                  {/* Subtle decorative grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                  {/* Top Bar inside image */}
                  <div className="relative flex items-center justify-between z-10">
                    <span className="text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-md">
                      {item.category.replace('_', ' ')}
                    </span>
                    <button 
                      aria-label="Enlarge image"
                      className="p-1.5 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Centered Large Tech Icon */}
                  <div className="relative my-auto flex flex-col items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Bottom Meta */}
                  <div className="relative flex items-center justify-between text-[11px] text-white/90 z-10">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-orange-300" />
                      <span className="truncate max-w-[180px]">{item.location}</span>
                    </span>
                    <span className="font-mono text-[10px] text-white/70">{item.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed tags */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                      {item.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span>{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.client && (
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Client / Recipient:</span>
                      <span className="font-semibold text-slate-800">{item.client}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Details Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div 
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="uppercase font-semibold tracking-wider text-sky-600">
                    {selectedItem.category.replace('_', ' ')}
                  </span>
                  <span>·</span>
                  <span>{selectedItem.location}</span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                <div className={`h-48 rounded-2xl bg-gradient-to-br ${selectedItem.gradient} p-6 flex flex-col justify-between text-white shadow-inner relative overflow-hidden`}>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/80">
                    iCare Field Project Spotlight
                  </div>
                  <div className="my-auto text-center">
                    <h3 className="text-2xl font-bold font-heading text-white">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>{selectedItem.location}</span>
                    <span>{selectedItem.date}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-900">Project Overview</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    {selectedItem.client && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Customer / Location:</span>
                        <span className="font-semibold text-slate-900">{selectedItem.client}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Service Category:</span>
                      <span className="font-semibold text-slate-900 capitalize">{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Service Location:</span>
                      <span className="font-semibold text-slate-900">{selectedItem.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Verified By:</span>
                      <span className="font-semibold text-sky-700">Venkata Reddy (iCare Computers)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="text-xs font-semibold text-slate-700 hover:text-sky-600"
                >
                  Call Shop: {STORE_INFO.formattedPhone}
                </a>

                <button
                  onClick={() => {
                    const title = selectedItem.title;
                    setSelectedItem(null);
                    onBookService(title);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire / Book Similar Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
