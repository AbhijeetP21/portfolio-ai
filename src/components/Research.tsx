import { publications, patents, awards } from '@/data/patents';
import { SectionHeading } from './ui/SectionHeading';
import { Icon } from './ui/Icon';

export function Research() {
  return (
    <section id="research" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="03"
          label="Research"
          title="Publications & patents"
          description="Peer-reviewed publications and filed patents from undergraduate research in applied AI and security."
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Publications */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-5">
              IEEE Publications
            </h3>
            <ol className="space-y-px">
              {publications.map((pub, idx) => (
                <li key={pub.title}>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800 last:border-b"
                  >
                    <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 pt-1 shrink-0">
                      [{idx + 1}]
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium text-zinc-950 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {pub.title}
                      </span>
                      <span className="block font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-1.5">
                        {pub.venue} · {pub.year}
                      </span>
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pt-1">
                      <Icon name="arrow-up-right" size={14} />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Patents */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-5">
              Patents filed · IP India
            </h3>
            <ol className="space-y-px">
              {patents.map((patent, idx) => (
                <li
                  key={patent.title}
                  className="flex gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800 last:border-b"
                >
                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 pt-1 shrink-0">
                    [{idx + 1}]
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-zinc-950 dark:text-zinc-50">{patent.title}</span>
                    <span className="block font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-1.5">
                      Ref: {patent.reference}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Awards — compact */}
        <div className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-5">
            Honors
          </h3>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {awards.map((award) => (
              <div key={award.title} className="flex gap-3 text-sm">
                <span className="text-zinc-400 dark:text-zinc-600 mt-0.5 shrink-0">
                  <Icon name="award" size={14} />
                </span>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {award.title}
                  <span className="text-zinc-500 dark:text-zinc-500"> — {award.organization}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
