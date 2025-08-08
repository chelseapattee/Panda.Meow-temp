import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import projects from '../data/projects';
import './Navbar.scss';

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isProjectDetail = /^\/projects\/[\w-]+$/.test(location.pathname);

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
                  <li><Link to="/projects" onClick={closeMenus}>All Projects</Link></li>
                  {projects.map(project => (
                    <li key={project.id}>
                      <Link to={`/projects/${project.id}`} onClick={closeMenus}>{project.title}</Link>
                    </li>
                  ))}
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
