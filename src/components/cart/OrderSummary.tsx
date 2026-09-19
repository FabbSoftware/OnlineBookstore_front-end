import React from 'react';
import { formatCurrency } from '@/utils';

export interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  action?: React.ReactNode;
  title?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping = 0,
  tax = 0,
  action,
  title = 'Order Summary',
}) => {
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span className="font-semibold text-gray-900">{formatCurrency(tax)}</span>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-base">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-extrabold text-indigo-600">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
