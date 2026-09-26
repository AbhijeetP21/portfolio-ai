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

export default function GovernedSqlAgentArticle() {
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
                                Letting an LLM Query Enterprise Data Without Trusting It
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Why RAG breaks down on millions of rows, and how governed Postgres views, a parse-gated SQL guard, and a cited knowledge catalog let a model answer in plain English without ever holding the keys.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Sep 2026 · 12 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['PostgreSQL', 'LLM Agents', 'Text-to-SQL', 'Security', 'AWS', 'Evals'].map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        {/* Article Body */}
                        <div className="space-y-14">

                            {/* Section: Intro Quote */}
                            <section>
                                <blockquote className="border-l-2 border-emerald-500 pl-6 py-1 mb-6">
                                    <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        A sales rep between two calls types &quot;which of my accounts have gone quiet this quarter?&quot; and wants an answer before the next call starts. The data behind that question is millions of rows across a multi-tenant database, and the rep is only allowed to see a slice of it. Getting an LLM to answer was never the hard part. Getting it to answer correctly, from only the rows that rep is allowed to see, without handing the model the keys to the database, was the whole job.
                                    </p>
                                </blockquote>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    This is a write-up of the engineering behind the AI assistant I build at work, inside a pharma sales intelligence SaaS product. I&apos;ve kept it at the level of architecture and lessons. Customer data, table names, and business rules are left out or changed, and the code snippets are simplified illustrations rather than the production source.
                                </p>

                                <div className="mt-6 p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                        A living write-up
                                    </p>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        This system is still being built, and the numbers in it move with every eval run. I&apos;ll keep updating this article as it grows and as I learn new lessons from it. What changed and when is logged in the <a href="#updates" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:opacity-80">updates</a> at the end.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Why RAG Was the Wrong Tool */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Why RAG Was the Wrong Tool
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The reflex for &quot;LLM over company data&quot; is retrieval-augmented generation: chunk the data, embed it, retrieve the closest chunks, and let the model summarize them. That works for documents. It does not work for questions like these:
                                    </p>

                                    <ul className="space-y-3 mb-6">
                                        {[
                                            'What was my revenue through this purchasing group last quarter, compared with the quarter before?',
                                            'Which of my accounts bought last year but have not ordered in 90 days?',
                                            'Which product am I closest to hitting my goal on?',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Every one of those is an <strong className="text-zinc-950 dark:text-zinc-50">aggregation</strong>: a sum, a comparison, or an anti-join across thousands to millions of rows. You cannot retrieve your way to a <CodeChip>SUM</CodeChip>. The top-k chunks are a sample, and a sample of sales rows gives you a confidently wrong total.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The system before mine had already learned a quieter version of the same lesson. It used a deterministic pipeline: an intent parser, a planner the LLM filled in, and a compiler that turned the plan into SQL. The business knowledge (what a column means, which join fans out, which date is the real one) lived in a catalog that was <em>retrieved by embedding similarity</em> on each question. When retrieval missed, nothing errored. The plan just came out missing the rule that would have made the answer right. A retrieval miss on knowledge is invisible, and it shows up as a plausible number that happens to be wrong.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The pipeline also had to be taught every question shape in advance. When I looked at its history, most substantive commits were steering the planner toward one more question shape, and a meaningful share of them broke an earlier fix. That is not a bug a patch fixes. It is the shape of the system.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        So the rebuild inverted it. The database already knows how to aggregate millions of rows in milliseconds. Let the model <strong className="text-zinc-950 dark:text-zinc-50">write the SQL itself</strong>, and put all the engineering into making that safe and making it right.
                                    </p>
                                </div>
                            </section>

                            {/* Section: The Model Is Untrusted Input */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Model Is Untrusted Input
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The moment a model writes SQL, its output is untrusted input to your database, the same as a form field on a public web page. It can be wrong, it can be steered by a cleverly worded question, and it will occasionally do something nobody predicted. None of the prompt, the persona, or the instructions counts as a security control. Only four things do:
                                    </p>

                                    <div className="space-y-6 mb-6">
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Two database roles</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                The role that runs model-written SQL can read a set of governed views and nothing else. The service&apos;s own role handles sessions and audit logs. Separate credentials, never crossed.
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Governed views</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                Tenant and per-user row scoping enforced inside Postgres, so the model never writes an access filter and cannot forget one.
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">A parse gate</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                Every statement is parsed by Postgres&apos;s own parser and rejected unless it is exactly one SELECT over allowlisted views and functions.
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">A post-execution assertion</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                After the query runs, the service proves the query didn&apos;t tamper with the session context the views scope on. If it did, the rows are thrown away.
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        There is also no write path, at all. A model that cannot write cannot be talked into writing. Anything with a side effect, like logging a note or creating a task, belongs in the application&apos;s own API under the user&apos;s own identity, where the application&apos;s existing permissions already govern it.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Security Lives in the Database */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Security Lives in the Database
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Before any model-written SQL runs, the service sets a handful of session settings <strong className="text-zinc-950 dark:text-zinc-50">inside the same transaction</strong>: the tenant, the user, and the user&apos;s scope (their own rows, their own plus their team&apos;s, or the whole tenant). They are set with parameterized <CodeChip>set_config(..., true)</CodeChip> calls, never string interpolation, and the <CodeChip>true</CodeChip> makes them transaction-local so nothing leaks across a pooled connection.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Every governed view reads those settings. Scope is decided in exactly one view, and every other view joins it. A simplified version:
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm overflow-x-auto text-zinc-300">
                                        <pre className="whitespace-pre">{`-- one place decides who "I" can see
CREATE VIEW v_visible_users
  WITH (security_barrier = true, security_invoker = false) AS
SELECT u.user_id
FROM   users u
WHERE  u.tenant_id = current_setting('app.tenant_id')::uuid
AND    CASE current_setting('app.scope')
         WHEN 'tenant' THEN true
         WHEN 'team'   THEN u.user_id = current_setting('app.user_id')::uuid
                          OR u.manager_id = current_setting('app.user_id')::uuid
         WHEN 'self'   THEN u.user_id = current_setting('app.user_id')::uuid
       END;   -- no ELSE: an unknown scope is NULL, which means zero rows

-- every domain view joins it instead of re-implementing scope
CREATE VIEW v_orders
  WITH (security_barrier = true, security_invoker = false) AS
SELECT o.order_date, o.account_id, o.product_id, o.revenue, o.units
FROM   orders o
JOIN   v_visible_users v ON v.user_id = o.rep_id;`}</pre>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        A few details carry most of the weight:
                                    </p>

                                    <div className="space-y-6">
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">It fails closed, two ways</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                If the tenant or user setting is missing, the uuid cast raises and the query dies. On a pooled connection a missed setting leaves an empty string behind, not an undefined parameter, and an empty string is not a valid uuid. If the scope is anything other than the three known values, including a different casing, the <CodeChip>CASE</CodeChip> with no <CodeChip>ELSE</CodeChip> arm returns NULL and the view returns nothing. The standing rule: never write <CodeChip>scope &lt;&gt; &apos;self&apos;</CodeChip>, and never give that <CodeChip>CASE</CodeChip> an arm that widens.
                                            </p>
                                        </div>

                                        <div className="border-l-2 border-amber-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Views run with their owner&apos;s privileges</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                <CodeChip>security_invoker = false</CodeChip> is the Postgres default, and it&apos;s written out anyway because it <em>is</em> the privilege model. The agent&apos;s role needs no grant on any base table, so it has no way to reach around the scope join. <CodeChip>security_barrier = true</CodeChip> stops a caller&apos;s own <CodeChip>WHERE</CodeChip> clause from being pushed below the scope filter. The views are owned by the data team&apos;s migration role, never by the service, because an owner can redefine its own view.
                                            </p>
                                        </div>

                                        <div className="border-l-2 border-red-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Grants are asserted, not assumed</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                The role migration ends with a block that lists every write grant both roles hold and fails the deploy if one strays outside the service&apos;s own tables. The deploy checklist also includes a negative test: connect as the agent role and read an audit table. That query <em>must fail</em>. If it succeeds, containment is gone and the deploy stops.
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        I considered Postgres row-level security and scope filters in application code first. RLS meant more surface area to reason about per tenant. Filters in application code were a non-starter, because the model writes the SQL, so the model would be writing its own access filter.
                                    </p>
                                </div>
                            </section>

                            {/* Section: A Parse Gate, Not a Regex */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    A Parse Gate, Not a Regex
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The guard is the most important file in the service. It takes the model&apos;s statement and returns either rows or a rejection the model can act on. Nothing the model writes can make it raise. In order:
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {[
                                            { n: '1', title: 'Bind, never inline', desc: 'Named placeholders become positional parameters. Entity names never appear as SQL literals: the model resolves a name to an id first, and the id is bound.' },
                                            { n: '2', title: 'Parse with the server\'s own parser', desc: 'pglast wraps libpg_query, the same parser Postgres uses, pinned to an exact version. Exactly one statement, and it must be a SELECT. SET, DO, COPY, DDL, DML, SELECT INTO, FOR UPDATE and recursive CTEs are rejected by construction, not by pattern.' },
                                            { n: '3', title: 'Allowlist relations and functions', desc: 'Every relation must be a governed view or a CTE defined earlier in the same statement. Each CTE body is checked seeing only the CTEs before it, so a base table cannot hide behind a shadowing name. Functions come from an allowlist, and session-setting functions get their own rejection message.' },
                                            { n: '4', title: 'Wrap, cost-check, execute', desc: 'The model\'s text is sliced out by the parser\'s own offsets, never edited, and wrapped with a row limit. It runs in a read-only transaction with a statement timeout, after an EXPLAIN that rejects absurd plans.' },
                                            { n: '5', title: 'Assert the context didn\'t move', desc: 'Re-read the session settings and compare. On any difference the rows are discarded and the rejection is flagged as a security event. The transaction always rolls back.' },
                                        ].map((step) => (
                                            <div key={step.n} className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                                    <span className="text-emerald-500 font-bold text-sm">{step.n}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">{step.title}</h3>
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <pre className="whitespace-pre">{`BEGIN READ ONLY;
SELECT set_config('app.tenant_id', $1, true);   -- x each setting
SET LOCAL statement_timeout = '15s';
EXPLAIN (FORMAT JSON) <wrapped statement>;       -- cost gate
SELECT * FROM (<model's SELECT, untouched>) q LIMIT 5001;
SELECT current_setting('app.tenant_id'), ...;   -- did anything move?
ROLLBACK;`}</pre>
                                    </div>

                                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 mb-6">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                            Why step 5 exists
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Custom settings like <CodeChip>app.user_id</CodeChip> are user-settable, and <CodeChip>set_config()</CodeChip> is callable inside a SELECT. The database itself will not stop a statement from rewriting the very context the views scope on. The function allowlist blocks it, and the assertion is the second lock in case the allowlist ever has a gap. This is a hole grants alone cannot close.
                                        </p>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Using Postgres&apos;s own parser matters more than it looks. A regex, or even a different SQL parser, gives you a check that can disagree with the thing that executes. When the validator and the executor share a parser, &quot;it parses one way here and another way there&quot; can&apos;t happen.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Two smaller lessons from tuning it. First, a cost ceiling is a bad latency clock. My first ceiling was about 15x the heaviest query I had measured, and it rejected a whole family of legitimate account queries. Their views carry per-row subqueries that the planner multiplies into huge estimated costs, even though the real scan takes under a second. The cost gate now only stops genuinely absurd plans like accidental cross joins, and the statement timeout is the real latency budget.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Second, a rejection is a message to the model, so write it for the model. Two SQL constructs look legal and get rejected by Postgres itself, costing a full round trip each time. The guard now catches them before execution and includes the fix in the rejection: &quot;select it under an alias and ORDER BY that alias.&quot; That isn&apos;t security. It turns a wasted turn into a correction.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Knowledge Without Retrieval */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Knowledge Without Retrieval
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Safety answers &quot;can the model hurt anything?&quot; It doesn&apos;t answer &quot;will the number be right?&quot; A model reading raw schema will happily count contract <em>line items</em> when the rep asked how many <em>contracts</em> they have. Every number in the answer is individually true, and the answer is wrong.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The fix is a curated catalog: one brief per business domain (eight of them, across sales, accounts, contracts, products, purchasing groups, distributors, compensation plans and contacts) with a fixed structure. Each view states its <strong className="text-zinc-950 dark:text-zinc-50">grain</strong>, meaning what one row represents, and the build fails without it. Rules are numbered, and each one must cite its source: a section of the data team&apos;s dictionary or a file and line in the application&apos;s code. A rule with no citation fails review. A rule reference that points nowhere fails the build.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        An offline build step validates all of it (columns against the view SQL, grains, cross-references, every example query through the same guard) and compiles one ~60K-token document. Then comes the decision that surprises people:
                                    </p>

                                    <blockquote className="border-l-2 border-emerald-500 pl-6 py-1 mb-6">
                                        <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            The whole catalog goes into every prompt. It is never selectively loaded and never retrieved by similarity.
                                        </p>
                                    </blockquote>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        About a third of the reference questions span two domains. Loading &quot;the relevant domain&quot; drops rules the question needs, and it drops them silently, which is exactly the failure that sank the retrieval-based system. A 60K-token prompt sounds expensive, but the catalog is a stable prefix, so prompt caching absorbs it. Across a full eval battery, <strong className="text-zinc-950 dark:text-zinc-50">98.6% of prompt tokens were cache hits</strong>. Cost is not a reason to shrink the prompt. Rule bloat is.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Retrieval does still exist, in one place where a miss is harmless. Worked examples (question plus correct SQL) are retrieved per turn, five at a time, as few-shot hints. A missed example costs relevance. A missed rule costs a silently wrong answer. Turning the examples on improved known question shapes noticeably and changed performance on unseen questions by exactly zero. That was a useful result in itself: examples help the model imitate, the catalog teaches it.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Names get the same treatment. The model never writes <CodeChip>ILIKE &apos;%acme%&apos;</CodeChip>. It calls an entity resolver with a kind and the text the user typed, and the service runs fixed, parameterized SQL through the same governed views, in tiers: exact, separator-insensitive, prefix, token coverage, and finally a gated trigram match. Digits match whole and never approximately, and a lone fuzzy hit never binds silently: it comes back as a spelling to confirm. Two same-named accounts in different cities trigger a clarifying question, not a guess. And because the resolver reads through the governed views, a candidate outside the user&apos;s scope can&apos;t come back at all.
                                    </p>
                                </div>
                            </section>

                            {/* Section: The Rule Spiral */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    The Rule Spiral, and Deleting My Way Out
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        A catalog invites a trap. Every failing eval question tempts you to add a rule. The rule makes that question pass, and the catalog grows. At one point the rule count grew from 290 to 320 in two days, and one rule written to make ranking questions pass (&quot;a list with no number means top ten&quot;) quietly broke 17 unseen questions.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        So I ran an audit. Every rule went into one of three bins: <strong className="text-zinc-950 dark:text-zinc-50">schema facts</strong> (keep), <strong className="text-zinc-950 dark:text-zinc-50">general answering conventions</strong> (move into the persona once), and <strong className="text-zinc-950 dark:text-zinc-50">rules written for a specific test question</strong> (delete). Of 239 rules, 61 were deleted and 17 were consolidated. The catalog shrank from about 48K to 35K tokens.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">&minus;28</div>
                                            <div className="text-xs text-zinc-600 dark:text-zinc-400">turns on the known-question battery</div>
                                        </div>
                                        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">0</div>
                                            <div className="text-xs text-zinc-600 dark:text-zinc-400">change on the unseen-question set</div>
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        That pair of numbers is the most useful thing the project taught me. The deleted rules had been making the tested questions pass while teaching the model nothing it could transfer. They were tailoring, not knowledge. I accepted the lower known-question score as the honest floor. The test for any new rule is now a single question: would a competent analyst reading these views cold need this sentence? If not, it doesn&apos;t go in. And adding a rule is paid for by deleting one.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Measuring the Failure a User Can't See */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Measuring the Failure a User Can&apos;t See
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Users can see an error. They can see &quot;I&apos;m not sure, did you mean X or Y?&quot; What they cannot see is a confident answer with a wrong number in it. So the headline metric isn&apos;t accuracy in the usual sense. It&apos;s the <strong className="text-zinc-950 dark:text-zinc-50">silently wrong rate</strong>: answers that looked fine and weren&apos;t.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The eval harness has four modes, and they measure different things on purpose:
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            { title: 'Offline', desc: 'No database. Validates the corpus and pushes every reference query through the guard, so a golden the guard would reject never reaches a run.' },
                                            { title: 'Baseline', desc: 'Executes every reference query against real data and records row counts and values. The model is graded against this, value by value.' },
                                            { title: 'Model', desc: '80 golden questions, 240 paraphrases (one sloppy, one leaning into a word that means something else in another domain), and multi-turn conversations. Gated in CI.' },
                                            { title: 'Cold', desc: 'Questions with no golden behind them, many kept verbatim from what real users typed, typos included. Deliberately ungated, so nobody can tune toward it.' },
                                        ].map((item) => (
                                            <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The cold set is protected mechanically. The catalog build never reads it, it never enters the example pool, and a test fails if any cold question shares more than 60% of its words with a known one. A cold question that turns into a paraphrase of a known one has stopped measuring anything.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Column names are never graded. The model writes its own SELECT list, so <CodeChip>accounts_aligned</CodeChip> and <CodeChip>aligned_account_count</CodeChip> are the same answer. Users read the answer, not the query.
                                    </p>

                                    <h3 className="font-semibold text-xl text-zinc-950 dark:text-zinc-50 mb-4">The $0 that should have been six figures</h3>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The worst class of bug here is a query that runs, returns nothing, and gets read as a true zero. One revenue question came back as <strong className="text-zinc-950 dark:text-zinc-50">$0</strong>. A paraphrase of the same question returned six figures. The model had bound a list of ids inside <CodeChip>ARRAY[...]</CodeChip>, and since a list already binds as an array, that nested it into a two-dimensional array that matched nothing. The query ran without complaint and returned a perfectly confident zero.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Once an empty result comes back, it looks exactly like a real zero, so the fix had to happen before execution and around it:
                                    </p>

                                    <ul className="space-y-3 mb-6">
                                        {[
                                            'Type-shaped guards that check what a bound value is, never what the question was: a list nested inside an array, or a resolved id compared against a name column.',
                                            'An empty-result explainer that reports the statement\'s own filters, date windows and inner joins, whether each view it read holds any rows at all, and which bound value matched nothing.',
                                            'An explicit instruction that a diagnostic re-run is a diagnostic: the user\'s date window stays, and a figure from a wider re-run is never presented as the narrower one.',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <h3 className="font-semibold text-xl text-zinc-950 dark:text-zinc-50 mb-4">Most &quot;regressions&quot; were instrumentation</h3>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Twice the headline number jumped by about ten points for reasons that had nothing to do with the model. The first time, one view on the eval environment was two revisions behind the catalog, which produced dozens of query failures blamed on the model&apos;s SQL. The second time, a handful of reference questions had zero-row baselines and had been passing <CodeChip>0 == 0</CodeChip> for free. When a data fix made them real, a genuine improvement showed up as a regression.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Both produced permanent fixes to the harness rather than to the catalog: a schema preflight that compares the live views against what the catalog claims at every entry point, a source hash that fails loudly if the compiled catalog is older than its sources, and zero-row baselines that are reported, never quietly graded. Run-to-run churn turned out to be around ten turns either way, so I stopped reading anything into smaller deltas.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Shipping It */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Shipping It
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The earlier system ran on Lambda. This one runs on <strong className="text-zinc-950 dark:text-zinc-50">ECS Fargate</strong>, with Aurora PostgreSQL behind RDS Proxy. A turn streams for several seconds over Server-Sent Events and holds a database connection the whole time, and Lambda behind API Gateway handles neither of those well.
                                    </p>

                                    <div className="space-y-6 mb-6">
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">RDS Proxy is a requirement</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                The guard deliberately opens a fresh connection per statement, so model SQL never inherits a pooled session that could carry state between statements. A turn that runs six queries is six connect/disconnect cycles. The proxy absorbs that churn. It does not enforce security; the roles, the parser and the assertion do.
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-amber-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Timeouts are part of correctness</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                Between the first streamed line and the first answer token, the connection can sit quiet for several seconds while a query runs. Any idle timeout in the path that is shorter than the turn budget cuts healthy turns, and only on slow questions, which is the worst way to find out. Draining tasks get enough stop time to finish the turn they&apos;re on.
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-blue-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">The catalog ships in the image</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                A new catalog is a new image and a deploy, tagged with the git sha, never <CodeChip>latest</CodeChip>. Every turn records which catalog version answered it, so &quot;which version said that?&quot; always has an answer.
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-red-500 pl-6 space-y-2">
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Logs stay outside the boundary</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                                Row data, questions, answers and SQL never go to the log pipeline. They live in an audit table behind the same database permissions as the data itself. A log line carries a turn id, not a sample row &quot;for debugging&quot;.
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Where it stands: about <strong className="text-zinc-950 dark:text-zinc-50">90% accuracy</strong> across a graded battery of 270 turns (measured as answers with no silently wrong number), a <strong className="text-zinc-950 dark:text-zinc-50">~5 second median</strong> response, zero errored turns, and 890+ offline tests covering the guard&apos;s rejection classes, the resolver, streaming, and the identity contract. The accuracy gate I set is far stricter than that, and the system doesn&apos;t pass it yet, deliberately. A confident wrong number is the one failure a user cannot detect, so it&apos;s the one I hold to the hardest standard.
                                    </p>
                                </div>
                            </section>

                            {/* Section: What's Next */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    What I&apos;d Do Next
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: 'Multi-Turn Conversations', desc: 'Single questions are much stronger than long conversations. Follow-ups that lean on earlier results are where most remaining errors live, and the next round of work is there.' },
                                        { title: 'A Real Security-Event Alarm', desc: 'A settings-moved rejection discards the rows and goes back to the model, but nothing pages a human yet. Containment works either way; visibility should match it.' },
                                        { title: 'Lower Judge Variance', desc: 'Multi-turn and cold answers are graded by an LLM judge whose phrasing sensitivity moves scores by a few turns. That noise has to come down before small deltas mean anything.' },
                                        { title: 'Actions as Proposals', desc: 'Notes and tasks, done as a proposal the user confirms, executed by the application\'s own API under the user\'s identity. The agent still never gets a write grant.' },
                                    ].map((item) => (
                                        <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                            <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section: Updates */}
                            <section id="updates" className="scroll-mt-28">
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Updates
                                </h2>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                    New lessons, numbers and design changes get added here as the system evolves.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { date: 'September 2026', title: 'First version', desc: 'The architecture as it stands: governed views, the SQL guard, the whole-catalog prompt, the rules audit, and the eval harness, with results from the latest graded battery.' },
                                    ].map((entry) => (
                                        <div key={entry.date + entry.title} className="border-l-2 border-emerald-500 pl-6 space-y-1">
                                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500">{entry.date}</p>
                                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">{entry.title}</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">{entry.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Built at work</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                A production system in a private codebase, so there&apos;s no public repo. Happy to talk through the design in more depth. Built on Aurora PostgreSQL, ECS Fargate with RDS Proxy, and Python with pglast.
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
