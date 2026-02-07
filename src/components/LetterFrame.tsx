import { useMemo, useCallback, type ReactNode } from "react";
import "../App.css";

// Todas las letras del alfabeto
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface LetterFrameProps {
  word: string;
  guessedLetters: string[];
  onLetterClick?: (letter: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

export default function LetterFrame({ 
  word, 
  guessedLetters,
  onLetterClick,
  disabled = false,
  children
}: LetterFrameProps) {
  // Obtener letras únicas de la palabra (para verificar cuáles están en la palabra)
  const lettersInWord = useMemo(() => {
    return new Set(word.toLowerCase().split(''));
  }, [word]);

  // Calcular posiciones de las letras en un CUADRADO alrededor de la imagen
  const getLetterPositions = useCallback(() => {
    const totalLetters = ALPHABET.length;
    const lettersPerSide = Math.ceil(totalLetters / 4);
    
    const positions: Array<{
      letter: string;
      style: React.CSSProperties;
      isGuessed: boolean;
      isInWord: boolean;
    }> = [];
    
    // Dimensiones del cuadrado (porcentaje)
    const minX = 5;
    const maxX = 95;
    const minY = 5;
    const maxY = 95;
    
    const stepX = (maxX - minX) / (lettersPerSide - 1 || 1);
    const stepY = (maxY - minY) / (lettersPerSide - 1 || 1);
    
    let letterIndex = 0;
    
    // Lado superior (de izquierda a derecha)
    for (let i = 0; i < lettersPerSide && letterIndex < totalLetters; i++) {
      const letter = ALPHABET[letterIndex++];
      const isGuessed = guessedLetters.includes(letter.toLowerCase());
      const isInWord = lettersInWord.has(letter.toLowerCase());
      
      positions.push({
        letter,
        style: {
          left: `${minX + i * stepX}%`,
          top: `${minY}%`,
          transform: 'translate(-50%, -50%)',
        },
        isGuessed,
        isInWord
      });
    }
    
    // Lado derecho (de arriba a abajo)
    for (let i = 1; i < lettersPerSide && letterIndex < totalLetters; i++) {
      const letter = ALPHABET[letterIndex++];
      const isGuessed = guessedLetters.includes(letter.toLowerCase());
      const isInWord = lettersInWord.has(letter.toLowerCase());
      
      positions.push({
        letter,
        style: {
          left: `${maxX}%`,
          top: `${minY + i * stepY}%`,
          transform: 'translate(-50%, -50%)',
        },
        isGuessed,
        isInWord
      });
    }
    
    // Lado inferior (de derecha a izquierda)
    for (let i = lettersPerSide - 2; i >= 0 && letterIndex < totalLetters; i--) {
      const letter = ALPHABET[letterIndex++];
      const isGuessed = guessedLetters.includes(letter.toLowerCase());
      const isInWord = lettersInWord.has(letter.toLowerCase());
      
      positions.push({
        letter,
        style: {
          left: `${minX + i * stepX}%`,
          top: `${maxY}%`,
          transform: 'translate(-50%, -50%)',
        },
        isGuessed,
        isInWord
      });
    }
    
    // Lado izquierdo (de abajo a arriba)
    for (let i = lettersPerSide - 2; i > 0 && letterIndex < totalLetters; i--) {
      const letter = ALPHABET[letterIndex++];
      const isGuessed = guessedLetters.includes(letter.toLowerCase());
      const isInWord = lettersInWord.has(letter.toLowerCase());
      
      positions.push({
        letter,
        style: {
          left: `${minX}%`,
          top: `${minY + i * stepY}%`,
          transform: 'translate(-50%, -50%)',
        },
        isGuessed,
        isInWord
      });
    }
    
    return positions;
  }, [guessedLetters, lettersInWord]);

  const letterPositions = useMemo(() => getLetterPositions(), [getLetterPositions]);

  return (
    <div className="letter-frame-container">
      {letterPositions.map(({ letter, style, isGuessed, isInWord }) => {
        const isDisabled = disabled || isGuessed;
        
        return (
          <div
            key={letter}
            className={`letter-frame-item-circle ${isGuessed ? (isInWord ? 'revealed-correct' : 'revealed-wrong') : 'available'} ${!isDisabled ? 'clickable' : ''}`}
            style={style}
            onClick={() => !isDisabled && onLetterClick?.(letter.toLowerCase())}
          >
            {letter}
          </div>
        );
      })}
      {/* La imagen/children en el centro */}
      <div className="letter-frame-center">
        {children}
      </div>
    </div>
  );
}
