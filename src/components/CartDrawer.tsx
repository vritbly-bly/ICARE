import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Local delivery policy: Free above ₹2,000 in Ballari
  const deliveryFee = subtotal >= 2000 || items.length === 0 ? 0 : 99;
  
  // Discount logic
  let discount = 0;
  if (appliedCoupon === 'BALLARI500' && subtotal >= 10000) {
    discount = 500;
  } else if (appliedCoupon === 'ICARE100' && subtotal >= 1000) {
    discount = 100;
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'BALLARI500' && subtotal < 10000) {
      setCouponError('BALLARI500 requires minimum order value of ₹10,000');
      return;
    }

    const success = onApplyCoupon(code);
    if (!success) {
      setCouponError('Invalid coupon code. Try "BALLARI500" or "ICARE100"');
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Your Order Bag
            </h2>
            <span className="text-xs bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full tabular-nums">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-12 h-12 stroke-[1.5] mb-3 text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">Your bag is currently empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Browse our selection of laptops, custom desktop PCs, printers, and CCTV kits.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700 transition-colors"
              >
                Browse Store Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 relative group"
              >
                {/* Visual Thumbnail (4:3 Fit to Frame) */}
                {item.product.imageUrl || (item.product.images && item.product.images[0]) ? (
                  <div className="w-16 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-2xs flex items-center justify-center p-1">
                    <img
                      src={item.product.imageUrl || item.product.images?.[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className={`w-16 aspect-[4/3] rounded-xl bg-gradient-to-br ${item.product.gradient} p-2 flex items-center justify-center text-white shrink-0 shadow-2xs font-bold text-xs`}>
                    {item.product.brand}
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {item.product.warranty}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/40">
                    <div className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-slate-800 font-mono tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary & Checkout Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-3.5">
            {/* Coupon Code Section */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter BALLARI500 or ICARE100"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponError && (
                <div className="text-[11px] text-red-600 mt-1 font-medium">{couponError}</div>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between text-[11px] text-emerald-700 mt-1 font-semibold">
                  <span>Coupon {appliedCoupon} applied!</span>
                  <span>-₹{discount}</span>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800 font-mono tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount:</span>
                  <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span>Ballari Delivery:</span>
                  <span className="text-[10px] text-slate-400">(Free above ₹2,000)</span>
                </span>
                <span className="font-semibold font-mono tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="font-mono tabular-nums text-sky-700 text-base">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => {
                onProceedToCheckout();
              }}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Doorstep Cash on Delivery &amp; UPI Supported</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
