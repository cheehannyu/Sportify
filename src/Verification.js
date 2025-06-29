import { useState } from 'react';
import './Verification.css'; 
import { auth } from './firebase'; 
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
        setMessage('Verification email has been resent. Please check your inbox (Do check your spam folder also.)');
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
          setMessage("Your email has been verified successfully! You may proceed to login now.");
        } else {
          setError("Your email has not been verified yet. Please check your email and click on the verification link sent.");
        }
      } catch (err) {
        setError("Failed to check verification status. Please try again.");
        console.error("Check verification error:", err);
      }
    }
  };

  return (
      <div className="verification-page">
      <div className="verification-container">
      <h2>
        <span className="sport-text">SPORT</span>
        <span className="ify-text">IFY</span>
      </h2>
      <h2>Verify Your Email</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <p>
        A verification email has been sent to <strong>{user?.email}</strong>.
      </p>
      <p>
        Please click the link sent to your email to complete registration.
        If you don't see it in your inbox, please check your spam folder.
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
    </div>
  );
}
export default Verification;