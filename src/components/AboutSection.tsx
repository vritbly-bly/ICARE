import React from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

interface AboutSectionProps {
  onConsultationClick: () => void;
  onExplorePortfolio: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onConsultationClick,
  onExplorePortfolio,
}) => {
  const stats = [
    { value: '15+', label: 'Years Serving Ballari', desc: 'Established local technology trust' },
    { value: '8,500+', label: 'Laptops & Boards Repaired', desc: 'Precision chip-level restoration' },
    { value: '450+', label: 'Turnkey CCTV Projects', desc: 'Commercial & residential surveillance' },
    { value: '120+', label: 'Corporate AMC Clients', desc: 'Hospitals, schools, and offices' },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: 'Advanced Chip-Level Lab',
      desc: 'Equipped with infrared BGA rework stations, digital oscilloscopes, and stereo inspection microscopes to fix motherboards and circuits other centers deem unrepairable.',
    },
    {
      icon: ShieldCheck,
      title: '100% Genuine Certified Spares',
      desc: 'Direct factory replacement screens, original keyboards, batteries, and genuine electronic ICs backed by solid replacement warranties and GST tax invoicing.',
    },
    {
      icon: Users,
      title: 'Dedicated Enterprise Support',
      desc: 'Rapid on-site emergency dispatch across Ballari for institutional clinics, educational institutions, commercial warehouses, and corporate facilities.',
    },
    {
      icon: Target,
      title: 'Transparent Technical Ethics',
      desc: 'Led directly by proprietor Naga Reddy with clear component-level diagnostics, zero hidden charges, and honest recommendations tailored to your actual workload.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
              <span>About iCare Computers</span>
              <span>·</span>
              <span>Ballari, Karnataka</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
              A Legacy of Engineering Excellence, Hardware Integrity &amp; Local Trust
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Founded and managed by <strong className="text-slate-900">Naga Reddy</strong>, iCare Computers has evolved from Ballari&apos;s pioneering technical workbench into a premier full-lifecycle IT infrastructure, chip-level diagnostics, and surveillance systems engineering partner.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onConsultationClick}
              className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-md shadow-sky-600/20 cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Core Quantitative Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((s, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-sky-300 transition-all group"
            >
              <div className="text-3xl sm:text-4xl font-black text-sky-600 font-heading tracking-tight group-hover:scale-105 transition-transform origin-left">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-2">
                {s.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Deep Story & Technical Capabilities Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left: Our Philosophy & Infrastructure */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Why Ballari Institutions, Enterprises &amp; Professionals Rely on Us
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              In an era where many stores simply suggest replacing entire motherboards or buying new machines, iCare Computers preserves your hardware investments. We diagnose down to the individual MOSFET, capacitor, and micro-controller, saving organizations up to 70% in capital expenditure.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Specialized BGA IC rework for laptops with zero power, graphics failure, or water damage',
                'Custom surveillance engineering with secure remote smartphone live access',
                'Comprehensive Annual Maintenance Contracts (AMC) with guaranteed 2-hour response SLA',
                'Structured CAT6 Gigabit network cabling, server racks, and zero-deadzone mesh Wi-Fi',
                'Directly overseen by founder Naga Reddy with over a decade and a half of practical domain experience',
              ].map((bullet, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>Call Naga Reddy: {STORE_INFO.formattedPhone}</span>
              </a>

              <button
                onClick={onExplorePortfolio}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
              >
                <span>View Recent Deployments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: 4 Institutional Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-sky-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
