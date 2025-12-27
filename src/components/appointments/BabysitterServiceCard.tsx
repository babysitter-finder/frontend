'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import type { Service, ServiceStatus } from '@/types';

interface BabysitterServiceCardProps {
  service: Service;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onMyWay?: (id: string) => void;
  onStart?: (id: string) => void;
  onEnd?: (id: string) => void;
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

export function BabysitterServiceCard({
  service,
  onAccept,
  onReject,
  onMyWay,
  onStart,
  onEnd,
}: BabysitterServiceCardProps) {
  const status = (service.status || 'pending') as ServiceStatus;

  // Get client info - try both client and user_client fields
  const client = service.client || service.user_client;
  const clientName = client
    ? `${client.first_name || ''} ${client.last_name || ''}`.trim()
    : 'Cliente';

  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAccept?.(service.id);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onReject?.(service.id);
  };

  const handleOnMyWay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMyWay?.(service.id);
  };

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStart?.(service.id);
  };

  const handleEnd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEnd?.(service.id);
  };

  return (
    <Link
      href={`/service/${service.id}`}
      className="block no-underline"
    >
      <article
        className="relative bg-container rounded-[var(--radius-card)] shadow-[var(--shadow-default)] p-[var(--spacing-small)] hover:shadow-lg transition-all hover:-translate-y-0.5"
        aria-label={`Servicio para ${clientName}`}
      >
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={status} />
        </div>

        {/* Content */}
        <div className="flex gap-4">
          {/* Avatar - Client */}
          <div className="flex-shrink-0">
            {client?.picture ? (
              <Image
                src={client.picture}
                alt={clientName}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-illustration-secondary flex items-center justify-center text-white text-xl font-bold">
                {clientName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pr-24">
            <h3 className="text-xl font-bold text-black mb-2 font-overlock">
              {clientName}
            </h3>

            <div className="space-y-1 text-gray-700">
              <p className="flex items-center gap-2">
                <span className="text-illustration-secondary">📅</span>
                <time dateTime={service.date}>
                  {formatDate(service.date)}
                </time>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-illustration-secondary">🕐</span>
                {SHIFT_LABELS[service.shift] || service.shift}
              </p>
              {service.address && (
                <p className="flex items-center gap-2 truncate">
                  <span className="text-illustration-secondary">📍</span>
                  <span className="truncate">{service.address}</span>
                </p>
              )}
              <p className="flex items-center gap-2">
                <span className="text-illustration-secondary">👶</span>
                {service.count_children} {service.count_children === 1 ? 'niño' : 'niños'}
                {service.special_cares && (
                  <span className="text-gray-500">· Cuidados especiales</span>
                )}
              </p>
              {service.cost && (
                <p className="flex items-center gap-2">
                  <span className="text-illustration-secondary">💰</span>
                  ${service.cost} MXN
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-t border-gray-200" />

        {/* Actions - Babysitter specific */}
        <div className="flex gap-3 justify-end">
          {status === 'pending' && (
            <>
              <Button
                variant="red"
                onClick={handleReject}
                className="text-sm px-4 py-1"
              >
                Rechazar
              </Button>
              <Button
                variant="green"
                onClick={handleAccept}
                className="text-sm px-4 py-1"
              >
                Aceptar
              </Button>
            </>
          )}

          {status === 'accepted' && (
            <Button
              variant="blue"
              onClick={handleOnMyWay}
              className="text-sm px-4 py-1"
            >
              En Camino
            </Button>
          )}

          {status === 'on_my_way' && (
            <Button
              variant="green"
              onClick={handleStart}
              className="text-sm px-4 py-1"
            >
              Iniciar Servicio
            </Button>
          )}

          {status === 'in_progress' && (
            <Button
              variant="red"
              onClick={handleEnd}
              className="text-sm px-4 py-1"
            >
              Finalizar Servicio
            </Button>
          )}

          {status === 'completed' && (
            <Button
              variant="blue"
              className="text-sm px-4 py-1"
            >
              Ver Detalles
            </Button>
          )}

          {status === 'cancelled' && (
            <Button
              variant="blue"
              className="text-sm px-4 py-1"
            >
              Ver Detalles
            </Button>
          )}
        </div>
      </article>
    </Link>
  );
}
