import React, { useState } from 'react';
<<<<<<< HEAD
import './Homepage.css'; 

function Homepage({ username, onLogout }) {
  const [selectedSport, setSelectedSport] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const sports = [
    { 
      id: 1, 
      name: 'Football', 
      icon: '/Messi.png', 
      athlete: 'Messi',
      description: 'Tiki taka magic',
      color: '#2196F3',
      quote: " It took me 17 years and 114 days to become an overnight success."
    },
    { 
      id: 2, 
      name: 'Table Tennis', 
      icon: '/TT.png', 
      athlete: 'Ma Long',
      description: 'Ping pong perfection',
      quote: "Focus on the present point, not the last one or the next one.",
      color: '#FF9800'
    },
    { 
      id: 3, 
      name: 'Tennis', 
      icon: '/Serena.png', 
      athlete: 'Serena Williams',
      description: 'Game.Set.Match',
      quote: "I really think a champion is defined not by their wins but by how they can recover when they fall.",
      color: '#E91E63'
    },
    { 
      id: 4, 
      name: 'Badminton', 
      icon: '/LeeCW.png', 
      athlete: 'Lee Chong Wei',
      description: 'Smash it up',
      quote: "Even if you're not winning, you can still be successful. Success is about giving your best effort.",
      color: '#9C27B0'
    },
    { 
      id: 5, 
      name: 'Basketball', 
      icon: '/Lebron.png', 
      athlete: 'LeBron James',
      description: 'King of the court',
      quote: 'I have failed over and over and over again in my life, and that is why I succeed.',  
      color: '#FF5722'
    },
    { 
      id: 6, 
      name: 'Squash', 
      icon: '/Squash.png', 
      athlete: 'Ramy Ashour',
      description: 'Racquet precision',
      quote: 'You need both physical and mental strength to dominate.',
      color: '#607D8B'
    },
    { 
      id: 7, 
      name: 'Boxing', 
      icon: '/Tyson.png', 
      athlete: 'Mike Tyson',
      description: 'Knockout king',
      quote: "Everyone has a plan until they get punched in the mouth.",
      color: '#795548'
    }
  ];

  const userHistory = [

  ];

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="main-logo">
              <span className="sport-text">SPORT</span>
              <span className="ify-text">IFY</span>
            </h1>
            <span className="tagline"> Creating vibes, Enhancing lives! </span>
          </div>
          
          <div className="header-actions">
            <span className="welcome-text">Welcome, {username}!</span>
            
            {/* User Settings Dropdown */}
            <div className="user-menu-container">
              <button 
                className="user-settings-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {username.charAt(0).toUpperCase()}
                </div>
                <svg className="dropdown-icon" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <a href="#profile" className="dropdown-item">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    Profile
                  </a>
                  <a href="#settings" className="dropdown-item">
                    <svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
                    Settings
                  </a>
                  <button onClick={onLogout} className="dropdown-item logout-item">
                    <svg viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="homepage-main">
        {/* Sports Selection Section */}
        <section className="sports-section">
          <div className="section-header">
            <h2 className="section-title">Choose Your Sport</h2>
            <p className="section-subtitle">Select a sport to get matched!</p>
          </div>
          
          <div className="sports-grid">
            {sports.map((sport) => (
              <div 
                key={sport.id}
                className={`sport-card ${selectedSport?.id === sport.id ? 'selected' : ''}`}
                onClick={() => handleSportClick(sport)}
                style={{ '--sport-color': sport.color }}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <div className="sport-icon">
                      <img src={sport.icon} alt={sport.name} />
                    </div>
                    <h3 className="sport-name">{sport.name}</h3>
                    <p className="sport-description">{sport.description}</p>
                  </div>
                  <div className="card-back">
                    <div className="athlete-info">
                      <img src={sport.icon} alt={sport.athlete} className="athlete-image" />
                      <h4 className="athlete-name">{sport.athlete}</h4>
                      <p className="sport-quote">"{sport.quote}"</p>
                      <button className="start-training-btn">Start playing</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <h3>0</h3>
                <p>Sports Conquered</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <h3>0</h3>
                <p>Hours Played</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <h3>0</h3>
                <p>Reviews</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* History Sidebar */}
      <div className={`history-sidebar ${showHistory ? 'open' : ''}`}>
        <div className="history-header">
          <h3>Match history</h3>
          <button 
            className="close-history"
            onClick={() => setShowHistory(false)}
          >
            ×
          </button>
=======
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function Homepage({ username, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const sports = [
    { id: 1, name: 'Football', icon: '/Messi.png', athlete: 'Messi', description: 'Tiki taka magic', color: '#2196F3', quote: "It took me 17 years and 114 days to become an overnight success." },
    { id: 2, name: 'Table Tennis', icon: '/TT.png', athlete: 'Ma Long', description: 'Ping pong perfection', quote: "Focus on the present point, not the last one or the next one.", color: '#FF9800' },
    { id: 3, name: 'Tennis', icon: '/Serena.png', athlete: 'Serena Williams', description: 'Game.Set.Match', quote: "I really think a champion is defined not by their wins but by how they can recover when they fall.", color: '#E91E63' },
    { id: 4, name: 'Badminton', icon: '/LeeCW.png', athlete: 'Lee Chong Wei', description: 'Smash it up', quote: "Even if you're not winning, you can still be successful. Success is about giving your best effort.", color: '#9C27B0' },
    { id: 5, name: 'Basketball', icon: '/Lebron.png', athlete: 'LeBron James', description: 'King of the court', quote: 'I have failed over and over and over again in my life, and that is why I succeed.', color: '#FF5722' },
    { id: 6, name: 'Squash', icon: '/Squash.png', athlete: 'Ramy Ashour', description: 'Racquet precision', quote: 'You need both physical and mental strength to dominate.', color: '#607D8B' },
    { id: 7, name: 'Boxing', icon: '/Tyson.png', athlete: 'Mike Tyson', description: 'Knockout king', quote: "Everyone has a plan until they get punched in the mouth.", color: '#795548' }
  ];

  // Placeholder for user history (expand as needed)
  const userHistory = [];

  const navigate = useNavigate();

  const handleSportClick = (sport) => {
    const routeMap = {
      'Football': '/football',
      'Table Tennis': '/tabletennis',
      'Tennis': '/tennis',
      'Badminton': '/badminton',
      'Basketball': '/basketball',
      'Squash': '/squash',
      'Boxing': '/boxing'
    };
    navigate(routeMap[sport.name]);
  };

  return (
    <div className="homepage-container">
      {/* User Menu and History Sidebar */}
      <div className="sidebar">
        <button className="history-button" onClick={() => setShowHistory(!showHistory)}>
          History
        </button>
        {showHistory && (
          <div className="history-list">
            <h3>Your Match History</h3>
            {userHistory.length === 0 ? (
              <p>No matches yet.</p>
            ) : (
              <ul>
                {userHistory.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <header className="homepage-header">
        <div className="user-info">
          <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Welcome, {username}!</span>
          <button
            className="user-menu-toggle"
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ marginLeft: 16 }}
          >
            ☰
          </button>
          {showUserMenu && (
            <div className="user-menu-dropdown">
              <button onClick={onLogout} className="logout-button">Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="homepage-content">
        <h2 style={{ color: '#00bf63', marginBottom: 0 }}>Choose Your Sport</h2>
        <p style={{ marginTop: 0 }}>Select a sport to get matched!</p>
        <div className="sports-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
          {sports.map(sport => (
            <div
              key={sport.id}
              className="feature-box"
              style={{
                borderColor: sport.color,
                cursor: 'pointer',
                width: 220,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => handleSportClick(sport)}
            >
              <img src={sport.icon} alt={sport.name} style={{ width: 100, height: 100, borderRadius: '50%', margin: '16px 0' }} />
              <h3 style={{ color: sport.color, margin: '8px 0 0 0' }}>{sport.name}</h3>
              <p style={{ margin: '4px 0', color: '#fff', fontSize: '1em' }}>{sport.description}</p>
              <p style={{ margin: '4px 0', color: '#fff', fontWeight: 'bold' }}>{sport.athlete}</p>
              <p style={{ margin: '4px 0', color: '#fff', fontStyle: 'italic', fontSize: '0.95em' }}>"{sport.quote}"</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '40px' }}>
          <div className="feature-box" style={{ width: 160 }}>
            <h3 style={{ color: '#00bf63' }}>0</h3>
            <p>Sports Conquered</p>
          </div>
          <div className="feature-box" style={{ width: 160 }}>
            <h3 style={{ color: '#00bf63' }}>0</h3>
            <p>Hours Played</p>
          </div>
          <div className="feature-box" style={{ width: 160 }}>
            <h3 style={{ color: '#00bf63' }}>0</h3>
            <p>Reviews</p>
          </div>
>>>>>>> 419f1c4 (Incorporated React Router logic, in conjuction with App.js and separate components)
        </div>
        <div className="history-content">
          {userHistory.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-sport">{item.sport}</div>
              <div className="history-details">
                <span className="history-date">{item.date}</span>
                <span className="history-duration">{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Toggle Button */}
      <button 
        className="history-toggle"
        onClick={() => setShowHistory(!showHistory)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
        </svg>
        <span>History</span>
      </button>

      {/* Background Elements */}
      <div className="bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
    </div>
  );
}

export default Homepage;
