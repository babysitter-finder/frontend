'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { StarsRate } from './stars-rate';
import type { Babysitter } from '@/types/babysitter';

interface BabysitterHeaderProps {
  babysitter: Babysitter;
  className?: string;
}

export function BabysitterHeader({ babysitter, className }: BabysitterHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 bg-section rounded-[var(--radius-card)] border border-black/10',
        className
      )}
    >
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={babysitter.picture || '/assets/girl.jpeg'}
          alt={`${babysitter.first_name} ${babysitter.last_name}`}
          fill
          className="rounded-full object-cover border-2 border-illustration-primary"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="font-overlock text-xl font-bold text-black truncate">
          {babysitter.first_name} {babysitter.last_name}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <StarsRate rating={babysitter.rating || 0} size="small" />
          {babysitter.reviews_count !== undefined && (
            <span className="text-sm text-gray-500">
              ({babysitter.reviews_count})
            </span>
          )}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-overlock text-2xl font-bold text-illustration-primary">
          ${babysitter.cost_of_service}
        </p>
        <p className="text-sm text-gray-500">por hora</p>
      </div>
    </div>
  );
}
