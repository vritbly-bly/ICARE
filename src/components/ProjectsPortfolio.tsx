import React, { useState } from 'react';
import { 
  Building2, 
  Camera, 
  Cpu, 
  Network, 
  Wrench, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight,
  Filter,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: 'cctv' | 'chiplab' | 'networking' | 'workstation' | 'amc';
  client: string;
  location: string;
  date: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: string[];
  techStack: string[];
  gradient: string;
}

const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: 'proj-1',
    title: '16-Camera 4K Surveillance & Centralized NVR Infrastructure',
    category: 'cctv',
    client: 'Ballari Diagnostic & Multispecialty Center',
    location: 'Cantonment Area, Ballari',
    date: 'August 2026',
    summary: 'Turnkey security engineering across 3 clinic floors, patient reception, sample collection labs, and external medical storage.',
    challenge: 'High footfall medical clinic requiring zero blind-spots, tamper-proof video archiving, and discreet conduits without disturbing ongoing patient consultations.',
    solution: 'Designed and deployed a 16-channel Hikvision IP surveillance network with color night-vision, H.265+ compression, and redundant Western Digital Purple surveillance storage.',
    outcome: '100% perimeter and lab coverage with secure remote live view configured on the medical director and senior administrator mobile devices.',
    deliverables: [
      '16x 4K Ultra-HD ColorVu dome & bullet IP cameras',
      '16-Channel 4K NVR with dual 6TB surveillance hard drives',
      'Surge-protected PoE switches and concealed flexible conduit casing',
      'Multi-user mobile app configuration with restricted permission tiers'
    ],
    techStack: ['Hikvision 4K', 'ColorVu', 'H.265+', 'PoE Gigabit', 'WD Purple'],
    gradient: 'from-blue-700 via-sky-800 to-slate-900',
  },
  {
    id: 'proj-2',
    title: 'Precision BGA Chip-Level Motherboard Restoration on CAD Laptop',
    category: 'chiplab',
    client: 'Senior Design Engineer, Ballari Steel & Civil Firm',
    location: 'iCare Engineering Lab, Ballari',
    date: 'September 2026',
    summary: 'Emergency recovery of a high-end Dell Precision Mobile Workstation that suffered severe power surge failure during heavy rendering.',
    challenge: 'Official brand service center declared the laptop unrepairable and quoted ₹85,000 for full motherboard replacement with 3-week import delay.',
    solution: 'Micro-scoped circuit tracing identified a shorted 19V primary power rail and damaged MOSFET drivers. Replaced burnt capacitors and micro-soldered original PWM IC using our precision infrared BGA rework station.',
    outcome: 'Fully revived workstation in under 36 hours at less than 15% of the brand replacement cost with zero data loss.',
    deliverables: [
      'Deep circuit tracing and thermal imaging short-circuit detection',
      'Replacement of 3x high-voltage MOSFETs and PWM controller IC',
      'Precision BGA soldering under 45x trinocular microscope',
      'Full thermal repasting with Arctic MX-4 and 12-hour stress benchmark'
    ],
    techStack: ['Infrared BGA Rework', 'Thermal Imaging', 'SMD Micro-Soldering', 'Dell Precision'],
    gradient: 'from-amber-600 via-orange-700 to-slate-900',
  },
  {
    id: 'proj-3',
    title: 'Gigabit LAN & Server Rack Deployment for 45-Seat Engineering Lab',
    category: 'networking',
    client: 'Technical Training & CAD Institute',
    location: 'Gandhi Nagar, Ballari',
    date: 'July 2026',
    summary: 'Turnkey network infrastructure, server rack termination, and zero-loss structured CAT6 cabling for professional CAD/CAM simulation workstations.',
    challenge: 'Sluggish broadcast storms, chaotic untagged cables, and constant disconnection during heavy multi-user network license verification.',
    solution: 'Designed structured CAT6 star topology with D-Link 24-Port Gigabit managed switches, 9U wall-mount server rack, and professional patch panel crimping.',
    outcome: 'Stable 1000 Mbps line-speed throughput across all 45 machines with unified network printer access and 99.98% network stability.',
    deliverables: [
      'Over 850 meters of structured D-Link CAT6 solid-copper cabling',
      '2x 24-Port Gigabit rack-mountable managed enterprise switches',
      'Neat patch panel cable termination with numbered port labeling',
      'Dual-WAN router load balancing with failover backup line'
    ],
    techStack: ['CAT6 Copper', 'Gigabit Switches', '9U Server Rack', 'Structured Cabling'],
    gradient: 'from-emerald-700 via-teal-800 to-slate-900',
  },
  {
    id: 'proj-4',
    title: 'Custom Dual-Chamber Watercooled 3D Architectural Workstation',
    category: 'workstation',
    client: 'Design Associates Architects',
    location: 'Anantapur Road, Ballari',
    date: 'June 2026',
    summary: 'Bespoke high-performance computing workstation engineered specifically for real-time Lumion, 3ds Max, and Revit photorealistic walkthrough rendering.',
    challenge: 'Off-the-shelf commercial computers frequently throttled and crashed during multi-hour high-resolution photorealistic rendering batches.',
    solution: 'Custom engineered an Intel Core i9 system with 64GB DDR5 memory, Nvidia RTX 4080 Super GPU, dual 360mm liquid cooling loops, and ultra-high speed PCIe 4.0 NVMe scratch disks.',
    outcome: 'Rendering render times dropped by 64% while maintaining operating temperatures under 68°C under continuous 24-hour peak rendering load.',
    deliverables: [
      'Intel Core i9 14th Gen + RTX 4080 Super 16GB custom architecture',
      '64GB 6000MHz Low-Latency DDR5 Memory in dual-channel configuration',
      'Dual 2TB NVMe SSDs configured for OS and dedicated render cache',
      '80+ Platinum Certified fully modular power delivery with power surge filter'
    ],
    techStack: ['RTX 4080 Super', 'Intel Core i9', 'PCIe 4.0 NVMe', '64GB DDR5', 'CAD/CAM'],
    gradient: 'from-indigo-700 via-purple-800 to-slate-900',
  },
  {
    id: 'proj-5',
    title: 'Commercial Multi-Floor IT AMC & Surveillance Maintenance SLA',
    category: 'amc',
    client: 'Sri Sai Commercial Agro Logistics & Cold Storage',
    location: 'Cowl Bazaar Industrial Sector, Ballari',
    date: 'Active Contract (Renewed 2026)',
    summary: 'Comprehensive Annual Maintenance Contract managing 28 office workstations, 12 warehouse CCTV points, 3 heavy-duty industrial printers, and billing LAN.',
    challenge: 'Critical operational bottleneck: any billing computer downtime caused immediate supply-chain delays at vehicle loading bays.',
    solution: 'Established preventive monthly hardware audits, cloud backup automation, licensed antivirus management, and a contractual 2-hour emergency technician dispatch.',
    outcome: 'Maintained 99.9% billing uptime across 3 consecutive years with 0 data loss incidents and zero logistics delays.',
    deliverables: [
      'Monthly preventive dust blower cleaning, thermal check, and OS optimization',
      'Automated daily off-site cloud backup of Tally ERP and billing databases',
      'Priority 2-hour on-site breakdown response guarantee across Ballari',
      'Dedicated standby backup PC and printer ready at iCare facility'
    ],
    techStack: ['2-Hour SLA', 'Tally Cloud Backup', 'Quarterly Overhaul', 'Preventive Care'],
    gradient: 'from-rose-700 via-red-800 to-slate-900',
  },
  {
    id: 'proj-6',
    title: 'Zero-Deadzone Commercial Wi-Fi Mesh & Remote Gate Access',
    category: 'networking',
    client: 'Prestige Residential Community Clubhouse & Security Gates',
    location: 'KHB Colony, Ballari',
    date: 'May 2026',
    summary: 'Deploying high-density Wi-Fi 6 mesh routers and outdoor wireless bridges connecting remote entry security booths back to the main server.',
    challenge: 'Distance of over 220 meters between security entry booths with thick concrete compound walls hindering standard Wi-Fi transmission.',
    solution: 'Installed point-to-point 5GHz outdoor wireless directional bridges coupled with Wi-Fi 6 tri-band access points throughout the community clubhouse.',
    outcome: 'Seamless high-speed wireless connectivity allowing real-time visitor gate pass sync and smartphone video intercom streaming without laying expensive road trenches.',
    deliverables: [
      '2x 5GHz Outdoor directional long-range wireless link bridges',
      '3x Ceiling-mounted PoE Wi-Fi 6 enterprise access points',
      'Seamless wireless roaming with unified guest login portal',
      'Outdoor weather-proof IP67 surge-protected junction boxes'
    ],
    techStack: ['Wi-Fi 6 Mesh', 'Point-to-Point Bridge', 'Outdoor IP67', 'PoE Network'],
    gradient: 'from-teal-700 via-emerald-800 to-slate-900',
  }
];

interface ProjectsPortfolioProps {
  onContactProject: (projectTitle: string) => void;
}

export const ProjectsPortfolio: React.FC<ProjectsPortfolioProps> = ({ onContactProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectCaseStudy | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Building2 },
    { id: 'cctv', label: 'Commercial CCTV', icon: Camera },
    { id: 'chiplab', label: 'Chip-Level Lab', icon: Wrench },
    { id: 'networking', label: 'LAN & Infrastructure', icon: Network },
    { id: 'workstation', label: 'Custom Workstations', icon: Cpu },
    { id: 'amc', label: 'Corporate AMC SLA', icon: ShieldCheck },
  ];

  const filteredProjects = CASE_STUDIES.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
              <span>Demonstrated Field Experience</span>
              <span>·</span>
              <span>Ballari Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Projects &amp; Case Studies Portfolio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Real-world engineering implementations across healthcare clinics, educational institutions, industrial warehousing, and demanding professional workstations in Ballari.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium shrink-0">
            <span className="font-bold text-slate-900 text-base">{filteredProjects.length}</span>
            <span>Case Studies Documented</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Header Banner */}
                <div className={`p-5 bg-gradient-to-br ${proj.gradient} text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                    <Building2 className="w-24 h-24" />
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] font-semibold text-sky-200 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-400" />
                      <span>{proj.location}</span>
                    </span>
                    <span className="text-white/80">{proj.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white line-clamp-2">
                    {proj.title}
                  </h3>

                  <div className="mt-3 text-xs text-sky-100/90 font-medium">
                    Client: <span className="text-white font-bold">{proj.client}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {proj.summary}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-1">
                    {proj.deliverables.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Read Technical Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onContactProject(proj.title)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 transition-colors cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white font-heading">
              Have a Similar Commercial or Institutional IT Requirement in Ballari?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              We provide free on-site architectural surveys and upfront technical proposals for clinics, warehouses, schools, and offices.
            </p>
          </div>

          <a
            href={`tel:${STORE_INFO.phone}`}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Call Naga Reddy: {STORE_INFO.formattedPhone}</span>
          </a>
        </div>
      </div>

      {/* Case Study Details Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-br ${activeModalProject.gradient} text-white relative`}>
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 text-xs text-sky-200 mb-2">
                <span>{activeModalProject.location}</span>
                <span>·</span>
                <span>{activeModalProject.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black leading-tight text-white pr-8">
                {activeModalProject.title}
              </h3>

              <div className="mt-3 text-xs text-sky-100">
                Institutional Client: <strong className="text-white">{activeModalProject.client}</strong>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs sm:text-sm text-slate-700">
              {/* Challenge */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-orange-600">
                  Client Technical Challenge
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {activeModalProject.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider text-sky-600">
                  iCare Technical Solution &amp; Engineering
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {activeModalProject.solution}
                </p>
              </div>

              {/* Outcome */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-1">
                <h4 className="font-bold text-emerald-800 uppercase text-[11px] tracking-wider">
                  Verified Outcome &amp; Value Delivered
                </h4>
                <p className="text-emerald-900 leading-relaxed font-medium">
                  {activeModalProject.outcome}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2.5 text-xs uppercase tracking-wider">
                  Key Scope Deliverables
                </h4>
                <div className="space-y-2">
                  {activeModalProject.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">
                  Hardware &amp; Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    onContactProject(activeModalProject.title);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer text-center"
                >
                  Consult Regarding Similar Requirement
                </button>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors text-center"
                >
                  Call Naga Reddy Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
