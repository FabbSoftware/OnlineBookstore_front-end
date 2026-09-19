import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookGridSkeleton } from './BookGridSkeleton';
import { BookDetailSkeleton } from './BookDetailSkeleton';
import { CartSkeleton } from './CartSkeleton';

describe('Skeleton components', () => {
  it('renders BookGridSkeleton with pulse animation elements', () => {
    const { container } = render(<BookGridSkeleton count={4} />);
    const animatedElements = container.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThanOrEqual(4);
  });

  it('renders BookDetailSkeleton with placeholder layout', () => {
    const { container } = render(<BookDetailSkeleton />);
    const animatedElements = container.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders CartSkeleton with item placeholders', () => {
    const { container } = render(<CartSkeleton />);
    const animatedElements = container.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThanOrEqual(1);
  });
});
