import "../App.css";

interface Props {
  onGuess: (letter: string) => void;
  guessed: string[];
  disabled: boolean;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Keyboard({ onGuess, guessed, disabled }: Props) {
  return (
    <div className="keyboard">
      {LETTERS.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter.toLowerCase())}
          className="keyboard-button"
          disabled={guessed.includes(letter.toLowerCase()) || disabled}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
