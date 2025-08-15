import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateFeed from './components/UpdateFeed';
import AdminPage from './AdminPage';
import Reports from './pages/Reports';
import NavBar from './components/NavBar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
  <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem', marginBottom: '1.5rem', gap: '1rem' }}>
          <h1 style={{ textAlign: 'center', color: '#0077C8', fontWeight: 700, fontSize: '2rem', letterSpacing: '0.02em', margin: 0 }}>CYBRWorld ChangeLog</h1>
        </div>
        <div style={{ padding: '0 0 2rem 0' }}>
          <Routes>
            <Route path="/" element={<UpdateFeed />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
