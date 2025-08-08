import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminProjectForm from '../AdminProjectForm';

function createFile(name, type, size = 1000) {
  const file = new File(['a'.repeat(size)], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

describe('AdminProjectForm', () => {
  it('renders all main fields', () => {
    render(<AdminProjectForm onSave={jest.fn()} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Technologies/i)).toBeInTheDocument();
    expect(screen.getByText(/Images/i)).toBeInTheDocument();
  });

  it('shows error for invalid image type', async () => {
    render(<AdminProjectForm onSave={jest.fn()} />);
    const fileInput = screen.getByLabelText(/Images/i, { selector: 'input[type="file"]' });
    const badFile = createFile('bad.txt', 'text/plain');
    Object.defineProperty(fileInput, 'files', { value: [badFile] });
    fireEvent.change(fileInput);
    await waitFor(() => {
      expect(screen.getByText(/Invalid file type/i)).toBeInTheDocument();
    });
  });

  it('shows error for file size over 2MB', async () => {
    render(<AdminProjectForm onSave={jest.fn()} />);
    const fileInput = screen.getByLabelText(/Images/i, { selector: 'input[type="file"]' });
    const bigFile = createFile('big.jpg', 'image/jpeg', 3 * 1024 * 1024);
    Object.defineProperty(fileInput, 'files', { value: [bigFile] });
    fireEvent.change(fileInput);
    await waitFor(() => {
      expect(screen.getByText(/File too large/i)).toBeInTheDocument();
    });
  });

  it('shows image preview after upload', async () => {
    render(<AdminProjectForm onSave={jest.fn()} />);
    const fileInput = screen.getByLabelText(/Images/i, { selector: 'input[type="file"]' });
    const goodFile = createFile('good.jpg', 'image/jpeg', 1000);
    Object.defineProperty(fileInput, 'files', { value: [goodFile] });
    fireEvent.change(fileInput);
    // Wait for preview to appear
    await waitFor(() => {
      expect(screen.getByAltText('good.jpg')).toBeInTheDocument();
    });
  });

  it('removes image preview when Remove is clicked', async () => {
    render(<AdminProjectForm onSave={jest.fn()} />);
    const fileInput = screen.getByLabelText(/Images/i, { selector: 'input[type="file"]' });
    const goodFile = createFile('good.jpg', 'image/jpeg', 1000);
    Object.defineProperty(fileInput, 'files', { value: [goodFile] });
    fireEvent.change(fileInput);
    await waitFor(() => {
      expect(screen.getByAltText('good.jpg')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    await waitFor(() => {
      expect(screen.queryByAltText('good.jpg')).not.toBeInTheDocument();
    });
  });
}); 