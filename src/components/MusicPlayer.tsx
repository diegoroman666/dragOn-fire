import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { musicTracks } from "./musicTracks";

export interface MusicPlayerRef {
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  random: () => void;
  volumeUp: () => void;
  volumeDown: () => void;
  getCurrentSong: () => string;
  isPlaying: () => boolean;
}

interface MusicPlayerProps {
  started: boolean;
  autoPlay?: boolean;
}

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>((props, ref) => {
  const { started, autoPlay = false } = props;
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlayingState(true);
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlayingState(false);
      }
    },
    next: () => {
      setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
    },
    prev: () => {
      setCurrentTrack((prev) => (prev - 1 + musicTracks.length) % musicTracks.length);
    },
    random: () => {
      const randomIndex = Math.floor(Math.random() * musicTracks.length);
      setCurrentTrack(randomIndex);
    },
    volumeUp: () => {
      const newVolume = Math.min(volume + 10, 100);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
      }
    },
    volumeDown: () => {
      const newVolume = Math.max(volume - 10, 0);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
      }
    },
    getCurrentSong: () => musicTracks[currentTrack].name,
    isPlaying: () => isPlayingState,
  }));

  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.src = musicTracks[currentTrack].src;
      audioRef.current.volume = volume / 100;
      
      if (autoPlay || isPlayingState) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlayingState(true);
          })
          .catch(() => {});
      }
    }
  }, [currentTrack, started, autoPlay]);

  const handleEnded = () => {
    setCurrentTrack((prevIndex) => (prevIndex + 1) % musicTracks.length);
  };

  // Si no ha started, no renderizamos nada visible
  if (!started) {
    return null;
  }

  return (
    <audio
      ref={audioRef}
      onEnded={handleEnded}
    />
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;

