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
      output: `Welcome to Terminal v2.0`,
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
              ║             My Bini                 ║
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
          "Ular ular apa yang lurus?\nUlar makan linggis hahaha\nketawa dong gue lagi ngelawak ini",
          "Sapi, sapi apa yang warna biru?\nSapidol hahahaha\nKetawa gak loooo?!",
          "Kenapa ayam menyebrang jalan?\nKarena mau ke seberang hahaha\nKetawa dong gue lagi ngelawak ini",
          "Kenapa kucing suka tidur di keyboard?\nKarena dia mau nge-'cat' hahaha\nBener gak lo?",
          "Ikan, ikan apa yang bisa terbang?\nIkan gabus!\nKetawa, dong! Gak lucu ya? Ya udah, yang penting usaha.",
          "Burung, burung apa yang bisa ngilang?\nBurung-burung-an! Hahaha, gak lucu ya?",
          "Kuda, kuda apa yang bikin capek?\nKuda-ku rangkul, hahahaha\nCapek kan, ya?",
          "Gajah, gajah apa yang paling baik hati?\nGajah-an banget deh, masa gajah baik hati? Hahaha, ya kali.",
          "Kura-kura, kura-kura apa yang paling ganteng?\nKura-kura-an muka lo, gantengan gue! Hahaha, marah ya?",
          "Naga, naga apa yang paling keren?\nNaga-bungkus nasi, biar makanannya gak tumpah! Hahaha, ketawa dong!",
          "Sebutin, sebutin nama buah yang gak bisa dimakan!\nBuahahaha, lu kira gue dukun? Hahaha.",
          "Ikan, ikan apa yang hobinya kentut?\nIkan-tutan, terus kentutnya bau banget! Hahaha, kok gitu ya?",
          "Anjing, anjing apa yang lurus?\nAnjing, anjingan lo! Ini bukan anjing beneran! Hahaha.",
          "Tikus, tikus apa yang hobinya nge-gym?\nTikus, tikus-bang! Hahaha.",
          "Kenapa nyamuk suka sama darah?\nKarena nyamuk 'malu' kalau suka sama kamu, hahahaha.\nKetawa dong, jangan malu-malu!",
          "Monyet, monyet apa yang bisa ngomong?\nMonyet-monyet yang ada di film, hahahaha.\nGak lucu ya?",
          "Kenapa cicak jatuh dari dinding?\nKarena cicak tidak bisa terbang, hahahaha.\nYa kali.",
          "Gajah, gajah apa yang paling cerdas?\nGajah-a-deh, gak ada gajah yang cerdas, hahahaha.\nSemua gajah sama kok!",
          "Ikan, ikan apa yang bisa bikin nangis?\nIkan, ikan gak bisa bikin nangis, yang bikin nangis itu kalau kamu putus, hahahaha.\nBaper gak?"
        ];
        addLine({
          output: jokes[Math.floor(Math.random() * jokes.length)],
          type: 'output'
        });
        break;
      }

      case 'quote': {
        const quotes = [
          "Teknologi adalah upaya manusia untuk menulis ulang hukum alam—tetapi semakin dalam kita mengukir,\nsemakin jelas terlihat: kita hanya menorehkan tanda tanya di atas takdir yang sudah tertulis..",
          "Kematian bukanlah kegagalan manusia terhadap hukum alam,\nmelainkan tanda bahwa hidup adalah hadiah yang diberi batas—dan justru dalam batas itulah makna ditemukan.",
          "Manusia bukan hanya makhluk individu, tapi juga bagian dari masyarakat dan hukum alam.\nKebahagiaan pribadi tidak bisa mengabaikan tanggung jawab terhadap keturunan dan norma sosial.",
          'Kita membangun peradaban di atas keyakinan bahwa hukum alam bisa direvisi—hingga suatu hari,\nbanjir besar datang mengingatkan:\n"yang kita ubah hanyalah diri kita sendiri, bukan aturan semesta."',
          "Kita menyebutnya 'inovasi' ketika mencoba membekukan waktu, menghidupkan yang mati, atau menciptakan surga di bumi\npadahal itu hanyalah cara lain untuk berlari di tempat, sambil langit menertawakan drama kita.",
          "Kita adalah cara alam mengenali dirinya sendiri—dan ketika kita memberontak,\nitu hanyalah alam yang sedang menari dengan gerakan yang kita sebut 'kemajuan'.",
          'Kita tidak pernah benar-benar "menang" melawan hukum alam karena hukum alam bukanlah musuh yang bisa dikalahkan, melainkan fondasi eksistensi itu sendiri. '
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