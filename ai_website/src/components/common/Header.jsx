import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Dropdown from '../ui/Dropdown.jsx';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">E-Shop</Link>

        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <Search size={20} />
            </button>
          </div>
        </form>

        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-gray-900">Products</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Dropdown />
        </nav>
      </div>
    </header>
  );
}

export default Header;