import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface PhoneInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  register,
  error,
  id = 'checkout-phone',
  name = 'contactPhone',
  label = 'Contact Phone',
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="tel"
        disabled={disabled}
        {...register(name, {
          required: 'Phone number is required',
          pattern: {
            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9()]{6,}$/,
            message: 'Please enter a valid phone number',
          },
        })}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-300 focus:ring-red-500'
            : 'border-gray-300 focus:ring-indigo-500'
        }`}
        placeholder="+1 (555) 000-0000"
      />
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
