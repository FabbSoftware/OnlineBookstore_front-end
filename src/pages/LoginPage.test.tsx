import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginPage } from './LoginPage';
import * as authApi from '@/api/auth/authApi';
import { useAuthStore } from '@/store';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('LoginPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    useAuthStore.getState().logout();
    mockedNavigate.mockReset();
    vi.restoreAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  it('renders login form with email, password, and links', () => {
    render(<LoginPage />, { wrapper });
    expect(screen.getByRole('heading', { name: /Sign In to Your Account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Sign In$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Don't have an account\? Sign up/i })).toHaveAttribute('href', '/register');
  });

  it('validates required fields on submission', async () => {
    render(<LoginPage />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: /^Sign In$/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<LoginPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'not-a-valid-email' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign In$/i }));

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('submits form and navigates upon successful login', async () => {
    vi.spyOn(authApi, 'loginApi').mockResolvedValue({
      token: 'jwt-token-123',
      tokenType: 'Bearer',
      user: {
        id: 'user-id-1',
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'ROLE_USER',
      },
    });

    render(<LoginPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign In$/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(mockedNavigate).toHaveBeenCalledWith('/', expect.anything());
    });
  });

  it('displays error message when login fails', async () => {
    vi.spyOn(authApi, 'loginApi').mockRejectedValue(new Error('Invalid email or password'));

    render(<LoginPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign In$/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });
});
