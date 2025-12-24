'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Service } from '@/types';

// Fix Leaflet default icon issue in Next.js
// @ts-expect-error - Leaflet internals
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for different statuses
const createIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const icons: Record<string, L.Icon> = {
  pending: createIcon('orange'),
  accepted: createIcon('blue'),
  in_progress: createIcon('green'),
};

interface ServiceMapProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
}

export default function ServiceMap({
  services,
  selectedService,
  onSelectService,
}: ServiceMapProps) {
  // Default center: Mexico City
  const defaultCenter: [number, number] = [19.4326, -99.1332];

  // Calculate center based on services or selected service
  const center: [number, number] = selectedService?.lat && selectedService?.long
    ? [parseFloat(selectedService.lat), parseFloat(selectedService.long)]
    : services.length > 0 && services[0].lat && services[0].long
    ? [parseFloat(services[0].lat), parseFloat(services[0].long)]
    : defaultCenter;

  const getShiftLabel = (shift: string) => {
    const shifts: Record<string, string> = {
      morning: 'Mañana',
      afternoon: 'Tarde',
      evening: 'Noche',
      night: 'Nocturno',
    };
    return shifts[shift] || shift;
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full rounded-[var(--radius-card)] border border-black"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {services.map((service) => {
        if (!service.lat || !service.long) return null;
        return (
          <Marker
            key={service.id}
            position={[parseFloat(service.lat), parseFloat(service.long)]}
            icon={icons[service.status] || icons.pending}
            eventHandlers={{
              click: () => onSelectService(service),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">
                  {service.client?.first_name} {service.client?.last_name}
                </p>
                <p>{service.date} • {getShiftLabel(service.shift)}</p>
                <p className="text-gray-600">{service.address}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
