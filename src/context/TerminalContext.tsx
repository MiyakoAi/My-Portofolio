import React, { createContext, useState, useCallback } from 'react';
import { navigationItems } from '../constants/navigation';
import { personalInfo } from '../constants/personalInfo';

interface TerminalLine {
  id: string;
  command?: string;
  output: string;
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  timestamp: Date;
}

interface TerminalContextType {
  history: TerminalLine[];
  currentInput: string;
  setCurrentInput: (input: string) => void;
  executeCommand: (command: string) => void;
  clearHistory: () => void;
  isTerminalFocused: boolean;
  setTerminalFocused: (focused: boolean) => void;
  navigateHistory: (direction: 'up' | 'down') => void;
}

export const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: '1',
      output: `Welcome to ${personalInfo.name}'s Portfolio Terminal v2.0`,
      type: 'success',
      timestamp: new Date()
    },
    {
      id: '2',
      output: 'System initialized successfully. Type "help" to see available commands.',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '3',
      output: '---',
      type: 'output',
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [isTerminalFocused, setTerminalFocused] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lineCounter, setLineCounter] = useState(4); // Start from 4 since we have 3 initial lines

  const addLine = useCallback((line: Omit<TerminalLine, 'id' | 'timestamp'>) => {
    const newLine: TerminalLine = {
      ...line,
      id: `line-${lineCounter}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    setLineCounter(prev => prev + 1);
    setHistory(prev => [...prev, newLine]);
  }, [lineCounter]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    // Add command to command history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
    // Add command to terminal history
    addLine({
      command: command,
      output: `${personalInfo.name.toLowerCase().replace(' ', '')}@portfolio:~$ ${command}`,
      type: 'command'
    });

    // Execute command
    switch (trimmedCommand) {
      case 'help':
        addLine({
          output: 'Available commands:\n\n' +
            'Navigation:\n' +
            navigationItems.map(item => 
              `  ${item.command.padEnd(18)} - ${item.description}`
            ).join('\n') +
            '\n\nSystem Commands:\n' +
            '  clear                  - Clear terminal screen\n' +
            '  history                - Show command history\n' +
            '  date                   - Show current date and time\n' +
            '  echo <message>         - Print message to screen\n' +
            '\nExternal Links:\n' +
            '  github                 - Open GitHub profile\n' +
            '  linkedin               - Open LinkedIn profile\n' +
            '  email                  - Open email client\n' +
            '\nFun Commands:\n' +
            '  ascii                  - Show ASCII art\n' +
            '  joke                   - Get a programming joke\n' +
            '  quote                  - Get an inspirational quote',
          type: 'output'
        });
        break;

      case 'clear':
        clearHistory();
        break;

      case 'history': {
        const commands = history.filter(line => line.command).slice(-10);
        addLine({
          output: commands.length > 0 
            ? `Recent commands:\n${commands.map((line, index) => `  ${index + 1}. ${line.command}`).join('\n')}`
            : 'No command history available.',
          type: 'output'
        });
        break;
      }

      case 'date':
        addLine({
          output: new Date().toLocaleString(),
          type: 'output'
        });
        break;

      case 'whoami':
        window.location.href = '/';
        addLine({
          output: 'Navigating to home page...',
          type: 'success'
        });
        break;

      case 'cat about.md':
        window.location.href = '/about';
        addLine({
          output: 'Loading about page...',
          type: 'success'
        });
        break;

      case 'ls projects/':
        window.location.href = '/projects';
        addLine({
          output: 'Listing projects...',
          type: 'success'
        });
        break;

      case 'which skills':
        window.location.href = '/skills';
        addLine({
          output: 'Displaying skills matrix...',
          type: 'success'
        });
        break;

      case 'find certificates/':
        window.location.href = '/certificates';
        addLine({
          output: 'Fetching certificates...',
          type: 'success'
        });
        break;

      case 'curl contact.json':
        window.location.href = '/contact';
        addLine({
          output: 'Fetching contact information...',
          type: 'success'
        });
        break;

      case 'github':
        window.open(personalInfo.github, '_blank');
        addLine({
          output: 'Opening GitHub profile in new tab...',
          type: 'success'
        });
        break;

      case 'linkedin':
        window.open(personalInfo.linkedin, '_blank');
        addLine({
          output: 'Opening LinkedIn profile in new tab...',
          type: 'success'
        });
        break;

      case 'email':
        window.location.href = `mailto:${personalInfo.email}`;
        addLine({
          output: 'Opening email client...',
          type: 'success'
        });
        break;

      case 'ascii':
        addLine({
          output: `
              ╔═════════════════════════════════════╗
              ║             I am Gonna..            ║
              ║                                     ║
              ║     Hatsune Miku is My Wife         ║
              ║     Hatsune Miku is Beautifull      ║
              ║     Hatsune Miku is My Motivasion   ║
              ║                                     ║
              ║   "Tolong jangan claim istri saya!" ║
              ╚═════════════════════════════════════╝`,
          type: 'output'
        });
        break;

      case 'joke': {
        const jokes = [
          "Why do programmers prefer dark mode?\nBecause light attracts bugs!",
          "How many programmers does it take to change a light bulb?\nNone. That's a hardware problem!",
          "Why do Java developers wear glasses?\nBecause they can't C#",
          "There are only 10 types of people in the world:\nthose who understand binary and those who don't!"
        ];
        addLine({
          output: jokes[Math.floor(Math.random() * jokes.length)],
          type: 'output'
        });
        break;
      }

      case 'quote': {
        const quotes = [
          '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"The best error message is the one that never shows up." - Thomas Fuchs',
          '"Experience is the name everyone gives to their mistakes." - Oscar Wilde'
        ];
        addLine({
          output: quotes[Math.floor(Math.random() * quotes.length)],
          type: 'output'
        });
        break;
      }

      default:
        if (trimmedCommand.startsWith('echo ')) {
          const message = command.slice(5);
          addLine({
            output: message,
            type: 'output'
          });
        } else {
          addLine({
            output: `Command not found: ${trimmedCommand}\n\nDid you mean one of these?\n${
              navigationItems.map(item => `  • ${item.command}`).join('\n')
            }\n\nType "help" for a complete list of available commands.`,
            type: 'error'
          });
        }
    }
  }, [addLine, clearHistory, history]);

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

  return (
    <TerminalContext.Provider 
      value={{
        history,
        currentInput,
        setCurrentInput,
        executeCommand,
        clearHistory,
        isTerminalFocused,
        setTerminalFocused,
        navigateHistory
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};