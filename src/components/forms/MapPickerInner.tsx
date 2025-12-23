'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue in Next.js
// @ts-expect-error - Leaflet internals
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapPickerInnerProps {
  value: { lat: string; long: string };
  onChange: (coords: { lat: string; long: string }) => void;
}

function LocationMarker({
  position,
  setPosition,
}: {
  position: { lat: string; long: string };
  setPosition: (coords: { lat: string; long: string }) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat.toString(),
        long: e.latlng.lng.toString(),
      });
    },
  });

  if (!position.lat || !position.long) return null;

  return (
    <Marker position={[parseFloat(position.lat), parseFloat(position.long)]} />
  );
}

export function MapPickerInner({ value, onChange }: MapPickerInnerProps) {
  // Default center: Mexico City
  const defaultCenter: [number, number] = [19.4326, -99.1332];

  const center: [number, number] =
    value.lat && value.long
      ? [parseFloat(value.lat), parseFloat(value.long)]
      : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="h-64 w-full rounded-[var(--radius-card)] border border-black"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={value} setPosition={onChange} />
    </MapContainer>
  );
}
