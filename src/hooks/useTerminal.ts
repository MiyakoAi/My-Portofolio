import { useState, useCallback } from 'react';
import { navigationItems } from '../constants/navigation';
import { personalInfo } from '../constants/personalInfo';

interface TerminalLine {
  id: string;
  command?: string;
  output: string;
  type: 'command' | 'output' | 'error' | 'success';
  timestamp: Date;
}

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: '1',
      output: `Welcome to ${personalInfo.name}'s Portfolio Terminal`,
      type: 'success',
      timestamp: new Date()
    },
    {
      id: '2',
      output: 'Type "help" to see available commands.',
      type: 'output',
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addLine = useCallback((line: Omit<TerminalLine, 'id' | 'timestamp'>) => {
    const newLine: TerminalLine = {
      ...line,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setHistory(prev => [...prev, newLine]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
    // Add command line to terminal
    addLine({
      command: command,
      output: `$ ${command}`,
      type: 'command'
    });

    // Execute command
    switch (trimmedCommand) {
      case 'help':
        addLine({
          output: 'Available commands:\n' +
            navigationItems.map(item => 
              `  ${item.command.padEnd(15)} - ${item.description}`
            ).join('\n') +
            '\n  clear             - Clear the terminal\n' +
            '  theme             - Toggle theme\n' +
            '  github            - Open GitHub profile',
          type: 'output'
        });
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'whoami':
        window.location.href = '/';
        break;

      case 'cat about.md':
        window.location.href = '/about';
        break;

      case 'ls projects/':
        window.location.href = '/projects';
        break;

      case 'which skills':
        window.location.href = '/skills';
        break;

      case 'curl contact.json':
        window.location.href = '/contact';
        break;

      case 'github':
        window.open(personalInfo.github, '_blank');
        addLine({
          output: 'Opening GitHub profile...',
          type: 'success'
        });
        break;

      case 'theme':
        addLine({
          output: 'Theme toggle functionality will be implemented.',
          type: 'output'
        });
        break;

      default:
        addLine({
          output: `Command not found: ${trimmedCommand}\nType "help" to see available commands.`,
          type: 'error'
        });
    }
  }, [addLine]);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;

    let newIndex = historyIndex;
    
    if (direction === 'up') {
      newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
    } else {
      newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
    }

    setHistoryIndex(newIndex);
    setCurrentInput(newIndex === -1 ? '' : commandHistory[newIndex]);
  }, [commandHistory, historyIndex]);

  return {
    history,
    currentInput,
    setCurrentInput,
    executeCommand,
    navigateHistory,
    addLine
  };
};