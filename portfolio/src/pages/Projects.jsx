import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../api/projects';
import { subscribeToProjectChanges } from '../utils/projectSync';
import fallbackProjects from '../data/projects';
import './Projects.scss';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data || fallbackProjects);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
        // Use fallback static data if database fails
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Listen for project changes from admin panel
  useEffect(() => {
    const unsubscribe = subscribeToProjectChanges(async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data || fallbackProjects);
      } catch (err) {
        console.warn('Failed to refresh projects:', err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    });
    
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="projects">
        <div className="projects__loading">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects">
        <div className="projects__error">
          {error} - Showing cached projects
        </div>
        <div className="projects__grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="projects">
      <div className="projects__grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
