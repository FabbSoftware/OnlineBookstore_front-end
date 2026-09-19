import React from 'react';
import { OrderItem } from '@/types';
import { BookCover } from '@/components/books';
import { formatCurrency } from '@/utils';

export interface OrderItemRowProps {
  item: OrderItem;
}

export const OrderItemRow: React.FC<OrderItemRowProps> = ({ item }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-16 bg-slate-50 rounded overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100 p-0.5">
          <BookCover
            coverImageUrl={item.bookCoverImageUrl}
            title={item.bookTitle}
            className="h-full"
          />
        </div>
        <div className="min-w-0">
          <h5 className="text-sm font-semibold text-gray-900 truncate">
            {item.bookTitle}
          </h5>
          <p className="text-xs text-gray-500 font-medium">{item.bookAuthor}</p>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
            <span>Qty: {item.quantity}</span>
            <span>•</span>
            <span>{formatCurrency(item.price)}</span>
            <span>each</span>
          </div>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <span className="text-sm font-bold text-gray-900">
          {formatCurrency(item.subtotal)}
        </span>
      </div>
    </div>
  );
};
