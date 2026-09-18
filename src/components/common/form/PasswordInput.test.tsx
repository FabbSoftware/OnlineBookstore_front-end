import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { PasswordInput } from './PasswordInput';

const TestForm = ({ requireComplexity = false }: { requireComplexity?: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>();

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <PasswordInput register={register} error={errors.password} requireComplexity={requireComplexity} />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('PasswordInput component', () => {
  it('renders label and password input', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/^Password$/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('validates required password on submit', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it('validates complexity rules when requireComplexity is true', async () => {
    render(<TestForm requireComplexity={true} />);

    // Less than 8 characters
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Short1!' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeInTheDocument();

    // Missing uppercase
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'lowercase1!' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Password must contain at least one uppercase letter/i)).toBeInTheDocument();

    // Missing lowercase
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'UPPERCASE1!' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Password must contain at least one lowercase letter/i)).toBeInTheDocument();

    // Missing number
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'NoNumberHere!' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Password must contain at least one number/i)).toBeInTheDocument();

    // Missing special character
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'NoSpecial123' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Password must contain at least one special character/i)).toBeInTheDocument();
  });
});
