"use client";

import { Header } from '@/components/Header';
import Link from 'next/link';
import { User, ShoppingBag, Heart, MapPin, Settings } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-medium mb-8">Your Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/account/profile" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <User className="w-8 h-8 text-[#4285f4] mb-3" />
            <h2 className="text-lg font-medium mb-2">Profile</h2>
            <p className="text-sm text-gray-600">Manage your personal information</p>
          </Link>

          <Link href="/account/orders" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <ShoppingBag className="w-8 h-8 text-[#4285f4] mb-3" />
            <h2 className="text-lg font-medium mb-2">Orders</h2>
            <p className="text-sm text-gray-600">Track and manage your orders</p>
          </Link>

          <Link href="/account/wishlist" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <Heart className="w-8 h-8 text-[#4285f4] mb-3" />
            <h2 className="text-lg font-medium mb-2">Wishlist</h2>
            <p className="text-sm text-gray-600">View your saved items</p>
          </Link>

          <Link href="/account/addresses" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <MapPin className="w-8 h-8 text-[#4285f4] mb-3" />
            <h2 className="text-lg font-medium mb-2">Addresses</h2>
            <p className="text-sm text-gray-600">Manage your shipping addresses</p>
          </Link>

          <Link href="/account/settings" className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <Settings className="w-8 h-8 text-[#4285f4] mb-3" />
            <h2 className="text-lg font-medium mb-2">Settings</h2>
            <p className="text-sm text-gray-600">Update your preferences</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
