import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginModal } from './LoginModal';
import { useUIStore } from '../../store/useUIStore';

describe('LoginModal component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    useUIStore.setState({ activeModal: 'login' });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('renders login form inputs when activeModal is login', () => {
    render(<LoginModal />, { wrapper });
    expect(screen.getByRole('heading', { name: /Sign In to Your Account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Sign In$/i })).toBeInTheDocument();
  });

  it('does not render when activeModal is null', () => {
    useUIStore.setState({ activeModal: null });
    const { container } = render(<LoginModal />, { wrapper });
    expect(container.firstChild).toBeNull();
  });

  it('switches to register modal when Sign Up link is clicked', () => {
    render(<LoginModal />, { wrapper });
    const switchBtn = screen.getByRole('button', { name: /Don't have an account\? Sign up/i });
    fireEvent.click(switchBtn);
    expect(useUIStore.getState().activeModal).toBe('register');
  });
});
