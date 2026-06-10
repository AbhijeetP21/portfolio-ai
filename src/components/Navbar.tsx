'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './ui/Icon';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();

    setTimeout(
      () => {
        if (href === '#' || href === '') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
      isMenuOpen ? 300 : 0
    );
  };

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#building', label: 'Building' },
    { href: '#research', label: 'Research' },
    { href: '#experience', label: 'Experience' },
    { href: '/writing', label: 'Writing', isPage: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-200/60 dark:border-zinc-800/60'
            : 'py-5 bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="font-mono text-lg font-bold tracking-tighter text-zinc-950 dark:text-zinc-50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            ap<span className="text-emerald-600 dark:text-emerald-400">.</span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </a>
              )
            )}

            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 hover:opacity-85 transition-opacity"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div
            className={`md:hidden flex items-center gap-4 transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-9 h-9 grid place-items-center text-zinc-700 dark:text-zinc-300"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={closeMenu}
            className="absolute top-5 right-5 w-10 h-10 grid place-items-center text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            aria-label="Close menu"
          >
            <Icon name="close" size={20} />
          </button>

          <nav className="flex flex-col pt-20 px-8">
            {navLinks.map((link, index) =>
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`py-4 text-lg font-medium text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300 ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`py-4 text-lg font-medium text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300 ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  {link.label}
                </a>
              )
            )}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`mt-6 px-6 py-3 text-center text-sm font-medium rounded-lg bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 transition-all duration-300 ${
                isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? `${navLinks.length * 50}ms` : '0ms' }}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
