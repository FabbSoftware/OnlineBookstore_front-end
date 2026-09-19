import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuantitySelector } from './QuantitySelector';

describe('QuantitySelector component', () => {
  it('renders current value and buttons', () => {
    render(<QuantitySelector value={3} onChange={vi.fn()} />);

    expect(screen.getByTestId('quantity-display')).toHaveTextContent('3');
    expect(screen.getByRole('button', { name: /Decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Increase quantity/i })).toBeInTheDocument();
  });

  it('calls onChange with incremented value when plus clicked', () => {
    const handleChange = vi.fn();
    render(<QuantitySelector value={2} onChange={handleChange} max={5} />);

    fireEvent.click(screen.getByRole('button', { name: /Increase quantity/i }));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with decremented value when minus clicked', () => {
    const handleChange = vi.fn();
    render(<QuantitySelector value={2} onChange={handleChange} min={1} />);

    fireEvent.click(screen.getByRole('button', { name: /Decrease quantity/i }));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('disables decrement button when value reaches min', () => {
    render(<QuantitySelector value={1} min={1} onChange={vi.fn()} />);

    const decBtn = screen.getByRole('button', { name: /Decrease quantity/i });
    expect(decBtn).toBeDisabled();
  });

  it('disables increment button when value reaches max', () => {
    render(<QuantitySelector value={5} max={5} onChange={vi.fn()} />);

    const incBtn = screen.getByRole('button', { name: /Increase quantity/i });
    expect(incBtn).toBeDisabled();
  });

  it('disables both buttons when disabled prop is true', () => {
    render(<QuantitySelector value={3} disabled={true} onChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Decrease quantity/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Increase quantity/i })).toBeDisabled();
  });
});
