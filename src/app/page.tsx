"use client";

import { useState, useEffect, useCallback } from 'react';
import { productApi } from '@/lib/api';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchProducts = useCallback(async (keyword?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = keyword 
        ? await productApi.searchProducts(keyword)
        : await productApi.getAllProducts();
      setProducts(response.content);
    } catch {
      setError('Unable to load products. Please check if the backend service is running on port 8081.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = () => {
    fetchProducts(searchKeyword);
  };

  const handleClear = () => {
    setSearchKeyword('');
    fetchProducts();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#333] mb-6">ShopFlow Products</h1>
        
        <div className="flex gap-3 mb-8">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="max-w-md bg-white"
          />
          <Button 
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90"
          >
            Search
          </Button>
          <Button 
            onClick={handleClear}
            variant="outline"
            className="border-gray-300"
          >
            Clear
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#667eea] border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products found. Try a different search term.
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
