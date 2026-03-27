import { useState, useEffect, useCallback } from 'react';

const gamingChars = '01UNITYC#GAMEJAMDEV';

interface UseTextScrambleOptions {
  text: string;
  trigger?: boolean;
  speed?: number;
  delay?: number;
}

export const useTextScramble = ({
  text,
  trigger = true,
  speed = 50,
  delay = 0,
}: UseTextScrambleOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = text.length * 3;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return text[index];
            }
            return gamingChars[Math.floor(Math.random() * gamingChars.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (!trigger) {
      setDisplayText('');
      setIsComplete(false);
      return;
    }

    const timer = setTimeout(() => {
      scramble();
    }, delay);

    return () => clearTimeout(timer);
  }, [trigger, scramble, delay]);

  return { displayText, isComplete };
};

export default useTextScramble;
