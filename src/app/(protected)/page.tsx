'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useBabysitterStore, useUserStore, useServiceStore } from '@/stores';
import { StarsRate } from '@/components/ui';
import type { Service, Babysitter } from '@/types';

// Dynamically import maps to avoid SSR issues
const ServiceMap = dynamic(() => import('@/components/ui/ServiceMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-container rounded-[var(--radius-card)] flex items-center justify-center">
      <p className="text-gray-600">Cargando mapa...</p>
    </div>
  ),
});

const BabysitterMap = dynamic(() => import('@/components/ui/BabysitterMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#d4c4b0] flex items-center justify-center">
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

  // Ensure services is always an array
  const services = Array.isArray(realServices) ? realServices : [];

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
                        src={service.client?.picture || '/assets/girl.jpeg'}
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
                        src={service.client?.picture || '/assets/girl.jpeg'}
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

// Client Dashboard Component
function ClientDashboard() {
  const { babysitters, loading, getBabysitters } = useBabysitterStore();
  const [selectedBabysitter, setSelectedBabysitter] = useState<Babysitter | null>(null);

  useEffect(() => {
    getBabysitters();
  }, [getBabysitters]);

  // Get babysitters with valid coordinates for the map
  const babysittersWithCoords = babysitters.filter(
    (b) => b.lat && b.long
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-105px)]">
      {/* Main Content */}
      <div className="flex-1 bg-[#d4c4b0] p-6">
        {/* Title Section */}
        <div className="bg-[#f5e6d3] rounded-[var(--radius-card)] py-6 mb-6">
          <h1 className="text-4xl text-center text-[#1a365d] font-overlock">Niñeras</h1>
        </div>

        {/* Split View */}
        <div className="flex gap-4 h-[500px]">
          {/* Left Side - Babysitter List */}
          <div className="w-[300px] overflow-y-auto space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Cargando niñeras...</p>
              </div>
            ) : babysitters.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No hay niñeras disponibles.</p>
              </div>
            ) : (
              babysitters.map((babysitter) => (
                <button
                  key={babysitter.username}
                  onClick={() => setSelectedBabysitter(babysitter)}
                  className={`w-full text-left bg-white rounded-[var(--radius-card)] p-3 shadow-sm hover:shadow-md transition-shadow border-2 ${
                    selectedBabysitter?.username === babysitter.username
                      ? 'border-illustration-primary'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-[#1a365d] overflow-hidden flex-shrink-0">
                      <Image
                        src={babysitter.picture || '/assets/girl.jpeg'}
                        alt={babysitter.first_name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-black truncate">
                        {babysitter.first_name} {babysitter.last_name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{babysitter.rating || 4.5}</span>
                        <StarsRate rating={babysitter.rating || 4.5} size="small" />
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Right Side - Map */}
          <div className="flex-1 rounded-[var(--radius-card)] overflow-hidden">
            <BabysitterMap
              babysitters={babysittersWithCoords}
              selectedBabysitter={selectedBabysitter}
              onSelectBabysitter={setSelectedBabysitter}
            />
          </div>
        </div>

        {/* Selected Babysitter Action */}
        {selectedBabysitter && (
          <div className="mt-4 text-center">
            <Link
              href={`/babysitter/${selectedBabysitter.username}`}
              className="inline-block bg-illustration-primary text-white px-6 py-2 rounded-[var(--radius-card)] font-medium hover:opacity-90 transition-opacity"
            >
              Ver perfil de {selectedBabysitter.first_name}
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#d4c4b0] border-t-2 border-[#c9a86c] py-6">
        <div className="text-center">
          <p className="text-[#1a365d] font-medium mb-4">Siguenos</p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  const { user } = useUserStore();
  const { getBabysitters } = useBabysitterStore();

  useEffect(() => {
    if (!user?.user_bbs) {
      getBabysitters();
    }
  }, [user, getBabysitters]);

  // If user is a babysitter, show babysitter dashboard
  if (user?.user_bbs) {
    return <BabysitterDashboard />;
  }

  // Client view - show client dashboard
  return <ClientDashboard />;
}
