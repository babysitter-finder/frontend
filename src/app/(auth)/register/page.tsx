'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Input, Select } from '@/components/forms';
import { useUserStore } from '@/stores';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error, popUp, closePopUp } = useUserStore();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birthdate: string;
    genre: 'male' | 'female';
    phone_number: string;
    address: string;
    user_bbs: boolean;
  }>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthdate: '',
    genre: 'male',
    phone_number: '',
    address: '',
    user_bbs: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(form);
  };

  const handlePopUpClose = () => {
    closePopUp();
    router.push('/login');
  };

  if (popUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-8 max-w-md text-center">
          <h2 className="text-2xl mb-4">Registro Exitoso!</h2>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido creada. Revisa tu correo para confirmar tu cuenta.
          </p>
          <Button onClick={handlePopUpClose} variant="pink">
            Ir a Iniciar Sesion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block flex-1 bg-illustration-secondary relative">
        <Image
          src="/assets/background.jpg"
          alt="Babysitter"
          fill
          className="object-cover opacity-80"
        />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-[var(--spacing-large)] bg-section overflow-y-auto py-8">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Image
              src="/assets/logo.png"
              alt="Hi Sitter"
              width={80}
              height={80}
            />
          </div>

          <h1 className="text-4xl mb-2">Crear Cuenta</h1>
          <p className="text-gray-600 mb-8">Completa tus datos para registrarte</p>

          {error && (
            <div className="bg-negative/10 border border-negative text-negative px-4 py-3 rounded-[var(--radius-card)] mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="first_name"
                label="Nombre"
                placeholder="Juan"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                required
              />
              <Input
                name="last_name"
                label="Apellido"
                placeholder="Perez"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                required
              />
            </div>

            <Input
              type="email"
              name="email"
              label="Correo electronico"
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <Input
              type="password"
              name="password"
              label="Contrasena"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                name="birthdate"
                label="Fecha de nacimiento"
                value={form.birthdate}
                onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
                required
              />
              <Select
                name="genre"
                label="Genero"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value as 'male' | 'female' })}
                options={[
                  { value: 'male', label: 'Masculino' },
                  { value: 'female', label: 'Femenino' },
                ]}
              />
            </div>

            <Input
              type="tel"
              name="phone_number"
              label="Telefono"
              placeholder="+52 123 456 7890"
              value={form.phone_number}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
              required
            />

            <Input
              name="address"
              label="Direccion"
              placeholder="Calle, Numero, Colonia, Ciudad"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.user_bbs}
                onChange={(e) => setForm({ ...form, user_bbs: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="font-roboto text-black">Quiero registrarme como ninera</span>
            </label>

            <Button type="submit" variant="blue" disabled={loading}>
              {loading ? 'Cargando...' : 'Crear Cuenta'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Ya tienes cuenta?{' '}
            <Link href="/login" className="text-illustration-secondary font-medium">
              Inicia Sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
