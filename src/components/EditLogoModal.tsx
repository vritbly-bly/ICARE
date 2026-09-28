import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  RotateCcw, 
  Check, 
  Image as ImageIcon, 
  AlertCircle, 
  Sparkles, 
  Plus, 
  Trash2, 
  Eye, 
  Sliders,
  Laptop,
  Printer,
  Camera,
  Layers
} from 'lucide-react';
import { BrandEcosystem } from '../types';
import { 
  getBrandEcosystem, 
  saveBrandEcosystem, 
  addBrandToEcosystem, 
  deleteBrandFromEcosystem, 
  saveCustomBrandLogo, 
  getCustomBrandLogosMap, 
  resetBrandEcosystemToDefault 
} from '../utils/brandManager';
import { BrandLogo } from './BrandLogo';
import { OfficialBrandLogo } from './OfficialBrandLogo';

interface EditLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'store' | 'brands';
  initialBrandName?: string;
  initialCategory?: 'laptops' | 'printers' | 'cctv';
  onStoreLogoChange?: (logoUrl: string | null) => void;
  onBrandLogoChange?: (brandName: string, logoUrl: string | null) => void;
}

export const EditLogoModal: React.FC<EditLogoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'store',
  initialBrandName,
  initialCategory = 'laptops',
  onStoreLogoChange,
  onBrandLogoChange,
}) => {
  const [activeTab, setActiveTab] = useState<'store' | 'brands'>(initialTab);
  
  // Store Logo State
  const [storeLogoUrl, setStoreLogoUrl] = useState<string | null>(null);
  const [storeUrlInput, setStoreUrlInput] = useState('');
  const [storePreviewMode, setStorePreviewMode] = useState<'light' | 'dark'>('light');

  // Brand Partner Logos State
  const [ecosystem, setEcosystem] = useState<BrandEcosystem>(getBrandEcosystem);
  const [selectedCategory, setSelectedCategory] = useState<'laptops' | 'printers' | 'cctv'>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('HP');
  const [brandLogoUrl, setBrandLogoUrl] = useState<string | null>(null);
  const [brandUrlInput, setBrandUrlInput] = useState('');
  const [customBrandLogosMap, setCustomBrandLogosMap] = useState<Record<string, string>>({});
  
  // Add new brand state
  const [isAddingNewBrand, setIsAddingNewBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandCategory, setNewBrandCategory] = useState<'laptops' | 'printers' | 'cctv'>(initialCategory);
  const [newBrandLogoUrl, setNewBrandLogoUrl] = useState<string | null>(null);
  const [newBrandUrlInput, setNewBrandUrlInput] = useState('');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const storeFileInputRef = useRef<HTMLInputElement>(null);
  const brandFileInputRef = useRef<HTMLInputElement>(null);
  const newBrandFileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount & when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      const currentEco = getBrandEcosystem();
      setEcosystem(currentEco);

      if (initialCategory) {
        setSelectedCategory(initialCategory);
        setNewBrandCategory(initialCategory);
      }

      const logosMap = getCustomBrandLogosMap();
      setCustomBrandLogosMap(logosMap);

      const targetList = currentEco[initialCategory || 'laptops'] || [];
      const defaultName = initialBrandName || (targetList[0]?.name ?? 'HP');
      setSelectedBrand(defaultName);

      if (defaultName && logosMap[defaultName.toLowerCase().trim()]) {
        setBrandLogoUrl(logosMap[defaultName.toLowerCase().trim()]);
      } else {
        setBrandLogoUrl(null);
      }

      try {
        const savedStoreLogo = localStorage.getItem('icare_custom_store_logo');
        if (savedStoreLogo) setStoreLogoUrl(savedStoreLogo);
      } catch (e) {
        console.error('Error loading saved store logo:', e);
      }
      setMessage(null);
    }
  }, [isOpen, initialTab, initialBrandName, initialCategory]);

  // When selectedBrand changes, update brandLogoUrl
  useEffect(() => {
    const key = selectedBrand.toLowerCase().trim();
    if (customBrandLogosMap[key]) {
      setBrandLogoUrl(customBrandLogosMap[key]);
    } else {
      setBrandLogoUrl(null);
    }
    setBrandUrlInput('');
  }, [selectedBrand, customBrandLogosMap]);

  if (!isOpen) return null;

  // ---------------------------------------------------------------------
  // Store Logo Handlers
  // ---------------------------------------------------------------------
  const handleStoreFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 6 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image file size should be less than 6MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const resultStr = reader.result as string;
        setStoreLogoUrl(resultStr);
        setMessage({ type: 'success', text: 'Logo loaded! Click "Apply Store Logo" to save.' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyStoreUrl = () => {
    if (!storeUrlInput.trim()) return;
    try {
      new URL(storeUrlInput.trim());
      setStoreLogoUrl(storeUrlInput.trim());
      setStoreUrlInput('');
      setMessage({ type: 'success', text: 'Web logo loaded! Click "Apply Store Logo" to save.' });
    } catch {
      setMessage({ type: 'error', text: 'Please enter a valid web image URL (https://...).' });
    }
  };

  const handleSaveStoreLogo = () => {
    try {
      if (storeLogoUrl) {
        localStorage.setItem('icare_custom_store_logo', storeLogoUrl);
      } else {
        localStorage.removeItem('icare_custom_store_logo');
      }
      if (onStoreLogoChange) {
        onStoreLogoChange(storeLogoUrl);
      }
      window.dispatchEvent(new Event('icare_logo_updated'));
      setMessage({ type: 'success', text: 'Store logo saved & updated across the entire site!' });
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (e) {
      setMessage({ type: 'error', text: 'Could not save to localStorage. Image might be too large.' });
    }
  };

  const handleDeleteStoreLogo = () => {
    if (window.confirm('Delete custom store logo and restore the default official iCare emblem?')) {
      setStoreLogoUrl(null);
      setStoreUrlInput('');
      localStorage.removeItem('icare_custom_store_logo');
      if (onStoreLogoChange) onStoreLogoChange(null);
      window.dispatchEvent(new Event('icare_logo_updated'));
      setMessage({ type: 'success', text: 'Custom store logo deleted. Official default iCare Computers emblem active.' });
    }
  };

  // ---------------------------------------------------------------------
  // Brand Logo Handlers
  // ---------------------------------------------------------------------
  const handleBrandFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 6 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Brand logo image must be less than 6MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const resultStr = reader.result as string;
        setBrandLogoUrl(resultStr);
        setMessage({ type: 'success', text: `Loaded new logo for ${selectedBrand}! Click "Save Brand Logo".` });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyBrandUrl = () => {
    if (!brandUrlInput.trim()) return;
    try {
      new URL(brandUrlInput.trim());
      setBrandLogoUrl(brandUrlInput.trim());
      setBrandUrlInput('');
      setMessage({ type: 'success', text: `Loaded web logo for ${selectedBrand}! Click "Save Brand Logo".` });
    } catch {
      setMessage({ type: 'error', text: 'Please enter a valid web image URL.' });
    }
  };

  const handleSaveBrandLogo = () => {
    try {
      saveCustomBrandLogo(selectedBrand, brandLogoUrl);
      const updatedMap = getCustomBrandLogosMap();
      setCustomBrandLogosMap(updatedMap);

      if (onBrandLogoChange) {
        onBrandLogoChange(selectedBrand, brandLogoUrl);
      }
      setMessage({ type: 'success', text: `Logo for ${selectedBrand} saved and updated live!` });
    } catch (e) {
      setMessage({ type: 'error', text: 'Could not save brand logo. File may be too large.' });
    }
  };

  const handleResetCurrentBrandLogo = () => {
    saveCustomBrandLogo(selectedBrand, null);
    setBrandLogoUrl(null);
    setBrandUrlInput('');
    setCustomBrandLogosMap(getCustomBrandLogosMap());
    if (onBrandLogoChange) onBrandLogoChange(selectedBrand, null);
    setMessage({ type: 'success', text: `Reset ${selectedBrand} to official vector brand logo.` });
  };

  // ---------------------------------------------------------------------
  // Add Brand Option
  // ---------------------------------------------------------------------
  const handleNewBrandFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 6 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Brand logo image must be less than 6MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setNewBrandLogoUrl(reader.result as string);
        setMessage({ type: 'success', text: 'Logo image loaded for new brand.' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyNewBrandUrl = () => {
    if (!newBrandUrlInput.trim()) return;
    try {
      new URL(newBrandUrlInput.trim());
      setNewBrandLogoUrl(newBrandUrlInput.trim());
      setNewBrandUrlInput('');
      setMessage({ type: 'success', text: 'Web logo loaded for new brand.' });
    } catch {
      setMessage({ type: 'error', text: 'Please enter a valid web image URL.' });
    }
  };

  const handleAddNewBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a brand name.' });
      return;
    }

    const updatedEco = addBrandToEcosystem(newBrandCategory, newBrandName.trim(), newBrandLogoUrl || undefined);
    setEcosystem(updatedEco);
    setCustomBrandLogosMap(getCustomBrandLogosMap());
    setSelectedCategory(newBrandCategory);
    setSelectedBrand(newBrandName.trim());
    setIsAddingNewBrand(false);
    setNewBrandName('');
    setNewBrandLogoUrl(null);
    setMessage({ type: 'success', text: `Added new brand "${newBrandName.trim()}" to ${newBrandCategory}!` });
  };

  // ---------------------------------------------------------------------
  // Delete Brand Option
  // ---------------------------------------------------------------------
  const handleDeleteBrand = (category: 'laptops' | 'printers' | 'cctv', brandName: string) => {
    if (window.confirm(`Are you sure you want to delete "${brandName}" from ${category}?`)) {
      const updatedEco = deleteBrandFromEcosystem(category, brandName);
      setEcosystem(updatedEco);
      setCustomBrandLogosMap(getCustomBrandLogosMap());

      // If deleted was active, choose next available
      const remaining = updatedEco[category] || [];
      if (remaining.length > 0) {
        setSelectedBrand(remaining[0].name);
      } else {
        setSelectedBrand('');
      }

      setMessage({ type: 'success', text: `Deleted "${brandName}" from ${category}.` });
    }
  };

  const handleResetAllBrandLogos = () => {
    if (window.confirm('Reset ALL brand partner logos back to their default official vector logos and restore default brand lists?')) {
      const defaultEco = resetBrandEcosystemToDefault();
      setEcosystem(defaultEco);
      setCustomBrandLogosMap({});
      setBrandLogoUrl(null);
      setMessage({ type: 'success', text: 'All brand partner logos restored to official factory defaults.' });
    }
  };

  const currentBrandsList = ecosystem[selectedCategory] || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Logo Manager (Add, Edit &amp; Delete)
              </h2>
              <p className="text-xs text-slate-500">
                Upload, add new brand partners, edit logos, or delete existing logos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-white flex gap-2">
          <button
            onClick={() => { setActiveTab('store'); setMessage(null); }}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'store'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Store Brand Logo (iCare)</span>
          </button>

          <button
            onClick={() => { setActiveTab('brands'); setMessage(null); }}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'brands'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Brand Partner Logos</span>
          </button>
        </div>

        {/* Alert Notification */}
        {message && (
          <div className={`mx-6 mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* ========================================================= */}
          {/* TAB 1: STORE LOGO (iCare Computers)                       */}
          {/* ========================================================= */}
          {activeTab === 'store' && (
            <div className="space-y-6">
              {/* Live Preview Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Live Logo Preview
                  </label>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
                    <button
                      type="button"
                      onClick={() => setStorePreviewMode('light')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        storePreviewMode === 'light' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Light BG
                    </button>
                    <button
                      type="button"
                      onClick={() => setStorePreviewMode('dark')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        storePreviewMode === 'dark' ? 'bg-slate-900 font-bold text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Dark BG
                    </button>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl border flex flex-col items-center justify-center transition-colors min-h-[160px] ${
                  storePreviewMode === 'light'
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-950 border-slate-800'
                }`}>
                  {storeLogoUrl ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={storeLogoUrl}
                        alt="Custom Store Logo"
                        className="max-h-24 max-w-[280px] object-contain drop-shadow-md"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Custom Logo Active
                        </span>
                        <button
                          type="button"
                          onClick={handleDeleteStoreLogo}
                          className="text-[11px] font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-md border border-red-200 flex items-center gap-1 cursor-pointer"
                          title="Delete custom logo"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete Custom Logo</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <BrandLogo
                        variant="full"
                        size="lg"
                        inverted={storePreviewMode === 'dark'}
                      />
                      <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                        Official iCare Computers Logo
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Options */}
              <div className="space-y-4">
                <input
                  type="file"
                  ref={storeFileInputRef}
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleStoreFileChange}
                  className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Upload Box */}
                  <div
                    onClick={() => storeFileInputRef.current?.click()}
                    className="p-5 border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-2xl bg-sky-50/40 hover:bg-sky-50 transition-colors text-center cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="w-11 h-11 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      Upload Logo from Device
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      PNG, SVG, JPG, WEBP (Transparent PNG recommended)
                    </p>
                  </div>

                  {/* Web URL Box */}
                  <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/60 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 mb-1">
                        Or Enter Web Image URL
                      </div>
                      <input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        value={storeUrlInput}
                        onChange={(e) => setStoreUrlInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyStoreUrl}
                      className="mt-3 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer self-start"
                    >
                      Load from URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleDeleteStoreLogo}
                  className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Custom Logo &amp; Reset</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveStoreLogo}
                    className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-sm shadow-sky-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Store Logo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: BRAND PARTNER LOGOS (ADD, EDIT, DELETE)            */}
          {/* ========================================================= */}
          {activeTab === 'brands' && (
            <div className="space-y-6">
              {/* Category Filter Pills & Add Button */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('laptops');
                      setIsAddingNewBrand(false);
                      const list = ecosystem.laptops;
                      if (list.length > 0) setSelectedBrand(list[0].name);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === 'laptops'
                        ? 'bg-white text-sky-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Laptop Brands ({ecosystem.laptops?.length || 0})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('printers');
                      setIsAddingNewBrand(false);
                      const list = ecosystem.printers;
                      if (list.length > 0) setSelectedBrand(list[0].name);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === 'printers'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Printer Brands ({ecosystem.printers?.length || 0})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('cctv');
                      setIsAddingNewBrand(false);
                      const list = ecosystem.cctv;
                      if (list.length > 0) setSelectedBrand(list[0].name);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === 'cctv'
                        ? 'bg-white text-rose-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>CCTV Brands ({ecosystem.cctv?.length || 0})</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNewBrand(true);
                      setNewBrandCategory(selectedCategory);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Brand Logo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetAllBrandLogos}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer p-1"
                    title="Reset all partner brand logos and brand lists to defaults"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All</span>
                  </button>
                </div>
              </div>

              {/* SECTION: ADD NEW BRAND (When isAddingNewBrand === true) */}
              {isAddingNewBrand ? (
                <form 
                  onSubmit={handleAddNewBrandSubmit}
                  className="p-5 bg-sky-50/70 rounded-2xl border border-sky-200 space-y-4 animate-in fade-in"
                >
                  <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4 text-sky-600" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900">
                        Add New Brand Partner to {selectedCategory.toUpperCase()}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewBrand(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acer Predator, LG, Sony, Crucial..."
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Category *
                      </label>
                      <select
                        value={newBrandCategory}
                        onChange={(e) => setNewBrandCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
                      >
                        <option value="laptops">Laptop Brands</option>
                        <option value="printers">Printer Brands</option>
                        <option value="cctv">CCTV Security Brands</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Upload for New Brand */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Brand Logo (Optional - will show clean typography badge if empty)
                    </label>

                    <input
                      type="file"
                      ref={newBrandFileInputRef}
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleNewBrandFileChange}
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <button
                        type="button"
                        onClick={() => newBrandFileInputRef.current?.click()}
                        className="py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-sky-600" />
                        <span>Upload Logo File</span>
                      </button>

                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="Or paste web image URL..."
                          value={newBrandUrlInput}
                          onChange={(e) => setNewBrandUrlInput(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                        <button
                          type="button"
                          onClick={handleApplyNewBrandUrl}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Load
                        </button>
                      </div>
                    </div>

                    {newBrandLogoUrl && (
                      <div className="mt-3 flex items-center gap-3 bg-white p-2.5 rounded-xl border border-sky-200">
                        <div className="h-10 w-24 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center p-1">
                          <img src={newBrandLogoUrl} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="text-xs text-emerald-700 font-medium">Logo ready</span>
                        <button
                          type="button"
                          onClick={() => setNewBrandLogoUrl(null)}
                          className="ml-auto text-xs text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-sky-100">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewBrand(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-white rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Brand to {newBrandCategory}</span>
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Brand Selector Grid with Delete Button on each item */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Select Brand to Edit or Delete ({currentBrandsList.length} total):
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Click to select · Hover to delete
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {currentBrandsList.map((b) => {
                    const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
                    const hasCustom = !!customBrandLogosMap[b.name.toLowerCase().trim()];

                    return (
                      <div
                        key={b.name}
                        className={`relative rounded-xl border transition-all flex flex-col items-center justify-center p-2.5 text-center group ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedBrand(b.name)}
                          className="w-full flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <div className="h-8 w-full flex items-center justify-center">
                            <OfficialBrandLogo
                              name={b.name}
                              size="sm"
                              customLogoUrl={customBrandLogosMap[b.name.toLowerCase().trim()]}
                            />
                          </div>

                          <span className="text-[11px] font-bold text-slate-700 truncate w-full">
                            {b.name}
                          </span>
                        </button>

                        {/* Top-right status / delete icons */}
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                          {hasCustom && (
                            <span 
                              className="w-2 h-2 rounded-full bg-emerald-500" 
                              title="Custom logo uploaded" 
                            />
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBrand(selectedCategory, b.name);
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                            title={`Delete ${b.name} from list`}
                            aria-label={`Delete ${b.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Tile to add brand directly */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNewBrand(true);
                      setNewBrandCategory(selectedCategory);
                    }}
                    className="p-3 border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl bg-slate-50 hover:bg-sky-50/40 transition-colors flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-sky-700 cursor-pointer min-h-[70px]"
                  >
                    <Plus className="w-4 h-4 text-sky-600" />
                    <span className="text-[11px] font-bold">+ Add Brand</span>
                  </button>
                </div>
              </div>

              {/* Edit Selected Brand Card (When a brand is selected) */}
              {selectedBrand && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Selected Brand:
                      </span>
                      <span className="text-xs font-extrabold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md">
                        {selectedBrand}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {customBrandLogosMap[selectedBrand.toLowerCase().trim()] && (
                        <button
                          type="button"
                          onClick={handleResetCurrentBrandLogo}
                          className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset to Official Logo</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteBrand(selectedCategory, selectedBrand)}
                        className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-1 rounded-md border border-rose-200 flex items-center gap-1 cursor-pointer"
                        title={`Delete ${selectedBrand} permanently from catalog`}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Brand</span>
                      </button>
                    </div>
                  </div>

                  {/* Selected Brand Live Frame Preview */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
                    <div className="w-36 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2 shadow-2xs shrink-0">
                      <OfficialBrandLogo
                        name={selectedBrand}
                        size="md"
                        customLogoUrl={brandLogoUrl}
                      />
                    </div>

                    <div className="text-xs text-slate-600 flex-1">
                      <div className="font-semibold text-slate-900">
                        {selectedBrand} Current Visual
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {brandLogoUrl
                          ? 'Using uploaded custom logo image file'
                          : 'Currently using authentic vector official brand logo'}
                      </p>
                    </div>
                  </div>

                  {/* Brand File / URL inputs */}
                  <input
                    type="file"
                    ref={brandFileInputRef}
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleBrandFileChange}
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => brandFileInputRef.current?.click()}
                      className="py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload New Logo File for {selectedBrand}</span>
                    </button>

                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Or enter logo image URL..."
                        value={brandUrlInput}
                        onChange={(e) => setBrandUrlInput(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                      <button
                        type="button"
                        onClick={handleApplyBrandUrl}
                        className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Load
                      </button>
                    </div>
                  </div>

                  {/* Save Brand Button */}
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleSaveBrandLogo}
                      className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Logo for {selectedBrand}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
