'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useUserStore } from '@/stores';

export default function RegisterClientPage() {
  const router = useRouter();
  const { register, loading, error, popUp, closePopUp } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
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
    picture: File | null;
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
    picture: null,
  });

  useEffect(() => {
    if (popUp && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [popUp]);

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

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const [photoError, setPhotoError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.picture) {
      setPhotoError(true);
      return;
    }
    setPhotoError(false);
    register(form);
  };

  const handlePopUpClose = () => {
    dialogRef.current?.close();
    closePopUp();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Success Dialog */}
      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-8 max-w-md text-center backdrop:bg-black/50 m-0"
      >
        <h2 className="text-2xl mb-4">Registro Exitoso!</h2>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido creada. Revisa tu correo para confirmar tu cuenta.
        </p>
        <Button onClick={handlePopUpClose} variant="pink">
          Ir a Iniciar Sesion
        </Button>
      </dialog>

      {/* Left side - Image */}
      <div className="hidden lg:block flex-1 bg-illustration-primary relative">
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

          <h1 className="text-4xl mb-2">Registro de usuarios</h1>
          <p className="text-gray-600 mb-6">Completa tus datos para registrarte</p>

          {error && (
            <div className="bg-negative/10 border border-negative text-negative px-4 py-3 rounded-[var(--radius-card)] mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex gap-6">
              {/* Left column - Form fields */}
              <div className="flex-1 flex flex-col gap-5">
                {/* Nombres */}
                <div className="flex items-center gap-4">
                  <label htmlFor="first_name" className="text-base font-roboto text-black w-[160px] shrink-0">
                    Nombres:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Nombres"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    required
                    className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>

                {/* Apellidos */}
                <div className="flex items-center gap-4">
                  <label htmlFor="last_name" className="text-base font-roboto text-black w-[160px] shrink-0">
                    Apellidos:
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Apellidos"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    required
                    className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>

                {/* Nombre de usuario */}
                <div className="flex items-center gap-4">
                  <label htmlFor="username" className="text-base font-roboto text-black w-[160px] shrink-0">
                    Nombre de usuario:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                    className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>

                {/* Correo */}
                <div className="flex items-center gap-4">
                  <label htmlFor="email" className="text-base font-roboto text-black w-[160px] shrink-0">
                    Correo:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>

                {/* Contraseña */}
                <div className="flex items-center gap-4">
                  <label htmlFor="password" className="text-base font-roboto text-black w-[160px] shrink-0">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>

                {/* Confirmar Contraseña */}
                <div className="flex items-center gap-4">
                  <label htmlFor="password_confirmation" className="text-base font-roboto text-black w-[160px] shrink-0">
                    Confirmar Contraseña:
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Confirmar Contraseña"
                    value={form.password_confirmation}
                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                    required
                    className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>

                {/* Fecha de nacimiento */}
                <div className="flex items-center gap-4">
                  <label htmlFor="birthdate" className="text-base font-roboto text-black w-[160px] shrink-0">
                    Fecha de nacimiento:
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={form.birthdate}
                    onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
                    required
                    className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>
              </div>

              {/* Right column - Photo + phone + gender */}
              <div className="flex flex-col gap-4 w-[200px]">
                {/* Photo upload */}
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handlePhotoChange(e);
                      setPhotoError(false);
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handlePhotoClick}
                    className={`w-[150px] h-[150px] rounded-[var(--radius-card)] border-2 ${photoError ? 'border-negative' : 'border-black'} bg-pink-light flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity shadow-[var(--shadow-default)]`}
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
                      <span className={`${photoError ? 'text-negative' : 'text-black'} text-center text-sm px-2 font-bold`}>
                        Selecciona<br />una foto
                      </span>
                    )}
                  </button>
                  {photoError && (
                    <span className="text-negative text-sm">Foto requerida</span>
                  )}
                </div>

                {/* Celular */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone_number" className="text-base font-roboto text-black">
                    Celular:
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Celular"
                    value={form.phone_number}
                    onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                    required
                    className="w-full bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
                  />
                </div>

                {/* Género */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="genre" className="text-base font-roboto text-black">
                    Género:
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value as 'male' | 'female' })}
                    className="w-full bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary appearance-none cursor-pointer"
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Full width address field */}
            <div className="flex items-center gap-4">
              <label htmlFor="address" className="text-base font-roboto text-black w-[160px] shrink-0">
                Dirección:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Dirección"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
                className="flex-1 bg-pink-light border border-black rounded-[15px] px-4 py-3 text-base font-roboto shadow-[var(--shadow-default)] focus:outline-none focus:ring-2 focus:ring-illustration-primary"
              />
            </div>

            <Button type="submit" variant="green" disabled={loading} className="self-center px-10">
              {loading ? 'Cargando...' : 'Registrarse'}
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
