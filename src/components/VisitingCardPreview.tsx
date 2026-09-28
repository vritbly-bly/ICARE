import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Globe, Check, Copy, ExternalLink, RotateCw, QrCode, Shield, CheckCircle } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import { getBrandEcosystem } from '../utils/brandManager';
import { BrandLogo } from './BrandLogo';
import { OfficialBrandLogo } from './OfficialBrandLogo';

export const VisitingCardPreview: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [ecosystem, setEcosystem] = useState(getBrandEcosystem);

  useEffect(() => {
    const handleUpdate = () => setEcosystem(getBrandEcosystem());
    window.addEventListener('icare_brand_logos_updated', handleUpdate);
    return () => window.removeEventListener('icare_brand_logos_updated', handleUpdate);
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="visiting-card" className="py-12 bg-gradient-to-b from-slate-100/80 to-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1.5">
              <span>Verified Store Identity</span>
              <span>·</span>
              <span>Ballari, Karnataka</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Official Business Card &amp; Credentials
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Inspect our verified physical business card details, contact proprietor Venkata Reddy, or save credentials directly to your mobile phone.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-sky-600" />
              <span>Flip Card ({isFlipped ? 'Show Front' : 'Show Back / Services'})</span>
            </button>

            <a
              href={`https://wa.me/91${STORE_INFO.phone}?text=Hello%20Venkata%20Reddy%20sir,%20I%20saw%20your%20iCare%20Computers%20business%20card.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
            >
              <span>WhatsApp Store</span>
            </a>
          </div>
        </div>

        {/* Realistic Card Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Card Visual with Flip Animation */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="w-full max-w-2xl perspective-1000">
              <div
                className={`relative transition-all duration-700 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* FRONT SIDE OF THE CARD */}
                <div
                  className={`w-full rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden text-slate-900 ${
                    isFlipped ? 'invisible pointer-events-none' : 'visible'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Top Bar with Logo & Slogan */}
                  <div className="p-6 sm:p-8 bg-gradient-to-r from-sky-50 via-white to-blue-50 border-b border-slate-100 relative overflow-hidden">
                    {/* Subtle water-wave background accent */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-400/10 to-orange-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                    <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Logo and Tagline matching uploaded image */}
                      <div className="flex items-center gap-4">
                        <BrandLogo variant="compact" size="lg" />
                      </div>

                      {/* Right Slogan */}
                      <div className="text-right sm:max-w-[200px]">
                        <p className="font-heading italic text-sky-800 text-sm font-semibold leading-snug">
                          &ldquo;Your Trusted IT Partner for a Smarter Tomorrow&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Contact & Proprietor Section */}
                    <div className="mt-6 pt-5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-slate-500 text-xs font-medium uppercase tracking-wider">Proprietor</div>
                        <div className="text-lg font-bold text-slate-900 mt-0.5">{STORE_INFO.proprietor}</div>
                        
                        <div className="mt-3 space-y-2 text-xs text-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                              <Phone className="w-3 h-3" />
                            </span>
                            <span className="font-semibold text-slate-900">{STORE_INFO.phone}</span>
                            <button
                              onClick={() => handleCopy(STORE_INFO.phone, 'phone')}
                              className="text-[11px] text-sky-600 hover:underline flex items-center gap-0.5 ml-1"
                              title="Copy Phone"
                            >
                              {copied === 'phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                              <Mail className="w-3 h-3" />
                            </span>
                            <span className="truncate">{STORE_INFO.email}</span>
                            <button
                              onClick={() => handleCopy(STORE_INFO.email, 'email')}
                              className="text-[11px] text-sky-600 hover:underline flex items-center gap-0.5 ml-1 shrink-0"
                              title="Copy Email"
                            >
                              {copied === 'email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div className="flex items-start gap-2">
                            <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                              <MapPin className="w-3 h-3" />
                            </span>
                            <span className="leading-relaxed">
                              #Opp Kumaraswamy Temple, Beside UCO Bank, Ballari, Karnataka 583104
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                              <Globe className="w-3 h-3" />
                            </span>
                            <span className="font-medium text-sky-700">{STORE_INFO.website}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Strip: Product Line */}
                  <div className="bg-sky-700 text-white px-6 py-3 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase overflow-x-auto gap-3">
                    <span>LAPTOPS</span>
                    <span className="text-orange-400">|</span>
                    <span>DESKTOPS</span>
                    <span className="text-orange-400">|</span>
                    <span>PRINTERS</span>
                    <span className="text-orange-400">|</span>
                    <span>CCTV</span>
                    <span className="text-orange-400">|</span>
                    <span>ACCESSORIES</span>
                    <span className="text-orange-400">|</span>
                    <span>AMC</span>
                  </div>
                </div>

                {/* BACK SIDE OF THE CARD */}
                <div
                  className={`w-full rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden text-slate-900 ${
                    !isFlipped ? 'invisible pointer-events-none absolute inset-0' : 'visible'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Top Bar with Slogan */}
                  <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 text-white px-6 py-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-orange-400 tracking-wide uppercase">Technology for a Better Tomorrow</span>
                    </div>
                    <div className="text-xs text-sky-200 font-medium">iCare Computers Ballari</div>
                  </div>

                  {/* 6 Core Services Icons as displayed on card */}
                  <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50/70 border-b border-slate-200">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <div className="w-7 h-7 mx-auto rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">🛒</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">SALES</div>
                      <div className="text-[10px] text-slate-500">Wide Range · Best Prices</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <div className="w-7 h-7 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">🔧</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">SERVICE</div>
                      <div className="text-[10px] text-slate-500">Expert Support · Reliable</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">⚙️</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">UPGRADES</div>
                      <div className="text-[10px] text-slate-500">SSD &amp; RAM · Longer Life</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <div className="w-7 h-7 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">🌐</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">NETWORKING</div>
                      <div className="text-[10px] text-slate-500">Wi-Fi &amp; LAN Solutions</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <div className="w-7 h-7 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">📹</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">CCTV SOLUTIONS</div>
                      <div className="text-[10px] text-slate-500">Secure Today &amp; Tomorrow</div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <div className="w-7 h-7 mx-auto rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">🎧</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">AMC &amp; SUPPORT</div>
                      <div className="text-[10px] text-slate-500">Always Here for You</div>
                    </div>
                  </div>

                  {/* Brand Groups */}
                  <div className="p-4 sm:p-5 space-y-3 text-xs">
                    <div>
                      <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-600" />
                        <span>LAPTOP BRANDS</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-700">
                        {ecosystem.laptops?.map(b => (
                          <span key={b.name} className="px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg shadow-2xs flex items-center justify-center h-8">
                            <OfficialBrandLogo name={b.name} size="sm" />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>PRINTER BRANDS</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-700">
                        {ecosystem.printers?.map(b => (
                          <span key={b.name} className="px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg shadow-2xs flex items-center justify-center h-8">
                            <OfficialBrandLogo name={b.name} size="sm" />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                        <span>CCTV BRANDS</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-700">
                        {ecosystem.cctv?.map(b => (
                          <span key={b.name} className="px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg shadow-2xs flex items-center justify-center h-8">
                            <OfficialBrandLogo name={b.name} size="sm" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Back Bottom Bar */}
                  <div className="bg-slate-900 text-slate-200 px-6 py-2.5 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase">
                    <span className="text-orange-400">BUY | SERVICE | SUPPORT | GROW TOGETHER</span>
                    <span>BALLARI 583104</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Store Info Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wide">
              <CheckCircle className="w-4 h-4" />
              <span>Certified Local Retailer</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Need direct assistance from Venkata Reddy?
            </h3>

            <p className="text-slate-600 text-xs leading-relaxed">
              We provide prompt sales, chip-level diagnostics, CCTV setup, and custom desktop builds right in Ballari. Walk in or connect directly.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex items-center justify-between w-full p-3 bg-slate-50 hover:bg-sky-50 border border-slate-200 rounded-xl transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Phone Support</div>
                    <div className="text-xs font-bold text-slate-900">{STORE_INFO.formattedPhone}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-sky-600">Call Now</span>
              </a>

              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-3 bg-slate-50 hover:bg-sky-50 border border-slate-200 rounded-xl transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Store Location</div>
                    <div className="text-xs font-bold text-slate-900">Beside UCO Bank</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-sky-600 flex items-center gap-0.5">
                  Directions <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Working Hours:</span>
              <span className="font-semibold text-slate-800">9:30 AM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
