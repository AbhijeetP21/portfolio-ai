export function About() {
  return (
    <section id="about" className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="max-w-2xl space-y-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            I&apos;m Abhijeet Sandip Pachpute, Abhi for short. I&apos;m an AI engineer at Paxel AI, a pharma sales
            intelligence startup, where I build the governed AI assistant that lets field sales reps ask plain-English
            questions of their own sales data. My background spans applied LLM engineering, full-stack development,
            and security.
          </p>
          <p>
            I started in India, where my undergraduate research produced two IEEE publications and three filed
            patents, then moved to the U.S. and completed my MS in Computer Science at the University of Utah (May
            2026, 3.7 GPA), going deeper on systems, algorithms, and applied AI.
          </p>
          <p>
            Most of my work today sits where LLMs meet real production data: agents that are grounded in governed
            data, safe to run against a live database, and measured by evals rather than demos.
          </p>
        </div>
      </div>
    </section>
  );
}
