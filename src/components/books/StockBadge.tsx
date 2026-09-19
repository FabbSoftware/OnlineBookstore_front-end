import React from 'react';
import { CheckCircle } from 'lucide-react';

export interface StockBadgeProps {
  stockQuantity: number;
  format?: 'left' | 'inStock';
  showIcon?: boolean;
  className?: string;
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  stockQuantity,
  format = 'left',
  showIcon = false,
  className = '',
}) => {
  const isOutOfStock = stockQuantity <= 0;

  if (isOutOfStock) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200 rounded-full ${className}`}
      >
        Out of Stock
      </span>
    );
  }

  const label = format === 'left' ? `In Stock (${stockQuantity} left)` : `${stockQuantity} in stock`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full ${className}`}
    >
      {showIcon && <CheckCircle className="w-3.5 h-3.5" data-testid="stock-check-icon" />}
      {label}
    </span>
  );
};
