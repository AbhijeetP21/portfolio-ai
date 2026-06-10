import Link from 'next/link';
import { projects } from '@/data/projects';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';
import { Icon } from './ui/Icon';

function ProjectLinks({ links }: { links: NonNullable<(typeof projects)[number]['links']> }) {
  return (
    <div className="flex flex-wrap items-center gap-5 text-sm">
      {links.writeup && (
        <Link
          href={links.writeup}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <Icon name="file-text" size={13} />
          Writeup
        </Link>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <Icon name="github" size={13} />
          Code
        </a>
      )}
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <Icon name="arrow-up-right" size={13} />
          Live
        </a>
      )}
    </div>
  );
}

export function Work() {
  const featured = projects.filter((p) => p.featured && p.status === 'shipped');
  const rest = projects.filter((p) => !p.featured && p.status === 'shipped');

  return (
    <section id="work" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="01"
          label="Work"
          title="Featured projects"
          description="Shipped systems with writeups covering the architecture decisions and tradeoffs behind them."
        />

        {/* Featured showcases */}
        <div className="space-y-6 mb-16">
          {featured.map((project) => (
            <article
              key={project.title}
              data-reveal
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 md:p-10 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="md:grid md:grid-cols-[1fr,260px] md:gap-10">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{project.description}</p>
                  {project.highlights && (
                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((line) => (
                        <li key={line} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                            <Icon name="check" size={14} />
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.links && <ProjectLinks links={project.links} />}
                </div>
                <div className="mt-6 md:mt-0 flex md:flex-col flex-wrap gap-2 md:items-end content-start">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Compact grid for the rest */}
        <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {rest.map((project) => (
            <article key={project.title} className="bg-white dark:bg-zinc-950 p-7 flex flex-col gap-3">
              <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">{project.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              {project.links && <ProjectLinks links={project.links} />}
            </article>
          ))}
        </div>

        <a
          href="https://github.com/AbhijeetP21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 font-mono text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          View all on GitHub
          <Icon name="arrow-up-right" size={12} />
        </a>
      </div>
    </section>
  );
}
