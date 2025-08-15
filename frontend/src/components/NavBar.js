import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSun } from 'react-icons/fa';
import { ReactComponent as LobsterIcon } from '../assets/lobster.svg';

const navItems = [
  { label: 'Updates', path: '/' },
  { label: 'Author', path: '/author' },
  { label: 'Reports', path: '/reports' },
];

function NavBar({ lobsterMode, setLobsterMode }) {
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
        onClick={() => setLobsterMode(lm => !lm)}
        aria-label={lobsterMode ? 'Switch to light mode' : 'Switch to Lobster Mode'}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: lobsterMode ? '#FFD6E0' : '#fff', fontSize: '1.5rem', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
      >
  <LobsterIcon style={{ width: 24, height: 24, color: lobsterMode ? '#413b3b' : '#FFFFFF' }} />
      </button>
    </nav>
  );
}

export default NavBar;
