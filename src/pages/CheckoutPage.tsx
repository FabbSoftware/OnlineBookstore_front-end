import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreditCard, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useCartQuery } from '@/hooks/useCart';
import { useCheckoutMutation } from '@/hooks/useOrders';
import { useToastStore } from '@/store/useToastStore';
import { AddressInput, PhoneInput } from '@/components/common/form';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { CheckoutRequest } from '@/types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const { data: cart } = useCartQuery();
  const checkoutMutation = useCheckoutMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutRequest>({ mode: 'onTouched' });

  const onSubmit = (data: CheckoutRequest) => {
    setServerError(null);
    checkoutMutation.mutate(data, {
      onSuccess: () => {
        addToast('Order placed successfully!', 'success');
        navigate('/orders');
      },
      onError: (err) => {
        setServerError(err.message || 'Failed to place order. Please try again.');
      },
    });
  };

  const totalAmount = cart?.totalAmount || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back to Cart link */}
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>
      </div>

      <div className="pb-4 border-b border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Checkout
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Complete your shipping details to place your order
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Shipping Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-50">
              Shipping Information
            </h3>

            <AddressInput register={register} error={errors.shippingAddress} />
            <PhoneInput register={register} error={errors.contactPhone} />
          </div>

          {/* Order Summary & Submit Column */}
          <div className="lg:col-span-5">
            <OrderSummary
              subtotal={totalAmount}
              action={
                <button
                  type="submit"
                  disabled={checkoutMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {checkoutMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Place Order
                    </>
                  )}
                </button>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};
