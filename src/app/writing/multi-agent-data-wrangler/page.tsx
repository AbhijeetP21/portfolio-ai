'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';

function CodeChip({ children }: { children: React.ReactNode }) {
    return (
        <code className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-[13px] font-mono text-emerald-600 dark:text-emerald-400">
            {children}
        </code>
    );
}

export default function MultiAgentDataWranglerArticle() {
    return (
        <>
            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-200/60 dark:border-zinc-800/60">
                <nav className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-mono text-lg font-bold tracking-tighter text-zinc-950 dark:text-zinc-50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                        ap<span className="text-emerald-600 dark:text-emerald-400">.</span>
                    </Link>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link
                            href="/writing"
                            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                        >
                            <span className="hidden sm:inline">Back to writing</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            {/* Article Content */}
            <main className="min-h-screen pt-36 pb-20">
                <article className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto">

                        {/* Article Header */}
                        <header className="mb-16">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-4">
                                Data Engineering
                            </p>

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5 text-zinc-950 dark:text-zinc-50">
                                Building a Multi-Agent Data Wrangling Pipeline
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Making the data cleaning process auditable, configurable, and composable with a DAG-based executor.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Mar 2025 · 8 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['Python', 'Streamlit', 'Pydantic', 'Data Engineering'].map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        {/* Article Body */}
                        <div className="space-y-14">

                            {/* Section: Intro Quote */}
                            <section>
                                <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                    <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        Most data quality tools are monoliths: you feed in a CSV and get back a cleaned version, with no visibility into what changed or why. I wanted something that makes the cleaning process auditable, configurable, and composable &mdash; and that forced me to think about data transformation as a graph problem, not just a list of if-statements.
                                    </p>
                                </blockquote>
                            </section>

                            {/* Section: Why multi-agent */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Why multi-agent for this problem?
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The short answer: the problem decomposes naturally into specialized concerns that shouldn&apos;t bleed into each other. Profiling a dataset requires different logic than generating transformation candidates, and generating candidates requires different logic than validating that those transformations are safe to apply. Cramming that into a single pipeline function creates a mess that&apos;s hard to test and harder to change.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        So I structured it as <strong className="text-zinc-950 dark:text-zinc-50">five distinct agents</strong>: <CodeChip>DataProfiler</CodeChip>, <CodeChip>CandidateGenerator</CodeChip>, <CodeChip>ValidationService</CodeChip>, <CodeChip>QualityScorer</CodeChip>, and <CodeChip>RankingService</CodeChip>.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Each one owns a single contract, takes typed inputs, and returns typed outputs. The <CodeChip>AgentCoordinator</CodeChip> wires them together, and the <CodeChip>PipelineManager</CodeChip> handles iteration, state, and failure. The result is a system where you can swap in a different ranking policy without touching validation logic.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Transformations as a DAG */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Transformations as a DAG
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        One non-obvious design choice was modeling transformations as a <strong className="text-zinc-950 dark:text-zinc-50">DAG (Directed Acyclic Graph)</strong> rather than an ordered list. The reason: some transformations have implicit ordering constraints.
                                    </p>

                                    <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2">
                                            Why ordering matters
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            You should drop duplicates before normalizing, and you should fill missing values before encoding categoricals &mdash; otherwise you risk introducing new nulls or creating spurious categories.
                                        </p>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Making the dependency graph explicit means the executor can respect those constraints without baking ordering assumptions into the application logic itself.
                                    </p>

                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Reversibility</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Transformations also support reversibility. Every applied transformation can be undone, which turned out to be important for the iterative loop: the pipeline runs up to N iterations, and if a candidate transformation reduces the quality score, it gets rolled back instead of committed.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Quality Scoring */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Quality scoring that&apos;s actually meaningful
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Most quality metrics I&apos;ve seen are single-dimensional (e.g. &quot;percent non-null&quot;). Here the scorer evaluates four orthogonal dimensions:
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            { title: 'Completeness', desc: 'Measures missing values' },
                                            { title: 'Validity', desc: 'Checks type correctness' },
                                            { title: 'Uniqueness', desc: 'Evaluates duplicates' },
                                            { title: 'Consistency', desc: 'Checks value distributions' },
                                        ].map((item) => (
                                            <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Each one is computed independently and then combined into a composite score using <strong className="text-zinc-950 dark:text-zinc-50">configurable weights</strong>. This means you can tell the pipeline to optimize for a completeness-heavy score if you&apos;re dealing with survey data, or a uniqueness-heavy score if you&apos;re preparing training data for a model.
                                    </p>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The ranking system then uses those scores to order transformation candidates by expected improvement. The default policy is improvement-based, but it&apos;s pluggable &mdash; the <CodeChip>RankingService</CodeChip> takes any object that conforms to the policy interface.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Failure Recovery */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Failure recovery as a first-class concern
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Data is messy and transformations can fail &mdash; a type cast on a column with mixed content, an outlier removal that leaves an empty frame, a normalization on a zero-variance column. Instead of letting exceptions bubble up and kill the run, the pipeline has four configurable recovery strategies:
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono text-sm text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-800">SKIP</span>
                                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono text-sm text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-800">RETRY</span>
                                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono text-sm text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-800">ABORT</span>
                                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 font-mono text-sm text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-800">FALLBACK</span>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        This is set per-run via config, which means a production batch job and an exploratory notebook session can use the same pipeline with different tolerance for failure.
                                    </p>

                                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                            Leakage Detector
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            The validation layer checks whether a proposed transformation would create target-correlated features or expose information that shouldn&apos;t be available at inference time. This is the kind of thing that&apos;s easy to skip in a quick script but shows up as an embarrassing bug in production.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: What I'd Do Differently */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    What I&apos;d do differently
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: 'Execution Separation', desc: 'The Streamlit interface is intentionally thin, but state management gets awkward with long-running pipeline executions. Ideally, I\'d separate backend/frontend more aggressively (e.g., async job queue with lightweight API) rather than tying computation lifecycle to a session.' },
                                        { title: 'Execution Engine', desc: 'The pipeline was load-tested up to 200K rows × 42 columns, enough for its intended use. At significantly larger scale, transformation execution should be pushed to Polars or Spark — pandas stops being the right tool at that point.' },
                                    ].map((item) => (
                                        <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Want to try it out?</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                <a
                                    href="https://github.com/AbhijeetP21/multi-agent-data-wrangler"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    <Icon name="github" size={14} />
                                    View Source Code
                                    <Icon name="arrow-up-right" size={12} />
                                </a>
                                <a
                                    href="https://multi-agent-data-wrangler.streamlit.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    Live Demo
                                    <Icon name="arrow-up-right" size={12} />
                                </a>
                            </div>
                        </div>

                    </div>
                </article>
            </main>

            {/* Footer */}
            <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800/80">
                <div className="container mx-auto px-6 max-w-5xl flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} Abhijeet Sandip Pachpute</p>
                    <p>United States</p>
                </div>
            </footer>
        </>
    );
}
