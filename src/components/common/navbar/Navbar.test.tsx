import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchStore } from '@/store/useSearchStore';
import { useToastStore } from '@/store/useToastStore';

describe('Navbar component', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    useSearchStore.getState().clearSearchQuery();
    useToastStore.getState().clearToasts();
  });

  it('renders brand logo, search bar, cart button, and unauthenticated user nav', () => {
    render(
      <MemoryRouter>
        <Navbar cartItemCount={0} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/BookStore/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Search books by title or author/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /shopping cart/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('shows user controls and cart count when authenticated and cart has items', () => {
    useAuthStore.getState().setAuth('mock-token', {
      id: 'uuid-1',
      email: 'jane@example.com',
      fullName: 'Jane Doe',
      role: 'ROLE_USER',
    });

    render(
      <MemoryRouter>
        <Navbar cartItemCount={3} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /My Orders/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
