'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useBabysitterStore } from '@/stores';
import { Button, StarsRate } from '@/components/ui';

// Dynamically import map to avoid SSR issues
const LocationMap = dynamic(
  () => import('@/components/ui/LocationMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[#e8ddd0] rounded-[var(--radius-card)] flex items-center justify-center">
        <p className="text-gray-600">Cargando mapa...</p>
      </div>
    ),
  }
);

// Mock reviews for demonstration (replace with actual API data)
const mockReviews = [
  {
    id: 1,
    clientName: 'María García',
    clientPicture: null,
    rating: 5,
    comment: 'Excelente niñera, mis hijos la adoran. Muy profesional y cariñosa.',
    date: '2 semanas',
  },
  {
    id: 2,
    clientName: 'Carlos López',
    clientPicture: null,
    rating: 4,
    comment: 'Muy responsable y puntual. La recomiendo ampliamente.',
    date: '1 mes',
  },
];

export default function BabysitterDetailPage() {
  const params = useParams();
  const username = params.username as string;
  const { selectedBabysitter, loading, selectBabysitter } = useBabysitterStore();

  useEffect(() => {
    selectBabysitter(username);
  }, [username, selectBabysitter]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-105px)] bg-[#d4c4b0]">
        {/* Loading skeleton */}
        <div className="bg-[#f5e6d3] p-8">
          <div className="max-w-4xl mx-auto flex items-center gap-6">
            <div className="w-[150px] h-[150px] rounded-full bg-[#e8ddd0] animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-[#e8ddd0] rounded w-48 animate-pulse" />
              <div className="h-5 bg-[#e8ddd0] rounded w-32 animate-pulse" />
              <div className="h-5 bg-[#e8ddd0] rounded w-40 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="h-48 bg-[#f5e6d3] rounded-[var(--radius-card)] animate-pulse" />
        </div>
      </div>
    );
  }

  // 404 state
  if (!selectedBabysitter) {
    return (
      <div className="flex-1 bg-[#d4c4b0] flex items-center justify-center">
        <div className="bg-[#f5e6d3] rounded-[var(--radius-card)] p-12 text-center max-w-md shadow-lg">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-display font-bold text-[#1a365d] mb-1 leading-none">404</p>
          <h1 className="text-2xl font-overlock text-[#1a365d] mb-2">
            Niñera no encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, no pudimos encontrar el perfil que buscas.
          </p>
          <Link href="/">
            <Button variant="pink" className="px-8">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate age from birthdate if available (placeholder for now)
  const age = 28; // This would come from birthdate calculation

  return (
    <div className="min-h-[calc(100vh-105px)] flex flex-col">
      {/* Section 1: Header */}
      <div className="bg-[#f5e6d3] py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="w-[150px] h-[150px] rounded-full border-4 border-[#1a365d] overflow-hidden flex-shrink-0">
              <Image
                src={selectedBabysitter.picture || '/assets/girl.jpeg'}
                alt={selectedBabysitter.first_name}
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-overlock text-[#1a365d] mb-1">
                {selectedBabysitter.first_name} {selectedBabysitter.last_name}
              </h1>
              <p className="text-[#1a365d] mb-2">Edad: {age}</p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-[#1a365d] font-medium">
                  {selectedBabysitter.rating || 4.5}
                </span>
                <StarsRate rating={selectedBabysitter.rating || 4.5} size="medium" />
                <span className="text-gray-600">
                  ({selectedBabysitter.reviews_count || mockReviews.length} reseñas)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: About & Map */}
      <div className="flex-1 bg-[#d4c4b0] py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* About & Map Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* About Card */}
            <div className="bg-[#f5e6d3] rounded-[var(--radius-card)] p-6">
              <h2 className="text-xl font-overlock text-[#1a365d] mb-3">Sobre mí</h2>
              <p className="text-gray-700 leading-relaxed">
                {selectedBabysitter.about_me ||
                  'Hola, soy una niñera con experiencia en el cuidado de niños. Me encanta interactuar con ellos y ayudarlos a sentirse cómodos. Estoy disponible para ayudar con lo que necesiten.'}
              </p>
            </div>

            {/* Map Card */}
            <div className="bg-[#f5e6d3] rounded-[var(--radius-card)] p-4 h-[250px]">
              {selectedBabysitter.lat && selectedBabysitter.long ? (
                <LocationMap
                  lat={parseFloat(selectedBabysitter.lat)}
                  lng={parseFloat(selectedBabysitter.long)}
                  name={`${selectedBabysitter.first_name} ${selectedBabysitter.last_name}`}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p>Ubicación no disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-[#f5e6d3] rounded-[var(--radius-card)] p-6 mb-6">
            <h2 className="text-xl font-overlock text-[#1a365d] mb-3">Educación</h2>
            <p className="text-gray-700">
              {selectedBabysitter.education_degree || 'Información no disponible'}
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-8">
            <Link href={`/service/new/${username}`}>
              <Button variant="primary" className="px-12 py-3 text-lg bg-[#1a365d] hover:bg-[#2d4a7c]">
                Contratar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 3: Reviews */}
      <div className="bg-[#e8ddd0] py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-overlock text-[#1a365d] mb-6">Reseñas</h2>

          {mockReviews.length > 0 ? (
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#f5e6d3] rounded-[var(--radius-card)] p-5"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-[#1a365d] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {review.clientName.charAt(0)}
                      </span>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-[#1a365d]">
                          {review.clientName}
                        </span>
                        <StarsRate rating={review.rating} size="small" />
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">Hace {review.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#f5e6d3] rounded-[var(--radius-card)] p-8 text-center">
              <p className="text-gray-600">Aún no hay reseñas para esta niñera.</p>
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Footer */}
      <footer className="bg-[#d4c4b0] py-6 border-t border-[#c4b4a0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#1a365d] font-overlock mb-4">Siguenos</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-[#1a365d] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
