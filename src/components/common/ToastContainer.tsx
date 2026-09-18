import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border text-sm font-medium transition-all transform translate-y-0 ${
              isSuccess
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : isError
                ? 'bg-rose-50 text-rose-900 border-rose-200'
                : 'bg-indigo-50 text-indigo-900 border-indigo-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-black/5 transition-colors ml-2"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
