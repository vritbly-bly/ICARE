import React, { useState } from 'react';
import { ShieldCheck, Plus, Upload, KeyRound, LogOut, Check, Globe, CloudUpload } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminBarProps {
  onOpenAddService: () => void;
  onOpenEditLogo: () => void;
  onResetCatalog?: () => void;
  onOpenImportData?: () => void;
  onOpenPublishSync?: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  onOpenAddService,
  onOpenEditLogo,
  onResetCatalog,
  onOpenImportData,
  onOpenPublishSync,
}) => {
  const { isAdmin, logout, openLoginModal } = useAdmin();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="Business Management Toolbar"
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
              <span className="text-slate-200 hidden xl:inline">Proprietor Mode Active</span>
            </div>
          </div>

          {/* 1-Click Sync to Visitor Site */}
          {onOpenPublishSync && (
            <button
              onClick={onOpenPublishSync}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs cursor-pointer border border-emerald-400/50"
              title="Sync company services, case studies, and banner to live site"
            >
              <CloudUpload className="w-3.5 h-3.5" />
              <span>Publish Sync</span>
            </button>
          )}
        </div>

        {/* Center: Admin Quick Actions */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenAddService}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors cursor-pointer shadow-xs"
            title="Add a new service offering"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Service</span>
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
              title="Import services via web link or JSON file (Auto-fill)"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Import Data</span>
            </button>
          )}
        </div>

        {/* Right: Exit Admin */}
        <div className="flex items-center gap-2">
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 font-semibold transition-colors cursor-pointer"
            title="Exit Admin Mode"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
