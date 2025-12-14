"use client";

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#667eea] to-[#764ba2] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-[1.8em] hover:opacity-90 transition-opacity">
            <span>ShopFlow</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/cart" 
              className="relative flex items-center gap-1 text-white/90 hover:text-white font-medium transition-colors"
            >
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
