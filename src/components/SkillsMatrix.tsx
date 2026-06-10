import { skillGroups, type SkillTier } from '@/data/skills';
import { SectionHeading } from './ui/SectionHeading';

const tierDots: Record<SkillTier, string> = {
  daily: '●●●',
  comfortable: '●●○',
  familiar: '●○○',
};

export function SkillsMatrix() {
  return (
    <section id="skills" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="06"
          label="Skills"
          title="What I work with"
          description="Grouped by what the role needs, tiered by honest depth instead of a wall of logos."
        />

        <div className="grid md:grid-cols-3 gap-10">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-5">
                {group.title}
              </h3>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 last:border-b text-sm"
                  >
                    <span className="text-zinc-700 dark:text-zinc-300">{item.name}</span>
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] text-emerald-600 dark:text-emerald-400 shrink-0"
                      title={item.tier}
                      aria-label={item.tier}
                    >
                      {tierDots[item.tier]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs text-zinc-500 dark:text-zinc-500">
          ●●● use daily &nbsp;·&nbsp; ●●○ comfortable shipping &nbsp;·&nbsp; ●○○ have used, would ramp fast
        </p>
      </div>
    </section>
  );
}
