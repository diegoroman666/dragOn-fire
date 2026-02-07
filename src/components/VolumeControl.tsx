import { useState } from "react";
import "../App.css";

export default function VolumeControl() {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(50);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const displayVolume = isMuted ? 0 : volume;

  return (
    <div 
      className="volume-control"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        className="game-control-btn fire-btn volume-btn"
        onClick={toggleMute}
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted || volume === 0 ? '🔇' : volume < 30 ? '🔈' : volume < 70 ? '🔉' : '🔊'}
      </button>
      
      <div className={`volume-slider-container ${showSlider ? 'show' : ''}`}>
        <div className="volume-label">{displayVolume}%</div>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
}

