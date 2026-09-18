import { create } from 'zustand';

export type ModalType = 'login' | 'register' | 'checkout' | 'orders' | 'book-detail' | null;

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  activeModal: ModalType;
  selectedBookId: string | null;
  searchQuery: string;
  toasts: ToastItem[];
  openModal: (modal: ModalType, bookId?: string) => void;
  closeModal: () => void;
  setSearchQuery: (query: string) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  selectedBookId: null,
  searchQuery: '',
  toasts: [],

  openModal: (modal, bookId = undefined) =>
    set({ activeModal: modal, selectedBookId: bookId || null }),

  closeModal: () => set({ activeModal: null, selectedBookId: null }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
