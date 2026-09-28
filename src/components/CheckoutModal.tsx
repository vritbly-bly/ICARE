import React, { useState } from 'react';
import { X, MapPin, Store, Truck, ShieldCheck, CheckCircle2, ArrowRight, CreditCard, Banknote, QrCode, Copy, Check, Upload, ExternalLink } from 'lucide-react';
import { CartItem, Order, PaymentConfig } from '../types';
import { STORE_INFO, DEFAULT_PAYMENT_CONFIG } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  deliveryFee: number;
  onOrderPlaced: (order: Order) => void;
  paymentConfig?: PaymentConfig;
  onOpenPaymentQrModal?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  deliveryFee,
  onOrderPlaced,
  paymentConfig = DEFAULT_PAYMENT_CONFIG,
  onOpenPaymentQrModal,
}) => {
  const [deliveryType, setDeliveryType] = useState<'doorstep' | 'pickup'>('doorstep');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('583104');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'bank_transfer'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const finalDeliveryFee = deliveryType === 'pickup' ? 0 : deliveryFee;
  const total = Math.max(0, subtotal - discount + finalDeliveryFee);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) errs.name = 'Please enter your full name';
    if (!phone.trim() || phone.trim().length < 10) errs.phone = 'Valid 10-digit mobile number required for delivery coordination';
    if (deliveryType === 'doorstep' && !address.trim()) {
      errs.address = 'Please provide delivery address in Ballari';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Generate random realistic Order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ICARE-BLR-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customerName,
      phone,
      email,
      deliveryType,
      address: deliveryType === 'doorstep' ? address : STORE_INFO.address,
      landmark,
      pincode,
      items: [...items],
      subtotal,
      discount,
      deliveryFee: finalDeliveryFee,
      total,
      paymentMethod,
      status: 'Confirmed',
      notes,
      transactionId: transactionId.trim() || undefined,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <BrandLogo variant="compact" size="sm" />
            <div className="border-l border-slate-200 pl-3">
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Checkout &amp; Order
              </h2>
              <p className="text-[11px] text-slate-500">
                Direct to iCare Computers Showroom
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* 1. Fulfillment Mode Selection */}
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
              Choose Delivery Option
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('doorstep')}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  deliveryType === 'doorstep'
                    ? 'border-sky-600 bg-sky-50/60 text-slate-900 ring-2 ring-sky-500/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${deliveryType === 'doorstep' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Doorstep Express Delivery</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Same-day delivery across Ballari city
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700 mt-1">
                    {deliveryFee === 0 ? 'FREE Delivery' : '₹99 standard fee'}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  deliveryType === 'pickup'
                    ? 'border-sky-600 bg-sky-50/60 text-slate-900 ring-2 ring-sky-500/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${deliveryType === 'pickup' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Self Store Pickup</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Beside UCO Bank, Opp Kumaraswamy Temple
                  </div>
                  <div className="text-[11px] font-semibold text-sky-700 mt-1">
                    Ready in 30 mins (FREE)
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Customer Contact Details */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Customer Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Reddy"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                    errors.name ? 'border-red-500' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9845012345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                    errors.phone ? 'border-red-500' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            {deliveryType === 'doorstep' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Delivery Address in Ballari *
                  </label>
                  <input
                    type="text"
                    placeholder="House/Plot No, Street, Colony (e.g., Near Cowl Bazaar, Gandhi Nagar)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                      errors.address ? 'border-red-500' : 'border-slate-200 focus:border-sky-500'
                    }`}
                  />
                  {errors.address && <p className="text-[10px] text-red-500 mt-0.5">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Royal Circle"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Order Notes / Special Requests (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Please configure Windows 11 & Chrome, need GST invoice"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900"
              />
            </div>
          </div>

          {/* 3. Payment Method */}
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-sky-600 bg-sky-50 text-sky-950 font-semibold ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs">Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-sky-600 bg-sky-50 text-sky-950 font-semibold ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs">UPI QR / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-sky-600 bg-sky-50 text-sky-950 font-semibold ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-xs">Bank Transfer</span>
              </button>
            </div>

            {/* UPI QR Code Interactive Box */}
            {paymentMethod === 'upi' && (
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-sky-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <QrCode className="w-4 h-4 text-sky-600" />
                    <span>Scan &amp; Pay via UPI QR</span>
                  </div>
                  {onOpenPaymentQrModal && (
                    <button
                      type="button"
                      onClick={onOpenPaymentQrModal}
                      className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload / Change QR</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-200/80">
                  {/* QR Image Box */}
                  <div className="w-32 h-32 bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={
                        paymentConfig.qrImageUrl ||
                        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                          `upi://pay?pa=${paymentConfig.upiId}&pn=${encodeURIComponent(
                            paymentConfig.payeeName
                          )}&am=${total}&cu=INR`
                        )}`
                      }
                      alt="Payment QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* QR Details */}
                  <div className="flex-1 space-y-1.5 text-xs text-center sm:text-left">
                    <div className="font-bold text-slate-900">{paymentConfig.payeeName}</div>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {paymentConfig.upiId}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(paymentConfig.upiId);
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2000);
                          }
                        }}
                        className="p-1 hover:bg-slate-100 text-slate-500 rounded cursor-pointer"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Amount: <span className="font-bold text-slate-900 font-mono">₹{total.toLocaleString('en-IN')}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Scan with Google Pay, PhonePe, Paytm, or BHIM UPI app.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    UPI Reference / UTR Number (Optional if already paid)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4289xxxxxxxx (12-digit UTR)"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>
            )}

            {/* Bank Transfer Box */}
            {paymentMethod === 'bank_transfer' && (
              <div className="mt-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider mb-1">
                  Bank NEFT / IMPS Transfer Coordinates:
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank Name:</span>
                  <span className="font-semibold text-slate-900">{paymentConfig.bankName || 'UCO Bank, Ballari'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Number:</span>
                  <span className="font-mono font-bold text-slate-900">{paymentConfig.accountNumber || '03210200001234'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="font-mono font-bold text-slate-900">{paymentConfig.ifscCode || 'UCBA0000321'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Name:</span>
                  <span className="font-semibold text-slate-900">{paymentConfig.payeeName}</span>
                </div>
                <div className="pt-2">
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Bank Reference / IMPS Reference Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IMPS Reference / Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4. Order Summary Snapshot */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="font-semibold text-slate-900 flex justify-between">
              <span>Items in Order:</span>
              <span className="tabular-nums font-mono">{items.length} product(s)</span>
            </div>
            <div className="text-slate-600 divide-y divide-slate-200/60 max-h-24 overflow-y-auto">
              {items.map((i) => (
                <div key={i.product.id} className="py-1 flex justify-between">
                  <span className="truncate pr-2">
                    {i.quantity}x {i.product.name}
                  </span>
                  <span className="font-mono tabular-nums shrink-0">
                    ₹{(i.product.price * i.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-bold text-sm">
              <span>Grand Total:</span>
              <span className="text-sky-700 font-mono tabular-nums text-base">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Order...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Order &amp; Generate Invoice (₹{total.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
