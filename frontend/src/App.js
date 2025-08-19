import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import components
import UpdateFeed from './components/UpdateFeed';
import NavBar from './components/NavBar';

// import pages
import Admin from './pages/Admin';
import Reports from './pages/Reports';
import ThemePage from './pages/Theme';
import Login from './pages/Login';

//import contexts
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

//import styles
import './styles/minimal-dark.css';


function AppContent() {
  const { theme, toggleLobsterMode } = useTheme();

  return (
    <Router>
      <div className="App">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginTop: '2rem', 
          marginBottom: '1.5rem', 
          gap: '1rem' 
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            color: theme === 'minimal-dark' ? '#ecf0f1' : '#0077C8', 
            fontWeight: 700, 
            fontSize: '2rem', 
            letterSpacing: '0.02em', 
            margin: 0 
          }}>
            CYBRWorld ChangeLog
          </h1>
        </div>
        <NavBar lobsterMode={false} setLobsterMode={toggleLobsterMode} />
        <div style={{ padding: '0 0 2rem 0' }}>
          <Routes>
            <Route path="/" element={<UpdateFeed />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/theme" element={<ThemePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
