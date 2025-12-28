'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useServiceStore } from '@/stores';
import { BabysitterHeader } from '@/components/ui/BabysitterHeader';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  IconCheck,
  IconCalendar,
  IconClock,
  IconUsers,
  IconMapPin,
  IconHeart,
  IconCalendarEvent,
  IconHome,
  IconMoodSad,
} from '@tabler/icons-react';
import type { ServiceStatus } from '@/types';

// Dynamic import for map (SSR disabled)
const LocationMap = dynamic(
  () => import('@/components/ui/LocationMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 rounded-[var(--radius-card)] flex items-center justify-center">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    ),
  }
);

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

function formatTime(timeString: string): string {
  if (!timeString) return '';
  try {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'p.m.' : 'a.m.';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch {
    return timeString;
  }
}

export default function ServiceResumePage() {
  const params = useParams();
  const serviceId = params.id as string;
  const { editForm: service, loading, error, getService } = useServiceStore();

  useEffect(() => {
    if (serviceId) {
      getService(serviceId);
    }
  }, [serviceId, getService]);

  // Loading state
  if (loading && !service) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6 animate-pulse">
          <div className="h-24 bg-gray-200 rounded-[var(--radius-card)]" />
          <div className="h-20 bg-gray-200 rounded-[var(--radius-card)]" />
          <div className="h-32 bg-gray-200 rounded-[var(--radius-card)]" />
          <div className="h-64 bg-gray-200 rounded-[var(--radius-card)]" />
        </div>
      </main>
    );
  }

  // Error or not found state
  if (error || !service) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-container rounded-[var(--radius-card)] p-12 text-center shadow-[var(--shadow-default)]">
          <div className="flex justify-center mb-4">
            <IconMoodSad size={64} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-overlock text-black mb-2">
            Servicio no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'No pudimos encontrar la información del servicio.'}
          </p>
          <Link href="/">
            <Button variant="pink">Volver al inicio</Button>
          </Link>
        </div>
      </main>
    );
  }

  const babysitter = service.babysitter;
  const mapLat = service.lat ? parseFloat(service.lat) : null;
  const mapLng = service.long ? parseFloat(service.long) : null;
  const status = (service.status || 'pending') as ServiceStatus;

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Success Banner */}
      <div className="bg-positive rounded-[var(--radius-card)] p-6 mb-6 flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
          <IconCheck size={28} className="text-black" />
        </div>
        <div>
          <h1 className="font-overlock text-xl font-bold text-black">
            ¡Solicitud enviada exitosamente!
          </h1>
          <p className="text-black/80 text-sm">
            La niñera recibirá tu solicitud y te confirmará pronto.
          </p>
        </div>
      </div>

      {/* Babysitter Card */}
      {babysitter && (
        <BabysitterHeader
          babysitter={babysitter}
          className="mb-6 shadow-[var(--shadow-default)]"
        />
      )}

      {/* Service Details */}
      <div className="bg-section rounded-[var(--radius-card)] p-6 mb-6 shadow-[var(--shadow-default)]">
        <h2 className="font-overlock text-xl font-bold text-black mb-4">
          Detalles del Servicio
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-illustration-secondary/20 rounded-lg flex items-center justify-center">
              <IconCalendar size={20} className="text-illustration-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Fecha</p>
              <p className="text-black font-medium">{formatDate(service.date)}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-illustration-secondary/20 rounded-lg flex items-center justify-center">
              <IconClock size={20} className="text-illustration-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Hora de inicio</p>
              <p className="text-black font-medium">
                {service.start_time ? formatTime(service.start_time) : 'No especificada'}
              </p>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-illustration-secondary/20 rounded-lg flex items-center justify-center">
              <IconUsers size={20} className="text-illustration-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Cantidad de niños</p>
              <p className="text-black font-medium">
                {service.count_children} {service.count_children === 1 ? 'niño' : 'niños'}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-warning/30 rounded-lg flex items-center justify-center">
              <IconClock size={20} className="text-black" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Estado</p>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-section rounded-[var(--radius-card)] p-6 mb-6 shadow-[var(--shadow-default)]">
        <h2 className="font-overlock text-xl font-bold text-black mb-4 flex items-center gap-2">
          <IconMapPin size={24} className="text-illustration-primary" />
          Ubicación
        </h2>

        <p className="text-black mb-4">{service.address}</p>

        <div className="h-[250px] rounded-[var(--radius-card)] overflow-hidden">
          {mapLat && mapLng ? (
            <LocationMap
              lat={mapLat}
              lng={mapLng}
              name={service.address || 'Ubicación del servicio'}
            />
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Ubicación no disponible</p>
            </div>
          )}
        </div>
      </div>

      {/* Special Cares (conditional) */}
      {service.special_cares && (
        <div className="bg-section rounded-[var(--radius-card)] p-6 mb-6 shadow-[var(--shadow-default)]">
          <h2 className="font-overlock text-xl font-bold text-black mb-4 flex items-center gap-2">
            <IconHeart size={24} className="text-illustration-primary" />
            Cuidados Especiales
          </h2>
          <p className="text-gray-700 leading-relaxed">{service.special_cares}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/schedule" className="flex-1">
          <Button variant="blue" className="w-full">
            <IconCalendarEvent size={20} className="mr-2" />
            Ver mis citas
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button variant="pink" className="w-full">
            <IconHome size={20} className="mr-2" />
            Volver al inicio
          </Button>
        </Link>
      </div>
    </main>
  );
}
