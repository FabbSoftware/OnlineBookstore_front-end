import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';
import { useOrdersQuery } from '@/api/order';
import { EmptyState } from '@/components/common';
import { OrderCard } from '@/components/orders';

export const OrderHistoryPage: React.FC = () => {
  const { data: orders, isLoading, isError } = useOrdersQuery();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
        <div className="h-44 bg-white rounded-2xl border border-gray-200" />
        <div className="h-44 bg-white rounded-2xl border border-gray-200" />
      </div>
    );
  }

  if (isError || !orders || orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <EmptyState
          icon={<Package className="w-8 h-8" />}
          title="No Orders Found"
          description="You haven't placed any orders yet. Discover great software engineering books and bestsellers in our catalog."
          action={
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Start Shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="pb-4 border-b border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Your Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review your past orders, shipping status, and order details
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
