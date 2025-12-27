'use client';

import { cn } from '@/lib/utils';
import type { ServiceStatus } from '@/types';

interface StatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

const STATUS_LABELS: Record<ServiceStatus, string> = {
  pending: 'Pendiente',
  accepted: 'Confirmada',
  on_my_way: 'En Camino',
  in_progress: 'En Progreso',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

const STATUS_STYLES: Record<ServiceStatus, string> = {
  pending: 'bg-warning text-black',
  accepted: 'bg-positive text-white',
  on_my_way: 'bg-illustration-secondary text-black',
  in_progress: 'bg-illustration-primary text-black',
  completed: 'bg-blue-dark text-white',
  cancelled: 'bg-negative text-white',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      role="status"
      aria-label={`Estado: ${STATUS_LABELS[status]}`}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        'shadow-sm',
        STATUS_STYLES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
