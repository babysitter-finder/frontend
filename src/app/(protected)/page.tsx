'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useBabysitterStore, useUserStore, useServiceStore } from '@/stores';
import { StarsRate } from '@/components/ui';
import type { Service } from '@/types';

// Dynamically import map to avoid SSR issues
const ServiceMap = dynamic(() => import('@/components/ui/ServiceMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-container rounded-[var(--radius-card)] flex items-center justify-center">
      <p className="text-gray-600">Cargando mapa...</p>
    </div>
  ),
});

// Babysitter Dashboard Component
function BabysitterDashboard() {
  const { user } = useUserStore();
  const { services: realServices, loading, fetchServices } = useServiceStore();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const services = realServices;

  // Filter services by status
  const upcomingServices = services.filter(
    (s) => s.status === 'accepted' || s.status === 'in_progress'
  );
  const pendingRequests = services.filter((s) => s.status === 'pending');
  const completedServices = services.filter((s) => s.status === 'completed');

  // Get services with valid coordinates for the map
  const servicesWithCoords = services.filter(
    (s) => s.lat && s.long && (s.status === 'accepted' || s.status === 'in_progress' || s.status === 'pending')
  );

  const getShiftLabel = (shift: string) => {
    const shifts: Record<string, string> = {
      morning: 'Mañana',
      afternoon: 'Tarde',
      evening: 'Noche',
      night: 'Nocturno',
    };
    return shifts[shift] || shift;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-black';
      case 'accepted':
        return 'bg-blue-background text-black';
      case 'in_progress':
        return 'bg-illustration-primary text-white';
      case 'completed':
        return 'bg-positive text-white';
      case 'cancelled':
        return 'bg-negative text-white';
      default:
        return 'bg-container text-black';
    }
  };

  const getStatusLabel = (status: string) => {
    const statuses: Record<string, string> = {
      pending: 'Pendiente',
      accepted: 'Aceptado',
      in_progress: 'En progreso',
      completed: 'Completado',
      cancelled: 'Cancelado',
    };
    return statuses[status] || status;
  };

  return (
    <div className="h-[calc(100vh-105px)] flex">
      {/* Left Side - Stats & Service Lists */}
      <div className="w-[400px] border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-positive/20 rounded-[var(--radius-card)] p-4 text-center">
            <p className="text-3xl font-bold text-positive">{completedServices.length}</p>
            <p className="text-sm text-gray-600">Completados</p>
          </div>
          <div className="bg-warning/20 rounded-[var(--radius-card)] p-4 text-center">
            <p className="text-3xl font-bold text-warning">{pendingRequests.length}</p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-warning rounded-full"></span>
              Solicitudes Pendientes
            </h2>
            <div className="space-y-2">
              {pendingRequests.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left bg-section rounded-[var(--radius-card)] p-3 shadow-sm hover:shadow-md transition-shadow border-2 ${
                    selectedService?.id === service.id ? 'border-illustration-primary' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-black overflow-hidden flex-shrink-0">
                      <Image
                        src={service.client?.picture || '/assets/default-avatar.png'}
                        alt={service.client?.first_name || 'Cliente'}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-black truncate">
                        {service.client?.first_name} {service.client?.last_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.date} • {getShiftLabel(service.shift)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                      {getStatusLabel(service.status)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Services */}
        <div>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-illustration-primary rounded-full"></span>
            Próximos Servicios
          </h2>
          {upcomingServices.length === 0 ? (
            <p className="text-gray-600 text-sm">No tienes servicios próximos.</p>
          ) : (
            <div className="space-y-2">
              {upcomingServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left bg-section rounded-[var(--radius-card)] p-3 shadow-sm hover:shadow-md transition-shadow border-2 ${
                    selectedService?.id === service.id ? 'border-illustration-primary' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-black overflow-hidden flex-shrink-0">
                      <Image
                        src={service.client?.picture || '/assets/default-avatar.png'}
                        alt={service.client?.first_name || 'Cliente'}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-black truncate">
                        {service.client?.first_name} {service.client?.last_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.date} • {getShiftLabel(service.shift)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                      {getStatusLabel(service.status)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View All Link */}
        <Link
          href="/schedule"
          className="text-center text-illustration-primary font-medium hover:underline"
        >
          Ver todos los servicios
        </Link>
      </div>

      {/* Right Side - Map & Details */}
      <div className="flex-1 flex flex-col">
        {/* Selected Service Details */}
        {selectedService && (
          <div className="p-4 border-b border-gray-200 bg-section">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  {selectedService.client?.first_name} {selectedService.client?.last_name}
                </h3>
                <p className="text-gray-600">{selectedService.address}</p>
                <p className="text-gray-600">
                  {selectedService.date} • {getShiftLabel(selectedService.shift)} • {selectedService.count_children} niño(s)
                </p>
                {selectedService.special_cares && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Cuidados especiales:</span> {selectedService.special_cares}
                  </p>
                )}
              </div>
              <Link
                href={`/service/${selectedService.id}`}
                className="bg-illustration-primary text-white px-4 py-2 rounded-[var(--radius-card)] text-sm font-medium hover:opacity-90"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="flex-1 p-4">
          <ServiceMap
            services={servicesWithCoords}
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { user } = useUserStore();
  const { babysitters, loading, getBabysitters } = useBabysitterStore();

  useEffect(() => {
    if (!user?.user_bbs) {
      getBabysitters();
    }
  }, [user, getBabysitters]);

  // If user is a babysitter, show dashboard
  if (user?.user_bbs) {
    return <BabysitterDashboard />;
  }

  // Client view - show babysitters list
  return (
    <div className="p-[var(--spacing-medium)]">
      <h1 className="text-4xl mb-6">Nineras Disponibles</h1>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Cargando nineras...</p>
        </div>
      ) : babysitters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No hay nineras disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {babysitters.map((babysitter) => (
            <Link
              key={babysitter.username}
              href={`/babysitter/${babysitter.username}`}
              className="block no-underline"
            >
              <div className="bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-black overflow-hidden flex-shrink-0">
                    <Image
                      src={babysitter.picture || '/assets/girl.jpeg'}
                      alt={babysitter.first_name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-black truncate">
                      {babysitter.first_name} {babysitter.last_name}
                    </h3>
                    {babysitter.rating && (
                      <StarsRate rating={babysitter.rating} size="small" />
                    )}
                    <p className="text-illustration-primary font-medium mt-1">
                      ${babysitter.cost_of_service}/hr
                    </p>
                  </div>
                </div>
                {babysitter.about_me && (
                  <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                    {babysitter.about_me}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
