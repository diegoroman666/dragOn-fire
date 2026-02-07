interface Props {
  result: "win" | "lose" | null;
  word: string;
  onReset: () => void;
}

export default function FinalMessage({ result, word, onReset }: Props) {
  if (!result) return null;

  const message = result === "win" ? "¡Ganaste!" : "Perdiste...";
  const color = result === "win" ? "#00ffcc" : "#ff4c4c";

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
      {result === "lose" && (
        <div style={{ color: "#fff" }}>La palabra era: <strong>{word}</strong></div>
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
