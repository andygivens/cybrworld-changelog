import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="AdminPage">
      {!loggedIn ? (
        <AdminLogin onLogin={() => setLoggedIn(true)} />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}

export default AdminPage;
