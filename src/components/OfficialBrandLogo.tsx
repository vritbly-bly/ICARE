import React from 'react';

interface OfficialBrandLogoProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  customLogoUrl?: string | null;
}

export const OfficialBrandLogo: React.FC<OfficialBrandLogoProps> = ({
  name,
  className = '',
  size = 'md',
  customLogoUrl,
}) => {
  const normName = name.toLowerCase().trim();

  // Dimensions based on size
  const heightClass = {
    sm: 'h-6 max-w-[80px]',
    md: 'h-8 max-w-[110px]',
    lg: 'h-10 max-w-[140px]',
  }[size];

  // Check for custom uploaded logo image
  let activeCustomLogo = customLogoUrl;
  if (activeCustomLogo === undefined && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('icare_custom_brand_logos');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[normName]) {
          activeCustomLogo = parsed[normName];
        }
      }
    } catch {
      // Ignore json parse error
    }
  }

  if (activeCustomLogo) {
    return (
      <img
        src={activeCustomLogo}
        alt={`${name} Logo`}
        className={`${heightClass} ${className} object-contain shrink-0 select-none`}
      />
    );
  }

  // Return crisp official vector representation for each brand
  switch (normName) {
    // -------------------------------------------------------------
    // LAPTOP BRANDS
    // -------------------------------------------------------------
    case 'hp':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="HP Official Logo"
        >
          {/* HP Cyan/Blue Circle */}
          <circle cx="50" cy="50" r="48" fill="#0096D6" />
          {/* Slanted HP Letterforms */}
          <g transform="skewX(-24) translate(16, 0)">
            {/* 'h' stem and arch */}
            <path
              d="M 44 14 L 50 14 L 32 86 L 26 86 Z"
              fill="#FFFFFF"
            />
            <path
              d="M 47 38 C 55 35, 63 39, 62 49 L 55 77 L 49 77 L 55 49 C 55 43, 50 41, 44 43 L 41 55 L 47 38 Z"
              fill="#FFFFFF"
            />
            {/* 'p' stem and loop */}
            <path
              d="M 64 36 L 70 36 L 52 108 L 46 108 Z"
              fill="#FFFFFF"
              clipPath="url(#hpClip)"
            />
            <path
              d="M 67 36 C 78 34, 86 43, 83 55 C 80 67, 70 75, 59 75 L 53 75 L 67 36 Z M 64 42 L 56 69 C 63 69, 71 64, 73 55 C 75 47, 71 42, 64 42 Z"
              fill="#FFFFFF"
            />
          </g>
          <clipPath id="hpClip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </svg>
      );

    case 'dell':
      return (
        <svg
          viewBox="0 0 200 60"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Dell Official Logo"
        >
          {/* Dell Blue #0076CE with Iconic Tilted 'E' */}
          <g fill="#0076CE">
            {/* D */}
            <path d="M 20 10 L 42 10 C 58 10, 68 20, 68 30 C 68 40, 58 50, 42 50 L 20 50 Z M 32 19 L 32 41 L 42 41 C 51 41, 56 36, 56 30 C 56 24, 51 19, 42 19 Z" />
            
            {/* Tilted 'E' (-32 degrees) */}
            <g transform="translate(85, 30) rotate(-32) translate(-85, -30)">
              <path d="M 74 12 L 96 12 L 96 20 L 85 20 L 85 26 L 94 26 L 94 34 L 85 34 L 85 41 L 96 41 L 96 49 L 74 49 Z" />
            </g>

            {/* L 1 */}
            <path d="M 112 10 L 123 10 L 123 41 L 138 41 L 138 50 L 112 50 Z" />

            {/* L 2 */}
            <path d="M 148 10 L 159 10 L 159 41 L 174 41 L 174 50 L 148 50 Z" />
          </g>
        </svg>
      );

    case 'lenovo':
      return (
        <div className={`flex items-center justify-center bg-[#E2231A] px-3 py-1 rounded shadow-xs ${className}`}>
          <span
            className="font-bold text-white tracking-tight uppercase select-none text-[15px] sm:text-[17px]"
            style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif", letterSpacing: '-0.03em' }}
          >
            lenovo
          </span>
        </div>
      );

    case 'asus':
      return (
        <svg
          viewBox="0 0 160 40"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="ASUS Official Logo"
        >
          <g fill="#00539B">
            {/* A with signature cut */}
            <path d="M 8 36 L 24 4 L 36 4 L 52 36 L 40 36 L 36 27 L 23 27 L 19 36 Z M 27 18 L 33 18 L 30 11 Z" />
            {/* S 1 */}
            <path d="M 57 26 C 57 32, 63 36, 73 36 C 84 36, 89 31, 89 25 C 89 17, 78 15, 71 14 C 64 13, 62 11, 62 8 C 62 6, 65 4, 71 4 C 77 4, 82 7, 83 11 L 93 11 C 92 4, 83 0, 71 0 C 60 0, 52 5, 52 11 C 52 19, 62 21, 69 22 C 77 23, 79 25, 79 28 C 79 31, 75 33, 69 33 C 62 33, 58 29, 57 26 Z" />
            {/* U */}
            <path d="M 98 4 L 108 4 L 108 24 C 108 30, 112 34, 119 34 C 126 34, 130 30, 130 24 L 130 4 L 140 4 L 140 24 C 140 34, 132 40, 119 40 C 106 40, 98 34, 98 24 Z" />
            {/* S 2 */}
            <path d="M 145 26 C 145 32, 151 36, 161 36 C 172 36, 177 31, 177 25 C 177 17, 166 15, 159 14 C 152 13, 150 11, 150 8 C 150 6, 153 4, 159 4 C 165 4, 170 7, 171 11 L 181 11 C 180 4, 171 0, 159 0 C 148 0, 140 5, 140 11 C 140 19, 150 21, 157 22 C 165 23, 167 25, 167 28 C 167 31, 163 33, 157 33 C 150 33, 146 29, 145 26 Z" transform="translate(-36, 0)" />
            {/* ASUS signature horizontal cut stripe */}
            <rect x="0" y="16" width="160" height="3" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'acer':
      return (
        <svg
          viewBox="0 0 140 40"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Acer Official Logo"
        >
          {/* Acer Brand Tech Green #83B81A */}
          <g fill="#83B81A">
            {/* a */}
            <path d="M 28 32 L 28 27 C 25 31, 20 33, 14 33 C 6 33, 0 27, 0 19 C 0 11, 7 5, 15 5 C 20 5, 25 7, 28 11 L 28 0 L 35 0 L 35 32 Z M 7 19 C 7 24, 11 27, 17 27 C 22 27, 26 24, 27 19 C 27 14, 23 11, 17 11 C 11 11, 7 14, 7 19 Z" />
            {/* c */}
            <path d="M 68 25 C 65 30, 59 33, 51 33 C 40 33, 33 25, 33 16 C 33 8, 41 0, 52 0 C 60 0, 66 4, 69 9 L 63 13 C 61 9, 57 6, 52 6 C 45 6, 40 10, 40 16 C 40 22, 45 27, 52 27 C 57 27, 61 24, 63 21 Z" />
            {/* e */}
            <path d="M 103 16 L 73 16 C 73 23, 78 27, 85 27 C 89 27, 94 25, 96 21 L 102 24 C 99 29, 93 33, 85 33 C 72 33, 66 24, 66 16 C 66 8, 73 0, 85 0 C 96 0, 103 8, 103 16 Z M 73 12 L 96 12 C 95 6, 91 5, 85 5 C 79 5, 75 7, 73 12 Z" />
            {/* r */}
            <path d="M 107 5 L 114 5 L 114 11 C 117 7, 121 5, 126 5 L 126 12 C 120 12, 114 15, 114 22 L 114 32 L 107 32 Z" />
          </g>
        </svg>
      );

    case 'apple':
      return (
        <svg
          viewBox="0 0 170 170"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Apple Official Logo"
        >
          {/* Apple Silhouette in Deep Dark Slate */}
          <g fill="#1D1D1F">
            {/* Leaf */}
            <path d="M 105 18 C 112 9, 123 3, 134 3 C 135 15, 130 26, 123 33 C 117 41, 105 46, 95 45 C 93 33, 100 23, 105 18 Z" />
            {/* Apple Body with Bite */}
            <path d="M 134 88 C 134 68, 150 58, 151 57 C 141 43, 126 41, 121 40 C 108 39, 96 48, 89 48 C 82 48, 72 40, 62 40 C 47 40, 34 49, 26 63 C 10 91, 22 132, 38 153 C 45 164, 54 176, 66 175 C 77 175, 82 168, 96 168 C 109 168, 113 175, 125 175 C 138 175, 145 164, 153 153 C 162 140, 166 127, 166 126 C 165 125, 134 113, 134 88 Z" />
          </g>
        </svg>
      );

    case 'msi':
      return (
        <svg
          viewBox="0 0 140 40"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="MSI Official Logo"
        >
          {/* Bold Angular MSI Red #E10600 */}
          <g fill="#E10600">
            {/* M */}
            <path d="M 5 35 L 5 5 L 14 5 L 25 24 L 36 5 L 45 5 L 45 35 L 36 35 L 36 15 L 26 31 L 23 31 L 14 15 L 14 35 Z" />
            {/* S */}
            <path d="M 55 25 L 63 25 C 64 28, 68 30, 74 30 C 80 30, 84 27, 84 23 C 84 19, 79 17, 72 15 C 62 12, 55 9, 55 2 C 55 -4, 63 -8, 73 -8" transform="translate(0, 8)" />
            <path d="M 54 26 C 54 32, 61 36, 72 36 C 83 36, 91 31, 91 24 C 91 16, 81 14, 73 13 C 65 11, 63 9, 63 7 C 63 4, 67 3, 72 3 C 78 3, 82 5, 83 9 L 91 7 C 89 2, 82 -2, 72 -2 C 62 -2, 54 2, 54 8 C 54 15, 64 18, 71 19 C 80 20, 82 22, 82 25 C 82 29, 77 31, 72 31 C 65 31, 61 28, 61 24 Z" />
            {/* I */}
            <path d="M 99 5 L 108 5 L 108 35 L 99 35 Z" />
            {/* Gaming Red Dot / Triangle */}
            <polygon points="118,5 128,5 123,14" fill="#E10600" />
          </g>
        </svg>
      );

    case 'toshiba':
      return (
        <svg
          viewBox="0 0 160 30"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Toshiba Official Logo"
        >
          <text
            x="0"
            y="24"
            fill="#FF0000"
            fontFamily="'Arial Black', 'Helvetica Black', sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="1.5"
          >
            TOSHIBA
          </text>
        </svg>
      );

    case 'samsung':
      return (
        <svg
          viewBox="0 0 180 44"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Samsung Official Logo"
        >
          {/* Iconic Blue Ellipse #034EA2 tilted */}
          <ellipse cx="90" cy="22" rx="86" ry="20" transform="rotate(-8 90 22)" fill="#034EA2" />
          <text
            x="90"
            y="28"
            fill="#FFFFFF"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="18"
            textAnchor="middle"
            letterSpacing="2.5"
          >
            SAMSUNG
          </text>
        </svg>
      );

    // -------------------------------------------------------------
    // PRINTER BRANDS
    // -------------------------------------------------------------
    case 'canon':
      return (
        <svg
          viewBox="0 0 150 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Canon Official Logo"
        >
          <text
            x="2"
            y="28"
            fill="#BC002D"
            fontFamily="'Times New Roman', 'Georgia', serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="-0.5"
            style={{ fontStyle: 'normal' }}
          >
            Canon
          </text>
        </svg>
      );

    case 'epson':
      return (
        <svg
          viewBox="0 0 150 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Epson Official Logo"
        >
          <text
            x="2"
            y="28"
            fill="#003399"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="30"
            letterSpacing="2"
          >
            EPSON
          </text>
        </svg>
      );

    case 'brother':
      return (
        <svg
          viewBox="0 0 150 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Brother Official Logo"
        >
          <text
            x="2"
            y="27"
            fill="#1F3582"
            fontFamily="'Arial', sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="1"
          >
            brother
          </text>
        </svg>
      );

    case 'pantum':
      return (
        <svg
          viewBox="0 0 150 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Pantum Official Logo"
        >
          <g transform="translate(4, 4)">
            <circle cx="14" cy="14" r="12" fill="#D71920" />
            <path d="M 10 8 L 16 8 C 19 8, 20 10, 20 12 C 20 14, 19 16, 16 16 L 12 16 L 12 21 L 10 21 Z M 12 10 L 12 14 L 15 14 C 17 14, 18 13, 18 12 C 18 11, 17 10, 15 10 Z" fill="#FFFFFF" />
          </g>
          <text
            x="38"
            y="26"
            fill="#D71920"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="22"
            letterSpacing="1.5"
          >
            PANTUM
          </text>
        </svg>
      );

    case 'kyocera':
      return (
        <svg
          viewBox="0 0 160 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Kyocera Official Logo"
        >
          {/* Kyocera 4 Red Rhombus Jewels */}
          <g fill="#E60012" transform="translate(4, 6) scale(0.7)">
            <polygon points="16,0 30,14 16,28 2,14" />
            <polygon points="16,6 24,14 16,22 8,14" fill="#FFFFFF" />
            <polygon points="16,10 20,14 16,18 12,14" fill="#E60012" />
          </g>
          <text
            x="34"
            y="26"
            fill="#231F20"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="0.8"
          >
            KYOCERA
          </text>
        </svg>
      );

    case 'xerox':
      return (
        <svg
          viewBox="0 0 140 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Xerox Official Logo"
        >
          {/* Red Xerox Ball with White Cross */}
          <circle cx="16" cy="18" r="14" fill="#ED1C24" />
          <path d="M 8 10 L 24 26 M 24 10 L 8 26" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <text
            x="36"
            y="26"
            fill="#ED1C24"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="22"
            letterSpacing="1"
          >
            xerox
          </text>
        </svg>
      );

    case 'ricoh':
      return (
        <svg
          viewBox="0 0 140 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Ricoh Official Logo"
        >
          <text
            x="2"
            y="27"
            fill="#CF102D"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="2.5"
          >
            RICOH
          </text>
        </svg>
      );

    // -------------------------------------------------------------
    // CCTV SECURITY BRANDS
    // -------------------------------------------------------------
    case 'hikvision':
      return (
        <svg
          viewBox="0 0 170 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Hikvision Official Logo"
        >
          {/* HIK in Red, VISION in Dark Slate */}
          <text
            x="0"
            y="26"
            fill="#E60012"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="0.5"
          >
            HIK
          </text>
          <text
            x="52"
            y="26"
            fill="#231F20"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="0.5"
          >
            VISION
          </text>
          {/* Red square accent dot */}
          <rect x="156" y="8" width="6" height="6" fill="#E60012" />
        </svg>
      );

    case 'dahua':
      return (
        <svg
          viewBox="0 0 160 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Dahua Official Logo"
        >
          {/* Red Dahua Lettering */}
          <text
            x="2"
            y="22"
            fill="#D71920"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="22"
            letterSpacing="0.5"
          >
            alhua
          </text>
          <text
            x="0"
            y="22"
            fill="#D71920"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="22"
          >
            d
          </text>
          <text
            x="2"
            y="32"
            fill="#1E3A8A"
            fontFamily="'Arial', sans-serif"
            fontWeight="800"
            fontSize="8"
            letterSpacing="2"
          >
            TECHNOLOGY
          </text>
        </svg>
      );

    case 'cp plus':
      return (
        <svg
          viewBox="0 0 160 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="CP PLUS Official Logo"
        >
          {/* Red Badge with Plus */}
          <g transform="translate(2, 6)">
            <circle cx="12" cy="12" r="11" fill="#ED1C24" />
            <path d="M 8 12 L 16 12 M 12 8 L 12 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </g>
          <text
            x="32"
            y="25"
            fill="#ED1C24"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="20"
            letterSpacing="0.5"
          >
            CP PLUS
          </text>
        </svg>
      );

    case 'unv':
      return (
        <svg
          viewBox="0 0 140 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="UNV Official Logo"
        >
          <text
            x="2"
            y="26"
            fill="#0070BA"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="3"
          >
            unv
          </text>
          <circle cx="78" cy="10" r="3" fill="#0070BA" />
        </svg>
      );

    case 'zebronics':
      return (
        <svg
          viewBox="0 0 160 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Zebronics Official Logo"
        >
          {/* Orange Stylized Z */}
          <polygon points="4,8 20,8 8,26 24,26" stroke="#FF6600" strokeWidth="4" strokeLinejoin="round" fill="none" />
          <text
            x="30"
            y="24"
            fill="#231F20"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="18"
            letterSpacing="0.8"
          >
            ZEBRONICS
          </text>
        </svg>
      );

    case 'godrej':
      return (
        <svg
          viewBox="0 0 140 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Godrej Official Logo"
        >
          {/* Iconic Crimson Godrej Signature Script */}
          <text
            x="4"
            y="27"
            fill="#B80000"
            fontFamily="'Caveat', 'Brush Script MT', cursive, sans-serif"
            fontWeight="700"
            fontSize="34"
            letterSpacing="1"
            fontStyle="italic"
          >
            Godrej
          </text>
        </svg>
      );

    case 'honeywell':
      return (
        <svg
          viewBox="0 0 160 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Honeywell Official Logo"
        >
          <text
            x="2"
            y="26"
            fill="#E51937"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="23"
            letterSpacing="-0.5"
          >
            Honeywell
          </text>
        </svg>
      );

    case 'ezviz':
      return (
        <svg
          viewBox="0 0 140 36"
          className={`${heightClass} ${className} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="EZVIZ Official Logo"
        >
          {/* EZVIZ Cyan & Orange Smart Security Logo */}
          <text
            x="2"
            y="26"
            fill="#0099FF"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="25"
            letterSpacing="1"
          >
            EZ
          </text>
          <text
            x="44"
            y="26"
            fill="#FF7700"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="25"
            letterSpacing="1"
          >
            VIZ
          </text>
        </svg>
      );

    // Fallback if not matched
    default:
      return (
        <span className="font-bold text-slate-800 text-xs tracking-wider uppercase">
          {name}
        </span>
      );
  }
};
