// src/Homepage.js

import React from 'react';
import './Homepage.css'; 

function Homepage({ username, onLogout }) { // Accept username and onLogout as props
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Sportify, {username}!</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>
      <main className="homepage-content">
        <p>This is your personalized homepage.</p>
        <p>Here you can find all your amazing sports content and features.</p>
        <div className="feature-box">
          <h3>Latest Scores</h3>
          <p>Check out the latest game scores here.</p>
        </div>
        <div className="feature-box">
          <h3>Upcoming Events</h3>
          <p>See what events are coming up soon.</p>
        </div>
      </main>
    </div>
  );
}

export default Homepage;

