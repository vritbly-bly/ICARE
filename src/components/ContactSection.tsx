import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'laptop_repair',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Simulate sending inquiry
    setFormSubmitted(true);
    setTimeout(() => {
      // open WhatsApp with formatted message
      const text = encodeURIComponent(
        `Hello Venkata Reddy sir,\nNew inquiry from website:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Service: ${formData.serviceType}\n• Message: ${formData.message}`
      );
      window.open(`https://wa.me/91${STORE_INFO.phone}?text=${text}`, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="py-14 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Store Details & Google Map Pin */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1.5">
                <span>Visit Our Showroom &amp; Service Lab</span>
                <span>·</span>
                <span>Ballari Center</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
                Store Location &amp; Contact Details
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Conveniently located beside UCO Bank, right opposite the historic Kumaraswamy Temple in Ballari. Walk in for same-day laptop diagnoses, CCTV demos, or custom PC consultations.
              </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-bold">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Physical Address</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {STORE_INFO.address}
                </p>
                <div className="pt-1">
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:text-sky-800 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-bold">
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Proprietor &amp; Support</span>
                </div>
                <div className="text-slate-900 font-bold text-sm">
                  {STORE_INFO.proprietor}
                </div>
                <div className="text-slate-700 font-mono text-xs font-medium">
                  {STORE_INFO.formattedPhone}
                </div>
                <div className="pt-1">
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Call Shop Directly</span>
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-bold">
                  <Mail className="w-4 h-4 text-sky-600" />
                  <span>Official Email &amp; Web</span>
                </div>
                <div className="text-slate-700 truncate">{STORE_INFO.email}</div>
                <div className="text-slate-700 font-medium">{STORE_INFO.website}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-600 font-bold">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Working Hours</span>
                </div>
                <div className="text-slate-700 font-medium">{STORE_INFO.hoursWeekdays}</div>
                <div className="text-slate-500">{STORE_INFO.hoursSunday}</div>
              </div>
            </div>

            {/* Map Visual Container */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Ballari Store Location Reference
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Beside UCO Bank, Opp Kumaraswamy Temple
                  </p>
                </div>
              </div>

              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <span>Open Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Callback & Custom Build Request Form */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Request a Callback or Custom PC Quote
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your requirement. Venkata Reddy or a certified engineer will get back to you within 30 minutes.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-white rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Inquiry Sent Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  We have forwarded your details to Venkata Reddy at iCare Computers. You can also chat immediately on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/91${STORE_INFO.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open WhatsApp Directly</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9845012345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Service / Product Required
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  >
                    <option value="laptop_repair">Laptop Repair / Screen / Motherboard</option>
                    <option value="custom_pc">Custom Gaming PC / Workstation Build</option>
                    <option value="cctv_quote">CCTV Camera Installation (Home/Office)</option>
                    <option value="ssd_upgrade">SSD / RAM Speed Boost Upgrade</option>
                    <option value="printer_service">Printer Service / Ink / Toner</option>
                    <option value="amc_quote">Corporate / School AMC Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Details / Device Model / Issue Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your device model, budget, or problem..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry to Venkata Reddy</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
