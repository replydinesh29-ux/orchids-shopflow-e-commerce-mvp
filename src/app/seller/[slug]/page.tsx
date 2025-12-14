"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { Star, MapPin, Shield } from 'lucide-react';

export default function SellerPage() {
  const [products] = useState<Product[]>([]);
  
  const sellerData = {
    name: 'Sample Seller',
    rating: 4.5,
    reviewCount: 234,
    verified: true,
    location: 'New York, USA',
    description: 'Quality products with fast shipping and excellent customer service.'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-medium">{sellerData.name}</h1>
                {sellerData.verified && (
                  <Shield className="w-6 h-6 text-[#4285f4]" />
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{sellerData.rating}</span>
                  <span className="text-gray-600 ml-1">
                    ({sellerData.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {sellerData.location}
                </div>
              </div>
              
              <p className="text-gray-700 max-w-2xl">{sellerData.description}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-medium mb-6">Products from this seller</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
