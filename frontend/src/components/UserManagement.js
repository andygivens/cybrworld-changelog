import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
function UserManagement({ setAlert }) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'minimal-dark';
  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.08)', padding: '2rem', maxWidth: 700, color: isDarkTheme ? '#222' : 'inherit' }}>
      <h2 style={{ marginBottom: '1.2rem', color: isDarkTheme ? '#222' : 'inherit' }}>User Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ background: '#f8fafd' }}>
            <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '0.7rem', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '0.7rem', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '0.7rem', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '0.7rem', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jane Doe</td>
            <td>jane@example.com</td>
            <td>
              <select style={{ borderRadius: 6, border: '1px solid #e3e8ee', padding: '0.2rem 0.5rem' }}>
                <option>Admin</option>
                <option>Author</option>
                <option>User</option>
              </select>
            </td>
            <td>Active</td>
            <td style={{ textAlign: 'center' }}>
              <button style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem', marginRight: '0.3rem' }}>Edit</button>
              <button style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem' }}>Delete</button>
            </td>
          </tr>
          <tr>
            <td>John Smith</td>
            <td>john@example.com</td>
            <td>
              <select style={{ borderRadius: 6, border: '1px solid #e3e8ee', padding: '0.2rem 0.5rem' }}>
                <option>Admin</option>
                <option>Author</option>
                <option>User</option>
              </select>
            </td>
            <td>Inactive</td>
            <td style={{ textAlign: 'center' }}>
              <button style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem', marginRight: '0.3rem' }}>Edit</button>
              <button style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem' }}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600 }} onClick={() => setAlert({ message: 'Add user modal coming soon!', result: 'success' })}>Add User</button>
    </div>
  );
}
export default UserManagement;
