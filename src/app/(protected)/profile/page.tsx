'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/stores';
import { Button, Modal } from '@/components/ui';
import { babysittersApi } from '@/lib/api';
import type { Babysitter } from '@/types';

export default function ProfilePage() {
  const { user, deleteAccount, loading } = useUserStore();
  const [babysitterData, setBabysitterData] = useState<Babysitter | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user?.user_bbs && user.username) {
      babysittersApi.getOne(user.username)
        .then(({ data }) => setBabysitterData(data))
        .catch(() => setBabysitterData(null));
    }
  }, [user?.user_bbs, user?.username]);

  if (!user) {
    return (
      <div className="min-h-screen bg-brown-main p-[var(--spacing-medium)]">
        <p className="text-black">Cargando perfil...</p>
      </div>
    );
  }

  const handleConfirmDelete = async () => {
    await deleteAccount();
    setShowConfirm(false);
  };

  const genderDisplay = user.genre === 'male' ? 'Masculino' : 'Femenino';

  return (
    <div className="min-h-screen bg-brown-main p-[var(--spacing-medium)]">
      {/* Delete Confirmation Dialog */}
      <Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
        <h3 className="mb-4 text-center">Confirmar eliminacion</h3>
        <p className="mb-6 text-center">
          Estas seguro de que deseas eliminar tu cuenta? Esta accion no se puede deshacer.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="blue" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="red" onClick={handleConfirmDelete} disabled={loading}>
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </Modal>

      <div className="max-w-4xl mx-auto bg-container rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-8">
        <h2 className="text-center mb-8">Perfil de Usuario</h2>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Profile Photo */}
          <div className="w-48 h-48 rounded-full border-4 border-illustration-secondary overflow-hidden flex-shrink-0">
            <Image
              src={user.picture || '/assets/girl.jpeg'}
              alt={user.first_name}
              width={192}
              height={192}
              className="object-cover w-full h-full"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4">
            <div>
              <span className="font-bold text-black">Nombre: </span>
              <span className="text-black">{user.first_name} {user.last_name}</span>
            </div>

            <div>
              <span className="font-bold text-black">Edad: </span>
              <span className="text-black">{user.birthdate}</span>
            </div>

            <div>
              <span className="font-bold text-black">Genero: </span>
              <span className="text-black">{genderDisplay}</span>
            </div>

            <div>
              <span className="font-bold text-black">Celular: </span>
              <span className="text-black">{user.phone_number}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-8 text-center">
          <span className="font-bold text-black italic">Direccion: </span>
          <span className="text-black italic">{user.address}</span>
        </div>

        {/* Babysitter-specific fields */}
        {user.user_bbs && babysitterData && (
          <div className="mt-6 space-y-4">
            <div>
              <span className="font-bold text-black">Estudios: </span>
              <span className="text-black">{babysitterData.education_degree || 'No especificado'}</span>
            </div>
            <div>
              <span className="font-bold text-black">Acerca de mi: </span>
              <span className="text-black">{babysitterData.about_me || 'No especificado'}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button
            variant="pink"
            onClick={() => setShowConfirm(true)}
            disabled={loading}
          >
            Eliminar cuenta
          </Button>
          <Link href="/profile/edit">
            <Button variant="blue">
              Editar perfil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
