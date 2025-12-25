'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useUserStore } from '@/stores';

export default function LoginPage() {
  const { login, loading, error } = useUserStore();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-[var(--spacing-large)] bg-section">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Image
              src="/assets/logo.png"
              alt="Hi Sitter"
              width={80}
              height={80}
            />
          </div>

          <h1 className="text-4xl mb-8">Bienvenidos a Hi Sitter</h1>

          {error && (
            <div className="bg-negative/10 border border-negative text-negative px-4 py-3 rounded-[var(--radius-card)] mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {/* Inline label input - Correo */}
            <div className="flex items-center gap-4">
              <label htmlFor="email" className="text-lg font-roboto text-black w-[120px] shrink-0">
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="flex-1 bg-blue-background/80 border border-black rounded-[15px] px-4 py-4 text-lg font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
              />
            </div>

            {/* Inline label input - Contraseña */}
            <div className="flex items-center gap-4">
              <label htmlFor="password" className="text-lg font-roboto text-black w-[120px] shrink-0">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="flex-1 bg-blue-background/80 border border-black rounded-[15px] px-4 py-4 text-lg font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
              />
            </div>

            <Button type="submit" variant="green" disabled={loading} className="self-center px-10">
              {loading ? 'Cargando...' : 'Ingresar'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            No tienes cuenta?{' '}
            <Link href="/signup" className="text-illustration-primary font-medium">
              Registrate
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-1 bg-illustration-primary relative">
        <Image
          src="/assets/background.jpg"
          alt="Babysitter"
          fill
          className="object-cover opacity-80"
        />
      </div>
    </div>
  );
}
