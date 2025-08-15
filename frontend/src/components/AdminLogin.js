import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/admin/login', { password });
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
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          style={{ paddingRight: '2.5rem' }}
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
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button type="submit" disabled={loading}>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default AdminLogin;
