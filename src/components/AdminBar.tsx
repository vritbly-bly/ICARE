import React, { useState } from 'react';
import { ShieldCheck, Plus, QrCode, Upload, KeyRound, LogOut, RefreshCw, Check, Database, Globe, BarChart3, CloudUpload } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminBarProps {
  onOpenAddProduct: () => void;
  onOpenAddService: () => void;
  onOpenPaymentQr: () => void;
  onOpenEditLogo: () => void;
  onResetCatalog?: () => void;
  onOpenImportData?: () => void;
  onOpenDashboard?: () => void;
  onOpenPublishSync?: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  onOpenAddProduct,
  onOpenAddService,
  onOpenPaymentQr,
  onOpenEditLogo,
  onResetCatalog,
  onOpenImportData,
  onOpenDashboard,
  onOpenPublishSync,
}) => {
  const { isAdmin, logout, openLoginModal } = useAdmin();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  if (!isAdmin) return null;

  const handleSyncClick = () => {
    if (onResetCatalog) {
      onResetCatalog();
      setSyncStatus('Synced!');
      setTimeout(() => setSyncStatus(null), 2000);
    }
  };

  return (
    <aside
      aria-label="Store Management Toolbar"
      className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white border-b border-sky-500/30 px-4 py-2 shadow-lg backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Admin Status Indicator & Live Sync Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-1.5 font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span className="text-sky-300">ADMIN:</span>
              <span className="text-slate-200 hidden xl:inline">Store Active</span>
            </div>
          </div>

          {/* 1-Click Sync to Visitor Site */}
          {onOpenPublishSync && (
            <button
              onClick={onOpenPublishSync}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all shadow-md cursor-pointer border border-emerald-400/40 animate-pulse hover:animate-none"
              title="Publish all hardware catalog, logo, and web banner updates directly to the live visitor site"
            >
              <CloudUpload className="w-3.5 h-3.5 text-white" />
              <span>Sync All to Visitor Site</span>
            </button>
          )}
        </div>

        {/* Center: Admin Quick Actions */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors cursor-pointer shadow-xs"
              title="Open Inventory Analytics Dashboard"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          )}

          <button
            onClick={onOpenAddProduct}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-colors cursor-pointer"
            title="Add a new product to catalog"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Product</span>
          </button>

          <button
            onClick={onOpenAddService}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-colors cursor-pointer"
            title="Add a new service offering"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Service</span>
          </button>

          <button
            onClick={onOpenPaymentQr}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-colors cursor-pointer"
            title="Configure Store UPI QR Code and bank details"
          >
            <QrCode className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">UPI / QR Setup</span>
          </button>

          <button
            onClick={onOpenEditLogo}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-colors cursor-pointer"
            title="Upload Store or Brand Logos"
          >
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Logos &amp; Brands</span>
          </button>

          <button
            onClick={openLoginModal}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold transition-colors cursor-pointer"
            title="Change Admin Passcode"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Change PIN</span>
          </button>

          {onOpenImportData && (
            <button
              onClick={onOpenImportData}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 hover:text-white border border-indigo-700/60 font-semibold transition-colors cursor-pointer"
              title="Import products/services via web link or JSON file (Auto-fill)"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Import Data</span>
            </button>
          )}

          {onResetCatalog && (
            <button
              onClick={handleSyncClick}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer border ${
                syncStatus
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700'
              }`}
              title="Safely merge any new catalog items without erasing your custom additions or edits"
            >
              {syncStatus ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Synced Safely!</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Sync Latest Catalog</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Right: Logout Action */}
        <button
          onClick={logout}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-semibold transition-colors cursor-pointer ml-auto"
          title="Log out of Admin Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );
};
