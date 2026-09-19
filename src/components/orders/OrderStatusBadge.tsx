import React from 'react';
import { Clock, CheckCircle2, Truck, PackageCheck, XCircle } from 'lucide-react';
import { OrderStatus } from '@/types';

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'PENDING':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full ${className}`}
        >
          <Clock className="w-3.5 h-3.5" />
          Pending
        </span>
      );
    case 'CONFIRMED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Confirmed
        </span>
      );
    case 'SHIPPED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-full ${className}`}
        >
          <Truck className="w-3.5 h-3.5" />
          Shipped
        </span>
      );
    case 'DELIVERED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full ${className}`}
        >
          <PackageCheck className="w-3.5 h-3.5" />
          Delivered
        </span>
      );
    case 'CANCELLED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200 rounded-full ${className}`}
        >
          <XCircle className="w-3.5 h-3.5" />
          Cancelled
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full ${className}`}>
          {status}
        </span>
      );
  }
};
