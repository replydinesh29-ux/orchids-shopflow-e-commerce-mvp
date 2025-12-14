"use client";

import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const initial = product.name.charAt(0).toUpperCase();
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer h-full flex flex-col">
        <div className="aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100">
          <span className="text-7xl font-light text-gray-300">{initial}</span>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 leading-snug min-h-[40px]">{product.name}</h3>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-xl font-medium text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>SKU: {product.sku}</span>
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              disabled={isOutOfStock}
              className="w-full py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-[#4285f4] text-white hover:bg-[#3b78e7]"
            >
              {isOutOfStock ? 'Out of stock' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}