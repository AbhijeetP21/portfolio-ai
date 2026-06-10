import { Icon } from './ui/Icon';

export function Hero() {
  return (
    <section className="pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Status line — links to the in-progress work */}
        <a
          href="#building"
          className="inline-flex items-center gap-2.5 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          building now: healthcare-rag · autonomous-web-agent
        </a>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08] text-zinc-950 dark:text-zinc-50 mb-6">
          I build AI systems
          <br />
          <span className="text-zinc-500 dark:text-zinc-400">that hold up in production.</span>
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-6">
          I&apos;m <span className="text-zinc-950 dark:text-zinc-100 font-medium">Abhijeet Sandip Pachpute</span>, MS
          in Computer Science, University of Utah (&rsquo;26). I ship LLM systems end to end: retrieval, agents,
          evals, and the backend engineering that keeps them reliable.
        </p>

        <p className="font-mono text-sm text-zinc-500 dark:text-zinc-500 mb-10">
          2 IEEE publications · 3 patents filed · prev: AI engineering @ AVI Human Services
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 text-sm font-medium hover:opacity-85 transition-opacity"
          >
            View work
            <Icon name="arrow-right" size={14} />
          </a>
          <a
            href="/Abhijeet_Resume_SDE_June26.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
          >
            Resume
            <Icon name="download" size={14} />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="mailto:abhijeetsp21@gmail.com"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="mail" size={15} />
            Email
          </a>
          <a
            href="https://linkedin.com/in/abhijeet-pachpute/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="linkedin" size={15} />
            LinkedIn
          </a>
          <a
            href="https://github.com/AbhijeetP21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="github" size={15} />
            GitHub
          </a>
          <a
            href="https://scholar.google.com/citations?user=1aG6rS8AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon name="scholar" size={15} />
            Scholar
          </a>
        </div>
      </div>
    </section>
  );
}
