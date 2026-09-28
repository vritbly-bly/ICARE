import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Printer, MapPin, Phone, ArrowLeft, PackageCheck, QrCode, Copy, Check, Upload } from 'lucide-react';
import { Order, PaymentConfig } from '../types';
import { STORE_INFO, DEFAULT_PAYMENT_CONFIG } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  paymentConfig?: PaymentConfig;
  onOpenPaymentQrModal?: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  paymentConfig = DEFAULT_PAYMENT_CONFIG,
  onOpenPaymentQrModal,
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  if (!order) return null;

  const itemDetailsText = order.items
    .map((i) => `• ${i.quantity}x ${i.product.name} (₹${(i.product.price * i.quantity).toLocaleString('en-IN')})`)
    .join('\n');

  const whatsappMessage = encodeURIComponent(
    `Hello Venkata Reddy sir, I have placed an order on iCare Computers website.\n\n` +
      `*Order ID:* ${order.id}\n` +
      `*Customer:* ${order.customerName}\n` +
      `*Phone:* ${order.phone}\n` +
      `*Fulfillment:* ${order.deliveryType === 'doorstep' ? 'Ballari Doorstep Delivery' : 'Store Pickup'}\n` +
      `*Address:* ${order.address || 'Beside UCO Bank'}\n` +
      `*Items:*\n${itemDetailsText}\n\n` +
      `*Total Amount:* ₹${order.total.toLocaleString('en-IN')}\n` +
      `*Payment:* ${order.paymentMethod.toUpperCase()}\n\n` +
      `Please confirm dispatch/ready time.`
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-6 text-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-3 text-white shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-emerald-300" />
          </div>
          <h2 className="text-xl font-bold font-heading">
            Order Confirmed Successfully!
          </h2>
          <p className="text-xs text-sky-100 mt-1">
            Thank you for ordering with iCare Computers, Ballari.
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Order Meta Bar */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <BrandLogo variant="compact" size="sm" />
              </div>
              <div>
                <span className="text-slate-400 font-medium">Order Number:</span>
                <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                  {order.id}
                </div>
              </div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Date &amp; Time:</span>
              <div className="font-semibold text-slate-800 mt-0.5">{order.date}</div>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Order Status:</span>
              <div className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px] mt-0.5">
                {order.status}
              </div>
            </div>
          </div>

          {/* Fulfillment Info */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Fulfillment &amp; Customer Information
            </h3>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-semibold text-slate-900">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-semibold font-mono text-slate-900">{order.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Mode:</span>
                <span className="font-semibold text-sky-700 capitalize">
                  {order.deliveryType === 'doorstep' ? 'Doorstep Delivery' : 'Self Store Pickup'}
                </span>
              </div>
              <div className="flex justify-between items-start pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 shrink-0">Location / Address:</span>
                <span className="text-right text-slate-800 font-medium max-w-[280px]">
                  {order.address} {order.pincode && `(${order.pincode})`}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Itemized Invoice Summary
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.product.id} className="p-3 flex items-center justify-between bg-white">
                  <div>
                    <div className="font-bold text-slate-900">{item.product.name}</div>
                    <div className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="font-bold font-mono text-slate-900 tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount Applied:</span>
                  <span className="font-mono tabular-nums">-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-mono tabular-nums">
                  {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Payable:</span>
                <span className="font-mono tabular-nums text-sky-700 text-base">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Payment Method: <span className="font-semibold uppercase text-slate-800">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Payment QR Code Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-sky-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Payment QR Code (UPI)
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Scan with Google Pay, PhonePe, Paytm, or BHIM
                  </p>
                </div>
              </div>

              {onOpenPaymentQrModal && (
                <button
                  type="button"
                  onClick={onOpenPaymentQrModal}
                  className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                >
                  <Upload className="w-3 h-3" />
                  <span>Change QR</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="w-28 h-28 bg-slate-50 border border-slate-200 rounded-xl p-1.5 flex items-center justify-center shrink-0">
                <img
                  src={
                    paymentConfig.qrImageUrl ||
                    `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                      `upi://pay?pa=${paymentConfig.upiId}&pn=${encodeURIComponent(
                        paymentConfig.payeeName
                      )}&am=${order.total}&cu=INR&tn=Order%20${order.id}`
                    )}`
                  }
                  alt="Order Payment QR"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1.5 text-xs text-center sm:text-left flex-1">
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
                <div className="text-[11px] text-slate-500">
                  Payable Total: <span className="font-bold text-sky-700 font-mono">₹{order.total.toLocaleString('en-IN')}</span>
                </div>
                {order.transactionId && (
                  <div className="text-[11px] text-emerald-700 font-medium">
                    Reference / UTR: <span className="font-mono">{order.transactionId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="p-2.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Print Order Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/91${STORE_INFO.phone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share Order to WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
