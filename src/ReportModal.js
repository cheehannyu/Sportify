import React, { useState, useEffect } from "react";
import "./ReportModal.css";

export default function ReportModal({ isOpen, onClose, onSubmit, modalGame, userId }) {
  const [reportedUserId, setReportedUserId] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReportedUserId("");
      setReason("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reportedUserId.trim() || !reason.trim()) {
      alert("Please provide both User ID and a reason.");
      return;
    }

    const report = {
      reportedUserId: reportedUserId.trim(),
      reporterUserId: userId,
      reason: reason.trim(),
      date: new Date().toISOString(),
      gameId: modalGame?.id || null,
      gameType: modalGame?.type || "Unknown",
    };

    onSubmit(report);
  };

  if (!isOpen) return null;

  return (
    <div className="report-modal-backdrop">
      <div className="report-modal">
        <form onSubmit={handleSubmit}>
          <h2>Report a Player</h2>

          <label htmlFor="reportedUserId">User ID to Report</label>
          <input
            id="reportedUserId"
            type="text"
            placeholder="Enter User ID"
            value={reportedUserId}
            onChange={(e) => setReportedUserId(e.target.value)}
            required
          />

          <label htmlFor="reason">Reason</label>
          <textarea
            id="reason"
            placeholder="State your reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <div className="report-modal-actions">
            <button type="submit">Submit Report</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}