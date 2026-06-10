import Link from 'next/link';
import { posts } from '@/data/writing';
import { SectionHeading } from './ui/SectionHeading';
import { Icon } from './ui/Icon';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function WritingStrip() {
  const recent = posts
    .filter((post) => post.status === 'published')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section id="writing" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="05"
          label="Writing"
          title="Recent writing"
          description="Technical deep-dives on the projects above: architecture decisions, tradeoffs, and postmortems."
        />

        <div>
          {recent.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group grid md:grid-cols-[120px,1fr,auto] gap-2 md:gap-8 py-6 border-t border-zinc-200 dark:border-zinc-800 last:border-b items-baseline"
            >
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">{formatDate(post.date)}</span>
              <span>
                <span className="block font-medium text-zinc-950 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </span>
                <span className="block text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {post.description}
                </span>
              </span>
              <span className="hidden md:block font-mono text-xs text-zinc-400 dark:text-zinc-600">
                {post.readTime}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/writing"
          className="inline-flex items-center gap-2 mt-8 font-mono text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          All writing
          <Icon name="arrow-right" size={12} />
        </Link>
      </div>
    </section>
  );
}
