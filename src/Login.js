import React, { useState } from 'react';
import './Login.css'; 
import { auth } from './firebase'; // Firebase auth 
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase sign-in 

// input onNavigate prop to switch to SignUp view
function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged in App.js will handle navigation
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Failed to log in. Please try again.');
      }
      console.error("Firebase login error:", err);
    }
  };

  return (
    <div className="login-container"> 
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="navigation-link">
          Don't have an account?{' '}
          <button type="button" onClick={() => onNavigate('signup')} className="link-button">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
