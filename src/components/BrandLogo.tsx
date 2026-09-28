import React, { useState, useEffect } from 'react';
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
  const [activeCustomLogo, setActiveCustomLogo] = useState<string | null>(() => {
    if (customLogoUrl !== undefined) return customLogoUrl;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('icare_custom_store_logo');
      if (stored) return stored;
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
        setActiveCustomLogo(stored || STORE_INFO.defaultLogoUrl || null);
      }
    };

    window.addEventListener('icare_logo_updated', handleUpdate);
    return () => window.removeEventListener('icare_logo_updated', handleUpdate);
  }, [customLogoUrl]);
  // Sizing definitions
  const dimensions = {
    sm: { height: 38, iconSize: 36, textI: 24, textCare: 22, subText: 8 },
    md: { height: 50, iconSize: 48, textI: 30, textCare: 28, subText: 9 },
    lg: { height: 72, iconSize: 70, textI: 42, textCare: 38, subText: 12 },
    xl: { height: 130, iconSize: 125, textI: 72, textCare: 68, subText: 18 },
  }[size];

  // SVG Emblem rendering matching the uploaded image exactly
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
        {/* Upper & Right Blue Arc Gradient */}
        <linearGradient id="emblemBlueArc" x1="60" y1="20" x2="260" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00a8ff" />
          <stop offset="35%" stopColor="#0077e6" />
          <stop offset="70%" stopColor="#0052cc" />
          <stop offset="100%" stopColor="#003599" />
        </linearGradient>

        {/* Mid-Left Amber/Yellow Transition Arc */}
        <linearGradient id="emblemAmberArc" x1="40" y1="110" x2="100" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0077e6" />
          <stop offset="30%" stopColor="#ffb300" />
          <stop offset="75%" stopColor="#ff8f00" />
          <stop offset="100%" stopColor="#ff5722" />
        </linearGradient>

        {/* Lower Supporting Hand Gradient */}
        <linearGradient id="emblemHandOrange" x1="70" y1="180" x2="250" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff7900" />
          <stop offset="50%" stopColor="#ff5500" />
          <stop offset="100%" stopColor="#e64a00" />
        </linearGradient>

        {/* Laptop Screen Bezel */}
        <linearGradient id="emblemScreenBezel" x1="100" y1="50" x2="220" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0b1120" />
        </linearGradient>

        {/* Laptop Metallic Chassis */}
        <linearGradient id="emblemChassis" x1="80" y1="130" x2="240" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="40%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Trackpad Cyan Glow */}
        <linearGradient id="emblemTrackpad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0099ff" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0077cc" />
        </linearGradient>

        {/* Floating Pixel Gradient */}
        <linearGradient id="emblemPixelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00c0ff" />
          <stop offset="100%" stopColor="#0066cc" />
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
        fill="url(#emblemBlueArc)"
      />

      {/* 2. MID-LEFT TRANSITION (Amber-Yellow Blend) */}
      <path
        d="M 58 152
           C 60 178, 70 200, 84 216
           C 90 202, 95 180, 93 160
           C 88 148, 76 142, 65 142
           C 61 145, 59 148, 58 152
           Z"
        fill="url(#emblemAmberArc)"
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
        fill="url(#emblemHandOrange)"
      />

      {/* White Hand Contour Lines (Finger definition) */}
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
      {/* Screen Bezel Outer */}
      <rect x="115" y="68" width="128" height="88" rx="7" fill="url(#emblemScreenBezel)" stroke="#1e293b" strokeWidth="1.5" />
      
      {/* Glossy White Screen */}
      <rect x="122" y="75" width="114" height="74" rx="3" fill="#ffffff" />
      
      {/* Subtle Screen Glare */}
      <polygon points="122,75 188,75 160,149 122,149" fill="#f8fafc" opacity="0.6" />

      {/* Top Webcam Dot */}
      <circle cx="179" cy="71" r="1.8" fill="#475569" />

      {/* Laptop Keyboard Chassis Base */}
      <polygon
        points="90,168 268,168 250,155 108,155"
        fill="url(#emblemChassis)"
        stroke="#475569"
        strokeWidth="1"
      />

      {/* Keyboard Surface & Keys */}
      <polygon
        points="110,162 248,162 244,156 114,156"
        fill="#0f172a"
      />
      {/* Key Rows Line */}
      <line x1="112" y1="159" x2="246" y2="159" stroke="#334155" strokeWidth="0.8" />

      {/* Glowing Trackpad */}
      <rect x="156" y="163" width="46" height="5" rx="1.5" fill="url(#emblemTrackpad)" />

      {/* 5. FLOATING PIXEL CLOUD (Top-right of Laptop Screen) */}
      <rect x="258" y="52" width="16" height="16" rx="2" fill="url(#emblemPixelGrad)" />
      <rect x="242" y="58" width="10" height="10" rx="1.5" fill="url(#emblemPixelGrad)" />
      <rect x="264" y="74" width="15" height="15" rx="2" fill="url(#emblemPixelGrad)" />
      <rect x="238" y="74" width="12" height="12" rx="1.5" fill="url(#emblemPixelGrad)" />
      <rect x="215" y="80" width="9" height="9" rx="1.2" fill="url(#emblemPixelGrad)" />
      <rect x="228" y="88" width="11" height="11" rx="1.5" fill="url(#emblemPixelGrad)" />
      <rect x="248" y="96" width="12" height="12" rx="1.5" fill="url(#emblemPixelGrad)" />
      <rect x="265" y="92" width="14" height="14" rx="2" fill="url(#emblemPixelGrad)" />
      <rect x="194" y="82" width="7" height="7" rx="1" fill="url(#emblemPixelGrad)" />
      <rect x="203" y="92" width="9" height="9" rx="1.2" fill="url(#emblemPixelGrad)" />
      <rect x="252" y="112" width="11" height="11" rx="1.5" fill="url(#emblemPixelGrad)" />
    </svg>
  );

  // SVG Typography Lockup (Exact Font Shapes & Vertical Gradients matching screenshot)
  const TypographyLockup = ({ isCompact = false }: { isCompact?: boolean }) => (
    <div className={`flex flex-col ${isCompact ? 'items-start' : 'items-center'} select-none`}>
      {/* "Icare" Wordmark */}
      <div className="flex items-center leading-none tracking-tight">
        {/* Bold Block Letter "I" with Solid Yellow-Orange Gradient */}
        <span
          className="font-black pr-0.5 inline-block"
          style={{
            fontSize: isCompact ? `${dimensions.textI * 0.9}px` : `${dimensions.textI}px`,
            lineHeight: 0.9,
            background: 'linear-gradient(180deg, #ffb300 0%, #ff6d00 50%, #e64a00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 1px 1px rgba(230,74,0,0.15))',
          }}
        >
          I
        </span>

        {/* Smooth Rounded Bold "care" in Royal Blue Gradient */}
        <span
          className="font-extrabold tracking-tight inline-block"
          style={{
            fontSize: isCompact ? `${dimensions.textCare * 0.9}px` : `${dimensions.textCare}px`,
            lineHeight: 0.9,
            background: inverted
              ? 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)'
              : 'linear-gradient(180deg, #0070f3 0%, #0052cc 45%, #002673 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
          }}
        >
          care
        </span>
      </div>

      {/* "— COMPUTERS —" Navy Sub-Bar */}
      <div
        className={`flex items-center gap-1.5 ${isCompact ? 'mt-0.5' : 'mt-1'}`}
        style={{
          color: inverted ? '#cbd5e1' : '#002147',
        }}
      >
        <span
          className="h-[1.5px] rounded-full inline-block"
          style={{
            width: isCompact ? '12px' : '18px',
            backgroundColor: inverted ? '#94a3b8' : '#002147',
          }}
        />
        <span
          className="font-black tracking-[0.22em] uppercase font-sans select-none"
          style={{
            fontSize: isCompact ? `${dimensions.subText}px` : `${dimensions.subText * 1.1}px`,
            color: inverted ? '#f1f5f9' : '#002147',
          }}
        >
          COMPUTERS
        </span>
        <span
          className="h-[1.5px] rounded-full inline-block"
          style={{
            width: isCompact ? '12px' : '18px',
            backgroundColor: inverted ? '#94a3b8' : '#002147',
          }}
        />
      </div>
    </div>
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
            onError={() => {
              setActiveCustomLogo(null);
            }}
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
            onError={() => {
              setActiveCustomLogo(null);
            }}
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
          className="w-auto max-w-[260px] object-contain drop-shadow-xs"
          onError={() => {
            setActiveCustomLogo(null);
          }}
        />
      </div>
    );
  }

  // Variant 1: ICON ONLY (Used in Chatbot avatar, circular widgets)
  if (variant === 'icon-only') {
    return <LogoEmblem emblemSize={dimensions.iconSize} />;
  }

  // Variant 2: COMPACT HORIZONTAL (Used in Header Navbar, Footer, Visiting Cards)
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
        <LogoEmblem emblemSize={dimensions.iconSize} />
        <TypographyLockup isCompact={true} />
      </div>
    );
  }

  // Variant 3: FULL STACKED (Exact Match to Uploaded Screenshot: Emblem on top, Icare — COMPUTERS — below)
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <LogoEmblem emblemSize={dimensions.iconSize} />
      <div className="mt-1">
        <TypographyLockup isCompact={false} />
      </div>
    </div>
  );
};
