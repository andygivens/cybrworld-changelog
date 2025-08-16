import React, { useState, useEffect } from 'react';
import AuthorSecret from './components/AuthorSecret';
import Author from './pages/Author';

function AuthorPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authorToken');
    const expiry = localStorage.getItem('authorTokenExpiry');
    if (token && expiry && Date.now() < Number(expiry)) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="AuthorPage">
      {!loggedIn ? (
        <AuthorSecret onLogin={() => setLoggedIn(true)} />
      ) : (
        <Author />
      )}
    </div>
  );
}

export default AuthorPage;
