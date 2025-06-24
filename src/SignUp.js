import React, { useState } from 'react';
import './SignUp.css'; 
import { auth } from './firebase'; // Firebase auth 
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"; 


// Input onNavigate prop to switch back to Login view
function SignUp({ onNavigate }) {
  // State for email, password, and display name inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // Optional: for user's display name
  // State for displaying errors or success messages
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setMessage(''); // Clear previous messages

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (password.length < 8) {
      setError('Password should be at least 8 characters long.');
      return;
    }

    try {
      // Create a new user with email and password using Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's profile with a display name, if present
      if (displayName && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: displayName
        });
      }
      
      // Send email verification to the newly created user
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setMessage('Registration successful! A verification email has been sent. Please check your inbox and verify your email before logging in.');
        // After successful signup and email sending, onAuthStateChanged detects
        // emailVerified will be false, rendering Verification
      } else {
        setError("User created, but couldn't send verification email. Please try logging in.");
      }

    } catch (err) {
      // Handle Firebase authentication errors
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError('Failed to sign up. Please try again.');
      }
      console.error("Firebase sign up error:", err);
    }
  };

  return (
  <div className="signup-page">
    <div className="signup-container"> 
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>
          <span className="sport-text">SPORT</span>
          <span className="ify-text">IFY</span>
        </h2>
        <p className="signup-subtitle">Create your account</p>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <div className="form-group">
          <label htmlFor="displayName">Display Name (Optional):</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email:</label> 
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your NUS email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password:</label> 
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <div className="navigation-link">
          <span>Already have an account?</span>
          <button type="button" onClick={() => onNavigate('login')} className="link-button">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
);

}
export default SignUp;

