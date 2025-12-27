'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import type { Service, ServiceStatus } from '@/types';

interface ServiceCardProps {
  service: Service;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const SHIFT_LABELS: Record<string, string> = {
  morning: 'Mañana',
  afternoon: 'Tarde',
  evening: 'Noche',
  night: 'Madrugada',
};

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

function getActionsByStatus(status: ServiceStatus | undefined) {
  switch (status) {
    case 'pending':
      return { primary: 'edit', secondary: 'cancel' };
    case 'accepted':
      return { primary: 'view', secondary: 'cancel' };
    case 'on_my_way':
    case 'in_progress':
      return { primary: 'view', secondary: 'contact' };
    case 'completed':
      return { primary: 'review', secondary: 'view' };
    case 'cancelled':
      return { primary: 'delete', secondary: 'rebook' };
    default:
      return { primary: 'view', secondary: 'cancel' };
  }
}

export function ServiceCard({ service, onDelete, onEdit }: ServiceCardProps) {
  const status = service.status || 'pending';
  const actions = getActionsByStatus(status);
  const babysitterName = service.babysitter
    ? `${service.babysitter.first_name || ''} ${service.babysitter.last_name || ''}`.trim()
    : 'Niñera por asignar';

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (actions.primary === 'edit' && onEdit) {
      onEdit(service.id);
    } else if (actions.primary === 'delete' && onDelete) {
      onDelete(service.id);
    }
  };

  const handleSecondaryAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (actions.secondary === 'cancel' && onDelete) {
      onDelete(service.id);
    }
  };

  return (
    <Link
      href={`/service/${service.id}`}
      className="block no-underline"
    >
      <article
        className="relative bg-container rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-[var(--spacing-small)] hover:shadow-lg transition-all hover:-translate-y-0.5"
        aria-label={`Cita con ${babysitterName}`}
      >
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={status} />
        </div>

        {/* Content */}
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {service.babysitter?.picture ? (
              <Image
                src={service.babysitter.picture}
                alt={babysitterName}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-illustration-primary flex items-center justify-center text-white text-xl font-bold">
                {babysitterName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pr-24">
            <h3 className="text-xl font-bold text-black mb-2 font-overlock">
              {babysitterName}
            </h3>

            <div className="space-y-1 text-gray-700">
              <p className="flex items-center gap-2">
                <span className="text-illustration-primary">📅</span>
                <time dateTime={service.date}>
                  {formatDate(service.date)}
                </time>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-illustration-primary">🕐</span>
                {SHIFT_LABELS[service.shift] || service.shift}
              </p>
              {service.address && (
                <p className="flex items-center gap-2 truncate">
                  <span className="text-illustration-primary">📍</span>
                  <span className="truncate">{service.address}</span>
                </p>
              )}
              <p className="flex items-center gap-2">
                <span className="text-illustration-primary">👶</span>
                {service.count_children} {service.count_children === 1 ? 'niño' : 'niños'}
                {service.special_cares && (
                  <span className="text-gray-500">· Cuidados especiales</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-t border-gray-200" />

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          {status === 'pending' && (
            <>
              <Button
                variant="red"
                onClick={handleSecondaryAction}
                className="text-sm px-4 py-1"
              >
                Cancelar
              </Button>
              <Button
                variant="blue"
                onClick={handlePrimaryAction}
                className="text-sm px-4 py-1"
              >
                Editar Cita
              </Button>
            </>
          )}

          {status === 'accepted' && (
            <>
              <Button
                variant="red"
                onClick={handleSecondaryAction}
                className="text-sm px-4 py-1"
              >
                Cancelar
              </Button>
              <Button
                variant="blue"
                className="text-sm px-4 py-1"
              >
                Ver Detalles
              </Button>
            </>
          )}

          {(status === 'on_my_way' || status === 'in_progress') && (
            <>
              <Button
                variant="green"
                className="text-sm px-4 py-1"
              >
                Contactar
              </Button>
              <Button
                variant="blue"
                className="text-sm px-4 py-1"
              >
                Ver Detalles
              </Button>
            </>
          )}

          {status === 'completed' && (
            <>
              <Button
                variant="blue"
                className="text-sm px-4 py-1"
              >
                Ver Detalles
              </Button>
              <Button
                variant="yellow"
                className="text-sm px-4 py-1"
              >
                Calificar
              </Button>
            </>
          )}

          {status === 'cancelled' && (
            <>
              <Button
                variant="red"
                onClick={handlePrimaryAction}
                className="text-sm px-4 py-1"
              >
                Eliminar
              </Button>
              <Button
                variant="blue"
                className="text-sm px-4 py-1"
              >
                Reagendar
              </Button>
            </>
          )}
        </div>
      </article>
    </Link>
  );
}
