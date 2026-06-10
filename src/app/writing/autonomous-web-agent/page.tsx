'use client';

import Link from 'next/link';
import Image from 'next/image';
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

export default function AutonomousWebAgentArticle() {
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
                                AI Engineering
                            </p>

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5 text-zinc-950 dark:text-zinc-50">
                                Autonomous Web Agent: What Makes It Reliable Is Not the Prompt
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Building a form-filling agent that actually works: perception pipelines, structured error recovery, and the engineering that surrounds the LLM.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Jun 2026 · 9 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['Python', 'Playwright', 'LLM', 'Agentic AI', 'Automation'].map((tag) => (
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
                                        Most online forms are fifteen questions in a different order. Dropdowns, repeated fields, nothing that required me to actually think. I wanted to point an agent at a form, have it fill what it could, then review and submit. The hard part turned out to be not the form-filling. It was making the agent reliable enough to actually trust with it.
                                    </p>
                                </blockquote>
                            </section>

                            {/* Section: The Loop That Matters */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Loop That Matters
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The agent runs a four-step cycle until the goal is done or a budget runs out: <strong className="text-zinc-950 dark:text-zinc-50">perceive</strong> the page, <strong className="text-zinc-950 dark:text-zinc-50">plan</strong> the next action, <strong className="text-zinc-950 dark:text-zinc-50">act</strong> on it with Playwright, and <strong className="text-zinc-950 dark:text-zinc-50">record</strong> what happened. Then repeat.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        That loop is not the interesting part. What surrounds it is.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Every useful agent needs to handle what happens when a step doesn&apos;t go as planned: the model picks something that no longer exists, the page doesn&apos;t respond the way it expected, or it gets stuck repeating itself. Most &quot;autonomous agent&quot; demos work once and skip all of that. The engineering question is what you build for the cases where it doesn&apos;t, because on the real web those cases come up constantly.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        One design decision that runs through the whole system: the planner talks to an abstract LLM client, not a provider SDK. Two backends ship, one Anthropic-compatible (used here with MiniMax M3 via a custom base URL) and one OpenAI-compatible for OpenRouter, DeepSeek, and anything else OpenAI-shaped. Switching models is a config change. This mattered in practice when comparing models without wanting to touch the agent loop.
                                    </p>
                                </div>
                            </section>

                            {/* Section: What the Agent Actually Sees */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    What the Agent Actually Sees
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The first decision that shapes everything else is what the page looks like to the model. The obvious approach is to dump the HTML and ask &quot;what now?&quot; That falls apart on real pages: a product page can be tens of thousands of tokens of nested divs, most of it irrelevant to anything you can click.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Instead, the agent extracts a <strong className="text-zinc-950 dark:text-zinc-50">reduced view from the accessibility tree</strong>, only the interactive, role-bearing elements, each tagged in the live DOM with a <CodeChip>data-agent-id</CodeChip>. Here is the local sandbox the agent runs against:
                                    </p>

                                    {/* Image: Sandbox */}
                                    <figure className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                        <Image
                                            src="/images/writing/autonomous-web-agent-sandbox.png"
                                            alt="The local sandbox site showing a Todo list with a textbox and Add button"
                                            width={800}
                                            height={400}
                                            className="w-full h-auto"
                                        />
                                        <figcaption className="font-mono text-xs text-zinc-500 dark:text-zinc-500 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                                            The local sandbox site. The agent sees only the interactive elements: the textbox and the Add button. Not the surrounding structure.
                                        </figcaption>
                                    </figure>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The model sees the page as a short indexed list:
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div>[<span className="text-emerald-400">1</span>] <span className="text-blue-300">button</span> <span className="text-amber-400">&quot;Add&quot;</span></div>
                                        <div>[<span className="text-emerald-400">2</span>] <span className="text-blue-300">textbox</span> <span className="text-amber-400">&quot;New todo&quot;</span> <span className="text-zinc-500">(placeholder: What needs doing?)</span></div>
                                        <div>[<span className="text-emerald-400">3</span>] <span className="text-blue-300">link</span> <span className="text-amber-400">&quot;Checkout&quot;</span></div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        It picks an action by id: <CodeChip>click 1</CodeChip>, <CodeChip>type &quot;buy milk&quot; into 2</CodeChip>. The executor resolves that id back to a Playwright locator. Perception runs fresh every step, so ids always reflect the current DOM rather than a stale snapshot from earlier in the run.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Two things follow from this. The prompt is an order of magnitude smaller, which is cheaper and faster. And the model&apos;s choices are constrained to things that actually exist and are actionable right now, which removes an entire category of hallucinated selectors.
                                    </p>

                                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                            Parser injection surface
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Accessible names are user-controlled text. An <CodeChip>aria-label</CodeChip> containing literal double quotes, like <CodeChip>Mark &quot;buy milk&quot; done</CodeChip>, splits a line formatted as <CodeChip>[7] button &quot;name&quot;</CodeChip> and the model starts referencing the wrong element ids. Sanitizing the accessible name on serialization fixed it. Treat any user-controlled string going into a structured format as untrusted input.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Reliability Is a Layer */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Reliability Is a Layer
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        A <CodeChip>ReliabilityController</CodeChip> wraps every execution step. It handles three failure types differently because they require different responses.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Transient failures</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                A locator times out because the page hadn&apos;t settled, a click arrived a beat early. These get retried with exponential backoff. Most of the time the next attempt just works.
                                            </p>
                                        </div>

                                        <div className="border-l-2 border-amber-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Structural failures</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                The model picked an element id that no longer exists, or tried to navigate somewhere outside the domain allowlist. Retrying is pointless; the action is wrong for reasons that won&apos;t change. Instead of crashing, the failure becomes a result the planner sees on the next step: &quot;that element is not here, here&apos;s the current page.&quot; The model re-plans against reality.
                                            </p>
                                        </div>

                                        <div className="border-l-2 border-red-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">No-progress loops</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                The quiet failure mode. The agent acts, the page doesn&apos;t change, and it acts again. The system hashes <CodeChip>(page state, action)</CodeChip> each step. If the same pair repeats, the agent gets one nudge to try something different. If it repeats again, the run aborts as <CodeChip>stuck</CodeChip> rather than consuming its entire budget going nowhere.
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        On top of all of this sits a hard step budget. No run is ever unbounded.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The action whitelist is the companion piece. The model can only emit a fixed set of Pydantic-validated actions. Anything else fails validation before it touches the browser. A confirmation gate can also require human approval before a sensitive action executes, which is the practical form of the human-in-the-loop model I wanted from the start.
                                    </p>
                                </div>
                            </section>

                            {/* Section: The Run That Proved It */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Run That Proved It
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The first real run against a live model was a trivial task: add &quot;buy milk&quot; to a todo list and mark it done. The agent reported success. The trace said <strong className="text-zinc-950 dark:text-zinc-50">9 steps and 8 recoveries</strong>.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        That gap is the whole story.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Reading the per-step trace, the task was actually finished at step 2. The agent clicked &quot;Done,&quot; the item was marked complete. Then it spent the next six steps trying to do it again. At one point it burned 26 seconds retrying a click on a button that was disabled and was never going to respond.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The problem was in the perception layer, not the model. The sandbox&apos;s &quot;Done&quot; button changed its visible text to &quot;Completed&quot; and went disabled when clicked, but its <CodeChip>aria-label</CodeChip> stayed as <CodeChip>Mark &apos;buy milk&apos; done</CodeChip>. The accessibility tree is exactly what the model sees instead of raw HTML, so the model read <CodeChip>button &quot;Mark &apos;buy milk&apos; done&quot; (disabled)</CodeChip> and drew the obvious conclusion: here is the control for finishing the task, and for some reason it is not responding.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        It was not broken. It was already done. The label was lying.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Two fixes came out of one run. The sandbox bug was a genuine accessibility bug: an aria-label contradicting the element&apos;s actual state. So the label was updated to tell the truth once the action was complete. The executor also had no business retrying a disabled element, so it now checks before handing off to Playwright and fails fast rather than eating the full timeout.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Here is the same task after both fixes, with the trace open:
                                    </p>

                                    {/* Image: Run Trace */}
                                    <figure className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                        <Image
                                            src="/images/writing/autonomous-web-agent-run-trace.png"
                                            alt="Run #1 trace showing 4 steps with 1 recovery. The agent types, clicks, gets a disabled error, then finishes correctly"
                                            width={1000}
                                            height={900}
                                            className="w-full h-auto"
                                        />
                                        <figcaption className="font-mono text-xs text-zinc-500 dark:text-zinc-500 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                                            Run #1: &quot;Add &apos;buy milk&apos; to my todo list and mark it done.&quot; Four steps, one recovery. Step 2 shows the disabled element check firing and the model&apos;s reasoning about it. Step 3 concludes correctly.
                                        </figcaption>
                                    </figure>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Four steps, one recovery. The recovery still fires at step 2 because the model sees the now-correctly-labelled button (&quot;&apos;buy milk&apos; is completed&quot;), tries to click it to confirm, and gets <code className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-[13px] font-mono text-red-500">error · disabled</code> back immediately instead of spinning for 26 seconds. Step 3 reads that outcome and finishes correctly.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The reliability machinery did its job the entire time. Without the step budget and loop detection, the original run doesn&apos;t end in an ugly but correct success; it spins until something external kills it. And without the per-step trace, I just see &quot;success&quot; and ship a perception bug that would surface later as random flakiness on real sites. The thing that broke was revealing. The only reason I caught it was that I had built the boring logging first.
                                    </p>
                                </div>
                            </section>

                            {/* Section: You Can't Fix What You Can't See */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    You Can&apos;t Fix What You Can&apos;t See
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Every step writes a record to SQLite: the action, the model&apos;s reasoning, the outcome, a screenshot, the page URL, a DOM-state hash, and how long it took. The dashboard reads this and renders each run step by step, with the screenshot of exactly what the agent was looking at when it made each decision.
                                    </p>

                                    {/* Image: Dashboard */}
                                    <figure className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                        <Image
                                            src="/images/writing/autonomous-web-agent-dashboard.png"
                                            alt="The run list dashboard showing 25 completed runs with status, step count, and recovery count"
                                            width={1000}
                                            height={700}
                                            className="w-full h-auto"
                                        />
                                        <figcaption className="font-mono text-xs text-zinc-500 dark:text-zinc-500 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                                            The run list dashboard: status, step count, and recovery count for every run. The STUCK and FAILED rows are where the debugging starts.
                                        </figcaption>
                                    </figure>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        When a run does something baffling, I don&apos;t guess. I open the trace.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        That same data feeds the benchmark. A task suite with an <strong className="text-zinc-950 dark:text-zinc-50">independent <CodeChip>success_check</CodeChip></strong>: a URL, DOM, or element assertion evaluated by the harness, not the agent&apos;s own claim that it finished. The harness runs each task N times and reports task success rate, mean steps-to-completion, and recovery rate.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The distinction between harness-evaluated success and self-reported success matters. An agent that &quot;reports&quot; it finished is telling you what it believes happened. The harness checks whether it actually did.
                                    </p>

                                    {/* Image: Benchmark */}
                                    <figure className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                        <Image
                                            src="/images/writing/autonomous-web-agent-benchmark.png"
                                            alt="Benchmark results showing 90% overall success across 7 tasks with MiniMax M3, 3 runs per task"
                                            width={1000}
                                            height={700}
                                            className="w-full h-auto"
                                        />
                                        <figcaption className="font-mono text-xs text-zinc-500 dark:text-zinc-500 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                                            Benchmark results: MiniMax M3, 3 runs per task, including two public generalization sites. The saucedemo_add_to_cart row at 33% is the honest number.
                                        </figcaption>
                                    </figure>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        The saucedemo add-to-cart result is what the benchmark is for. Same code, same model, one run at 100% and the next at 0%. The login → add-to-cart → open-cart flow at roughly fifteen to twenty steps is where the agent is weakest on a real site. A single green demo hides that. Running each task N times surfaces which task is fragile and by how much, which is the only way to know whether a change to the prompt or the loop actually improved reliability, or just happened to work on the one run you watched.
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
                                        { title: 'Multi-Tab Support', desc: 'Some real-world flows open a new tab mid-task: a login redirect, a product detail page, a confirmation popup. Tab awareness in the perception and executor layer is the natural next extension.' },
                                        { title: 'Per-Task Step Budgets', desc: 'Right now the budget is a single global cap. A login flow and a multi-step checkout are not the same. Per-task hints in the task definition would fix this without much added complexity.' },
                                        { title: 'More Generalization Tasks', desc: 'The local sandbox is deterministic by design. The public site tasks on saucedemo and the-internet are where the interesting generalization signal is. A broader set of varied real-world flows would make the 90% number mean more.' },
                                        { title: 'Richer Confirmation Gate', desc: 'The gate exists and works but it is coarse: it applies to whole action types. Field-level confirmation for high-value inputs would make the human-in-the-loop model more practical for the form-filling use case.' },
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
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Explore the source code</h3>
                            <a
                                href="https://github.com/AbhijeetP21/autonomous-web-agent-v2.1"
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
