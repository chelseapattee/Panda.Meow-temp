import React from 'react';
import { useParams } from 'react-router-dom';
import projects from '../data/projects';
import './ProjectDetail.scss';

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23999">No Image</text></svg>';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  // Use image_urls directly, fallback if missing
  const imageUrls = project && project.image_urls && project.image_urls.length > 0
    ? project.image_urls
    : [FALLBACK_IMAGE];

  if (!project) return <div>Project not found.</div>;

  // Example metadata and overview (replace with real data as needed)
  const metadata = [
    { label: 'Title', value: project.title },
    { label: 'Company', value: 'CleanSpark' },
    { label: 'Technology', value: 'SCALA, Play Framework, AngularJS, HTML, SCSS, Gulp.js, Sketch, Axure' },
    { label: 'Roles', value: 'Front-End Development, Data Visualization, Wireframes, User Research' },
    { label: 'Team Collaborators', value: 'Two backend Java developers: created system architecture, developed system intelligence, managed databases, wrote service calls; Software Intern: helped with JavaScript functions and later data charts' },
  ];

  return (
    <div className="project-detail">
      <div className="project-detail__hero" style={{ overflowX: imageUrls.length > 1 ? 'auto' : 'visible', display: 'flex', gap: '1rem' }}>
        {imageUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={project.title + (imageUrls.length > 1 ? ` image ${idx + 1}` : '')}
            className="project-detail__hero-image"
            style={{ minWidth: '300px', maxWidth: '100%', flex: '0 0 auto' }}
          />
        ))}
      </div>
      <div className="project-detail__overview">
        <div className="project-detail__meta">
          {metadata.map((item, i) => (
            <div className="project-detail__meta-item" key={i}>
              <div className="project-detail__meta-label">{item.label}</div>
              <div className="project-detail__meta-value">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="project-detail__summary">
          <h3>Overview</h3>
          <p className="project-detail__summary-text">
            <span className="project-detail__summary-dropcap">T</span>he energy industry has outdated energy monitoring platforms that have not been updated since the 1970s. Most control system monitoring tools use a native application to display system information, and require technicians to install very expensive proprietary software. Furthermore, these platforms are designed for engineers and have a high learning curve. CleanSpark wanted to update this interface by making it easy on the eyes and clear to understand for both engineers and general consumers.
          </p>
        </div>
      </div>
      <div className="project-detail__content">
        {/* Additional content blocks go here, one column */}
      </div>
    </div>
  );
};

export default ProjectDetail;
