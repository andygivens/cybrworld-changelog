import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { FaKey, FaUsers, FaLock } from 'react-icons/fa';
import SSOConfig from '../components/SSOConfig';
import UserManagement from '../components/UserManagement';
import AuthorToken from '../components/AuthorToken';
import Alert from '../components/Alert';
import ThemePage from '../components/Theme';
import { useTheme } from '../contexts/ThemeContext';

const menuItems = [
  { key: 'sso', label: 'SSO Config', icon: <FaKey /> },
  { key: 'users', label: 'User Management', icon: <FaUsers /> },
  { key: 'token', label: 'Author Token', icon: <FaLock /> },
  { key: 'theme', label: 'Theme Settings', icon: <FaLock /> },
];

function Admin() {
  const [active, setActive] = useState('sso');
  const [alert, setAlert] = useState({ message: null, result: null });
  const { theme } = useTheme();
  const isDarkTheme = theme === 'minimal-dark';

  // For user icon menu
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleLoginClick = () => {
    setDrawerOpen(false);
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: isDarkTheme ? 'var(--bg-primary)' : '#f8fafd'
    }}>
      {/* Main Layout: Sidebar + Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <nav style={{
          width: 220,
          background: isDarkTheme ? 'var(--bg-secondary)' : '#fff',
          borderRight: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee',
          padding: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.7rem',
                background: active === item.key ? (isDarkTheme ? 'var(--bg-tertiary)' : '#f8fafd') : 'none',
                border: 'none',
                color: isDarkTheme ? 'var(--text-primary)' : '#333',
                fontWeight: 500, fontSize: '1rem',
                padding: '0.7rem 1.5rem', cursor: 'pointer', borderRadius: '0 20px 20px 0',
                boxShadow: active === item.key ? (isDarkTheme ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,51,160,0.04)') : 'none',
                transition: 'all 0.2s ease'
              }}
              aria-label={item.label}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '2.5rem',
          maxWidth: 900,
          background: isDarkTheme ? 'var(--bg-primary)' : 'transparent'
        }}>
          <Alert message={alert.message} result={alert.result} />
          {active === 'sso' && <SSOConfig setAlert={setAlert} />}
          {active === 'users' && <UserManagement setAlert={setAlert} />}
          {active === 'token' && <AuthorToken setAlert={setAlert} />}
          {active === 'theme' && <ThemePage />}
        </main>
      </div>

      {/* User Drawer Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <List style={{ minWidth: 220 }}>
          <ListItem button onClick={handleLoginClick}>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Admin;
