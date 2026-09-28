import { Product, GalleryItem, ServicePillar, PaymentConfig } from '../types';

export const DEFAULT_PAYMENT_CONFIG: PaymentConfig = {
  upiId: '8217676626@ybl',
  payeeName: 'iCare Computers (Naga Reddy)',
  qrImageUrl: '',
  accountNumber: '03210200001234',
  ifscCode: 'UCBA0000321',
  bankName: 'UCO Bank, Ballari Branch',
  instructions: 'Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI App.',
};

export const STORE_INFO = {
  name: 'iCare Computers',
  tagline: 'Your Trusted IT Partner for a Smarter Tomorrow',
  subTagline: 'Technology for a Better Tomorrow',
  proprietor: 'Naga Reddy',
  phone: '8217676626',
  formattedPhone: '+91 82176 76626',
  email: 'icarecomputers@gmail.com',
  address: '#Opp Kumaraswamy Temple, Beside UCO Bank, Ballari, Karnataka 583104',
  landmark: 'Beside UCO Bank, Opp Kumaraswamy Temple',
  city: 'Ballari, Karnataka',
  pincode: '583104',
  website: 'www.icarecomputers.in',
  hoursWeekdays: 'Mon - Sat: 9:30 AM – 9:00 PM',
  hoursSunday: 'Sunday: 10:00 AM – 2:00 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Kumaraswamy+Temple+Ballari+Karnataka+583104',
  whatsappUrl: 'https://wa.me/918217676626',
  motto: 'BUY | SERVICE | SUPPORT | GROW TOGETHER',
};

export const BRAND_ECOSYSTEM = {
  laptops: [
    { name: 'HP', color: 'bg-blue-50 text-blue-800' },
    { name: 'Dell', color: 'bg-sky-50 text-sky-800' },
    { name: 'Lenovo', color: 'bg-red-50 text-red-700' },
    { name: 'ASUS', color: 'bg-indigo-50 text-indigo-700' },
    { name: 'Acer', color: 'bg-emerald-50 text-emerald-700' },
    { name: 'Apple', color: 'bg-slate-100 text-slate-800' },
    { name: 'MSI', color: 'bg-red-50 text-red-800' },
    { name: 'Toshiba', color: 'bg-amber-50 text-amber-800' },
    { name: 'Samsung', color: 'bg-blue-50 text-blue-900' },
  ],
  printers: [
    { name: 'HP', color: 'bg-blue-50 text-blue-800' },
    { name: 'Canon', color: 'bg-red-50 text-red-800' },
    { name: 'Epson', color: 'bg-blue-50 text-blue-900' },
    { name: 'Brother', color: 'bg-sky-50 text-sky-800' },
    { name: 'Pantum', color: 'bg-slate-100 text-slate-800' },
    { name: 'Kyocera', color: 'bg-red-50 text-red-700' },
    { name: 'Xerox', color: 'bg-red-50 text-red-800' },
    { name: 'Ricoh', color: 'bg-amber-50 text-amber-900' },
  ],
  cctv: [
    { name: 'Hikvision', color: 'bg-red-50 text-red-800' },
    { name: 'Dahua', color: 'bg-red-50 text-red-700' },
    { name: 'CP PLUS', color: 'bg-blue-50 text-blue-900' },
    { name: 'UNV', color: 'bg-sky-50 text-sky-900' },
    { name: 'Zebronics', color: 'bg-purple-50 text-purple-800' },
    { name: 'Godrej', color: 'bg-emerald-50 text-emerald-800' },
    { name: 'Honeywell', color: 'bg-red-50 text-red-800' },
    { name: 'EZVIZ', color: 'bg-teal-50 text-teal-800' },
  ],
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'sales',
    title: 'SALES',
    subtitle: 'Wide Range, Best Prices',
    description: 'Brand-new & certified laptops, commercial desktop PCs, all-in-one workstations, ink-tank printers, and computer accessories with official manufacturer bill & warranty.',
    color: 'from-amber-500 to-orange-600',
    icon: 'ShoppingCart',
    features: [
      'Official brand warranty on all hardware',
      'Free OS & essential software setup',
      'Lowest competitive local pricing in Ballari',
      'Bulk purchase discounts for schools & offices'
    ],
    priceEstimate: 'Products start from ₹499'
  },
  {
    id: 'service',
    title: 'SERVICE',
    subtitle: 'Expert Support, Quick & Reliable',
    description: 'Advanced chip-level motherboard diagnosis, precision BGA IC repair, broken display screen replacement, water damage revival, and OS troubleshooting by certified technicians.',
    color: 'from-sky-500 to-blue-600',
    icon: 'Wrench',
    features: [
      'Same-day diagnostics & clear upfront estimate',
      'Original spare parts with 90-day replacement warranty',
      'Laptop hinge, body repair & keyboard replacements',
      'Windows/Linux clean install & virus removal'
    ],
    priceEstimate: 'Diagnostics from ₹250'
  },
  {
    id: 'upgrades',
    title: 'UPGRADES',
    subtitle: 'Better Performance, Longer Life',
    description: 'Transform sluggish 4-5 year old laptops and PCs into lightning-fast workhorses with high-speed Gen4 NVMe SSDs and dual-channel high-frequency RAM expansions.',
    color: 'from-emerald-500 to-teal-600',
    icon: 'Cpu',
    features: [
      '10x faster boot times with SSD upgrade',
      'DDR4 & DDR5 RAM expansions up to 64GB',
      'Dedicated gaming graphics card installations',
      'Complete thermal paste repasting & cooling overhaul'
    ],
    priceEstimate: 'SSD upgrades start at ₹1,850'
  },
  {
    id: 'networking',
    title: 'NETWORKING',
    subtitle: 'Wi-Fi & LAN Solutions',
    description: 'High-speed business and residential Wi-Fi mesh design, structured CAT6 cabling, server racks, managed network switches, and reliable router configurations.',
    color: 'from-purple-500 to-indigo-600',
    icon: 'Network',
    features: [
      'Zero dead-zone mesh Wi-Fi for multi-floor buildings',
      'CAT6 Gigabit cabling & crimping with patch panels',
      'Secure firewall & office internet sharing setup',
      'Bandwidth management & guest network configuration'
    ],
    priceEstimate: 'On-site survey from ₹500'
  },
  {
    id: 'cctv',
    title: 'CCTV SOLUTIONS',
    subtitle: 'Secure Today, Safer Tomorrow',
    description: 'Complete high-definition surveillance solutions from CP PLUS, Hikvision, and Dahua. Night vision IP cameras, DVR/NVR setup, mobile live viewing on your phone.',
    color: 'from-rose-500 to-red-600',
    icon: 'Camera',
    features: [
      'Full Color night-vision IP dome & bullet cameras',
      'Crystal-clear 1080p / 4K surveillance video recording',
      'Live smartphone monitoring from anywhere worldwide',
      'Professional neat cabling and weather-proof casing'
    ],
    priceEstimate: '4-Camera full kit from ₹11,999'
  },
  {
    id: 'amc',
    title: 'AMC & SUPPORT',
    subtitle: 'Always Here for You',
    description: 'Comprehensive and non-comprehensive Annual Maintenance Contracts for corporate offices, diagnostic labs, schools, colleges, and retail establishments in Ballari.',
    color: 'from-pink-500 to-rose-600',
    icon: 'Headphones',
    features: [
      'Quarterly scheduled preventive health checkups',
      'Priority 2-hour emergency on-site engineer dispatch',
      'Unlimited remote desktop troubleshooting support',
      'Automated data backup & network security audit'
    ],
    priceEstimate: 'Custom plans from ₹3,999/yr'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-lap-hp15',
    name: 'HP 15s 13th Gen Core i5 Laptop',
    brand: 'HP',
    category: 'laptops',
    price: 52990,
    originalPrice: 62450,
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    specs: {
      Processor: 'Intel Core i5-1335U (10 Cores, up to 4.6 GHz)',
      RAM: '16GB DDR4 3200MHz',
      Storage: '512GB PCIe NVMe M.2 SSD',
      Display: '15.6" Full HD (1920x1080) Micro-edge Anti-Glare',
      Graphics: 'Intel Iris Xe Graphics',
      OS: 'Windows 11 Home + MS Office 2021',
      Weight: '1.69 kg'
    },
    description: 'Designed for daily productivity, coding, and heavy office multitasking. Fast charging capability, long battery life, and crisp anti-glare display.',
    badge: 'Best Seller',
    tags: ['HP', 'i5', '16GB RAM', 'SSD', 'Windows 11'],
    warranty: '1 Year HP India On-Site Official Warranty',
    imageFallbackIcon: 'Laptop',
    gradient: 'from-blue-600 to-indigo-800'
  },
  {
    id: 'prod-lap-dell3520',
    name: 'Dell Inspiron 3520 12th Gen i3',
    brand: 'Dell',
    category: 'laptops',
    price: 36490,
    originalPrice: 43900,
    rating: 4.7,
    reviewsCount: 38,
    inStock: true,
    specs: {
      Processor: 'Intel Core i3-1215U (6 Cores, up to 4.4 GHz)',
      RAM: '8GB DDR4 (Expandable to 16GB at store)',
      Storage: '512GB M.2 PCIe NVMe SSD',
      Display: '15.6" FHD 120Hz Smooth Border Display',
      Graphics: 'Intel UHD Graphics',
      OS: 'Windows 11 Home + Office Home 2021',
      Weight: '1.65 kg'
    },
    description: 'Affordable, reliable workhorse ideal for college students, accounting software, and everyday home computing with a smooth 120Hz display.',
    badge: 'Popular for Students',
    tags: ['Dell', 'i3', '120Hz Display', 'Reliable'],
    warranty: '1 Year Dell India On-Site Warranty',
    imageFallbackIcon: 'Laptop',
    gradient: 'from-sky-600 to-cyan-800'
  },
  {
    id: 'prod-lap-asus-tuf',
    name: 'ASUS TUF Gaming F15 RTX 3050 Rig',
    brand: 'ASUS',
    category: 'laptops',
    price: 59990,
    originalPrice: 75990,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
    specs: {
      Processor: 'Intel Core i5-11400H 11th Gen (6 Cores / 12 Threads)',
      RAM: '16GB DDR4 (Dual Channel Upgradeable to 32GB)',
      Storage: '512GB PCIe 3.0 NVMe SSD + Empty M.2 Slot',
      Graphics: 'NVIDIA GeForce RTX 3050 (4GB GDDR6)',
      Display: '15.6" FHD 144Hz Adaptive-Sync Gaming Screen',
      Keyboard: 'RGB Backlit Chiclet Keyboard',
      Cooling: 'Dual self-cleaning cooling fans'
    },
    description: 'Military-grade rugged durability paired with an RTX 3050 GPU for smooth 1080p gaming, AutoCAD drafting, and video editing performance.',
    badge: 'Gaming Special',
    tags: ['ASUS', 'RTX 3050', '144Hz', 'Gaming', 'AutoCAD'],
    warranty: '1 Year ASUS Global Warranty + Store Setup',
    imageFallbackIcon: 'Laptop',
    gradient: 'from-slate-800 to-zinc-950'
  },
  {
    id: 'prod-lap-lenovo-v15',
    name: 'Lenovo ThinkPad E14 Gen 5 Ryzen 5',
    brand: 'Lenovo',
    category: 'laptops',
    price: 54990,
    originalPrice: 66500,
    rating: 4.9,
    reviewsCount: 24,
    inStock: true,
    specs: {
      Processor: 'AMD Ryzen 5 7530U (6 Cores / 12 Threads, 4.5 GHz)',
      RAM: '16GB DDR4 3200MHz',
      Storage: '512GB SSD M.2 2242 PCIe 4.0',
      Display: '14" WUXGA (1920x1200) IPS 300nits Anti-glare',
      Chassis: 'Aluminum top cover, Military Grade Spec STD-810H',
      Security: 'Discrete TPM 2.0 & Fingerprint Reader',
      Weight: '1.41 kg ultraportable'
    },
    description: 'Renowned ThinkPad tactile keyboard, legendary durability, and supreme battery efficiency. Preferred choice for corporate and accountants.',
    badge: 'Business Class',
    tags: ['Lenovo', 'ThinkPad', 'Ryzen 5', 'Business', 'Durable'],
    warranty: '1 Year Lenovo Premier Support On-Site',
    imageFallbackIcon: 'Laptop',
    gradient: 'from-red-900 to-zinc-900'
  },
  {
    id: 'prod-desk-icare-gaming',
    name: 'iCare Custom Gaming Rig (Core i5 13th Gen + RTX 4060)',
    brand: 'Custom PC',
    category: 'desktops',
    price: 78990,
    originalPrice: 92000,
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    specs: {
      Processor: 'Intel Core i5-13400F 10-Core / 16-Thread',
      Motherboard: 'MSI B760M Bomber Wi-Fi DDR5 Board',
      Graphics: 'Gigabyte NVIDIA GeForce RTX 4060 8GB GDDR6',
      RAM: '16GB Corsair Vengeance DDR5 5600MHz',
      Storage: '1TB Kingston NV2 Gen4 NVMe M.2 SSD',
      PowerSupply: 'Deepcool PK650D 650W 80+ Bronze Certified',
      Cabinet: 'Ant Esports ICE-112 Tempered Glass ARGB'
    },
    description: 'Hand-crafted at iCare Computers Ballari workbench with immaculate cable management, stress-tested for 24 hours, ready for 1440p gaming & streaming.',
    badge: 'Hand-Built in Store',
    tags: ['Custom PC', 'RTX 4060', 'DDR5', '13th Gen', 'ARGB'],
    warranty: '3 Years Component Warranty + 1 Year Free Store Maintenance',
    imageFallbackIcon: 'Cpu',
    gradient: 'from-indigo-900 to-slate-900'
  },
  {
    id: 'prod-desk-hp-aio',
    name: 'HP All-in-One 24-cr0000in Desktop PC',
    brand: 'HP',
    category: 'desktops',
    price: 49990,
    originalPrice: 58500,
    rating: 4.8,
    reviewsCount: 17,
    inStock: true,
    specs: {
      Processor: 'Intel Core i3-1315U 13th Gen Processor',
      Display: '23.8" FHD (1920x1080) IPS Three-Sided Micro-Edge',
      RAM: '8GB DDR4 RAM',
      Storage: '512GB PCIe NVMe SSD',
      Accessories: 'HP Wireless White Keyboard and Optical Mouse Included',
      Webcam: 'HP TrueVision 1080p FHD Pop-up Privacy Camera',
      Connectivity: 'Wi-Fi 6 + Bluetooth 5.3'
    },
    description: 'Clean, cord-free desktop setup ideal for reception counters, clinical consultation desks, and executive study desks.',
    badge: 'Space Saver',
    tags: ['HP', 'All-in-One', '24 Inch', 'Wireless Kit', 'Office'],
    warranty: '1 Year HP India On-Site Warranty',
    imageFallbackIcon: 'Monitor',
    gradient: 'from-sky-700 to-blue-900'
  },
  {
    id: 'prod-print-epson-l3250',
    name: 'Epson EcoTank L3250 Wi-Fi All-in-One Ink Tank Printer',
    brand: 'Epson',
    category: 'printers',
    price: 13999,
    originalPrice: 16999,
    rating: 4.9,
    reviewsCount: 56,
    inStock: true,
    specs: {
      Functions: 'Print, Scan, Copy with Smart Wi-Fi Direct',
      CostPerPrint: 'Ultra-low cost: 9 paise (Black), 24 paise (Colour)',
      Yield: 'Up to 4,500 Black / 7,500 Colour pages with bundled ink',
      Connectivity: 'Wi-Fi, USB 2.0, Epson Smart Panel App',
      Resolution: '5760 x 1440 dpi high-definition photo print',
      Speed: '10.0 ipm black, 5.0 ipm colour'
    },
    description: 'The undefeated king of cost-effective color printing. Print directly from smartphones via Wi-Fi. Ideal for home assignments and small businesses.',
    badge: 'Most Popular',
    tags: ['Epson', 'EcoTank', 'Wi-Fi', 'All-in-One', 'Low Cost'],
    warranty: '1 Year or 30,000 pages Epson Official Warranty',
    imageFallbackIcon: 'Printer',
    gradient: 'from-blue-700 to-sky-900'
  },
  {
    id: 'prod-print-hp-laser',
    name: 'HP LaserJet Pro M126nw Multi-Function Network Printer',
    brand: 'HP',
    category: 'printers',
    price: 18490,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    specs: {
      Type: 'Monochrome Laser Multi-Function (Print, Scan, Copy)',
      Speed: 'Up to 20 ppm (A4)',
      Connectivity: 'Wireless 802.11b/g/n, Fast Ethernet LAN, Hi-Speed USB',
      DutyCycle: 'Up to 8,000 pages monthly',
      TonerCartridge: 'HP 88A Black LaserJet Toner Cartridge (Easily refilled in store)'
    },
    description: 'Rugged laser printer engineered for fast paperwork, invoices, bills, and legal documents. Features easy and economical toner cartridge refilling at our shop.',
    badge: 'Office Heavy Duty',
    tags: ['HP', 'LaserJet', 'Network', 'Fast Print', 'Refillable'],
    warranty: '1 Year HP India On-Site Warranty',
    imageFallbackIcon: 'Printer',
    gradient: 'from-slate-700 to-zinc-900'
  },
  {
    id: 'prod-cctv-hik-4ch',
    name: 'Hikvision 4-Channel 1080p Full Surveillance Kit with 1TB HDD',
    brand: 'Hikvision',
    category: 'cctv',
    price: 12499,
    originalPrice: 15500,
    rating: 4.9,
    reviewsCount: 48,
    inStock: true,
    specs: {
      KitIncludes: '4 HD Cameras (2 Indoor Domes + 2 Outdoor Weatherproof Bullets)',
      Resolution: '2MP Full HD 1080p with Night Vision IR up to 20m',
      Storage: '1TB Surveillance Grade Western Digital Purple HDD included',
      DVR: 'Hikvision 4-Channel Turbo HD H.265+ DVR',
      Accessories: 'Power Supply 12V 5A, 4 BNC/DC Connectors, 90m 3+1 Copper Cable',
      MobileApp: 'Hik-Connect (Free lifetime remote viewing on iOS/Android)'
    },
    description: 'Complete security camera system for homes, villas, and shops in Ballari. Professional installation service available upon request.',
    badge: 'Top Seller Kit',
    tags: ['Hikvision', '4-Camera', '1TB HDD', 'Night Vision', 'Mobile View'],
    warranty: '2 Years Manufacturer Replacement Warranty on DVR & Cameras',
    imageFallbackIcon: 'Camera',
    gradient: 'from-red-800 to-rose-950'
  },
  {
    id: 'prod-cctv-cpplus-smart',
    name: 'CP PLUS 3MP Smart Wi-Fi 360° Pan-Tilt Home Camera',
    brand: 'CP PLUS',
    category: 'cctv',
    price: 1999,
    originalPrice: 3200,
    rating: 4.7,
    reviewsCount: 63,
    inStock: true,
    specs: {
      Resolution: '3 Megapixel 1296p Super HD',
      Rotation: '360° Pan and 85° Tilt motion with Smart Auto-Tracking',
      Audio: 'Two-Way Audio with built-in mic and speaker',
      NightVision: 'IR Night Vision up to 10 meters in pitch darkness',
      StorageSupport: 'MicroSD slot up to 256GB + Cloud storage option',
      SmartAlerts: 'AI Human Body Detection with instant phone alarm'
    },
    description: 'Plug-and-play smart security camera for elderly care, baby monitoring, or indoor shop counter protection. Configured in 5 minutes via phone.',
    badge: 'Budget Pick',
    tags: ['CP PLUS', 'Wi-Fi Camera', '360 View', 'Two-Way Audio', '3MP'],
    warranty: '1 Year CP PLUS National Warranty',
    imageFallbackIcon: 'Camera',
    gradient: 'from-blue-800 to-sky-950'
  },
  {
    id: 'prod-acc-crucial-ssd',
    name: 'Crucial P3 Plus 1TB PCIe Gen4 NVMe M.2 SSD',
    brand: 'Crucial',
    category: 'accessories',
    price: 5499,
    originalPrice: 8500,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    specs: {
      ReadSpeed: 'Up to 5,000 MB/s sequential read',
      WriteSpeed: 'Up to 4,200 MB/s sequential write',
      FormFactor: 'M.2 2280 NVMe',
      Compatibility: 'Compatible with Gen4 and Gen3 motherboards / laptops',
      Endurance: '220 TBW (Terabytes Written)'
    },
    description: 'High-speed solid state drive to eliminate loading screens and sluggish boot times. Free cloning service of your existing Windows installation at our shop.',
    badge: 'Must-Have Upgrade',
    tags: ['Crucial', '1TB SSD', 'Gen4', '5000 MB/s', 'Upgrade'],
    warranty: '5 Years Official Manufacturer Warranty',
    imageFallbackIcon: 'HardDrive',
    gradient: 'from-emerald-700 to-teal-900'
  },
  {
    id: 'prod-acc-tplink-router',
    name: 'TP-Link Archer AX12 Dual-Band Wi-Fi 6 Gigabit Router',
    brand: 'TP-Link',
    category: 'accessories',
    price: 2499,
    originalPrice: 3999,
    rating: 4.8,
    reviewsCount: 39,
    inStock: true,
    specs: {
      Standard: 'Next-Gen Wi-Fi 6 (802.11ax)',
      Speeds: '1.5 Gbps (1201 Mbps on 5 GHz + 300 Mbps on 2.4 GHz)',
      Antennas: '4 High-Gain external antennas with Beamforming',
      Ports: '1x Gigabit WAN + 3x Gigabit LAN Ports',
      Features: 'OFDMA, WPA3 Latest Security, EasyMesh Compatible'
    },
    description: 'Experience buffer-free 4K streaming and low-latency gaming throughout your house. Upgrades older broadband connections seamlessly.',
    badge: 'Wi-Fi 6',
    tags: ['TP-Link', 'Wi-Fi 6', 'Gigabit', 'High Range', 'Dual Band'],
    warranty: '3 Years Replacement Warranty',
    imageFallbackIcon: 'Wifi',
    gradient: 'from-sky-700 to-cyan-900'
  },
  {
    id: 'prod-amc-office',
    name: 'Commercial Office IT Annual Maintenance Contract (AMC)',
    brand: 'iCare CarePlan',
    category: 'amc',
    price: 8999,
    originalPrice: 12000,
    rating: 5.0,
    reviewsCount: 15,
    inStock: true,
    specs: {
      Coverage: 'Up to 10 Computers + 2 Network Printers + Wi-Fi Mesh',
      Visits: 'Monthly preventive maintenance visit + Emergency on-call support',
      ResponseTime: 'Guaranteed under 2 hours for critical breakdown in Ballari',
      RemoteSupport: 'Unlimited AnyDesk / TeamViewer software support',
      Antivirus: 'Licensed centralized Antivirus & Ransomware shield managed'
    },
    description: 'Ensure 99.9% uptime for your business operations. Our technicians handle virus cleanups, network optimization, data backups, and hardware health.',
    badge: 'Business Essential',
    tags: ['AMC', 'Corporate', 'Priority Support', 'Ballari Local'],
    warranty: 'Annual Contract with Dedicated Service Lead (Naga Reddy)',
    imageFallbackIcon: 'Headphones',
    gradient: 'from-purple-800 to-indigo-950'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Showroom Interior & Laptop Showcase',
    category: 'showroom',
    description: 'Our retail display zone showcasing the newest lineup of HP, Dell, and Lenovo laptops ready for live customer demonstration.',
    date: 'September 2026',
    location: 'iCare Computers, Opp Kumaraswamy Temple, Ballari',
    tags: ['Showroom', 'Laptops', 'Retail Display'],
    gradient: 'from-blue-600 via-sky-600 to-cyan-700',
    iconName: 'Store'
  },
  {
    id: 'gal-2',
    title: 'Micro-Soldering & Chip-Level Motherboard Repair',
    category: 'repairs',
    description: 'Precision hot-air rework station and microscope diagnostics fixing a power-rail short circuit on an ASUS gaming laptop motherboard.',
    date: 'August 2026',
    client: 'Student from Ballari Engineering College',
    location: 'iCare Tech Workbench',
    tags: ['Chip Level', 'Motherboard', 'BGA Repair'],
    gradient: 'from-amber-600 via-orange-600 to-red-700',
    iconName: 'Wrench'
  },
  {
    id: 'gal-3',
    title: '16-Channel Hikvision Commercial CCTV Deployment',
    category: 'cctv',
    description: 'Complete surveillance system installation at a prominent textile distribution warehouse in Ballari with 24/7 mobile recording.',
    date: 'August 2026',
    client: 'Sri Sai Textiles, Ballari',
    location: 'Cowl Bazaar Industrial Area',
    tags: ['CCTV', 'Hikvision', 'Warehouse Security'],
    gradient: 'from-red-600 via-rose-600 to-slate-900',
    iconName: 'Camera'
  },
  {
    id: 'gal-4',
    title: 'Custom RTX 4070 Ti White & Neon Watercooled PC',
    category: 'custom_pc',
    description: 'A bespoke gaming and 3D architectural rendering workstation with braided white cables, dual 360mm radiator, and synced ARGB lighting.',
    date: 'July 2026',
    client: 'Local 3D Architectural Studio',
    location: 'iCare Assembly Lab',
    tags: ['Custom Rig', 'RTX 4070 Ti', 'Watercooling', 'Cable Management'],
    gradient: 'from-indigo-600 via-purple-600 to-slate-900',
    iconName: 'Cpu'
  },
  {
    id: 'gal-5',
    title: 'Bulk Delivery of 12 HP All-in-One Desktops for Clinic',
    category: 'delivery',
    description: 'Successful deployment and on-site LAN setup of administrative desktops for a multispecialty diagnostic center near Cantonment.',
    date: 'June 2026',
    client: 'Ballari Diagnostic Center',
    location: 'Cantonment, Ballari',
    tags: ['Delivery', 'HP All-in-One', 'Healthcare IT'],
    gradient: 'from-emerald-600 via-teal-600 to-cyan-800',
    iconName: 'Truck'
  },
  {
    id: 'gal-6',
    title: 'Fast SSD Upgrade & Thermal Repaste Express Service',
    category: 'repairs',
    description: 'Upgrading a slow 5-year old Dell laptop with a Crucial 500GB SSD, arctic thermal paste, and RAM boost in just 45 minutes.',
    date: 'May 2026',
    client: 'Chartered Accountant Office',
    location: 'iCare Express Counter',
    tags: ['SSD Upgrade', 'Same Day', 'Thermal Maintenance'],
    gradient: 'from-sky-600 via-blue-700 to-indigo-900',
    iconName: 'Zap'
  }
];

export const TESTIMONIALS = [
  {
    name: 'K. S. Prashanth',
    role: 'Civil Engineer, Ballari',
    text: 'My laptop display suddenly stopped working right before a municipal submission. Naga Reddy sir arranged an original replacement panel in 4 hours! Invaluable service.',
    rating: 5,
    date: '2 weeks ago',
    verified: true
  },
  {
    name: 'Dr. Anita Desai',
    role: 'Clinic Director, Gandhi Nagar',
    text: 'iCare Computers installed our 8-camera Hikvision security system. Clean cabling without damaging our clinic walls, and the phone app works flawlessly. Highly recommend!',
    rating: 5,
    date: '1 month ago',
    verified: true
  },
  {
    name: 'Raghavendra Rao',
    role: 'Lecturer, Vijayanagara College',
    text: 'Bought an Epson L3250 printer and an HP laptop for my son. Best price in entire Ballari, and they pre-configured all software free of cost.',
    rating: 5,
    date: '2 months ago',
    verified: true
  }
];
