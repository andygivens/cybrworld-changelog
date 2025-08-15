import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AuthorSecret({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/author/login', { password });
      if (res.data.success) {
        onLogin();
      } else {
        setError('Login failed.');
      }
    } catch (err) {
      setError('Invalid password.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '3.5rem', maxWidth: 340, marginLeft: 'auto', marginRight: 'auto', fontSize: '0.97rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
        <label htmlFor="author-secret" style={{ fontWeight: 600, color: '#0077C8', fontSize: '1rem', marginBottom: 0 }}>Author Secret</label>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            id="author-secret"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter author secret"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            style={{ paddingRight: '2.5rem', width: '100%', fontSize: '0.97rem' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(sp => !sp)}
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#0077C8',
              fontSize: '1.2rem',
              padding: 0
            }}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide secret' : 'Show secret'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button type="submit" disabled={loading} style={{ fontSize: '0.97rem', minWidth: '100px' }}>Lets Go</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default AuthorSecret;
