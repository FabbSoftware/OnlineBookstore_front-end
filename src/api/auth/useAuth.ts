import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi, registerApi } from './authApi';
import { useAuthStore } from '@/store';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types';

export const AUTH_QUERY_KEYS = {
  default: 'auth' as const,
  user: () => [AUTH_QUERY_KEYS.default, 'user'] as const,
};

export const useLoginMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      queryClient.invalidateQueries();
    },
  });
};

export const useRegisterMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      queryClient.invalidateQueries();
    },
  });
};
