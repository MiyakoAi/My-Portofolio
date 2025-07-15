import { useContext } from 'react';
import { TerminalContext } from '../context/TerminalContext';

export const useTerminalContext = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminalContext must be used within a TerminalProvider');
  }
  return context;
};
