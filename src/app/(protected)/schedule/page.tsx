'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useServiceStore } from '@/stores';
import { ServiceCard, EmptySchedule } from '@/components/appointments';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import type { ServiceStatus } from '@/types';

type FilterTab = 'upcoming' | 'past' | 'cancelled';

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'upcoming', label: 'Próximas' },
  { key: 'past', label: 'Pasadas' },
  { key: 'cancelled', label: 'Canceladas' },
];

const UPCOMING_STATUSES: ServiceStatus[] = ['pending', 'accepted', 'on_my_way', 'in_progress'];
const PAST_STATUSES: ServiceStatus[] = ['completed'];
const CANCELLED_STATUSES: ServiceStatus[] = ['cancelled'];

export default function SchedulePage() {
  const router = useRouter();
  const { services, loading, error, fetchServices, deleteService } = useServiceStore();
  const [activeTab, setActiveTab] = useState<FilterTab>('upcoming');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filteredServices = useMemo(() => {
    if (!services) return [];

    return services.filter((service) => {
      const status = service.status || 'pending';

      switch (activeTab) {
        case 'upcoming':
          return UPCOMING_STATUSES.includes(status);
        case 'past':
          return PAST_STATUSES.includes(status);
        case 'cancelled':
          return CANCELLED_STATUSES.includes(status);
        default:
          return true;
      }
    });
  }, [services, activeTab]);

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (serviceToDelete) {
      await deleteService(serviceToDelete);
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setServiceToDelete(null);
  };

  const handleEdit = (id: string) => {
    router.push(`/service/${id}/edit`);
  };

  const getEmptyVariant = () => {
    if (services.length === 0) return 'no-appointments';
    if (activeTab === 'upcoming') return 'no-upcoming';
    return 'no-results';
  };

  return (
    <main
      aria-label="Mis Citas"
      className="p-[var(--spacing-medium)] max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-black font-overlock">Mis Citas</h1>
        {services.length > 0 && (
          <p className="text-gray-600 mt-1">
            {filteredServices.length} {filteredServices.length === 1 ? 'cita' : 'citas'}
          </p>
        )}
      </div>

      {/* Filter Tabs */}
      {services.length > 0 && (
        <nav aria-label="Filtros de citas" className="mb-6">
          <div className="flex gap-2 bg-section rounded-[var(--radius-card)] p-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={activeTab === tab.key}
                className={`
                  flex-1 px-4 py-2 rounded-lg font-medium transition-all
                  ${
                    activeTab === tab.key
                      ? 'bg-illustration-secondary text-black shadow-sm'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-illustration-secondary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Cargando citas...</p>
        </div>
      ) : error ? (
        <div className="bg-negative/10 text-negative p-4 rounded-lg text-center">
          <p>{error}</p>
          <Button
            variant="red"
            onClick={() => fetchServices()}
            className="mt-4"
          >
            Reintentar
          </Button>
        </div>
      ) : filteredServices.length === 0 ? (
        <EmptySchedule variant={getEmptyVariant()} />
      ) : (
        <section aria-label="Lista de citas" className="space-y-4">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
            />
          ))}
        </section>
      )}

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={handleCancelDelete}>
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-black mb-2 font-overlock">
            ¿Cancelar esta cita?
          </h2>
          <p className="text-gray-600 mb-6">
            Esta acción no se puede deshacer. La niñera será notificada de la cancelación.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="pink" onClick={handleCancelDelete}>
              No, mantener
            </Button>
            <Button variant="red" onClick={handleConfirmDelete} disabled={loading}>
              {loading ? 'Cancelando...' : 'Sí, cancelar cita'}
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
