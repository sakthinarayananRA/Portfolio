import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('portfolio-theme-mode');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  const [isSystemSync, setIsSystemSync] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !localStorage.getItem('portfolio-theme-mode');
  });

  // Listen to system theme changes automatically
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e) => {
      const currentStored = localStorage.getItem('portfolio-theme-mode');
      // If user hasn't forced a manual preference, follow system changes automatically
      if (!currentStored) {
        const nextSystemTheme = e.matches ? 'dark' : 'light';
        setTheme(nextSystemTheme);
        setIsSystemSync(true);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  // Synchronize document classes and color-scheme attribute
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setIsSystemSync(false);
    localStorage.setItem('portfolio-theme-mode', nextTheme);
  };

  const resetToSystem = () => {
    localStorage.removeItem('portfolio-theme-mode');
    setIsSystemSync(true);
    if (window.matchMedia) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
  };

  return {
    theme,
    isDark: theme === 'dark',
    isSystemSync,
    toggleTheme,
    resetToSystem
  };
}
