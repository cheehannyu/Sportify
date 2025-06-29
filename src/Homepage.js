import { useState } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function Homepage({ username, onLogout }) {
  const [showHistory, setShowHistory] = useState(false);

  const stats = {
    conquered: 0,
    hours: 0,
    reviews: 0
  };

  const userHistory = []; // Dummy, to be integrated with Conquered button later

  const sports = [
    { id: 1, name: 'Football', icon: '/Messi.png', athlete: 'Messi', description: 'Tiki taka magic', color: '#2196F3', quote: "It took me 17 years and 114 days to become an overnight success." },
    { id: 2, name: 'Table Tennis', icon: '/TT.png', athlete: 'Ma Long', description: 'Ping pong perfection', quote: "Focus on the present point, not the last one or the next one.", color: '#FF9800' },
    { id: 3, name: 'Tennis', icon: '/Serena.png', athlete: 'Serena Williams', description: 'Game.Set.Match', quote: "I really think a champion is defined not by their wins but by how they can recover when they fall.", color: '#E91E63' },
    { id: 4, name: 'Badminton', icon: '/LeeCW.png', athlete: 'Lee Chong Wei', description: 'Smash it up', quote: "Even if you're not winning, you can still be successful. Success is about giving your best effort.", color: '#9C27B0' },
    { id: 5, name: 'Basketball', icon: '/Lebron.png', athlete: 'LeBron James', description: 'King of the court', quote: 'I have failed over and over and over again in my life, and that is why I succeed.', color: '#FF5722' },
    { id: 6, name: 'Squash', icon: '/Squash.png', athlete: 'Ramy Ashour', description: 'Racquet precision', quote: 'You need both physical and mental strength to dominate.', color: '#607D8B' },
    { id: 7, name: 'Boxing', icon: '/Tyson.png', athlete: 'Mike Tyson', description: 'Knockout king', quote: "Everyone has a plan until they get punched in the mouth.", color: '#795548' }
  ];

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

  const handleMenuClick = () => {};

  const statFeatures = [
    { label: "Sports Conquered", value: stats.conquered, emoji: "🏆" },
    { label: "Hours Played", value: stats.hours, emoji: "⏳" },
    { label: "Reviews", value: stats.reviews, emoji: "⭐" }
  ];

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <span className="welcome-text">Welcome, { username }!</span>
        <button
          className="user-menu-toggle"
          aria-label='Menu'
          onClick={() => handleMenuClick} // Dummy button, to be developed into user profile later on
        >
          ☰ 
        </button>
        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main className="homepage-content">
        <h2>Choose Your Sport</h2>
        <p>Select a sport to get matched!</p>
        <div className="sports-list">
          {sports.map(sport => (
            <div
              key={sport.id}
              className="feature-box"
              style={{ borderColor: sport.color }}
              onClick={() => handleSportClick(sport)}
            >
              <img src={sport.icon} alt={sport.name} />
              <h3 style={{ color: sport.color }}>{sport.name}</h3>
              <p>{sport.description}</p>
              <p><strong>{sport.athlete}</strong></p>
              <p><em>"{sport.quote}"</em></p>
            </div>
          ))}
        </div>
        <div className="stats-section">
          {statFeatures.map((stat, idx) => (
            <div className="stats-box" key={idx}>
              <h3>
                <span role="img" aria-label={stat.label}>{stat.emoji}</span> {stat.value}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </main>

      <button
        className="history-button"
        title="History"
        onClick={() => setShowHistory(!showHistory)}
      >
        📜
      </button>

      {showHistory && (
        <div className="history-sidebar">
          <div className="history-header">
            <span>Match History</span>
            <button className="close-history" onClick={() => setShowHistory(false)}>✖</button>
          </div>
          <ul className="history-list">
            {userHistory.length === 0 ? (
              <li>No history yet.</li>
            ) : (
              userHistory.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.sport}</strong> – {item.date} ({item.result})
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;
