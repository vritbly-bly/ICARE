import { BrandEcosystem, BrandItem } from '../types';
import { BRAND_ECOSYSTEM } from '../data/mockData';

const STORAGE_KEY_ECOSYSTEM = 'icare_brand_ecosystem';
const STORAGE_KEY_LOGOS = 'icare_custom_brand_logos';

export const getBrandEcosystem = (): BrandEcosystem => {
  if (typeof window === 'undefined') return BRAND_ECOSYSTEM;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ECOSYSTEM);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.laptops && parsed.printers && parsed.cctv) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading brand ecosystem from localStorage:', e);
  }
  return BRAND_ECOSYSTEM;
};

export const saveBrandEcosystem = (ecosystem: BrandEcosystem): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ECOSYSTEM, JSON.stringify(ecosystem));
    window.dispatchEvent(new Event('icare_brand_logos_updated'));
  } catch (e) {
    console.error('Error saving brand ecosystem to localStorage:', e);
  }
};

export const getCustomBrandLogosMap = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LOGOS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading custom brand logos map:', e);
  }
  return {};
};

export const saveCustomBrandLogo = (brandName: string, logoUrl: string | null): void => {
  if (typeof window === 'undefined') return;
  try {
    const key = brandName.toLowerCase().trim();
    const map = getCustomBrandLogosMap();
    if (logoUrl) {
      map[key] = logoUrl;
    } else {
      delete map[key];
    }
    localStorage.setItem(STORAGE_KEY_LOGOS, JSON.stringify(map));
    window.dispatchEvent(new Event('icare_brand_logos_updated'));
  } catch (e) {
    console.error('Error saving custom brand logo:', e);
  }
};

export const addBrandToEcosystem = (
  category: 'laptops' | 'printers' | 'cctv',
  brandName: string,
  logoUrl?: string
): BrandEcosystem => {
  const cleanName = brandName.trim();
  if (!cleanName) return getBrandEcosystem();

  const current = getBrandEcosystem();
  const list = current[category] || [];

  // Check if brand already exists in this category
  const exists = list.some(b => b.name.toLowerCase() === cleanName.toLowerCase());
  let updatedList: BrandItem[];

  if (exists) {
    updatedList = list.map(b => b.name.toLowerCase() === cleanName.toLowerCase() ? { ...b, name: cleanName } : b);
  } else {
    updatedList = [...list, { name: cleanName, color: 'bg-slate-50 text-slate-800' }];
  }

  const updatedEcosystem: BrandEcosystem = {
    ...current,
    [category]: updatedList,
  };

  saveBrandEcosystem(updatedEcosystem);

  if (logoUrl) {
    saveCustomBrandLogo(cleanName, logoUrl);
  }

  return updatedEcosystem;
};

export const deleteBrandFromEcosystem = (
  category: 'laptops' | 'printers' | 'cctv',
  brandName: string
): BrandEcosystem => {
  const current = getBrandEcosystem();
  const list = current[category] || [];

  const updatedList = list.filter(b => b.name.toLowerCase() !== brandName.toLowerCase());
  const updatedEcosystem: BrandEcosystem = {
    ...current,
    [category]: updatedList,
  };

  saveBrandEcosystem(updatedEcosystem);

  // Also remove custom logo if present
  saveCustomBrandLogo(brandName, null);

  return updatedEcosystem;
};

export const resetBrandEcosystemToDefault = (): BrandEcosystem => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_ECOSYSTEM);
    localStorage.removeItem(STORAGE_KEY_LOGOS);
    window.dispatchEvent(new Event('icare_brand_logos_updated'));
  }
  return BRAND_ECOSYSTEM;
};
