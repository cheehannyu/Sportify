import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchHistory from './MatchHistory';
import './Homepage.css';

function Homepage({ username, userId, onLogout }) {
  const [showHistory, setShowHistory] = useState(false);

  const sports = [
    { id: 1, name: 'Football', icon: '/Messi.png', athlete: 'Messi', description: 'Tiki taka magic', color: '#2196F3', quote: "It took me 17 years and 114 days to become an overnight success." },
    { id: 2, name: 'Table Tennis', icon: '/TT.png', athlete: 'Ma Long', description: 'Ping pong perfection', quote: "Focus on the present point, not the last one or the next one.", color: '#FF9800' },
    { id: 3, name: 'Tennis', icon: '/Serena.png', athlete: 'Serena Williams', description: 'Game.Set.Match', quote: "A champion is defined not by their wins but by how they recover when they fall.", color: '#E91E63' },
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

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="welcome-text">Welcome, {username || 'Player'}</div>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </header>

      <div className="homepage-content">
        <h2>Choose Your Sport</h2>
        <p>Select a sport to get matched!</p>

        <div className="sports-list">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="feature-box"
              style={{ borderColor: sport.color }}
              onClick={() => handleSportClick(sport)}
              tabIndex={0}
              role="button"
              aria-pressed="false"
            >
              <img src={sport.icon} alt={`${sport.name} icon`} />
              <h3 style={{ color: sport.color }}>{sport.name}</h3>
              <p>{sport.description}</p>
              <strong>{sport.athlete}</strong>
              <em>"{sport.quote}"</em>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-right toggle button for showing/hiding Match History */}
      <button
        className="history-button"
        aria-label="Toggle Match History"
        onClick={() => setShowHistory(prev => !prev)}
      >
        📖
      </button>

      {/* Match History Sidebar */}
      {showHistory && (
        <aside className="history-sidebar">
          <div className="history-header">
            <h3>Match History</h3>
            <button
              className="close-history"
              aria-label="Close Match History"
              onClick={() => setShowHistory(false)}
            >
              ✕
            </button>
          </div>
          <MatchHistory userId={userId} />
        </aside>
      )}
    </div>
  );
}

export default Homepage;
