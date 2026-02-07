interface Props {
  wrongGuesses: number;
  isLoser: boolean;
  image?: string;
}

export default function HangmanDrawing({
  wrongGuesses,
  isLoser,
  image = "/imagenes/dragon.png", // ruta desde public
}: Props) {
  const rows = 3;
  const cols = 3;
  const totalParts = rows * cols;

  const parts = Array.from({ length: totalParts }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const showPiece = isLoser || i < wrongGuesses;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: `${(row * 100) / rows}%`,
          left: `${(col * 100) / cols}%`,
          width: `${100 / cols}%`,
          height: `${100 / rows}%`,
          backgroundImage: `url(${image})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${(col * 100) / (cols - 1)}% ${(row * 100) / (rows - 1)}%`,
          backgroundRepeat: "no-repeat",
          opacity: showPiece ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
      />
    );
  });

  return (
    <div
      className="position-relative mb-4"
      style={{
        width: "min(90vw, 400px)",
        height: "min(90vw, 400px)",
        backgroundColor: "#111",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 25px #222",
        marginInline: "auto",
        position: "relative",
      }}
    >
      {parts}

      {isLoser && (
        <img
          src="/imagenes/fire_overlay.gif"
          alt="fuego"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            mixBlendMode: "screen",
            pointerEvents: "none",
            animation: "flicker 0.3s infinite alternate",
          }}
        />
      )}
    </div>
  );
}
