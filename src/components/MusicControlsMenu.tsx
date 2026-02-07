import { useState, useRef, useEffect } from "react";
import { musicTracks } from "./musicTracks";

interface MusicControlsMenuProps {
  onClose?: () => void;
}

export default function MusicControlsMenu({ onClose }: MusicControlsMenuProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showMenu, setShowMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.src = musicTracks[currentTrack].src;
    audioRef.current.volume = volume / 100;
    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = musicTracks[currentTrack].src;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleEnded = () => {
    handleNext();
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    setCurrentTrack(randomIndex);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="music-controls-menu">
      <button 
        className="music-controls-toggle fire-btn"
        onClick={() => setShowMenu(!showMenu)}
        title="Controles de Musica"
      >
        🎵
      </button>

      {showMenu && (
        <div className="music-controls-dropdown">
          <div className="music-controls-header">
            <span className="music-track-name">
              🎵 {musicTracks[currentTrack].name}
            </span>
            <button 
              className="music-controls-close"
              onClick={() => setShowMenu(false)}
            >
              ✕
            </button>
          </div>

          <div className="music-controls-buttons">
            <button onClick={handlePrev} className="music-control-btn" title="Anterior">
              ⏮️
            </button>
            <button onClick={handlePlayPause} className="music-control-btn play-btn" title={isPlaying ? "Pausar" : "Reproducir"}>
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button onClick={handleNext} className="music-control-btn" title="Siguiente">
              ⏭️
            </button>
            <button onClick={handleRandom} className="music-control-btn" title="Aleatorio">
              🔀
            </button>
          </div>

          <div className="music-controls-volume">
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span>{volume}%</span>
          </div>

          <div className="music-controls-status">
            {isPlaying ? "🔴 Reproduciendo" : "⏸️ Pausado"}
          </div>
        </div>
      )}
    </div>
  );
}
