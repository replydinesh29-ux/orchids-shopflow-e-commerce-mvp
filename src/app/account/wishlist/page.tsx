"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { WishlistItem } from '@/lib/types';

export default function WishlistPage() {
  const [wishlistItems] = useState<WishlistItem[]>([]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <h1 className="text-2xl font-medium mb-8">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">Your wishlist is empty</p>
            <p className="text-sm">Save items you love to view them later</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wishlistItems.map((item) => (
              <ProductCard key={item.id} product={item.product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
