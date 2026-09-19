import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLoginMutation, useRegisterMutation, AUTH_QUERY_KEYS } from './useAuth';
import { useAuthStore } from '@/store/useAuthStore';
import * as authApi from './authApi';
import { AuthResponse } from '@/types';

describe('useAuth hooks', () => {
  let queryClient: QueryClient;

  const mockResponse: AuthResponse = {
    token: 'jwt-auth-token',
    tokenType: 'Bearer',
    user: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      email: 'user@example.com',
      fullName: 'Jane Doe',
      role: 'ROLE_USER',
    },
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    useAuthStore.getState().logout();
    vi.restoreAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('provides AUTH_QUERY_KEYS structure', () => {
    expect(AUTH_QUERY_KEYS.default).toBe('auth');
    expect(AUTH_QUERY_KEYS.user()).toEqual(['auth', 'user']);
  });

  it('handles login mutation and updates auth store', async () => {
    vi.spyOn(authApi, 'loginApi').mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLoginMutation(), { wrapper });

    result.current.mutate({ email: 'user@example.com', password: 'password123' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().token).toBe('jwt-auth-token');
    expect(useAuthStore.getState().user?.email).toBe('user@example.com');
  });

  it('handles register mutation and updates auth store', async () => {
    vi.spyOn(authApi, 'registerApi').mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useRegisterMutation(), { wrapper });

    result.current.mutate({ email: 'user@example.com', password: 'password123', fullName: 'Jane Doe' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().token).toBe('jwt-auth-token');
    expect(useAuthStore.getState().user?.fullName).toBe('Jane Doe');
  });
});
