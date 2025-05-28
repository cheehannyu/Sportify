import React, { useState } from 'react';
import './Verification.css'; 
import { auth } from './firebase'; // Firebase auth
import { sendEmailVerification, signOut } from 'firebase/auth';

function Verification({ user }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResendVerification = async () => {
    setMessage('');
    setError('');
    if (user) {
      try {
        await sendEmailVerification(user);
        setMessage('Verification email resent. Please check your inbox (and spam folder).');
      } catch (err) {
        setError('Failed to resend verification email. Please try again later.');
        console.error("Resend verification error:", err);
      }
    }
  };

  const handleGoToLogin = () => {
    signOut(auth).catch(err => console.error("Error signing out to go to login:", err));
  };

  const handleCheckVerification = async () => {
    setMessage('');
    setError('');
    if (auth.currentUser) {
      try {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          setMessage("Email verified successfully! You should be redirected shortly or can now access the homepage.");
        } else {
          setError("Email not yet verified. Please check your email and click the verification link.");
        }
      } catch (err) {
        setError("Failed to check verification status. Please try again.");
        console.error("Check verification error:", err);
      }
    }
  };

  return (
    <div className="verification-container">
      <h2>Verify Your Email</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <p>
        A verification email has been sent to <strong>{user?.email}</strong>.
      </p>
      <p>
        Please click the link in the email to complete your registration.
        If you don't see it, please check your spam folder.
      </p>
      <button onClick={handleResendVerification} className="action-button">
        Resend Verification Email
      </button>
      <button onClick={handleCheckVerification} className="action-button">
        I've Verified, Check Again
      </button>
      <button onClick={handleGoToLogin} className="link-button back-to-login-button">
        Back to Login
      </button>
    </div>
  );
}
export default Verification;
