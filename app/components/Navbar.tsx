import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-white p-4 shadow-md fixed w-full z-10 top-0">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search for a place..."
          className="flex-grow px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
