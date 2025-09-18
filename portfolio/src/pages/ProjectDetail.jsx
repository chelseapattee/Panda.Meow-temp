import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../api/projects';
import { getProjectSections } from '../api/projectSections';
import fallbackProjects from '../data/projects';
import './ProjectDetail.scss';

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23999">No Image</text></svg>';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        setLoading(true);
        // Fetch both project and sections data
        const [projectData, sectionsData] = await Promise.all([
          getProjectById(id),
          getProjectSections(id).catch(err => {
            console.warn('Failed to fetch project sections:', err);
            return []; // Return empty array if sections fetch fails
          })
        ]);
        setProject(projectData);
        setSections(sectionsData);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Failed to load project');
        // Use fallback static data if database fails
        const fallbackProject = fallbackProjects.find(p => p.id === id);
        setProject(fallbackProject);
        setSections([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className="project-detail">
        <div className="project-detail__loading">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail">
        <div className="project-detail__not-found">Project not found.</div>
      </div>
    );
  }

  // Use image_urls directly, fallback if missing
  const imageUrls = project && project.image_urls && project.image_urls.length > 0
    ? project.image_urls
    : [FALLBACK_IMAGE];

  // Use actual project data from database
  const metadata = [
    { label: 'Title', value: project.title },
    { label: 'Company', value: project.company || 'Not specified' },
    { label: 'Technologies', value: Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || 'Not specified') },
    { label: 'Responsibilities', value: Array.isArray(project.responsibilities) ? project.responsibilities.join(', ') : (project.responsibilities || 'Not specified') },
    { label: 'Categories', value: Array.isArray(project.categories) ? project.categories.join(', ') : (project.categories || 'Not specified') },
  ].filter(item => item.value && item.value !== 'Not specified'); // Only show fields with actual data

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
            {project.description && (
              <>
                <span className="project-detail__summary-dropcap">{project.description.charAt(0)}</span>
                {project.description.slice(1)}
              </>
            )}
          </p>
          
          {/* Show challenges and solutions if available */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="project-detail__challenges">
              <h4>Challenges</h4>
              <ul>
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}
          
          {project.solutions && project.solutions.length > 0 && (
            <div className="project-detail__solutions">
              <h4>Solutions</h4>
              <ul>
                {project.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Show outcomes if available */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div className="project-detail__outcomes">
              <h4>Results & Outcomes</h4>
              <div className="project-detail__outcomes-grid">
                {project.outcomes.map((outcome, index) => (
                  <div key={index} className="project-detail__outcome-item">
                    <div className="project-detail__outcome-metric">{outcome.metric}</div>
                    <div className="project-detail__outcome-value">{outcome.value}</div>
                    <div className="project-detail__outcome-description">{outcome.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="project-detail__content">
        {/* Project Sections */}
        {sections && sections.length > 0 && (
          <div className="project-detail__sections">
            {sections.map((section) => (
              <div key={section.id} className="project-detail__section">
                {section.header && (
                  <h3 className="project-detail__section-header">{section.header}</h3>
                )}
                
                {section.type === 'text' && section.text_content && (
                  <div className="project-detail__section-text">
                    <p>{section.text_content}</p>
                  </div>
                )}
                
                {section.type === 'images' && section.images && section.images.length > 0 && (
                  <div className="project-detail__section-images">
                    {section.images.map((image, idx) => (
                      <div key={idx} className="project-detail__section-image-wrapper">
                        <img 
                          src={image} 
                          alt={section.captions && section.captions[idx] ? section.captions[idx] : `Section image ${idx + 1}`}
                          className="project-detail__section-image"
                        />
                        {section.captions && section.captions[idx] && (
                          <p className="project-detail__section-caption">{section.captions[idx]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {section.type === 'image_text' && (
                  <div className="project-detail__section-image-text">
                    {section.images && section.images.length > 0 && (
                      <div className="project-detail__section-images">
                        {section.images.map((image, idx) => (
                          <div key={idx} className="project-detail__section-image-wrapper">
                            <img 
                              src={image} 
                              alt={section.captions && section.captions[idx] ? section.captions[idx] : `Section image ${idx + 1}`}
                              className="project-detail__section-image"
                            />
                            {section.captions && section.captions[idx] && (
                              <p className="project-detail__section-caption">{section.captions[idx]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {section.text_content && (
                      <div className="project-detail__section-text">
                        <p>{section.text_content}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {section.type === 'gif' && section.gif_url && (
                  <div className="project-detail__section-gif">
                    <img 
                      src={section.gif_url} 
                      alt="Project GIF"
                      className="project-detail__section-gif-image"
                    />
                  </div>
                )}
                
                {section.type === 'video' && section.video_url && (
                  <div className="project-detail__section-video">
                    <video 
                      src={section.video_url} 
                      controls
                      className="project-detail__section-video-player"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
