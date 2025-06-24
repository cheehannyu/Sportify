import React, { useState } from 'react';
import './TelegramModal.css';

function TelegramModal({ onSubmit, onCancel }) {
  const [telegramId, setTelegramId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (telegramId.trim()) {
      onSubmit(telegramId.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Share Your Telegram ID</h3>
        <p>The match is full! Please share your Telegram ID to connect with other players.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Telegram username (without @)"
            value={telegramId}
            onChange={(e) => setTelegramId(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Share</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TelegramModal;
