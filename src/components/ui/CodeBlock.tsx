import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';

interface CodeBlockProps {
  code: string;
  language: string;
  animated?: boolean;
  speed?: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  animated = false, 
  speed = 30 
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(animated);
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);

  // Once animation starts, let it complete regardless of animated prop changes
  useEffect(() => {
    if (animated && !hasStartedAnimation) {
      setShouldAnimate(true);
      setHasStartedAnimation(true);
    } else if (!animated && !hasStartedAnimation) {
      setShouldAnimate(false);
    }
  }, [animated, hasStartedAnimation]);

  const { displayText, isComplete } = useTypewriter({
    text: shouldAnimate ? code : '',
    speed,
    onComplete: () => {
      // Animation completed, we can now safely disable animation
      setShouldAnimate(false);
    }
  });

  return (
    <div className="bg-gray-900 border border-terminal-border rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-terminal-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-400 font-mono">
          {language}
        </div>
        <div className="w-20"></div>
      </div>
      
      <div className="p-4 font-mono text-sm text-terminal-text">
        <pre className="whitespace-pre-wrap">
          {shouldAnimate ? displayText : code}
          {shouldAnimate && !isComplete && (
            <span className="text-terminal-green animate-blink">█</span>
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;