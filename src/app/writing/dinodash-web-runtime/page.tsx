'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';

export default function DinodashArticle() {
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
                                Systems Engineering
                            </p>

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5 text-zinc-950 dark:text-zinc-50">
                                Dinodash: Engineering a Native C++ Game Engine for the Web Runtime
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                A deep dive into building a multi-runtime system: native C++ game engine with WebAssembly adaptation, browser deployment, and runtime portability design.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Jan 2026 · 6 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['C++', 'WebAssembly', 'Systems Architecture', 'Raylib'].map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        {/* Article Body */}
                        <div className="space-y-14">

                            {/* Section: Intro */}
                            <section>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                    Dinodash started as a low-level systems project: a real-time 2D game engine written in <strong className="text-zinc-950 dark:text-zinc-50">C++ using Raylib</strong>. The goal was to explore performance-aware graphics rendering, game loops, physics simulation, and state management.
                                </p>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    Over time, it evolved into a <strong className="text-zinc-950 dark:text-zinc-50">multi-repo system</strong> spanning native execution, web deployment, and platform adaptation. It transformed a local desktop game into a browser-accessible interactive application.
                                </p>
                            </section>

                            {/* Section: The Repos */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Project Structure
                                </h2>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Dinodash</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Core C++ game engine (native runtime)</p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Dinodash-web</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">WebAssembly compilation + runtime bridge</p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Dinodash-play</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Deployment, hosting, and browser integration</p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: The Problem */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Engineering Problem
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Rather than treating this as &quot;just a game project,&quot; I approached it as a <strong className="text-zinc-950 dark:text-zinc-50">systems engineering challenge</strong>:
                                    </p>
                                    <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                        <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            How do you take a performance-sensitive native application and re-architect it for a fundamentally different runtime model (the browser) without losing determinism, performance guarantees, or structural clarity?
                                        </p>
                                    </blockquote>
                                </div>
                            </section>

                            {/* Section: Native Architecture */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Core Engine Architecture
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        At the base is a traditional real-time engine with deliberate constraints:
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            { title: 'Deterministic game loop', desc: 'Consistent behavior across frames' },
                                            { title: 'Delta-time physics', desc: 'Frame-rate independent simulation' },
                                            { title: 'Event-driven input', desc: 'Responsive controls without polling' },
                                            { title: 'Separated render pipeline', desc: 'Logic decoupled from visuals' },
                                        ].map((item) => (
                                            <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The engine is <strong className="text-zinc-950 dark:text-zinc-50">data-oriented and minimal</strong>. There are no unnecessary abstractions and no deep object hierarchies. Logic is explicit, debuggable, and deterministic. This predictability becomes critical when porting to the web.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Web Constraints */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Browser Challenge
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The browser is not a native environment. It imposes fundamental constraints:
                                    </p>

                                    <ul className="space-y-3 mb-6">
                                        {[
                                            'No direct system-level access',
                                            'No native threading model',
                                            'Event loop owned by the browser',
                                            'Rendering mediated through Web APIs',
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                                                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        This is where the architecture shifts from &quot;game dev&quot; to <strong className="text-zinc-950 dark:text-zinc-50">systems translation</strong>.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Solution */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Migration Strategy
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Instead of rewriting the game in JavaScript, I used <strong className="text-zinc-950 dark:text-zinc-50">compilation + adaptation</strong>, not reimplementation.
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div className="mb-4">
                                            <span className="text-zinc-500">// Native execution path</span>
                                        </div>
                                        <div className="text-emerald-400 mb-6">
                                            Engine → OS → GPU
                                        </div>
                                        <div className="mb-4">
                                            <span className="text-zinc-500">// Web execution path</span>
                                        </div>
                                        <div className="text-blue-300">
                                            Engine → WASM → Browser → Web APIs → GPU
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Same engine, same logic, same determinism. Just a different transport layer. This avoided logic divergence and ensured identical gameplay semantics across native and web runtimes.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The largest challenge was preserving frame pacing and input responsiveness under the browser&apos;s event-driven loop.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Design Principles */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Design Principles
                                </h2>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Engine Authority</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">The game engine remains the authoritative system. The browser is just a host, so there is no logic duplication across runtimes.</p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Determinism First</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Fixed update patterns, consistent state transitions, no browser-driven logic ownership.</p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Platform as Adapter</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">Treat the platform as an adapter layer, not a rewrite target. Code structured for migration, not lock-in.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Technical Takeaways */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Technical Takeaways
                                </h2>
                                <div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            'System-level separation of concerns',
                                            'Native vs browser runtime constraints',
                                            'Explicit architecture boundaries',
                                            'Engine portability across runtimes',
                                            'Performance-aware update loops',
                                            'Correctness under constrained execution',
                                        ].map((label) => (
                                            <div key={label} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Section: Philosophy */}
                            <section>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                                    Dinodash reflects a simple philosophy:
                                </p>
                                <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                    <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        &quot;Build systems that survive environment changes.&quot;
                                    </p>
                                </blockquote>
                                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-4">
                                    Structure first. Systems second. Platform last.
                                </p>
                            </section>

                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Play Dinodash Now</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                <a
                                    href="https://abhijeetp21.github.io/Dinodash-play/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    Play in Browser
                                    <Icon name="arrow-up-right" size={12} />
                                </a>
                                <a
                                    href="https://github.com/AbhijeetP21/Dinodash"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    <Icon name="github" size={14} />
                                    View Source Code
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
