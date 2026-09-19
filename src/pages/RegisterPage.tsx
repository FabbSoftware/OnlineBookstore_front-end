import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { useRegisterMutation } from '@/api/auth';
import { useToastStore } from '@/store';
import { FullNameInput, EmailInput, PasswordInput } from '@/components/common/form';
import { RegisterRequest } from '@/types';

export const RegisterPage: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({ mode: 'onTouched' });

  const onSubmit = (data: RegisterRequest) => {
    setServerError(null);
    registerMutation.mutate(data, {
      onSuccess: (res) => {
        addToast(`Account created! Welcome, ${res.user.fullName}!`, 'success');
        navigate('/', { replace: true });
      },
      onError: (err) => {
        setServerError(err.message || 'Registration failed. Please try again.');
      },
    });
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create an Account</h1>
          <p className="text-sm text-gray-500 mt-1">Join BookStore to explore and purchase books</p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <FullNameInput register={register} error={errors.fullName} />
          <EmailInput register={register} error={errors.email} />
          <PasswordInput register={register} error={errors.password} requireComplexity={true} />

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium text-sm rounded-lg shadow-sm transition-colors mt-2 cursor-pointer"
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
