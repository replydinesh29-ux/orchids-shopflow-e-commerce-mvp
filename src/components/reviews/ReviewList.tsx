"use client";

import { Review } from '@/lib/types';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  onMarkHelpful?: (reviewId: number) => void;
}

export function ReviewList({ reviews, onMarkHelpful }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No reviews yet</p>
        <p className="text-sm mt-1">Be the first to review this product</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onMarkHelpful={onMarkHelpful}
        />
      ))}
    </div>
  );
}
