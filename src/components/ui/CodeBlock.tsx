import React from 'react';
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
  const { displayText, isComplete } = useTypewriter({
    text: animated ? code : '',
    speed,
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
          {animated ? displayText : code}
          {animated && !isComplete && (
            <span className="text-terminal-green animate-blink">█</span>
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;