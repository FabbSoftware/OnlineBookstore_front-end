import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OrderSummary } from './OrderSummary';

describe('OrderSummary component', () => {
  it('renders order summary with free shipping when shipping is 0', () => {
    render(
      <OrderSummary
        subtotal={100}
        shipping={0}
        tax={8}
        action={<button>Proceed</button>}
      />
    );

    expect(screen.getByRole('heading', { name: /Order Summary/i })).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('FREE')).toBeInTheDocument();
    expect(screen.getByText('$8.00')).toBeInTheDocument();
    expect(screen.getByText('$108.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Proceed/i })).toBeInTheDocument();
  });

  it('renders shipping cost when greater than 0', () => {
    render(
      <OrderSummary
        subtotal={50}
        shipping={5.99}
        tax={4}
      />
    );

    expect(screen.getByText('$5.99')).toBeInTheDocument();
    expect(screen.getByText('$59.99')).toBeInTheDocument();
  });
});
