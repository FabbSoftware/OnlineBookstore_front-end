import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient, ApiError } from './client';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { URLS } from './urls';

describe('apiClient', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    useAuthStore.getState().logout();
    useToastStore.getState().toasts = [];
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns JSON data on successful response', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockData,
    });

    const result = await apiClient('/test');
    expect(result).toEqual(mockData);
  });

  it('returns empty object on 204 No Content', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      headers: new Headers(),
    });

    const result = await apiClient('/test');
    expect(result).toEqual({});
  });

  it('logs out the user and displays toast when a 401 is received from a non-login endpoint', async () => {
    useAuthStore.getState().setAuth('mock-token', {
      id: 'u-1',
      email: 'user@example.com',
      fullName: 'John Doe',
      role: 'ROLE_USER',
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ status: 401, message: 'Unauthorized' }),
    });

    await expect(apiClient(URLS.cart.cart)).rejects.toThrow(ApiError);

    // Should be logged out
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();

    // Toast should be displayed
    const toasts = useToastStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toBe('Session expired. Please sign in again.');
    expect(toasts[0].type).toBe('error');
  });

  it('clears stale token on 401 even if user was marked unauthenticated, without adding toast', async () => {
    // Stale token in cookie but not marked authenticated
    expect(useAuthStore.getState().isAuthenticated).toBe(false);

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ status: 401, message: 'Unauthorized' }),
    });

    await expect(apiClient(URLS.cart.cart)).rejects.toThrow(ApiError);

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('does NOT trigger session expired toast on 401 when calling login endpoint', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ status: 401, message: 'Invalid email or password' }),
    });

    await expect(apiClient(URLS.auth.login)).rejects.toThrow(ApiError);

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
