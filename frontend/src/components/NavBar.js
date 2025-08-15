import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const navItems = [
  { label: 'Updates', path: '/' },
  { label: 'Admin', path: '/admin' },
  { label: 'Reports', path: '/reports' },
];

function NavBar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      background: '#0077C8',
      padding: '0.5rem 2rem',
      boxShadow: '0 2px 8px rgba(0,51,160,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {navItems.map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            background: location.pathname === item.path ? '#fff' : 'transparent',
            color: location.pathname === item.path ? '#0077C8' : '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 1.2rem',
            marginRight: '1rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: location.pathname === item.path ? '0 2px 8px rgba(0,51,160,0.08)' : 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          {item.label}
        </button>
      ))}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(dm => !dm)}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: darkMode ? '#FFD6E0' : '#fff', fontSize: '1.5rem', marginLeft: 'auto' }}
      >
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </nav>
  );
}

export default NavBar;
