'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useBabysitterStore } from '@/stores/babysitter-store';
import { useServiceStore } from '@/stores/service-store';
import { BabysitterHeader } from '@/components/ui';
import { Input, Select, TextArea, DatePicker, MapPicker } from '@/components/forms';
import { Button } from '@/components/ui';
import type { Shift } from '@/types/service';

const SHIFT_OPTIONS = [
  { value: 'morning', label: 'Manana (6:00 - 12:00)' },
  { value: 'afternoon', label: 'Tarde (12:00 - 18:00)' },
  { value: 'evening', label: 'Noche (18:00 - 24:00)' },
  { value: 'night', label: 'Madrugada (00:00 - 6:00)' },
];

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
    count_children: 1,
    shift: 'morning' as Shift,
    address: '',
    special_cares: '',
    lat: '',
    long: '',
  });

  // Fetch babysitter on mount
  useEffect(() => {
    selectBabysitter(username);
  }, [username, selectBabysitter]);

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update store form state
    setServiceForm(formData);

    // Small delay to ensure store is updated before API call
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Register service (store handles redirect on success)
    await registerService(username);
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
            {babysitterError || 'No se pudo encontrar la ninera'}
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <DatePicker
          label="Fecha del servicio"
          value={formData.date}
          onChange={(date) => handleChange('date', date)}
          minDate={new Date()}
        />

        {/* Children Count & Shift - Grid Row */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            name="count_children"
            label="Cantidad de ninos"
            min={1}
            value={formData.count_children}
            onChange={(e) =>
              handleChange('count_children', parseInt(e.target.value) || 1)
            }
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
          label="Direccion"
          placeholder="Ingresa la direccion del servicio"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          required
        />

        {/* Map Picker */}
        <MapPicker
          label="Selecciona la ubicacion en el mapa"
          value={{ lat: formData.lat, long: formData.long }}
          onChange={(coords) => {
            handleChange('lat', coords.lat);
            handleChange('long', coords.long);
          }}
        />

        {/* Special Cares */}
        <TextArea
          name="special_cares"
          label="Cuidados especiales"
          placeholder="Indica si tus hijos requieren cuidados especiales..."
          value={formData.special_cares}
          onChange={(e) => handleChange('special_cares', e.target.value)}
        />

        {/* Error Message */}
        {serviceError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{serviceError}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="pink"
          className="w-full"
          disabled={serviceLoading || !formData.date || !formData.lat}
        >
          {serviceLoading ? 'Creando servicio...' : 'Solicitar Servicio'}
        </Button>
      </form>
    </main>
  );
}
