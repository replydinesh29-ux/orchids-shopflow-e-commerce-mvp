"use client";

import { Star } from 'lucide-react';

interface RatingsSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution?: { [key: number]: number };
}

export function RatingsSummary({ 
  averageRating, 
  totalReviews, 
  ratingDistribution 
}: RatingsSummaryProps) {
  const distribution = ratingDistribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
        <div className="flex items-center justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.round(averageRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">{totalReviews} reviews</p>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = distribution[rating] || 0;
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center space-x-3">
              <span className="text-sm w-8">{rating} ★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
