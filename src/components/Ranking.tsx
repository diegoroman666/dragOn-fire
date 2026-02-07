import { useEffect, useState } from "react";
import "../App.css";

interface Score {
  id: number;
  name: string;
  avatar: string;
  time: number;
  result: "win" | "lose";
  word: string;
  date: string;
}

export default function Ranking() {
  const [winners, setWinners] = useState<Score[]>([]);
  const [losers, setLosers] = useState<Score[]>([]);
  const [activeTab, setActiveTab] = useState<"winners" | "losers">("winners");

  useEffect(() => {
    const stored = localStorage.getItem("ranking");
    if (stored) {
      const parsed = JSON.parse(stored) as Score[];
      // Ordenar ganadores por tiempo (más rápido primero)
      const sortedWinners = parsed
        .filter((s) => s.result === "win")
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);
      // Ordenar perdedores por tiempo (más lento primero - o más rápido si se prefiere)
      const sortedLosers = parsed
        .filter((s) => s.result === "lose")
        .sort((a, b) => b.time - a.time)
        .slice(0, 10);
      setWinners(sortedWinners);
      setLosers(sortedLosers);
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (winners.length === 0 && losers.length === 0) return null;

  return (
    <div className="ranking-container fade-in">
      <h2 className="ranking-title">🏆 Tabla de Posiciones</h2>

      {/* Pestañas para Winners y Losers */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={() => setActiveTab("winners")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            background: activeTab === "winners" ? "#00ff00" : "transparent",
            border: "2px solid #00ff00",
            borderRadius: "8px",
            color: activeTab === "winners" ? "#000" : "#00ff00",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
        >
          👑 Ganadores
        </button>
        <button
          onClick={() => setActiveTab("losers")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            background: activeTab === "losers" ? "#ff4444" : "transparent",
            border: "2px solid #ff4444",
            borderRadius: "8px",
            color: activeTab === "losers" ? "#fff" : "#ff4444",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
        >
          💀 Perdedores
        </button>
      </div>

      {/* Tabla de Ganadores */}
      {activeTab === "winners" && (
        <div className="ranking-section">
          {winners.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center" }}>
              No hay ganadores aún
            </p>
          ) : (
            winners.map((score, index) => (
              <div className="ranking-item" key={score.id}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color:
                        index === 0
                          ? "#ffd700"
                          : index === 1
                          ? "#c0c0c0"
                          : index === 2
                          ? "#cd7f32"
                          : "#fff",
                      width: "30px",
                    }}
                  >
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                  </span>
                  <img
                    src={`/imagenes/${score.avatar}`}
                    alt={score.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "contain",
                      borderRadius: "5px",
                      border: "1px solid #ffd700",
                    }}
                  />
                  <span style={{ fontWeight: "bold", color: "#00ff00" }}>
                    {score.name}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#00ffff", fontSize: "0.9rem" }}>
                    ⏱️ {formatTime(score.time)}
                  </div>
                  <div style={{ color: "#888", fontSize: "0.7rem" }}>
                    {score.word.toUpperCase()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tabla de Perdedores */}
      {activeTab === "losers" && (
        <div className="ranking-section">
          {losers.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center" }}>
              No hay perdedores aún
            </p>
          ) : (
            losers.map((score, index) => (
              <div className="ranking-item" key={score.id}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#ff4444",
                      width: "30px",
                    }}
                  >
                    #{index + 1}
                  </span>
                  <img
                    src={`/imagenes/${score.avatar}`}
                    alt={score.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "contain",
                      borderRadius: "5px",
                      border: "1px solid #ff4444",
                    }}
                  />
                  <span style={{ fontWeight: "bold", color: "#ff4444" }}>
                    {score.name}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#ffa500", fontSize: "0.9rem" }}>
                    ⏱️ {formatTime(score.time)}
                  </div>
                  <div style={{ color: "#888", fontSize: "0.7rem" }}>
                    {score.word.toUpperCase()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

