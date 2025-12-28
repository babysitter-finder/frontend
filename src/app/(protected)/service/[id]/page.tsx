'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useServiceStore } from '@/stores';
import { Button } from '@/components/ui';
import { IconNavigation } from '@tabler/icons-react';

// Dynamically import map to avoid SSR issues
const LocationMap = dynamic(
  () => import('@/components/ui/LocationMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[#e8ddd0] rounded-[var(--radius-card)] flex items-center justify-center">
        <p className="text-gray-600">Cargando mapa...</p>
      </div>
    ),
  }
);

// Calculate age from birthdate
function calculateAge(birthdate: string): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Check if within 90 minutes of service start
function canChangeToOnMyWay(scheduledStart: string | undefined): boolean {
  if (!scheduledStart) return false;

  const serviceStart = new Date(scheduledStart);
  const now = new Date();
  const diffMs = serviceStart.getTime() - now.getTime();
  const diffMinutes = diffMs / (1000 * 60);

  // Can click if within 90 minutes before service start (and not after it started)
  return diffMinutes <= 90 && diffMinutes >= -30;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const { editForm: service, loading, error, getService, onMyWay } = useServiceStore();

  useEffect(() => {
    if (serviceId) {
      getService(serviceId);
    }
  }, [serviceId, getService]);

  // Loading state
  if (loading && !service) {
    return (
      <div className="min-h-[calc(100vh-105px)] bg-brown-main p-[var(--spacing-medium)] flex flex-col gap-6">
        <div className="max-w-4xl mx-auto w-full bg-container rounded-[var(--radius-card)] p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8" />
          <div className="flex gap-8">
            <div className="w-48 h-48 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-64" />
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-6 bg-gray-200 rounded w-40" />
              <div className="h-6 bg-gray-200 rounded w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (!service) {
    return (
      <div className="flex-1 bg-brown-main flex items-center justify-center">
        <div className="bg-container rounded-[var(--radius-card)] p-12 text-center max-w-md">
          <p className="text-6xl mb-4">😢</p>
          <h1 className="text-2xl font-overlock text-[#1a365d] mb-2">
            Servicio no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'No pudimos encontrar el servicio que buscas.'}
          </p>
          <Link href="/">
            <Button variant="pink">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const client = service.user_client || service.client;
  const genderDisplay = client?.genre === 'male' ? 'Masculino' : 'Femenino';
  const age = client?.birthdate ? calculateAge(client.birthdate) : '';

  // Map coordinates from service
  const mapLat = service.lat ? parseFloat(service.lat) : null;
  const mapLng = service.long ? parseFloat(service.long) : null;

  const handleOnMyWay = async () => {
    await onMyWay(serviceId);
  };

  // Derive status from fields
  const isOnMyWay = service.on_my_way !== null;
  const isInProgress = service.service_start !== null && service.service_end === null;
  const isCompleted = service.service_end !== null;
  const canSetOnMyWay = service.is_active && !isOnMyWay && !isInProgress && !isCompleted;

  // Check if button should be enabled
  const isWithinTimeWindow = canChangeToOnMyWay(service.scheduled_start);
  const canClickOnMyWay = canSetOnMyWay && isWithinTimeWindow;

  return (
    <div className="min-h-[calc(100vh-105px)] bg-brown-main p-[var(--spacing-medium)] flex flex-col gap-6">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto w-full bg-container rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-8">
        <h2 className="text-center mb-8 text-[#1a365d] font-overlock text-2xl">
          Perfil del Cliente
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Profile Photo */}
          <div className="w-48 h-48 rounded-full border-4 border-illustration-secondary overflow-hidden flex-shrink-0">
            <Image
              src={client?.picture || '/assets/girl.jpeg'}
              alt={client?.first_name || 'Cliente'}
              width={192}
              height={192}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Client Details */}
          <div className="flex-1 space-y-4">
            <div>
              <span className="font-bold text-[#1a365d]">Nombre: </span>
              <span className="text-[#1a365d]">{client?.first_name} {client?.last_name}</span>
            </div>

            <div>
              <span className="font-bold text-[#1a365d]">Edad: </span>
              <span className="text-[#1a365d]">{age}</span>
            </div>

            <div>
              <span className="font-bold text-[#1a365d]">Genero: </span>
              <span className="text-[#1a365d]">{genderDisplay}</span>
            </div>

            <div>
              <span className="font-bold text-[#1a365d]">Celular: </span>
              <span className="text-[#1a365d]">{client?.phone_number}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-8 text-center">
          <span className="font-bold text-[#1a365d] italic">Direccion: </span>
          <span className="text-[#1a365d] italic">{service.address}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="pink"
            onClick={handleOnMyWay}
            disabled={loading || !canClickOnMyWay}
          >
            {loading ? 'Actualizando...' : isOnMyWay || isInProgress ? 'En camino' : 'Estoy en camino'}
          </Button>
          <Link href={`/service/${serviceId}/directions`}>
            <Button variant="blue">
              <IconNavigation size={18} className="mr-2" />
              Ver direcciones
            </Button>
          </Link>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-4xl mx-auto w-full h-[300px] rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-default)]">
        {mapLat && mapLng ? (
          <LocationMap
            lat={mapLat}
            lng={mapLng}
            name={service.address || 'Ubicación del servicio'}
          />
        ) : (
          <div className="h-full w-full bg-[#e8ddd0] flex items-center justify-center">
            <p className="text-gray-600">Ubicación no disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}
