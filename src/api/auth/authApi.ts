import { apiClient } from '../client';
import { URLS } from '../urls';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types';

export const loginApi = async (credentials: LoginRequest): Promise<AuthResponse> => {
  return apiClient<AuthResponse>(URLS.auth.login, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const registerApi = async (payload: RegisterRequest): Promise<AuthResponse> => {
  return apiClient<AuthResponse>(URLS.auth.register, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
