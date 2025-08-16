import React, { useState } from 'react';
function AuthorToken({ setAlert }) {
  const [token, setToken] = useState('************');
  const [edit, setEdit] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.08)', padding: '2rem', maxWidth: 500 }}>
      <h2 style={{ marginBottom: '1.2rem' }}>Author Token</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Current Token</label><br />
        <input type={edit ? 'text' : 'password'} value={token} readOnly style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', marginBottom: '0.5rem' }} />
        <button style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem', marginRight: '0.5rem' }} onClick={() => setEdit(e => !e)}>{edit ? 'Hide' : 'Reveal'}</button>
      </div>
      <form onSubmit={e => { e.preventDefault(); setAlert({ message: 'Token updated!', result: 'success' }); setEdit(false); }}>
        <label>Update Token</label><br />
        <input type="text" placeholder="Enter new token" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', marginBottom: '0.5rem' }} />
        <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600 }}>Save</button>
      </form>
    </div>
  );
}
export default AuthorToken;
