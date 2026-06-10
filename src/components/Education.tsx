import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';

const coursework = [
  'Graduate Algorithms',
  'Operating Systems',
  'Computer Architecture',
  'Security & Privacy',
  'Machine Learning Security',
  'Deep Learning',
  'Neuro-Symbolic Modeling',
  'Manage Data with ML',
];

export function Education() {
  return (
    <section id="education" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading index="07" label="Education" title="Education" />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">University of Utah</h3>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 shrink-0">2024 – 2026</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">MS in Computer Science · Salt Lake City, UT, USA</p>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-2">
              Completed May 2026 · GPA 3.7/4.0
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {coursework.map((course) => (
                <Tag key={course}>{course}</Tag>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Savitribai Phule Pune University</h3>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 shrink-0">2019 – 2023</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">BE in Computer Engineering · Pune, India</p>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-2">GPA 8.7/10</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-3">
                <span className="text-zinc-300 dark:text-zinc-700 shrink-0 select-none">—</span>
                2 IEEE papers and 3 patents from undergraduate research
              </li>
              <li className="flex gap-3">
                <span className="text-zinc-300 dark:text-zinc-700 shrink-0 select-none">—</span>
                Co-founder & Vice President of Meraki; Research & Innovation Cell
              </li>
              <li className="flex gap-3">
                <span className="text-zinc-300 dark:text-zinc-700 shrink-0 select-none">—</span>
                Cybersecurity awareness program at Pune Cyber Police Cell
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
