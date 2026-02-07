import { useEffect, useState } from "react";
import "../App.css";

interface Score {
  name: string;
  date: string;
  result: "win" | "lose";
}

export default function Ranking() {
  const [ranking, setRanking] = useState<Score[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("ranking");
    if (stored) {
      const parsed = JSON.parse(stored) as Score[];
      setRanking(parsed.slice(-10).reverse()); // últimos 10 resultados
    }
  }, []);

  if (ranking.length === 0) return null;

  return (
    <div className="ranking-container fade-in">
      <h2 className="ranking-title">🏆 Ranking</h2>
      {ranking.map((score, index) => (
        <div className="ranking-item" key={index}>
          <span>{score.name}</span>
          <span>{score.result === "win" ? "✅" : "❌"}</span>
          <span style={{ fontSize: "0.7rem" }}>{score.date}</span>
        </div>
      ))}
    </div>
  );
}
