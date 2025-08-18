import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
function AuthorToken({ setAlert, token = '************' }) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'minimal-dark';
  const [showToken, setShowToken] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.08)', padding: '2rem', maxWidth: 500, color: isDarkTheme ? '#222' : 'inherit' }}>
      <h2 style={{ marginBottom: '1.2rem', color: isDarkTheme ? '#222' : 'inherit' }}>Author Token</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Current Token</label><br />
        <input
          type={showToken ? 'text' : 'password'}
          value={token}
          readOnly
          style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', marginBottom: '0.5rem', color: isDarkTheme ? '#222' : 'inherit' }}
        />
        <button
          style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem', marginRight: '0.5rem', color: isDarkTheme ? '#222' : 'inherit' }}
          onClick={() => setShowToken(show => !show)}
        >
          {showToken ? 'Hide' : 'Reveal'}
        </button>
      </div>
      <form onSubmit={e => { e.preventDefault(); setAlert({ message: 'Token updated!', result: 'success' }); setShowToken(false); }}>
        <label>Update Token</label><br />
        <input type="text" placeholder="Enter new token" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', marginBottom: '0.5rem', color: isDarkTheme ? '#222' : 'inherit' }} />
        <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600 }}>Save</button>
      </form>
    </div>
  );
}
export default AuthorToken;
