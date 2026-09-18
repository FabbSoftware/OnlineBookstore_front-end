import { describe, it, expect, beforeEach } from 'vitest';
import { useSearchStore } from '@/store/useSearchStore';

describe('useSearchStore', () => {
  beforeEach(() => {
    useSearchStore.getState().clearSearchQuery();
  });

  it('initializes with empty search query', () => {
    expect(useSearchStore.getState().searchQuery).toBe('');
  });

  it('updates search query', () => {
    useSearchStore.getState().setSearchQuery('Clean Architecture');
    expect(useSearchStore.getState().searchQuery).toBe('Clean Architecture');
  });

  it('clears search query', () => {
    useSearchStore.getState().setSearchQuery('Refactoring');
    expect(useSearchStore.getState().searchQuery).toBe('Refactoring');

    useSearchStore.getState().clearSearchQuery();
    expect(useSearchStore.getState().searchQuery).toBe('');
  });
});
