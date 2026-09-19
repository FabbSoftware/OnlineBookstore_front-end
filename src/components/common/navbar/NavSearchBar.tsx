import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSearchStore } from '@/store';

interface NavSearchBarProps {
  className?: string;
}

export const NavSearchBar: React.FC<NavSearchBarProps> = ({ className = '' }) => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search books by title or author..."
        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
    </div>
  );
};
