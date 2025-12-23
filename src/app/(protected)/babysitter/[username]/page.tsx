'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useBabysitterStore } from '@/stores';
import { Button, StarsRate } from '@/components/ui';

export default function BabysitterDetailPage() {
  const params = useParams();
  const username = params.username as string;
  const { selectedBabysitter, loading, selectBabysitter } = useBabysitterStore();

  useEffect(() => {
    selectBabysitter(username);
  }, [username, selectBabysitter]);

  if (loading) {
    return (
      <div className="p-[var(--spacing-medium)]">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!selectedBabysitter) {
    return (
      <div className="p-[var(--spacing-medium)]">
        <p className="text-gray-600">Ninera no encontrada.</p>
        <Link href="/" className="text-illustration-primary">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="p-[var(--spacing-medium)] max-w-4xl mx-auto">
      <div className="bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full border-2 border-black overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={selectedBabysitter.picture || '/assets/girl.jpeg'}
              alt={selectedBabysitter.first_name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl mb-2">
              {selectedBabysitter.first_name} {selectedBabysitter.last_name}
            </h1>

            {selectedBabysitter.rating && (
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <StarsRate rating={selectedBabysitter.rating} />
                <span className="text-gray-600">
                  ({selectedBabysitter.reviews_count || 0} resenas)
                </span>
              </div>
            )}

            <p className="text-2xl text-illustration-primary font-bold mb-4">
              ${selectedBabysitter.cost_of_service}/hora
            </p>

            <p className="text-gray-600 mb-4">{selectedBabysitter.address}</p>
          </div>
        </div>

        {/* About */}
        {selectedBabysitter.about_me && (
          <div className="mt-6">
            <h2 className="text-xl mb-2">Acerca de mi</h2>
            <p className="text-gray-600">{selectedBabysitter.about_me}</p>
          </div>
        )}

        {/* Education */}
        {selectedBabysitter.education_degree && (
          <div className="mt-6">
            <h2 className="text-xl mb-2">Educacion</h2>
            <p className="text-gray-600">{selectedBabysitter.education_degree}</p>
          </div>
        )}

        {/* Availability */}
        {selectedBabysitter.availabilities && selectedBabysitter.availabilities.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl mb-2">Disponibilidad</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {selectedBabysitter.availabilities.map((avail, index) => (
                <div
                  key={index}
                  className="bg-container rounded-lg p-2 text-center text-sm"
                >
                  <p className="font-medium">{avail.day}</p>
                  <p className="text-gray-600">
                    {avail.start} - {avail.end}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Link href={`/service/new/${username}`}>
            <Button variant="pink" className="px-8">
              Solicitar Servicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
