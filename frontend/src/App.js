import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateFeed from './components/UpdateFeed';
import AdminPage from './AdminPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
        <header className="main-header">
          <div className="logo-title">
            {/* Logo placeholder, replace with CyberArk SVG if available */}
            <div className="logo" style={{ width: 32, height: 32, background: '#0077C8', borderRadius: '50%', display: 'inline-block', marginRight: 12 }}></div>
            <h1>CYBRWorld ChangeLog</h1>
          </div>
          <div className="header-actions">
            <a href="/admin" className="admin-link">Admin Login</a>
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(dm => !dm)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<UpdateFeed />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
