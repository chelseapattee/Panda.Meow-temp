import React from 'react';

const AdminDeleteModal = ({ open, project, onConfirm, onCancel }) => {
  if (!open || !project) return null;

  return (
    <div className="admin-delete-modal" role="dialog" aria-modal="true">
      <div className="admin-delete-modal__backdrop" onClick={onCancel} />
      <div className="admin-delete-modal__content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the project <strong>{project.title}</strong>? This action cannot be undone.</p>
        <div className="admin-delete-modal__actions">
          <button onClick={onConfirm} className="danger">Confirm Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModal; 