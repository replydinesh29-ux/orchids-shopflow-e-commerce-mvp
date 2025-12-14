"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, Plus } from 'lucide-react';
import { Address } from '@/lib/types';

export default function AddressesPage() {
  const [addresses] = useState<Address[]>([]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium">Saved Addresses</h1>
          <Button className="bg-[#4285f4] hover:bg-[#3367d6] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No addresses saved yet</p>
            <Button className="mt-4 bg-[#4285f4] hover:bg-[#3367d6] text-white">
              Add Your First Address
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">
                        Default
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <p className="text-sm text-gray-600">
                  {address.street}<br />
                  {address.city}, {address.state} {address.zipCode}<br />
                  {address.country}<br />
                  {address.phone}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
