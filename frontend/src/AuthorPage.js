import React, { useState } from 'react';
import AuthorSecret from './components/AuthorSecret';
import Author from './pages/Author';

function AuthorPage() {
  const [loggedIn, setLoggedIn] = useState(false);

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
