'use client';

import { useToast } from '@/contexts/ToastContext';
import { Icon } from './ui/Icon';

export function Toast() {
  const { toastMessage, showToast } = useToast();

  return (
    <div
      className={`fixed bottom-5 right-5 bg-zinc-950 dark:bg-zinc-900 text-zinc-50 px-5 py-3 rounded-lg border border-zinc-800 flex items-center gap-3 z-50 transform transition-all duration-300 ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <span className="text-emerald-400">
        <Icon name="check" size={15} />
      </span>
      <span className="text-sm">{toastMessage || 'Done'}</span>
    </div>
  );
}
