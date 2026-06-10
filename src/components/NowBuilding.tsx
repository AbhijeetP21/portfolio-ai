import Link from 'next/link';
import { projects } from '@/data/projects';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';
import { Icon } from './ui/Icon';

export function NowBuilding() {
  const inProgress = projects.filter((p) => p.status === 'in-progress');

  return (
    <section id="building" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="02"
          label="Now building"
          title="In progress"
          description="Active builds, shown as they are rather than as finished products."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {inProgress.map((project) => (
            <article
              key={project.title}
              data-reveal
              className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                  in progress
                </span>
                {project.links?.writeup && (
                  <Link
                    href={project.links.writeup}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Icon name="file-text" size={13} />
                    Writeup
                  </Link>
                )}
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.description}</p>

              {project.progress && (
                <dl className="space-y-2 font-mono text-xs leading-relaxed">
                  <div className="flex gap-2">
                    <dt className="text-emerald-600 dark:text-emerald-400 shrink-0">done</dt>
                    <dd className="text-zinc-600 dark:text-zinc-400">{project.progress.done}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-zinc-400 dark:text-zinc-500 shrink-0">next</dt>
                    <dd className="text-zinc-600 dark:text-zinc-400">{project.progress.next}</dd>
                  </div>
                </dl>
              )}

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
