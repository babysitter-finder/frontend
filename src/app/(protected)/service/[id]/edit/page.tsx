'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useServiceStore } from '@/stores';
import { Input, Select, TextArea, DatePicker, MapPicker } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Shift, ServiceStatus } from '@/types';

const SHIFT_OPTIONS = [
  { value: 'morning', label: 'Mañana (6:00 - 12:00)' },
  { value: 'afternoon', label: 'Tarde (12:00 - 18:00)' },
  { value: 'evening', label: 'Noche (18:00 - 24:00)' },
  { value: 'night', label: 'Madrugada (00:00 - 6:00)' },
];

// Only these statuses can be edited
const EDITABLE_STATUSES: ServiceStatus[] = ['pending', 'accepted'];

interface FormData {
  date: string;
  count_children: number;
  shift: Shift;
  address: string;
  special_cares: string;
  lat: string;
  long: string;
}

interface FormErrors {
  date?: string;
  count_children?: string;
  address?: string;
  location?: string;
  special_cares?: string;
}

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;

  const {
    editForm: service,
    loading,
    error,
    getService,
    updateService,
  } = useServiceStore();

  // Local form state
  const [formData, setFormData] = useState<FormData>({
    date: '',
    count_children: 1,
    shift: 'morning',
    address: '',
    special_cares: '',
    lat: '',
    long: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch service on mount
  useEffect(() => {
    if (serviceId) {
      getService(serviceId);
    }
  }, [serviceId, getService]);

  // Populate form when service loads
  useEffect(() => {
    if (service) {
      setFormData({
        date: service.date || '',
        count_children: service.count_children || 1,
        shift: service.shift || 'morning',
        address: service.address || '',
        special_cares: service.special_cares || '',
        lat: service.lat || '',
        long: service.long || '',
      });
    }
  }, [service]);

  // Check if form has been modified
  const isDirty = useMemo(() => {
    if (!service) return false;
    return (
      formData.date !== (service.date || '') ||
      formData.count_children !== (service.count_children || 1) ||
      formData.shift !== (service.shift || 'morning') ||
      formData.address !== (service.address || '') ||
      formData.special_cares !== (service.special_cares || '') ||
      formData.lat !== (service.lat || '') ||
      formData.long !== (service.long || '')
    );
  }, [formData, service]);

  // Check if service can be edited
  const canEdit = useMemo(() => {
    if (!service) return false;
    const status = (service.status || 'pending') as ServiceStatus;
    return EDITABLE_STATUSES.includes(status);
  }, [service]);

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is modified
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date validation
    if (!formData.date) {
      errors.date = 'La fecha es requerida';
    } else {
      const selectedDate = new Date(formData.date);
      if (selectedDate < today) {
        errors.date = 'La fecha debe ser en el futuro';
      }
    }

    // Children count validation
    if (!formData.count_children || formData.count_children < 1) {
      errors.count_children = 'Mínimo 1 niño';
    } else if (formData.count_children > 10) {
      errors.count_children = 'Máximo 10 niños';
    }

    // Address validation
    if (!formData.address) {
      errors.address = 'La dirección es requerida';
    } else if (formData.address.length < 10) {
      errors.address = 'La dirección debe tener al menos 10 caracteres';
    }

    // Location validation
    if (!formData.lat || !formData.long) {
      errors.location = 'Selecciona una ubicación en el mapa';
    }

    // Special cares validation (optional but max length)
    if (formData.special_cares && formData.special_cares.length > 500) {
      errors.special_cares = 'Máximo 500 caracteres';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      setShowSaveModal(true);
    }
  };

  const handleConfirmSave = async () => {
    setIsSubmitting(true);
    try {
      await updateService(serviceId, formData);
      router.push('/schedule');
    } catch {
      setIsSubmitting(false);
      setShowSaveModal(false);
    }
  };

  const handleCancelClick = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      router.push('/schedule');
    }
  };

  const handleConfirmDiscard = () => {
    router.push('/schedule');
  };

  // Loading state
  if (loading && !service) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-48 mb-8" />
          <div className="h-24 bg-gray-200 rounded-lg mb-6" />
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded" />
            </div>
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </main>
    );
  }

  // Error or not found state
  if (error || !service) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-container rounded-[var(--radius-card)] p-12 text-center shadow-[var(--shadow-default)]">
          <p className="text-6xl mb-4">😢</p>
          <h1 className="text-2xl font-overlock text-black mb-2">
            Cita no encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'No pudimos encontrar la cita que buscas.'}
          </p>
          <Link href="/schedule">
            <Button variant="pink">Volver a mis citas</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Cannot edit state
  if (!canEdit) {
    const status = (service.status || 'pending') as ServiceStatus;
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-container rounded-[var(--radius-card)] p-12 text-center shadow-[var(--shadow-default)]">
          <p className="text-6xl mb-4">🔒</p>
          <h1 className="text-2xl font-overlock text-black mb-2">
            No se puede editar esta cita
          </h1>
          <div className="flex justify-center mb-4">
            <StatusBadge status={status} />
          </div>
          <p className="text-gray-600 mb-6">
            Solo se pueden editar citas con estado &quot;Pendiente&quot; o &quot;Confirmada&quot;.
          </p>
          <Link href="/schedule">
            <Button variant="pink">Volver a mis citas</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Get babysitter info
  const babysitter = service.babysitter;
  const babysitterName = babysitter
    ? `${babysitter.first_name || ''} ${babysitter.last_name || ''}`.trim()
    : 'Niñera asignada';

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="font-overlock text-3xl font-bold text-black mb-6">
        Editar Cita
      </h1>

      {/* Babysitter Info Card (Read-only) */}
      <div className="bg-container rounded-[var(--radius-card)] p-4 mb-8 shadow-[var(--shadow-default)]">
        <div className="flex items-center gap-4">
          {babysitter?.picture ? (
            <Image
              src={babysitter.picture}
              alt={babysitterName}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-illustration-secondary flex items-center justify-center text-white text-xl font-bold">
              {babysitterName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-overlock text-lg font-bold text-black">
              {babysitterName}
            </h3>
            <p className="text-gray-600 text-sm">Niñera asignada</p>
          </div>
          <StatusBadge status={(service.status || 'pending') as ServiceStatus} />
        </div>
      </div>

      {/* Edit Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Date Selection */}
        <DatePicker
          label="Fecha del servicio"
          value={formData.date}
          onChange={(date) => handleChange('date', date)}
          minDate={new Date()}
          error={formErrors.date}
        />

        {/* Children Count & Shift - Grid Row */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            name="count_children"
            label="Cantidad de niños"
            min={1}
            max={10}
            value={formData.count_children}
            onChange={(e) =>
              handleChange('count_children', parseInt(e.target.value) || 1)
            }
            error={formErrors.count_children}
            required
          />
          <Select
            name="shift"
            label="Turno"
            value={formData.shift}
            onChange={(e) => handleChange('shift', e.target.value as Shift)}
            options={SHIFT_OPTIONS}
            required
          />
        </div>

        {/* Address */}
        <Input
          name="address"
          label="Dirección"
          placeholder="Ingresa la dirección del servicio"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          error={formErrors.address}
          required
        />

        {/* Map Picker */}
        <MapPicker
          label="Selecciona la ubicación en el mapa"
          value={{ lat: formData.lat, long: formData.long }}
          onChange={(coords) => {
            handleChange('lat', coords.lat);
            handleChange('long', coords.long);
          }}
          error={formErrors.location}
        />

        {/* Special Cares */}
        <TextArea
          name="special_cares"
          label="Cuidados especiales"
          placeholder="Indica si tus hijos requieren cuidados especiales..."
          value={formData.special_cares}
          onChange={(e) => handleChange('special_cares', e.target.value)}
          error={formErrors.special_cares}
          maxLength={500}
        />

        {/* Store Error Message */}
        {error && (
          <div className="bg-negative/10 border border-negative rounded-lg p-4">
            <p className="text-negative text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="pink"
            className="flex-1"
            onClick={handleCancelClick}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="blue"
            className="flex-1"
            onClick={handleSaveClick}
            disabled={loading || !isDirty}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>

      {/* Save Confirmation Modal */}
      <Modal open={showSaveModal} onClose={() => setShowSaveModal(false)}>
        <div className="text-center">
          <div className="text-5xl mb-4">💾</div>
          <h2 className="text-2xl font-bold text-black mb-2 font-overlock">
            ¿Guardar cambios?
          </h2>
          <p className="text-gray-600 mb-6">
            La niñera será notificada de los cambios realizados.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="pink"
              onClick={() => setShowSaveModal(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="green"
              onClick={handleConfirmSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Sí, guardar'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Discard Changes Modal */}
      <Modal open={showDiscardModal} onClose={() => setShowDiscardModal(false)}>
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-black mb-2 font-overlock">
            ¿Descartar cambios?
          </h2>
          <p className="text-gray-600 mb-6">
            Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="pink"
              onClick={() => setShowDiscardModal(false)}
            >
              Seguir editando
            </Button>
            <Button
              variant="red"
              onClick={handleConfirmDiscard}
            >
              Sí, descartar
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
