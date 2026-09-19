import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { BookCover } from '@/components/books/BookCover';
import { QuantitySelector } from '@/components/common/QuantitySelector';
import { formatCurrency } from '@/utils/formatters';

export interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  disabled?: boolean;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
      {/* Book Cover and Info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-16 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100 p-1">
          <BookCover
            coverImageUrl={item.bookCoverImageUrl}
            title={item.bookTitle}
            className="h-full"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-gray-900 truncate">
            {item.bookTitle}
          </h4>
          <p className="text-sm text-gray-500 font-medium">{item.bookAuthor}</p>
          <p className="text-xs text-indigo-600 font-semibold mt-1">
            {formatCurrency(item.bookPrice)} each
          </p>
        </div>
      </div>

      {/* Controls: Stepper, Subtotal, Remove */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        <QuantitySelector
          value={item.quantity}
          onChange={(newQty) => onUpdateQuantity(item.id, newQty)}
          min={1}
          disabled={disabled}
        />

        <div className="text-right min-w-[5rem]">
          <span className="text-xs text-gray-400 block sm:hidden">Subtotal</span>
          <span className="text-base font-bold text-gray-900">
            {formatCurrency(item.subtotal)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          disabled={disabled}
          aria-label="Remove item"
          title="Remove item"
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
