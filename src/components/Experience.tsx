import { experiences } from '@/data/experience';
import { SectionHeading } from './ui/SectionHeading';

export function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="04"
          label="Experience"
          title="Where I've worked"
          description="AI engineering, security, and backend systems across internships and research roles."
        />

        <div>
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.date}`}
              className="grid md:grid-cols-[200px,1fr] gap-2 md:gap-10 py-8 border-t border-zinc-200 dark:border-zinc-800 last:border-b"
            >
              <div>
                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500">{exp.date}</p>
                <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mt-1">{exp.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">{exp.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5 mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <span className="text-zinc-300 dark:text-zinc-700 shrink-0 select-none">—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
