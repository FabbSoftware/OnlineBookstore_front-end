import React, { useState } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  requireComplexity?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  error,
  id = 'login-password',
  name = 'password',
  label = 'Password',
  disabled = false,
  requireComplexity = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          {...register(name, {
            required: 'Password is required',
            validate: requireComplexity
              ? {
                  minLength: (v: string) =>
                    v.length >= 8 || 'Password must be at least 8 characters',
                  hasUpper: (v: string) =>
                    /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
                  hasLower: (v: string) =>
                    /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
                  hasDigit: (v: string) =>
                    /[0-9]/.test(v) || 'Password must contain at least one number',
                  hasSpecial: (v: string) =>
                    /[^A-Za-z0-9]/.test(v) ||
                    'Password must contain at least one special character',
                }
              : undefined,
          })}
          className={`w-full pl-3.5 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 focus:ring-indigo-500'
          }`}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-600 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
