import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface PageVisitContextType {
  visitedPages: Set<string>;
  markPageAsVisited: (page: string) => void;
  isPageVisited: (page: string) => boolean;
  resetVisitedPages: () => void;
}

const PageVisitContext = createContext<PageVisitContextType | undefined>(undefined);

interface PageVisitProviderProps {
  children: ReactNode;
}

export const PageVisitProvider: React.FC<PageVisitProviderProps> = ({ children }) => {
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());
  const [sessionId] = useState(() => Date.now().toString()); // Unique session ID

  // Reset visited pages on app startup/refresh
  useEffect(() => {
    // Clear any existing visited pages on mount (app restart)
    setVisitedPages(new Set());
    
    // Store session ID to detect fresh page loads
    const currentSessionId = sessionStorage.getItem('sessionId');
    if (currentSessionId !== sessionId) {
      sessionStorage.setItem('sessionId', sessionId);
      setVisitedPages(new Set());
    }
    
    // Also listen for page unload to ensure fresh start on refresh
    const handleBeforeUnload = () => {
      // This will ensure the state is clean on page refresh
      sessionStorage.removeItem('sessionId');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionId]);

  const markPageAsVisited = (page: string) => {
    setVisitedPages(prev => new Set(prev).add(page));
  };

  const isPageVisited = (page: string) => {
    return visitedPages.has(page);
  };

  const resetVisitedPages = () => {
    setVisitedPages(new Set());
  };

  return (
    <PageVisitContext.Provider value={{
      visitedPages,
      markPageAsVisited,
      isPageVisited,
      resetVisitedPages
    }}>
      {children}
    </PageVisitContext.Provider>
  );
};

export const usePageVisit = () => {
  const context = useContext(PageVisitContext);
  if (context === undefined) {
    throw new Error('usePageVisit must be used within a PageVisitProvider');
  }
  return context;
};
