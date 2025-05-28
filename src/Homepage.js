import React from 'react';
import './Homepage.css'; 

// username and onLogout
function Homepage({ username, onLogout }) {
  return (
    <div className="homepage-container"> 
      <header className="homepage-header">
        <h1>Welcome, {username}!</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>
      <div className="homepage-content">
        <p>This is your personalized homepage.</p>
        <p>Here you can find all your amazing sports content and features.</p>

        <div className="feature-box">
          <h3>Latest Scores</h3>
          <p>Check out the latest game scores here.</p>
          {/* Placeholder */}
        </div>

        <div className="feature-box">
          <h3>Upcoming Events</h3>
          <p>See what events are coming up soon.</p>
          {/* Placeholder */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
