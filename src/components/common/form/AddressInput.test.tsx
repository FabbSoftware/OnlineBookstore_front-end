import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { AddressInput } from './AddressInput';

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ address: string }>();

  return (
    <form noValidate onSubmit={handleSubmit(() => {})}>
      <AddressInput name="address" register={register} error={errors.address} />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('AddressInput component', () => {
  it('renders label and placeholder', () => {
    render(<TestForm />);
    expect(screen.getByLabelText(/Shipping Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/123 Main St, Apt 4B, City, Country/i)).toBeInTheDocument();
  });

  it('validates required address on submit', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Shipping address is required/i)).toBeInTheDocument();
  });

  it('validates minimum address length (at least 5 characters)', async () => {
    render(<TestForm />);
    fireEvent.change(screen.getByLabelText(/Shipping Address/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Address must be at least 5 characters/i)).toBeInTheDocument();
  });
});
