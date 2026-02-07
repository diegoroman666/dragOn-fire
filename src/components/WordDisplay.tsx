interface Props {
  word: string;
  guessedLetters: string[];
}

export default function WordDisplay({ word, guessedLetters }: Props) {
  return (
    <div style={{ fontSize: '2rem', letterSpacing: '10px' }}>
      {word.split('').map((letter, i) => (
        <span key={i}>
          {guessedLetters.includes(letter) ? letter : "_"}
        </span>
      ))}
    </div>
  );
}
