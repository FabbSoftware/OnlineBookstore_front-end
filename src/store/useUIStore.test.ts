import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from './useUIStore';

describe('useUIStore', () => {
  beforeEach(() => {
    useUIStore.setState({
      activeModal: null,
      selectedBookId: null,
      searchQuery: '',
      toasts: [],
    });
  });

  it('initializes with default values', () => {
    const state = useUIStore.getState();
    expect(state.activeModal).toBeNull();
    expect(state.selectedBookId).toBeNull();
    expect(state.searchQuery).toBe('');
    expect(state.toasts).toEqual([]);
  });

  it('opens and closes modals', () => {
    useUIStore.getState().openModal('login');
    expect(useUIStore.getState().activeModal).toBe('login');

    useUIStore.getState().openModal('book-detail', 'book-uuid-123');
    expect(useUIStore.getState().activeModal).toBe('book-detail');
    expect(useUIStore.getState().selectedBookId).toBe('book-uuid-123');

    useUIStore.getState().closeModal();
    expect(useUIStore.getState().activeModal).toBeNull();
    expect(useUIStore.getState().selectedBookId).toBeNull();
  });

  it('updates search query', () => {
    useUIStore.getState().setSearchQuery('clean code');
    expect(useUIStore.getState().searchQuery).toBe('clean code');
  });

  it('manages toasts correctly', () => {
    useUIStore.getState().addToast('Item added to cart', 'success');
    const toasts = useUIStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toBe('Item added to cart');
    expect(toasts[0].type).toBe('success');

    useUIStore.getState().removeToast(toasts[0].id);
    expect(useUIStore.getState().toasts).toHaveLength(0);
  });
});
