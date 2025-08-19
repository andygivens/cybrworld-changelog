import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

function UserManagement({ setAlert }) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'minimal-dark';
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editRole, setEditRole] = useState('user');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await axios.get('/api/users', {
          headers: { Authorization: user?.token ? `Bearer ${user.token}` : undefined }
        });
        setUsers(res.data);
      } catch (err) {
        setAlert({ message: 'Failed to fetch users', result: 'fail' });
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [user, setAlert]);

  // Update user role
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`/api/users/${id}`, { role: newRole }, {
        headers: { Authorization: user?.token ? `Bearer ${user.token}` : undefined }
      });
      setUsers(users => users.map(u => u.id === id ? { ...u, role: newRole } : u));
      setAlert({ message: 'Role updated', result: 'success' });
    } catch (err) {
      setAlert({ message: 'Failed to update role', result: 'fail' });
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: user?.token ? `Bearer ${user.token}` : undefined }
      });
      setUsers(users => users.filter(u => u.id !== id));
      setAlert({ message: 'User deleted', result: 'success' });
    } catch (err) {
      setAlert({ message: 'Failed to delete user', result: 'fail' });
    }
  };

  // Add user
  const handleAddUser = async (e) => {
    e.preventDefault();
    setModalError(null);
    setModalLoading(true);
    try {
      const res = await axios.post('/api/users', newUser, {
        headers: { Authorization: user?.token ? `Bearer ${user.token}` : undefined }
      });
      setUsers(users => [...users, res.data]);
      setShowModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      setAlert({ message: 'User added', result: 'success' });
    } catch (err) {
      setModalError('Failed to add user');
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.08)', padding: '2rem', maxWidth: 700, color: isDarkTheme ? '#222' : 'inherit' }}>
      <h2 style={{ marginBottom: '1.2rem', color: isDarkTheme ? '#222' : 'inherit' }}>User Management</h2>
      {loading ? <div>Loading users...</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ background: '#f8fafd' }}>
              <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '0.7rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '0.7rem', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '0.7rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={e => handleRoleChange(u.id, e.target.value)}
                    style={{ borderRadius: 6, border: '1px solid #e3e8ee', padding: '0.2rem 0.5rem' }}
                  >
                    <option value="admin">Admin</option>
                    <option value="author">Author</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem' }} onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600 }} onClick={() => setShowModal(true)}>Add User</button>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.12)', padding: '2rem', minWidth: 340 }}>
            <h3 style={{ marginBottom: '1rem', color: '#0077C8' }}>Add User</h3>
            <form onSubmit={handleAddUser}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Name</label><br />
                <input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email</label><br />
                <input type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Password</label><br />
                <input type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Role</label><br />
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                  <option value="user">User</option>
                </select>
              </div>
              {modalError && <div style={{ color: 'red', marginBottom: '1rem' }}>{modalError}</div>}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 600 }} disabled={modalLoading}>{modalLoading ? 'Adding...' : 'Add User'}</button>
                <button type="button" style={{ background: '#e3e8ee', border: 'none', borderRadius: 6, padding: '0.6rem 1.2rem', fontWeight: 600, color: '#222' }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserManagement;
