import React, { useState } from 'react';
import { 
  Laptop, 
  Monitor, 
  Printer, 
  Camera, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Tag, 
  HardDrive, 
  Wifi, 
  Sparkles, 
  Store, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Search,
  Check
} from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

export interface OfflineProduct {
  id: string;
  name: string;
  category: 'laptops' | 'desktops' | 'printers' | 'cctv' | 'accessories' | 'upgrades';
  brands: string[];
  specs: string[];
  warranty: string;
  inStorePerks: string;
  badge?: string;
  icon: React.ElementType;
  color: string;
}

export interface OfflineServiceItem {
  id: string;
  title: string;
  category: 'repair' | 'upgrade' | 'printer' | 'cctv' | 'amc';
  brandsHandled: string;
  turnaround: string;
  warranty: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  color: string;
}

const OFFLINE_PRODUCTS: OfflineProduct[] = [
  {
    id: 'off-lap-all',
    name: 'Multi-Brand Laptops (Student, Business & Gaming)',
    category: 'laptops',
    brands: ['HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'Apple', 'MSI'],
    specs: [
      'Intel Core i3 / i5 / i7 & AMD Ryzen 5 / 7',
      '8GB / 16GB / 32GB RAM Options',
      '512GB / 1TB High-Speed NVMe SSD',
      'FHD IPS & High-Refresh Gaming Displays',
      'Pre-loaded Windows 11 + MS Office'
    ],
    warranty: '1 to 3 Years Official Manufacturer Brand Warranty',
    inStorePerks: 'Free OS setup, software installation & data migration from old laptop',
    badge: 'All Brands in Stock',
    icon: Laptop,
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'off-desk-aio',
    name: 'Desktops, All-in-One PCs & Custom Rigs',
    category: 'desktops',
    brands: ['HP', 'Dell', 'Lenovo', 'Custom Builds (Intel & AMD)'],
    specs: [
      'Office Workstations & Slim Micro Desktops',
      '21.5" & 23.8" Borderless All-in-One PCs',
      'Custom Gaming Builds (RTX 3060 / 4060 / 4070)',
      'High-Durability Ant Esports / Deepcool Cabinets',
      '80+ Bronze / Gold Certified SMPS Power'
    ],
    warranty: 'Up to 3 Years Component Brand Warranty',
    inStorePerks: 'Free 24-hr stability stress testing, custom cable routing & BIOS tuning',
    badge: 'Assembled in Store',
    icon: Monitor,
    color: 'from-slate-700 to-zinc-900'
  },
  {
    id: 'off-print-all',
    name: 'Printers, All-in-One Scanners & Toners',
    category: 'printers',
    brands: ['HP', 'Canon', 'Epson', 'Brother'],
    specs: [
      'EcoTank & MegaTank High-Yield Ink Tank Printers',
      'Fast Monochrome & Color Laser Printers',
      'Print, Scan, Copy (All-in-One) with Wi-Fi & Duplex',
      'Original & Compatible Toners (88A, 12A, 05A)',
      'Genuine Ink Bottles (Epson 003, Canon GI-790, HP GT53)'
    ],
    warranty: '1 Year Manufacturer On-Site / Carry-in Warranty',
    inStorePerks: 'First ink filling free + live test print demonstration at counter',
    badge: 'Ink Tank & Laser',
    icon: Printer,
    color: 'from-cyan-600 to-blue-800'
  },
  {
    id: 'off-cctv-kits',
    name: 'CCTV Surveillance Cameras & NVR / DVR Kits',
    category: 'cctv',
    brands: ['CP PLUS', 'Hikvision', 'Dahua', 'Honeywell', 'UNV'],
    specs: [
      '2MP, 4MP & 4K Ultra-HD Dome & Bullet Cameras',
      'Full-Color Night Vision with Built-in Microphone',
      '4, 8 & 16 Channel H.265+ DVR & NVR Units',
      '1TB / 2TB / 4TB Surveillance Grade Hard Drives (WD Purple / Seagate)',
      'SMPS Centralized Power Supplies & High-Quality CAT6 Cables'
    ],
    warranty: '2 Years Manufacturer Replacement Warranty',
    inStorePerks: 'Free mobile remote view configuration (Hik-Connect / gCMOB on all phones)',
    badge: 'Complete Security Kits',
    icon: Camera,
    color: 'from-rose-600 to-red-800'
  },
  {
    id: 'off-parts-ssd',
    name: 'Internal Components, SSDs, RAM & Graphics Cards',
    category: 'upgrades',
    brands: ['Crucial', 'Kingston', 'Western Digital', 'Seagate', 'Corsair', 'Gigabyte', 'MSI'],
    specs: [
      'NVMe M.2 Gen3/Gen4 SSDs (256GB, 512GB, 1TB, 2TB)',
      '2.5" SATA III Solid State Drives for older laptops',
      'DDR4 & DDR5 RAM Modules for Laptop & Desktop (3200MHz - 5600MHz)',
      'Original Laptop Batteries & Power Adapters/Chargers',
      'Dedicated NVIDIA GeForce & AMD Radeon Graphics Cards'
    ],
    warranty: '3 to 5 Years Official Manufacturer Replacement Warranty',
    inStorePerks: 'Instant in-store installation & 100% free Windows OS cloning',
    badge: 'Express Upgrade in 45 Min',
    icon: Cpu,
    color: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'off-acc-periph',
    name: 'Computer Accessories, Monitors & Networking Gear',
    category: 'accessories',
    brands: ['Logitech', 'HP', 'Dell', 'Zebronics', 'TP-Link', 'D-Link', 'APC'],
    specs: [
      'Wireless & Wired Keyboards and Mouse Combos',
      '22", 24" & 27" Full HD Anti-Glare IPS Monitors (Dell, LG, Acer)',
      'Dual-Band & Wi-Fi 6 Gigabit Routers & Range Extenders',
      'CAT6 LAN Patch Cords, HDMI, VGA & DisplayPort Cables',
      'UPS Power Backup Units (600VA / 1100VA) & Surge Protectors'
    ],
    warranty: '1 to 3 Years Brand Warranty with Tax Invoice',
    inStorePerks: 'Tested and demonstrated live before purchase',
    badge: 'All Peripherals Under One Roof',
    icon: Wifi,
    color: 'from-amber-600 to-orange-700'
  }
];

const OFFLINE_SERVICES: OfflineServiceItem[] = [
  {
    id: 'srv-chip-level',
    title: 'Motherboard Chip-Level Repair & Micro-Soldering',
    category: 'repair',
    brandsHandled: 'All Brands (HP, Dell, Lenovo, ASUS, Acer, Apple MacBook, MSI, Toshiba)',
    turnaround: '24 – 48 Hours',
    warranty: '90-Day In-Store Service Guarantee',
    description: 'Precision diagnostics using digital oscilloscopes, infrared BGA rework stations, and stereoscopic microscopes for repairing dead motherboards, shorted power rails, and liquid spills.',
    highlights: [
      'BGA chipset re-balling and VRAM / GPU replacement',
      'Power IC (PWM / Charging controller) restoration',
      'Liquid damage corrosion removal & trace rebuilding',
      'BIOS reprogramming and clean ME-region flashing'
    ],
    icon: Cpu,
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'srv-screen-hinge',
    title: 'Broken Screen, Hinge & Body Fabrication',
    category: 'repair',
    brandsHandled: 'All Brands of Laptops & Notebooks',
    turnaround: 'Same-Day (2 to 4 Hours)',
    warranty: '3-Month Replacement Warranty on Screens',
    description: 'Direct factory replacement for cracked, flickering, or vertical line LCD/LED screens. Precision structural welding and reinforcement for broken plastic hinges and loose laptop base covers.',
    highlights: [
      'Brand-new Grade A+ IPS & 144Hz high-refresh displays',
      'Structural hinge bracket repair without expensive casing replacement',
      'Keyboard replacement (Backlit & Non-Backlit)',
      'Touchpad and DC power charging jack replacements'
    ],
    icon: Wrench,
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'srv-ssd-upgrade',
    title: 'Fast SSD & RAM Speed Boost Overhaul',
    category: 'upgrade',
    brandsHandled: 'All Laptop & Desktop Brands (Windows & Mac)',
    turnaround: '30 – 45 Minutes Express Service',
    warranty: '3 to 5 Years Hardware Warranty on SSD/RAM',
    description: 'Transform sluggish 4-5 year old laptops and PCs into lightning-fast workhorses. We clone your existing Windows, apps, and files exactly as they are without any data loss.',
    highlights: [
      '10x faster boot times and immediate app responsiveness',
      '100% exact Windows cloning with zero data loss',
      'Deep thermal heatsink dust cleaning & premium Arctic thermal paste',
      'RAM expansion up to 64GB for seamless multitasking'
    ],
    icon: HardDrive,
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'srv-printer-refill',
    title: 'Printer Repair, Head Unclog & Fast Toner Refilling',
    category: 'printer',
    brandsHandled: 'HP, Canon, Epson, Brother, Pantum, Xerox',
    turnaround: '15 Min for Refills / Same-Day for Repairs',
    warranty: 'Tested Print Quality Guarantee',
    description: 'Professional printer maintenance for home, clinic, and corporate printers. Quick toner refilling with optical powder and ultrasonic printhead unclogging.',
    highlights: [
      'LaserJet 88A / 12A / 05A quick 15-minute cartridge toner refilling',
      'Epson & Canon Ink Tank printhead purge and nozzle recovery',
      'Paper jam roller, separation pad, and gear replacement',
      'Waste ink pad counter reset and logic board service'
    ],
    icon: Printer,
    color: 'from-sky-600 to-cyan-700'
  },
  {
    id: 'srv-cctv-service',
    title: 'CCTV Installation, Cabling & Mobile View Setup',
    category: 'cctv',
    brandsHandled: 'CP PLUS, Hikvision, Dahua, Honeywell, UNV, EZVIZ',
    turnaround: 'Same-Day / 1-Day On-Site Deployment',
    warranty: '2 Years Manufacturer Warranty + 1 Year Store Service',
    description: 'End-to-end commercial & residential security setups in Ballari. Professional concealed cabling, DVR/NVR setup, night-vision camera alignment, and smartphone live access.',
    highlights: [
      'Zero-blindspot site survey and neat conduit piping',
      '24/7 continuous and motion-detected recording configuration',
      'Mobile live viewing setup on Android & iOS devices for all family members',
      'Repairing offline cameras, missing video feeds, and hard drive recording errors'
    ],
    icon: Camera,
    color: 'from-rose-600 to-red-700'
  },
  {
    id: 'srv-amc-corp',
    title: 'Corporate IT Annual Maintenance Contracts (AMC)',
    category: 'amc',
    brandsHandled: 'Multi-Brand Office Setups across Ballari',
    turnaround: 'Guaranteed 2-Hour Emergency On-Site Response',
    warranty: 'Year-Round Priority SLA Contract',
    description: 'Comprehensive IT infrastructure management for clinics, hospitals, textile warehouses, schools, chartered accountant offices, and retail showrooms in Ballari.',
    highlights: [
      'Monthly scheduled preventive hardware & software health checkups',
      'Centralized anti-ransomware protection & automated local data backups',
      'Wi-Fi mesh networking and structured LAN cable management',
      'Unlimited remote phone and AnyDesk quick support'
    ],
    icon: ShieldCheck,
    color: 'from-purple-600 to-indigo-800'
  }
];

export const OfflineStoreShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'services'>('sales');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<OfflineProduct | null>(null);

  const filteredProducts = productCategoryFilter === 'all'
    ? OFFLINE_PRODUCTS
    : OFFLINE_PRODUCTS.filter(p => p.category === productCategoryFilter);

  const filteredServices = serviceCategoryFilter === 'all'
    ? OFFLINE_SERVICES
    : OFFLINE_SERVICES.filter(s => s.category === serviceCategoryFilter);

  const handleProductWhatsApp = (prodName: string) => {
    const text = encodeURIComponent(
      `Hello Naga Reddy sir,\nI am looking for in-store price & availability at iCare Computers for:\n• Product: ${prodName}\nPlease let me know offline store stock & quotation.`
    );
    window.open(`https://wa.me/91${STORE_INFO.phone}?text=${text}`, '_blank');
  };

  const handleServiceWhatsApp = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello Naga Reddy sir,\nI require offline store service at iCare Computers for:\n• Service: ${serviceTitle}\nPlease let me know diagnosis timing and quotation.`
    );
    window.open(`https://wa.me/91${STORE_INFO.phone}?text=${text}`, '_blank');
  };

  return (
    <section id="offline-store" className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* BIG EXPLICIT NOTICE BANNER: OFFLINE STORE CLARIFICATION */}
        <div className="mb-10 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-400/40 rounded-lg text-xs font-bold text-orange-300">
                <Store className="w-3.5 h-3.5 text-orange-400" />
                <span>PHYSICAL OFFLINE STORE &amp; SERVICE COUNTER · BALLARI</span>
                <span className="text-orange-400">·</span>
                <span className="text-white">ALL BRANDS HANDLED</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-heading">
                We Do Offline Store Sales &amp; Multi-Brand Service
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">Important Notice:</strong> We are a physical offline technology retail store and chip-level service center. <span className="text-orange-300 font-semibold underline decoration-orange-400/50">We do not sell products through an online shopping cart on this website.</span> All purchases, live demos, device diagnostics, and repair services are provided directly at our physical store counter beside UCO Bank or via phone &amp; WhatsApp inquiries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/20 whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: {STORE_INFO.formattedPhone}</span>
              </a>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Offline Store Quick Advantages Strip */}
          <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Tax Invoice</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All Brands Under One Roof</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Live Demonstration in Store</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Same-Day Ballari Service</span>
            </div>
          </div>
        </div>

        {/* DUAL MODE TAB SWITCHER: 1. OFFLINE STORE SALES vs 2. OFFLINE STORE SERVICE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
              Explore Our Store Operations
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {activeTab === 'sales' ? 'Offline Store Sales — All Brands Available' : 'Offline Store Service & Repairs — All Brands Handled'}
            </h3>
          </div>

          {/* Toggle Buttons */}
          <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 shadow-inner">
            <button
              onClick={() => setActiveTab('sales')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sales'
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-300/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4 text-sky-600" />
              <span>1. Offline Store Sales (All Brands)</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-300/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-4 h-4 text-orange-500" />
              <span>2. Store Service &amp; Repairs (All Brands)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OFFLINE STORE SALES */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Hardware Categories:</span>
              </span>
              {[
                { id: 'all', label: 'All Hardware Stock' },
                { id: 'laptops', label: 'Laptops (All Brands)' },
                { id: 'desktops', label: 'Desktops & Custom PCs' },
                { id: 'printers', label: 'Printers & Toners' },
                { id: 'cctv', label: 'CCTV Security Kits' },
                { id: 'upgrades', label: 'SSDs, RAM & Components' },
                { id: 'accessories', label: 'Accessories & Networking' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setProductCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    productCategoryFilter === cat.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Offline Sales Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => {
                const IconComponent = prod.icon;
                return (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Top Header Card Banner */}
                      <div className={`p-4 bg-gradient-to-r ${prod.color} text-white flex items-center justify-between`}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-200 block truncate">
                              Offline In-Store Hardware
                            </span>
                            <h4 className="text-xs sm:text-sm font-black truncate text-white">
                              {prod.name}
                            </h4>
                          </div>
                        </div>

                        {prod.badge && (
                          <span className="shrink-0 px-2 py-0.5 bg-white/25 backdrop-blur-xs text-[10px] font-black rounded-md tracking-tight">
                            {prod.badge}
                          </span>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-4">
                        {/* Brands Tag Cloud */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Available Brands in Store:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {prod.brands.map((b) => (
                              <span
                                key={b}
                                className="px-2 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-800 text-[11px] font-bold rounded-md border border-slate-200/80"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Specs List */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Key Specifications &amp; Configurations:
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {prod.specs.map((spec, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                <span className="leading-snug">{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Warranty & In-store Perk Badge */}
                        <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                            <span>{prod.warranty}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200/70 text-[11px] font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>In-Store Benefit: {prod.inStorePerks}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions: Call, WhatsApp, View Details */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleProductWhatsApp(prod.name)}
                        className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Chat on WhatsApp for offline store pricing"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire Price</span>
                      </button>

                      <a
                        href={`tel:${STORE_INFO.phone}`}
                        className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Call Naga Reddy for immediate stock check"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Store</span>
                      </a>

                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                        title="View Full Hardware Details"
                        aria-label="View Full Hardware Details"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: OFFLINE STORE SERVICE & REPAIRS */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Service Filters */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-orange-500" />
                <span>Service Categories:</span>
              </span>
              {[
                { id: 'all', label: 'All Multi-Brand Services' },
                { id: 'repair', label: 'Motherboard & Hardware Repair' },
                { id: 'upgrade', label: 'SSD & RAM Upgrades' },
                { id: 'printer', label: 'Printer Service & Toners' },
                { id: 'cctv', label: 'CCTV Installation' },
                { id: 'amc', label: 'Corporate AMC' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setServiceCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    serviceCategoryFilter === cat.id
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Offline Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((srv) => {
                const IconComponent = srv.icon;
                return (
                  <div
                    key={srv.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Top Header Card Banner */}
                      <div className={`p-4 bg-gradient-to-r ${srv.color} text-white flex items-center justify-between`}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-orange-200 block truncate">
                              Offline Service &amp; Diagnostics
                            </span>
                            <h4 className="text-xs sm:text-sm font-black truncate text-white">
                              {srv.title}
                            </h4>
                          </div>
                        </div>

                        <span className="shrink-0 px-2 py-0.5 bg-white/25 backdrop-blur-xs text-[10px] font-bold rounded-md">
                          {srv.turnaround}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-4">
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Brands Handled:
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {srv.brandsHandled}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {srv.description}
                        </p>

                        {/* Highlights List */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Service Capabilities:
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {srv.highlights.map((hl, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-orange-600 mt-0.5 shrink-0" />
                                <span className="leading-snug">{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500">Service Guarantee:</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {srv.warranty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions: Book on WhatsApp / Call */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleServiceWhatsApp(srv.title)}
                        className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Book offline service estimate on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Book on WhatsApp</span>
                      </button>

                      <a
                        href={`tel:${STORE_INFO.phone}`}
                        className="py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        title="Call technician directly"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Shop</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BOTTOM STORE CALL TO ACTION & WALK-IN DIRECTIONS */}
        <div className="mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Visit Our Ballari Store Counter</span>
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
              #Opp Kumaraswamy Temple, Beside UCO Bank, Ballari - 583104
            </h4>
            <p className="text-xs text-slate-600 max-w-2xl">
              Walk in with your laptop, desktop, printer, or surveillance equipment for instant on-the-spot inspection. Monday to Saturday: 9:30 AM to 9:00 PM.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <span>Get Google Maps Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Naga Reddy ({STORE_INFO.formattedPhone})</span>
            </a>
          </div>
        </div>

      </div>

      {/* HARDWARE DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">
                  Offline Store Hardware Profile
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-0.5">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Notice */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Offline Purchase Only:</strong> To purchase this hardware or request availability for a specific model, please visit our Ballari store counter or contact Naga Reddy directly.
                </span>
              </div>

              {/* Brands */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">
                  Supported Brands:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.brands.map(b => (
                    <span key={b} className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">
                  Standard Specifications:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedProduct.specs.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In-Store Perk */}
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Exclusive In-Store Advantage:</span>
                </div>
                <div>{selectedProduct.inStorePerks}</div>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Warranty: {selectedProduct.warranty}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleProductWhatsApp(selectedProduct.name);
                  setSelectedProduct(null);
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
