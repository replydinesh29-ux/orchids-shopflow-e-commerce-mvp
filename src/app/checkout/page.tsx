"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { orderApi } from '@/lib/api';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();
  const [customerId, setCustomerId] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shippingCost = totalAmount * 0.05;
  const grandTotal = totalAmount + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      setError('Your cart is empty. Add items before checkout.');
      return;
    }
    
    if (!shippingAddress.trim()) {
      setError('Please enter a shipping address.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customerId,
        shippingAddress: shippingAddress.trim(),
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const order = await orderApi.createOrder(orderData);
      clearCart();
      router.push(`/order-confirmation/${order.orderNumber}`);
    } catch {
      setError('Failed to place order. Please check if the order service is running on port 8082.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add items to your cart before checkout.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#333] mb-6">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#333] mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="customerId" className="text-[#333]">Customer ID</Label>
                <Input
                  id="customerId"
                  type="number"
                  value={customerId}
                  onChange={(e) => setCustomerId(Number(e.target.value))}
                  min={1}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-[#333]">Shipping Address</Label>
                <Textarea
                  id="address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your shipping address..."
                  rows={4}
                  className="mt-1"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 text-lg py-6"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-[#333] mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-[#333]">{item.name}</span>
                    <span className="text-gray-500 text-sm ml-2">(x{item.quantity})</span>
                  </div>
                  <span className="font-medium text-[#333]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 mb-4" />

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
          </div>
        </div>
      </main>
    </div>
  );
}
