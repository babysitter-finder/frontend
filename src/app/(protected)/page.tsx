'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBabysitterStore, useUserStore } from '@/stores';
import { StarsRate } from '@/components/ui';

export default function HomePage() {
  const { user } = useUserStore();
  const { babysitters, loading, getBabysitters } = useBabysitterStore();

  useEffect(() => {
    if (!user?.user_bbs) {
      getBabysitters();
    }
  }, [user, getBabysitters]);

  // If user is a babysitter, show schedule view
  if (user?.user_bbs) {
    return (
      <div className="p-[var(--spacing-medium)]">
        <h1 className="text-4xl mb-6">Mis Citas</h1>
        <p className="text-gray-600">
          Aqui aparecera tu calendario de citas cuando tengas servicios programados.
        </p>
        <Link
          href="/schedule"
          className="inline-block mt-4 text-illustration-primary font-medium"
        >
          Ver todas mis citas
        </Link>
      </div>
    );
  }

  // Client view - show babysitters list
  return (
    <div className="p-[var(--spacing-medium)]">
      <h1 className="text-4xl mb-6">Nineras Disponibles</h1>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Cargando nineras...</p>
        </div>
      ) : babysitters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No hay nineras disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {babysitters.map((babysitter) => (
            <Link
              key={babysitter.username}
              href={`/babysitter/${babysitter.username}`}
              className="block no-underline"
            >
              <div className="bg-section rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-black overflow-hidden flex-shrink-0">
                    <Image
                      src={babysitter.picture || '/assets/girl.jpeg'}
                      alt={babysitter.first_name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-black truncate">
                      {babysitter.first_name} {babysitter.last_name}
                    </h3>
                    {babysitter.rating && (
                      <StarsRate rating={babysitter.rating} size="small" />
                    )}
                    <p className="text-illustration-primary font-medium mt-1">
                      ${babysitter.cost_of_service}/hr
                    </p>
                  </div>
                </div>
                {babysitter.about_me && (
                  <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                    {babysitter.about_me}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
