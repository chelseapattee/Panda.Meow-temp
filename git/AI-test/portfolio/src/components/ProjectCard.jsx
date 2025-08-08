import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.scss';

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23999">No Image</text></svg>';

const ProjectCard = ({ project }) => {
  // Use the first image URL from image_urls, or fallback
  const coverUrl =
    project.image_urls && project.image_urls.length > 0
      ? project.image_urls[0]
      : FALLBACK_IMAGE;

  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-card__image-wrapper">
        <img src={coverUrl} alt={project.title} className="project-card__image" />
        <div className="project-card__title">{project.title}</div>
      </div>
    </Link>
  );
};

export default ProjectCard;
