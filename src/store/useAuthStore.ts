import { create } from 'zustand';
import { User } from '../types';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/cookies';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

const getStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialToken = getAuthToken() || null;
const initialUser = initialToken ? getStoredUser() : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken,
  user: initialUser,
  isAuthenticated: !!initialToken && !!initialUser,

  setAuth: (token: string, user: User) => {
    setAuthToken(token);
    try {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } catch {
      // ignore storage write errors
    }
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    removeAuthToken();
    try {
      localStorage.removeItem('auth_user');
    } catch {
      // ignore storage removal errors
    }
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
