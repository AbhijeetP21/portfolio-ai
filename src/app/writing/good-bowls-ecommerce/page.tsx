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

export default function GoodBowlsArticle() {
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
                                Full-Stack Engineering
                            </p>

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5 text-zinc-950 dark:text-zinc-50">
                                Good Bowls: Building a Production-Grade E-Commerce Platform
                            </h1>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Engineering a scalable food ordering system with three-tier architecture, secure payment processing, and modern state management.
                            </p>

                            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-5">
                                Jan 2026 · 12 min read
                            </p>

                            <div className="flex flex-wrap gap-2 mt-5">
                                {['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'].map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        {/* Article Body */}
                        <div className="space-y-14">

                            {/* Section: The Problem */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    The Problem Space
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Building an e-commerce platform for a salad bowl restaurant requires solving several interconnected challenges: <strong className="text-zinc-950 dark:text-zinc-50">real-time cart management</strong>, secure payment processing, dynamic pricing logic for custom orders, and user authentication, all while maintaining separation of concerns.
                                    </p>
                                    <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                        <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            The core question: how do you architect a system where the frontend handles optimistic UI updates, the backend enforces pricing integrity, and the database maintains order history accuracy?
                                        </p>
                                    </blockquote>
                                </div>
                            </section>

                            {/* Section: Architecture Overview */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Three-Tier Architecture
                                </h2>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Presentation Layer</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                            React + Redux for UI rendering and client-side state with localStorage persistence
                                        </p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Business Logic Layer</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                            Express + Node.js with stateless JWT auth for horizontal scaling
                                        </p>
                                    </div>
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Data Layer</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                                            MongoDB Atlas with document-oriented storage for natural order modeling
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Why Split Architecture */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Why Not a Monolith?
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Separating client and server wasn&apos;t just about following best practices. It solved <strong className="text-zinc-950 dark:text-zinc-50">real deployment constraints</strong>. Vercel offers instant CDN-backed static hosting for the React build, while Render provides containerized Node.js hosting.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                        <div className="border-l-2 border-emerald-500 pl-6 space-y-2">
                                            <h4 className="font-semibold text-zinc-950 dark:text-zinc-50">Benefits</h4>
                                            <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                                                    Specialized platform advantages
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                                                    Independent scaling per tier
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                                                    Optimal caching strategies
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="border-l-2 border-amber-500 pl-6 space-y-2">
                                            <h4 className="font-semibold text-zinc-950 dark:text-zinc-50">Tradeoffs</h4>
                                            <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                                                    Network latency between tiers
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                                                    CORS configuration complexity
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                                                    Deployment orchestration
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        In development, I proxy API requests from port 3000 to 8080 via the client&apos;s <CodeChip>package.json</CodeChip>. In production, explicit CORS headers whitelist the Vercel origin.
                                    </p>
                                </div>
                            </section>

                            {/* Section: State Management */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    State Management Strategy
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The cart presented an interesting state management problem: it needs to be <strong className="text-zinc-950 dark:text-zinc-50">reactive</strong> (updates reflect immediately), <strong className="text-zinc-950 dark:text-zinc-50">persistent</strong> (survives refreshes), and <strong className="text-zinc-950 dark:text-zinc-50">eventually consistent</strong> with the backend.
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {[
                                            { num: '1', title: 'Redux as Single Source of Truth', desc: 'All cart operations dispatch actions that update a normalized state tree. Components subscribe to derived selectors.' },
                                            { num: '2', title: 'LocalStorage as Persistence', desc: 'A Redux middleware watches for mutations and syncs to localStorage. On app init, we hydrate from storage.' },
                                            { num: '3', title: 'Backend as Authority on Checkout', desc: 'The frontend sends the cart to the backend, which validates prices against the database before creating the order.' },
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
                                </div>
                            </section>

                            {/* Section: Custom Bowl Builder */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    The Custom Bowl Builder Challenge
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        Custom bowls introduced complexity: users select a base, multiple toppings, proteins, cheeses, and dressings, each with individual prices. The builder needs to show a <strong className="text-zinc-950 dark:text-zinc-50">running total</strong> as users add/remove ingredients.
                                    </p>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        I solved this with a <strong className="text-zinc-950 dark:text-zinc-50">component-local state machine</strong> that tracks selections, then calculates price on-the-fly. When the user clicks &quot;Add to Cart,&quot; it dispatches to Redux with the complete specification.
                                    </p>
                                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                                            Design Note
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            <strong className="text-zinc-950 dark:text-zinc-50">Why not Redux?</strong> The builder is ephemeral. Selections only matter while the modal is open. Lifting this to Redux would pollute the global store with transient data.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Authentication */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Authentication &amp; Authorization
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        The authentication flow uses JWTs with a design choice: the payload includes both a <strong className="text-zinc-950 dark:text-zinc-50">user ID and an admin role flag</strong>. This eliminates database lookups on every request just to check permissions.
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div className="text-zinc-500 mb-2">{'// Token Generation'}</div>
                                        <div>
                                            <span className="text-purple-400">const</span> <span className="text-blue-300">payload</span> = {'{'} <span className="text-emerald-400">_id</span>: user._id, <span className="text-emerald-400">isAdmin</span>: user.isAdmin {'}'};
                                        </div>
                                        <div>
                                            <span className="text-purple-400">const</span> <span className="text-blue-300">token</span> = jwt.<span className="text-emerald-400">sign</span>(payload, process.env.JWTPRIVATEKEY, {'{'} <span className="text-emerald-400">expiresIn</span>: <span className="text-amber-400">&quot;7d&quot;</span> {'}'});
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        {[
                                            { title: 'Verification Middleware', desc: 'Extracts token from x-auth-token header, verifies signature, attaches decoded payload to req.user' },
                                            { title: 'Password Security', desc: 'Passwords are hashed with bcrypt using async operations (`await bcrypt.hash()`) to avoid blocking Node.js\'s event loop. Salt rounds are configurable via environment variables.' },
                                        ].map((item) => (
                                            <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 mt-6">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2">
                                            Tradeoff
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            JWTs can&apos;t be revoked before expiry. For a restaurant app, this is acceptable. The blast radius is limited to order history visibility.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Payment Integration */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Payment Integration
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Payment processing follows Stripe&apos;s recommended pattern: the client collects card details using <strong className="text-zinc-950 dark:text-zinc-50">Stripe Elements</strong> (PCI-compliant inputs), the backend creates a PaymentIntent, and the client confirms payment.
                                    </p>

                                    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm mb-8 overflow-x-auto text-zinc-300">
                                        <div className="text-zinc-500 mb-4">{'// Payment Flow'}</div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-3">
                                                <span className="text-zinc-500">1.</span>
                                                <span className="text-blue-300">Client</span>
                                                <span className="text-zinc-500">→</span>
                                                <span className="text-zinc-300">sends cart items to /api/payment/create-payment-intent</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-zinc-500">2.</span>
                                                <span className="text-emerald-400">Backend</span>
                                                <span className="text-zinc-500">→</span>
                                                <span className="text-zinc-300">calculates total from database prices</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-zinc-500">3.</span>
                                                <span className="text-emerald-400">Backend</span>
                                                <span className="text-zinc-500">→</span>
                                                <span className="text-zinc-300">creates PaymentIntent with Stripe API</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-zinc-500">4.</span>
                                                <span className="text-blue-300">Client</span>
                                                <span className="text-zinc-500">→</span>
                                                <span className="text-zinc-300">receives clientSecret, confirms payment</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-red-600 dark:text-red-400 mb-2">
                                            Key Insight
                                        </p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Never send the dollar amount from the client. The backend always calculates totals from database prices to prevent client-side manipulation.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Database Design */}
                            <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8">
                                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                                    Database Design Patterns
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg mt-8 mb-4">Price as Array</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Bowl prices stored as <CodeChip>[Small, Medium, Large]</CodeChip> arrays. Keeps size pricing denormalized for fast reads with no joins on menu fetch.
                                        </p>
                                    </div>
                                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg mb-4">Order Snapshots</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Orders embed full details rather than referencing bowls by ID. This creates a snapshot at order time. If menu prices change later, historical orders remain accurate.
                                        </p>
                                    </div>
                                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg mb-4">Repository Pattern</h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            Database access abstracted behind repositories. Controllers call <CodeChip>createOrder(data)</CodeChip> rather than invoking Mongoose directly. This keeps business logic testable.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Deployment */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Deployment &amp; The Cold Start Problem
                                </h2>
                                <div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                                        Free-tier Render hosting spins down the container after 15 minutes of inactivity. The first request after downtime takes up to <strong className="text-zinc-950 dark:text-zinc-50">50 seconds</strong> while the container restarts.
                                    </p>

                                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                                        {[
                                            { title: 'Cron Ping', desc: 'Keep service warm with scheduled pings every 10 minutes' },
                                            { title: 'Paid Tier', desc: 'Upgrade to persistent containers without cold starts' },
                                            { title: 'Serverless', desc: 'Move to functions with better cold start characteristics' },
                                        ].map((item) => (
                                            <div key={item.title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base mb-2">{item.title}</h4>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        For a portfolio project, the cold start is an acceptable UX tradeoff. The frontend loads instantly from Vercel&apos;s CDN, and a loading indicator manages user expectations.
                                    </p>
                                </div>
                            </section>

                            {/* Section: Technical Depth */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Technical Depth: The Interesting Bits
                                </h2>
                                <div className="space-y-6">
                                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg mb-4">
                                            Race Conditions in Cart Updates
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            When multiple tabs are open, localStorage writes from one tab don&apos;t automatically sync to Redux in others. I handle this with a <CodeChip>storage</CodeChip> event listener that watches for external changes and dispatches sync actions.
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg mb-4">
                                            Dynamic Pricing Validation
                                        </h3>
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                                            Custom bowl price = base + toppings + proteins + cheeses + dressing + sauce. The backend <strong className="text-zinc-950 dark:text-zinc-50">recomputes and validates</strong> by fetching each ingredient from the database.
                                        </p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            If the client-reported total differs by more than $0.01, the request is rejected. This protects against code manipulation, mid-cart price changes, and floating-point rounding errors.
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 text-lg mb-4">
                                            Middleware Composition
                                        </h3>
                                        <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-6 font-mono text-sm overflow-x-auto text-zinc-300">
                                            <span className="text-zinc-300">router.</span><span className="text-emerald-400">post</span><span className="text-zinc-300">(</span><span className="text-amber-400">&apos;/admin/bowls&apos;</span><span className="text-zinc-300">, </span><span className="text-blue-300">auth</span><span className="text-zinc-300">, </span><span className="text-blue-300">isAdmin</span><span className="text-zinc-300">, </span><span className="text-blue-300">validateBowl</span><span className="text-zinc-300">, </span><span className="text-blue-300">createBowl</span><span className="text-zinc-300">);</span>
                                        </div>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                                            Each middleware is focused and reusable: <CodeChip>auth</CodeChip> verifies JWT, <CodeChip>isAdmin</CodeChip> checks role, <CodeChip>validateBowl</CodeChip> runs Joi schema validation.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Lessons Learned */}
                            <section>
                                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-6">
                                    Lessons Learned
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="border-l-2 border-emerald-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">What Worked Well</h3>
                                        <ul className="space-y-3">
                                            {[
                                                'Redux Toolkit eliminated boilerplate',
                                                'DevTools invaluable for debugging',
                                                'Chakra + Ant Design mix worked',
                                                'Layered architecture simplified swaps',
                                            ].map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="border-l-2 border-amber-500 pl-6 space-y-4">
                                        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">What I&apos;d Change</h3>
                                        <ul className="space-y-3">
                                            {[
                                                'Add email verification with Gmail SMTP',
                                                'Validate cart on every page load',
                                                'Add order status tracking state machine',
                                                'Implement webhook for payment confirmation',
                                            ].map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300 text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Philosophy */}
                            <section>
                                <blockquote className="border-l-2 border-emerald-500 pl-6 py-1">
                                    <p className="text-lg italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        &quot;Every architectural decision is a tradeoff.&quot;
                                    </p>
                                </blockquote>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6">
                                    Building this system taught me that good architecture isn&apos;t about perfection. It&apos;s about making intentional choices you can defend.
                                </p>
                            </section>

                        </div>

                        {/* CTA Section */}
                        <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold text-zinc-950 dark:text-zinc-50 mb-4">Try Good Bowls</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                                Experience the live demo. Allow ~50s for initial backend wake-up.
                            </p>
                            <div className="flex flex-wrap items-center gap-6">
                                <a
                                    href="https://goodbowls.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    Live Demo
                                    <Icon name="arrow-up-right" size={12} />
                                </a>
                                <a
                                    href="https://github.com/AbhijeetP21/Good_Bowls"
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
