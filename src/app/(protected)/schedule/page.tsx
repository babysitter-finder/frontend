'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useServiceStore } from '@/stores';

export default function SchedulePage() {
  const { services, loading, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="p-[var(--spacing-medium)]">
      <h1 className="text-4xl mb-6">Mis Citas</h1>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-6 text-center">
          <p className="text-gray-600 mb-4">No tienes citas programadas.</p>
          <Link
            href="/"
            className="text-illustration-primary font-medium"
          >
            Buscar nineras
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/service/${service.id}`}
              className="block no-underline"
            >
              <div className="bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-black">
                      {service.babysitter?.first_name || 'Babysitter'} {service.babysitter?.last_name || ''}
                    </h3>
                    <p className="text-gray-600">{service.date}</p>
                    <p className="text-gray-600">{service.shift}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      service.status === 'completed'
                        ? 'bg-positive text-white'
                        : service.status === 'in_progress'
                        ? 'bg-warning text-black'
                        : 'bg-container text-black'
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
