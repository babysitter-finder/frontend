'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface EmptyScheduleProps {
  variant?: 'no-appointments' | 'no-results' | 'no-upcoming';
}

export function EmptySchedule({ variant = 'no-appointments' }: EmptyScheduleProps) {
  const content = {
    'no-appointments': {
      icon: '📅',
      title: '¡Aún no tienes citas!',
      description: 'Encuentra una niñera y agenda tu primera cita',
      showCta: true,
      ctaText: 'Buscar Niñeras',
      ctaHref: '/',
    },
    'no-results': {
      icon: '🔍',
      title: 'No hay resultados',
      description: 'No se encontraron citas con los filtros seleccionados',
      showCta: false,
      ctaText: '',
      ctaHref: '',
    },
    'no-upcoming': {
      icon: '✨',
      title: 'No tienes citas próximas',
      description: '¿Necesitas otra niñera?',
      showCta: true,
      ctaText: 'Crear Nueva Cita',
      ctaHref: '/',
    },
  };

  const { icon, title, description, showCta, ctaText, ctaHref } = content[variant];

  return (
    <div className="bg-container rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-[var(--spacing-medium)] text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-black mb-2 font-overlock">
        {title}
      </h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      {showCta && (
        <Link href={ctaHref}>
          <Button variant="blue">
            {ctaText}
          </Button>
        </Link>
      )}
    </div>
  );
}
