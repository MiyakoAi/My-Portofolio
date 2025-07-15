import React, { useRef, useEffect } from 'react';
import { useTerminalContext } from '../../hooks/useTerminalContext';
import { personalInfo, terminalPrompt } from '../../constants/personalInfo';

const Terminal: React.FC = () => {
  const {
    history,
    currentInput,
    setCurrentInput,
    executeCommand,
    navigateHistory
  } = useTerminalContext();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        navigateHistory('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateHistory('down');
        break;
      case 'Tab':
        e.preventDefault();
        // TODO: Implement auto-completion
        break;
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-terminal-blue';
      case 'error':
        return 'text-terminal-red';
      case 'success':
        return 'text-terminal-green';
      default:
        return 'text-terminal-text';
    }
  };

  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-terminal-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-400 font-mono">
          {personalInfo.name}@portfolio:~
        </div>
        <div className="w-20"></div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {/* History */}
        {history.map((line) => (
          <div key={line.id} className="mb-1">
            {line.command && (
              <div className="text-terminal-blue">
                {terminalPrompt} {line.command}
              </div>
            )}
            <pre className={`whitespace-pre-wrap ${getLineColor(line.type)}`}>
              {line.output}
            </pre>
          </div>
        ))}

        {/* Current Input */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-terminal-green mr-2">{terminalPrompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-terminal-text caret-terminal-green"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="text-terminal-green animate-blink">█</span>
        </form>
      </div>
    </div>
  );
};

export default Terminal;