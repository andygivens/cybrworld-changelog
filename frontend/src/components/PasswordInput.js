import React, { useState } from 'react';

function PasswordInput({ value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#0077C8',
        }}
      >
        {isPasswordVisible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export default PasswordInput;
