"use client";

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ShoppingBag className="w-7 h-7 text-[#4285f4]" strokeWidth={2} />
            <span className="text-2xl font-normal">
              <span className="text-[#4285f4]">Shop</span>
              <span className="text-[#ea4335]">Flow</span>
            </span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-[15px]"
            >
              Products
            </Link>
            <Link 
              href="/cart" 
              className="relative flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors text-[15px]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#ea4335] text-white text-[11px] font-semibold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}