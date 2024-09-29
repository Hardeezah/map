'use client';

import dynamic from 'next/dynamic';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export type Location = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lon: number;
};

// Custom icon generator based on category
const customIcon = (category: string) => {
  const iconHtml = category === 'hospital'
    ? '<div style="color: red; font-size: 20px;">🏥</div>'
    : '<div style="color: blue; font-size: 20px;">🎓</div>';

  return L.divIcon({
    html: iconHtml,
    className: 'custom-div-icon',
    iconSize: [40, 40],
  });
};

type KadunaMapProps = {
  locations: Location[];
  center: [number, number]; // Center prop to set the map's position
};

const KadunaMap: React.FC<KadunaMapProps> = ({ locations, center }) => {
  return (
    <MapContainer center={center} zoom={12} className="h-screen w-3/4 absolute right-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lon]}
          icon={customIcon(location.category)}
        >
          <Popup>
            <div>
              <h3 className="text-lg font-bold">{location.name || 'Unknown'}</h3>
              <p>{location.name ? `A ${location.category} named ${location.name}` : 'No further details available'}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default KadunaMap;
