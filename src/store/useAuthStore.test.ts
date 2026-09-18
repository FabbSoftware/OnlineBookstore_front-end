import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './useAuthStore';
import { getAuthToken } from '../utils/cookies';
import { User } from '../types';

describe('useAuthStore', () => {
  const sampleUser: User = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    email: 'user@example.com',
    fullName: 'Jane Doe',
    role: 'ROLE_USER',
  };

  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('initializes with unauthenticated state', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  it('sets authentication and saves token to cookies', () => {
    useAuthStore.getState().setAuth('mock-token-xyz', sampleUser);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('mock-token-xyz');
    expect(state.user).toEqual(sampleUser);
    expect(getAuthToken()).toBe('mock-token-xyz');
  });

  it('clears authentication and removes token from cookies on logout', () => {
    useAuthStore.getState().setAuth('mock-token-xyz', sampleUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(getAuthToken()).toBeUndefined();
  });
});
