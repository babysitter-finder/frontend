'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamic import with SSR disabled (required for Leaflet)
const MapPickerInner = dynamic(
  () => import('./MapPickerInner').then((mod) => mod.MapPickerInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full bg-gray-100 animate-pulse rounded-[var(--radius-card)] border border-black flex items-center justify-center">
        <span className="text-gray-400">Cargando mapa...</span>
      </div>
    ),
  }
);

interface MapPickerProps {
  value: { lat: string; long: string };
  onChange: (coords: { lat: string; long: string }) => void;
  label?: string;
  error?: string;
  className?: string;
}

export function MapPicker({
  value,
  onChange,
  label,
  error,
  className,
}: MapPickerProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-black font-roboto text-lg font-medium">
          {label}
        </label>
      )}

      <MapPickerInner value={value} onChange={onChange} />

      {value.lat && value.long && (
        <p className="text-sm text-gray-500">
          Ubicacion: {parseFloat(value.lat).toFixed(6)}, {parseFloat(value.long).toFixed(6)}
        </p>
      )}

      {error && <span className="text-negative text-sm">{error}</span>}
    </div>
  );
}
