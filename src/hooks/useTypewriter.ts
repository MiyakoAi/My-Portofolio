import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriter = ({ 
  text, 
  speed = 100, 
  delay = 0,
  onComplete 
}: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!text || hasStarted) return;

    const startTyping = () => {
      setHasStarted(true);
      setIsTyping(true);
      let currentIndex = 0;

      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          setIsComplete(true);
          clearInterval(timer);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(timer);
    };

    const delayTimer = setTimeout(startTyping, delay);
    return () => clearTimeout(delayTimer);
  }, [text, speed, delay, onComplete, hasStarted]);

  return { displayText, isTyping, isComplete };
};