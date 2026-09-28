import React, { useState, useEffect, useMemo } from 'react';
import { X, Check, ShieldCheck, Truck, RotateCcw, Plus, Phone, MessageSquare, Star, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Reset selected image index when product changes
  useEffect(() => {
    setSelectedImgIndex(0);
  }, [product?.id]);

  // Extract all available images
  const productImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images.filter(Boolean);
    }
    if (product.imageUrl) {
      return [product.imageUrl];
    }
    return [];
  }, [product]);

  if (!product) return null;

  const currentImage = productImages[selectedImgIndex] || productImages[0];

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const whatsappMessage = encodeURIComponent(
    `Hello Venkata Reddy sir, I am inquiring about *${product.name}* (Price: ₹${product.price.toLocaleString('en-IN')}) from iCare Computers website. Is this model available for delivery/pickup today?`
  );

  const handlePrevImage = () => {
    setSelectedImgIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImgIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-800">{product.brand}</span>
            <span>·</span>
            <span className="capitalize">{product.category}</span>
            <span>·</span>
            <span className="text-emerald-600 font-semibold">Available at Ballari Store</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Visual 4:3 Hero Frame & Multi-Image Carousel Panel */}
            <div className="md:col-span-5 space-y-3">
              {currentImage ? (
                <div>
                  {/* Main 4:3 Aspect Ratio Frame - Fit to Frame */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center group shadow-2xs">
                    <img
                      src={currentImage}
                      alt={`${product.name} - View ${selectedImgIndex + 1}`}
                      className="w-full h-full object-contain p-4 select-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10 pointer-events-none">
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-800 px-2.5 py-1 rounded-md shadow-xs border border-slate-200">
                        {product.brand} Official
                      </span>
                      {product.badge && (
                        <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/95 px-2 py-0.5 rounded border border-amber-300 shadow-xs">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Previous / Next Arrow Controls */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer z-20"
                          title="Previous photo"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer z-20"
                          title="Next photo"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Bottom Status Strip */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs z-10 pointer-events-none">
                      <span className="font-mono bg-slate-900/80 text-white px-2 py-0.5 rounded shadow-xs text-[11px]">
                        Save {discountPercentage}% Off MRP
                      </span>
                      <span className="flex items-center gap-1 bg-slate-900/80 text-white px-2 py-0.5 rounded shadow-xs text-[11px] font-medium">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Multi-Image Thumbnails Selector Row (4:3 Thumbnails) */}
                  {productImages.length > 1 && (
                    <div className="mt-2.5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span>Product Gallery ({productImages.length} photos)</span>
                        <span>Photo {selectedImgIndex + 1} of {productImages.length}</span>
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {productImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedImgIndex(idx)}
                            className={`relative aspect-[4/3] w-14 sm:w-16 rounded-xl overflow-hidden border-2 bg-white flex items-center justify-center p-1 transition-all cursor-pointer shrink-0 shadow-2xs ${
                              idx === selectedImgIndex
                                ? 'border-sky-600 ring-2 ring-sky-500/20'
                                : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback Graphic (4:3 Frame) */
                <div className={`aspect-[4/3] w-full rounded-2xl bg-gradient-to-br ${product.gradient} p-5 flex flex-col justify-between text-white relative shadow-inner overflow-hidden`}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-md">
                      {product.brand} Official
                    </span>
                    {product.badge && (
                      <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-400/30">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="my-auto text-center">
                    <div className="text-3xl font-extrabold font-heading opacity-90">
                      {product.brand}
                    </div>
                    <div className="text-xs text-white/80 mt-1 font-mono uppercase tracking-widest">
                      Hardware Verified
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/90 pt-2 border-t border-white/20">
                    <span className="font-mono">Save {discountPercentage}% Off MRP</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{product.rating}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Delivery trust badges */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Doorstep delivery available in Ballari</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{product.warranty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>7-Day Store Replacement Policy</span>
                </div>
              </div>
            </div>

            {/* Product Specifications & Details */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 line-through tabular-nums">
                    MRP: ₹{product.originalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    Inclusive of all GST &amp; Store Setup
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-lg">
                    In Stock in Store
                  </span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Technical Specifications
                </h3>
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 divide-y divide-slate-200/70 overflow-hidden text-xs">
                  {Object.entries(product.specs).map(([specKey, specVal]) => (
                    <div key={specKey} className="grid grid-cols-3 p-2.5">
                      <span className="text-slate-500 font-medium">{specKey}</span>
                      <span className="col-span-2 text-slate-900 font-semibold">{specVal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store & Direct Order Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Bag &amp; Order Online</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={STORE_INFO.whatsappUrl + `?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Call Store</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
