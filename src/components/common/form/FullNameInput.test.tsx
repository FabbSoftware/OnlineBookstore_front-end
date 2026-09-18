import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm } from 'react-hook-form';
import { FullNameInput } from './FullNameInput';

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ fullName: string }>();

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <FullNameInput register={register} error={errors.fullName} />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('FullNameInput component', () => {
  it('renders label and input with placeholder', () => {
    render(<TestForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jane Doe')).toBeInTheDocument();
  });

  it('validates required full name on submit', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Full name is required/i)).toBeInTheDocument();
  });

  it('validates minLength for full name', async () => {
    render(<TestForm />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'A' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/Full name must be at least 2 characters/i)).toBeInTheDocument();
  });
});
