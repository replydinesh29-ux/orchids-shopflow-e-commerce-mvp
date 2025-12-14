"use client";

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <h1 className="text-2xl font-medium mb-8">Settings</h1>

        <div className="space-y-8 max-w-2xl">
          <div>
            <h2 className="text-lg font-medium mb-4">Notifications</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="email-updates" />
                <label htmlFor="email-updates" className="text-sm cursor-pointer">
                  Email updates about new products and offers
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="order-updates" />
                <label htmlFor="order-updates" className="text-sm cursor-pointer">
                  Order status and shipping updates
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-drops" />
                <label htmlFor="price-drops" className="text-sm cursor-pointer">
                  Price drop alerts on wishlist items
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Privacy</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="personalized-ads" />
                <label htmlFor="personalized-ads" className="text-sm cursor-pointer">
                  Personalized ads and recommendations
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="share-data" />
                <label htmlFor="share-data" className="text-sm cursor-pointer">
                  Share shopping data with partners
                </label>
              </div>
            </div>
          </div>

          <Button className="bg-[#4285f4] hover:bg-[#3367d6] text-white">
            Save Preferences
          </Button>
        </div>
      </main>
    </div>
  );
}
