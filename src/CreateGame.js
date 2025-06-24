import React, { useState } from 'react';

function CreateGame({ onCreate, onCancel }) {
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [location, setLocation] = useState('Central');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ maxPlayers, location });
  };

  return (
    <div className="create-game-form">
      <h3>Create New Game</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Number of Players:</label>
          <input
            type="number"
            min="2"
            max="10"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Location:</label>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Central">Central</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Create Game</button>
        </div>
      </form>
    </div>
  );
}

// Make sure this line is present and correct
export default CreateGame;
