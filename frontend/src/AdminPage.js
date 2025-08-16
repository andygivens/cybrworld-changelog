import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Author from './pages/Author';

function AuthorPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="AuthorPage">
      {!loggedIn ? (
        <AdminLogin onLogin={() => setLoggedIn(true)} />
      ) : (
        <Author />
      )}
      <div className="admin-sidebar">
        <ul>
          <li><Link to="/admin/sso">SSO Config</Link></li>
          <li><Link to="/admin/user-management">User Management</Link></li>
          <li><Link to="/admin/author-token">Author Token</Link></li>
          <li><Link to="/admin/theme">Theme Settings</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default AuthorPage;
