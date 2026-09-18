import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FullNameInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export const FullNameInput: React.FC<FullNameInputProps> = ({
  register,
  error,
  id = 'reg-fullname',
  name = 'fullName',
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        Full Name
      </label>
      <input
        id={id}
        type="text"
        disabled={disabled}
        {...register(name, {
          required: 'Full name is required',
          minLength: {
            value: 2,
            message: 'Full name must be at least 2 characters',
          },
        })}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-300 focus:ring-red-500'
            : 'border-gray-300 focus:ring-indigo-500'
        }`}
        placeholder="Jane Doe"
      />
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
