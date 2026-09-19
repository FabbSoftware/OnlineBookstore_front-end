import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookInfo } from './BookInfo';

describe('BookInfo component', () => {
  it('renders title as h3 and author by default (size="sm")', () => {
    render(<BookInfo title="Refactoring" author="Martin Fowler" />);
    const heading = screen.getByRole('heading', { level: 3, name: /Refactoring/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/Martin Fowler/i)).toBeInTheDocument();
  });

  it('renders title as h1 and prepends authorPrefix when size="lg"', () => {
    render(
      <BookInfo
        title="Domain-Driven Design"
        author="Eric Evans"
        size="lg"
        authorPrefix="By "
        description="Tackling Complexity in Software"
      />
    );
    const heading = screen.getByRole('heading', { level: 1, name: /Domain-Driven Design/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText('By Eric Evans')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Description/i })).toBeInTheDocument();
    expect(screen.getByText(/Tackling Complexity in Software/i)).toBeInTheDocument();
  });

  it('renders clamped description when provided in sm size', () => {
    render(
      <BookInfo
        title="Refactoring"
        author="Martin Fowler"
        description="Improving the design of existing code"
      />
    );
    expect(screen.getByText(/Improving the design of existing code/i)).toBeInTheDocument();
  });
});
