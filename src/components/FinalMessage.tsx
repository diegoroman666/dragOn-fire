interface Props {
  result: "win" | "lose" | null;
  word: string;
  onReset: () => void;
  time: number;
  onSaveScore?: (name: string, avatar: string, result: "win" | "lose") => void;
  avatarImages?: string[];
}

export default function FinalMessage({ result, word, onReset, time }: Props) {
  if (!result) return null;

  const message = result === "win" ? "¡Ganaste!" : "Perdiste...";
  const color = result === "win" ? "#00ffcc" : "#ff4c4c";

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="fade-in"
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        borderRadius: "12px",
        backgroundColor: "#111",
        color,
        boxShadow: `0 0 15px ${color}`,
        fontSize: "1.5rem",
        textAlign: "center",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{message}</div>
      
      {/* Mostrar tiempo */}
      <div style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        ⏱️ Tiempo: {formatTime(time)}
      </div>
      
      {result === "lose" && (
        <div style={{ color: "#fff" }}>La palabra era: <strong>{word}</strong></div>
      )}
      
      {/* Guardar score si ganó */}
      {result === "win" && (
        <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          <p style={{ color: "#ffd700" }}>¡Felicidades! Tu puntuación ha sido guardada.</p>
        </div>
      )}
      
      <button
        onClick={onReset}
        style={{
          marginTop: "1rem",
          padding: "0.8rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: color,
          color: "#111",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: `0 0 10px ${color}`,
        }}
      >
        Jugar otra vez
      </button>
    </div>
  );
}
