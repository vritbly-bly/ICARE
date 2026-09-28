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
import { useAdmin } from './context/AdminContext';
import { Product, CartItem, Order, CategoryType, ServicePillar, PaymentConfig } from './types';
import { PRODUCTS, SERVICE_PILLARS, DEFAULT_PAYMENT_CONFIG } from './data/mockData';

export default function App() {
  const { isAdmin, openLoginModal } = useAdmin();

  // Global Live Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Products State with LocalStorage Persistence & Live Default Sync
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('icare_custom_products');
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

  // Services State with LocalStorage Persistence & Live Default Sync
  const [services, setServices] = useState<ServicePillar[]>(() => {
    try {
      const saved = localStorage.getItem('icare_custom_services');
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
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === savedProduct.id);
      const updated = exists
        ? prev.map((p) => (p.id === savedProduct.id ? savedProduct : p))
        : [savedProduct, ...prev];

      try {
        localStorage.setItem('icare_custom_products', JSON.stringify(updated));
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
        localStorage.setItem('icare_custom_products', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Also remove from cart if present
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleResetCatalog = () => {
    // Non-destructive sync:
    // Preserves any custom added products, custom prices, custom images, and user modifications,
    // while bringing in any new code defaults that don't yet exist in the store catalog.
    setProducts((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const existingNames = new Set(prev.map((p) => p.name.toLowerCase().trim()));
      
      const missingDefaults = PRODUCTS.filter(
        (dp) => !existingIds.has(dp.id) && !existingNames.has(dp.name.toLowerCase().trim())
      );

      const merged = [...prev, ...missingDefaults];
      try {
        localStorage.setItem('icare_custom_products', JSON.stringify(merged));
      } catch {
        // ignore
      }
      return merged;
    });

    setServices((prev) => {
      const existingIds = new Set(prev.map((s) => s.id));
      const existingTitles = new Set(prev.map((s) => s.title.toLowerCase().trim()));

      const missingDefaults = SERVICE_PILLARS.filter(
        (ds) => !existingIds.has(ds.id) && !existingTitles.has(ds.title.toLowerCase().trim())
      );

      const merged = [...prev, ...missingDefaults];
      try {
        localStorage.setItem('icare_custom_services', JSON.stringify(merged));
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

    if (importedProducts.length > 0) {
      setProducts((prev) => {
        let updated: Product[];
        if (replaceExisting) {
          updated = importedProducts;
        } else {
          // Merge: replace items with matching id or name, append rest
          const merged = [...prev];
          importedProducts.forEach((imp) => {
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
          localStorage.setItem('icare_custom_products', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    }

    if (importedServices.length > 0) {
      setServices((prev) => {
        let updated: ServicePillar[];
        if (replaceExisting) {
          updated = importedServices;
        } else {
          const merged = [...prev];
          importedServices.forEach((imp) => {
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
          localStorage.setItem('icare_custom_services', JSON.stringify(updated));
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
    setServices((prev) => {
      const exists = prev.some((s) => s.id === savedService.id);
      const updated = exists
        ? prev.map((s) => (s.id === savedService.id ? savedService : s))
        : [...prev, savedService];

      try {
        localStorage.setItem('icare_custom_services', JSON.stringify(updated));
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
        localStorage.setItem('icare_custom_services', JSON.stringify(updated));
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

      {/* Admin Authentication & Passcode Modal */}
      <AdminLoginModal />
    </div>
  );
}
