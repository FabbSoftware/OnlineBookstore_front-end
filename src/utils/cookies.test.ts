import { describe, it, expect, beforeEach } from 'vitest';
import { getAuthToken, setAuthToken, removeAuthToken } from './cookies';
import Cookies from 'js-cookie';

describe('cookies utility', () => {
  beforeEach(() => {
    Cookies.remove('auth_token');
  });

  it('sets and retrieves the auth token in cookies', () => {
    expect(getAuthToken()).toBeUndefined();
    setAuthToken('test-jwt-token-123');
    expect(getAuthToken()).toBe('test-jwt-token-123');
  });

  it('removes the auth token from cookies', () => {
    setAuthToken('test-jwt-token-456');
    expect(getAuthToken()).toBe('test-jwt-token-456');

    removeAuthToken();
    expect(getAuthToken()).toBeUndefined();
  });
});
