import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { NavSearchBar } from './NavSearchBar';
import { useSearchStore } from '@/store/useSearchStore';

describe('NavSearchBar component', () => {
  beforeEach(() => {
    useSearchStore.getState().clearSearchQuery();
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
    expect(useSearchStore.getState().searchQuery).toBe('clean code');
  });

  it('displays current search query from store', () => {
    useSearchStore.getState().setSearchQuery('refactoring');
    render(<NavSearchBar />);
    const input = screen.getByPlaceholderText(/Search books by title or author/i) as HTMLInputElement;
    expect(input.value).toBe('refactoring');
  });
});
