import React, { useState, useRef, useEffect } from 'react';
import { X, QrCode, Upload, Copy, Check, AlertCircle, RefreshCw, Smartphone, Building, ShieldCheck } from 'lucide-react';
import { PaymentConfig } from '../types';
import { DEFAULT_PAYMENT_CONFIG } from '../data/mockData';
import { useAdmin } from '../context/AdminContext';

interface PaymentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentConfig: PaymentConfig;
  onSavePaymentConfig: (config: PaymentConfig) => void;
  orderTotal?: number;
  orderId?: string;
}

export const PaymentQrModal: React.FC<PaymentQrModalProps> = ({
  isOpen,
  onClose,
  paymentConfig,
  onSavePaymentConfig,
  orderTotal,
  orderId,
}) => {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [upiId, setUpiId] = useState(paymentConfig.upiId);
  const [payeeName, setPayeeName] = useState(paymentConfig.payeeName);
  const [qrImageUrl, setQrImageUrl] = useState(paymentConfig.qrImageUrl || '');
  const [imagePreview, setImagePreview] = useState<string | null>(paymentConfig.qrImageUrl || null);
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [accountNumber, setAccountNumber] = useState(paymentConfig.accountNumber || '');
  const [ifscCode, setIfscCode] = useState(paymentConfig.ifscCode || '');
  const [bankName, setBankName] = useState(paymentConfig.bankName || '');
  const [instructions, setInstructions] = useState(paymentConfig.instructions || '');

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUpiId(paymentConfig.upiId);
      setPayeeName(paymentConfig.payeeName);
      setQrImageUrl(paymentConfig.qrImageUrl || '');
      setImagePreview(paymentConfig.qrImageUrl || null);
      setAccountNumber(paymentConfig.accountNumber || '');
      setIfscCode(paymentConfig.ifscCode || '');
      setBankName(paymentConfig.bankName || '');
      setInstructions(paymentConfig.instructions || '');
      setError(null);
      setSaveSuccess(false);
    }
  }, [isOpen, paymentConfig]);

  if (!isOpen) return null;

  // Build dynamic UPI intent URL for generating a QR code if no custom image is uploaded
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}${orderTotal ? `&am=${orderTotal}` : ''}&cu=INR${orderId ? `&tn=Order%20${orderId}` : ''}`;
  const generatedQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

  const activeQrImage = imagePreview || qrImageUrl || generatedQrCodeUrl;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setQrImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.trim()) {
      setError('Please provide a valid UPI ID (e.g., 8217676626@ybl)');
      return;
    }

    const updatedConfig: PaymentConfig = {
      upiId: upiId.trim(),
      payeeName: payeeName.trim() || 'iCare Computers',
      qrImageUrl: imagePreview || (qrImageUrl.trim() ? qrImageUrl.trim() : undefined),
      accountNumber: accountNumber.trim(),
      ifscCode: ifscCode.trim(),
      bankName: bankName.trim(),
      instructions: instructions.trim() || 'Scan with any UPI app to complete payment.',
    };

    onSavePaymentConfig(updatedConfig);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveTab('view');
    }, 700);
  };

  const handleResetToDefault = () => {
    setUpiId(DEFAULT_PAYMENT_CONFIG.upiId);
    setPayeeName(DEFAULT_PAYMENT_CONFIG.payeeName);
    setQrImageUrl('');
    setImagePreview(null);
    setAccountNumber(DEFAULT_PAYMENT_CONFIG.accountNumber || '');
    setIfscCode(DEFAULT_PAYMENT_CONFIG.ifscCode || '');
    setBankName(DEFAULT_PAYMENT_CONFIG.bankName || '');
    setInstructions(DEFAULT_PAYMENT_CONFIG.instructions || '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Store Payment QR Code
              </h2>
              <p className="text-[11px] text-slate-500">
                Scan &amp; pay via Google Pay, PhonePe, Paytm, or BHIM UPI
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

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-1 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'view'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Scan &amp; Pay QR
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'edit'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload / Change QR (Admin)</span>
              </button>
            )}
          </div>

          {activeTab === 'edit' && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Modal Content */}
        {activeTab === 'view' ? (
          <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
            {/* Amount Banner if available */}
            {orderTotal !== undefined && (
              <div className="p-3 bg-sky-50 border border-sky-200/80 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Order Amount to Pay:</span>
                  {orderId && <div className="text-[10px] text-slate-400 font-mono">Ref: {orderId}</div>}
                </div>
                <div className="text-lg font-bold text-sky-700 font-mono tabular-nums">
                  ₹{orderTotal.toLocaleString('en-IN')}
                </div>
              </div>
            )}

            {/* QR Card Container */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-200 text-center shadow-xs">
              <div className="text-xs font-bold text-slate-800 mb-1">
                {payeeName || 'iCare Computers'}
              </div>
              <div className="text-[11px] text-slate-500 mb-4">
                Ballari Store Authorized UPI Receiver
              </div>

              {/* QR Image Box */}
              <div className="relative p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-sm max-w-[240px] w-full aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={activeQrImage}
                  alt="Store Payment QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/80">
                  {upiId}
                </span>
                <button
                  onClick={handleCopyUpi}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 mt-2 max-w-xs leading-relaxed">
                Open Google Pay, PhonePe, Paytm, or your banking app and scan this QR code to transfer payment securely.
              </p>
            </div>

            {/* Supported Apps Strip */}
            <div className="flex items-center justify-center gap-3 text-slate-400 text-xs py-1">
              <span className="flex items-center gap-1 font-semibold text-[11px] text-slate-600">
                <Smartphone className="w-3.5 h-3.5 text-sky-600" />
                <span>GPay</span>
              </span>
              <span>·</span>
              <span className="font-semibold text-[11px] text-purple-700">PhonePe</span>
              <span>·</span>
              <span className="font-semibold text-[11px] text-blue-600">Paytm</span>
              <span>·</span>
              <span className="font-semibold text-[11px] text-emerald-700">BHIM</span>
            </div>

            {/* Bank Transfer Details (if configured) */}
            {accountNumber && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px] uppercase tracking-wider mb-1">
                  <Building className="w-3.5 h-3.5 text-sky-600" />
                  <span>Direct Bank NEFT / IMPS Account:</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank:</span>
                  <span className="font-semibold text-slate-900">{bankName || 'UCO Bank Ballari'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account No:</span>
                  <span className="font-mono font-bold text-slate-900">{accountNumber}</span>
                </div>
                {ifscCode && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">IFSC Code:</span>
                    <span className="font-mono font-bold text-slate-900">{ifscCode}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Change / Upload Store QR Code</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Payment QR Code updated successfully!</span>
              </div>
            )}

            {/* QR Code Image Upload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Payment QR Code Image
                </label>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    className={`px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                      imageMode === 'upload' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                      imageMode === 'url' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Image URL
                  </button>
                </div>
              </div>

              {imageMode === 'upload' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 h-44 flex items-center justify-center group">
                      <img
                        src={imagePreview}
                        alt="Uploaded QR Code"
                        className="max-h-full max-w-full object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
                        >
                          Replace Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setQrImageUrl('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-5 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-sky-50/30 flex flex-col items-center justify-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-1.5">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        Upload PhonePe / GPay / Paytm QR Code
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Upload screenshot or photo of your shop QR (JPG, PNG up to 5MB)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="https://example.com/payment-qr.jpg"
                    value={qrImageUrl}
                    onChange={(e) => {
                      setQrImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                  {imagePreview && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 h-32 bg-slate-50 flex items-center justify-center p-2">
                      <img src={imagePreview} alt="URL preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* UPI ID & Payee Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  UPI ID (VPA) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8217676626@ybl"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Payee Display Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Naga Reddy - iCare"
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>

            {/* Optional Bank NEFT details */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                Bank Account Details (Optional for NEFT/IMPS)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 03210200001234"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">IFSC Code</label>
                  <input
                    type="text"
                    placeholder="e.g. UCBA0000321"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-mono uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Bank &amp; Branch</label>
                <input
                  type="text"
                  placeholder="e.g. UCO Bank, Ballari Main Branch"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Customer Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Scan with Google Pay, PhonePe, Paytm, or BHIM"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('view')}
                className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Payment QR</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
