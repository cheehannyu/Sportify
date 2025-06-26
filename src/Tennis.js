import React, { useState, useEffect, useMemo } from 'react';
import { auth, db } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import CreateGame from './CreateGame';
import TelegramModal from './TelegramModal';
import './Tennis.css';

function Tennis() {
  const [games, setGames] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [userGamesCount, setUserGamesCount] = useState(0);

  // Filter state
  const [locationFilters, setLocationFilters] = useState({
    North: false,
    South: false,
    East: false,
    West: false,
    Central: false
  });

  const currentUserId = auth.currentUser?.uid || "user123";
  const currentUserDisplayName = auth.currentUser?.displayName || "Unknown";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tennisGames"), (snapshot) => {
      const fetchedGames = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGames(fetchedGames);

      const gamesUserIsIn = fetchedGames.filter(game =>
        game.players.some(player => player.id === currentUserId)
      );
      setUserGamesCount(gamesUserIsIn.length);
    });
    return () => unsubscribe();
  }, [currentUserId]);

  // Filtering and always sorting by date (soonest first)
  const processedGames = useMemo(() => {
    let result = [...games];
    const activeLocations = Object.entries(locationFilters)
      .filter(([_, isActive]) => isActive)
      .map(([location]) => location);
    if (activeLocations.length > 0) {
      result = result.filter(game => activeLocations.includes(game.location));
    }
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    return result;
  }, [games, locationFilters]);

  const handleLocationFilterChange = (location) => {
    setLocationFilters(prev => ({
      ...prev,
      [location]: !prev[location]
    }));
  };

  const handleCreateGame = async (newGame) => {
    if (userGamesCount >= 3) {
      alert('Involved in too many games!');
      return;
    }
    await addDoc(collection(db, "tennisGames"), {
      location: newGame.location,
      maxPlayers: newGame.maxPlayers,
      currentPlayers: 1,
      createdBy: currentUserId,
      createdByDisplayName: currentUserDisplayName,
      date: newGame.date,
      time: newGame.time, // "09:00", "13:00", etc.
      players: [{
        id: currentUserId,
        telegramId: newGame.telegramId,
        displayName: currentUserDisplayName
      }],
      isCreator: true,
    });
    setShowCreateForm(false);
  };

  const handleJoinGame = async (gameId) => {
    if (userGamesCount >= 3) {
      alert('You can only be in a maximum of 3 tennis games at once.');
      return;
    }
    const gameRef = doc(db, "tennisGames", gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const game = gameSnap.data();
      if (game.createdBy === currentUserId) return;
      if (game.players.some(player => player.id === currentUserId)) return;
      if (game.currentPlayers < game.maxPlayers) {
        await updateDoc(gameRef, {
          currentPlayers: game.currentPlayers + 1,
          players: arrayUnion({
            id: currentUserId,
            telegramId: null,
            displayName: currentUserDisplayName
          })
        });
        setSelectedGameId(gameId);
        setShowTelegramModal(true);
      }
    }
  };

  const handleTelegramSubmit = async (telegramId) => {
    if (!selectedGameId) return;
    const gameRef = doc(db, "tennisGames", selectedGameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const game = gameSnap.data();
      const updatedPlayers = game.players.map(player =>
        player.id === currentUserId ? { ...player, telegramId } : player
      );
      await updateDoc(gameRef, { players: updatedPlayers });
    }
    setShowTelegramModal(false);
    setSelectedGameId(null);
  };

  const handleTelegramCancel = async () => {
  if (!selectedGameId) return;
  const gameRef = doc(db, "tennisGames", selectedGameId);
  const gameSnap = await getDoc(gameRef);
  if (gameSnap.exists()) {
    const game = gameSnap.data();
    const updatedPlayers = game.players.filter(player => player.id !== currentUserId);
    await updateDoc(gameRef, {
      currentPlayers: game.currentPlayers - 1,
      players: updatedPlayers
    });
  }
  setShowTelegramModal(false);
  setSelectedGameId(null);
};


  const handleLeaveGame = async (gameId) => {
    const gameRef = doc(db, "tennisGames", gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const game = gameSnap.data();
      const updatedPlayers = game.players.filter(player => player.id !== currentUserId);
      await updateDoc(gameRef, {
        currentPlayers: game.currentPlayers - 1,
        players: updatedPlayers
      });
    }
  };

  const handleDeleteGame = async (gameId) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    await deleteDoc(doc(db, "tennisGames", gameId));
  };

  const handleConqueredGame = async (gameId) => {
    if (!window.confirm("Are you sure you've conquered this game?")) return;
    await deleteDoc(doc(db, "tennisGames", gameId));
  };

  const isGameCreator = (game) => game.createdBy === currentUserId;
  const isGameFull = (game) => game.currentPlayers === game.maxPlayers;
  const userInGame = (game) => game.players.some(player => player.id === currentUserId);

  return (
    <div className="tennis-container">
      <h2>Find or create tennis matches in your area</h2>

      {/* Centered Location Filter */}
      <div className="location-filter-bar">
        <label className="location-filter-label">Filter by Location:</label>
        <div className="location-filter-options">
          {Object.keys(locationFilters).map(location => (
            <label key={location} className="location-checkbox-label">
              <input
                type="checkbox"
                checked={locationFilters[location]}
                onChange={() => handleLocationFilterChange(location)}
              />
              {location}
            </label>
          ))}
        </div>
      </div>

      <p className="user-stats">You are currently in {userGamesCount}/3 tennis games</p>
      <button 
        className="create-game-btn" 
        onClick={() => {
          if (userGamesCount >= 3) {
            alert('Involved in too many games!');
          } else {
            setShowCreateForm(true);
          }
        }}
      >
        Create Game
      </button>
      {showCreateForm && (
        <CreateGame
          onCreate={handleCreateGame}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
      <div className="games-list">
        {processedGames.length === 0 ? (
          <p>No matches available. Create one!</p>
        ) : (
          processedGames.map(game => (
            <div key={game.id} className={`game-card${isGameFull(game) ? ' full' : ''}`}>
              <div className="game-info">
                <h4>
                  {game.date} &nbsp; {game.time} &nbsp; | &nbsp; {game.location}
                </h4>
                <p>
                  Created by: <strong>{game.createdByDisplayName || "Unknown"}</strong>
                </p>
                <p>Players: {game.currentPlayers}/{game.maxPlayers}</p>
                <p>Status: {isGameFull(game) ? 'Full' : 'Open'}</p>
                {isGameFull(game) && (
                  <div>
                    <h5>Player Telegram Handles:</h5>
                    {game.players.map((player, idx) => (
                      <div key={idx}>
                        {player.displayName || `Player ${idx + 1}`}: @{player.telegramId || "not provided"}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Conquered button: only for creator when game is full */}
              {isGameCreator(game) && isGameFull(game) && (
                <button className="conquered-btn" onClick={() => handleConqueredGame(game.id)}>
                  Conquered!
                </button>
              )}
              {/* Delete button: only for creator */}
              {isGameCreator(game) && (
                <button className="delete-btn" onClick={() => handleDeleteGame(game.id)}>
                  Delete
                </button>
              )}
              {!isGameFull(game) &&
                !isGameCreator(game) &&
                !userInGame(game) &&
                userGamesCount < 3 && (
                  <button
                    className="join-btn"
                    onClick={() => handleJoinGame(game.id)}
                  >
                    Join
                  </button>
                )}
              {!isGameCreator(game) && userInGame(game) && (
                <button className="leave-btn" onClick={() => handleLeaveGame(game.id)}>
                  Leave
                </button>
              )}
            </div>
          ))
        )}
      </div>
      {showTelegramModal && (
        <TelegramModal
          onSubmit={handleTelegramSubmit}
          onCancel={handleTelegramCancel}
        />
      )}
    </div>
  );
}

export default Tennis;