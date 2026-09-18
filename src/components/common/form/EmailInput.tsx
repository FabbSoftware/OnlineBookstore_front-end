import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface EmailInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  register,
  error,
  id = 'login-email',
  name = 'email',
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        Email Address
      </label>
      <input
        id={id}
        type="email"
        disabled={disabled}
        {...register(name, {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address',
          },
        })}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-300 focus:ring-red-500'
            : 'border-gray-300 focus:ring-indigo-500'
        }`}
        placeholder="you@example.com"
      />
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
