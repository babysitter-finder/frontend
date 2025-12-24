'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Babysitter } from '@/types';

// Fix Leaflet default icon issue in Next.js
// @ts-expect-error - Leaflet internals
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for babysitters
const babysitterIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface BabysitterMapProps {
  babysitters: Babysitter[];
  selectedBabysitter: Babysitter | null;
  onSelectBabysitter: (babysitter: Babysitter) => void;
}

export default function BabysitterMap({
  babysitters,
  selectedBabysitter,
  onSelectBabysitter,
}: BabysitterMapProps) {
  // Default center: Mexico City
  const defaultCenter: [number, number] = [19.4326, -99.1332];

  // Calculate center based on babysitters or selected babysitter
  const center: [number, number] = selectedBabysitter?.lat && selectedBabysitter?.long
    ? [parseFloat(selectedBabysitter.lat), parseFloat(selectedBabysitter.long)]
    : babysitters.length > 0 && babysitters[0].lat && babysitters[0].long
    ? [parseFloat(babysitters[0].lat), parseFloat(babysitters[0].long)]
    : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ background: '#d4c4b0' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {babysitters.map((babysitter) => {
        if (!babysitter.lat || !babysitter.long) return null;
        const isSelected = selectedBabysitter?.username === babysitter.username;
        return (
          <Marker
            key={babysitter.username}
            position={[parseFloat(babysitter.lat), parseFloat(babysitter.long)]}
            icon={isSelected ? selectedIcon : babysitterIcon}
            eventHandlers={{
              click: () => onSelectBabysitter(babysitter),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">
                  {babysitter.first_name} {babysitter.last_name}
                </p>
                <p className="text-gray-600">${babysitter.cost_of_service}/hr</p>
                {babysitter.rating && (
                  <p className="text-yellow-500">★ {babysitter.rating}</p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
