'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/stores';
import { Button } from '@/components/ui';

export default function ProfilePage() {
  const { user, logout } = useUserStore();

  if (!user) {
    return (
      <div className="p-[var(--spacing-medium)]">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="p-[var(--spacing-medium)] max-w-2xl mx-auto">
      <div className="bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-black overflow-hidden mb-4">
            <Image
              src={user.picture || '/assets/girl.jpeg'}
              alt={user.first_name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-2xl">
            {user.first_name} {user.last_name}
          </h1>
          {user.user_bbs && (
            <span className="bg-illustration-primary text-white px-3 py-1 rounded-full text-sm mt-2">
              Ninera
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Correo electronico</label>
            <p className="text-black">{user.email}</p>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Telefono</label>
            <p className="text-black">{user.phone_number}</p>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Direccion</label>
            <p className="text-black">{user.address}</p>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Fecha de nacimiento</label>
            <p className="text-black">{user.birthdate}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <Link href="/profile/edit">
            <Button variant="blue" className="w-full">
              Editar Perfil
            </Button>
          </Link>
          <Button variant="red" onClick={logout} className="w-full">
            Cerrar Sesion
          </Button>
        </div>
      </div>
    </div>
  );
}
