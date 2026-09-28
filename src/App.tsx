import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ServicesSection } from './components/ServicesSection';
import { BrandSection } from './components/BrandSection';
import { ContactSection } from './components/ContactSection';
import { CustomerSupportChat } from './components/CustomerSupportChat';
import { Footer } from './components/Footer';
import { AddProductModal } from './components/AddProductModal';
import { AddServiceModal } from './components/AddServiceModal';
import { PaymentQrModal } from './components/PaymentQrModal';
import { HeaderBanner } from './components/HeaderBanner';
import { EditLogoModal } from './components/EditLogoModal';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ImportDataModal } from './components/ImportDataModal';
import { DashboardModal } from './components/DashboardModal';
import { useAdmin } from './context/AdminContext';
import { Product, CartItem, Order, CategoryType, ServicePillar, PaymentConfig } from './types';
import { PRODUCTS, SERVICE_PILLARS, DEFAULT_PAYMENT_CONFIG, CATALOG_DEFAULT_VERSION } from './data/mockData';

// Local storage keys for robust versioning & deletion tombstoning
const STORAGE_PRODUCTS_KEY = 'icare_custom_products';
const STORAGE_SERVICES_KEY = 'icare_custom_services';
const STORAGE_DELETED_PROD_KEY = 'icare_deleted_product_ids';
const STORAGE_DELETED_SERV_KEY = 'icare_deleted_service_ids';
const STORAGE_CATALOG_VERSION_KEY = 'icare_catalog_version';

export default function App() {
  const { isAdmin, openLoginModal } = useAdmin();

  // Global Live Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Products State with LocalStorage Persistence & Version-aware initialization
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PRODUCTS_KEY);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return PRODUCTS;
  });

  // Services State with LocalStorage Persistence & Version-aware initialization
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

  // Store Payment QR / UPI Configuration with LocalStorage Persistence
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => {
    try {
      const saved = localStorage.getItem('icare_payment_config');
      if (saved) {
        return { ...DEFAULT_PAYMENT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PAYMENT_CONFIG;
  });

  const [isPaymentQrModalOpen, setIsPaymentQrModalOpen] = useState(false);

  // Modals for Adding / Editing Products & Services
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServicePillar | null>(null);
  const [isImportDataModalOpen, setIsImportDataModalOpen] = useState(false);

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: products[0] || PRODUCTS[0],
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Product Modals & Category Filtering
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [supportInitialTopic, setSupportInitialTopic] = useState<string | undefined>(undefined);

  // Edit Logo Modal State
  const [isEditLogoModalOpen, setIsEditLogoModalOpen] = useState(false);
  const [editLogoModalTab, setEditLogoModalTab] = useState<'store' | 'brands'>('store');
  const [editLogoBrandName, setEditLogoBrandName] = useState<string | undefined>(undefined);
  const [editLogoCategory, setEditLogoCategory] = useState<'laptops' | 'printers' | 'cctv' | undefined>(undefined);

  // Inventory Dashboard Modal State
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const handleOpenDashboard = () => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setIsDashboardModalOpen(true);
  };

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

  // Calculate live matching count for header
  const matchingProductsCount = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  ).length;

  // PAYMENT QR SAVE HANDLER
  const handleSavePaymentConfig = (newConfig: PaymentConfig) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setPaymentConfig(newConfig);
    try {
      localStorage.setItem('icare_payment_config', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  // PRODUCT CRUD HANDLERS
  const handleOpenAddProduct = () => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    // Automatically tag manual user edits & additions as 'protected'
    // and record the 'last_updated' timestamp and incremental version
    const protectedProduct: Product = {
      ...savedProduct,
      protected: true,
      last_updated: Date.now(),
      version: (savedProduct.version || 0) + 1,
    };

    setProducts((prev) => {
      const exists = prev.some((p) => p.id === protectedProduct.id);
      const updated = exists
        ? prev.map((p) => (p.id === protectedProduct.id ? protectedProduct : p))
        : [protectedProduct, ...prev];

      try {
        localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(updated));
        // Remove from deleted tombstones if it was previously deleted and recreated
        const deletedRaw = localStorage.getItem(STORAGE_DELETED_PROD_KEY);
        if (deletedRaw) {
          const deletedIds: string[] = JSON.parse(deletedRaw);
          const filtered = deletedIds.filter((id) => id !== protectedProduct.id);
          localStorage.setItem(STORAGE_DELETED_PROD_KEY, JSON.stringify(filtered));
        }
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(updated));
        // Track deleted product ID in persistent deletion tombstones so sync never resurrects deleted items
        const deletedRaw = localStorage.getItem(STORAGE_DELETED_PROD_KEY);
        const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
        if (!deletedIds.includes(productId)) {
          deletedIds.push(productId);
          localStorage.setItem(STORAGE_DELETED_PROD_KEY, JSON.stringify(deletedIds));
        }
      } catch {
        // ignore
      }
      return updated;
    });

    // Also remove from cart if present
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleResetCatalog = () => {
    // VERSIONED & PROTECTED CATALOG SYNC:
    // 1. NEVER overwrites any user edit tagged as 'protected' (custom pricing, specs, images, descriptions, titles).
    // 2. Checks 'last_updated' timestamps to ensure newer edits are permanently preserved.
    // 3. Honors deletion tombstones so intentionally deleted products or services are NEVER re-added.
    // 4. Safely updates non-protected default items only if the code catalog version has advanced.
    // 5. Adds brand new catalog additions from code without disturbing existing inventory.
    const deletedProductIds = new Set<string>();
    const deletedServiceIds = new Set<string>();
    try {
      const delProd = localStorage.getItem(STORAGE_DELETED_PROD_KEY);
      if (delProd) JSON.parse(delProd).forEach((id: string) => deletedProductIds.add(id));
      const delServ = localStorage.getItem(STORAGE_DELETED_SERV_KEY);
      if (delServ) JSON.parse(delServ).forEach((id: string) => deletedServiceIds.add(id));
    } catch {
      // ignore
    }

    setProducts((prev) => {
      const currentMap = new Map<string, Product>();
      prev.forEach((p) => currentMap.set(p.id, p));

      // Merge defaults intelligently
      PRODUCTS.forEach((defaultProd) => {
        // If user deleted this item, do NOT resurrect it
        if (deletedProductIds.has(defaultProd.id)) {
          return;
        }

        const existing = currentMap.get(defaultProd.id);
        if (!existing) {
          // Brand new item added to the codebase: append as non-protected default
          currentMap.set(defaultProd.id, defaultProd);
        } else if (existing.protected) {
          // USER EDITED ITEM: ABSOLUTELY DO NOT OVERWRITE
          // Preserve custom price, title, photos, specs, and last_updated
        } else {
          // Non-protected default item: update only if default has newer content
          currentMap.set(defaultProd.id, {
            ...defaultProd,
            version: Math.max(defaultProd.version || 1, existing.version || 1),
          });
        }
      });

      const merged = Array.from(currentMap.values());
      try {
        localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(merged));
        localStorage.setItem(STORAGE_CATALOG_VERSION_KEY, String(CATALOG_DEFAULT_VERSION));
      } catch {
        // ignore
      }
      return merged;
    });

    setServices((prev) => {
      const currentMap = new Map<string, ServicePillar>();
      prev.forEach((s) => currentMap.set(s.id, s));

      SERVICE_PILLARS.forEach((defaultServ) => {
        // If user deleted this service, do NOT resurrect it
        if (deletedServiceIds.has(defaultServ.id)) {
          return;
        }

        const existing = currentMap.get(defaultServ.id);
        if (!existing) {
          // Brand new service from codebase: append
          currentMap.set(defaultServ.id, defaultServ);
        } else if (existing.protected) {
          // USER EDITED SERVICE: ABSOLUTELY DO NOT OVERWRITE
        } else {
          // Update non-protected default service
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

  const handleImportBannerLogo = (bannerUrl: string | null, logoUrl: string | null) => {
    if (bannerUrl) {
      try {
        localStorage.setItem('icare_custom_banner_image', bannerUrl);
        window.dispatchEvent(new Event('icare_banner_updated'));
      } catch {
        // ignore
      }
    }
    if (logoUrl) {
      try {
        localStorage.setItem('icare_custom_store_logo', logoUrl);
        window.dispatchEvent(new Event('icare_logo_updated'));
      } catch {
        // ignore
      }
    }
  };

  // IMPORT DATA HANDLER (Link or File)
  const handleImportData = (
    importedProducts: Product[],
    importedServices: ServicePillar[],
    replaceExisting: boolean
  ) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }

    const now = Date.now();

    if (importedProducts.length > 0) {
      // Tag imported products as protected with timestamp
      const protectedImported = importedProducts.map((p, idx) => ({
        ...p,
        protected: true,
        last_updated: p.last_updated || now + idx,
        version: (p.version || 1),
      }));

      setProducts((prev) => {
        let updated: Product[];
        if (replaceExisting) {
          updated = protectedImported;
        } else {
          // Merge: replace items with matching id or name, append rest
          const merged = [...prev];
          protectedImported.forEach((imp) => {
            const idx = merged.findIndex((p) => p.id === imp.id || p.name.toLowerCase() === imp.name.toLowerCase());
            if (idx >= 0) {
              merged[idx] = imp;
            } else {
              merged.unshift(imp);
            }
          });
          updated = merged;
        }

        try {
          localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    }

    if (importedServices.length > 0) {
      // Tag imported services as protected with timestamp
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

    // Automatically tag manual user edits & additions as 'protected'
    // and record the 'last_updated' timestamp and incremental version
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
        // Remove from deleted tombstones if it was previously deleted and recreated
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
        // Track deleted service ID in persistent deletion tombstones so sync never resurrects deleted services
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

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'BALLARI500' || code === 'ICARE100') {
      setAppliedCoupon(code);
      return true;
    }
    return false;
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: Order) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    setCartItems([]); // Clear bag after successful order
    setAppliedCoupon(null);
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
    setSelectedCategory(category as CategoryType);
    scrollToSection('catalog');
  };

  const handleOpenSupportWithTopic = (topic: string) => {
    setSupportInitialTopic(topic);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cart discount calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2000 || cartItems.length === 0 ? 0 : 99;
  let discount = 0;
  if (appliedCoupon === 'BALLARI500' && subtotal >= 10000) {
    discount = 500;
  } else if (appliedCoupon === 'ICARE100' && subtotal >= 1000) {
    discount = 100;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Admin Quick Toolbar (Visible only when authenticated as Admin) */}
      <AdminBar
        onOpenAddProduct={handleOpenAddProduct}
        onOpenAddService={handleOpenAddService}
        onOpenPaymentQr={() => setIsPaymentQrModalOpen(true)}
        onOpenEditLogo={() => handleOpenEditLogoModal('store')}
        onResetCatalog={handleResetCatalog}
        onOpenImportData={() => setIsImportDataModalOpen(true)}
        onOpenDashboard={handleOpenDashboard}
      />

      {/* 3-Zone Sticky Navigation with Global Search Bar & Payment QR */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        matchingCount={searchQuery ? matchingProductsCount : undefined}
        onOpenPaymentQr={() => setIsPaymentQrModalOpen(true)}
        onOpenEditLogoModal={handleOpenEditLogoModal}
        onOpenDashboard={handleOpenDashboard}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Official iCare Header Banner - Perfectly Fit */}
        <HeaderBanner
          onSelectCategory={handleCategorySelect}
          onExploreCatalog={() => scrollToSection('catalog')}
        />

        {/* Hero Section with Clean Header & Quick Actions */}
        <Hero
          onExploreCatalog={() => scrollToSection('catalog')}
          onBookService={() => scrollToSection('services')}
          onSelectCategory={handleCategorySelect}
        />

        {/* Product Catalog & Online Ordering System (With Live Search, Add/Edit/Delete) */}
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(product) => setActiveQuickViewProduct(product)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenAddProduct={handleOpenAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 6 Core IT Pillars & Interactive Repair Cost Estimator (With Add/Edit/Delete) */}
        <ServicesSection 
          services={services}
          onOpenSupportWithTopic={handleOpenSupportWithTopic}
          onOpenAddService={handleOpenAddService}
          onEditService={handleEditService}
          onDeleteService={handleDeleteService}
        />

        {/* Authorized Brands Ecosystem & Testimonials */}
        <BrandSection
          onSelectBrand={(brandName) => {
            setSearchQuery(brandName);
            scrollToSection('catalog');
          }}
          onOpenEditLogoModal={handleOpenEditLogoModal}
        />

        {/* Store Location, Map Reference & Direct Callback Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPaymentQr={() => setIsPaymentQrModalOpen(true)}
        onOpenDashboard={handleOpenDashboard}
      />

      {/* Floating Customer Support Chat Widget */}
      <CustomerSupportChat
        initialTopic={supportInitialTopic}
        onNavigateToCatalog={() => scrollToSection('catalog')}
      />

      {/* Add / Edit Product Modal with Image Upload */}
      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSaveProduct={handleSaveProduct}
        productToEdit={editingProduct}
      />

      {/* Add / Edit Service Modal with Image / Icon Upload */}
      <AddServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSaveService={handleSaveService}
        serviceToEdit={editingService}
      />

      {/* Store Payment QR Modal (View & Upload / Customization) */}
      <PaymentQrModal
        isOpen={isPaymentQrModalOpen}
        onClose={() => setIsPaymentQrModalOpen(false)}
        paymentConfig={paymentConfig}
        onSavePaymentConfig={handleSavePaymentConfig}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Full Checkout Modal with Interactive Payment QR */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={discount}
        deliveryFee={deliveryFee}
        onOrderPlaced={handleOrderPlaced}
        paymentConfig={paymentConfig}
        onOpenPaymentQrModal={() => setIsPaymentQrModalOpen(true)}
      />

      {/* Order Confirmation Receipt with WhatsApp Direct Share and Payment QR */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        paymentConfig={paymentConfig}
        onOpenPaymentQrModal={() => setIsPaymentQrModalOpen(true)}
      />

      {/* Product Quick View / Full Specs Modal */}
      <ProductDetailModal
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Upload & Customize Store or Brand Partner Logos Modal */}
      <EditLogoModal
        isOpen={isEditLogoModalOpen}
        onClose={() => setIsEditLogoModalOpen(false)}
        initialTab={editLogoModalTab}
        initialBrandName={editLogoBrandName}
        initialCategory={editLogoCategory}
      />

      {/* Import Data Modal (Link Auto-Fill, JSON File Upload, and Backup Export) */}
      <ImportDataModal
        isOpen={isImportDataModalOpen}
        onClose={() => setIsImportDataModalOpen(false)}
        onImportData={handleImportData}
        currentProducts={products}
        currentServices={services}
        onImportBannerLogo={handleImportBannerLogo}
      />

      {/* Admin Visual Inventory & Analytics Dashboard (Recharts) */}
      <DashboardModal
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
        products={products}
        services={services}
        onSelectCategory={handleCategorySelect}
        onOpenAddProduct={handleOpenAddProduct}
        onOpenAddService={handleOpenAddService}
      />

      {/* Admin Authentication & Passcode Modal */}
      <AdminLoginModal />
    </div>
  );
}
