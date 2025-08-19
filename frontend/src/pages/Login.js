import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import axios from 'axios';

function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.includes('@')) {
      setError('Email must contain @');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);

    try {
      // Call backend login endpoint
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data && res.data.user) {
        login(res.data.user);
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: 8, background: '#fff' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#0077C8' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#444' }}>Password</label>
          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <button
          type="submit"
          style={{ width: '100%', padding: '0.7rem', borderRadius: 6, background: '#0077C8', color: '#fff', fontWeight: 600, border: 'none' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;