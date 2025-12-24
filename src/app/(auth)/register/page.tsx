'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Input, Select, TextArea } from '@/components/forms';
import { useUserStore } from '@/stores';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error, popUp, closePopUp } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [form, setForm] = useState<{
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    birthdate: string;
    genre: 'male' | 'female';
    phone_number: string;
    address: string;
    photo: File | null;
    studies: string;
    about_me: string;
  }>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    birthdate: '',
    genre: 'male',
    phone_number: '',
    address: '',
    photo: null,
    studies: '',
    about_me: '',
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

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
      <div className="flex-1 flex flex-col px-[var(--spacing-large)] bg-section overflow-y-auto py-8">
        <div className="max-w-xl mx-auto w-full">
          <div className="mb-6">
            <Image
              src="/assets/logo.png"
              alt="Hi Sitter"
              width={80}
              height={80}
            />
          </div>

          <h1 className="text-4xl mb-2">Crear Cuenta</h1>
          <p className="text-gray-600 mb-6">Completa tus datos para registrarte</p>

          {error && (
            <div className="bg-negative/10 border border-negative text-negative px-4 py-3 rounded-[var(--radius-card)] mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Section: Datos personales */}
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-black">Datos personales</h2>

              <div className="flex gap-6">
                {/* Left column - Form fields */}
                <div className="flex-1 flex flex-col gap-4">
                  <Input
                    name="first_name"
                    label="Nombres"
                    placeholder="Juan"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    required
                  />
                  <Input
                    name="last_name"
                    label="Apellidos"
                    placeholder="Perez"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    required
                  />
                  <Input
                    name="username"
                    label="Nombre de usuario"
                    placeholder="juanperez123"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    label="Correo"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <Input
                    type="password"
                    name="password"
                    label="Contraseña"
                    placeholder="********"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <Input
                    type="password"
                    name="password_confirmation"
                    label="Confirmar Contraseña"
                    placeholder="********"
                    value={form.password_confirmation}
                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                    required
                  />
                  <Input
                    type="date"
                    name="birthdate"
                    label="Fecha de nacimiento"
                    value={form.birthdate}
                    onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
                    required
                  />
                </div>

                {/* Right column - Photo + phone + gender */}
                <div className="flex flex-col gap-4 w-[200px]">
                  {/* Photo upload */}
                  <div className="flex flex-col gap-2">
                    <span className="text-black font-roboto text-lg font-medium">Foto</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={handlePhotoClick}
                      className="w-[150px] h-[150px] rounded-[var(--radius-card)] border border-black bg-blue-background flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity shadow-[var(--shadow-default)]"
                    >
                      {photoPreview ? (
                        <Image
                          src={photoPreview}
                          alt="Preview"
                          width={150}
                          height={150}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-black text-center text-sm px-2">
                          Selecciona una foto
                        </span>
                      )}
                    </button>
                  </div>

                  <Input
                    type="tel"
                    name="phone_number"
                    label="Celular"
                    placeholder="+52123456"
                    value={form.phone_number}
                    onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                    required
                  />

                  <Select
                    name="genre"
                    label="Género"
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value as 'male' | 'female' })}
                    options={[
                      { value: 'male', label: 'Masculino' },
                      { value: 'female', label: 'Femenino' },
                    ]}
                  />
                </div>
              </div>

              {/* Full width address field */}
              <Input
                name="address"
                label="Dirección"
                placeholder="Calle, Numero, Colonia, Ciudad"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
            </section>

            {/* Section: Perfil laboral */}
            <section className="flex flex-col gap-4 bg-pink-lightest border border-pink-darkest rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-default)]">
              <h2 className="text-2xl font-bold text-black">Perfil laboral</h2>

              <TextArea
                name="studies"
                label="Estudios"
                placeholder="Describe tu formación académica..."
                value={form.studies}
                onChange={(e) => setForm({ ...form, studies: e.target.value })}
                className="min-h-[150px]"
              />

              <TextArea
                name="about_me"
                label="Acerca de mí"
                placeholder="Cuéntanos sobre ti, tu experiencia y por qué te gusta cuidar niños..."
                value={form.about_me}
                onChange={(e) => setForm({ ...form, about_me: e.target.value })}
                className="min-h-[150px]"
              />
            </section>

            <Button type="submit" variant="green" disabled={loading} className="self-center px-10">
              {loading ? 'Cargando...' : 'Registrar'}
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
