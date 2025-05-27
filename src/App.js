import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Homepage from './Homepage'; // Import the Homepage component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(''); // To store the username

  // This function will be called by the Login component on successful login
  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    // store token from localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    // clear token from localStorage
  };

  
  useEffect(() => {
    document.body.style.backgroundColor = '#ffd67f'; 
    // Cleanup function to remove style when component unmounts 
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App">
      {isLoggedIn ? (
        <Homepage username={currentUser} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;

