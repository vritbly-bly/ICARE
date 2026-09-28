import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Check, AlertCircle, Wrench, Cpu, Camera, Headphones, ShoppingCart, Network, Shield, HardDrive, Zap, Database, Edit3, Star, Sparkles, Loader2, Link } from 'lucide-react';
import { ServicePillar } from '../types';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveService: (service: ServicePillar) => void;
  serviceToEdit?: ServicePillar | null;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSaveService,
  serviceToEdit = null,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceEstimate, setPriceEstimate] = useState('');
  const [selectedColor, setSelectedColor] = useState('from-sky-500 to-blue-600');
  const [selectedIcon, setSelectedIcon] = useState('Wrench');
  const [features, setFeatures] = useState<string[]>([
    'Same-day diagnostics with transparent quotation',
    'Original spare parts with 90-day replacement warranty',
  ]);
  const [newFeatureText, setNewFeatureText] = useState('');
  
  // Link auto-fill state
  const [autofillUrl, setAutofillUrl] = useState('');
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [autofillSuccess, setAutofillSuccess] = useState<string | null>(null);

  // Multi-image state
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (serviceToEdit) {
        setTitle(serviceToEdit.title);
        setSubtitle(serviceToEdit.subtitle || '');
        setDescription(serviceToEdit.description || '');
        setPriceEstimate(serviceToEdit.priceEstimate || '');
        setSelectedColor(serviceToEdit.color || 'from-sky-500 to-blue-600');
        setSelectedIcon(serviceToEdit.icon || 'Wrench');
        setFeatures(serviceToEdit.features && serviceToEdit.features.length > 0 ? [...serviceToEdit.features] : ['Quality assurance']);
        
        // Multi-image population
        const existingImages = serviceToEdit.images && serviceToEdit.images.length > 0
          ? [...serviceToEdit.images]
          : (serviceToEdit.imageUrl ? [serviceToEdit.imageUrl] : []);
        setImages(existingImages);
        setUrlInput('');
      } else {
        setTitle('');
        setSubtitle('');
        setDescription('');
        setPriceEstimate('');
        setSelectedColor('from-sky-500 to-blue-600');
        setSelectedIcon('Wrench');
        setFeatures([
          'Same-day diagnostics with transparent quotation',
          'Original spare parts with 90-day replacement warranty',
        ]);
        setImages([]);
        setUrlInput('');
        setImageMode('upload');
      }
      setError(null);
    }
  }, [isOpen, serviceToEdit]);

  if (!isOpen) return null;

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    const newImages: string[] = [];
    let processedCount = 0;
    const totalFiles = files.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      if (file.size > 8 * 1024 * 1024) {
        setError(`File "${file.name}" exceeds 8MB limit.`);
        continue;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
        }
        processedCount++;
        if (processedCount === totalFiles) {
          setImages((prev) => [...prev, ...newImages]);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoFillFromUrl = async () => {
    if (!autofillUrl.trim()) {
      setError('Please enter a service link or JSON URL to auto-fill.');
      return;
    }
    setError(null);
    setAutofillSuccess(null);
    setIsAutofilling(true);

    try {
      const trimmed = autofillUrl.trim();
      let response: Response;
      try {
        response = await fetch(trimmed, {
          headers: { Accept: 'application/json, text/html, */*' },
        });
      } catch {
        const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(trimmed)}`;
        response = await fetch(proxy);
      }

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const text = await response.text();

      try {
        const parsed = JSON.parse(text);
        const item = Array.isArray(parsed) ? parsed[0] : (parsed.services ? parsed.services[0] : parsed);
        if (item) {
          if (item.title || item.name) setTitle(item.title || item.name);
          if (item.subtitle) setSubtitle(item.subtitle);
          if (item.description) setDescription(item.description);
          if (item.priceEstimate) setPriceEstimate(item.priceEstimate);
          if (item.color) setSelectedColor(item.color);
          if (item.icon) setSelectedIcon(item.icon);

          let newImgs: string[] = [];
          if (Array.isArray(item.images)) newImgs = item.images.filter(Boolean);
          else if (item.imageUrl) newImgs = [item.imageUrl];

          if (newImgs.length > 0) setImages((prev) => [...prev, ...newImgs]);
          if (Array.isArray(item.features) && item.features.length > 0) {
            setFeatures(item.features);
          }

          setAutofillSuccess('Service information and photos auto-filled!');
          return;
        }
      } catch {
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || doc.title;
        const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
        const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content');

        if (ogTitle) setTitle(ogTitle.split('|')[0].trim());
        if (ogDesc) setDescription(ogDesc);
        if (ogImage) setImages((prev) => [...prev, ogImage]);

        if (ogTitle || ogImage) {
          setAutofillSuccess(`Auto-filled service details from web page!`);
        } else {
          throw new Error('Could not auto-extract service info from link.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to auto-fill service details from link.');
    } finally {
      setIsAutofilling(false);
    }
  };

  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return;
    try {
      new URL(urlInput.trim());
      setImages((prev) => [...prev, urlInput.trim()]);
      setUrlInput('');
      setError(null);
    } catch {
      setError('Please enter a valid image web URL (e.g., https://example.com/repair-lab.jpg)');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSetPrimaryImage = (indexToPrimary: number) => {
    setImages((prev) => {
      const target = prev[indexToPrimary];
      const rest = prev.filter((_, i) => i !== indexToPrimary);
      return [target, ...rest];
    });
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFeatures([...features, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide a service title.');
      return;
    }

    const cleanImages = images.filter(Boolean);
    const primaryImage = cleanImages[0] || (serviceToEdit?.imageUrl || undefined);

    const finalService: ServicePillar = {
      id: serviceToEdit ? serviceToEdit.id : `service-${Date.now()}`,
      title: title.trim().toUpperCase(),
      subtitle: subtitle.trim() || 'Expert Support · Reliable Service',
      description: description.trim() || `${title} performed by certified hardware technicians with on-site support in Ballari.`,
      color: selectedColor,
      icon: selectedIcon,
      features: features.length > 0 ? features : ['Certified on-site technician', 'Transparent upfront estimate'],
      priceEstimate: priceEstimate.trim() || 'Estimates upon inspection',
      imageUrl: primaryImage,
      images: cleanImages,
    };

    onSaveService(finalService);
    onClose();
  };

  const colorOptions = [
    { label: 'Blue', value: 'from-sky-500 to-blue-600' },
    { label: 'Orange', value: 'from-amber-500 to-orange-600' },
    { label: 'Emerald', value: 'from-emerald-500 to-teal-600' },
    { label: 'Purple', value: 'from-purple-500 to-indigo-600' },
    { label: 'Rose', value: 'from-rose-500 to-red-600' },
    { label: 'Slate', value: 'from-slate-700 to-zinc-900' },
  ];

  const iconOptions = [
    { label: 'Wrench', icon: Wrench },
    { label: 'Cpu', icon: Cpu },
    { label: 'Camera', icon: Camera },
    { label: 'Headphones', icon: Headphones },
    { label: 'ShoppingCart', icon: ShoppingCart },
    { label: 'Network', icon: Network },
    { label: 'HardDrive', icon: HardDrive },
    { label: 'Shield', icon: Shield },
    { label: 'Zap', icon: Zap },
    { label: 'Database', icon: Database },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            {serviceToEdit ? (
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <Edit3 className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                <Plus className="w-4 h-4" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                {serviceToEdit ? 'Edit Service Offering' : 'Add New Service Pillar'}
              </h2>
              <p className="text-xs text-slate-500">
                {serviceToEdit ? `Updating service details for ${serviceToEdit.title}` : 'Upload 4:3 fit photos of repair lab, tools or parts, and publish to services'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {autofillSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{autofillSuccess}</span>
            </div>
          )}

          {/* Quick Auto-Fill via Link */}
          <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50/60 rounded-2xl border border-sky-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Auto-Fill from Service Link or URL</span>
              </div>
              <span className="text-[10px] text-sky-700 font-semibold bg-sky-200/60 px-2 py-0.5 rounded-full">
                Fast Setup
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Paste a URL to auto-populate service details, diagnostic pricing, features, and lab photos.
            </p>
            <div className="flex gap-2 pt-1">
              <input
                type="url"
                value={autofillUrl}
                onChange={(e) => setAutofillUrl(e.target.value)}
                placeholder="https://example.com/service-page or JSON URL..."
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-sky-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
              <button
                type="button"
                onClick={handleAutoFillFromUrl}
                disabled={isAutofilling}
                className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-2xs"
              >
                {isAutofilling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Auto-filling...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Fill Info</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Multiple Service Images Section (4:3 Size, Fit to Frame, Add/Edit/Delete) */}
          <div className="space-y-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Service Photos (4:3 Frame Fit)
                  </span>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    {images.length} {images.length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Images display full size fit to frame. Add photos of repair work, chip-level lab, or equipment.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    imageMode === 'upload' ? 'bg-sky-600 font-semibold text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Upload Files
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    imageMode === 'url' ? 'bg-sky-600 font-semibold text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Add Web URL
                </button>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={handleImageFilesChange}
              className="hidden"
            />

            {imageMode === 'url' && (
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/repair-lab.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  Add Photo
                </button>
              </div>
            )}

            {/* Service Images Gallery Grid - 4:3 Fit to Frame */}
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-200 hover:border-sky-400 bg-white flex items-center justify-center p-1.5 shadow-2xs group transition-all"
                  >
                    <img
                      src={img}
                      alt={`Service photo ${idx + 1}`}
                      className="w-full h-full object-contain select-none"
                    />

                    {/* Primary Badge */}
                    {idx === 0 ? (
                      <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 z-10">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryImage(idx)}
                        className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 bg-slate-900/80 hover:bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs transition-opacity cursor-pointer z-10"
                        title="Set as primary banner"
                      >
                        Set Cover
                      </button>
                    )}

                    {/* Delete Photo Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-xs opacity-90 hover:opacity-100 transition-all cursor-pointer z-10"
                      title="Delete this photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    <div className="absolute bottom-1 right-1.5 text-[9px] font-mono text-slate-400 bg-white/80 px-1 rounded">
                      {idx + 1}/{images.length}
                    </div>
                  </div>
                ))}

                {/* Add More Photos in 4:3 Frame */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-[4/3] border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-xl p-2 text-center cursor-pointer transition-colors bg-sky-50/50 hover:bg-sky-50 flex flex-col items-center justify-center text-sky-700 group"
                >
                  <Plus className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-[11px] font-bold leading-tight">Add More</span>
                  <span className="text-[9px] text-sky-500 font-medium">Select Files</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white hover:bg-sky-50/30 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Click to select multiple service photos
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Supports multiple files · 4:3 shape · Fit to frame · PNG, JPG, WEBP up to 8MB
                </p>
              </div>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Service Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DATA RECOVERY, PRINTER AMC"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 uppercase"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. Fast &amp; Confidential Recovery"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          {/* Pricing & Theme Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Price Estimate
              </label>
              <input
                type="text"
                placeholder="e.g. Starts at ₹650 or ₹2,999/yr"
                value={priceEstimate}
                onChange={(e) => setPriceEstimate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Theme Color
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
              >
                {colorOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label} Theme
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-2">
              Select Pillar Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map((item) => {
                const IconComp = item.icon;
                const isSelected = selectedIcon === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedIcon(item.label)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <IconComp className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium truncate w-full">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Service Description
            </label>
            <textarea
              rows={2}
              placeholder="Explain the service procedures, technical diagnostics, equipment used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
            />
          </div>

          {/* Service Feature Bullets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Service Key Features &amp; Highlights
              </label>
              <span className="text-[11px] text-slate-400">
                Shown as bullet points on card
              </span>
            </div>

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. Free collection &amp; delivery in Ballari"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Add Bullet
              </button>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded-lg cursor-pointer"
                    title="Remove feature"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-sm shadow-sky-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{serviceToEdit ? 'Save Changes' : 'Publish Service'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
