'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/stores';
import { Button } from '@/components/ui';
import { Input, Select } from '@/components/forms';

export default function EditProfilePage() {
  const { user, updateUserData, loading, error, getUserData } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    birthdate: '',
    genre: 'male' as 'male' | 'female',
    phone_number: '',
    address: '',
    picture: undefined as File | undefined,
  });

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // Sync form when user data loads - using userKey to track meaningful changes
  const userKey = user ? `${user.username}-${user.email}` : '';
  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        birthdate: user.birthdate || '',
        genre: user.genre || 'male',
        phone_number: user.phone_number || '',
        address: user.address || '',
        picture: undefined,
      });
      if (user.picture) {
        setPhotoPreview(user.picture);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, picture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserData(form);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-brown-main p-[var(--spacing-medium)]">
        <p className="text-black">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-main p-[var(--spacing-medium)]">
      <div className="max-w-2xl mx-auto bg-container rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-8">
        <h2 className="text-center mb-8">Editar Perfil</h2>

        {error && (
          <div className="bg-negative/10 border border-negative text-negative px-4 py-3 rounded-[var(--radius-card)] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <div className="flex flex-col items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 rounded-full border-4 border-illustration-secondary overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            >
              {(photoPreview || user.picture) ? (
                <Image
                  src={photoPreview || user.picture || ''}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-pink-light flex items-center justify-center">
                  <span className="text-black text-sm text-center">Cambiar foto</span>
                </div>
              )}
            </button>
            <span className="text-sm text-gray-600">Click para cambiar foto</span>
          </div>

          {/* Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              name="first_name"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              required
            />
            <Input
              label="Apellido"
              name="last_name"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              required
            />
          </div>

          {/* Birthdate */}
          <Input
            label="Fecha de nacimiento"
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
            required
          />

          {/* Gender */}
          <Select
            label="Genero"
            name="genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value as 'male' | 'female' })}
            options={[
              { value: 'male', label: 'Masculino' },
              { value: 'female', label: 'Femenino' },
            ]}
          />

          {/* Phone */}
          <Input
            label="Celular"
            type="tel"
            name="phone_number"
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            required
          />

          {/* Address */}
          <Input
            label="Direccion"
            name="address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/profile">
              <Button type="button" variant="pink">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="blue" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
