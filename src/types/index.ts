export type CategoryType = 
  | 'all'
  | 'laptops'
  | 'desktops'
  | 'printers'
  | 'cctv'
  | 'accessories'
  | 'amc';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'laptops' | 'desktops' | 'printers' | 'cctv' | 'accessories' | 'amc';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  specs: { [key: string]: string };
  description: string;
  badge?: string;
  tags: string[];
  warranty: string;
  imageFallbackIcon: string;
  gradient: string;
  imageUrl?: string;
  images?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryType: 'doorstep' | 'pickup';
  address?: string;
  landmark?: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'bank_transfer';
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Ready for Pickup';
  notes?: string;
  transactionId?: string;
}

export interface PaymentConfig {
  upiId: string;
  payeeName: string;
  qrImageUrl?: string;
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  instructions?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'showroom' | 'repairs' | 'cctv' | 'custom_pc' | 'delivery';
  description: string;
  date: string;
  client?: string;
  location: string;
  tags: string[];
  gradient: string;
  iconName: string;
  aspectRatio?: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: string;
  features: string[];
  priceEstimate: string;
  imageUrl?: string;
  images?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
  isActionable?: boolean;
}

export interface BrandItem {
  id?: string;
  name: string;
  color?: string;
  logoUrl?: string;
}

export interface BrandEcosystem {
  laptops: BrandItem[];
  printers: BrandItem[];
  cctv: BrandItem[];
}
