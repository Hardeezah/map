'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import KadunaMap from './components/Map';
import locationData from './constant/mapData.json'; // Import your JSON data

// Define the Location type
type Location = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lon: number;
};

// Define initial location data with explicit typing
const initialLocations: Location[] = locationData.map(location => ({
  id: location.id,
  name: location.tags.name,
  category: location.tags.amenity,
  lat: location.lat,
  lon: location.lon,
}));

export default function Home() {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(initialLocations);
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.5105, 7.4165]); // Initial center
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null); // To track the selected location

  // Function to handle filtering
  const handleFilter = (category: string | null) => {
    if (category) {
      const filtered = initialLocations.filter((location) => location.category === category);
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(initialLocations); // Show all locations if no category is selected
    }
  };

  // Function to handle search
  const handleSearch = (selectedLocation: Location) => {
    const foundLocation = initialLocations.find(location => location.name === selectedLocation.name);

    if (foundLocation) {
      setMapCenter([foundLocation.lat, foundLocation.lon]); // Update the center based on the found location
      setSelectedLocationId(foundLocation.id); // Highlight the selected location
    }
  };

  return (
    <div className="flex">
      <Sidebar
        data={initialLocations}   // Pass initial locations for search and filter
        onSearch={handleSearch}    // Pass the onSearch function
        onFilter={handleFilter}     // Pass the onFilter function
        onClose={() => console.log('Sidebar closed')}
      />
      <KadunaMap
        locations={filteredLocations}
        center={mapCenter}
        selectedLocationId={selectedLocationId}  // Pass the selected location ID for animation
      />
    </div>
  );
}
