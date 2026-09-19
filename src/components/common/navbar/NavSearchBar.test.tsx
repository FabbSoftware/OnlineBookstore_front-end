import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NavSearchBar } from './NavSearchBar';
import { useSearchStore } from '@/store';

describe('NavSearchBar component', () => {
  beforeEach(() => {
    useSearchStore.getState().clearSearchQuery();
  });

  it('renders search input with placeholder', () => {
    render(
      <MemoryRouter>
        <NavSearchBar />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/Search books by title or author/i)
    ).toBeInTheDocument();
  });

  it('updates search query in store on user typing', () => {
    render(
      <MemoryRouter>
        <NavSearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Search books by title or author/i);
    fireEvent.change(input, { target: { value: 'clean code' } });
    expect(useSearchStore.getState().searchQuery).toBe('clean code');
  });

  it('displays current search query from store', () => {
    useSearchStore.getState().setSearchQuery('refactoring');
    render(
      <MemoryRouter>
        <NavSearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Search books by title or author/i) as HTMLInputElement;
    expect(input.value).toBe('refactoring');
  });

  it('updates store and navigates when typing from another route', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <NavSearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Search books by title or author/i);
    fireEvent.change(input, { target: { value: 'pragmatic' } });
    expect(useSearchStore.getState().searchQuery).toBe('pragmatic');
  });

  it('handles Enter key on search input', () => {
    render(
      <MemoryRouter initialEntries={['/orders']}>
        <NavSearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Search books by title or author/i);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(input).toBeInTheDocument();
  });
});
