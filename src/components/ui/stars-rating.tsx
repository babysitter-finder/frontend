'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface StarsRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: 'small' | 'medium' | 'large';
}

const sizes = {
  small: 'text-2xl',
  medium: 'text-3xl',
  large: 'text-4xl',
};

export function StarsRating({ value, onChange, size = 'medium' }: StarsRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered ?? value;

  return (
    <div className={cn('flex gap-1 cursor-pointer', sizes[size])}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={cn(
            'transition-colors',
            star <= displayValue ? 'text-warning' : 'text-gray-300'
          )}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
