"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { productApi } from '@/lib/api';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/CartContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productApi.getProductById(Number(resolvedParams.id));
        setProduct(data);
      } catch {
        setError('Product not found or service unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  const handleQuantityChange = (value: number) => {
    if (product) {
      setQuantity(Math.max(1, Math.min(value, product.stock)));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        quantity,
      });
      router.push('/cart');
    }
  };

  const isOutOfStock = product ? product.stock <= 0 : false;
  const initial = product?.name.charAt(0).toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#667eea] hover:text-[#764ba2] mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#667eea] border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && product && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-[300px] md:h-[400px] bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                <span className="text-[120px] font-bold text-white/80">{initial}</span>
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-[#333] mb-2">{product.name}</h1>
                <p className="text-gray-500 text-[0.9em] mb-4">SKU: {product.sku}</p>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[#28a745] font-bold text-2xl">${product.price.toFixed(2)}</span>
                  <span className={`text-sm ${product.stock > 0 ? 'text-gray-500' : 'text-red-500'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                {!isOutOfStock && (
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-700 font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="h-10 w-10"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        min={1}
                        max={product.stock}
                        className="w-20 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="h-10 w-10"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full md:w-auto bg-[#28a745] hover:bg-[#218838] text-white text-lg py-6 px-8"
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}