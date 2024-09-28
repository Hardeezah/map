// /components/KadunaMap.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import React-Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Leaflet icons
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Example icon generator using divIcon for React Icons
const customIcon = (category: string) => {
  const iconHtml = category === 'hospital'
    ? '<div style=" color: red; font-size: 20px;">🏥</div>' // Example: Use emoji or SVG
    : '<div style="pulse-icon; color: blue; font-size: 20px;">🎓</div>'; // Example for school

  return L.divIcon({
    html: iconHtml,
    className: 'custom-div-icon',
    iconSize: [40, 40],
  });
};

type KadunaMapProps = {
  locations: any[]; // Data fetched from OpenStreetMap or other sources
};

const KadunaMap: React.FC<KadunaMapProps> = ({ locations }) => {
  return (
    <MapContainer center={[10.5105, 7.4165]} zoom={12} className="h-screen w-3/4 absolute right-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lon]}
          icon={customIcon(location.tags.amenity)}  // Custom icon function
        >
          <Popup>
            <div>
              <h3 className="text-lg font-bold">{location.tags.name || 'Unknown'}</h3>
              <p>{location.tags.name ? `A ${location.tags.amenity} named ${location.tags.name}` : 'No further details available'}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default KadunaMap;
