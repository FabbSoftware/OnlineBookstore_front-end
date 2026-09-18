import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserNav } from '../components/common/navbar/UserNav';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

describe('UserNav component', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    useUIStore.setState({ toasts: [] });
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
    expect(useUIStore.getState().toasts).toHaveLength(1);
    expect(useUIStore.getState().toasts[0].message).toMatch(/logged out/i);
  });
});
