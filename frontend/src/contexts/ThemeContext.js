import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default'); // 'default', 'minimal-dark'
  const [lobsterMode, setLobsterMode] = useState(false);

  useEffect(() => {
    // Apply theme classes to body
    document.body.className = '';
    
    if (theme === 'minimal-dark') {
      document.body.classList.add('minimal-dark');
    }
    
    if (lobsterMode) {
      document.body.classList.add('lobster');
    }
  }, [theme, lobsterMode]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const toggleLobsterMode = () => {
    setLobsterMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      lobsterMode,
      setTheme: toggleTheme,
      setLobsterMode: toggleLobsterMode,
      toggleLobsterMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
