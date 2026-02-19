import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Film, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/home')}
            >
              <Film className="w-8 h-8 text-red-600 mr-2" />
              <span className="text-2xl font-bold text-white">Kodflex</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => navigate('/home')}
                className="text-white hover:text-gray-300 transition"
              >
                Home
              </button>
              <button className="text-white hover:text-gray-300 transition">
                TV Shows
              </button>
              <button className="text-white hover:text-gray-300 transition">
                Movies
              </button>
              <button className="text-white hover:text-gray-300 transition">
                New & Popular
              </button>
              <button className="text-white hover:text-gray-300 transition">
                My List
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-white/10 text-white placeholder-gray-400 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/20 transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <p className="text-white text-sm">{state.user?.name}</p>
                <p className="text-gray-400 text-xs">{state.user?.email}</p>
              </div>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition">
                  <User size={32} />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4">
                    <p className="text-white font-medium">{state.user?.name}</p>
                    <p className="text-gray-400 text-sm">{state.user?.email}</p>
                    <hr className="my-3 border-gray-600" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-white hover:text-red-500 transition w-full text-left"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
