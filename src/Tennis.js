import React, { useState } from 'react';
import CreateGame from './CreateGame';
import TelegramModal from './TelegramModal';
import './Tennis.css';

function Tennis() {
  const [games, setGames] = useState([]); // Start with no games
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [userJoinedGame, setUserJoinedGame] = useState(null); // Track which game user joined
  const [currentUserId] = useState('user123'); // Mock user ID - replace with actual auth

  const handleCreateGame = (newGame) => {
    const gameId = Date.now(); // Use timestamp as unique ID
    const createdGame = {
      id: gameId,
      location: newGame.location,
      maxPlayers: newGame.maxPlayers,
      currentPlayers: 1,
      createdBy: currentUserId,
      players: [{ id: currentUserId, telegramId: null }],
      isCreator: true
    };
    
    setGames([...games, createdGame]);
    setUserJoinedGame(gameId);
    setShowCreateForm(false);
  };

  const handleJoinGame = (gameId) => {
    // Check if user already joined a game
    if (userJoinedGame && userJoinedGame !== gameId) {
      alert('You can only join one tennis match at a time!');
      return;
    }

    setGames(games.map(game => {
      if (game.id === gameId && game.currentPlayers < game.maxPlayers) {
        const updatedGame = {
          ...game,
          currentPlayers: game.currentPlayers + 1,
          players: [...game.players, { id: currentUserId, telegramId: null }]
        };
        
        // If game is now full, show telegram modal
        if (updatedGame.currentPlayers === updatedGame.maxPlayers) {
          setSelectedGameId(gameId);
          setShowTelegramModal(true);
        }
        
        return updatedGame;
      }
      return game;
    }));
    
    setUserJoinedGame(gameId);
  };

  const handleTelegramSubmit = (telegramId) => {
    setGames(games.map(game => {
      if (game.id === selectedGameId) {
        const updatedPlayers = game.players.map(player => 
          player.id === currentUserId 
            ? { ...player, telegramId }
            : player
        );
        return { ...game, players: updatedPlayers };
      }
      return game;
    }));
    
    setShowTelegramModal(false);
    setSelectedGameId(null);
  };

  const handleLeaveGame = (gameId) => {
    setGames(games.map(game => {
      if (game.id === gameId) {
        const updatedPlayers = game.players.filter(player => player.id !== currentUserId);
        return {
          ...game,
          currentPlayers: game.currentPlayers - 1,
          players: updatedPlayers
        };
      }
      return game;
    }).filter(game => !(game.createdBy === currentUserId && game.players.length === 0)));
    
    setUserJoinedGame(null);
  };

  const isGameCreator = (game) => game.createdBy === currentUserId;
  const isGameFull = (game) => game.currentPlayers === game.maxPlayers;
  const allPlayersHaveTelegram = (game) => 
    game.players.every(player => player.telegramId !== null);

  return (
    <div className="tennis-container">
      <h2>Tennis Match Finder</h2>
      <p>Find or create tennis matches in your area</p>
      
      <button 
        className="create-game-btn"
        onClick={() => setShowCreateForm(true)}
        disabled={userJoinedGame !== null}
      >
        {userJoinedGame ? 'Already in a match' : 'Create New Game'}
      </button>

      {showCreateForm && (
        <CreateGame 
          onCreate={handleCreateGame} 
          onCancel={() => setShowCreateForm(false)} 
        />
      )}

      <div className="games-list">
        <h3>Available Matches</h3>
        {games.length === 0 ? (
          <p>No matches available. Create one!</p>
        ) : (
          games.map(game => (
            <div 
              key={game.id} 
              className={`game-card ${isGameFull(game) ? 'full' : ''} ${userJoinedGame === game.id ? 'joined' : ''}`}
            >
              <div className="game-info">
                <h4>{game.location} Court</h4>
                <p>Players: {game.currentPlayers}/{game.maxPlayers}</p>
                <p>Status: {isGameFull(game) ? 'Full' : 'Open'}</p>
                {isGameCreator(game) && <span className="creator-badge">Created by you</span>}
                
                {/* Show telegram IDs to creator when game is full and all players have shared */}
                {isGameCreator(game) && isGameFull(game) && allPlayersHaveTelegram(game) && (
                  <div className="telegram-list">
                    <h5>Player Telegram IDs:</h5>
                    {game.players.map((player, index) => (
                      <p key={index}>
                        Player {index + 1}: @{player.telegramId}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="game-actions">
                {userJoinedGame === game.id ? (
                  <button 
                    className="leave-btn"
                    onClick={() => handleLeaveGame(game.id)}
                  >
                    Leave
                  </button>
                ) : (
                  <button 
                    className="join-btn"
                    onClick={() => handleJoinGame(game.id)}
                    disabled={isGameFull(game) || userJoinedGame !== null}
                  >
                    {isGameFull(game) ? 'Full' : userJoinedGame ? 'Already joined another' : 'Join'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showTelegramModal && (
        <TelegramModal 
          onSubmit={handleTelegramSubmit}
          onCancel={() => setShowTelegramModal(false)}
        />
      )}
    </div>
  );
}

export default Tennis;
