import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  useCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from '@/hooks/useCart';
import { CartSkeleton } from '@/components/common/skeletons/CartSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { MemoizedCartItemRow } from '@/components/cart/MemoizedCartItemRow';
import { OrderSummary } from '@/components/cart/OrderSummary';

export const CartPage: React.FC = () => {
  const { data: cart, isLoading, isError } = useCartQuery();
  const updateItemMutation = useUpdateCartItemMutation();
  const removeItemMutation = useRemoveCartItemMutation();
  const clearCartMutation = useClearCartMutation();

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (isError || !cart || cart.items.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon={<ShoppingBag className="w-8 h-8" />}
          title="Your Cart is Empty"
          description="Looks like you haven't added any books to your cart yet. Discover great software engineering books and bestsellers in our catalog."
          action={
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Explore Books
            </Link>
          }
        />
      </div>
    );
  }

  const handleUpdateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      updateItemMutation.mutate({ itemId, data: { quantity } });
    },
    [updateItemMutation]
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItemMutation.mutate(itemId);
    },
    [removeItemMutation]
  );

  const handleClearCart = useCallback(() => {
    clearCartMutation.mutate();
  }, [clearCartMutation]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearCart}
          disabled={clearCartMutation.isPending}
          className="self-start sm:self-auto px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 transition-colors cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      {/* Main Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Item Rows Column */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <MemoizedCartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
              disabled={updateItemMutation.isPending || removeItemMutation.isPending}
            />
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderSummary
              subtotal={cart.totalAmount}
              action={
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
