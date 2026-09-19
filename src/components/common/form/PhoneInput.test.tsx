import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { PhoneInput } from './PhoneInput';

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>();

  return (
    <form noValidate onSubmit={handleSubmit(() => {})}>
      <PhoneInput register={register} error={errors.phone} />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('PhoneInput component', () => {
  it('renders label and placeholder', () => {
    render(<TestForm />);
    expect(screen.getByLabelText(/Contact Phone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1 (555) 000-0000')).toBeInTheDocument();
  });

  it('validates required phone on submit', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Phone number is required/i)).toBeInTheDocument();
  });

  it('validates phone format', async () => {
    render(<TestForm />);
    fireEvent.change(screen.getByLabelText(/Contact Phone/i), { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Please enter a valid phone number/i)).toBeInTheDocument();
  });
});
