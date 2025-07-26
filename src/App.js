import React, { useState, useEffect } from 'react';

// Firebase auth
import { auth, db } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";

// React Router
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

import { collection, query, where, getDocs } from 'firebase/firestore';

const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState(VIEWS.LOGIN);
  const [isBanned, setIsBanned] = useState(false);
  const [checkingBan, setCheckingBan] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsBanned(false); // reset ban status on user change
      setCurrentUser(user);

      if (user) {
        setCurrentView(null);
        setCheckingBan(true);
        try {
          // Query reports where this user is the reportedUserId
          const reportsQuery = query(
            collection(db, 'gameReports'),
            where('reportedUserId', '==', user.uid)
          );
          const reportsSnapshot = await getDocs(reportsQuery);
          if (reportsSnapshot.size >= 5) {
            setIsBanned(true);
            // Immediately sign out banned user
            await signOut(auth);
            setCurrentUser(null);
            setCurrentView(VIEWS.LOGIN);
          }
        } catch (error) {
          console.error('Failed to check ban status:', error);
          // Proceed without banning on error
          setIsBanned(false);
        } finally {
          setCheckingBan(false);
          setIsLoading(false);
        }
      } else {
        setCurrentView(VIEWS.LOGIN);
        setIsLoading(false);
        setCheckingBan(false);
      }
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

  // Show loading while authenticating or checking ban state
  if (isLoading || checkingBan) {
    return (<div>Loading application...</div>);
  }

  // Show ban message as a simple inline UI, user cannot proceed until banned status is cleared
  if (isBanned) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: 30,
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#e53935', fontWeight: 'bold', marginBottom: 20 }}>
          Your account has been banned
        </h2>
        <p>Thank you for using Sportify.</p>
        <p>Please contact support if you believe this is a mistake.</p>
      </div>
    );
  }

  return (
    <div className="App-container">
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              currentUser.emailVerified ? (
                <Homepage
                  username={currentUser.displayName || currentUser.email}
                  userId={currentUser.uid}
                  onLogout={handleLogout}
                />
              ) : (
                <Verification user={currentUser} />
              )
            ) : currentView === VIEWS.SIGNUP ? (
              <SignUp onNavigate={navigateTo} />
            ) : (
              <Login onNavigate={navigateTo} />
            )
          }
        />
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
