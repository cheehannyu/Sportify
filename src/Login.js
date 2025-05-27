import React, { useState } from 'react';
import './Login.css';

// Add onLoginSuccess as a prop
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); 

    // assume any non-empty is valid
    if (username.trim() !== '' && password.trim() !== '') {
      console.log('Login successful with:', { username });
      onLoginSuccess(username); // call the callback function with the username
    } else {
      console.log('Login failed: Username and password cannot be empty.');
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Sportify</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
}

export default Login;

