import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useToastStore } from '@/store/useToastStore';

describe('useToastStore', () => {
  beforeEach(() => {
    useToastStore.getState().clearToasts();
    vi.useFakeTimers();
  });

  it('initializes with empty toasts', () => {
    expect(useToastStore.getState().toasts).toEqual([]);
  });

  it('adds and removes a toast notification', () => {
    useToastStore.getState().addToast('Book added to cart', 'success');
    const toasts = useToastStore.getState().toasts;

    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toBe('Book added to cart');
    expect(toasts[0].type).toBe('success');

    useToastStore.getState().removeToast(toasts[0].id);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('automatically removes toast after timeout', () => {
    useToastStore.getState().addToast('Auto dismiss toast', 'info');
    expect(useToastStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(4000);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
