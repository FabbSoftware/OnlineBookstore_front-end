import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as client from '../client';
import { loginApi, registerApi } from './authApi';
import { URLS } from '../urls';
import { AuthResponse } from '@/types';

vi.mock('../client', () => ({
  apiClient: vi.fn(),
}));

describe('authApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockAuthResponse: AuthResponse = {
    token: 'jwt-123',
    tokenType: 'Bearer',
    user: {
      id: 'u-1',
      email: 'user@example.com',
      fullName: 'Test User',
      role: 'ROLE_USER',
    },
  };

  it('loginApi calls POST auth login endpoint', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockAuthResponse);

    const result = await loginApi({ email: 'user@example.com', password: 'Password1!' });

    expect(client.apiClient).toHaveBeenCalledWith(URLS.auth.login, {
      method: 'POST',
      body: JSON.stringify({ email: 'user@example.com', password: 'Password1!' }),
    });
    expect(result).toEqual(mockAuthResponse);
  });

  it('registerApi calls POST auth register endpoint', async () => {
    vi.mocked(client.apiClient).mockResolvedValue(mockAuthResponse);

    const payload = {
      fullName: 'Test User',
      email: 'user@example.com',
      password: 'Password1!',
    };
    const result = await registerApi(payload);

    expect(client.apiClient).toHaveBeenCalledWith(URLS.auth.register, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    expect(result).toEqual(mockAuthResponse);
  });
});
