import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Navbar } from '../components/common/Navbar';
import { useAuthStore } from '../store/useAuthStore';
import { useUIStore } from '../store/useUIStore';

describe('Navbar component', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    useUIStore.setState({
      activeModal: null,
      searchQuery: '',
    });
  });

  it('renders brand name and search input', () => {
    render(<Navbar cartItemCount={0} onOpenCart={() => {}} />);
    expect(screen.getByText(/BookStore/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search books by title or author/i)).toBeInTheDocument();
  });

  it('shows Sign In and Sign Up buttons when unauthenticated', () => {
    render(<Navbar cartItemCount={0} onOpenCart={() => {}} />);
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('clicking Sign In opens login modal', () => {
    render(<Navbar cartItemCount={0} onOpenCart={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    expect(useUIStore.getState().activeModal).toBe('login');
  });

  it('shows user name, My Orders, and Logout when authenticated', () => {
    useAuthStore.getState().setAuth('mock-token', {
      id: 'uuid-1',
      email: 'jane@example.com',
      fullName: 'Jane Doe',
      role: 'ROLE_USER',
    });

    render(<Navbar cartItemCount={2} onOpenCart={() => {}} />);
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /My Orders/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  it('shows cart item count badge when greater than 0', () => {
    render(<Navbar cartItemCount={3} onOpenCart={() => {}} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
