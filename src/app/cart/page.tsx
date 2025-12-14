"use client";

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, totalAmount, removeFromCart, updateQuantity } = useCart();
  
  const shippingCost = totalAmount * 0.05;
  const grandTotal = totalAmount + shippingCost;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#333] mb-2">Shopping Cart</h1>
        <Link 
          href="/" 
          className="inline-flex items-center text-[#667eea] hover:text-[#764ba2] mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </Link>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart!</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const initial = item.name.charAt(0).toUpperCase();
                return (
                  <div key={item.productId} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-white/80">{initial}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#333] truncate">{item.name}</h3>
                      <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="h-8 w-8"
                      >
                        +
                      </Button>
                    </div>
                    
                    <div className="w-24 text-right font-semibold text-[#333]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.productId)}
                      className="text-[#dc3545] hover:text-red-700 hover:bg-red-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#333] mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-[#333]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping (5%):</span>
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-[#28a745]">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link href="/checkout" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 text-lg py-6">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
