import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  itemCount?: number;
}

export const CartButton: React.FC<CartButtonProps> = ({ itemCount = 0 }) => {
  return (
    <Link
      to="/cart"
      aria-label="Shopping Cart"
      className="relative p-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center justify-center"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {itemCount}
        </span>
      )}
    </Link>
  );
};
