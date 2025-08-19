import React from 'react';

function UserModal({ show, onClose, onSubmit, user, loading, error, setUser, isEdit }) {
  if (!show) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.12)', padding: '2rem', minWidth: 340 }}>
        <h3 style={{ marginBottom: '1rem', color: '#0077C8' }}>{isEdit ? 'Edit User' : 'Add User'}</h3>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Name</label><br />
            <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label><br />
            <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label><br />
            <input type="password" value={user.password || ''} onChange={e => setUser({ ...user, password: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required={!isEdit} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Role</label><br />
            <select value={user.role} onChange={e => setUser({ ...user, role: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
              <option value="admin">Admin</option>
              <option value="author">Author</option>
              <option value="user">User</option>
            </select>
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 600 }} disabled={loading}>{loading ? (isEdit ? 'Saving...' : 'Adding...') : (isEdit ? 'Save' : 'Add User')}</button>
            <button type="button" style={{ background: '#e3e8ee', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 600, color: '#222' }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
