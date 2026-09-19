import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RegisterPage } from './RegisterPage';
import * as authApi from '@/api/auth/authApi';
import { useAuthStore } from '@/store/useAuthStore';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('RegisterPage', () => {
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

  it('renders registration form with full name, email, password, and links', () => {
    render(<RegisterPage />, { wrapper });
    expect(screen.getByRole('heading', { name: /Create an Account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Sign Up$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Already have an account\? Sign in/i })).toHaveAttribute('href', '/login');
  });

  it('validates required fields on submission', async () => {
    render(<RegisterPage />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: /^Sign Up$/i }));

    expect(await screen.findByText(/Full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<RegisterPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'not-a-valid-email' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Secret1!' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign Up$/i }));

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  it('validates password complexity (at least 8 chars, upper, lower, digit, special)', async () => {
    render(<RegisterPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'short1!' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign Up$/i }));

    expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
  });

  it('submits form and navigates upon successful registration', async () => {
    vi.spyOn(authApi, 'registerApi').mockResolvedValue({
      token: 'jwt-token-456',
      tokenType: 'Bearer',
      user: {
        id: 'user-id-2',
        email: 'newuser@example.com',
        fullName: 'New User',
        role: 'ROLE_USER',
      },
    });

    render(<RegisterPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Secret123!' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign Up$/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(mockedNavigate).toHaveBeenCalledWith('/', expect.anything());
    });
  });

  it('displays error message when registration fails', async () => {
    vi.spyOn(authApi, 'registerApi').mockRejectedValue(new Error('Email is already registered'));

    render(<RegisterPage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Secret123!' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign Up$/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is already registered/i)).toBeInTheDocument();
    });
  });
});
