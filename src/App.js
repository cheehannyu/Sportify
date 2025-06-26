import React, { useState, useEffect } from 'react';

// Firebase auth
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";

// React imports
import { Routes, Route } from 'react-router-dom';

// Components
import Login from './Login';
import SignUp from './SignUp';
import Verification from './Verification';
import Homepage from './Homepage';
import Football from './Football';
import TableTennis from './TableTennis';
import Tennis from './Tennis';
import Badminton from './Badminton';
import Basketball from './Basketball';
import Squash from './Squash';
import Boxing from './Boxing';

const VIEWS = { LOGIN: 'login', SIGNUP: 'signup', VERIFICATION: 'verification' };

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

  if (isLoading) {
    return (<div>Loading application...</div>);
  }

  if (!currentUser) {
    switch (currentView) {
      case VIEWS.LOGIN:
        return <Login onSwitchToSignUp={() => setCurrentView(VIEWS.SIGNUP)} />;
      case VIEWS.SIGNUP:
        return <SignUp
          onSwitchToLogin={() => setCurrentView(VIEWS.LOGIN)}
          onSwitchToVerification={() => setCurrentView(VIEWS.VERIFICATION)}
        />;
      case VIEWS.VERIFICATION:
        return <Verification onSwitchToLogin={() => setCurrentView(VIEWS.LOGIN)} />;
      default:
        return <Login onSwitchToSignUp={() => setCurrentView(VIEWS.SIGNUP)} />;
    }
  }

  // User is logged in, use routing for other components
  return (
    <Routes>
      <Route path="/" element={
        <Homepage
          username={currentUser.displayName || "User"}
          onLogout={handleLogout}
        />
      } />
      <Route path="/tennis" element={<Tennis />} />
      <Route path="/football" element={<Football />} />
      <Route path="/tabletennis" element={<TableTennis />} />
      <Route path="/badminton" element={<Badminton />} />
      <Route path="/basketball" element={<Basketball />} />
      <Route path="/squash" element={<Squash />} />
      <Route path="/boxing" element={<Boxing />} />
    </Routes>
  );
}

export default App;