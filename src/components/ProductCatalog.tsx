import React, { useState, useMemo } from 'react';
import { 
  Laptop, 
  Printer, 
  Camera, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Search, 
  Plus, 
  Check, 
  Info, 
  Star, 
  Filter, 
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  Images
} from 'lucide-react';
import { Product, CategoryType } from '../types';
import { useAdmin } from '../context/AdminContext';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

// Sub-component for individual product card with 4:3 fit frame & multi-image switcher
const CatalogProductCard: React.FC<{
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  addedProductId: string | null;
  handleAdd: (product: Product) => void;
  getProductIcon: (category: string) => React.ElementType;
}> = ({
  product,
  onOpenQuickView,
  onEditProduct,
  onDeleteProduct,
  addedProductId,
  handleAdd,
  getProductIcon,
}) => {
  const { isAdmin } = useAdmin();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Extract all available images (from images array or imageUrl)
  const productImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.filter(Boolean);
    }
    if (product.imageUrl) {
      return [product.imageUrl];
    }
    return [];
  }, [product.images, product.imageUrl]);

  const currentImage = productImages[activeImageIdx] || productImages[0];
  const IconComponent = getProductIcon(product.category);
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden">
      {/* 4:3 Aspect Ratio Image Frame - Full Size Display Fit to Frame */}
      {currentImage ? (
        <div 
          onClick={() => onOpenQuickView(product)}
          className="relative aspect-[4/3] w-full bg-slate-50/90 overflow-hidden flex items-center justify-center border-b border-slate-100 cursor-pointer group/frame"
        >
          {/* Full Size Image Fit to Frame (Zero Cropping) */}
          <img
            src={currentImage}
            alt={`${product.name} - View ${activeImageIdx + 1}`}
            className="w-full h-full object-contain p-3 group-hover/frame:scale-105 transition-transform duration-300 select-none"
            referrerPolicy="no-referrer"
          />

          {/* Top Bar inside card visual */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs border border-slate-200/80">
              {product.brand}
            </span>

            <div className="flex items-center gap-1.5">
              {productImages.length > 1 && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-700 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md shadow-xs border border-slate-200/80">
                  <Images className="w-3 h-3 text-sky-600" />
                  <span>{activeImageIdx + 1}/{productImages.length}</span>
                </span>
              )}

              {product.badge && (
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/95 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-300 shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Multi-Image Previous / Next Arrows (Visible on hover or mobile) */}
          {productImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center opacity-0 group-hover/frame:opacity-100 transition-opacity z-20 cursor-pointer"
                title="Previous photo"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center opacity-0 group-hover/frame:opacity-100 transition-opacity z-20 cursor-pointer"
                title="Next photo"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots Indicator inside 4:3 frame */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-slate-900/40 backdrop-blur-xs px-2 py-1 rounded-full pointer-events-auto">
                {productImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx(dotIdx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      dotIdx === activeImageIdx
                        ? 'w-4 bg-white'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Bottom Strip inside visual */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] z-10 pointer-events-none">
            <span className="font-mono tabular-nums bg-slate-900/80 text-white px-2 py-0.5 rounded backdrop-blur-xs shadow-xs">
              Save {discountPercentage}%
            </span>
            <span className="flex items-center gap-1 bg-slate-900/80 text-white px-2 py-0.5 rounded backdrop-blur-xs shadow-xs font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold tabular-nums">{product.rating}</span>
              <span className="text-white/70">({product.reviewsCount})</span>
            </span>
          </div>
        </div>
      ) : (
        /* Fallback Graphic Canvas (Still in exact 4:3 frame) */
        <div 
          onClick={() => onOpenQuickView(product)}
          className={`relative aspect-[4/3] w-full bg-gradient-to-br ${product.gradient} p-4 flex flex-col justify-between overflow-hidden text-white cursor-pointer`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="relative flex items-center justify-between z-10">
            <span className="text-xs font-bold tracking-wider uppercase text-white/90 bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-md">
              {product.brand}
            </span>

            {product.badge && (
              <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-400/30">
                {product.badge}
              </span>
            )}
          </div>

          <div className="relative my-auto flex flex-col items-center justify-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <IconComponent className="w-7 h-7 text-white" />
            </div>
            <span className="text-[11px] text-white/75 mt-2 font-medium">Click to view specs</span>
          </div>

          <div className="relative flex items-center justify-between text-[11px] text-white/80 z-10">
            <span className="font-mono tabular-nums">Save {discountPercentage}%</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-white tabular-nums">{product.rating}</span>
              <span className="text-white/60">({product.reviewsCount})</span>
            </span>
          </div>
        </div>
      )}

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 font-semibold">In Stock</span>
          </div>

          <h3 
            onClick={() => onOpenQuickView(product)}
            className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Key Specs Breakdown */}
          <div className="mt-3 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-600">
            {Object.entries(product.specs)
              .slice(0, 3)
              .map(([key, val]) => (
                <div key={key} className="flex justify-between items-baseline gap-2 truncate">
                  <span className="text-slate-400 shrink-0 font-medium">{key}:</span>
                  <span className="text-slate-800 font-medium truncate text-right">{val}</span>
                </div>
              ))}
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mt-2.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Purchase Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400 line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums leading-none">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onOpenQuickView(product)}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="View Full Technical Specifications & Gallery"
              aria-label="View Full Technical Specifications & Gallery"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {isAdmin && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProduct(product);
                  }}
                  className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                  title="Edit Product Details & Images (Admin)"
                  aria-label="Edit Product Details & Images"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                {confirmDelete ? (
                  <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-lg p-0.5 animate-in fade-in duration-150">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProduct(product.id);
                        setConfirmDelete(false);
                      }}
                      className="px-2 py-0.5 text-[11px] font-bold bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
                      title="Confirm Delete"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(false);
                      }}
                      className="px-1.5 py-0.5 text-[11px] text-slate-600 hover:text-slate-900 cursor-pointer"
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Product (Admin)"
                    aria-label="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </>
            )}

            <button
              onClick={() => handleAdd(product)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ml-1 ${
                addedProductId === product.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
              }`}
            >
              {addedProductId === product.id ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onOpenQuickView,
  selectedCategory,
  onSelectCategory,
  onOpenAddProduct,
  onEditProduct,
  onDeleteProduct,
  searchQuery,
  onSearchChange,
}) => {
  const { isAdmin } = useAdmin();
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories: { id: CategoryType; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Hardware', icon: SlidersHorizontal },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'desktops', label: 'Desktops & Rigs', icon: Cpu },
    { id: 'printers', label: 'Printers', icon: Printer },
    { id: 'cctv', label: 'CCTV Surveillance', icon: Camera },
    { id: 'accessories', label: 'Upgrades & SSDs', icon: HardDrive },
    { id: 'amc', label: 'AMC & CarePlans', icon: ShieldCheck },
  ];

  // Distinct brand list
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => brands.add(p.brand));
    return ['all', ...Array.from(brands)];
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesBrand && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'laptops':
        return Laptop;
      case 'desktops':
        return Cpu;
      case 'printers':
        return Printer;
      case 'cctv':
        return Camera;
      case 'amc':
        return ShieldCheck;
      default:
        return HardDrive;
    }
  };

  return (
    <section id="catalog" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1.5">
              <span>Direct Store Inventory</span>
              <span>·</span>
              <span>Online Ordering &amp; In-Store Pickup</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Featured Systems, Hardware &amp; Security
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Select any system for immediate doorstep delivery in Ballari or visit our store beside UCO Bank. All hardware ships sealed with official manufacturer warranty.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="font-semibold text-slate-900 tabular-nums">{filteredProducts.length}</span>
              <span>products</span>
            </div>

            {isAdmin && (
              <button
                onClick={onOpenAddProduct}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-sm shadow-sky-600/20 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Search & Brand Filtering Strip */}
        <div className="bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200/80 mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by model, brand, processor, SSD, CCTV camera..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls: Brand selector & Sort by */}
          <div className="flex items-center gap-2 shrink-0 overflow-x-auto pb-1 md:pb-0">
            {/* Brand Dropdown */}
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer shadow-2xs"
              >
                <option value="all">All Brands ({products.length})</option>
                {availableBrands.filter((b) => b !== 'all').map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-6 bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 flex-wrap">
            <span className="font-semibold text-sky-800">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-sky-200 text-sky-700 capitalize">
                Category: {selectedCategory}
              </span>
            )}
            {selectedBrand !== 'all' && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-sky-200 text-sky-700">
                Brand: {selectedBrand}
              </span>
            )}
            {searchQuery && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-sky-200 text-sky-700">
                Search: "{searchQuery}"
              </span>
            )}
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedBrand('all');
                onSearchChange('');
              }}
              className="text-sky-600 hover:text-sky-800 underline text-xs ml-auto cursor-pointer font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* No Results Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No matching products found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find hardware matching your search or filters. Try adjusting your search query or reset filters.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setSelectedBrand('all');
                  onSearchChange('');
                }}
                className="px-4 py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
              >
                Clear Filters
              </button>
              <button
                onClick={onOpenAddProduct}
                className="px-4 py-2 text-xs font-bold bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors shadow-xs"
              >
                + Add This Product
              </button>
            </div>
          </div>
        )}

        {/* Product Cards Grid - 4:3 Fit to Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <CatalogProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
              addedProductId={addedProductId}
              handleAdd={handleAdd}
              getProductIcon={getProductIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
