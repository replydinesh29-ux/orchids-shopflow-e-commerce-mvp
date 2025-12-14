import { Product, FilterOptions } from '@/lib/types';

export function generateInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  return products.filter(product => {
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.minRating && (!product.rating || product.rating < filters.minRating)) return false;
    if (filters.categories?.length && (!product.categoryId || !filters.categories.includes(product.categoryId))) return false;
    if (filters.brands?.length && (!product.brandId || !filters.brands.includes(product.brandId))) return false;
    if (filters.condition?.length && (!product.condition || !filters.condition.includes(product.condition))) return false;
    if (filters.freeShipping && !product.shippingInfo?.freeShipping) return false;
    if (filters.inStock && product.stock <= 0) return false;
    if (filters.seller && product.sellerId !== filters.seller) return false;
    
    return true;
  });
}

export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'popular':
      return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    default:
      return sorted;
  }
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

export function calculateShipping(subtotal: number, shippingCost = 0): number {
  if (subtotal >= 50) return 0;
  return shippingCost || subtotal * 0.05;
}

export function calculateTax(subtotal: number, taxRate = 0.08): number {
  return subtotal * taxRate;
}

export function calculateOrderTotal(
  subtotal: number,
  shippingCost?: number,
  taxRate?: number
): {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
} {
  const shipping = calculateShipping(subtotal, shippingCost);
  const tax = calculateTax(subtotal, taxRate);
  const total = subtotal + shipping + tax;
  
  return { subtotal, shipping, tax, total };
}
