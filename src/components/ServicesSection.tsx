import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, 
  Wrench, 
  Cpu, 
  Network, 
  Camera, 
  Headphones, 
  Check, 
  Clock, 
  ArrowRight, 
  Calculator,
  MessageSquare,
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Images,
  HardDrive,
  Shield,
  Zap,
  Database
} from 'lucide-react';
import { ServicePillar } from '../types';
import { STORE_INFO } from '../data/mockData';
import { useAdmin } from '../context/AdminContext';

interface ServicesSectionProps {
  services: ServicePillar[];
  onOpenSupportWithTopic: (topic: string) => void;
  onOpenAddService: () => void;
  onEditService: (service: ServicePillar) => void;
  onDeleteService: (serviceId: string) => void;
}

// Sub-component for individual service card with 4:3 fit frame & multi-image switcher
const ServiceCardItem: React.FC<{
  pillar: ServicePillar;
  onOpenSupportWithTopic: (topic: string) => void;
  onEditService: (service: ServicePillar) => void;
  onDeleteService: (serviceId: string) => void;
  getPillarIcon: (iconName: string) => React.ElementType;
}> = ({
  pillar,
  onOpenSupportWithTopic,
  onEditService,
  onDeleteService,
  getPillarIcon,
}) => {
  const { isAdmin } = useAdmin();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const pillarImages = useMemo(() => {
    if (pillar.images && pillar.images.length > 0) {
      return pillar.images.filter(Boolean);
    }
    if (pillar.imageUrl) {
      return [pillar.imageUrl];
    }
    return [];
  }, [pillar.images, pillar.imageUrl]);

  const currentImage = pillarImages[activeImageIdx] || pillarImages[0];
  const Icon = getPillarIcon(pillar.icon);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : pillarImages.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev < pillarImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-sky-300 transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden group">
      {/* 4:3 Aspect Ratio Frame - Fit to Frame with Multi-Image Support */}
      {currentImage && (
        <div className="relative aspect-[4/3] w-full bg-slate-100/90 overflow-hidden flex items-center justify-center border-b border-slate-200/80 group/img">
          <img
            src={currentImage}
            alt={`${pillar.title} photo ${activeImageIdx + 1}`}
            className="w-full h-full object-contain p-3 group-hover/img:scale-105 transition-transform duration-300 select-none"
            referrerPolicy="no-referrer"
          />

          {/* Photo Counter Badge */}
          {pillarImages.length > 1 && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="flex items-center gap-1 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-slate-200/80">
                <Images className="w-3 h-3 text-sky-600" />
                <span>{activeImageIdx + 1}/{pillarImages.length}</span>
              </span>
            </div>
          )}

          {/* Navigation Arrows for Multiple Images */}
          {pillarImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-20 cursor-pointer"
                title="Previous photo"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-20 cursor-pointer"
                title="Next photo"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots indicator inside 4:3 frame */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-slate-900/40 backdrop-blur-xs px-2 py-1 rounded-full">
                {pillarImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx(dotIdx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      dotIdx === activeImageIdx
                        ? 'w-4 bg-white'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Card Content & Features */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${pillar.color} text-white flex items-center justify-center shadow-sm`}>
              <Icon className="w-5 h-5" />
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {pillar.priceEstimate}
              </span>

              {isAdmin && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditService(pillar);
                    }}
                    className="p-1 text-slate-400 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Service Offering & Images (Admin)"
                    aria-label="Edit Service Offering & Images"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {confirmDelete ? (
                    <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-lg p-0.5 animate-in fade-in duration-150">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteService(pillar.id);
                          setConfirmDelete(false);
                        }}
                        className="px-2 py-0.5 text-[11px] font-bold bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
                        title="Confirm Delete"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete(false);
                        }}
                        className="px-1.5 py-0.5 text-[11px] text-slate-600 hover:text-slate-900 cursor-pointer"
                        title="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(true);
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Service (Admin)"
                      aria-label="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-sky-600 transition-colors">
              {pillar.title}
            </h3>
            <div className="text-xs font-semibold text-sky-700 mt-0.5">
              {pillar.subtitle}
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {pillar.description}
            </p>
          </div>

          {/* Feature Checklist */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-700">
            {pillar.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onOpenSupportWithTopic(`${pillar.title} Inquiry`)}
            className="w-full py-2 px-3 text-xs font-semibold text-sky-700 hover:text-sky-900 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Request Quotation / Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onOpenSupportWithTopic,
  onOpenAddService,
  onEditService,
  onDeleteService,
}) => {
  const { isAdmin } = useAdmin();
  // Repair Estimator State
  const [deviceType, setDeviceType] = useState<'laptop' | 'desktop' | 'printer' | 'cctv'>('laptop');
  const [issueType, setIssueType] = useState<string>('ssd_upgrade');

  const issuesByDevice: { [key: string]: { id: string; label: string; cost: string; time: string; parts: string }[] } = {
    laptop: [
      { id: 'ssd_upgrade', label: 'Slow Laptop / HDD to Fast NVMe SSD Upgrade', cost: '₹1,850 – ₹3,500', time: '45 Minutes', parts: 'Crucial/Kingston SSD + Free Windows Clone' },
      { id: 'screen_replace', label: 'Broken / Flickering Display Screen Replacement', cost: '₹2,800 – ₹4,500', time: 'Same-Day (2-4 hrs)', parts: 'Original Grade A+ LED Panel (3-month warranty)' },
      { id: 'board_repair', label: 'Motherboard Dead / No Power / Liquid Spill (Chip-Level)', cost: '₹1,200 – ₹2,900', time: '24 – 48 Hours', parts: 'BGA IC replacement & circuit tracing' },
      { id: 'hinge_body', label: 'Broken Hinge & Plastic Casing Fabrication', cost: '₹750 – ₹1,400', time: 'Same-Day', parts: 'High-tensile structural weld & alignment' },
      { id: 'thermal_service', label: 'Overheating / Fan Noise / Dust Cleaning + Arctic Paste', cost: '₹450 – ₹700', time: '30 Minutes', parts: 'Thermal Grizzly / Arctic MX-4 compound' },
    ],
    desktop: [
      { id: 'custom_assemble', label: 'Custom Gaming / Workstation PC Assembly & Cable Management', cost: '₹999 – ₹1,999', time: 'Same-Day (4 hrs)', parts: 'Stress testing, BIOS tuning & OS setup' },
      { id: 'no_display', label: 'PC Powers On But No Display / RAM Beeps', cost: '₹350 – ₹850', time: '1 – 2 Hours', parts: 'RAM re-seating, CMOS reset, GPU diagnostics' },
      { id: 'psu_replace', label: 'Power Supply (PSU) Tripping or Burnout', cost: '₹1,250 – ₹2,400', time: '1 Hour', parts: 'Ant Esports / Deepcool 80+ Certified PSU' },
    ],
    printer: [
      { id: 'head_clog', label: 'Epson / Canon Ink Tank Printhead Cleaning & Clog Clear', cost: '₹450 – ₹900', time: 'Same-Day', parts: 'Ultrasonic head purge & nozzle test' },
      { id: 'paper_jam', label: 'Paper Jam Roller Pickup Gear Replacement', cost: '₹550 – ₹1,100', time: '2 – 3 Hours', parts: 'New rubber pickup roller set' },
      { id: 'laser_toner', label: 'LaserJet HP/Canon 88A / 12A Fast Toner Refill', cost: '₹350 – ₹550', time: '15 Minutes', parts: 'High-density micro-fine optical powder' },
    ],
    cctv: [
      { id: 'cctv_kit_install', label: '4-Camera Hikvision / CP PLUS Full Installation & Wiring', cost: '₹2,500 – ₹4,000', time: '1 Day', parts: 'CAT6 copper cabling, DVR config, mobile app' },
      { id: 'hdd_recording', label: 'CCTV Not Recording / Hard Drive Error / Offline Cam', cost: '₹650 – ₹1,200', time: '2 Hours', parts: 'Surveillance HDD diagnostics & firmware update' },
      { id: 'remote_app', label: 'Mobile Remote View Setup (Hik-Connect / gCMOB)', cost: '₹350 – ₹500', time: '30 Minutes', parts: 'Port forwarding, cloud P2P sync to all family phones' },
    ]
  };

  const currentIssues = issuesByDevice[deviceType] || [];
  const selectedIssueData = currentIssues.find((i) => i.id === issueType) || currentIssues[0];

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingCart':
        return ShoppingCart;
      case 'Wrench':
        return Wrench;
      case 'Cpu':
        return Cpu;
      case 'Network':
        return Network;
      case 'Camera':
        return Camera;
      case 'Headphones':
        return Headphones;
      case 'HardDrive':
        return HardDrive;
      case 'Shield':
        return Shield;
      case 'Zap':
        return Zap;
      case 'Database':
        return Database;
      default:
        return Wrench;
    }
  };

  return (
    <section id="services" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1.5">
              <span>Core IT Pillars &amp; Services</span>
              <span>·</span>
              <span>Technology for a Better Tomorrow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Comprehensive Sales, Repairs &amp; IT Solutions
            </h2>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              From emergency chip-level laptop repairs to enterprise network cabling and multi-camera CCTV installations across Ballari, trust our certified technicians for transparent pricing and genuine spares.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isAdmin && (
              <button
                onClick={onOpenAddService}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-sm shadow-sky-600/20 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service Offering</span>
              </button>
            )}
          </div>
        </div>

        {/* Core Pillars Grid - 4:3 Fit to Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((pillar) => (
            <ServiceCardItem
              key={pillar.id}
              pillar={pillar}
              onOpenSupportWithTopic={onOpenSupportWithTopic}
              onEditService={onEditService}
              onDeleteService={onDeleteService}
              getPillarIcon={getPillarIcon}
            />
          ))}
        </div>

        {/* Interactive Repair Cost Estimator Tool */}
        <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Selector */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Instant Diagnostic &amp; Price Estimator</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Transparent Ballari Repair Calculator
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Select your device and diagnosed issue below to check typical spare parts costs, lab turnaround time, and repair warranty before visiting our store.
              </p>

              {/* Device Tabs */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Select Device Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['laptop', 'desktop', 'printer', 'cctv'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setDeviceType(type);
                        const firstIssue = issuesByDevice[type]?.[0]?.id || '';
                        setIssueType(firstIssue);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                        deviceType === type
                          ? 'bg-sky-500 text-white shadow-md'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      {type === 'cctv' ? 'CCTV Camera' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Issue Dropdown */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Select Reported Problem / Upgrade:
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
                >
                  {currentIssues.map((issue) => (
                    <option key={issue.id} value={issue.id}>
                      {issue.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column: Live Price & Turnaround Badge */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="text-xs font-medium text-slate-300">
                Estimated Service Quote:
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {selectedIssueData.cost}
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Typical Turnaround:</span>
                  <span className="font-semibold text-orange-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedIssueData.time}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Included Parts:</span>
                  <span className="text-right font-medium text-slate-200">
                    {selectedIssueData.parts}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Warranty:</span>
                  <span className="font-semibold text-emerald-400">
                    Up to 90 Days Store Guarantee
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenSupportWithTopic(`Repair Inquiry: ${selectedIssueData.label}`)}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirm Quote on WhatsApp / Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
