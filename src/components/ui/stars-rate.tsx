'use client';

import { useId } from 'react';

interface StarsRateProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

const sizes = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8',
};

interface StarIconProps {
  fillPercent: number;
  gradientId: string;
  className?: string;
}

function StarIcon({ fillPercent, gradientId, className }: StarIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fillPercent}%`} stopColor="#f59e0b" />
          <stop offset={`${fillPercent}%`} stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

export function StarsRate({ rating, size = 'medium' }: StarsRateProps) {
  const id = useId();
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        let fillPercent = 0;
        if (i < fullStars) {
          fillPercent = 100;
        } else if (i === fullStars) {
          fillPercent = decimal * 100;
        }

        return (
          <StarIcon
            key={i}
            fillPercent={fillPercent}
            gradientId={`${id}-star-${i}`}
            className={sizes[size]}
          />
        );
      })}
    </div>
  );
}
