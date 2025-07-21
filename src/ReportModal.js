import React, { useState } from "react";
import "./ReportModal.css";

export default function ReportModal({ isOpen, onClose, onSubmit, possiblePlayers }) {
  const [reportedName, setReportedName] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reportedName, reason });
    setReportedName("");
    setReason("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="report-modal">
        <h3>Report Player</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="report-player-name">Player Name</label>
          {possiblePlayers?.length > 0 ? (
            <select
              id="report-player-name"
              value={reportedName}
              required
              onChange={e => setReportedName(e.target.value)}
            >
              <option value="">Select Player...</option>
              {possiblePlayers.map(p => (
                <option value={p} key={p}>{p}</option>
              ))}
            </select>
          ) : (
            <input
              id="report-player-name"
              type="text"
              required
              placeholder="Enter player's display name/username"
              value={reportedName}
              onChange={e => setReportedName(e.target.value)}
            />
          )}

          <label htmlFor="report-reason">Reason</label>
          <select
            id="report-reason"
            required
            value={reason}
            onChange={e => setReason(e.target.value)}
          >
            <option value="">Select Reason...</option>
            <option value="Misconduct">Misconduct</option>
            <option value="Cheating">Cheating</option>
            <option value="Abusive Language">Abusive Language</option>
            <option value="Other">Other</option>
          </select>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={!reportedName || !reason}>
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
