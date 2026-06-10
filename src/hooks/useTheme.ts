'use client';

import { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { setTheme, resolvedTheme } = useNextTheme();

  // True only after hydration, so the first client render matches the server
  // HTML (which can't know the resolved theme).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme: (resolvedTheme || 'dark') as 'light' | 'dark',
    toggleTheme,
    mounted,
  };
}
