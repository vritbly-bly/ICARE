import React from 'react';
import { Laptop, ShieldCheck, Truck, Wrench, ChevronRight, Phone, Camera, Printer, Cpu } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

interface HeroProps {
  onExploreCatalog: () => void;
  onBookService: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onBookService,
  onSelectCategory,
}) => {
  return (
    <div className="relative bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Decorative Grid & Glow Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-orange-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-14 lg:pt-16 lg:pb-20">
        <div className="max-w-4xl space-y-6">
          {/* Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/15 border border-sky-400/30 rounded-lg text-xs font-medium text-sky-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>Ballari&apos;s Leading Computer &amp; Security Store</span>
            <span className="text-sky-500">·</span>
            <span className="text-orange-300">Beside UCO Bank</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
            Complete Hardware Sales,{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">
              Chip-Level Service &amp; CCTV
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
            Brand-new laptops, certified refurbished systems, custom gaming rigs, high-definition CCTV security kits, ink-tank printers, and precision motherboard repairs with fast local delivery across Ballari.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreCatalog}
              className="px-6 py-3.5 text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-xl transition-all shadow-lg shadow-sky-600/30 flex items-center gap-2 cursor-pointer"
            >
              <span>Order Online Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookService}
              className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-orange-400" />
              <span>Book Laptop Repair / CCTV</span>
            </button>

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-4 py-3.5 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>{STORE_INFO.formattedPhone}</span>
            </a>
          </div>

          {/* Quick Category Badges */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Quick Department Navigation:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'laptops', label: 'Laptops', icon: Laptop },
                { id: 'desktops', label: 'Desktops & Rigs', icon: Cpu },
                { id: 'printers', label: 'Printers', icon: Printer },
                { id: 'cctv', label: 'CCTV Kits', icon: Camera },
                { id: 'accessories', label: 'SSDs & Accessories', icon: Wrench },
                { id: 'amc', label: 'Office AMC', icon: ShieldCheck },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-sky-900/60 border border-slate-700/80 hover:border-sky-500/50 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-400" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Trust Value Pillars */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">100% Genuine Brands</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Direct manufacturer warranty &amp; GST tax invoice</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Chip-Level Repair Lab</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Motherboard BGA reballing &amp; screen replacement</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Express Ballari Delivery</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Doorstep delivery or instant store pickup</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Turnkey CCTV &amp; AMC</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Homes, hospitals, schools &amp; commercial offices</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
