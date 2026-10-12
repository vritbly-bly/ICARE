import React, { useState, useEffect, useId } from 'react';
import { STORE_INFO } from '../data/mockData';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon-only';
  inverted?: boolean;
  customLogoUrl?: string | null;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  inverted = false,
  customLogoUrl,
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const [activeCustomLogo, setActiveCustomLogo] = useState<string | null>(() => {
    if (customLogoUrl !== undefined) return customLogoUrl;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('icare_custom_store_logo');
      if (stored && stored.trim() !== '' && !stored.includes('logo.svg') && stored !== 'null') {
        return stored;
      }
    }
    return STORE_INFO.defaultLogoUrl || null;
  });

  useEffect(() => {
    if (customLogoUrl !== undefined) {
      setActiveCustomLogo(customLogoUrl);
      return;
    }

    const handleUpdate = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('icare_custom_store_logo');
        if (stored && stored.trim() !== '' && !stored.includes('logo.svg') && stored !== 'null') {
          setActiveCustomLogo(stored);
        } else {
          setActiveCustomLogo(STORE_INFO.defaultLogoUrl || null);
        }
      }
    };

    window.addEventListener('icare_logo_updated', handleUpdate);
    return () => window.removeEventListener('icare_logo_updated', handleUpdate);
  }, [customLogoUrl]);

  // Dimension sizing presets
  const dimensions = {
    sm: { height: 38, iconSize: 34, fullWidth: 150 },
    md: { height: 48, iconSize: 44, fullWidth: 190 },
    lg: { height: 68, iconSize: 64, fullWidth: 240 },
    xl: { height: 140, iconSize: 110, fullWidth: 320 },
  }[size];

  // SVG Emblem vector graphic
  const LogoEmblem = ({ emblemSize = 48 }: { emblemSize?: number }) => (
    <svg
      width={emblemSize}
      height={emblemSize}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-xs select-none"
    >
      <defs>
        <linearGradient id={`emblemBlueArc_${uniqueId}`} x1="60" y1="20" x2="260" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00c0ff" />
          <stop offset="35%" stopColor="#0077e6" />
          <stop offset="70%" stopColor="#0052cc" />
          <stop offset="100%" stopColor="#002b80" />
        </linearGradient>

        <linearGradient id={`emblemAmberArc_${uniqueId}`} x1="40" y1="110" x2="100" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0077e6" />
          <stop offset="30%" stopColor="#ffb300" />
          <stop offset="75%" stopColor="#ff8f00" />
          <stop offset="100%" stopColor="#ff5722" />
        </linearGradient>

        <linearGradient id={`emblemHandOrange_${uniqueId}`} x1="70" y1="180" x2="250" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff8500" />
          <stop offset="50%" stopColor="#ff5500" />
          <stop offset="100%" stopColor="#d83b01" />
        </linearGradient>

        <linearGradient id={`emblemScreenBezel_${uniqueId}`} x1="100" y1="50" x2="220" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0b1120" />
        </linearGradient>

        <linearGradient id={`emblemChassis_${uniqueId}`} x1="80" y1="130" x2="240" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="40%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        <linearGradient id={`emblemTrackpad_${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0099ff" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0077cc" />
        </linearGradient>

        <linearGradient id={`emblemPixelGrad_${uniqueId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#005ec4" />
        </linearGradient>
      </defs>

      {/* 1. UPPER 'C' ARC (Royal Blue to Cyan) */}
      <path
        d="M 235 28
           C 130 5, 54 65, 56 160
           C 56 172, 60 186, 66 196
           C 74 180, 82 158, 88 136
           C 94 80, 142 42, 225 50
           Z"
        fill={`url(#emblemBlueArc_${uniqueId})`}
      />

      {/* 2. MID-LEFT TRANSITION (Amber-Yellow Blend) */}
      <path
        d="M 58 152
           C 60 178, 70 200, 84 216
           C 90 202, 95 180, 93 160
           C 88 148, 76 142, 65 142
           C 61 145, 59 148, 58 152
           Z"
        fill={`url(#emblemAmberArc_${uniqueId})`}
      />

      {/* 3. BOTTOM SUPPORTING HAND (Cupping from Underneath) */}
      <path
        d="M 68 185
           C 74 218, 105 254, 172 256
           C 210 257, 245 235, 258 208
           C 250 210, 240 215, 226 220
           C 185 230, 146 215, 118 198
           C 136 208, 175 212, 210 204
           C 228 200, 245 190, 250 180
           C 234 188, 212 192, 192 190
           C 146 186, 116 162, 98 142
           C 86 148, 76 164, 68 185
           Z"
        fill={`url(#emblemHandOrange_${uniqueId})`}
      />

      {/* Hand White Contour Highlights */}
      <path
        d="M 182 214 C 206 214, 230 203, 248 184"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M 214 222 C 232 218, 248 204, 256 192"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* 4. CENTRAL OPEN LAPTOP */}
      <rect x="115" y="68" width="128" height="88" rx="7" fill={`url(#emblemScreenBezel_${uniqueId})`} stroke="#1e293b" strokeWidth="1.5" />
      <rect x="122" y="75" width="114" height="74" rx="3" fill="#ffffff" />
      <polygon points="122,75 188,75 160,149 122,149" fill="#f8fafc" opacity="0.6" />
      <circle cx="179" cy="71" r="1.8" fill="#475569" />

      {/* Laptop Keyboard Chassis Base */}
      <polygon
        points="90,168 268,168 250,155 108,155"
        fill={`url(#emblemChassis_${uniqueId})`}
        stroke="#475569"
        strokeWidth="1"
      />
      <polygon
        points="110,162 248,162 244,156 114,156"
        fill="#0f172a"
      />
      <line x1="112" y1="159" x2="246" y2="159" stroke="#334155" strokeWidth="0.8" />
      <rect x="156" y="163" width="46" height="5" rx="1.5" fill={`url(#emblemTrackpad_${uniqueId})`} />

      {/* 5. FLOATING PIXEL CLOUD (Top-right of Laptop Screen) */}
      <rect x="258" y="52" width="16" height="16" rx="2" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="242" y="58" width="10" height="10" rx="1.5" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="264" y="74" width="15" height="15" rx="2" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="238" y="74" width="12" height="12" rx="1.5" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="215" y="80" width="9" height="9" rx="1.2" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="228" y="88" width="11" height="11" rx="1.5" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="248" y="96" width="12" height="12" rx="1.5" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="265" y="92" width="14" height="14" rx="2" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="194" y="82" width="7" height="7" rx="1" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="203" y="92" width="9" height="9" rx="1.2" fill={`url(#emblemPixelGrad_${uniqueId})`} />
      <rect x="252" y="112" width="11" height="11" rx="1.5" fill={`url(#emblemPixelGrad_${uniqueId})`} />
    </svg>
  );

  // If custom uploaded logo is active, display it
  if (activeCustomLogo) {
    if (variant === 'icon-only') {
      return (
        <div 
          className={`overflow-hidden rounded-full flex items-center justify-center bg-white shadow-2xs ${className}`}
          style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
        >
          <img
            src={activeCustomLogo}
            alt="Logo"
            className="w-full h-full object-contain p-0.5"
            onError={() => setActiveCustomLogo(null)}
          />
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div className={`inline-flex items-center select-none ${className}`}>
          <img
            src={activeCustomLogo}
            alt="iCare Computers"
            style={{ maxHeight: dimensions.height }}
            className="w-auto max-w-[200px] object-contain"
            onError={() => setActiveCustomLogo(null)}
          />
        </div>
      );
    }

    // Full variant
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src={activeCustomLogo}
          alt="iCare Computers"
          style={{ maxHeight: dimensions.height }}
          className="w-auto max-w-[280px] object-contain drop-shadow-xs"
          onError={() => setActiveCustomLogo(null)}
        />
      </div>
    );
  }

  // Variant 1: ICON ONLY
  if (variant === 'icon-only') {
    return <LogoEmblem emblemSize={dimensions.iconSize} />;
  }

  // Variant 2: COMPACT HORIZONTAL (Used in Header Navbar, Footer, Visiting Cards)
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
        <LogoEmblem emblemSize={dimensions.iconSize} />
        <div className="flex flex-col items-start leading-none select-none">
          {/* "I care" Wordmark */}
          <div className="flex items-center font-heading tracking-tight">
            <span
              className="font-black inline-block pr-0.5 text-2xl sm:text-3xl leading-none"
              style={{
                background: 'linear-gradient(180deg, #ffb300 0%, #ff6d00 50%, #e64a00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              I
            </span>
            <span
              className="font-black inline-block text-2xl sm:text-3xl leading-none tracking-tight"
              style={{
                background: inverted
                  ? 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)'
                  : 'linear-gradient(180deg, #0072f5 0%, #0047ba 50%, #002166 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              }}
            >
              care
            </span>
          </div>

          {/* "— COMPUTERS —" Navy Sub-Bar */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="h-[1.5px] w-3 rounded-full inline-block"
              style={{ backgroundColor: inverted ? '#94a3b8' : '#002147' }}
            />
            <span
              className="font-black tracking-[0.22em] text-[9px] uppercase font-sans select-none"
              style={{ color: inverted ? '#f1f5f9' : '#002147' }}
            >
              COMPUTERS
            </span>
            <span
              className="h-[1.5px] w-3 rounded-full inline-block"
              style={{ backgroundColor: inverted ? '#94a3b8' : '#002147' }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Variant 3: FULL STACKED (Matching the Attached Pamphlet/Banner Page)
  // Perfectly centered emblem + "I care" + "— COMPUTERS —"
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Centered Laptop in Hand Emblem */}
      <div className="flex items-center justify-center">
        <LogoEmblem emblemSize={dimensions.iconSize} />
      </div>

      {/* Typography: "I care" */}
      <div className="mt-1 flex items-center justify-center font-heading leading-none">
        <span
          className="font-black inline-block pr-1 text-5xl sm:text-6xl lg:text-7xl leading-none"
          style={{
            background: 'linear-gradient(180deg, #ffb300 0%, #ff6d00 50%, #e64a00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 3px rgba(230,74,0,0.15))',
          }}
        >
          I
        </span>
        <span
          className="font-black inline-block text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight"
          style={{
            background: inverted
              ? 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)'
              : 'linear-gradient(180deg, #0072f5 0%, #0047ba 50%, #002166 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
            letterSpacing: '-0.02em',
            filter: 'drop-shadow(0 2px 3px rgba(0,71,186,0.15))',
          }}
        >
          care
        </span>
      </div>

      {/* Sub-bar: "— COMPUTERS —" with balanced divider lines */}
      <div className="mt-1.5 flex items-center justify-center gap-2 sm:gap-3 w-full max-w-[260px] sm:max-w-[320px]">
        <div
          className="h-[2px] flex-1 rounded-full"
          style={{ backgroundColor: inverted ? '#94a3b8' : '#002147' }}
        />
        <span
          className="font-black tracking-[0.25em] text-xs sm:text-sm lg:text-base uppercase font-sans select-none shrink-0"
          style={{ color: inverted ? '#f8fafc' : '#002147' }}
        >
          COMPUTERS
        </span>
        <div
          className="h-[2px] flex-1 rounded-full"
          style={{ backgroundColor: inverted ? '#94a3b8' : '#002147' }}
        />
      </div>
    </div>
  );
};
