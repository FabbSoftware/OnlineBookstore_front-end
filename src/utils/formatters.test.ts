import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatters';

describe('formatCurrency', () => {
  it('formats positive numbers as USD currency', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
    expect(formatCurrency(100)).toBe('$100.00');
    expect(formatCurrency(5.5)).toBe('$5.50');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats large numbers with commas', () => {
    expect(formatCurrency(1250.75)).toBe('$1,250.75');
  });
});
