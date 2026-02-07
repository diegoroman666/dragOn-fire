// src/components/MusicPlayer.tsx
import { useEffect, useRef, useState } from "react";

const musicTracks = [
  "/media/me1Gallowmere Land - SorcererZarok.mp3",
  "/media/me2Main Menu - SorcererZarok.mp3",
  "/media/me3Crypt & Graveyard - SorcererZarok.mp3",
  "/media/me4Cemetery Hill - SorcererZarok.mp3",
  "/media/me5The Hilltop Mausoleum - SorcererZarok.mp3",
  "/media/me6Return to the Graveyard.mp3",
  "/media/me7Scarecrow Fields - SorcererZarok.mp3",
];

export default function MusicPlayer() {
  const [started, setStarted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleUserStart = () => {
    setStarted(true);
  };

  // Reproduce la canción cuando se cambia la pista
  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.src = musicTracks[currentTrack];
      audioRef.current
        .play()
        .catch((err) => console.error("Error al reproducir:", err));
    }
  }, [currentTrack, started]);

  // Avanza a la siguiente pista cuando termina la actual
  const handleEnded = () => {
    setCurrentTrack((prevIndex) => (prevIndex + 1) % musicTracks.length);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {!started ? (
        <button
          onClick={handleUserStart}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          🎵 Iniciar Música
        </button>
      ) : (
        <audio
          ref={audioRef}
          onEnded={handleEnded}
          autoPlay
        />
      )}
    </div>
  );
}
