'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useServiceStore } from '@/stores';
import { Button } from '@/components/ui';
import {
  IconMapPin,
  IconNavigation,
  IconBrandGoogle,
  IconBrandApple,
  IconCalendar,
  IconClock,
  IconArrowLeft,
  IconMoodSad,
} from '@tabler/icons-react';

// Dynamically import map to avoid SSR issues
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

export default function DirectionsPage() {
  const params = useParams();
  const router = useRouter();
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
      <div className="min-h-[calc(100vh-105px)] bg-brown-main p-[var(--spacing-medium)]">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-32" />
            <div className="h-24 bg-gray-200 rounded-[var(--radius-card)]" />
            <div className="h-[400px] bg-gray-200 rounded-[var(--radius-card)]" />
            <div className="h-16 bg-gray-200 rounded-[var(--radius-card)]" />
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !service) {
    return (
      <div className="min-h-[calc(100vh-105px)] bg-brown-main flex items-center justify-center p-[var(--spacing-medium)]">
        <div className="bg-container rounded-[var(--radius-card)] p-12 text-center shadow-[var(--shadow-default)] max-w-md">
          <div className="flex justify-center mb-4">
            <IconMoodSad size={64} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-overlock text-black mb-2">
            Servicio no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'No pudimos encontrar la información del servicio.'}
          </p>
          <Link href="/schedule">
            <Button variant="pink">Volver a mis citas</Button>
          </Link>
        </div>
      </div>
    );
  }

  const mapLat = service.lat ? parseFloat(service.lat) : null;
  const mapLng = service.long ? parseFloat(service.long) : null;

  // Navigation deep links
  const googleMapsUrl = mapLat && mapLng
    ? `https://www.google.com/maps/dir/?api=1&destination=${mapLat},${mapLng}`
    : null;
  const appleMapsUrl = mapLat && mapLng
    ? `https://maps.apple.com/?daddr=${mapLat},${mapLng}`
    : null;
  const wazeUrl = mapLat && mapLng
    ? `https://waze.com/ul?ll=${mapLat},${mapLng}&navigate=yes`
    : null;

  return (
    <div className="min-h-[calc(100vh-105px)] bg-brown-main p-[var(--spacing-medium)]">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <IconArrowLeft size={24} className="text-black" />
          </button>
          <h1 className="font-overlock text-2xl font-bold text-black">
            Direcciones
          </h1>
        </div>

        {/* Service Info Card */}
        <div className="bg-container rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-default)]">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <IconCalendar size={18} className="text-illustration-secondary" />
              <span className="text-black">{formatDate(service.date)}</span>
            </div>
            {service.start_time && (
              <div className="flex items-center gap-2">
                <IconClock size={18} className="text-illustration-secondary" />
                <span className="text-black">{formatTime(service.start_time)}</span>
              </div>
            )}
          </div>
          <div className="flex items-start gap-2 mt-3">
            <IconMapPin size={18} className="text-illustration-primary flex-shrink-0 mt-0.5" />
            <span className="text-black">{service.address}</span>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-[400px] rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-default)]">
          {mapLat && mapLng ? (
            <LocationMap
              lat={mapLat}
              lng={mapLng}
              name={service.address || 'Ubicación del servicio'}
            />
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <IconMapPin size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Ubicación no disponible</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {mapLat && mapLng && (
          <div className="bg-container rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-default)]">
            <h2 className="font-overlock text-lg font-bold text-black mb-4 flex items-center gap-2">
              <IconNavigation size={20} className="text-illustration-primary" />
              Abrir en...
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {/* Google Maps */}
              <a
                href={googleMapsUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-illustration-primary hover:shadow-md transition-all"
              >
                <IconBrandGoogle size={32} className="text-[#4285F4]" />
                <span className="text-xs text-black font-medium">Google Maps</span>
              </a>

              {/* Apple Maps */}
              <a
                href={appleMapsUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-illustration-primary hover:shadow-md transition-all"
              >
                <IconBrandApple size={32} className="text-black" />
                <span className="text-xs text-black font-medium">Apple Maps</span>
              </a>

              {/* Waze */}
              <a
                href={wazeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-illustration-primary hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 bg-[#33CCFF] rounded-full flex items-center justify-center">
                  <IconNavigation size={20} className="text-white" />
                </div>
                <span className="text-xs text-black font-medium">Waze</span>
              </a>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center pt-2">
          <Link href={`/service/${serviceId}`}>
            <Button variant="blue">
              <IconArrowLeft size={18} className="mr-2" />
              Volver al detalle
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
