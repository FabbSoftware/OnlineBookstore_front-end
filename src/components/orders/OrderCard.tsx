import React from 'react';
import { MapPin, Phone, Calendar } from 'lucide-react';
import { Order } from '@/types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderItemRow } from './OrderItemRow';
import { formatCurrency, formatDate } from '@/utils';

export interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const formattedDate = formatDate(order.createdAt);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-7 space-y-5">
      {/* Header: Order ID, Date, and Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <span className="text-base sm:text-lg font-bold text-gray-900">
            Order #{order.id}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Placed on {formattedDate}</span>
          </div>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items List */}
      {order.items && order.items.length > 0 && (
        <div className="space-y-1">
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Footer: Shipping Info and Total */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/50 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-5 sm:px-7 rounded-b-2xl">
        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{order.shippingAddress}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{order.contactPhone}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 block">Total Amount</span>
          <span className="text-xl font-extrabold text-gray-900">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};
