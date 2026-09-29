import { Product, ServicePillar, PaymentConfig, BrandEcosystem } from '../types';
import { PRODUCTS, SERVICE_PILLARS, DEFAULT_PAYMENT_CONFIG, BRAND_ECOSYSTEM, STORE_INFO } from '../data/mockData';
import { getBrandEcosystem, getCustomBrandLogosMap } from './brandManager';

export const REMOTE_SYNC_STORAGE_KEY = 'icare_published_live_snapshot';
export const SYNC_REMOTE_CONFIG_PATH = '/store-config.json';

export interface PublishedStoreSnapshot {
  version: number;
  publishedAt: string;
  publishedTimestamp: number;
  products: Product[];
  services: ServicePillar[];
  paymentConfig: PaymentConfig;
  storeLogoUrl: string | null;
  bannerImageUrl: string | null;
  brandEcosystem: BrandEcosystem;
  customBrandLogos: Record<string, string>;
  source?: string;
}

/**
 * Reads all active custom modifications made by the admin in this browser.
 */
export const getActiveAdminStoreData = (): PublishedStoreSnapshot => {
  let products = PRODUCTS;
  let services = SERVICE_PILLARS;
  let paymentConfig = DEFAULT_PAYMENT_CONFIG;
  let storeLogoUrl: string | null = null;
  let bannerImageUrl: string | null = null;

  if (typeof window !== 'undefined') {
    try {
      const savedProd = localStorage.getItem('icare_custom_products');
      if (savedProd) {
        const parsed = JSON.parse(savedProd);
        if (Array.isArray(parsed) && parsed.length > 0) products = parsed;
      }
    } catch {
      // ignore
    }

    try {
      const savedServ = localStorage.getItem('icare_custom_services');
      if (savedServ) {
        const parsed = JSON.parse(savedServ);
        if (Array.isArray(parsed) && parsed.length > 0) services = parsed;
      }
    } catch {
      // ignore
    }

    try {
      const savedPay = localStorage.getItem('icare_payment_config');
      if (savedPay) {
        paymentConfig = { ...DEFAULT_PAYMENT_CONFIG, ...JSON.parse(savedPay) };
      }
    } catch {
      // ignore
    }

    try {
      storeLogoUrl = localStorage.getItem('icare_custom_store_logo') || STORE_INFO.defaultLogoUrl || null;
      bannerImageUrl = localStorage.getItem('icare_custom_banner_image') || null;
    } catch {
      // ignore
    }
  }

  const brandEcosystem = getBrandEcosystem();
  const customBrandLogos = getCustomBrandLogosMap();

  return {
    version: Date.now(),
    publishedAt: new Date().toISOString(),
    publishedTimestamp: Date.now(),
    products,
    services,
    paymentConfig,
    storeLogoUrl,
    bannerImageUrl,
    brandEcosystem,
    customBrandLogos,
    source: 'iCare Admin Hub',
  };
};

/**
 * Retrieves the published snapshot stored locally or initialized
 */
export const getPublishedSnapshot = (): PublishedStoreSnapshot | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(REMOTE_SYNC_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return null;
};

/**
 * Saves the active admin data as the published snapshot, triggers system events,
 * and sets up cross-tab / cross-visitor syncing.
 */
export const publishStoreChangesToLive = (snapshot?: PublishedStoreSnapshot): PublishedStoreSnapshot => {
  const data = snapshot || getActiveAdminStoreData();
  data.publishedAt = new Date().toISOString();
  data.publishedTimestamp = Date.now();

  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(REMOTE_SYNC_STORAGE_KEY, serialized);

      // Ensure standard localstorage keys are also perfectly mirrored
      localStorage.setItem('icare_custom_products', JSON.stringify(data.products));
      localStorage.setItem('icare_custom_services', JSON.stringify(data.services));
      localStorage.setItem('icare_payment_config', JSON.stringify(data.paymentConfig));
      if (data.storeLogoUrl) {
        localStorage.setItem('icare_custom_store_logo', data.storeLogoUrl);
      }
      if (data.bannerImageUrl) {
        localStorage.setItem('icare_custom_banner_image', data.bannerImageUrl);
      }
      localStorage.setItem('icare_brand_ecosystem', JSON.stringify(data.brandEcosystem));
      localStorage.setItem('icare_custom_brand_logos', JSON.stringify(data.customBrandLogos));

      // Dispatch global events for instant reactive UI updates
      window.dispatchEvent(new Event('icare_banner_updated'));
      window.dispatchEvent(new Event('icare_logo_updated'));
      window.dispatchEvent(new Event('icare_brand_logos_updated'));
      window.dispatchEvent(new CustomEvent('icare_live_sync_completed', { detail: data }));
    } catch (e) {
      console.error('Failed to store live snapshot:', e);
    }
  }

  return data;
};

/**
 * Generates an automated commit & push script / command instructions for GitHub
 */
export const generateGitHubSyncInfo = () => {
  return {
    deployWorkflow: '.github/workflows/deploy.yml',
    pagesBranch: 'main',
    storeConfigFilename: 'public/store-config.json',
  };
};
