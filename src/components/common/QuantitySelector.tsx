import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  className = '',
}) => {
  const isAtMin = value <= min;
  const isAtMax = max !== undefined && value >= max;

  const handleDecrement = () => {
    if (!disabled && !isAtMin) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (!disabled && !isAtMax) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || isAtMin}
        aria-label="Decrease quantity"
        className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors cursor-pointer"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span
        data-testid="quantity-display"
        className="px-4 py-1 text-sm font-semibold text-gray-900 min-w-[2.5rem] text-center select-none"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || isAtMax}
        aria-label="Increase quantity"
        className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
