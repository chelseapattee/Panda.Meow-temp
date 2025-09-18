import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import { signInWithEmail, signOut, getSession } from '../utils/auth';
import {
  getProjects as fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../api/projects';
import AdminProjectList from '../components/AdminProjectList';
import AdminProjectForm from '../components/AdminProjectForm';
import AdminDeleteModal from '../components/AdminDeleteModal';
import { migrateExistingProjects } from '../utils/migrateProjects';
import { triggerProjectRefresh } from '../utils/projectSync';

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState('projects'); // 'projects', 'add', 'edit'
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [deleteProjectObj, setDeleteProjectObj] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [migrationResult, setMigrationResult] = useState(null);

  useEffect(() => {
    getSession().then(({ data: session }) => {
      setAuthed(!!session && !!session.session);
      loadProjects();
    });
    // eslint-disable-next-line
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data || []);
    } catch (err) {
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmail(email, password);
      setAuthed(true);
      await loadProjects();
    } catch (err) {
      setAuthed(false);
      throw err;
    }
  };

  const handleLogout = async () => {
    await signOut();
    setAuthed(false);
  };

  // Add new project
  const handleAddProject = async (data) => {
    const { data: session } = await getSession();
    if (!session || !session.session) {
      setAuthed(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await createProject(data);
      await loadProjects();
      triggerProjectRefresh(); // Notify navbar to refresh
      setSection('projects');
    } catch (err) {
      setError('Failed to add project.');
    } finally {
      setLoading(false);
    }
  };

  // Edit project
  const handleEditProject = async (data) => {
    const { data: session } = await getSession();
    if (!session || !session.session) {
      setAuthed(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await updateProject(editProject.id, data);
      await loadProjects();
      triggerProjectRefresh(); // Notify navbar to refresh
      setEditProject(null);
      setSection('projects');
    } catch (err) {
      setError('Failed to update project.');
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const handleStartEdit = (project) => {
    setEditProject(project);
    setSection('edit');
  };

  // Start delete
  const handleStartDelete = (project) => {
    setDeleteProjectObj(project);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    const { data: session } = await getSession();
    if (!session || !session.session) {
      setAuthed(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteProject(deleteProjectObj.id);
      await loadProjects();
      triggerProjectRefresh(); // Notify navbar to refresh
      setDeleteProjectObj(null);
      setShowDeleteModal(false);
    } catch (err) {
      setError('Failed to delete project.');
    } finally {
      setLoading(false);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteProjectObj(null);
    setShowDeleteModal(false);
  };

  // Navigation
  const handleGoToAdd = () => {
    setEditProject(null);
    setSection('add');
  };
  const handleGoToProjects = () => {
    setEditProject(null);
    setSection('projects');
  };

  // Migration handler
  const handleMigrateProjects = async () => {
    setLoading(true);
    setError(null);
    setMigrationResult(null);
    try {
      const result = await migrateExistingProjects();
      setMigrationResult(result);
      if (result.success) {
        await loadProjects(); // Refresh the projects list
      }
    } catch (err) {
      setError('Migration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav className="admin-nav" aria-label="Admin navigation">
          <button
            className={section === 'projects' ? 'active' : ''}
            onClick={handleGoToProjects}
            aria-current={section === 'projects' ? 'page' : undefined}
          >
            Projects
          </button>
          <button
            className={section === 'add' ? 'active' : ''}
            onClick={handleGoToAdd}
            aria-current={section === 'add' ? 'page' : undefined}
          >
            Add Project
          </button>
          <button onClick={handleLogout} className="admin-logout">Logout</button>
        </nav>
      </header>
      <main className="admin-content">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red', margin: '8px 0' }}>{error}</div>}
        {migrationResult && (
          <div style={{ 
            color: migrationResult.success ? 'green' : 'red', 
            margin: '8px 0', 
            padding: '8px', 
            border: `1px solid ${migrationResult.success ? 'green' : 'red'}`,
            borderRadius: '4px'
          }}>
            {migrationResult.message || migrationResult.error}
          </div>
        )}
        {section === 'projects' && !loading && (
          <>
            <AdminProjectList
              projects={projects}
              onEdit={handleStartEdit}
              onDelete={handleStartDelete}
            />
            <br />
            <div style={{ 
              padding: '1rem', 
              background: '#f0f9ff', 
              border: '1px solid #0284c7',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0c4a6e' }}>💡 Make Projects Persistent</h4>
              <p style={{ margin: '0 0 0.5rem 0', color: '#075985' }}>
                After adding or editing projects, run this command to update the seed file:
              </p>
              <code style={{ 
                display: 'block', 
                background: '#1e293b', 
                color: '#f1f5f9',
                padding: '0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}>
                cd portfolio && node update-seed-file.js
              </code>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                This ensures your projects survive database resets.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={handleGoToAdd}>Add New Project</button>
              <button 
                onClick={handleMigrateProjects}
                style={{ 
                  backgroundColor: '#4F46E5', 
                  color: 'white', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                disabled={loading}
              >
                Migrate Example Projects
              </button>
            </div>
            <AdminDeleteModal
              open={showDeleteModal}
              project={deleteProjectObj}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          </>
        )}
        {section === 'add' && (
          <>
            <AdminProjectForm onSubmit={handleAddProject} />
            <br />
            <button onClick={handleGoToProjects}>Back to Projects</button>
          </>
        )}
        {section === 'edit' && editProject && (
          <>
            <AdminProjectForm initialData={editProject} onSubmit={handleEditProject} />
            <br />
            <button onClick={handleGoToProjects}>Back to Projects</button>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin; 