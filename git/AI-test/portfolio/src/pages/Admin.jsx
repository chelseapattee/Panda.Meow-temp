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

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState('projects'); // 'projects', 'add', 'edit'
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [deleteProjectObj, setDeleteProjectObj] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        {section === 'projects' && !loading && (
          <>
            <AdminProjectList
              projects={projects}
              onEdit={handleStartEdit}
              onDelete={handleStartDelete}
            />
            <br />
            <button onClick={handleGoToAdd}>Add New Project</button>
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