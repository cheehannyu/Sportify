import React, { useState } from "react";
import ReportModal from "./ReportModal";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";


// games: list of conquered matches. userId: current user's UID.
export default function MatchHistory({ games, userId }) {
  const [modalGame, setModalGame] = useState(null);
  const [submittedIds, setSubmittedIds] = useState([]); // prevent multiple reports per session

  const handleReport = async (report) => {
    if (!modalGame) return;
    await addDoc(collection(db, "gameReports"), {
      gameId: modalGame.id,
      reporterId: userId,
      reason: report.reason,
      details: report.details,
      timestamp: serverTimestamp()
    });
    setModalGame(null);
    setSubmittedIds(ids => [...ids, modalGame.id]);
    // Optionally, show a confirmation (snackbar/alert)
  };

  return (
    <div className="history-container">
      <h2>Match History</h2>
      <ul className="history-list">
        {games.map(game =>
          <li key={game.id} className="history-item">
            <span className="game-title">{game.sport} at {game.location}</span>
            <button
              className="report-btn"
              onClick={() => setModalGame(game)}
              disabled={submittedIds.includes(game.id)}
            >
              {submittedIds.includes(game.id) ? "Reported" : "Report"}
            </button>
          </li>
        )}
      </ul>
      <ReportModal
        isOpen={!!modalGame}
        onClose={() => setModalGame(null)}
        onSubmit={handleReport}
      />
    </div>
  );
}
