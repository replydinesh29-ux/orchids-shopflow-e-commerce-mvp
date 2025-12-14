"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { orderApi } from '@/lib/api';
import { Order } from '@/lib/types';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderApi.getOrder(resolvedParams.orderNumber);
        setOrder(data);
      } catch {
        // Fallback - show success message even if order details fail to load
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [resolvedParams.orderNumber]);

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#333] mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500">Thank you for your purchase.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#667eea] border-t-transparent"></div>
          </div>
        ) : order ? (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-[#333] mb-4">Order Details</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Order Number</p>
                  <p className="font-semibold text-[#333]">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <p className="font-semibold text-[#28a745]">${order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Order Date</p>
                  <p className="font-semibold text-[#333]">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {order.items && order.items.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-[#333] mb-4">Order Items</h2>
                
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-gray-500 text-sm">Product ID: {item.productId}</span>
                        <span className="text-gray-500 text-sm ml-4">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-[#333]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <p className="text-gray-500 text-center">
              Order #{resolvedParams.orderNumber} has been placed successfully.
            </p>
          </div>
        )}

        <div className="text-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 text-lg py-6 px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
