import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Alert({ message, result = 'success', duration = 6000, onClose }) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'minimal-dark';

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  // Determine color and background based on result and theme
  let color = isDarkTheme ? '#4ade80' : 'green';
  let background = isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd';
  let border = isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee';
  
  if (result === 'fail') {
    color = '#ef4444';
    background = isDarkTheme ? 'rgba(239, 68, 68, 0.1)' : '#fff6f6';
    border = isDarkTheme ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid #e3bebe';
  } else if (result === 'warning') {
    color = '#f59e0b';
    background = isDarkTheme ? 'rgba(245, 158, 11, 0.1)' : '#fffbe6';
    border = isDarkTheme ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid #e3d8b8';
  } else if (result === 'success') {
    background = isDarkTheme ? 'rgba(74, 222, 128, 0.1)' : '#f8fafd';
    border = isDarkTheme ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid #e3e8ee';
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 340,
      margin: '0.5rem 0.5rem 0.2rem auto',
      background,
      color,
      border,
      borderRadius: '7px',
      fontWeight: 500,
      fontSize: '0.92rem',
      textAlign: 'center',
      boxShadow: 'none',
      padding: '0.45rem 1rem',
      zIndex: 2000,
      position: 'relative',
      top: 0,
      right: 0,
      float: 'right',
    }}>
      {message}
    </div>
  );
}

export default Alert;
