import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/', label: 'Home', icon: '' },
    { path: '/explorar', label: 'Explorar', icon: '' },
    { path: '/marcas', label: 'Marcas', icon: '' },
    { path: '/favoritos', label: 'Favoritos', icon: '' },
    { path: '/sobre', label: 'Sobre', icon: '' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">✦</span>
            <span>Menu</span>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className="nav-item"
              onClick={() => handleNavigation(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;