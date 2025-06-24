import React, { useState, useEffect } from 'react';

// Firebase auth
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";

// Components
import Login from './Login';
import SignUp from './SignUp';
import Verification from './Verification';
import Homepage from './Homepage';
import { Routes, Route } from 'react-router-dom';
import Football from './Football';
import TableTennis from './TableTennis';
import Tennis from './Tennis';
import Badminton from './Badminton';
import Basketball from './Basketball';
import Squash from './Squash';
import Boxing from './Boxing';

// Constants for view states to manage navigation
const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState(VIEWS.LOGIN);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setCurrentView(VIEWS.LOGIN);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error", error);
    });
  };

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#ffd67f';
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="App-container">
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={
          currentUser ? (
            currentUser.emailVerified ? (
              <Homepage
                username={currentUser.displayName || currentUser.email}
                onLogout={handleLogout}
              />
            ) : (
              <Verification user={currentUser} />
            )
          ) : (
            currentView === VIEWS.SIGNUP ? (
              <SignUp onNavigate={navigateTo} />
            ) : (
              <Login onNavigate={navigateTo} />
            )
          )
        } />
        <Route path="/tennis" element={<Tennis />} />
        <Route path="/football" element={<Football />} />
        <Route path="/tabletennis" element={<TableTennis />} />
        <Route path="/badminton" element={<Badminton />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/squash" element={<Squash />} />
        <Route path="/boxing" element={<Boxing />} />
      </Routes>
    </div>
  );
}

export default App;
