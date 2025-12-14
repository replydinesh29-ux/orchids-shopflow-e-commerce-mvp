"use client";

import { Star } from 'lucide-react';

interface RatingFilterProps {
  selectedRating: number | null;
  onChange: (rating: number | null) => void;
}

export function RatingFilter({ selectedRating, onChange }: RatingFilterProps) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Customer Ratings</h3>
      <div className="space-y-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(selectedRating === rating ? null : rating)}
            className={`flex items-center space-x-2 w-full text-sm hover:bg-gray-50 p-2 rounded ${
              selectedRating === rating ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              {[...Array(5 - rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gray-300" />
              ))}
            </div>
            <span className="text-gray-600">& Up</span>
          </button>
        ))}
      </div>
    </div>
  );
}
