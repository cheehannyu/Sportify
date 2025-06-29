import { useState } from 'react';
import "./CreateGame.css";

function CreateGame({ onCreate, onCancel }) {
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [location, setLocation] = useState('Central');
  const [telegramId, setTelegramId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!telegramId.trim()) {
      setError('Telegram ID is required.');
      return;
    }
    if (!date) {
      setError('Date is required.');
      return;
    }
    if (!time) {
      setError('Time is required.');
      return;
    }

    setError('');
    onCreate({
      maxPlayers,
      location,
      telegramId: telegramId.trim(),
      date,
      time
    });
  };

  return (
    <form className="create-game-form" onSubmit={handleSubmit}>
      <h3>Create a Tennis Game</h3>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      <div className="form-group">
        <label htmlFor="telegramId">Your Telegram ID:</label>
        <input
          type="text"
          id="telegramId"
          value={telegramId}
          onChange={e => setTelegramId(e.target.value)}
          placeholder="@yourhandle"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="maxPlayers">Max Players:</label>
        <select
          id="maxPlayers"
          value={maxPlayers}
          onChange={e => setMaxPlayers(Number(e.target.value))}
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          <option value="Central">Central</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
          step="3600" // restricted to eg 1900hrs
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreateGame;
