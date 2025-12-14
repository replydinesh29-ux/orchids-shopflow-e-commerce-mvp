"use client";

import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';

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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="h-[180px] bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
        <span className="text-[72px] font-bold text-white/80">{initial}</span>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-[1.2em] text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-[0.9em] mb-2">SKU: {product.sku}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#28a745] font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="text-gray-500 text-sm">Stock: {product.stock}</span>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-[#17a2b8] text-white border-[#17a2b8] hover:bg-[#138496] hover:border-[#138496]">
              View Details
            </Button>
          </Link>
          <Button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 bg-[#28a745] hover:bg-[#218838] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
}
