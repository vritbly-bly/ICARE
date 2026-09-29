import React, { useState, useEffect } from 'react';
import { 
  X, 
  RefreshCw, 
  Check, 
  CloudUpload, 
  Github, 
  Download, 
  Copy, 
  AlertCircle, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Layers,
  Image as ImageIcon,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { 
  getActiveAdminStoreData, 
  publishStoreChangesToLive, 
  PublishedStoreSnapshot,
  REMOTE_SYNC_STORAGE_KEY
} from '../utils/syncManager';
import { Product, ServicePillar, PaymentConfig } from '../types';

interface PublishSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  services: ServicePillar[];
  paymentConfig: PaymentConfig;
  onSyncApplied?: (snapshot: PublishedStoreSnapshot) => void;
}

export const PublishSyncModal: React.FC<PublishSyncModalProps> = ({
  isOpen,
  onClose,
  products,
  services,
  paymentConfig,
  onSyncApplied,
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [lastPublishedDate, setLastPublishedDate] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'github' | 'export'>('quick');

  const bannerImg = typeof window !== 'undefined' ? localStorage.getItem('icare_custom_banner_image') : null;
  const logoImg = typeof window !== 'undefined' ? localStorage.getItem('icare_custom_store_logo') : null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(REMOTE_SYNC_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.publishedAt) {
            setLastPublishedDate(new Date(parsed.publishedAt).toLocaleString());
          }
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePublishNow = () => {
    setIsPublishing(true);
    setPublishedSuccess(false);

    setTimeout(() => {
      const snapshot = getActiveAdminStoreData();
      publishStoreChangesToLive(snapshot);

      if (onSyncApplied) {
        onSyncApplied(snapshot);
      }

      setLastPublishedDate(new Date().toLocaleString());
      setIsPublishing(false);
      setPublishedSuccess(true);
    }, 600);
  };

  const handleDownloadStoreConfig = () => {
    const snapshot = getActiveAdminStoreData();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snapshot, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `store-config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const gitHubInstructions = `# How to push your latest Catalog & Banner updates to GitHub Pages:
# 1. Download your updated 'store-config.json' using the button above.
# 2. Place 'store-config.json' inside your project's 'public/' folder.
# 3. Commit and push to GitHub:
git add public/store-config.json
git commit -m "Update hardware catalog, logo, and web banner"
git push origin main

# GitHub Actions will automatically rebuild and deploy the live site in under 60 seconds!`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gitHubInstructions);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between border-b border-sky-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-inner">
              <CloudUpload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                  Publish Changes to Live Visitor Site
                </h2>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Instant Sync
                </span>
              </div>
              <p className="text-xs text-slate-300">
                1-Click synchronization for hardware catalog, custom banners, store logos, and UPI QR
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Close Sync Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 ${
              activeTab === 'quick'
                ? 'border-sky-600 text-sky-600 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Live Sync</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 ${
              activeTab === 'github'
                ? 'border-sky-600 text-sky-600 bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Pages Deploy</span>
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
            <span>Export Config JSON</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 bg-slate-50/40 max-h-[75vh] overflow-y-auto">
          {activeTab === 'quick' && (
            <div className="space-y-5">
              {/* Summary of what will be synchronized */}
              <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Pending Updates Ready for Visitors:</span>
                  <span className="text-sky-600 font-bold">All Connected</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Hardware Catalog</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        {products.length} products &amp; {services.length} services (prices, specs, photos)
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Web Banner &amp; Logos</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        {bannerImg ? 'Custom banner active' : 'Default banner'} ·{' '}
                        {logoImg ? 'Custom store logo active' : 'Official vector logo'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              {publishedSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-heading text-emerald-950">
                      Changes Successfully Published!
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Your store catalog, web banner, logos, and UPI configuration have been published to the live snapshot. Visitors and all open browser tabs will receive these updates immediately.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-sky-50 border border-sky-200/80 rounded-2xl text-sky-950 flex items-start gap-3">
                  <CloudUpload className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold font-heading text-sky-950">
                      Publish to Live Visitors
                    </h4>
                    <p className="text-xs text-sky-800/80">
                      Clicking the button below instantly commits your latest modifications so all visitors immediately see your customized hardware catalog, new prices, updated logo, and web banner.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePublishNow}
                  disabled={isPublishing}
                  className="w-full sm:flex-1 py-3 px-6 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${isPublishing ? 'animate-spin' : ''}`} />
                  <span>{isPublishing ? 'Publishing Updates...' : 'Sync All Changes to Visitor Site Now'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadStoreConfig}
                  className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Download store-config.json for permanent source code deployment"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Download Config</span>
                </button>
              </div>

              {lastPublishedDate && (
                <div className="text-center text-[11px] text-slate-400">
                  Last published to live visitor snapshot: <strong>{lastPublishedDate}</strong>
                </div>
              )}
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository &amp; Pages Sync Workflow</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your project includes the automated GitHub Pages workflow file:
                  <code className="text-amber-300 ml-1 font-mono text-[11px]">.github/workflows/deploy.yml</code> (Node 22 LTS, Vite 8 builder).
                </p>
                <div className="p-3 bg-sky-950/80 border border-sky-800/60 rounded-xl text-[11px] text-sky-200 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>Important GitHub Repository Setting:</span>
                  </div>
                  <p>
                    In your GitHub repo, go to <strong>Settings → Pages → Build and deployment → Source</strong> and select <strong>"GitHub Actions"</strong>. This enables the automated workflow to build the production bundle and deploy it seamlessly.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Git Terminal Commands to Update Site:</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Commands'}</span>
                  </button>
                </div>

                <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                  {gitHubInstructions}
                </pre>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleDownloadStoreConfig}
                  className="py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Latest store-config.json</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  Export &amp; Backup Full Storefront Data
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This exports your complete catalog of {products.length} products, {services.length} services, custom banner graphics, store logos, and UPI payment parameters into a single portable JSON file.
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 max-h-36 overflow-y-auto">
                  {JSON.stringify(
                    {
                      products_count: products.length,
                      services_count: services.length,
                      has_custom_banner: !!bannerImg,
                      has_custom_logo: !!logoImg,
                      upi_id: paymentConfig.upiId,
                      published_at: new Date().toISOString(),
                    },
                    null,
                    2
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleDownloadStoreConfig}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Store Configuration (JSON)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Live sync preserves all protected user customizations.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
