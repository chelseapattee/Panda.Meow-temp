import React from 'react';

const AdminProjectList = ({ projects = [], onEdit, onDelete }) => {
  if (!projects.length) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="admin-project-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <tr key={project.id || idx}>
              <td>{project.title}</td>
              <td>
                <button onClick={() => onEdit(project)}>Edit</button>
                <button onClick={() => onDelete(project)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjectList; 