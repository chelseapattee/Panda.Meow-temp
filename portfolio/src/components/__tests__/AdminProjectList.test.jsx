import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminProjectList from '../AdminProjectList';
import AdminDeleteModal from '../AdminDeleteModal';

describe('AdminProjectList', () => {
  const projects = [
    { id: '1', title: 'Project One' },
    { id: '2', title: 'Project Two' },
  ];

  it('renders project titles and actions', () => {
    render(<AdminProjectList projects={projects} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Project One')).toBeInTheDocument();
    expect(screen.getByText('Project Two')).toBeInTheDocument();
    expect(screen.getAllByText('Edit').length).toBe(2);
    expect(screen.getAllByText('Delete').length).toBe(2);
  });

  it('calls onEdit and onDelete when buttons are clicked', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(<AdminProjectList projects={projects} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(onEdit).toHaveBeenCalledWith(projects[0]);
    fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(onDelete).toHaveBeenCalledWith(projects[1]);
  });

  it('shows message if no projects', () => {
    render(<AdminProjectList projects={[]} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
  });
});

describe('AdminDeleteModal', () => {
  const project = { id: '1', title: 'Project One' };

  it('renders nothing if not open', () => {
    const { container } = render(<AdminDeleteModal open={false} project={project} onConfirm={jest.fn()} onCancel={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal and calls onConfirm/onCancel', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    render(<AdminDeleteModal open={true} project={project} onConfirm={onConfirm} onCancel={onCancel} />);
    expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    expect(screen.getByText(/Project One/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/confirm delete/i));
    expect(onConfirm).toHaveBeenCalled();
    fireEvent.click(screen.getByText(/cancel/i));
    expect(onCancel).toHaveBeenCalled();
  });
}); 