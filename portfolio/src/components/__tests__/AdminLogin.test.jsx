import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminLogin from '../AdminLogin';

describe('AdminLogin', () => {
  it('renders email and password fields and submit button', () => {
    render(<AdminLogin />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('allows input in email and password fields', () => {
    render(<AdminLogin />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls onSubmit or handles submit when form is submitted', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<form onSubmit={handleSubmit}><AdminLogin /></form>);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(handleSubmit).toHaveBeenCalled();
  });
}); 