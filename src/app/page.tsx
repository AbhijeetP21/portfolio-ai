'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Work } from '@/components/Work';
import { NowBuilding } from '@/components/NowBuilding';
import { Research } from '@/components/Research';
import { Experience } from '@/components/Experience';
import { WritingStrip } from '@/components/WritingStrip';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Toast } from '@/components/Toast';
import { ToastProvider } from '@/contexts/ToastContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();

  return (
    <ToastProvider>
      {/* Skip link for keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Work />
        <NowBuilding />
        <Research />
        <Experience />
        <WritingStrip />
        <SkillsMatrix />
        <Education />
        <Contact />
      </main>
      <Toast />
      <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800/80">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Abhijeet Sandip Pachpute</p>
          <p>United States</p>
        </div>
      </footer>
    </ToastProvider>
  );
}
