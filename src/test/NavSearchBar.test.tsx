import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { NavSearchBar } from '../components/common/navbar/NavSearchBar';
import { useUIStore } from '../store/useUIStore';

describe('NavSearchBar component', () => {
  beforeEach(() => {
    useUIStore.setState({ searchQuery: '' });
  });

  it('renders search input with placeholder', () => {
    render(<NavSearchBar />);
    expect(
      screen.getByPlaceholderText(/Search books by title or author/i)
    ).toBeInTheDocument();
  });

  it('updates search query in store on user typing', () => {
    render(<NavSearchBar />);
    const input = screen.getByPlaceholderText(/Search books by title or author/i);
    fireEvent.change(input, { target: { value: 'clean code' } });
    expect(useUIStore.getState().searchQuery).toBe('clean code');
  });

  it('displays current search query from store', () => {
    useUIStore.setState({ searchQuery: 'refactoring' });
    render(<NavSearchBar />);
    const input = screen.getByPlaceholderText(/Search books by title or author/i) as HTMLInputElement;
    expect(input.value).toBe('refactoring');
  });
});
