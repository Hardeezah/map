'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Ensure leaflet.heat is imported

export type Location = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lon: number;
};

// GeoJSON Boundary for Kaduna (you can replace this with the full boundary coordinates)
const kadunaGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Kaduna" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [7.385, 9.543],
            [7.542, 10.152],
            [7.940, 10.242],
            [7.876, 10.484],
            [7.429, 10.667],
            [7.112, 10.424],
            [7.385, 9.543]
          ]
        ]
      }
    }
  ]
};

// Set the max bounds for Kaduna state
const kadunaBounds = [[9.543, 7.112], [10.667, 7.940]]; // Replace with your actual coordinates

// Custom icon generator based on category
const customIcon = (category: string, isSelected: boolean) => {
  const iconHtml = category === 'hospital'
    ? `<div style="color: red; font-size: 20px;">🏥</div>`
    : `<div style="color: blue; font-size: 20px;">🎓</div>`;

  return L.divIcon({
    html: `<div class="${isSelected ? 'bounce-animation' : ''}">${iconHtml}</div>`,
    className: 'custom-div-icon',
    iconSize: [40, 40],
  });
};

// Component to recenter the map
const RecenterMap: React.FC<{ center: [number, number]; locations: Location[] }> = ({ center, locations }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom()); // Set map view to new center
    
    // Ensure the heatmap is cleared before adding a new one
    const heatData = locations.map((location) => [location.lat, location.lon, 0.5]); // Intensity at 0.5
    
    if (heatData.length > 0) {
      const heatLayer = L.heatLayer(heatData, {
        radius: 25,  // Adjust heatmap radius
        blur: 15,    // Adjust blur to smooth the heatmap
        maxZoom: 17, // Ensure it shows up at higher zoom levels
      });

      heatLayer.addTo(map); // Add heatmap layer to the map

      return () => {
        map.removeLayer(heatLayer); // Cleanup previous heatmap when the component unmounts or updates
      };
    }
  }, [center, locations, map]); // Make sure to include map in dependencies

  return null;
};

type KadunaMapProps = {
  locations: Location[];
  center: [number, number]; // Center prop to set the map's position
  selectedLocationId: number | null; // Id of the selected location for animation
};

const KadunaMap: React.FC<KadunaMapProps> = ({ locations, center, selectedLocationId }) => {
  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      className="h-screen w-3/4 right-0 fixed map-container" // Change w-3/4 to w-full for full width
      maxBounds={kadunaBounds} // Restrict the panning to Kaduna bounds
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Overlay Kaduna boundary */}
      <GeoJSON data={kadunaGeoJSON} style={{ color: '#FF0000', weight: 2 }} />

      <RecenterMap center={center} locations={locations} /> {/* Pass locations as props to RecenterMap */}

      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lon]}
          icon={customIcon(location.category, location.id === selectedLocationId)}  // Apply animation if selected
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
