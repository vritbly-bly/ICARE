import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsPortfolio } from './components/ProjectsPortfolio';
import { LabShowcase } from './components/LabShowcase';
import { BrandSection } from './components/BrandSection';
import { ContactSection } from './components/ContactSection';
import { CustomerSupportChat } from './components/CustomerSupportChat';
import { Footer } from './components/Footer';
import { AddServiceModal } from './components/AddServiceModal';
import { HeaderBanner } from './components/HeaderBanner';
import { OfflineStoreShowcase } from './components/OfflineStoreShowcase';
import { FadeInSection } from './components/FadeInSection';
import { EditLogoModal } from './components/EditLogoModal';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ImportDataModal } from './components/ImportDataModal';
import { PublishSyncModal } from './components/PublishSyncModal';
import { useAdmin } from './context/AdminContext';
import { ServicePillar, Product } from './types';
import { SERVICE_PILLARS, CATALOG_DEFAULT_VERSION, DEFAULT_PAYMENT_CONFIG } from './data/mockData';
import { getPublishedSnapshot, REMOTE_SYNC_STORAGE_KEY, PublishedStoreSnapshot } from './utils/syncManager';

// Local storage keys for services versioning & deletion tombstoning
const STORAGE_SERVICES_KEY = 'icare_custom_services';
const STORAGE_DELETED_SERV_KEY = 'icare_deleted_service_ids';
const STORAGE_CATALOG_VERSION_KEY = 'icare_catalog_version';

export default function App() {
  const { isAdmin, openLoginModal } = useAdmin();

  // Global Capability Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Services State with LocalStorage Persistence
  const [services, setServices] = useState<ServicePillar[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SERVICES_KEY);
      if (saved) {
        const parsed: ServicePillar[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return SERVICE_PILLARS;
  });

  // Modals for Adding / Editing Services
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServicePillar | null>(null);
  const [isImportDataModalOpen, setIsImportDataModalOpen] = useState(false);

  // Active Navigation Section & Support Triggers
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [supportInitialTopic, setSupportInitialTopic] = useState<string | undefined>(undefined);

  // Edit Logo Modal State
  const [isEditLogoModalOpen, setIsEditLogoModalOpen] = useState(false);
  const [editLogoModalTab, setEditLogoModalTab] = useState<'store' | 'brands'>('store');
  const [editLogoBrandName, setEditLogoBrandName] = useState<string | undefined>(undefined);
  const [editLogoCategory, setEditLogoCategory] = useState<'laptops' | 'printers' | 'cctv' | undefined>(undefined);

  // 1-Click Publish & Visitor Sync Modal State
  const [isPublishSyncModalOpen, setIsPublishSyncModalOpen] = useState(false);

  const handleOpenPublishSync = () => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setIsPublishSyncModalOpen(true);
  };

  const handleSyncApplied = (snapshot: PublishedStoreSnapshot) => {
    if (snapshot.services) setServices(snapshot.services);
  };

  // Cross-tab and Live Visitor synchronization listeners
  useEffect(() => {
    const handleLiveSyncEvent = (e: any) => {
      const detail = e.detail as PublishedStoreSnapshot;
      if (detail && detail.services) {
        setServices(detail.services);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === REMOTE_SYNC_STORAGE_KEY && e.newValue) {
        try {
          const parsed: PublishedStoreSnapshot = JSON.parse(e.newValue);
          if (parsed.services) setServices(parsed.services);
        } catch {
          // ignore
        }
      }
    };

    const checkRemoteStoreConfig = async () => {
      try {
        const response = await fetch('/store-config.json?v=' + Date.now(), { cache: 'no-cache' });
        if (response.ok) {
          const remoteData = await response.json();
          if (remoteData && remoteData.services && Array.isArray(remoteData.services) && remoteData.services.length > 0) {
            const currentLocal = localStorage.getItem(REMOTE_SYNC_STORAGE_KEY);
            const currentTimestamp = currentLocal ? JSON.parse(currentLocal).publishedTimestamp || 0 : 0;
            if (!currentLocal || (remoteData.publishedTimestamp && remoteData.publishedTimestamp > currentTimestamp)) {
              setServices(remoteData.services);
              if (remoteData.bannerImageUrl) {
                localStorage.setItem('icare_custom_banner_image', remoteData.bannerImageUrl);
                window.dispatchEvent(new Event('icare_banner_updated'));
              }
              if (remoteData.storeLogoUrl) {
                localStorage.setItem('icare_custom_store_logo', remoteData.storeLogoUrl);
                window.dispatchEvent(new Event('icare_logo_updated'));
              }
            }
          }
        }
      } catch {
        // quiet fallback for offline or custom domain
      }
    };

    window.addEventListener('icare_live_sync_completed', handleLiveSyncEvent);
    window.addEventListener('storage', handleStorageChange);
    checkRemoteStoreConfig();

    return () => {
      window.removeEventListener('icare_live_sync_completed', handleLiveSyncEvent);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // IntersectionObserver ScrollSpy to automatically highlight active section in Header on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'offline-store', 'about', 'services', 'portfolio', 'lab', 'brands', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleOpenEditLogoModal = (
    tab: 'store' | 'brands' = 'store', 
    brandName?: string, 
    category?: 'laptops' | 'printers' | 'cctv'
  ) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setEditLogoModalTab(tab);
    setEditLogoBrandName(brandName);
    setEditLogoCategory(category);
    setIsEditLogoModalOpen(true);
  };

  // Reset or re-merge baseline services
  const handleResetCatalog = () => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    const deletedRaw = localStorage.getItem(STORAGE_DELETED_SERV_KEY);
    const deletedServiceIds = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);

    setServices((prev) => {
      const currentMap = new Map<string, ServicePillar>();
      prev.forEach((s) => currentMap.set(s.id, s));

      SERVICE_PILLARS.forEach((defaultServ) => {
        if (deletedServiceIds.has(defaultServ.id)) return;
        const existing = currentMap.get(defaultServ.id);
        if (!existing) {
          currentMap.set(defaultServ.id, defaultServ);
        } else if (!existing.protected) {
          currentMap.set(defaultServ.id, {
            ...defaultServ,
            version: Math.max(defaultServ.version || 1, existing.version || 1),
          });
        }
      });

      const merged = Array.from(currentMap.values());
      try {
        localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(merged));
      } catch {
        // ignore
      }
      return merged;
    });
  };

  // Bulk Import Handlers
  const handleImportItems = (
    _importedProducts: Product[],
    importedServices: ServicePillar[],
    replaceExisting: boolean
  ) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    const now = Date.now();

    if (importedServices.length > 0) {
      const protectedImported = importedServices.map((s, idx) => ({
        ...s,
        protected: true,
        last_updated: s.last_updated || now + idx,
        version: (s.version || 1),
      }));

      setServices((prev) => {
        let updated: ServicePillar[];
        if (replaceExisting) {
          updated = protectedImported;
        } else {
          const merged = [...prev];
          protectedImported.forEach((imp) => {
            const idx = merged.findIndex((s) => s.id === imp.id || s.title.toLowerCase() === imp.title.toLowerCase());
            if (idx >= 0) {
              merged[idx] = imp;
            } else {
              merged.push(imp);
            }
          });
          updated = merged;
        }

        try {
          localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    }
  };

  // SERVICE CRUD HANDLERS
  const handleOpenAddService = () => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setEditingService(null);
    setIsServiceModalOpen(true);
  };

  const handleEditService = (service: ServicePillar) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setEditingService(service);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (savedService: ServicePillar) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    const protectedService: ServicePillar = {
      ...savedService,
      protected: true,
      last_updated: Date.now(),
      version: (savedService.version || 0) + 1,
    };

    setServices((prev) => {
      const exists = prev.some((s) => s.id === protectedService.id);
      const updated = exists
        ? prev.map((s) => (s.id === protectedService.id ? protectedService : s))
        : [...prev, protectedService];

      try {
        localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(updated));
        const deletedRaw = localStorage.getItem(STORAGE_DELETED_SERV_KEY);
        if (deletedRaw) {
          const deletedIds: string[] = JSON.parse(deletedRaw);
          const filtered = deletedIds.filter((id) => id !== protectedService.id);
          localStorage.setItem(STORAGE_DELETED_SERV_KEY, JSON.stringify(filtered));
        }
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeleteService = (serviceId: string) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setServices((prev) => {
      const updated = prev.filter((s) => s.id !== serviceId);
      try {
        localStorage.setItem(STORAGE_SERVICES_KEY, JSON.stringify(updated));
        const deletedRaw = localStorage.getItem(STORAGE_DELETED_SERV_KEY);
        const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
        if (!deletedIds.includes(serviceId)) {
          deletedIds.push(serviceId);
          localStorage.setItem(STORAGE_DELETED_SERV_KEY, JSON.stringify(deletedIds));
        }
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Navigation Scrolling
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleCategorySelect = (category: string) => {
    if (category === 'lab') {
      scrollToSection('lab');
    } else if (category === 'portfolio') {
      scrollToSection('portfolio');
    } else if (category === 'contact') {
      scrollToSection('contact');
    } else if (category === 'sales' || category === 'store') {
      scrollToSection('offline-store');
    } else {
      scrollToSection('services');
    }
  };

  const handleOpenSupportWithTopic = (topic: string) => {
    setSupportInitialTopic(topic);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Admin Quick Toolbar (Visible only when authenticated as Admin) */}
      <AdminBar
        onOpenAddService={handleOpenAddService}
        onOpenEditLogo={() => handleOpenEditLogoModal('store')}
        onResetCatalog={handleResetCatalog}
        onOpenImportData={() => setIsImportDataModalOpen(true)}
        onOpenPublishSync={handleOpenPublishSync}
      />

      {/* Main Navigation Bar */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenEditLogoModal={handleOpenEditLogoModal}
        onOpenPublishSync={handleOpenPublishSync}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Official iCare Header Banner */}
        <HeaderBanner
          onSelectCategory={handleCategorySelect}
          onExploreCatalog={() => scrollToSection('offline-store')}
          onOpenPublishSync={handleOpenPublishSync}
        />

        {/* Hero Section with Enterprise Profile & Quick Actions */}
        <FadeInSection direction="up" duration={750} threshold={0.05} delay={30}>
          <Hero
            onExploreStoreSales={() => scrollToSection('offline-store')}
            onExplorePortfolio={() => scrollToSection('portfolio')}
            onExploreServices={() => scrollToSection('services')}
            onContactClick={() => scrollToSection('contact')}
            onSelectCategory={handleCategorySelect}
          />
        </FadeInSection>

        {/* Offline Store Sales & Multi-Brand Service Hub (Not an Online Store) */}
        <FadeInSection direction="up" duration={750} threshold={0.05} delay={30}>
          <OfflineStoreShowcase />
        </FadeInSection>

        {/* About Naga Reddy & iCare Business Story & Quantitative Stats */}
        <FadeInSection direction="up" duration={750} threshold={0.06} delay={30}>
          <AboutSection
            onConsultationClick={() => scrollToSection('contact')}
            onExplorePortfolio={() => scrollToSection('portfolio')}
          />
        </FadeInSection>

        {/* Core IT Pillars & Interactive Diagnostic Scope Estimator */}
        <FadeInSection direction="up" duration={750} threshold={0.06} delay={30}>
          <ServicesSection 
            services={services}
            onOpenSupportWithTopic={handleOpenSupportWithTopic}
            onOpenAddService={handleOpenAddService}
            onEditService={handleEditService}
            onDeleteService={handleDeleteService}
          />
        </FadeInSection>

        {/* Demonstrated Field Deployments & Case Studies Portfolio */}
        <FadeInSection direction="up" duration={750} threshold={0.06} delay={30}>
          <ProjectsPortfolio
            onContactProject={(projectTitle) => {
              setSupportInitialTopic(`Project Inquiry: ${projectTitle}`);
              scrollToSection('contact');
            }}
          />
        </FadeInSection>

        {/* Specialized Chip-Level Engineering Laboratory & Tools Showcase */}
        <FadeInSection direction="up" duration={750} threshold={0.06} delay={30}>
          <LabShowcase
            onScheduleLabVisit={() => scrollToSection('contact')}
          />
        </FadeInSection>

        {/* Authorized Brands Ecosystem & Testimonials */}
        <FadeInSection direction="up" duration={750} threshold={0.06} delay={30}>
          <BrandSection
            onSelectBrand={(brandName) => {
              setSearchQuery(brandName);
              scrollToSection('services');
            }}
            onOpenEditLogoModal={handleOpenEditLogoModal}
          />
        </FadeInSection>

        {/* Store Location, Map Reference & Technical Consultation Form */}
        <FadeInSection direction="up" duration={750} threshold={0.06} delay={30}>
          <ContactSection />
        </FadeInSection>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPublishSync={handleOpenPublishSync}
      />

      {/* Floating Technical Support Chat Widget */}
      <CustomerSupportChat
        initialTopic={supportInitialTopic}
        onNavigateToSection={scrollToSection}
      />

      {/* Add / Edit Service Modal with Image / Icon Upload */}
      <AddServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSaveService={handleSaveService}
        serviceToEdit={editingService}
      />

      {/* Edit Logos Modal */}
      <EditLogoModal
        isOpen={isEditLogoModalOpen}
        onClose={() => setIsEditLogoModalOpen(false)}
        initialTab={editLogoModalTab}
        initialBrandName={editLogoBrandName}
        initialCategory={editLogoCategory}
      />

      {/* Import Data Modal (JSON / URL) */}
      <ImportDataModal
        isOpen={isImportDataModalOpen}
        onClose={() => setIsImportDataModalOpen(false)}
        onImportData={handleImportItems}
        currentProducts={[]}
        currentServices={services}
      />

      {/* 1-Click Publish & Visitor Sync Modal */}
      <PublishSyncModal
        isOpen={isPublishSyncModalOpen}
        onClose={() => setIsPublishSyncModalOpen(false)}
        products={[]}
        services={services}
        paymentConfig={DEFAULT_PAYMENT_CONFIG}
        onSyncApplied={handleSyncApplied}
      />

      {/* Admin Passcode Login Modal */}
      <AdminLoginModal />
    </div>
  );
}
