/**
 * Custom hook for tracking scroll position
 * Used for navbar state changes on scroll
 */

import { useEffect, useState } from 'react';

export function useScrollProgress(threshold: number = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, scrolled]);

  return scrolled;
}
