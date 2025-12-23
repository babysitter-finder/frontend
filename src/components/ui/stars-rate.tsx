'use client';

import { cn } from '@/lib/utils';

interface StarsRateProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

const sizes = {
  small: 'text-lg',
  medium: 'text-2xl',
  large: 'text-3xl',
};

export function StarsRate({ rating, size = 'medium' }: StarsRateProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex gap-0.5', sizes[size])}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="text-warning">
          ★
        </span>
      ))}
      {hasHalfStar && <span className="text-warning">★</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
}
