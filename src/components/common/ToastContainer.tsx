import React from 'react';
import { useToastStore } from '@/store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let bgClass = 'bg-blue-600';
        let Icon = Info;

        if (toast.type === 'success') {
          bgClass = 'bg-emerald-600';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bgClass = 'bg-red-600';
          Icon = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            role="alert"
            className={`${bgClass} text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between pointer-events-auto transition-all transform translate-y-0`}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded hover:bg-white/20 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
