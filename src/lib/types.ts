export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  categoryId?: number;
  brandId?: number;
  sellerId?: number;
  images?: ProductImage[];
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  condition?: 'new' | 'used' | 'refurbished';
  shippingInfo?: ShippingInfo;
  tags?: string[];
}

export interface ProductImage {
  id: number;
  url: string;
  altText?: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  stock: number;
  sku: string;
  attributes: { [key: string]: string };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId?: number;
  children?: Category[];
  productCount?: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

export interface Seller {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  verifiedSeller: boolean;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: string;
}

export interface ShippingInfo {
  freeShipping: boolean;
  estimatedDays: number;
  shippingCost?: number;
  availableRegions?: string[];
}

export interface WishlistItem {
  id: number;
  productId: number;
  product: Product;
  addedAt: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image?: string;
  variantId?: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  variantId?: number;
  name?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt?: string;
  trackingNumber?: string;
  shippingCost?: number;
  tax?: number;
}

export interface ProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
}

export interface FilterOptions {
  categories?: number[];
  brands?: number[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  condition?: ('new' | 'used' | 'refurbished')[];
  freeShipping?: boolean;
  inStock?: boolean;
  seller?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface Address {
  id: number;
  type: 'shipping' | 'billing';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface ComparisonItem {
  productId: number;
  product: Product;
}

export interface SearchSuggestion {
  id: number;
  text: string;
  type: 'keyword' | 'product' | 'category';
  relevance: number;
}