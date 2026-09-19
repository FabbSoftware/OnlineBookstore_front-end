import React from 'react';
import { useAuthStore } from '@/store';
import { BrandLogo } from './BrandLogo';
import { NavSearchBar } from './NavSearchBar';
import { CartButton } from './CartButton';
import { UserNav } from './UserNav';

export interface NavbarProps {
  cartItemCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 0 }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <BrandLogo />

          <div className="flex-1 max-w-lg hidden sm:block">
            <NavSearchBar />
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && <CartButton itemCount={cartItemCount} />}
            <UserNav />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 sm:hidden">
          <NavSearchBar />
        </div>
      </div>
    </header>
  );
};
