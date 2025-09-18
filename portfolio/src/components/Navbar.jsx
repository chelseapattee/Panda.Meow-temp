import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProjects } from '../api/projects';
import { subscribeToProjectChanges } from '../utils/projectSync';
import fallbackProjects from '../data/projects';
import './Navbar.scss';

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState(fallbackProjects);
  const isProjectDetail = /^\/projects\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(location.pathname) || /^\/projects\/[\w-]+$/.test(location.pathname);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data || fallbackProjects);
      } catch (err) {
        console.error('Failed to fetch projects for navbar:', err);
        // Use fallback data if database fails
        setProjects(fallbackProjects);
      }
    }
    fetchProjects();
  }, []);

  // Refresh projects when location changes (helps catch new projects)
  useEffect(() => {
    if (location.pathname === '/projects' || isProjectDetail) {
      async function refreshProjects() {
        try {
          const data = await getProjects();
          if (data && data.length !== projects.length) {
            setProjects(data || fallbackProjects);
          }
        } catch (err) {
          // Silently fail - don't spam console on navigation
        }
      }
      refreshProjects();
    }
  }, [location.pathname, isProjectDetail, projects.length]);

  // Listen for project changes from admin panel
  useEffect(() => {
    const unsubscribe = subscribeToProjectChanges(async () => {
      try {
        const data = await getProjects();
        setProjects(data || fallbackProjects);
      } catch (err) {
        console.warn('Failed to refresh projects in navbar:', err);
      }
    });
    
    return unsubscribe;
  }, []);

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" className="navbar__logo-link" aria-label="Home" onClick={closeMenus}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#fff"/>
            <text x="50%" y="55%" textAnchor="middle" fill="#4F46E5" fontSize="20" fontWeight="bold" dy=".3em">C</text>
          </svg>
          <span className="navbar__name">CHELSEA PATTEE</span>
        </Link>
      </div>
      <button className="navbar__hamburger" aria-label="Open navigation menu" onClick={() => setMobileMenuOpen(v => !v)}>
        <span className="navbar__hamburger-bar"></span>
        <span className="navbar__hamburger-bar"></span>
        <span className="navbar__hamburger-bar"></span>
      </button>
      <ul className={`navbar__links${mobileMenuOpen ? ' navbar__links--open' : ''}`}>
        <li className="navbar__dropdown-wrapper" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          {isProjectDetail ? (
            <>
              <span className={"navbar__dropdown-toggle active"} tabIndex={0} onClick={() => setDropdownOpen(v => !v)}>
                Projects ▾
              </span>
              {dropdownOpen && (
                <ul className="navbar__dropdown">
                  <li>
                    <Link 
                      to="/projects" 
                      onClick={closeMenus}
                      className={location.pathname === '/projects' ? 'active' : ''}
                    >
                      All Projects
                    </Link>
                  </li>
                  {projects && projects.length > 0 ? (
                    projects.map(project => (
                      <li key={project.id}>
                        <Link 
                          to={`/projects/${project.id}`} 
                          onClick={closeMenus}
                          className={location.pathname === `/projects/${project.id}` ? 'active' : ''}
                        >
                          {project.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="navbar__dropdown-empty">Loading projects...</li>
                  )}
                </ul>
              )}
            </>
          ) : (
            <Link to="/projects" className={location.pathname.startsWith('/projects') ? 'active' : ''} onClick={closeMenus}>Projects</Link>
          )}
        </li>
        <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenus}>Contact</Link></li>
        <li><button className="navbar__experiment" tabIndex="-1" disabled aria-label="Experiment (coming soon)">Experiment</button></li>
      </ul>
      {mobileMenuOpen && <div className="navbar__backdrop" onClick={closeMenus} />}
    </nav>
  );
};

export default Navbar;
