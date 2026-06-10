'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tag } from '@/components/ui/Tag';

function CodeChip({ children }: { children: React.ReactNode }) {
    return (
        <code className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-[13px] font-mono text-emerald-600 dark:text-emerald-400">
            {children}
        </code>
    );
}

export default function RagOptimizationArticle() {
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
                                AI / RAG Engineering
                            </p>

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5 text-zinc-950 dark:text-zinc-50">
                                RAG Optimization Techniques for Production AI
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                How a data analytics dashboard evolved into a natural language query system for complex datasets.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Aug 2025 · 10 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['RAG', 'Gemini API', 'JavaScript', 'Analytics'].map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        {/* Article Body */}
                        <div className="space-y-14">

                            {/* Section: Intro */}
                            <section>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                    When I joined as an intern last summer, the brief was straightforward: build a data analytics dashboard for Pre-Employment Transition Services. What started as a visualization tool evolved into something more interesting: a system that combines traditional data processing with <strong className="text-zinc-950 dark:text-zinc-50">retrieval-augmented generation</strong> to make complex datasets actually queryable in natural language.
                                </p>
                            </section>

                            {/* Section: The Problem Space */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Problem Space
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        State administrators needed to evaluate provider performance across <strong className="text-zinc-950 dark:text-zinc-50">thousands of participants</strong>, multiple service types, and various time periods. The existing workflow involved manual CSV analysis, spreadsheet pivots, and hours of report generation.
                                    </p>
                                    <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                        <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            The real challenge wasn&apos;t just visualizing the data. It was making it interpretable and actionable without requiring a data science background.
                                        </p>
                                    </blockquote>
                                </div>
                            </section>

                            {/* Section: Architecture */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Architecture Decisions
                                </h2>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Client-Side Processing</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                            Vanilla JavaScript, no framework bloat. Uploaded CSVs never leave the user&apos;s browser, ensuring data privacy.
                                        </p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Server-Side Intelligence</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                            Gemini API for natural language interpretation and synthesis. The LLM handles analysis, not data retrieval.
                                        </p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Lightweight Query Engine</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                            Custom retrieval layer that parses natural language into precise data queries, sitting between user questions and raw data.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: The Retrieval Component */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Retrieval Component
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Rather than fine-tuning a model or building a complex vector database, I built a <strong className="text-zinc-950 dark:text-zinc-50">lightweight query engine</strong> that sits between user questions and the raw data. The key insight: most analytics questions follow predictable patterns.
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div className="text-zinc-500 mb-2">{'//'} DataQueryEngine core methods</div>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-emerald-400">parseTimeframe</span><span className="text-zinc-300">(question)</span>
                                                <div className="text-zinc-500 ml-4">{'//'} &quot;3 months ago&quot;, &quot;May to August&quot;, &quot;last quarter&quot;</div>
                                                <div className="text-zinc-500 ml-4">{'//'} Convert natural language → date ranges</div>
                                            </div>
                                            <div>
                                                <span className="text-blue-300">identifyEntities</span><span className="text-zinc-300">(question, data)</span>
                                                <div className="text-zinc-500 ml-4">{'//'} Extract agencies, service types, metrics</div>
                                                <div className="text-zinc-500 ml-4">{'//'} Match against actual dataset values</div>
                                            </div>
                                            <div>
                                                <span className="text-emerald-400">buildQuery</span><span className="text-zinc-300">(parsedQuestion)</span>
                                                <div className="text-zinc-500 ml-4">{'//'} Construct precise data filters</div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The engine extracts temporal references, entity mentions (agencies, services), and performance indicators from questions, then builds precise queries against the loaded dataset. This gives the LLM actual data to work with rather than trying to hallucinate answers about CSVs it&apos;s never seen.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Augmented Generation */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Augmented Generation
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Once the retrieval engine pulls relevant data, it gets packaged into a <strong className="text-zinc-950 dark:text-zinc-50">structured prompt</strong> for the Gemini API. The prompt includes:
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            { title: 'Filtered Records', desc: 'Participant IDs, agencies, scores, and timestamps matching the query' },
                                            { title: 'Aggregate Metrics', desc: 'Calculated means, totals, and distributions for the filtered set' },
                                            { title: 'Statistical Context', desc: 'Standard deviations, peer comparisons, and trend data' },
                                            { title: 'Pre-computed SWOT', desc: 'Strengths, weaknesses, opportunities, and threats already analyzed' },
                                        ].map((item) => (
                                            <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                            Key Insight
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            The LLM&apos;s job is interpretation and synthesis, not data retrieval. Ask &quot;which agencies had missing follow-ups in the last 3 months?&quot; and you get exact participant IDs from the query engine + contextual analysis from the LLM.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Statistical Rigor */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Statistical Rigor Without Overengineering
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The performance scoring system needed to be <strong className="text-zinc-950 dark:text-zinc-50">defensible, not vibes-based</strong>. Each agency gets a composite score:
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { num: '1', title: 'Improvement Metrics', desc: 'Average pre-post score delta across all participants' },
                                            { num: '2', title: 'Follow-up Completion', desc: 'Percentage of participants with both assessments' },
                                            { num: '3', title: 'Service Variety', desc: 'Breadth of services offered by the agency' },
                                            { num: '4', title: 'Recency Weighting', desc: 'Recent activity matters more than historical data' },
                                            { num: '5', title: 'Confidence Adjustment', desc: 'Agencies with n < 25 participants get penalized' },
                                        ].map((item) => (
                                            <div key={item.num} className="flex items-start gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                                    <span className="text-emerald-500 font-bold text-sm">{item.num}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-zinc-950 dark:text-zinc-50">{item.title}</h4>
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2">
                                            Why confidence adjustment matters
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            It prevents agencies that served 5 participants (all successful) from outranking agencies with 500 participants and a 90% success rate. Basic statistical power considerations.
                                        </p>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        For outlier detection: flag anything beyond 1σ from the mean within peer groups. Not sophisticated, but administrators aren&apos;t looking for p-values. They need &quot;this agency is underperforming, investigate why.&quot;
                                    </p>
                                </div>
                            </section>

                            {/* Section: What I'd Do Differently */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    What I&apos;d Do Differently
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: 'API Key Management', desc: 'The prototype hardcodes the Gemini API key in JavaScript (demo only). Production needs server-side proxying or at minimum, environment variables and request signing.' },
                                        { title: 'Caching Layer', desc: 'Every "Generate Analysis" click hits the Gemini API. For production, cache analyses by state+period hash, invalidate on data upload. Could cut API costs by 80%.' },
                                        { title: 'Chunking Strategies', desc: 'Currently sending entire filtered datasets in prompts. For states with thousands of participants, this hits token limits. Should implement hierarchical summarization: aggregate at agency level for the prompt, keep raw data for follow-up queries.' },
                                        { title: 'Drupal Integration', desc: 'Migration path to Drupal for proper user management and data persistence. The current decoupled frontend architecture makes this relatively clean, but the statistical analysis functions need to move server-side.' },
                                    ].map((item) => (
                                        <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section: Measuring Success */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Measuring Success
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The dashboard went live for pilot testing in three states. Early feedback showed administrators were actually using the follow-up question feature, asking things like <em>&quot;show me participants who started strong but dropped off&quot;</em> or <em>&quot;compare urban vs rural provider performance.&quot;</em>
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            { value: '~2h → 30s', label: 'Analysis Generation Time' },
                                            { value: '3 States', label: 'Pilot Testing Scope' },
                                            { value: '80%', label: 'Potential API Cost Savings' },
                                            { value: '90%', label: 'Value vs Full Vector DB Setup' },
                                        ].map((item) => (
                                            <div key={item.label} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{item.value}</div>
                                                <div className="text-xs text-zinc-600 dark:text-zinc-400">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        More importantly, the system surfaced actionable insights that weren&apos;t obvious from raw CSVs: correlation between service variety and participant improvement, or specific agencies with concerning follow-up gaps.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Technical Takeaways */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Technical Takeaways
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'RAG doesn\'t require heavy infrastructure. A well-designed query parser + LLM delivers 90% of the value with 10% of the complexity.' },
                                        { label: 'Know when to stop processing client-side. CSV parsing in JS is fine. Complex statistical analysis? Plan for server-side from day one.' },
                                        { label: 'Statistical literacy matters. Domain expertise + mathematical rigor beats fancy ML every time for structured data use cases.' },
                                        { label: 'Prompt engineering is system design. The retrieval layer and context structure matter more than the LLM itself.' },
                                    ].map((item) => (
                                        <div key={item.label} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section: Philosophy */}
                            <section>
                                <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                    <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                                        &quot;The LLM is the least interesting part.&quot;
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The difference between a hallucinating chatbot and a reliable analytics tool is how you structure the retrieval layer.
                                    </p>
                                </blockquote>
                            </section>

                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Built during internship</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Summer 2025 internship project. Currently being integrated into a production Drupal environment. Built with Vanilla JS and the Gemini API.
                            </p>
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
