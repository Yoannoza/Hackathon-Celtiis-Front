import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Leaderboard.css";

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const [isFinalized, setIsFinalized] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/ranking/")
      .then((response) => {
        setRankings(response.data);

        // Vérifie si tous les jurys ont voté pour tous les projets
        const allFinalized = response.data.every((entry) => entry.all_jurys_voted);
        setIsFinalized(allFinalized);
      })
      .catch((error) =>
        console.error("Erreur de récupération des classements", error)
      );
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">
        Hackathon Celtiis <br/><br/>
        {isFinalized ? "🎉 Résultats Finaux 🎉" : "Leaderboard Provisoire ⏳"}
      </h1>

      <div className={`leaderboard-table-wrapper ${isFinalized ? "celebrate" : ""}`}>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Équipe</th>
              <th>Projet</th>
              <th>Score Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((entry, index) => (
              <tr key={entry.project} className={`leaderboard-row ${entry.all_jurys_voted ? "completed" : ""}`}>
                <td>{index + 1}</td>
                <td>{entry.team}</td>
                <td>{entry.project}</td>
                <td>{entry.total_score}</td>
                <td>
                  {entry.all_jurys_voted ? (
                    <span className="status-completed">✅ Tous les jurys ont voté</span>
                  ) : (
                    <span className="status-pending">⏳ En attente de Votes</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFinalized && (
        <div className="celebration">
          <img src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif" alt="Celebration" />
          <p>Félicitations à tous les participants !</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
