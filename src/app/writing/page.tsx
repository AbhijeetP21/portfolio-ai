'use client';

import Link from 'next/link';
import { posts } from '@/data/writing';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export default function WritingPage() {
  const sorted = [...posts].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'published' ? -1 : 1;
    return b.date.localeCompare(a.date);
  });

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-200/60 dark:border-zinc-800/60">
        <nav className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-lg font-bold tracking-tighter text-zinc-950 dark:text-zinc-50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            ap<span className="text-emerald-600 dark:text-emerald-400">.</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
            >
              <span className="hidden sm:inline">Back to portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="min-h-screen pt-36 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-3">
              Writing
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Technical deep-dives
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Architecture decisions, tradeoffs, and lessons learned from the things I build.
            </p>
          </div>

          <div>
            {sorted.map((post) => {
              const row = (
                <div className="grid md:grid-cols-[120px,1fr,auto] gap-2 md:gap-8 py-7 items-baseline">
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">{formatDate(post.date)}</span>
                  <span>
                    <span className="flex flex-wrap items-baseline gap-3">
                      <span
                        className={`font-medium text-zinc-950 dark:text-zinc-50 ${
                          post.status === 'published'
                            ? 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors'
                            : ''
                        }`}
                      >
                        {post.title}
                      </span>
                      {post.status === 'coming-soon' && (
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-600 shrink-0">
                          coming soon
                        </span>
                      )}
                    </span>
                    <span className="block text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                      {post.description}
                    </span>
                    <span className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </span>
                  </span>
                  <span className="hidden md:block font-mono text-xs text-zinc-400 dark:text-zinc-600">
                    {post.readTime}
                  </span>
                </div>
              );

              if (post.status === 'published') {
                return (
                  <Link
                    key={post.slug}
                    href={`/writing/${post.slug}`}
                    className="group block border-t border-zinc-200 dark:border-zinc-800 last:border-b"
                  >
                    {row}
                  </Link>
                );
              }

              return (
                <article
                  key={post.slug}
                  className="block border-t border-zinc-200 dark:border-zinc-800 last:border-b opacity-60"
                >
                  {row}
                </article>
              );
            })}
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 mt-10 font-mono text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            More posts in the works. Say hello in the meantime
            <Icon name="arrow-right" size={12} />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800/80">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Abhijeet Sandip Pachpute</p>
          <p>United States</p>
        </div>
      </footer>
    </>
  );
}
