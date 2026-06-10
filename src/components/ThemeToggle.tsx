'use client';

import { useTheme } from '@/hooks/useTheme';
import { Icon } from './ui/Icon';

interface ThemeToggleProps {
  mobile?: boolean;
}

export function ThemeToggle({ mobile = false }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const base =
    'rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors';

  if (!mounted) {
    return (
      <button
        className={`w-9 h-9 grid place-items-center ${base} ${mobile ? 'md:hidden' : ''}`}
        aria-label="Toggle theme"
      >
        <Icon name="moon" size={15} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={
        mobile
          ? `px-5 py-3 flex items-center gap-3 ${base}`
          : `w-9 h-9 grid place-items-center ${base}`
      }
      aria-label="Toggle theme"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
      {mobile && <span className="text-base">Toggle theme</span>}
    </button>
  );
}
