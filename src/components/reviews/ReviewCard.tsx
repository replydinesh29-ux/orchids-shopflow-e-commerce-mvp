"use client";

import { Review } from '@/lib/types';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewCardProps {
  review: Review;
  onMarkHelpful?: (reviewId: number) => void;
}

export function ReviewCard({ review, onMarkHelpful }: ReviewCardProps) {
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium">{review.userName}</span>
            {review.verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      {review.title && (
        <h4 className="font-medium mb-2">{review.title}</h4>
      )}
      
      <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

      {review.images && review.images.length > 0 && (
        <div className="flex space-x-2 mb-3">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review ${index + 1}`}
              className="w-20 h-20 object-cover rounded border border-gray-200"
            />
          ))}
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onMarkHelpful?.(review.id)}
        className="text-sm"
      >
        <ThumbsUp className="w-4 h-4 mr-1" />
        Helpful ({review.helpful})
      </Button>
    </div>
  );
}
