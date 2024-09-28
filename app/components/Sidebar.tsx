'use client';
// /components/Sidebar.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type Location = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lon: number;
};

type SidebarProps = {
  data: Location[]; // Array of locations passed to the sidebar
  onSearch: (location: Location) => void; // Function to center the map on the searched location
  onFilter: (category: string) => void;  // Function to filter the locations by category
  onClose: () => void; // Close sidebar function
};

const Sidebar: React.FC<SidebarProps> = ({ data, onSearch, onFilter, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Filter locations based on search term
    if (searchTerm) {
      setFilteredLocations(
        data.filter((location) =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredLocations([]);
    }
  }, [searchTerm, data]);

  return (
    <div
      className="fixed top-0 left-0 h-screen w-1/4 bg-white shadow-xl z-50 px-8 py-6"
      
    >
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-4 right-4 text-xl">
        &times;
      </button>

      {/* Logo */}
      <div className="mb-6">
        <p className="text-[#6C6D73] text-[30px] font-bold">G-Map</p> {/* Use your own logo */}
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search location..."
          className="border border-gray-300 p-2 w-full rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Dropdown of filtered locations */}
        {filteredLocations.length > 0 && (
          <ul className="absolute left-0 w-full bg-white shadow-md max-h-48 overflow-y-auto z-50 border border-gray-300 mt-2 rounded">
            {filteredLocations.map((location) => (
              <li
                key={location.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSearch(location); // Trigger search action to center the map
                  setSearchTerm(''); // Clear search after selection
                }}
              >
                {location.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filter by Category */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Filter by Category</h3>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => onFilter('hospital')}
          >
            Hospitals
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={() => onFilter('school')}
          >
            Schools
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
