import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [userOverride, setUserOverride] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_reduced_motion');
      return saved !== null ? saved === 'true' : null;
    }
    return null;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleReducedMotion = () => {
    const nextVal = !(userOverride !== null ? userOverride : prefersReducedMotion);
    setUserOverride(nextVal);
    localStorage.setItem('portfolio_reduced_motion', String(nextVal));
  };

  const isReduced = userOverride !== null ? userOverride : prefersReducedMotion;

  return { isReduced, toggleReducedMotion, userOverride };
}
