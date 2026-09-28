import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Check, AlertCircle, Edit3, Image as ImageIcon, Star, Layers } from 'lucide-react';
import { Product, CategoryType } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (product: Product) => void;
  productToEdit?: Product | null;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
  productToEdit = null,
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('HP');
  const [category, setCategory] = useState<CategoryType>('laptops');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('New Arrival');
  const [warranty, setWarranty] = useState('1 Year Official Brand Warranty');
  
  // Multi-image state
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  
  // Dynamic Specifications
  const [specsList, setSpecsList] = useState<{ key: string; value: string }[]>([
    { key: 'Processor / Model', value: '' },
    { key: 'Memory (RAM)', value: '' },
    { key: 'Storage (SSD/HDD)', value: '' },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync with productToEdit whenever modal opens or item changes
  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setName(productToEdit.name);
        setBrand(productToEdit.brand);
        setCategory(productToEdit.category);
        setPrice(productToEdit.price.toString());
        setOriginalPrice(productToEdit.originalPrice ? productToEdit.originalPrice.toString() : '');
        setDescription(productToEdit.description || '');
        setBadge(productToEdit.badge || '');
        setWarranty(productToEdit.warranty || '1 Year Official Brand Warranty');
        
        // Multi-image population
        const existingImages = productToEdit.images && productToEdit.images.length > 0
          ? [...productToEdit.images]
          : (productToEdit.imageUrl ? [productToEdit.imageUrl] : []);
        setImages(existingImages);
        setUrlInput('');

        // Convert specs map into list
        if (productToEdit.specs && Object.keys(productToEdit.specs).length > 0) {
          setSpecsList(
            Object.entries(productToEdit.specs).map(([key, value]) => ({ key, value }))
          );
        } else {
          setSpecsList([{ key: 'Condition', value: 'Brand New' }]);
        }
      } else {
        // Reset to fresh defaults
        setName('');
        setBrand('HP');
        setCategory('laptops');
        setPrice('');
        setOriginalPrice('');
        setDescription('');
        setBadge('New Arrival');
        setWarranty('1 Year Official Brand Warranty');
        setImages([]);
        setUrlInput('');
        setImageMode('upload');
        setSpecsList([
          { key: 'Processor / Model', value: '' },
          { key: 'Memory (RAM)', value: '' },
          { key: 'Storage (SSD/HDD)', value: '' },
        ]);
      }
      setError(null);
    }
  }, [isOpen, productToEdit]);

  if (!isOpen) return null;

  // Handle single or multiple image uploads from file picker
  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    const newImages: string[] = [];
    let processedCount = 0;
    const totalFiles = files.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      if (file.size > 8 * 1024 * 1024) {
        setError(`File "${file.name}" exceeds 8MB limit.`);
        continue;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
        }
        processedCount++;
        if (processedCount === totalFiles) {
          setImages((prev) => [...prev, ...newImages]);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return;
    try {
      new URL(urlInput.trim());
      setImages((prev) => [...prev, urlInput.trim()]);
      setUrlInput('');
      setError(null);
    } catch {
      setError('Please enter a valid image web URL (e.g., https://example.com/image.jpg)');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSetPrimaryImage = (indexToPrimary: number) => {
    setImages((prev) => {
      const target = prev[indexToPrimary];
      const rest = prev.filter((_, i) => i !== indexToPrimary);
      return [target, ...rest];
    });
  };

  const handleAddSpecRow = () => {
    setSpecsList([...specsList, { key: '', value: '' }]);
  };

  const handleUpdateSpec = (index: number, field: 'key' | 'value', text: string) => {
    const updated = [...specsList];
    updated[index][field] = text;
    setSpecsList(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecsList(specsList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide a product title/name.');
      return;
    }
    const numPrice = Number(price);
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      setError('Please provide a valid selling price in ₹.');
      return;
    }
    const numOriginalPrice = originalPrice ? Number(originalPrice) : Math.round(numPrice * 1.15);

    // Build specs map
    const specsRecord: { [key: string]: string } = {};
    specsList.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specsRecord[s.key.trim()] = s.value.trim();
      }
    });

    const categoryGradients: { [key: string]: string } = {
      laptops: 'from-blue-600 to-indigo-800',
      desktops: 'from-purple-800 to-slate-900',
      printers: 'from-sky-700 to-blue-900',
      cctv: 'from-rose-700 to-red-950',
      accessories: 'from-emerald-700 to-teal-900',
      amc: 'from-amber-600 to-orange-800',
    };

    const cleanImages = images.filter(Boolean);
    const primaryImage = cleanImages[0] || (productToEdit?.imageUrl || undefined);

    const finalProduct: Product = {
      id: productToEdit ? productToEdit.id : `custom-prod-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim() || 'iCare Certified',
      category: category === 'all' ? 'laptops' : (category as any),
      price: numPrice,
      originalPrice: numOriginalPrice,
      rating: productToEdit?.rating || 5.0,
      reviewsCount: productToEdit?.reviewsCount || 1,
      inStock: productToEdit ? productToEdit.inStock : true,
      specs: Object.keys(specsRecord).length > 0 ? specsRecord : { 'Condition': 'Brand New Sealed', 'Availability': 'In Store & Delivery' },
      description: description.trim() || `${name} with official manufacturer bill and store warranty support in Ballari.`,
      badge: badge.trim() || undefined,
      tags: [brand, category, productToEdit ? 'Updated' : 'New Arrival'],
      warranty: warranty.trim() || '1 Year Store / Manufacturer Warranty',
      imageFallbackIcon: category === 'cctv' ? 'Camera' : category === 'printers' ? 'Printer' : 'Laptop',
      gradient: productToEdit?.gradient || categoryGradients[category] || 'from-sky-700 to-blue-900',
      imageUrl: primaryImage,
      images: cleanImages,
    };

    onSaveProduct(finalProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            {productToEdit ? (
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <Edit3 className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                <Plus className="w-4 h-4" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                {productToEdit ? 'Edit Product Details' : 'Add New Product to Store'}
              </h2>
              <p className="text-xs text-slate-500">
                {productToEdit ? `Updating information for ${productToEdit.name}` : 'Upload multiple photos, set 4:3 frame fit and publish to catalog'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Multiple Product Images Section (4:3 Size, Fit to Frame, Add/Edit/Delete) */}
          <div className="space-y-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Product Photos (4:3 Frame Fit)
                  </span>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    {images.length} {images.length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Images display full size fit inside a 4:3 frame. Add multiple angles (front, ports, box).
                </p>
              </div>

              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    imageMode === 'upload' ? 'bg-sky-600 font-semibold text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Upload Files
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    imageMode === 'url' ? 'bg-sky-600 font-semibold text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Add Web URL
                </button>
              </div>
            </div>

            {/* Hidden Multiple File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              onChange={handleImageFilesChange}
              className="hidden"
            />

            {imageMode === 'url' && (
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/product-photo.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  Add Photo
                </button>
              </div>
            )}

            {/* Image Gallery Grid - 4:3 Frame with Full Size Image Fit */}
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-200 hover:border-sky-400 bg-white flex items-center justify-center p-1.5 shadow-2xs group transition-all"
                  >
                    {/* Full Size Image - Fit to 4:3 Frame */}
                    <img
                      src={img}
                      alt={`Product photo ${idx + 1}`}
                      className="w-full h-full object-contain select-none"
                    />

                    {/* Primary Badge */}
                    {idx === 0 ? (
                      <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 z-10">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryImage(idx)}
                        className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 bg-slate-900/80 hover:bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs transition-opacity cursor-pointer z-10"
                        title="Set as primary cover photo"
                      >
                        Set Cover
                      </button>
                    )}

                    {/* Delete Photo Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-xs opacity-90 hover:opacity-100 transition-all cursor-pointer z-10"
                      title="Delete this photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Image Index Overlay */}
                    <div className="absolute bottom-1 right-1.5 text-[9px] font-mono text-slate-400 bg-white/80 px-1 rounded">
                      {idx + 1}/{images.length}
                    </div>
                  </div>
                ))}

                {/* Add More Photos Card in 4:3 Ratio */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-[4/3] border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-xl p-2 text-center cursor-pointer transition-colors bg-sky-50/50 hover:bg-sky-50 flex flex-col items-center justify-center text-sky-700 group"
                >
                  <Plus className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-[11px] font-bold leading-tight">Add More</span>
                  <span className="text-[9px] text-sky-500 font-medium">Select Files</span>
                </div>
              </div>
            ) : (
              /* Empty Dropzone for Initial Upload */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white hover:bg-sky-50/30 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Click to select multiple product photos
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Supports multiple files · 4:3 shape · Fit to frame · PNG, JPG, WEBP up to 8MB
                </p>
              </div>
            )}
          </div>

          {/* Product Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Product Title / Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dell Vostro 3520 Intel Core i5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dell, HP, Lenovo, ASUS, Epson"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
              >
                <option value="laptops">Laptops</option>
                <option value="desktops">Desktops &amp; Rigs</option>
                <option value="printers">Printers &amp; Toners</option>
                <option value="cctv">CCTV Surveillance</option>
                <option value="accessories">Upgrades &amp; SSDs</option>
                <option value="amc">AMC &amp; CarePlans</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Highlight Badge (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Best Seller, Gaming Special, 120Hz"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          {/* Pricing (Selling Price & Original MRP) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Selling Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="36490"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 text-xs font-mono border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Original MRP Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="43900"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 text-xs font-mono border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Warranty Terms */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Warranty &amp; Service Guarantee
            </label>
            <input
              type="text"
              placeholder="e.g. 1 Year Dell India On-Site Warranty + Store Setup"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Detailed Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief description of product features, included accessories, condition..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
            />
          </div>

          {/* Specifications Table Builder */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Hardware Specifications
              </label>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Spec Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {specsList.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. Processor, RAM)"
                    value={spec.key}
                    onChange={(e) => handleUpdateSpec(index, 'key', e.target.value)}
                    className="w-1/3 px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  <input
                    type="text"
                    placeholder="Details (e.g. 16GB DDR4 3200MHz)"
                    value={spec.value}
                    onChange={(e) => handleUpdateSpec(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  {specsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"
                      title="Remove this specification line"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-sm shadow-sky-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{productToEdit ? 'Save Changes' : 'Publish Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
