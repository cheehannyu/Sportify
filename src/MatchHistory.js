import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import ReportModal from "./ReportModal";
import "./MatchHistory.css";

export default function MatchHistory({ userId }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalGame, setModalGame] = useState(null);
  const [reportedGameIds, setReportedGameIds] = useState(new Set());

  // 1. Get conquered games where the current user was a player
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "conqueredGames"),
      (snapshot) => {
        const allGames = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Only include games where the user ID is in the players array
        const filteredGames = allGames.filter(
          (game) =>
            Array.isArray(game.players) &&
            game.players.some(
              (p) => String(p.id).trim() === String(userId).trim()
            )
        );
        const formatted = filteredGames.map((game) => {
          let displayDate = "N/A";
          if (game.date) {
            if (typeof game.date === "string") {
              displayDate = game.date;
            } else if (game.date.seconds) {
              const dateObj = new Date(game.date.seconds * 1000);
              displayDate = dateObj.toLocaleDateString();
            }
          }
          return {
            id: game.id,
            type: game.type || "Unknown",
            date: displayDate,
            otherPlayers: (game.players || []).filter((p) => p.id !== userId),
          };
        });

        setGames(formatted);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching conqueredGames:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // 2. On mount, get all reported game IDs by this user
  useEffect(() => {
    async function fetchReportedGameIds() {
      if (!userId) return;
      const q = query(
        collection(db, "gameReports"),
        where("reporterUserId", "==", userId)
      );
      const snap = await getDocs(q);
      const idSet = new Set();
      snap.forEach((doc) => {
        const data = doc.data();
        if (data.gameId) idSet.add(data.gameId);
      });
      setReportedGameIds(idSet);
    }
    fetchReportedGameIds();
  }, [userId]);

  // 3. When a report is submitted, write to Firestore & update local set
  const handleReport = async (reportData) => {
    if (!modalGame) return;
    try {
      await addDoc(collection(db, "gameReports"), {
        gameId: modalGame.id,
        reporterUserId: userId,
        reportedUserId: reportData.reportedUserId,
        reason: reportData.reason,
        date: new Date().toISOString(),
        gameType: modalGame.type || "Unknown",
        timestamp: serverTimestamp(),
      });
      // Update state so the tick appears immediately
      setReportedGameIds((prev) => new Set([...Array.from(prev), modalGame.id]));
      setModalGame(null);
      alert("Report submitted successfully.");
    } catch (error) {
      console.error("Failed to submit report:", error);
      alert("Unable to submit report.");
    }
  };

  if (loading)
    return (
      <p className="match-history-loading">Loading conquered matches...</p>
    );

  if (games.length === 0)
    return (
      <p className="match-history-empty">
        You have not participated in any conquered matches yet.
      </p>
    );

  return (
    <div className="match-history-container">
      <ul className="history-list">
        {games.map((game) => (
          <li key={game.id} className="history-list-item">
            <div className="history-game-type">{game.type.toUpperCase()}</div>
            <div className="history-date">
              Date: <span>{game.date}</span>
            </div>
            {game.otherPlayers.length > 0 && (
              <div className="history-others">
                <strong>Other players:</strong>
                <ul>
                  {game.otherPlayers.map((p, i) => (
                    <li key={i}>
                      {p.displayName || "Unnamed"}{" "}
                      <span className="history-player-id">({p.id})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!reportedGameIds.has(game.id) ? (
              <button
                className="report-button"
                onClick={() => setModalGame(game)}
              >
                Report
              </button>
            ) : (
              <span className="reported-label">Reported ✓</span>
            )}
          </li>
        ))}
      </ul>
      <ReportModal
        isOpen={!!modalGame}
        modalGame={modalGame}
        userId={userId}
        onClose={() => setModalGame(null)}
        onSubmit={handleReport}
      />
    </div>
  );
}