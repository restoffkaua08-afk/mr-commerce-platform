import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Brands from './pages/Brands';
import Favorites from './pages/Favorites';
import About from './pages/About';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <div className="glow-bg"></div>
        <Header 
          toggleSidebar={toggleSidebar} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<Explore />} />
            <Route path="/marcas" element={<Brands />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/sobre" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;