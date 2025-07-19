import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls to top of page when route changes.
 * This ensures users start at the top of each new page
 * instead of maintaining scroll position from previous page.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Smooth scrolling animation
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
