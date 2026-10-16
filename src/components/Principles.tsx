import { SectionHeading } from './ui/SectionHeading';

const principles = [
  'Impatience with actions, patience with results.',
  "You don't have to feel good to get started, but you have to get started to feel good.",
  'Inspiration is a beautiful and powerful thing. When you have it, seize it.',
  "Just go for it. No one cares as much as you think, and in six months, you won't either.",
  'When choosing what to pursue, care more about upside than downside.',
  'Reality is neutral. We shape it with our thoughts and how we see the world.',
  'The first step of any meaningful pursuit is to severely underestimate its difficulty.',
];

export function Principles() {
  return (
    <section id="principles" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading
          index="07"
          label="Principles"
          title="Words I live by"
          description="A few lines I keep coming back to, at work and outside of it."
        />

        <ol className="max-w-3xl">
          {principles.map((line, i) => (
            <li
              key={line}
              className="grid grid-cols-[2.5rem,1fr] gap-4 py-5 border-t border-zinc-200 dark:border-zinc-800 last:border-b"
            >
              <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 pt-1 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
