'use client';

import { useToast } from '@/contexts/ToastContext';
import { SectionHeading } from './ui/SectionHeading';
import { Icon } from './ui/Icon';

export function Contact() {
  const { displayToast } = useToast();

  const copyEmail = () => {
    navigator.clipboard
      .writeText('abhijeetsp21@gmail.com')
      .then(() => displayToast('Email copied to clipboard'))
      .catch(() => displayToast('Failed to copy email'));
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="07"
          label="Contact"
          title="Let's talk"
          description="I'm looking for AI engineer, ML engineer, and full-stack SWE roles. If you're building something real, I'd like to hear about it. I usually respond within 24 hours."
        />

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:abhijeetsp21@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            <Icon name="mail" size={14} />
            abhijeetsp21@gmail.com
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
          >
            <Icon name="copy" size={14} />
            Copy email
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="https://linkedin.com/in/abhijeet-pachpute/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="linkedin" size={15} />
            LinkedIn
          </a>
          <a
            href="https://github.com/AbhijeetP21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="github" size={15} />
            GitHub
          </a>
          <a
            href="https://scholar.google.com/citations?user=1aG6rS8AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="scholar" size={15} />
            Google Scholar
          </a>
          <a
            href="/Abhijeet_Pachpute_AI_Engineer.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="download" size={15} />
            Resume (AI)
          </a>
          <a
            href="/Abhijeet_Resume_SDE.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="download" size={15} />
            Resume (SDE)
          </a>
        </div>
      </div>
    </section>
  );
}
