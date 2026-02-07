import { useState } from "react";
import "../App.css";

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, avatar: string) => void;
  result: "win" | "lose";
  word: string;
  time: number;
  avatarImages: string[];
}

export default function ScoreModal({
  isOpen,
  onClose,
  onSave,
  result,
  word,
  time,
  avatarImages,
}: ScoreModalProps) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarImages[0]);

  if (!isOpen) return null;

  // Formatear tiempo a MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), selectedAvatar);
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay fade-in"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <div
        className="fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          border: "3px solid #ffd700",
          borderRadius: "20px",
          padding: "2rem",
          maxWidth: "550px",
          width: "100%",
          boxShadow: "0 0 50px rgba(255, 215, 0, 0.7)",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            color: result === "win" ? "#00ff00" : "#ff4444",
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "2rem",
            textShadow: `0 0 20px ${result === "win" ? "#00ff00" : "#ff4444"}`,
            marginTop: 0,
          }}
        >
          {result === "win" ? "🎉 ¡GANASTE!" : "💀 PERDISTE"}
        </h2>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            padding: "1.2rem",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            textAlign: "center",
            border: "1px solid #ffd700",
          }}
        >
          <p style={{ margin: "0.5rem 0", color: "#ffd700", fontSize: "1.1rem" }}>
            <strong>Palabra:</strong> {word.toUpperCase()}
          </p>
          <p style={{ margin: "0.5rem 0", color: "#00ffff", fontSize: "1.1rem" }}>
            <strong>Tiempo:</strong> {formatTime(time)}
          </p>
          <p style={{ margin: "0.5rem 0", color: "#ff69b4", fontSize: "1.1rem" }}>
            <strong>Resultado:</strong> {result === "win" ? "VICTORIA" : "DERROTA"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.8rem",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              📝 Ingresa tu nombre:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre..."
              maxLength={20}
              autoFocus
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1.1rem",
                border: "2px solid #ffd700",
                borderRadius: "10px",
                background: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                textAlign: "center",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.8rem",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              🐉 Selecciona tu dragón:
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "10px",
                maxHeight: "220px",
                overflowY: "auto",
                padding: "15px",
                background: "rgba(0, 0, 0, 0.5)",
                borderRadius: "12px",
                border: "1px solid #ffd700",
              }}
            >
              {avatarImages.map((avatar) => (
                <div
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedAvatar === avatar
                        ? "3px solid #00ff00"
                        : "2px solid transparent",
                    borderRadius: "10px",
                    padding: "6px",
                    transition: "all 0.3s ease",
                    transform: selectedAvatar === avatar ? "scale(1.15)" : "scale(1)",
                    background:
                      selectedAvatar === avatar
                        ? "rgba(0, 255, 0, 0.2)"
                        : "transparent",
                  }}
                >
                  <img
                    src={`/imagenes/${avatar}`}
                    alt={avatar}
                    style={{
                      width: "100%",
                      height: "55px",
                      objectFit: "contain",
                      filter:
                        selectedAvatar === avatar
                          ? "drop-shadow(0 0 8px #00ff00)"
                          : "brightness(1)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                background: "transparent",
                border: "2px solid #ff4444",
                borderRadius: "10px",
                color: "#ff4444",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "bold",
              }}
            >
              ❌ Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                background: name.trim()
                  ? "linear-gradient(135deg, #00ff00, #00cc00)"
                  : "gray",
                border: "2px solid #00ff00",
                borderRadius: "10px",
                color: "#000",
                fontWeight: "bold",
                cursor: name.trim() ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                boxShadow: name.trim()
                  ? "0 0 15px rgba(0, 255, 0, 0.5)"
                  : "none",
              }}
            >
              💾 Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

