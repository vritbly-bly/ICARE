import React from 'react';
import { 
  Laptop, 
  ShieldCheck, 
  Wrench, 
  ChevronRight, 
  Phone, 
  Camera, 
  Cpu, 
  Network,
  Award,
  Building2,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

interface HeroProps {
  onExplorePortfolio: () => void;
  onExploreServices: () => void;
  onContactClick: () => void;
  onSelectCategory: (cat: string) => void;
  onExploreStoreSales?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePortfolio,
  onExploreServices,
  onContactClick,
  onSelectCategory,
  onExploreStoreSales,
}) => {
  return (
    <div id="hero" className="relative bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 text-white overflow-hidden scroll-mt-20">
      {/* Decorative Grid & Glow Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-orange-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-14 lg:pt-16 lg:pb-20">
        <div className="max-w-4xl space-y-6">
          {/* Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-sky-500/15 border border-sky-400/30 rounded-lg text-xs font-semibold text-sky-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Offline Store Sales &amp; Multi-Brand Service Center</span>
            <span className="text-sky-500">·</span>
            <span className="text-orange-300">Beside UCO Bank, Ballari</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
            Offline Store Sales &amp; Service,{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">
              All Major Technology Brands
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
            For over 15 years, <strong className="text-white">iCare Computers</strong> (led by proprietor Naga Reddy) has been Ballari&apos;s trusted physical tech destination. We supply brand-new laptops, desktops, printers, CCTV systems, and components with official manufacturer warranties, and run an advanced chip-level motherboard repair lab. <span className="text-orange-300 font-medium">We are an offline store — not an online shop — visit our counter for direct purchase, live demo &amp; expert service.</span>
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreStoreSales || (() => onSelectCategory('store'))}
              className="px-6 py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-700 rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Offline Store Hardware</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreServices}
              className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-orange-400" />
              <span>Technical Services &amp; Scope</span>
            </button>

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-4 py-3.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Naga Reddy: {STORE_INFO.formattedPhone}</span>
            </a>
          </div>

          {/* Quick Capability Nav */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Store Offerings &amp; Service Pillars (All Brands):</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'store', label: 'In-Store Sales (All Brands)', icon: Laptop },
                { id: 'service', label: 'Chip-Level Motherboard Lab', icon: Cpu },
                { id: 'cctv', label: 'CCTV Security & Surveillance', icon: Camera },
                { id: 'printer', label: 'Printers & Fast Toner Refill', icon: Wrench },
                { id: 'networking', label: 'Structured Cabling & Wi-Fi', icon: Network },
                { id: 'amc', label: 'Corporate IT AMC & SLA', icon: ShieldCheck },
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
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">15+ Years Track Record</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Reliable corporate IT partner in Ballari</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Advanced Diagnostic Lab</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Infrared BGA rework &amp; circuit tracing</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">2-Hour Emergency SLA</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Rapid on-site dispatch across Ballari</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Institutional CCTV</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Hospitals, schools &amp; commercial logistics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
