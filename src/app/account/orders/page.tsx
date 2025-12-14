"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { ChevronLeft, Package } from 'lucide-react';
import { Order } from '@/lib/types';

export default function OrdersPage() {
  const [orders] = useState<Order[]>([]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <h1 className="text-2xl font-medium mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg mb-2">No orders yet</p>
            <p className="text-sm">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link 
                key={order.id} 
                href={`/order-confirmation/${order.orderNumber}`}
                className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg mb-1">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                  <p className="text-lg font-medium">${order.totalAmount.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
