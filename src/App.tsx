import { useEffect, useState, useRef, useCallback } from 'react';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import HangmanDrawing from './components/HangmanDrawing';
import FinalMessage from './components/FinalMessage';
import Ranking from './components/Ranking';
import ScoreModal from './components/ScoreModal';
import MusicPlayer, { type MusicPlayerRef } from './components/MusicPlayer';
import { musicTracks } from './components/musicTracks';
import VolumeControl from './components/VolumeControl';

import correctSound from './assets/correct.mp3';
import wrongSound from './assets/wrong.mp3';
import winSound from './assets/win.mp3';
import loseSound from './assets/lose.mp3';
import './App.css';

// 📊 Interfaz para el Score
interface Score {
  id: number;
  name: string;
  avatar: string;
  time: number;
  result: "win" | "lose";
  word: string;
  date: string;
}

// 🖼️ Imágenes disponibles para avatares
const AVATAR_IMAGES = [
  "dragon.png", "dragon2.png", "dragon3.png", "dragon4.png", "dragon5.png",
  "dragon6.png", "dragon7.png", "dragon8.png", "dragon9.png", "dragon10.png",
  "dragon11.png", "dragon12.png", "dragon13.png", "dragon14.png", "dragon15.png",
  "dragonmar16.png", "dragonmar17.png", "dragonegipto18.png", "dragonegipto19.png",
  "dragonchino20.png", "dragonchino21.png", "dragonwar22.png", "dragontormenta23.png",
  "dragonlava24.png", "dragonlava25.png", "dragonlava26.png", "dragonwar27.png",
  "dragonwar28.png", "dragonlava29.png", "dragontormenta30.png",
];

const PALABRAS = [
  "trono", "rey", "reina", "duque", "duquesa", "conde", "condesa", "baron", "baronesa",
  "noble", "heraldo", "vasallo", "sierpe", "reino", "imperio", "dinastia", "castillo", "fortaleza",
  "muralla", "torre", "puente", "mazmorra", "carcel", "templo", "monasterio", "abadia", "catedral",
  "cruzada", "conquista", "asedio", "guarnicion", "bastion", "refugio", "campamento", "catapulta",
  "ariete", "torreon", "trincheras", "fosos", "estandarte", "escudo", "espada", "lanza",
  "arco", "flecha", "ballesta", "yelmo", "armadura", "coraza", "grebas", "guantelete", "escudero",
  "caballero", "templario", "paladin", "guerrero", "soldado", "infanteria", "caballeria", "armero",
  "capitan", "comandante", "general", "sargento", "vigilante", "guardian", "escolta", "tropa",
  "mercenario", "cazador", "explorador", "rastreador", "jinete", "arquero", "bardo", "juglar",
  "druida", "chaman", "hechicero", "brujo", "maga", "oraculo", "vidente", "sabio", "anciano",
  "alquimista", "nigromante", "conjurador", "invocador", "mago", "encantador", "profeta", "ilusionista",
  "mentalista", "ocultista", "clero", "sacerdote", "monje", "devoto", "pregonero", "reyerta", "batalla",
  "guerra", "paz", "alianza", "traicion", "juramento", "promesa", "rescate", "venganza", "maldicion",
  "bendicion", "pacto", "acuerdo", "desafio", "rival", "gloria", "honor", "valentia", "coraje",
  "temor", "esperanza", "destino", "camino", "viaje", "mision", "busqueda", "legado", "herencia",
  "memoria", "cronica", "leyenda", "mito", "relato", "cuento", "saga", "epopeya", "profecia",
  "vision", "sueño", "pesadilla", "realidad", "ilusion", "misterio", "secreto", "clave", "pergamino",
  "manuscrito", "mapa", "tesoro", "caverna", "cueva", "abismo", "laberinto", "pantano", "bosque",
  "selva", "desierto", "oasis", "isla", "montaña", "valle", "rio", "laguna", "volcan", "crater",
  "templo", "ruina", "tormenta", "huracan", "nube", "lluvia", "nieve", "granizo", "relampago", "rayo",
  "trueno", "aurora", "niebla", "oscuridad", "sombra", "luz", "fuego", "hielo", "tierra", "agua",
  "aire", "viento", "ceniza", "piedra", "roca", "mineral", "cristal", "gema", "rubí", "zafiro",
  "esmeralda", "diamante", "cuarzo", "obsidiana", "jade", "oro", "plata", "bronce", "hierro", "acero",
  "mitril", "adamantita", "oricalco", "dragón", "draco", "wyrm", "wyvern", "basilisco", "grifon",
  "fénix", "quimera", "hidra", "sirena", "triton", "centauro", "minotauro", "gigante", "ogro",
  "troll", "goblin", "orc", "elfo", "enano", "gnomo", "hobbit", "hada", "duende", "espiritu",
  "fantasma", "espectro", "demonio", "angel", "deidad", "dios", "diosa", "titán", "cronos", "zeus",
  "hades", "poseidon", "hermes", "apolo", "ares", "atenea", "hera", "dionisio", "demeter", "hestia",
  "gaia", "urano", "reencarnacion", "infierno", "paraiso", "tartaro", "eliseo", "valhala", "asgard",
  "midgard", "niflheim", "yggdrasil", "odin", "thor", "loki", "freyja", "balder", "fenrir", "jormungandr",
  "surtur", "hel", "ragnarok", "nirvana", "karma", "samurai", "ronin", "shogun", "ninja", "katana",
  "dojo", "templo", "monje", "sabio", "sensei", "mantra", "zen", "yin", "yang", "talisman", "amuleto",
  "reliquia", "objeto", "artefacto", "runas", "sello", "insignia", "emblema", "sigilo",
  "fuerza", "poder", "energia", "aura", "chispa", "voluntad", "alma", "espiritu", "mente", "cuerpo",
  "trance", "consciencia", "sangre", "latido", "pulso", "eco", "resonancia", "piedralunar", "orbe",
  "cetro", "vara", "baston", "capa", "tunica", "anillo", "collar", "corona", "reliquia", "medallon",
  "guante", "botas", "espolon", "cinturon", "fajin", "bolsa", "mochila", "carroza", "carreta",
  "caravana", "barco", "navio", "velero", "galera", "dragoluz", "luna",
  "escamador", "altavista", "forjador", "cielo", "llama", "colmillo", "colmeneon",
  "tormentudo", "brumazul", "tempestad", "oscuro", "dormilon", "vigia", "centinela", "ojo", "garras",
  "colmillos", "alarido", "rugido", "nido", "cueva", "fuegoazul", "magma",
  "vapor", "brillo", "resplandor", "piedraruna", "luzclara", "nieve", "nordico",
  "templado", "abandonado", "sagrado", "maldito", "eterno", "antiguo", "olvidado", "silencioso",
  "rojo", "azul", "verde", "negro", "blanco", "plateado", "dorado", "gris", "pardo", "ocre", "violeta",
  "escarlata", "carmesí", "ámbar", "marfil", "lila", "bruma", "noche", "amanecer",
  "ocaso", "crepusculo", "dia", "invierno", "verano", "primavera", "otoño"
];

const images = AVATAR_IMAGES;

function getRandomWord() {
  const filtered = PALABRAS.filter(p => /^[a-z]+$/.test(p));
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function getRandomImage() {
  const file = images[Math.floor(Math.random() * images.length)];
  return `/imagenes/${file}`;
}

type GameState = 'menu' | 'countdown' | 'playing' | 'ended';

// 📜 Frases épicas del juego
const GAME_QUOTES = [
  "«Desafia al dragón y revela los secretos ocultos en las sombras»",
  "«Solo los valientes se atreven a descifrar los enigmas del dragón»",
  "«Cada letra es un paso hacia la victoria o la derrota»",
  "«El dragón observa... ¿serás digno de su respeto?»",
  "«Las palabras son tu arma, la sabiduría tu escudo»",
  "«Descifra el misterio antes de que las llamas te alcancen»",
  "«Solo los sabios sobreviven en el reino del dragón»",
];

function getRandomQuote() {
  return GAME_QUOTES[Math.floor(Math.random() * GAME_QUOTES.length)];
}

function App() {
  const [word, setWord] = useState(getRandomWord);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [image, setImage] = useState(getRandomImage);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameState, setGameState] = useState<GameState>('menu');
  const [countdown, setCountdown] = useState(3);
  const [gameQuote, setGameQuote] = useState(getRandomQuote);
  const [rankingKey, setRankingKey] = useState(0);
  
  // 🎵 Estados de música
  const [musicStarted, setMusicStarted] = useState(false);
  const [currentSong, setCurrentSong] = useState(musicTracks[0].name);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);

  // ⏱️ Estados del cronómetro
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🎮 Estados del modal de puntuación
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoreResult, setScoreResult] = useState<"win" | "lose">("win");

  // 🖼️ Estados del carousel de imágenes del menú
  const [currentMenuImageIndex, setCurrentMenuImageIndex] = useState(0);
  const menuImages = AVATAR_IMAGES;

  const wrongGuesses = guessed.filter(l => !word.includes(l));
  const isLoser = wrongGuesses.length >= 9;
  const isWinner = word.split("").every(l => guessed.includes(l));

  // ✅ Audios
  const playCorrectSound = useCallback(() => {
    const audio = new Audio(correctSound);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  const playWrongSound = useCallback(() => {
    const audio = new Audio(wrongSound);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }, []);

  const playWinSound = useCallback(() => {
    const audio = new Audio(winSound);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }, []);

  const playLoseSound = useCallback(() => {
    const audio = new Audio(loseSound);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }, []);

  // 🕐 Efecto del cronómetro
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // 🖼️ Efecto del carousel de imágenes del menú (cada 4 segundos)
  useEffect(() => {
    if (gameState !== 'menu') return;
    
    const interval = setInterval(() => {
      setCurrentMenuImageIndex((prev) => (prev + 1) % menuImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [gameState, menuImages.length]);

  // 🎮 Efecto de cuenta regresiva
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        countdownRef.current = setInterval(() => {
          setCountdown(prev => prev - 1);
        }, 1000);
      } else {
        setGameState('playing');
        setIsTimerRunning(true);
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
      }
    }
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [gameState, countdown]);

  useEffect(() => {
    if ((isWinner || isLoser) && !gameEnded) {
      setGameEnded(true);
      setIsTimerRunning(false);
      setScoreResult(isWinner ? "win" : "lose");
      setShowScoreModal(true);

      if (isWinner) {
        playWinSound();
      } else {
        playLoseSound();
      }
    }
  }, [isWinner, isLoser, gameEnded, playWinSound, playLoseSound, word]);

  // 🎮 Iniciar cuenta regresiva
  const startGame = useCallback(() => {
    setGameState('countdown');
    setCountdown(3);
    setGuessed([]);
    setWord(getRandomWord());
    setImage(getRandomImage());
    setGameEnded(false);
    setTimer(0);
    setGameQuote(getRandomQuote());
  }, []);

  // 🔄 Reiniciar partida
  const restartGame = useCallback(() => {
    setGuessed([]);
    setWord(getRandomWord());
    setImage(getRandomImage());
    setGameEnded(false);
    setTimer(0);
    setGameState('countdown');
    setCountdown(3);
    setIsTimerRunning(true);
    setGameQuote(getRandomQuote());
  }, []);

  // 🚪 Volver al menú
  const exitToMenu = useCallback(() => {
    setGameState('menu');
    setGuessed([]);
    setWord(getRandomWord());
    setImage(getRandomImage());
    setGameEnded(false);
    setTimer(0);
    setIsTimerRunning(false);
  }, []);

  function handleGuess(letter: string) {
    if (guessed.includes(letter) || isWinner || isLoser || gameState !== 'playing') return;
    
    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);
    
    if (word.includes(letter)) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  }

  // ⏱️ Formatear tiempo a MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 📝 Guardar score
  function saveScore(name: string, avatar: string) {
    const score: Score = {
      id: Date.now(),
      name,
      avatar,
      time: timer,
      result: scoreResult,
      word,
      date: new Date().toLocaleString()
    };
    
    const prev = JSON.parse(localStorage.getItem("ranking") || "[]");
    const newRanking = [...prev, score];
    localStorage.setItem("ranking", JSON.stringify(newRanking));
    setRankingKey(prev => prev + 1);
  }

  // 🎵 Funciones de control de música
  const handleMusicPlayPause = () => {
    if (!musicStarted) {
      setMusicStarted(true);
      setIsMusicPlaying(true);
    } else {
      if (isMusicPlaying) {
        musicPlayerRef.current?.pause();
        setIsMusicPlaying(false);
      } else {
        musicPlayerRef.current?.play();
        setIsMusicPlaying(true);
      }
    }
  };

  const handleMusicNext = () => {
    musicPlayerRef.current?.next();
    setTimeout(() => setCurrentSong(musicPlayerRef.current?.getCurrentSong() || ""), 100);
  };

  const handleMusicPrev = () => {
    musicPlayerRef.current?.prev();
    setTimeout(() => setCurrentSong(musicPlayerRef.current?.getCurrentSong() || ""), 100);
  };

  const handleMusicRandom = () => {
    musicPlayerRef.current?.random();
    setTimeout(() => setCurrentSong(musicPlayerRef.current?.getCurrentSong() || ""), 100);
  };

  const handleVolumeUp = () => {
    musicPlayerRef.current?.volumeUp();
  };

  const handleVolumeDown = () => {
    musicPlayerRef.current?.volumeDown();
  };

  return (
    <div className="app text-center text-white bg-dark min-vh-100 p-4">
      {/* 🎵 Music Player oculto que responde a los controles */}
      {musicStarted && <MusicPlayer ref={musicPlayerRef} started={musicStarted} autoPlay={true} />}

      {/* 🎮 PANTALLA DE MENÚ PRINCIPAL */}
      {gameState === 'menu' && (
        <div className="menu-screen fade-in">
          <h1 className="game-title">🐉 EL DRAGÓN EN LLAMAS 🔥</h1>
          
          <p className="game-quote">{gameQuote}</p>

          <div className="menu-container">
            <div className="menu-dragon-preview">
              <img
                src={`/imagenes/${menuImages[currentMenuImageIndex]}`}
                alt="Dragon"
                className="dragon-preview-img"
              />
            </div>

            <div className="menu-buttons">
              <button
                className="menu-btn start-btn fire-btn"
                onClick={startGame}
              >
                <span className="btn-icon">🎮</span>
                <span className="btn-text">Iniciar Partida</span>
                <span className="btn-glow"></span>
              </button>

              <button
                className="menu-btn ranking-btn fire-btn"
                onClick={() => setGameState('playing')}
              >
                <span className="btn-icon">🏆</span>
                <span className="btn-text">Tabla de Posiciones</span>
                <span className="btn-glow"></span>
              </button>
            </div>

            {/* 🎵 Controles de música alineados */}
            <div className="music-controls-row">
              <div className="music-song-display">
                🎵 {currentSong}
              </div>
              <div className="music-buttons-inline">
                <button 
                  className="music-inline-btn fire-btn" 
                  onClick={handleMusicPlayPause}
                  title={isMusicPlaying ? "Pausar" : "Reproducir"}
                >
                  {isMusicPlaying ? '⏸️' : '▶️'}
                </button>
                <button 
                  className="music-inline-btn fire-btn" 
                  onClick={handleMusicPrev}
                  title="Anterior"
                >
                  ⏮️
                </button>
                <button 
                  className="music-inline-btn fire-btn" 
                  onClick={handleMusicNext}
                  title="Siguiente"
                >
                  ⏭️
                </button>
                <button 
                  className="music-inline-btn fire-btn" 
                  onClick={handleMusicRandom}
                  title="Aleatorio"
                >
                  🔀
                </button>
                <button 
                  className="music-inline-btn fire-btn" 
                  onClick={handleVolumeDown}
                  title="Bajar volumen"
                >
                  🔉-
                </button>
                <button 
                  className="music-inline-btn fire-btn" 
                  onClick={handleVolumeUp}
                  title="Subir volumen"
                >
                  🔊+
                </button>
              </div>
            </div>

            <div className="menu-footer">
              <p className="menu-hint">🐉 Descifra las palabras antes de que el dragón te alcance</p>
            </div>
          </div>
        </div>
      )}

      {/* ⏱️ PANTALLA DE CUENTA REGRESIVA */}
      {gameState === 'countdown' && (
        <div className="countdown-screen fade-in">
          <div className="countdown-container">
            <h2 className="countdown-title">¡Prepárate!</h2>
            <div className="countdown-number">
              {countdown > 0 ? countdown : '🔥 ¡COMENZAR!'}
            </div>
            <p className="countdown-hint">El dragón despierta...</p>
          </div>
        </div>
      )}

      {/* 🎮 JUEGO PRINCIPAL */}
      {gameState === 'playing' && (
        <>
          <h1 className="game-title">🐉 EL DRAGÓN EN LLAMAS 🔥</h1>

          {/* 🎛️ Panel de control - Reiniciar | Logo | Salir */}
          <div className="game-controls-panel">
            {/* 🔄 Reiniciar - Izquierda */}
            <button
              className="game-control-btn fire-btn"
              onClick={restartGame}
              title="Reiniciar Partida"
            >
              🔄
            </button>
            
            {/* 🐉 Logo GIF animado - Centro */}
            <div className="dragon-eye-gif-large">
              <img src="https://i.pinimg.com/originals/6d/2f/27/6d2f275e8c5e1adc785d0e00ef14abcc.gif" alt="Ojo del Dragón" />
            </div>
            
            {/* 🚪 Salir - Derecha */}
            <button
              className="game-control-btn fire-btn"
              onClick={exitToMenu}
              title="Volver al Menú"
            >
              🚪
            </button>
          </div>

          <HangmanDrawing wrongGuesses={wrongGuesses.length} isLoser={isLoser} image={image} />
          <WordDisplay word={word} guessedLetters={guessed} />
          <Keyboard onGuess={handleGuess} guessed={guessed} disabled={isWinner || isLoser} />

          <div className="mt-3">
            <button
              className="menu-btn restart-btn-small fire-btn"
              onClick={restartGame}
              style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
            >
              🔄 Reiniciar
            </button>
          </div>
        </>
      )}

      {/* 🏆 PANTALLA FINAL */}
      {gameState === 'ended' && (
        <>
          <FinalMessage
            result={isWinner ? "win" : "lose"}
            word={word}
            onReset={restartGame}
            time={timer}
          />

          <div className="game-over-controls mt-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <button
              className="menu-btn start-btn fire-btn"
              onClick={startGame}
              style={{ marginRight: '1rem' }}
            >
              🎮 Nueva Partida
            </button>
            <button
              className="menu-btn ranking-btn fire-btn"
              onClick={exitToMenu}
            >
              🚪 Menú Principal
            </button>
          </div>
        </>
      )}

      {/* 📊 Ranking */}
      {gameState !== 'menu' && <Ranking key={rankingKey} />}

      {/* 🎯 MODAL DE PUNTUACIÓN */}
      <ScoreModal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        onSave={saveScore}
        result={scoreResult}
        word={word}
        time={timer}
        avatarImages={AVATAR_IMAGES}
      />
    </div>
  );
}

export default App;
