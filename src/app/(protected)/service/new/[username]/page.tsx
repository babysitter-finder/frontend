'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useBabysitterStore } from '@/stores/babysitter-store';
import { useServiceStore } from '@/stores/service-store';
import { BabysitterHeader } from '@/components/ui';
import { Input, TextArea, DatePicker, MapPicker } from '@/components/forms';
import { Button } from '@/components/ui';
import { Modal } from '@/components/ui/modal';
import { IconCalendarPlus } from '@tabler/icons-react';

interface FormErrors {
  date?: string;
  start_time?: string;
  count_children?: string;
  address?: string;
  location?: string;
  special_cares?: string;
}

export default function CreateServicePage() {
  const params = useParams();
  const username = params.username as string;

  // Stores
  const {
    selectedBabysitter,
    selectBabysitter,
    loading: babysitterLoading,
    error: babysitterError,
  } = useBabysitterStore();

  const {
    setServiceForm,
    registerService,
    loading: serviceLoading,
    error: serviceError,
  } = useServiceStore();

  // Local form state
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    count_children: 1,
    address: '',
    special_cares: '',
    lat: '',
    long: '',
  });

  // Form validation and modal state
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch babysitter on mount
  useEffect(() => {
    selectBabysitter(username);
  }, [username, selectBabysitter]);

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
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

    // Time validation
    if (!formData.start_time) {
      errors.start_time = 'La hora de inicio es requerida';
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

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    // Update store form state
    setServiceForm(formData);

    // Small delay to ensure store is updated before API call
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Register service (store handles redirect on success)
    await registerService(username);

    setIsSubmitting(false);
    setShowConfirmModal(false);
  };

  if (babysitterLoading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded-lg mb-8" />
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (babysitterError || !selectedBabysitter) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">
            {babysitterError || 'No se pudo encontrar la niñera'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="font-overlock text-3xl font-bold text-black mb-6">
        Solicitar Servicio
      </h1>

      <BabysitterHeader babysitter={selectedBabysitter} className="mb-8" />

      <form onSubmit={handleSubmitClick} className="space-y-6">
        {/* Date Selection */}
        <DatePicker
          label="Fecha del servicio"
          value={formData.date}
          onChange={(date) => handleChange('date', date)}
          minDate={new Date()}
          error={formErrors.date}
        />

        {/* Time & Children Count - Grid Row */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="time"
            name="start_time"
            label="Hora de inicio"
            value={formData.start_time}
            onChange={(e) => handleChange('start_time', e.target.value)}
            error={formErrors.start_time}
            required
          />
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

        {/* Error Message */}
        {serviceError && (
          <div className="bg-negative/10 border border-negative rounded-lg p-4">
            <p className="text-negative text-sm">{serviceError}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="pink"
          className="w-full"
          disabled={serviceLoading}
        >
          {serviceLoading ? 'Creando servicio...' : 'Solicitar Servicio'}
        </Button>
      </form>

      {/* Confirmation Modal */}
      <Modal open={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <IconCalendarPlus size={48} className="text-illustration-primary" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2 font-overlock">
            ¿Solicitar servicio?
          </h2>
          <p className="text-gray-600 mb-6">
            Se enviará la solicitud a la niñera seleccionada.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="pink"
              onClick={() => setShowConfirmModal(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="green"
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Sí, solicitar'}
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
