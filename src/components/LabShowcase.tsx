import React from 'react';
import { 
  Cpu, 
  Wrench, 
  Zap, 
  Eye, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Clock, 
  FileCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

interface LabShowcaseProps {
  onScheduleLabVisit: () => void;
}

export const LabShowcase: React.FC<LabShowcaseProps> = ({ onScheduleLabVisit }) => {
  const labEquipments = [
    {
      icon: Flame,
      title: 'Infrared & Hot-Air BGA Rework Station',
      spec: 'Precise multi-stage programmable thermal profiles',
      desc: 'Enables safe de-soldering, reballing, and replacement of large graphics processors (GPUs), chipset controllers, and micro BGA packages without warping fragile multi-layer laptop boards.',
    },
    {
      icon: Eye,
      title: 'Trinocular Stereo Optical Microscope',
      spec: 'Up to 45x continuous zoom with LED ring illumination',
      desc: 'Crucial for inspecting microscopic broken PCB copper traces, corroded pads, liquid intrusion short circuits, and micro-soldering 0201/0402 SMD resistors and capacitors.',
    },
    {
      icon: Activity,
      title: 'Digital Storage Oscilloscope & Logic Analyzer',
      spec: 'Multi-channel 100MHz real-time waveform capture',
      desc: 'Used for tracing power rail sequencing, clock signals, crystal oscillators, and motherboard communication buses to catch intermittent bugs that multimeters miss.',
    },
    {
      icon: Zap,
      title: 'Thermal Imaging Short-Circuit Detection',
      spec: 'Sub-millimeter thermal gradient infrared sensor',
      desc: 'Identifies micro-shorted capacitors and damaged power management ICs (PMICs) by spotting localized milliwatt heat signatures in real time on power injection.',
    },
    {
      icon: Cpu,
      title: 'High-Speed EEPROM / SPI BIOS Programmer',
      spec: 'Direct in-circuit and out-of-circuit firmware flashing',
      desc: 'Revives laptops bricked during failed BIOS updates, removes corrupted supervisor security passwords, and re-flashes EC (Embedded Controller) firmware chips.',
    },
    {
      icon: ShieldAlert,
      title: 'ESD-Safe Grounded Clean Workbench',
      spec: 'Static-dissipative mats and constant wrist ground monitors',
      desc: 'Guarantees that your delicate semiconductors and memory chips are protected from electrostatic discharge throughout diagnosis and reassembly.',
    },
  ];

  return (
    <section id="lab" className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-400/20 rounded-lg text-xs font-semibold text-sky-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Diagnostic Infrastructure</span>
              <span>·</span>
              <span>Ballari Technical Facility</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
              Our Specialized Chip-Level Engineering Laboratory
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Why do other centers send complex motherboards to iCare Computers? Because we operate dedicated micro-soldering, thermal tracing, and high-frequency diagnostic equipment directly in our Ballari lab beside UCO Bank.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onScheduleLabVisit}
              className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20 cursor-pointer flex items-center gap-2"
            >
              <span>Bring Device for Lab Diagnosis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Specialized Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labEquipments.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 p-6 rounded-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-white font-heading">
                    {tool.title}
                  </h3>

                  <div className="text-xs font-semibold text-orange-400 mt-1">
                    {tool.spec}
                  </div>

                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>On-site Ballari capability</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Turnaround Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-sky-950 via-slate-800 to-slate-900 border border-sky-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Same-Day Basic Diagnosis</div>
              <div className="text-xs text-slate-400">Clear root-cause assessment within 4 hours</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Upfront Clear Quotation</div>
              <div className="text-xs text-slate-400">No unexpected charges; work begins only on approval</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">90-Day Repair Warranty</div>
              <div className="text-xs text-slate-400">Full replacement cover on repaired circuits &amp; parts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
