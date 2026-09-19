import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserNav } from './UserNav';
import { useAuthStore, useToastStore } from '@/store';

describe('UserNav component', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    useToastStore.getState().clearToasts();
  });

  it('renders Sign In and Sign Up links when unauthenticated', () => {
    render(
      <MemoryRouter>
        <UserNav />
      </MemoryRouter>
    );

    const signInLink = screen.getByRole('link', { name: /Sign In/i });
    const signUpLink = screen.getByRole('link', { name: /Sign Up/i });

    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/login');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/register');
  });

  it('renders user greeting, My Orders link, and Logout button when authenticated', () => {
    useAuthStore.getState().setAuth('mock-jwt', {
      id: 'uuid-1',
      email: 'john@example.com',
      fullName: 'John Doe',
      role: 'ROLE_USER',
    });

    render(
      <MemoryRouter>
        <UserNav />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    const ordersLink = screen.getByRole('link', { name: /My Orders/i });
    expect(ordersLink).toBeInTheDocument();
    expect(ordersLink).toHaveAttribute('href', '/orders');

    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  it('logs out user and displays toast when Logout button is clicked', () => {
    useAuthStore.getState().setAuth('mock-jwt', {
      id: 'uuid-1',
      email: 'john@example.com',
      fullName: 'John Doe',
      role: 'ROLE_USER',
    });

    render(
      <MemoryRouter>
        <UserNav />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().token).toBeNull();
    expect(useToastStore.getState().toasts).toHaveLength(1);
    expect(useToastStore.getState().toasts[0].message).toMatch(/logged out/i);
  });
});
