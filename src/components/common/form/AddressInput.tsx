import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface AddressInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  register,
  error,
  id = 'checkout-address',
  name = 'shippingAddress',
  label = 'Shipping Address',
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        disabled={disabled}
        {...register(name, {
          required: 'Shipping address is required',
          minLength: {
            value: 5,
            message: 'Address must be at least 5 characters',
          },
        })}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
          error
            ? 'border-red-300 focus:ring-red-500'
            : 'border-gray-300 focus:ring-indigo-500'
        }`}
        placeholder="123 Main St, Apt 4B, City, Country"
      />
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
