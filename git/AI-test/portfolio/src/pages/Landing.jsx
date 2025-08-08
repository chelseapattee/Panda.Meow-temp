import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';

const Landing = () => (
  <div className="landing">
    <Link to="/" className="landing__logo" aria-label="Home">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#fff"/>
        <text x="50%" y="55%" textAnchor="middle" fill="#4F46E5" fontSize="24" fontWeight="bold" dy=".3em">C</text>
      </svg>
    </Link>
    <div className="landing__content">
      <h1>Hello, I'm Chelsea.<br/>Experience Designer & Product Manager.<br/>Occasional programmer. Always creative.</h1>
      <p className="landing__subtitle">
        I specialize in simplifying the complex, seen in my work <Link to="/projects">Projects</Link>.<br/>
        Feel free to <Link to="/contact">contact me</Link> or connect with me on <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
      </p>
    </div>
  </div>
);

export default Landing;
