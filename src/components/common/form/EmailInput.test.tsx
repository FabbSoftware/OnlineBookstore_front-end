import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { EmailInput } from './EmailInput';

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  return (
    <form noValidate onSubmit={handleSubmit(() => {})}>
      <EmailInput register={register} error={errors.email} />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('EmailInput component', () => {
  it('renders label and input with placeholder', () => {
    render(<TestForm />);
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('validates required email on submit', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  it('validates email format on invalid input', async () => {
    render(<TestForm />);
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'bad-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });
});
