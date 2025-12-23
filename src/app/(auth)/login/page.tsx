'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { Input } from '@/components/forms';
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

          <h1 className="text-4xl mb-2">Bienvenido</h1>
          <p className="text-gray-600 mb-8">Inicia sesion para continuar</p>

          {error && (
            <div className="bg-negative/10 border border-negative text-negative px-4 py-3 rounded-[var(--radius-card)] mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            <Button type="submit" variant="pink" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar Sesion'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            No tienes cuenta?{' '}
            <Link href="/register" className="text-illustration-primary font-medium">
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
