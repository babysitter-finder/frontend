'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useServiceStore, useUserStore } from '@/stores';
import { ServiceCard, BabysitterServiceCard, EmptySchedule } from '@/components/appointments';
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

type ModalType = 'delete' | 'accept' | 'reject' | 'start' | 'end' | null;

export default function SchedulePage() {
  const router = useRouter();
  const { user } = useUserStore();
  const {
    services,
    loading,
    error,
    fetchServices,
    deleteService,
    acceptService,
    rejectService,
    onMyWay,
    startService,
    endService,
  } = useServiceStore();

  const [activeTab, setActiveTab] = useState<FilterTab>('upcoming');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Check if user is a babysitter
  const isBabysitter = Boolean(user?.user_bbs);

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

  // Client handlers
  const handleDeleteClick = (id: string) => {
    setSelectedServiceId(id);
    setModalType('delete');
  };

  const handleEdit = (id: string) => {
    router.push(`/service/${id}/edit`);
  };

  // Babysitter handlers
  const handleAcceptClick = (id: string) => {
    setSelectedServiceId(id);
    setModalType('accept');
  };

  const handleRejectClick = (id: string) => {
    setSelectedServiceId(id);
    setModalType('reject');
  };

  const handleOnMyWay = async (id: string) => {
    await onMyWay(id);
    fetchServices(); // Refresh to get updated status
  };

  const handleStartClick = (id: string) => {
    setSelectedServiceId(id);
    setModalType('start');
  };

  const handleEndClick = (id: string) => {
    setSelectedServiceId(id);
    setModalType('end');
  };

  // Modal confirm handlers
  const handleConfirmAction = async () => {
    if (!selectedServiceId) return;

    switch (modalType) {
      case 'delete':
        await deleteService(selectedServiceId);
        break;
      case 'accept':
        await acceptService(selectedServiceId);
        break;
      case 'reject':
        await rejectService(selectedServiceId);
        break;
      case 'start':
        await startService(selectedServiceId);
        fetchServices();
        break;
      case 'end':
        await endService(selectedServiceId);
        fetchServices();
        break;
    }

    setModalType(null);
    setSelectedServiceId(null);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedServiceId(null);
  };

  const getEmptyVariant = () => {
    if (services.length === 0) return 'no-appointments';
    if (activeTab === 'upcoming') return 'no-upcoming';
    return 'no-results';
  };

  // Modal content based on type
  const getModalContent = () => {
    switch (modalType) {
      case 'delete':
        return {
          icon: '⚠️',
          title: '¿Cancelar esta cita?',
          message: isBabysitter
            ? 'Esta acción no se puede deshacer. El cliente será notificado.'
            : 'Esta acción no se puede deshacer. La niñera será notificada de la cancelación.',
          confirmText: 'Sí, cancelar',
          confirmVariant: 'red' as const,
        };
      case 'accept':
        return {
          icon: '✅',
          title: '¿Aceptar este servicio?',
          message: 'Al aceptar, te comprometes a asistir en la fecha y hora indicadas.',
          confirmText: 'Sí, aceptar',
          confirmVariant: 'green' as const,
        };
      case 'reject':
        return {
          icon: '❌',
          title: '¿Rechazar este servicio?',
          message: 'El cliente será notificado y podrá buscar otra niñera.',
          confirmText: 'Sí, rechazar',
          confirmVariant: 'red' as const,
        };
      case 'start':
        return {
          icon: '▶️',
          title: '¿Iniciar el servicio?',
          message: 'Esto marcará el inicio del tiempo de cuidado.',
          confirmText: 'Iniciar servicio',
          confirmVariant: 'green' as const,
        };
      case 'end':
        return {
          icon: '🏁',
          title: '¿Finalizar el servicio?',
          message: 'Esto marcará el fin del servicio y se calculará el costo final.',
          confirmText: 'Finalizar servicio',
          confirmVariant: 'red' as const,
        };
      default:
        return null;
    }
  };

  const modalContent = getModalContent();

  return (
    <main
      aria-label={isBabysitter ? 'Mis Servicios' : 'Mis Citas'}
      className="p-[var(--spacing-medium)] max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-black font-overlock">
          {isBabysitter ? 'Mis Servicios' : 'Mis Citas'}
        </h1>
        {services.length > 0 && (
          <p className="text-gray-600 mt-1">
            {filteredServices.length} {filteredServices.length === 1 ? (isBabysitter ? 'servicio' : 'cita') : (isBabysitter ? 'servicios' : 'citas')}
          </p>
        )}
      </div>

      {/* Filter Tabs */}
      {services.length > 0 && (
        <nav aria-label="Filtros" className="mb-6">
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
          <p className="text-gray-600">
            {isBabysitter ? 'Cargando servicios...' : 'Cargando citas...'}
          </p>
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
        <section aria-label="Lista" className="space-y-4">
          {filteredServices.map((service) =>
            isBabysitter ? (
              <BabysitterServiceCard
                key={service.id}
                service={service}
                onAccept={handleAcceptClick}
                onReject={handleRejectClick}
                onMyWay={handleOnMyWay}
                onStart={handleStartClick}
                onEnd={handleEndClick}
              />
            ) : (
              <ServiceCard
                key={service.id}
                service={service}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}
              />
            )
          )}
        </section>
      )}

      {/* Confirmation Modal */}
      <Modal open={modalType !== null} onClose={handleCloseModal}>
        {modalContent && (
          <div className="text-center">
            <div className="text-5xl mb-4">{modalContent.icon}</div>
            <h2 className="text-2xl font-bold text-black mb-2 font-overlock">
              {modalContent.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {modalContent.message}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="pink" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button
                variant={modalContent.confirmVariant}
                onClick={handleConfirmAction}
                disabled={loading}
              >
                {loading ? 'Procesando...' : modalContent.confirmText}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
