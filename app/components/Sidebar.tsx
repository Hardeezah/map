'use client';
import { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import DataDisplay from './LocationList'; // Optional component, if you need additional data display

export type Location = {
  id: number;
  name: string;
  category: string;
  lat: number;
  lon: number;
};

type SidebarProps = {
  data: Location[];
  onSearch: (location: Location) => void;
  onFilter: (category: string | null) => void;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ data, onSearch, onFilter, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
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

  const handleFilterClick = (category: string | null) => {
    setActiveFilter(category);
    onFilter(category);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-1/4 bg-white shadow-xl z-50 px-8 py-6">
      <button onClick={onClose} className="absolute top-4 right-4 text-xl">&times;</button>
      <div className="mb-6">
        <p className="text-[#6C6D73] text-[30px] font-bold">G-Map</p>
      </div>
      <div className={`mb-6 relative flex bg-[#F7F7F8] justify-center text-gray-600 text-center p-1 px-2 gap-1 rounded-md ${searchTerm ? 'border border-gray-500' : 'border border-gray-100'}`}>
        <CiSearch width={50} height={50} className='text-center self-center w-6 h-6 text-[#B4B6BA]'/>
        <input
          type="text"
          placeholder="Search location"
          className="p-2 w-full rounded bg-[#F7F7F8] outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredLocations.length > 0 && (
          <ul className="absolute left-0 w-full bg-white shadow-md max-h-48 overflow-y-auto z-50 border border-gray-300 mt-2 rounded">
            {filteredLocations.map((location) => (
              <li
                key={location.id}
                className="p-2 hover:bg-gray-300 cursor-pointer text-gray-800 font-semibold text-sm"
                onClick={() => {
                  onSearch(location); // Set the map center to the selected location
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
        <h3 className="text-md font-bold mb-2 text-[#81828bfd] text-[15px]">Filter by Category</h3>
        <div className="flex space-x-4">
          <button
            className={`py-1 px-2 text-sm rounded-xl ${activeFilter === 'hospital' ? 'bg-gray-400 text-white' : 'bg-gray-300 text-gray-400'}`}
            onClick={() => handleFilterClick('hospital')}
          >
            Hospitals
          </button>
          <button
            className={`py-1 px-2 text-sm rounded-xl ${activeFilter === 'school' ? 'bg-gray-400 text-white' : 'bg-gray-300 text-gray-400'}`}
            onClick={() => handleFilterClick('school')}
          >
            Schools
          </button>
          <button
            className={`py-1 px-2 text-sm rounded-md ${activeFilter === null ? 'bg-gray-400 text-white' : 'bg-gray-300 text-gray-400'}`}
            onClick={() => handleFilterClick(null)}  // Show all
          >
            All
          </button>
        </div>
      </div>

      <DataDisplay /> {/* Optional component */}
    </div>
  );
};

export default Sidebar;
