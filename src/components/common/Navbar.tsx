import React from 'react';
import { BookOpen, ShoppingCart, Search, User as UserIcon, LogOut, Package } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onOpenCart }) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { searchQuery, setSearchQuery, openModal, addToast } = useUIStore();

  const handleLogout = () => {
    logout();
    addToast('You have been logged out.', 'info');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <span aria-label="BookStore" className="text-xl font-bold text-gray-900 tracking-tight">
              Book<span className="text-indigo-600">Store</span>
            </span>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-lg hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books by title or author..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Navigation / Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Auth Controls */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
                <div className="hidden md:flex items-center gap-1.5 text-sm text-gray-700">
                  <UserIcon className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium truncate max-w-[120px]">{user.fullName}</span>
                </div>

                <button
                  type="button"
                  onClick={() => openModal('orders')}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="My Orders"
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">My Orders</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
                <button
                  type="button"
                  onClick={() => openModal('login')}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => openModal('register')}
                  className="px-3.5 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 sm:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title or author..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
