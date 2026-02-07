import { useEffect, useState, useMemo } from 'react';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import HangmanDrawing from './components/HangmanDrawing';
import FinalMessage from './components/FinalMessage';
import Ranking from './components/Ranking';
import MusicPlayer from "./components/MusicPlayer";

import correctSound from './assets/correct.mp3';
import wrongSound from './assets/wrong.mp3';
import winSound from './assets/win.mp3';
import loseSound from './assets/lose.mp3';
import './App.css';

const PALABRAS = [
  "trono", "rey", "reina", "duque", "duquesa", "conde", "condesa", "baron", "baronesa",
  "noble", "heraldo", "vasallo", "sierpe", "reino", "imperio", "dinastia", "castillo", "fortaleza",
  "muralla", "torre", "puente", "mazmorra", "carcel", "templo", "monasterio", "abadia", "catedral",
  "cruzada", "conquista", "asedio", "guarnicion", "bastion", "refugio", "campamento", "catapulta",
  "ariete", "torreon", "muralla", "trincheras", "fosos", "estandarte", "escudo", "espada", "lanza",
  "arco", "flecha", "ballesta", "yelmo", "armadura", "coraza", "grebas", "guantelete", "escudero",
  "caballero", "templario", "paladin", "guerrero", "soldado", "infanteria", "caballeria", "armero",
  "capitan", "comandante", "general", "sargento", "vigilante", "guardian", "escolta", "tropa",
  "aliado", "enemigo", "traidor", "espia", "asesino", "ladron", "vagabundo", "forajido", "bandido",
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
  "reliquia", "objeto", "artefacto", "runas", "sello", "insignia", "estandarte", "emblema", "sigilo",
  "fuerza", "poder", "energia", "aura", "chispa", "voluntad", "alma", "espiritu", "mente", "cuerpo",
  "trance", "consciencia", "sangre", "latido", "pulso", "eco", "resonancia", "piedralunar", "orbe",
  "cetro", "vara", "baston", "capa", "tunica", "anillo", "collar", "corona", "reliquia", "medallon",
  "guante", "botas", "espolon", "cinturon", "fajin", "bolsa", "mochila", "carroza", "carreta",
  "caravana", "barco", "navio", "velero", "galera", "tierra", "dragoluz", "luna",
  "escamador", "altavista", "forjador", "cielo", "llama", "colmillo", "colmeneon",
  "tormentudo", "brumazul", "tempestad", "oscuro", "dormilon", "vigia", "centinela", "ojo", "garras",
  "colmillos", "alarido", "rugido", "nido", "cueva", "vigilante", "guardian", "fuegoazul", "magma",
  "vapor", "brillo", "resplandor", "piedraruna", "luzclara", "hierro", "nieve", "nordico",
  "templado", "oscuro", "abandonado", "sagrado", "maldito", "eterno", "antiguo", "olvidado", "silencioso",
  "rojo", "azul", "verde", "negro", "blanco", "plateado", "dorado", "gris", "pardo", "ocre", "violeta",
  "escarlata", "carmesí", "ámbar", "esmeralda", "marfil", "lila", "cielo", "bruma", "noche", "amanecer",
  "ocaso", "crepusculo", "noche", "dia", "invierno", "verano", "primavera", "otoño"
];

const images = [
  "dragon.png",
  "dragon2.png",
  "dragon3.png",
  "dragon4.png",
  "dragon5.png",
  "dragon6.png",
  "dragon7.png",
  "dragon8.png",
  "dragon9.png",
  "dragon10.png",
  "dragon11.png",
  "dragon12.png",
  "dragon13.png",
  "dragon14.png",
  "dragon15.png",
  "dragonmar16.png",
  "dragonmar17.png",
  "dragonegipto18.png",
  "dragonegipto19.png",
  "dragonchino20.png",
  "dragonchino21.png",
  "dragonwar22.png",
  "dragontormenta23.png",
  "dragonlava24.png",
  "dragonlava25.png",
  "dragonlava26.png",
  "dragonwar27.png",
  "dragonwar28.png",
  "dragonlava29.png",
  "dragontormenta30.png",
];

// Reemplaza la función getRandomWord() así en App.tsx
function getRandomWord() {
  const filtered = PALABRAS.filter(p => /^[a-z]+$/.test(p)); // Solo letras minúsculas sin símbolos
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function getRandomImage() {
  const file = images[Math.floor(Math.random() * images.length)];
  return `/imagenes/${file}`;
}

function App() {
  const [word, setWord] = useState(getRandomWord);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [image, setImage] = useState(getRandomImage);
  const [gameEnded, setGameEnded] = useState(false);

  const wrongGuesses = guessed.filter(l => !word.includes(l));
  const isLoser = wrongGuesses.length >= 9;
  const isWinner = word.split("").every(l => guessed.includes(l));

  // ✅ Audios optimizados
  const correctAudio = useMemo(() => new Audio(correctSound), []);
  const wrongAudio = useMemo(() => new Audio(wrongSound), []);
  const winAudio = useMemo(() => new Audio(winSound), []);
  const loseAudio = useMemo(() => new Audio(loseSound), []);

  useEffect(() => {
    if ((isWinner || isLoser) && !gameEnded) {
      setGameEnded(true);
      if (isWinner) {
        winAudio.play();
        const name = prompt("¡Ganaste! Ingresa tu nombre:");
        if (name) saveScore(name, "win");
      } else {
        loseAudio.play();
        const name = prompt(`Perdiste. La palabra era "${word}". Ingresa tu nombre:`);
        if (name) saveScore(name, "lose");
      }
    }
  }, [isWinner, isLoser, gameEnded, winAudio, loseAudio, word]);

  function handleGuess(letter: string) {
    if (guessed.includes(letter) || isWinner || isLoser) return;
    setGuessed([...guessed, letter]);

    if (word.includes(letter)) {
      correctAudio.play();
    } else {
      wrongAudio.play();
    }
  }

  const audio = new Audio("/media/lose.mp3");
  audio.volume = 1.0; // 1.0 es el volumen máximo
  audio.play();


  function resetGame() {
    setGuessed([]);
    setWord(getRandomWord());
    setImage(getRandomImage());
    setGameEnded(false);
  }

  return (
    <div className="app text-center text-white bg-dark min-vh-100 p-4">
      <MusicPlayer />
      <h1 className="mb-4">🐉 EL DRAGÓN EN LLAMAS  🔥</h1>
      <HangmanDrawing wrongGuesses={wrongGuesses.length} isLoser={isLoser} image={image} />
      <WordDisplay word={word} guessedLetters={guessed} />
      <Keyboard onGuess={handleGuess} guessed={guessed} disabled={isWinner || isLoser} />
      <FinalMessage result={isWinner ? "win" : isLoser ? "lose" : null} word={word} onReset={resetGame} />
      <Ranking />
    </div>
  );
}
interface Score {
  name: string;
  date: string;
  result: "win" | "lose";
}

function saveScore(name: string, result: "win" | "lose") {
  const score: Score = { name, result, date: new Date().toLocaleString() };
  const prev = JSON.parse(localStorage.getItem("ranking") || "[]");
  localStorage.setItem("ranking", JSON.stringify([...prev, score]));
}

export default App;