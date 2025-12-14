"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ComparisonItem } from '@/lib/types';
import { X } from 'lucide-react';

export default function ComparisonPage() {
  const [comparisonItems] = useState<ComparisonItem[]>([]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <h1 className="text-2xl font-medium mb-8">Product Comparison</h1>

        {comparisonItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No products to compare</p>
            <p className="text-sm">Add products to compare their features side by side</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-4 bg-gray-50 text-left font-medium">
                    Feature
                  </th>
                  {comparisonItems.map((item) => (
                    <th key={item.productId} className="border border-gray-200 p-4 bg-gray-50 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                          <span className="text-3xl text-gray-400">
                            {item.product.name.charAt(0)}
                          </span>
                        </div>
                        <p className="font-medium text-sm">{item.product.name}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">Price</td>
                  {comparisonItems.map((item) => (
                    <td key={item.productId} className="border border-gray-200 p-4 text-center">
                      ${item.product.price.toFixed(2)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">Rating</td>
                  {comparisonItems.map((item) => (
                    <td key={item.productId} className="border border-gray-200 p-4 text-center">
                      {item.product.rating ? `${item.product.rating} ★` : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">Stock</td>
                  {comparisonItems.map((item) => (
                    <td key={item.productId} className="border border-gray-200 p-4 text-center">
                      {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
