import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaPalette } from 'react-icons/fa';
import { ReactComponent as LobsterIcon } from '../assets/lobster.svg';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

const navItems = [
  { label: 'Updates', path: '/' },
  { label: 'Author', path: '/author' },
  { label: 'Reports', path: '/reports' },
  { label: 'Admin', path: '/admin' },
];

function NavBar({ lobsterMode, setLobsterMode }) {
  const { user, login, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, toggleLobsterMode } = useTheme();
  const isMinimalDark = theme === 'minimal-dark';

  // For user icon menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLoginClick = () => {
    setAnchorEl(null);
    navigate('/login');
  };

  return (
    <nav className={isMinimalDark ? 'navbar' : ''} style={{
      display: 'flex',
      alignItems: 'center',
      background: isMinimalDark ? 'rgba(52, 73, 94, 0.95)' : '#0077C8',
      border: isMinimalDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      borderRadius: isMinimalDark ? '12px' : '0',
      padding: isMinimalDark ? '0.8rem 1.5rem' : '0.1rem 1.2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: isMinimalDark ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
      marginBottom: isMinimalDark ? '2rem' : '0'
    }}>
      {navItems.map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={isMinimalDark ? `nav-button ${location.pathname === item.path ? 'active' : ''}` : ''}
          style={{
            background: isMinimalDark ?
              (location.pathname === item.path ? '#3498db' : 'transparent') :
              (location.pathname === item.path ? '#fff' : 'transparent'),
            color: isMinimalDark ?
              (location.pathname === item.path ? '#fff' : '#bdc3c7') :
              (location.pathname === item.path ? '#0077C8' : '#fff'),
            border: isMinimalDark ?
              `1px solid ${location.pathname === item.path ? '#3498db' : 'transparent'}` :
              'none',
            borderRadius: isMinimalDark ? '8px' : '3px',
            padding: isMinimalDark ? '0.6rem 1.2rem' : '0.25rem 0.7rem',
            marginRight: '0.5rem',
            fontWeight: isMinimalDark ? 500 : 500,
            fontSize: isMinimalDark ? '0.95rem' : '0.92rem',
            cursor: 'pointer',
            boxShadow: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {item.label}
        </button>
      ))}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Lobster Mode Toggle */}
        <button
          onClick={toggleLobsterMode}
          aria-label="Toggle Lobster Mode"
          style={{
            background: 'none',
            border: isMinimalDark ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            borderRadius: isMinimalDark ? '8px' : '50%',
            cursor: 'pointer',
            color: isMinimalDark ? '#bdc3c7' : '#fff',
            fontSize: '1.2rem',
            padding: isMinimalDark ? '0.5rem' : '0.3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          <LobsterIcon style={{
            width: 20,
            height: 20,
            color: isMinimalDark ? '#bdc3c7' : '#fff'
          }} />
        </button>

        {/* User Icon */}
        <IconButton
          onClick={handleMenuOpen}
          aria-label="user menu"
          size="large"
          style={{ color: isMinimalDark ? '#fff' : '#fff' }}
        >
          <AccountCircle style={{ fontSize: 28 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            style: {
              minWidth: 264,
              fontSize: '0.97rem',
              padding: '0.7rem 1.2rem',
            }
          }}
        >
          {/* Show user name if logged in */}
          {user && (
            <div style={{ fontSize: '0.97rem', fontWeight: 500, marginBottom: 8, color: '#0077C8' }}>
              {user.name || user.email}
            </div>
          )}
          <MenuItem
            onClick={user ? logout : handleLoginClick}
            style={{ fontSize: '0.97rem' }}
          >
            {user ? 'Logout' : 'Login'}
          </MenuItem>
        </Menu>
      </div>

  {/* User Menu Dropdown handled above */}
    </nav>
  );
}

export default NavBar;
