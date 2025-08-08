import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';
import './Projects.scss';

const Projects = () => (
  <div className="projects">
    <div className="projects__grid">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

export default Projects;
