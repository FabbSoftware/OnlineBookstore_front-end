import React from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, LogOut, Package } from 'lucide-react';
import { useAuthStore, useToastStore } from '@/store';

export const UserNav: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { addToast } = useToastStore();

  const handleLogout = () => {
    logout();
    addToast('You have been logged out.', 'info');
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
        <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-700">
          <UserIcon className="w-4 h-4 text-indigo-600" />
          <span className="font-medium truncate max-w-[120px]">{user.fullName}</span>
        </div>

        <Link
          to="/orders"
          aria-label="My Orders"
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Package className="w-4 h-4" />
          <span className="hidden sm:inline">My Orders</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
      <Link
        to="/login"
        className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        Sign In
      </Link>
      <Link
        to="/register"
        className="px-3.5 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
};
