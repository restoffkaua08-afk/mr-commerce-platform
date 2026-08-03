import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar, isDarkMode, toggleTheme }) => {
  return (
    <header className="header glass">
      <button className="menu-btn" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <Link to="/" className="logo">
        <span className="logo-icon">✦</span>
        <span className="logo-text">Product Aggregator</span>
      </Link>
      
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '💡' : '🌙'}
      </button>
    </header>
  );
};

export default Header;