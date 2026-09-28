import React, { useState } from 'react';
import { X, Globe, Download, Upload, Check, AlertCircle, FileText, Loader2, Sparkles, Database } from 'lucide-react';
import { Product, ServicePillar } from '../types';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportData: (importedProducts: Product[], importedServices: ServicePillar[], replaceExisting: boolean) => void;
  currentProducts: Product[];
  currentServices: ServicePillar[];
  onImportBannerLogo?: (bannerUrl: string | null, logoUrl: string | null) => void;
}

export const ImportDataModal: React.FC<ImportDataModalProps> = ({
  isOpen,
  onClose,
  onImportData,
  currentProducts,
  currentServices,
  onImportBannerLogo,
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'file' | 'export'>('link');
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [replaceMode, setReplaceMode] = useState(false);

  // Preview before saving
  const [parsedPreview, setParsedPreview] = useState<{
    products: Product[];
    services: ServicePillar[];
    bannerUrl?: string | null;
    logoUrl?: string | null;
    sourceTitle?: string;
  } | null>(null);

  if (!isOpen) return null;

  // Parser helper that handles either:
  // 1) Full export format: { products: [...], services: [...], bannerUrl: "...", logoUrl: "..." }
  // 2) Array of products: [...]
  // 3) E-commerce/tech specs link scraper / auto-extract
  const parseJsonData = (rawText: string) => {
    const data = JSON.parse(rawText);

    let parsedProducts: Product[] = [];
    let parsedServices: ServicePillar[] = [];
    let parsedBannerUrl: string | null | undefined = undefined;
    let parsedLogoUrl: string | null | undefined = undefined;

    if (Array.isArray(data)) {
      // Direct array of products or services
      data.forEach((item: any, idx: number) => {
        if (item.category || item.price !== undefined || item.specs) {
          parsedProducts.push(normalizeProduct(item, idx));
        } else if (item.features || item.color) {
          parsedServices.push(normalizeService(item, idx));
        } else {
          // Default to product
          parsedProducts.push(normalizeProduct(item, idx));
        }
      });
    } else if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data.products)) {
        parsedProducts = data.products.map((p: any, idx: number) => normalizeProduct(p, idx));
      }
      if (Array.isArray(data.services)) {
        parsedServices = data.services.map((s: any, idx: number) => normalizeService(s, idx));
      }
      if (data.bannerUrl || data.customBannerImage) {
        parsedBannerUrl = data.bannerUrl || data.customBannerImage;
      }
      if (data.logoUrl || data.customLogoUrl || data.customStoreLogo) {
        parsedLogoUrl = data.logoUrl || data.customLogoUrl || data.customStoreLogo;
      }
      // If object itself has name and price, it's a single product
      if (data.name && (data.price !== undefined || data.specs)) {
        parsedProducts.push(normalizeProduct(data, 0));
      }
    }

    if (parsedProducts.length === 0 && parsedServices.length === 0 && !parsedBannerUrl && !parsedLogoUrl) {
      throw new Error('No valid products, services, or catalog configuration found in the provided data.');
    }

    return { 
      products: parsedProducts, 
      services: parsedServices,
      bannerUrl: parsedBannerUrl,
      logoUrl: parsedLogoUrl,
    };
  };

  const normalizeProduct = (item: any, idx: number): Product => {
    const numPrice = Number(item.price) || 0;
    const numOrig = Number(item.originalPrice) || Math.round(numPrice * 1.15) || 0;
    
    // Process images
    let images: string[] = [];
    if (Array.isArray(item.images)) {
      images = item.images.filter(Boolean);
    } else if (item.image) {
      images = [item.image];
    } else if (item.imageUrl) {
      images = [item.imageUrl];
    }

    const primaryImg = images[0] || item.imageUrl || undefined;

    return {
      id: item.id || `imported-prod-${Date.now()}-${idx}`,
      name: item.name || item.title || `Imported Item ${idx + 1}`,
      brand: item.brand || 'iCare Certified',
      category: ['laptops', 'desktops', 'printers', 'cctv', 'accessories', 'amc'].includes(item.category)
        ? item.category
        : 'laptops',
      price: numPrice,
      originalPrice: numOrig,
      rating: Number(item.rating) || 4.9,
      reviewsCount: Number(item.reviewsCount) || 12,
      inStock: item.inStock !== false,
      specs: typeof item.specs === 'object' && item.specs !== null ? item.specs : { Condition: 'Brand New', Availability: 'In Stock' },
      description: item.description || `${item.name || 'Quality hardware'} available at iCare Computers Ballari.`,
      badge: item.badge || undefined,
      tags: Array.isArray(item.tags) ? item.tags : [item.brand || 'Hardware', 'Verified'],
      warranty: item.warranty || '1 Year Store / Manufacturer Warranty',
      imageFallbackIcon: item.category === 'cctv' ? 'Camera' : item.category === 'printers' ? 'Printer' : 'Laptop',
      gradient: item.gradient || 'from-sky-700 to-blue-900',
      imageUrl: primaryImg,
      images: images,
      protected: item.protected !== undefined ? item.protected : true,
      last_updated: item.last_updated || Date.now(),
      version: item.version || 1,
    };
  };

  const normalizeService = (item: any, idx: number): ServicePillar => {
    let images: string[] = [];
    if (Array.isArray(item.images)) {
      images = item.images.filter(Boolean);
    } else if (item.imageUrl) {
      images = [item.imageUrl];
    }

    return {
      id: item.id || `imported-serv-${Date.now()}-${idx}`,
      title: item.title || item.name || `Service Pillar ${idx + 1}`,
      subtitle: item.subtitle || 'Expert Technical Support',
      description: item.description || 'Professional diagnostics and repairs in Ballari.',
      priceEstimate: item.priceEstimate || 'Diagnostic from ₹199',
      color: item.color || 'from-sky-500 to-blue-600',
      icon: item.icon || 'Wrench',
      features: Array.isArray(item.features) && item.features.length > 0 ? item.features : ['Quality assurance and certified repair parts.'],
      imageUrl: images[0] || item.imageUrl,
      images: images,
      protected: item.protected !== undefined ? item.protected : true,
      last_updated: item.last_updated || Date.now(),
      version: item.version || 1,
    };
  };

  // 1. Fetch & Parse From Link
  const handleFetchFromLink = async () => {
    setError(null);
    setSuccessMsg(null);
    setParsedPreview(null);

    const trimmed = urlInput.trim();
    if (!trimmed) {
      setError('Please enter a valid URL (e.g. JSON endpoint, Raw GitHub URL, or product feed URL).');
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setError('Please provide a valid web URL starting with https://');
      return;
    }

    setIsLoading(true);

    try {
      // Fetch data directly or via CORS-friendly fetch
      let response: Response;
      try {
        response = await fetch(trimmed, {
          headers: { Accept: 'application/json, text/plain, */*' },
        });
      } catch {
        // If direct CORS fails, attempt via public allorigins proxy
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(trimmed)}`;
        response = await fetch(proxyUrl);
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch from link. Server returned status: ${response.status}`);
      }

      const text = await response.text();
      
      // Try parsing as JSON first
      try {
        const result = parseJsonData(text);
        setParsedPreview(result);
        setSuccessMsg(`Successfully parsed ${result.products.length} product(s) and ${result.services.length} service(s) from link!`);
      } catch (jsonErr: any) {
        // If not direct JSON, check if it's an HTML page with meta / open graph or schema.org LD-JSON
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // Extract meta tags / JSON-LD
        let extractedProducts: Product[] = [];
        const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
        jsonLdScripts.forEach((s) => {
          try {
            const parsedLd = JSON.parse(s.textContent || '{}');
            if (parsedLd['@type'] === 'Product' || parsedLd['@type'] === 'ItemPage') {
              extractedProducts.push(normalizeProduct({
                name: parsedLd.name,
                description: parsedLd.description,
                imageUrl: parsedLd.image,
                images: Array.isArray(parsedLd.image) ? parsedLd.image : [parsedLd.image],
                brand: parsedLd.brand?.name || parsedLd.brand || 'Original Brand',
                price: parsedLd.offers?.price || parsedLd.offers?.[0]?.price || 0,
              }, extractedProducts.length));
            }
          } catch {
            // ignore
          }
        });

        // Also check OpenGraph / HTML Title
        const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || doc.title;
        const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
        const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content');

        if (ogTitle && ogTitle.trim()) {
          extractedProducts.push(normalizeProduct({
            name: ogTitle.trim(),
            description: ogDesc || undefined,
            imageUrl: ogImage || undefined,
            images: ogImage ? [ogImage] : [],
          }, extractedProducts.length));
        }

        if (extractedProducts.length > 0) {
          setParsedPreview({ products: extractedProducts, services: [] });
          setSuccessMsg(`Auto-filled product info and images from URL (${extractedProducts[0].name})!`);
        } else {
          throw new Error('Could not automatically parse products from this link. Make sure it points to a JSON catalog file or product link with metadata.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Unable to import from the provided link. Please verify the URL or try File Upload.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. File Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessMsg(null);
    setParsedPreview(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const result = parseJsonData(text);
        setParsedPreview(result);
        setSuccessMsg(`Loaded ${result.products.length} product(s) and ${result.services.length} service(s) from "${file.name}"!`);
      } catch (err: any) {
        setError(err.message || 'Failed to parse JSON file.');
      }
    };
    reader.onerror = () => {
      setError('Failed to read file from disk.');
    };
    reader.readAsText(file);
  };

  // 3. Apply Preview to Live Catalog
  const handleApplyImport = () => {
    if (!parsedPreview) return;
    onImportData(parsedPreview.products, parsedPreview.services, replaceMode);
    
    // Also apply imported banner or logo if present
    if (onImportBannerLogo && (parsedPreview.bannerUrl !== undefined || parsedPreview.logoUrl !== undefined)) {
      onImportBannerLogo(parsedPreview.bannerUrl || null, parsedPreview.logoUrl || null);
    }
    onClose();
  };

  // 4. Export Current Catalog to JSON
  const handleDownloadBackup = () => {
    let savedBanner: string | null = null;
    let savedLogo: string | null = null;
    try {
      savedBanner = localStorage.getItem('icare_custom_banner_image');
      savedLogo = localStorage.getItem('icare_custom_store_logo');
    } catch {
      // ignore
    }

    const exportData = {
      store: 'iCare Computers & Technologies - Ballari',
      exportedAt: new Date().toISOString(),
      bannerUrl: savedBanner,
      logoUrl: savedLogo,
      products: currentProducts,
      services: currentServices,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `icare-catalog-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 text-indigo-800 rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Import Catalog &amp; Auto-Fill Data
              </h2>
              <p className="text-xs text-slate-500">
                Import products &amp; services via web link or file to automatically update your store catalog
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

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 ${
              activeTab === 'link'
                ? 'border-sky-600 text-sky-600 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Import via Link (Auto-fill)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('file')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 ${
              activeTab === 'file'
                ? 'border-sky-600 text-sky-600 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload JSON File</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 ${
              activeTab === 'export'
                ? 'border-sky-600 text-sky-600 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export / Backup Data</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: IMPORT VIA LINK */}
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl text-xs text-sky-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-sky-800">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>Auto-Fill Products &amp; Images via Link</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Paste a direct link to any product feed, GitHub Raw JSON, or web link. The system will automatically extract product titles, high-resolution photos, specifications, and prices directly into your live store.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  Product Link or JSON Catalog URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/products.json or raw link..."
                    className="flex-1 px-3 py-2.5 text-xs border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleFetchFromLink}
                    disabled={isLoading}
                    className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Fetching...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Fetch &amp; Auto-Fill</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Example: Any JSON URL containing an array of products with names, prices, and image URLs.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD JSON FILE */}
          {activeTab === 'file' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <span>Restore from Local Backup File</span>
                </div>
                <p className="leading-relaxed">
                  Upload a previously exported <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-slate-800">.json</code> backup to restore your full catalog of systems, services, pricing, and specs even after clearing browser history or cache.
                </p>
              </div>

              <div className="p-8 border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-sky-50/30 transition-all cursor-pointer relative">
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs font-bold text-slate-800">
                  Click or drag and drop your JSON catalog backup file here
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  Supports .json catalog files exported from this store or custom structured feeds
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: EXPORT / BACKUP */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-sky-600" />
                  <span>Download Complete Store Catalog Backup</span>
                </div>
                <p className="leading-relaxed">
                  Download a backup file containing all currently active products ({currentProducts.length}) and services ({currentServices.length}) with all photos, specs, custom pricing, and descriptions.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>Download JSON Backup File</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PARSED PREVIEW PANEL */}
          {parsedPreview && (
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Ready to Import
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {parsedPreview.products.length} Products · {parsedPreview.services.length} Services
                  </span>
                </div>

                <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={replaceMode}
                    onChange={(e) => setReplaceMode(e.target.checked)}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span>Replace entire catalog (instead of merging)</span>
                </label>
              </div>

              {/* Banner / Logo badge in preview */}
              {(parsedPreview.bannerUrl || parsedPreview.logoUrl) && (
                <div className="flex items-center gap-2 p-2 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    Includes updated{' '}
                    {[
                      parsedPreview.bannerUrl ? 'Home Banner' : null,
                      parsedPreview.logoUrl ? 'Store Logo' : null,
                    ]
                      .filter(Boolean)
                      .join(' and ')}
                  </span>
                </div>
              )}

              {/* Sample preview list */}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {parsedPreview.products.slice(0, 5).map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt="" className="w-9 h-7 object-contain bg-slate-50 rounded border border-slate-100" />
                      ) : (
                        <div className="w-9 h-7 bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">
                          Img
                        </div>
                      )}
                      <div className="truncate">
                        <div className="font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-[11px] text-slate-500">{p.brand} · {p.category}</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-slate-800 shrink-0 ml-3">
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}

                {parsedPreview.products.length > 5 && (
                  <div className="text-center text-[11px] text-slate-400 py-1">
                    + {parsedPreview.products.length - 5} more products...
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setParsedPreview(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyImport}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Sync to Live Store Now</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Automatic persistence in browser storage &amp; instant live sync for all visitors</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-slate-300 rounded-xl text-slate-700 hover:bg-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
