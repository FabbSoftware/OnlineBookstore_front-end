import React, { useState } from 'react';
import { X, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useLoginMutation } from '../../hooks/useAuth';

export const LoginModal: React.FC = () => {
  const { activeModal, closeModal, openModal, addToast } = useUIStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const loginMutation = useLoginMutation();

  if (activeModal !== 'login') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email.trim() || !password) {
      setValidationError('Please enter both email and password.');
      return;
    }

    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: (data) => {
          addToast(`Welcome back, ${data.user.fullName}!`, 'success');
          closeModal();
          setEmail('');
          setPassword('');
        },
        onError: (err) => {
          setValidationError(err.message || 'Invalid email or password. Please try again.');
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={closeModal}
    >
      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 id="login-modal-title" className="text-2xl font-bold text-gray-900">
            Sign In to Your Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Access your shopping cart, checkout, and order history
          </p>
        </div>

        {/* Error Alert */}
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loginMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <button
            type="button"
            onClick={() => openModal('register')}
            className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
