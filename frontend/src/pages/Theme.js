import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemePage() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Theme Settings</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={() => handleThemeChange('default')}
          style={{
            padding: '1rem',
            borderRadius: '8px',
            border: theme === 'default' ? '2px solid #3498db' : '1px solid #ccc',
            background: theme === 'default' ? '#3498db' : '#f5f5f5',
            color: theme === 'default' ? '#fff' : '#333',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Default Theme
        </button>
        <button
          onClick={() => handleThemeChange('minimal-dark')}
          style={{
            padding: '1rem',
            borderRadius: '8px',
            border: theme === 'minimal-dark' ? '2px solid #3498db' : '1px solid #ccc',
            background: theme === 'minimal-dark' ? '#3498db' : '#f5f5f5',
            color: theme === 'minimal-dark' ? '#fff' : '#333',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Minimal Dark Theme
        </button>
      </div>
    </div>
  );
}

export default ThemePage;
