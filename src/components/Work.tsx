import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';
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
          className="inline-flex items-center gap-1.5 font-mono text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
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
          className="inline-flex items-center gap-1.5 font-mono text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
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
          className="inline-flex items-center gap-1.5 font-mono text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
        >
          <Icon name="arrow-up-right" size={13} />
          Live
        </a>
      )}
    </div>
  );
}

function ProjectVisual({ visual, title }: { visual: NonNullable<Project['visual']>; title: string }) {
  return (
    <figure className="min-w-0 self-start rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {visual.kind === 'screenshot' ? (
        <a href={visual.src} target="_blank" rel="noopener noreferrer" className="block p-3" aria-label={`Open ${title} screenshot full size (new tab)`}>
          <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height}
            sizes="(min-width: 1024px) 274px, (min-width: 768px) 750px, 100vw"
            className="w-full h-auto rounded-md border border-zinc-200 dark:border-zinc-800" />
        </a>
      ) : (
        <ol aria-label={`${title} architecture`} className="p-5">
          {visual.steps.map((step) => (
            <li key={step.title} className="relative border-l-2 border-emerald-200 dark:border-emerald-900 pl-5 pb-6 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.detail}</p>
            </li>
          ))}
        </ol>
      )}
      <figcaption className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {visual.caption}
      </figcaption>
    </figure>
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
              className="interactive-card rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 md:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),300px] lg:gap-10">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5">
                    {project.title}
                  </h3>
                  {project.outcome && (
                    <div className="mb-6 border-l-2 border-emerald-600 dark:border-emerald-400 pl-4">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-3xl font-semibold tracking-tight text-emerald-700 dark:text-emerald-400">
                          {project.outcome.value}
                        </span>
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{project.outcome.label}</span>
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.outcome.context}</p>
                    </div>
                  )}
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                  {project.links && <ProjectLinks links={project.links} />}
                  {project.highlights && (
                    <details className="group mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                      <summary className="cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 rounded">
                        Engineering details
                      </summary>
                      <ul className="space-y-3 mt-4">
                        {project.highlights.map((line) => (
                          <li key={line} className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                            <span className="text-emerald-700 dark:text-emerald-400 mt-1 shrink-0">
                              <Icon name="check" size={14} />
                            </span>
                            {line}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
                {project.visual && <ProjectVisual visual={project.visual} title={project.title} />}
              </div>
            </article>
          ))}
        </div>

        {/* Compact grid for the rest */}
        <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {rest.map((project) => (
            <article key={project.title} className="interactive-card interactive-card-flat bg-white dark:bg-zinc-950 p-7 flex flex-col gap-3">
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
          className="inline-flex items-center gap-2 mt-8 font-mono text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
        >
          View all on GitHub
          <Icon name="arrow-up-right" size={12} />
        </a>
      </div>
    </section>
  );
}
